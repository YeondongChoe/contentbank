import * as React from 'react';
import { useState } from 'react';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Button } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { postLogin } from '../../api/postAxios';
import { Input, Label } from '../../components';
import { COLOR } from '../../components/contents/COLOR';
import { NoticeAlert } from '../../components/molecules/alert/NoticeAlert';
import { alertBoolAtom } from '../../state/utilAtom';
import { getAuthorityCookie } from '../../utils/cookies';

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
            <Label fontSize="14px" value="아이디*" />
            <Controller
              control={control}
              name="id"
              defaultValue={getAuthorityCookie('userId') || ''}
              render={({ field }) => (
                <Input
                  border="normal"
                  borderradius="10px"
                  width="400px"
                  height="40px"
                  padding="10px"
                  fontSize="14px"
                  placeholderSize="14px"
                  type="text"
                  placeholder="아이디를 입력해주세요."
                  onChange={field.onChange}
                  value={field.value}
                  onClick={() => setErrorMessage('')}
                  errorMessage={errorMessage}
                />
              )}
            />
            <Label fontSize="14px" value="비밀번호*" />
            <Controller
              control={control}
              name="password"
              defaultValue=""
              render={({ field }) => (
                <Input
                  border="normal"
                  borderradius="10px"
                  width="400px"
                  height="40px"
                  padding="10px"
                  fontSize="14px"
                  placeholderSize="14px"
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  onChange={field.onChange}
                  value={field.value}
                  onClick={() => setErrorMessage('')}
                  errorMessage={errorMessage}
                />
              )}
            />
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
  color: ${COLOR.DARK_GRAY};
`;
const Form = styled.form``;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  color: ${COLOR.DARK_GRAY};
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
  color: ${COLOR.DARK_GRAY};
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
