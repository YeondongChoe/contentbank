import * as React from 'react';

import { styled } from 'styled-components';

import { COLOR } from '../../constants';

type ListItemProps = {
  // onClick: () => void;
  // onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  // onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  width?: string;
  height?: string;
  margin?: string;
  children: JSX.Element | JSX.Element[];
  key?: string | number;
  isChecked: boolean;
};

export function ListItem({
  width,
  height,
  margin,
  children,
  key,
  isChecked,
}: ListItemProps) {
  return (
    <Component
      className={`${isChecked && 'on'}`}
      width={width}
      height={height}
      $margin={margin}
      key={key}
    >
      <Wrapper className={`${isChecked && 'on'}`}>{children}</Wrapper>
    </Component>
  );
}

type ListItemStyleProps = {
  width?: string;
  height?: string;
  $margin?: string;
};

const Component = styled.li<ListItemStyleProps>`
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
  height: ${({ height }) => (height ? ` ${height};` : '100%')};
  margin: ${({ $margin }) => ($margin ? `${$margin};` : '0')};
  display: flex;
  width: 100%;
  min-height: 40px;
  border: 1px solid ${COLOR.BORDER_GRAY};
  border-radius: 10px;
  margin-bottom: 10px;

  &.on {
    border: 1px solid transparent;
  }
`;

const Wrapper = styled.button`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: none;
  background-color: white;
  color: ${COLOR.FONT_BLACK};

  &.on {
    background-color: ${COLOR.SECONDARY};
    color: white;
  }
`;
