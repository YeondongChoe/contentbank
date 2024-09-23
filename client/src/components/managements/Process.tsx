import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { AlertBar, Button, Loader } from '../atom';
import { TabMenu } from '../molecules';

export function Process() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  /* 안내 알럿 */
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const closeSuccessAlert = () => {
    setIsSuccessAlertOpen(false);
  };

  /*  모달 열기 */
  const openCreateModal = () => {
    // openModal({
    //   title: '',
    //   content: <RegisterModal memberList={totalMemberList} refetch={refetch} />,
    // });
  };

  // 탭메뉴 클릭시
  const changeTab = () => {};

  // 배경 클릭시 체크리스트 초기화
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target?.toString().includes('Div')) {
        console.log('background div');
      }
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [backgroundRef]);

  return (
    <Container ref={backgroundRef}>
      <AlertBar
        type="success"
        isAlertOpen={isSuccessAlertOpen}
        closeAlert={closeSuccessAlert}
        message={'아이디가 생성 되었습니다.'}
      ></AlertBar>
      <TitleWrapper>
        <Title>프로세스 관리</Title>
        <Button
          height={'35px'}
          width={'150px'}
          onClick={openCreateModal}
          fontSize="13px"
          $filled
          cursor
        >
          신규 프로세스 추가
        </Button>
      </TitleWrapper>

      {/* TODO : 데이터 연결후 로딩 처리 */}
      {/* {isLoading && (
        <LoaderWrapper>
          <Loader width="50px" />
        </LoaderWrapper>
      )} */}
      {/* {!isLoading && memberListData && ( */}
      <></>
      {/* )} */}
    </Container>
  );
}

const Container = styled.div`
  padding: 40px;
  width: 100%;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 800;
`;

const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 30px;
  padding-left: calc(50% - 35px);
`;
