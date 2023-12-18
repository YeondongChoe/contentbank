import * as React from 'react';
import { useState } from 'react';

import { IoMdArrowDropdown } from 'react-icons/io';
import { styled } from 'styled-components';

import { IconButton } from '../button';

type OptionsProps = {
  id?: string;
  label: string;
  value?: number | string;
  code?: string;
};

type SelectProps = {
  options?: OptionsProps[];
  onChange?: (e: any) => void;
  onClick?: () => void;
  defaultValue?: null | string;
  width?: string;
  height?: string;
  children?: string;
  selected?: string;
  setSelected?: (e: any) => void;
  setAuthorityCode?: (e: any) => void;
};

export function Select({
  options,
  onChange,
  onClick,
  defaultValue,
  width,
  height,
  selected,
  setSelected,
  setAuthorityCode,
}: SelectProps) {
  const [isOptionShow, setIsOptionShow] = useState(false);

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
        onChange={onChange}
        textAlign="left"
        rightIconSrc={React.createElement(IoMdArrowDropdown)}
        $borderRadius="4px"
      >
        {selected || defaultValue}
      </IconButton>
      {isOptionShow && (
        <ul
          onClick={() => setIsOptionShow(false)}
          onMouseLeave={() => {
            setIsOptionShow(false);
          }}
        >
          {options?.map((el) => (
            <li
              key={el.id}
              value={el.value}
              onClick={() => {
                onClick?.();
                setSelected?.(el.label);
                setAuthorityCode?.(el.code);
              }}
            >
              <span>{el.label}</span>
            </li>
          ))}
        </ul>
      )}
    </Component>
  );
}

const Component = styled.div`
  position: relative;
  height: 50px;
  ul {
    position: absolute;
    top: 40px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  li {
    background-color: white;
    font-size: 14px;
    border-left: 1px solid rgba(0, 0, 0, 0.23);
    border-right: 1px solid rgba(0, 0, 0, 0.23);
    border-bottom: 1px solid rgba(0, 0, 0, 0.23);
    list-style-type: none;
    padding: 10px;
    &:hover {
      background-color: #f4f7fe;
    }
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
    margin-top: 5px;
    border-top: 1px solid rgba(0, 0, 0, 0.23);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  li:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;
