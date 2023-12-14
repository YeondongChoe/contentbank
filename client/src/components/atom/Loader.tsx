import * as React from 'react';

import { LuLoader2 } from 'react-icons/lu';
import { styled } from 'styled-components';

// import LoaderIcon from '../../../public/images/icon/loader.svg';

type LoaderProps = {
  width?: string;
};

export function Loader({ width }: LoaderProps) {
  return (
    <Component width={width}>
      <LuLoader2 />
    </Component>
  );
}

type LoaderStyleProps = {
  width?: string;
};

const Component = styled.div<LoaderStyleProps>`
  ${({ width }) => width && `width: ${width}px;`};
`;
