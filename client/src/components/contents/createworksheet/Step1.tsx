import * as React from 'react';
import { useState, useEffect } from 'react';

import { IoMdClose } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { CheckBox, Button, TabMenu, Input, Label, Search } from '../..';
import { TextbookType } from '../../../types';
import { COLOR } from '../../constants';
import dummy from '../../constants/data.json';

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

  const [tabVeiw, setTabVeiw] = useState<string>('시중교재');

  const navigate = useNavigate();
  const moveStep2 = () => {
    navigate('/content-create/exam/step2');
    console.log('선택된 값으로 학습지 문항리스트() get 요청 API');
    console.log('가져온 값을 상태관리 한 후 다음 단계에 전달');
  };

  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      console.log('schoolLevel, schoolYear이 선택 됐을 때 범위 트리 get API');
    }
  }, [didMount]);

  //단원.유형별
  const [inputValue, setInputValue] = useState('');
  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // 정규표현식을 사용하여 숫자 이외의 문자 제거
    inputValue = inputValue.replace(/[^0-9]/g, '');

    const parsedValue = parseInt(inputValue, 10);

    if (!isNaN(parsedValue) && parsedValue > 0) {
      setInputValue(
        parsedValue < 1 ? '1' : parsedValue >= 100 ? '100' : inputValue,
      );
    }
  };

  const [questionNum, setQuestionNum] = useState<string | null>(null);
  const selectQuestionNum = (newValue: string | null) => {
    setQuestionNum(newValue);
    setInputValue('');
  };

  const [questionLevel, setQuestionLevel] = useState<string | null>(null);
  const selectQuestionLevel = (newValue: string | null) => {
    setQuestionLevel(newValue);
  };

  const [questionType, setQuestionType] = useState<string[]>([]);
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
  const [isDifficulty, setIsDifficulty] = useState(false);
  const openDifficultySetting = () => {
    setIsDifficulty(true);
  };
  const closeDifficultySetting = () => {
    setIsDifficulty(false);
  };

  const [isAutoGrading, setIsAutoGrading] = useState(false);
  const checkAutoGrading = () => {
    setIsAutoGrading(!isAutoGrading);
  };

  const isAllSelected =
    questionType.includes('객관식') &&
    questionType.includes('주관식') &&
    questionType.includes('서술형');

  const [containMock, setContainMock] = useState<string | null>(null);
  const selectContainMock = (newValue: string | null) => {
    setContainMock(newValue);
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

  //시중교재
  const [schoolLevel, setSchoolLevel] = useState<string | null>(null);
  const selectSchoolLevel = (newValue: string | null) => {
    setSchoolLevel(newValue);
  };
  const [gradeLevel, setgradeLevel] = useState<string | null>(null);
  const selectGradeLevel = (newValue: string | null) => {
    setgradeLevel(newValue);
  };

  const [searchValue, setSearchValue] = useState<string>('');
  const filterSearchValue = () => {
    console.log('기존데이터 입력된 값으로 솎아낸뒤 재출력');
  };

  const textbookList: TextbookType[] = dummy.Textbook;

  const [isSelectTextbook, setIsSelectTextbook] = useState(true);
  const [selectedTextbook, setSelectedTextbook] = useState<TextbookType>();
  //console.log(selectedTextbook);

  const [isSelectTextbookContent, setIsSelectTextbookContent] = useState(false);

  const selectTextbook = (book: TextbookType) => {
    setSelectedTextbook(book);
    setIsSelectTextbook(false);
    setIsSelectTextbookContent(true);
  };
  const selectOtherTextbook = () => {
    setIsSelectTextbook(true);
    setIsSelectTextbookContent(false);
    setIsChoice(false);
    setClickedIdx(0);
  };

  const [isChoice, setIsChoice] = useState(false);
  const [clickedIdx, setClickedIdx] = useState<number>();
  console.log(clickedIdx);
  const choiceType = (
    idx: number,
    event?: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    //event?.preventDefault();
    setIsChoice(!isChoice);
    setClickedIdx(idx);
  };
  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <Title>
            <Span>STEP 1</Span> 학습지 종류 및 번위 선택
          </Title>
        </TitleWrapper>
        <MainWrapper>
          {tabVeiw === '단원·유형별' && (
            <>
              <CategorySection>
                <TabWrapper>
                  <TabMenu
                    length={3}
                    menu={menuList}
                    width={'350px'}
                    lineStyle
                    selected={tabVeiw}
                    setTabVeiw={setTabVeiw}
                  />
                </TabWrapper>
                <CategoryWrapper></CategoryWrapper>
              </CategorySection>
              <SchoolSelectorSection>
                <SubTitleWrapper>
                  <Label value="*문항수" fontSize="16px" width="60px" />
                  <Label value="최대 100문항" fontSize="12px" width="440px" />
                </SubTitleWrapper>

                <SelectorGroup>
                  <SelectorWrapper>
                    <Button
                      buttonType="button"
                      onClick={() => {
                        selectQuestionNum('25');
                      }}
                      $padding="10px"
                      height={'34px'}
                      width={'100px'}
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
                      width={'100px'}
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
                      width={'100px'}
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
                      maxLength={3}
                      onClick={() => selectQuestionNum('')}
                      style={{
                        color:
                          questionNum === '' ? 'white' : `${COLOR.PRIMARY}`,
                        backgroundColor:
                          questionNum === '' ? `${COLOR.PRIMARY}` : 'white',
                      }}
                      onChange={(e) => {
                        changeInputValue(e);
                      }}
                    ></NumberInput>
                    문항
                  </SelectorWrapper>
                </SelectorGroup>

                <SubTitleWrapper>
                  <Label value="*난이도" fontSize="16px" width="200px" />
                  <AdditionOption>
                    <IoSettingsOutline
                      onClick={openDifficultySetting}
                      style={{ cursor: 'pointer' }}
                    />
                    난이도 설정
                  </AdditionOption>
                </SubTitleWrapper>
                <SelectorGroup>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      selectQuestionLevel('하');
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'92px'}
                    fontSize="14px"
                    $normal={questionLevel !== '하'}
                    $filled={questionLevel === '하'}
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
                    width={'92px'}
                    fontSize="14px"
                    $normal={questionLevel !== '중하'}
                    $filled={questionLevel === '중하'}
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
                    width={'92px'}
                    fontSize="14px"
                    $normal={questionLevel !== '중'}
                    $filled={questionLevel === '중'}
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
                    width={'92px'}
                    fontSize="14px"
                    $normal={questionLevel !== '상'}
                    $filled={questionLevel === '상'}
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
                    width={'93px'}
                    fontSize="14px"
                    $normal={questionLevel !== '최상'}
                    $filled={questionLevel === '최상'}
                    cursor
                  >
                    <span>최상</span>
                  </Button>
                </SelectorGroup>
                <SubTitleWrapper>
                  <Label value="*문항 타입" fontSize="16px" width="200px" />
                  <AdditionOption>
                    자동 체점
                    <CheckBox
                      width="16"
                      height="16"
                      isChecked={isAutoGrading}
                      onClick={checkAutoGrading}
                    />
                  </AdditionOption>
                </SubTitleWrapper>
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
                    width={'120px'}
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
                    width={'117px'}
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
                    width={'117px'}
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
                    width={'117px'}
                    fontSize="14px"
                    $normal={!questionType.includes('서술형')}
                    $filled={questionType.includes('서술형')}
                    cursor
                  >
                    <span>서술형</span>
                  </Button>
                </SelectorGroup>
                <Label
                  value="*모의고사 포함 여부"
                  fontSize="16px"
                  width="200px"
                />
                <SelectorGroup>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      selectContainMock('포함');
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'161px'}
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
                    width={'160px'}
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
                    width={'160px'}
                    fontSize="14px"
                    $normal={containMock !== '모의고사만'}
                    $filled={containMock === '모의고사만'}
                    cursor
                  >
                    <span>모의고사만</span>
                  </Button>
                </SelectorGroup>
                <AdditionOptionList>
                  <Label value="추가 옵션" fontSize="16px" width="200px" />
                  <AdditionOption>
                    <CheckBox isChecked={isOption1} onClick={selectOption1} />
                    기존 출제 문항 제외
                  </AdditionOption>
                  <AdditionOption>
                    <CheckBox isChecked={isOption2} onClick={selectOption2} />
                    교육 과정 외 유형 제외
                  </AdditionOption>
                  <AdditionOption>
                    <CheckBox isChecked={isOption3} onClick={selectOption3} />
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
                <Summary>
                  학습지 문항수 {inputValue || questionNum} 개 | 유형 3개
                </Summary>
              </SchoolSelectorSection>
            </>
          )}
          {tabVeiw === '시중교재' && (
            <>
              {isSelectTextbook && (
                <>
                  <CategorySection>
                    <TabWrapper
                      onClick={() => {
                        selectSchoolLevel('초');
                        setgradeLevel('');
                      }}
                    >
                      <TabMenu
                        length={3}
                        menu={menuList}
                        width={'350px'}
                        lineStyle
                        selected={tabVeiw}
                        setTabVeiw={setTabVeiw}
                      />
                    </TabWrapper>
                    <SchoolGradeWrapper>
                      <SelectorGroup>
                        <Button
                          buttonType="button"
                          onClick={() => {
                            selectSchoolLevel('초');
                            selectGradeLevel('');
                          }}
                          $padding="10px"
                          height={'34px'}
                          width={'97px'}
                          fontSize="14px"
                          $normal={schoolLevel !== '초'}
                          $filled={schoolLevel === '초'}
                          cursor
                        >
                          <span>초</span>
                        </Button>
                        <Button
                          buttonType="button"
                          onClick={() => {
                            selectSchoolLevel('중');
                            selectGradeLevel('');
                          }}
                          $padding="10px"
                          height={'34px'}
                          width={'97px'}
                          fontSize="14px"
                          $normal={schoolLevel !== '중'}
                          $filled={schoolLevel === '중'}
                          cursor
                        >
                          <span>중</span>
                        </Button>
                        <Button
                          buttonType="button"
                          onClick={() => {
                            selectSchoolLevel('고');
                            selectGradeLevel('');
                          }}
                          $padding="10px"
                          height={'34px'}
                          width={'97px'}
                          fontSize="14px"
                          $normal={schoolLevel !== '고'}
                          $filled={schoolLevel === '고'}
                          cursor
                        >
                          <span>고</span>
                        </Button>
                        <DivideBar>|</DivideBar>
                        {schoolLevel === '중' || schoolLevel === '고' ? (
                          <SelectorGroup>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('1학년');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '1학년'}
                              $filled={gradeLevel === '1학년'}
                              cursor
                            >
                              <span>1학년</span>
                            </Button>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('2학년');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '2학년'}
                              $filled={gradeLevel === '2학년'}
                              cursor
                            >
                              <span>2학년</span>
                            </Button>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('3학년');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '3학년'}
                              $filled={gradeLevel === '3학년'}
                              cursor
                            >
                              <span>3학년</span>
                            </Button>
                          </SelectorGroup>
                        ) : (
                          <SelectorGroup>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('1학년');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '1학년'}
                              $filled={gradeLevel === '1학년'}
                              cursor
                            >
                              <span>1학년</span>
                            </Button>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('2학년');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '2학년'}
                              $filled={gradeLevel === '2학년'}
                              cursor
                            >
                              <span>2학년</span>
                            </Button>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('3학년');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '3학년'}
                              $filled={gradeLevel === '3학년'}
                              cursor
                            >
                              <span>3학년</span>
                            </Button>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('4학년');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '4학년'}
                              $filled={gradeLevel === '4학년'}
                              cursor
                            >
                              <span>4학년</span>
                            </Button>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('5학년');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '5학년'}
                              $filled={gradeLevel === '5학년'}
                              cursor
                            >
                              <span>5학년</span>
                            </Button>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('6학년');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '6학년'}
                              $filled={gradeLevel === '6학년'}
                              cursor
                            >
                              <span>6학년</span>
                            </Button>
                          </SelectorGroup>
                        )}
                      </SelectorGroup>
                    </SchoolGradeWrapper>
                    <SearchWrapper>
                      <Search
                        value={searchValue}
                        width={'50%'}
                        height="40px"
                        onClick={() => filterSearchValue()}
                        onKeyDown={(e) => {}}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="교재명 검색"
                      />
                    </SearchWrapper>
                    <ListWrapper>
                      <ListTitleWrapper>
                        <ListTitle className="schoolGrade">학교급</ListTitle>
                        <ListTitle className="title">교재명</ListTitle>
                        <ListTitle className="series">시리즈</ListTitle>
                        <ListTitle className="publisher">출판사</ListTitle>
                      </ListTitleWrapper>
                      {textbookList.map((book, idx) => (
                        <TextbookList
                          key={idx}
                          onClick={() => selectTextbook(book)}
                        >
                          <div className="schoolGrade">{book.schoolGrade}</div>
                          <div className="title">{book.title}</div>
                          <div className="series">{book.series}</div>
                          <div className="publisher">{book.publisher}</div>
                        </TextbookList>
                      ))}
                    </ListWrapper>
                  </CategorySection>
                  <SchoolSelectorSection>
                    <SubTitleWrapper>
                      <Label value="*문항수" fontSize="16px" width="60px" />
                      <Label
                        value="최대 100문항"
                        fontSize="12px"
                        width="440px"
                      />
                    </SubTitleWrapper>
                    <SelectorGroup>
                      <SelectorWrapper>
                        <Button
                          buttonType="button"
                          onClick={() => {
                            selectQuestionNum('25');
                          }}
                          $padding="10px"
                          height={'34px'}
                          width={'100px'}
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
                          width={'100px'}
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
                          width={'100px'}
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
                          maxLength={3}
                          onClick={() => selectQuestionNum('')}
                          style={{
                            color:
                              questionNum === '' ? 'white' : `${COLOR.PRIMARY}`,
                            backgroundColor:
                              questionNum === '' ? `${COLOR.PRIMARY}` : 'white',
                          }}
                          onChange={(e) => {
                            changeInputValue(e);
                          }}
                        ></NumberInput>
                        문항
                      </SelectorWrapper>
                    </SelectorGroup>

                    <SubTitleWrapper>
                      <Label value="*난이도" fontSize="16px" width="200px" />
                      <AdditionOption>
                        <IoSettingsOutline
                          onClick={openDifficultySetting}
                          style={{ cursor: 'pointer' }}
                        />
                        난이도 설정
                      </AdditionOption>
                    </SubTitleWrapper>
                    <SelectorGroup>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionLevel('하');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'92px'}
                        fontSize="14px"
                        $normal={questionLevel !== '하'}
                        $filled={questionLevel === '하'}
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
                        width={'92px'}
                        fontSize="14px"
                        $normal={questionLevel !== '중하'}
                        $filled={questionLevel === '중하'}
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
                        width={'92px'}
                        fontSize="14px"
                        $normal={questionLevel !== '중'}
                        $filled={questionLevel === '중'}
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
                        width={'92px'}
                        fontSize="14px"
                        $normal={questionLevel !== '상'}
                        $filled={questionLevel === '상'}
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
                        width={'93px'}
                        fontSize="14px"
                        $normal={questionLevel !== '최상'}
                        $filled={questionLevel === '최상'}
                        cursor
                      >
                        <span>최상</span>
                      </Button>
                    </SelectorGroup>
                    <SubTitleWrapper>
                      <Label value="*문항 타입" fontSize="16px" width="200px" />
                      <AdditionOption>
                        자동 체점
                        <CheckBox
                          width="16"
                          height="16"
                          isChecked={isAutoGrading}
                          onClick={checkAutoGrading}
                        />
                      </AdditionOption>
                    </SubTitleWrapper>
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
                        width={'120px'}
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
                        width={'117px'}
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
                        width={'117px'}
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
                        width={'117px'}
                        fontSize="14px"
                        $normal={!questionType.includes('서술형')}
                        $filled={questionType.includes('서술형')}
                        cursor
                      >
                        <span>서술형</span>
                      </Button>
                    </SelectorGroup>
                    <Label
                      value="*모의고사 포함 여부"
                      fontSize="16px"
                      width="200px"
                    />
                    <SelectorGroup>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectContainMock('포함');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'161px'}
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
                        width={'160px'}
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
                        width={'160px'}
                        fontSize="14px"
                        $normal={containMock !== '모의고사만'}
                        $filled={containMock === '모의고사만'}
                        cursor
                      >
                        <span>모의고사만</span>
                      </Button>
                    </SelectorGroup>
                    <AdditionOptionList>
                      <Label value="추가 옵션" fontSize="16px" width="200px" />
                      <AdditionOption>
                        <CheckBox
                          isChecked={isOption1}
                          onClick={selectOption1}
                        />
                        기존 출제 문항 제외
                      </AdditionOption>
                      <AdditionOption>
                        <CheckBox
                          isChecked={isOption2}
                          onClick={selectOption2}
                        />
                        교육 과정 외 유형 제외
                      </AdditionOption>
                      <AdditionOption>
                        <CheckBox
                          isChecked={isOption3}
                          onClick={selectOption3}
                        />
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
                    <Summary>
                      학습지 문항수 {inputValue || questionNum} 개 | 유형 3개
                    </Summary>
                  </SchoolSelectorSection>
                </>
              )}
              {isSelectTextbookContent && (
                <>
                  <CategorySection>
                    <TabWrapper onClick={selectOtherTextbook}>
                      <TabMenu
                        length={3}
                        menu={menuList}
                        width={'350px'}
                        lineStyle
                        selected={tabVeiw}
                        setTabVeiw={setTabVeiw}
                      />
                    </TabWrapper>
                    <TextbookTitleWrapper>
                      <Label
                        value={selectedTextbook?.title as string}
                        width="500px"
                        fontSize="15px"
                      />
                      <Button
                        buttonType="button"
                        onClick={selectOtherTextbook}
                        $padding="10px"
                        height={'30px'}
                        width={'110px'}
                        fontSize="12px"
                        $normal
                        cursor
                      >
                        <span>다른 교재 선택</span>
                      </Button>
                    </TextbookTitleWrapper>
                    <TextbookWrapper>
                      <TextbookLeftWrapper>
                        {selectedTextbook?.type?.map((types, idx) => (
                          <TextbookTypeWrapper key={idx}>
                            <Label value={types.title as string} />
                            {types.page.map((page) => (
                              <CheckboxWrapper
                                key={page.seq}
                                onClick={() => choiceType(page.seq)}
                                $isChoice={clickedIdx === page.seq}
                                $choicedIdx={clickedIdx}
                              >
                                <CheckBox
                                  isChecked={false}
                                  width="15"
                                  height="15"
                                />
                                <Label value={page.title} />
                              </CheckboxWrapper>
                            ))}
                          </TextbookTypeWrapper>
                        ))}
                      </TextbookLeftWrapper>
                      <TextbookRightWrapper>
                        <Label value="유형UP" />
                        <CheckboxWrapper>
                          <CheckBox isChecked={false} width="15" height="15" />
                          <Label value={'60번'} />
                        </CheckboxWrapper>
                      </TextbookRightWrapper>
                    </TextbookWrapper>
                  </CategorySection>
                  <SchoolSelectorSection>
                    <SubTitleWrapper>
                      <Label value="*문항수" fontSize="16px" width="60px" />
                      <Label
                        value="최대 100문항"
                        fontSize="12px"
                        width="440px"
                      />
                    </SubTitleWrapper>
                    <SelectorGroup>
                      <SelectorWrapper>
                        <Button
                          buttonType="button"
                          onClick={() => {
                            selectQuestionNum('25');
                          }}
                          $padding="10px"
                          height={'34px'}
                          width={'100px'}
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
                          width={'100px'}
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
                          width={'100px'}
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
                          maxLength={3}
                          onClick={() => selectQuestionNum('')}
                          style={{
                            color:
                              questionNum === '' ? 'white' : `${COLOR.PRIMARY}`,
                            backgroundColor:
                              questionNum === '' ? `${COLOR.PRIMARY}` : 'white',
                          }}
                          onChange={(e) => {
                            changeInputValue(e);
                          }}
                        ></NumberInput>
                        문항
                      </SelectorWrapper>
                    </SelectorGroup>

                    <SubTitleWrapper>
                      <Label value="*난이도" fontSize="16px" width="200px" />
                      <AdditionOption>
                        <IoSettingsOutline
                          onClick={openDifficultySetting}
                          style={{ cursor: 'pointer' }}
                        />
                        난이도 설정
                      </AdditionOption>
                    </SubTitleWrapper>
                    <SelectorGroup>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionLevel('하');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'92px'}
                        fontSize="14px"
                        $normal={questionLevel !== '하'}
                        $filled={questionLevel === '하'}
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
                        width={'92px'}
                        fontSize="14px"
                        $normal={questionLevel !== '중하'}
                        $filled={questionLevel === '중하'}
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
                        width={'92px'}
                        fontSize="14px"
                        $normal={questionLevel !== '중'}
                        $filled={questionLevel === '중'}
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
                        width={'92px'}
                        fontSize="14px"
                        $normal={questionLevel !== '상'}
                        $filled={questionLevel === '상'}
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
                        width={'93px'}
                        fontSize="14px"
                        $normal={questionLevel !== '최상'}
                        $filled={questionLevel === '최상'}
                        cursor
                      >
                        <span>최상</span>
                      </Button>
                    </SelectorGroup>
                    <SubTitleWrapper>
                      <Label value="*문항 타입" fontSize="16px" width="200px" />
                      <AdditionOption>
                        자동 체점
                        <CheckBox
                          width="16"
                          height="16"
                          isChecked={isAutoGrading}
                          onClick={checkAutoGrading}
                        />
                      </AdditionOption>
                    </SubTitleWrapper>
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
                        width={'120px'}
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
                        width={'117px'}
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
                        width={'117px'}
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
                        width={'117px'}
                        fontSize="14px"
                        $normal={!questionType.includes('서술형')}
                        $filled={questionType.includes('서술형')}
                        cursor
                      >
                        <span>서술형</span>
                      </Button>
                    </SelectorGroup>
                    <Label
                      value="*모의고사 포함 여부"
                      fontSize="16px"
                      width="200px"
                    />
                    <SelectorGroup>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectContainMock('포함');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'161px'}
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
                        width={'160px'}
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
                        width={'160px'}
                        fontSize="14px"
                        $normal={containMock !== '모의고사만'}
                        $filled={containMock === '모의고사만'}
                        cursor
                      >
                        <span>모의고사만</span>
                      </Button>
                    </SelectorGroup>
                    <AdditionOptionList>
                      <Label value="추가 옵션" fontSize="16px" width="200px" />
                      <AdditionOption>
                        <CheckBox
                          isChecked={isOption1}
                          onClick={selectOption1}
                        />
                        기존 출제 문항 제외
                      </AdditionOption>
                      <AdditionOption>
                        <CheckBox
                          isChecked={isOption2}
                          onClick={selectOption2}
                        />
                        교육 과정 외 유형 제외
                      </AdditionOption>
                      <AdditionOption>
                        <CheckBox
                          isChecked={isOption3}
                          onClick={selectOption3}
                        />
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
                    <Summary>
                      학습지 문항수 {inputValue || questionNum} 개 | 유형 3개
                    </Summary>
                  </SchoolSelectorSection>
                </>
              )}
            </>
          )}
          {tabVeiw === '수능/모의고사' && (
            <>
              <CategorySection>
                <TabWrapper>
                  <TabMenu
                    length={3}
                    menu={menuList}
                    width={'350px'}
                    lineStyle
                    selected={tabVeiw}
                    setTabVeiw={setTabVeiw}
                  />
                </TabWrapper>
              </CategorySection>
              <SchoolSelectorSection>
                <SubTitleWrapper>
                  <Label value="*문항수" fontSize="16px" width="60px" />
                  <Label value="최대 100문항" fontSize="12px" width="440px" />
                </SubTitleWrapper>

                <SelectorGroup>
                  <SelectorWrapper>
                    <Button
                      buttonType="button"
                      onClick={() => {
                        selectQuestionNum('25');
                      }}
                      $padding="10px"
                      height={'34px'}
                      width={'100px'}
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
                      width={'100px'}
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
                      width={'100px'}
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
                      maxLength={3}
                      onClick={() => selectQuestionNum('')}
                      style={{
                        color:
                          questionNum === '' ? 'white' : `${COLOR.PRIMARY}`,
                        backgroundColor:
                          questionNum === '' ? `${COLOR.PRIMARY}` : 'white',
                      }}
                      onChange={(e) => {
                        changeInputValue(e);
                      }}
                    ></NumberInput>
                    문항
                  </SelectorWrapper>
                </SelectorGroup>

                <SubTitleWrapper>
                  <Label value="*난이도" fontSize="16px" width="200px" />
                  <AdditionOption>
                    <IoSettingsOutline
                      onClick={openDifficultySetting}
                      style={{ cursor: 'pointer' }}
                    />
                    난이도 설정
                  </AdditionOption>
                </SubTitleWrapper>
                <SelectorGroup>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      selectQuestionLevel('하');
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'92px'}
                    fontSize="14px"
                    $normal={questionLevel !== '하'}
                    $filled={questionLevel === '하'}
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
                    width={'92px'}
                    fontSize="14px"
                    $normal={questionLevel !== '중하'}
                    $filled={questionLevel === '중하'}
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
                    width={'92px'}
                    fontSize="14px"
                    $normal={questionLevel !== '중'}
                    $filled={questionLevel === '중'}
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
                    width={'92px'}
                    fontSize="14px"
                    $normal={questionLevel !== '상'}
                    $filled={questionLevel === '상'}
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
                    width={'93px'}
                    fontSize="14px"
                    $normal={questionLevel !== '최상'}
                    $filled={questionLevel === '최상'}
                    cursor
                  >
                    <span>최상</span>
                  </Button>
                </SelectorGroup>
                <SubTitleWrapper>
                  <Label value="*문항 타입" fontSize="16px" width="200px" />
                  <AdditionOption>
                    자동 체점
                    <CheckBox
                      width="16"
                      height="16"
                      isChecked={isAutoGrading}
                      onClick={checkAutoGrading}
                    />
                  </AdditionOption>
                </SubTitleWrapper>
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
                    width={'120px'}
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
                    width={'117px'}
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
                    width={'117px'}
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
                    width={'117px'}
                    fontSize="14px"
                    $normal={!questionType.includes('서술형')}
                    $filled={questionType.includes('서술형')}
                    cursor
                  >
                    <span>서술형</span>
                  </Button>
                </SelectorGroup>
                <Label
                  value="*모의고사 포함 여부"
                  fontSize="16px"
                  width="200px"
                />
                <SelectorGroup>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      selectContainMock('포함');
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'161px'}
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
                    width={'160px'}
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
                    width={'160px'}
                    fontSize="14px"
                    $normal={containMock !== '모의고사만'}
                    $filled={containMock === '모의고사만'}
                    cursor
                  >
                    <span>모의고사만</span>
                  </Button>
                </SelectorGroup>
                <AdditionOptionList>
                  <Label value="추가 옵션" fontSize="16px" width="200px" />
                  <AdditionOption>
                    <CheckBox isChecked={isOption1} onClick={selectOption1} />
                    기존 출제 문항 제외
                  </AdditionOption>
                  <AdditionOption>
                    <CheckBox isChecked={isOption2} onClick={selectOption2} />
                    교육 과정 외 유형 제외
                  </AdditionOption>
                  <AdditionOption>
                    <CheckBox isChecked={isOption3} onClick={selectOption3} />
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
                <Summary>
                  학습지 문항수 {inputValue || questionNum} 개 | 유형 3개
                </Summary>
              </SchoolSelectorSection>
            </>
          )}
        </MainWrapper>
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
      </Wrapper>
      {isDifficulty && (
        <Overlay>
          <ModalContainer>
            <ModalWrapper>
              <ModalTitleWrapper>
                <ModalTitle>난이도 비율 선택</ModalTitle>
                <ModalSubTitle>
                  난이도 별로 출제 비율의 총합은 각각 100이 되어야 합니다.
                </ModalSubTitle>
              </ModalTitleWrapper>
              <IoMdClose
                onClick={closeDifficultySetting}
                style={{ fontSize: '25px' }}
              />
            </ModalWrapper>
            <ModalCategory>
              <ModalCategoryOption>하</ModalCategoryOption>
              <ModalCategoryOption>중하</ModalCategoryOption>
              <ModalCategoryOption>중</ModalCategoryOption>
              <ModalCategoryOption>상</ModalCategoryOption>
              <ModalCategoryOption>최상</ModalCategoryOption>
              <ModalCategoryOption>총합</ModalCategoryOption>
            </ModalCategory>
            <div>
              <InputWrapper>
                <Label value="최상 선택시" fontSize="16px" width="200px" />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
              </InputWrapper>
              <InputWrapper>
                <Label value="상 선택시" fontSize="16px" width="200px" />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
              </InputWrapper>
              <InputWrapper>
                <Label value="중 선택시" fontSize="16px" width="200px" />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
              </InputWrapper>
              <InputWrapper>
                <Label value="중하 선택시" fontSize="16px" width="200px" />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
              </InputWrapper>
              <InputWrapper>
                <Label value="하 선택시" fontSize="16px" width="200px" />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
                <Input
                  width="80px"
                  height="40px"
                  padding="10px"
                  border="normal"
                  placeholderSize="14px"
                  fontSize="14px"
                  type="text"
                  placeholder="0"
                  placeholderTextAlign
                  //value={gradeValue}
                  // onChange={(e) => {
                  //   setGradeValue(e.target.value);
                  // }}
                />
              </InputWrapper>
            </div>
            <ModalButtonWrapper>
              <Button
                buttonType="button"
                onClick={() => {}}
                $padding="10px"
                height={'35px'}
                width={'100px'}
                fontSize="13px"
                $filled
                cursor
              >
                <span>저장</span>
              </Button>
            </ModalButtonWrapper>
          </ModalContainer>
        </Overlay>
      )}
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
`;
const Span = styled.span`
  color: #1976d2;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const MainWrapper = styled.div`
  min-height: 750px;
  display: flex;
  gap: 20px;
