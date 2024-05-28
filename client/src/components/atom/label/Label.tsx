import * as React from 'react';

import { styled } from 'styled-components';

import { COLOR } from '../../../components/constants';

type LabelProps = {
  value: string;
  type?: 'error' | 'navi';
  width?: string;
  fontSize?: string;
  padding?: string;
  margin?: string;
  onClick?: (event: any) => void;
  cursor?: boolean;
  flexEnd?: boolean;
  bold?: boolean;
};

export function Label({
  type,
  value,
  fontSize,
  width,
  padding,
  margin,
  onClick,
  cursor,
  flexEnd,
  bold,
}: LabelProps) {
  return (
    <Component
      $type={type}
      fontSize={fontSize}
      width={width}
      $padding={padding}
      $margin={margin}
      onClick={onClick}
      $cursor={cursor}
      $flexEnd={flexEnd}
      $bold={bold}
    >
      <label>{value}</label>
    </Component>
  );
}

type LabelStyleProps = {
  width?: string;
  $type?: string;
  fontSize?: string;
  $padding?: string;
  $margin?: string;
  $cursor?: boolean;
  $flexEnd?: boolean;
  $bold?: boolean;
};

const Component = styled.label<LabelStyleProps>`
  margin: ${({ $margin }) => ($margin ? ` ${$margin};` : '0px')};
  padding: ${({ $padding }) => ($padding ? ` ${$padding};` : '5px 0px')};
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
  font-size: ${({ fontSize }) => (fontSize ? ` ${fontSize};` : '14px')};
  font-weight: ${({ $bold }) => ($bold ? 'bold' : 'none')};
  ${({ $type }) => {
    if ($type === 'error') {
      return `color: ${COLOR.ERROR};`;
    }
    if ($type === 'navi') {
      return `color: ${COLOR.FONT_NAVI};`;
    } else {
      `color: ${COLOR.FONT_BLACK};`;
    }
  }};
  ${({ $flexEnd }) => $flexEnd && `display: flex; justify-content: flex-end;`}
  /* display: flex;
  justify-content: flex-end; */
  > label {
    cursor: ${({ $cursor }) => $cursor && 'pointer;'};
  }
`;
