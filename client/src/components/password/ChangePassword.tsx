import * as React from 'react';

import { Button } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { putChangePassword } from '../../api/putAxios';
import { Input, Label } from '../../components';
import { passwordRegExp } from '../../utils/regExp';

type passwordProps = {
  password: string;
  password_confirm: string;
};

type ChangePasswordProps = {
  onClick?: () => void;
  width?: string;
  inputwidth?: string;
  btnwidth?: string;
  height?: string;
  display?: string;
  marginleft?: string;
  paddingtop?: string;
  buttonfontsize?: string;
  labelfontsize?: string;
  placeholdersize?: string;
};

export function ChangePassword({
  onClick,
  width,
  inputwidth,
  btnwidth,
  height,
  display,
  marginleft,
  paddingtop,
  buttonfontsize,
  labelfontsize,
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
        <InputSection width={width as string}>
          <InputWapper width={width as string}>
            <Label
              value="새 비밀번호"
              fontSize={labelfontsize || '16'}
              width="150"
            />
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
                  borderbottom
                  width={inputwidth as string}
                  height="40"
                  padding="10"
                  fontSize="16"
                  placeholderSize={placeholdersize as string}
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
          <InputWapper width={width as string}>
            <Label
              value="새 비밀번호 재확인"
              fontSize={labelfontsize || '16'}
              width="150"
            />
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
                  borderbottom
                  width={inputwidth as string}
                  height="40"
                  padding="10"
                  fontSize="16"
                  placeholderSize={placeholdersize as string}
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
          marginLeft={marginleft as string}
          $paddingtop={paddingtop as string}
        >
          <ButtonWapper>
            <StyledCancelBtn
              width={btnwidth}
              height={height}
              buttonfontsize={buttonfontsize}
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
                buttonfontsize={buttonfontsize}
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
                buttonfontsize={buttonfontsize}
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
const InputSection = styled.section<{ width: string }>`
  display: flex;
  flex-direction: column;
  ${({ width }) => (width ? ` width: ${width}px;` : '750px')};
`;
const InputWapper = styled.div<{ width: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
  ${({ width }) => (width ? ` width: ${width}px;` : '750px')};
`;
const SuccessMessage = styled.div`
  width: 750px;
  font-size: 12px;
  color: green;
  display: flex;
  font-weight: bold;
  justify-content: flex-end;
  padding-right: 25px;
`;
const ErrorMessage = styled.div`
  width: 750px;
  font-size: 12px;
  color: red;
  display: flex;
  font-weight: bold;
  justify-content: flex-end;
  margin-right: 10px;
`;

const ButtonGroup = styled.div<{
  display: string;
  marginLeft: string;
  $paddingtop: string;
}>`
  display: flex;
  gap: 20px;
  justify-content: ${(props) => props.display};
  padding-top: ${(props) => props.$paddingtop || 40}px;
`;

const ButtonWapper = styled.button`
  border: none;
  background-color: transparent;
`;

type styleProp = {
  width?: string;
  height?: string;
  buttonfontsize?: string;
};

const StyledCancelBtn = styled(Button)<styleProp>`
  && {
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    font-size: ${(props) => props.buttonfontsize || 16}px;
    border-radius: 10px;
    line-height: normal;
  }
`;

const StyledConfirmBtn = styled(Button)<styleProp>`
  && {
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    font-size: ${(props) => props.buttonfontsize || 16}px;
    border-radius: 10px;
    line-height: normal;
  }
`;

const StyledNomalBtn = styled(Button)<styleProp>`
  && {
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    font-size: ${(props) => props.buttonfontsize || 16}px;
    border-radius: 10px;
    line-height: normal;
  }
`;
