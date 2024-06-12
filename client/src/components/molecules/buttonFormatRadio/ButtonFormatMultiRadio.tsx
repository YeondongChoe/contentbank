import * as React from 'react';

import { styled } from 'styled-components';

import { ItemCategoryType } from '../../../types';
import { COLOR } from '../../constants';

type ButtonFormatMultiRadioProps = {
  list: ItemCategoryType[];
  titleText?: string;
  $margin?: string;
  checkedInputs: { title: string; checkValue: number; code: string }[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selected: string[] | number[];
  branchValue?: string;
};

export function ButtonFormatMultiRadio({
  list,
  titleText,
  $margin,
  onChange,
  selected,
  branchValue,
}: ButtonFormatMultiRadioProps) {
  // console.log(list && list);
  // console.log(selected && selected);

  const isSelected = (itemIdx: number) =>
    selected.some((item) => item == itemIdx);

  return (
    <Component $margin={$margin}>
      {list && list.length !== 0 ? (
        <>
          {titleText && <strong>{titleText}</strong>}

          <ButtonFormatMultiSelectList>
            {list.map((item: ItemCategoryType) => (
              <li key={`${item.idx} ${item?.name} ${item.code}`}>
                <label
                  htmlFor={
                    branchValue
                      ? `${branchValue}_${item.idx.toString()}`
                      : item.idx.toString()
                  }
                >
                  <input
                    type="checkbox"
                    name={item?.name as string}
                    id={
                      branchValue
                        ? `${branchValue}_${item.idx.toString()}`
                        : item.idx.toString()
                    }
                    value={item.idx.toString()}
                    onChange={onChange}
                    checked={isSelected(item.idx)}
                    className={item.code}
                  />
                  <span className={`label ${isSelected(item.idx) ? 'on' : ''}`}>
                    {item?.name}
                  </span>
                </label>
              </li>
            ))}
          </ButtonFormatMultiSelectList>
        </>
      ) : (
        <></>
      )}
    </Component>
  );
}

type ButtonFormatMultiRadioListStyleProps = {
  width?: string;
  height?: string;
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

const ButtonFormatMultiSelectList = styled.ul<ButtonFormatMultiRadioListStyleProps>`
  display: flex;
  flex-wrap: wrap;
  flex: 1 0 0;
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
