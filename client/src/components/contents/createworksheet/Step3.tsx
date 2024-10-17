import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { useMutation } from '@tanstack/react-query';
import { FaCircle } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';
import { IoIosArrowBack } from 'react-icons/io';
import { SlPicture } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { workbookInstance } from '../../../api/axios';
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

export function Step3() {
  const [getLocalData, setGetLocalData] = useState<any>(null);
  const [getQuotientLocalData, setGetQuotientLocalData] =
    useState<WorkbookQuotientData | null>(null);
  const [initialItems, setInitialItems] = useState<QuizList[]>(getLocalData);
  const [newInitialItems, setNewInitialItems] = useState<QuizList[]>([]);
  const [itemHeights, setItemHeights] = useState<number[]>([]);
  const originalHeightsRef = useRef<number[]>([]);
  const measureRef = useRef<HTMLDivElement>(null);
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const closeSuccessAlert = () => {
    setIsSuccessAlertOpen(false);
    window.opener.postMessage('popupClosed', '*');
    window.opener.localStorage.clear();
    window.close();
  };

  console.log('newInitialItems', newInitialItems);

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
          //console.log('parsedData', parsedData);
          const parsedquotientData = JSON.parse(quotientData as string);
          setGetLocalData(parsedData);
          setGetQuotientLocalData(parsedquotientData);
        } catch (error) {
          console.error('로컬 스토리지 데이터 파싱 에러:', error);
        }
      } else {
        console.log('로컬 스토리지에 데이터가 없습니다.');
      }
    };

    fetchDataFromStorage();
  }, []);

  //로컬스토리지에서 데이타를 가져온 후 문항 번호를 넣어서 저장
  useEffect(() => {
    if (getLocalData) {
      const itemsWithNum = getLocalData.data.map(
        (item: QuizList, index: number) => ({
          ...item,
          num: index + 1,
          height: 1,
        }),
      );
      setInitialItems(itemsWithNum);
      setIsEditWorkbook(getLocalData.isEditWorkbook);
      setWorkSheetIdx(getLocalData.workSheetIdx);
      setNameValue(getLocalData.title);
      setGradeValue(getLocalData.grade);
      setContentAuthor(getLocalData.examiner);
      setTag(getLocalData.tag);
      setColorChoice(getLocalData.color);
      setTemplateType(getLocalData.type || 'A');
      setColumn(
        getLocalData.multiLevel === '1'
          ? '1단'
          : getLocalData.multiLevel === '2'
            ? '2단'
            : '2단',
      );
      setContentQuantity('최대');
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
                : '문제만',
      );
    }
  }, [getLocalData]);

  const navigate = useNavigate();

  const [nameValue, setNameValue] = useState('');
  const [gradeValue, setGradeValue] = useState('');
  const [contentAuthor, setContentAuthor] = useState('');
  //문제풀이
  const [line, setLine] = useState<number>(0);
  const [tag, setTag] = useState<string>('');
  const selectTag = (newValue: string) => {
    setTag(newValue);
  };
  const [answerCommentary, setAnswerCommentary] = useState<string | number>(
    '문제만',
  );

  // 높이가 측정된 값을 다시 문항의 키값으로 추가
  useEffect(() => {
    if (answerCommentary === '문제+해설같이') {
      const itemsWithHeight = initialItems.map((item: QuizList) => ({
        ...item,
        height: 400,
      }));
      setNewInitialItems(itemsWithHeight);
    }
  }, [answerCommentary, initialItems]);

  useEffect(() => {
    const measureHeights = () => {
      if (measureRef.current) {
        const heights = Array.from(measureRef.current.children).map((child) => {
          const childElement = child as HTMLElement;
          const height = childElement.offsetHeight;

          return height;
        });

        setItemHeights(heights);
        originalHeightsRef.current = heights;
      }
    };

    if (answerCommentary !== '문제+해설같이') {
      measureHeights();
    }
  }, [answerCommentary]);

  const selectAnswerCommentary = (newValue: string) => {
    setAnswerCommentary(newValue);
    setNewInitialItems([]);
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
    if (data) {
      localStorage.setItem('sendData', JSON.stringify(data));
    }
  };
  //workSheetIdx 관리해서 넘겨주기
  const goBackMainPopup = () => {
    const data = {
      data: {
        quizList: getLocalData.data,
        isEditWorkbook: isEditWorkbook,
        title: nameValue,
        examiner: contentAuthor,
        grade: gradeValue,
        tag: tag,
      },
    };
    window.opener.localStorage.removeItem('sendEditData');
    window.opener.localStorage.removeItem('sendQuotientData');

    saveLocalData(data);
    localStorage.setItem(
      'sendQuotientData',
      JSON.stringify(getQuotientLocalData),
    );
    navigate('/content-create/exam/step2');
  };

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
        originalName: '',
        storedPath: '/usr/share/nginx/html/CB',
        extension: '.pdf',
      },
      template: {
        color: colorChoice,
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
        text: '잠시후 다시 시도해주세요',
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
      setIsComplete(true);
    },
  });

  const submitCreateWorksheet = () => {
    if (!nameValue || !contentAuthor || !gradeValue || !tag) {
      openToastifyAlert({
        type: 'error',
        text: '필수 항목을 선택해 주세요.',
      });
    } else {
      postNewWorkbookData();
    }
  };

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

  const selectListCategoryOption = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const newValue = (event.target as HTMLButtonElement)?.innerText;
    const linesMatch = newValue.match(/^(\d+)줄$/);
    if (linesMatch) {
      const lines = parseInt(linesMatch[1], 10); // '1줄'에서 1을 추출하여 숫자로 변환
      setLine(lines);
      setItemHeights(
        originalHeightsRef.current.map((height) => height + 50 * lines),
      );
    }
  };

  //문항 번호가 포함된 데이타가 저장되면 가상 돔에 그려 높이 측정
  useEffect(() => {
    const measureHeights = () => {
      if (measureRef.current) {
        const heights = Array.from(measureRef.current.children).map((child) => {
          const childElement = child as HTMLElement;
          const height = childElement.offsetHeight;

          return height;
        });

        setItemHeights(heights);
        originalHeightsRef.current = heights;
      }
    };

    if (initialItems) {
      measureHeights();
    }
  }, [initialItems, contentQuantity]);
  //commentary '문제만' 높이 값 관리
  const [itemQuestionHeight, setItemQuestionHeight] = useState<number[][]>([]);
  //commentary '문제만' 문항 수만큼 관리
  const [itemQuestionHeightArray, setItemQuestionHeightArray] = useState<
    number[]
  >([]);
  //commentary '정답만' 높이 값 관리
  const [itemAnswerHeight, setItemAnswerHeight] = useState<number[][]>([]);
  //commentary '정답만' 문항 수만큼 관리
  const [itemAnswerHeightArray, setItemAnswerHeightArray] = useState<number[]>(
    [],
  );
  //commentary '문제+해설 같이' 높이 값 관리
  const [itemCommenteryHeight, setItemCommenteryHeight] = useState<number[][]>(
    [],
  );
  //commentary '문제+해설 같이' 문항 수 만큼 값 관리
  const [itemCommenteryHeightArray, setItemCommenteryHeightArray] = useState<
    number[]
  >([]);

  const [commentary, setCommentary] = useState<string>('');
  //console.log('itemQuestionHeight', itemQuestionHeight);
  //console.log('itemAnswerHeight', itemAnswerHeight);
  //console.log('itemCommenteryHeight', itemCommenteryHeight);
  //console.log('itemHeights', itemHeights);
  //console.log('initialItems', initialItems);
  //console.log('newInitialItems', newInitialItems);

  useEffect(() => {
    const getHeight = (heights: number[], commentary: string) => {
      //console.log('Received heights in Step3:', heights);
      //console.log('answerCommentary:', commentary);

      // 0보다 큰 값만 필터링
      const filteredHeights = heights.filter((height) => height > 0);

      if (commentary === '문제만') {
        setCommentary('문제만');
        setItemQuestionHeight((prev) => {
          const newArray = [...prev, filteredHeights];
          return newArray;
        });
      }
      if (commentary === '정답만') {
        setCommentary('정답만');
        setItemAnswerHeight((prev) => {
          const newArray = [...prev, filteredHeights];
          return newArray;
        });
      }
      if (commentary === '문제+해설별도') {
        setCommentary('문제+해설별도');
        setItemQuestionHeight((prev) => {
          const newArray = [...prev, filteredHeights];
          return newArray;
        });
      }
      if (commentary === '문제+해설같이') {
        setCommentary('문제+해설같이');
        setItemCommenteryHeight((prev) => {
          const newArray = [...prev, filteredHeights];
          return newArray;
        });
      }
    };

    const handleMessage = (event: MessageEvent) => {
      try {
        if (typeof event.data === 'string') {
          const data = JSON.parse(event.data);
          if (data.heights) {
            getHeight(data.heights, data.commentary);
          }
        } else {
          console.error('Received non-string data:', event.data);
        }
      } catch (error) {
        console.error('Failed to parse message data:', error);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  //commentary '문제만' 문항수 만큼 넣어주기
  useEffect(() => {
    if (itemQuestionHeight) {
      const sliceItemQuestion = itemQuestionHeight.slice(
        0,
        initialItems?.length,
      );
      const array = sliceItemQuestion.map((item) => item[0]);
      setItemQuestionHeightArray(array);
      originalHeightsRef.current = array;
    }
  }, [itemQuestionHeight]);
  //commentary '문제만' 문항수 만큼 setItemHeights에 넣어주기
  useEffect(() => {
    if (commentary === '문제만' || commentary === '문제+해설별도') {
      setItemHeights(itemQuestionHeightArray);
    }
  }, [commentary, itemQuestionHeightArray]);

  //commentary '정답만' 문항수 만큼 넣어주기
  useEffect(() => {
    if (itemAnswerHeight) {
      const sliceItemQuestion = itemAnswerHeight.slice(0, initialItems?.length);
      const array = sliceItemQuestion.map((item) => item[0]);
      setItemAnswerHeightArray(array);
      originalHeightsRef.current = array;
    }
  }, [itemAnswerHeight]);
  //commentary '정답만' 높이값 넣어주기
  useEffect(() => {
    if (commentary === '정답만') {
      setItemHeights(itemAnswerHeightArray);
    }
  }, [commentary, itemAnswerHeightArray]);

  //commentary '문제+해설같이' 문항수 만큼 넣어주기
  useEffect(() => {
    if (itemCommenteryHeight) {
      const sliceItemQuestion = itemCommenteryHeight.slice(
        0,
        initialItems?.length,
      );
      const array = sliceItemQuestion.map((item) => item[0]);
      setItemCommenteryHeightArray(array);
      originalHeightsRef.current = array;
    }
  }, [itemCommenteryHeight]);
  //commentary '문제+해설같이' 높이값 넣어주기
  useEffect(() => {
    if (commentary === '문제+해설같이') {
      setItemHeights(itemCommenteryHeightArray);
    }
  }, [commentary, itemCommenteryHeightArray]);

  const renderInputFields = () => {
    return (
      <>
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
            onChange={(e) => setNameValue(e.target.value)}
            maxLength={20}
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
              const filteredValue = e.target.value.replace(
                /[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣\s]/gi,
                '',
              );
              setContentAuthor(filteredValue);
            }}
            maxLength={10}
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
            onChange={(e) => setGradeValue(e.target.value)}
            maxLength={10}
          />
        </InputWrapper>
      </>
    );
  };

  const renderTagButtons = () => {
    const tags = [
      { value: 'EXERCISES', label: '연습문제' },
      { value: 'DAILY_TEST', label: '일일TEST' },
      { value: 'PRACTICE_TEST', label: '모의고사' },
      { value: 'TEST_PREP', label: '내신대비' },
      { value: 'MONTHLY_TEST', label: '월말TEST' },
    ];

    return tags.map((tagItem) => (
      <Button
        key={tagItem.value}
        buttonType="button"
        onClick={() => selectTag(tagItem.value)}
        $padding="5px"
        height={'35px'}
        width={'80px'}
        fontSize="14px"
        $normal={tag !== tagItem.value}
        $filled={tag === tagItem.value}
        cursor
      >
        <span>{tagItem.label}</span>
      </Button>
    ));
  };

  // 헬퍼 함수
  const getColorCode = (color: string) => {
    switch (color) {
      case 'red':
        return '#FA8978';
      case 'orange':
        return '#FFDD94';
      case 'green':
        return '#D0E6A5';
      case 'blue':
        return '#86aee3';
      case 'purple':
        return '#CCABD8';
      default:
        return '#000000';
    }
  };

  const renderColorOptions = () => {
    const colors = ['red', 'orange', 'green', 'blue', 'purple'];
    return colors.map((color) =>
      colorChoice === color ? (
        <FaCircleCheck
          key={color}
          color={getColorCode(color)}
          fontSize={20}
          style={{ cursor: 'pointer' }}
          onClick={() => setColorChoice('')}
        />
      ) : (
        <FaCircle
          key={color}
          color={getColorCode(color)}
          fontSize={20}
          style={{ cursor: 'pointer' }}
          onClick={() => setColorChoice(color)}
        />
      ),
    );
  };

  const renderTypeOptions = () => {
    return ['A', 'B'].map((type) => (
      <TypeOption key={type} onClick={() => selectTemplateType(type)}>
        <SlPicture color="gray" fontSize={40} />
        {type} Type
      </TypeOption>
    ));
  };

  const renderColumnOption = () => {
    return (
      <ColumnOption>
        <Label
          value="학습지 단*"
          fontSize="15px"
          width="120px"
          padding="5px 10px"
          flexEnd
        />
        <ButtonGroup>
          {['2단', '1단'].map((col) => (
            <Button
              key={col}
              buttonType="button"
              onClick={() => selectColumn(col)}
              $padding="5px"
              height={'35px'}
              width={'80px'}
              fontSize="14px"
              $normal={column !== col}
              $filled={column === col}
              cursor
            >
              <span>{col}</span>
            </Button>
          ))}
        </ButtonGroup>
      </ColumnOption>
    );
  };

  const renderContentQuantityOption = () => {
    const options = ['최대', '2문제', '4문제', '6문제'];
    return (
      <ContentQuantity>
        <Label
          value="학습지 배치*"
          fontSize="15px"
          width="120px"
          padding="5px 10px"
          flexEnd
        />
        <ButtonGroup>
          {options.map((option) => (
            <Button
              key={option}
              buttonType="button"
              onClick={() => selectContentQuantity(option)}
              $padding="5px"
              height={'35px'}
              width={'80px'}
              fontSize="14px"
              $normal={contentQuantity !== option}
              $filled={contentQuantity === option}
              cursor
            >
              <span>{option}</span>
            </Button>
          ))}
        </ButtonGroup>
      </ContentQuantity>
    );
  };

  const renderContentSpaceOption = () => {
    //선택한 문항 보기 정렬
    const selectSpace = [
      {
        idx: 0,
        name: '0줄',
        value: '0',
        options: Array.from({ length: 11 }, (_, i) => ({
          idx: i,
          name: `${i}줄`,
          value: `${i}`,
        })),
      },
    ];

    return (
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
            key={el.idx}
            width={'100px'}
            isnormalizedOptions
            defaultValue={el.name}
            options={el.options}
            heightScroll={'150px'}
            onSelect={(event) => selectListCategoryOption(event)}
          />
        ))}
      </ContentSpace>
    );
  };

  const renderAdditionalInfoOptions = () => {
    return (
      <>
        <Label
          value="추가 정보 표기"
          fontSize="14px"
          width="120px"
          padding="5px 10px"
          flexEnd
        />
        <CheckBoxWrapper onClick={() => selectDate()}>
          <CheckBox height="15px" isChecked={isDate} />
          날짜 표시
        </CheckBoxWrapper>
        <CheckBoxWrapper onClick={() => selectContentTypeTitle()}>
          <CheckBox height="15px" isChecked={isContentTypeTitle} />
          문항 유형명 표시
        </CheckBoxWrapper>
      </>
    );
  };

  const renderAnswerCommentaryButtons = () => {
    const options = ['문제만', '정답만', '문제+해설별도', '문제+해설같이'];
    return options.map((option) => (
      <Button
        key={option}
        buttonType="button"
        onClick={() => selectAnswerCommentary(option)}
        $padding="5px"
        height={'35px'}
        width={'80px'}
        fontSize="14px"
        $normal={answerCommentary !== option}
        $filled={answerCommentary === option}
        cursor
      >
        <span>{option}</span>
      </Button>
    ));
  };

  return (
    <Container>
      <AlertBar
        isCloseKor
        type="success"
        isAlertOpen={isSuccessAlertOpen}
        closeAlert={closeSuccessAlert}
        message={'학습지만들기가 완료되었습니다'}
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
          <InputGroup>{renderInputFields()}</InputGroup>
          <WorksheetNameWrapper>
            <Label
              value="학습지 태그*"
              fontSize="15px"
              width="120px"
              padding="5px 10px"
              flexEnd
            />
            <ButtonGroup>{renderTagButtons()}</ButtonGroup>
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
                <ColorOption>{renderColorOptions()}</ColorOption>
              </ColorBox>
              <TypeOptionWrapper>
                <TypeOptionWrapper>{renderTypeOptions()}</TypeOptionWrapper>
              </TypeOptionWrapper>
            </TemplateOption>
          </TemplateWrapper>
          <PositionOption>
            {renderColumnOption()}
            {renderContentQuantityOption()}
            {contentQuantity === '최대' && renderContentSpaceOption()}
          </PositionOption>
          <AddInformationWrapper>
            {renderAdditionalInfoOptions()}
          </AddInformationWrapper>
          <AnswerCommentaryWrapper>
            <Label
              value="정답 및 해설"
              fontSize="15px"
              width="120px"
              padding="5px 10px"
              flexEnd
            />
            <ButtonGroup>{renderAnswerCommentaryButtons()}</ButtonGroup>
          </AnswerCommentaryWrapper>
        </WorksheetSettingSection>

        <WorksheetTemplateViewSection>
          {templateType === 'A' && (
            <WorksheetTemplateTypeWrapper>
              <TypeA
                title={nameValue}
                grade={gradeValue}
                tag={tag}
                assign={contentQuantity}
                isDate={isDate}
                isContentTypeTitle={isContentTypeTitle}
                theme={selectedTheme}
                initialItems={initialItems}
                newInitialItems={newInitialItems}
                answerCommentary={answerCommentary as string}
                multiLevel={column}
                line={line}
              ></TypeA>
            </WorksheetTemplateTypeWrapper>
          )}
          {templateType === 'B' && (
            <WorksheetTemplateTypeWrapper>
              <TypeB
                title={nameValue}
                grade={gradeValue}
                tag={tag}
                assign={contentQuantity}
                isDate={isDate}
                isContentTypeTitle={isContentTypeTitle}
                theme={selectedTheme}
                initialItems={initialItems}
                newInitialItems={newInitialItems}
                answerCommentary={answerCommentary as string}
                multiLevel={column}
                line={line}
              ></TypeB>
            </WorksheetTemplateTypeWrapper>
          )}
        </WorksheetTemplateViewSection>
      </Wrapper>
      <CreateButtonWrapper>
        <Button
          buttonType="button"
          onClick={() => {
            submitCreateWorksheet();
          }}
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
`;
const ContentQuantity = styled.div`
  display: flex;
`;
const ContentSpace = styled.div`
  display: flex;
`;
const AddInformationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const CheckBoxWrapper = styled.div`
  display: flex;
  gap: 2px;
  padding-right: 10px;
  cursor: pointer;
`;
const WorksheetTemplateViewSection = styled.div`
  max-height: 760px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 55%;
  border: 1px solid ${COLOR.BORDER_POPUP};
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  gap: 10px;
`;
const WorksheetTemplateTypeWrapper = styled.div`
  max-height: 751px;
  overflow-y: auto;
`;
const CreateButtonWrapper = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
`;
