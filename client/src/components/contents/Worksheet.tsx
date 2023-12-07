import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { searchValueAtom } from '../../state/valueAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  createWorksheetStep1BoolAtom,
  createWorksheetStep2BoolAtom,
  editWorksheetBoolAtom,
} from '../../state/creatingWorksheetAtom';
import { WorksheetTable } from '../../components/table/WorksheetTable';
import { Step1 } from '../../pages/worksheetPopup/Step1';

import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export function Worksheet() {
  const [didMount, setDidMount] = useState(false);
  let mountCount = 1;

  const [isStep1, setIsStep1] = useRecoilState(createWorksheetStep1BoolAtom);
  const setIsStep2 = useSetRecoilState(createWorksheetStep2BoolAtom);
  const setIsEditWorksheet = useSetRecoilState(editWorksheetBoolAtom);

  const [choiceValue, setChoiceValue] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const setsearchValueAtom = useSetRecoilState(searchValueAtom);

  const openStep1 = () => {
    setIsStep1(true);
    setIsStep2(false);
    setIsEditWorksheet(false);
  };

  const searchList = () => {
    setsearchValueAtom(inputValue);
  };

  const clickList = () => {
    setChoiceValue(1);
  };

  const clickBookmark = () => {
    setChoiceValue(2);
  };

  useEffect(() => {
    mountCount++;
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      console.log();
    }
  }, [didMount]);

  return (
    <Container>
      <HeadWrapper>
        <TapWrapper>
          <TapMenu choiced={choiceValue} onClick={clickList}>
            학습지
          </TapMenu>
          <TapMenu choiced={choiceValue} onClick={clickBookmark}>
            즐겨찾는 학습지
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
        <ButtonWrapper>
          <StyledUplodeBtn variant="contained" onClick={() => openStep1()}>
            + 학습지 만들기
          </StyledUplodeBtn>
        </ButtonWrapper>
      </HeadWrapper>
      {choiceValue === 1 && (
        <TableWrapper>
          <WorksheetTable />
        </TableWrapper>
      )}
      {choiceValue === 2 && (
        <TableWrapper>
          <WorksheetTable />
        </TableWrapper>
      )}
      {isStep1 && <Step1 />}
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
  margin-right: 10px;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  width: 130px;
  background-color: transparent;
  border: none;
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
