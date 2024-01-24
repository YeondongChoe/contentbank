import * as React from 'react';

import { MdAccountBalance } from 'react-icons/md';
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
        <LogoIconWrapper>
          <MdAccountBalance style={{ fontSize: '50px' }} />
        </LogoIconWrapper>
        <Title>최초 로그인시 비밀번호 변경</Title>
        <DiscriptionWrapper>
          <DiscriptionTitle>새로운 비밀번호로 변경해주세요</DiscriptionTitle>
          <Discription>
            비밀번호는 영문과 숫자, 특수문자(~,!,@,#,$,%,^,&,*,(,),_,-만 사용
            가능) <br />를 조합하여 8 ~ 20자 이내로 설정해야 합니다.
          </Discription>
        </DiscriptionWrapper>
        <ChangePassword
          onClick={logout}
          display="space-evenly"
          width="600px"
          inputwidth="430px"
          btnwidth="200px"
          height="40px"
          padding="25px 0px 0px 0px"
          buttonfontsize="15px"
        />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  min-width: 800px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 150px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  color: #1b254b;
`;
const DiscriptionWrapper = styled.div`
  width: 600px;
  background-color: #eeeeee;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const DiscriptionTitle = styled.p`
  font-size: 15px;
  font-weight: 800;
  display: flex;
  justify-content: center;
`;
const Discription = styled.p`
  font-size: 14px;
  display: flex;
  text-align: center;
  justify-content: center;
`;
