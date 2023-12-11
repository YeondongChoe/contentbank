import * as React from 'react';
import { useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { ManagemantMainPopup } from '../../pages/managementPopup/ManagementMainPopup';
import { managementContentPopupBoolAtom } from '../../state/managementContentAtom';
import { searchValueAtom, checkBoxValueAtom } from '../../state/valueAtom';
import { ListTable } from '../table/ListTable';

export function ManagementsList() {
  const [choiceValue, setChoiceValue] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const setContentSeq = useSetRecoilState(checkBoxValueAtom);
  const setsearchValueAtom = useSetRecoilState(searchValueAtom);
  const [isManagement, setIsManagement] = useRecoilState(
    managementContentPopupBoolAtom,
  );

  const searchList = () => {
    setsearchValueAtom(inputValue);
  };

  const clickList = () => {
    setChoiceValue(1);
    setContentSeq([]);
  };

  const clickDeclar = () => {
    setChoiceValue(2);
    setContentSeq([]);
  };

  const openInformation = () => {
    setIsManagement(true);
  };

  return (
    <Container>
      <HeadWrapper>
        <TapWrapper>
          <TapMenu choiced={choiceValue} onClick={clickList}>
            문항 리스트
          </TapMenu>
          <TapMenu choiced={choiceValue} onClick={clickDeclar}>
            신고문항
          </TapMenu>
        </TapWrapper>
        <InputWrapper>
          <Input
            type="text"
            placeholder="문항코드, 중분류, 담당자 검색"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          ></Input>
          <IconWrapper>
            <SearchIcon onClick={searchList} />
          </IconWrapper>
        </InputWrapper>
        <StyledUplodeBtn variant="contained" onClick={openInformation}>
          상세 검색
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
      {isManagement && <ManagemantMainPopup />}
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
  padding: 40px 10px 0px 50px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const TapWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 10px;
  flex: 1 0 0;
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
  margin-right: 10px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 5px;
  border: 1px solid white;
  box-shadow: 0px 1px 10px -4px rgba(112, 144, 176, 0.8);
`;

const Input = styled.input`
  width: 245px;
  outline: none;
  padding: 5px;
  border: 1px solid white;
  &::placeholder {
    font-size: 12px;
  }
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
