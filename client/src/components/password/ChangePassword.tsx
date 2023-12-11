import * as React from 'react';

import { Button } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { putChangePassword } from '../../api/putAxios';
import { passwordRegExp } from '../../utils/regExp';

type passwordProps = {
  password: string;
  password_confirm: string;
};

type styleProp = {
  width?: number;
  height?: number;
  fontSize?: number;
};

type ChangePasswordProps = {
  onClick?: () => void;
  width?: number;
  inputwidth?: number;
  btnwidth?: number;
  height?: number;
  display?: string;
  marginleft?: number;
  paddingTop?: number;
  fontsize?: number;
  labelsize?: number;
  placeholdersize?: number;
};

export function ChangePassword({
  onClick,
  width,
  inputwidth,
  btnwidth,
  fontsize,
  height,
  display,
  marginleft,
  paddingTop,
  labelsize,
  placeholdersize,
}: ChangePasswordProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<passwordProps>();

  const Password = watch('password', '');
  const PasswordConfirm = watch('password_confirm', '');
  const navigate = useNavigate();

  const submitChangePassword: SubmitHandler<passwordProps> = () => {
    putChangePassword({
      Password,
      PasswordConfirm,
      navigate,
    });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(submitChangePassword)}>
        <InputSection width={width as number}>
          <InputWapper width={width as number}>
            <Label labelSize={labelsize as number}>새 비밀번호</Label>
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
                <Input
                  width={inputwidth as number}
                  placeholderSize={placeholdersize as number}
                  type="password"
                  placeholder="영문, 숫자, 특수문자 혼용 8자리 이상"
                  onChange={field.onChange}
                  value={field.value}
                  className={isValid ? 'success' : ''}
                />
              )}
            />
          </InputWapper>
          {Password && <ErrorMessage>{errors?.password?.message}</ErrorMessage>}
          {isValid && <SuccessMessage>사용가능</SuccessMessage>}
          <InputWapper width={width as number}>
            <Label labelSize={labelsize as number}>새 비밀번호 재확인</Label>
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
                <Input
                  width={inputwidth as number}
                  placeholderSize={placeholdersize as number}
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
          </InputWapper>
          {PasswordConfirm && Password === PasswordConfirm ? (
            <SuccessMessage>비밀번호 일치</SuccessMessage>
          ) : (
            <ErrorMessage>{errors?.password_confirm?.message}</ErrorMessage>
          )}
        </InputSection>
        <ButtonGroup
          display={display as string}
          marginLeft={marginleft as number}
          paddingTop={paddingTop as number}
        >
          <ButtonWapper>
            <StyledCancelBtn
              width={btnwidth}
              height={height}
              fontSize={fontsize}
              variant="outlined"
              onClick={onClick}
              sx={{ backgroundColor: 'white' }}
            >
              취소
            </StyledCancelBtn>
          </ButtonWapper>
          {PasswordConfirm && isValid ? (
            <ButtonWapper>
              <StyledConfirmBtn
                width={btnwidth}
                height={height}
                fontSize={fontsize}
                variant="contained"
              >
                확인
              </StyledConfirmBtn>
            </ButtonWapper>
          ) : (
            <ButtonWapper>
              <StyledNomalBtn
                width={btnwidth}
                height={height}
                variant="outlined"
                fontSize={fontsize}
                sx={{ backgroundColor: 'white' }}
              >
                확인
              </StyledNomalBtn>
            </ButtonWapper>
          )}
        </ButtonGroup>
      </form>
    </Container>
  );
}

const Container = styled.div``;
const InputSection = styled.section<{ width: number }>`
  width: ${(props) => props.width || 750}px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;
const InputWapper = styled.div<{ width: number }>`
  width: ${(props) => props.width || 750}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Label = styled.label<{ labelSize: number }>`
  font-size: ${(props) => props.labelSize || 16}px;
  color: #a3aed0;
`;
const Input = styled.input<{ width: number; placeholderSize: number }>`
  width: ${(props) => props.width || 550}px;
  height: 40px;
  padding: 10px;
  border: none;
  border-bottom: 1px solid red;
  outline: none;
  margin-right: 10px;
  &.success {
    border-color: green;
  }
  &.passwordMatch {
    border-color: green;
  }
  &::placeholder {
    font-size: ${(props) => props.placeholderSize || 16}px;
  }
`;
const SuccessMessage = styled.div`
  width: 550px;
  font-size: 12px;
  color: green;
  display: flex;
  font-weight: bold;
  justify-content: flex-end;
  margin-right: 10px;
`;
const ErrorMessage = styled.div`
  width: 550px;
  font-size: 12px;
  color: red;
  display: flex;
  font-weight: bold;
  justify-content: flex-end;
  margin-right: 10px;
`;

const ButtonGroup = styled.div<{
  display: string;
  marginLeft: number;
  paddingTop: number;
}>`
  display: flex;
  justify-content: ${(props) => props.display};
  gap: 20px;
  padding-top: ${(props) => props.paddingTop || 40}px;
`;

const ButtonWapper = styled.button`
  border: none;
  background-color: transparent;
`;

const StyledCancelBtn = styled(Button)<styleProp>`
  && {
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border-radius: 10px;
    font-size: ${(props) => props.fontSize || 16}px;
    line-height: normal;
  }
`;

const StyledConfirmBtn = styled(Button)<styleProp>`
  && {
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border-radius: 10px;
    font-size: ${(props) => props.fontSize || 16}px;
    line-height: normal;
  }
`;

const StyledNomalBtn = styled(Button)<styleProp>`
  && {
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border-radius: 10px;
    font-size: ${(props) => props.fontSize || 16}px;
    line-height: normal;
  }
`;
