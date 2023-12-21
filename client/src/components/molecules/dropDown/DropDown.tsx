import * as React from 'react';
import { useState } from 'react';

import { styled } from 'styled-components';

import { Button } from '../../../components';
import { COLOR } from '../../constants';

export type DropDownItemProps = {
  key: string;
  title: string;
  onClick: () => void;
};

type DropDownProps = {
  list: DropDownItemProps[];
  buttonText: string;
  width?: string;
  height?: string;
  buttonWidth?: string;
  buttonHeight?: string;
  showDropDown: boolean;
  setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
};

export function DropDown({
  showDropDown,
  setShowDropDown,
  list,
  buttonText,
  width,
  height,
  buttonWidth = '100px',
  buttonHeight = '35px',
}: DropDownProps) {
  return (
    <Component>
      <Button
        width={buttonWidth}
        height={buttonHeight}
        fontSize="14px"
        $border
        onClick={() => setShowDropDown(!showDropDown)}
        disabled={false}
      >
        {buttonText}
      </Button>
      {showDropDown && (
        <DropDownList
          width={width}
          height={height}
          onMouseLeave={() => setShowDropDown(false)}
        >
          {list.map((item) => (
            <li key={item.key}>
              <button onClick={item.onClick}>{item.title}</button>
            </li>
          ))}
        </DropDownList>
      )}
    </Component>
  );
}

type DropDownListStyleProps = {
  width?: string;
  height?: string;
};

const Component = styled.div`
  position: relative;
`;

const DropDownList = styled.ul<DropDownListStyleProps>`
  width: ${({ width }) => (width ? ` ${width};` : '120px')};
  position: absolute;
  top: 38px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border: 1px solid ${COLOR.SECONDARY};
  border-radius: 5px;
  overflow: hidden;

  li {
    width: 100%;
    height: ${({ height }) => (height ? ` ${height};` : '35px')};
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      font-size: 14px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border: none;
      background-color: #fff;
      color: ${COLOR.GRAY};
      transition: all 0.1s;

      &:hover {
        background-color: ${COLOR.HOVER};
        color: ${COLOR.PRIMARY};
      }
    }
  }
`;
