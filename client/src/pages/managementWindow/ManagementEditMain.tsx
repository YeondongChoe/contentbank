import * as React from 'react';
import { useEffect, useState } from 'react';

import { IoMdClose } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { Button, TabMenu } from '../../components';
import { COLOR } from '../../components/constants';
import { pageAtom } from '../../store/utilAtom';
import { windowOpenHandler } from '../../utils/windowHandler';

import { ContentInformationChange } from './ContentInformationChange';

const loadMathJax = (setLoaded: (arg0: boolean) => void) => {
  if (window.MathJax) {
    setLoaded(true);
    return;
  }

  (window as any).MathJax = {
    startup: {
      ready: () => {
        const { MathJax } = window as any;
        MathJax.startup.defaultReady();
        console.log('MathJax is loaded, version: ', MathJax.version);
        setLoaded(true);
      },
    },
    tex: {
      inlineMath: [['\\(', '\\)']],
    },
    svg: {
      scale: 1.0,
      fontCache: 'local',
      minScale: 0.1,
    },
    options: {
      renderActions: {
        addMenu: [
          /* ... */
        ],
      },
      menuOptions: {
        settings: {},
      },
    },
  };

  const script = document.createElement('script');
  script.id = 'MathJax-script';
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
  script.async = true;
  script.onload = () => {
    setLoaded(true);
  };
  script.onerror = () => {
    console.error('Failed to load MathJax.');
  };
  document.head.appendChild(script);
};

export function ManagementEditMain() {
  const [isMathJaxLoaded, setMathJaxLoaded] = useState(false);

  useEffect(() => {
    if (!isMathJaxLoaded) {
      loadMathJax(setMathJaxLoaded);
    }
  }, [isMathJaxLoaded]);
  const [page, setPage] = useRecoilState(pageAtom);

  const location = useLocation();
  const navigate = useNavigate();

  // 모달 연뒤 문항 일괄편집 윈도우 이동
  const openHistoryWindow = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    windowOpenHandler({
      name: 'change-history',
      url: '/change-history',
      // $height: 850,
      // $width: 1250,
    });
  };

  const closePopup = () => {
    // setIsOpenPopup(false);
  };
  return (
    <Container>
      <TitleWrapper>
        <Title>메타정보 관리</Title>
      </TitleWrapper>
      <ButtonWrapper>
        <Button
          height={'35px'}
          width={'130px'}
          onClick={(e) => openHistoryWindow(e)}
          fontSize="13px"
          $filled
          cursor
          $margin="0 0 10px 0"
        >
          문항 편집 이력
        </Button>
      </ButtonWrapper>

      <ContentInformationChange />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -40px;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  padding-bottom: 15px;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 800;
`;

const ButtonWrapper = styled.div`
  display: flex;
  padding: 0 20px;
  flex-direction: row-reverse;
`;
