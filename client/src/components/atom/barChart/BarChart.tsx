import * as React from 'react';

import { styled } from 'styled-components';

import { COLOR } from '../../constants';

type DataProps = {
  value: number;
  label: string;
};

type BarChartProps = {
  data: DataProps[];
};

export function BarChart({ data }: BarChartProps) {
  return (
    <Component>
      {data.map(({ value, label }: DataProps) => (
        <div key={label}>
          <label>{value}개</label>
          <Bar height={value} />
          <label>{label}</label>
        </div>
      ))}
    </Component>
  );
}

type BarStyleProps = {
  height: number;
};

const Component = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  label {
    display: flex;
    justify-content: center;
    font-size: 12px;
  }
`;

const Bar = styled.div<BarStyleProps>`
  height: ${({ height }) => (height ? ` ${height}px;` : '0px')};
  width: 30px;
  background-color: ${COLOR.BLUEGREEN};
  margin: 5px 0px;
`;
