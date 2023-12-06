import React from 'react';
import styled from 'styled-components';

const LabelingPopup = () => {
  return (
    <S.main>
      <div>개체 라벨링</div>
    </S.main>
  );
};

const S = {
  main: styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid #a3aed0;
    border-top: none;
  `,
};

export { LabelingPopup };
