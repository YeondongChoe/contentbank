import * as React from 'react';
import { useState, useEffect } from 'react';

import { MathJax, MathJax3Object, MathJaxContext } from 'better-react-mathjax';
import styled from 'styled-components';

import { ItemQuestionType } from '../../types';
import { QuizList } from '../../types/WorkbookType';
import { Loader, ValueNone } from '../atom';

type MathViewerProps = {
  data?: QuizList | ItemQuestionType | any;
  // display?: string;
  width?: string;
  padding?: string;
  height?: string;
  children?: React.ReactNode | React.ReactNode[];
};

const config = {
  loader: {
    load: ['[tex]/html'],
  },
  tex: {
    packages: {
      '[+]': [
        'html',
        'amsmath',
        'amscd',
        'amsopn',
        'amsxtra',
        'mathtools',
        'color',
        'mhchem',
      ],
    },
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]'],
    ],
    processEscapes: true,
    processEnvironments: true,
    autoload: {
      color: [],
      colorV2: ['color'],
      mhchem: ['mhchem'],
    },
    tags: 'ams',
    macros: {
      '\\RR': '\\mathbb{R}',
    },
  },
  options: {
    skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
    ignoreHtmlClass: 'tex2jax_ignore',
    processHtmlClass: 'tex2jax_process',
  },
};

export function MathViewer({
  data,
  children,
  width,
  padding,
  height,
}: MathViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [mathJax, setMathJax] = useState<MathJax3Object | null>(null);

  useEffect(() => {
    if (mathJax && data) {
      mathJax.startup.promise
        .then(() => {
          mathJax.typeset();
        })
        .catch((err: any) => {
          console.error('MathJax typeset error:', err);
        });

      return () => {
        mathJax.texReset();
      };
    }
  }, [mathJax, data]);

  useEffect(() => {
    console.log('뷰어로 들어온 데이터 0---', data);
    setIsLoading(!data);
  }, [data]);

  const createMarkup = (data: string) => {
    return { __html: data || '' };
  };

  const renderCalculations = () => {
    if (!data) {
      return <ValueNone info={`데이터가 없습니다`} textOnly />;
    }

    return (
      <div>
        <MathJax inline dynamic>
          <ContentQuestion dangerouslySetInnerHTML={createMarkup(data)} />
        </MathJax>
      </div>
    );
  };

  return (
    <Component width={width} height={height} $padding={padding}>
      <MathJaxContext
        version={3}
        config={config}
        onStartup={(mathJaxInstance) => {
          console.log('MathJax initialized');
          setMathJax(mathJaxInstance);
        }}
      >
        {isLoading ? (
          <Loader height={'50px'} size="35px" />
        ) : (
          renderCalculations()
        )}
      </MathJaxContext>
    </Component>
  );
}

type MathViewerStyleProps = {
  // display: string;
  width?: string;
  height?: string;
  $padding?: string;
};

const Component = styled.div<MathViewerStyleProps>`
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
  min-height: ${({ height }) => height && ` ${height};`};
  padding: ${({ $padding }) => ($padding ? `${$padding}` : '0')};
`;

const ContentQuestion = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
`;
