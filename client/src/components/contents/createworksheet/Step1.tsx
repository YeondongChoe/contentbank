import * as React from 'react';
import { useState, useEffect } from 'react';

import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { CheckBox, Button, TabMenu } from '../..';
import { COLOR } from '../../constants';
// import {
//   createWorksheetStep1BoolAtom,
//   createWorksheetStep2BoolAtom,
// } from '../../store/creatingWorksheetAtom';

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

  // const location = useLocation();
  const navigate = useNavigate();

  const [didMount, setDidMount] = useState(false);
  // const setIsStep1 = useSetRecoilState(createWorksheetStep1BoolAtom);
  // const [isStep2, setIsStep2] = useRecoilState(createWorksheetStep2BoolAtom);
  const [grade, setGrade] = useState('1');
  const [inputValue, setInputValue] = useState('');
  const [schoolLevel, setSchoolLevel] = useState<string | null>(null);
  const [schoolYear, setSchoolYear] = useState<string | null>(null);
  const [questionNum, setQuestionNum] = useState<string | null>(null);
  const [questionlevel, setQuestionlevel] = useState<string | null>(null);
  const [questionType, setQuestionType] = useState<string[]>([]);

  const [containMock, setContainMock] = useState<string | null>(null);

  const closePopup = () => {
    // setIsStep1(false);
    navigate('/content-create/exam');
  };

  const moveStep2 = () => {
    // setIsStep2(true);
    navigate('/content-create/exam/step2');
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

  const [isOption1, setIsOption1] = useState(false);
  const selectOption1 = () => {
    setIsOption1(!isOption1);
  };
  const [isOption2, setIsOption2] = useState(false);
  const selectOption2 = () => {
    setIsOption2(!isOption2);
  };
  const [isOption3, setIsOption3] = useState(false);
  const selectOption3 = () => {
    setIsOption3(!isOption3);
  };
  const [isOption4, setIsOption4] = useState(false);
  const selectOption4 = () => {
    setIsOption4(!isOption4);
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
    <Container>
      <TitleWrapper>
        <Title>
          <Span>STEP 1</Span> 학습지 종류 및 번위 선택
        </Title>
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
          <TreeviewWrapper></TreeviewWrapper>
        </TreeveiwSection>
        <SchoolSelectorSection>
          <SubTitle>
            *문항수 <TitleSpan>최대 100문항</TitleSpan>
          </SubTitle>
          <SelectorGroup>
            <SelectorWrapper>
              <Button
                buttonType="button"
                onClick={() => {
                  selectQuestionNum('25');
                }}
                $padding="10px"
                height={'34px'}
                width={'90px'}
                fontSize="14px"
                $normal={questionNum !== '25'}
                $filled={questionNum === '25'}
                cursor
              >
                <span>25</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectQuestionNum('50');
                }}
                $padding="10px"
                height={'34px'}
                width={'90px'}
                fontSize="14px"
                $normal={questionNum !== '50'}
                $filled={questionNum === '50'}
                cursor
              >
                <span>50</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectQuestionNum('100');
                }}
                $padding="10px"
                height={'34px'}
                width={'90px'}
                fontSize="14px"
                $normal={questionNum !== '100'}
                $filled={questionNum === '100'}
                cursor
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
          <SubTitle>*난이도</SubTitle>
          <SelectorGroup>
            <Button
              buttonType="button"
              onClick={() => {
                selectQuestionLevel('하');
              }}
              $padding="10px"
              height={'34px'}
              width={'90px'}
              fontSize="14px"
              $normal={questionlevel !== '하'}
              $filled={questionlevel === '하'}
              cursor
            >
              <span>하</span>
            </Button>
            <Button
              buttonType="button"
              onClick={() => {
                selectQuestionLevel('중하');
              }}
              $padding="10px"
              height={'34px'}
              width={'90px'}
              fontSize="14px"
              $normal={questionlevel !== '중하'}
              $filled={questionlevel === '중하'}
              cursor
            >
              <span>중하</span>
            </Button>
            <Button
              buttonType="button"
              onClick={() => {
                selectQuestionLevel('중');
              }}
              $padding="10px"
              height={'34px'}
              width={'90px'}
              fontSize="14px"
              $normal={questionlevel !== '중'}
              $filled={questionlevel === '중'}
              cursor
            >
              <span>중</span>
            </Button>
            <Button
              buttonType="button"
              onClick={() => {
                selectQuestionLevel('상');
              }}
              $padding="10px"
              height={'34px'}
              width={'90px'}
              fontSize="14px"
              $normal={questionlevel !== '상'}
              $filled={questionlevel === '상'}
              cursor
            >
              <span>상</span>
            </Button>
            <Button
              buttonType="button"
              onClick={() => {
                selectQuestionLevel('최상');
              }}
              $padding="10px"
              height={'34px'}
              width={'90px'}
              fontSize="14px"
              $normal={questionlevel !== '최상'}
              $filled={questionlevel === '최상'}
              cursor
            >
              <span>최상</span>
            </Button>
          </SelectorGroup>
          <SubTitle>*문항 타입</SubTitle>
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
              $padding="10px"
              height={'34px'}
              width={'90px'}
              fontSize="14px"
              $normal={!isAllSelected}
              $filled={isAllSelected}
              cursor
            >
              <span>전체</span>
            </Button>
            <Button
              buttonType="button"
              onClick={() => {
                selectQuestionType('객관식');
              }}
              $padding="10px"
              height={'34px'}
              width={'90px'}
              fontSize="14px"
              $normal={!questionType.includes('객관식')}
              $filled={questionType.includes('객관식')}
              cursor
            >
              <span>객관식</span>
            </Button>
            <Button
              buttonType="button"
              onClick={() => {
                selectQuestionType('주관식');
              }}
              $padding="10px"
              height={'34px'}
              width={'90px'}
              fontSize="14px"
              $normal={!questionType.includes('주관식')}
              $filled={questionType.includes('주관식')}
              cursor
            >
              <span>주관식</span>
            </Button>
            <Button
              buttonType="button"
              onClick={() => {
                selectQuestionType('서술형');
              }}
              $padding="10px"
              height={'34px'}
              width={'90px'}
              fontSize="14px"
              $normal={!questionType.includes('서술형')}
              $filled={questionType.includes('서술형')}
              cursor
            >
              <span>서술형</span>
            </Button>
          </SelectorGroup>
          <SubTitle>*모의고사 포함 여부</SubTitle>
          <SelectorGroup>
            <Button
              buttonType="button"
              onClick={() => {
                selectContainMock('포함');
              }}
              $padding="10px"
              height={'34px'}
              width={'90px'}
              fontSize="14px"
              $normal={containMock !== '포함'}
              $filled={containMock === '포함'}
              cursor
            >
              <span>포함</span>
            </Button>
            <Button
              buttonType="button"
              onClick={() => {
                selectContainMock('제외');
              }}
              $padding="10px"
              height={'34px'}
              width={'90px'}
              fontSize="14px"
              $normal={containMock !== '제외'}
              $filled={containMock === '제외'}
              cursor
            >
              <span>제외</span>
            </Button>
            <Button
              buttonType="button"
              onClick={() => {
                selectContainMock('모의고사만');
              }}
              $padding="10px"
              height={'34px'}
              width={'120px'}
              fontSize="14px"
              $normal={containMock !== '모의고사만'}
              $filled={containMock === '모의고사만'}
              cursor
            >
              <span>모의고사만</span>
            </Button>
          </SelectorGroup>
          <SubTitle>추가 옵션</SubTitle>

          <AdditionOptionList>
            <AdditionOption>
              <CheckBox
                isChecked={isOption1}
                onClick={selectOption1}
              ></CheckBox>
              기존 출제 문항 제외
            </AdditionOption>
            <AdditionOption>
              <CheckBox
                isChecked={isOption2}
                onClick={selectOption2}
              ></CheckBox>
              교육 과정 외 유형 제외
            </AdditionOption>
            <AdditionOption>
              <CheckBox
                isChecked={isOption3}
                onClick={selectOption3}
              ></CheckBox>
              문항 수 균등 배분
            </AdditionOption>
            <AdditionOption>
              <CheckBox
                isChecked={isOption4}
                onClick={selectOption4}
              ></CheckBox>
              내 문항 우선 추천
            </AdditionOption>
          </AdditionOptionList>

          <TBD></TBD>
          <Summary>
            학습지 문항수 {inputValue || questionNum} 개 | 유형 3개
          </Summary>
        </SchoolSelectorSection>
      </Wrapper>
      <NextStepButtonWrapper>
        <Button
          buttonType="button"
          onClick={moveStep2}
          $padding="10px"
          height={'35px'}
          width={'100px'}
          fontSize="13px"
          $filled
          cursor
        >
          <span>다음 단계</span>
        </Button>
      </NextStepButtonWrapper>
    </Container>
  );
}

