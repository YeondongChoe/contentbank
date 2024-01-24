import * as React from 'react';
import { useState, useRef } from 'react';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { MdAccountBalance } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { postLogin } from '../../api/postAxios';
import { Input, Label, Button, CheckBox, AlertBar } from '../../components';
import { COLOR } from '../../components/constants/COLOR';
import { getAuthorityCookie } from '../../utils/cookies';

type loginProps = {
  id: string;
  password: string;
};

export function Login() {
  const [isClicked, setIsClicked] = useState(
    getAuthorityCookie('userId') ? true : false,
  );

  const [errorMessage, setErrorMessage] = useState('');
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<loginProps>();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const openAlert = () => {
    setIsAlertOpen(true);
  };
  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  const Id = watch('id', '');
  const Password = watch('password', '');
  const IdInputRef = useRef<HTMLInputElement | null>(null);
  const PasswordInputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const submitLogin: SubmitHandler<loginProps> = async (data) => {
    postLogin({ navigate, isClicked, Id, setErrorMessage, openAlert }, data);
  };

  const checkIconselected = () => {
    setIsClicked(!isClicked);
  };

  const enterLogin = () => {
    handleSubmit(submitLogin)();
  };

  const ClickIdLabel = () => {
    IdInputRef?.current?.focus();
  };

  const ClickPasswordLabel = () => {
    PasswordInputRef?.current?.focus();
  };

  return (
    <Container>
      <AlertBar
        type="error"
        isAlertNewOpen={isAlertOpen}
        closeNewAlert={closeAlert}
        message={errorMessage}
      ></AlertBar>
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
                name="id"
                defaultValue={getAuthorityCookie('userId') || ''}
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
              //onClick={handleLogin} // 클릭 시 로그인 함수 호출
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  enterLogin();
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
