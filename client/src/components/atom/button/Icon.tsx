import * as React from 'react';

import styled from 'styled-components';

type IconProps = {
  onClick?: () => void;
  src: any;
  $margin?: string;
  width?: string;
  height?: string;
  disabled?: boolean;
  cursor?: boolean;
};

export function Icon({
  onClick,
  src,
  $margin,
  width,
  height,
  disabled = false,
  cursor,
}: IconProps) {
  return (
    <Container
      type="button"
      onClick={onClick}
      width={width}
      height={height}
      $margin={$margin}
      disabled={disabled}
      cursor={cursor}
    >
      <Image src={src} loading="lazy" />
    </Container>
  );
}

const Container = styled.button<{
  width?: string;
  height?: string;
  $margin?: string;
  cursor?: boolean;
}>`
  border: none;
  background-color: transparent;
  margin: ${({ $margin }) => ($margin ? `${$margin};` : '0')};
  width: ${({ width }) => (width ? ` ${width};` : '22px')};
  height: ${({ height }) => (height ? ` ${height};` : '22px')};
  ${({ cursor }) => (cursor ? ` cursor: pointer;` : '')};
`;

const Image = styled.img`
  width: 100%;
`;
