import * as React from 'react';

import { styled } from 'styled-components';

import { COLOR } from '../../constants';

type ButtonProps = {
  children?: React.ReactNode;
  text?: string;
  buttonType?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
  $success?: boolean;
  isChecked?: boolean;
  $normal?: boolean;
  cursor?: boolean;
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
  $success,
  isChecked,
  cursor,
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
      $success={$success}
      $isChecked={isChecked}
      $normal={$normal}
      $cursor={cursor}
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
  $success?: boolean;
  $cursor?: boolean;
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
${(props) =>
    props.$filled &&
    props.$success &&
    `background-color: ${COLOR.SUCCESS}; color: white;`}

${({ disabled }) =>
    disabled &&
    `border:none; color:${COLOR.GRAY}; background-color:${COLOR.LIGHT_GRAY}; cursor: auto;`}
${({ $cursor, disabled }) => $cursor && !disabled && 'cursor:pointer;'}
`;
