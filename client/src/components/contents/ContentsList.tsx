import React, { useState } from 'react';
import styled from 'styled-components';
import { ListTable } from '../table/ListTable';
import { searchValueAtom, checkBoxValueAtom } from '../../state/valueAtom';
import { createContentPopupBoolAtom } from '../../state/creatingContentAtom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { CreateIconPopup } from '../../pages/createPopup/CreateIconPopup';
import { updateBoolAtom } from '../../state/utilAtom';

import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ContentsList = () => {
  const [choiceValue, setChoiceValue] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const setsearchValueAtom = useSetRecoilState(searchValueAtom);
  const setContentSeq = useSetRecoilState(checkBoxValueAtom);
  const [isCreate, setIsCreate] = useRecoilState(createContentPopupBoolAtom);
  const setIsUpdate = useSetRecoilState(updateBoolAtom);

  const handleClickSearch = () => {
    setsearchValueAtom(inputValue);
  };

  const handleClickList = () => {
    setChoiceValue(1);
    setContentSeq([]);
  };

  const handleClickBookmark = () => {
    setChoiceValue(2);
    setContentSeq([]);
  };

  const handleClickCreate = () => {
    setIsCreate(true);
    setIsUpdate(false);
  };

  return (
    <Style.main>
      <Style.contentHead>
        <Style.tapContainer>
          <Style.tapManu choiced={choiceValue} onClick={handleClickList}>
            문항 리스트
          </Style.tapManu>
          <Style.tapManu choiced={choiceValue} onClick={handleClickBookmark}>
            즐겨찾는 문항
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
            <SearchIcon onClick={handleClickSearch} />
          </Style.iconWrapper>
        </Style.inputContainer>
        <Style.btnWrapper>
          <StyledUplodeBtn variant="contained" onClick={handleClickCreate}>
            + 문항 업로드
          </StyledUplodeBtn>
        </Style.btnWrapper>
      </Style.contentHead>
      {choiceValue === 1 && (
        <Style.contentBox>
          <ListTable />
        </Style.contentBox>
      )}
      {choiceValue === 2 && (
        <Style.contentBox>
          <ListTable />
        </Style.contentBox>
      )}
      {isCreate && <CreateIconPopup />}
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

export { ContentsList };
