import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { passwordRegExp } from '../../utils/RegExp';

interface PasswordData {
  password: string;
  password_confirm: string;
}

const ChangePassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PasswordData>();

  const Password = watch('password');
  const PasswordConfirm = watch('password_confirm');

  const onSubmit: SubmitHandler<PasswordData> = (data) => {
    return axios
      .post('/auth-service/api/v1/auth/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log(response);
        }
      })

      .catch((error) => {
        alert(`${error}`);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <S.inputcontainer>
        <S.inputWapper>
          <S.label>새 비밀번호</S.label>
          <Controller
            control={control}
            name="password"
            defaultValue=""
            rules={{
              required: '비밀번호를 입력해주세요.',
              pattern: {
                value: passwordRegExp,
                message: '사용불가능',
              },
            }}
            render={({ field }) => (
              <S.input
                type="password"
                placeholder="영문, 숫자, 특수문자 혼용 8자리 이상"
                onChange={field.onChange}
                value={field.value}
                success={isValid}
              />
            )}
          />
        </S.inputWapper>
        {Password && (
          <S.errorMessage>{errors?.password?.message}</S.errorMessage>
        )}
        {isValid && <S.successMessage>사용가능</S.successMessage>}
        <S.inputWapper>
          <S.label>새 비밀번호 재확인</S.label>
          <Controller
            control={control}
            name="password_confirm"
            defaultValue=""
            rules={{
              required: false,
              pattern: {
                value: passwordRegExp,
                message: '비밀번호 불일치',
              },
            }}
            render={({ field }) => (
              <S.input
                type="password"
                placeholder="영문, 숫자, 특수문자 혼용 8자리 이상"
                onChange={field.onChange}
                value={field.value}
                passwordMatch={PasswordConfirm && Password === PasswordConfirm}
              />
            )}
          />
        </S.inputWapper>
        {PasswordConfirm && Password === PasswordConfirm ? (
          <S.successMessage>비밀번호 일치</S.successMessage>
        ) : (
          <S.errorMessage>{errors?.password_confirm?.message}</S.errorMessage>
        )}
      </S.inputcontainer>
      <S.btnContainer>
        <S.cancelBtn>취소</S.cancelBtn>
        {PasswordConfirm && isValid ? (
          <S.confirmlBtn>확인</S.confirmlBtn>
        ) : (
          <S.unconfirmlBtn>확인</S.unconfirmlBtn>
        )}
      </S.btnContainer>
    </form>
  );
};

const S = {
  main: styled.main``,
  inputcontainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  `,
  inputWapper: styled.div`
    width: 750px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  label: styled.label``,
  input: styled.input<{ success?: boolean; passwordMatch?: string | boolean }>`
    width: 550px;
    height: 40px;
    padding: 10px;
    font-size: 14px;
    border: none;
    border-bottom: 1px solid red;
    outline: none;
    border-color: ${(props) => {
      if (props.success) {
        return 'green';
      }
      if (props.passwordMatch) {
        return 'green';
      }
      return 'red';
    }};
  `,
  successMessage: styled.div`
    width: 550px;
    font-size: 12px;
    color: green;
    display: flex;
    font-weight: bold;
    justify-content: flex-end;
  `,
  errorMessage: styled.div`
    width: 550px;
    font-size: 12px;
    color: red;
    display: flex;
    font-weight: bold;
    justify-content: flex-end;
  `,
  btnContainer: styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 70px;
  `,
  cancelBtn: styled.p`
    width: 200px;
    height: 50px;
    margin-top: 30px;
    border-radius: 10px;
    color: white;
    background-color: #bfbfbf;
    border: none;
    font-size: 17px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  unconfirmlBtn: styled.button`
    width: 200px;
    height: 50px;
    margin-top: 30px;
    border-radius: 10px;
    color: white;
    background-color: #bfbfbf;
    border: none;
    font-size: 17px;
    cursor: pointer;
  `,
  confirmlBtn: styled.button`
    width: 200px;
    height: 50px;
    margin-top: 30px;
    border-radius: 10px;
    color: white;
    background-color: #4990d3;
    border: none;
    font-size: 17px;
    cursor: pointer;
  `,
};
export default ChangePassword;
