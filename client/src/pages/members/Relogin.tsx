import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from '../../components';
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
        <Button
          onClick={moveLogin}
          width="250px"
          height="60px"
          fontSize="18px"
          $borderRadius="10px"
          $border
          $normal
        >
          <span>로그인 하러 가기</span>
        </Button>
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
