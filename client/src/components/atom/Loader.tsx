import * as React from 'react';

import { styled } from 'styled-components';

import { COLOR } from '../constants';

// import LoaderIcon from '../../../public/images/icon/loader.svg';

type LoaderProps = {
  width?: string;
  height?: string;
  size?: string;
};

export function Loader({ width, height, size }: LoaderProps) {
  return (
    <Component width={width} height={height} size={size}>
      {/* Pure CSS Loader */}
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Component>
  );
}

type LoaderStyleProps = {
  width?: string;
  height?: string;
  size?: string;
};

const Component = styled.div<LoaderStyleProps>`
  width: ${({ width }) => (width ? ` ${width}` : `100%`)};
  height: ${({ height }) => (height ? ` ${height}` : `100%`)};
  background-color: transparent;

  /* {Pure CSS Loader} */
  .lds-ring {
    display: inline-block;
    position: relative;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    ${({ size }) =>
      size
        ? ` width: ${size};
    height: ${size};`
        : ` width: 54px;
    height: 54px;`}
    margin: 8px;
    border: 8px solid ${COLOR.PRIMARY};
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${COLOR.PRIMARY} transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
