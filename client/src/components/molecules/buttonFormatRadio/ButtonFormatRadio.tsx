import * as React from 'react';
import { useState } from 'react';

import { styled } from 'styled-components';

import { Button } from '../../../components';
import { OptionsDepsProps } from '../../../components/contents/createcontent/options/OtionsSelect'; // TODO : 더미 데이터
import { COLOR } from '../../constants';

type ButtonFormatRadioProps = {
  list: OptionsDepsProps[];
  titleText?: string;
  $margin?: string;
  defaultChecked?: boolean;
  checkedInput: { title: string; checkValue: string }[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export function ButtonFormatRadio({
  onChange,
  list,
  titleText,
  defaultChecked,
  checkedInput,
  $margin,
}: ButtonFormatRadioProps) {
  const handleCheck = (parentValue: string, value: string) => {
    const checkValue = checkedInput.filter(
      (meta) => meta.title === parentValue,
    );
    // if()
    return false;
  };
  return (
    <Component $margin={$margin}>
      {list.length !== 0 || list == null ? (
        <>
          {titleText && <strong>{titleText}</strong>}

          <ButtonFormatRadioList>
            {list.map((item) => (
              <li key={item.label}>
                <label htmlFor={item.label as string}>
                  <input
                    type="radio"
                    defaultChecked={defaultChecked}
                    name={item.label as string}
                    id={item.label as string}
                    value={item.label}
                    onChange={onChange}
                    checked={handleCheck(
                      item.parentValue as string,
                      item.label,
                    )}
                    className={item.parentValue}
                  />
                  <span
                    className={`label ${
                      handleCheck(item.parentValue as string, item.label)
                        ? 'on'
                        : ''
                    }`}
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

  input {
    appearance: none;
  }
  li {
    padding: 2px;
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
