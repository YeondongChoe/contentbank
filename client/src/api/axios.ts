/* eslint-disable no-undef */
import * as React from 'react';

import axios, { AxiosResponse } from 'axios';

import { getAuthorityCookie, setAuthorityCookie } from '../utils/cookies';

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
  config.headers.Authorization = `Bearer ${getAuthorityCookie('accessToken')}`;

  return config;
});

/** accessToken 확인 후 갱신하는 로직*/
export const handleAuthorizationRenewal = (response: AxiosResponse) => {
  console.log(getAuthorityCookie('accessToken'));
  console.log(getAuthorityCookie('sessionId'));

  console.log(response);
  if (response.status !== 200) return;
  // if (response.headers['Access_token'] !== getAuthorityCookie('accessToken')) {
  // setAuthorityCookie('accessToken', response.headers['accessToken'], {
  //   path: '/',
  //   sameSite: 'strict',
  //   secure: false,
  // });
  // }
  console.log('not 200', response);
};

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
