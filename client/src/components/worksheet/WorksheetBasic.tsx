import * as React from 'react';
import { useState, useRef, useEffect } from 'react';

import { IoMdClose } from 'react-icons/io';
import { SlPrinter } from 'react-icons/sl';
import ReactToPrint from 'react-to-print';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { styled } from 'styled-components';

import { Input } from '../../components/atom';
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
  const containerRef = useRef<HTMLDivElement | null>(null);

  const list = [
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
  ];
  const list1 = [
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
  ];
  const ref = useRef(null);

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      //loadData();
    }
  }, [didMount]);

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
          </MathViewerHeader>
          <MathViewerList ref={containerRef}>
            <MathViewerGroupLeft>
              {list.map((card, i) => (
                <>
                  문제 {i + 1}.
                  <MathViewer key={i} data={card} width="350px"></MathViewer>
                </>
              ))}
            </MathViewerGroupLeft>
            <MathViewerGroupRight>
              {list1.map((card, i) => (
                <>
                  문제 {i + 1}.
                  <MathViewer key={i} data={card} width="350px"></MathViewer>
                </>
              ))}
            </MathViewerGroupRight>
          </MathViewerList>
        </MathViewerContainer>
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
  border: 1px solid ${COLOR.BORDER_POPUP};
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
const MathViewerList = styled.div`
  width: ${A4_WIDTH};
  display: flex;
  justify-content: center;
  padding-top: 10px;
  gap: 40px;
`;
const MathViewerGroupLeft = styled.div`
  //height: ${A4_HEIGHT};
`;
const MathViewerGroupRight = styled.div`
  //height: ${A4_HEIGHT};
`;
