import * as React from 'react';

import { styled } from 'styled-components';

import { Button } from './../components/atom';

export function Guide() {
  return (
    <Component>
      <h1>dev guide</h1>
      <h2>ui guide</h2>
      <h3>button</h3>
      <Button buttonType={'button'} onClick={() => {}} $margin={'5px 0'}>
        <span>기본 버튼</span>
      </Button>

      <Button
        buttonType={'button'}
        disabled
        onClick={() => {}}
        $margin={'5px 0'}
      >
        <span>disabled 버튼</span>
      </Button>

      <Button
        buttonType={'button'}
        onClick={() => {}}
        width={'150px'}
        height={'20px'}
        $padding={'10px'}
        fontSize={'12px'}
        $borderRadius={'20px'}
        $margin={'5px 0'}
      >
        <span>커스텀 버튼</span>
      </Button>

      <Button
        buttonType={'button'}
        onClick={() => {}}
        width={'25%'}
        $border
        $margin={'5px 0'}
      >
        <span>border 커스텀 버튼</span>
      </Button>
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
