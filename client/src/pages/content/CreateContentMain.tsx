import * as React from 'react';
import { useState } from 'react';

import { IoIosArrowBack, IoMdClose } from 'react-icons/io';
// import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { TabMenu } from '../../components';
import { COLOR } from '../../components/constants/COLOR';
import {
  createContentPopupBoolAtom,
  uploadPopupBoolAtom,
  creatingNewContentBoolAtom,
  uploadFileBoolAtom,
} from '../../store/creatingContentAtom';

// import { ClassificationPopup } from './ClassificationPopup';
// import { ContentCreatingPopup } from './ContentCreatingPopup';
// import { FileUploadingPopup } from './FileUploadingPopup';
// import { LabelingPopup } from './LabelingPopup';

export function CreateContentMain() {
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    // setIsCreate(false);
    navigate(-1);
  };

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

  // const setIsCreate = useSetRecoilState(createContentPopupBoolAtom);
  // const setIsUpload = useSetRecoilState(uploadPopupBoolAtom);
  // const isCreateNewContent = useRecoilValue(creatingNewContentBoolAtom);
  // const isUploadFile = useRecoilValue(uploadFileBoolAtom);

  // const closePopup = () => {
  //   // setIsCreate(false);
  //   // setIsUpload(false);
  // };

  return (
    <Container>
      <Wrapper>
        <IconWrapper>
          <IoIosArrowBack
            style={{ fontSize: '24px', cursor: 'pointer' }}
            onClick={goBack}
          />
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
        {/* <CloseButtonWrapper>
          <IoMdClose
            onClick={closePopup}
            style={{ fontSize: '22px', cursor: 'pointer' }}
          />
        </CloseButtonWrapper> */}
      </Wrapper>
      {tabVeiw === 'DT & Editing' && (
        <ContentBox>
          {/* {isCreateNewContent && <ContentCreatingPopup />}
          {isUploadFile && <FileUploadingPopup />} */}
        </ContentBox>
      )}
      {tabVeiw === '문항 분류' && (
        <ContentBox>{/* <ClassificationPopup /> */}</ContentBox>
      )}
      {tabVeiw === '개체 라벨링' && (
        <ContentBox>{/* <LabelingPopup /> */}</ContentBox>
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
