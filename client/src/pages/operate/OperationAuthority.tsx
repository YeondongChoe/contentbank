import React, { useState } from 'react';
import styled from 'styled-components';
import { Authority } from '../../components/operation/Authority';

export function OperationAuthority() {
  return (
    <Container>
      <Authority />
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
