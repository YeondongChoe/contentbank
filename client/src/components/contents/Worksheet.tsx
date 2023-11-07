import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';

const Worksheet = () => {
  const [choiceValue, setIsChoice] = useState(0);

  const handleClickList = () => {
    if (choiceValue === 1) {
      setIsChoice(0);
    } else setIsChoice(1);
  };

  const handleClickBookmark = () => {
    if (choiceValue === 2) {
      setIsChoice(0);
    } else setIsChoice(2);
  };

  return (
    <S.main>
      <S.contentHead>
        <S.tapContainer>
          <S.tapManu choiced={choiceValue} onClick={handleClickList}>
            학습지
          </S.tapManu>
          <S.tapManu choiced={choiceValue} onClick={handleClickBookmark}>
            즐겨찾는 학습지
          </S.tapManu>
        </S.tapContainer>
        <S.inputContainer>
          <S.input
            type="text"
            placeholder="문항코드, 중분류, 담당자 검색"
          ></S.input>
        </S.inputContainer>
        <S.btnWrapper>
          <StyledUplodeBtn variant="contained">+ 문항 업로드</StyledUplodeBtn>
        </S.btnWrapper>
      </S.contentHead>
      <S.contentBox></S.contentBox>
    </S.main>
  );
};
const S = {
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
    justify-content: space-evenly;
  `,
  tapContainer: styled.div`
    display: flex;
    justify-self: flex-start;
  `,
  tapManu: styled.div<{ choiced: number }>`
    width: 250px;
    height: 40px;
    background-color: gray;
    color: white;
    border: 1px solid #a3aed0;
    border-bottom: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:first-child {
      background-color: ${(props) => (props.choiced === 1 ? 'gray' : 'white')};
      color: ${(props) => (props.choiced === 1 ? 'white' : 'initial')};
      border-right: none;
      border-top-left-radius: 15px;
    }
    &:nth-child(2) {
      background-color: ${(props) => (props.choiced === 2 ? 'gray' : 'white')};
      color: ${(props) => (props.choiced === 2 ? 'white' : 'initial')};
      border-top-right-radius: 15px;
    }
  `,
  inputContainer: styled.div`
    margin-right: -30px;
    margin-left: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  input: styled.input`
    width: 250px;
    height: 30px;
    outline: none;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid white;
    box-shadow: 0px 1px 10px -4px rgba(112, 144, 176, 0.8);
    &::placeholder {
      font-size: 12px;
    }
  `,
  contentBox: styled.div`
    width: 1280px;
    height: 600px;
    border-top: 1px solid #a3aed0;
  `,
  btnWrapper: styled.div`
    margin-right: -40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
  `,
};

const StyledUplodeBtn = styled(Button)`
  && {
    height: 25px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;
export default Worksheet;
