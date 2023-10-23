import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { passwordRegExp } from '../../utils/RegExp';
import { useNavigate } from 'react-router-dom';
import { ConfirmBtn, CancelBtn, NomalBtn } from '../button/CommonBtn';
import { getCookie, setCookie, removeCookie } from '../../utils/ReactCookie';

interface PasswordData {
  password: string;
  password_confirm: string;
}

interface Props {
  onCancel?: () => void;
  onClick?: () => void;
  width?: number;
  inputWidth?: number;
  right?: number;
  btnWidth?: number;
  height?: number;
  fontSize?: number;
  radius?: number;
  text?: string;
  display?: string;
}

const ChangePassword: React.FC<Props> = ({
  onClick,
  width,
  inputWidth,
  right,
  btnWidth,
  height,
  fontSize,
  radius,
  text,
  display,
}) => {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PasswordData>();

  const Password = watch('password', '');
  const PasswordConfirm = watch('password_confirm', '');
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<PasswordData> = () => {
    const data = {
      password: Password,
      confirmPassword: PasswordConfirm,
    };
    return axios
      .put('/auth-service/api/v1/auth/changed-password', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.headers['authorization'] !== getCookie('accessToken')) {
            setCookie('accessToken', response.headers['authorization'], {
              path: '/',
              sameSite: 'strict',
              secure: true,
            });
          }
          console.log(getCookie('accessToken'));
          console.log(response.headers['authorization']);
        }
        navigate('/relogin');
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <S.main right={right as number}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.inputcontainer width={width as number}>
          <S.inputWapper width={width as number}>
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
                  width={inputWidth as number}
                  type="password"
                  placeholder="영문, 숫자, 특수문자 혼용 8자리 이상"
                  onChange={field.onChange}
                  value={field.value}
                  className={isValid ? 'success' : ''}
                />
              )}
            />
          </S.inputWapper>
          {Password && (
            <S.errorMessage>{errors?.password?.message}</S.errorMessage>
          )}
          {isValid && <S.successMessage>사용가능</S.successMessage>}
          <S.inputWapper width={width as number}>
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
                  width={inputWidth as number}
                  type="password"
                  placeholder="영문, 숫자, 특수문자 혼용 8자리 이상"
                  onChange={field.onChange}
                  value={field.value}
                  className={
                    PasswordConfirm && Password === PasswordConfirm
                      ? 'passwordMatch'
                      : ''
                  }
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
        <S.btnContainer display={display as string}>
          <CancelBtn
            text="취소"
            color={'cancel'}
            onClick={onClick}
            width={btnWidth as number}
            height={height as number}
            fontSize={fontSize as number}
            radius={radius as number}
          />
          {PasswordConfirm && isValid ? (
            <ConfirmBtn
              color={'confirm'}
              text={text as string}
              width={btnWidth as number}
              height={height as number}
              fontSize={fontSize as number}
              radius={radius as number}
            />
          ) : (
            <NomalBtn
              color={'nomal'}
              text={text as string}
              width={btnWidth as number}
              height={height as number}
              fontSize={fontSize as number}
              radius={radius as number}
            />
          )}
        </S.btnContainer>
      </form>
    </S.main>
  );
};

const S = {
  main: styled.main<{ right: number }>`
    margin-right: ${(props) => props.right}px;
  `,
  inputcontainer: styled.div<{ width: number }>`
    width: ${(props) => props.width || 750}px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  `,
  inputWapper: styled.div<{ width: number }>`
    width: ${(props) => props.width || 750}px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  label: styled.label``,
  input: styled.input<{ width: number }>`
    width: ${(props) => props.width || 550}px;
    height: 40px;
    padding: 10px;
    font-size: 14px;
    border: none;
    border-bottom: 1px solid red;
    outline: none;
    &.success {
      border-color: green;
    }
    &.passwordMatch {
      border-color: green;
    }
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
  btnContainer: styled.div<{ display: string }>`
    display: flex;
    justify-content: ${(props) => props.display};
    gap: 20px;
    margin-top: 50px;
  `,
};
export default ChangePassword;
