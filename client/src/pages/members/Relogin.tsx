import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { removeCookie } from '../../utils/ReactCookie';
import { Button } from '@mui/material';

const Relogin = () => {
  const navigate = useNavigate();

  const onConfirm = () => {
    removeCookie('accessToken', { path: '/' });
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
        <S.btnWrapper>
          <StyledLoginBtn variant="outlined" onClick={onConfirm}>
            로그인 하러 가기
          </StyledLoginBtn>
        </S.btnWrapper>
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
  btnWrapper: styled.button`
    border: none;
    background-color: transparent;
  `,
};

const StyledLoginBtn = styled(Button)`
  && {
    width: 250px;
    height: 60px;
    border-radius: 10px;
    font-size: 18px;
    line-height: normal;
  }
`;

export default Relogin;
