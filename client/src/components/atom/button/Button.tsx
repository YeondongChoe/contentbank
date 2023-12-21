import * as React from 'react';

import { styled } from 'styled-components';

import { COLOR } from '../../constants';

type ButtonProps = {
  children?: React.ReactNode;
  text?: string;
  buttonType?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  $padding?: string;
  $margin?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  $borderRadius?: string;
  $border?: boolean;
  disabled?: boolean;
};

export function Button({
  children,
  text,
  buttonType = 'button',
  onClick,
  $padding,
  $margin,
  width,
  height,
  fontSize,
  $borderRadius,
  $border,
  disabled,
}: ButtonProps) {
  return (
    <Component
      width={width}
      height={height}
      $padding={$padding}
      $margin={$margin}
      type={buttonType}
      onClick={onClick}
      fontSize={fontSize}
      $borderRadius={$borderRadius}
      $border={$border}
      disabled={disabled}
    >
      {children ? children : text}
    </Component>
  );
}

type ButtonStyleProps = {
  $padding?: string;
  $margin?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  $borderRadius?: string;
  $border?: boolean;
  disabled?: boolean;
};

const Component = styled.button<ButtonStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ $padding }) => ($padding ? `${$padding};` : '15px')};
  margin: ${({ $margin }) => ($margin ? `${$margin};` : '0')};
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
  height: ${({ height }) => (height ? ` ${height};` : '50px')};
  font-size: ${({ fontSize }) => (fontSize ? ` ${fontSize};` : '16px')};
  font-weight: bold;
  border-radius: ${({ $borderRadius }) =>
    $borderRadius ? `${$borderRadius};` : '5px'};
  ${({ $border }) =>
    $border ? `border: 1px solid ${COLOR.PRIMARY};` : 'border: none;'};
  background-color: ${({ $border }) =>
    $border ? ` #fff;` : `${COLOR.PRIMARY};`};
  color: ${({ $border }) => ($border ? `${COLOR.PRIMARY};` : '#fff')};
  cursor: pointer;
  ${({ disabled }) =>
    disabled &&
    `border:none; color:${COLOR.GRAY} ;background-color:${COLOR.LIGHT_GRAY}; cursor: auto;`}
`;
