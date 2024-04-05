import * as React from 'react';
import { ChangeEvent, useEffect } from 'react';

import { styled } from 'styled-components';

import { COLOR } from '../../constants';

type InputProps = {
  type: 'text' | 'password';
  placeholder?: string;
  placeholderSize?: string;
  placeholderTextAlign?: boolean;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
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
  readOnly?: boolean;
  errorMessage?: boolean | string;
  successMessage?: boolean | string;
  innerRef?: React.Ref<HTMLInputElement>;
  maxLength?: number;
  minLength?: number;
};

export function Input({
  fontSize,
  type,
  disabled,
  placeholder,
  placeholderSize,
  placeholderTextAlign,
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
  successMessage,
  innerRef,
  maxLength,
  minLength,
  readOnly,
  onKeyUp,
}: InputProps) {
  useEffect(() => {}, [errorMessage]);
  return (
    <Warpper>
      <Component
        className={className}
        type={type}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        value={value}
        width={width}
        height={height}
        fontSize={fontSize}
        $padding={padding}
        $placeholderSize={placeholderSize}
        $placeholderTextAlign={placeholderTextAlign}
        $border={border}
        $borderRadius={borderradius}
        $borderBottom={borderbottom}
        $margin={margin}
        onClick={onClick}
        onChange={onChange}
        ref={innerRef}
        maxLength={maxLength}
        minLength={minLength}
        onKeyUp={onKeyUp}
      ></Component>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
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
  $placeholderTextAlign?: boolean;
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
  text-overflow: ellipsis;
  ${({ $placeholderTextAlign }) =>
    $placeholderTextAlign && ' text-align: center;'};
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
        ? `border: none; border-bottom: 1px solid ${COLOR.BORDER_GRAY};`
        : 'border: none;'}
  ${({ $borderBottom }) =>
    $borderBottom && `border: none; border-bottom: 1px solid ${COLOR.ERROR};`};
  &::placeholder {
    ${({ $placeholderSize }) =>
      $placeholderSize ? `font-size: ${$placeholderSize};` : '16px;'};
    ${({ $placeholderTextAlign }) =>
      $placeholderTextAlign && ' text-align: center;'};
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
const SuccessMessage = styled.p`
  color: ${COLOR.SUCCESS};
  font-size: 12px;
`;
