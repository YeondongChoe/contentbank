import * as React from 'react';
import { useState, useRef } from 'react';

import { IoMdClose, IoIosArrowBack } from 'react-icons/io';
import { IoMenuOutline } from 'react-icons/io5';
import {
  PiArrowClockwiseBold,
  PiArrowCounterClockwiseBold,
} from 'react-icons/pi';
import { RiListSettingsLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import {
  Button,
  TabMenu,
  Label,
  BarChart,
  MathviewerCard,
  MathviewerAccordion,
  Select,
  CheckBox,
} from '../..';
import { COLOR } from '../../constants';
import Contents2 from '../../mathViewer/test2.json';
import Contents3 from '../../mathViewer/test3.json';
import Contents4 from '../../mathViewer/test4.json';
import dummy from '../createcontent/data.json';

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
  // const list = [
  //   Contents2,
  //   Contents3,
  //   Contents4,
  //   Contents2,
  //   Contents3,
  //   Contents4,
  // ];
  const [list, setList] = useState([Contents2, Contents3, Contents4]);
  const bookmark: any[] = [];
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
  const [listCategory, setListCategory] = useState<string[]>([]);
  const selectListCategoryOption = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const value = event.currentTarget.value;
    setListCategory((prevContent) => [...prevContent, value]);
  };
  const bookmarkSelectCategory = [
    {
      id: '1',
      label: '1000이 10인 수 알아보기',
      value: '1',
      options: [
        { id: '0', label: '1000이 10인 수 알아보기', value: '0' },
        { id: '1', label: '객관식 상단배치', value: '1' },
        { id: '2', label: '무작위 정렬', value: '2' },
      ],
    },
  ];
  const [bookmarkCategory, setBookmarkCategory] = useState<string[]>([]);
  const selectBookmarkCategoryOption = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const value = event.currentTarget.value;
    setBookmarkCategory((prevContent) => [...prevContent, value]);
  };
  const [recommend, setRecommend] = useState<boolean>(false);

  const navigate = useNavigate();
  const [isSimilar, setIsSimilar] = useState(false);
  const ContentList = dummy.ContentInfo;

  const [selectedCardIndex, setSelectedCardIndex] = useState<number>();

  const showSimilarContent = () => {
    setIsSimilar(true);
    console.log('어떤 데이터 값으로 호출?');
  };

  const [contentList, setContentList] = useState(ContentList);

  const [selectedIndex, setSelectedIndex] = useState<number>();
  console.log(selectedIndex);

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const dragStart = (e: React.DragEvent, position: number, sort: number) => {
    setSelectedIndex(sort);
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
  // const Mathviwerdrop = () => {
  //   if (dragItem.current !== null && dragOverItem.current !== null) {
  //     // 가정: contentList의 각 항목이 객체인 경우
  //     const newList: Array<{
  //       sort: number;
  //       contentLevel: string;
  //       code: string /* ... 추가적인 속성 ... */;
  //     }> = [...contentList];

  //     const [removed] = newList.splice(dragItem.current, 1);

  //     newList.splice(dragOverItem.current, 0, removed[0]);
  //     dragItem.current = null;
  //     dragOverItem.current = null;

  //     // Assuming setList's parameter type is SetStateAction<Array<{ sort: number; contentLevel: string; code: string; /* ... 추가적인 속성 ... */ }>>
  //     setList(newList);
  //   }
  // };
  const goBackMainPopup = () => {
    navigate('/content-create/exam/step1');
  };

  const moveStep3 = () => {
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
              <FrontSpan onClick={goBackMainPopup}>STEP 1 - </FrontSpan>
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
                      <Discription>
                        <DiscriptionOutline>
                          <div>총 45 문항</div>
                          <DiscriptionType>객관식 20</DiscriptionType>
                          <DiscriptionType>주관식 10</DiscriptionType>
                          <DiscriptionType>서술형 15</DiscriptionType>
                        </DiscriptionOutline>
                        <BarChart data={Data}></BarChart>
                      </Discription>
                      <Label
                        value="문항 상세 내용 및 순서 변경"
                        fontSize="16px"
                      />
                      <ContentsList>
                        <ListCategory>
                          <div className="number">번호</div>
                          <div className="type">문항타입</div>
                          <div className="level">난이도</div>
                          <div className="title">유형명명</div>
                          <div className="icon">순서변경</div>
                        </ListCategory>
                        <div>
                          {contentList.map((el, i) => (
                            <Content
                              key={i}
                              $isSelected={el.sort === selectedIndex}
                              className={
                                i === dragItem.current ? 'dragging' : ''
                              }
                              draggable
                              onDragStart={(e) => dragStart(e, i, el.sort)}
                              onDragEnter={(e) => dragEnter(e, i)}
                              onDragOver={dragOver}
                              onDragEnd={drop}
                            >
                              <div className="number">{el.sort}</div>
                              <div className="type">{el.unitType}</div>
                              <div className="level">{el.contentLevel}</div>
                              <div className="title">{el.unitMajor}</div>
                              <div className="icon">
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
                              onClick={() => {}}
                              isSimilarQuiz={true}
                              index={i + 1}
                              data={card}
                              selectedCardIndex={selectedCardIndex}
                              onSelectCard={setSelectedCardIndex}
                            ></MathviewerCard>
                          </div>
                        ))}
                      </AddNewContensWrapper>
                    </>
                  )}
                  {tabVeiw === '즐겨찾는 문항' && (
                    <>
                      {bookmark.length !== 0 ? (
                        <>
                          <BookmarkContentOption>
                            <SelectWrapper>
                              {bookmarkSelectCategory.map((el) => (
                                <Select
                                  width={'250px'}
                                  defaultValue={el.label}
                                  key={el.label}
                                  options={el.options}
                                  onSelect={(event) =>
                                    selectBookmarkCategoryOption(event)
                                  }
                                />
                              ))}
                            </SelectWrapper>
                            <BookmarkContentCheckWrapper>
                              <CheckBox
                                isChecked={recommend}
                                onClick={() => setRecommend(!recommend)}
                              ></CheckBox>
                              내 문항 우선 추천
                            </BookmarkContentCheckWrapper>
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
                          </BookmarkContentOption>
                          <BookmarkContensWrapper>
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
                                  onClick={() => {}}
                                  isSimilarQuiz={true}
                                  index={i + 1}
                                  data={card}
                                  selectedCardIndex={selectedCardIndex}
                                  onSelectCard={setSelectedCardIndex}
                                ></MathviewerCard>
                              </div>
                            ))}
                          </BookmarkContensWrapper>
                        </>
                      ) : (
                        <BookmarkContensEmptyWrapper>
                          <BookmarkContensEmptyDiscription>
                            즐겨 찾기에 추가된 문항이 없습니다.
                          </BookmarkContensEmptyDiscription>
                          <BookmarkContensEmptyDiscription>
                            마음에 드는 문항을 저장하여 학습지나 교재를
                          </BookmarkContensEmptyDiscription>
                          <BookmarkContensEmptyDiscription>
                            만들 때 활용하세요.
                          </BookmarkContensEmptyDiscription>
                        </BookmarkContensEmptyWrapper>
                      )}
                    </>
                  )}
                  {tabVeiw === '개념' && (
                    <>
                      <ConceptWrapper>
                        <ConceptDiscription>
                          준비중인 기능입니다...
                        </ConceptDiscription>
                      </ConceptWrapper>
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
                    onSelect={(event) => selectListCategoryOption(event)}
                    blackMode
                  ></Select>
                ))}
              </SelectWrapper>
            </ListFilter>
            <ContentListWrapper>
              {list.map((card, i) => (
                <MathviewerCardWrapper
                  key={i}
                  //$isSelected={i === selectedIndex}
                  //className={i === dragItem.current ? 'dragging' : ''}
                  //draggable
                  //onDragStart={(e) => dragStart(e, i, i)}
                  //onDragEnter={(e) => dragEnter(e, i)}
                  //onDragOver={dragOver}
                  //onDragEnd={drop}
                >
                  {/* <MathviewerCard
                    className={i === dragItem.current ? 'dragging' : ''}
                    componentWidth="750px"
                    width="500px"
                    onClick={showSimilarContent}
                    isSimilar={isSimilar}
                    index={i + 1}
                    data={card}
                    isDragged={i === selectedIndex}
                    selectedCardIndex={selectedCardIndex}
                    onSelectCard={setSelectedCardIndex}
                    dragStart={() => (e: any) => dragStart(e, i, card.seq)}
                    dragEnter={() => (e: any) => dragEnter(e, i)}
                    dragOver={dragOver}
                    drop={drop}
                  ></MathviewerCard> */}
                  <MathviewerAccordion
                    className={i === dragItem.current ? 'dragging' : ''}
                    componentWidth="750px"
                    width="500px"
                    onClick={showSimilarContent}
                    isSimilar={isSimilar}
                    index={i + 1}
                    data={card}
                    isDragged={i === selectedIndex}
                    selectedCardIndex={selectedCardIndex}
                    onSelectCard={setSelectedCardIndex}
                    dragStart={() => (e: any) => dragStart(e, i, card.seq)}
                    dragEnter={() => (e: any) => dragEnter(e, i)}
                    dragOver={dragOver}
                    drop={drop}
                  ></MathviewerAccordion>
                </MathviewerCardWrapper>
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
  cursor: pointer;
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
const Discription = styled.div`
  display: flex;
  justify-content: space-between;
  //gap: 100px;
  padding: 10px 20px;
`;
const DiscriptionOutline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  //padding-right: 30px;
`;
const DiscriptionType = styled.div`
  padding-top: 10px;
  font-size: 14px;
  color: ${COLOR.TEXT_GRAY};
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
//즐겨찾는 문항
const BookmarkContentOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
  padding: 10px 0;
`;
const BookmarkContentCheckWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const BookmarkContensWrapper = styled.div`
  height: 620px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  overflow-y: auto;
`;
const BookmarkContensEmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const BookmarkContensEmptyDiscription = styled.div`
  width: 400px;
  display: flex;
  align-items: flex-start;
`;
//개념
const ConceptWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ConceptDiscription = styled.div`
  display: flex;
  align-items: center;
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
const MathviewerCardWrapper = styled.div<{ $isSelected?: boolean }>`
  &.dragging {
    transition: transform 0.3s ease-in-out;
    transform: translate(0, 0);
    background-color: ${({ $isSelected }) =>
      $isSelected ? `${COLOR.BORDER_BLUE}` : 'none'};
    color: ${({ $isSelected }) => ($isSelected ? 'white' : 'none')};
  }
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
const Content = styled.div<{ $isSelected?: boolean }>`
  font-size: 14px;
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

  &.dragging {
    transition: transform 0.3s ease-in-out;
    transform: translate(0, 0);
    background-color: ${({ $isSelected }) =>
      $isSelected ? `${COLOR.BORDER_BLUE}` : 'none'};
    color: ${({ $isSelected }) => ($isSelected ? 'white' : 'none')};
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
