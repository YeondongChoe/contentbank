import * as React from 'react';
import { useState } from 'react';

import { useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';

import {
  Alert,
  CommonDate,
  DropDown,
  MathviewerCard,
  PaginationBox,
  Search,
  TabMenu,
} from '../components';
import Contents2 from '../components/mathViewer/test2.json';

import {
  Button,
  Loader,
  BarChart,
  Label,
  Input,
  ValueNone,
  IndexInfo,
  Select,
} from './../components/atom';

export function Guide() {
  const [selectedValue, setSelectedValue] = useState<string>();
  const [content, setContent] = useState<string[]>([]);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [chageValue, setChageValue] = useState<string>('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const Data = [
    { value: 10, label: '하' },
    { value: 20, label: '중하' },
    { value: 40, label: '중' },
    { value: 20, label: '상' },
    { value: 10, label: '최상' },
  ];
  const menuList = [
    {
      label: '커스텀 메뉴',
      value: '커스텀 메뉴',
    },
    {
      label: '커스텀 즐겨찾기',
      value: '커스텀 즐겨찾기',
    },
  ];
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
      <h3>label</h3>
      <Label value="커스텀 라벨"></Label>
      <Label type="error" value="커스텀 라벨"></Label>
      <h3>tabmenu</h3>
      <TabMenu
        length={2}
        menu={menuList}
        width={'250px'}
        selected={'전체'}
      ></TabMenu>
      <TabMenu
        length={2}
        menu={menuList}
        width={'250px'}
        lineStyle
        selected={'전체'}
      ></TabMenu>
      <h3>select</h3>
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
      <h3>input</h3>
      <InputWrapper>
        <Input
          type={'text'}
          border="normal"
          width="200px"
          margin={'5px 0'}
          padding="10px"
          placeholder="커스텀 인풋"
          borderradius="10px"
        />
        <Input
          type={'text'}
          className="success"
          border="normal"
          width="200px"
          margin={'5px 0'}
          padding="10px"
          placeholder="커스텀 인풋 성공"
          borderradius="10px"
        />
        <Input
          type={'text'}
          border="black"
          width="200px"
          margin={'5px 0'}
          padding="10px"
          placeholder=" 커스텀 인풋"
        />
        <Input
          type={'text'}
          width="200px"
          margin={'5px 0'}
          padding="10px"
          placeholder=" 커스텀 인풋 에러"
          borderbottom
          errorMessage={'정보가 일치하지 않습니다.'}
        />
        <Input
          type={'text'}
          border="normal"
          width="200px"
          margin={'5px 0'}
          disabled
          padding="10px"
          placeholder="커스텀 인풋 비활성화"
          borderradius="10px"
        />
        <Input
          type={'text'}
          border="black"
          width="200px"
          margin={'5px 0'}
          disabled
          padding="10px"
          placeholder="커스텀 인풋 비활성화"
        />
      </InputWrapper>
      <h3>search</h3>
      <Search
        value={chageValue}
        width="200px"
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
      <h3>barchart</h3>
      <BarChart data={Data}></BarChart>
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
      <h3>pagination</h3>
      <PaginationBox itemsCountPerPage={1} totalItemsCount={10}></PaginationBox>
      <h3>alert</h3>
      <button onClick={() => setIsAlertOpen(true)}>커스텀 알람</button>
      <Alert
        isAlertOpen={isAlertOpen}
        description={'커스텀 알람 props에 notice를 추가하면 확인만 나옴'}
        action="확인"
      ></Alert>
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
const InputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;
