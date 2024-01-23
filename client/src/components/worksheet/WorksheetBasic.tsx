import * as React from 'react';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';

import { IoMdClose } from 'react-icons/io';
import { SlPrinter } from 'react-icons/sl';
import ReactToPrint from 'react-to-print';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { number } from 'yargs';

import { Input } from '../../components/atom';
import Contents2 from '../../components/mathViewer/test2.json';
import Contents3 from '../../components/mathViewer/test3.json';
import Contents4 from '../../components/mathViewer/test4.json';
import { PaginationBox } from '../../components/molecules';
import { previewWorksheetBoolAtom } from '../../store/creatingWorksheetAtom';
import { totalPageAtom } from '../../store/utilAtom';
import { ItemQuestionType } from '../../types';
import { A4_HEIGHT, A4_WIDTH, COLOR } from '../constants';
import { MathViewer } from '../mathViewer/MathViewer';

// 더미 데이터
export const list = [
  Contents2,
  Contents3,
  Contents3,
  Contents4,
  Contents4,
  Contents2,
  Contents2,
  Contents3,
  Contents3,
  Contents4,
  Contents4,
  Contents2,
  Contents2,
  Contents3,
  Contents3,
  Contents2,
  Contents2,
  Contents2,
  Contents2,
  Contents2,
  Contents2,
];

