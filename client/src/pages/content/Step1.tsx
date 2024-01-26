import * as React from 'react';

import styled from 'styled-components';

import { Step1 } from '../../components/contents/createworksheet';

export function CreateWorksheetStep1() {
  return (
    <Container>
      <Step1 />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
