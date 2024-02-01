import * as React from 'react';

// eslint-disable-next-line import/order, import/default
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { App } from './App';
import {
  ContentList,
  ContentWorksheet,
  CreateContentMain,
  CreateContentWindow,
  CreateWorksheetStep1,
  CreateWorksheetStep2,
  CreateWorksheetStep3,
} from './pages/content';
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
      { index: true, path: '/', element: <ContentList /> },
      {
        path: 'dev/v1/guide',
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
        path: '/init-change-password',
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
        path: '/content-create/quiz',
        element: <ContentList />,
      },
      {
        path: '/createcontentwindow',
        element: <CreateContentWindow />,
      },
      {
        path: '/createcontentmain',
        element: <CreateContentMain />,
      },
      {
        path: '/contentworksheet',
        element: <ContentWorksheet />,
      },
      {
        path: '/createworksheet/step1',
        element: <CreateWorksheetStep1 />,
      },
      {
        path: '/createworksheet/step2',
        element: <CreateWorksheetStep2 />,
      },
      {
        path: '/createworksheet/step3',
        element: <CreateWorksheetStep3 />,
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
// eslint-disable-next-line import/no-named-as-default-member
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <GlobalStyle />
  </React.StrictMode>,
);
