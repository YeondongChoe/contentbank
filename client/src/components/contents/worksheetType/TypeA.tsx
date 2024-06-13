import * as React from 'react';
import { useState, useEffect } from 'react';

import styled, { ThemeProvider, css } from 'styled-components';

import { Label } from '../../../components/atom';
import { MathViewer, WorkbookMathViewer } from '../../../components/mathViewer';
import Contents1 from '../../../components/mathViewer/test1.json';
import Contents2 from '../../../components/mathViewer/test2.json';
import Contents3 from '../../../components/mathViewer/test3.json';
import Contents4 from '../../../components/mathViewer/test4.json';
import { ItemQuestionType } from '../../../types/ItemQuestionType';
import { QuizList, QuizItemList } from '../../../types/WorkbookType';
import { COLOR } from '../../constants';
type TypeAProps = {
  title?: string;
  grade?: string;
  tag?: string;
  contentQuantity?: string;
  isWeather?: boolean;
  isContentTypeTitle?: boolean;
  theme?: object;
  initialItems?: QuizList[];
};

export const TypeA = ({
  title,
  grade,
  tag,
  contentQuantity,
  isWeather,
  isContentTypeTitle,
  theme,
  initialItems,
}: TypeAProps) => {
  const [leftList, setLeftList] = useState<QuizList[]>([]);
  const [rightList, setRightList] = useState<QuizList[]>([]);
  console.log(
    initialItems?.map((item) =>
      item.quizItemList
        .filter((quizItem) => quizItem.type === 'QUESTION')
        .map((quizItem) => quizItem),
    ),
  );
  console.log(initialItems);
  console.log(leftList);
  console.log(rightList);

  useEffect(() => {
    if (contentQuantity === '최대' && initialItems) {
      setLeftList(initialItems.slice(0, 4));
      setRightList(initialItems.slice(4, 8));
    }
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
  }, [contentQuantity, initialItems]);
  //console.log(contentQuantity);

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
                  value={(tag as string) || '학습지 태그'}
                  fontSize="12px"
                />
                <div className="CircleBox">
                  <div className="Circle"></div>
                  <div className="Circle"></div>
                  <div className="Circle"></div>
                </div>
              </div>
            </ColorTextWrapper>
            {/* {isContentTypeTitle ? (
              <p>
                <Label value="문항 유형명" fontSize="14px" />
              </p>
            ) : (
              <p></p>
            )} */}
          </WorksheetHeader>
          <HeaderTriangle></HeaderTriangle>

          <WorksheetBody $contentQuantity={contentQuantity}>
            <WorksheetBodyLeft>
              {leftList?.map((quizItemList) =>
                quizItemList.quizItemList
                  .filter((quizItem) => quizItem.type === 'QUESTION')
                  .map((quizItem, i) => (
                    <MathViewerWrapper key={i}>
                      {isContentTypeTitle && (
                        <div>
                          <ContentTitle>
                            |
                            {
                              quizItemList.quizCategoryList[0].quizCategory
                                .문항타입
                            }
                            |
                          </ContentTitle>
                          <ContentScript>{quizItem.code}</ContentScript>
                        </div>
                      )}
                      <MathJaxWrapper>
                        <strong>
                          {Contents2.seq < 10
                            ? `0${Contents2.seq}`
                            : `${Contents2.seq}`}
                        </strong>
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
                        ></WorkbookMathViewer>
                      </MathJaxWrapper>
                    </MathViewerWrapper>
                  )),
              )}
            </WorksheetBodyLeft>
            <Divider />
            <WorksheetBodyRight>
              {rightList?.map((quizItemList) =>
                quizItemList.quizItemList
                  .filter((quizItem) => quizItem.type === 'QUESTION')
                  .map((quizItem, i) => (
                    <MathViewerWrapper key={i}>
                      {isContentTypeTitle && (
                        <div>
                          <ContentTitle>
                            |
                            {
                              quizItemList.quizCategoryList[0].quizCategory
                                .문항타입
                            }
                            |
                          </ContentTitle>
                          <ContentScript>{quizItem.code}</ContentScript>
                        </div>
                      )}
                      <MathJaxWrapper>
                        <strong>
                          {Contents2.seq < 10
                            ? `0${Contents2.seq}`
                            : `${Contents2.seq}`}
                        </strong>
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
                        ></WorkbookMathViewer>
                      </MathJaxWrapper>
                    </MathViewerWrapper>
                  )),
              )}
            </WorksheetBodyRight>
          </WorksheetBody>
        </ThemeProvider>
        <FooterTriangle></FooterTriangle>
        <WorksheetAdditionalInformation>
          {isWeather && (
            <span className="weather">
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
  height: 100%;
  display: block;
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
  width: 755px;
  height: 700px;
  //aspect-ratio: 210/197;
  overflow-y: auto;
`;

const WorksheetHeader = styled.div`
  position: relative;
  border: 1px solid
    ${({ theme }) => theme?.color?.backgroundColorTypeA || 'initial'};
  width: 97%;
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
  padding-bottom: 5px;
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
const WorksheetBody = styled.div<WorksheetBodyType>`
  position: relative;
  top: -50px;
  ${({ $contentQuantity }) =>
    $contentQuantity === '최대' || $contentQuantity === '6문제'
      ? `height: 105%`
      : `height: calc(100% - 327px);`};
  margin: 0 auto;
  display: flex;
`;
const Divider = styled.span`
  display: inline-block;
  width: 1px;
  height: 100%;
  background-color: #e8e8e8;
  margin: 0 10px;
`;

const MathViewerWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 12px;
`;
const WorksheetBodyLeft = styled.div`
  flex: 1 0 0;
  padding: 10px 20px 0px 20px;
  display: flex;
  flex-direction: column;
`;
const WorksheetBodyRight = styled.div`
  flex: 1 0 0;
  padding: 10px 20px 0px 20px;
  display: flex;
  flex-direction: column;
`;
const MathJaxWrapper = styled.div`
  display: flex;
  gap: 10px;

  strong {
    font-size: 25px;
    color: ${({ theme }) => theme?.color?.textColorTypeA || 'initial'};
  }
`;
const FooterTriangle = styled.div`
  position: relative;
  top: 40px;
  right: -658px;
  width: 0;
  height: 0;
  border-bottom: 40px solid transparent;
  border-top: 40px solid transparent;
  border-right: 40px solid #e5e5e5;
  border-left: 40px solid transparent;
`;
const WorksheetAdditionalInformation = styled.div`
  position: relative;
  left: 23px;
  width: 97%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  background-color: #e5e5e5;
  border: 1px solid #e5e5e5;
  border-top-left-radius: 30px;
  padding-right: 60px;
  gap: 550px;

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
