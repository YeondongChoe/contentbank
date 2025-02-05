import * as React from 'react';

import styled from 'styled-components';

export function Preparing() {
  return (
    <Container>
      <div>준비중인 페이지입니다....</div>
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
