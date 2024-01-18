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
            <Outlet />
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
