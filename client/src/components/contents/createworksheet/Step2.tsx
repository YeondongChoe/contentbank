import * as React from 'react';
import { useState, useRef } from 'react';

import { IoMdClose, IoIosArrowBack } from 'react-icons/io';
import { MdOutlineRestartAlt } from 'react-icons/md';
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
  console.log(content);

  // const [selectValue, setSelectValue] = useState<string>();
  // const selectOption = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   const value = event.currentTarget.value;
  //   setSelectValue(value);
  // };

  console.log(content);

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
      <TitleWrapper>
        <IconWrapper>
          <IoIosArrowBack
            style={{ fontSize: '24px', cursor: 'pointer' }}
            onClick={goBackMainPopup}
          />
        </IconWrapper>
        <Title>
          <Span>
            {/* {!isEditWorksheet && <FrontSpan>STEP 1 -</FrontSpan>} */}
            STEP 2
          </Span>
          학습지 상세 편집
        </Title>
      </TitleWrapper>
      <Wrapper>
        <DiscriptionSection>
          {isSimilar ? (
            <SimilarWrapper>
              <SimilarCloseButtonWrapper>
                <IoMdClose
                  onClick={() => setIsSimilar(false)}
                  style={{ fontSize: '22px', cursor: 'pointer' }}
                />
              </SimilarCloseButtonWrapper>
              <SimilarTitleWrapper>
                <SimilarTitle>
                  1번 유사 문항
                  <SimilarTitleSpan>
                    문항을 교체하거나, 추가할 수 있습니다.
                  </SimilarTitleSpan>
                </SimilarTitle>
                <RestartWrapper>
                  <MdOutlineRestartAlt
                    style={{ fontSize: '22px', cursor: 'pointer' }}
                  />
                  새로 불러오기
                </RestartWrapper>
              </SimilarTitleWrapper>
              <SimilarContentsWrapper>
                <div>ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ</div>
                <div>문항 뷰어</div>
                <div>데이터값으로 받아온 문항 뷰어로 보여주기</div>
                <div>교체</div>
                <div>+추가</div>
              </SimilarContentsWrapper>
            </SimilarWrapper>
          ) : (
            <>
              <TabWrapper>
                <TabMenu
                  length={4}
                  menu={menuList}
                  initialValue={'학습지 요약'}
                  width={'500px'}
                  lineStyle
                />
              </TabWrapper>
              <DiscriptionWrapper>
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
                <Label value="문항 상세 내용 및 순서 변경" fontSize="16px" />
                <ContentsList>
                  {contentList.map((el, i) => (
                    <Content
                      key={i}
                      onClick={() => {
                        selectContentCode(el.sort);
                      }}
                      $choiced={el.sort === selectedCode}
                      draggable
                      onDragStart={(e) => dragStart(e, i)}
                      onDragEnter={(e) => dragEnter(e, i)}
                      onDragOver={dragOver}
                      onDragEnd={drop}
                    >
                      {el.code}
                    </Content>
                  ))}
                </ContentsList>
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
                onClick={showSimilarContent}
                isSimilar={isSimilar}
                index={i + 1}
                data={card}
                selectedCardIndex={selectedCardIndex}
                onSelectCard={setSelectedCardIndex}
              ></MathviewerCard>
            </div>
          ))}
        </ContentListSection>
      </Wrapper>
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
const Span = styled.span`
  color: #1976d2;
  padding-right: 10px;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 20px;
`;
const DiscriptionSection = styled.section`
  min-height: 770px;
  display: flex;
  flex: 1 0 40%;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${COLOR.BORDER_POPUP};
  border-radius: 25px;
`;
const TabWrapper = styled.div`
  width: 100%;
  padding: 10px 0px;
`;
const DiscriptionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
`;
const Discripton = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
`;
const DiscriptonOutline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
`;
const DiscriptonType = styled.div`
  padding-top: 10px;
  font-size: 14px;
  color: ${COLOR.TEXT_GRAY};
`;
const ContentsList = styled.div`
  padding: 10px 20px;
`;
const Content = styled.div<{ $choiced?: boolean }>`
  font-size: 14px;
  background-color: ${(props) =>
    props.$choiced ? `${COLOR.BORDER_BLUE}` : 'white'};
  color: ${(props) => (props.$choiced ? 'white' : 'initial')};
  cursor: pointer;
`;
const SimilarWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
const SimilarCloseButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const SimilarTitleWrapper = styled.div`
  padding: 10px;
`;
const SimilarTitle = styled.div``;
const SimilarTitleSpan = styled.span`
  font-size: 12px;
  padding-left: 10px;
  color: ${COLOR.BORDER_BLUE};
`;
const RestartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 10px;
`;
const SimilarContentsWrapper = styled.div``;
const ContentListSection = styled.section`
  height: 770px;
  display: flex;
  flex: 1 0 60%;
  flex-direction: column;
  align-items: center;
  border-radius: 25px;
  padding: 10px;
  gap: 10px;
  background-color: black;
  overflow-y: auto;
`;
const ListFilter = styled.div`
  width: 900px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  color: white;
  gap: 5px;
`;
const SelectWrapper = styled.div`
  display: flex;
  gap: 5px;
`;
const NextStepButtonWrapper = styled.div`
  padding: 10px 0px;
  display: flex;
  justify-content: flex-end;
`;
