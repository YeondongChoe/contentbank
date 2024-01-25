import * as React from 'react';

import styled from 'styled-components';

import { Member } from '../../components/operation/Member';

export function OperationMember() {
  return (
    <Container>
      <Member />
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  overflow-y: auto;
`;
