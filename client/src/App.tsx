import React from 'react';
import { Outlet } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Header } from './components/Header';
import { useLocation } from 'react-router-dom';

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
