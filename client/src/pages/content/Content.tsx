import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import { ConfirmBtn } from '../../components/button/CommonBtn';

const Contentpage = () => {
  const [ischoice, setIsChoice] = useState(0);

  const handleChoice1 = () => {
    if (ischoice === 1) {
      setIsChoice(0);
    } else setIsChoice(1);
  };

  const handleChoice2 = () => {
    if (ischoice === 2) {
      setIsChoice(0);
    } else setIsChoice(2);
  };

  const handleChoice3 = () => {
    if (ischoice === 3) {
      setIsChoice(0);
    } else setIsChoice(3);
  };
  return (
    <S.main>
      <Header />
      <S.contenttop>
        <S.tapcontainer>
          <S.tapmanu ischoice={ischoice} onClick={handleChoice1}>
            문항 리스트
          </S.tapmanu>
          <S.tapmanu ischoice={ischoice} onClick={handleChoice2}>
            즐겨찾는 문항
          </S.tapmanu>
        </S.tapcontainer>
        <S.inputcontainer>
          <S.input
            type="text"
            placeholder="문항코드, 중분류, 담당자 검색"
          ></S.input>
        </S.inputcontainer>
        <S.btncontainer>
          <ConfirmBtn
            text="+ 문항 업로드"
            width={100}
            height={25}
            color="confirm"
            radius={5}
            fontSize={12}
          />
          {/* <button>+ 문항 업로드</button> */}
        </S.btncontainer>
      </S.contenttop>
    </S.main>
  );
};

const S = {
  main: styled.main`
    width: 1280px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  contenttop: styled.div`
    display: flex;
  `,
  tapcontainer: styled.div`
    display: flex;
    margin-right: 250px;
  `,
  tapmanu: styled.div<{ ischoice: number }>`
    width: 200px;
    height: 50px;
    background-color: gray;
    color: white;
    border: 1px solid gray;
    border-bottom: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:first-child {
      background-color: ${(props) =>
        props.ischoice === 1 ? 'gray' : 'initial'};
      color: ${(props) => (props.ischoice === 1 ? 'white' : 'initial')};
      border-right: none;
    }
    &:nth-child(2) {
      background-color: ${(props) =>
        props.ischoice === 2 ? 'gray' : 'initial'};
      color: ${(props) => (props.ischoice === 2 ? 'white' : 'initial')};
    }
  `,
  inputcontainer: styled.div`
    margin-right: 20px;
    margin-left: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  input: styled.input`
    width: 200px;
    height: 30px;
    outline: none;
    padding: 5px;
    &::placeholder {
      font-size: 11px;
    }
  `,
  btncontainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 80px;
  `,
};

export default Contentpage;
