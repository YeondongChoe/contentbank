import * as React from 'react';
import { useState } from 'react';

import { styled } from 'styled-components';

import { ItemCategoryType } from '../../../types';
import { COLOR } from '../../constants';

type ButtonFormatRadioProps = {
  list: ItemCategoryType[];
  titleText?: string;
  $margin?: string;
  defaultChecked?: boolean;
  checkedInput?: { title: string; checkValue: number; code: string };
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  selected: string | number;
  branchValue?: string;
  overFlow?: boolean;
};

export function ButtonFormatRadio({
  list,
  titleText,
  defaultChecked,
  $margin,
  onChange,
  selected,
  branchValue,
  overFlow,
}: ButtonFormatRadioProps) {
  return (
    <Component $margin={$margin}>
      {list && list.length !== 0 ? (
        <>
          {titleText && <strong>{titleText}</strong>}

          <ButtonFormatRadioList $overFlow={overFlow}>
            {list.map((item: ItemCategoryType) => (
              <li key={`${item.idx} ${item.name} ${item.code}`}>
                <label
                  htmlFor={
                    branchValue
                      ? `${branchValue}_${item.idx.toString()}`
                      : item.idx.toString()
                  }
                >
                  <input
                    type="radio"
                    defaultChecked={defaultChecked}
                    name={item.name as string}
                    id={
                      branchValue
                        ? `${branchValue}_${item.idx.toString()}`
                        : item.idx.toString()
                    }
                    value={item.idx}
                    onChange={onChange}
                    checked={selected == item.idx}
                    className={item.code}
                  />
                  <span
                    className={`label ${
                      selected == item.idx.toString() ? 'on' : ''
                    }`}
                  >
                    {item.name}
                  </span>
                </label>
              </li>
            ))}
          </ButtonFormatRadioList>
        </>
      ) : (
        <></>
      )}
    </Component>
  );
}

type ButtonFormatRadioListStyleProps = {
  width?: string;
  height?: string;
  $overFlow?: boolean;
};

const Component = styled.div<{ $margin?: string }>`
  padding: 5px 10px;
  display: flex;
  flex-wrap: wrap;
  margin: ${({ $margin }) => $margin || '0px'};

  strong {
    font-size: 15px;
    padding: 6px 10px;
    display: flex;
    min-width: 50px;
    color: ${COLOR.FONT_BLACK};
  }
`;

const ButtonFormatRadioList = styled.ul<ButtonFormatRadioListStyleProps>`
  display: flex;
  flex-wrap: wrap;
  flex: 1 0 0;
  ${({ $overFlow }) =>
    $overFlow &&
    `
    overflow-y: auto;
    height: 100px;
  `}

  li {
    padding: 2px;
  }
  input {
    appearance: none;
  }

  label {
    display: flex;
  }
  .label {
    display: flex;
    cursor: pointer;
    padding: 5px 15px;
    border: 1px solid ${COLOR.BORDER_GRAY};
    background-color: #fff;
    font-size: 14px;
    font-weight: bold;
    color: ${COLOR.TEXT_GRAY};

    &.on {
      background-color: ${COLOR.PRIMARY};
      color: #fff;
    }
  }
`;
