import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { contentCreateState } from '../../recoil/State';

const ManagementList = () => {
  return (
    <S.main>
      <div>콘텐츠 관리 문항</div>
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

export default ManagementList;
