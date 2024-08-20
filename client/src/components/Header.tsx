import * as React from 'react';
import { useEffect, useState } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { getLogout } from '../api/auth';
import { openNaviationBoolAtom, pageIndexAtom } from '../store/utilAtom';
import { getAuthorityCookie, removeAuthorityCookie } from '../utils/cookies';

import { IndexInfo } from './atom';
import { COLOR } from './constants';

export function Header() {
  const queryClient = useQueryClient();
  const [isOpenNavigation, setIsOpenNavigation] = useRecoilState(
    openNaviationBoolAtom,
  );
  const [isLogin, setIsLogin] = useState(true);
  const pageIndexValue = useRecoilValue(pageIndexAtom);

  const navigate = useNavigate();

  const openNavigation = () => {
    // setIsOpenNavigation(!isOpenNavigation); // TODO : 아이콘 배경 변경
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
        <Link to="/preparing">가이드</Link>
        <Link to="/preparing">고객센터</Link>
        <Link to="/mypage">마이페이지</Link>
        <button onClick={() => onLogout()}>로그아웃</button>
      </SideMenuWrapper>
    </Container>
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
  /* cursor: pointer; */
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
