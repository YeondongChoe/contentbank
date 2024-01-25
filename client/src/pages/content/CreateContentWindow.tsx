import * as React from 'react';
import { useEffect, useState } from 'react';

import { IoMdClose } from 'react-icons/io';
import { MdDriveFolderUpload, MdOutlinePostAdd } from 'react-icons/md';
import { TbFileUpload } from 'react-icons/tb';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { COLOR } from '../../components/constants';

const styleIcon = {
  width: '10rem',
  height: '10rem',
};

export function CreateContentWindow() {
  const location = useLocation();
  const navigate = useNavigate();

  const closePopup = () => {
    // setIsCreate(false);
  };

  const goToPage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.currentTarget.value;
    let isUploadFile;
    if (target === 'uploadfile') {
      isUploadFile = true;
    }
    if (target === 'createcontent') {
      isUploadFile = false;
    }

    // console.log('isUploadFile0000', isUploadFile);
    navigate('/createcontentmain', {
      state: { isUploadFile: isUploadFile },
    });
  };

  return (
    <Container>
      <Title>문항 업로드</Title>
      <MenuListWrapper>
        <MenuWrapper
          onClick={(e) => {
            goToPage(e);
          }}
          value="createcontent"
        >
          <IconWrapper>
            <MdOutlinePostAdd style={styleIcon} />
          </IconWrapper>
          <TextWrapper>
            <MenuName>문항 신규 제작</MenuName>
          </TextWrapper>
        </MenuWrapper>
        <MenuWrapper
          onClick={(e) => {
            goToPage(e);
          }}
          value="uploadfile"
        >
          <IconWrapper>
            <TbFileUpload style={styleIcon} />
          </IconWrapper>
          <TextWrapper>
            <MenuName>문항 파일 등록</MenuName>
            <MenuDiscription>(촬영, 이미지, PDF 등)</MenuDiscription>
          </TextWrapper>
        </MenuWrapper>
        <MenuWrapper
          onClick={(e) => {
            goToPage(e);
          }}
          value="uploadfile"
        >
          <IconWrapper>
            <MdDriveFolderUpload style={styleIcon} />
          </IconWrapper>
          <TextWrapper>
            <MenuName>대량 문항 등록</MenuName>
            <MenuDiscription>(hwp, hml, xml)</MenuDiscription>
          </TextWrapper>
        </MenuWrapper>
      </MenuListWrapper>
    </Container>
  );
}

const Container = styled.div``;
const Title = styled.strong`
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 2em;
  font-weight: bold;
  color: ${COLOR.FONT_BLACK};
  padding-top: 1em;
`;
const MenuListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3em;
  padding-top: 5em;
  gap: 3em;
`;
const MenuWrapper = styled.button`
  background-color: #fff;
  padding: 2em;
  width: 22em;
  max-width: 250px;
  height: 22em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #adadad;
  border-radius: 10px;
  cursor: pointer;
`;
const IconWrapper = styled.span`
  padding: 10px 0;
`;
const TextWrapper = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MenuName = styled.strong`
  font-size: 20px;
  font-weight: 500;
`;
const MenuDiscription = styled.p`
  font-size: 15px;
`;
