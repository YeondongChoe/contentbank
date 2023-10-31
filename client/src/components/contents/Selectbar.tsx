import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';

const SelectBar = () => {
  return (
    <S.mainContainer>
      <S.selectContainer>
        <S.select>
          <S.option>개정과정</S.option>
        </S.select>
        <S.select>
          <S.option>학교</S.option>
        </S.select>
        <S.select>
          <S.option>학년</S.option>
        </S.select>
        <S.select>
          <S.option>학기</S.option>
        </S.select>
        <S.select>
          <S.option>대분류</S.option>
        </S.select>
        <S.select>
          <S.option>중분류</S.option>
        </S.select>
        <S.select>
          <S.option>문항타입</S.option>
        </S.select>
        <S.select>
          <S.option>오픈여부</S.option>
        </S.select>
      </S.selectContainer>
      <S.btncontainer>
        <S.btnWrapper>
          <StyledEditBtn variant="outlined">수정</StyledEditBtn>
        </S.btnWrapper>
        <S.btnWrapper>
          <StyledActionBtn variant="outlined">활성화/비활성화</StyledActionBtn>
        </S.btnWrapper>
      </S.btncontainer>
    </S.mainContainer>
  );
};

const S = {
  mainContainer: styled.div`
    margin: 40px 45px 20px 28px;
    display: flex;
    justify-content: space-between;
  `,
  selectContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  `,
  select: styled.select``,
  btncontainer: styled.div`
    display: flex;
    gap: 10px;
  `,
  option: styled.option``,
  btnWrapper: styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
  `,
};

const StyledEditBtn = styled(Button)`
  && {
    width: 70px;
    height: 25px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;

const StyledActionBtn = styled(Button)`
  && {
    width: 130px;
    height: 25px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;

export default SelectBar;
