import * as React from 'react';

import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { Outlet, useLocation } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { Header } from './components/Header';

const config = {
  loader: { load: ['[tex]/html'] },
  tex: {
    packages: { '[+]': ['html'] },
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]'],
    ],
  },
};

export function App() {
  const location = useLocation();

  return (
    <>
      <MathJaxContext version={3} config={config}>
        <RecoilRoot>
          {location.pathname !== '/login' &&
            location.pathname !== '/firstlogin' &&
            location.pathname !== '/relogin' && <Header />}
          <Outlet />
        </RecoilRoot>
      </MathJaxContext>
    </>
  );
}
