import React from 'react';
import styled from 'styled-components';
import {
  createContentPopupBoolAtom,
  uploadBoolAtom,
  creatingNewContentBoolAtom,
  uploadFileBoolAtom,
} from '../../recoil/creatingContentAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { CreateMainPopup } from './CreateMainPopup';

import CloseIcon from '@mui/icons-material/Close';
import PostAddIcon from '@mui/icons-material/PostAdd';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

const styleIcon = {
  width: '150px',
  height: '150px',
};

const CreateIconPopup = () => {
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
    <S.popupOverlay>
      <S.popupcontainer>
        {isUpload ? (
          <CreateMainPopup />
        ) : (
          <>
            <S.btnWrapper>
              <CloseIcon onClick={closePopup} sx={{ cursor: 'pointer' }} />
            </S.btnWrapper>
            <S.tapContainer>
              <S.tapWrapper onClick={moveContentCreating}>
                <S.iconWrapper>
                  <PostAddIcon sx={styleIcon} />
                </S.iconWrapper>
                <S.tapTextWrapper>
                  <S.tapName>문항 신규 제작</S.tapName>
                </S.tapTextWrapper>
              </S.tapWrapper>
              <S.tapWrapper onClick={moveFileUploading}>
                <S.iconWrapper>
                  <UploadFileIcon sx={styleIcon} />
                </S.iconWrapper>
                <S.tapTextWrapper>
                  <S.tapName>문항 파일 등록</S.tapName>
                  <S.tapDiscription>(촬영, 이미지, PDF 등)</S.tapDiscription>
                </S.tapTextWrapper>
              </S.tapWrapper>
              <S.tapWrapper onClick={moveBigFileUploading}>
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

export { CreateIconPopup };
