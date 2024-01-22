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
  $filled?: boolean;
  isChecked?: boolean;
  $normal?: boolean;
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
  $filled,
  $normal,
  isChecked,
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
      $filled={$filled}
      $isChecked={isChecked}
      $normal={$normal}
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
  $filled?: boolean;
  $isChecked?: boolean;
  $normal?: boolean;
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
  ${(props) =>
    props.$isChecked
      ? `background-color: ${COLOR.BUTTON_LIGHT_NORMAL}; color: white; border: none;`
      : `background-color: ${COLOR.BUTTON_NORMAL}; color: ${COLOR.FONT_BLACK}; border: none;`}
  ${(props) =>
    props.$filled &&
    `background-color: ${COLOR.PRIMARY}; color: white; border: none;`}
  ${(props) =>
    props.$normal &&
    `background-color: white; color: ${COLOR.PRIMARY}; border: 1px solid ${COLOR.PRIMARY};`}
${({ disabled }) =>
    disabled === true &&
    `border:none; color:${COLOR.GRAY}; background-color:${COLOR.LIGHT_GRAY}; cursor: auto;`}
  cursor: pointer;

  /* background-color: ${({ $border, disabled }) =>
    $border
      ? disabled
        ? `background-color:${COLOR.LIGHT_GRAY};`
        : ` #D9D9D9;`
      : `${COLOR.PRIMARY};`};
  color: ${({ $border }) => ($border ? `${COLOR.PRIMARY};` : '#fff')};
  ${({ $border, disabled }) =>
    $border
      ? disabled
        ? `border:none;`
        : `border: 1px solid ${COLOR.PRIMARY};`
      : 'border: none;'}; */
`;
