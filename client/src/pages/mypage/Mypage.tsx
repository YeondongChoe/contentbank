import React, { useState, useEffect } from 'react';
import { Styled_Mypage } from './Mypage.style';
import { EditBtn, SaveBtn } from '../../components/button/CommonBtn';
import { useRecoilState } from 'recoil';
import { alertState } from '../../recoil/State';
import NoticeAlert from '../../components/alert/NoticeAlert';
import ChangePassword from '../../components/password/ChangePassword';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCookie, setCookie } from '../../utils/ReactCookie';

const Mypage = () => {
  const [isNameEdit, setIsNameEdit] = useState(false);
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useRecoilState(alertState);
  const [isName, setIsName] = useState('');
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
      name: isName,
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

  // useEffect(() => {
  //   if (!getCookie('accessToken')) {
  //     alert('잘못된 접근입니다.');
  //     navigate('/', { replace: true });
  //   }
  // }, []);


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
      <Styled_Mypage.main>
        <Styled_Mypage.title>마이페이지</Styled_Mypage.title>
        <Styled_Mypage.titleContainer>
          <Styled_Mypage.subTitle>내 정보</Styled_Mypage.subTitle>
        </Styled_Mypage.titleContainer>
        <Styled_Mypage.inputcontainer>
          <Styled_Mypage.inputWapper>
            <Styled_Mypage.label>아이디</Styled_Mypage.label>
            <Styled_Mypage.information>{member.id}</Styled_Mypage.information>
          </Styled_Mypage.inputWapper>
          <Styled_Mypage.inputWapper>
            <Styled_Mypage.label>이름</Styled_Mypage.label>
            {!isNameEdit && (
              <Styled_Mypage.information>
                {member.name}
              </Styled_Mypage.information>
            )}
            {isNameEdit && (
              <Styled_Mypage.input
                type="type"
                placeholder="수정할 이름을 입력하세요."
                onChange={(e) => {
                  setIsName(e.target.value);
                }}
              />
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
          </Styled_Mypage.inputWapper>
          <Styled_Mypage.inputWapper>
            <Styled_Mypage.label>권한</Styled_Mypage.label>
            <Styled_Mypage.information>
              {member.authority}
            </Styled_Mypage.information>
          </Styled_Mypage.inputWapper>
          {!isPasswordEdit && (
            <Styled_Mypage.inputWapper>
              <Styled_Mypage.label>비밀번호</Styled_Mypage.label>
              <Styled_Mypage.btnWrapper>
                <EditBtn
                  text="재설정"
                  btnWidth={60}
                  height={25}
                  radius={15}
                  fontSize={13}
                  onClick={handlePasswordEdit}
                />
              </Styled_Mypage.btnWrapper>
            </Styled_Mypage.inputWapper>
          )}
        </Styled_Mypage.inputcontainer>

        {isAlertOpen && <NoticeAlert title="이름이 수정되었습니다.." />}
        {isPasswordEdit && (
          <>
            <Styled_Mypage.titleContainer>
              <Styled_Mypage.subTitle>비밀번호 변경</Styled_Mypage.subTitle>
            </Styled_Mypage.titleContainer>
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
      </Styled_Mypage.main>
    </>
  );
};

export default Mypage;
