import * as React from 'react';
import { ChangeEvent } from 'react';

import { IoSearch } from 'react-icons/io5';
import { styled } from 'styled-components';

import { IconButton } from '../../../components/atom';
import { COLOR } from '../../constants';

type SearchProps = {
  placeholder?: string;
  value: string;
  onClick: () => void;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
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
  onKeyDown,
  width,
  height,
  margin,
  errorMessage,
}: SearchProps) {
  return (
    <Component
      width={width}
      height={height}
      fontSize={fontSize}
      $margin={margin}
    >
      <input
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
      />
      <button onClick={onClick} type="button">
        <IoSearch />
      </button>

      <ErrorMessage>{errorMessage}</ErrorMessage>
    </Component>
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
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
  height: ${({ height }) => (height ? ` ${height};` : '35px')};
  font-size: ${({ fontSize }) => (fontSize ? ` ${fontSize};` : '14px')};
  margin: ${({ $margin }) => ($margin ? `${$margin};` : '0')};
  background: #fff;
  border-radius: 5px;
  border: 1px solid ${COLOR.LIGHT_GRAY};

  input {
    width: '100%';
    flex: 1 0 0;
    font-size: 12px;
    padding: 6px;
    padding-left: 12px;
    padding-right: 0px;
    border-radius: 0px;
    border: none;
    background-color: transparent;
  }

  button {
    width: 30px;
    height: 30px;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;
const ErrorMessage = styled.p`
  color: #d32f2f;
  font-size: 12px;
`;
