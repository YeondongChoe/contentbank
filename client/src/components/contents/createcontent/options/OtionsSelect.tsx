import * as React from 'react';
import { useState } from 'react';

import { IoMdArrowDropdown } from 'react-icons/io';
import { styled } from 'styled-components';

import { IconButton } from '../../../atom/button';
import { COLOR } from '../../../constants';

export type OptionsDepsProps = {
  id?: string | number;
  label: string;
  value?: number | string;
  code?: string;
  options?: OptionsProps[];
};

export type OptionsProps = {
  id?: string | number;
  label?: string;
  value?: number | string;
  code?: string;
  type?: string;
  inputValue?: string;
  dateValue?: string;
  options?: OptionsItemProps[];
};

export type OptionsItemProps = {
  id?: string | number;
  label?: string;
  value?: string | number;
  type?: string;
  inputValue?: string;
  dateValue?: string;
  options?: ItemProps[];
};

type ItemProps = {
  id?: string | number;
  label?: string;
  value?: string | number;
};

type SelectProps = {
  options?: OptionsDepsProps[];
  onClick?: () => void;
  onSelect: (
    event: React.MouseEvent<HTMLButtonElement>,
    code: string | undefined,
  ) => void;
  defaultValue?: null | string;
  width?: string;
  height?: string;
  children?: string;
  padding?: string;
  text?: string;
  top?: string;
  blackMode?: boolean;
  disabled?: boolean;
  selected: any;
  setSelected: any;
};

export function OtionsSelect({
  options,
  onClick,
  onSelect,
  defaultValue,
  width,
  height = '40px',
  padding,
  text,
  blackMode,
  disabled,
  selected,
  setSelected,
}: SelectProps) {
  const [isOptionShow, setIsOptionShow] = useState(false);
  const [select, setSelect] = useState<string>();
  React.useEffect(() => {
    setSelected(select);
  }, [select]);
  return (
    <Component
      $padding={padding}
      onMouseLeave={() => {
        setIsOptionShow(false);
      }}
      onClick={onClick}
    >
      <IconButton
        width={width}
        height={height}
        text={text}
        fontSize="14px"
        onClick={() => setIsOptionShow(true)}
        textAlign="left"
        rightIconSrc={React.createElement(IoMdArrowDropdown)}
        blackMode={blackMode}
      >
        {select || defaultValue}
      </IconButton>
      {isOptionShow && (
        <SelectOptionsList
          onClick={() => setIsOptionShow(false)}
          onMouseLeave={() => {
            setIsOptionShow(false);
          }}
          $top={height}
        >
          {options?.map((el) => (
            <li key={el.id}>
              <button
                disabled={disabled}
                value={el.label}
                onClick={(event) => {
                  onSelect(event, el.code),
                    setSelect(event.currentTarget.value);
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

const Component = styled.div<{ $padding?: string }>`
  position: relative;
  padding: ${({ $padding }) => ($padding ? `${$padding};` : '0px')};
`;
const SelectOptionsList = styled.ul<{ $top?: string }>`
  padding-top: 5px;
  position: absolute;
  top: ${({ $top }) => ($top ? `${$top};` : '40px')};
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
