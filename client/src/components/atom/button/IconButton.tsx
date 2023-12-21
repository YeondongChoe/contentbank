import * as React from 'react';

import { styled } from 'styled-components';

import { COLOR } from '../../constants';

type IconButtonProps = {
  children?: React.ReactNode;
  text?: string;
  buttonType?: 'button' | 'submit' | 'reset';
  onClick: () => void;
  onChange?: (x: any) => void;
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
  $borderNone?: boolean;
  $iconOlny?: boolean;
};

export function IconButton({
  children,
  text,
  buttonType = 'button',
  onClick,
  onChange,
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
  $borderNone,
  $iconOlny,
}: IconButtonProps) {
  return (
    <Component
      width={width}
      height={height}
      $padding={$padding}
      $margin={$margin}
      type={buttonType}
      onClick={onClick}
      onChange={onChange}
      onMouseLeave={onMouseLeave}
      $border={$border}
      $borderRadius={$borderRadius}
      fontSize={fontSize}
      $textAlign={textAlign}
      $borderNone={$borderNone}
      $iconOlny={$iconOlny}
    >
      {leftIconSrc && <LeftIconWrapper>{leftIconSrc}</LeftIconWrapper>}
      <span> {children ? children : text}</span>
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
  $borderNone?: boolean;
  leftIconSrc?: boolean;
  rightIconSrc?: boolean;
  $iconOlny?: boolean;
};

const Component = styled.button<ButtonStyleProps>`
  display: flex;
  align-items: center;
  background-color: white;
  position: relative;
  padding: ${({ $padding }) => ($padding ? `${$padding};` : '15px')};
  ${({ rightIconSrc }) => rightIconSrc && `padding-right: 20px;`}
  ${({ leftIconSrc }) => leftIconSrc && `padding-left: 20px;`}
  margin: ${({ $margin }) => ($margin ? `${$margin};` : '0')};
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
  height: ${({ height }) => (height ? ` ${height};` : '50px')};
  font-size: ${({ fontSize }) => (fontSize ? ` ${fontSize};` : '16px')};
  font-weight: 400;
  border-radius: ${({ $borderRadius }) =>
    $borderRadius ? `${$borderRadius};` : '5px'};
  ${({ $border }) =>
    $border
      ? `border: 1px solid ${COLOR.PRIMARY};`
      : `border: 1px solid rgba(0, 0, 0, 0.23);   
			&:hover {
				border: 1px solid ${COLOR.PRIMARY};
			}; 
		`};
  cursor: pointer;
  ${({ $borderNone }) =>
    $borderNone
      ? `border: 0px solid transparent; !important  
		&:focus {
		border: 0px solid transparent; !important 
		};
		&:hover {
			border: 0px solid transparent; !important 
		};`
      : `&:focus {
			border: 1px solid ${COLOR.PRIMARY};
		};`}

  span {
    width: 100%;
    text-align: ${({ $textAlign }) =>
      $textAlign ? `${$textAlign};` : 'center'};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const RightIconWrapper = styled.span`
  position: absolute;
  right: 10px;
  display: flex;
  justify-content: flex-end;
`;

const LeftIconWrapper = styled.span`
  position: absolute;
  left: 10px;
  display: flex;
  flex: 1 0 0;
  justify-content: flex-start;
`;
