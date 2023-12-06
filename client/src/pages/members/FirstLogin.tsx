import React from 'react';
import styled from 'styled-components';
import { ChangePassword } from '../../components/password/ChangePassword';
import { useNavigate } from 'react-router-dom';
import { removeAuthorityCookie } from '../../utils/cookies';

const FirstLogin = () => {
  const navigate = useNavigate();

  const logout = () => {
    removeAuthorityCookie('userInfo', { path: '/' });
    removeAuthorityCookie('accessToken', { path: '/' });
    removeAuthorityCookie('refreshToken', { path: '/' });
    navigate('/login');
  };

  return (
    <>
      <S.main>
        <S.formContainer>
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
            onClick={logout}
            display="space-evenly"
            btnwidth={250}
            height={60}
          />
        </S.formContainer>
      </S.main>
    </>
  );
};

const S = {
  main: styled.main`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  formContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0px 1px 10px -4px rgba(112, 144, 176, 0.8);
  `,
  title: styled.div`
    font-size: 25px;
    margin-top: 20px;
    margin-bottom: 30px;
    color: #1b254b;
  `,
  discriptionContainer: styled.div`
    width: 550px;
    background-color: white;
    box-shadow: 1px 1px 5px 1px rgba(112, 144, 176, 0.4);
    border-radius: 10px;
    padding: 20px 0;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  discriptionTitle: styled.p`
    font-size: 16px;
    display: flex;
    justify-content: center;
  `,
  discription: styled.p`
    font-size: 14px;
    display: flex;
    text-align: left;
    justify-content: center;
  `,
};

export { FirstLogin };
