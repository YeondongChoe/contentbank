import React from 'react';
import styled from 'styled-components';
import { Worksheet } from '../../components/contents/Worksheet';

const ContentWorksheet = () => {
  return (
    <S.main>
      <Worksheet />
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

export default ContentWorksheet;
