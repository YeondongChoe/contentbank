import * as React from 'react';
import { useState } from 'react';

import { styled } from 'styled-components';

import { COLOR } from '../../../components/contents';

type MenuProps = {
  label: string;
  value: string;
};

type TabProps = {
  label: string;
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
  setTabValue?: (value: string) => void;
};

export function Tab({ label, selected, value, onChange, className }: TabProps) {
  return (
    <TabButton
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
  setTabValue,
}: TabMenuProps) {
  const [selected, setSelected] = useState(initialValue);

  const handleChange = (value: string) => {
    setSelected(value);
    setTabValue && setTabValue(value);
  };

  return (
    <Component length={length}>
      {menu.map(({ label, value }: MenuProps) => (
        <Tab
          className={className}
          key={value}
          label={label}
          selected={selected}
          value={value}
          onChange={handleChange}
        />
      ))}
    </Component>
  );
}

type TabStyleProps = {
  active: boolean;
  onClick: () => void;
};

const TabButton = styled.button<TabStyleProps>`
  align-items: center;
  border-bottom-style: solid;
  display: flex;
  height: 35px;
  justify-content: center;
  width: 100%;

  ${({ active }) =>
    active
      ? `border-bottom-color: ${COLOR.PRIMARY}; border-bottom-width: 2px; color: ${COLOR.PRIMARY};`
      : `border-bottom-color: #ededed; border-bottom-width: 1px; color: ${COLOR.TEXT_GRAY};`}
`;
const ButtonText = styled.span<{ active: boolean }>`
  font-size: 14px;

  ${({ active }) =>
    active
      ? `color: ${COLOR.PRIMARY}; font-weight: 500;`
      : `color: ${COLOR.TEXT_GRAY}; font-weight: normal`}
`;

const Component = styled.div<{ length: number }>`
  display: grid;
  ${({ length }) =>
    `grid-template-columns: repeat(auto-fit, minmax( calc(100% / ${length}), auto));`}
`;
