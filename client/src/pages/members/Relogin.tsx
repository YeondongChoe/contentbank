import * as React from 'react';

import { MdAccountBalance } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from '../../components';
import { COLOR } from '../../components/constants';
import { removeAuthorityCookie } from '../../utils/cookies';

export function Relogin() {
  const navigate = useNavigate();

  const moveLogin = () => {
    // removeAuthorityCookie('accessToken', { path: '/' });
    // navigate('/login');
  };

  return (
    <Container>
      <LogoIconWrapper>
        <MdAccountBalance style={{ fontSize: '50px' }} />
      </LogoIconWrapper>
      <Title>비밀번호 변경</Title>
      <DiscriptionWrapper>
        <Discription>새로운 비밀번호로 변경이 완료되었습니다.</Discription>
      </DiscriptionWrapper>
      <ButtonWrapper>
        <Button
          onClick={moveLogin}
          width="600px"
          height="40px"
          fontSize="15px"
          $borderRadius="10px"
          $filled
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
const LogoIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 800;
  padding-bottom: 25px;
  color: ${COLOR.FONT_BLACK};
`;
const DiscriptionWrapper = styled.div`
  width: 600px;
  height: 60px;
  background-color: ${COLOR.LIGHT_GRAY};
  padding: 15px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
const Discription = styled.p`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: 800;
`;
const ButtonWrapper = styled.div`
  border: none;
  background-color: transparent;
`;
