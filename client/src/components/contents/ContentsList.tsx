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

export function ContentsList() {
  const [choiceValue, setChoiceValue] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const setsearchValueAtom = useSetRecoilState(searchValueAtom);
  const setContentSeq = useSetRecoilState(checkBoxValueAtom);
  const [isCreate, setIsCreate] = useRecoilState(createContentPopupBoolAtom);
  const setIsUpdate = useSetRecoilState(updateBoolAtom);

  const [searchValue, setSearchValue] = useState<string>('');
  const filterSearchValue = () => {
    console.log('기존데이터 입력된 값으로 솎아낸뒤 재출력');
  };
  const searchContentList = () => {
    setsearchValueAtom(inputValue);
  };

  const selectList = () => {
    setChoiceValue(1);
    setContentSeq([]);
  };

  const selectBookmark = () => {
    setChoiceValue(2);
    setContentSeq([]);
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
        <TapWrapper>
          {/* <TapMenu choiced={choiceValue} onClick={selectList}>
            문항 리스트
          </TapMenu>
          <TapMenu choiced={choiceValue} onClick={selectBookmark}>
            즐겨찾는 문항
          </TapMenu> */}

          <TabMenu length={2} menu={menuList} />
        </TapWrapper>
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
      {choiceValue === 1 && (
        <TableWrapper>
          <ListTable />
        </TableWrapper>
      )}
      {choiceValue === 2 && (
        <TableWrapper>
          <ListTable />
        </TableWrapper>
      )}
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
  padding: 20px;
  padding-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TapWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 10px;
`;

// const TapMenu = styled.div<{ choiced: number }>`
//   height: 40px;
//   border: 1px solid #a3aed0;
//   border-bottom: none;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   &:first-child {
//     background-color: ${(props) =>
//       props.choiced === 1 ? 'rgba(0, 0, 0, 0.3)' : 'white'};
//     color: ${(props) => (props.choiced === 1 ? 'white' : 'initial')};
//     width: ${(props) => (props.choiced === 1 ? '250px' : '150px')};
//     height: ${(props) => (props.choiced === 2 ? '30px' : '40px')};
//     border-top-right-radius: 15px;
//     border-top-left-radius: 15px;
//   }
//   &:nth-child(2) {
//     background-color: ${(props) =>
//       props.choiced === 2 ? 'rgba(0, 0, 0, 0.3)' : 'white'};
//     color: ${(props) => (props.choiced === 2 ? 'white' : 'initial')};
//     width: ${(props) => (props.choiced === 2 ? '250px' : '150px')};
//     height: ${(props) => (props.choiced === 1 ? '30px' : '40px')};
//     border-top-right-radius: 15px;
//     border-top-left-radius: 15px;
//   }
//   &:hover {
//     background-color: rgba(0, 0, 0, 0.3);
//     color: white;
//   }
// `;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: 10px;
  cursor: pointer;
`;

const TableWrapper = styled.div`
  border-top: 1px solid #a3aed0;
`;
