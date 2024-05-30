import * as React from 'react';

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
  checked: boolean;
  searchValue?: string;
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
  checked,
  disabled,
  searchValue,
}: DepthBlockProps) {
  const onTopMark = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const target = e.currentTarget;
    const parentElement = target.parentElement?.parentElement?.parentElement;

    if (!parentElement) return; // 상위 엘리먼트가 존재하지 않는 경우 조기 반환

    const depthTargets = Array.from(parentElement.children)
      .map((child) => {
        const inputElement = child.querySelector('input[type="checkbox"]');
        const element = child.children[0]?.children[1];
        return element
          ? {
              element: element as HTMLSpanElement,
              input: inputElement as HTMLInputElement,
            }
          : null;
      })
      .filter((el) => el !== null);

    const nextSibling = target.nextSibling as HTMLSpanElement;
    const depthClass = nextSibling.className.split(' ')[2];
    const depth = parseInt(depthClass.split('-')[1], 10);

    if (target.checked) {
      depthTargets.slice(0, depth).forEach((el) => {
        el?.element?.classList.add('border');

        if (el?.input) {
          el.input.defaultChecked = true;
        }
      });
    } else {
      depthTargets.forEach((el) => {
        el?.element?.classList.remove('border');
        if (el?.input) el.input.defaultChecked = false;
      });
    }
  };

  React.useEffect(() => {}, [onTopMark]);

  const highlightText = (text: string, searchValue: string) => {
    if (!searchValue) return text;
    const parts = text.split(new RegExp(`(${searchValue})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === searchValue.toLowerCase() ? (
            <Mark key={index}>{part}</Mark>
          ) : (
            part
          ),
        )}
      </span>
    );
  };

  return (
    <Component $margin={$margin}>
      <label htmlFor={String(id)}>
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          name={name}
          id={String(id)}
          value={value}
          checked={checked}
          onChange={onChange}
          onClick={(e) => {
            onTopMark(e);
          }}
          disabled={disabled}
        />

        <span
          className={`label depthButton ${classNameList} ${checked ? 'on' : ''}`}
        >
          {checked ? (
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
          {searchValue ? highlightText(name, searchValue) : children}
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
      /* align-items: center; */
      cursor: pointer;
      justify-content: space-between;
      flex-wrap: wrap;
      flex-direction: row;
      > svg {
        margin-right: 5px;
        margin-top: 3px;
      }
      > span {
        width: calc(100% - 15px);
        display: flex;
        flex-direction: row;
      }
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
`;

const Mark = styled.span`
  display: flex;
  background-color: ${COLOR.ALERTBAR_WARNING};
`;