export function WorksheetBasic() {
  const [didMount, setDidMount] = useState(false);
  const setIsPreview = useSetRecoilState(previewWorksheetBoolAtom);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const printDivRef = useRef<HTMLDivElement | null>(null);

  const [heightList, setHeightList] = useState<number[]>([]);
  const [colList, setColList] = useState<ItemQuestionType[]>([]);
  const [colList2, setColList2] = useState<ItemQuestionType[]>([]);

  const loadData = () => {
    // 데이터 불러오기

    // 리스트 초기화
    setColList(list);
  };

  const cardWidth = useMemo(() => {
    //기본 A4 넓이에서 - 패딩값
    const width = A4_WIDTH / 2 - 105 + 'px'; // 1col
    const width_2col = A4_WIDTH / 4 - 45 + 'px'; // 2col
    console.log('width_2col', width_2col);

    return width_2col;
  }, [colList]);

  const cardHeight = () => {
    const rowDiv = document.querySelectorAll('.row'); //문항 요소
    //문항 요소들의 높이값
    const rowHeightArr: number[] = [];
    console.log('rowDiv', rowDiv);

    for (let i = 0; i < rowDiv.length; i++) {
      rowHeightArr.push(rowDiv[i].clientHeight);
    }
    setHeightList(rowHeightArr);
  };
  console.log('heightList', heightList);

  const getHeight = () => {
    // const printDivHeight = printDivRef.current?.clientHeight; // pdf 인쇄 높이
    // const containerHeight = containerRef.current?.clientHeight; //전체 문항 리스트 높이
    // console.log('printDivRef', printDivHeight);
    // console.log('containerRef', containerHeight);
    // if (printDivHeight && containerHeight) {
    //   // 나뉘는 열
    //   const col = containerHeight / printDivHeight;
    //   console.log(col);
    // }
    // 문항의 높이 합이 A4_HEIGHT 를 넘을 때
    let total: number = 0;
    const sortList = [];
    for (let i = 0; i < heightList.length; i++) {
      // const printDivHeight = printDivRef.current?.clientHeight; // pdf 인쇄 높이
      const num = (total += heightList[i]); // 문항의 누적 높이
      if (A4_HEIGHT && A4_HEIGHT / 2 - 140 > num) {
        sortList.push(list[i]);
        console.log(list[i]);
      }
    }

    setColList2(sortList);
  };

  console.log('colList', colList);

  useEffect(() => {
    if (didMount) {
      loadData();
    }
  }, [didMount]);

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    cardHeight();
    getHeight();
  }, [colList]);

  console.log('colList22222', colList2);

  return (
    <Container>
      <MathViewerWrapper>
        <IconWrapper>
          <ReactToPrint
            trigger={() => (
              <SlPrinter style={{ fontSize: '30px', cursor: 'pointer' }} />
            )}
            content={() => printDivRef.current}
          />
          <IoMdClose
            onClick={() => setIsPreview(false)}
            style={{ fontSize: '30px', cursor: 'pointer' }}
          />
        </IconWrapper>

        <MathViewerContainer ref={printDivRef}>
          {/* <MathViewerHeader>
            <HeaderLeft>
              <TitleWrapper>
                <Title>
                  <span className="tag">기본</span>
                  <span className="grade">중1-1</span>
                </Title>
                <p className="subTitle">소인수분해</p>
              </TitleWrapper>
              <Description>50문항 | 콘텐츠뱅츠</Description>
            </HeaderLeft>

            <HeaderRight>
              <ImageWrapper>
                <SlPrinter style={{ fontSize: '60px' }} />
              </ImageWrapper>
              <InputWrapper>
                <Description>2024.01.16 이름</Description>
                <Input
                  type={'text'}
                  width="100px"
                  border="black"
                  height="20px"
                />
              </InputWrapper>
            </HeaderRight>
          </MathViewerHeader> */}

          {colList2.length > 1 ? (
            <MathViewerList ref={containerRef}>
              {colList2.map((card, i) => (
                <div
                  key={card.it_quest + i}
                  style={{ width: cardWidth }}
                  // onLoad={(e) => {
                  //   getItemHeight(e);
                  // }}
                  className="row"
                >
                  문제 {i + 1}.
                  <MathViewer
                    key={i}
                    data={card}
                    padding={`10px 15px 30px 0`}
                    width={cardWidth}
                  ></MathViewer>
                </div>
              ))}
            </MathViewerList>
          ) : (
            <MathViewerList ref={containerRef}>
              {colList.map((card, i) => (
                <div
                  key={card.it_quest + i}
                  style={{ width: cardWidth }}
                  // onLoad={(e) => {
                  //   getItemHeight(e);
                  // }}
                  className="row"
                >
                  문제 {i + 1}.
                  <MathViewer
                    key={i}
                    data={card}
                    padding={`10px 15px 30px 0`}
                    width={cardWidth}
                  ></MathViewer>
                </div>
              ))}
            </MathViewerList>
          )}
        </MathViewerContainer>
      </MathViewerWrapper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const IconWrapper = styled.div`
  position: absolute;
  top: -50px;
  right: 0;
  z-index: 2;
  width: 100px;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  color: white;
`;
const MathViewerWrapper = styled.div`
  max-width: ${`${A4_WIDTH}px`};
  background-color: white;
  max-height: 100vh;
  border: 1px solid ${COLOR.BORDER_POPUP};
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) scale(0.8);
`;

const MathViewerContainer = styled.div`
  position: absolute;
  width: ${`${A4_WIDTH / 2}px`};
  height: ${`${A4_HEIGHT / 2 - 120}px`};
  max-height: 100vh;
  position: relative;
  padding-top: 10px;
  overflow: auto;
`;

const MathViewerList = styled.div`
  position: absolute;
  overflow: auto;
  left: 50%;
  transform: translateX(-50%);
  padding: 15px;
  width: ${`${A4_WIDTH / 2 - 30}px`};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;

  /* .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: column;
 
  } */
`;

const MathViewerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 150px;
  padding: 10px;
  border-bottom: 1px solid ${COLOR.BORDER_BLUE};
`;
const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  justify-content: space-between;
  padding: 20px 10px 10px 20px;
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  .subTitle {
    color: ${COLOR.TEXT_GRAY};
    font-weight: 600;
  }
`;
const Title = styled.div`
  display: flex;
  gap: 5px;
  font-size: 25px;
  font-weight: 800;
  .tag {
    color: ${COLOR.SECONDARY};
  }
`;
const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  justify-content: space-between;
  padding: 20px 10px 10px 20px;
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;
const Description = styled.div`
  font-weight: 800;
`;

const MathViewerGroupLeft = styled.div`
  //height: ${A4_HEIGHT};
`;
const MathViewerGroupRight = styled.div`
  //height: ${A4_HEIGHT};
`;
