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
  Labeling,
} from '../../components/contents/createcontent';

export function CreateContentMain() {
  const location = useLocation();
  const navigate = useNavigate();

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
    // console.log(isUploadFile);
  }, [isUploadFile]);

  //단원분류 입력 도중 해당 화면을 벗어나는 경우, '저장하지 않고 나가시겠습니까?' 얼럿
  useEffect(() => {
    if (tabVeiw == '문항 분류') {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        // 사용자에게 경고 메시지를 표시하도록 설정
        const message =
          '저장 버튼을 누르지 않을시 저장되지 않습니다. 정말 나가시겠습니까?';
        event.preventDefault();
        event.returnValue = message; // 표준에 따른 설정 (Chrome에서는 무시됨)
        return message; // 대부분의 브라우저에서 필요
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [tabVeiw]);

  // useEffect(() => {
  //   // 에디터 초기화 코드
  //   if (window.initEditor) {
  //     window.initEditor();
  //   }

  //   // Cleanup function
  //   return () => {
  //     if (window.destroyEditor) {
  //       window.destroyEditor();
  //     }
  //   };
  // }, []);

  return (
    <Container>
      <ButtonWrapper>
        <TapMenuWrapper>
          {tabVeiw === '문항 분류' && (
            <BackButtonWrapper>
              <IoIosArrowBack
                onClick={() => setTabVeiw('DT & Editing')}
                style={{
                  fontSize: '22px',
                  cursor: 'pointer',
                  marginTop: '10px',
                }}
              />
            </BackButtonWrapper>
          )}
          <TabMenu
            length={3}
            menu={menuList}
            selected={tabVeiw}
            width={'350px'}
            setTabVeiw={setTabVeiw}
          />
        </TapMenuWrapper>
      </ButtonWrapper>
      {tabVeiw === 'DT & Editing' && (
        <ContentBox>
          {isUploadFile && isUploadFile === 'createcontent' ? (
            <ContentCreating setTabVeiw={setTabVeiw} />
          ) : (
            // <FileUploading setTabVeiw={setTabVeiw} />
            // <FileUploading setTabVeiw={setTabVeiw} />
            <ContentCreating setTabVeiw={setTabVeiw} />
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
  position: relative;
`;
const ButtonWrapper = styled.div`
  padding: 10px 20px;
  position: sticky;
  top: 0;
  background-color: #fff;
  border-bottom: 1px solid ${COLOR.BORDER_BLUE};
  z-index: 5;
`;

const TapMenuWrapper = styled.div`
  display: flex;
  flex: 1 0 0;
`;
const BackButtonWrapper = styled.div`
  display: flex;
`;
const ContentBox = styled.div`
  width: 100%;
  padding: 0 20px;
  min-height: 700px;
`;
