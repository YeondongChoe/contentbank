import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { Button } from '@mui/material';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { getMemberInformation } from '../../api/getAxios';
import { putSaveName } from '../../api/putAxios';
import { NoticeAlert } from '../../components/molecules/alert/NoticeAlert';
import { ChangePassword } from '../../components/password/ChangePassword';
import { alertBoolAtom } from '../../state/utilAtom';

export function Mypage() {
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
    <Container>
      <Wrapper>
        <Title>마이페이지</Title>
        <InformationWrapper>
          <SubTitleWrapper>
            <SubTitle>내 정보</SubTitle>
          </SubTitleWrapper>
          <InformationForm>
            <InputWrapper>
              <Label>아이디</Label>
              <Information>{member.id}</Information>
            </InputWrapper>
            <InputWrapper>
              <Label>이름</Label>
              {!isNameEdit && <Information>{member.name}</Information>}
              {isNameEdit && (
                <Input
                  type="type"
                  placeholder="수정할 이름을 입력하세요."
                  onChange={(e) => {
                    setNameValue(e.target.value);
                  }}
                  ref={nameInputRef}
                />
              )}
              {!isNameEdit && !isPasswordEdit && (
                <ButtonGroup>
                  <StyledEditBtn variant="outlined" onClick={selectNameEdition}>
                    수정
                  </StyledEditBtn>
                </ButtonGroup>
              )}
              {isNameEdit && !isPasswordEdit && (
                <ButtonGroup>
                  <StyledCancelBtn
                    variant="outlined"
                    onClick={selectNameEdition}
                  >
                    취소
                  </StyledCancelBtn>
                  <StyledSaveBtn variant="contained" onClick={saveName}>
                    저장
                  </StyledSaveBtn>
                </ButtonGroup>
              )}
            </InputWrapper>
            <InputWrapper>
              <Label>권한</Label>
              <Information>{member.authority}</Information>
            </InputWrapper>
            {!isPasswordEdit && (
              <InputWrapper>
                <Label>비밀번호</Label>
                <ButtonWrapper>
                  <StyledEditBtn
                    variant="outlined"
                    onClick={selectPasswordEdit}
                  >
                    재설정
                  </StyledEditBtn>
                </ButtonWrapper>
              </InputWrapper>
            )}
          </InformationForm>
        </InformationWrapper>
        {isAlertOpen && <NoticeAlert title="이름이 수정되었습니다." />}
        {isError === true && <NoticeAlert title={errorMessage} />}
        {isPasswordEdit && (
          <PasswordWrapper>
            <SubTitleWrapper>
              <SubTitle>비밀번호 변경</SubTitle>
            </SubTitleWrapper>
            <ChangePassword
              paddingTop={20}
              width={400}
              inputwidth={250}
              onClick={selectPasswordEdit}
              btnwidth={80}
              height={25}
              fontsize={13}
              labelsize={14}
              placeholdersize={12}
              display="flex-start"
            />
          </PasswordWrapper>
        )}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
const Title = styled.div`
  font-size: 25px;
  display: flex;
  justify-content: center;
  color: #1b254b;
`;
const InformationWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 1px 10px -4px rgba(112, 144, 176, 0.8);
`;
const PasswordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0px 1px 10px -4px rgba(112, 144, 176, 0.8);
`;
const SubTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-bottom: 10px;
  &:last-of-type {
    width: 400px;
  }
`;
const SubTitle = styled.div`
  color: #1b254b;
  font-size: 16px;
  font-weight: bold;
`;
const InformationForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const InputWrapper = styled.div`
  width: 400px;
  height: 20px;
  display: flex;
  align-items: center;
  &:last-of-type {
    margin-bottom: 10px;
  }
`;
const Label = styled.label`
  width: 100px;
  display: flex;
  font-size: 14px;
  color: #a3aed0;
`;
const Input = styled.input`
  width: 150px;
  border: none;
  border-bottom: 1px solid #c5c5c5;
  outline: none;
  font-size: 14px;
  color: #1b254b;
  &::placeholder {
    font-size: 12px;
  }
`;
const Information = styled.p`
  font-size: 14px;
`;
const ButtonGroup = styled.div`
  border: none;
  background-color: transparent;
  display: flex;
  justify-content: flex-end;
  flex: 1 0 0;
  gap: 5px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: 0 0 50%;
`;
const StyledEditBtn = styled(Button)`
  && {
    width: 80px;
    height: 25px;
    border-radius: 15px;
    font-size: 13px;
    line-height: normal;
  }
`;

const StyledCancelBtn = styled(Button)`
  && {
    height: 25px;
    border-radius: 15px;
    font-size: 13px;
    line-height: normal;
  }
`;

const StyledSaveBtn = styled(Button)`
  && {
    height: 25px;
    border-radius: 15px;
    font-size: 13px;
    color: white;
    font-weight: bolder;
    line-height: normal;
  }
`;
