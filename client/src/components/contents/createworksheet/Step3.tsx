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
import { Input, Label, Button, CheckBox, openToastifyAlert } from '../../atom';
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
  const [getQuotientLocalData, setGetQuotientLocalData] =
    useState<WorkbookQuotientData | null>(null);

  // 학습지 생성완료 전역상태 관리
  const [isWorkbookCreated, setIsWorkbookCreated] = useRecoilState(
    isWorkbookCreatedAtom,
  );
  console.log(isWorkbookCreated);
  //학습지 수정 상태관리
  const [isEditWorkbook, setIsEditWorkbook] = useState<number>();
  const [workSheetIdx, setWorkSheetIdx] = useState<number>();

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

    const retryTimeout = setTimeout(fetchDataFromStorage, 3000); // 3초 후에 다시 시도

    return () => clearTimeout(retryTimeout);
  }, []);

  const [initialItems, setInitialItems] = useState<QuizList[]>(getLocalData);
  console.log(initialItems);
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
    }
  }, [getLocalData]);

  // 로컬 스토리지 값 다 받은 뒤 초기화
  useEffect(() => {
    if (getLocalData) {
      window.opener.localStorage.clear();
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

  const [answerCommentary, setAnswerCommentary] = useState<string>('문제만');

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
  const [isWeather, setIsWeather] = useState(false);
  const selectWeather = () => {
    setIsWeather(!isWeather);
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

  const goBackMainPopup = () => {
    const data = {
      code: '',
      timestamp: '',
      data: { quizList: initialItems },
      isEditWorkbook: isEditWorkbook,
    };
    saveLocalData(data);
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
      content: initialItems,
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
      quizCnt: initialItems.length,
      tag:
        tag === '연습문제'
          ? 'EXERCISES'
          : tag === '일일TEST' //에러남
            ? 'DAILY_TEST'
            : tag === '모의고사'
              ? 'PRACTICE_TEST'
              : tag === '내신대비'
                ? 'TEST_PREP'
                : tag === '월말TEST' //에러남
                  ? 'MONTHLY_TEST'
                  : '',
      isAutoGrade: true,
      article: {
        type: 'PDF',
        originalName: fileName,
        storedPath: '/usr/share/nginx/html/CB',
        extension: '.pdf',
      },
      template: {
        color: '#FF0000',
        type: 'MCQ',
        multiLevel: 'Single',
        assign: 'Random',
        isDate: true,
        isQuizType: false,
        itemType: 1,
      },
      quizList: initialItems,
    };
    //console.log(data);
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
      //학습지 생성완료 전역상태 값
      const data = {
        isWorkbookCreated: true,
      };
      localStorage.setItem('isWorkbookCreated', JSON.stringify(data));
      //수정 값 초기화
      setIsEditWorkbook(0);
      //모달 닫기
      //window.close();
    },
  });
  console.log(isWorkbookCreated);

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
      };
    }
  }, [isComplete]);

  return (
    <Container>
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
                flexEnd
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
                //innerRef={nameInputRef}
              />
            </InputWrapper>
            <InputWrapper>
              <Label
                value="출제자*"
                fontSize="15px"
                width="120px"
                padding="5px 10px"
                flexEnd
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
                  setContentAuthor(e.target.value);
                }}
                //innerRef={nameInputRef}
              />
            </InputWrapper>
            <InputWrapper>
              <Label
                value="대상 학년*"
                fontSize="15px"
                width="120px"
                padding="5px 10px"
                flexEnd
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
                  selectTag('연습문제');
                }}
                $padding="5px"
                height={'35px'}
                width={'70px'}
                fontSize="14px"
                $normal={tag !== '연습문제'}
                $filled={tag === '연습문제'}
                cursor
              >
                <span>연습문제</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectTag('일일TEST');
                }}
                $padding="5px"
                height={'35px'}
                width={'80px'}
                fontSize="14px"
                $normal={tag !== '일일TEST'}
                $filled={tag === '일일TEST'}
                cursor
              >
                <span>일일TEST</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectTag('모의고사');
                }}
                $padding="5px"
                height={'35px'}
                width={'70px'}
                fontSize="14px"
                $normal={tag !== '모의고사'}
                $filled={tag === '모의고사'}
                cursor
              >
                <span>모의고사</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectTag('내신대비');
                }}
                $padding="5px"
                height={'35px'}
                width={'70px'}
                fontSize="14px"
                $normal={tag !== '내신대비'}
                $filled={tag === '내신대비'}
                cursor
              >
                <span>내신대비</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectTag('월말TEST');
                }}
                $padding="5px"
                height={'35px'}
                width={'80px'}
                fontSize="14px"
                $normal={tag !== '월말TEST'}
                $filled={tag === '월말TEST'}
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
              <CheckBox
                height="15px"
                isChecked={isWeather}
                onClick={selectWeather}
              />
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
            <TypeA
              title={nameValue}
              grade={gradeValue}
              tag={tag}
              contentQuantity={contentQuantity}
              isWeather={isWeather}
              isContentTypeTitle={isContentTypeTitle}
              theme={selectedTheme}
              initialItems={initialItems}
              answerCommentary={answerCommentary}
              column={column}
            ></TypeA>
          )}
          {templateType === 'B' && (
            <TypeB
              title={nameValue}
              grade={gradeValue}
              tag={tag}
              contentQuantity={contentQuantity}
              isWeather={isWeather}
              isContentTypeTitle={isContentTypeTitle}
              theme={selectedTheme}
              initialItems={initialItems}
              answerCommentary={answerCommentary}
              column={column}
            ></TypeB>
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
  width: 100%;
  display: flex;
  justify-content: center;
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
  /* width: 900px;
  height: 751px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 55%;
  border: 1px solid ${COLOR.BORDER_POPUP};
  border-radius: 25px;
  gap: 10px;
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
