import * as React from 'react';
import { useState } from 'react';

import { styled } from 'styled-components';

import {
  CommonDate,
  DropDown,
  MathviewerCard,
  PaginationBox,
  Search,
} from '../components';
import Contents2 from '../components/mathViewer/test2.json';

import {
  Button,
  IconButton,
  Loader,
  Input,
  ValueNone,
  IndexInfo,
} from './../components/atom';
import { Select } from './../components/atom/select';

export function Guide() {
  const [selectedValue, setSelectedValue] = useState<string>();
  const [content, setContent] = useState<string[]>([]);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [chageValue, setChageValue] = useState<string>('');

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
      <h3>index info</h3>
      <IndexInfo list={['1deps', '2deps', '3deps']}></IndexInfo>

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
      <h3>search</h3>
      <Search
        value={chageValue}
        onClick={() => {}}
        onChange={(e) => setChageValue(e.target.value)}
        onKeyDown={() => {}}
      ></Search>
      <h3>drop down</h3>
      <DropDown
        width="100%"
        list={[
          {
            key: 'option1',
            title: 'option1',
            onClick: () => {},
          },
          {
            key: 'option2',
            title: 'option2',
            onClick: () => {},
          },
          {
            key: 'option3',
            title: 'option3',
            onClick: () => {},
          },
        ]}
        buttonText={'dropdown'}
        showDropDown={showDropDown}
        setShowDropDown={() => setShowDropDown(!showDropDown)}
      ></DropDown>

      <h3>date picker</h3>
      <CommonDate></CommonDate>

      <h3>pagination</h3>
      <PaginationBox itemsCountPerPage={1} totalItemsCount={10}></PaginationBox>

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
      <h3>loader</h3>
      <Loader height={'40px'} size="35px" />
      <Loader height={'80px'} />
      <h3>value none</h3>
      <ValueNone />
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
