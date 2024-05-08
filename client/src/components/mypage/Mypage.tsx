import * as React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import { getMyInfo, patchSaveName } from '../../api/user';
import {
  Input,
  Label,
  Button,
  Loader,
  openToastifyAlert,
  Tooltip,
  Icon,
} from '../../components';
import { COLOR, nameRegex } from '../../components/constants';
import { getAuthorityCookie } from '../../utils/cookies';
import { ChangePassword } from '../auth/password/ChangePassword';

export function Mypage() {
  const [isNameEdit, setIsNameEdit] = useState(false);
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);

  const [nameValue, setNameValue] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [isNameError, setIsNameError] = useState(false);

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
  const {
    isLoading,
    data: myInfoData,
    refetch,
  } = useQuery({
    queryKey: ['get-myInfo'],
    queryFn: getMyInfo,
    meta: {
      errorMessage: 'get-myInfo 에러 메세지',
    },
  });

  // 이름 수정 api
  const { data: saveNameData, mutate: saveNameDataMutate } = useMutation({
    mutationFn: patchSaveName,
    onError: (context: { response: { data: { message: string } } }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
    },
    onSuccess: (response: { data: { message: string } }) => {
      console.log('passwordDataInit', response);

      setIsNameEdit(false);
      openToastifyAlert({
        type: 'success',
        text: `이름이 수정되었습니다.`,
      });
      myInfoData &&
        setMember({
          id: myInfoData.data.data.id,
          name: nameValue,
          authority: myInfoData.data.data.authority.name,
        });

      refetch();
    },
  });

  const submitName = () => {
    if (!nameRegex.test(nameValue)) {
      setIsNameError(true);
      setNameErrorMessage('띄워쓰기 없이 한글, 영문, 숫자만 입력');
      return;
    } else {
      saveNameDataMutate(nameValue);
      setIsNameError(false);
      setNameErrorMessage('');
    }
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
    //myInfoData
  }, [myInfoData]);

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
            <Label value="아이디" fontSize="16px" width="150px" />
            <Information>{member.id}</Information>
          </InputWrapper>
          <InputWrapper>
            <Label value="이름" fontSize="16px" width="150px" />
            {!isNameEdit && <Information>{member.name}</Information>}
            {isNameEdit && (
              <Input
                // width={`calc(100%)`}
                height="30px"
                border="black"
                placeholderSize="16px"
                padding="0 5px"
                fontSize="16px"
                type="text"
                placeholder="수정할 이름을 입력해 주세요"
                value={nameValue}
                maxLength={10}
                minLength={2}
                onChange={(e) => {
                  setNameValue(e.target.value);
                }}
                innerRef={nameInputRef}
                onClick={() => setIsNameError(false)}
                borderbottom={isNameError && true}
                errorMessage={isNameError && nameErrorMessage}
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
            <Label value="권한" fontSize="16px" width="150px" />
            <Information>{member.authority}</Information>
          </InputWrapper>
          {!isPasswordEdit && (
            <InputWrapper>
              <Label value="비밀번호" fontSize="16px" width="150px" />
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
            </InputWrapper>
          )}
        </InformationForm>
        {isPasswordEdit && (
          <div>
            <SubTitleWrapper>
              <TooltipWrapper
                onMouseEnter={() => {
                  setIsShow(true);
                }}
                onMouseLeave={() => {
                  setIsShow(false);
                }}
              >
                <SubTitle>
                  비밀번호 변경
                  <Icon
                    $margin={'0 0 0 5px'}
                    width={`14px`}
                    src={`/images/icon/ictooltip.svg`}
                    disabled={true}
                  />
                  {isShow && (
                    <Tooltip className="on toolTip">
                      <span>
                        비밀번호는 영문과 숫자,
                        특수문자(~,!,@,#,$,%,^,&,*,(,),_,- 만 사용가능)를
                        조합하여 8~20자 이내로 설정해야 합니다.
                      </span>
                    </Tooltip>
                  )}
                </SubTitle>
              </TooltipWrapper>
            </SubTitleWrapper>
            <PasswordWrapper>
              <ChangePassword
                width={`100%`}
                // inputwidth={``}
                padding="20px 10px"
                setIsPasswordEdit={setIsPasswordEdit}
                btnwidth="10em"
                height="30px"
                buttonfontsize="15px"
                labelfontsize="16px"
                placeholdersize="15px"
                display="center"
                buttonGroupWidth="100%"
                messageWidth="100%"
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
  padding: 40px;
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
  padding-left: 20px;
`;
const SubTitle = styled.span`
  font-weight: bold;
  color: ${COLOR.FONT_BLACK};
  font-size: 16px;
  display: flex;
  align-items: center;
`;
const TooltipWrapper = styled.div`
  position: relative;

  .toolTip {
    position: absolute;
    width: 350px;
    left: 105px;
    bottom: 0;
  }
`;

const InformationForm = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 40px;
  gap: 30px;
`;
const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  &:last-of-type {
    margin-bottom: 20px;
  }
  div:has(input) {
    width: calc(100% - 500px);
    max-width: 500px;
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
  gap: 5px;
  padding-left: 10px;
`;
