import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { Button } from '@mui/material';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { getMemberInformation } from '../../api/getAxios';
import { putSaveName } from '../../api/putAxios';
import { Input, Label } from '../../components';
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
              <Label value="아이디" fontSize="14px" width="100px" />
              <Information>{member.id}</Information>
            </InputWrapper>
            <InputWrapper>
              <Label value="이름" fontSize="14px" width="100px" />
              {!isNameEdit && <Information>{member.name}</Information>}
              {isNameEdit && (
                <Input
                  width="150px"
                  height="17px"
                  border="black"
                  placeholderSize="12px"
                  fontSize="14px"
                  type="text"
                  placeholder="수정할 이름을 입력하세요."
                  value={nameValue}
                  onChange={(e) => {
                    setNameValue(e.target.value);
                  }}
                  innerRef={nameInputRef}
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
              <Label value="권한" fontSize="14px" width="100px" />
              <Information>{member.authority}</Information>
            </InputWrapper>
            {!isPasswordEdit && (
              <InputWrapper>
                <Label value="비밀번호" fontSize="14px" width="100px" />
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
              width="400px"
              inputwidth="250px"
              padding="20px 0px 0px 0px"
              onClick={selectPasswordEdit}
              btnwidth="80px"
              height="25px"
              buttonfontsize="13px"
              labelfontsize="14px"
              placeholdersize="12px"
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
