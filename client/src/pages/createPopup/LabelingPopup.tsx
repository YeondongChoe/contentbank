import * as React from 'react';

import styled from 'styled-components';

import { COLOR } from '../../components/contents/COLOR';

export function LabelingPopup() {
  return (
    <Container>
      <div>개체 라벨링</div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 80%;
  min-width: 800px;
  padding: 20px;
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
  height: 750px;
`;
