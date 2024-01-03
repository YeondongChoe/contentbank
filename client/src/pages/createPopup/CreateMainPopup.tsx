import * as React from 'react';
import { useState } from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { TabMenu } from '../../components';
import { COLOR } from '../../components/constants/COLOR';
import {
  createContentPopupBoolAtom,
  uploadBoolAtom,
  creatingNewContentBoolAtom,
  uploadFileBoolAtom,
} from '../../store/creatingContentAtom';

import { ClassificationPopup } from './ClassificationPopup';
import { ContentCreatingPopup } from './ContentCreatingPopup';
import { FileUploadingPopup } from './FileUploadingPopup';
import { LabelingPopup } from './LabelingPopup';

export function CreateMainPopup() {
  const menuList = [
    {
      label: 'DT & Editing',
      value: 'DT & Editing',
    },
    {
      label: '문항 분류',
      value: '문항 분류',
    },
    {
      label: '개체 라벨링',
      value: '개체 라벨링',
    },
  ];
  const [tabVeiw, setTabVeiw] = useState<string>('DT & Editing');

  const [isCreate, setIsCreate] = useRecoilState(createContentPopupBoolAtom);
  const [isUpload, setIsUpload] = useRecoilState(uploadBoolAtom);
  const isCreateNewContent = useRecoilValue(creatingNewContentBoolAtom);
  const isUploadFile = useRecoilValue(uploadFileBoolAtom);

  const goBackMainPopup = () => {
    setIsUpload(false);
  };

  const closePopup = () => {
    setIsCreate(false);
    setIsUpload(false);
  };

  return (
    <Container>
      <Wrapper>
        <IconWrapper>
          <ArrowBackIosNewIcon onClick={goBackMainPopup} />
        </IconWrapper>
        <TapMenuWrapper>
          <TabMenu
            length={3}
            menu={menuList}
            initialValue={'DT & Editing'}
            width={'350px'}
            setTabVeiw={setTabVeiw}
          />
        </TapMenuWrapper>
        <CloseButtonWrapper>
          <CloseIcon onClick={closePopup} sx={{ cursor: 'pointer' }} />
        </CloseButtonWrapper>
      </Wrapper>
      {tabVeiw === 'DT & Editing' && (
        <ContentBox>
          {isCreateNewContent && <ContentCreatingPopup />}
          {isUploadFile && <FileUploadingPopup />}
        </ContentBox>
      )}
      {tabVeiw === '문항 분류' && (
        <ContentBox>
          <ClassificationPopup />
        </ContentBox>
      )}
      {tabVeiw === '개체 라벨링' && (
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
const Wrapper = styled.div`
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
const TapMenuWrapper = styled.div`
  display: flex;
  flex: 1 0 0;
`;
const CloseButtonWrapper = styled.div`
  display: flex;
`;
const ContentBox = styled.div`
  margin-left: 34px;
  border-top: 1px solid ${COLOR.BORDER_BLUE};
  height: 700px;
`;
