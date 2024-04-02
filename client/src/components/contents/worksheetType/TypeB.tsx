import * as React from 'react';
import { useState, useEffect } from 'react';

import styled, { ThemeProvider } from 'styled-components';

import { Label } from '../../../components/atom';
import { MathViewer } from '../../../components/mathViewer';
import Contents1 from '../../../components/mathViewer/test1.json';
import Contents2 from '../../../components/mathViewer/test2.json';
import Contents3 from '../../../components/mathViewer/test3.json';
import Contents4 from '../../../components/mathViewer/test4.json';
import { ItemQuestionType } from '../../../types/ItemQuestionType';
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
  const [list, setList] = useState<ItemQuestionType[]>([]);
  const [list1, setList1] = useState<ItemQuestionType[]>([]);

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
        <Label value="미리보기"></Label>
      </LabelWrapper>
      <Wrapper>
        <ThemeProvider theme={theme as object}>
          <WorksheetHeader>
            <p>
              <Label value={(title as string) || '학습지명'} fontSize="14px" />
            </p>
            <TextWrapper>
              <div>
                <Label
                  value={(grade as string) || '학교급/대상 학년'}
                  fontSize="12px"
                />
              </div>
              <div>
                <Label
                  value={(tag as string) || '학습지 태그'}
                  fontSize="12px"
                />
              </div>
            </TextWrapper>
            {isContentTypeTitle ? (
              <p>
                <Label value="문항 유형명" fontSize="14px" />
              </p>
            ) : (
              <p></p>
            )}
          </WorksheetHeader>
        </ThemeProvider>
        <WorksheetBody>
          <WorksheetBodyLeft>
            {list.map((card, i) => (
              <MathViewerWrapper key={card.it_quest + i}>
                <strong>{i + 1}.</strong>
                <MathViewer
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
                ></MathViewer>
              </MathViewerWrapper>
            ))}
          </WorksheetBodyLeft>
          <WorksheetBodyRight>
            {contentQuantity === '최대' ? (
              <>
                {list1.map((card, i) => (
                  <MathViewerWrapper key={i}>
                    <strong>{i + 5}.</strong>
                    <MathViewer
                      data={card}
                      padding={contentQuantity === '최대' ? '0 0 80px 0' : '0'}
                    ></MathViewer>
                  </MathViewerWrapper>
                ))}
              </>
            ) : (
              <>
                {list.map((card, i) => (
                  <MathViewerWrapper key={i}>
                    <strong>{i + 3}.</strong>
                    <MathViewer
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
                    ></MathViewer>
                  </MathViewerWrapper>
                ))}
              </>
            )}
          </WorksheetBodyRight>
        </WorksheetBody>
        <WorksheetAdditionalInformation $isWeather={isWeather}>
          {isWeather && <span>2024/03/19</span>}
          <span>1페이지</span>
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
`;
const LabelWrapper = styled.div`
  width: 100%;
  padding: 10px 0 10px 20px;
  color: white;
`;
const Wrapper = styled.div`
  //height: 90%;
  background-color: white;
  aspect-ratio: 210 / 297;
  overflow-y: auto;
`;
const WorksheetHeader = styled.div`
  margin: 0 auto;
  border-bottom: 1px solid black;
  padding: 10px;
  p {
    display: flex;
    text-align: center;
    height: 30px;
  }
  label {
    color: ${({ theme }) => theme?.color?.background || 'initial'};
  }
`;
const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
  }
`;
const WorksheetBody = styled.div`
  height: calc(100% - 130px);
  margin: 0 auto;
  display: flex;
`;
const MathViewerWrapper = styled.div`
  height: 100%;
  display: flex;
  gap: 2px;
  font-size: 12px;
`;
const WorksheetBodyLeft = styled.div`
  flex: 1 0 0;
  padding: 10px 20px 0px 20px;
  border-right: 1px solid black;
  display: flex;
  flex-direction: column;
`;
const WorksheetBodyRight = styled.div`
  flex: 1 0 0;
  padding: 10px 20px 0px 20px;
  display: flex;
  flex-direction: column;
`;
const WorksheetAdditionalInformation = styled.div<{ $isWeather?: boolean }>`
  display: flex;
  ${({ $isWeather }) =>
    $isWeather
      ? `justify-content: space-between;`
      : `justify-content: flex-end;`};
  padding: 0 20px;
  span {
    font-size: 12px;
  }
`;
