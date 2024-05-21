import * as React from 'react';
import { useState, useEffect } from 'react';

import { MathJax, MathJax3Object, MathJaxContext } from 'better-react-mathjax';
import styled from 'styled-components';

import Contents2 from '../../components/mathViewer/test3.json';
import { ItemQuestionType } from '../../types';
import { QuizList } from '../../types/WorkbookType';
import { Loader } from '../atom/Loader';

type MathViewerProps = {
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

export function MathViewer({ data, width, padding, height }: MathViewerProps) {
  const [display, setDisplay] = useState('none');
  const [mathJax, setMathJax] = useState<MathJax3Object | null>(null);
  // const setMathJax = (mathJax: MathJax3Object) => {
  //   return mathJax;
  // };

  const offLoader = () => {
    // console.log('off loader');
    setDisplay('block');
  };
  //console.log(data.quizItemList[1].content);
  //console.log(Contents2.it_quest);

  // 안정성 문제로 리액트에서 권장하는 방식
  // const createMarkup = (data: string) => {
  //   // console.log('on load');
  //   return { __html: data };
  // };

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
          {/* <strong>{data.it_title}</strong> */}
          <MathJax inline dynamic onInitTypeset={() => offLoader()}>
            <ContentQuestion
              dangerouslySetInnerHTML={createMarkup(
                data.quizItemList[5].content,
              )}
            ></ContentQuestion>
            {/* <ContentAnswer
              dangerouslySetInnerHTML={createMarkup(data.it_answer[0])}
            ></ContentAnswer> */}
          </MathJax>
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
const ContentQuestion = styled.div``;
