import * as React from 'react';
import { useState } from 'react';

import { MathJax, MathJax3Object, MathJaxContext } from 'better-react-mathjax';
import styled from 'styled-components';

import { ItemQuestionType } from '../../types';
import { Loader } from '../atom/Loader';

type MathViewerProps = {
  data: ItemQuestionType;
  display?: string;
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

export function MathViewer({ data }: MathViewerProps) {
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

      <Component display={display}>
        <MathJaxContext
          version={3}
          config={config}
          onStartup={(mathJax) => setMathJax(mathJax)}
        >
          <strong>{data.it_title}</strong>

          <MathJax inline dynamic onInitTypeset={() => offLoader()}>
            <div dangerouslySetInnerHTML={createMarkup(data.it_quest)}></div>
            <div
              dangerouslySetInnerHTML={createMarkup(data.it_answer[0])}
            ></div>
          </MathJax>
        </MathJaxContext>
      </Component>
    </>
  );
}

const Component = styled.div<{ display: string }>`
  display: ${({ display }) => (display ? `${display}` : 'block')};
`;
