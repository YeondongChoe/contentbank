import * as React from 'react';
import { useState, useEffect } from 'react';

import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { Input, Label, AlertBar } from '../..';
import {
  getAuthorityList,
  getUser,
  patchUserPasswordInit,
  putChangeUserInfo,
} from '../../../api/user';
import { useModal } from '../../../hooks';
import { ItemAuthorityType } from '../../../types';
import { Button, openToastifyAlert } from '../../atom';
import { ItemSelectProps, Select } from '../../atom/select';
import { COLOR } from '../../constants';
import { Alert } from '../../molecules/alert/Alert';

export function EditModal({
  accountIdx,
  userKey,
  refetch,
}: {
  accountIdx: number;
  userKey: string;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<AxiosResponse<any, any>, Error>>;
}) {
  const { closeModal } = useModal();
  const [member, setMember] = useState<{
    id: null | string;
    name: null | string;
    key: null | string;
    authority: null | string;
    comment: null | string;
    enabled: null | boolean;
    authCode: null | string;
  }>({
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
  const [authorityList, setAuthorityList] = useState<ItemSelectProps[]>([]);
  const [authorityCode, setAuthorityCode] = useState<string>('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { control, setValue, watch } = useForm();
  const Name = watch('name');
  const Comment = watch('comment');

  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);

  const closeSuccessAlert = () => {
    setIsSuccessAlertOpen(false);
  };
  // 유저 정보 변경 api
  const { data: changeUserInfo, mutate: mutateChangeUserInfo } = useMutation({
    mutationFn: putChangeUserInfo,
    onError: (context: { response: { data: { message: string } } }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
    },
    onSuccess: (response: { message: string }) => {
      console.log('changeUserInfo', response);
      openToastifyAlert({
        type: 'success',
        text: response.message,
      });
      refetch();
      closeModal();
    },
  });

  // 유저 정보 변경 버튼
  const submitEdit = () => {
    if (Name == '') {
      setIsNameError(true);
      setNameErrorMessage('필수 항목을 입력해주세요');
      return;
    }
    if (authorityCode && memberData) {
      console.log(
        'userInfo',
        Name,
        Comment,
        authorityCode,
        memberDatas?.isLock,
      );
      const userInfo = {
        name: Name as string,
        authorityCode: authorityCode,
        note: Comment as string,
        isUseNot: memberDatas?.isLock ? 'Y' : 'N',
      };
      mutateChangeUserInfo({ accountIdx, userInfo });
    }
  };

  // 유저 비밀번호 초기화 api
  const { data: userPasswordInit, mutate: mutateUserPasswordInit } =
    useMutation({
      mutationFn: patchUserPasswordInit,
      onError: (context: { response: { data: { message: string } } }) => {
        openToastifyAlert({
          type: 'error',
          text: context.response.data.message,
        });
      },
      onSuccess: (response: { data: { message: string } }) => {
        // console.log('userPasswordInit', response);
        openToastifyAlert({
          type: 'success',
          text: response.data.message,
        });
      },
    });
  // 비밀번호 초기화 버튼
  const handleInitPassword = () => {
    setIsAlertOpen(true);
    mutateUserPasswordInit(userKey);
  };
  const closeInitPasswordAlert = () => {
    setIsAlertOpen(false);
  };

  // 권한 셀렉트 불러오기 api
  const { data: authorityListData } = useQuery({
    queryKey: ['get-authorityList'],
    queryFn: getAuthorityList,
    meta: {
      errorMessage: 'get-authorityList 에러 메세지',
    },
  });

  const updateAuthorityList = () => {
    if (authorityListData) {
      const authority: ItemSelectProps[] = [];
      authorityListData.data.data.authorityList.map((el: ItemAuthorityType) => {
        authority.push({
          id: `${el.idx} ${el.name}`,
          label: `${el.name}`,
          code: `${el.code}`,
          value: `${el.name} ${el.name}`,
        });
      });
      setAuthorityList([...authority]);
    }
  };
  useEffect(() => {
    updateAuthorityList();
  }, [authorityListData]);

  // 유저 불러오기 api
  const { data: memberData } = useQuery({
    queryKey: ['get-member'],
    queryFn: () => getUser(accountIdx),
    meta: {
      errorMessage: 'get-member 에러 메세지',
    },
  });
  const memberDatas = memberData && memberData.data.data;

  useEffect(() => {
    setMember({
      id: memberDatas?.id,
      name: memberDatas?.name,
      key: memberDatas?.userKey,
      authority: memberDatas?.authorityCode,
      comment: memberDatas?.note,
      enabled: memberDatas?.isLock,
      authCode: memberDatas?.roleCode,
    });
    setAuthorityCode(memberDatas?.authorityCode);
  }, [memberData]);

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
    if (member.enabled) {
      setValue('enabled', member.enabled);
    }
  }, [
    member.name,
    member.id,
    member.authority,
    member.comment,
    member.enabled,
    setValue,
  ]);

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
                    setSelectedValue={setAuthorityCode}
                    options={authorityList}
                  ></Select>
                </SelectWrapper>
              )}
            />
          </InputWrapper>
          <InputWrapper>
            <Label width="130px" fontSize="15px" value="* 활성화" />
            <ButtonWrapper>
              <button
                type="button"
                onClick={() => {}}
                className={`${!member.enabled && `isActive`} isActive_btn`}
              >
                활성화
              </button>
              <button
                type="button"
                onClick={() => {}}
                className={`${member.enabled && `isActive`} isActive_btn`}
              >
                비활성화
              </button>
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
              onClick={() => closeModal()}
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
  gap: 5px;

  .isActive_btn {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${COLOR.BUTTON_NORMAL};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 10px;
    font-weight: bold;
    color: ${COLOR.FONT_BLACK};
  }
  .isActive {
    background-color: ${COLOR.PRIMARY};
    color: #fff;
  }
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
