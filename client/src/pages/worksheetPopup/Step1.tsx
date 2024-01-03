import * as React from 'react';
import { useState, useEffect } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { Button, TabMenu } from '../../components';
import { COLOR } from '../../components/constants';
import {
  createWorksheetStep1BoolAtom,
  createWorksheetStep2BoolAtom,
} from '../../store/creatingWorksheetAtom';

import { Step2 } from './Step2';

export function Step1() {
  const menuList = [
    {
      label: '단원·유형별',
      value: '단원·유형별',
    },
    {
      label: '시중교재',
      value: '시중교재',
    },
    {
      label: '수능/모의고사',
      value: '수능/모의고사',
    },
  ];

  const [didMount, setDidMount] = useState(false);
  const setIsStep1 = useSetRecoilState(createWorksheetStep1BoolAtom);
  const [isStep2, setIsStep2] = useRecoilState(createWorksheetStep2BoolAtom);
  const [grade, setGrade] = useState('1');
  const [inputValue, setInputValue] = useState('');
  const [schoolLevel, setSchoolLevel] = useState<string | null>(null);
  const [schoolYear, setSchoolYear] = useState<string | null>(null);
  const [questionNum, setQuestionNum] = useState<string | null>(null);
  const [questionlevel, setQuestionlevel] = useState<string | null>(null);
  const [questionType, setQuestionType] = useState<string[]>([]);

  const [containMock, setContainMock] = useState<string | null>(null);

  const closePopup = () => {
    setIsStep1(false);
  };

  const moveStep2 = () => {
    setIsStep2(true);
    console.log('선택된 값으로 학습지 문항리스트() get 요청 API');
    console.log('가져온 값을 상태관리 한 후 다음 단계에 전달');
  };

  const selectGradeOption = (newValue: string) => {
    setGrade(newValue);
    setSchoolYear(null);
  };

  const selectSchoolLevel = (newValue: string) => {
    if (schoolLevel === newValue) {
      setSchoolLevel(null);
    } else {
      setSchoolLevel(newValue);
    }
  };

  const selectSchoolYear = (newValue: string) => {
    if (schoolYear === newValue) {
      setSchoolYear(null);
    } else {
      setSchoolYear(newValue);
    }
  };

  const selectQuestionNum = (newValue: string | null) => {
    setQuestionNum(newValue);
    setInputValue('');
  };

  const selectQuestionLevel = (newValue: string | null) => {
    setQuestionlevel(newValue);
  };

  const selectQuestionType = (newValue: string) => {
    setQuestionType((prev) => {
      if (prev.includes(newValue)) {
        // 이미 선택된 경우 선택 취소
        return prev.filter((type) => type !== newValue);
      } else {
        // 새로운 선택 추가
        return [...prev, newValue];
      }
    });
  };

  const isAllSelected =
    questionType.includes('객관식') &&
    questionType.includes('주관식') &&
    questionType.includes('서술형');

  const selectContainMock = (newValue: string | null) => {
    setContainMock(newValue);
  };

  const spreadTree = () => {
    console.log('선택된 Tree구조의 이름을 상태 관리');
  };

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      console.log('schoolLevel, schoolYear이 선택 됐을 때 범위 트리 get API');
    }
  }, [didMount, schoolLevel, schoolYear]);

  return (
    <Overlay>
      <Container>
        <TitleWrapper>
          <Title>
            <Span>STEP 1</Span> 학습지 종류 및 번위 선택
          </Title>
          <CloseIcon onClick={closePopup} sx={{ cursor: 'pointer' }} />
        </TitleWrapper>
        <Wrapper>
          <TreeveiwSection>
            <TabWrapper>
              <TabMenu
                length={3}
                menu={menuList}
                initialValue={'단원·유형별'}
                width={'350px'}
                lineStyle
              />
            </TabWrapper>
            <SchoolButtonGroup>
              <SelectorGroup>
                <Button
                  buttonType="button"
                  onClick={() => {
                    selectGradeOption('1');
                    selectSchoolLevel('1');
                  }}
                  $padding="10px"
                  height={'30px'}
                  width={'64px'}
                  fontSize="12px"
                  $border={schoolLevel !== '1'}
                >
                  <span>초</span>
                </Button>
                <Button
                  buttonType="button"
                  onClick={() => {
                    selectGradeOption('2');
                    selectSchoolLevel('2');
                  }}
                  $padding="10px"
                  height={'30px'}
                  width={'64px'}
                  fontSize="12px"
                  $border={schoolLevel !== '2'}
                >
                  <span>중</span>
                </Button>
                <Button
                  buttonType="button"
                  onClick={() => {
                    selectGradeOption('2');
                    selectSchoolLevel('3');
                  }}
                  $padding="10px"
                  height={'30px'}
                  width={'64px'}
                  fontSize="12px"
                  $border={schoolLevel !== '3'}
                >
                  <span>고</span>
                </Button>
              </SelectorGroup>
              <DivideBar>|</DivideBar>
              <SelectorGroup>
                {grade === '1' && (
                  <>
                    <Button
                      buttonType="button"
                      onClick={() => {
                        selectSchoolYear('1');
                      }}
                      $padding="10px"
                      height={'30px'}
                      width={'64px'}
                      fontSize="12px"
                      $border={schoolYear !== '1'}
                    >
                      <span>1학년</span>
                    </Button>
                    <Button
                      buttonType="button"
                      onClick={() => {
                        selectSchoolYear('2');
                      }}
                      $padding="10px"
                      height={'30px'}
                      width={'64px'}
                      fontSize="12px"
                      $border={schoolYear !== '2'}
                    >
                      <span>2학년</span>
                    </Button>
                    <Button
                      buttonType="button"
                      onClick={() => {
                        selectSchoolYear('3');
                      }}
                      $padding="10px"
                      height={'30px'}
                      width={'64px'}
                      fontSize="12px"
                      $border={schoolYear !== '3'}
                    >
                      <span>3학년</span>
                    </Button>
                    <Button
                      buttonType="button"
                      onClick={() => {
                        selectSchoolYear('4');
                      }}
                      $padding="10px"
                      height={'30px'}
                      width={'64px'}
                      fontSize="12px"
                      $border={schoolYear !== '4'}
                    >
                      <span>4학년</span>
                    </Button>
                    <Button
                      buttonType="button"
                      onClick={() => {
                        selectSchoolYear('5');
                      }}
                      $padding="10px"
                      height={'30px'}
                      width={'64px'}
                      fontSize="12px"
                      $border={schoolYear !== '5'}
                    >
                      <span>5학년</span>
                    </Button>
                    <Button
                      buttonType="button"
                      onClick={() => {
                        selectSchoolYear('6');
                      }}
                      $padding="10px"
                      height={'30px'}
                      width={'64px'}
                      fontSize="12px"
                      $border={schoolYear !== '6'}
                    >
                      <span>6학년</span>
                    </Button>
                  </>
                )}
                {grade === '2' && (
                  <>
                    <Button
                      buttonType="button"
                      onClick={() => {
                        selectSchoolYear('1');
                      }}
                      $padding="10px"
                      height={'30px'}
                      width={'64px'}
                      fontSize="12px"
                      $border={schoolYear !== '1'}
                    >
                      <span>1학년</span>
                    </Button>
                    <Button
                      buttonType="button"
                      onClick={() => {
                        selectSchoolYear('2');
                      }}
                      $padding="10px"
                      height={'30px'}
                      width={'64px'}
                      fontSize="12px"
                      $border={schoolYear !== '2'}
                    >
                      <span>2학년</span>
                    </Button>
                    <Button
                      buttonType="button"
                      onClick={() => {
                        selectSchoolYear('3');
                      }}
                      $padding="10px"
                      height={'30px'}
                      width={'64px'}
                      fontSize="12px"
                      $border={schoolYear !== '3'}
                    >
                      <span>3학년</span>
                    </Button>
                  </>
                )}
              </SelectorGroup>
            </SchoolButtonGroup>
            <TreeviewWrapper>
              <div>초등을 누르면 1~6학년까지의 트리가나옴</div>
              <div>중등을 누르면 1~3한년까지의 트리가 나옴</div>
              <div>고등을 누르면 1~3한년까지의 트리가 나옴</div>
              <div>학년을 선택하면 1학기 2학기의 트리가 나옴</div>
              <div>
                선택 해제했을 때 그에 맞는 트리를 보여주며 모든 선택 해제시
                초기화면 처럼 빈화면
              </div>
              <button onClick={spreadTree}>트리클릭</button>
            </TreeviewWrapper>
          </TreeveiwSection>
          <SchoolSelectorSection>
            <SubTitle>
              문항수 <TitleSpan>최대 100문항</TitleSpan>
            </SubTitle>
            <SelectorGroup>
              <SelectorWrapper>
                <Button
                  buttonType="button"
                  onClick={() => {
                    selectQuestionNum('25');
                  }}
                  $padding="10px"
                  height={'30px'}
                  width={'64px'}
                  fontSize="12px"
                  $border={questionNum !== '25'}
                >
                  <span>25</span>
                </Button>
                <Button
                  buttonType="button"
                  onClick={() => {
                    selectQuestionNum('50');
                  }}
                  $padding="10px"
                  height={'30px'}
                  width={'64px'}
                  fontSize="12px"
                  $border={questionNum !== '50'}
                >
                  <span>50</span>
                </Button>
                <Button
                  buttonType="button"
                  onClick={() => {
                    selectQuestionNum('100');
                  }}
                  $padding="10px 20px"
                  height={'30px'}
                  width={'64px'}
                  fontSize="12px"
                  $border={questionNum !== '100'}
                >
                  <span>100</span>
                </Button>
                <DivideBar>|</DivideBar>
                <NumberInput
                  value={inputValue}
                  maxLength={2}
                  onClick={() => selectQuestionNum('')}
                  style={{
                    color: questionNum === '' ? 'white' : `${COLOR.PRIMARY}`,
                    backgroundColor:
                      questionNum === '' ? `${COLOR.PRIMARY}` : 'white',
                  }}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                ></NumberInput>
                문항
              </SelectorWrapper>
            </SelectorGroup>
            <SubTitle>난이도</SubTitle>
            <SelectorGroup>
              <Button
                buttonType="button"
                onClick={() => {
                  selectQuestionLevel('하');
                }}
                $padding="10px"
                height={'30px'}
                width={'64px'}
                fontSize="12px"
                $border={questionlevel !== '하'}
              >
                <span>하</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectQuestionLevel('중하');
                }}
                $padding="10px"
                height={'30px'}
                width={'64px'}
                fontSize="12px"
                $border={questionlevel !== '중하'}
              >
                <span>중하</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectQuestionLevel('중');
                }}
                $padding="10px"
                height={'30px'}
                width={'64px'}
                fontSize="12px"
                $border={questionlevel !== '중'}
              >
                <span>중</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectQuestionLevel('상');
                }}
                $padding="10px"
                height={'30px'}
                width={'64px'}
                fontSize="12px"
                $border={questionlevel !== '상'}
              >
                <span>상</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectQuestionLevel('최상');
                }}
                $padding="10px"
                height={'30px'}
                width={'64px'}
                fontSize="12px"
                $border={questionlevel !== '최상'}
              >
                <span>최상</span>
              </Button>
            </SelectorGroup>
            <SubTitle>문항 타입</SubTitle>
            <SelectorGroup>
              <Button
                buttonType="button"
                onClick={() => {
                  if (isAllSelected) {
                    setQuestionType([]);
                  } else {
                    setQuestionType(['객관식', '주관식', '서술형']);
                  }
                }}
                $padding="10px 20px"
                height={'30px'}
                width={'82px'}
                fontSize="12px"
                $border={!isAllSelected}
              >
                <span>전체</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectQuestionType('객관식');
                }}
                $padding="10px 20px"
                height={'30px'}
                width={'81px'}
                fontSize="12px"
                $border={!questionType.includes('객관식')}
              >
                <span>객관식</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectQuestionType('주관식');
                }}
                $padding="10px 20px"
                height={'30px'}
                width={'81px'}
                fontSize="12px"
                $border={!questionType.includes('주관식')}
              >
                <span>주관식</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectQuestionType('서술형');
                }}
                $padding="10px 20px"
                height={'30px'}
                width={'81px'}
                fontSize="12px"
                $border={!questionType.includes('서술형')}
              >
                <span>서술형</span>
              </Button>
            </SelectorGroup>
            <SubTitle>모의고사 포함 여부</SubTitle>
            <SelectorGroup>
              <Button
                buttonType="button"
                onClick={() => {
                  selectContainMock('포함');
                }}
                $padding="10px 40px"
                height={'30px'}
                width={'110px'}
                fontSize="12px"
                $border={containMock !== '포함'}
              >
                <span>포함</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectContainMock('제외');
                }}
                $padding="10px 40px"
                height={'30px'}
                width={'110px'}
                fontSize="12px"
                $border={containMock !== '제외'}
              >
                <span>제외</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectContainMock('모의고사만');
                }}
                $padding="10px 20px"
                height={'30px'}
                width={'110px'}
                fontSize="12px"
                $border={containMock !== '모의고사만'}
              >
                <span>모의고사만</span>
              </Button>
            </SelectorGroup>
            <TBD></TBD>
            <Summary>학습지 문항수 {inputValue || questionNum}개</Summary>
          </SchoolSelectorSection>
        </Wrapper>
        <NextStepButtonWrapper>
          <Button
            buttonType="button"
            onClick={moveStep2}
            $padding="10px"
            height={'30px'}
            width={'80px'}
            fontSize="12px"
          >
            <span>다음 단계</span>
          </Button>
        </NextStepButtonWrapper>
      </Container>
      {isStep2 && <Step2 />}
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
const Container = styled.div`
  min-width: 1024px;
  width: 1080px;
  height: 780px;
  padding: 20px;
  border: 1px solid ${COLOR.BORDER_BLUE};
  background-color: white;
`;
const TitleWrapper = styled.div`
  padding: 20px 0px;
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  padding-left: 34px;
`;
const Span = styled.span`
  color: #1976d2;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 20px;
`;
const TreeveiwSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${COLOR.BORDER_POPUP};
  border-radius: 25px;
