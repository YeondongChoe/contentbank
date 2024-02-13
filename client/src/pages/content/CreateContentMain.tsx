import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { IoIosArrowBack, IoMdClose } from 'react-icons/io';
// import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { TabMenu } from '../../components';
import { COLOR } from '../../components/constants/COLOR';
import {
  Classification,
  ContentCreating,
  FileUploading,
  Labeling,
} from '../../components/contents/createcontent';

export function CreateContentMain() {
  const location = useLocation();
  const navigate = useNavigate();
  const [didMount, setDidMount] = useState<boolean>(false);
  // const [isHide, setIsHide] = useState<boolean>(false);

  const [isUploadFile, setIsUploadFile] = useState<string>('createcontent');

  const menuList = [
    {
      label: 'DT & Editing',
      value: 'DT & Editing',
    },
    {
      label: '문항 분류',
      value: '문항 분류',
    },
    // {
    //   label: '개체 라벨링',
    //   value: '개체 라벨링',
    // },
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
  const getLocalData = () => {
    const data = localStorage.getItem('sendData');
    let sendData;
    if (data) sendData = JSON.parse(data);

    console.log('데이터 조회', sendData && sendData.data);
    if (sendData === undefined) setIsUploadFile('createcontent');
    if (sendData.data === 'createcontent') setIsUploadFile(sendData.data);
    if (sendData.data === 'uploadfile') setIsUploadFile(sendData.data);

    // 로컬스토리지 값 다받은 뒤 초기화
    window.opener.localStorage.clear();
  };

  useEffect(() => {
    console.log(isUploadFile);
  }, [isUploadFile]);

  useEffect(() => {
    if (didMount) {
      // navigate 이동하며 전달된 데이터 받기
      // if (location?.state?.isUploadFile !== undefined) {
      //   setIsUploadFile(location.state.isUploadFile);
      // } else {
      //   setIsUploadFile(false);
      // }
      // 윈도우 열릴때 부모윈도우 스토리지 접근
      getLocalData();
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
        <TapMenuWrapper>
          <TabMenu
            length={3}
            menu={menuList}
            selected={tabVeiw}
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
          {isUploadFile && isUploadFile === 'createcontent' ? (
            <ContentCreating />
          ) : (
            <FileUploading />
          )}
        </ContentBox>
      )}
      {tabVeiw === '문항 분류' && (
        <ContentBox>
          <Classification />
        </ContentBox>
      )}
      {/* {tabVeiw === '개체 라벨링' && (
        <ContentBox>
          <Labeling />
        </ContentBox>
      )} */}
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
