import * as React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

import { COLOR } from '../../constants/COLOR';

interface openToastifyAlertProps {
  text: string;
  type: string;
}

export const openToastifyAlert = ({ type, text }: openToastifyAlertProps) => {
  switch (type) {
    case 'default':
      toast(text);
      break;
    case 'success':
      toast.success(text, {
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 17 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 1.36689L5.34286 13L0 7.66816L1.36971 6.30127L5.34286 10.2565L15.6303 0L17 1.36689Z"
              fill="white"
            />
          </svg>
        ),
        className: 'toast-success',
      });
      break;
    case 'warning':
      toast.warning(text, {
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 17 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.5 0L0 15H17M8.5 3.15789L14.3186 13.4211H2.68136M7.72727 6.31579V9.47368H9.27273V6.31579M7.72727 11.0526V12.6316H9.27273V11.0526"
              fill="white"
            />
          </svg>
        ),
        className: 'toast-warning',
      });
      break;
    case 'error':
      toast(text, {
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.35 9.35H7.65V4.25H9.35M9.35 12.75H7.65V11.05H9.35M8.5 0C7.38376 0 6.27846 0.219859 5.24719 0.647024C4.21592 1.07419 3.27889 1.70029 2.48959 2.48959C0.895533 4.08365 0 6.24566 0 8.5C0 10.7543 0.895533 12.9163 2.48959 14.5104C3.27889 15.2997 4.21592 15.9258 5.24719 16.353C6.27846 16.7801 7.38376 17 8.5 17C10.7543 17 12.9163 16.1045 14.5104 14.5104C16.1045 12.9163 17 10.7543 17 8.5C17 7.38376 16.7801 6.27846 16.353 5.24719C15.9258 4.21592 15.2997 3.27889 14.5104 2.48959C13.7211 1.70029 12.7841 1.07419 11.7528 0.647024C10.7215 0.219859 9.61624 0 8.5 0Z"
              fill="white"
            />
          </svg>
        ),
        className: 'toast-error',
      });
      break;
  }
};

export function ToastifyAlert() {
  return (
    <>
      <StyledToastContainer
        position="top-center"
        limit={2}
        closeButton={false}
        autoClose={1000}
        hideProgressBar
      />
    </>
  );
}

export const StyledToastContainer = styled(ToastContainer)`
  width: 430px;
  .toast-success {
    background-color: ${COLOR.SUCCESS};
    color: white;
  }

  .toast-warning {
    background-color: ${COLOR.WARNING};
    color: white;
  }

  .toast-error {
    background-color: ${COLOR.ERROR};
    color: white;
  }
`;
