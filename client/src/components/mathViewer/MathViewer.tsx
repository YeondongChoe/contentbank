import * as React from 'react';

// import { MathJaxProvider, MathJaxHtml } from 'mathjax3-react';

import styled from 'styled-components';

import { ItemQuestionType } from '../../types';
type MathViewerProps = {
  data?: ItemQuestionType;
};

export function MathViewer({ data }: MathViewerProps) {
  return (
    <Component>
      {data && (
        <>
          {/* <MathJaxProvider>
        <MathJaxHtml html={Contents.it_quest} />
      </MathJaxProvider> */}
          <strong>{data.it_title}</strong>
        </>
      )}
    </Component>
  );
}

const Component = styled.div``;
