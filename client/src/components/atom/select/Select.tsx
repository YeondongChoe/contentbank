import * as React from 'react';
import { useEffect, useState } from 'react';

import { IoMdArrowDropdown } from 'react-icons/io';
import { styled } from 'styled-components';

import { COLOR } from '../../constants';
import { IconButton } from '../button';

export type ItemSelectProps = {
  id?: string | number;
  label?: string;
  code?: string;
  value?: string | number;
};

type SelectProps = {
  options?: ItemSelectProps[];
  onClick?: () => void;
  onSelect?: (
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
  $positionTop?: boolean;
  setSelectedValue?: React.Dispatch<React.SetStateAction<string>>;
};

export function Select({
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
  $positionTop,
  setSelectedValue,
}: SelectProps) {
  const [isOptionShow, setIsOptionShow] = useState(false);
  const [selected, setSelected] = useState<string>();
  const [code, setCode] = useState<string>();

  if (setSelectedValue !== undefined && selected && code) {
    setSelectedValue(code);
  }

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
        <span>{selected || defaultValue}</span>
      </IconButton>
      {isOptionShow && (
        <SelectOptionsList
          onClick={() => setIsOptionShow(false)}
          onMouseLeave={() => {
            setIsOptionShow(false);
          }}
          $top={height}
          $positionTop={$positionTop}
          height={height}
        >
          {options?.map((el) => (
            <li key={el.id}>
              <button
                disabled={disabled}
                value={el.label}
                className={el.code}
                onClick={(event) => {
                  setSelected(event.currentTarget.value);
                  setCode(event.currentTarget.classList[0]);
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
const SelectOptionsList = styled.ul<{
  $top?: string;
  $positionTop?: boolean;
  height?: string;
}>`
  padding-top: 5px;
  position: absolute;
  top: ${({ $top }) => ($top ? `${$top};` : '40px')};
  margin-bottom: ${({ height, $positionTop }) =>
    height && $positionTop ? `${height};` : '0px'};
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  ${({ $positionTop }) =>
    $positionTop
      ? `top: auto; bottom: 0; left: 0; right: 0; padding-bottom: 5px;padding-top: 0;height: fit-content;`
      : ''};

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
