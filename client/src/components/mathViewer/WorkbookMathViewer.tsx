import * as React from 'react';
import { useState, useEffect } from 'react';

import { MathJax, MathJax3Object, MathJaxContext } from 'better-react-mathjax';
import styled from 'styled-components';

import Contents2 from '../../components/mathViewer/test3.json';
import { ItemQuestionType } from '../../types';
import { QuizList } from '../../types/WorkbookType';
import { Loader } from '../atom/Loader';

type WorkbookMathViewerProps = {
  data: QuizList;
  display?: string;
  width?: string;
  padding?: string;
  height?: string;
};

const config = {
  loader: {
    load: ['[tex]/html'],
  },
  tex: {
    packages: { '[+]': ['html'] },
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]'],
    ],
  },
};

export function WorkbookMathViewer({
  data,
  width,
  padding,
  height,
}: WorkbookMathViewerProps) {
  const [display, setDisplay] = useState('none');
  const [mathJax, setMathJax] = useState<MathJax3Object | null>(null);

  const offLoader = () => {
    // console.log('off loader');
    setDisplay('block');
  };

  const createMarkup = (data: string) => {
    return { __html: data || '' };
  };

  useEffect(() => {
    if (mathJax) {
      // Typesetting 완료 이벤트 등록
      mathJax.startup.promise.then(() => {
        // Typesetting 완료 후 호출될 콜백
        mathJax.typeset();
        //offLoader();
      });

      // 컴포넌트가 언마운트 될 때 MathJax 정리
      return () => {
        mathJax.texReset();
      };
    }
  }, [mathJax]);

  return (
    <>
      {display === 'none' && <Loader height={'50px'} size="35px" />}

      <Component
        display={display}
        width={width}
        height={height}
        $padding={padding}
      >
        <MathJaxContext
          version={3}
          config={config}
          onStartup={(mathJax) => setMathJax(mathJax)}
        >
          <MathJaxWrapper>
            <strong>{data.num < 10 ? `0${data.num}` : `${data.num}`}</strong>
            <MathJax inline dynamic onInitTypeset={() => offLoader()}>
              <ContentQuestion
                dangerouslySetInnerHTML={createMarkup(
                  data?.quizItemList[1]?.content,
                )}
              ></ContentQuestion>
              {/* <ContentAnswer
              dangerouslySetInnerHTML={createMarkup(data.it_answer[0])}
            ></ContentAnswer> */}
            </MathJax>
          </MathJaxWrapper>
        </MathJaxContext>
      </Component>
    </>
  );
}

type MathViewerStyleProps = {
  display: string;
  width?: string;
  height?: string;
  $padding?: string;
};

const Component = styled.div<MathViewerStyleProps>`
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
  min-height: ${({ height }) => height && ` ${height};`};
  display: ${({ display }) => (display ? `${display}` : 'block')};
  padding: ${({ $padding }) => ($padding ? `${$padding}` : '0')};
`;
const MathJaxWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const ContentQuestion = styled.div``;
