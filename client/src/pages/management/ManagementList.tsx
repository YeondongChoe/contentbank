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

const Container = styled.div``;
