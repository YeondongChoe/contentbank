import * as React from 'react';

import styled from 'styled-components';

import { COLOR } from '../../../components/constants/COLOR';

type AlertBarProps = {
  isAlertNewOpen: boolean;
  closeNewAlert: () => void;
  message?: string;
  type: string;
};

const CustomCloseSvg = styled.svg`
  width: 25px;
  height: 25px;
  cursor: pointer;
  fill: none;
  &:hover {
    rect {
      fill: white;
      fill-opacity: 0.5;
    }
  }
`;

export function AlertBar({
  isAlertNewOpen,
  closeNewAlert,
  message,
  type,
}: AlertBarProps) {
  return (
    <>
      {isAlertNewOpen && (
        <Overlay>
          <Container $type={type}>
            {type === 'error' && (
              <Wrapper>
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.35 9.35H7.65V4.25H9.35M9.35 12.75H7.65V11.05H9.35M8.5 0C7.38376 0 6.27846 0.219859 5.24719 0.647024C4.21592 1.07419 3.27889 1.70029 2.48959 2.48959C0.895533 4.08365 0 6.24566 0 8.5C0 10.7543 0.895533 12.9163 2.48959 14.5104C3.27889 15.2997 4.21592 15.9258 5.24719 16.353C6.27846 16.7801 7.38376 17 8.5 17C10.7543 17 12.9163 16.1045 14.5104 14.5104C16.1045 12.9163 17 10.7543 17 8.5C17 7.38376 16.7801 6.27846 16.353 5.24719C15.9258 4.21592 15.2997 3.27889 14.5104 2.48959C13.7211 1.70029 12.7841 1.07419 11.7528 0.647024C10.7215 0.219859 9.61624 0 8.5 0Z"
                    fill="white"
                  />
                </svg>

                <div>{message}</div>
                <CustomCloseSvg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 25 25"
                  onClick={closeNewAlert}
                >
                  <path
                    d="M14.0643 12.5L20 18.4357V20H18.4357L12.5 14.0643L6.56429 20H5V18.4357L10.9357 12.5L5 6.56429V5H6.56429L12.5 10.9357L18.4357 5H20V6.56429L14.0643 12.5Z"
                    fill="white"
                  />
                  <rect width="25" height="25" rx="5" />
                </CustomCloseSvg>
              </Wrapper>
            )}
            {type === 'success' && (
              <Wrapper>
                <svg
                  width="17"
                  height="13"
                  viewBox="0 0 17 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 1.36689L5.34286 13L0 7.66816L1.36971 6.30127L5.34286 10.2565L15.6303 0L17 1.36689Z"
                    fill="white"
                  />
                </svg>
                <div>{message}</div>
                <CustomCloseSvg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 25 25"
                  onClick={closeNewAlert}
                >
                  <path
                    d="M14.0643 12.5L20 18.4357V20H18.4357L12.5 14.0643L6.56429 20H5V18.4357L10.9357 12.5L5 6.56429V5H6.56429L12.5 10.9357L18.4357 5H20V6.56429L14.0643 12.5Z"
                    fill="white"
                  />
                  <rect width="25" height="25" rx="5" />
                </CustomCloseSvg>
              </Wrapper>
            )}
            {type === 'warning' && (
              <Wrapper>
                <svg
                  width="17"
                  height="15"
                  viewBox="0 0 17 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.5 0L0 15H17M8.5 3.15789L14.3186 13.4211H2.68136M7.72727 6.31579V9.47368H9.27273V6.31579M7.72727 11.0526V12.6316H9.27273V11.0526"
                    fill="white"
                  />
                </svg>
                <div>{message}</div>
                <CustomCloseSvg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 25 25"
                  onClick={closeNewAlert}
                >
                  <path
                    d="M14.0643 12.5L20 18.4357V20H18.4357L12.5 14.0643L6.56429 20H5V18.4357L10.9357 12.5L5 6.56429V5H6.56429L12.5 10.9357L18.4357 5H20V6.56429L14.0643 12.5Z"
                    fill="white"
                  />
                  <rect width="25" height="25" rx="5" />
                </CustomCloseSvg>
              </Wrapper>
            )}
          </Container>
        </Overlay>
      )}
    </>
  );
}
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  z-index: 2;
  padding-top: 20px;
`;
const Container = styled.div<{ $type: string }>`
  width: 430px;
  height: 60px;
  background-color: ${({ $type }) => {
    switch ($type) {
      case 'error':
        return COLOR.ALERTBAR_ERROR;
      case 'success':
        return COLOR.ALERTBAR_SUCCESS;
      case 'warning':
        return COLOR.ALERTBAR_WARNING;
    }
  }};
  border-radius: 10px;
`;
const Wrapper = styled.div`
  height: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`;
