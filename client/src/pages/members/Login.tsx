import React, { useState } from 'react';
import styled from 'styled-components';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { getAuthorityCookie } from '../../utils/cookies';
import { useNavigate } from 'react-router-dom';
import { NoticeAlert } from '../../components/alert/NoticeAlert';
import { useRecoilState } from 'recoil';
import { alertBoolAtom } from '../../state/utilAtom';
import { postLogin } from '../../api/postAxios';

import { Button } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

type loginProps = {
  id: string;
  password: string;
};

const Login = () => {
  const [isClicked, setIsClicked] = useState(
    getAuthorityCookie('userId') ? true : false,
  );
  const [isAlertOpen, setIsAlertOpen] = useRecoilState(alertBoolAtom);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<loginProps>();

  const Id = watch('id', '');
  const navigate = useNavigate();

  const submitLogin: SubmitHandler<loginProps> = async (data) => {
    postLogin({ navigate, isClicked, Id, setErrorMessage, openAlert }, data);
  };

  const checkIconselected = () => {
    setIsClicked(!isClicked);
  };

  const openAlert = () => {
    setIsAlertOpen(true);
  };

  return (
    <>
      <S.main>
        <S.formContainer>
          <S.title>로그인</S.title>
          <form onSubmit={handleSubmit(submitLogin)}>
            <S.inputContainer>
              <S.label>아이디*</S.label>
              <Controller
                control={control}
                name="id"
                defaultValue={getAuthorityCookie('userId') || ''}
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
                <S.saveIcon onClick={checkIconselected}>
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
          {isAlertOpen && <NoticeAlert title={errorMessage} />}
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
export { Login };
