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

import { tokenInstance } from './api/axios';
import { ToastifyAlert, openToastifyAlert } from './components';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { accessTokenAtom } from './store/auth/accessToken';
import {
  getAuthorityCookie,
  removeAuthorityCookie,
  setAuthorityCookie,
} from './utils/cookies';

export function App() {
  // const isAccessTokenAtom = useRecoilValue(accessTokenAtom);
  const location = useLocation();
  const navigate = useNavigate();

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
      onError: (
        context: { response: { data: { code: string; message: string } } },
        query: { meta: { errorMessage: unknown } },
      ) => {
        console.log(`QueryCache :`, context);
        // 잘못된 요청(유효하지않은 요청 GE-003, E-004) 일경우
        // 케이스에 따라 얼럿으로 안내(공통)
        // console.log(error.response);
        // if (context.response.data.code == 'GE-004') {
        // }
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
      onSuccess: (data: unknown, query: unknown) => {
        //데이터 성공시
        console.log(`onSuccess: ${data} ${query}`);
        if (data) {
          // query.reset();
        }
      },
    }),
  });

  //리프레쉬 토큰 요청 api
  const postRefreshToken = async () => {
    const refreshTokenData = await tokenInstance
      .post(`/v1/auth/refresh-token`)
      .then((res) => {
        console.log('refreshTokenData ', res);
        if (res.data.code === 'S-001') {
          setAuthorityCookie('accessToken', res.data.data.accessToken, {
            path: '/',
            sameSite: 'strict',
            secure: false,
          });
        }
        return 1;
      })
      .catch((error) => {
        console.log('refreshTokenData error', error);
        if (error.response.data.code == 'GE-002') {
          // 리프레쉬 토큰 기간 만료시
          navigate('/login');
          // 로그아웃;
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

          return 0;
        }
      });
    // .then((res) => {
    console.log('refreshTokenData ', refreshTokenData);
    // 재발급 성공시

    //   return 1;
    // }
    // })
    // .catch((error) => {
    //   console.log('refreshTokenData error code', error.response);

    // if (
    // refreshTokenData.data.data.code == 'GE-002' ||
    // refreshTokenData.data.data.code == 'E-015' // 새션정보 만료일시
    // ) {

    //   return false;
    // }
    // });

    // console.log('refreshTokenData code', refreshTokenData.data.code);
  };

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
