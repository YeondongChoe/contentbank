import * as React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Loader } from '../../../../components/atom';

import Type1 from './components/Type1';
import Type2 from './components/Type2';
import Type3 from './components/Type3';

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

export function EditerOneFile({ type }: { type: string }) {
  const [isMathJaxLoaded, setMathJaxLoaded] = useState(false);

  useEffect(() => {
    if (!isMathJaxLoaded) {
      loadMathJax(setMathJaxLoaded);
    }
  }, [isMathJaxLoaded]);

  useEffect(() => {}, [type]);

  return (
    <Container>
      {isMathJaxLoaded ? (
        <>
          {type === 'type1' && <Type1 />}
          {type === 'type2' && <Type2 />}
          {type === 'type3' && <Type3 />}
        </>
      ) : (
        <LoaderWrapper>
          <Loader width="50px" />
        </LoaderWrapper>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: calc(100% - 330px);
  height: calc(100vh - 100px); // 탭 네비 높이, 하단 셀렉트 높이 제외
  padding: 0;
  margin: 0;
  display: flex;
  align-items: stretch;
`;

const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 30px;
  padding-left: calc(50% - 35px);
`;
