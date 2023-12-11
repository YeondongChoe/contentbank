import * as React from 'react';

import { styled } from 'styled-components';

import { COLOR } from '../../../components/contents/COLOR';

type IconButtonProps = {
  text?: string;
  buttonType: 'button' | 'submit' | 'reset';
  onClick: () => void;
  padding: string;
  width: string;
  height: string;
  leftIconSrc?: string;
  rightIconSrc?: string;
  border?: boolean;
};

export function IconButton({
  text,
  buttonType = 'button',
  onClick,
  padding,
  width,
  height,
  leftIconSrc,
  rightIconSrc,
  border,
}: IconButtonProps) {
  return (
    <Component
      width={width}
      height={height}
      padding={padding}
      type={buttonType}
      onClick={onClick}
      border={border}
    >
      {leftIconSrc && <img src={leftIconSrc} alt="icon image" />}
      {text && text}
      {rightIconSrc && <img src={rightIconSrc} alt="icon image" />}
    </Component>
  );
}

type ButtonStyleProps = {
  padding?: string;
  width?: string;
  height?: string;
  border?: boolean;
};

const Component = styled.button<ButtonStyleProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ padding }) => (padding ? `${padding};` : '15px')};
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
  height: ${({ height }) => (height ? ` ${height};` : '50px')};
  ${({ border }) =>
    border ? `border: 1px solid ${COLOR.PRIMARY};` : 'border: none;'};
`;