const Container = styled.div``;
const TitleWrapper = styled.div`
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  font-size: 30px;
  //padding-left: 34px;
`;
const Span = styled.span`
  color: #1976d2;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 20px;
`;
const TreeveiwSection = styled.section`
  min-height: 770px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${COLOR.BORDER_POPUP};
  border-radius: 25px;
  flex: 1 0 60%;
`;
const TabWrapper = styled.div`
  width: 100%;
  padding: 10px 0px;
`;
const SelectorGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding-bottom: 20px;
`;
const DivideBar = styled.div`
  color: ${COLOR.BORDER_BLUE};
  font-size: 25px;
`;
const TreeviewWrapper = styled.div`
  width: 100%;
  border-top: 1px solid ${COLOR.BORDER_BLUE};
  padding: 10px;
`;
const SchoolSelectorSection = styled.section`
  display: flex;
  flex-direction: column;
  border: 1px solid ${COLOR.BORDER_POPUP};
  padding: 20px;
  border-radius: 25px;
  flex: 1 0 30%;
`;
const SubTitle = styled.div`
  font-size: 16px;
  padding-bottom: 10px;
`;
const TitleSpan = styled.span`
  font-size: 12px;
`;
const SelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  span {
    &::after {
      content: '';
      display: block;
      position: absolute;
      right: 0px;
      width: 1px;
      height: 10px;
      background-color: ${COLOR.SECONDARY};
    }
    &:last-child {
      &::after {
        display: none;
      }
    }
  }
`;
const NumberInput = styled.input`
  width: 90px;
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
  padding-left: 20px;
`;
const AdditionOption = styled.div`
  display: flex;
  gap: 5px;
`;
const TBD = styled.div``;
const Summary = styled.div`
  font-size: 20px;
  height: 100%;
  display: flex;
  align-items: flex-end;
  margin: 0 auto;
`;
const NextStepButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
`;
