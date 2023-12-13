import * as React from 'react';

import { styled } from 'styled-components';

import { Button } from './../components/atom';
import { Select } from './../components/atom/select';

export function Guide() {
  const [selectedValue, setSelectedValue] = React.useState<number>(0);
  const [selectedListValue, setSelectedListValue] = React.useState<number>(0);

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
      <Select
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        key="개정과정"
        options={[
          { id: '0', label: '개정과정', value: 0 },
          { id: '1', label: '2015학년', value: 1 },
          { id: '2', label: '2020학년', value: 2 },
        ]}
      />
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
