import * as React from 'react';
import { useState } from 'react';

import { styled } from 'styled-components';

import { Button } from '../../../components';
import { OptionsdepthProps } from '../../../components/contents/createcontent/options/OtionsSelect'; // TODO : 더미 데이터
import { COLOR } from '../../constants';

type ButtonFormatRadioProps = {
  list: any[]; //TODO : 임시타입
  titleText?: string;
  $margin?: string;
  defaultChecked?: boolean;
  checkedInput: { title: string; checkValue: string }[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  selected: string;
  key?: string;
};

export function ButtonFormatRadio({
  list,
  titleText,
  defaultChecked,
  $margin,
  onChange,
  selected,
  key,
}: ButtonFormatRadioProps) {
  return (
    <Component $margin={$margin} key={key}>
      {list.length !== 0 || list == null ? (
        <>
          {titleText && <strong>{titleText}</strong>}

          <ButtonFormatRadioList>
            {list.map((item) => (
              <li key={item.value}>
                <label htmlFor={item.value as string}>
                  <input
                    type="radio"
                    defaultChecked={defaultChecked}
                    name={item.label as string}
                    id={item.value as string}
                    value={item.value}
                    onChange={onChange}
                    checked={selected === item.value}
                    className={item.parentValue}
                  />
                  <span
                    className={`label ${selected === item.value ? 'on' : ''}`}
                  >
                    {item.label}
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
