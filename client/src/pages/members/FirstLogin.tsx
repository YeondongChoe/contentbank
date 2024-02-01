import * as React from 'react';
import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { MdAccountBalance } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { userInstance } from '../../api/axios';
import { COLOR } from '../../components/constants';
import { ChangePassword } from '../../components/password/ChangePassword';
import { removeAuthorityCookie } from '../../utils/cookies';

export function FirstLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    removeAuthorityCookie('userInfo', { path: '/' });
    removeAuthorityCookie('accessToken', { path: '/' });
    removeAuthorityCookie('refreshToken', { path: '/' });
    navigate('/login');
  };

  // 내 계정 조회
  const getMyInfo = () => {
    return userInstance.get(`/v1/account/my-info`);
  };
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['getMyInfo'],
    queryFn: getMyInfo,
  });
  console.log('getMyInfo', data && data.data.userKey);

  // 최초 접근시 파라미터 코드와 사용자에게 부여된 코드가 일치하는지 확인
  // 일치하지 않으면 403 코드를, 입력하지 않으면 400으로 응답
  // 화면 처리는 404 페이지를 보여주도록하여 접근하지 못하게 구현 필요
  useEffect(() => {
    const urlCode = location.search.split('?code=')[1];
    console.log('location code : ', urlCode);

    // if(data.data.userKey == urlCode)
  }, []);

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
