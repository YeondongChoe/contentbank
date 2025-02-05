import * as React from 'react';
import { useState, useRef, useEffect } from 'react';

import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Input, Label, Button, Alert, openToastifyAlert } from '../..';
import { patchPassword, patchPasswordInit } from '../../../api/user';
import { passwordRegex } from '../../../components/constants';
import {
  getAuthorityCookie,
  removeAuthorityCookie,
  setAuthorityCookie,
} from '../../../utils/cookies';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { COLOR } from '../../constants/COLOR';

type passwordProps = {
  password: string;
  password_confirm: string;
};

type ChangePasswordProps = {
  width?: string;
  inputwidth?: string;
  btnwidth?: string;
  height?: string;
  display?: string;
  marginleft?: string;
  padding?: string;
  buttonfontsize?: string;
  labelfontsize?: string;
  placeholdersize?: string;
  buttonGroupWidth?: string;
  messageWidth?: string;
  goLogin?: (password: string) => void;
  setPassword?: (password: string) => void;
  setIsPasswordEdit?: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ChangePassword({
  width,
  inputwidth,
  btnwidth,
  height,
  display,
  marginleft,
  padding,
  buttonfontsize,
  buttonGroupWidth,
  messageWidth,
  labelfontsize,
  placeholdersize,
  goLogin,
  setIsPasswordEdit,
}: ChangePasswordProps) {
  const [disabled, setDisabled] = useState<boolean>(true);
  const {
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<passwordProps>();

  const location = useLocation();
  const [code, setCode] = useState('');

  const PasswordInputRef = useRef<HTMLInputElement | null>(null);
  const PasswordConfirmInputRef = useRef<HTMLInputElement | null>(null);

  const ClickPasswordLabel = () => {
    PasswordInputRef?.current?.focus();
  };

  const ClickPasswordConfirmLabel = () => {
    PasswordConfirmInputRef?.current?.focus();
  };

  const Password = watch('password', '');
  const PasswordConfirm = watch('password_confirm', '');

  const navigate = useNavigate();

  // 최초 로그인 패스워드 변경 api
  const { data: passwordDataInit, mutate: changePasswordInit } = useMutation({
    mutationFn: patchPasswordInit,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
      if (context.response.data.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response: { data: { message: string } }) => {
      console.log('passwordDataInit', response);
      openToastifyAlert({
        type: 'success',
        text: response.data.message,
      });

      postRefreshToken().then(() => {
        console.log('getAuthorityCookie', getAuthorityCookie('accessToken'));
        navigate(`/content-create/quiz`);
      });
    },
  });

  // useEffect(() => {
  //   if (passwordDataInit && getAuthorityCookie('accessToken')) {
  //     console.log('getAuthorityCookie', getAuthorityCookie('accessToken'));
  //     console.log('passwordDataInit', passwordDataInit);
  //     navigate(`/content-create/quiz`);
  //   }
  // }, []);
  const submitPasswordInit = (password: string) => {
    const auth = { code: code, password: password, passwordConfirm: password };
    changePasswordInit(auth);
  };

  // 마이페이지 패스워드 변경 api
  const { data: passwordData, mutate: changePassword } = useMutation({
    mutationFn: patchPassword,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
      if (context.response.data.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response: {
      data: {
        message: string;
        data: {
          newAccessToken: string;
        };
      };
    }) => {
      console.log('passwordData', response);
      openToastifyAlert({
        type: 'success',
        text: response.data.message,
      });
      // 변경 후 토큰값도 재배치
      setAuthorityCookie('accessToken', response.data.data.newAccessToken, {
        path: '/',
        sameSite: 'strict',
        secure: false,
      });
    },
  });
  const submitPassword = (password: string) => {
    const auth = { password: password, passwordConfirm: password };

    changePassword(auth);
  };

  useEffect(() => {
    const initCode = location.state;
    console.log('location code : ', initCode);
    setCode(initCode);
  }, []);

  const submitChangePassword = () => {
    //마이페이지 비밀번호 변경
    if (location.pathname == '/mypage') submitPassword(PasswordConfirm);
    //최초 비밀번호 변경 code 가 있을시
    if (code !== null) submitPasswordInit(PasswordConfirm);
  };

  const changeDisable = () => {
    console.log('dsdsds', passwordRegex.test(Password));

    if (Password.length >= 8 && Password == PasswordConfirm) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  useEffect(() => {
    changeDisable();
  }, [PasswordConfirm, Password]);

  const onCancel = () => {
    if (setIsPasswordEdit) {
      setIsPasswordEdit(false);
    }
    if (code !== null) {
      //쿠키 세션 정리
      removeAuthorityCookie('username', { path: '/' });

      removeAuthorityCookie('accessToken', {
        path: '/',
        sameSite: 'strict',
        secure: false,
      });
      removeAuthorityCookie('refreshToken', {
        path: '/',
        sameSite: 'strict',
        secure: false,
      });
      removeAuthorityCookie('sessionId', {
        path: '/',
        sameSite: 'strict',
        secure: false,
      });
      navigate('/login');
    }
  };

  const handleOnInput = (e: React.KeyboardEvent<HTMLInputElement>) => {};

  return (
    <Container width={width as string}>
      {/* {isSuccessAlertOpen && (
        <Alert
          description={
            '비밀번호를 변경하면 로그인한 디바이스에서 모두 로그아웃 처리됩니다. 변경하시겠습니까?'
          }
          isAlertOpen={isSuccessAlertOpen}
          action="확인"
          isWarning={true}
          onClick={submitChangePassword}
          onClose={CloseSuccessAlert}
        ></Alert>
      )} */}

      <InputWrapper width={width as string}>
        <Label
          value="새 비밀번호"
          fontSize={labelfontsize || '16px'}
          width="150px"
          onClick={ClickPasswordLabel}
        />
        <Controller
          control={control}
          name="password"
          defaultValue=""
          rules={{
            required: '비밀번호를 입력해주세요.',
            pattern: {
              value: passwordRegex,
              message: '사용불가능',
            },
          }}
          render={({ field }) => (
            <Input
              borderbottom
              width={inputwidth as string}
              height="30px"
              padding="10px 20px"
              fontSize="15px"
              placeholderSize={placeholdersize as string}
              type="password"
              placeholder="영문, 숫자, 특수문자 혼용 8자리 이상"
              onKeyUp={(e) => handleOnInput(e)}
              maxLength={20}
              minLength={8}
              onChange={field.onChange}
              value={field.value}
              className={isValid ? 'success' : ''}
              innerRef={PasswordInputRef}
            />
          )}
        />
      </InputWrapper>
      {Password && isValid && (
        <SuccessMessage $messageWidth={messageWidth as string}>
          사용가능
          <svg
            width="18"
            height="15"
            viewBox="0 0 18 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 2.20492L6 14.2049L0.5 8.70492L1.91 7.29492L6 11.3749L16.59 0.794922L18 2.20492Z"
              fill="#11C218"
            />
          </svg>
        </SuccessMessage>
      )}
      {Password && !isValid && !PasswordConfirm && (
        <ErrorMessage $messageWidth={messageWidth as string}>
          사용 불가능
          <svg
            width="18"
            height="15"
            viewBox="0 0 18 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 2.20492L6 14.2049L0.5 8.70492L1.91 7.29492L6 11.3749L16.59 0.794922L18 2.20492Z"
              fill="#FF523E"
            />
          </svg>
        </ErrorMessage>
      )}
      <InputWrapper width={width as string}>
        <Label
          value="새 비밀번호 재확인"
          fontSize={labelfontsize || '16px'}
          width="150px"
          onClick={ClickPasswordConfirmLabel}
        />
        <Controller
          control={control}
          name="password_confirm"
          // width={inputwidth as string}
          defaultValue=""
          rules={{
            required: false,
            pattern: {
              value: passwordRegex,
              message: '비밀번호 불일치',
            },
          }}
          render={({ field }) => (
            <Input
              borderbottom
              width={inputwidth as string}
              height="30px"
              padding="10px 20px"
              fontSize="15px"
              placeholderSize={placeholdersize as string}
              type="password"
              placeholder="영문, 숫자, 특수문자 혼용 8자리 이상"
              onChange={field.onChange}
              value={field.value}
              maxLength={20}
              minLength={8}
              className={
                PasswordConfirm && Password === PasswordConfirm
                  ? 'passwordMatch'
                  : ''
              }
              innerRef={PasswordConfirmInputRef}
            />
          )}
        />
      </InputWrapper>
      {PasswordConfirm && Password === PasswordConfirm && (
        <SuccessMessage $messageWidth={messageWidth as string}>
          비밀번호 일치
          <svg
            width="18"
            height="15"
            viewBox="0 0 18 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 2.20492L6 14.2049L0.5 8.70492L1.91 7.29492L6 11.3749L16.59 0.794922L18 2.20492Z"
              fill="#11C218"
            />
          </svg>
        </SuccessMessage>
      )}
      {PasswordConfirm && Password !== PasswordConfirm && (
        <ErrorMessage $messageWidth={messageWidth as string}>
          비밀번호 불일치
          <svg
            width="18"
            height="15"
            viewBox="0 0 18 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 2.20492L6 14.2049L0.5 8.70492L1.91 7.29492L6 11.3749L16.59 0.794922L18 2.20492Z"
              fill="#FF523E"
            />
          </svg>
        </ErrorMessage>
      )}

      <ButtonGroup
        display={display as string}
        marginLeft={marginleft as string}
        $padding={padding as string}
        $buttonGroupWidth={buttonGroupWidth as string}
      >
        <ButtonWrapper>
          <Button
            onClick={() => onCancel()}
            width={btnwidth}
            height={height}
            fontSize={buttonfontsize}
            $borderRadius="7px"
            $border
            cursor
          >
            <span>취소</span>
          </Button>
        </ButtonWrapper>

        <ButtonWrapper>
          <Button
            onClick={submitChangePassword}
            width={btnwidth}
            height={height}
            fontSize={buttonfontsize}
            $borderRadius="7px"
            $filled
            cursor
            disabled={disabled}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                submitChangePassword();
              }
            }}
          >
            <span>변경</span>
          </Button>
        </ButtonWrapper>
      </ButtonGroup>
    </Container>
  );
}

