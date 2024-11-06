import * as React from 'react';

import { styled } from 'styled-components';

import { COLOR } from '../../constants';

type ListItemProps = {
  ref?: React.RefObject<HTMLLIElement>;
  width?: string;
  height?: string;
  $margin?: string;
  $padding?: string;
  children: JSX.Element | JSX.Element[];
  isChecked: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  marginBottom?: string;
  columnTitle?: boolean;
};

export function ListItem({
  ref,
  width,
  height,
  $margin,
  $padding,
  children,
  isChecked,
  onClick,
  className,
  marginBottom,
  columnTitle,
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
      className={`${isChecked && 'on'} ${className}`}
      width={width}
      height={height}
      $margin={$margin}
      ref={ref}
      $marginBottom={marginBottom}
    >
      <Wrapper
        className={`${isChecked && 'on'}`}
        onClick={handleClick}
        $padding={$padding}
        $columnTitle={columnTitle}
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
  $marginBottom?: string;
};

const Component = styled.li<ListItemStyleProps>`
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
  height: ${({ height }) => (height ? ` ${height};` : '100%')};
  margin: ${({ $margin }) => ($margin ? `${$margin};` : '0')};
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border: 1px solid ${COLOR.BORDER_GRAY};
  border-radius: 10px;
  margin-bottom: ${({ $marginBottom }) =>
    $marginBottom ? `${$marginBottom};` : '10px'};
  position: relative;
  font-size: 14px;

  &.on {
    border: 1px solid transparent;
  }
  //부트스트랩 커서 설정 초기화
  button {
    cursor: default;
  }
`;

const Wrapper = styled.button<{
  $padding?: string;
  $noCursor?: boolean;
  $columnTitle?: boolean;
}>`
  width: 100%;
  padding: ${({ $padding }) => ($padding ? `${$padding};` : '20px')};
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: none;
  background-color: white;
  color: ${COLOR.FONT_BLACK};

  ${({ $columnTitle }) =>
    $columnTitle &&
    `margin-bottom: 0px; background-color: ${COLOR.TABLE_GRAY};`}

  &.on {
    background-color: ${COLOR.SECONDARY};
    color: white;
  }
`;
