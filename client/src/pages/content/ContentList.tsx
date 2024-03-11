import * as React from 'react';

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
  height: 100%;
  overflow-y: auto;
`;
