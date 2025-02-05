import * as React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Loader } from '../../../../components/atom';
import { QuizListType } from '../../../../types';

import Type1 from './components/Type1';
import Type2 from './components/Type2';
import Type3 from './components/Type3';
import Type4 from './components/Type4';

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
  script.src = '/static/iTeX_EQ/js/tex-svg-full_3_2_2.js';
  // script.src = '/client/public/static/iTeX_EQ/js/tex-svg-full_3_2_2.js';
  script.async = true;
  script.onload = () => {
    setLoaded(true);
  };
  script.onerror = () => {
    console.error('Failed to load MathJax.');
  };
  document.head.appendChild(script);
};

export function EditerOneFile({
  type,
  tabView,
  setEditorData,
  saveHandler,
  onItemClickData,
}: {
  type?: string;
  tabView?: string;
  setEditorData: React.Dispatch<React.SetStateAction<any>>;
  saveHandler?: () => any;
  onItemClickData?: QuizListType;
}) {
  const [isMathJaxLoaded, setMathJaxLoaded] = useState(false);
  const [jsonData, setJsonData] = useState<string | null>(null);

  useEffect(() => {
    if (!isMathJaxLoaded) {
      loadMathJax(setMathJaxLoaded);
    }
  }, [isMathJaxLoaded]);

  useEffect(() => {
    if (!jsonData) return;
    // const jsonString = JSON.stringify(jsonData);
    // setJsonStringData(jsonString);
    // 값이 저장될때 서버에도 동일한 데이터 저장 문항 생성
    const parsedData = JSON.parse(jsonData);

    setEditorData(parsedData);
  }, [jsonData]);

  useEffect(() => {
    console.log('type', type);
  }, [type]);
  useEffect(() => {}, [tabView]);

  return (
    <Container className={type === 'type2' ? `type2` : ''}>
      {isMathJaxLoaded ? (
        <>
          {type === 'edit' && (
            <Type4
              saveHandler={saveHandler}
              onItemClickData={onItemClickData}
            />
          )}

          {type === 'copyedit' && (
            <Type4
              saveHandler={saveHandler}
              onItemClickData={onItemClickData}
            />
          )}
          {type === 'inspection' && (
            <Type4
              saveHandler={saveHandler}
              onItemClickData={onItemClickData}
            />
          )}

          {type === 'type1' && <Type1 saveHandler={saveHandler} />}
          {/* hml 대량등록 */}
          {type === 'type2' && <Type2 />}
          {type === 'type3' && <Type3 saveHandler={saveHandler} />}
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
  height: calc(100vh - 140px); // 탭 네비 높이, 하단 셀렉트 높이 제외
  padding: 0;
  margin: 0;
  display: flex;
  align-items: stretch;

  &.type2 {
    width: 100%;
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 30px;
  padding-left: calc(50% - 35px);
`;
