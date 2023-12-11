import * as React from 'react';

import { styled } from 'styled-components';

type ButtonProps = {
  children?: React.ReactNode;
  text: string;
  buttonType: 'button' | 'submit' | 'reset';
  onClick: () => void;
  padding: string;
  width: string;
  height: string;
};

export function Button({
  children,
  text,
  buttonType = 'button',
  onClick,
  padding,
  width,
  height,
}: ButtonProps) {
  return (
    <Component width={width} height={height} padding={padding}>
      <button type={buttonType} onClick={onClick}>
        {children ? children : text}
      </button>
    </Component>
  );
}

type ButtonStyleProps = {
  padding: string;
  width: string;
  height: string;
};

const Component = styled(React.Fragment)<ButtonStyleProps>`
  button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    ${({ padding }) => (padding ? `width: ${padding}px;` : '15px')}
    ${({ width }) => (width ? `width: ${width}px;` : '100%')}
    ${({ height }) => (height ? `height : ${height}px;` : '50px')}
  }
`;
