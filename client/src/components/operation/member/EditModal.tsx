import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { Input, Label, AlertBar } from '../..';
import { userInstance } from '../../../api/axios';
import { useModal } from '../../../hooks';
import { Button, openToastifyAlert } from '../../atom';
import { Select } from '../../atom/select';
import { COLOR } from '../../constants';
import { Alert } from '../../molecules/alert/Alert';

type authorityProps = {
  seq: number;
  code: string;
  name: string;
  sort: number;
};

type EditModalProps = {
  isEditer: boolean;
  keyValue: string;
  setIsEditer: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function EditModal({
  accountIdx,
  userKey,
}: {
  accountIdx: number;
  userKey: string;
}) {
  const { closeModal } = useModal();
  const [member, setMember] = useState({
    id: null,
    name: null,
    key: null,
    authority: null,
    comment: null,
    enabled: null,
    authCode: null,
  });
  const [isNameError, setIsNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [authorityList, setAuthorityList] = useState<authorityProps[]>([]);
  const [authorityCode, setAuthorityCode] = useState<string | undefined>();
  const [isEnabled, setIsEnabled] = useState(member.enabled as boolean | null);
  //console.log(isEnabled);

  const AuthorityList = authorityList.map((el) => {
    return [el.name, el.code];
  });
  const AuthorityOption = AuthorityList.map((item, index) => ({
    id: `${index + 1}`,
    label: item[0],
    code: item[1],
    value: index + 1,
  }));

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isInit, setIsInit] = useState(false);

  const { control, setValue, watch } = useForm();

  // const Authority = authorityCode;
  // const Name = watch('name');
  // const Comment = watch('comment');
  // const CheckBox = isEnabled;

  const closePopup = () => {
    closeModal();
  };

  const checkEnabled = () => {
    setIsEnabled(!isEnabled);
  };

  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);

  const closeSuccessAlert = () => {
    setIsSuccessAlertOpen(false);
  };

  const clickInitPassword = () => {
    // putInitPassword({
    // });
  };

  const submitEdit = () => {
    console.log('memberrrrrrr', member.name);
  };
  // 비밀번호 초기화
  const handleInitPassword = () => {
    setIsAlertOpen(true);
    patchUserPasswordInit();
  };
  const closeInitPasswordAlert = () => {
    setIsAlertOpen(false);
  };

  // 유저 비밀번호 초기화 api
  const patchUserPasswordInit = async () => {
    return await userInstance.patch(
      `/v1/account/initialize-password/${userKey}`,
    );
  };
  const { data: userPasswordInit, mutate: changeUserPasswordInit } =
    useMutation({
      mutationFn: patchUserPasswordInit,
      onError: (context: { response: { data: { message: string } } }) => {
        openToastifyAlert({
          type: 'error',
          text: context.response.data.message,
        });
      },
      onSuccess: (response: { data: { message: string } }) => {
        console.log('userPasswordInit', response);
        openToastifyAlert({
          type: 'success',
          text: response.data.message,
        });
      },
    });

  // 유저 리스트 불러오기 api
  const getUser = async () => {
    const res = await userInstance.get(`/v1/account/${accountIdx}`);
    // console.log(`accountIdx get 결과값`, res);
    return res;
  };
  const {
    isLoading,
    error,
    data: memberData,
    isFetching,
  } = useQuery({
    queryKey: ['get-member'],
    queryFn: getUser,
    meta: {
      errorMessage: 'get-member 에러 메세지',
    },
  });

  useEffect(() => {
    const data = memberData && memberData.data.data;
    setMember({
      id: data?.id,
      name: data?.name,
      key: data?.userKey,
      authority: data?.authorityCode,
      comment: data?.note,
      enabled: data?.isLock,
      authCode: data?.roleCode,
    });
  }, [isFetching]);

  useEffect(() => {
    if (member.name) {
      setValue('name', member.name);
    }
    if (member.id) {
      setValue('id', member.id);
    }
    if (member.authority) {
      setValue('authority', member.authority);
    }
    if (member.comment) {
      setValue('comment', member.comment);
    }
    setIsEnabled(member.enabled);
  }, [
    member.name,
    member.id,
    member.authority,
    member.comment,
    member.enabled,
    setValue,
  ]);

  //필수 항목 에러처리
  useEffect(() => {
    if (member.name === 0) {
      setIsNameError(true);
      setNameErrorMessage('필수 항목을 입력해주세요');

      //버튼 disable 처리
    }
  }, [member.name]);

  // 라디오 버튼 설정
  const handleRadioCheck = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <Container>
      <AlertBar
        type="success"
        isAlertOpen={isSuccessAlertOpen}
        closeAlert={closeSuccessAlert}
        message={'정상 처리되었습니다.'}
      />

      <Title>회원 정보 상세보기</Title>

      <form>
        <ContentBox>
          <InputWrapper>
            {isNameError ? (
              <Label
                width="130px"
                type="error"
                fontSize="15px"
                value="* 이름"
              />
            ) : (
              <Label width="130px" fontSize="15px" value="* 이름" />
            )}

            <Controller
              control={control}
              name="name"
              defaultValue=""
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="띄워쓰기 없이 한글, 영문, 숫자만 입력"
                  value={field.value}
                  height="38px"
                  width="100%"
                  fontSize="16px"
                  placeholderSize="12px"
                  margin="0px 0px 10px 0px"
                  border="black"
                  borderbottom={isNameError && true}
                  onChange={field.onChange}
                  onClick={() => setIsNameError(false)}
                  errorMessage={isNameError && nameErrorMessage}
                />
              )}
            />
          </InputWrapper>
          <InputWrapper>
            <Label width="130px" fontSize="15px" value="* 아이디" />
            <ButtonWrapper>
              <Controller
                control={control}
                name="id"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    disabled
                    type="text"
                    value={field.value}
                    width={`100%`}
                    height="38px"
                    fontSize="16px"
                    margin="0px 0px 10px 0px"
                    border="black"
                    onChange={field.onChange}
                  />
                )}
              />

              <Button
                buttonType="button"
                $margin={'0 0 0 10px'}
                width={`130px`}
                onClick={handleInitPassword}
                $padding={'8px'}
                height={'38px'}
                fontSize="15px"
                $filled
                cursor
              >
                <span>비밀번호 초기화</span>
              </Button>
            </ButtonWrapper>
          </InputWrapper>
          <InputWrapper>
            <Label width="130px" fontSize="15px" value="* 권한" />

            <Controller
              control={control}
              name="authority"
              render={({ field }) => (
                <SelectWrapper>
                  <Select
                    width="100%"
                    height="50px"
                    padding="5px 0px 0px 0px"
                    defaultValue={member.authority}
                    onSelect={(event, code) => {
                      setAuthorityCode(code);
                    }}
                    options={AuthorityOption}
                  ></Select>
                </SelectWrapper>
              )}
            />
          </InputWrapper>
          <InputWrapper>
            <Label width="130px" fontSize="15px" value="* 활성화" />

            <ButtonWrapper>
              <Button width={'calc(50% - 5px)'} $margin={'0 10px 0 0'}>
                활성화
              </Button>
              <Button width={'calc(50% - 5px)'}>비활성화</Button>
            </ButtonWrapper>
          </InputWrapper>
          <InputWrapper>
            <Label width="130px" fontSize="15px" value="비고" />
            <Controller
              control={control}
              name="comment"
              defaultValue=""
              render={({ field }) => (
                <Textarea
                  onChange={field.onChange}
                  value={field.value}
                ></Textarea>
              )}
            />
          </InputWrapper>
          <NoticeWarpper>
            <Notice>
              초기 비밀번호는
              <Button
                height={'23px'}
                width={'90px'}
                fontSize="13px"
                $borderRadius="5px"
                $filled
                $success
              >
                <span>drmath@369</span>
              </Button>
              입니다.
            </Notice>
            <Notice>
              로그인 후 비밀번호를 변경하고 다시 로그인 하면 사용 할 수
              있습니다.
            </Notice>
          </NoticeWarpper>
          <ButtonGroup>
            <Button
              buttonType="button"
              onClick={closePopup}
              $padding="10px"
              height={'40px'}
              fontSize="16px"
              $border
              cursor
            >
              <span>취소</span>
            </Button>
            <Button
              buttonType="button"
              onClick={submitEdit}
              $padding="10px"
              height={'40px'}
              fontSize="16px"
              $filled
              cursor
            >
              <span>수정</span>
            </Button>
          </ButtonGroup>
          <Alert
            isAlertOpen={isAlertOpen}
            description="비밀번호가 초기화 되었습니다."
            subDescription="초기 비밀번호는 drmath@369입니다."
            notice
            onClose={closeInitPasswordAlert}
          />
        </ContentBox>
      </form>
    </Container>
  );
}

const Container = styled.div`
  max-width: 700px;
  min-width: 600px;
  padding: 30px;
`;

const Title = styled.strong`
  font-size: 22px;
  width: 100%;
  display: block;
  font-weight: normal;
  text-align: center;
  padding-bottom: 20px;
`;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const InputWrapper = styled.div`
  width: calc(100% - 30px);
  padding: 10px 0;
  display: flex;
  justify-content: space-between;

  div:has(input) {
    width: calc(100% - 130px);
  }
`;
const SelectWrapper = styled.div`
  width: calc(100% - 130px);
  padding: 10px 0;
`;
const ButtonWrapper = styled.div`
  display: flex;
  width: calc(100% - 130px);
  flex-direction: row;
`;

const Textarea = styled.textarea`
  width: calc(100% - 130px);
  height: 100px;
  font-size: 14px;
  border: 1px solid ${COLOR.BORDER_GRAY};
  padding: 10px;
  resize: none;
  border-radius: 5px;
  margin-bottom: 10px;
`;
const NoticeWarpper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding-bottom: 30px;
`;
const Notice = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
`;
const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;
