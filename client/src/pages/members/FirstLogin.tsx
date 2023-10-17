import React, { useState } from 'react';
import styled from 'styled-components';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  MdRadioButtonUnchecked,
  MdOutlineCheckCircleOutline,
} from 'react-icons/md';
import axios from 'axios';
import { setCookie, getCookie, removeCookie } from '../../utils/ReactCookie';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { alertState } from '../../recoil/alert';
import ChangePassword from '../../components/password/ChangePassword';

interface SigninData {
  id: string;
  password: string;
}

const FirstLogin = () => {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninData>();

  const Id = watch('id', '');
  const navigate = useNavigate();

  return (
    <>
      <S.main>
        <S.title>최초 로그인시 비밀번호 변경</S.title>
        <S.discriptionContainer>
          <S.discriptionTitle>
            새로운 비밀번호로 변경해주세요
          </S.discriptionTitle>
          <S.discription>
            비밀번호는 영문과 숫자, 특수문자(~,!,@,#,$,%,^,&,*,(,),_,-만 사용
            가능) <br />를 조합하여 8 ~ 20자 이내로 설정해야 합니다.
          </S.discription>
        </S.discriptionContainer>
        <ChangePassword />
      </S.main>
    </>
  );
};

const S = {
  main: styled.main`
    width: 1280px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  title: styled.div`
    font-size: 25px;
    margin-bottom: 40px;
  `,
  discriptionContainer: styled.div`
    width: 550px;
    background-color: #e9e9e9;
    padding: 20px 0;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  discriptionTitle: styled.p`
    font-size: 16px;
  `,
  discription: styled.p`
    font-size: 14px;
    display: flex;
    text-align: left;
    justify-content: center;
  `,
  form: styled.form``,
  inputcontainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  `,
  input: styled.input`
    width: 400px;
    height: 40px;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #a1a1a1;
  `,
  errorMessage: styled.div`
    width: 400px;
    font-size: 12px;
    color: red;
    display: flex;
    justify-content: flex-start;
  `,
  button: styled.button`
    width: 500px;
    height: 50px;
    margin-top: 30px;
    border-radius: 10px;
    color: white;
    background-color: #4990d3;
    border: none;
    font-size: 17px;
    cursor: pointer;
  `,
};

export default FirstLogin;
