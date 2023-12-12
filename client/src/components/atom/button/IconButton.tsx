import * as React from 'react';

import { styled } from 'styled-components';

import { COLOR } from '../../../components/contents';

type IconButtonProps = {
  text?: string;
  buttonType?: 'button' | 'submit' | 'reset';
  onClick: () => void;
  $padding?: string;
  $margin?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  $borderRadius?: string;
  $border?: boolean;
  disabled?: boolean;
  leftIconSrc?: string;
  rightIconSrc?: string;
};

export function IconButton({
  text,
  buttonType = 'button',
  onClick,
  $padding,
  $margin,
  width,
  height,
  leftIconSrc,
  rightIconSrc,
  $border,
  $borderRadius,
}: IconButtonProps) {
  return (
    <Component
      width={width}
      height={height}
      $padding={$padding}
      $margin={$margin}
      type={buttonType}
      onClick={onClick}
      $border={$border}
      $borderRadius={$borderRadius}
    >
      {leftIconSrc && <img src={leftIconSrc} alt="icon image" />}
      {text && text}
      {rightIconSrc && <img src={rightIconSrc} alt="icon image" />}
    </Component>
  );
}

type ButtonStyleProps = {
  $padding?: string;
  $margin?: string;
  width?: string;
  height?: string;
  $border?: boolean;
  fontSize?: string;
  $borderRadius?: string;
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
    $borderRadius ? `${$borderRadius};` : '10px'};
  ${({ $border }) =>
    $border ? `border: 1px solid ${COLOR.PRIMARY};` : 'border: none;'};
  ${({ $border }) =>
    $border ? `border: 1px solid ${COLOR.PRIMARY};` : 'border: none;'};
  cursor: pointer;
`;
