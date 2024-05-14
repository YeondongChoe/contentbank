import * as React from 'react';

import { SlOptionsVertical, SlPrinter } from 'react-icons/sl';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactToPrint from 'react-to-print';
import { styled } from 'styled-components';

import { Icon, IconButton } from '../../../components/atom';
import { COLOR } from '../../constants';

import { makePdf } from './makePDF';

type PDFModalProps = {
  list: any[];
};

export function PDFModal({ list }: PDFModalProps) {
  const pdf = makePdf();

  const printPDF = async () => {
    await pdf.viewWithPdf();
  };

  return (
    <>
      {/* <Icon
        width={'20px'}
        height={'20px'}
        src={''}
        onClick={() => printPDF()}
        cursor
      /> */}
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
            {list.map((item) => (
              <div key={item} className="A4_paper">
                <Contents>
                  문항데이터가 들어올 자리 Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Eos officiis at iure sapiente
                  maxime provident possimus dolorum eveniet illo nisi ullam,
                  animi sunt nobis, error consequatur quos facere. Perspiciatis,
                  harum.
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
