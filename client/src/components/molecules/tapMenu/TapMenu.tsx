import * as React from 'react';
import { useState } from 'react';

import { styled } from 'styled-components';

import { COLOR } from '../../../components/contents';

export type MenuProps = {
  label: string;
  value: string;
};

type TabProps = {
  label: string;
  height?: string;
  selected: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

type TabMenuProps = {
  menu?: MenuProps[];
  initialValue?: string;
  length: number;
  className?: string;
  setTabVeiw?: (value: string) => void;
  width?: string;
  height?: string;
};

export function Tab({
  label,
  height,
  selected,
  value,
  onChange,
  className,
}: TabProps) {
  return (
    <TabButton
      height={height}
      className={className}
      active={value === selected}
      onClick={() => onChange(value)}
    >
      <ButtonText active={value === selected}>{label}</ButtonText>
    </TabButton>
  );
}

export function TabMenu({
  menu = [],
  initialValue = '',
  length,
  className,
  setTabVeiw,
  width,
  height,
}: TabMenuProps) {
  const [selected, setSelected] = useState(initialValue);

  const handleChange = (value: string) => {
    setSelected(value);
    setTabVeiw && setTabVeiw(value);
  };

  return (
    <Component length={length} width={width}>
      {menu.map(({ label, value }: MenuProps) => (
        <Tab
          className={className}
          key={value}
          label={label}
          selected={selected}
          value={value}
          onChange={handleChange}
          height={height}
        />
      ))}
    </Component>
  );
}

type TabStyleProps = {
  height?: string;
  active: boolean;
  onClick: () => void;
};

const TabButton = styled.button<TabStyleProps>`
  align-items: center;
  border-bottom-style: solid;
  display: flex;
  height: ${({ height }) => (height ? ` ${height};` : '40px')};
  justify-content: center;
  width: 100%;
  border: none;
  cursor: pointer;

  ${({ active }) =>
    active
      ? `background-color: ${COLOR.PRIMARY}; `
      : `background-color: ${COLOR.GRAY};`}

  &:nth-of-type(1) {
    border-radius: 8px 0 0 0;
  }
  &:last-child {
    border-radius: 0 8px 0 0;
  }
`;
const ButtonText = styled.span<{ active: boolean }>`
  font-size: 14px;
  color: #fff;
  font-weight: bold;
  /* ${({ active }) =>
    active ? `font-weight: bold;` : ` font-weight: normal`} */
`;

const Component = styled.div<{ length: number; width?: string }>`
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
  display: grid;
  ${({ length }) =>
    `grid-template-columns: repeat(auto-fit, minmax( calc(100% / ${length}), auto));`}
`;
