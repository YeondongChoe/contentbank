import * as React from 'react';

import { styled } from 'styled-components';

type LabelProps = {
  value: string;
  type?: 'error';
  width?: string;
  fontSize?: string;
};

export function Label({ type, value, fontSize, width }: LabelProps) {
  return (
    <Component $type={type} fontSize={fontSize} width={width}>
      <label>{value}</label>
    </Component>
  );
}

type LabelStyleProps = {
  width?: string;
  $type?: string;
  fontSize?: string;
};

const Component = styled.label<LabelStyleProps>`
  padding: 5px 0px;
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
  font-size: ${({ fontSize }) => (fontSize ? ` ${fontSize};` : '14px')};
  ${({ $type }) =>
    $type === 'error' ? 'color: #d32f2f;' : 'color: rgba(0, 0, 0, 0.6);'};
`;
