import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ManagementContentPopupState } from '../../recoil/ManagementContentState';

import CloseIcon from '@mui/icons-material/Close';

const ManagemantMainPopup = () => {
  const [isCreate, setIsCreate] = useRecoilState(ManagementContentPopupState);

  const closePopup = () => {
    setIsCreate(false);
  };
  return (
    <S.popupOverlay>
      <S.popupcontainer>
        <S.btnWrapper>
          <CloseIcon onClick={closePopup} sx={{ cursor: 'pointer' }} />
        </S.btnWrapper>
        <S.tapContainer>문항 바꾸기</S.tapContainer>
      </S.popupcontainer>
    </S.popupOverlay>
  );
};

const S = {
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
    z-index: 1;
  `,
  popupcontainer: styled.div`
    width: 80vw;
    height: 95vh;
    border: 1px solid #a3aed0;
    background-color: white;
  `,
  btnWrapper: styled.div`
    margin: 40px 30px;
    display: flex;
    justify-content: flex-end;
  `,
  tapContainer: styled.div`
    margin-top: 180px;
    display: flex;
    justify-content: center;
    gap: 100px;
  `,
  tapWrapper: styled.div`
    width: 230px;
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #5f86fc;
    border-radius: 25px;
    cursor: pointer;
  `,
  iconWrapper: styled.div`
    margin-bottom: 30px;
  `,
  tapTextWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  tapName: styled.div``,
  tapDiscription: styled.div``,
};

export default ManagemantMainPopup;
