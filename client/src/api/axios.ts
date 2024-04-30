import axios from 'axios';

import { getAuthorityCookie } from '../utils/cookies';

// axios 전역 설정
axios.defaults.withCredentials = true; // withCredentials 전역 설정
console.log(`${process.env.REACT_APP_AXIOS_BASE_URL}`);

/*  토큰 재발급 API Instance */
export const tokenInstance = axios.create({
  baseURL: `${process.env.REACT_APP_AXIOS_BASE_URL}/auth-service`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAuthorityCookie('accessToken')}`,
    refresh: `Bearer ${getAuthorityCookie('refreshToken')}`,
    'session-id': `${getAuthorityCookie('sessionId')}`,
    'Accept-Language': `ko_KR`,
  },
});
tokenInstance.interceptors.request.use(function (config) {
  const headerAuth =
    config.headers.Authorization?.toString().split('Bearer ')[1];
  const headerSessionId = config.headers['session-id'];

  if (headerAuth !== getAuthorityCookie('accessToken')) {
    config.headers.Authorization = `Bearer ${getAuthorityCookie(
      'accessToken',
    )}`;
  }
  if (headerSessionId !== getAuthorityCookie('sessionId')) {
    config.headers['session-id'] = `${getAuthorityCookie('sessionId')}`;
  }

  return config;
});

// 공통으로 사용되는 인스턴스 생성 로직
function createAPIInstance(baseURL: string) {
  const instance = axios.create({
    baseURL: `${process.env.REACT_APP_AXIOS_BASE_URL}/${baseURL}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthorityCookie('accessToken')}`,
      'session-id': `${getAuthorityCookie('sessionId')}`,
      'Accept-Language': `ko_KR`,
    },
  });

  // 공통으로 사용되는 요청 인터셉터 설정 로직
  instance.interceptors.request.use(function (config) {
    const accessToken = getAuthorityCookie('accessToken');
    const sessionId = getAuthorityCookie('sessionId');

    if (`Bearer ${accessToken}` !== config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (sessionId !== config.headers['session-id']) {
      config.headers['session-id'] = sessionId;
    }

    return config;
  });

  return instance;
}

/* 인증 서비스 API Instance */
export const authInstance = createAPIInstance('auth-service');
/* 유저 서비스 API Instance */
export const userInstance = createAPIInstance('user-service');
/* 분류 API Instance */
export const classificationInstance = createAPIInstance(
  'classification-service',
);
/* 학습지 API Instance */
export const workbookInstance = createAPIInstance('workbook-service');
/* 학습지 만들기API Instance */
export const makingworkbookInstance = createAPIInstance('file-service');
/* 문항 API Instance */
export const quizService = createAPIInstance('quiz-service');
