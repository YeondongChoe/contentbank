import * as React from 'react';
import { useState } from 'react';

import { IoMdArrowDropdown } from 'react-icons/io';
import { styled } from 'styled-components';

import { IconButton } from '../button';

type OptionsProps = {
  id?: string;
  label: string;
  value: number | string;
};

type SelectProps = {
  options?: OptionsProps[];
  onChange?: (x: any) => void;
  value?: string;
  defaultValue?: string;
  width?: number;
  height?: number;
  margin?: number;
  padding?: number;
  iconName?: string;
  iconWidth?: number;
  iconHeight?: number;
  className?: string;
};

export function Select({
  options,
  onChange,
  value,
  defaultValue,
  ...props
}: SelectProps) {
  const [isOptionShow, setIsOptionShow] = useState(false);
  const [selected, setSelected] = useState<string | null>();

  const ClickButton = (e: React.MouseEvent<HTMLLIElement>) => {
    const clickedValue = e.currentTarget.getAttribute('label');
    console.log(clickedValue);
    setSelected(clickedValue);
  };

  return (
    <Component {...props}>
      <IconButton
        width="120px"
        height="40px"
        fontSize="14px"
        onClick={() => setIsOptionShow(true)}
        textAlign="left"
        rightIconSrc={React.createElement(IoMdArrowDropdown)}
      >
        {selected ||
          defaultValue ||
          (options && options.length > 0 ? options[0].label : '')}
      </IconButton>
      {isOptionShow && (
        <ul
          onClick={() => setIsOptionShow(false)}
          onMouseLeave={() => {
            setIsOptionShow(false);
          }}
        >
          {options?.map((el) => (
            <li key={el.id} value={el.value} onClick={ClickButton}>
              {el.label}
            </li>
          ))}
        </ul>
      )}
    </Component>
  );
}

type SelectStyleProps = {
  width?: number;
  height?: number;
  margin?: number;
  padding?: number;
};

const Component = styled.div<SelectStyleProps>`
  width: 120px;
  height: 40px;
  z-index: 99;
  ul {
    position: relative;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  li {
    width: 120px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    font-size: 14px;
    border-left: 1px solid rgba(0, 0, 0, 0.23);
    border-right: 1px solid rgba(0, 0, 0, 0.23);
    border-bottom: 1px solid rgba(0, 0, 0, 0.23);
    list-style-type: none;
    &:hover {
      background-color: #f4f7fe;
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
