import React from 'react';
import styled from 'styled-components';
import { MemberTable } from '../table/MemberTable';
import { useRecoilState, useRecoilValue } from 'recoil';
import { registerBoolAtom, editerBoolAtom } from '../../recoil/memberAtom';
import { RegisterPopup } from '../member/RegisterPopup';
import { EditPopup } from '../member/EditPopup';

import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Member = () => {
  const [isRegister, SetIsRegister] = useRecoilState(registerBoolAtom);
  const isEditer = useRecoilValue(editerBoolAtom);

  const openRegisterPopup = () => {
    SetIsRegister(true);
  };

  return (
    <S.main>
      <S.contentHead>
        <S.inputContainer>
          <S.input type="text" placeholder="이름, 권한 검색"></S.input>
          <S.iconWrapper>
            <SearchIcon />
          </S.iconWrapper>
        </S.inputContainer>
        <S.btnWrapper>
          <StyledUplodeBtn variant="contained" onClick={openRegisterPopup}>
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
    height: 40px;
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 40px;
    gap: 10px;
  `,
  inputContainer: styled.div`
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
    height: 600px;
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

export default Member;
