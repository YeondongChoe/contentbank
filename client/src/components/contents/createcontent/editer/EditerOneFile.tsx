import * as React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Loader } from '../../../../components/atom';
import { useFetchJsonData } from '../../../../hooks';

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

// 출력된 데이터 받아오기
// async function fetchJsonData(jsonUrl: RequestInfo | URL) {
//   try {
//     const response = await fetch(jsonUrl);
//     if (!response.ok) {
//       throw new Error(`Network response was not ok from ${jsonUrl}`);
//     }
//     const jsonData = await response.json();
//     // handleData(jsonData);
//   } catch (error) {
//     console.error('Error fetching JSON:', error);
//   }
// }

export function EditerOneFile({
  type,
  tabView,
}: {
  type: string;
  tabView?: string;
}) {
  const [isMathJaxLoaded, setMathJaxLoaded] = useState(false);

  const jsonUrl = '';
  const { data, loading, error } = useFetchJsonData(jsonUrl);

  useEffect(() => {
    if (!isMathJaxLoaded) {
      loadMathJax(setMathJaxLoaded);
    }
  }, [isMathJaxLoaded]);

  useEffect(() => {}, [type]);

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  return (
    <Container>
      {isMathJaxLoaded ? (
        <>
          {type === 'type1' && <Type1 />}
          {type === 'type2' && <Type2 />}
          {type === 'type3' && <Type3 tabView={tabView} />}
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
