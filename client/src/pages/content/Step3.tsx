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
  padding: 0 40px 40px 40px;
  width: 100%;
  height: 100%;
`;
