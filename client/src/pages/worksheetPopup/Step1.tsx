import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  createWorksheetStep1BoolAtom,
  createWorksheetStep2BoolAtom,
} from '../../state/creatingWorksheetAtom';
import { Step2 } from './Step2';

import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

export function Step1() {
  const [didMount, setDidMount] = useState(false);
  let mountCount = 1;
  const setIsStep1 = useSetRecoilState(createWorksheetStep1BoolAtom);
  const [isStep2, setIsStep2] = useRecoilState(createWorksheetStep2BoolAtom);
  const [value, setValue] = useState('1');
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

  const changeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
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
    mountCount++;
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
              <Box sx={{ typography: 'body1' }}>
                <TabContext value={value}>
                  <Box sx={{ borderColor: 'divider' }}>
                    <TabList onChange={changeTab}>
                      <Tab
                        label="단원·유형별"
                        value="1"
                        style={{ fontSize: '16px', fontWeight: 'bold' }}
                      />
                      <Tab
                        label="시중교재"
                        value="2"
                        style={{ fontSize: '16px', fontWeight: 'bold' }}
                      />
                      <Tab
                        label="수능/모의고사"
                        value="3"
                        style={{ fontSize: '16px', fontWeight: 'bold' }}
                      />
                    </TabList>
                  </Box>
                </TabContext>
              </Box>
            </TabWrapper>
            <SchoolButtonGroup>
              <SelectorGroup>
                <StyledMenuBtn
                  variant={schoolLevel === '1' ? 'contained' : 'outlined'}
                  onClick={() => {
                    selectGradeOption('1');
                    selectSchoolLevel('1');
                  }}
                >
                  초
                </StyledMenuBtn>
                <StyledMenuBtn
                  variant={schoolLevel === '2' ? 'contained' : 'outlined'}
                  onClick={() => {
                    selectGradeOption('2');
                    selectSchoolLevel('2');
                  }}
                >
                  중
                </StyledMenuBtn>
                <StyledMenuBtn
                  variant={schoolLevel === '3' ? 'contained' : 'outlined'}
                  onClick={() => {
                    selectGradeOption('2');
                    selectSchoolLevel('3');
                  }}
                >
                  고
                </StyledMenuBtn>
              </SelectorGroup>
              <div style={{ color: '#a3aed0', fontSize: '25px' }}>|</div>
              <SelectorGroup>
                {grade === '1' && (
                  <>
                    <StyledMenuBtn
                      variant={schoolYear === '1' ? 'contained' : 'outlined'}
                      onClick={() => selectSchoolYear('1')}
                    >
                      1학년
                    </StyledMenuBtn>
                    <StyledMenuBtn
                      variant={schoolYear === '2' ? 'contained' : 'outlined'}
                      onClick={() => selectSchoolYear('2')}
                    >
                      2학년
                    </StyledMenuBtn>
                    <StyledMenuBtn
                      variant={schoolYear === '3' ? 'contained' : 'outlined'}
                      onClick={() => selectSchoolYear('3')}
                    >
                      3학년
                    </StyledMenuBtn>
                    <StyledMenuBtn
                      variant={schoolYear === '4' ? 'contained' : 'outlined'}
                      onClick={() => selectSchoolYear('4')}
                    >
                      4학년
                    </StyledMenuBtn>
                    <StyledMenuBtn
                      variant={schoolYear === '5' ? 'contained' : 'outlined'}
                      onClick={() => selectSchoolYear('5')}
                    >
                      5학년
                    </StyledMenuBtn>
                    <StyledMenuBtn
                      variant={schoolYear === '6' ? 'contained' : 'outlined'}
                      onClick={() => selectSchoolYear('6')}
                    >
                      6학년
                    </StyledMenuBtn>
                  </>
                )}
                {grade === '2' && (
                  <>
                    <StyledMenuBtn
                      variant={schoolYear === '1' ? 'contained' : 'outlined'}
                      onClick={() => selectSchoolYear('1')}
                    >
                      1학년
                    </StyledMenuBtn>
                    <StyledMenuBtn
                      variant={schoolYear === '2' ? 'contained' : 'outlined'}
                      onClick={() => selectSchoolYear('2')}
                    >
                      2학년
                    </StyledMenuBtn>
                    <StyledMenuBtn
                      variant={schoolYear === '3' ? 'contained' : 'outlined'}
                      onClick={() => selectSchoolYear('3')}
                    >
                      3학년
                    </StyledMenuBtn>
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
                <StyledMenuBtn
                  variant={questionNum === '25' ? 'contained' : 'outlined'}
                  onClick={() => {
                    selectQuestionNum('25');
                  }}
                >
                  25
                </StyledMenuBtn>
                <StyledMenuBtn
                  variant={questionNum === '50' ? 'contained' : 'outlined'}
                  onClick={() => {
                    selectQuestionNum('50');
                  }}
                >
                  50
                </StyledMenuBtn>
                <StyledMenuBtn
                  variant={questionNum === '100' ? 'contained' : 'outlined'}
                  onClick={() => {
                    selectQuestionNum('100');
                  }}
                >
                  100
                </StyledMenuBtn>
                <div style={{ color: '#a3aed0', fontSize: '25px' }}>|</div>
                <NumberInput
                  value={inputValue}
                  maxLength={2}
                  onClick={() => selectQuestionNum('')}
                  style={{
                    color: questionNum === '' ? 'white' : '#1976d2',
                    backgroundColor: questionNum === '' ? '#1976d2' : 'white',
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
              <StyledMenuBtn
                variant={questionlevel === '하' ? 'contained' : 'outlined'}
                onClick={() => selectQuestionLevel('하')}
              >
                하
              </StyledMenuBtn>
              <StyledMenuBtn
                variant={questionlevel === '중하' ? 'contained' : 'outlined'}
                onClick={() => selectQuestionLevel('중하')}
              >
                중하
              </StyledMenuBtn>
              <StyledMenuBtn
                variant={questionlevel === '중' ? 'contained' : 'outlined'}
                onClick={() => selectQuestionLevel('중')}
              >
                중
              </StyledMenuBtn>
              <StyledMenuBtn
                variant={questionlevel === '상' ? 'contained' : 'outlined'}
                onClick={() => selectQuestionLevel('상')}
              >
                상
              </StyledMenuBtn>
              <StyledMenuBtn
                variant={questionlevel === '최상' ? 'contained' : 'outlined'}
                onClick={() => selectQuestionLevel('최상')}
              >
                최상
              </StyledMenuBtn>
            </SelectorGroup>
            <SubTitle>문항 타입</SubTitle>
            <SelectorGroup>
              <StyledMenuBtn
                customWidth={80}
                variant={isAllSelected ? 'contained' : 'outlined'}
                onClick={() => {
                  if (isAllSelected) {
                    setQuestionType([]);
                  } else {
                    setQuestionType(['객관식', '주관식', '서술형']);
                  }
                }}
              >
                전체
              </StyledMenuBtn>
              <StyledMenuBtn
                customWidth={80}
                variant={
                  questionType.includes('객관식') ? 'contained' : 'outlined'
                }
                onClick={() => selectQuestionType('객관식')}
              >
                객관식
              </StyledMenuBtn>
              <StyledMenuBtn
                customWidth={80}
                variant={
                  questionType.includes('주관식') ? 'contained' : 'outlined'
                }
                onClick={() => selectQuestionType('주관식')}
              >
                주관식
              </StyledMenuBtn>
              <StyledMenuBtn
                customWidth={80}
                variant={
                  questionType.includes('서술형') ? 'contained' : 'outlined'
                }
                onClick={() => selectQuestionType('서술형')}
              >
                서술형
              </StyledMenuBtn>
            </SelectorGroup>
            <SubTitle>모의고사 포함 여부</SubTitle>
            <SelectorGroup>
              {/* <SelectorWrapper customGap={10}> */}
              <StyledMenuBtn
                customWidth={110}
                variant={containMock === '포함' ? 'contained' : 'outlined'}
                onClick={() => selectContainMock('포함')}
              >
                포함
              </StyledMenuBtn>
              <StyledMenuBtn
                customWidth={110}
                variant={containMock === '제외' ? 'contained' : 'outlined'}
                onClick={() => selectContainMock('제외')}
              >
                제외
              </StyledMenuBtn>
              <StyledMenuBtn
                customWidth={110}
                variant={
                  containMock === '모의고사만' ? 'contained' : 'outlined'
                }
                onClick={() => selectContainMock('모의고사만')}
              >
                모의고사만
              </StyledMenuBtn>
              {/* </SelectorWrapper> */}
            </SelectorGroup>
            <TBD></TBD>
            <Summary>학습지 문항수 {inputValue || questionNum}개</Summary>
          </SchoolSelectorSection>
        </Wrapper>
        <NextStepButtonWrapper>
          <StyledNextBtn variant="contained" onClick={() => moveStep2()}>
            다음 단계
          </StyledNextBtn>
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
  border: 1px solid #a3aed0;
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
  border: 1px solid #5f86fc;
  border-radius: 25px;
`;
const TabWrapper = styled.div`
  width: 100%;
  padding: 10px 0px;
  gap: 20px;
`;
const SchoolButtonGroup = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 5px;
  border-top: 1px solid #a3aed0;
  border-bottom: 1px solid #a3aed0;
`;
const SelectorGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 5px;
`;
const TreeviewWrapper = styled.div`
  padding: 10px;
`;
const SchoolSelectorSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border: 1px solid #5f86fc;
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
  width: 100%;
  justify-content: space-between;
  font-size: 12px;
`;
const NumberInput = styled.input`
  width: 64px;
  height: 30px;
  border-radius: 5px;
  font-size: 12px;
  line-height: normal;
  border: 1px solid rgba(25, 118, 210, 0.5);
  color: rgb(25, 118, 210);
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
const StyledMenuBtn = styled(Button)<{ customWidth: number }>`
  && {
    width: ${(props) => props.customWidth}px;
    height: 30px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;
const StyledNextBtn = styled(Button)`
  && {
    height: 30px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;
