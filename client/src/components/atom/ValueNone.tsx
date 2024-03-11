import * as React from 'react';

import { RxValueNone } from 'react-icons/rx';
import { styled } from 'styled-components';

import { COLOR } from '../constants';

type ValueNoneProps = {
  width?: string;
  height?: string;
};

export function ValueNone({ width, height }: ValueNoneProps) {
  return (
    <Component width={width} height={height}>
      <RxValueNone color={`${COLOR.PRIMARY}`} size={40} />
      <p>해당 데이터는 없습니다</p>
    </Component>
  );
}

type ValueNoneStyleProps = {
  width?: string;
  height?: string;
};

const Component = styled.div<ValueNoneStyleProps>`
  width: ${({ width }) => (width ? ` ${width}` : `100%`)};
  height: ${({ height }) => (height ? ` ${height}` : `100%`)};
  background-color: transparent;
  display: flex;
  align-items: center;
  flex-direction: column;

  p {
    padding: 20px;
    font-size: 16px;
    font-weight: bold;
    width: 100%;
    text-align: center;
    color: ${COLOR.SECONDARY};
  }
`;
