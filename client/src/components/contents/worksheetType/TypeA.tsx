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

type TypeAProps = {
  title?: string;
  grade?: string;
  tag?: string;
  isWeather?: boolean;
  isContentTypeTitle?: boolean;
  theme?: object;
};

export const TypeA = ({
  title,
  grade,
  tag,
  isWeather,
  isContentTypeTitle,
  theme,
}: TypeAProps) => {
  const [list, setList] = useState([Contents1, Contents2, Contents3]);

  return (
    <Container>
      <LabelWrapper>
        <Label value="미리보기"></Label>
      </LabelWrapper>
      <Wrapper>
        <ThemeProvider theme={theme as object}>
          <WorksheetHeader>
            <TextWrapper>
              <div>
                <Label
                  value={(grade as string) || '학교급/대상 학년'}
                  fontSize="16px"
                />
                <Label
                  value={(title as string) || '학습지명'}
                  fontSize="20px"
                />
              </div>
              <div>
                <Label
                  value={(tag as string) || '학습지 태그'}
                  fontSize="16px"
                />
                {isWeather && <span>2024/03/19</span>}
              </div>
            </TextWrapper>
            {isContentTypeTitle && (
              <p>
                <Label value="문항 유형명" fontSize="20px" />
              </p>
            )}
          </WorksheetHeader>
        </ThemeProvider>
        <WorksheetBody>
          <WorksheetBodyLeft>
            {list.map((card, i) => (
              <MathViewerWrapper key={i}>
                <strong>{i + 1}.</strong>
                <MathViewer data={card} width="330px"></MathViewer>
              </MathViewerWrapper>
            ))}
          </WorksheetBodyLeft>
          <WorksheetBodyRight>
            {list.map((card, i) => (
              <MathViewerWrapper key={i}>
                <strong>{i + 1}.</strong>
                <MathViewer data={card} width="330px"></MathViewer>
              </MathViewerWrapper>
            ))}
          </WorksheetBodyRight>
        </WorksheetBody>
        <WorksheetAdditionalInformation>
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
  height: 92%;
  background-color: white;
  overflow-y: auto;
`;
const WorksheetHeader = styled.div`
  width: 95%;
  height: 20%;
  margin: 0 auto;
  border-bottom: 1px solid black;
  padding: 10px;
  p {
    display: flex;
    text-align: center;
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
  width: 210mm;
  height: 297mm;
  margin: 0 auto;
  display: flex;
`;
const MathViewerWrapper = styled.div`
  display: flex;
  gap: 2px;
`;
const WorksheetBodyLeft = styled.div`
  flex: 1 0 0;
  padding-top: 10px;
  padding-bottom: 100px;
  border-right: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const WorksheetBodyRight = styled.div`
  flex: 1 0 0;
  padding-top: 10px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const WorksheetAdditionalInformation = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
  span {
    font-size: 16px;
  }
`;
