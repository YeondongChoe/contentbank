import React, { useState } from 'react';
import styled from 'styled-components';
import {
  createContentPopupBoolAtom,
  uploadBoolAtom,
  creatingNewContentBoolAtom,
  uploadFileBoolAtom,
} from '../../state/creatingContentAtom';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { ContentCreatingPopup } from './ContentCreatingPopup';
import { FileUploadingPopup } from './FileUploadingPopup';
import { ClassificationPopup } from './ClassificationPopup';
import { LabelingPopup } from './LabelingPopup';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';

const CreateMainPopup = () => {
  const [isCreate, setIsCreate] = useRecoilState(createContentPopupBoolAtom);
  const [isUpload, setIsUpload] = useRecoilState(uploadBoolAtom);
  const isCreateNewContent = useRecoilValue(creatingNewContentBoolAtom);
  const isUploadFile = useRecoilValue(uploadFileBoolAtom);

  const [choiceValue, setChoiceValue] = useState(1);

  const goBackMainPopup = () => {
    setIsUpload(false);
  };

  const moveDT_Editing = () => {
    setChoiceValue(1);
  };

  const moveClassification = () => {
    setChoiceValue(2);
  };

  const moveLabeling = () => {
    setChoiceValue(3);
  };

  const closePopup = () => {
    setIsCreate(false);
    setIsUpload(false);
  };

  return (
    <S.main>
      <S.contentHead>
        <S.iconWrapper>
          <ArrowBackIosNewIcon onClick={goBackMainPopup} />
        </S.iconWrapper>
        <S.tapContainer>
          <S.tapManu choiced={choiceValue} onClick={moveDT_Editing}>
            DT & Editing
          </S.tapManu>
          <S.tapManu choiced={choiceValue} onClick={moveClassification}>
            문항 분류
          </S.tapManu>
          <S.tapManu choiced={choiceValue} onClick={moveLabeling}>
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
            {isCreateNewContent && <ContentCreatingPopup />}
            {isUploadFile && <FileUploadingPopup />}
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
    width: 100%;
    display: flex;
  `,
  tapManu: styled.div<{ choiced: number }>`
    width: 20%;
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
  `,
  contentBox: styled.div`
    //width: 100%;
    height: 750px;
    margin-left: 64px;
    border-top: 1px solid #a3aed0;
    margin-right: 30px;
  `,
  contentBoxContainer: styled.div`
    width: 100%;
  `,
};

export { CreateMainPopup };
