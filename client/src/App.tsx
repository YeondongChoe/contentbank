import * as React from 'react';

import { Outlet, useLocation } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';

import { Header } from './components/Header';
import { previewWorksheetBoolAtom } from './store/creatingWorksheetAtom';

export function App() {
  const location = useLocation();
  //const pring = useRecoilValue(previewWorksheetBoolAtom);

  return (
    <>
      <RecoilRoot>
        {location.pathname !== '/login' &&
          location.pathname !== '/firstlogin' &&
          location.pathname !== '/relogin' && <Header />}
        <Outlet />
      </RecoilRoot>
    </>
  );
}
