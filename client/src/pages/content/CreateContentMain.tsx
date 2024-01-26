import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

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
  const [didMount, setDidMount] = useState<boolean>(false);
  const [isHide, setIsHide] = useState<boolean>(false);

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

  //iframe 데이터 통신시
  const receiveMessage = (event: any) => {
    // 불필요한 react-devtools 메세지 이벤트 차단
    if (/^react-devtools/gi.test(event.data.source)) {
      return;
    }
    const { type } = event.data;
    // if (type === 'BOOL')
  };

  // 부모 로컬스토리지에서 데이터 가져오기
  const getLocalData = useCallback(() => {
    const data = localStorage.getItem('sendData');
    let sendData;
    if (data) sendData = JSON.parse(data);

    console.log('데이터 조회', sendData);
    if (sendData !== undefined) {
      setIsHide(true);
      setTabState(sendData.data);

      // 로컬스토리지 값 다받은 뒤 초기화
      window.opener.localStorage.clear();
    }
  }, [tabState]);

  useEffect(() => {
    if (didMount) {
      // navigate 이동하며 전달된 데이터 받기
      if (location?.state?.isUploadFile !== undefined) {
        setTabState(location.state.isUploadFile);
      } else {
        setTabState(false);
      }

      // 윈도우 열릴때 부모윈도우 스토리지 접근
      getLocalData();

      // iframe 데이터 통신 데이터 받기
      // window.addEventListener('message', receiveMessage, false);
      // return () => {
      //   window.removeEventListener('message', receiveMessage);
      // };
    }
  }, [didMount]);

  useEffect(() => {
    setDidMount(true);
  }, []);

  // useEffect(() => {
  //   if (didMount) {
  //     loadData();
  //   }
  // }, [didMount]);

  return (
    <Container>
      <ButtonWrapper>
        <IconWrapper className={isHide ? 'hide' : ''}>
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
  &.hide {
    display: none;
  }
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
