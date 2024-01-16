import * as React from 'react';
import { useState, useRef, useEffect } from 'react';

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
  const [didMount, setDidMount] = useState(false);
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
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      //loadData();
    }
  }, [didMount]);

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
      <MathViewerWrapper>
        <MathViewerContainer ref={ref}>
          <MathViewerHeader>
            <HeaderLeft>
              <div>
                <h3>기본 중1-1</h3>
                <p>소인수분해</p>
              </div>
              <div>50문항 | 콘텐츠뱅츠</div>
            </HeaderLeft>

            <HeaderRight>
              <div>
                <SlPrinter style={{ fontSize: '80px' }} />
              </div>
              <div>
                <span>2022.01.04 이름</span>
                <input></input>
              </div>
            </HeaderRight>
          </MathViewerHeader>
          <MathViewerList>
            {list.map((card, i) => (
              <div key={i}>
                문제 {i + 1}.<MathViewer data={card} width="350px"></MathViewer>
              </div>
            ))}
          </MathViewerList>
        </MathViewerContainer>
        <PaginationBox
          itemsCountPerPage={8}
          totalItemsCount={totalPage}
        ></PaginationBox>
      </MathViewerWrapper>
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
const MathViewerWrapper = styled.div`
  width: 100%;
  overflow: auto;
  background-color: white;
  height: 800px;
`;
const MathViewerContainer = styled.div`
  width: ${A4_WIDTH};
  margin: 0 auto;
`;
const MathViewerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 150px;
  padding: 10px;
`;
const HeaderLeft = styled.div``;
const HeaderRight = styled.div``;
const MathViewerList = styled.div`
  width: ${A4_WIDTH};
  height: calc(${A4_HEIGHT} - 150px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
