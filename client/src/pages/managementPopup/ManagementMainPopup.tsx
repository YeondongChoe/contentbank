import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { managementContentPopupBoolAtom } from '../../state/managementContentAtom';
import { SelectBar } from '../../components/contents/Selectbar';
import { ContentInformationChange } from './ContentInformationChange';
import { ContentCategoryChange } from './ContentCategoryChange';

import CloseIcon from '@mui/icons-material/Close';

const ManagemantMainPopup = () => {
  const [isCreate, setIsCreate] = useRecoilState(
    managementContentPopupBoolAtom,
  );
  const [choiceValue, setChoiceValue] = useState(1);

  const closePopup = () => {
    setIsCreate(false);
  };

  const moveContentInformationChange = () => {
    setChoiceValue(1);
  };

  const moveContentCategoryChange = () => {
    setChoiceValue(2);
  };
  return (
    <S.popupOverlay>
      <S.popupcontainer>
        <S.topContainer>
          <S.tapWapper>
            <S.tapManu
              choiced={choiceValue}
              onClick={moveContentInformationChange}
            >
              바꾸기
            </S.tapManu>
            <S.tapManu
              choiced={choiceValue}
              onClick={moveContentCategoryChange}
            >
              문항 분류 바꾸기
            </S.tapManu>
          </S.tapWapper>
          <S.btnWrapper>
            <CloseIcon onClick={closePopup} sx={{ cursor: 'pointer' }} />
          </S.btnWrapper>
        </S.topContainer>
        {choiceValue === 1 && (
          <S.contentBox>
            <ContentInformationChange />
          </S.contentBox>
        )}
        {choiceValue === 2 && (
          <S.contentBox>
            <ContentCategoryChange />
          </S.contentBox>
        )}
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
  topContainer: styled.div`
    width: 100%;
    padding: 20px 30px 0px;
    display: flex;
    //align-items: flex-end;
    border-bottom: 1px solid #a3aed0;
    justify-content: space-between;
  `,
  tapWapper: styled.div`
    display: flex;
  `,
  tapManu: styled.div<{ choiced: number }>`
    width: 200px;
    height: 40px;
    border: 1px solid #a3aed0;
    border-bottom: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:first-child {
      background-color: ${(props) =>
        props.choiced === 1 ? 'rgba(0, 0, 0, 0.3)' : 'white'};
      color: ${(props) => (props.choiced === 1 ? 'white' : 'initial')};
      border-top-right-radius: 15px;
      border-top-left-radius: 15px;
    }
    &:nth-child(2) {
      background-color: ${(props) =>
        props.choiced === 2 ? 'rgba(0, 0, 0, 0.3)' : 'white'};
      color: ${(props) => (props.choiced === 2 ? 'white' : 'initial')};
      border-top-right-radius: 15px;
      border-top-left-radius: 15px;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
      color: white;
    }
  `,
  btnWrapper: styled.div`
    display: flex;
    align-items: center;
  `,
  contentBox: styled.div``,
};

export { ManagemantMainPopup };
