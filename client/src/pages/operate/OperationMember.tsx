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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
