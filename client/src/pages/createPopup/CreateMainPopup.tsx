import React from 'react';
import styled from 'styled-components';

const MainPopup = () => {
  return <S.main></S.main>;
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

export default MainPopup;
