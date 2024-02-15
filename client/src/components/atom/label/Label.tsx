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
  onClick?: () => void;
  cursor?: boolean;
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
};

const Component = styled.label<LabelStyleProps>`
  margin: ${({ $margin }) => ($margin ? ` ${$margin};` : '0px')};
  padding: ${({ $padding }) => ($padding ? ` ${$padding};` : '5px 0px')};
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
  font-size: ${({ fontSize }) => (fontSize ? ` ${fontSize};` : '14px')};
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
  > label {
    cursor: ${({ $cursor }) => $cursor && 'pointer;'};
  }
`;
