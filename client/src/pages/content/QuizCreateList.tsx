import * as React from 'react';

import styled from 'styled-components';

import { QuizCreateList } from '../../components/contents/QuizCreateList';

export function QuizCreateListPage() {
  return (
    <Container>
      <QuizCreateList />
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  overflow-y: auto;
`;
