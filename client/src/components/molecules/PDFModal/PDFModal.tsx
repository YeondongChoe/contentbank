import * as React from 'react';
import { useState } from 'react';

import { SlOptionsVertical, SlPrinter } from 'react-icons/sl';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactToPrint from 'react-to-print';
import { styled } from 'styled-components';

import { Icon, IconButton, ValueNone } from '../../../components/atom';
import { MathViewer } from '../../../components/mathViewer';
import { QuizListType } from '../../../types';
import { COLOR } from '../../constants';

import { makePdf } from './makePDF';

type PDFModalProps = {
  list: any[];
};

export function PDFModal({ list }: PDFModalProps) {
  const [sortedList, setSortedList] = useState<QuizListType[]>(list);
  const pdf = makePdf();

  const printPDF = async () => {
    await pdf.viewWithPdf();
  };

  return (
    <>
      <IconButtonWrapper>
        <IconButton
          $iconOlny
          $borderNone
          onClick={() => printPDF()}
          width="20px"
          height="20px"
          $padding="0px"
        >
          <SlPrinter />
        </IconButton>
      </IconButtonWrapper>

      <Component>
        <ScrollWrapper>
          <PerfectScrollbar>
            {sortedList.map((item) => (
              <div key={`${item.idx} pdf list`} className="A4_paper">
                <Contents>
                  {item.quizItemList.length ? (
                    item.quizItemList.map((el) => (
                      <div key={`${el?.code} quizItemList sortedList`}>
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
                      </div>
                    ))
                  ) : (
                    <>
                      <ValueNone info="문항 데이터가 없습니다" textOnly />
                    </>
                  )}
                </Contents>
              </div>
            ))}
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
  background-color: rgba(0, 0, 0, 0.1);
  border-top: 1px solid ${COLOR.BORDER_BLUE};
  overflow: hidden;

  .A4_paper {
    height: 842px;
    width: 595px;
    margin: 30px;
    background-color: white;
    text-align: center;
  }

  .A4_paper > div {
    margin: 30px;
  }
`;

const IconButtonWrapper = styled.div`
  position: absolute;
  top: 40px;
  right: calc(50% - 300px);
  width: 30px;
  height: 30px;
`;
const ScrollWrapper = styled.div`
  overflow-y: auto;
  height: calc(100vh - 100px);
  width: 100%;
  background-color: ${COLOR.LIGHT_GRAY};

  .line {
    border-top: 1px solid ${COLOR.BORDER_GRAY};
    margin: 10px 0;

    &.bottom_text {
      font-size: 13px;
      padding-top: 2px;
    }
  }
`;

const Contents = styled.p`
  padding: 30px;
`;
