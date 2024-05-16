import * as React from 'react';

import { styled } from 'styled-components';

import { COLOR } from '../../constants';

type ListItemProps = {
  // onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  // onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  width?: string;
  height?: string;
  $margin?: string;
  $padding?: string;
  children: JSX.Element | JSX.Element[];
  key: string;
  isChecked: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export function ListItem({
  width,
  height,
  $margin,
  $padding,
  children,
  key,
  isChecked,
  onClick,
}: ListItemProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // 클릭된 요소가 SVG 또는 이미지인 경우 이벤트 전파 중지
    const targetNodeName = (event.target as HTMLElement).nodeName;
    if (targetNodeName === 'svg' || targetNodeName === 'path') {
      event.stopPropagation();
    } else if (onClick) {
      // 그 외의 경우는 onClick 핸들러 실행
      onClick(event);
    }
  };

  return (
    <Component
      className={`${isChecked && 'on'}`}
      width={width}
      height={height}
      $margin={$margin}
      key={key}
    >
      <Wrapper
        className={`${isChecked && 'on'}`}
        onClick={handleClick}
        type="button"
        $padding={$padding}
      >
        {children}
      </Wrapper>
    </Component>
  );
}

type ListItemStyleProps = {
  width?: string;
  height?: string;
  $margin?: string;
};

const Component = styled.li<ListItemStyleProps>`
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
  height: ${({ height }) => (height ? ` ${height};` : '100%')};
  margin: ${({ $margin }) => ($margin ? `${$margin};` : '0')};
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  /* min-height: 40px; */
  border: 1px solid ${COLOR.BORDER_GRAY};
  border-radius: 10px;
  margin-bottom: 10px;
  position: relative;

  &.on {
    border: 1px solid transparent;
  }
`;

const Wrapper = styled.button<{ $padding?: string }>`
  width: 100%;
  padding: ${({ $padding }) => ($padding ? `${$padding};` : '20px')};
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: none;
  background-color: white;
  color: ${COLOR.FONT_BLACK};
  cursor: pointer;

  &.on {
    background-color: ${COLOR.SECONDARY};
    color: white;
  }
`;
