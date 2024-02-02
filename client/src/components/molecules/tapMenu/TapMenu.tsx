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

type TabMenuProps = {
  menu?: MenuProps[];
  length: number;
  className?: string;
  selected: string;
  setTabVeiw?: (value: string) => void;
  getTabList?: (value: string) => void;
  width?: string;
  height?: string;
  $margin?: string;
  lineStyle?: boolean;
  onClickTab?: () => void;
};

export function TabMenu({
  menu = [],
  length,
  className,
  selected,
  setTabVeiw,
  getTabList,
  width,
  height,
  $margin,
  lineStyle,
  onClickTab,
}: TabMenuProps) {
  const [page, setPage] = useRecoilState(pageAtom);

  // 탭메뉴 클릭시 페이지네이션 초기화
  const changeTab = () => {
    setPage(1);
  };

  const handleChange = (value: string) => {
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
          selected={selected as string}
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
  /* border-bottom-style: solid; */
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
      : `background-color: transparent;`}

  ${({ $lineStyle }) => $lineStyle && `background: transparent;`}
  ${({ $lineStyle }) =>
    $lineStyle ? 'border-radius: 0px; ' : 'border-radius: 10px;'}


  ${({ $lineStyle, $active }) =>
    $lineStyle && $active
      ? `border-bottom: 2px solid ${COLOR.PRIMARY};`
      : `border-bottom: 2px solid transparent;`}
`;
const ButtonText = styled.span<{ $active: boolean; $lineStyle?: boolean }>`
  font-size: 14px;
  ${({ $active, $lineStyle }) => $active && $lineStyle && 'font-weight: bold;'}
  ${({ $lineStyle }) => !$lineStyle && 'font-weight: bold'};
  ${({ $active, $lineStyle }) =>
    $active && !$lineStyle ? 'color: #fff;' : `color:${COLOR.FONT_BLACK}`}
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
