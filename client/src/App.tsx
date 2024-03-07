import * as React from 'react';
import { useEffect } from 'react';

import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { ToastifyAlert, openToastifyAlert } from './components';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { accessTokenAtom } from './store/auth/accessToken';
import { getAuthorityCookie, setAuthorityCookie } from './utils/cookies';

export function App() {
  const isAccessTokenAtom = useRecoilValue(accessTokenAtom);
  const location = useLocation();
  const navigate = useNavigate();

  //전역 쿼리캐싱
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // 전역 쿼리 공통설정
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        retry: (failureCount: number, error: Error) => {
          console.log(`failureCount: ${failureCount} ${error}`);
          if (error.toString().includes('40')) {
            return false; // 40...으로 시작한 에러일시 재요청x
          }
          if (error.toString().includes('50')) {
            return true; //50...으로 시작한 에러일시 재요청o(failureCount 최대4)
          }
        }, // 실패시 재요청(기본3번): bool | number | (failureCount, error) => {}
        /* 설정은 각 페이지 useQuery에서도 각기 셋팅가능 */
        // refetchInterval: 1000, 1초마다 데이터 refetch
        // refetchOnWindowFocus: false, 브라우져 화면 포커스시 리랜더링 여부 (기본 true)
        // staleTime: 50000,//데이터 유통기한 - refetch 기준
        // gcTime: 50000 // 가비지 컬렉션 시간셋팅
      },
    },
    queryCache: new QueryCache({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onError: (error: Error, query: { meta: { errorMessage: unknown } }) => {
        // console.log(error.toString());
        // 40...에러시 로그인 페이지로
        if (error.toString().includes('40')) {
          navigate('/login');
        }

        // 에러후 에러값이 있을시 토스트알럿에 표시
        if (query.meta && query.meta.errorMessage) {
          openToastifyAlert({
            type: 'error',
            text: `${query.meta.errorMessage}: ${error}`,
          });
          console.log(`${query.meta.errorMessage}: ${error}`);
        }
      },
      onSuccess: (data: unknown, query: unknown) => {
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
  }, [getAuthorityCookie('accessToken'), isAccessTokenAtom]);

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
