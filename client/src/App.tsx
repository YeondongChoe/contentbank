import * as React from 'react';
import { useEffect } from 'react';

import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { tokenInstance } from './api/axios';
import { ToastifyAlert, openToastifyAlert } from './components';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { useModal } from './hooks';
import {
  getAuthorityCookie,
  removeAuthorityCookie,
  setAuthorityCookie,
} from './utils/cookies';

export function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  //전역 쿼리캐싱
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // 전역 쿼리 공통설정
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        retry: (
          failureCount: number,
          error: { response: { data: { code: string } } },
        ) => {
          console.log(
            `failureCount: ${failureCount} ${error.response.data.code}`,
          );
          // 토큰만료시 리프레쉬요청 후 재요청
          if (error.response.data.code == 'GE-002') {
            return postRefreshToken();
          }

          if (error.toString().includes('50')) {
            return true; //50...으로 시작한 에러일시 재요청(failureCount 최대4)
          }
          return false;
        }, // 실패시 재요청(기본3번): bool | number | (failureCount, error) => {}
      },
      onError: (context: {
        response: { data: { message: string; code: string } };
      }) => {
        openToastifyAlert({
          type: 'error',
          text: context.response.data.message,
        });
      },
    },
    queryCache: new QueryCache({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onError: (
        context: { response: { data: { code: string; message: string } } },
        query: { meta: { errorMessage: unknown } },
      ) => {
        // useQuery get 데이터 통신 후
        // 에러후 에러값이 있을시 토스트알럿에 표시
        if (query.meta && query.meta.errorMessage) {
          openToastifyAlert({
            type: 'error',
            text: `${query.meta.errorMessage}: ${context}`,
          });
          console.log(`${query.meta.errorMessage}: ${context}`);
        }
      },
      onSuccess: (data: unknown, query: unknown) => {},
    }),
  });

  //리프레쉬 토큰 요청 api
  const postRefreshToken = async () => {
    const refreshTokenData = await tokenInstance
      .post(`/v1/auth/refresh-token`)
      .then((res) => {
        // console.log('refreshTokenData ', res);
        if (res.data.code === 'S-001') {
          setAuthorityCookie('accessToken', res.data.data.accessToken, {
            path: '/',
            sameSite: 'strict',
            secure: false,
          });
          return 1;
        }
      })
      .catch((error) => {
        console.log('refreshTokenData error', error);
        if (
          error.response.data.code == 'GE-002'
          //|| error.response.data.code == 'E-006'
        ) {
          // 리프레쉬 토큰 기간 만료시
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
          openToastifyAlert({
            type: 'error',
            text: `로그인 기간이 만료되었습니다. 재로그인 해주세요.`,
          });
          navigate('/login');
          return 0;
        }
      });
    console.log('refreshTokenData ', refreshTokenData);
  };
  useEffect(() => {
    // 토큰이 없을시 로그인페이지로 이동 임시
    if (
      !getAuthorityCookie('accessToken') ||
      !getAuthorityCookie('sessionId')
    ) {
      navigate('/login');
    }
  }, [getAuthorityCookie('accessToken'), getAuthorityCookie('sessionId')]);
  useEffect(() => {
    // 전역 초기화
    if (location.pathname === '/login') closeModal();
  }, [location]);

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        {getAuthorityCookie('accessToken') &&
          location.pathname !== '/login' &&
          location.pathname !== '/init-change-password' &&
          location.pathname !== '/relogin' &&
          location.pathname !== '/createcontentmain' &&
          location.pathname !== '/managementEditMain' &&
          location.pathname !== '/content-create/exam/step1' &&
          location.pathname !== '/content-create/exam/step2' &&
          location.pathname !== '/content-create/exam/step3' && <Navigation />}
        <MainWrapper>
          {getAuthorityCookie('accessToken') &&
            location.pathname !== '/login' &&
            location.pathname !== '/init-change-password' &&
            location.pathname !== '/relogin' &&
            location.pathname !== '/createcontentmain' &&
            location.pathname !== '/managementEditMain' &&
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
  );
}
const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;
const MainWrapper = styled.div`
  width: 100%;
`;
const BodyWrapper = styled.div`
  padding-top: 40px;
  height: 100%;
`;
