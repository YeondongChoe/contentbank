import React from 'react';
import styled from 'styled-components';
import ManagementsList from '../../components/managements/ManagementsList';

const ManagementList = () => {
  return (
    <S.main>
      <ManagementsList />
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
