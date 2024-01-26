import * as React from 'react';

import styled from 'styled-components';

import { Step3 } from '../../components/contents/createworksheet';

export function CreateWorksheetStep3() {
  return (
    <Container>
      <Step3 />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
