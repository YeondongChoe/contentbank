import * as React from 'react';
import { useEffect } from 'react';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { getAuthorityCookie } from './utils/cookies';
export function App() {
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    // 토큰이 없을시 로그인페이지로 이동 임시
    if (!getAuthorityCookie('accessToken')) {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <RecoilRoot>
        <Container>
          {getAuthorityCookie('accessToken') &&
            location.pathname !== '/login' &&
            location.pathname !== '/firstlogin' &&
            location.pathname !== '/relogin' && <Navigation />}
          <MainWrapper>
            {getAuthorityCookie('accessToken') &&
              location.pathname !== '/login' &&
              location.pathname !== '/firstlogin' &&
              location.pathname !== '/relogin' && <Header />}
            <BodyWrapper>
              <Outlet />
            </BodyWrapper>
          </MainWrapper>
        </Container>
      </RecoilRoot>
    </>
  );
}
const Container = styled.div`
  display: flex;
  height: 100vh;
`;
const MainWrapper = styled.div`
  width: 100%;
`;
const BodyWrapper = styled.div`
  padding-top: 40px;
  height: 100%;
`;
