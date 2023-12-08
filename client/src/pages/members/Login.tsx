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

export function Login() {
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
  const Password = watch('password', '');

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
    <Container>
      <Wrapper>
        <Title>로그인</Title>
        <Form onSubmit={handleSubmit(submitLogin)}>
          <InputWrapper>
            <Label>아이디*</Label>
            <Controller
              control={control}
              name="id"
              defaultValue={getAuthorityCookie('userId') || ''}
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="아이디를 입력해주세요."
                  onChange={field.onChange}
                  value={field.value}
                  onClick={() => setErrorMessage('')}
                />
              )}
            />
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <Label>비밀번호*</Label>
            <Controller
              control={control}
              name="password"
              defaultValue=""
              render={({ field }) => (
                <Input
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  onChange={field.onChange}
                  value={field.value}
                  onClick={() => setErrorMessage('')}
                />
              )}
            />
            <ErrorMessage>{errorMessage}</ErrorMessage>

            <SaveIdWrapper onClick={checkIconselected}>
              {isClicked ? (
                <CheckCircleOutlineIcon fontSize="small" />
              ) : (
                <RadioButtonUncheckedIcon fontSize="small" />
              )}
              <SaveId>아이디 저장</SaveId>
            </SaveIdWrapper>
          </InputWrapper>
          <SaveButtonWrapper>
            <StyledBtn variant="contained" size="large">
              로그인
            </StyledBtn>
          </SaveButtonWrapper>
        </Form>
        <NoticeMessage>
          * 아이디/비밀번호를 모르실 경우, 관리자에게 문의해주세요.
        </NoticeMessage>
        {isAlertOpen && <NoticeAlert title={errorMessage} />}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  min-width: 800px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 1px 10px -4px rgba(112, 144, 176, 0.8);
  padding: 20px;
`;
const Title = styled.div`
  display: flex;
  font-size: 25px;
  padding-bottom: 20px;
  color: #1b254b;
`;
const Form = styled.form``;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const Label = styled.label`
  width: 400px;
  display: flex;
  justify-content: flex-start;
  color: #1b254b;
  font-size: 14px;
`;
const Input = styled.input`
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
`;
const ErrorMessage = styled.div`
  width: 400px;
  font-size: 12px;
  color: red;
  display: flex;
  justify-content: flex-start;
`;
const SaveIdWrapper = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
`;
const SaveId = styled.p`
  font-size: 14px;
  color: #1b254b;
  margin-left: 5px;
`;
const SaveButtonWrapper = styled.button`
  margin-top: 30px;
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
`;
const NoticeMessage = styled.p`
  display: flex;
  color: #1b254b;
  font-size: 13px;
  padding-top: 20px;
`;
const StyledBtn = styled(Button)`
  && {
    width: 400px;
    height: 50px;
    border-radius: 10px;
    font-size: 17px;
    line-height: normal;
  }
`;
