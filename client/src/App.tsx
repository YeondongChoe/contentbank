import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <Outlet />
      </RecoilRoot>
    </div>
  );
}

export default App;
