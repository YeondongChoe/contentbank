import * as React from 'react';

import styled from 'styled-components';

import { Step2 } from '../../components/contents/createworksheet';

export function CreateWorksheetStep2() {
  return (
    <Container>
      <Step2 />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
