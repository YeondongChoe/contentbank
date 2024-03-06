/* eslint-disable no-undef */
import * as React from 'react';

import axios, { AxiosResponse } from 'axios';

import {
  getAuthorityCookie,
  removeAuthorityCookie,
  setAuthorityCookie,
} from '../utils/cookies';

// axios 전역 설정
axios.defaults.withCredentials = true; // withCredentials 전역 설정

// 토큰
// export const tokenInstance = axios.create({
//   baseURL: `${process.env.REACT_APP_AXIOS_BASE_URL}/auth-service`,
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${getAuthorityCookie('refreshToken')}`,
//     'session-id': `${getAuthorityCookie('sessionId')}`,
//     'Accept-Language': `ko_KR`,
//   },
// });
/* 리프레쉬 토큰 발급 요청 */
export const handleAuthorizationRenewal = async () => {
  //만료기간
  const nowDate = new Date().getTime();

  // if (nowDate === ) {
  //   await axios
  //     .post('/v1/auth/refresh-token', {
  //       baseURL: `${process.env.REACT_APP_AXIOS_BASE_URL}/auth-service`,
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${getAuthorityCookie('refreshToken')}`, //로그인 데이터의 리프레쉬토큰으로 요청
  //         'session-id': `${getAuthorityCookie('sessionId')}`,
  //         'Accept-Language': `ko_KR`,
  //       },
  //     })
  //     .then((res) => {
  //       // removeAuthorityCookie('accessToken');
  //       console.log('/refresh-token', res);

  //       setAuthorityCookie('accessToken', res.data.data.accessToken, {
  //         path: '/',
  //         sameSite: 'strict',
  //         secure: false,
  //       });
  //     });
  // }
};

// tokenInstance.interceptors.request.use(function (config) {
//   console.log('config', config);
//   handleAuthorizationRenewal();
//   if (config.headers.Authorization !== getAuthorityCookie('accessToken')) {
//     config.headers.Authorization = `Bearer ${getAuthorityCookie(
//       'accessToken',
//     )}`;
//   }
//   if (config.headers['session-id'] !== getAuthorityCookie('sessionId')) {
//     config.headers['session-id'] = `${getAuthorityCookie('sessionId')}`;
//   }
//   return config;
// });

/** 인증 서비스 API Instance*/
export const authInstance = axios.create({
  baseURL: `${process.env.REACT_APP_AXIOS_BASE_URL}/auth-service`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAuthorityCookie('accessToken')}`,
    'session-id': `${getAuthorityCookie('sessionId')}`,
    'Accept-Language': `ko_KR`,
  },
});

authInstance.interceptors.request.use(function (config) {
  const headerAuth =
    config.headers.Authorization?.toString().split('Bearer ')[1];
  console.log('headerAuth--------------- ', headerAuth);

  if (headerAuth !== getAuthorityCookie('accessToken')) {
    // handleAuthorizationRenewal();
    config.headers.Authorization = `Bearer ${getAuthorityCookie(
      'accessToken',
    )}`;
  }
  if (config.headers['session-id'] !== getAuthorityCookie('sessionId')) {
    config.headers['session-id'] = `${getAuthorityCookie('sessionId')}`;
  }
  return config;
});

// 유저 서비스
export const userInstance = axios.create({
  baseURL: `${process.env.REACT_APP_AXIOS_BASE_URL}/user-service`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAuthorityCookie('accessToken')}`,
    'session-id': `${getAuthorityCookie('sessionId')}`,
    'Accept-Language': `ko_KR`,
  },
});

userInstance.interceptors.request.use(function (config) {
  const headerAuth =
    config.headers.Authorization?.toString().split('Bearer ')[1];
  console.log('headerAuth--------------- ', headerAuth);

  if (headerAuth !== getAuthorityCookie('accessToken')) {
    // handleAuthorizationRenewal();
    config.headers.Authorization = `Bearer ${getAuthorityCookie(
      'accessToken',
    )}`;
  }
  if (config.headers['session-id'] !== getAuthorityCookie('sessionId')) {
    config.headers['session-id'] = `${getAuthorityCookie('sessionId')}`;
  }
  return config;
});

// 메뉴 리소스 서비스
export const resourceInstance = axios.create({
  baseURL: `${process.env.REACT_APP_AXIOS_BASE_URL}/resource-service`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAuthorityCookie('accessToken')}`,
  },
});

/** 문항서버 API Instance*/
export const questionInstance = axios.create({
  baseURL: `${process.env.REACT_APP_AXIOS_BASE_URL}/question-service`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAuthorityCookie('accessToken')}`,
    'Accept-Language': `ko_KR`,
  },
});

questionInstance.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${getAuthorityCookie('accessToken')}`;
  return config;
});

/** 404 5** 따로 반환 하지 않음 - TODO: 기획 변경시 반영  */
