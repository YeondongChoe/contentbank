import * as React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import PostAddIcon from '@mui/icons-material/PostAdd';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  createContentPopupBoolAtom,
  uploadBoolAtom,
  creatingNewContentBoolAtom,
  uploadFileBoolAtom,
} from '../../state/creatingContentAtom';

import { CreateMainPopup } from './CreateMainPopup';

const styleIcon = {
  width: '150px',
  height: '150px',
};

export function CreateIconPopup() {
  const [isCreate, setIsCreate] = useRecoilState(createContentPopupBoolAtom);
  const [isUpload, setIsUpload] = useRecoilState(uploadBoolAtom);
  const setIsCreateNewContent = useSetRecoilState(creatingNewContentBoolAtom);
  const setIsUploadFile = useSetRecoilState(uploadFileBoolAtom);

  const closePopup = () => {
    setIsCreate(false);
  };

  const moveContentCreating = () => {
    setIsUpload(true);
    setIsCreateNewContent(true);
    setIsUploadFile(false);
    console.log('가져올 데이터 없음');
  };

  const moveFileUploading = () => {
    setIsUpload(true);
    setIsUploadFile(true);
    setIsCreateNewContent(false);
  };

  const moveBigFileUploading = () => {
    setIsUpload(true);
    setIsUploadFile(true);
    setIsCreateNewContent(false);
  };

  return (
    <Overlay>
      <Container>
        {isUpload ? (
          <CreateMainPopup />
        ) : (
          <>
            <CancelButtonWrapper>
              <CloseIcon onClick={closePopup} sx={{ cursor: 'pointer' }} />
            </CancelButtonWrapper>
            <MenuListWrapper>
              <MenuWrapper onClick={moveContentCreating}>
                <IconWrapper>
                  <PostAddIcon sx={styleIcon} />
                </IconWrapper>
                <TextWrapper>
                  <MenuName>문항 신규 제작</MenuName>
                </TextWrapper>
              </MenuWrapper>
              <MenuWrapper onClick={moveFileUploading}>
                <IconWrapper>
                  <UploadFileIcon sx={styleIcon} />
                </IconWrapper>
                <TextWrapper>
                  <MenuName>문항 파일 등록</MenuName>
                  <MenuDiscription>(촬영, 이미지, PDF 등)</MenuDiscription>
                </TextWrapper>
              </MenuWrapper>
              <MenuWrapper onClick={moveBigFileUploading}>
                <IconWrapper>
                  <DriveFolderUploadIcon sx={styleIcon} />
                </IconWrapper>
                <TextWrapper>
                  <MenuName>대량 문항 등록</MenuName>
                  <MenuDiscription>(hwp, hml, xml)</MenuDiscription>
                </TextWrapper>
              </MenuWrapper>
            </MenuListWrapper>
          </>
        )}
      </Container>
    </Overlay>
  );
}

const Overlay = styled.div`
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
`;
const Container = styled.div`
  max-width: 1024px;
  min-width: 800px;
  padding: 20px;
  border: 1px solid #a3aed0;
  background-color: white;
`;
const CancelButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const MenuListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px;
  gap: 100px;
`;
const MenuWrapper = styled.div`
  width: 230px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #5f86fc;
  border-radius: 25px;
  cursor: pointer;
`;
const IconWrapper = styled.div`
  margin-bottom: 30px;
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MenuName = styled.div``;
const MenuDiscription = styled.div``;
