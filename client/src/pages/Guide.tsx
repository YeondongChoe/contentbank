import * as React from 'react';

import { styled } from 'styled-components';

import { MathviewerCard } from '../components';
import Contents2 from '../components/mathViewer/test2.json';

import { Button, IconButton, Loader, Input } from './../components/atom';
import { Select } from './../components/atom/select';

type CategoryOptionsProps = {
  id?: string;
  label: string;
  value?: number | string;
};

export function Guide() {
  const [selectedValue, setSelectedValue] = React.useState<string>();
  const [content, setContent] = React.useState<string[]>([]);

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    // console.log(event.currentTarget.value);
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);
  };

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
      {/* <Select /> */}
      <h3>loader</h3>
      <Loader height={'40px'} size="35px" />
      <Loader height={'80px'} />
      <h3>Select</h3>
      <Select
        width={'150px'}
        defaultValue={'커스텀 select'}
        options={[
          { id: '0', label: '개정과정', value: '0' },
          { id: '1', label: '2015학년', value: '1' },
          { id: '2', label: '2018학년', value: '2' },
          { id: '3', label: '2020학년', value: '3' },
        ]}
        onSelect={(event) => selectCategoryOption(event)}
      />
      <h3>Input</h3>
      <Input
        type={'text'}
        border="normal"
        margin={'5px 0'}
        padding="10px"
        placeholder="커스텀 인풋"
        borderradius="10px"
      />
      <Input
        type={'text'}
        className="success"
        border="normal"
        margin={'5px 0'}
        padding="10px"
        placeholder="커스텀 인풋 성공"
        borderradius="10px"
      />
      <Input
        type={'text'}
        border="black"
        margin={'5px 0'}
        padding="10px"
        placeholder=" 커스텀 인풋"
      />
      <Input
        type={'text'}
        margin={'5px 0'}
        padding="10px"
        placeholder=" 커스텀 인풋 에러"
        borderbottom
        errorMessage={'정보가 일치하지 않습니다.'}
      />
      <Input
        type={'text'}
        border="normal"
        margin={'5px 0'}
        disabled
        padding="10px"
        placeholder="커스텀 인풋 비활성화"
        borderradius="10px"
      />
      <Input
        type={'text'}
        border="black"
        margin={'5px 0'}
        disabled
        padding="10px"
        placeholder="커스텀 인풋 비활성화"
      />
      <h3>mathviewer</h3>
      <div style={{ width: '480px' }}>
        <MathviewerCard
          onClick={() => {}}
          data={Contents2}
          index={1}
          selectedCardIndex={1}
          onSelectCard={() => {}}
        ></MathviewerCard>
      </div>
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
