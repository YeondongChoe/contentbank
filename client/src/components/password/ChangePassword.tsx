import * as React from 'react';
import { useState, useRef } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { putChangePassword } from '../../api/putAxios';
import { Input, Label, Button, AlertBar } from '../../components';
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
    formState: { errors, isValid },
  } = useForm<passwordProps>();

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

  const submitChangePassword = () => {
    putChangePassword({
      Password,
      PasswordConfirm,
      navigate,
    });
  };

  const enterLogin = () => {
    submitChangePassword();
  };

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const openAlert = () => {
    setIsAlertOpen(true);
  };
  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  return (
    <Container>
      <AlertBar
        type="error"
        isAlertNewOpen={isAlertOpen}
        closeNewAlert={closeAlert}
        //message={errorMessage}
      ></AlertBar>
      <form>
        <InputSection width={width as string}>
          <InputWapper width={width as string}>
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
                  value: passwordRegExp,
                  message: '사용불가능',
                },
              }}
              render={({ field }) => (
                <Input
                  borderbottom
                  width={inputwidth as string}
                  height="40px"
                  padding="10px 20px"
                  fontSize="15px"
                  placeholderSize={placeholdersize as string}
                  type="password"
                  placeholder="영문, 숫자, 특수문자 혼용 8자리 이상"
                  onChange={field.onChange}
                  value={field.value}
                  className={isValid ? 'success' : ''}
                  innerRef={PasswordInputRef}
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
              onClick={ClickPasswordConfirmLabel}
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
                  padding="10px 20px"
                  fontSize="15px"
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
                  innerRef={PasswordConfirmInputRef}
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
              $normal
            >
              <span>취소</span>
            </Button>
          </ButtonWapper>
          {PasswordConfirm && isValid ? (
            <ButtonWapper>
              <Button
                buttonType="submit"
                onClick={submitChangePassword}
                width={btnwidth}
                height={height}
                fontSize={buttonfontsize}
                $borderRadius="10px"
                $filled
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    enterLogin(); // Enter 키 눌렀을 때도 로그인 함수 호출
                  }
                }}
              >
                <span>확인</span>
              </Button>
            </ButtonWapper>
          ) : (
            <ButtonWapper>
              <Button
                buttonType="submit"
                onClick={submitChangePassword}
                width={btnwidth}
                height={height}
                fontSize={buttonfontsize}
                $borderRadius="10px"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    enterLogin(); // Enter 키 눌렀을 때도 로그인 함수 호출
                  }
                }}
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

const ButtonWapper = styled.div`
  border: none;
  background-color: transparent;
`;
