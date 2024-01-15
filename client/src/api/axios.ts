import * as React from 'react';

import axios, { AxiosResponse } from 'axios';

import { getAuthorityCookie, setAuthorityCookie } from '../utils/cookies';
import {processColorStops} from "html2canvas/dist/types/css/types/functions/gradient";
import * as process from "process";

/** 문항서버 API Instance*/
export const questionInstance = axios.create({
  baseURL: `${process.env.AXIOS_BASE_URL}/question-service/api/v1/`,
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
  // baseURL: '/auth-service/api/v1/',
  baseURL: `${process.env.AXIOS_BASE_URL}/auth-service/api/v1/`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAuthorityCookie('accessToken')}`,
  },
});

authInstance.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${getAuthorityCookie('accessToken')}`;
  return config;
});

/** Authorization확인 후 갱신하는 로직*/
export const handleAuthorizationRenewal = (response: AxiosResponse) => {
  if (response.status === 200) {
    if (
      response.headers['authorization'] !== getAuthorityCookie('accessToken')
    ) {
      setAuthorityCookie('accessToken', response.headers['authorization'], {
        path: '/',
        sameSite: 'strict',
        secure: false,
      });
    }
  }
};