`;
const CategorySection = styled.section`
  flex: 1 0 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${COLOR.BORDER_POPUP};
  border-radius: 25px;
`;
const TabWrapper = styled.div`
  width: 100%;
  padding: 10px 0px;
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
const CategoryWrapper = styled.div`
  width: 100%;
  border-top: 1px solid ${COLOR.BORDER_BLUE};
  padding: 10px;
`;
const SchoolSelectorSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${COLOR.BORDER_POPUP};
  padding: 20px;
  border-radius: 25px;
  flex: 1 0 0;
`;
const SubTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 14px;
`;
const SelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
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
`;
const Summary = styled.div`
  font-size: 20px;
  display: flex;
  margin: 0 auto;
`;
const NextStepButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
`;
//시중교재
const SchoolGradeWrapper = styled.div`
  width: 100%;
  border-top: 1px solid ${COLOR.BORDER_BLUE};
  padding: 10px;
`;
const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0 10px 10px 0;
`;
const ListWrapper = styled.div`
  width: 100%;
  min-height: 550px;
  padding: 0 10px;
`;
const ListTitleWrapper = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: ${COLOR.TABLE_GRAY};
  border-top: 1px solid ${COLOR.BORDER_GRAY};
  border-bottom: 1px solid ${COLOR.BORDER_GRAY};

  .schoolGrade {
    min-width: 15%;
  }
  .title {
    min-width: 60%;
  }
  .series {
    min-width: 10%;
  }
  .publisher {
    min-width: 15%;
  }
`;
const ListTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: center;
`;
const TextbookList = styled.li`
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: white;
  font-size: 14px;
  border-bottom: 1px solid ${COLOR.BORDER_GRAY};

  .schoolGrade {
    min-width: 15%;
    display: flex;
    justify-content: center;
  }
  .title {
    min-width: 60%;
    display: flex;
    justify-content: center;
  }
  .series {
    min-width: 10%;
    display: flex;
    justify-content: center;
  }
  .publisher {
    min-width: 15%;
    display: flex;
    justify-content: center;
  }
