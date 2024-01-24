import * as React from 'react';

import { styled } from 'styled-components';

import { COLOR } from '../../../components/constants';

type LabelProps = {
  value: string;
  type?: 'error';
  width?: string;
  fontSize?: string;
  padding?: string;
  margin?: string;
  onClick?: () => void;
};

export function Label({
  type,
  value,
  fontSize,
  width,
  padding,
  margin,
  onClick,
}: LabelProps) {
  return (
    <Component
      $type={type}
      fontSize={fontSize}
      width={width}
      $padding={padding}
      $margin={margin}
      onClick={onClick}
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
};

const Component = styled.label<LabelStyleProps>`
  margin: ${({ $margin }) => ($margin ? ` ${$margin};` : '0px')};
  padding: ${({ $padding }) => ($padding ? ` ${$padding};` : '5px 0px')};
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
  font-size: ${({ fontSize }) => (fontSize ? ` ${fontSize};` : '14px')};
  ${({ $type }) =>
    $type === 'error'
      ? `color: ${COLOR.ERROR};`
      : `color: ${COLOR.FONT_BLACK};`};
`;
