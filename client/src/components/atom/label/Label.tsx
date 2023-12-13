import * as React from 'react';

import { styled } from 'styled-components';

type LabelProps = {
  type?: 'error';
  width?: string;
  value: string;
  fontSize: string;
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
  fontSize: string;
};

const Component = styled.label<LabelStyleProps>`
  margin: 5px 0px;
  ${({ width }) => width && `width: ${width}px;`};
  ${({ fontSize }) => fontSize && `font-size: ${fontSize}px;`};
  ${({ $type }) =>
    $type === 'error' ? 'color: #d32f2f;' : 'color: rgba(0, 0, 0, 0.6);'};
`;
