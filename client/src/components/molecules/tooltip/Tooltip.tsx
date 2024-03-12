import * as React from 'react';
import { Children } from 'react';

import { styled } from 'styled-components';

import { COLOR } from '../../constants';

type TooltiptProps = {
  width?: string;
  height?: string;
  margin?: string;
  children: JSX.Element;
};

export function Tooltip({ width, height, margin, children }: TooltiptProps) {
  return (
    <Component width={width} height={height} $margin={margin} className="">
      <TooltipText>{children}</TooltipText>
    </Component>
  );
}

type TooltiptStyleProps = {
  width?: string;
  height?: string;
  $margin?: string;
};

const Component = styled.div<TooltiptStyleProps>`
  display: none;
  width: ${({ width }) => (width ? ` ${width}` : '100%')};
  height: ${({ height }) => (height ? ` ${height}` : '100%')};
  margin: ${({ $margin }) => ($margin ? `${$margin}` : '0')};
  position: absolute;
  top: 100%;
  bottom: auto;
  left: auto;
  right: auto;
  z-index: 5;
  &.on {
    display: inline-block;
  }
  &::before {
    content: '';
    position: absolute;
    display: inline-block;
    width: 0;
    height: 0;
    top: -5px;
    left: 2px;
    border-bottom: 10px solid ${COLOR.FONT_BLACK}; /* 화살표 */
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
  }
`;

const TooltipText = styled.p`
  display: inline-block;
  max-width: 250px;
  min-height: 20px;
  background-color: ${COLOR.FONT_BLACK};
  color: white;
  padding: 10px;
  font-size: 10px;
  border-radius: 5px;
`;
