import { authInstance } from './axios';

export type LoginType = {
  username: string;
  password: string;
};

export const postLogin = (auth: LoginType) => {
  console.log('postLogin', auth);

  return authInstance.post('/v1/auth/login', auth);
};

export const getLogout = () => {
  return authInstance.get('/v1/auth/logout');
};
