import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { managementTreePopupBoolAtom } from '../../recoil/managementContentAtom';

import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';

const ManagemantTreePopup = () => {
  const [isCreate, setIsCreate] = useRecoilState(managementTreePopupBoolAtom);

  const closePopup = () => {
    setIsCreate(false);
  };
  return (
    <S.popupOverlay>
      <S.popupcontainer>
        <S.tapContainer>
          <S.titleContainer>
            <S.title> 문항 정보 트리트리</S.title>
            <S.btnWrapper>
              <StyledActionBtn variant="contained">+ 신규 추가</StyledActionBtn>
              <StyledActionBtn variant="contained">+ 폴더 복제</StyledActionBtn>
            </S.btnWrapper>
          </S.titleContainer>
          <S.iconWrapper>
            <CloseIcon onClick={closePopup} sx={{ cursor: 'pointer' }} />
          </S.iconWrapper>
        </S.tapContainer>
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
  tapContainer: styled.div`
    height: 100px;
    margin: 40px 30px;
    display: flex;
    justify-content: space-between;
  `,
  titleContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 10px;
  `,
  title: styled.div`
    font-size: 16px;
  `,
  btnWrapper: styled.div`
    display: flex;
    gap: 10px;
  `,
  iconWrapper: styled.div``,
};

const StyledActionBtn = styled(Button)`
  && {
    width: 100px;
    height: 40px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;

const StyledSaveBtn = styled(Button)`
  && {
    width: 100px;
    height: 40px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;

export default ManagemantTreePopup;
