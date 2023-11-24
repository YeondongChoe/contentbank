import React, { useState } from 'react';
import styled from 'styled-components';
import List from '../../components/contents/List';

const ContentList = () => {
  return (
    <S.main>
      <List />
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

export default ContentList;
