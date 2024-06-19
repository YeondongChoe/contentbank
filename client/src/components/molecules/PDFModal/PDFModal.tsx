import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { SlOptionsVertical, SlPrinter } from 'react-icons/sl';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactToPrint from 'react-to-print';
import { styled } from 'styled-components';

import { Icon, IconButton, ValueNone } from '../../../components/atom';
import { MathViewer } from '../../../components/mathViewer';
import { ItemQuestionType, QuizListType } from '../../../types';
import { A4_HEIGHT, A4_WIDTH, COLOR } from '../../constants';

import { makePdf } from './makePDF';

type PDFModalProps = {
  list: any[];
};

export function PDFModal({ list }: PDFModalProps) {
  const [sortedList, setSortedList] = useState<QuizListType[]>(list);
  const pdf = makePdf();
  const printDivRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // const printPDF = async () => {
  //   await pdf.viewWithPdf();
  // };

  return (
    <>
      <IconButtonWrapper>
        {/* <IconButton
          $iconOlny
          $borderNone
          onClick={() => printPDF()}
          width="20px"
          height="20px"
          $padding="0px"
        >
          <SlPrinter />
        </IconButton> */}

        <ReactToPrint
          trigger={() => (
            <SlPrinter style={{ fontSize: '20px', cursor: 'pointer' }} />
          )}
          content={() => printDivRef.current}
        />
      </IconButtonWrapper>

      <Component>
        <ScrollWrapper>
          <PerfectScrollbar>
            <ContentsWrapper ref={printDivRef}>
              {sortedList.map((item) => (
                <MathViewerList
                  key={`${item.idx} pdf list`}
                  className="A4_paper"
                  ref={containerRef}
                >
                  {item.quizItemList.length ? (
                    <PrintBox>
                      {item.quizItemList.map((el) => (
                        <MathViewerWrapper
                          key={`${el?.code} quizItemList sortedList`}
                          className="row"
                        >
                          {[
                            'TITLE',
                            'QUESTION',
                            'EXAMPLE',
                            'ANSWER',
                            'TIP',
                            'COMMENTARY',
                            'HINT',
                          ].includes(el?.type) &&
                            el?.content && (
                              <MathViewer data={el.content}></MathViewer>
                            )}
                        </MathViewerWrapper>
                      ))}
                    </PrintBox>
                  ) : (
                    <ValueNoneWrapper>
                      <ValueNone info="문항 데이터가 없습니다" textOnly />
                    </ValueNoneWrapper>
                  )}
                </MathViewerList>
              ))}
            </ContentsWrapper>
          </PerfectScrollbar>
        </ScrollWrapper>
      </Component>
    </>
  );
}

type PDFModalStyleProps = {
  width?: string;
  height?: string;
  $margin?: string;
};

const Component = styled.div<PDFModalStyleProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: 100%;
  max-height: calc(100vh - 100px);
  background-color: ${COLOR.LIGHT_GRAY};
  border-radius: 0 0 10px 10px;
  border-top: 1px solid ${COLOR.BORDER_BLUE};
  overflow: hidden;
`;

const IconButtonWrapper = styled.div`
  position: absolute;
  top: 40px;
  right: calc(50% - 380px);
  width: 30px;
  height: 30px;
`;
const ScrollWrapper = styled.div`
  overflow-y: auto;
  height: calc(100vh - 100px);
  width: 100%;
  background-color: ${COLOR.LIGHT_GRAY};
  margin-bottom: 40px;

  .line {
    border-top: 1px solid ${COLOR.LIGHT_GRAY};
    margin: 10px 0;

    &.bottom_text {
      font-size: 13px;
      padding-top: 2px;
    }
  }
`;

const ContentsWrapper = styled.div`
  max-height: 100vh;
`;

const PrintBox = styled.div`
  width: ${`${A4_WIDTH / 3 - 15}px`};
  /* border: 2px solid black; */
  margin: 0 auto;
  padding-top: 10px;
  margin-right: -15px;
`;

const MathViewerWrapper = styled.div`
  display: flex;
  width: ${`${A4_WIDTH / 3 - 30}px`};
  /* border: 2px solid blue; */
  padding: 0 20px;
  padding-top: 10px;
  margin: 0 -15px;
`;

const MathViewerList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: white;
  text-align: center;
  width: ${`${A4_WIDTH / 3 - 30}px`};
  height: ${`${A4_HEIGHT / 3 - 14}px`};
  /* border: 1px solid red; */
  margin: 20px;
  &.A4_paper > div {
    padding: 10px;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
`;
const ValueNoneWrapper = styled.div``;
