import * as React from 'react';
import { useState, useRef, useEffect } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { MdAccountBalance } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { LoginType, postLogin } from '../../api/auth';
import {
  Input,
  Label,
  Button,
  CheckBox,
  openToastifyAlert,
} from '../../components';
import { COLOR } from '../../components/constants/COLOR';
import {
  getAuthorityCookie,
  removeAuthorityCookie,
  setAuthorityCookie,
} from '../../utils/cookies';
import { postRefreshToken } from '../../utils/tokenHandler';

export function Login() {
  const [accessTokenData, setAccessTokenData] = useState<string>('');

  const [isClicked, setIsClicked] = useState(
    getAuthorityCookie('username') ? true : false,
  );

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();

  const Id = watch('username', '');
  const Password = watch('password', '');
  const IdInputRef = useRef<HTMLInputElement | null>(null);
  const PasswordInputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  function parseJwt(token: any) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );

    return JSON.parse(jsonPayload);
  }
  console.log(accessTokenData);

  //로그인 api
  const {
    data: loginPostData,
    mutate: onLogin,
    isSuccess,
  } = useMutation({
    mutationFn: postLogin,
    onError: (context: {
      response: { data: { message: string; code: string }; status: number };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
      if (context.response.data.code == 'GE-002') {
        postRefreshToken();
      }
      // console.log('loginPostData error', context.response.status);
    },
    onSuccess: (response: {
      data: {
        code: string;
        data: {
          accessToken: string;
          refreshToken: string;
          sessionId: string;
          initPasswordCode: string | null;
        };
      };
    }) => {
      console.log('accessToken ----login', response.data.data.accessToken);
      console.log('refreshToken ----login', response.data.data.refreshToken);
      console.log('sessionId -----login', response.data.data.sessionId);
      // 로컬데이터에서 토큰과 세션을 저장
      setAccessTokenData(response.data.data.accessToken);
      setAuthorityCookie('accessToken', response.data.data.accessToken, {
        path: '/',
        sameSite: 'strict',
        secure: false,
      });
      setAuthorityCookie('refreshToken', response.data.data.refreshToken, {
        path: '/',
        sameSite: 'strict',
        secure: false,
      });
      setAuthorityCookie('sessionId', response.data.data.sessionId, {
        path: '/',
        sameSite: 'strict',
        secure: false,
      });

      // 아이디 저장 체크박스
      if (isClicked === true) {
        setAuthorityCookie('username', Id, { path: '/' });
      } else {
        removeAuthorityCookie('username', { path: '/' });
      }

      // 코드값 S-005 일시 최초 비번등록 페이지로
      if (response.data.code == 'S-005') {
        navigate(`/init-change-password`, {
          state: response.data.data.initPasswordCode,
        });
      }
      if (response.data.code == 'S-001') {
        navigate(`/content-create/quiz`);
      }
    },
  });

  const submitLogin: SubmitHandler<LoginType> = (auth) => {
    if (IdInputRef.current?.value == '') {
      openToastifyAlert({
        type: 'error',
        text: '아이디를 입력해 주세요.',
      });
    } else if (PasswordInputRef.current?.value == '') {
      openToastifyAlert({
        type: 'error',
        text: '비밀번호를 입력해 주세요.',
      });
    } else {
      onLogin(auth);
    }
  };

  const checkIconselected = () => {
    setIsClicked(!isClicked);
  };

  const enterLogin = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit(submitLogin)();
  };

  const ClickIdLabel = () => {
    IdInputRef?.current?.focus();
  };

  const ClickPasswordLabel = () => {
    PasswordInputRef?.current?.focus();
  };
  // console.log('getLogin', getLoginData);

  return (
    <Container>
      <Wrapper>
        <LogoIconWrapper>
          <MdAccountBalance style={{ fontSize: '50px' }} />
        </LogoIconWrapper>
        <Title>드림콘텐츠 뱅크</Title>
        <Form onSubmit={handleSubmit(submitLogin)} method="POST">
          <InputWrapper>
            <IdWrapper>
              <Label fontSize="14px" value="아이디" onClick={ClickIdLabel} />
              <Controller
                control={control}
                name="username"
                defaultValue={getAuthorityCookie('username') || ''}
                render={({ field }) => (
                  <Input
                    border="normal"
                    width="400px"
                    height="40px"
                    padding="10px 20px"
                    fontSize="15px"
                    placeholderSize="15px"
                    type="text"
                    placeholder="아이디를 입력해주세요."
                    onChange={field.onChange}
                    value={field.value}
                    innerRef={IdInputRef}
                    maxLength={20}
                  />
                )}
              />
            </IdWrapper>
            <PasswordWrapper>
              <Label
                fontSize="14px"
                value="비밀번호"
                onClick={ClickPasswordLabel}
              />
              <Controller
                control={control}
                name="password"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    border="normal"
                    width="400px"
                    height="40px"
                    padding="10px 20px"
                    fontSize="15px"
                    placeholderSize="15px"
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    onChange={field.onChange}
                    value={field.value}
                    innerRef={PasswordInputRef}
                    maxLength={20}
                  />
                )}
              />
            </PasswordWrapper>
            <SaveIdWrapper onClick={checkIconselected}>
              <CheckBox isChecked={isClicked}></CheckBox>
              <SaveId>아이디 저장</SaveId>
            </SaveIdWrapper>
          </InputWrapper>
          <SaveButtonWrapper>
            <Button
              buttonType="submit"
              width="400px"
              height="40px"
              fontSize="15px"
              $borderRadius="10px"
              $filled
              cursor
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  enterLogin(e);
                }
              }}
            >
              <span>로그인</span>
            </Button>
          </SaveButtonWrapper>
        </Form>
        <NoticeMessage>
          아이디 혹은 비밀번호를 모르실 경우 관리자에게 문의해주세요
        </NoticeMessage>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  min-width: 800px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 150px;
`;
const Wrapper = styled.div``;
const LogoIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: 800;
  padding-bottom: 40px;
  color: ${COLOR.DARK_GRAY};
`;
const Form = styled.form``;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const IdWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const PasswordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SaveIdWrapper = styled.div`
  display: flex;
  cursor: pointer;
`;
const SaveId = styled.p`
  font-size: 15px;
  color: ${COLOR.DARK_GRAY};
  margin-left: 5px;
`;
const SaveButtonWrapper = styled.div`
  margin-top: 15px;
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
`;
const NoticeMessage = styled.p`
  display: flex;
  justify-content: center;
  color: ${COLOR.DARK_GRAY};
  font-size: 12px;
  padding-top: 15px;
`;
