import * as React from 'react';
import { useEffect, useState } from 'react';

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { getLogout } from '../api/auth';
import { notificationServiceInstance } from '../api/axios';
import { openNaviationBoolAtom, pageIndexAtom } from '../store/utilAtom';
import { getAuthorityCookie, removeAuthorityCookie } from '../utils/cookies';
import { postRefreshToken } from '../utils/tokenHandler';

import { IndexInfo, Button, openToastifyAlert, ValueNone } from './atom';
import { COLOR } from './constants';

export function Header() {
  const queryClient = useQueryClient();
  const [isOpenNavigation, setIsOpenNavigation] = useRecoilState(
    openNaviationBoolAtom,
  );
  const [isLogin, setIsLogin] = useState(true);
  const [isAlert, setIsAlert] = useState(false);

  const [pageIndexValue, setPageIndexValue] = useRecoilState(pageIndexAtom);

  const navigate = useNavigate();

  const openNavigation = () => {
    setIsOpenNavigation(!isOpenNavigation); // TODO : 아이콘 배경 변경
  };

  //그룹 화면설정 정보 불러오기 api
  const getNotification = async () => {
    const res = await notificationServiceInstance.get(`/v1/noti`);
    return res;
  };
  const {
    data: notificationData,
    isLoading: isNotificationLoading,
    refetch: notificationRefetch,
  } = useQuery({
    queryKey: ['get-notification'],
    queryFn: getNotification,
    meta: {
      errorMessage: 'get-notification 에러 메세지',
    },
  });

  useEffect(() => {
    if (isAlert) notificationRefetch();
  }, [isAlert]);

  //서버로부터 받아온 시간을 현재 시간 기준으로 변환해주는 함수
  const formatRelativeTime = (createdAt: string) => {
    const now = new Date(); // 현재 시간
    const createdTime = new Date(createdAt); // `noti.createdAt`를 Date 객체로 변환
    const diffInSeconds = Math.floor(
      (now.getTime() - createdTime.getTime()) / 1000,
    ); // 시간 차이를 초 단위로 계산

    if (diffInSeconds < 60) {
      return `${diffInSeconds}초 전`;
    } else if (diffInSeconds < 3600) {
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      return `${diffInMinutes}분 전`;
    } else if (diffInSeconds < 86400) {
      const diffInHours = Math.floor(diffInSeconds / 3600);
      return `${diffInHours}시간 전`;
    } else {
      const diffInDays = Math.floor(diffInSeconds / 86400);
      return `${diffInDays}일 전`;
    }
  };

  //알람 개별 확인 api
  const updateAllNoti = async () => {
    return await notificationServiceInstance.put(`/v1/noti`);
  };
  const { mutate: updateAllNotiData } = useMutation({
    mutationFn: updateAllNoti,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: '잠시후 다시 시도해주세요',
      });
      if (context.response.data.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response) => {
      //완료 알람
      openToastifyAlert({
        type: 'success',
        text: response.data.message,
      });
      //그룹 리스트 재호출
      notificationRefetch();
    },
  });

  //알람 개별 확인 api
  const updateNoti = async (idx: string) => {
    return await notificationServiceInstance.put(`/v1/noti/read/${idx}`);
  };
  const { mutate: updateNotiData } = useMutation({
    mutationFn: updateNoti,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: '잠시후 다시 시도해주세요',
      });
      if (context.response.data.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response) => {
      //완료 알람
      openToastifyAlert({
        type: 'success',
        text: response.data.message,
      });
      //그룹 리스트 재호출
      notificationRefetch();
    },
  });

  // 사이드메뉴 로그아웃 시
  const onLogout = () => {
    setIsLogin(false);
  };

  const { isSuccess } = useQuery({
    queryKey: ['get-logout'],
    queryFn: getLogout,
    meta: {
      errorMessage: 'get-logout 에러 메세지',
    },
    enabled: !isLogin,
  });

  const openAlert = () => {
    setIsAlert(!isAlert);
  };

  useEffect(() => {
    //로그아웃시 초기화
    if (isSuccess) {
      navigate('/login');
      queryClient.getQueryCache().clear;
      removeAuthorityCookie('accessToken', {
        path: '/',
        sameSite: 'strict',
        secure: false,
      });
      removeAuthorityCookie('refreshToken', {
        path: '/',
        sameSite: 'strict',
        secure: false,
      });
      removeAuthorityCookie('sessionId', {
        path: '/',
        sameSite: 'strict',
        secure: false,
      });
      removeAuthorityCookie('companyCode', {
        path: '/',
        sameSite: 'strict',
        secure: false,
      });
    }
  }, [isSuccess]);

  return (
    <>
      <Container $isOpenNavigation={isOpenNavigation}>
        <Wrapper>
          <IconWrapper onClick={openNavigation}>
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25 6.61111L25 24.3889L12.7778 24.3889L12.7778 22.1667L22.7778 22.1667L22.7778 8.83333L12.7778 8.83333L12.7778 6.61111L25 6.61111ZM5 25.5L5 5.5L11.6667 5.5L11.6667 25.5L5 25.5ZM7.22222 23.2778L9.44444 23.2778L9.44444 7.72222L7.22222 7.72222M20.5556 17.1667L17.2222 17.1667L17.2222 19.9444L12.7778 15.5L17.2222 11.0556L17.2222 13.8333L20.5556 13.8333"
                fill="#252525"
              />
            </svg>
          </IconWrapper>
          <IndexInfo list={pageIndexValue} />
        </Wrapper>

        {/* 사이드메뉴 */}
        <SideMenuWrapper>
          <button onClick={openAlert}>알림</button>
          <Link
            to="/preparing"
            onClick={() => setPageIndexValue(['가이드', ''])}
          >
            가이드
          </Link>
          <Link
            to="/preparing"
            onClick={() => setPageIndexValue(['고객센터', ''])}
          >
            고객센터
          </Link>
          <Link
            to="/mypage"
            onClick={() => setPageIndexValue(['마이페이지', ''])}
          >
            마이페이지
          </Link>
          <button onClick={() => onLogout()}>로그아웃</button>
        </SideMenuWrapper>
      </Container>
      {isAlert && (
        <AlertWrapper>
          <AlertHead>
            <AlertCount>
              총 {notificationData?.data.data.notiSimpleRecordList.length}건
            </AlertCount>
            <Button
              height={'20px'}
              width={'80px'}
              onClick={() => updateAllNotiData()}
              fontSize="12px"
              $normal
              cursor
              disabled={
                notificationData?.data.data.notiSimpleRecordList.length === 0
              }
            >
              전체삭제
            </Button>
          </AlertHead>
          <AlertList>
            {notificationData &&
            notificationData?.data.data.notiSimpleRecordList.length > 0 ? (
              <>
                {notificationData?.data.data.notiSimpleRecordList.map(
                  (noti: {
                    idx: number;
                    content: string;
                    createdAt: string;
                  }) => {
                    //역슬래시를 기준으로 타이틀과 내용 분리
                    const [notiTitle, notiContext] = noti.content.split('\n');
                    return (
                      <AlertCard key={noti.idx}>
                        <CardTitleWrapper>
                          <CardTitle>{notiTitle}</CardTitle>
                          <CardDeleteButton
                            onClick={() => updateNotiData(noti.idx.toString())}
                          >
                            X
                          </CardDeleteButton>
                        </CardTitleWrapper>
                        <CardContext>{notiContext}</CardContext>
                        <CardTime>
                          {formatRelativeTime(noti.createdAt)}
                        </CardTime>
                      </AlertCard>
                    );
                  },
                )}
              </>
            ) : (
              <>
                <ValueNone textOnly info="알람이 없습니다." />
              </>
            )}
          </AlertList>
        </AlertWrapper>
      )}
    </>
  );
}

