import * as React from 'react';

import { Outlet, useLocation } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';

import { Header } from './components/Header';
import { Login } from './pages/members/Login';
import { previewWorksheetBoolAtom } from './store/creatingWorksheetAtom';
import { getAuthorityCookie } from './utils/cookies';

export function App() {
  const location = useLocation();
  //const pring = useRecoilValue(previewWorksheetBoolAtom);

  return (
    <>
      <RecoilRoot>
        {/* TODO: 쿼리스트링에 토큰이 있을시 메인으로 없을시 로그인페이지 */}

        {!getAuthorityCookie('accessToken') && <Login />}
        {location.pathname === '/' && <Login />}
        {location.pathname !== '/login' && location.pathname !== '/' && (
          <Header />
        )}

        <Outlet />
      </RecoilRoot>
    </>
  );
}
