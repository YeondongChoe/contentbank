import React from 'react';
import styled from 'styled-components';
import { ContentsList } from '../../components/contents/ContentsList';

export function ContentList() {
  return (
    <Container>
      <ContentsList />
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
