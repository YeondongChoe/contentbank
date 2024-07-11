import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { backgroundClip } from 'html2canvas/dist/types/css/property-descriptors/background-clip';
import { FaCircle } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';
import { IoIosArrowBack } from 'react-icons/io';
import { SlPicture } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled, { ThemeProvider } from 'styled-components';

import { makingworkbookInstance, workbookInstance } from '../../../api/axios';
import {
  isWorkbookCreatedAtom,
  isEditWorkbookAtom,
} from '../../../store/utilAtom';
import { QuizList, WorkbookQuotientData } from '../../../types/WorkbookType';
import { postRefreshToken } from '../../../utils/tokenHandler';
import {
  Input,
  Label,
  Button,
  CheckBox,
  openToastifyAlert,
  AlertBar,
  Select,
} from '../../atom';
import { COLOR } from '../../constants';
import {
  RedTheme,
  OrangeTheme,
  GreenTheme,
  BlueTheme,
  PurpleTheme,
} from '../../constants/THEME';
import { TypeA, TypeB } from '../worksheetType';
//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export function Step3() {
  const [getLocalData, setGetLocalData] = useState<any>(null);
  const [initialItems, setInitialItems] = useState<QuizList[]>(getLocalData);
  const [newInitialItems, setNewInitialItems] = useState<QuizList[]>();

  const [getQuotientLocalData, setGetQuotientLocalData] =
    useState<WorkbookQuotientData | null>(null);
  const [itemHeights, setItemHeights] = useState<number[]>([]);
  const originalHeightsRef = useRef<number[]>([]);
  const measureRef = useRef<HTMLDivElement>(null);
  console.log(itemHeights);
  //학습지 생성 알림
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const closeSuccessAlert = () => {
    setIsSuccessAlertOpen(false);
    //window.opener.localStorage.clear();
    window.close();
  };
  //학습지 수정 상태관리
  const [isEditWorkbook, setIsEditWorkbook] = useState<number>();
  const [workSheetIdx, setWorkSheetIdx] = useState<number>();

  // 높이가 측정된 값을 다시 문항의 키값으로 추가
  useEffect(() => {
    if (itemHeights.length > 0) {
      const itemsWithHeight = initialItems.map(
        (item: QuizList, index: number) => ({
          ...item,
          height: itemHeights[index] || 0,
        }),
      );
      setNewInitialItems(itemsWithHeight);
    }
  }, [itemHeights]);

  // 로컬 스토리지에서 데이터 가져오기
  useEffect(() => {
    const fetchDataFromStorage = () => {
      const data = localStorage.getItem('sendData');
      const quotientData = localStorage.getItem('sendQuotientData');
      if (data) {
        try {
          const parsedData = JSON.parse(data);
          const parsedquotientData = JSON.parse(quotientData as string);
          //console.log('데이터 조회', parsedData);
          setGetLocalData(parsedData);
          setGetQuotientLocalData(parsedquotientData);
        } catch (error) {
          //console.error('로컬 스토리지 데이터 파싱 에러:', error);
        }
      } else {
        console.log('로컬 스토리지에 데이터가 없습니다.');
      }
    };

    fetchDataFromStorage();

    // const retryTimeout = setTimeout(fetchDataFromStorage, 3000); // 3초 후에 다시 시도

    // return () => clearTimeout(retryTimeout);
  }, []);

  //로컬스토리지에서 데이타를 가져온 후 문항 번호를 넣어서 저장
  useEffect(() => {
    if (getLocalData) {
      const itemsWithNum = getLocalData.data.map(
        (item: QuizList, index: number) => ({
          ...item,
          num: index + 1,
        }),
      );
      setInitialItems(itemsWithNum);
      setIsEditWorkbook(getLocalData.isEditWorkbook);
      setWorkSheetIdx(getLocalData.workSheetIdx);
      setGetQuotientLocalData(getLocalData.quotientLocalData);
      setNameValue(getLocalData.title);
      setGradeValue(getLocalData.grade);
      setContentAuthor(getLocalData.examiner);
      setTag(getLocalData.tag);
      setColorChoice(
        getLocalData.color === '#FA8978'
          ? 'red'
          : getLocalData.color === '#FFDD94'
            ? 'orange'
            : getLocalData.color === '#D0E6A5'
              ? 'green'
              : getLocalData.color === '#86aee3'
                ? 'blue'
                : getLocalData.color === '#CCABD8'
                  ? 'purple'
                  : 'blue',
      );
      setTemplateType(getLocalData.type);
      setColumn(
        getLocalData.multiLevel === '1'
          ? '1단'
          : getLocalData.multiLevel === '2'
            ? '2단'
            : '2단',
      );
      setContentQuantity(
        getLocalData.assign === '0'
          ? '최대'
          : getLocalData.assign === '2'
            ? '2문제'
            : getLocalData.assign === '4'
              ? '4문제'
              : getLocalData.assign === '6'
                ? '6문제'
                : '최대',
      );
      setIsDate(getLocalData.isDate);
      setIsContentTypeTitle(getLocalData.isQuizType);
      setAnswerCommentary(
        getLocalData.itemType === 0
          ? '문제만'
          : getLocalData.itemType === 1
            ? '정답만'
            : getLocalData.itemType === 2
              ? '문제+해설별도'
              : getLocalData.itemType === 3
                ? '문제+해설같이'
                : 0,
      );
    }
  }, [getLocalData]);

  // 로컬 스토리지 값 다 받은 뒤 초기화
  useEffect(() => {
    if (getLocalData) {
      //window.opener.localStorage.clear();
    }
  }, [getLocalData]);

  const navigate = useNavigate();

  const [nameValue, setNameValue] = useState('');
  const [gradeValue, setGradeValue] = useState('');
  const [contentAuthor, setContentAuthor] = useState('');

  const [tag, setTag] = useState<string>('');
  const selectTag = (newValue: string) => {
    setTag(newValue);
  };

  const [answerCommentary, setAnswerCommentary] = useState<string | number>(
    '문제만',
  );
  const selectAnswerCommentary = (newValue: string) => {
    setAnswerCommentary(newValue);
  };

  const [colorChoice, setColorChoice] = useState('');

  const selectedTheme = (() => {
    switch (colorChoice) {
      case 'blue':
        return BlueTheme;
      case 'green':
        return GreenTheme;
      case 'orange':
        return OrangeTheme;
      case 'red':
        return RedTheme;
      case 'purple':
        return PurpleTheme;
      default:
        return BlueTheme; // 기본값
    }
  })();

  const [templateType, setTemplateType] = useState('A');
  const selectTemplateType = (newValue: string) => {
    setTemplateType(newValue);
  };

  const [column, setColumn] = useState<string>('2단');

  const selectColumn = (newValue: string) => {
    setColumn(newValue);
  };

  const [contentQuantity, setContentQuantity] = useState<string>('최대');

  const selectContentQuantity = (newValue: string) => {
    setContentQuantity(newValue);
  };
  const [isDate, setIsDate] = useState(false);
  const selectDate = () => {
    setIsDate(!isDate);
  };
  const [isContentTypeTitle, setIsContentTypeTitle] = useState(false);
  const selectContentTypeTitle = () => {
    setIsContentTypeTitle(!isContentTypeTitle);
  };

  // 로컬스토리지에 보낼데이터 저장
  const saveLocalData = (data: any) => {
    //const sendData = { data: data };
    if (data) {
      localStorage.setItem('sendData', JSON.stringify(data));
    }
  };
  //workSheetIdx 관리해서 넘겨주기
  const goBackMainPopup = () => {
    const data = {
      data: { quizList: getLocalData.data },
      isEditWorkbook: isEditWorkbook,
      title: nameValue,
      examiner: contentAuthor,
      grade: gradeValue,
      tag: tag,
    };
    window.opener.localStorage.clear();
    saveLocalData(data);
    localStorage.setItem(
      'sendQuotientData',
      JSON.stringify(getQuotientLocalData),
    );
    navigate('/content-create/exam/step2');
  };
  const [fileName, setFileName] = useState('');

  // node 서버 학습지 만들기 api
  const postWorkbook = async (data: any) => {
    const res = await makingworkbookInstance.post(`/get-pdf`, data);
    // console.log(`학습지 만들기결과값`, res);
    return res;
  };

  const makingWorkbook = (nameValue: string) => {
    const currentTime = new Date().getTime();
    const data = {
      title: nameValue,
      content: newInitialItems,
      column: 2,
      uploadDir: '/usr/share/nginx/html/CB',
      fileName: `${nameValue}_${currentTime}.pdf`,
      //fileName: `testYD.pdf`,
    };
    if (
      nameValue === '' ||
      contentAuthor === '' ||
      gradeValue === '' ||
      tag === ''
    ) {
      openToastifyAlert({
        type: 'error',
        text: '필수 항목을 선택해 주세요.',
      });
    } else {
      workbookData(data);
      setFileName(data.fileName);
    }
  };

  const { mutate: workbookData } = useMutation({
    mutationFn: postWorkbook,
    onError: (error) => {
      //console.error('post-workbook 에러:', error);
      // 에러 처리 로직 추가
    },
    onSuccess: (data) => {
      //console.log('post-workbook 성공:', data);
      postNewWorkbookData();
      // 성공 처리 로직 추가
      setIsComplete(true);
    },
  });

  // 백엔드로 학습지 만들기 api
  const postNewWorkbook = async () => {
    const data: any = {
      commandCode: isEditWorkbook === 1 ? isEditWorkbook : 0,
      workSheetIdx: isEditWorkbook === 1 ? workSheetIdx : null,
      name: nameValue,
      examiner: contentAuthor,
      grade: gradeValue,
      quizCnt: newInitialItems?.length,
      tag: tag,
      isAutoGrade: true,
      article: {
        type: 'PDF',
        originalName: fileName,
        storedPath: '/usr/share/nginx/html/CB',
        extension: '.pdf',
      },
      template: {
        color:
          colorChoice === 'red'
            ? '#FA8978'
            : colorChoice === 'orange'
              ? '#FFDD94'
              : colorChoice === 'green'
                ? '#D0E6A5'
                : colorChoice === 'blue'
                  ? '#86aee3'
                  : colorChoice === 'purple'
                    ? '#CCABD8'
                    : '',
        type: templateType,
        multiLevel: column === '1단' ? '1' : column === '2단' ? '2' : '',
        assign:
          contentQuantity === '최대'
            ? '0'
            : contentQuantity === '2문제'
              ? '2'
              : contentQuantity === '4문제'
                ? '4'
                : contentQuantity === '6문제'
                  ? '6'
                  : '',
        isDate: isDate,
        isQuizType: isContentTypeTitle,
        itemType:
          answerCommentary === '문제만'
            ? 0
            : answerCommentary === '정답만'
              ? 1
              : answerCommentary === '문제+해설별도'
                ? 2
                : answerCommentary === '문제+해설같이'
                  ? 3
                  : 0,
      },
      quizList: newInitialItems,
    };

    //백엔드 서버로 생성 요청
    return await workbookInstance.post(`/v1/workbook`, data);
  };
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setIsComplete(false);
  }, []);

  const { mutate: postNewWorkbookData } = useMutation({
    mutationFn: postNewWorkbook,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
      if (context.response.data.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response) => {
      //수정 값 초기화
      setIsEditWorkbook(0);
      //alert 열기
      setIsSuccessAlertOpen(true);
    },
  });

  const submitCreateWorksheet = (nameValue: string) => {
    //node 서버에서 pdf 생성
    makingWorkbook(nameValue);
  };
  //console.log(isComplete);
  //단원분류 입력 도중 해당 화면을 벗어나는 경우, '저장하지 않고 나가시겠습니까?' 얼럿
  useEffect(() => {
    if (!isComplete) {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        // 사용자에게 경고 메시지를 표시하도록 설정
        const message =
          '저장 버튼을 누르지 않을시 저장되지 않습니다. 정말 나가시겠습니까?';
        event.preventDefault();
        event.returnValue = message; // 표준에 따른 설정 (Chrome에서는 무시됨)
        return message; // 대부분의 브라우저에서 필요
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        //window.opener.localStorage.clear();
      };
    }
  }, [isComplete]);

  //선택한 문항 보기 정렬
  const selectSpace = [
    {
      idx: 0,
      name: '0줄',
      value: '0',
      options: [
        { idx: 0, name: '0줄', value: '0' },
        { idx: 1, name: '1줄', value: '1' },
        { idx: 2, name: '2줄', value: '2' },
        { idx: 3, name: '3줄', value: '3' },
        { idx: 4, name: '4줄', value: '4' },
        { idx: 5, name: '5줄', value: '5' },
        { idx: 6, name: '6줄', value: '6' },
        { idx: 7, name: '7줄', value: '7' },
        { idx: 8, name: '8줄', value: '8' },
        { idx: 9, name: '9줄', value: '9' },
        { idx: 10, name: '10줄', value: '10' },
      ],
    },
  ];

  const selectListCategoryOption = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const newValue = (event.target as HTMLButtonElement)?.innerText;

    const linesMatch = newValue.match(/^(\d+)줄$/);
    if (linesMatch) {
      const lines = parseInt(linesMatch[1], 10); // '1줄'에서 1을 추출하여 숫자로 변환
      setItemHeights(
        originalHeightsRef.current.map((height) => height + 30 * lines),
      );
    }
  };

  //문항 번호가 포함된 데이타가 저장되면 가상 돔에 그려 높이 측정
  useEffect(() => {
    const measureHeights = () => {
      if (measureRef.current) {
        const heights = Array.from(measureRef.current.children).map(
          (child) => (child as HTMLElement).offsetHeight,
        );
        setItemHeights(heights);
        originalHeightsRef.current = heights;
      }
    };

    if (initialItems) {
      measureHeights();
    }
  }, [initialItems, answerCommentary, contentQuantity]);

  return (
    <Container>
      {/* 가상의 돔을 그려서 문항의 높이 측정 */}
      <div>
        <div
          ref={measureRef}
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
        >
          {answerCommentary === '문제만' && (
            <>
              {initialItems &&
                initialItems.map((quizItemList: any) =>
                  quizItemList.quizItemList
                    .filter((quizItem: any) => quizItem.type === 'QUESTION')
                    .map((quizItem: any, index: number) => (
                      <div key={index}>
                        <p>{quizItem.content}</p>
                      </div>
                    )),
                )}
            </>
          )}
          {answerCommentary === '정답만' && (
            <>
              {initialItems &&
                initialItems.map((quizItemList: any) =>
                  quizItemList.quizItemList
                    .filter((quizItem: any) => quizItem.type === 'ANSWER')
                    .map((quizItem: any, index: number) => (
                      <div key={index}>
                        <p>{quizItem.content}</p>
                      </div>
                    )),
                )}
            </>
          )}
          {answerCommentary === '문제+해설별도' && (
            <>
              {initialItems &&
                initialItems.map((quizItemList: any) =>
                  quizItemList.quizItemList
                    .filter((quizItem: any) => quizItem.type === 'QUESTION')
                    .map((quizItem: any, index: number) => (
                      <div key={index}>
                        <p>{quizItem.content}</p>
                      </div>
                    )),
                )}
            </>
          )}
          {answerCommentary === '문제+해설같이' && (
            <>
              {initialItems &&
                initialItems.map((quizItemList: any) =>
                  quizItemList.quizItemList
                    .filter((quizItem: any) => quizItem.type === 'QUESTION')
                    .map((quizItem: any, index: number) => (
                      <div key={index}>
                        <p>{quizItem.content}</p>

                        {quizItemList.quizItemList
                          .filter(
                            (exampleItem: any) =>
                              exampleItem.type === 'EXAMPLE',
                          )
                          .map((exampleItem: any, exampleIndex: number) => (
                            <div key={`example-${index}-${exampleIndex}`}>
                              <p>{exampleItem.content}</p>
                            </div>
                          ))}

                        {quizItemList.quizItemList
                          .filter(
                            (answerItem: any) => answerItem.type === 'ANSWER',
                          )
                          .map((answerItem: any, answerIndex: number) => (
                            <div key={`answer-${index}-${answerIndex}`}>
                              <p>{answerItem.content}</p>
                            </div>
                          ))}
                      </div>
                    )),
                )}
            </>
          )}
        </div>
      </div>
      <AlertBar
        type="success"
        isAlertOpen={isSuccessAlertOpen}
        closeAlert={closeSuccessAlert}
        message={'학습지가 생성 되었습니다.'}
      ></AlertBar>
      <TitleWrapper>
        <IconWrapper>
          <IoIosArrowBack
            style={{ fontSize: '24px', cursor: 'pointer' }}
            onClick={goBackMainPopup}
          />
        </IconWrapper>
        <Title>
          <Span>
            <FrontSpan onClick={goBackMainPopup}>STEP 2 -</FrontSpan>
            STEP 3
          </Span>
          학습지 상세 편집
        </Title>
      </TitleWrapper>
      <Wrapper>
        <WorksheetSettingSection>
          <InputGroup>
            <InputWrapper>
              <Label
                value="학습지명*"
                fontSize="15px"
                width="120px"
                padding="5px 10px"
              />
              <Input
                width="400px"
                height="35px"
                padding="10px"
                border="normal"
                placeholderSize="14px"
                fontSize="14px"
                type="text"
                placeholder="학습지명을 작성해주세요."
                value={nameValue}
                onChange={(e) => {
                  setNameValue(e.target.value);
                }}
                maxLength={20}
                //innerRef={nameInputRef}
              />
            </InputWrapper>
            <InputWrapper>
              <Label
                value="출제자*"
                fontSize="15px"
                width="120px"
                padding="5px 10px"
              />
              <Input
                width="400px"
                height="35px"
                padding="10px"
                border="normal"
                placeholderSize="14px"
                fontSize="14px"
                type="text"
                placeholder="출제자명을 작성해주세요."
                value={contentAuthor}
                onChange={(e) => {
                  const value = e.target.value;
                  // 특수문자 제외한 문자만 남기도록 정규표현식을 사용하여 처리
                  const filteredValue = value.replace(/[^\w\s]/gi, '');
                  setContentAuthor(filteredValue); // 필터링된 값을 상태로 설정
                }}
                maxLength={10}
                //innerRef={nameInputRef}
              />
            </InputWrapper>
            <InputWrapper>
              <Label
                value="대상 학년*"
                fontSize="15px"
                width="120px"
                padding="5px 10px"
              />
              <Input
                width="400px"
                height="35px"
                padding="10px"
                border="normal"
                placeholderSize="14px"
                fontSize="14px"
                type="text"
                placeholder="학년을 작성해주세요."
                value={gradeValue}
                onChange={(e) => {
                  setGradeValue(e.target.value);
                }}
                maxLength={10}
                //innerRef={nameInputRef}
              />
            </InputWrapper>
          </InputGroup>
          <WorksheetNameWrapper>
            <Label
              value="학습지 태그*"
              fontSize="15px"
              width="120px"
              padding="5px 10px"
              flexEnd
            />
            <ButtonGroup>
              <Button
                buttonType="button"
                onClick={() => {
                  selectTag('EXERCISES');
                }}
                $padding="5px"
                height={'35px'}
                width={'70px'}
                fontSize="14px"
                $normal={tag !== 'EXERCISES'}
                $filled={tag === 'EXERCISES'}
                cursor
              >
                <span>연습문제</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectTag('DAILY_TEST');
                }}
                $padding="5px"
                height={'35px'}
                width={'80px'}
                fontSize="14px"
                $normal={tag !== 'DAILY_TEST'}
                $filled={tag === 'DAILY_TEST'}
                cursor
              >
                <span>일일TEST</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectTag('PRACTICE_TEST');
                }}
                $padding="5px"
                height={'35px'}
                width={'70px'}
                fontSize="14px"
                $normal={tag !== 'PRACTICE_TEST'}
                $filled={tag === 'PRACTICE_TEST'}
                cursor
              >
                <span>모의고사</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectTag('TEST_PREP');
                }}
                $padding="5px"
                height={'35px'}
                width={'70px'}
                fontSize="14px"
                $normal={tag !== 'TEST_PREP'}
                $filled={tag === 'TEST_PREP'}
                cursor
              >
                <span>내신대비</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectTag('MONTHLY_TEST');
                }}
                $padding="5px"
                height={'35px'}
                width={'80px'}
                fontSize="14px"
                $normal={tag !== 'MONTHLY_TEST'}
                $filled={tag === 'MONTHLY_TEST'}
                cursor
              >
                <span>월말TEST</span>
              </Button>
            </ButtonGroup>
          </WorksheetNameWrapper>
          <TemplateWrapper>
            <Label
              value="학습지 템플릿*"
              fontSize="15px"
              width="130px"
              padding="5px 10px"
              flexEnd
            />
            <TemplateOption>
              <ColorBox>
                <ColorOption>
                  {colorChoice == 'red' ? (
                    <FaCircleCheck
                      color="#FA8978"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('')}
                    />
                  ) : (
                    <FaCircle
                      color="#FA8978"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('red')}
                    />
                  )}
                  {colorChoice == 'orange' ? (
                    <FaCircleCheck
                      color="#FFDD94"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('')}
                    />
                  ) : (
                    <FaCircle
                      color="#FFDD94"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('orange')}
                    />
                  )}
                  {colorChoice == 'green' ? (
                    <FaCircleCheck
                      color="#D0E6A5"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('')}
                    />
                  ) : (
                    <FaCircle
                      color="#D0E6A5"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('green')}
                    />
                  )}
                  {colorChoice == 'blue' ? (
                    <FaCircleCheck
                      color="#86aee3"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('')}
                    />
                  ) : (
                    <FaCircle
                      color="#86aee3"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('blue')}
                    />
                  )}
                  {colorChoice == 'purple' ? (
                    <FaCircleCheck
                      color="#CCABD8"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('')}
                    />
                  ) : (
                    <FaCircle
                      color="#CCABD8"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('purple')}
                    />
                  )}
                </ColorOption>
              </ColorBox>
              <TypeOptionWrapper>
                <TypeOption
                  onClick={() => {
                    selectTemplateType('A');
                  }}
                >
                  <SlPicture color="gray" fontSize={40} />A Type
                </TypeOption>
                <TypeOption
                  onClick={() => {
                    selectTemplateType('B');
                  }}
                >
                  <SlPicture color="gray" fontSize={40} />B Type
                </TypeOption>
              </TypeOptionWrapper>
            </TemplateOption>
          </TemplateWrapper>
          <PositionOption>
            <ColumnOption>
              <Label
                value="학습지 단*"
                fontSize="15px"
                width="120px"
                padding="5px 10px"
                flexEnd
              />
              <ButtonGroup>
                <Button
                  buttonType="button"
                  onClick={() => {
                    selectColumn('2단');
                  }}
                  $padding="5px"
                  height={'35px'}
                  width={'80px'}
                  fontSize="14px"
                  $normal={column !== '2단'}
                  $filled={column === '2단'}
                  cursor
                >
                  <span>2단</span>
                </Button>
                <Button
                  buttonType="button"
                  onClick={() => {
                    selectColumn('1단');
                  }}
                  $padding="5px"
                  height={'35px'}
                  width={'80px'}
                  fontSize="14px"
                  $normal={column !== '1단'}
                  $filled={column === '1단'}
                  cursor
                >
                  <span>1단</span>
                </Button>
              </ButtonGroup>
            </ColumnOption>
            <ContentQuantity>
              <Label
                value="학습지 배치*"
                fontSize="15px"
                width="120px"
                padding="5px 10px"
                flexEnd
              />
              <ButtonGroup>
                <Button
                  buttonType="button"
                  onClick={() => {
                    selectContentQuantity('최대');
                  }}
                  $padding="5px"
                  height={'35px'}
                  width={'80px'}
                  fontSize="14px"
                  $normal={contentQuantity !== '최대'}
                  $filled={contentQuantity === '최대'}
                  cursor
                >
                  <span>최대</span>
                </Button>
                <Button
                  buttonType="button"
                  onClick={() => {
                    selectContentQuantity('2문제');
                  }}
                  $padding="5px"
                  height={'35px'}
                  width={'80px'}
                  fontSize="14px"
                  $normal={contentQuantity !== '2문제'}
                  $filled={contentQuantity === '2문제'}
                  cursor
                >
                  <span>2문제</span>
                </Button>
                <Button
                  buttonType="button"
                  onClick={() => {
                    selectContentQuantity('4문제');
                  }}
                  $padding="5px"
                  height={'35px'}
                  width={'80px'}
                  fontSize="14px"
                  $normal={contentQuantity !== '4문제'}
                  $filled={contentQuantity === '4문제'}
                  cursor
                >
                  <span>4문제</span>
                </Button>
                <Button
                  buttonType="button"
                  onClick={() => {
                    selectContentQuantity('6문제');
                  }}
                  $padding="5px"
                  height={'35px'}
                  width={'80px'}
                  fontSize="14px"
                  $normal={contentQuantity !== '6문제'}
                  $filled={contentQuantity === '6문제'}
                  cursor
                >
                  <span>6문제</span>
                </Button>
              </ButtonGroup>
            </ContentQuantity>
            {contentQuantity === '최대' && (
              <ContentSpace>
                <Label
                  value="풀이공간"
                  fontSize="15px"
                  width="120px"
                  padding="5px 10px"
                  flexEnd
                />
                {selectSpace.map((el) => (
                  <Select
                    width={'100px'}
                    isnormalizedOptions
                    key={el.idx}
                    defaultValue={el.name}
                    options={el.options}
                    heightScroll={'150px'}
                    onSelect={(event) => selectListCategoryOption(event)}
                  ></Select>
                ))}
              </ContentSpace>
            )}
          </PositionOption>
          <AddInformationWrapper>
            <Label
              value="추가 정보 표기"
              fontSize="14px"
              width="120px"
              padding="5px 10px"
              flexEnd
            />
            <CheckBoxWrapper>
              <CheckBox height="15px" isChecked={isDate} onClick={selectDate} />
              날짜 표시
            </CheckBoxWrapper>
            <CheckBoxWrapper>
              <CheckBox
                height="15px"
                isChecked={isContentTypeTitle}
                onClick={selectContentTypeTitle}
              />
              문항 유형명 표시
            </CheckBoxWrapper>
          </AddInformationWrapper>
          <AnswerCommentaryWrapper>
            <Label
              value="정답 및 해설"
              fontSize="15px"
              width="120px"
              padding="5px 10px"
              flexEnd
            />
            <ButtonGroup>
              <Button
                buttonType="button"
                onClick={() => {
                  selectAnswerCommentary('문제만');
                }}
                $padding="5px"
                height={'35px'}
                width={'80px'}
                fontSize="14px"
                $normal={answerCommentary !== '문제만'}
                $filled={answerCommentary === '문제만'}
                cursor
              >
                <span>문제만</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectAnswerCommentary('정답만');
                }}
                $padding="5px"
                height={'35px'}
                width={'80px'}
                fontSize="14px"
                $normal={answerCommentary !== '정답만'}
                $filled={answerCommentary === '정답만'}
                cursor
              >
                <span>정답만</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectAnswerCommentary('문제+해설별도');
                }}
                $padding="5px"
                height={'35px'}
                width={'80px'}
                fontSize="14px"
                $normal={answerCommentary !== '문제+해설별도'}
                $filled={answerCommentary === '문제+해설별도'}
                cursor
              >
                <span>문제+해설(별도)</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectAnswerCommentary('문제+해설같이');
                }}
                $padding="5px"
                height={'35px'}
                width={'80px'}
                fontSize="14px"
                $normal={answerCommentary !== '문제+해설같이'}
                $filled={answerCommentary === '문제+해설같이'}
                cursor
              >
                <span>문제+해설(같이)</span>
              </Button>
            </ButtonGroup>
          </AnswerCommentaryWrapper>
        </WorksheetSettingSection>
        <WorksheetTemplateViewSection>
          {templateType === 'A' && (
            <WorksheetTemplateTypeWrapper>
              <TypeA
                title={nameValue}
                grade={gradeValue}
                tag={tag}
                contentQuantity={contentQuantity}
                isDate={isDate}
                isContentTypeTitle={isContentTypeTitle}
                theme={selectedTheme}
                initialItems={newInitialItems}
                answerCommentary={answerCommentary as string}
                column={column}
              ></TypeA>
            </WorksheetTemplateTypeWrapper>
          )}
          {templateType === 'B' && (
            <WorksheetTemplateTypeWrapper>
              <TypeB
                title={nameValue}
                grade={gradeValue}
                tag={tag}
                contentQuantity={contentQuantity}
                isDate={isDate}
                isContentTypeTitle={isContentTypeTitle}
                theme={selectedTheme}
                initialItems={newInitialItems}
                answerCommentary={answerCommentary as string}
                column={column}
              ></TypeB>
            </WorksheetTemplateTypeWrapper>
          )}
        </WorksheetTemplateViewSection>
      </Wrapper>
      <CreateButtonWrapper>
        <Button
          buttonType="button"
          onClick={() => submitCreateWorksheet(nameValue)}
          $padding="10px"
          height={'35px'}
          width={'120px'}
          fontSize="13px"
          $filled
          cursor
        >
          <span>학습지 만들기</span>
        </Button>
      </CreateButtonWrapper>
    </Container>
  );
}

