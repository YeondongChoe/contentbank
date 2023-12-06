import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { passwordRegExp } from '../../utils/regExp';
import { useNavigate } from 'react-router-dom';
import {
  Styled,
  StyledCancelBtn,
  StyledConfirmBtn,
  StyledNomalBtn,
} from './ChangePassword.style';
import { putChangePassword } from '../../api/putAxios';

type passwordProps = {
  password: string;
  password_confirm: string;
};

type ChangePasswordProps = {
  onClick?: () => void;
  width?: number;
  inputwidth?: number;
  btnwidth?: number;
  height?: number;
  display?: string;
  marginleft?: number;
  margintop?: number;
  fontsize?: number;
  labelsize?: number;
  placeholdersize?: number;
};

const ChangePassword: React.FC<ChangePasswordProps> = ({
  onClick,
  width,
  inputwidth,
  btnwidth,
  fontsize,
  height,
  display,
  marginleft,
  margintop,
  labelsize,
  placeholdersize,
}) => {
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
    <Styled.main>
      <form onSubmit={handleSubmit(submitChangePassword)}>
        <Styled.inputContainer width={width as number}>
          <Styled.inputWapper width={width as number}>
            <Styled.label labelSize={labelsize as number}>
              새 비밀번호
            </Styled.label>
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
          </Styled.inputWapper>
          {Password && (
            <Styled.errorMessage>
              {errors?.password?.message}
            </Styled.errorMessage>
          )}
          {isValid && <Styled.successMessage>사용가능</Styled.successMessage>}
          <Styled.inputWapper width={width as number}>
            <Styled.label labelSize={labelsize as number}>
              새 비밀번호 재확인
            </Styled.label>
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
          marginLeft={marginleft as number}
          marginTop={margintop as number}
        >
          <Styled.btnWapper>
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
          </Styled.btnWapper>
          {PasswordConfirm && isValid ? (
            <Styled.btnWapper>
              <StyledConfirmBtn
                width={btnwidth}
                height={height}
                fontSize={fontsize}
                variant="contained"
              >
                확인
              </StyledConfirmBtn>
            </Styled.btnWapper>
          ) : (
            <Styled.btnWapper>
              <StyledNomalBtn
                width={btnwidth}
                height={height}
                variant="outlined"
                fontSize={fontsize}
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

export { ChangePassword };
