import * as React from 'react';

import { styled } from 'styled-components';

type OptionsProps = {
  id?: string;
  label: string;
  value: number | string;
};

type SelectOption = {
  sort?: string;
  label: string;
  selectValue: number | string;
};

type SelectProps = {
  options: OptionsProps[];
  onChange?: (x: any) => void;
  value?: number | string;
  width?: number;
  height?: number;
  margin?: number;
  padding?: number;
  iconName?: string;
  iconWidth?: number;
  iconHeight?: number;
  className?: string;
};

export function Select({ options, onChange, value, ...props }: SelectProps) {
  return (
    <>
      <Component {...props}>
        <select onChange={onChange} value={value}>
          {options.map(({ id, value, label }) => (
            <option key={id} value={value}>
              {label}
            </option>
          ))}
        </select>
      </Component>
    </>
  );
}

type SelectStyleProps = {
  width?: number;
  height?: number;
  margin?: number;
  padding?: number;
  iconName?: string;
  iconWidth?: number;
  iconHeight?: number;
};

const Component = styled.div<SelectStyleProps>`
  select {
    border: 1px solid rgba(0, 0, 0, 0.23);
    color: rgba(0, 0, 0, 0.54);
    border-radius: 5px;
    font-size: 14px;
    height: 40px;
    padding: 0 10px;
    width: 120px;
    text-overflow: ellipsis;
    &:focus {
      outline: none;
      border: 2px solid rgba(25, 118, 210);
    }
  }
`;
