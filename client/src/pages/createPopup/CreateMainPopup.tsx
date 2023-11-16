import React from 'react';
import styled from 'styled-components';
import { CreatePopupState } from '../../recoil/UtilState';
import { useRecoilState, useSetRecoilState } from 'recoil';

const MainPopup = () => {
  const [isCreate, setIsCreate] = useRecoilState(CreatePopupState);

  return (
    <S.popupOverlay>
      <S.popupcontainer>
        <div onClick={() => setIsCreate(false)}>x</div>
      </S.popupcontainer>
    </S.popupOverlay>
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
  popupOverlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
  `,
  popupcontainer: styled.div`
    width: 90vw;
    height: 90vh;
    border: 1px solid #a3aed0;
    background-color: white;
  `,
};

export default MainPopup;
