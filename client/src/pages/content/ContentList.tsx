import React from 'react';
import styled from 'styled-components';
import { ContentsList } from '../../components/contents/ContentsList';

const ContentList = () => {
  return (
    <Style.main>
      <ContentsList />
    </Style.main>
  );
};

const Style = {
  main: styled.main`
    width: 100vw;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
};

export { ContentList };
