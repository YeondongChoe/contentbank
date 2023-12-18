import * as React from 'react';
import { useState } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { Button, Search, TabMenu } from '../../components';
import { CreateIconPopup } from '../../pages/createPopup/CreateIconPopup';
import { createContentPopupBoolAtom } from '../../state/creatingContentAtom';
import { updateBoolAtom } from '../../state/utilAtom';
import { searchValueAtom, checkBoxValueAtom } from '../../state/valueAtom';
import { ListTable } from '../table/ListTable';

import { COLOR } from './COLOR';

export function ContentsList() {
  const [inputValue, setInputValue] = useState('');
  const setsearchValueAtom = useSetRecoilState(searchValueAtom);
  const setContentSeq = useSetRecoilState(checkBoxValueAtom);
  const [isCreate, setIsCreate] = useRecoilState(createContentPopupBoolAtom);
  const setIsUpdate = useSetRecoilState(updateBoolAtom);
  const [tabVeiw, setTabVeiw] = useState<string>('문항 리스트');

  const [searchValue, setSearchValue] = useState<string>('');
  const filterSearchValue = () => {
    console.log('기존데이터 입력된 값으로 솎아낸뒤 재출력');
  };
  const searchContentList = () => {
    setsearchValueAtom(inputValue);
  };

  const openCreatePopup = () => {
    setIsCreate(true);
    setIsUpdate(false);
  };

  const menuList = [
    {
      label: '문항 리스트',
      value: '문항 리스트',
    },
    {
      label: '즐겨찾는 문항',
      value: '즐겨찾는 문항',
    },
  ];

  return (
    <Container>
      <HeadWrapper>
        <TabMenu
          length={2}
          menu={menuList}
          initialValue={'문항 리스트'}
          width={'250px'}
          setTabVeiw={setTabVeiw}
        />

        {/* 테이블 상단 검색창 + 문항 업로드 버튼 */}
        <InputWrapper>
          <Search
            value={searchValue}
            width={'250px'}
            onClick={() => filterSearchValue()}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="이름, 권한 검색"
          />
          <Button
            height={'35px'}
            width={'150px'}
            $margin={'0 0 0 10px'}
            onClick={openCreatePopup}
          >
            문항 업로드
          </Button>
        </InputWrapper>
      </HeadWrapper>

      {/* {tabVeiw === '문항 리스트' && ( )} */}
      <TableWrapper>
        <ListTable />
      </TableWrapper>

      {isCreate && <CreateIconPopup />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeadWrapper = styled.div`
  width: 100%;
  /* padding: 20px; */
  padding-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TableWrapper = styled.div`
  border-top: 1px solid ${COLOR.SECONDARY};
`;
