import * as React from 'react';
import { useRef, useEffect } from 'react';

import { IoMdClose } from 'react-icons/io';
import { SlPrinter } from 'react-icons/sl';
import ReactToPrint from 'react-to-print';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { styled } from 'styled-components';

import Contents2 from '../../components/mathViewer/test2.json';
import Contents3 from '../../components/mathViewer/test3.json';
import Contents4 from '../../components/mathViewer/test4.json';
import { PaginationBox } from '../../components/molecules';
import { previewWorksheetBoolAtom } from '../../store/creatingWorksheetAtom';
import { totalPageAtom } from '../../store/utilAtom';
import { COLOR } from '../constants';
import { MathViewer } from '../mathViewer/MathViewer';

export function WorksheetBasic() {
  const setIsPreview = useSetRecoilState(previewWorksheetBoolAtom);

  const list = [
    Contents2,
    Contents3,
    Contents4,
    Contents2,
    Contents3,
    Contents4,
    Contents2,
    Contents3,
  ];
  const [totalPage, settotalPage] = useRecoilState(totalPageAtom);

  const ref = useRef(null);

  useEffect(() => {
    // console.log(tabVeiw);
  }, [totalPage]);

  return (
    <Container>
      <IconWrapper>
        <ReactToPrint
          trigger={() => (
            <SlPrinter style={{ fontSize: '30px', cursor: 'pointer' }} />
          )}
          content={() => ref.current}
        />
        <IoMdClose
          onClick={() => setIsPreview(false)}
          style={{ fontSize: '30px', cursor: 'pointer' }}
        />
      </IconWrapper>
      <MathviewrWrapper>
        <MathviewrContainer ref={ref}>
          <MathviewrList>
            {list.map((card, i) => (
              <div key={i}>
                문제 {i + 1}.<MathViewer data={card} width="350px"></MathViewer>
              </div>
            ))}
          </MathviewrList>
        </MathviewrContainer>
        <PaginationBox
          itemsCountPerPage={8}
          totalItemsCount={totalPage}
        ></PaginationBox>
      </MathviewrWrapper>
    </Container>
  );
}

const A4_WIDTH = '210mm';
const A4_HEIGHT = '297mm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  color: white;
  padding-bottom: 5px;
`;
const MathviewrWrapper = styled.div`
  width: 100%;
  overflow: auto;
  background-color: white;
  height: 850px;
`;
const MathviewrContainer = styled.div`
  width: ${A4_WIDTH};
  margin: 0 auto;
`;
const MathviewrList = styled.div`
  width: ${A4_WIDTH};
  height: ${A4_HEIGHT};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
