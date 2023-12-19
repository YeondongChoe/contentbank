import * as React from 'react';

import styled from 'styled-components';

import { ManagementsTree } from '../../components/managements/ManagementsTree';

export function ManagementTree() {
  return (
    <Container>
      <ManagementsTree />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
