import * as React from 'react';

import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { removeAuthorityCookie } from '../../utils/cookies';

export function Relogin() {
  const navigate = useNavigate();

  const moveLogin = () => {
    removeAuthorityCookie('accessToken', { path: '/' });
    navigate('/login');
  };

  return (
    <Container>
      <DiscriptionWrapper>
        <Discription>새로운 비밀번호로 변경이 완료되었습니다.</Discription>
      </DiscriptionWrapper>
      <ButtonWrapper>
        <StyledLoginBtn
          variant="outlined"
          onClick={moveLogin}
          sx={{ backgroundColor: 'white' }}
        >
          로그인 하러 가기
        </StyledLoginBtn>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const DiscriptionWrapper = styled.div`
  width: 600px;
  background-color: white;
  box-shadow: 1px 1px 5px 1px rgba(112, 144, 176, 0.4);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 150px;
`;
const Discription = styled.p`
  display: flex;
  justify-content: center;
  font-size: 16px;
`;
const ButtonWrapper = styled.div`
  border: none;
  background-color: transparent;
`;
const StyledLoginBtn = styled(Button)`
  && {
    width: 250px;
    height: 60px;
    border-radius: 10px;
    font-size: 18px;
    line-height: normal;
  }
`;
