import React, { useState } from 'react';
import styled from 'styled-components';

export function Notfound() {
  return (
    <Container>
      <div>페이지를 찾을 수 없습니다.</div>
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