const Container = styled.div``;
const TitleWrapper = styled.div`
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  font-size: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1 0 0;
  padding-left: 10px;
`;
const FrontSpan = styled.span`
  color: ${COLOR.BORDER_BLUE};
  font-size: 20px;
  cursor: pointer;
`;
const Span = styled.span`
  color: #1976d2;
  padding-right: 10px;
`;
const Wrapper = styled.div`
  height: 753px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;
// 왼쪽 section
const WorksheetSettingSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 0 35%;
  border: 1px solid ${COLOR.BORDER_POPUP};
  border-radius: 25px;
  padding: 20px;
  //gap: 30px;
`;
const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;
const InputWrapper = styled.div`
  display: flex;
`;
const WorksheetNameWrapper = styled.div`
  display: flex;
`;
const AnswerCommentaryWrapper = styled.div`
  display: flex;
`;
const ButtonGroup = styled.div`
  width: 400px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;
const TemplateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const TemplateOption = styled.div`
  display: flex;
`;
const ColorBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;
const ColorOption = styled.div`
  display: flex;
  gap: 2px;
  :hover {
    border: 1px solid ${COLOR.HOVER};
    border-radius: 10px;
  }
`;
const TypeOptionWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
`;
const TypeOption = styled.div`
  width: 180px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.LIGHT_GRAY};
  border: 1px solid ${COLOR.BORDER_BLUE};
  font-size: 14px;
  color: ${COLOR.TEXT_GRAY};
  cursor: pointer;
  :hover {
    font-size: 50px;
  }
`;
const PositionOption = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const ColumnOption = styled.div`
  display: flex;
  padding-right: 10px;
  //gap: 5px;
`;
const ContentQuantity = styled.div`
  display: flex;
  //gap: 5px;
`;
const ContentSpace = styled.div`
  display: flex;
  //gap: 5px;
`;
const AddInformationWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const CheckBoxWrapper = styled.div`
  display: flex;
  gap: 2px;
  padding-right: 10px;
`;
const WorksheetTemplateViewSection = styled.div`
  /* width: 900px; */
  max-height: 751px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 55%;
  border: 1px solid ${COLOR.BORDER_POPUP};
  border-radius: 25px;
  gap: 10px;
`;
const WorksheetTemplateTypeWrapper = styled.div`
  max-height: 751px;
  overflow-y: auto;
`;

const WorksheetTemplateWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 25px;
  //background-color: black;
  //background-color: ${({ theme }) => theme?.color?.background || 'initial'};
`;
const WorksheetTemplate = styled.div`
  //background-color: black;
  //background-color: white;
  //display: flex;
  //flex-direction: column;
  //align-items: center;
  //justify-content: center;
  //height: 100%;
`;
const MathViewerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 150px;
  padding: 20px;
  border-bottom: 1px solid ${COLOR.BORDER_BLUE};
`;
const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //padding: 20px 10px 10px 20px;
`;
const TemplateTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  .subTitle {
    color: ${COLOR.TEXT_GRAY};
    font-weight: 600;
  }
`;
const TemplateTitle = styled.div`
  display: flex;
  gap: 5px;
  font-size: 25px;
  font-weight: 800;
  .tag {
    color: ${COLOR.SECONDARY};
  }
`;
const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  //flex: 1 0 0;
  justify-content: space-between;
  align-items: flex-start;
  //padding: 20px 10px 10px 20px;
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TemplateInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;
const Description = styled.div`
  font-weight: 800;
`;
const MathViewerListWrapper = styled.div`
  height: 600px;
  display: flex;
  justify-content: space-evenly;
  overflow: auto;
`;
const MathViewerList = styled.div`
  padding: 15px;
  width: ${900 / 2 - 30}px;
  display: flex;
  flex-direction: column;

  /* .row {
    display: flex;
    flex-wrap: wrap;
    //justify-content: space-between;
    flex-direction: column;
  } */
`;
const MathViewerWrapper = styled.div<{ width: string }>`
  min-height: 71px;
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
`;

const InsideWorksheetTemplate = styled.div`
  padding: 10px;
  background-color: white;
`;
const CreateButtonWrapper = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
`;
