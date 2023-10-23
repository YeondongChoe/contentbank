import React, { useState } from 'react';
import styled from 'styled-components';
import { EditBtn, SaveBtn } from '../../components/button/CommonBtn';
import { useRecoilState } from 'recoil';
import { alertState } from '../../recoil/alert';
import NoticeAlert from '../../components/alert/NoticeAlert';
import ChangePassword from '../../components/password/ChangePassword';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {
  const [isNameEdit, setIsNameEdit] = useState(false);
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useRecoilState(alertState);
  const navigate = useNavigate();

  const handleNameEdit = () => {
    setIsNameEdit(!isNameEdit);
  };

  const handleNameSave = () => {
    setIsNameEdit(!isNameEdit);
    //api연결하기
    //성공적으로 작동하면 alert 띄우기
    //실패하면 실패메시지로 alert 띄우기
    setIsAlertOpen(true);
  };

  const handlePasswordEdit = () => {
    setIsPasswordEdit(!isPasswordEdit);
    setIsNameEdit(false);
  };

  return (
    <>
      <S.main>
        <S.title>마이페이지</S.title>
        <S.titleContainer>
          <S.subTitle>내 정보</S.subTitle>
        </S.titleContainer>
        <S.inputcontainer>
          <S.inputWapper>
            <S.label>아이디</S.label>
            <S.information>test1</S.information>
          </S.inputWapper>
          <S.inputWapper>
            <S.label>이름</S.label>
            {!isNameEdit && <S.information>홍길동</S.information>}
            {isNameEdit && (
              <S.input type="type" placeholder="수정할 이름을 입력하세요." />
            )}
            {!isNameEdit && !isPasswordEdit && (
              <div onClick={handleNameEdit}>
                <EditBtn
                  text="수정"
                  btnWidth={60}
                  height={25}
                  radius={15}
                  fontSize={13}
                />
              </div>
            )}
            {isNameEdit && !isPasswordEdit && (
              <div onClick={handleNameSave}>
                <SaveBtn
                  text="저장"
                  color="confirm"
                  btnWidth={60}
                  height={25}
                  radius={15}
                  fontSize={13}
                />
              </div>
            )}
          </S.inputWapper>
          <S.inputWapper>
            <S.label>권한</S.label>
            <S.information>권한1</S.information>
          </S.inputWapper>
          {!isPasswordEdit && (
            <S.inputWapper>
              <S.label>비밀번호</S.label>
              <S.btnWrapper>
                <EditBtn
                  text="재설정"
                  btnWidth={60}
                  height={25}
                  radius={15}
                  fontSize={13}
                  onClick={handlePasswordEdit}
                />
              </S.btnWrapper>
            </S.inputWapper>
          )}
        </S.inputcontainer>

        {isAlertOpen && <NoticeAlert title="이름이 수정되었습니다.." />}
        {isPasswordEdit && (
          <>
            <S.titleContainer>
              <S.subTitle>비밀번호 변경</S.subTitle>
            </S.titleContainer>
            <ChangePassword
              right={-110}
              width={500}
              inputWidth={300}
              onClick={handlePasswordEdit}
              btnWidth={100}
              height={35}
              radius={10}
              fontSize={15}
              text="저장"
              display="flex-start"
            />
          </>
        )}
      </S.main>
    </>
  );
};

const S = {
  main: styled.main`
    width: 1280px;
    //height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
  `,
  title: styled.div`
    font-size: 25px;
  `,
  titleContainer: styled.div`
    width: 400px;
    margin-top: 60px;
    margin-bottom: 40px;
  `,
  subTitle: styled.div`
    width: 200px;
    height: 25px;
    background-color: #ebebeb;
    color: #665f5f;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  inputcontainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  `,
  inputWapper: styled.div`
    width: 400px;
    display: flex;
    align-items: center;
    //justify-content: center;
  `,
  label: styled.label`
    width: 100px;
    display: flex;
    font-size: 14px;
  `,
  input: styled.input`
    width: 200px;
    padding: 5px;
    border: none;
    border-bottom: 1px solid #c5c5c5;
    outline: none;
    font-size: 12px;
    margin: 0 auto;
  `,
  information: styled.p`
    width: 200px;
    font-size: 14px;
  `,
  btnWrapper: styled.div`
    width: 200px;
    display: flex;
    justify-content: center;
  `,
};

export default Mypage;
