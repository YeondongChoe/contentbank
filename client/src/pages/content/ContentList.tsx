import React, { useState } from 'react';
import styled from 'styled-components';
import List from '../../components/contents/List';
import { useRecoilValue } from 'recoil';
import { contentCreateState } from '../../recoil/State';

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
