import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { getCookie, setCookie } from '../utils/ReactCookie';

/** 문항서버 API Instance*/
export const questionInstance = axios.create({
  baseURL: '/question-service/api/v1/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getCookie('accessToken')}`,
  },
});

questionInstance.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${getCookie('accessToken')}`;
  return config;
});

/** 권한서버 API Instance*/
export const AuthInstance = axios.create({
  baseURL: '/auth-service/api/v1/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getCookie('accessToken')}`,
  },
});

AuthInstance.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${getCookie('accessToken')}`;
  return config;
});

/** Authorization확인 후 갱신하는 로직*/
export const handleAuthorizationRenewal = (response: AxiosResponse) => {
  if (response.status === 200) {
    if (response.headers['authorization'] !== getCookie('accessToken')) {
      setCookie('accessToken', response.headers['authorization'], {
        path: '/',
        sameSite: 'strict',
        secure: false,
      });
    }
  }
};
