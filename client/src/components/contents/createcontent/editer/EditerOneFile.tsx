import * as React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

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

export function EditerOneFile({ style }: { style?: any }) {
  const [isMathJaxLoaded, setMathJaxLoaded] = useState(false);

  useEffect(() => {
    if (!isMathJaxLoaded) {
      loadMathJax(setMathJaxLoaded);
    }
  }, [isMathJaxLoaded]);

  return (
    <Container>
      {/* {isMathJaxLoaded ? <Type1 /> : <p>로딩 ...</p>} */}
      {/* {isMathJaxLoaded ? <Type2 /> : <p>로딩 ...</p>} */}
      {isMathJaxLoaded ? <Type3 /> : <p>로딩 ...</p>}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  padding: 0;
  margin: 0;
  display: flex;
  align-items: stretch;
`;
