import React from 'react';
import styled from 'styled-components';
import ChangePassword from '../../components/password/ChangePassword';
import { useNavigate } from 'react-router-dom';
import { removeCookie } from '../../utils/ReactCookie';

const FirstLogin = () => {
  const navigate = useNavigate();

  const logout = () => {
    removeCookie('userInfo', { path: '/' });
    removeCookie('accessToken', { path: '/' });
    removeCookie('refreshToken', { path: '/' });
    navigate('/login');
  };

  return (
    <>
      <S.main>
        <S.title>최초 로그인시 비밀번호 변경</S.title>
        <S.discriptionContainer>
          <S.discriptionTitle>
            새로운 비밀번호로 변경해주세요
          </S.discriptionTitle>
          <S.discription>
            비밀번호는 영문과 숫자, 특수문자(~,!,@,#,$,%,^,&,*,(,),_,-만 사용
            가능) <br />를 조합하여 8 ~ 20자 이내로 설정해야 합니다.
          </S.discription>
        </S.discriptionContainer>
        <ChangePassword
          onCancel={logout}
          btnWidth={250}
          height={60}
          radius={10}
          fontSize={16}
          text="확인"
          display="space-evenly"
        />
      </S.main>
    </>
  );
};

const S = {
  main: styled.main`
    width: 1280px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  title: styled.div`
    font-size: 25px;
    margin-bottom: 40px;
  `,
  discriptionContainer: styled.div`
    width: 550px;
    background-color: #e9e9e9;
    padding: 20px 0;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  discriptionTitle: styled.p`
    font-size: 16px;
  `,
  discription: styled.p`
    font-size: 14px;
    display: flex;
    text-align: left;
    justify-content: center;
  `,
};

export default FirstLogin;
