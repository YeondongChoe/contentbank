import * as React from 'react';
import { useState } from 'react';

import { MathJax, MathJax3Object, MathJaxContext } from 'better-react-mathjax';
import styled from 'styled-components';

import { ItemQuestionType } from '../../types';
import { Loader } from '../atom/Loader';

type MathViewerProps = {
  data: ItemQuestionType;
  display?: string;
  width?: string;
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

export function MathViewer({ data, width }: MathViewerProps) {
  const [display, setDisplay] = useState('none');

  const setMathJax = (mathJax: MathJax3Object) => {};

  const offLoader = () => {
    // console.log('off loader');
    setDisplay('block');
  };

  // 안정성 문제로 리액트에서 권장하는 방식
  const createMarkup = (data: string) => {
    // console.log('on load');
    return { __html: data };
  };

  return (
    <>
      {display === 'none' && <Loader height={'50px'} size="35px" />}

      <Component display={display} width={width}>
        <MathJaxContext
          version={3}
          config={config}
          onStartup={(mathJax) => setMathJax(mathJax)}
        >
          <strong>{data.it_title}</strong>
          <MathJax inline dynamic onInitTypeset={() => offLoader()}>
            <ContentQuestion
              dangerouslySetInnerHTML={createMarkup(data.it_quest)}
            ></ContentQuestion>
            <ContentAnswer
              dangerouslySetInnerHTML={createMarkup(data.it_answer[0])}
            ></ContentAnswer>
          </MathJax>
        </MathJaxContext>
      </Component>
    </>
  );
}

type MathViewerStyleProps = {
  display: string;
  width?: string;
};

const Component = styled.div<MathViewerStyleProps>`
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
  display: ${({ display }) => (display ? `${display}` : 'block')};
`;
const ContentQuestion = styled.div`
  height: 150px;
`;
const ContentAnswer = styled.div`
  //기본일때 50
  //6문제일때 100
  //4문제일때 200
  //2문제일때 800
  height: 50px;
`;
