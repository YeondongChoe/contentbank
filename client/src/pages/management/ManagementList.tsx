import * as React from 'react';

import styled from 'styled-components';

import { ManagementsList } from '../../components/managements/ManagementsList';

export function ManagementList() {
  return (
    <Container>
      <ManagementsList />
    </Container>
  );
}

const Container = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
