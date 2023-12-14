import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ChangePassword } from '../../components/password/ChangePassword';
import { removeAuthorityCookie } from '../../utils/cookies';

export function FirstLogin() {
  const navigate = useNavigate();

  const logout = () => {
    removeAuthorityCookie('userInfo', { path: '/' });
    removeAuthorityCookie('accessToken', { path: '/' });
    removeAuthorityCookie('refreshToken', { path: '/' });
    navigate('/login');
  };

  return (
    <Container>
      <Wrapper>
        <Title>최초 로그인시 비밀번호 변경</Title>
        <DiscriptionWrapper>
          <DiscriptionTitle>새로운 비밀번호로 변경해주세요</DiscriptionTitle>
          <Discription>
            비밀번호는 영문과 숫자, 특수문자(~,!,@,#,$,%,^,&,*,(,),_,-만 사용
            가능)를 <br />
            조합하여 8 ~ 20자 이내로 설정해야 합니다.
          </Discription>
        </DiscriptionWrapper>
        <ChangePassword
          onClick={logout}
          display="space-evenly"
          width="750px"
          inputwidth="550px"
          btnwidth="250px"
          height="60px"
          padding="40px 0px 0px 0px"
        />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  min-width: 800px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 1px 10px -4px rgba(112, 144, 176, 0.8);
  padding: 20px;
`;
const Title = styled.div`
  font-size: 25px;
  padding-bottom: 30px;
  color: #1b254b;
`;
const DiscriptionWrapper = styled.div`
  width: 600px;
  background-color: white;
  box-shadow: 1px 1px 5px 1px rgba(112, 144, 176, 0.4);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const DiscriptionTitle = styled.p`
  font-size: 16px;
  display: flex;
  justify-content: center;
`;
const Discription = styled.p`
  font-size: 14px;
  display: flex;
  text-align: left;
  justify-content: center;
`;
