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

export function CreateMainPopup() {
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
    <Container>
      <Warpper>
        <IconWrapper>
          <ArrowBackIosNewIcon onClick={goBackMainPopup} />
        </IconWrapper>
        <TapMenuWarpper>
          <TapManu choiced={choiceValue} onClick={moveDT_Editing}>
            DT & Editing
          </TapManu>
          <TapManu choiced={choiceValue} onClick={moveClassification}>
            문항 분류
          </TapManu>
          <TapManu choiced={choiceValue} onClick={moveLabeling}>
            개체 라벨링
          </TapManu>
        </TapMenuWarpper>
        <CloseButtonWarpper onClick={closePopup}>
          <CloseIcon />
        </CloseButtonWarpper>
      </Warpper>
      {choiceValue === 1 && (
        <ContentBox>
          {isCreateNewContent && <ContentCreatingPopup />}
          {isUploadFile && <FileUploadingPopup />}
        </ContentBox>
      )}
      {choiceValue === 2 && (
        <ContentBox>
          <ClassificationPopup />
        </ContentBox>
      )}
      {choiceValue === 3 && (
        <ContentBox>
          <LabelingPopup />
        </ContentBox>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Warpper = styled.div`
  padding-top: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
`;
const TapMenuWarpper = styled.div`
  display: flex;
  flex: 1 0 0;
`;
const TapManu = styled.div<{ choiced: number }>`
  width: 150px;
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
`;
const CloseButtonWarpper = styled.div`
  cursor: pointer;
  display: flex;
`;
const ContentBox = styled.div`
  height: 750px;
  margin-left: 34px;
  border-top: 1px solid #a3aed0;
`;
