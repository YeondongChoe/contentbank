import * as React from 'react';

// eslint-disable-next-line import/order, import/default
import { ContentListSetting, ContentDtEditingSetting } from './components';
// eslint-disable-next-line import/default
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { App } from './App';
import {
  AuthorityPage,
  FirstLoginPage,
  LoginPage,
  ManagementsTreePage,
  MemberPage,
  MypagePage,
  QuizManagementListPage,
  ReloginPage,
  ContentWorksheet,
  CreateWorksheetStep1,
  CreateWorksheetStep2,
  CreateWorksheetStep3,
  QuizCreateListPage,
  CreatingContentSetting,
  ManagingContentSetting,
  MetaInfoPage,
  TagMappingPage,
  TagMappingInitPage,
  ProcessPage,
} from './pages';
import { Guide } from './pages/Guide';
import { ManagementEditMain } from './pages/managementWindow';
import { Formula } from './pages/managementWindow/Formula';
import { Notfound } from './pages/Notfound';
import { Preparing } from './pages/Preparing';
import { CreateContentMain, QuizPreview } from './pages/quizCreateWindow';
import GlobalStyle from './styles/GlobalStyle';

import 'react-perfect-scrollbar/dist/css/styles.css';

const lazyWrap = (factory: () => Promise<any>) => {
  return async () => {
    const page = await factory();
    // https://reactrouter.com/en/main/route/lazy
    return {
      Component: page.default || page.Component,
      ErrorBoundary: page.ErrorBoundary,
      loader: page.loader,
    };
  };
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Notfound />,
    children: [
      { index: true, path: '/', element: <QuizCreateListPage /> },
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
        element: <LoginPage />,
      },
      {
        path: '/init-change-password',
        element: <FirstLoginPage />,
      },
      {
        path: '/relogin',
        element: <ReloginPage />,
      },
      {
        path: '/mypage',
        element: <MypagePage />,
      },
      {
        path: '/content-create/quiz',
        element: <QuizCreateListPage />,
      },
      {
        path: '/createcontentmain',
        element: <CreateContentMain />,
      },
      // {
      //   path: '/formula',
      //   element: <Formula />,
      // },
      {
        path: '/quizpreview',
        element: <QuizPreview />,
      },
      {
        path: '/content-create/exam',
        element: <ContentWorksheet />,
      },
      {
        path: '/content-create/exam/step1',
        element: <CreateWorksheetStep1 />,
      },
      {
        path: '/content-create/exam/step2',
        element: <CreateWorksheetStep2 />,
      },
      {
        path: '/content-create/exam/step3',
        element: <CreateWorksheetStep3 />,
      },
      {
        path: '/content-manage/quiz',
        element: <QuizManagementListPage />,
      },
      {
        path: '/managementeditmain',
        element: <ManagementEditMain />,
      },
      {
        path: '/content-manage/classify',
        element: <ManagementsTreePage />,
      },
      {
        path: '/content-manage/metainfo',
        element: <MetaInfoPage />,
      },
      {
        path: '/content-manage/process',
        element: <ProcessPage />,
      },
      {
        path: '/content-manage/tagmapping',
        element: <TagMappingPage />,
      },
      {
        path: '/content-manage/tagmappinginit',
        element: <TagMappingInitPage />,
      },
      {
        path: '/operation-manage/member',
        element: <MemberPage />,
        // lazy: lazyWrap(() => import('./pages/operate/MemberPage')),
      },
      {
        path: '/operation-manage/authority',
        element: <AuthorityPage />,
      },
      {
        path: '/creatingcontentSetting',
        element: <CreatingContentSetting />,
      },
      {
        path: '/contentListSetting',
        element: <ContentListSetting />,
      },
      {
        path: '/contentDtEditingSetting',
        element: <ContentDtEditingSetting />,
      },
      {
        path: '/managingcontentSetting',
        element: <ManagingContentSetting />,
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
    <RecoilRoot>
      <RouterProvider router={router} />
      <GlobalStyle />
    </RecoilRoot>
  </React.StrictMode>,
);
