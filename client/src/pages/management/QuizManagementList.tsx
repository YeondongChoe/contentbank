import * as React from 'react';

import styled from 'styled-components';

import { QuizManagementList } from '../../components/managements/QuizManagementList';

export function QuizManagementListPage() {
  return (
    <Container>
      <QuizManagementList />
    </Container>
  );
}

const Container = styled.div``;
