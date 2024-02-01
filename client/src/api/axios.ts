/* eslint-disable no-undef */
import * as React from 'react';

import axios, { AxiosResponse } from 'axios';

import { getAuthorityCookie, setAuthorityCookie } from '../utils/cookies';

/** 문항서버 API Instance*/
export const questionInstance = axios.create({
  baseURL: `${process.env.REACT_APP_AXIOS_BASE_URL}/question-service`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAuthorityCookie('accessToken')}`,
  },
});

questionInstance.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${getAuthorityCookie('accessToken')}`;
  return config;
});

/** 권한서버 API Instance*/
export const authInstance = axios.create({
  baseURL: `${process.env.REACT_APP_AXIOS_BASE_URL}/auth-service`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAuthorityCookie('accessToken')}`,
    'session-id': `${getAuthorityCookie('sessionId')}`,
  },
});

authInstance.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${getAuthorityCookie('accessToken')}`;

  return config;
});

/** Authorization확인 후 갱신하는 로직*/
export const handleAuthorizationRenewal = (response: AxiosResponse) => {
  if (response.status !== 200) return;
  if (response.headers['authorization'] !== getAuthorityCookie('accessToken')) {
    setAuthorityCookie('accessToken', response.headers['authorization'], {
      path: '/',
      sameSite: 'strict',
      secure: false,
    });
  }
};

/** 404 5** 따로 반환 하지 않음 - TODO: 기획 변경시 반영  */
