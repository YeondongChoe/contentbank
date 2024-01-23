import * as React from 'react';
import { useState } from 'react';

import { styled, css } from 'styled-components';

import { COLOR } from '../../constants';

type CheckBoxProps = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  //onClick: () => void;
  onClick?: () => void;

  setIsEnabled?: React.Dispatch<React.SetStateAction<boolean>>;
  setCheckList?: React.Dispatch<React.SetStateAction<number[]>>;
  //checked: boolean;
};

export function CheckBox({
  isChecked,
  setIsChecked,
  onChange,
  onClick,
  setIsEnabled,
  setCheckList,
}: CheckBoxProps) {
  //const [isChecked, setIsChecked] = useState(false);

  // const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log('CheckBox onChange called');
  // };

  // const handleCheckboxChange = () => {
  //   const newChecked = !isChecked;
  //   onChange(newChecked);
  //   setIsChecked(newChecked);
  //   console.log(newChecked);
  // };

  return (
    <Component>
      {isChecked ? (
        <SvgWrapper>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
          >
            <circle cx="10" cy="10" r="9.5" fill="white" stroke="#A0A0A0" />
            <path
              d="M16 6.84116L8.45714 14L5 10.7189L5.88629 9.8777L8.45714 12.3117L15.1137 6L16 6.84116Z"
              fill="#4A4A4A"
            />
          </svg>
        </SvgWrapper>
      ) : (
        <SvgWrapper>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
          >
            <circle cx="10" cy="10" r="9.5" fill="white" stroke="#A0A0A0" />
          </svg>
        </SvgWrapper>
      )}
      {/* <CheckboxWrapper
        onChange={onChange}
        type="checkbox"
        $isChecked={isChecked}
      /> */}
      {/* <Check onClick={onClick} $isChecked={isChecked} /> */}
    </Component>
  );
}

const Component = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
`;
const SvgWrapper = styled.div`
  cursor: pointer;
`;
const CheckboxWrapper = styled.input<{ $isChecked?: boolean }>`
  //visibility: hidden;
  ${({ $isChecked }) =>
    $isChecked
      ? css`
          background-color: #66bb6a;
          border-color: #66bb6a;
          &:after {
            opacity: 1;
          }
        `
      : null}
`;

const Check = styled.label<{ $isChecked: boolean }>`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  width: 20px;
  height: 20px;
  position: absolute;
  left: 0;
  top: 0;

  ${({ $isChecked }) =>
    $isChecked
      ? css`
          background-color: #fff;
          border-color: #a0a0a0;
          &:after {
            border: 1px solid #4a4a4a;
            border-top: none;
            border-right: none;
            content: '';
            height: 5px;
            left: 3px;
            position: absolute;
            top: 4px;
            transform: rotate(-45deg);
            width: 11px;
          }
        `
      : css`
          background-color: #fff !important;
          &:after {
            opacity: 1;
          }
        `}
`;
