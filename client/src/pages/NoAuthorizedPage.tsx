import * as React from 'react';

import styled from 'styled-components';

export function NoAuthrizedPage() {
  return (
    <Container>
      <div>접근권한이 없습니다....</div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;
