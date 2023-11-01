import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import List from '../../components/contents/List';
import Worksheet from '../../components/contents/Worksheet';
import { useRecoilValue } from 'recoil';
import { contentCreateState } from '../../recoil/State';
import Member from '../../components/operation/Member';
import Authority from '../../components/operation/Authority';

const Contentpage = () => {
  const pageMenu = useRecoilValue(contentCreateState);

  return (
    <S.main>
      <Header />
      {pageMenu === 0 && <List />}
      {pageMenu === 1 && <List />}
      {pageMenu === 2 && <Worksheet />}
      {pageMenu === 3 && '문항'}
      {pageMenu === 4 && '트리구조'}
      {pageMenu === 5 && <Member />}
      {pageMenu === 6 && <Authority />}
    </S.main>
  );
};

const S = {
  main: styled.main`
    width: 100vw;
    margin-top: 40px;
    //height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
};

export default Contentpage;
