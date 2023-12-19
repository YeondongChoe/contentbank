import * as React from 'react';
import { useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { Input } from '../../components';
import { Search } from '../../components/molecules';
import { registerBoolAtom, editerBoolAtom } from '../../state/memberAtom';
import { EditPopup } from '../member/EditPopup';
import { RegisterPopup } from '../member/RegisterPopup';
import { MemberTable } from '../tableWrap/MemberTable';

export function Member() {
  const [isRegister, SetIsRegister] = useRecoilState(registerBoolAtom);
  const isEditer = useRecoilValue(editerBoolAtom);

  const [searchValue, setSearchValue] = useState<string>('');

  const filterSearchValue = () => {
    console.log('기존데이터 입력된 값으로 솎아낸뒤 재출력');
  };
  const openRegisterPopup = () => {
    SetIsRegister(true);
  };

  return (
    <Container>
      <Wrapper>
        <Search
          value={searchValue}
          width={'250px'}
          onClick={() => filterSearchValue()}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="이름, 권한 검색"
        />
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
