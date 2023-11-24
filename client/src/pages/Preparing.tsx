import React, { useState } from 'react';
import styled from 'styled-components';

const Preparing = () => {
  return (
    <S.main>
      <div>준비중인 페이지입니다....</div>
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

export default Preparing;
