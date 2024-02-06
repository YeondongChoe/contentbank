// import { accessToken } from '../store/auth/accessToken';

import { useMutation } from '@tanstack/react-query';

import { authInstance } from '../api/axios';

import { setAuthorityCookie } from './cookies';

export const saveRefreshTokenToLocalStorage = (refreshToken: string) => {
  // if (typeof window !== 'undefined') {
  //   localStorage.setItem('refreshToken', refreshToken);
  // }
};
export const getRefreshTokenFromLocalStorage = () => {
  // if (typeof window !== 'undefined') {
  //   return localStorage.getItem('refreshToken') || '';
  // }
};

export const saveAccessToken = (accessToken: string) => {
  // accessToken.getState().setAccessToken(accessToken);
};
export const getAccessToken = () => {
  // return accessToken.getState().accessToken;
};
