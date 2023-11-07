import React, { useState } from 'react';
import styled from 'styled-components';

const Notfound = () => {
  return (
    <S.main>
      <div>페이지를 찾을 수 없습니다.</div>
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

export default Notfound;
