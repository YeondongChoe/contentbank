import * as React from 'react';
import { useState, useRef } from 'react';

import { IoMdClose, IoIosArrowBack } from 'react-icons/io';
import { IoMenuOutline } from 'react-icons/io5';
import { MdOutlineRestartAlt } from 'react-icons/md';
import {
  PiArrowClockwiseBold,
  PiArrowCounterClockwiseBold,
} from 'react-icons/pi';
import { RiListSettingsLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import {
  Button,
  TabMenu,
  Label,
  BarChart,
  MathviewerCard,
  Select,
} from '../..';
import { COLOR } from '../../constants';
import Contents2 from '../../mathViewer/test2.json';
import Contents3 from '../../mathViewer/test3.json';
import Contents4 from '../../mathViewer/test4.json';
import dummy from '../createcontent/data.json';
// import {
//   createWorksheetStep1BoolAtom,
//   createWorksheetStep2BoolAtom,
//   createWorksheetStep3BoolAtom,
//   editWorksheetBoolAtom,
// } from '../../store/creatingWorksheetAtom';

import { Step3 } from './Step3';

export function Step2() {
  const [tabVeiw, setTabVeiw] = useState<string>('학습지 요약');
  const menuList = [
    {
      label: '학습지 요약',
      value: '학습지 요약',
    },
    {
      label: '새 문항 추가',
      value: '새 문항 추가',
    },
    {
      label: '즐겨찾는 문항',
      value: '즐겨찾는 문항',
    },
    {
      label: '개념',
      value: '개념',
    },
  ];
  const Data = [
    { value: 0, label: '하' },
    { value: 0, label: '중하' },
    { value: 100, label: '중' },
    { value: 0, label: '상' },
    { value: 0, label: '최상' },
  ];
  const list = [
    Contents2,
    Contents3,
    Contents4,
    Contents2,
    Contents3,
    Contents4,
  ];
  const selectCategory = [
    {
      id: '1',
      label: '사용자 정렬',
      value: '1',
      options: [
        { id: '0', label: '사용자 정렬', value: '0' },
        { id: '1', label: '객관식 상단배치', value: '1' },
        { id: '2', label: '무작위 정렬', value: '2' },
      ],
    },
    {
      id: '2',
      label: '문제만 보기',
      value: '2',
      options: [
        { id: '0', label: '문제만 보기', value: '0' },
        { id: '1', label: '문제+정답', value: '1' },
        { id: '2', label: '문제+정답+해설', value: '2' },
      ],
    },
  ];
  const [content, setContent] = useState<string[]>([]);
  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);
  };

  // const [selectValue, setSelectValue] = useState<string>();
  // const selectOption = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   const value = event.currentTarget.value;
  //   setSelectValue(value);
  // };

  const navigate = useNavigate();
  const [isSimilar, setIsSimilar] = useState(false);
  const ContentList = dummy.ContentInfo;

  const [selectedCardIndex, setSelectedCardIndex] = useState<number>();

  const showSimilarContent = () => {
    setIsSimilar(true);
    console.log('어떤 데이터 값으로 호출?');
  };

  const [contentList, setContentList] = useState(ContentList);
  const [selectedCode, setSelectedCode] = useState(null);

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const dragStart = (e: React.DragEvent, position: number) => {
    dragItem.current = position;
  };
  const dragEnter = (e: React.DragEvent, position: number) => {
    dragOverItem.current = position;
  };
  const dragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const drop = () => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const newList = [...contentList];
      const [removed] = newList.splice(dragItem.current, 1);
      newList.splice(dragOverItem.current, 0, removed);
      dragItem.current = null;
      dragOverItem.current = null;
      setContentList(newList);
    }
  };
  const checkSelectedContentCode = (sort: any) => {
    setSelectedCode(sort === selectedCode ? null : sort);
  };
  const selectContentCode = (sort: number) => {
    checkSelectedContentCode(sort);
    console.log('가지고 있는 Info 뿌려주기');
  };

  const goBackMainPopup = () => {
    //setIsStep2(false);
    navigate('/content-create/exam/step1');
  };

  const moveStep3 = () => {
    // setIsStep3(true);
    navigate('/content-create/exam/step3');
    console.log('받아온 데이타를 수정한 가공한 데이타를 넘겨주기');
  };

  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <IconWrapper>
            <IoIosArrowBack
              style={{ fontSize: '24px', cursor: 'pointer' }}
              onClick={goBackMainPopup}
            />
          </IconWrapper>
          <Title>
            <Span>
              <FrontSpan>STEP 1 - </FrontSpan>
              STEP 2
            </Span>
            학습지 상세 편집
          </Title>
        </TitleWrapper>
        <MainWrapper>
          <DiscriptionSection>
            {isSimilar ? (
              <>
                <SimilarCloseButtonWrapper>
                  <IoMdClose
                    onClick={() => setIsSimilar(false)}
                    style={{ fontSize: '22px', cursor: 'pointer' }}
                  />
                </SimilarCloseButtonWrapper>
                <SimilarWrapper>
                  <SimilarTitleWrapper>
                    <SimilarTitle>
                      1번 유사 문항
                      <SimilarTitleSpan>
                        문항을 교체하거나, 추가할 수 있습니다.
                      </SimilarTitleSpan>
                    </SimilarTitle>
                    <SimilarIconWrapper>
                      <SimilarIcon>
                        <PiArrowCounterClockwiseBold
                          style={{ fontSize: '22px', cursor: 'pointer' }}
                        />
                        이전 불러오기
                      </SimilarIcon>
                      <SimilarIcon>
                        <PiArrowClockwiseBold
                          style={{ fontSize: '22px', cursor: 'pointer' }}
                        />
                        새로 불러오기
                      </SimilarIcon>
                    </SimilarIconWrapper>
                  </SimilarTitleWrapper>
                  <SimilarContentsWrapper>
                    {list.map((card, i) => (
                      <div
                        key={i}
                        // draggable
                        // onDragStart={(e) => dragStart(e, i)}
                        // onDragEnter={(e) => dragEnter(e, i)}
                        // onDragOver={dragOver}
                        // onDragEnd={drop}
                      >
                        <MathviewerCard
                          width="300px"
                          onClick={showSimilarContent}
                          isSimilarQuiz={true}
                          index={i + 1}
                          data={card}
                          selectedCardIndex={selectedCardIndex}
                          onSelectCard={setSelectedCardIndex}
                        ></MathviewerCard>
                      </div>
                    ))}
                  </SimilarContentsWrapper>
                </SimilarWrapper>
              </>
            ) : (
              <>
                <TabWrapper>
                  <TabMenu
                    length={4}
                    menu={menuList}
                    width={'500px'}
                    lineStyle
                    selected={tabVeiw}
                    setTabVeiw={setTabVeiw}
                  />
                </TabWrapper>
                <DiscriptionWrapper>
                  {tabVeiw === '학습지 요약' && (
                    <>
                      <Label value="문항 통계" fontSize="16px" />
                      <Discripton>
                        <DiscriptonOutline>
                          <div>총 45 문항</div>
                          <DiscriptonType>객관식 20</DiscriptonType>
                          <DiscriptonType>주관식 10</DiscriptonType>
                          <DiscriptonType>서술형 15</DiscriptonType>
                        </DiscriptonOutline>
                        <BarChart data={Data}></BarChart>
                      </Discripton>
                      <Label
                        value="문항 상세 내용 및 순서 변경"
                        fontSize="16px"
                      />
                      <ContentsList>
                        <ListCategory>
                          <div className="number">번호</div>
                          <div className="type">문항타입</div>
                          <div className="level">난이도</div>
                          <div className="title">유형명</div>
                          <div className="icon">순서변경</div>
                        </ListCategory>
                        <div>
                          {contentList.map((el, i) => (
                            <Content
                              key={i}
                              onClick={() => {
                                selectContentCode(el.sort);
                              }}
                              $choiced={el.sort === selectedCode}
                            >
                              <div className="number">{el.sort}</div>
                              <div className="type">{el.unitType}</div>
                              <div className="level">{el.contentLevel}</div>
                              <div className="title">{el.unitMajor}</div>
                              <div
                                className="icon"
                                draggable={el.sort === selectedCode}
                                onDragStart={(e) => dragStart(e, i)}
                                onDragEnter={(e) => dragEnter(e, i)}
                                onDragOver={dragOver}
                                onDragEnd={drop}
                              >
                                <IoMenuOutline
                                  style={{ cursor: 'grab' }}
                                ></IoMenuOutline>
                              </div>
                            </Content>
                          ))}
                        </div>
                      </ContentsList>
                    </>
                  )}
                  {tabVeiw === '새 문항 추가' && (
                    <>
                      <AddNewContentOption>
                        <AddNewContentIcon>
                          <RiListSettingsLine
                            style={{ fontSize: '22px', cursor: 'pointer' }}
                          />
                          범위 변경
                        </AddNewContentIcon>
                        <AddNewContentIcon>
                          <PiArrowCounterClockwiseBold
                            style={{ fontSize: '22px', cursor: 'pointer' }}
                          />
                          이전 불러오기
                        </AddNewContentIcon>
                        <AddNewContentIcon>
                          <PiArrowClockwiseBold
                            style={{ fontSize: '22px', cursor: 'pointer' }}
                          />
                          새로 불러오기
                        </AddNewContentIcon>
                        <Button
                          buttonType="button"
                          onClick={() => {}}
                          $padding="10px"
                          height={'30px'}
                          width={'100px'}
                          fontSize="13px"
                          $filled
                          cursor
                        >
                          <span>+ 전체 추가</span>
                        </Button>
                      </AddNewContentOption>
                      <AddNewContensWrapper>
                        {list.map((card, i) => (
                          <div
                            key={i}
                            // draggable
                            // onDragStart={(e) => dragStart(e, i)}
                            // onDragEnter={(e) => dragEnter(e, i)}
                            // onDragOver={dragOver}
                            // onDragEnd={drop}
                          >
                            <MathviewerCard
                              width="300px"
                              onClick={showSimilarContent}
                              isSimilarQuiz={true}
                              index={i + 1}
                              data={card}
                              selectedCardIndex={selectedCardIndex}
                              onSelectCard={setSelectedCardIndex}
                            ></MathviewerCard>
                          </div>
                        ))}
                      </AddNewContensWrapper>
                      {/* <ContentsList>
                        <ListCategory>
                          <div className="number">번호</div>
                          <div className="type">문항타입</div>
                          <div className="level">난이도</div>
                          <div className="title">유형명</div>
                          <div className="icon">순서변경</div>
                        </ListCategory>
                        <div>
                          {contentList.map((el, i) => (
                            <Content
                              key={i}
                              onClick={() => {
                                selectContentCode(el.sort);
                              }}
                              $choiced={el.sort === selectedCode}
                            >
                              <div className="number">{el.sort}</div>
                              <div className="type">{el.unitType}</div>
                              <div className="level">{el.contentLevel}</div>
                              <div className="title">{el.unitMajor}</div>
                              <div
                                className="icon"
                                draggable={el.sort === selectedCode}
                                onDragStart={(e) => dragStart(e, i)}
                                onDragEnter={(e) => dragEnter(e, i)}
                                onDragOver={dragOver}
                                onDragEnd={drop}
                              >
                                <IoMenuOutline
                                  style={{ cursor: 'grab' }}
                                ></IoMenuOutline>
                              </div>
                            </Content>
                          ))}
                        </div>
                      </ContentsList> */}
                    </>
                  )}
                </DiscriptionWrapper>
              </>
            )}
          </DiscriptionSection>

          <ContentListSection>
            <ListFilter>
              <Label value="선택한 문항 목록(총45문항)" fontSize="16px" />
              <SelectWrapper>
                {selectCategory.map((el) => (
                  <Select
                    width={'150px'}
                    key={el.label}
                    defaultValue={el.label}
                    options={el.options}
                    onSelect={(event) => selectCategoryOption(event)}
                    blackMode
                  ></Select>
                ))}
              </SelectWrapper>
            </ListFilter>
            <ContentListWrapper>
              {list.map((card, i) => (
                <div
                  key={i}
                  // draggable
                  // onDragStart={(e) => dragStart(e, i)}
                  // onDragEnter={(e) => dragEnter(e, i)}
                  // onDragOver={dragOver}
                  // onDragEnd={drop}
                >
                  <MathviewerCard
                    componentWidth="750px"
                    width="500px"
                    onClick={showSimilarContent}
                    isSimilar={isSimilar}
                    index={i + 1}
                    data={card}
                    selectedCardIndex={selectedCardIndex}
                    onSelectCard={setSelectedCardIndex}
                  ></MathviewerCard>
                </div>
              ))}
            </ContentListWrapper>
          </ContentListSection>
        </MainWrapper>
        <NextStepButtonWrapper>
          <Button
            buttonType="button"
            onClick={moveStep3}
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
`;
const Span = styled.span`
  color: #1976d2;
  padding-right: 10px;
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
//왼쪽 section 공용
const DiscriptionSection = styled.section`
  flex: 1 0 0;
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
//학습지 요약
const DiscriptionWrapper = styled.div`
  width: 100%;
  height: 680px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0px 20px;
