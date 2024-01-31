import * as React from 'react';
import { useEffect } from 'react';

import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { ToastifyAlert } from './components';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { getAuthorityCookie } from './utils/cookies';

export function App() {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (query.meta && query.meta.errorMessage) {
          // toast.error(query.meta.errorMessage);
          console.log(`${query.meta.errorMessage}: ${error}`);
        }
      },
      onSuccess: (data, query) => {
        console.log(`onSuccess: ${data}`);
      },
    }),
  });
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
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Container>
            {getAuthorityCookie('accessToken') &&
              location.pathname !== '/login' &&
              location.pathname !== '/firstlogin' &&
              location.pathname !== '/relogin' &&
              location.pathname !== '/createcontentwindow' &&
              location.pathname !== '/createcontentmain' && <Navigation />}
            <MainWrapper>
              {getAuthorityCookie('accessToken') &&
                location.pathname !== '/login' &&
                location.pathname !== '/firstlogin' &&
                location.pathname !== '/relogin' &&
                location.pathname !== '/createcontentwindow' &&
                location.pathname !== '/createcontentmain' && <Header />}
              <BodyWrapper>
                <ToastifyAlert />
                <Outlet />
              </BodyWrapper>
            </MainWrapper>
          </Container>
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
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
