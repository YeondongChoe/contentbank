import React, { useState } from 'react';
import styled from 'styled-components';
import Member from '../../components/operation/Member';

const OperationMember = () => {
  return (
    <S.main>
      <Member />
    </S.main>
  );
};

const S = {
  main: styled.main`
    width: 100vw;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
};

export { OperationMember };
