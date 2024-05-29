import * as React from 'react';
import { useState, useEffect } from 'react';

import styled, { ThemeProvider } from 'styled-components';

import { Label } from '../../../components/atom';
import { MathViewer, WorkbookMathViewer } from '../../../components/mathViewer';
import Contents1 from '../../../components/mathViewer/test1.json';
import Contents2 from '../../../components/mathViewer/test2.json';
import Contents3 from '../../../components/mathViewer/test3.json';
import Contents4 from '../../../components/mathViewer/test4.json';
import { ItemQuestionType } from '../../../types/ItemQuestionType';
import { QuizList } from '../../../types/WorkbookType';
import { COLOR } from '../../constants';

type TypeBProps = {
  title?: string;
  grade?: string;
  tag?: string;
  contentQuantity?: string;
  isWeather?: boolean;
  isContentTypeTitle?: boolean;
  theme?: object;
};

export const TypeB = ({
  title,
  grade,
  tag,
  contentQuantity,
  isWeather,
  isContentTypeTitle,
  theme,
}: TypeBProps) => {
  const [list, setList] = useState<any[]>([]);
  const [list1, setList1] = useState<any[]>([]);

  useEffect(() => {
    if (contentQuantity === '최대') {
      setList([Contents2, Contents2, Contents3, Contents4]);
      setList1([Contents2, Contents3, Contents4]);
    }
    if (contentQuantity === '6문제') {
      setList([Contents2, Contents2, Contents3]);
    }
    if (contentQuantity === '4문제') {
      setList([Contents1, Contents2]);
    }
    if (contentQuantity === '2문제') {
      setList([Contents1]);
    }
  }, [contentQuantity]);

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
                  value={(tag as string) || '학습지 태그'}
                  fontSize="11px"
                />
              </div>
            </TextWrapper>
          </WorksheetHeader>
          <WorksheetBody $contentQuantity={contentQuantity}>
            <WorksheetBodyLeft>
              {list.map((card, i) => (
                <MathViewerWrapper key={i}>
                  {isContentTypeTitle && (
                    <div>
                      <ContentTitle>|{Contents2.it_title}|</ContentTitle>
                      <ContentScript>{Contents2.it_code}</ContentScript>
                    </div>
                  )}
                  <MathJaxWrapper>
                    <strong>
                      {Contents2.seq < 10
                        ? `0${Contents2.seq}`
                        : `${Contents2.seq}`}
                    </strong>
                    <WorkbookMathViewer
                      data={card}
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
              ))}
            </WorksheetBodyLeft>
            <Divider />
            <WorksheetBodyRight>
              {contentQuantity === '최대' ? (
                <>
                  {list1.map((card, i) => (
                    <MathViewerWrapper key={i}>
                      {isContentTypeTitle && (
                        <div>
                          <ContentTitle>|{Contents2.it_title}|</ContentTitle>
                          <ContentScript>{Contents2.it_code}</ContentScript>
                        </div>
                      )}
                      <MathJaxWrapper>
                        <strong>
                          {Contents2.seq < 10
                            ? `0${Contents2.seq}`
                            : `${Contents2.seq}`}
                        </strong>
                        <WorkbookMathViewer
                          data={card}
                          padding={
                            contentQuantity === '최대' ? '0 0 80px 0' : '0'
                          }
                        ></WorkbookMathViewer>
                      </MathJaxWrapper>
                    </MathViewerWrapper>
                  ))}
                </>
              ) : (
                <>
                  {list.map((card, i) => (
                    <MathViewerWrapper key={i}>
                      {isContentTypeTitle && (
                        <div>
                          <ContentTitle>|{Contents2.it_title}|</ContentTitle>
                          <ContentScript>{Contents2.it_code}</ContentScript>
                        </div>
                      )}
                      <MathJaxWrapper>
                        <strong>
                          {Contents2.seq < 10
                            ? `0${Contents2.seq}`
                            : `${Contents2.seq}`}
                        </strong>
                        <WorkbookMathViewer
                          data={card}
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
                  ))}
                </>
              )}
            </WorksheetBodyRight>
          </WorksheetBody>
        </ThemeProvider>
        <WorksheetAdditionalInformation $isWeather={isWeather}>
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
  max-height: 100%;
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
  aspect-ratio: 210 / 197;
  overflow-y: auto;
`;
const WorksheetHeader = styled.div`
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 720px;
  height: 72px;
  border: 2px solid ${({ theme }) => theme?.color?.textColorTypeB || 'initial'};
  border-radius: 10px;
`;
const ContentTitle = styled.div`
  color: #888888;
  padding-bottom: 2px;
`;
const ContentScript = styled.div`
  color: #888888;
  padding-bottom: 5px;
`;
const HeaderCircle = styled.div`
  position: relative;
  top: 10px;
  right: -30px;
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
      //text-align: center;
    }
  }
`;
type WorksheetBodyType = {
  $contentQuantity?: string;
};
const WorksheetBody = styled.div<WorksheetBodyType>`
  ${({ $contentQuantity }) =>
    $contentQuantity === '최대' || $contentQuantity === '6문제'
      ? `height: 105%`
      : `height: calc(100% - 170px);`};
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
    color: ${({ theme }) => theme?.color?.textColorTypeB || 'initial'};
  }
`;
const WorksheetAdditionalInformation = styled.div<{ $isWeather?: boolean }>`
  width: 720px;
  margin: 0 auto;
  display: flex;
  padding-top: 10px;
  align-items: center;
  justify-content: flex-end;
  border-top: 2px solid #e8e8e8;
  gap: 650px;
  margin-top: 80px;
  margin-bottom: 30px;

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
