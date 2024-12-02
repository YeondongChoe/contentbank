import * as React from 'react';
import { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { IoSettingsOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import {
  DifficultyRate,
  openToastifyAlert,
  CheckBox,
  Button,
  Label,
  Input,
  Alert,
} from '../..';
import { quizService } from '../../../api/axios';
import { DifficultyDataType } from '../../../types/WorkbookType';
import { COLOR } from '../../constants';

type SelectSectionProps = {
  tabVeiw: string; //탭뷰
  //문항수
  questionNum: string | null;
  setQuestionNum: React.Dispatch<React.SetStateAction<string | null>>;
  //문항수 인풋
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  //문항난이도
  questionLevel: string | null;
  setQuestionLevel: React.Dispatch<React.SetStateAction<string | null>>;
  //문항타입
  questionType: string[] | null;
  setQuestionType: React.Dispatch<React.SetStateAction<string[] | null>>;
  //모의고사 포함여부
  containMock: number | null;
  setContainMock: React.Dispatch<React.SetStateAction<number | null>>;
  //배점
  equalScore: number | null;
  setEqualScore: React.Dispatch<React.SetStateAction<number | null>>;
  //추가옵션
  isQuizEven: boolean;
  setIsQuizEven: React.Dispatch<React.SetStateAction<boolean>>;
  isPriority: boolean;
  setIsPriority: React.Dispatch<React.SetStateAction<boolean>>;

  includeQuizList: string[]; //선택한 문항리스트
  categoryCount: number; //선택한 카테고리 수

  receivedQuizCount: number | null;
  setReceivedQuizCount: React.Dispatch<React.SetStateAction<number | null>>;
  isSelectTextbookContent?: boolean;
  isSelectPreviousExamContent?: boolean;
};

export function SelectSection({
  tabVeiw,
  questionNum,
  setQuestionNum,
  inputValue,
  setInputValue,
  questionLevel,
  setQuestionLevel,
  questionType,
  setQuestionType,
  containMock,
  setContainMock,
  equalScore,
  setEqualScore,
  isQuizEven,
  setIsQuizEven,
  isPriority,
  setIsPriority,
  includeQuizList,
  categoryCount,
  receivedQuizCount,
  setReceivedQuizCount,
  isSelectTextbookContent,
  isSelectPreviousExamContent,
}: SelectSectionProps) {
  const navigate = useNavigate();

  //문항 난이도 모달
  const [isDifficulty, setIsDifficulty] = useState(false);
  //문항 난이도
  const [difficultyData, setDifficultyData] = useState<DifficultyDataType[]>(
    [],
  );
  //배점 모달
  const [isEqualScoreModal, setIsEqualScoreModal] = useState<boolean>(false);
  // 문항당 배점
  const [isSaveEqualValue, setIsSaveEqualValue] = useState<boolean>(false);
  //총 배점
  const [equalTotalValue, setEqualTotlaValue] = useState('0');
  //문항당 배점
  const [quotient, setQuotient] = useState<number>(0);
  //나머지 배점
  const [remainder, setRemainder] = useState<number>();
  //문항당 최소배점
  const [minQuotient, setMinQuotient] = useState<number>();
  //문항당 최고배점
  const [maxQuotient, setMaxQuotient] = useState<number>();
  //나머지 시작 컨텐츠
  const [remainderContent, setRemainderContent] = useState<number>();
  //나머지 시작 전 컨텐츠
  const [nextRemainderContent, setNextRemainderContent] = useState<number>();
  //문항 재배점
  const [isResaveEqualValue, setIsResaveEqualValue] = useState(false);
  //최종 확인
  const [isConfirm, setIsConfirm] = useState(false);
  //알람 오픈
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  //입력하는 인풋 설정
  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // 정규표현식을 사용하여 숫자 이외의 문자 제거
    inputValue = inputValue.replace(/[^0-9]/g, '');

    const parsedValue = parseInt(inputValue, 10);
    if (tabVeiw === '시중교재' || tabVeiw === '기출') {
      if (!isNaN(parsedValue) && parsedValue > 0) {
        setInputValue(
          parsedValue < 1 ? '1' : parsedValue >= 5 ? '5' : inputValue,
        );
      }
    } else {
      if (!isNaN(parsedValue) && parsedValue > 0) {
        setInputValue(
          parsedValue < 1 ? '1' : parsedValue >= 100 ? '100' : inputValue,
        );
      }
    }
  };

  //문항수 설정 함수
  const selectQuestionNum = (newValue: string | null) => {
    setQuestionNum(newValue);
    setInputValue('');
  };

  //문항 난이도 설정함수
  const selectQuestionLevel = (newValue: string | null) => {
    setQuestionLevel(newValue);
  };

  //문항 타입 설정함수
  const selectQuestionType = (newValue: string | null) => {
    setQuestionType((prev) => {
      // prev가 null일 경우 빈 배열로 초기화
      const prevArray = prev ?? [];

      if (newValue === null) {
        return prevArray; // newValue가 null이면 변경하지 않음
      }

      if (prevArray.includes(newValue)) {
        // 이미 선택된 경우 선택 취소
        return prevArray.filter((type) => type !== newValue);
      } else {
        // 새로운 선택 추가
        return [...prevArray, newValue];
      }
    });
  };

  //문항 모의고사 포함 여부 설정 함수
  const selectContainMock = (newValue: number | null) => {
    setContainMock(newValue);
  };
  //문항 배점 설정 함수
  const selectEqualScore = (newValue: number | null) => {
    if (newValue === null) {
      setRemainderContent(0);
      setNextRemainderContent(0);
      setQuotient(0);
      setMinQuotient(0);
      setMaxQuotient(0);
    }
    setEqualScore(newValue);
  };

  //번호에 맞게 점수가 들어가면 문항당 배점 변경
  useEffect(() => {
    const parsedValue = parseInt(equalTotalValue, 10);
    const questionNumValue = parseInt(
      questionNum ||
        inputValue ||
        (includeQuizList.length as unknown as string),
      10,
    );

    if (isSaveEqualValue && receivedQuizCount) {
      const quotient = Math.floor(parsedValue / receivedQuizCount);
      const remainder = parsedValue % receivedQuizCount;
      setQuotient(quotient);
      setRemainder(remainder);
      if (quotient || remainder) {
        const remainderContent = receivedQuizCount - remainder;
        const minQuotient = quotient - 1;
        const maxQuotient = quotient + 1;
        setRemainderContent(remainderContent);
        setNextRemainderContent(remainderContent + 1);
        setMinQuotient(minQuotient <= 0 ? 1 : minQuotient);
        setMaxQuotient(maxQuotient);
      }
    } else if (isSaveEqualValue && !receivedQuizCount) {
      const quotient = Math.floor(parsedValue / questionNumValue);
      const remainder = parsedValue % questionNumValue;
      setQuotient(quotient);
      setRemainder(remainder);
      if (quotient || remainder) {
        const remainderContent = questionNumValue - remainder;
        const minQuotient = quotient - 1;
        const maxQuotient = quotient + 1;
        setRemainderContent(remainderContent);
        setNextRemainderContent(remainderContent + 1);
        setMinQuotient(minQuotient <= 0 ? 1 : minQuotient);
        setMaxQuotient(maxQuotient);
      }
    }
  }, [isSaveEqualValue, equalTotalValue, receivedQuizCount]);

  //배점 로컬스토리지 저장
  const saveLocalQutientData = () => {
    const sendQuotientData = {
      equalScore: equalScore,
      equalTotalValue: equalTotalValue,
      remainderContent: remainderContent,
      quotient: quotient,
      nextRemainderContent: nextRemainderContent,
      minQuotient: minQuotient,
      maxQuotient: maxQuotient,
    };
    if (equalScore === 2) {
      localStorage.setItem(
        'sendQuotientData',
        JSON.stringify(sendQuotientData),
      );
    }
  };

  //균등배점 저장
  const saveEqualScoreSettingModal = () => {
    if (isSaveEqualValue) {
      //재균등배점
      if (isResaveEqualValue) {
        setIsConfirm(true);
        closeEqualScoreSettingModal();
        //로컬에 배점 저장하기
        saveLocalQutientData();
      } else {
        closeEqualScoreSettingModal();
        saveLocalQutientData();
      }
    } else {
      if (equalTotalValue) {
        openToastifyAlert({
          type: 'error',
          text: '저장을 눌러주세요.',
        });
      } else {
        openToastifyAlert({
          type: 'error',
          text: '배점을 입력해주세요.',
        });
      }
    }
  };
  // 균등배점 모달 닫기
  const closeEqualScoreSettingModal = () => {
    setIsEqualScoreModal(false);
  };

  //균등배점 취소
  const cancelEqualScoreSettingModal = () => {
    closeEqualScoreSettingModal();
    setEqualScore(null);
    setEqualTotlaValue('0');
    setRemainderContent(0);
    setNextRemainderContent(0);
    setQuotient(0);
    setMinQuotient(0);
    setMaxQuotient(0);
  };

  //alert 취소클릭
  const cancelAlert = () => {
    //alert 끄기
    setIsAlertOpen(false);
    //선택된 값 초기화
    setQuestionNum('');
    selectEqualScore(null);
    setQuestionLevel(null);
    setQuestionType([]);
    setContainMock(null);
    setIsQuizEven(false);
    setIsPriority(false);
    setReceivedQuizCount(null);
    setRemainderContent(0);
    setNextRemainderContent(0);
    setQuotient(0);
    setMinQuotient(0);
    setMaxQuotient(0);
    setEqualTotlaValue('');
  };

  //alert 진행클릭
  const keepGoingAlert = () => {
    //난이도 설정 다시 열기
    if (equalScore === 2) {
      setIsEqualScoreModal(true);
      setIsAlertOpen(false);
      setIsResaveEqualValue(true);
      setIsSaveEqualValue(false);
    } else {
      navigate('/content-create/exam/step2');
    }
  };

  useEffect(() => {
    if (isConfirm) {
      navigate('/content-create/exam/step2');
    }
  }, [isConfirm]);

  //난이도 비율 받아오는 함수
  const getDifficulty = async () => {
    const res = await quizService.get(`/v1/difficulty`);
    return res;
  };
  const { data: difficultyRate } = useQuery({
    queryKey: ['get-difficultyDetail'],
    queryFn: getDifficulty,
    meta: {
      errorMessage: 'get-difficultyDetail 에러 메세지',
    },
    //enabled: !!selectedTextbookIdx,
  });

  useEffect(() => {
    setDifficultyData(difficultyRate?.data.data.difficultyList);
  }, [difficultyRate]);

  const openDifficultySetting = () => {
    setIsDifficulty(true);
  };
  const closeDifficultySetting = () => {
    setIsDifficulty(false);
  };

  const openEqualScoreSettingModal = () => {
    if (questionNum || inputValue || includeQuizList.length > 0) {
      setIsEqualScoreModal(true);
      setIsSaveEqualValue(false);
    } else {
      openToastifyAlert({
        type: 'error',
        text: '문항을 먼저 선택해주세요',
      });
      selectEqualScore(null);
      setIsSaveEqualValue(false);
    }
  };
  //배점 인풋 설정 함수
  const changeEqualInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let equalTotalValue = e.target.value;
    // 정규표현식을 사용하여 숫자 이외의 문자 제거
    equalTotalValue = equalTotalValue.replace(/[^0-9]/g, '');

    const parsedValue = parseInt(equalTotalValue, 10);

    setEqualTotlaValue(parsedValue >= 200 ? '200' : equalTotalValue);
  };

  //배점 저장 함수
  const saveEqualInputValue = () => {
    //받아온 문항 수 넘버타입 변경
    const parsedreceivedQuiz = receivedQuizCount?.toString();
    //받아온 문항 수 넘버타입 변경
    const parsedreceivedQuizValue = parseInt(parsedreceivedQuiz as string, 10);
    //총배점 타입 변경
    const parsedValue = parseInt(equalTotalValue, 10);

    //선택된 문항 수
    const questionNumValue =
      tabVeiw === '시중교재' || tabVeiw === '기출'
        ? questionNum
          ? parseInt(questionNum, 10) * includeQuizList.length
          : inputValue
            ? parseInt(inputValue, 10) * includeQuizList.length
            : 0
        : parseInt(
            questionNum ||
              inputValue ||
              (includeQuizList.length as unknown as string),
            10,
          );

    if (equalTotalValue === '') {
      openToastifyAlert({
        type: 'error',
        text: '총 배점을 입력해주세요.',
      });
      setIsSaveEqualValue(false);
      setEqualTotlaValue('0');
      setQuotient(0);
    } else if (
      !receivedQuizCount &&
      !parsedreceivedQuizValue &&
      equalTotalValue &&
      parsedValue < questionNumValue
    ) {
      openToastifyAlert({
        type: 'error',
        text: '총 배점은 총 문항수보다 크거나 같아야합니다.',
      });
      setEqualTotlaValue(questionNumValue.toString());
      setIsSaveEqualValue(false);
    } else if (equalTotalValue && parsedValue < parsedreceivedQuizValue) {
      openToastifyAlert({
        type: 'error',
        text: '총 배점은 총 문항수보다 크거나 같아야합니다.',
      });
      if (receivedQuizCount) {
        setEqualTotlaValue(receivedQuizCount.toString());
      }
      setIsSaveEqualValue(false);
    } else {
      openToastifyAlert({
        type: 'success',
        text: '저장되었습니다.',
      });
      setEqualTotlaValue(equalTotalValue);
      setIsSaveEqualValue(true);
    }
  };

  //문항수 균등 배분 설정 함수
  const selectQuizEven = () => {
    setIsQuizEven(!isQuizEven);
  };
  //내 문항 우선 추천 설정 함수
  const selectPriority = () => {
    setIsPriority(!isPriority);
  };

  const renderQuestionButtons = () => {
    const buttonOption = [
      { value: '25', label: '25' },
      { value: '50', label: '50' },
      { value: '100', label: '100' },
    ];
    const buttonOption1 = [
      { value: '1', label: '1' },
      { value: '3', label: '3' },
      { value: '5', label: '5' },
    ];

    return (
      <>
        {tabVeiw === '단원·유형별' && (
          <>
            {buttonOption.map((button) => (
              <Button
                key={button.value}
                onClick={() => selectQuestionNum(button.value)}
                $padding="10px"
                height={'34px'}
                width={'100px'}
                fontSize="14px"
                $normal={questionNum !== button.value}
                $filled={questionNum === button.value}
                cursor
              >
                <span>{button.label}</span>
              </Button>
            ))}
          </>
        )}
        {(tabVeiw === '시중교재' || tabVeiw === '기출') && (
          <>
            {buttonOption1.map((button) => (
              <Button
                key={button.value}
                onClick={() => selectQuestionNum(button.value)}
                $padding="10px"
                height={'34px'}
                width={'100px'}
                fontSize="14px"
                $normal={questionNum !== button.value}
                $filled={questionNum === button.value}
                cursor
              >
                <span>{button.label}</span>
              </Button>
            ))}
          </>
        )}
        <DivideBar>|</DivideBar>
        <NumberInputWrapper>
          <NumberInput
            value={inputValue}
            maxLength={3}
            onClick={() => selectQuestionNum(null)}
            style={{
              color: questionNum === null ? 'white' : `${COLOR.PRIMARY}`,
              backgroundColor:
                questionNum === null ? `${COLOR.PRIMARY}` : 'white',
            }}
            onChange={(e) => {
              changeInputValue(e);
            }}
          ></NumberInput>
          문항
        </NumberInputWrapper>
      </>
    );
  };

  const renderDifficultyButtons = () => {
    const buttonOption = [
      { value: '선택안함', label: '선택안함' },
      { value: 'LOWER', label: '하' },
      { value: 'INTERMEDIATE', label: '중하' },
      { value: 'MEDIUM', label: '중' },
      { value: 'UPPER', label: '상' },
      { value: 'BEST', label: '최상' },
    ];

    return buttonOption.map((button) => (
      <Button
        key={button.value}
        buttonType="button"
        onClick={() => {
          selectQuestionLevel(button.value);
        }}
        $padding="10px"
        height={'34px'}
        width={'100%'}
        fontSize="13px"
        $normal={questionLevel !== button.value}
        $filled={questionLevel === button.value}
        cursor
      >
        <span>{button.label}</span>
      </Button>
    ));
  };

  const renderTypeButtons = () => {
    const isAllSelectedQuestionType =
      questionType?.includes('MULTIPLE_CHOICE') &&
      questionType?.includes('SHORT_ANSWER') &&
      questionType?.includes('ESSAY_ANSWER');

    const buttonOption = [
      { value: 'MULTIPLE_CHOICE', label: '객관식' },
      { value: 'SHORT_ANSWER', label: '주관식' },
      { value: 'ESSAY_ANSWER', label: '서술형' },
    ];

    return (
      <>
        <Button
          buttonType="button"
          onClick={() => {
            if (isAllSelectedQuestionType) {
              setQuestionType([]);
            } else {
              setQuestionType([
                'MULTIPLE_CHOICE',
                'SHORT_ANSWER',
                'ESSAY_ANSWER',
              ]);
            }
          }}
          $padding="10px"
          height={'34px'}
          width={'100%'}
          fontSize="14px"
          $normal={!isAllSelectedQuestionType}
          $filled={isAllSelectedQuestionType}
          cursor
        >
          <span>전체</span>
        </Button>
        {buttonOption.map((button) => (
          <Button
            key={button.value}
            buttonType="button"
            onClick={() => selectQuestionType(button.value)}
            $padding="10px"
            height={'34px'}
            width={'100%'}
            fontSize="14px"
            $normal={!questionType?.includes(button.value)}
            $filled={questionType?.includes(button.value)}
            cursor
          >
            <span>{button.label}</span>
          </Button>
        ))}
      </>
    );
  };
  const renderMockButtons = () => {
    const buttonOption = [
      { value: 1, label: '포함' },
      { value: 2, label: '제외' },
      { value: 3, label: '모의고사만' },
    ];

    return buttonOption.map((button) => (
      <Button
        key={button.value}
        buttonType="button"
        onClick={() => selectContainMock(button.value)}
        $padding="10px"
        height={'34px'}
        width={'100%'}
        fontSize="14px"
        $normal={containMock !== button.value}
        $filled={containMock === button.value}
      >
        <span>{button.label}</span>
      </Button>
    ));
  };

  const renderScoreButtons = () => {
    const buttonOption = [
      { value: 1, label: '선택안함' },
      { value: 2, label: '균등 배점' },
    ];

    return buttonOption.map((button) => (
      <Button
        key={button.value}
        buttonType="button"
        onClick={() => {
          selectEqualScore(button.value);
          if (button.value === 2) {
            openEqualScoreSettingModal();
          }
        }}
        $padding="10px"
        height={'34px'}
        width={'100%'}
        fontSize="14px"
        $normal={equalScore !== button.value}
        $filled={equalScore === button.value}
      >
        <span>{button.label}</span>
      </Button>
    ));
  };

  const renderAdditionOption = () => {
    const buttonOption = [
      { value: 1, label: '문항 수 균등 배분' },
      { value: 2, label: '내 문항 우선 추천' },
    ];

    const handleOptionClick = (value: number) => {
      if (value === 1) {
        selectQuizEven();
      } else if (value === 2) {
        selectPriority();
      }
    };

    return buttonOption.map((button) => (
      <AdditionOption key={button.value}>
        <CheckBox
          $margin={`0 0 5px 0`}
          isChecked={button.value === 1 ? isQuizEven : isPriority}
          onClick={() => handleOptionClick(button.value)}
        ></CheckBox>
        <Label
          onClick={() => handleOptionClick(button.value)}
          value={button.label}
          fontSize="16px"
          width="140px"
          cursor
        />
      </AdditionOption>
    ));
  };
  return (
    <>
      <SchoolSelectorSection
        $tabVeiw={tabVeiw}
        $isSelectTextbookContent={isSelectTextbookContent}
        $isSelectPreviousExamContent={isSelectPreviousExamContent}
      >
        <SubTitleWrapper>
          <Label value="*문항수" fontSize="16px" width="60px" />
          <Label value="최대 100문항" fontSize="12px" width="440px" />
        </SubTitleWrapper>
        <SelectorGroup>{renderQuestionButtons()}</SelectorGroup>
        <SubTitleWrapper>
          <Label value="*난이도" fontSize="16px" width="200px" />
          <AdditionOption onClick={openDifficultySetting}>
            <IoSettingsOutline />
            난이도 설정
          </AdditionOption>
        </SubTitleWrapper>
        <SelectorGroup>{renderDifficultyButtons()}</SelectorGroup>
        <SubTitleWrapper>
          <Label value="*문항 타입" fontSize="16px" width="200px" />
          {/* <AdditionOption>
            자동 체점
            <CheckBox
              width="16"
              height="16"
              isChecked={isAutoGrading}
              onClick={checkAutoGrading}
            />
          </AdditionOption> */}
        </SubTitleWrapper>
        <SelectorGroup>{renderTypeButtons()}</SelectorGroup>
        <Label value="*모의고사 포함 여부" fontSize="16px" width="200px" />
        <SelectorGroup>{renderMockButtons()}</SelectorGroup>
        <Label value="*배점" fontSize="16px" width="200px" />
        <SelectorGroup>{renderScoreButtons()}</SelectorGroup>
        <AdditionOptionList>
          <Label value="추가 옵션" fontSize="16px" width="200px" />
          {renderAdditionOption()}
        </AdditionOptionList>
        <Summary>
          학습지 문항수 {inputValue || questionNum} 개 | 유형
          {categoryCount}개
        </Summary>
      </SchoolSelectorSection>
      <Alert
        top="calc(50% - 100px)"
        isAlertOpen={isAlertOpen}
        description={`가지고 올 수 있는 문항의 수가 ${receivedQuizCount}개 입니다.`}
        subDescription={
          equalScore === 2
            ? '이대로 진행할 경우 균등 배점을 다시 설정해야합니다.'
            : '이대로 진행하시겠습니까?'
        }
        action="진행"
        isWarning={true}
        onClick={keepGoingAlert}
        onClose={cancelAlert}
      />
      {isDifficulty && (
        <Overlay>
          <DifficultyRate
            onClose={closeDifficultySetting}
            difficultyData={difficultyData}
            setDifficultyData={setDifficultyData}
          />
        </Overlay>
      )}
      {isEqualScoreModal && (
        <Overlay>
          <EqualScoreModalContainer>
            <EqualScoreModalWrapper>
              <EqualScoreModalTitleWrapper>
                <Label
                  value={`총 ${receivedQuizCount ? receivedQuizCount : tabVeiw === '시중교재' || tabVeiw === '기출' ? Number(questionNum) * Number(includeQuizList.length) || Number(inputValue) * Number(includeQuizList.length) : questionNum || inputValue || includeQuizList.length} 문항`}
                  fontSize="25px"
                  width="160px"
                />
                <EqualScoreModalOptionWrapper>
                  <Label value="총 배점" fontSize="25px" width="89px" />
                  <Input
                    width="50px"
                    height="34px"
                    border="black"
                    placeholderSize="16px"
                    padding="10px"
                    fontSize="16px"
                    type="text"
                    value={equalTotalValue}
                    maxLength={10}
                    minLength={2}
                    onClick={() => {
                      setEqualTotlaValue('');
                      setIsSaveEqualValue(false);
                      setRemainderContent(0);
                      setNextRemainderContent(0);
                    }}
                    onChange={(e) => {
                      changeEqualInputValue(e);
                    }}
                  ></Input>
                  <Button
                    buttonType="button"
                    onClick={saveEqualInputValue}
                    $padding="10px"
                    height={'34px'}
                    width={'100px'}
                    fontSize="13px"
                    $filled
                    cursor
                  >
                    <span>저장</span>
                  </Button>
                </EqualScoreModalOptionWrapper>
              </EqualScoreModalTitleWrapper>
              <EqualScoreModalScript>
                {remainder === 0 || (remainder === null && isSaveEqualValue) ? (
                  <>
                    {/* 나머지가 없는경우 */}
                    <div>
                      01번 문항부터
                      {receivedQuizCount
                        ? receivedQuizCount
                        : questionNum || inputValue || includeQuizList.length}
                      번 문항까지
                      {quotient || 0}점
                    </div>
                    {isSaveEqualValue ? (
                      <div className="pointsPerQuestion">
                        문항당 배점 {minQuotient}점 ~ {quotient + 1}점
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <>
                    {/* 나머지가 있는경우 */}
                    <div>
                      01번 문항부터
                      {remainderContent}번 문항까지 {quotient || 0}점
                    </div>
                    <div>
                      {nextRemainderContent}번 문항부터
                      {receivedQuizCount
                        ? receivedQuizCount
                        : questionNum || inputValue || includeQuizList.length}
                      번 문항까지 {quotient + 1 || 0}점
                    </div>
                    {isSaveEqualValue ? (
                      <div className="pointsPerQuestion">
                        문항당 배점 {minQuotient}점 ~ {maxQuotient}점
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </EqualScoreModalScript>
              <EqualScoreModalButtonWrapper>
                <Button
                  buttonType="button"
                  onClick={cancelEqualScoreSettingModal}
                  $padding="10px"
                  height={'100%'}
                  width={'100%'}
                  fontSize="13px"
                  $normal
                  cursor
                >
                  <span>취소</span>
                </Button>
                <Button
                  buttonType="button"
                  onClick={saveEqualScoreSettingModal}
                  $padding="10px"
                  height={'100%'}
                  width={'100%'}
                  fontSize="13px"
                  $filled
                  cursor
                >
                  <span>확인</span>
                </Button>
              </EqualScoreModalButtonWrapper>
            </EqualScoreModalWrapper>
          </EqualScoreModalContainer>
        </Overlay>
      )}
    </>
  );
}

const SchoolSelectorSection = styled.div<{
  $isSelectTextbookContent?: boolean;
  $isSelectPreviousExamContent?: boolean;
  $tabVeiw?: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${COLOR.BORDER_POPUP};
  padding: 20px;
  border-radius: 25px;
  flex: 1 0 0;
  ${({ $isSelectTextbookContent, $tabVeiw }) =>
    !$isSelectTextbookContent &&
    $tabVeiw === '시중교재' &&
    'pointer-events: none; opacity: 0.5;'}
  ${({ $isSelectPreviousExamContent, $tabVeiw }) =>
    !$isSelectPreviousExamContent &&
    $tabVeiw === '기출' &&
    'pointer-events: none; opacity: 0.5;'}
`;
const SubTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 14px;
`;
const SelectorGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
`;
const DivideBar = styled.div`
  color: ${COLOR.BORDER_BLUE};
  font-size: 25px;
`;
const NumberInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
`;
const NumberInput = styled.input`
  width: 100px;
  height: 34px;
  border-radius: 5px;
  line-height: normal;
  border: 1px solid ${COLOR.PRIMARY};
  color: ${COLOR.PRIMARY};
  padding: 5px 15px;
  font-size: 14px;
  outline: none;
  text-align: center;
  cursor: pointer;
`;
const AdditionOptionList = styled.li`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 20px;
`;
const AdditionOption = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 10px;
  cursor: pointer;
`;
const Summary = styled.div`
  font-size: 20px;
  display: flex;
  margin: 0 auto;
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
//균등 배점 모달
const EqualScoreModalContainer = styled.div`
  width: 800px;
  height: 400px;
  background-color: white;
  border: 1px solid ${COLOR.BORDER_GRAY};
  border-radius: 10px;
  padding: 10px;
`;
const EqualScoreModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const EqualScoreModalTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 10px;
`;
const EqualScoreModalOptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const EqualScoreModalScript = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  div {
    font-size: 20px;
  }
  .pointsPerQuestion {
    padding-top: 20px;
  }
`;
const EqualScoreModalButtonWrapper = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: center;
  gap: 10px;
  padding-top: 10px;
`;
