import { tokenInstance } from '../api/axios';
import { openToastifyAlert } from '../components';

import {
  getAuthorityCookie,
  removeAuthorityCookie,
  setAuthorityCookie,
} from './cookies';
//리프레쉬 토큰 요청 api
export const postRefreshToken = async () => {
  console.log(
    '리프레쉬 토큰 요청 apigetAuthorityCookie ',
    getAuthorityCookie('accessToken'),
  );
  console.log(
    '리프레쉬 토큰 요청 apigetAuthorityCookie ',
    getAuthorityCookie('refreshToken'),
  );

  const refreshTokenData = await tokenInstance
    .post(`/v1/auth/refresh-token`)
    .then((res) => {
      console.log('refreshTokenData ', res);
      // 초기화
      // removeAuthorityCookie('accessToken', {
      //   path: '/',
      //   sameSite: 'strict',
      //   secure: false,
      // });

      // if (res.data.code === 'S-001') {
      setAuthorityCookie('accessToken', res.data.data.accessToken, {
        path: '/',
        sameSite: 'strict',
        secure: false,
      });
      return 1;
      // }
    })
    .catch((error) => {
      console.log('refreshTokenData error', error);
      if (
        error.response.data.code == 'GE-002' ||
        error.response.data.code == 'GE-003' ||
        error.response.data.code == 'E-006'
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
        // navigator('/login');
        if (
          window.location.pathname.includes('/managementeditmain') ||
          window.location.pathname.includes('/createcontentmain')
        ) {
          window.close();
        }
        return 0;
      }
    });
  console.log('refreshTokenData ', refreshTokenData);
};
