import React from 'react';
import styled from 'styled-components';
import ManagementsTree from '../../components/managements/ManagementsTree';

const ManagementTree = () => {
  return (
    <S.main>
      <ManagementsTree />
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
