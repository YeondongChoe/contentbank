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
          'Accept-Language': 'ko',
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
            navigate('/contentlist');
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
        <S.formContainer>
          <S.title>로그인</S.title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <S.inputContainer>
              <S.label>아이디*</S.label>
              <Controller
                control={control}
                name="id"
                defaultValue={getCookie('userId') || ''}
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
              <S.label>비밀번호*</S.label>
              <Controller
                control={control}
                name="password"
                defaultValue=""
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
            * 아이디/비밀번호를 모르실 경우, 관리자에게 문의해주세요.
          </S.message>
          {isAlertOpen && <NoticeAlert title={errorMsg} />}
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
    background-color: white;
    border-radius: 20px;
    box-shadow: 0px 1px 10px -4px rgba(112, 144, 176, 0.8);
  `,
  title: styled.div`
    width: 400px;
    display: flex;
    font-size: 25px;
    margin-top: 20px;
    margin-bottom: 30px;
    color: #1b254b;
    margin-left: 20px;
  `,
  form: styled.form``,
  inputContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  `,
  label: styled.label`
    width: 400px;
    display: flex;
    color: #1b254b;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin-left: 0.375rem;
  `,
  input: styled.input`
    width: 400px;
    height: 40px;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #e9ecef;
    border-radius: 10px;
    ::placeholder {
      color: red;
    }
    :focus {
      outline: none;
    }
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
    color: #1b254b;
    font-weight: 500;
    line-height: 1.25rem;
    margin-left: 0.375rem;
  `,
  btnWrapper: styled.button`
    width: 100%;
    margin-top: 30px;
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: center;
  `,
  message: styled.p`
    display: flex;
    color: #1b254b;
    margin-left: 25px;
    font-size: 13px;
    margin-top: 20px;
    margin-bottom: 20px;
  `,
};

const StyledBtn = styled(Button)`
  && {
    width: 400px;
    height: 50px;
    border-radius: 10px;
    font-size: 17px;
    line-height: normal;
  }
`;
export default Login;
