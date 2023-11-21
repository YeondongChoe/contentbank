import React, { useState } from 'react';
import styled from 'styled-components';
import {
  CreatePopupState,
  UploadState,
  CreatingNewContentState,
  UploadFileState,
} from '../../recoil/CreatingContentState';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import CreatinNewContentgPopup from './CreatinNewContentgPopup';
import UploadFilePopup from './UploadFilePopup';
import ClassificationPopup from './ClassificationPopup';
import LabelingPopup from './LabelingPopup';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';

const UploadPopup = () => {
  const [isCreate, setIsCreate] = useRecoilState(CreatePopupState);
  const [isUpload, setIsUpload] = useRecoilState(UploadState);
  const isCreateNewContent = useRecoilValue(CreatingNewContentState);
  const isUploadFile = useRecoilValue(UploadFileState);

  const [choiceValue, setChoiceValue] = useState(1);

  const handleClickDT = () => {
    setChoiceValue(1);
  };

  const handleClickClassification = () => {
    setChoiceValue(2);
  };

  const handleClickLabeling = () => {
    setChoiceValue(3);
  };

  const closePopup = () => {
    setIsCreate(false);
    setIsUpload(false);
  };

  const goBackMainPopup = () => {
    setIsUpload(false);
  };

  return (
    <S.main>
      <S.contentHead>
        <S.iconWrapper onClick={goBackMainPopup}>
          <ArrowBackIosNewIcon />
        </S.iconWrapper>
        <S.tapContainer>
          <S.tapManu choiced={choiceValue} onClick={handleClickDT}>
            DT & Editing
          </S.tapManu>
          <S.tapManu choiced={choiceValue} onClick={handleClickClassification}>
            문항 분류
          </S.tapManu>
          <S.tapManu choiced={choiceValue} onClick={handleClickLabeling}>
            개체 라벨링
          </S.tapManu>
        </S.tapContainer>
        <S.btnWrapper onClick={closePopup}>
          <CloseIcon />
        </S.btnWrapper>
      </S.contentHead>
      <S.contentBoxContainer>
        {choiceValue === 1 && (
          <S.contentBox>
            {isCreateNewContent && <CreatinNewContentgPopup />}
            {isUploadFile && <UploadFilePopup />}
          </S.contentBox>
        )}
        {choiceValue === 2 && (
          <S.contentBox>
            <ClassificationPopup />
          </S.contentBox>
        )}
        {choiceValue === 3 && (
          <S.contentBox>
            <LabelingPopup />
          </S.contentBox>
        )}
      </S.contentBoxContainer>
    </S.main>
  );
};

const S = {
  main: styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  `,
  iconWrapper: styled.div`
    display: flex;
    align-items: center;
    margin-left: 30px;
    margin-right: 10px;
    cursor: pointer;
  `,
  contentHead: styled.div`
    margin-top: 34px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  tapContainer: styled.div`
    display: flex;
    width: 100%;
  `,
  tapManu: styled.div<{ choiced: number }>`
    width: 200px;
    height: 40px;
    border: 1px solid #a3aed0;
    border-bottom: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    cursor: pointer;
    &:first-child {
      background-color: ${(props) =>
        props.choiced === 1 ? 'rgba(0, 0, 0, 0.3)' : 'white'};
      color: ${(props) => (props.choiced === 1 ? 'white' : 'initial')};
    }
    &:nth-child(2) {
      background-color: ${(props) =>
        props.choiced === 2 ? 'rgba(0, 0, 0, 0.3)' : 'white'};
      color: ${(props) => (props.choiced === 2 ? 'white' : 'initial')};
    }
    &:nth-child(3) {
      background-color: ${(props) =>
        props.choiced === 3 ? 'rgba(0, 0, 0, 0.3)' : 'white'};
      color: ${(props) => (props.choiced === 3 ? 'white' : 'initial')};
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
      color: white;
    }
  `,
  btnWrapper: styled.div`
    margin-right: 30px;
    cursor: pointer;
    display: flex;
    justify-self: flex-end;
  `,
  contentBox: styled.div`
    height: 750px;
    margin-left: 64px;
    border-top: 1px solid #a3aed0;
    margin-right: 30px;
  `,
  contentBoxContainer: styled.div`
    width: 100%;
  `,
};

export default UploadPopup;
