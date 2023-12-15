import * as React from 'react';
import { ChangeEvent } from 'react';

import { styled } from 'styled-components';

import { IconButton } from '../../../components/atom';

type SearchProps = {
  placeholder?: string;
  value: string;
  onClick: () => void;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  height?: string;
  fontSize?: string;
  margin?: string;
  errorMessage?: string;
};

export function Search({
  fontSize,
  placeholder,
  value,
  onClick,
  onChange,
  width,
  height,
  margin,
  errorMessage,
}: SearchProps) {
  return (
    <>
      <Component
        placeholder={placeholder}
        width={width}
        height={height}
        fontSize={fontSize}
        $margin={margin}
      >
        <input value={value} onChange={onChange} />
        <IconButton onClick={onClick} />
      </Component>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </>
  );
}

type SearchStyleProps = {
  width?: string;
  height?: string;
  fontSize?: string;
  $margin?: string;
};

const Component = styled.div<SearchStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
  height: ${({ height }) => (height ? ` ${height};` : '50px')};
  font-size: ${({ fontSize }) => (fontSize ? ` ${fontSize};` : '14px')};
  margin: ${({ $margin }) => ($margin ? `${$margin};` : '0')};
`;
const ErrorMessage = styled.p`
  color: #d32f2f;
  font-size: 12px;
`;
