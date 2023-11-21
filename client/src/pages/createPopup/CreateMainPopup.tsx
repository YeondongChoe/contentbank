import React from 'react';
import styled from 'styled-components';
import {
  CreatePopupState,
  UploadState,
  CreatingNewContentState,
  UploadFileState,
} from '../../recoil/CreatingContentState';
import { useRecoilState, useSetRecoilState } from 'recoil';
import UploadPopup from './UploadPopup';

import CloseIcon from '@mui/icons-material/Close';
import PostAddIcon from '@mui/icons-material/PostAdd';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

const styleIcon = {
  width: '150px',
  height: '150px',
};

const MainPopup = () => {
  const [isCreate, setIsCreate] = useRecoilState(CreatePopupState);
  const [isUpload, setIsUpload] = useRecoilState(UploadState);
  const setIsCreateNewContent = useSetRecoilState(CreatingNewContentState);
  const setIsUploadFile = useSetRecoilState(UploadFileState);

  const closePopup = () => {
    setIsCreate(false);
  };

  const newContentCreating = () => {
    setIsUpload(true);
    setIsCreateNewContent(true);
    setIsUploadFile(false);
  };

  const newUploadFile = () => {
    setIsUpload(true);
    setIsUploadFile(true);
    setIsCreateNewContent(false);
  };

  const newUploadBigFile = () => {
    setIsUpload(true);
    setIsUploadFile(true);
    setIsCreateNewContent(false);
  };

  return (
    <S.popupOverlay>
      <S.popupcontainer>
        {isUpload ? (
          <UploadPopup />
        ) : (
          <>
            <S.btnWrapper onClick={closePopup}>
              <CloseIcon />
            </S.btnWrapper>
            <S.tapContainer>
              <S.tapWrapper onClick={newContentCreating}>
                <S.iconWrapper>
                  <PostAddIcon sx={styleIcon} />
                </S.iconWrapper>
                <S.tapTextWrapper>
                  <S.tapName>문항 신규 제작</S.tapName>
                </S.tapTextWrapper>
              </S.tapWrapper>
              <S.tapWrapper onClick={newUploadFile}>
                <S.iconWrapper>
                  <UploadFileIcon sx={styleIcon} />
                </S.iconWrapper>
                <S.tapTextWrapper>
                  <S.tapName>문항 파일 등록</S.tapName>
                  <S.tapDiscription>(촬영, 이미지, PDF 등)</S.tapDiscription>
                </S.tapTextWrapper>
              </S.tapWrapper>
              <S.tapWrapper onClick={newUploadBigFile}>
                <S.iconWrapper>
                  <DriveFolderUploadIcon sx={styleIcon} />
                </S.iconWrapper>
                <S.tapTextWrapper>
                  <S.tapName>대량 문항 등록</S.tapName>
                  <S.tapDiscription>(hwp, hml, xml)</S.tapDiscription>
                </S.tapTextWrapper>
              </S.tapWrapper>
            </S.tapContainer>
          </>
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
  btnWrapper: styled.div`
    margin: 40px 30px;
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
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

export default MainPopup;
