import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Login } from './pages/members/Login';
import { FirstLogin } from './pages/members/FirstLogin';
import { Relogin } from './pages/members/Relogin';
import { Mypage } from './pages/mypage/Mypage';
import { ContentList } from './pages/content/ContentList';
import { ContentWorksheet } from './pages/content/ContentWorksheet';
import { ManagementList } from './pages/management/ManagementList';
import { ManagementTree } from './pages/management/ManagementTree';
import { OperationMember } from './pages/operate/OperationMember';
import { OperationAuthority } from './pages/operate/OperationAuthority';
import { Notfound } from './pages/Notfound';
import { Preparing } from './pages/Preparing';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Notfound />,
    children: [
      { index: true, element: <ContentList /> },
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
  </React.StrictMode>,
);
