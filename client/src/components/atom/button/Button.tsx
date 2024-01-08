import * as React from 'react';

import { styled } from 'styled-components';

import { COLOR } from '../../constants';

type ButtonProps = {
  children?: React.ReactNode;
  text?: string;
  buttonType?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
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
  onKeyDown,
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
      onKeyDown={onKeyDown}
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
  background-color: ${({ $border, disabled }) =>
    $border
      ? disabled
        ? `background-color:${COLOR.LIGHT_GRAY};`
        : ` #fff;`
      : `${COLOR.PRIMARY};`};
  color: ${({ $border }) => ($border ? `${COLOR.PRIMARY};` : '#fff')};
  ${({ $border, disabled }) =>
    $border
      ? disabled
        ? `border:none;`
        : `border: 1px solid ${COLOR.PRIMARY};`
      : 'border: none;'};
  cursor: pointer;
  ${({ disabled }) =>
    disabled === true &&
    `border:none; color:${COLOR.GRAY} ;background-color:${COLOR.LIGHT_GRAY}; cursor: auto;`}
`;
