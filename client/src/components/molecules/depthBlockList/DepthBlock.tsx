import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { styled } from 'styled-components';

import { COLOR } from '../../constants';

type DepthBlockProps = {
  children: JSX.Element | JSX.Element[];
  $margin?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  classNameList: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  id: string | number;
  name: string;
  value: string | number;
  level?: number;
  checked: boolean;
  searchValue?: string;
  branchValue?: string;
  highlightText?: (text: string, searchValue: string) => JSX.Element | string;
};

export function DepthBlock({
  children,
  $margin,
  onChange,
  classNameList = '',
  defaultChecked,
  id,
  name,
  value,
  checked: initialChecked,
  disabled,
  searchValue,
  branchValue,
  highlightText,
  level,
}: DepthBlockProps) {
  const [isChecked, setIsChecked] = useState(initialChecked);

  useEffect(() => {
    setIsChecked(initialChecked);
  }, [initialChecked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    console.log(e.currentTarget.parentElement?.children[1].classList[3]);
    setIsChecked(checked);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Component $margin={$margin}>
      <label
        htmlFor={branchValue ? `${branchValue}_${String(id)}` : String(id)}
      >
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          name={name}
          id={branchValue ? `${branchValue}_${String(id)}` : String(id)}
          value={value}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
        />

        <span
          className={`label content depthButton ${classNameList} ${isChecked ? 'on' : ''}`}
        >
          {isChecked ? (
            <svg
              width={10}
              height={10}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="10"
                cy="10"
                r="9.5"
                fill="white"
                stroke={`${COLOR.FONT_NAVI}`}
              />
              <path
                d="M16 6.84116L8.45714 14L5 10.7189L5.88629 9.8777L8.45714 12.3117L15.1137 6L16 6.84116Z"
                fill={`${COLOR.FONT_NAVI}`}
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
          {searchValue && highlightText
            ? highlightText(name, searchValue)
            : children}
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

  .current {
    border: 2px solid ${COLOR.ALERTBAR_SUCCESS};
  }

  > label {
    position: relative;
    display: flex;

    input[type='checkbox'] {
      transform: translateY(3px);
      appearance: none;
    }

    .label {
      display: flex;
      /* align-items: center; */
      cursor: pointer;
      flex-wrap: wrap;
      flex-direction: row;
      > svg {
        margin-right: 5px;
        margin-top: 3px;
      }
      > span {
        width: calc(100% - 15px);
        display: inline-block;
      }
    }

    .highlight {
      display: inline-block;
      background-color: ${COLOR.ALERTBAR_WARNING};
      color: ${COLOR.PRIMARY};
    }
  }

  .depthButton {
    border: none;
    text-align: left;
    text-overflow: ellipsis;
    display: flex;
    font-size: 13px;
    padding: 6px 10px;
    border-radius: 5px;
    flex: 1 0 0;
    background-color: ${COLOR.LIGHT_GRAY};

    &.on {
      background-color: ${COLOR.FONT_NAVI};
      color: #fff;
    }

    &.border {
      border: 1px solid ${COLOR.BORDER_BLUE};
    }
  }

  .depth-0 {
    margin-left: 0px;
    margin-right: 5rem;
  }

  .depth-1 {
    margin-left: 1rem;
    margin-right: 4rem;
  }

  .depth-2 {
    margin-left: 2rem;
    margin-right: 3rem;
  }

  .depth-3 {
    margin-left: 3rem;
    margin-right: 2rem;
  }

  .depth-4 {
    margin-left: 4rem;
    margin-right: 1rem;
  }

  .depth-5 {
    margin-left: 5rem;
  }

  .depth-6 {
    margin-left: 6rem;
  }

  .depth-7 {
    margin-left: 7rem;
  }

  .depth-8 {
    margin-left: 8rem;
  }
`;
