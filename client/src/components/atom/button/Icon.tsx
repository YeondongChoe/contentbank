import * as React from 'react';

import styled from 'styled-components';

type IconProps = {
  onClick?: () => void;
  src: any;
  $margin?: string;
  width?: string;
  height?: string;
  disabled?: boolean;
};

export function Icon({
  onClick,
  src,
  $margin,
  width,
  height,
  disabled = false,
}: IconProps) {
  return (
    <Container
      type="button"
      onClick={onClick}
      width={width}
      height={height}
      $margin={$margin}
      disabled={disabled}
    >
      <Image
        src={src}
        loading="lazy"
        // src={`/images/settings/ic-bookmark-${active ? 'on' : 'off'}.svg`}
      />
    </Container>
  );
}

const Container = styled.button<{
  width?: string;
  height?: string;
  $margin?: string;
}>`
  border: none;
  background-color: transparent;
  margin: ${({ $margin }) => ($margin ? `${$margin};` : '0')};
  width: ${({ width }) => (width ? ` ${width};` : '22px')};
  height: ${({ height }) => (height ? ` ${height};` : '22px')};
`;

const Image = styled.img`
  width: 100%;
`;
