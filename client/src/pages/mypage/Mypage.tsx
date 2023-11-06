import React, { useState, useEffect } from 'react';
import { Styled } from './Mypage.style';
import { useRecoilState } from 'recoil';
import { alertState } from '../../recoil/State';
import NoticeAlert from '../../components/alert/NoticeAlert';
import ChangePassword from '../../components/password/ChangePassword';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCookie, setCookie } from '../../utils/ReactCookie';
import { StyledEditBtn, StyledSaveBtn } from './Mypage.style';

const Mypage = () => {
  const [isNameEdit, setIsNameEdit] = useState(false);
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useRecoilState(alertState);
  const [nameValue, setNameValue] = useState('');
  const [member, setMember] = useState({
    id: null,
    name: null,
    key: null,
    authority: null,
    comment: null,
    enabled: null,
  });
  const navigate = useNavigate();

  const handleNameEdit = () => {
    setIsNameEdit(!isNameEdit);
  };

  const handleNameSave = () => {
    const data = {
      authority: member.authority,
      name: nameValue,
      comment: member.comment,
      enabled: member.enabled,
    };
    return axios
      .put(`/auth-service/api/v1/auth/${member.key}`, data, {
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
              secure: false,
            });
          }
        }
        setIsNameEdit(!isNameEdit);
        setIsAlertOpen(true);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const handlePasswordEdit = () => {
    setIsPasswordEdit(!isPasswordEdit);
    setIsNameEdit(false);
  };

  useEffect(() => {
    axios
      .get('/auth-service/api/v1/auth/my-info', {
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
              secure: false,
            });
          }
        }
        setMember({
          id: response?.data?.data?.id,
          name: response?.data?.data?.name,
          key: response?.data?.data?.key,
          authority: response?.data?.data?.authority.code,
          comment: response?.data?.data?.comment,
          enabled: response?.data?.data?.enabled,
        });
      })
      .catch((error) => {
        alert(error.response?.data?.message);
      });
  }, [setMember, isNameEdit]);

  return (
    <>
      <Styled.main>
        <Styled.title>마이페이지</Styled.title>
        <Styled.formContainer>
          <Styled.titleContainer>
            <Styled.subTitle>내 정보</Styled.subTitle>
          </Styled.titleContainer>
          <Styled.inputContainer>
            <Styled.inputWapper>
              <Styled.label>아이디</Styled.label>
              <Styled.information>{member.id}</Styled.information>
            </Styled.inputWapper>
            <Styled.inputWapper>
              <Styled.label>이름</Styled.label>
              {!isNameEdit && (
                <Styled.information>{member.name}</Styled.information>
              )}
              {isNameEdit && (
                <Styled.input
                  type="type"
                  placeholder="수정할 이름을 입력하세요."
                  onChange={(e) => {
                    setNameValue(e.target.value);
                  }}
                />
              )}
              {!isNameEdit && !isPasswordEdit && (
                <Styled.btnWrapper>
                  <StyledEditBtn variant="outlined" onClick={handleNameEdit}>
                    수정
                  </StyledEditBtn>
                </Styled.btnWrapper>
              )}
              {isNameEdit && !isPasswordEdit && (
                <Styled.btnWrapper>
                  <StyledSaveBtn variant="contained" onClick={handleNameSave}>
                    저장
                  </StyledSaveBtn>
                </Styled.btnWrapper>
              )}
            </Styled.inputWapper>
            <Styled.inputWapper>
              <Styled.label>권한</Styled.label>
              <Styled.information>{member.authority}</Styled.information>
            </Styled.inputWapper>
            {!isPasswordEdit && (
              <Styled.inputWapper>
                <Styled.label>비밀번호</Styled.label>
                <Styled.btnContainer>
                  <Styled.btnWrapper>
                    <StyledEditBtn
                      variant="outlined"
                      onClick={handlePasswordEdit}
                    >
                      재설정
                    </StyledEditBtn>
                  </Styled.btnWrapper>
                </Styled.btnContainer>
              </Styled.inputWapper>
            )}
          </Styled.inputContainer>
        </Styled.formContainer>
        {isAlertOpen && <NoticeAlert title="이름이 수정되었습니다.." />}
        {isPasswordEdit && (
          <Styled.formContainer>
            <Styled.titleContainer>
              <Styled.subTitle>비밀번호 변경</Styled.subTitle>
            </Styled.titleContainer>
            <ChangePassword
              marginLeft={10}
              width={500}
              inputWidth={300}
              onClick={handlePasswordEdit}
              btnWidth={100}
              height={35}
              display="flex-start"
            />
          </Styled.formContainer>
        )}
      </Styled.main>
    </>
  );
};

export default Mypage;
