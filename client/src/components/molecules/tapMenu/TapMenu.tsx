import * as React from 'react';
import { useState } from 'react';

import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';

import { pageAtom } from '../../../store/utilAtom';
import { COLOR } from '../../constants';

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
  lineStyle?: boolean;
  onClickTab?: () => void;
};

type TabMenuProps = {
  menu?: MenuProps[];
  initialValue?: string;
  length: number;
  className?: string;
  setTabVeiw?: (value: string) => void;
  getTabList?: (value: string) => void;
  width?: string;
  height?: string;
  $margin?: string;
  lineStyle?: boolean;
  onClickTab?: () => void;
};

export function Tab({
  label,
  height,
  selected,
  value,
  onChange,
  className,
  lineStyle,
  onClickTab,
}: TabProps) {
  return (
    <TabButton
      height={height}
      $lineStyle={lineStyle}
      className={className}
      $active={value === selected}
      onClick={() => {
        onClickTab;
        onChange(value);
      }}
    >
      <ButtonText $lineStyle={lineStyle} $active={value === selected}>
        {label}
      </ButtonText>
    </TabButton>
  );
}

export function TabMenu({
  menu = [],
  initialValue = '',
  length,
  className,
  setTabVeiw,
  getTabList,
  width,
  height,
  $margin,
  lineStyle,
  onClickTab,
}: TabMenuProps) {
  const [page, setPage] = useRecoilState(pageAtom);
  const [selected, setSelected] = useState(initialValue);

  // 탭메뉴 클릭시 페이지네이션 초기화
  const changeTab = () => {
    setPage(1);
  };

  const handleChange = (value: string) => {
    setSelected(value);
    setTabVeiw && setTabVeiw(value);
    getTabList && getTabList(value);
  };

  return (
    <Component
      $length={length}
      width={width}
      $margin={$margin}
      onClick={changeTab}
    >
      {menu.map(({ label, value }: MenuProps) => (
        <Tab
          className={className}
          key={`${value}+${label}`}
          label={label}
          selected={selected}
          value={value}
          onChange={handleChange}
          height={height}
          lineStyle={lineStyle}
          onClickTab={onClickTab}
        />
      ))}
    </Component>
  );
}

type TabStyleProps = {
  height?: string;
  $active: boolean;
  $lineStyle?: boolean;
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
  transition: all 0.1s;

  ${({ $active }) =>
    $active
      ? `background-color: ${COLOR.PRIMARY}; `
      : `background-color: ${COLOR.GRAY};`}

  &:nth-of-type(1) {
    border-radius: 8px 0px 0 0;
  }
  &:last-child {
    border-radius: 0px 8px 0 0;
  }
  &:only-child {
    border-radius: 8px 8px 0 0;
  }

  ${({ $lineStyle }) => $lineStyle && `background: transparent; `}
  ${({ $lineStyle, $active }) =>
    $lineStyle && $active
      ? `border-bottom: 2px solid ${COLOR.PRIMARY};`
      : `border-bottom: 2px solid transparent;`}
`;
const ButtonText = styled.span<{ $active: boolean; $lineStyle?: boolean }>`
  font-size: 14px;
  font-weight: bold;

  ${({ $lineStyle, $active }) =>
    $lineStyle
      ? $active
        ? `color:${COLOR.PRIMARY}`
        : `color:${COLOR.GRAY}`
      : `color: #fff;`}
`;

const Component = styled.div<{
  $length: number;
  width?: string;
  $margin?: string;
}>`
  margin: ${({ $margin }) => ($margin ? `${$margin};` : '0')};
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
  display: grid;
  ${({ $length }) =>
    `grid-template-columns: repeat(auto-fit, minmax( calc(100% / ${$length}), auto));`}
`;