const Container = styled.form<{ width: string }>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
`;

const InputWrapper = styled.div<{ width: string; inputwidth?: string }>`
  height: 50px;
  display: flex;
  align-items: center;
  gap: 40px;
  width: ${({ width }) => (width ? ` ${width};` : '100%')};

  > div:has(input) {
    width: ${({ inputwidth }) =>
      inputwidth ? ` ${inputwidth};` : 'calc(100% - 200px)'};
  }
`;
const SuccessMessage = styled.div<{ $messageWidth: string }>`
  width: ${({ $messageWidth }) =>
    $messageWidth ? ` ${$messageWidth};` : '600px'};
  padding: 0 10px;
  font-size: 12px;
  color: ${COLOR.SUCCESS};
  display: flex;
  font-weight: bold;
  justify-content: flex-end;
  gap: 7px;
`;
const ErrorMessage = styled.div<{ $messageWidth: string }>`
  width: ${({ $messageWidth }) =>
    $messageWidth ? ` ${$messageWidth};` : '600px'};
  padding: 0 10px;
  font-size: 12px;
  color: ${COLOR.ERROR};
  display: flex;
  font-weight: bold;
  justify-content: flex-end;
  gap: 7px;
`;

const ButtonGroup = styled.div<{
  display: string;
  marginLeft: string;
  $padding: string;
  $buttonGroupWidth: string;
}>`
  width: ${({ $buttonGroupWidth }) =>
    $buttonGroupWidth ? `${$buttonGroupWidth};` : '600px'};
  display: flex;
  gap: 20px;
  justify-content: ${(props) => props.display};
  padding: ${({ $padding }) => ($padding ? `${$padding};` : '0px')};
`;

const ButtonWrapper = styled.div`
  border: none;
  background-color: transparent;
`;