`;
const Discripton = styled.div`
  display: flex;
  justify-content: space-between;
  //gap: 100px;
  padding: 10px 20px;
`;
const DiscriptonOutline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  //padding-right: 30px;
`;
const DiscriptonType = styled.div`
  padding-top: 10px;
  font-size: 14px;
  color: ${COLOR.TEXT_GRAY};
`;
//오른쪽 section
const ContentListSection = styled.section`
  flex: 1 0 10%;
  border-radius: 25px;
  padding: 10px;
  background-color: black;
`;
const ContentListWrapper = styled.div`
  height: 683px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  overflow-y: auto;
`;
const ContentsList = styled.div`
  padding: 10px 20px;
  height: 450px;
  overflow-y: auto;
`;
const ListCategory = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 16px;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  padding: 10px 0;

  .number {
    display: flex;
    justify-content: center;
    width: 40px;
  }
  .type {
    display: flex;
    justify-content: center;
    width: 70px;
  }
  .level {
    display: flex;
    justify-content: center;
    width: 50px;
  }
  .title {
    display: flex;
    justify-content: center;
    width: 200px;
  }
  .icon {
    display: flex;
    justify-content: center;
    width: 70px;
  }
`;
const Content = styled.div<{ $choiced?: boolean }>`
  font-size: 14px;
  background-color: ${(props) =>
    props.$choiced ? `${COLOR.BORDER_BLUE}` : 'white'};
  color: ${(props) => (props.$choiced ? 'white' : 'initial')};
  display: flex;
  justify-content: space-around;
  gap: 10px;
  border-bottom: 1px solid gray;
  padding: 10px 0;
  .number {
    display: flex;
    justify-content: center;
    width: 40px;
  }
  .type {
    display: flex;
    justify-content: center;
    width: 70px;
  }
  .level {
    display: flex;
    justify-content: center;
    width: 50px;
  }
  .title {
    display: flex;
    justify-content: center;
    width: 200px;
  }
  .icon {
    display: flex;
    justify-content: center;
    width: 70px;
  }
`;
const ListFilter = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
  color: white;
  gap: 5px;
  padding-bottom: 10px;
`;
const SelectWrapper = styled.div`
  display: flex;
  gap: 5px;
`;
const NextStepButtonWrapper = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
`;
//유사문항
const SimilarCloseButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  padding-right: 20px;
`;
const SimilarWrapper = styled.div`
  width: 100%;
  height: 708px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0px 20px;
`;
const SimilarTitleWrapper = styled.div`
  padding: 0 0 20px 0;
`;
const SimilarTitle = styled.div``;
const SimilarTitleSpan = styled.span`
  font-size: 12px;
  padding-left: 10px;
  color: ${COLOR.BORDER_BLUE};
`;
const SimilarIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 20px;
  gap: 20px;
`;
const SimilarIcon = styled.div`
  display: flex;
  gap: 5px;
`;
const SimilarContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  overflow-y: auto;
`;
//새 문항 추가
const AddNewContentOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
  padding: 10px 0;
`;
const AddNewContentIcon = styled.div`
  display: flex;
  gap: 5px;
`;
const AddNewContensWrapper = styled.div`
  height: 620px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  overflow-y: auto;
`;
