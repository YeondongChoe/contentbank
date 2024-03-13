import * as React from 'react';

import { styled } from 'styled-components';

import { COLOR } from '../../../components/constants';

type CheckboxProps = {
  defaultChecked?: boolean;
  id: string;
  name?: string;
  value: any;
  onClick?: (value: string) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  $margin?: string;
  marginLeft?: number;
  checkRound?: boolean;
  label?: string;
  lineHeight?: number;
  fontSize?: number;
  textMarginLeft?: number;
  fullWidth?: boolean;
  iconWidth?: number;
  iconHeight?: number;
  disabled?: boolean;
  width?: string;
  height?: string;
  readOnly?: boolean;
};

export const CheckBoxI = ({
  defaultChecked,
  id,
  name,
  value,
  checked,
  onClick,
  onChange,
  $margin,
  marginLeft,
  label,
  lineHeight,
  fontSize,
  textMarginLeft,
  fullWidth,
  iconWidth,
  iconHeight,
  disabled,
  width,
  height,
  ...props
}: CheckboxProps) => {
  return (
    <Component
      $margin={$margin}
      textMarginLeft={textMarginLeft}
      fontSize={fontSize}
      lineHeight={lineHeight}
      marginLeft={marginLeft}
      fullWidth={fullWidth}
      iconWidth={iconWidth}
      iconHeight={iconHeight}
      disabled={disabled}
      onClick={() => onClick && onClick(value)}
      {...props}
    >
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
          {...props}
        />

        <span className="label">
          {checked ? (
            <svg
              width={width || '20'}
              height={height || '20'}
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
              width={width || '20'}
              height={height || '20'}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="9.5" fill="white" stroke="#A0A0A0" />
            </svg>
          )}
        </span>
      </label>
    </Component>
  );
};

type ComponentProps = {
  $margin?: string;
  marginLeft?: number;
  checkRound?: boolean;
  lineHeight?: number;
  fontSize?: number;
  textMarginLeft?: number;
  fullWidth?: boolean;
  iconWidth?: number;
  iconHeight?: number;
  disabled?: boolean;
};

const Component = styled.span<ComponentProps>`
  ${({ fullWidth }) => fullWidth && `display: block;`}
  margin: ${({ $margin }) => $margin || '0px'};
  margin-left: ${({ marginLeft }) => marginLeft || 0}px;

  label {
    position: relative;

    input[type='checkbox'] {
      transform: translateY(3px);
      appearance: none;
    }

    .label {
      cursor: pointer;
    }
  }
`;
