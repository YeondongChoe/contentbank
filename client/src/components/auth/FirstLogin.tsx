import * as React from 'react';
import { useEffect, useState } from 'react';

import { SubmitHandler } from 'react-hook-form';
import { MdAccountBalance } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { COLOR } from '../../components/constants';
import { removeAuthorityCookie } from '../../utils/cookies';

import { ChangePassword } from './password/ChangePassword';

export function FirstLogin() {
  const navigate = useNavigate();
  const location = useLocation();

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
          display="space-evenly"
          width="600px"
          inputwidth="400px"
          btnwidth="200px"
          height="40px"
          padding="20px 0px"
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
  color: ${COLOR.FONT_BLACK};
`;
const DiscriptionWrapper = styled.div`
  width: 600px;
  background-color: ${COLOR.LIGHT_GRAY};
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
