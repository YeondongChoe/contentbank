import * as React from 'react';
import { useEffect } from 'react';

import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
  useQueryClient,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { authInstance, handleAuthorizationRenewal } from './api/axios';
import { ToastifyAlert, openToastifyAlert } from './components';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { accessTokenAtom } from './store/auth/accessToken';
import { getAuthorityCookie, setAuthorityCookie } from './utils/cookies';

export function App() {
  // const setAccessReTokenAtom = useSetRecoilState(accessTokenAtom);
  const isAccessTokenAtom = useRecoilValue(accessTokenAtom);
  const location = useLocation();
  const navigate = useNavigate();

  //전역 쿼리캐싱
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error, query) => {
        // console.log(error);

        // 토큰 만료시 토큰 갱신
        // TODO: code 변경시 적용
        if (error.message.includes('40')) {
          const code = 'e-006';
          handleAuthorizationRenewal(code);
        }

        if (query.meta && query.meta.errorMessage) {
          openToastifyAlert({
            type: 'error',
            text: `${query.meta.errorMessage}: ${error}`,
          });
          console.log(`${query.meta.errorMessage}: ${error}`);
        }
      },
      onSuccess: (data, query) => {
        // query.fetch();
        //
        //데이터 성공시
        console.log(`onSuccess: ${data} ${query}`);
        if (data) {
          // query.reset();
        }
      },
    }),
  });

  useEffect(() => {
    // 토큰이 없을시 로그인페이지로 이동 임시
    if (!getAuthorityCookie('accessToken')) navigate('/login');
  }, [getAuthorityCookie('accessToken')]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Container>
          {getAuthorityCookie('accessToken') &&
            location.pathname !== '/login' &&
            location.pathname !== '/init-change-password' &&
            location.pathname !== '/relogin' &&
            location.pathname !== '/createcontentmain' &&
            location.pathname !== '/content-create/exam/step1' &&
            location.pathname !== '/content-create/exam/step2' &&
            location.pathname !== '/content-create/exam/step3' && (
              <Navigation />
            )}
          <MainWrapper>
            {getAuthorityCookie('accessToken') &&
              location.pathname !== '/login' &&
              location.pathname !== '/init-change-password' &&
              location.pathname !== '/relogin' &&
              location.pathname !== '/createcontentmain' &&
              location.pathname !== '/content-create/exam/step1' &&
              location.pathname !== '/content-create/exam/step2' &&
              location.pathname !== '/content-create/exam/step3' && <Header />}
            <BodyWrapper>
              <ToastifyAlert />
              <Outlet />
            </BodyWrapper>
          </MainWrapper>
        </Container>

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
