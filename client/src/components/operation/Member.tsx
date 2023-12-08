import React from 'react';
import styled from 'styled-components';
import { MemberTable } from '../table/MemberTable';
import { useRecoilState, useRecoilValue } from 'recoil';
import { registerBoolAtom, editerBoolAtom } from '../../state/memberAtom';
import { RegisterPopup } from '../member/RegisterPopup';
import { EditPopup } from '../member/EditPopup';

import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export function Member() {
  const [isRegister, SetIsRegister] = useRecoilState(registerBoolAtom);
  const isEditer = useRecoilValue(editerBoolAtom);

  const openRegisterPopup = () => {
    SetIsRegister(true);
  };

  return (
    <Container>
      <Wrapper>
        <InputWrapper>
          <Input type="text" placeholder="이름, 권한 검색"></Input>
          <IconWrapper>
            <SearchIcon />
          </IconWrapper>
        </InputWrapper>
        <StyledUplodeBtn variant="contained" onClick={openRegisterPopup}>
          + 아이디 만들기
        </StyledUplodeBtn>
      </Wrapper>
      <ContentWrapper>
        <MemberTable />
      </ContentWrapper>
      {isRegister ? <RegisterPopup /> : ''}
      {isEditer ? <EditPopup /> : ''}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 40px;
  margin-top: 40px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;
const InputWrapper = styled.div`
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
const ContentWrapper = styled.div`
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