`;
//시중교재 선택 후
const TextbookTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${COLOR.BORDER_BLUE};
  padding: 10px 20px;
`;
const TextbookWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  border-top: 1px solid ${COLOR.BORDER_BLUE};
`;
const TextbookLeftWrapper = styled.div`
  height: 100%;
  padding: 10px;
  flex: 1 0 30%;
`;
const TextbookRightWrapper = styled.div`
  height: 100%;
  border-left: 1px solid ${COLOR.BORDER_BLUE};
  padding: 10px;
  flex: 1 0 70%;
`;
const TextbookTypeWrapper = styled.div`
  padding-bottom: 10px;
`;
const CheckboxWrapper = styled.div<{
  $isChoice?: boolean;
  $choicedIdx?: number;
}>`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  background-color: ${({ $isChoice, $choicedIdx }) =>
    $isChoice && $choicedIdx ? COLOR.BUTTON_LIGHT_NORMAL : 'white'};
`;

//학습지 난이도 모달
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
const ModalContainer = styled.div`
  width: 1000px;
  height: 500px;
  background-color: white;
  border: 1px solid ${COLOR.BORDER_GRAY};
  border-radius: 10px;
  padding: 10px;
`;
const ModalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 40px;
`;
const ModalTitleWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
`;
const ModalTitle = styled.div`
  font-size: 25px;
`;
const ModalSubTitle = styled.div`
  font-size: 16px;
`;
const ModalCategory = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-size: 20px;
  gap: 88px;
  border-bottom: 2px solid ${COLOR.BORDER_GRAY};
  padding: 10px 40px;
`;
const ModalCategoryOption = styled.div`
  display: flex;
  justify-content: center;
  width: 45px;
`;
const InputWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  gap: 53px;
`;
const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  padding-right: 10px;
`;
