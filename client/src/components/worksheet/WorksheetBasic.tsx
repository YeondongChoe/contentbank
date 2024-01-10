import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { IoMdClose } from 'react-icons/io';
import { LuDownload } from 'react-icons/lu';
import { useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';

import Contents2 from '../../components/mathViewer/test2.json';
import Contents3 from '../../components/mathViewer/test3.json';
import Contents4 from '../../components/mathViewer/test4.json';
import { previewWorksheetBoolAtom } from '../../store/creatingWorksheetAtom';
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
  ];

  const handlePrint = async () => {
    // PDF로 변환할 대상 엘리먼트 선택
    const element = document.getElementById('pdf-container');

    if (element) {
      try {
        // 딜레이를 추가하여 수식이 렌더링될 때까지 기다림
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // html2canvas로 캔버스 생성
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
        });

        // 이미지 로딩 대기 후 새 탭에서 PDF 열기
        const img = new Image();
        img.onload = () => {
          // jspdf로 PDF 생성
          const pdf = new jsPDF('p', 'mm', 'a4');
          // 이미지를 PDF에 추가
          pdf.addImage(img, 'PNG', 0, 0, 210, 297); // A4 사이즈

          // PDF를 blob으로 변환
          const blob = pdf.output('blob');

          // Blob URL 생성
          const blobUrl = URL.createObjectURL(blob);

          // 새 탭에서 PDF 열기
          window.open(blobUrl, '_blank');
        };
        // 캔버스를 이미지로 변환
        const imgData = canvas.toDataURL('image/png');
        img.src = imgData;
        // 이미지를 현재 페이지에 표시
        const imgElement = document.createElement('img');
        imgElement.src = imgData;
        document.body.appendChild(imgElement);
      } catch (error) {
        console.error('Error during PDF generation:', error);
      }
    }
  };

  return (
    <Container>
      <Wrapper>
        학습지명
        <IconWrapper>
          <LuDownload
            onClick={handlePrint}
            style={{ fontSize: '30px', cursor: 'pointer' }}
          />
          <IoMdClose
            onClick={() => setIsPreview(false)}
            style={{ fontSize: '30px', cursor: 'pointer' }}
          />
        </IconWrapper>
      </Wrapper>
      <MathviewrWrapper>
        <ContainerDiv className="page" id="pdf-container">
          {list.map((card, i) => (
            <div key={i}>
              {i}
              <MathViewer data={card} width="350px"></MathViewer>
            </div>
          ))}
        </ContainerDiv>
      </MathviewrWrapper>
    </Container>
  );
}

const A4_WIDTH = '210mm';
const A4_HEIGHT = '230mm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  padding: 5px;
`;
const IconWrapper = styled.div`
  display: flex;
  gap: 20px;
`;
const MathviewrWrapper = styled.div`
  margin: 0 auto;
  border: 1px solid ${COLOR.BORDER_GRAY};
  background-color: white;
`;
const ContainerDiv = styled.div`
  width: ${A4_WIDTH};
  height: ${A4_HEIGHT};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
