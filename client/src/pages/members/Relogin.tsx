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
          width="200px"
          height="40px"
          fontSize="15px"
          $borderRadius="10px"
          $normal
        >
          <span>로그인 하러 가기</span>
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 150px;
`;
const DiscriptionWrapper = styled.div`
  width: 600px;
  background-color: #eeeeee;
  padding: 15px;
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
`;
const Discription = styled.p`
  display: flex;
  justify-content: center;
  font-size: 15px;
  font-weight: 800;
`;
const ButtonWrapper = styled.div`
  border: none;
  background-color: transparent;
`;
