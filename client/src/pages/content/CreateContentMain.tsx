import * as React from 'react';
import { useEffect, useState } from 'react';

import { IoIosArrowBack, IoMdClose } from 'react-icons/io';
// import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { TabMenu } from '../../components';
import { COLOR } from '../../components/constants/COLOR';
import {
  ContentCreating,
  Classification,
  Labeling,
  FileUploading,
} from '../../components/contents/createcontent';

export function CreateContentMain() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [tabState, setTabState] = useState<boolean>(false);

  const goBack = () => {
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

  useEffect(() => {
    if (location?.state?.isUploadFile !== undefined) {
      setTabState(location.state.isUploadFile);
    } else {
      setTabState(false);
    }
    // console.log('location', location?.state?.isUploadFile);

    window.addEventListener('message', (event) => {
      const { sendData } = event.data;
      console.log('sendData000', event.data);
      setData(sendData);
    });
  }, []);
  console.log(data);

  return (
    <Container>
      <ButtonWrapper>
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
      </ButtonWrapper>
      {tabVeiw === 'DT & Editing' && (
        <ContentBox>
          {!tabState ? <ContentCreating /> : <FileUploading />}
        </ContentBox>
      )}
      {tabVeiw === '문항 분류' && (
        <ContentBox>
          <Classification />
        </ContentBox>
      )}
      {tabVeiw === '개체 라벨링' && (
        <ContentBox>
          <Labeling />
        </ContentBox>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -40px;
`;
const ButtonWrapper = styled.div`
  padding: 10px 20px;
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 15px;
`;
const TapMenuWrapper = styled.div`
  display: flex;
  flex: 1 0 0;
  margin-left: 40px;
`;
const CloseButtonWrapper = styled.div`
  display: flex;
`;
const ContentBox = styled.div`
  width: 100%;
  padding: 0 20px;
  min-height: 700px;
  border-top: 1px solid ${COLOR.BORDER_BLUE};
`;
