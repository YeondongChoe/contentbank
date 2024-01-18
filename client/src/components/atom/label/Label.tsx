import * as React from 'react';

import { styled } from 'styled-components';

type LabelProps = {
  value: string;
  type?: 'error';
  width?: string;
  fontSize?: string;
  padding?: string;
  margin?: string;
};

export function Label({
  type,
  value,
  fontSize,
  width,
  padding,
  margin,
}: LabelProps) {
  return (
    <Component
      $type={type}
      fontSize={fontSize}
      width={width}
      $padding={padding}
      $margin={margin}
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
  ${({ $type }) => ($type === 'error' ? 'color: #d32f2f;' : 'color: #8299D4;')};
`;
