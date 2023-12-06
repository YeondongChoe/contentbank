import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { searchValueAtom } from '../../recoil/valueAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  createWorksheetStep1BoolAtom,
  createWorksheetStep2BoolAtom,
  editWorksheetBoolAtom,
} from '../../recoil/creatingWorksheetAtom';
import { WorksheetTable } from '../../components/table/WorksheetTable';
import { Step1 } from '../../pages/worksheetPopup/Step1';

import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Worksheet = () => {
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
    <Style.main>
      <Style.contentHead>
        <Style.tapContainer>
          <Style.tapManu choiced={choiceValue} onClick={clickList}>
            학습지
          </Style.tapManu>
          <Style.tapManu choiced={choiceValue} onClick={clickBookmark}>
            즐겨찾는 학습지
          </Style.tapManu>
        </Style.tapContainer>
        <Style.inputContainer>
          <Style.input
            type="text"
            placeholder="문항코드, 중분류, 담당자 검색"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          ></Style.input>
          <Style.iconWrapper>
            <SearchIcon onClick={searchList} />
          </Style.iconWrapper>
        </Style.inputContainer>
        <Style.btnWrapper>
          <StyledUplodeBtn variant="contained" onClick={() => openStep1()}>
            + 학습지 만들기
          </StyledUplodeBtn>
        </Style.btnWrapper>
      </Style.contentHead>
      {choiceValue === 1 && (
        <Style.contentBox>
          <WorksheetTable />
        </Style.contentBox>
      )}
      {choiceValue === 2 && (
        <Style.contentBox>
          <WorksheetTable />
        </Style.contentBox>
      )}
      {isStep1 && <Step1 />}
    </Style.main>
  );
};
const Style = {
  main: styled.main`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  contentHead: styled.div`
    width: 1280px;
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  `,
  tapContainer: styled.div`
    display: flex;
    width: 500px;
    justify-content: center;
    align-items: flex-end;
    gap: 10px;
  `,
  tapManu: styled.div<{ choiced: number }>`
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
  `,
  inputContainer: styled.div`
    margin-right: -10px;
    margin-left: 300px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 5px;
    border: 1px solid white;
    box-shadow: 0px 1px 10px -4px rgba(112, 144, 176, 0.8);
  `,
  input: styled.input`
    width: 245px;
    outline: none;
    padding: 5px;
    border: 1px solid white;
    &::placeholder {
      font-size: 12px;
    }
  `,
  iconWrapper: styled.div`
    display: flex;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;
  `,
  contentBox: styled.div`
    width: 1280px;
    border-top: 1px solid #a3aed0;
  `,
  btnWrapper: styled.div`
    width: 130px;
    background-color: transparent;
    border: none;
  `,
};

const StyledUplodeBtn = styled(Button)`
  && {
    width: 130px;
    height: 30px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;
export { Worksheet };
