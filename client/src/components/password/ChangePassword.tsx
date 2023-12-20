import * as React from 'react';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { putChangePassword } from '../../api/putAxios';
import { Input, Label, Button } from '../../components';
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
  padding?: string;
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
  padding,
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
              fontSize={labelfontsize || '16px'}
              width="150px"
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
                  height="40px"
                  padding="10px"
                  fontSize="16px"
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
              fontSize={labelfontsize || '16px'}
              width="150px"
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
                  height="40px"
                  padding="10px"
                  fontSize="16px"
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
          $padding={padding as string}
        >
          <ButtonWapper>
            <Button
              onClick={onClick}
              width={btnwidth}
              height={height}
              fontSize={buttonfontsize}
              $borderRadius="10px"
              $border
            >
              <span>취소</span>
            </Button>
          </ButtonWapper>
          {PasswordConfirm && isValid ? (
            <ButtonWapper>
              <Button
                width={btnwidth}
                height={height}
                fontSize={buttonfontsize}
                $borderRadius="10px"
              >
                <span>확인</span>
              </Button>
            </ButtonWapper>
          ) : (
            <ButtonWapper>
              <Button
                width={btnwidth}
                height={height}
                fontSize={buttonfontsize}
                $borderRadius="10px"
                $border
              >
                <span>확인</span>
              </Button>
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
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
`;
const InputWapper = styled.div<{ width: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
`;
const SuccessMessage = styled.div`
  font-size: 12px;
  color: green;
  display: flex;
  font-weight: bold;
  justify-content: flex-end;
`;
const ErrorMessage = styled.div`
  font-size: 12px;
  color: red;
  display: flex;
  font-weight: bold;
  justify-content: flex-end;
`;

const ButtonGroup = styled.div<{
  display: string;
  marginLeft: string;
  $padding: string;
}>`
  display: flex;
  gap: 20px;
  justify-content: ${(props) => props.display};
  padding: ${({ $padding }) => ($padding ? `${$padding};` : '0px')};
`;

const ButtonWapper = styled.button`
  border: none;
  background-color: transparent;
`;
