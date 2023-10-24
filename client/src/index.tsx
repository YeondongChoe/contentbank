import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/members/Login';
import FirstLogin from './pages/members/FirstLogin';
import Relogin from './pages/members/Relogin';
import Mypage from './pages/mypage/Mypage';
import Contentpage from './pages/content/Content';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: 'Notfound',
    children: [
      { index: true, element: <Login /> },
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
        path: '/contentpage',
        element: <Contentpage />,
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
