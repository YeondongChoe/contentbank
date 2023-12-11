import * as React from 'react';

import { styled } from 'styled-components';

import { COLOR } from '../../../components/contents/COLOR';

type ButtonProps = {
  children?: React.ReactNode;
  text?: string;
  buttonType?: 'button' | 'submit' | 'reset';
  onClick: () => void;
  padding?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  borderRadius?: string;
  border?: boolean;
};

export function Button({
  children,
  text,
  buttonType = 'button',
  onClick,
  padding,
  width,
  height,
  fontSize,
  borderRadius,
  border,
}: ButtonProps) {
  return (
    <Component
      width={width}
      height={height}
      padding={padding}
      type={buttonType}
      onClick={onClick}
      fontSize={fontSize}
      borderRadius={borderRadius}
      border={border}
    >
      {children ? children : text}
    </Component>
  );
}

type ButtonStyleProps = {
  padding?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  borderRadius?: string;
  border?: boolean;
};

const Component = styled.button<ButtonStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ padding }) => (padding ? `${padding};` : '15px')};
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
  height: ${({ height }) => (height ? ` ${height};` : '50px')};
  font-size: ${({ fontSize }) => (fontSize ? ` ${fontSize};` : '17px')};
  font-weight: bold;
  border-radius: ${({ borderRadius }) =>
    borderRadius ? `${borderRadius};` : '10px'};
  ${({ border }) =>
    border ? `border: 1px solid ${COLOR.PRIMARY};` : 'border: none;'};
  background-color: ${({ border }) =>
    border ? ` transparent;` : `${COLOR.PRIMARY};`};
  color: ${({ border }) => (border ? `${COLOR.PRIMARY};` : '#fff')};
`;
