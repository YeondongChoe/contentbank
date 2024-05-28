import * as React from 'react';
import { useState, useEffect } from 'react';

import { MathJax, MathJax3Object, MathJaxContext } from 'better-react-mathjax';
import styled from 'styled-components';

import { ItemQuestionType } from '../../types';
import { QuizList } from '../../types/WorkbookType';
import { Loader } from '../atom/Loader';

type MathViewerProps = {
  data?: QuizList | any;
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

export function MathViewer({
  data,
  children,
  width,
  padding,
  height,
}: MathViewerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mathJax, setMathJax] = useState<MathJax3Object | null>(null);

  const createMarkup = (data: string) => {
    return { __html: data || '' };
  };

  useEffect(() => {
    if (mathJax && data) {
      console.log('MathJax and data are ready');
      mathJax.startup.promise.then(() => {
        mathJax
          .typeset()
          .then(() => {
            console.log('MathJax typeset complete');
            setIsLoaded(true); // Set loaded to true once typesetting is complete
          })
          .catch((err: any) => {
            console.error('MathJax typeset error:', err);
          });
      });

      return () => {
        mathJax.texReset();
      };
    }
  }, [mathJax, data]);

  useEffect(() => {
    if (!data) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [data]);

  return (
    <>
      {!isLoaded && <Loader height={'50px'} size="35px" />}

      {isLoaded && (
        <Component width={width} height={height} $padding={padding}>
          <MathJaxContext
            version={3}
            config={config}
            onStartup={(mathJax) => {
              console.log('MathJax initialized');
              setMathJax(mathJax);
            }}
          >
            <MathJax inline dynamic>
              {data &&
                data.quizItemList &&
                data.quizItemList.map(
                  (
                    item: { content: string },
                    index: React.Key | null | undefined,
                  ) => (
                    <ContentQuestion
                      key={index}
                      dangerouslySetInnerHTML={createMarkup(item.content)}
                    />
                  ),
                )}
              {children}
            </MathJax>
          </MathJaxContext>
        </Component>
      )}
    </>
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

const ContentQuestion = styled.div``;
