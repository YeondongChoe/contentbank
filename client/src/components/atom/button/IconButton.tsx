import * as React from 'react';

import { styled } from 'styled-components';

import { COLOR } from '../../../components/contents';

type IconButtonProps = {
  children?: React.ReactNode;
  text?: string;
  buttonType?: 'button' | 'submit' | 'reset';
  onClick: () => void;
  onMouseLeave?: () => void;
  $padding?: string;
  $margin?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  $borderRadius?: string;
  $border?: boolean;
  disabled?: boolean;
  leftIconSrc?: React.ReactElement;
  rightIconSrc?: React.ReactElement;
  textAlign?: 'center' | 'left' | 'right';
};

export function IconButton({
  children,
  text,
  buttonType = 'button',
  onClick,
  onMouseLeave,
  $padding,
  $margin,
  width,
  height,
  fontSize,
  leftIconSrc,
  rightIconSrc,
  $border,
  $borderRadius,
  textAlign,
}: IconButtonProps) {
  return (
    <Component
      width={width}
      height={height}
      $padding={$padding}
      $margin={$margin}
      type={buttonType}
      onClick={onClick}
      onMouseLeave={onMouseLeave}
      $border={$border}
      $borderRadius={$borderRadius}
      fontSize={fontSize}
      $textAlign={textAlign}
    >
      {leftIconSrc && <LeftIconWrapper>{leftIconSrc}</LeftIconWrapper>}
      <span>{text && text}</span>
      {children ? children : text}
      {rightIconSrc && <RightIconWrapper>{rightIconSrc}</RightIconWrapper>}
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
  $textAlign?: 'center' | 'left' | 'right';
};

const Component = styled.button<ButtonStyleProps>`
  display: flex;
  align-items: center;
  background-color: white;
  padding: ${({ $padding }) => ($padding ? `${$padding};` : '15px')};
  margin: ${({ $margin }) => ($margin ? `${$margin};` : '0')};
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
  height: ${({ height }) => (height ? ` ${height};` : '50px')};
  font-size: ${({ fontSize }) => (fontSize ? ` ${fontSize};` : '16px')};
  font-weight: 400;
  border-radius: ${({ $borderRadius }) =>
    $borderRadius ? `${$borderRadius};` : '10px'};
  ${({ $border }) =>
    $border
      ? `border: 1px solid ${COLOR.PRIMARY};`
      : 'border: 1px solid rgba(0, 0, 0, 0.23);'};
  cursor: pointer;
  &:focus {
    border: 1px solid rgba(25, 118, 210);
  }
  &:hover {
    border: 1px solid rgba(25, 118, 210);
  }
  span {
    text-align: ${({ $textAlign }) =>
      $textAlign ? `${$textAlign};` : 'center'};
  }
`;

const RightIconWrapper = styled.span`
  display: flex;
  flex: 1 0 0;
  justify-content: flex-end;
`;

const LeftIconWrapper = styled.span`
  display: flex;
  flex: 1 0 0;
  justify-content: flex-start;
`;
