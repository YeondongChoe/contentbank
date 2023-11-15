import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

const ManagementTree = () => {
  return (
    <S.main>
      <div>콘텐츠 관리 트리구조</div>
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

export default ManagementTree;
