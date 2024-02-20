import * as React from 'react';
import { useState, useRef, useEffect } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { MdAccountBalance } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { authInstance, handleAuthorizationRenewal } from '../../api/axios';
import {
  Input,
  Label,
  Button,
  CheckBox,
  openToastifyAlert,
} from '../../components';
import { COLOR } from '../../components/constants/COLOR';
import { accessTokenAtom, sessionIdAtom } from '../../store/auth';
import {
  getAuthorityCookie,
  removeAuthorityCookie,
  setAuthorityCookie,
} from '../../utils/cookies';

type LoginType = {
  username: string;
  password: string;
};

export function Login() {
  const queryClient = useQueryClient();
  const setAccessTokenAtom = useSetRecoilState(accessTokenAtom);
  const setSessionIdAtom = useSetRecoilState(sessionIdAtom);
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

  //로그인 api
  const postLogin = (auth: LoginType) => {
    // console.log('postLogin', auth);

    return authInstance.post('/v1/auth/login', auth);
  };

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
      console.log('loginPostData error', context.response.status);

      // 401 인증되지 않음 = e-006
      if (context.response.data.code === 'E-006') {
        // 토큰 만료시 갱신
        handleAuthorizationRenewal(context.response.data.code);
      }
    },
    onSuccess: (response) => {
      console.log('accessToken ----login', response.data.data.accessToken);
      console.log('refreshToken ----login', response.data.data.refreshToken);
      console.log('sessionId ----login', response.data.data.sessionId);
      // 로컬데이터에서 토큰과 세션을 저장
      setAuthorityCookie('accessToken', response.data.data.accessToken, {
        path: '/',
        sameSite: 'strict',
        secure: false,
      });
      setAuthorityCookie('sessionId', response?.data.data.sessionId, {
        path: '/',
        sameSite: 'strict',
        secure: false,
      });
      // 프론트 전역에 데이터로저장
      setAccessTokenAtom(response.data.data.accessToken);
      setSessionIdAtom(response.data.data.sessionId);

      // 아이디 저장 체크박스
      if (isClicked === true) {
        setAuthorityCookie('username', Id, { path: '/' });
      } else {
        removeAuthorityCookie('username', { path: '/' });
      }
    },
    onSettled: (response) => {
      // console.log('onSettled', response);
      console.log('로그인 onSettled ', getAuthorityCookie('accessToken'));
      console.log('로그인 onSettled  ', getAuthorityCookie('sessionId'));

      //첫 로그인시 비밀번호 변경 페이지로 || 로그인 성공후 메인으로
      navigate(response?.data.link);
      if (response?.data.link === '/content-create/quiz') {
        //TODO: 메인으로 갈시 임시 페이지 리로딩 임시
        // const cookieData = document.cookie;
        window.location.reload();
      }
    },
  });

  const submitLogin: SubmitHandler<LoginType> = (auth) => {
    // console.log('auth ', auth);

    onLogin(auth);
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

  useEffect(() => {
    console.log('isSuccess ::', isSuccess);
    console.log('loginPostData ::', loginPostData);
  }, [isSuccess]);

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