const Container = styled.div<{ $isOpenNavigation: boolean }>`
  position: fixed;
  top: 0;
  ${(props) =>
    props.$isOpenNavigation
      ? 'width: calc(100% - 250px);'
      : 'width: calc(100% - 60px);'}
  display: flex;
  justify-content: flex-end;
  height: 40px;
  padding: 0 20px;
  z-index: 1;
  background-color: white;
  border-bottom: 1px solid ${COLOR.BORDER_GRAY};
`;
const Wrapper = styled.div`
  display: flex;
  flex: 1 0 0;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: 20px;
  cursor: pointer;
`;

const SideMenuWrapper = styled.div`
  display: flex;

  a,
  button {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    color: ${COLOR.FONT_BLACK};
    padding: 5px 10px;
    text-decoration: none;
    position: relative;
    border: none;
    background-color: #fff;
    cursor: pointer;

    &::after {
      content: '';
      display: block;
      position: absolute;
      right: 0px;
      width: 1px;
      height: 10px;
      background-color: ${COLOR.SECONDARY};
    }
    &:last-child {
      &::after {
        display: none;
      }
    }
  }
`;
const AlertWrapper = styled.div`
  width: 300px;
  height: 350px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  right: 65px;
  border: 1px solid ${COLOR.BORDER_GRAY};
  border-radius: 10px;
  background-color: white;
  z-index: 999;
`;
const AlertHead = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 10px;
`;
const AlertCount = styled.p`
  font-size: 14px;
  color: ${COLOR.FONT_GRAY};
`;
const AlertList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 10px;
  max-height: 290px;
  overflow-y: auto;
`;
const AlertCard = styled.div`
  border: 1px solid ${COLOR.BORDER_GRAY};
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;
const CardTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;
const CardTitle = styled.p`
  font-size: 12px;
  font-weight: bold;
`;
const CardDeleteButton = styled.div`
  font-size: 12px;
  color: ${COLOR.FONT_GRAY};
  cursor: pointer;
`;
const CardContext = styled.p`
  width: 200px;
  font-size: 12px;
  color: ${COLOR.FONT_GRAY};
  padding-top: 10px;
  font-weight: bold;
`;
const CardTime = styled.p`
  width: 100%;
  font-size: 12px;
  color: ${COLOR.FONT_GRAY};
  display: flex;
  justify-content: flex-end;
`;
