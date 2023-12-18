import * as React from 'react';
import { useState } from 'react';

import { IoMdArrowDropdown } from 'react-icons/io';
import { styled } from 'styled-components';

import { COLOR } from '../../../components/contents';
import { IconButton } from '../button';

type OptionsProps = {
  id?: string;
  label: string;
  value?: number | string;
  code?: string;
};

type SelectProps = {
  options?: OptionsProps[];
  onSelect: (event: React.MouseEvent<HTMLButtonElement>) => void;
  defaultValue?: null | string;
  width?: string;
  height?: string;
  children?: string;
  // setSelected?: (e: any) => void;
  // setAuthorityCode?: (e: any) => void;
};

export function Select({
  options,
  onSelect,
  defaultValue,
  width,
  height = '40px', // setSelected, // setAuthorityCode,
}: SelectProps) {
  const [isOptionShow, setIsOptionShow] = useState(false);
  const [selected, setSelected] = useState<string>();

  return (
    <Component
      onMouseLeave={() => {
        setIsOptionShow(false);
      }}
    >
      <IconButton
        width={width}
        height={height}
        fontSize="14px"
        onClick={() => setIsOptionShow(true)}
        textAlign="left"
        rightIconSrc={React.createElement(IoMdArrowDropdown)}
      >
        {selected || defaultValue}
      </IconButton>
      {isOptionShow && (
        <SelectOptionsList
          onClick={() => setIsOptionShow(false)}
          onMouseLeave={() => {
            setIsOptionShow(false);
          }}
        >
          {options?.map((el) => (
            <li key={el.id}>
              <button
                value={el.label}
                onClick={(event) => {
                  onSelect(event), setSelected(event.currentTarget.value);
                }}
              >
                <span>{el.label}</span>
              </button>
            </li>
          ))}
        </SelectOptionsList>
      )}
    </Component>
  );
}

const Component = styled.div<{ height?: string }>`
  position: relative;
`;
const SelectOptionsList = styled.ul`
  padding-top: 5px;
  position: absolute;
  top: 40px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  width: 100%;
  height: 100%;

  li {
    width: 100%;
    border-left: 1px solid ${COLOR.LIGHT_GRAY};
    border-right: 1px solid ${COLOR.LIGHT_GRAY};
    border-bottom: 1px solid ${COLOR.LIGHT_GRAY};
    background-color: #fff;
    &:hover {
      background-color: ${COLOR.HOVER};
    }
  }

  li > button {
    width: 100%;
    height: 100%;
    font-size: 14px;
    padding: 10px;
    border: none;
    background-color: transparent;

    span {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.2;
      text-align: left;
    }
  }

  li:first-child {
    border-top: 1px solid ${COLOR.LIGHT_GRAY};
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  li:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;
