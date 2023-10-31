import React, { useState } from 'react';
import styled from 'styled-components';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from 'axios';
import { setCookie, getCookie, removeCookie } from '../../utils/ReactCookie';
import { useNavigate } from 'react-router-dom';
import NoticeAlert from '../../components/alert/NoticeAlert';
import { useRecoilState } from 'recoil';
import { alertState } from '../../recoil/State';
import { passwordRegExp } from '../../utils/RegExp';
import { Button } from '@mui/material';

interface SigninData {
  id: string;
  password: string;
}

const Login = () => {
  const [isClicked, setIsClicked] = useState(
    getCookie('userId') ? true : false,
  );
  const [isAlertOpen, setIsAlertOpen] = useRecoilState(alertState);
  const [errorMsg, setErrorMsg] = useState('');

  const openAlert = () => {
    setIsAlertOpen(true);
  };

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninData>();

  const Id = watch('id', '');
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SigninData> = (data) => {
    return axios
      .post('/auth-service/api/v1/auth/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCookie('accessToken', response.data.access_token, {
            path: '/',
            sameSite: 'strict',
            secure: false,
          });
          if (response.data.initPassword === true) {
            navigate('/firstlogin');
          } else {
            navigate('/contentpage');
          }
        }
        if (isClicked === true) {
          setCookie('userId', Id, { path: '/' });
        } else {
          removeCookie('userId', { path: '/' });
        }
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message);
        openAlert();
      });
  };

  const clickHandler = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <S.main>
        <S.title>로그인</S.title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.inputContainer>
            <Controller
              control={control}
              name="id"
              defaultValue={getCookie('userId') || ''}
              rules={{
                required: '아이디를 입력해주세요.',
              }}
              render={({ field }) => (
                <S.input
                  type="text"
                  placeholder="아이디를 입력해주세요."
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
            <S.errorMessage>{errors?.id?.message}</S.errorMessage>
            <Controller
              control={control}
              name="password"
              defaultValue=""
              rules={{
                required: '비밀번호를 입력해주세요.',
                pattern: {
                  value: passwordRegExp,
                  message: '영문, 숫자, 특수문자 혼용 8자리 이상',
                },
              }}
              render={({ field }) => (
                <S.input
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
            <S.errorMessage>{errors?.password?.message}</S.errorMessage>
            <S.saveWarraper>
              <S.saveIcon onClick={clickHandler}>
                {isClicked ? (
                  <CheckCircleOutlineIcon fontSize="small" />
                ) : (
                  <RadioButtonUncheckedIcon fontSize="small" />
                )}
                <S.saveId>아이디 저장</S.saveId>
              </S.saveIcon>
            </S.saveWarraper>
          </S.inputContainer>
          <S.btnWrapper>
            <StyledBtn variant="contained" size="large">
              로그인
            </StyledBtn>
          </S.btnWrapper>
        </form>
        <S.message>
          * 아이디/ 비밀번호를 모르실 경우, 관리자에게 문의해주세요.
        </S.message>
        {isAlertOpen && <NoticeAlert title={errorMsg} />}
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
  title: styled.div`
    font-size: 25px;
    margin-bottom: 40px;
  `,
  form: styled.form``,
  inputContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  `,
  input: styled.input`
    width: 400px;
    height: 40px;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #a1a1a1;
  `,
  errorMessage: styled.div`
    width: 400px;
    font-size: 12px;
    color: red;
    display: flex;
    justify-content: flex-start;
  `,
  saveWarraper: styled.div`
    width: 400px;
    margin-left: 40px;
    display: flex;
    justify-content: flex-start;
    gap: 10px;
  `,
  saveIcon: styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 18px;
  `,
  saveId: styled.p`
    font-size: 14px;
    margin-left: 5px;
  `,
  btnWrapper: styled.button`
    margin-top: 30px;
    background-color: transparent;
    border: none;
  `,
  message: styled.p`
    font-size: 12px;
    margin-top: 10px;
  `,
};

const StyledBtn = styled(Button)`
  && {
    width: 500px;
    height: 50px;
    border-radius: 10px;
    font-size: 17px;
    line-height: normal;
  }
`;
export default Login;
