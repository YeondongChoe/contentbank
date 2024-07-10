import * as React from 'react';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';

import styled, { ThemeProvider } from 'styled-components';

import { Label } from '../../../components/atom';
import { WorkbookMathViewer } from '../../../components/mathViewer';
import { QuizList } from '../../../types/WorkbookType';

type TypeAProps = {
  title?: string;
  grade?: string;
  tag?: string;
  contentQuantity?: string;
  isWeather?: boolean;
  isContentTypeTitle?: boolean;
  theme?: object;
  initialItems?: QuizList[];
  answerCommentary?: string;
  column?: string;
};

const A4_HEIGHT = 1122;

export const TypeA = ({
  title,
  grade,
  tag,
  contentQuantity,
  isWeather,
  isContentTypeTitle,
  theme,
  initialItems,
  answerCommentary,
  column,
}: TypeAProps) => {
  const [leftList, setLeftList] = useState<QuizList[]>([]);
  const [rightList, setRightList] = useState<QuizList[]>([]);
  console.log(initialItems);

  useEffect(() => {
    if (initialItems) {
      let accumulatedLeftHeight = 0;
      const newInitialList: any[] = [];
      const updatedLeftList: any[] = [];
      const updatedRightList: any[] = [];

      initialItems.forEach((item) => {
        const height = item.height !== undefined ? item.height : 0;
        accumulatedLeftHeight += height;
        const questionWithHeight = { item, accumulatedLeftHeight };
        newInitialList.push(questionWithHeight);
        console.log(newInitialList);

        if (questionWithHeight.accumulatedLeftHeight < 3500) {
          updatedLeftList.push();
        }

        if (accumulatedLeftHeight < 3500) {
          updatedLeftList.push(item);
        } else {
          updatedRightList.push(item);
        }
      });

      // 왼쪽 리스트 업데이트
      setLeftList(updatedLeftList);

      // 오른쪽 리스트 업데이트
      setRightList(updatedRightList);
    }

    if (initialItems && column === '1단') {
      let accumulatedHeight = 0;
      const updatedLeftList: any[] = [];
      initialItems.forEach((item) => {
        // item에서 height를 가져와서 accumulatedHeight에 누적
        const height = item.height !== undefined ? item.height : 0; // height가 undefined일 경우 0으로 처리
        accumulatedHeight += height;

        // accumulatedHeight 기준으로 leftList 또는 rightList에 추가
        if (accumulatedHeight < 3500) {
          updatedLeftList.push(item);
        }
      });

      setLeftList(updatedLeftList);
      setRightList([]);
    }
  }, [initialItems, contentQuantity === '최대', column === '1단']);

  useEffect(() => {
    if (column === '2단') {
      if (contentQuantity === '6문제' && initialItems) {
        setLeftList(initialItems.slice(0, 3));
        setRightList(initialItems.slice(3, 6));
      }
      if (contentQuantity === '4문제' && initialItems) {
        setLeftList(initialItems.slice(0, 2));
        setRightList(initialItems.slice(2, 4));
      }
      if (contentQuantity === '2문제' && initialItems) {
        setLeftList(initialItems.slice(0, 1));
        setRightList(initialItems.slice(1, 2));
      }
    } else {
      if (contentQuantity === '6문제' && initialItems) {
        setLeftList(initialItems.slice(0, 6));
        setRightList([]);
      }
      if (contentQuantity === '4문제' && initialItems) {
        setLeftList(initialItems.slice(0, 4));
        setRightList([]);
      }
      if (contentQuantity === '2문제' && initialItems) {
        setLeftList(initialItems.slice(0, 2));
        setRightList([]);
      }
    }
  }, [contentQuantity, initialItems, column]);

  return (
    <Container>
      <LabelWrapper>
        <Label value="미리보기 화면은 실제 학습지와 약간의 차이가 있습니다."></Label>
      </LabelWrapper>
      <Wrapper>
        <ThemeProvider theme={theme as object}>
          <WorksheetHeader>
            <NoneColorTextWrapper>
              <div className="grade">
                <Label
                  value={(grade as string) || '대상 학년'}
                  padding="0px"
                  fontSize="12px"
                />
              </div>
            </NoneColorTextWrapper>
            <ColorTextWrapper>
              <div className="Title">
                <Label
                  value={(title as string) || '학습지명'}
                  fontSize="24px"
                  bold
                />
              </div>
              <div className="Tag">
                <Label
                  value={
                    (tag === 'EXERCISES'
                      ? '연습문제'
                      : tag === 'DAILY_TEST'
                        ? '일일TEST'
                        : tag === 'PRACTICE_TEST'
                          ? '모의고사'
                          : tag === 'TEST_PREP'
                            ? '내신대비'
                            : tag === 'MONTHLY_TEST'
                              ? '월말TEST'
                              : ('' as string)) || '학습지 태그'
                  }
                  fontSize="12px"
                />
                <div className="CircleBox">
                  <div className="Circle"></div>
                  <div className="Circle"></div>
                  <div className="Circle"></div>
                </div>
              </div>
            </ColorTextWrapper>
          </WorksheetHeader>
          <HeaderTriangle></HeaderTriangle>

          <WorksheetBody $contentQuantity={contentQuantity}>
            <WorksheetBodyLeft>
              {leftList?.map((quizItemList) =>
                quizItemList.quizItemList
                  .filter((quizItem) => quizItem.type === 'QUESTION')
                  .map((quizItem, i) => {
                    const quizCategory = quizItemList.quizCategoryList.find(
                      (quizCategoryItem: any) =>
                        quizCategoryItem.quizCategory.유형,
                    )?.quizCategory;

                    return (
                      <MathViewerWrapper key={i}>
                        {isContentTypeTitle && (
                          <ContentTitle>|{quizCategory?.유형}|</ContentTitle>
                        )}
                        <EachMathViewer>
                          <MathJaxWrapper>
                            <WorkbookMathViewer
                              data={quizItemList}
                              padding={
                                contentQuantity === '4문제'
                                  ? '0 0 60px 0'
                                  : contentQuantity === '6문제'
                                    ? '0 0 60px 0'
                                    : contentQuantity === '최대'
                                      ? '0 0 50px 0'
                                      : '0'
                              }
                              isSetp3
                              answerCommentary={answerCommentary}
                            ></WorkbookMathViewer>
                          </MathJaxWrapper>
                        </EachMathViewer>
                      </MathViewerWrapper>
                    );
                  }),
              )}
            </WorksheetBodyLeft>
            <Divider />
            <WorksheetBodyRight>
              {rightList?.map((quizItemList) =>
                quizItemList.quizItemList
                  .filter((quizItem) => quizItem.type === 'QUESTION')
                  .map((quizItem, i) => {
                    const quizCategory = quizItemList.quizCategoryList.find(
                      (quizCategoryItem: any) =>
                        quizCategoryItem.quizCategory.유형,
                    )?.quizCategory;
                    return (
                      <MathViewerWrapper key={i}>
                        {isContentTypeTitle && (
                          <ContentTitle>|{quizCategory?.유형}|</ContentTitle>
                        )}
                        <EachMathViewer>
                          <MathJaxWrapper>
                            <WorkbookMathViewer
                              data={quizItemList}
                              padding={
                                contentQuantity === '4문제'
                                  ? '0 0 60px 0'
                                  : contentQuantity === '6문제'
                                    ? '0 0 60px 0'
                                    : contentQuantity === '최대'
                                      ? '0 0 50px 0'
                                      : '0'
                              }
                              isSetp3
                              answerCommentary={answerCommentary}
                            ></WorkbookMathViewer>
                          </MathJaxWrapper>
                        </EachMathViewer>
                      </MathViewerWrapper>
                    );
                  }),
              )}
            </WorksheetBodyRight>
          </WorksheetBody>
        </ThemeProvider>
        <FooterBarWrapper>
          <FooterTriangle></FooterTriangle>
          <WorksheetAdditionalInformation>
            {isWeather && (
              <span className="weather">
                <Label value="2024/03/19" fontSize="12px"></Label>
              </span>
            )}
            <span className="pagenumber">1</span>
          </WorksheetAdditionalInformation>
        </FooterBarWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  font-family: 'Spoqa Han Sans Neo';
`;
const LabelWrapper = styled.div`
  width: 100%;
  padding: 10px 0 10px 20px;
  color: white;
`;
const Wrapper = styled.div`
  background-color: white;
  height: 700px;
  //aspect-ratio: 210/157;
  overflow-y: auto;
  border-bottom-left-radius: 20px;
`;

const WorksheetHeader = styled.div`
  position: relative;
  border: 1px solid
    ${({ theme }) => theme?.color?.backgroundColorTypeA || 'initial'};
  width: 99%;
  border-bottom-right-radius: 50px;
  background-color: ${({ theme }) =>
    theme?.color?.backgroundColorTypeA || 'initial'};
  padding: 20px;
`;
const ContentTitle = styled.div`
  color: #888888;
  padding-bottom: 2px;
`;
const ContentScript = styled.div`
  color: #888888;
`;
const HeaderTriangle = styled.div`
  position: relative;
  top: -50px;
  right: 0;
  width: 0;
  height: 0;
  border-bottom: 50px solid transparent;
  border-top: 50px solid transparent;
  border-left: 50px solid
    ${({ theme }) => theme?.color?.backgroundColorTypeA || 'initial'};
  border-right: 50px solid transparent;
`;
const NoneColorTextWrapper = styled.div`
  width: 100px;
  height: 20px;
  margin-bottom: 10px;
  margin-left: 50px;
  background-color: white;
  border-radius: 50px;
  display: flex;
  justify-content: center;

  .grade {
    display: flex;
    align-items: center;
  }
`;
const ColorTextWrapper = styled.div`
  padding: 0 10px 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .Title {
    color: ${({ theme }) => theme?.color?.textColorTypeA || 'initial'};
  }
  .Tag {
    color: ${({ theme }) => theme?.color?.tagColorTypeA || 'initial'};
    display: flex;
    gap: 10px;
  }
  .CircleBox {
    display: flex;
    gap: 5px;
    align-items: flex-end;
    padding-bottom: 8px;
  }
  .Circle {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background-color: ${({ theme }) =>
      theme?.color?.tagColorTypeA || 'initial'};
  }
`;
type WorksheetBodyType = {
  $contentQuantity?: string;
};

const Divider = styled.span`
  display: inline-block;
  width: 2px;
  height: 1400px;
  background-color: #e8e8e8;
  margin: 0 10px;
`;

//전체
const WorksheetBody = styled.div<WorksheetBodyType>`
  position: relative;
  top: -50px;
  /* ${({ $contentQuantity }) =>
    $contentQuantity === '최대' || $contentQuantity === '6문제'
      ? `height: 105%`
      : `height: calc(100% - 327px);`}; */
  margin: 0 auto;
  display: flex;
  width: 1000px;
`;
//왼쪽
const WorksheetBodyLeft = styled.div`
  //flex: 1 0 0;
  width: 48%;
  padding: 10px 20px 0px 20px;
  display: flex;
  flex-direction: column;
`;
//오른쪽
const WorksheetBodyRight = styled.div`
  //flex: 1 0 0;
  width: 48%;
  padding: 10px 20px 0px 10px;
  display: flex;
  flex-direction: column;
`;
//각 아이템
const MathViewerWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  //gap: 2px;
  font-size: 12px;
`;
//비율
const EachMathViewer = styled.div`
  scale: 0.8;
  margin-top: -5px;
  margin-left: -45px;
  //max-width: 541px; /* 최대 허용 너비 */
  //margin: 0 auto; /* 중앙 정렬 */
  //overflow-x: hidden; /* 가로 스크롤이 생길 경우 숨김 처리 */
`;
const MathJaxWrapper = styled.div`
  strong {
    font-size: 25px;
    color: ${({ theme }) => theme?.color?.textColorTypeA || 'initial'};
  }
`;
const FooterBarWrapper = styled.div`
  position: relative;
  overflow: visible;
  //left: 1px;
  //border-bottom-left-radius: 30px;
`;
const FooterTriangle = styled.div`
  position: relative;
  top: 40px;
  right: -920px;
  width: 0;
  border-bottom: 40px solid transparent;
  border-top: 40px solid transparent;
  border-right: 40px solid #e5e5e5;
  border-left: 40px solid transparent;
`;
const WorksheetAdditionalInformation = styled.div`
  position: relative;
  left: 20px;
  width: 98%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #e5e5e5;
  border: 1px solid #e5e5e5;
  border-top-left-radius: 30px;
  padding-right: 60px;
  gap: 800px;

  .weather {
    font-size: 12px;
    color: #888888;
  }
  .pagenumber {
    font-size: 12px;
    font-weight: bold;
    color: #666666;
  }
`;
