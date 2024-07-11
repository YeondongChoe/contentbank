import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import styled, { ThemeProvider } from 'styled-components';

import { Label } from '../../../components/atom';
import { WorkbookMathViewer } from '../../../components/mathViewer';
import { QuizList } from '../../../types/WorkbookType';

type TypeBProps = {
  title?: string;
  grade?: string;
  tag?: string;
  contentQuantity?: string;
  isDate?: boolean;
  isContentTypeTitle?: boolean;
  theme?: object;
  initialItems?: QuizList[];
  answerCommentary?: string;
  column?: string;
};

const A4_HEIGHT = 1122;

export const TypeB = ({
  title,
  grade,
  tag,
  contentQuantity,
  isDate,
  isContentTypeTitle,
  theme,
  initialItems,
  answerCommentary,
  column,
}: TypeBProps) => {
  const [leftList, setLeftList] = useState<QuizList[]>([]);
  const [rightList, setRightList] = useState<QuizList[]>([]);

  useEffect(() => {
    if (initialItems) {
      let accumulatedHeight = 0;
      const newInitialList: any[] = [];
      const updatedLeftList: any[] = [];
      const updatedRightList: any[] = [];

      initialItems.forEach((item) => {
        const height = item.height !== undefined ? item.height : 0;
        accumulatedHeight += height;

        const questionWithHeight = { item, accumulatedHeight };
        newInitialList.push(questionWithHeight);
        console.log(newInitialList);

        if (questionWithHeight.accumulatedHeight <= 1400) {
          updatedLeftList.push(item);
        } else if (
          questionWithHeight.accumulatedHeight > 1400 &&
          questionWithHeight.accumulatedHeight < 2800
        ) {
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

      // 항목 수 제한 설정
      const contentLimits: { [key: string]: number } = {
        최대: Infinity,
        '6문제': 6,
        '4문제': 4,
        '2문제': 2,
      };

      // Default contentQuantity to '최대' if undefined
      const validContentQuantity = contentQuantity ?? '최대';
      const contentLimit = contentLimits[validContentQuantity];

      initialItems.forEach((item, index) => {
        // item에서 height를 가져와서 accumulatedHeight에 누적
        const height = item.height !== undefined ? item.height : 0; // height가 undefined일 경우 0으로 처리
        accumulatedHeight += height;

        // accumulatedHeight 기준으로 leftList에 추가
        if (accumulatedHeight <= 1400 && index < contentLimit) {
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
    }
  }, [contentQuantity, initialItems, column]);

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
          <WorksheetBody>
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
                      <MathViewerWrapper
                        key={i}
                        height={quizItemList.height as number}
                      >
                        {isContentTypeTitle && (
                          <ContentTitle>|{quizCategory?.유형}|</ContentTitle>
                        )}
                        <EachMathViewer>
                          <MathJaxWrapper>
                            <WorkbookMathViewer
                              data={quizItemList}
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
                      <MathViewerWrapper
                        key={i}
                        height={quizItemList.height as number}
                      >
                        {isContentTypeTitle && (
                          <ContentTitle>|{quizCategory?.유형}|</ContentTitle>
                        )}
                        <EachMathViewer>
                          <MathJaxWrapper>
                            <WorkbookMathViewer
                              data={quizItemList}
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
        <WorksheetAdditionalInformation>
          {isDate && (
            <span className="isDate">
              <Label value="2024/03/19" fontSize="12px"></Label>
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
  border-bottom-left-radius: 20px;
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

const WorksheetBody = styled.div`
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
const MathViewerWrapper = styled.div<{ height: number }>`
  height: ${({ height }) => `${height}px`};
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  font-size: 12px;
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
const WorksheetAdditionalInformation = styled.div`
  width: 98%;
  margin: 0 auto;
  display: flex;
  padding-top: 10px;
  padding-right: 10px;
  align-items: center;
  justify-content: flex-end;
  border-top: 2px solid #e8e8e8;
  gap: 630px;
  margin-top: 80px;
  margin-bottom: 30px;

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
