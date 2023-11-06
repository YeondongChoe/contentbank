import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { passwordRegExp } from '../../utils/RegExp';
import { useNavigate } from 'react-router-dom';
import { getCookie, setCookie } from '../../utils/ReactCookie';
import {
  Styled,
  StyledCancelBtn,
  StyledConfirmBtn,
  StyledNomalBtn,
} from './ChangePassword.style';

interface PasswordData {
  password: string;
  password_confirm: string;
}

interface Props {
  onClick?: () => void;
  width?: number;
  inputWidth?: number;
  btnWidth?: number;
  height?: number;
  display?: string;
  marginLeft?: number;
}

const ChangePassword: React.FC<Props> = ({
  onClick,
  width,
  inputWidth,
  btnWidth,
  height,
  display,
  marginLeft,
}) => {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PasswordData>();

  const Password = watch('password', '');
  const PasswordConfirm = watch('password_confirm', '');
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<PasswordData> = () => {
    const data = {
      password: Password,
      confirmPassword: PasswordConfirm,
    };
    return axios
      .put('/auth-service/api/v1/auth/changed-password', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.headers['authorization'] !== getCookie('accessToken')) {
            setCookie('accessToken', response.headers['authorization'], {
              path: '/',
              sameSite: 'strict',
              secure: true,
            });
          }
        }
        navigate('/relogin');
      })
      .catch(() => {
        alert('비밀번호 재확인을 입력해주세요.');
      });
  };

  return (
    <Styled.main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Styled.inputContainer width={width as number}>
          <Styled.inputWapper width={width as number}>
            <Styled.label>새 비밀번호</Styled.label>
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
                <Styled.input
                  width={inputWidth as number}
                  type="password"
                  placeholder="영문, 숫자, 특수문자 혼용 8자리 이상"
                  onChange={field.onChange}
                  value={field.value}
                  className={isValid ? 'success' : ''}
                />
              )}
            />
          </Styled.inputWapper>
          {Password && (
            <Styled.errorMessage>
              {errors?.password?.message}
            </Styled.errorMessage>
          )}
          {isValid && <Styled.successMessage>사용가능</Styled.successMessage>}
          <Styled.inputWapper width={width as number}>
            <Styled.label>새 비밀번호 재확인</Styled.label>
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
                <Styled.input
                  width={inputWidth as number}
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
          </Styled.inputWapper>
          {PasswordConfirm && Password === PasswordConfirm ? (
            <Styled.successMessage>비밀번호 일치</Styled.successMessage>
          ) : (
            <Styled.errorMessage>
              {errors?.password_confirm?.message}
            </Styled.errorMessage>
          )}
        </Styled.inputContainer>
        <Styled.btnGroupContainer
          display={display as string}
          marginLeft={marginLeft as number}
        >
          <Styled.btnWapper>
            <StyledCancelBtn
              width={btnWidth}
              height={height}
              variant="outlined"
              onClick={onClick}
              sx={{ backgroundColor: 'white' }}
            >
              취소
            </StyledCancelBtn>
          </Styled.btnWapper>
          {PasswordConfirm && isValid ? (
            <Styled.btnWapper>
              <StyledConfirmBtn
                width={btnWidth}
                height={height}
                variant="contained"
              >
                확인
              </StyledConfirmBtn>
            </Styled.btnWapper>
          ) : (
            <Styled.btnWapper>
              <StyledNomalBtn
                width={btnWidth}
                height={height}
                variant="outlined"
                sx={{ backgroundColor: 'white' }}
              >
                확인
              </StyledNomalBtn>
            </Styled.btnWapper>
          )}
        </Styled.btnGroupContainer>
      </form>
    </Styled.main>
  );
};

export default ChangePassword;
