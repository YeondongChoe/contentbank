import { accessToken } from '../store/auth/accessToken';

//TODO 토큰 받아오고 post 하기, 만료시 재발급 요청

export const saveRefreshTokenToLocalStorage = (refreshToken: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('refreshToken', refreshToken);
  }
};
export const getRefreshTokenFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('refreshToken') || '';
  }
};

export const saveAccessToken = (accessToken: string) => {
  // accessToken.getState().setAccessToken(accessToken);
};
export const getAccessToken = () => {
  // return accessToken.getState().accessToken;
};
