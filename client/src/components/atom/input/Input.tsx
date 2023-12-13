import * as React from 'react';

import { styled } from 'styled-components';

type InputProps = {
  type: 'text' | 'password';
  placeholder?: string;
  placeholderSize?: string;
  value?: string;
  onChange: (event: any) => void;
  onClick?: () => void;
  padding?: string;
  width: string;
  height?: string;
  fontSize: string;
  className?: string;
  border?: string;
  borderradius?: string;
  borderbottom?: boolean;
  marginBottom?: string;
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
  marginBottom,
  errorMessage,
  innerRef,
}: InputProps) {
  return (
    <>
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
        $marginBottom={marginBottom}
        onClick={onClick}
        onChange={onChange}
        ref={innerRef}
      ></Component>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </>
  );
}

type InputStyleProps = {
  width: string;
  height?: string;
  fontSize: string;
  $border?: string;
  $borderBottom?: boolean;
  $padding?: string;
  $borderRadius?: string;
  $placeholderSize?: string;
  $marginBottom?: string;
  disabled?: boolean;
};

const Component = styled.input<InputStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ width }) => width && `width: ${width}px;`};
  ${({ height }) => height && `height: ${height}px;`};
  ${({ disabled }) => disabled && 'opacity: 0.5;'};
  ${({ fontSize }) => fontSize && `font-size: ${fontSize}px;`};
  ${({ $padding }) => $padding && `padding: ${$padding}px;`};
  ${({ $marginBottom }) =>
    $marginBottom && `margin-bottom: ${$marginBottom}px;`};
  ${({ $borderRadius }) =>
    $borderRadius && `border-radius: ${$borderRadius}px;`};
  ${(props) =>
    props.$border === 'normal'
      ? 'border: 1px solid #e9ecef;'
      : props.$border === 'black'
      ? 'border: none; border-bottom: 1px solid black;'
      : 'border: none;'}
  ${({ $borderBottom }) =>
    $borderBottom && 'border: none; border-bottom: 1px solid #d32f2f;'};
  &::placeholder {
    ${({ $placeholderSize }) =>
      $placeholderSize ? `font-size: ${$placeholderSize}px;` : '16px;'};
  }
  &.success {
    border-color: green;
  }
  &.passwordMatch {
    border-color: green;
  }
`;
const ErrorMessage = styled.p`
  color: #d32f2f;
  font-size: 12px;
`;