`;
const TabWrapper = styled.div`
  width: 100%;
  padding: 10px 0px;
  gap: 20px;
`;
const SchoolButtonGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 5px;
  border-top: 1px solid ${COLOR.BORDER_BLUE};
  border-bottom: 1px solid ${COLOR.BORDER_BLUE};
`;
const SelectorGroup = styled.div`
  display: flex;
  gap: 5px;
  //padding: 5px;
`;
const DivideBar = styled.div`
  color: ${COLOR.BORDER_BLUE};
  font-size: 25px;
`;
const TreeviewWrapper = styled.div`
  padding: 10px;
`;
const SchoolSelectorSection = styled.section`
  display: flex;
  flex-direction: column;
  border: 1px solid ${COLOR.BORDER_POPUP};
  padding: 10px;
  border-radius: 25px;
  gap: 10px;
`;
const SubTitle = styled.div`
  font-size: 14px;
`;
const TitleSpan = styled.span`
  font-size: 11px;
`;
const SelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
`;
const NumberInput = styled.input`
  width: 64px;
  height: 30px;
  border-radius: 5px;
  font-size: 12px;
  line-height: normal;
  border: 1px solid ${COLOR.PRIMARY};
  color: ${COLOR.PRIMARY};
  padding: 5px 15px;
  font-size: 12px;
  outline: none;
  text-align: center;
  cursor: pointer;
`;
const TBD = styled.div`
  height: 300px;
`;
const Summary = styled.div`
  font-size: 16px;
  margin: 0 auto;
`;
const NextStepButtonWrapper = styled.div`
  padding: 10px 0px;
  display: flex;
  justify-content: flex-end;
`;
