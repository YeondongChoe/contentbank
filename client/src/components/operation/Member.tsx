import React from 'react';
import styled from 'styled-components';
import MemberTable from '../table/MemberTable';
import { useRecoilState, useRecoilValue } from 'recoil';
import { register, editer } from '../../recoil/State';
import RegisterPopup from '../member/RegisterPopup';
import EditPopup from '../member/EditPopup';

import { Button } from '@mui/material';

const Member = () => {
  const [isRegister, SetIsRegister] = useRecoilState(register);
  const isEditer = useRecoilValue(editer);

  const handleClickRegisterBtn = () => {
    SetIsRegister(true);
  };

  return (
    <S.main>
      <S.contentHead>
        <S.inputWrapper>
          <S.input type="text" placeholder="이름, 권한 검색"></S.input>
        </S.inputWrapper>
        <S.btnWrapper>
          <StyledUplodeBtn variant="contained" onClick={handleClickRegisterBtn}>
            + 아이디 만들기
          </StyledUplodeBtn>
        </S.btnWrapper>
      </S.contentHead>
      <S.contentBox>
        <MemberTable />
      </S.contentBox>
      {isRegister ? <RegisterPopup /> : ''}
      {isEditer ? <EditPopup /> : ''}
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
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-end;
  `,
  inputWrapper: styled.div`
    margin-right: 20px;
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
    border: 1px solid #a3aed0;
  `,
  btnWrapper: styled.div`
    display: flex;
    align-items: center;
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

export default Member;
