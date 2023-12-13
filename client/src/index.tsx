import * as React from 'react';

// eslint-disable-next-line import/order, import/default
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { App } from './App';
import { ContentList } from './pages/content/ContentList';
import { ContentWorksheet } from './pages/content/ContentWorksheet';
import { Guide } from './pages/Guide';
import { ManagementList } from './pages/management/ManagementList';
import { ManagementTree } from './pages/management/ManagementTree';
import { FirstLogin } from './pages/members/FirstLogin';
import { Login } from './pages/members/Login';
import { Relogin } from './pages/members/Relogin';
import { Mypage } from './pages/mypage/Mypage';
import { Notfound } from './pages/Notfound';
import { OperationAuthority } from './pages/operate/OperationAuthority';
import { OperationMember } from './pages/operate/OperationMember';
import { Preparing } from './pages/Preparing';
import GlobalStyle from './styles/GlobalStyle';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Notfound />,
    children: [
      { index: true, element: <ContentList /> },
      {
        path: '/guide',
        element: <Guide />,
      },
      {
        path: '/preparing',
        element: <Preparing />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/firstlogin',
        element: <FirstLogin />,
      },
      {
        path: '/relogin',
        element: <Relogin />,
      },
      {
        path: '/mypage',
        element: <Mypage />,
      },
      {
        path: '/contentlist',
        element: <ContentList />,
      },
      {
        path: '/contentworksheet',
        element: <ContentWorksheet />,
      },
      {
        path: '/managementlist',
        element: <ManagementList />,
      },
      {
        path: '/managementtree',
        element: <ManagementTree />,
      },
      {
        path: '/operationmember',
        element: <OperationMember />,
      },
      {
        path: '/operationauthority',
        element: <OperationAuthority />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />

    <GlobalStyle />
  </React.StrictMode>,
);
