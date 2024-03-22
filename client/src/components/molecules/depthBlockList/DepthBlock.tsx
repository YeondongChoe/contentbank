import * as React from 'react';
import { useState } from 'react';

import { styled } from 'styled-components';

import { Button, CheckBoxI } from '../..';
import { COLOR } from '../../constants';

type DepthBlockProps = {
  item: any; //TODO : 임시타입
  key?: any;
  children: JSX.Element | JSX.Element[];
  $margin?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  classNameList: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  id: string;
  name: string;
  value: string;
  checked: boolean;
};

export function DepthBlock({
  item,
  key,
  children,
  $margin,
  onChange,
  onClick,
  classNameList = '',
  defaultChecked,
  id,
  name,
  value,
  checked,
  disabled,
}: DepthBlockProps) {
  return (
    <Component $margin={$margin} key={key}>
      <label htmlFor={id}>
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          name={name}
          id={id}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />

        <span className={`label depthBlock ${classNameList}`}>
          {checked ? (
            <svg
              width={10}
              height={10}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="9.5" fill="white" stroke="#A0A0A0" />
              <path
                d="M16 6.84116L8.45714 14L5 10.7189L5.88629 9.8777L8.45714 12.3117L15.1137 6L16 6.84116Z"
                fill="#4A4A4A"
              />
            </svg>
          ) : (
            <svg
              width={10}
              height={10}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="9.5" fill="white" stroke="#A0A0A0" />
            </svg>
          )}
          {children}
        </span>
      </label>
    </Component>
  );
}

const Component = styled.div<{ $margin?: string }>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border: none;
  margin: ${({ $margin }) => $margin || '0px'};
  padding: 2px 10px;

  > label {
    position: relative;
    display: flex;

    input[type='checkbox'] {
      transform: translateY(3px);
      appearance: none;
    }

    .label {
      display: flex;
      align-items: center;
      cursor: pointer;
      > svg {
        margin-right: 5px;
      }
    }
  }

  .depthBlock {
    display: flex;
    font-size: 13px;
    padding: 6px 10px;
    border-radius: 5px;
    flex: 1 0 0;
    background-color: ${COLOR.LIGHT_GRAY};
  }

  .depth-0 {
    margin-left: 0px;
  }

  .depth-1 {
    margin-left: 20px;
  }

  .depth-2 {
    margin-left: 40px;
  }

  .depth-3 {
    margin-left: 60px;
  }

  .depth-4 {
    margin-left: 80px;
  }

  .depth-5 {
    margin-left: 100px;
  }
`;
