import * as React from 'react';

import styled from 'styled-components';

import { Worksheet } from '../../components/contents/Worksheet';

export function ContentWorksheet() {
  return (
    <Container>
      <Worksheet />
    </Container>
  );
}

const Container = styled.div`
  //display: flex;
  //flex-direction: column;
  //align-items: center;
  //justify-content: center;
`;
