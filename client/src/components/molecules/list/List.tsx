import * as React from 'react';
import { Children } from 'react';

import { styled } from 'styled-components';

import { COLOR } from '../../constants';

import { ListItem } from './ListItem';

type ListProps = {
  // onClick: () => void;
  // onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  // onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  width?: string;
  height?: string;
  margin?: string;
  children: JSX.Element;
};

export function List({ width, height, margin, children }: ListProps) {
  return (
    <Component width={width} height={height} $margin={margin}>
      {children}
    </Component>
  );
}

type ListStyleProps = {
  width?: string;
  height?: string;
  $margin?: string;
};

const Component = styled.ul<ListStyleProps>`
  display: flex;
  flex-direction: column;
  padding: 5px;
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
  height: ${({ height }) => (height ? ` ${height};` : '100%')};
  margin: ${({ $margin }) => ($margin ? `${$margin};` : '0')};
`;
