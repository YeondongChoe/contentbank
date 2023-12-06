import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  createWorksheetStep1BoolAtom,
  createWorksheetStep2BoolAtom,
} from '../../recoil/creatingWorksheetAtom';
import { Step2 } from './Step2';

import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

const Step1 = () => {
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
    <S.popupOverlay>
      <S.popupContainer>
        <S.topContainer>
          <S.title>
            <S.span>STEP 1</S.span> 학습지 종류 및 번위 선택
          </S.title>
          <CloseIcon onClick={closePopup} sx={{ cursor: 'pointer' }} />
        </S.topContainer>
        <S.mainContainer>
          <S.leftTapWrapper>
            <S.tabContainer>
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
            </S.tabContainer>
            <S.schoolContainer>
              <S.schoolLevel>
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
              </S.schoolLevel>
              <div style={{ color: '#a3aed0', fontSize: '25px' }}>|</div>
              <S.schoolYear>
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
              </S.schoolYear>
            </S.schoolContainer>
            <S.treeViewContainer>
              <div>초등을 누르면 1~6학년까지의 트리가나옴</div>
              <div>중등을 누르면 1~3한년까지의 트리가 나옴</div>
              <div>고등을 누르면 1~3한년까지의 트리가 나옴</div>
              <div>학년을 선택하면 1학기 2학기의 트리가 나옴</div>
              <div>
                선택 해제했을 때 그에 맞는 트리를 보여주며 모든 선택 해제시
                초기화면 처럼 빈화면
              </div>
              <button onClick={spreadTree}>트리클릭</button>
            </S.treeViewContainer>
          </S.leftTapWrapper>
          <S.rightTapWrapper>
            <S.questionNum>
              <S.subTitle>
                문항수 <span style={{ fontSize: '12px' }}>최대 100문항</span>
              </S.subTitle>
              <S.btnContainer>
                <StyledMenuBtn
                  customWidth={68}
                  variant={questionNum === '25' ? 'contained' : 'outlined'}
                  onClick={() => {
                    selectQuestionNum('25');
                  }}
                >
                  25
                </StyledMenuBtn>
                <StyledMenuBtn
                  customWidth={68}
                  variant={questionNum === '50' ? 'contained' : 'outlined'}
                  onClick={() => {
                    selectQuestionNum('50');
                  }}
                >
                  50
                </StyledMenuBtn>
                <StyledMenuBtn
                  customWidth={68}
                  variant={questionNum === '100' ? 'contained' : 'outlined'}
                  onClick={() => {
                    selectQuestionNum('100');
                  }}
                >
                  100
                </StyledMenuBtn>
                <div style={{ color: '#a3aed0', fontSize: '25px' }}>|</div>
                <S.numInput
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
                ></S.numInput>
                문항
              </S.btnContainer>
            </S.questionNum>
            <S.questionLevel>
              <S.subTitle>난이도</S.subTitle>
              <S.btnContainer>
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
              </S.btnContainer>
            </S.questionLevel>
            <S.questionType>
              <S.subTitle>문항 타입</S.subTitle>
              <S.btnContainer>
                <StyledMenuBtn
                  customWidth={82}
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
                  customWidth={82}
                  variant={
                    questionType.includes('객관식') ? 'contained' : 'outlined'
                  }
                  onClick={() => selectQuestionType('객관식')}
                >
                  객관식
                </StyledMenuBtn>
                <StyledMenuBtn
                  customWidth={82}
                  variant={
                    questionType.includes('주관식') ? 'contained' : 'outlined'
                  }
                  onClick={() => selectQuestionType('주관식')}
                >
                  주관식
                </StyledMenuBtn>
                <StyledMenuBtn
                  customWidth={82}
                  variant={
                    questionType.includes('서술형') ? 'contained' : 'outlined'
                  }
                  onClick={() => selectQuestionType('서술형')}
                >
                  서술형
                </StyledMenuBtn>
              </S.btnContainer>
            </S.questionType>
            <S.containMock>
              <S.subTitle>모의고사 포함 여부</S.subTitle>
              <S.btnContainer customGap={29}>
                <StyledMenuBtn
                  customWidth={100}
                  variant={containMock === '포함' ? 'contained' : 'outlined'}
                  onClick={() => selectContainMock('포함')}
                >
                  포함
                </StyledMenuBtn>
                <StyledMenuBtn
                  customWidth={100}
                  variant={containMock === '제외' ? 'contained' : 'outlined'}
                  onClick={() => selectContainMock('제외')}
                >
                  제외
                </StyledMenuBtn>
                <StyledMenuBtn
                  customWidth={100}
                  variant={
                    containMock === '모의고사만' ? 'contained' : 'outlined'
                  }
                  onClick={() => selectContainMock('모의고사만')}
                >
                  모의고사만
                </StyledMenuBtn>
              </S.btnContainer>
            </S.containMock>
            <S.tbdDiv></S.tbdDiv>
            <S.discription>
              학습지 문항수 {inputValue || questionNum}개
            </S.discription>
          </S.rightTapWrapper>
        </S.mainContainer>
        <S.bottomContainer>
          <StyledNextBtn variant="contained" onClick={() => moveStep2()}>
            다음 단계
          </StyledNextBtn>
        </S.bottomContainer>
      </S.popupContainer>
      {isStep2 && <Step2 />}
    </S.popupOverlay>
  );
};

const S = {
  popupOverlay: styled.div`
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
  `,
  popupContainer: styled.div`
    width: 80vw;
    height: 95vh;
    border: 1px solid #a3aed0;
    background-color: white;
  `,
  title: styled.div``,
  span: styled.span`
    color: #1976d2;
  `,
  topContainer: styled.div`
    margin: 40px 30px 20px;
    display: flex;
    justify-content: space-between;
  `,
  mainContainer: styled.div`
    display: flex;
    justify-content: center;
    gap: 40px;
  `,
  bottomContainer: styled.div`
    margin: 10px 30px;
    display: flex;
    justify-content: flex-end;
  `,
  leftTapWrapper: styled.div`
    width: 700px;
    height: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #5f86fc;
    border-radius: 25px;
  `,
  tabContainer: styled.div`
    width: 100%;
    height: 90px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
  `,
  schoolContainer: styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    gap: 10px;
    border-top: 1px solid #a3aed0;
    border-bottom: 1px solid #a3aed0;
  `,
  schoolLevel: styled.div`
    display: flex;
    gap: 10px;
  `,
  schoolYear: styled.div`
    display: flex;
    gap: 10px;
  `,
  treeViewContainer: styled.div`
    width: 100%;
    height: 560px;
  `,
  rightTapWrapper: styled.div`
    width: 400px;
    height: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #5f86fc;
    border-radius: 25px;
    gap: 10px;
  `,
  questionNum: styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  questionLevel: styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  questionType: styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  containMock: styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  subTitle: styled.div`
    padding-left: 20px;
  `,
  btnContainer: styled.div<{ customGap?: number }>`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${(props) => props.customGap || 10}px;
    font-size: 12px;
  `,
  numInput: styled.input`
    width: 68px;
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
  `,
  tbdDiv: styled.div`
    width: 400px;
    height: 300px;
  `,
  discription: styled.div``,
};

const StyledMenuBtn = styled(Button)<{ customWidth: number }>`
  && {
    width: ${(props) => props.customWidth || 50}px;
    height: 30px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
    /* &:focus {
      background-color: skyblue;
    } */
  }
`;
const StyledNextBtn = styled(Button)`
  && {
    height: 25px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;
export { Step1 };
