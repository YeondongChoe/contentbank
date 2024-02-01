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
  padding: 0 80px 40px 80px;
  width: 100%;
  height: 100%;
`;
