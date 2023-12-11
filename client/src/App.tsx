import * as React from 'react';

import { Outlet, useLocation } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { Header } from './components/Header';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <RecoilRoot>
        {location.pathname !== '/login' &&
          location.pathname !== '/firstlogin' &&
          location.pathname !== '/relogin' && <Header />}
        <Outlet />
      </RecoilRoot>
    </div>
  );
}

export { App };
