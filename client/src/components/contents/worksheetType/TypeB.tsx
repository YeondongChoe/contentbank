import * as React from 'react';
import { useState, useEffect } from 'react';

import styled, { ThemeProvider } from 'styled-components';

import { Label } from '../../../components/atom';
import { Step3MathViewer } from '../../../components/mathViewer';
import { QuizList } from '../../../types/WorkbookType';
import { Loader } from '../../atom/Loader';

type TypeBProps = {
  title?: string;
  grade?: string;
  tag?: string;
  assign: string;
  isDate?: boolean;
  isContentTypeTitle?: boolean;
  theme?: object;
  initialItems: QuizList[];
  newInitialItems: QuizList[];
  answerCommentary: string;
  multiLevel: string;
  line: number;
};

type PageType = { leftArray: QuizList[]; rightArray: QuizList[] }[];

export const TypeB = ({
  title,
  grade,
  tag,
  assign,
  isDate,
  isContentTypeTitle,
  theme,
  initialItems,
  newInitialItems,
  answerCommentary,
  multiLevel,
  line,
}: TypeBProps) => {
  const [quizItemList, setQuizItemList] = useState<QuizList[]>([]);
  const [pages, setPages] = useState<PageType>([]);
  const [isNewInitialItems, setIsNewInitialItems] = useState<boolean>(false);

  useEffect(() => {
    if (newInitialItems.length > 0) {
      setQuizItemList(newInitialItems);
      setIsNewInitialItems(true);
    } else {
      setQuizItemList(initialItems);
      setIsNewInitialItems(false);
    }
  }, [initialItems, newInitialItems]);

  const distributeItemsToPages = (
    items: QuizList[],
    multiLevel: string,
    assign: string,
  ): PageType => {
    const pages: PageType = [];
    let currentPage: { leftArray: QuizList[]; rightArray: QuizList[] } = {
      leftArray: [],
      rightArray: [],
    };

    let leftHeight = 0;
    let rightHeight = 0;
    let leftMaxItems = 0;
    let rightMaxItems = 0;
    let leftFull = false; // 왼쪽 배열이 가득 찼는지 여부를 나타내는 플래그
    let rightFull = false; // 오른쪽 배열이 가득 찼는지 여부를 나타내는 플래그

    // assign 값에 따라 최대 아이템 수 설정
    if (multiLevel === '2단') {
      switch (assign) {
        case '최대':
          leftMaxItems = line === 0 ? Infinity : 6;
          rightMaxItems = line === 0 ? Infinity : 6;
          break;
        case '2문제':
          leftMaxItems = 1;
          rightMaxItems = 1;
          break;
        case '4문제':
          leftMaxItems = 2;
          rightMaxItems = 2;
          break;
        case '6문제':
          leftMaxItems = 3;
          rightMaxItems = 3;
          break;
        default:
          leftMaxItems = line === 0 ? Infinity : 6; // Default behavior, unlimited items
          rightMaxItems = line === 0 ? Infinity : 6;
          break;
      }
    } else if (multiLevel === '1단') {
      switch (assign) {
        case '최대':
          leftMaxItems = Infinity;
          rightMaxItems = 0;
          break;
        case '2문제':
          leftMaxItems = 2;
          rightMaxItems = 0;
          break;
        case '4문제':
          leftMaxItems = 4;
          rightMaxItems = 0;
          break;
        case '6문제':
          leftMaxItems = 6;
          rightMaxItems = 0;
          break;
        default:
          leftMaxItems = Infinity; // Default behavior, unlimited items
          rightMaxItems = 0;
          break;
      }
    }

    let leftItemCount = 0;
    let rightItemCount = 0;
    const extraHeight = answerCommentary === '문제+해설같이' ? 0 : 200;

    items.forEach((item) => {
      if (
        !leftFull &&
        leftItemCount < leftMaxItems &&
        leftHeight + item.height <= 1200
      ) {
        currentPage.leftArray.push(item);
        leftHeight += item.height;
        leftItemCount++;
        if (
          leftHeight + item.height + extraHeight > 1200 ||
          leftItemCount >= leftMaxItems
        ) {
          leftFull = true; // 왼쪽 배열이 가득 찼음을 표시
        }
      } else if (
        !rightFull &&
        rightItemCount < rightMaxItems &&
        rightHeight + item.height <= 1200
      ) {
        currentPage.rightArray.push(item);
        rightHeight += item.height;
        rightItemCount++;
        if (
          rightHeight + item.height + extraHeight > 1200 ||
          rightItemCount >= rightMaxItems
        ) {
          rightFull = true; // 오른쪽 배열이 가득 찼음을 표시
        }
      } else {
        // 새로운 페이지를 시작
        pages.push(currentPage);
        currentPage = { leftArray: [], rightArray: [] };
        leftHeight = 0;
        rightHeight = 0;
        leftItemCount = 0;
        rightItemCount = 0;
        leftFull = false; // 새 페이지에서는 왼쪽 배열이 가득 차지 않았다고 초기화
        rightFull = false; // 새 페이지에서는 오른쪽 배열이 가득 차지 않았다고 초기화

        // 다음 페이지에 현재 아이템 추가
        if (
          !leftFull &&
          leftItemCount < leftMaxItems &&
          leftHeight + item.height <= 1200
        ) {
          currentPage.leftArray.push(item);
          leftHeight += item.height;
          leftItemCount++;
          if (
            leftHeight + item.height > 1200 ||
            leftItemCount >= leftMaxItems
          ) {
            leftFull = true; // 왼쪽 배열이 가득 찼음을 표시
          }
        } else if (
          !rightFull &&
          rightItemCount < rightMaxItems &&
          rightHeight + item.height <= 1200
        ) {
          currentPage.rightArray.push(item);
          rightHeight += item.height;
          rightItemCount++;
          if (
            rightHeight + item.height > 1200 ||
            rightItemCount >= rightMaxItems
          ) {
            rightFull = true; // 오른쪽 배열이 가득 찼음을 표시
          }
        }
      }
    });

    // 마지막 페이지 추가
    if (currentPage.leftArray.length > 0 || currentPage.rightArray.length > 0) {
      pages.push(currentPage);
    }

    return pages;
  };

  useEffect(() => {
    if (quizItemList.length > 0) {
      const generatedPages = distributeItemsToPages(
        quizItemList,
        multiLevel,
        assign,
      );
      setPages(generatedPages);
    }
  }, [quizItemList, multiLevel, assign]);

  // 현재 시간을 YYYY/MM/DD 형식으로 반환하는 함수
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  return (
    <Container>
      <LabelWrapper>
        <Label value="미리보기 화면은 실제 학습지와 약간의 차이가 있습니다."></Label>
      </LabelWrapper>
      <Wrapper>
        <ThemeProvider theme={theme as object}>
          <HeaderCircle></HeaderCircle>
          <WorksheetHeader>
            <TextWrapper>
              <div className="grade">
                <Label
                  value={(grade as string) || '대상 학년'}
                  fontSize="12px"
                />
              </div>
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
                  fontSize="11px"
                />
              </div>
            </TextWrapper>
          </WorksheetHeader>
          {isNewInitialItems === false && <Loader height="50px" size="100px" />}
          <WorksheetBody $isNewInitialItems={isNewInitialItems}>
            <WorksheetBodyLeft>
              {pages[0]?.leftArray?.map((quizItemList) =>
                quizItemList.quizItemList
                  .filter(
                    (quizItem) =>
                      quizItem.type === 'QUESTION' ||
                      quizItem.type === 'BIG' ||
                      quizItem.type === 'TEXT',
                  )
                  .map((quizItem, i) => {
                    const quizCategory = quizItemList.quizCategoryList.find(
                      (quizCategoryItem: any) =>
                        quizCategoryItem.quizCategory.유형,
                    )?.quizCategory;

                    return (
                      <MathViewerWrapper
                        key={i}
                        height={quizItemList.height as number}
                        $padding={
                          multiLevel === '2' && assign === '4'
                            ? '0 0 600px 0'
                            : multiLevel === '2' && assign === '6'
                              ? '0 0 100px 0'
                              : ''
                        }
                      >
                        {isContentTypeTitle && quizCategory?.유형 && (
                          <ContentTitle>
                            |{quizCategory?.유형[0].name}|
                          </ContentTitle>
                        )}
                        <EachMathViewer>
                          <MathJaxWrapper>
                            <Step3MathViewer
                              data={quizItemList}
                              isSetp3
                              answerCommentary={answerCommentary}
                            ></Step3MathViewer>
                            {quizItemList.score && quizItemList.score !== 0 ? (
                              <ScoreWrapper>
                                [{quizItemList.score}점]
                              </ScoreWrapper>
                            ) : (
                              <></>
                            )}
                          </MathJaxWrapper>
                        </EachMathViewer>
                      </MathViewerWrapper>
                    );
                  }),
              )}
            </WorksheetBodyLeft>
            <Divider />
            <WorksheetBodyRight>
              {pages[0]?.rightArray?.map((quizItemList) =>
                quizItemList.quizItemList
                  .filter(
                    (quizItem) =>
                      quizItem.type === 'QUESTION' ||
                      quizItem.type === 'BIG' ||
                      quizItem.type === 'TEXT',
                  )
                  .map((quizItem, i) => {
                    const quizCategory = quizItemList.quizCategoryList.find(
                      (quizCategoryItem: any) =>
                        quizCategoryItem.quizCategory.유형,
                    )?.quizCategory;

                    return (
                      <MathViewerWrapper
                        key={i}
                        height={quizItemList.height as number}
                        $padding={
                          multiLevel === '2' && assign === '4'
                            ? '0 0 600px 0'
                            : multiLevel === '2' && assign === '6'
                              ? '0 0 100px 0'
                              : ''
                        }
                      >
                        {isContentTypeTitle && quizCategory?.유형 && (
                          <ContentTitle>
                            |{quizCategory?.유형[0].name}|
                          </ContentTitle>
                        )}
                        <EachMathViewer>
                          <MathJaxWrapper>
                            <Step3MathViewer
                              data={quizItemList}
                              isSetp3
                              answerCommentary={answerCommentary}
                            ></Step3MathViewer>
                            {quizItemList.score && quizItemList.score !== 0 ? (
                              <ScoreWrapper>
                                [{quizItemList.score}점]
                              </ScoreWrapper>
                            ) : (
                              <></>
                            )}
                          </MathJaxWrapper>
                        </EachMathViewer>
                      </MathViewerWrapper>
                    );
                  }),
              )}
            </WorksheetBodyRight>
          </WorksheetBody>
        </ThemeProvider>
        <WorksheetAdditionalInformation>
          {isDate && (
            <span className="isDate">
              <Label value={getCurrentDate()} fontSize="12px"></Label>
            </span>
          )}
          <span className="pagenumber">1</span>
        </WorksheetAdditionalInformation>
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
  overflow-y: auto;
  padding-left: 10px;
  border-bottom-left-radius: 25px;

  /* Hide scrollbar for Webkit-based browsers (Chrome, Safari, etc.) */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE and Edge */
  -ms-overflow-style: none;
  /* Hide scrollbar for Firefox */
  scrollbar-width: none;
`;
const WorksheetHeader = styled.div`
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 98%;
  height: 72px;
  border: 2px solid ${({ theme }) => theme?.color?.textColorTypeB || 'initial'};
  border-radius: 10px;
`;
const ContentTitle = styled.div`
  color: #888888;
  padding-bottom: 2px;
  margin-left: -10px;
`;
const ContentScript = styled.div`
  color: #888888;
`;
const HeaderCircle = styled.div`
  position: relative;
  top: 10px;
  right: -32px;
  width: 120px;
  height: 20px;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  background-color: ${({ theme }) => theme?.color?.textColorTypeB || 'initial'};
`;
const TextWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .grade {
    position: relative;
    top: -35px;
    right: -30px;
    width: 100px;
    border: 1px solid
      ${({ theme }) => theme?.color?.textColorTypeB || 'initial'};
    border-radius: 50px;
    background-color: ${({ theme }) =>
      theme?.color?.textColorTypeB || 'initial'};
    color: white;

    label {
      display: flex;
      justify-content: center;
    }
  }

  .Title {
    color: ${({ theme }) => theme?.color?.textColorTypeB || 'initial'};
  }

  .Tag {
    position: relative;
    top: 20px;
    right: 30px;
    width: 80px;
    border: 1px solid
      ${({ theme }) => theme?.color?.backgroundColorTypeB || 'initial'};
    background-color: ${({ theme }) =>
      theme?.color?.backgroundColorTypeB || 'initial'};
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    color: ${({ theme }) => theme?.color?.tagColorTypeB || 'initial'};

    label {
      display: flex;
      justify-content: center;
    }
  }
`;

const Divider = styled.span`
  display: inline-block;
  width: 2px;
  height: 1400px;
  background-color: #e8e8e8;
  margin: 0 10px;
`;

const WorksheetBody = styled.div<{ $isNewInitialItems: boolean }>`
  visibility: ${({ $isNewInitialItems }) =>
    $isNewInitialItems ? 'visible' : 'hidden'};
  margin: 0 auto;
  display: flex;
  width: 1000px;
`;

const WorksheetBodyLeft = styled.div`
  width: 48%;
  padding: 10px 20px 0px 20px;
  display: flex;
  flex-direction: column;
`;
const WorksheetBodyRight = styled.div`
  width: 48%;
  padding: 10px 20px 0px 20px;
  display: flex;
  flex-direction: column;
`;
const MathViewerWrapper = styled.div<{ height: number; $padding: string }>`
  height: ${({ height }) => `${height}px`};
  padding: ${({ $padding }) => `${$padding}`};
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  font-size: 12px;
  //padding-bottom: 100px;
`;
const EachMathViewer = styled.div`
  max-width: 500px;
  scale: 0.8;
  margin-top: -5px;
  margin-left: -60px;
`;
const MathJaxWrapper = styled.div`
  strong {
    font-size: 25px;
    color: ${({ theme }) => theme?.color?.textColorTypeB || 'initial'};
  }
`;
const ScoreWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 16px;
`;
const WorksheetAdditionalInformation = styled.div`
  width: 98%;
  margin: 0 auto;
  display: flex;
  padding-top: 10px;
  padding-right: 20px;
  align-items: center;
  justify-content: flex-end;
  border-top: 2px solid #e8e8e8;
  gap: 870px;
  margin-top: 80px;
  padding-bottom: 30px;

  .isDate {
    font-size: 12px;
    color: #888888;
  }
  .pagenumber {
    font-size: 12px;
    font-weight: bold;
    color: #666666;
  }
`;
