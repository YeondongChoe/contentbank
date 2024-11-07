import * as React from 'react';
import { useEffect, useState } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { getLogout } from '../api/auth';
import { openNaviationBoolAtom, pageIndexAtom } from '../store/utilAtom';
import { getAuthorityCookie, removeAuthorityCookie } from '../utils/cookies';

import { IndexInfo, Button } from './atom';
import { COLOR } from './constants';

export function Header() {
  const queryClient = useQueryClient();
  const [isOpenNavigation, setIsOpenNavigation] = useRecoilState(
    openNaviationBoolAtom,
  );
  const [isLogin, setIsLogin] = useState(true);
  const [isAlert, setIsAlert] = useState(false);

  const pageIndexValue = useRecoilValue(pageIndexAtom);

  const navigate = useNavigate();

  const openNavigation = () => {
    setIsOpenNavigation(!isOpenNavigation); // TODO : 아이콘 배경 변경
  };

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
          <Link to="/preparing">가이드</Link>
          <Link to="/preparing">고객센터</Link>
          <Link to="/mypage">마이페이지</Link>
          <button onClick={() => onLogout()}>로그아웃</button>
        </SideMenuWrapper>
      </Container>
      {isAlert && (
        <AlertWrapper>
          <AlertHead>
            <AlertCount>총 3건</AlertCount>
            <Button
              height={'20px'}
              width={'80px'}
              //onClick={() => updateMenuInfoData()}
              fontSize="12px"
              $normal
              cursor
            >
              전체삭제
            </Button>
          </AlertHead>
          {/* 데이터 들어왔을때 map 돌리기 */}
          <AlertList>
            <AlertCard>
              <CardTitleWrapper>
                <CardTitle>
                  홍길동(admin)님이 프로세스 생성을 요청하셨습니다.
                </CardTitle>
                <CardDeleteButton>X</CardDeleteButton>
              </CardTitleWrapper>
              <CardContext>
                영어컨텐츠 제작했는데 검수가 필요합니다.
              </CardContext>
              <CardTime>1분 전</CardTime>
            </AlertCard>
            <AlertCard>
              <CardTitleWrapper>
                <CardTitle>
                  홍길동(admin)님이 프로세스 생성을 요청하셨습니다.
                </CardTitle>
                <CardDeleteButton>X</CardDeleteButton>
              </CardTitleWrapper>
              <CardContext>
                영어컨텐츠 제작했는데 검수가 필요합니다.
              </CardContext>
              <CardTime>1분 전</CardTime>
            </AlertCard>
            <AlertCard>
              <CardTitleWrapper>
                <CardTitle>
                  홍길동(admin)님이 프로세스 생성을 요청하셨습니다.
                </CardTitle>
                <CardDeleteButton>X</CardDeleteButton>
              </CardTitleWrapper>
              <CardContext>
                영어컨텐츠 제작했는데 검수가 필요합니다.
              </CardContext>
              <CardTime>1분 전</CardTime>
            </AlertCard>
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
