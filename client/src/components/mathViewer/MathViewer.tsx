import * as React from 'react';

// import { MathJaxProvider, MathJaxHtml } from 'mathjax3-react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import styled from 'styled-components';

import { ItemQuestionType } from '../../types';
type MathViewerProps = {
  data?: ItemQuestionType;
};

const config = {
  loader: { load: ['[tex]/html'] },
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
  return (
    <Component>
      <MathJaxContext version={3} config={config}>
        {data && (
          <>
            {/* <MathJaxProvider>
        <MathJaxHtml html={Contents.it_quest} />
      </MathJaxProvider> */}
            <strong>{data.it_title}</strong>

            <MathJax inline>
              <p dangerouslySetInnerHTML={{ __html: data.it_quest }}></p>
            </MathJax>
          </>
        )}
      </MathJaxContext>
    </Component>
  );
}

const Component = styled.div``;
