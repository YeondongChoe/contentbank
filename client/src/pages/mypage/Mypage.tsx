import * as React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

import { handleAuthorizationRenewal, userInstance } from '../../api/axios';
import { getMemberInformation } from '../../api/getAxios';
import { putSaveName } from '../../api/putAxios';
import {
  Input,
  Label,
  Button,
  Loader,
  openToastifyAlert,
} from '../../components';
import { COLOR } from '../../components/constants';
import { ChangePassword } from '../../components/password/ChangePassword';
import { getAuthorityCookie } from '../../utils/cookies';

type MyInfoDataType = {
  authority?: string | { idx: number; code: string; name: string };
  createdAt?: string;
  createdBy?: string;
  id?: string;
  idx?: number;
  isLock?: false;
  isUse?: true;
  lastModifiedAt?: string;
  lastModifiedBy?: string;
  name?: string;
  userKey?: string;
};
export function Mypage() {
  const queryClient = useQueryClient();
  const [isNameEdit, setIsNameEdit] = useState(false);
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);

  const [nameValue, setNameValue] = useState('');

  const [member, setMember] = useState({
    id: '',
    name: '',
    authority: '',
  });
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const selectNameEdition = () => {
    setIsNameEdit(!isNameEdit);
    setNameValue('');
  };

  const [isShow, setIsShow] = useState(false);

  const showPasswordEdit = () => {
    setIsPasswordEdit(!isPasswordEdit);
    setIsNameEdit(false);
  };

  // 마이페이지 데이터 불러오기 api
  const getMyInfo = async () => {
    // error?.message.includes('401') && handleAuthorizationRenewal(error.message);
    // console.log(getAuthorityCookie('accessToken'));
    const res = await userInstance.get(`/v1/account/my-info`);

    return res;
  };
  const {
    isLoading,
    error,
    data: myInfoData,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['get-myInfo'],
    queryFn: getMyInfo,
    meta: {
      errorMessage: 'get-myInfo 에러 메세지',
    },
  });
  console.log('myInfoData', myInfoData);
  // const { data, reset } = useMutation({
  //   mutationFn: getMyInfo,
  //   onSuccess: () =>
  //     queryClient.invalidateQueries({ queryKey: ['get-myInfo'] }),
  // });

  // 이름 수정 api
  const saveName = async () => {
    const nameData = await userInstance.patch(
      `/v1/account/change-name`,
      nameValue,
    );

    if (nameData.status == 200) {
      myInfoData &&
        setMember({
          id: myInfoData.data.data.id,
          name: nameValue,
          authority: myInfoData.data.data.authority.name,
        });
      setIsNameEdit(false);
      openToastifyAlert({
        type: 'success',
        text: `이름이 수정되었습니다.`,
      });

      refetch();
    }
    // console.log(nameData);
  };

  const submitName = () => {
    // console.log(getAuthorityCookie('accessToken'));

    // handleAuthorizationRenewal('');
    saveName();
  };

  const loadData = useCallback(() => {
    myInfoData &&
      setMember({
        id: myInfoData.data.data.id,
        name: myInfoData.data.data.name,
        authority: myInfoData.data.data.authority.name,
      });
  }, [myInfoData]);

  useEffect(() => {
    loadData();
    //
    // mutationCache.clear();
  }, [myInfoData]);

  // console.log('member', member);
  // useEffect(() => {
  //   handleAuthorizationRenewal('');
  // }, [error]);

  if (isLoading)
    return (
      <Container>
        <Loader />
      </Container>
    );

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
                maxLength={10}
                minLength={2}
                onChange={(e) => {
                  setNameValue(e.target.value);
                }}
                innerRef={nameInputRef}
              />
            )}
            {!isNameEdit && !isPasswordEdit && (
              <ButtonGroup>
                <Button
                  onClick={() => selectNameEdition()}
                  width="80px"
                  height="30px"
                  fontSize="15px"
                  $borderRadius="7px"
                  $normal
                  cursor
                >
                  <span>수정</span>
                </Button>
              </ButtonGroup>
            )}
            {isNameEdit && !isPasswordEdit && (
              <ButtonGroup>
                <Button
                  onClick={() => selectNameEdition()}
                  width="80px"
                  height="30px"
                  fontSize="15px"
                  $borderRadius="7px"
                  $border
                  cursor
                >
                  <span>취소</span>
                </Button>
                <Button
                  onClick={() => submitName()}
                  width="80px"
                  height="30px"
                  fontSize="15px"
                  $borderRadius="7px"
                  $filled
                  cursor
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
                  onClick={showPasswordEdit}
                  width="80px"
                  height="30px"
                  fontSize="15px"
                  $borderRadius="7px"
                  $normal
                  cursor
                >
                  <span>재설정</span>
                </Button>
              </ButtonWrapper>
            </InputWrapper>
          )}
        </InformationForm>
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
                setIsPasswordEdit={setIsPasswordEdit}
                btnwidth="80px"
                height="30px"
                buttonfontsize="15px"
                labelfontsize="16px"
                placeholdersize="15px"
                display="flex-end"
                buttonGroupWidth="700px"
                messageWidth="700px"
              />
            </PasswordWrapper>
          </div>
        )}
      </Wrapper>
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
  font-weight: bold;
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
