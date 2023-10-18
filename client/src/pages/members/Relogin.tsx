import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { NomalBtn } from '../../components/button/CommonBtn';
import { removeCookie } from '../../utils/ReactCookie';

const Relogin = () => {
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
        <S.discriptionContainer>
          <S.discriptionTitle>
            새로운 비밀번호로 변경이 완료되었습니다.
          </S.discriptionTitle>
        </S.discriptionContainer>
        <div onClick={logout}>
          <NomalBtn text="로그인 하러 가기" />
        </div>
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
  discriptionContainer: styled.div`
    width: 550px;
    background-color: #e9e9e9;
    padding: 20px 0;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 150px;
  `,
  discriptionTitle: styled.p`
    font-size: 16px;
  `,
};

export default Relogin;
