import * as React from 'react';
import { useState } from 'react';

import { styled } from 'styled-components';

import { Button } from '../..';
import { COLOR } from '../../constants';

type DepthBlockProps = {
  item: any; //TODO : 임시타입
  key?: any;
  children: JSX.Element | JSX.Element[];
  $margin?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export function DepthBlock({
  item,
  key,
  children,
  $margin,
  onChange,
  onClick,
}: DepthBlockProps) {
  return (
    <Component $margin={$margin} key={key}>
      <span className="depthBlock">{children}</span>
    </Component>
  );
}

const Component = styled.div<{ $margin?: string }>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  margin: ${({ $margin }) => $margin || '0px'};

  .depthBlock {
    display: flex;
    font-size: 13px;
    padding: 5px 10px;
    flex: 1 0 0;
    background-color: ${COLOR.LIGHT_GRAY};
  }
  .depth-1 {
    margin-left: 20px;
  }

  .depth-2 {
    margin-left: 40px;
  }

  .depth-3 {
    margin-left: 60px;
  }

  .depth-4 {
    margin-left: 80px;
  }

  .depth-5 {
    margin-left: 100px;
  }
`;
