import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { contentCreateState } from '../../recoil/State';
import Member from '../../components/operation/Member';

const OperationMember = () => {
  const pageMenu = useRecoilValue(contentCreateState);

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

export default OperationMember;
