import React, { useState } from 'react';
import styled from 'styled-components';
import { PiPiggyBankLight } from 'react-icons/pi';

const Header = () => {
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
      <S.head>
        <S.tophead>
          <S.iconcontainer>
            <PiPiggyBankLight style={{ fontSize: '50px' }} />
          </S.iconcontainer>
          <S.navcontainer>
            <S.navbar ischoice={ischoice} onClick={handleChoice1}>
              콘텐츠 제작
            </S.navbar>
            <S.navbar ischoice={ischoice} onClick={handleChoice2}>
              콘텐츠 관리
            </S.navbar>
            <S.navbar ischoice={ischoice} onClick={handleChoice3}>
              운영관리
            </S.navbar>
          </S.navcontainer>
          <S.sidecontainer>
            <S.sidebar>
              <S.sidebarmenu>가이드</S.sidebarmenu>
            </S.sidebar>
            <S.sidebar>
              <S.sidebarmenu>고객센터</S.sidebarmenu>
            </S.sidebar>
            <S.sidebar>
              <S.sidebarmenu>마이페이지</S.sidebarmenu>
            </S.sidebar>
            <S.sidebar>
              <S.sidebarmenunoborder>로그아웃</S.sidebarmenunoborder>
            </S.sidebar>
          </S.sidecontainer>
        </S.tophead>
        <S.bottomhead>
          {ischoice === 1 && (
            <S.choicecontainer1>
              <S.choicebar>문항</S.choicebar>
              <S.choicebar>학습지</S.choicebar>
            </S.choicecontainer1>
          )}
          {ischoice === 2 && (
            <S.choicecontainer2>
              <S.choicebar>문항</S.choicebar>
              <S.choicebar>문항 정보 트리 구조</S.choicebar>
            </S.choicecontainer2>
          )}
          {ischoice === 3 && (
            <S.choicecontainer3>
              <S.choicebar>회원관리</S.choicebar>
              <S.choicebar>권한관리</S.choicebar>
            </S.choicecontainer3>
          )}
        </S.bottomhead>
      </S.head>
    </S.main>
  );
};

const S = {
  main: styled.main`
    width: 1280px;
    height: 80px;
    //margin-top: 50px;
    //margin-left: 50px;
    display: flex;
  `,
  head: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
  `,
  tophead: styled.div`
    display: flex;
    border-bottom: 1px solid gray;
  `,
  iconcontainer: styled.div`
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  navcontainer: styled.nav`
    width: 500px;
    display: flex;
  `,
  navbar: styled.div<{ ischoice: number }>`
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    cursor: pointer;
    &:first-child {
      background-color: ${(props) =>
        props.ischoice === 1 ? '#c9e3ffda' : 'initial'};
    }
    &:nth-child(2) {
      background-color: ${(props) =>
        props.ischoice === 2 ? '#c9e3ffda' : 'initial'};
    }
    &:nth-child(3) {
      background-color: ${(props) =>
        props.ischoice === 3 ? '#c9e3ffda' : 'initial'};
    }
  `,
  sidecontainer: styled.div`
    width: 600px;
    display: flex;
    justify-content: flex-end;
  `,
  sidebar: styled.div`
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  sidebarmenu: styled.div`
    width: 100px;
    font-size: 14px;
    border-right: 1px solid gray;
    cursor: pointer;
    color: gray;
  `,
  sidebarmenunoborder: styled.div`
    width: 100px;
    font-size: 14px;
    cursor: pointer;
    color: gray;
  `,
  bottomhead: styled.div`
    width: 100%;
    display: flex;
    font-size: 18px;
  `,
  choicecontainer1: styled.div`
    display: flex;
    align-items: center;
    height: 50px;
    gap: 60px;
    margin-left: 225px;
  `,
  choicecontainer2: styled.div`
    display: flex;
    align-items: center;
    height: 50px;
    gap: 60px;
    margin-left: 390px;
  `,
  choicecontainer3: styled.div`
    display: flex;
    align-items: center;
    height: 50px;
    gap: 60px;
    margin-left: 575px;
  `,
  choicebar: styled.div`
    cursor: pointer;
    &:hover {
      border-bottom: 3px solid skyblue;
    }
  `,
};

export default Header;
