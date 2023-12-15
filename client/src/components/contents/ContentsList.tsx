import * as React from 'react';
import { useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { Input } from '../../components';
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

  return (
    <Container>
      <HeadWrapper>
        <TapWrapper>
          <TapMenu choiced={choiceValue} onClick={selectList}>
            문항 리스트
          </TapMenu>
          <TapMenu choiced={choiceValue} onClick={selectBookmark}>
            즐겨찾는 문항
          </TapMenu>
        </TapWrapper>
        <InputWrapper>
          <Input
            width="245px"
            height="25px"
            padding="5px"
            placeholderSize="12px"
            fontSize="12px"
            type="text"
            placeholder="문항코드, 중분류, 담당자 검색"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <IconWrapper>
            <SearchIcon onClick={searchContentList} />
          </IconWrapper>
        </InputWrapper>
        <StyledUplodeBtn variant="contained" onClick={openCreatePopup}>
          + 문항 업로드
        </StyledUplodeBtn>
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

const TapMenu = styled.div<{ choiced: number }>`
  height: 40px;
  border: 1px solid #a3aed0;
  border-bottom: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:first-child {
    background-color: ${(props) =>
      props.choiced === 1 ? 'rgba(0, 0, 0, 0.3)' : 'white'};
    color: ${(props) => (props.choiced === 1 ? 'white' : 'initial')};
    width: ${(props) => (props.choiced === 1 ? '250px' : '150px')};
    height: ${(props) => (props.choiced === 2 ? '30px' : '40px')};
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
  }
  &:nth-child(2) {
    background-color: ${(props) =>
      props.choiced === 2 ? 'rgba(0, 0, 0, 0.3)' : 'white'};
    color: ${(props) => (props.choiced === 2 ? 'white' : 'initial')};
    width: ${(props) => (props.choiced === 2 ? '250px' : '150px')};
    height: ${(props) => (props.choiced === 1 ? '30px' : '40px')};
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
  }
`;

const InputWrapper = styled.div`
  height: 30px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 5px;
  border: 1px solid white;
  box-shadow: 0px 1px 10px -4px rgba(112, 144, 176, 0.8);
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

const StyledUplodeBtn = styled(Button)`
  && {
    width: 130px;
    height: 30px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;
