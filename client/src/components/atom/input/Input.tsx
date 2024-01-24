import * as React from 'react';
import { ChangeEvent } from 'react';

import { styled } from 'styled-components';

import { COLOR } from '../../constants';

type InputProps = {
  type: 'text' | 'password';
  placeholder?: string;
  placeholderSize?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  padding?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  className?: string;
  border?: string;
  borderradius?: string;
  borderbottom?: boolean;
  margin?: string;
  disabled?: boolean;
  errorMessage?: boolean | string;
  innerRef?: React.Ref<HTMLInputElement>;
};

export function Input({
  fontSize,
  type,
  disabled,
  placeholder,
  placeholderSize,
  value,
  onChange,
  onClick,
  padding,
  width,
  height,
  className,
  border,
  borderradius,
  borderbottom,
  margin,
  errorMessage,
  innerRef,
}: InputProps) {
  return (
    <Warpper>
      <Component
        className={className}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        width={width}
        height={height}
        fontSize={fontSize}
        $padding={padding}
        $placeholderSize={placeholderSize}
        $border={border}
        $borderRadius={borderradius}
        $borderBottom={borderbottom}
        $margin={margin}
        onClick={onClick}
        onChange={onChange}
        ref={innerRef}
      ></Component>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Warpper>
  );
}

type InputStyleProps = {
  width?: string;
  height?: string;
  fontSize?: string;
  $border?: string;
  $borderBottom?: boolean;
  $padding?: string;
  $borderRadius?: string;
  $placeholderSize?: string;
  $margin?: string;
  disabled?: boolean;
};

const Warpper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Component = styled.input<InputStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
  height: ${({ height }) => (height ? ` ${height};` : '50px')};
  font-size: ${({ fontSize }) => (fontSize ? ` ${fontSize};` : '14px')};
  padding: ${({ $padding }) => ($padding ? `${$padding};` : '0px')};
  margin: ${({ $margin }) => ($margin ? `${$margin};` : '0')};
  border-radius: ${({ $borderRadius }) =>
    $borderRadius ? `${$borderRadius};` : '0px'};

  ${({ disabled }) => disabled && 'opacity: 0.5;'};
  ${(props) =>
    props.$border === 'normal'
      ? `border: 1px solid rgba(0, 0, 0, 0.23);`
      : props.$border === 'black'
      ? `border: none; border-bottom: 1px solid ${COLOR.BORDER_BLACK};`
      : 'border: none;'}
  ${({ $borderBottom }) =>
    $borderBottom && `border: none; border-bottom: 1px solid ${COLOR.ERROR};`};
  &::placeholder {
    ${({ $placeholderSize }) =>
      $placeholderSize ? `font-size: ${$placeholderSize};` : '16px;'};
  }
  &.success {
    border-color: ${COLOR.SUCCESS};
  }
  &.passwordMatch {
    border-color: ${COLOR.SUCCESS};
  }
`;
const ErrorMessage = styled.p`
  color: ${COLOR.ERROR};
  font-size: 12px;
`;
