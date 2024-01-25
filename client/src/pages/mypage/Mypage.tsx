import * as React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { getMemberInformation } from '../../api/getAxios';
import { putSaveName } from '../../api/putAxios';
import { Input, Label, Button, AlertBar } from '../../components';
import { COLOR } from '../../components/constants';
import { Alert } from '../../components/molecules/alert/Alert';
import { ChangePassword } from '../../components/password/ChangePassword';

export function Mypage() {
  const [isNameEdit, setIsNameEdit] = useState(false);
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const openAlert = () => {
    setIsAlertOpen(true);
  };
  const closeAlert = () => {
    setIsAlertOpen(false);
  };

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
      setIsSuccess,
      setNameValue,
      setMessage,
      openAlert,
    });
  };

  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(true);
  const openSuccessAlert = () => {
    setIsSuccessAlertOpen(true);
  };
  const CloseSuccessAlert = () => {
    setIsSuccessAlertOpen(false);
  };
  const navigate = useNavigate();
  const moveRelogin = () => {
    navigate('/relogin');
  };
  const [isShow, setIsShow] = useState(false);

  const selectPasswordEdit = () => {
    setIsPasswordEdit(!isPasswordEdit);
    setIsNameEdit(false);
  };

  const loadData = useCallback(() => {
    getMemberInformation({ setMember });
  }, []);

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      loadData();
    }
  }, [isNameEdit, didMount]);

  useEffect(() => {
    if (isNameEdit && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isNameEdit]);

  return (
    <Container>
      <Wrapper>
        <Title>마이페이지</Title>
        <SubTitleWrapper>
          <SubTitle>개인정보 변경</SubTitle>
        </SubTitleWrapper>
        <InformationForm>
          <InputWrapper>
            <Label value="아이디" fontSize="16px" width="200px" />
            <Information>{member.id}</Information>
          </InputWrapper>
          <InputWrapper>
            <Label value="이름" fontSize="16px" width="200px" />
            {!isNameEdit && <Information>{member.name}</Information>}
            {isNameEdit && (
              <Input
                width="300px"
                height="30px"
                border="black"
                placeholderSize="16px"
                padding="0 20px"
                fontSize="16px"
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
                <Button
                  onClick={selectNameEdition}
                  width="80px"
                  height="30px"
                  fontSize="15px"
                  $borderRadius="7px"
                  $border
                >
                  <span>수정</span>
                </Button>
              </ButtonGroup>
            )}
            {isNameEdit && !isPasswordEdit && (
              <ButtonGroup>
                <Button
                  onClick={selectNameEdition}
                  width="80px"
                  height="30px"
                  fontSize="15px"
                  $borderRadius="7px"
                  $border
                >
                  <span>취소</span>
                </Button>
                <Button
                  onClick={saveName}
                  width="80px"
                  height="30px"
                  fontSize="15px"
                  $borderRadius="7px"
                  $filled
                >
                  <span>저장</span>
                </Button>
              </ButtonGroup>
            )}
          </InputWrapper>
          <InputWrapper>
            <Label value="권한" fontSize="16px" width="200px" />
            <Information>{member.authority}</Information>
          </InputWrapper>
          {!isPasswordEdit && (
            <InputWrapper>
              <Label value="비밀번호" fontSize="16px" width="200px" />
              <ButtonWrapper>
                <Button
                  onClick={selectPasswordEdit}
                  width="80px"
                  height="30px"
                  fontSize="15px"
                  $borderRadius="7px"
                  $normal
                >
                  <span>재설정</span>
                </Button>
              </ButtonWrapper>
            </InputWrapper>
          )}
        </InformationForm>
        {isSuccess && (
          <AlertBar
            type="error"
            isAlertNewOpen={isAlertOpen}
            closeNewAlert={closeAlert}
            message={message}
          ></AlertBar>
        )}
        {isError && (
          <AlertBar
            type="warning"
            isAlertNewOpen={isAlertOpen}
            closeNewAlert={closeAlert}
            message={message}
          ></AlertBar>
        )}
        {isPasswordEdit && (
          <div>
            <SubTitleWrapper>
              <SubTitle>비밀번호 변경</SubTitle>
              <svg
                width="18"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={() => {
                  setIsShow(true);
                }}
                onMouseLeave={() => {
                  setIsShow(false);
                }}
              >
                <circle cx="7" cy="7" r="7" fill="black" />
                <path
                  d="M6.13335 10.1937H7.4521V11.375H6.13335V10.1937ZM7.01252 3.5C9.3643 3.58663 10.3885 5.71288 8.99066 7.30756C8.6258 7.70131 8.03675 7.96119 7.74663 8.29194C7.4521 8.61875 7.4521 9.0125 7.4521 9.40625H6.13335C6.13335 8.74869 6.13335 8.1935 6.42787 7.79975C6.71799 7.406 7.30704 7.17369 7.6719 6.91381C8.7357 6.03181 8.47194 4.78362 7.01252 4.68125C6.66276 4.68125 6.32733 4.8057 6.08001 5.02723C5.8327 5.24876 5.69376 5.54921 5.69376 5.8625H4.375C4.375 5.23593 4.65288 4.63501 5.14751 4.19196C5.64214 3.74891 6.313 3.5 7.01252 3.5Z"
                  fill="white"
                />
              </svg>
              {isShow && (
                <TooltipWrapper>
                  <svg
                    width="7"
                    height="12"
                    viewBox="0 0 7 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 5.99996L6.5625 0.695557V11.3044L0 5.99996Z"
                      fill="black"
                      fillOpacity="0.9"
                    />
                  </svg>
                  <Tooltip>
                    비밀번호는 영문과 숫자, 특수문자(~,!,@,#,$,%,^,&,*,(,),_,-
                    만 사용가능)를 조합하여 8~20자 이내로 설정해야 합니다.
                  </Tooltip>
                </TooltipWrapper>
              )}
            </SubTitleWrapper>
            <PasswordWrapper>
              <ChangePassword
                width="100%"
                inputwidth="500px"
                padding="20px 10px"
                onClick={selectPasswordEdit}
                btnwidth="80px"
                height="30px"
                buttonfontsize="15px"
                labelfontsize="16px"
                placeholdersize="15px"
                display="flex-end"
                buttonGroupWidth="700px"
                messageWidth="700px"
                openSuccessAlert={openSuccessAlert}
              />
            </PasswordWrapper>
          </div>
        )}
      </Wrapper>
      {isSuccessAlertOpen && (
        <Alert
          description={
            '비밀번호를 변경하면 로그인한 디바이스에서 모두 로그아웃 처리됩니다. 변경하시겠습니까?'
          }
          isAlertOpen={isSuccessAlertOpen}
          action="확인"
          onClick={moveRelogin}
          onClose={CloseSuccessAlert}
        ></Alert>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 80px;
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  display: flex;
  color: ${COLOR.FONT_BLACK};
  padding-bottom: 20px;
`;
const SubTitleWrapper = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  padding-left: 20px;
`;
const SubTitle = styled.div`
  color: ${COLOR.FONT_BLACK};
  font-size: 16px;
`;
const TooltipWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Tooltip = styled.div`
  width: 250px;
  height: 60px;
  background-color: black;
  color: white;
  padding: 10px;
  font-size: 10px;
`;
const InformationForm = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 40px;
  gap: 30px;
`;
const InputWrapper = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
  &:last-of-type {
    margin-bottom: 20px;
  }
`;
const Information = styled.p`
  font-size: 16px;
`;
const PasswordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 40px;
`;
const ButtonGroup = styled.div`
  border: none;
  background-color: transparent;
  display: flex;
  gap: 10px;
  padding-left: 30px;
`;
const ButtonWrapper = styled.div`
  margin-left: -15px;
`;
