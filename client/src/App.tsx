import * as React from 'react';

import { Outlet, useLocation } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Login } from './pages/members/Login';
import { previewWorksheetBoolAtom } from './store/creatingWorksheetAtom';
import { getAuthorityCookie } from './utils/cookies';

export function App() {
  const location = useLocation();
  //const pring = useRecoilValue(previewWorksheetBoolAtom);

  return (
    <>
      <RecoilRoot>
        <Container>
          {location.pathname !== '/login' &&
            location.pathname !== '/firstlogin' &&
            location.pathname !== '/relogin' && <Navigation />}
          <MainWrapper>
            {location.pathname !== '/login' &&
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
  position: relative;
`;
const MainWrapper = styled.div`
  width: 100%;
  position: relative;
`;
const BodyWrapper = styled.div`
  padding-top: 40px; /* 헤더의 높이에 맞게 조절하세요 */
  height: 100%; /* 부모(Container)의 높이를 100%로 채우도록 설정 */
  overflow-y: auto; /* 스크롤이 필요한 경우만 스크롤이 보이도록 설정 */
`;
