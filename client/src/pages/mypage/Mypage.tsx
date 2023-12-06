import React, { useState, useEffect, useRef } from 'react';
import { Styled } from './Mypage.style';
import { useRecoilState } from 'recoil';
import { alertBoolAtom } from '../../recoil/utilAtom';
import { NoticeAlert } from '../../components/alert/NoticeAlert';
import { ChangePassword } from '../../components/password/ChangePassword';
import { StyledEditBtn, StyledSaveBtn, StyledCancelBtn } from './Mypage.style';
import { getMemberInformation } from '../../api/getAxios';
import { putSaveName } from '../../api/putAxios';

const Mypage = () => {
  const [isNameEdit, setIsNameEdit] = useState(false);
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useRecoilState(alertBoolAtom);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [member, setMember] = useState({
    id: null,
    name: null,
    key: null,
    authority: null,
    comment: null,
    enabled: null,
    authCode: null,
  });
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const [didMount, setDidMount] = useState(false);

  let mountCount = 1;

  const selectNameEdition = () => {
    setIsNameEdit(!isNameEdit);
  };

  const saveName = async () => {
    putSaveName({
      member,
      nameValue,
      isNameEdit,
      setIsNameEdit,
      setIsError,
      setIsAlertOpen,
      setNameValue,
      setErrorMessage,
    });
  };

  const selectPasswordEdit = () => {
    setIsPasswordEdit(!isPasswordEdit);
    setIsNameEdit(false);
  };

  useEffect(() => {
    mountCount++;
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      getMemberInformation({ setMember });
    }
  }, [setMember, isNameEdit, didMount]);

  useEffect(() => {
    if (isNameEdit && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isNameEdit]);

  return (
    <Styled.main>
      <Styled.mainContainer>
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
                  ref={nameInputRef}
                />
              )}
              {!isNameEdit && !isPasswordEdit && (
                <Styled.btnWrapper>
                  <StyledEditBtn variant="outlined" onClick={selectNameEdition}>
                    수정
                  </StyledEditBtn>
                </Styled.btnWrapper>
              )}
              {isNameEdit && !isPasswordEdit && (
                <Styled.btnWrapper>
                  <StyledCancelBtn
                    variant="outlined"
                    onClick={selectNameEdition}
                  >
                    취소
                  </StyledCancelBtn>
                  <StyledSaveBtn variant="contained" onClick={saveName}>
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
                      onClick={selectPasswordEdit}
                    >
                      재설정
                    </StyledEditBtn>
                  </Styled.btnWrapper>
                </Styled.btnContainer>
              </Styled.inputWapper>
            )}
          </Styled.inputContainer>
        </Styled.formContainer>
        {isAlertOpen && <NoticeAlert title="이름이 수정되었습니다." />}
        {isError === true && <NoticeAlert title={errorMessage} />}
        {isPasswordEdit && (
          <Styled.passwordFormContainer>
            <Styled.titleContainer>
              <Styled.subTitle>비밀번호 변경</Styled.subTitle>
            </Styled.titleContainer>
            <ChangePassword
              marginleft={10}
              margintop={20}
              width={400}
              inputwidth={230}
              onClick={selectPasswordEdit}
              btnwidth={80}
              height={25}
              fontsize={13}
              labelsize={14}
              placeholdersize={12}
              display="flex-start"
            />
          </Styled.passwordFormContainer>
        )}
      </Styled.mainContainer>
    </Styled.main>
  );
};

export { Mypage };
