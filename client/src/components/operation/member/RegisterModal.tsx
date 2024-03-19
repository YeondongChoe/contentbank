import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { Input, Label, AlertBar } from '../..';
import { userInstance } from '../../../api/axios';
import { postRegister, postDuplicate } from '../../../api/postAxios';
import { useModal } from '../../../hooks';
import { MemberType } from '../../../types';
import { Button, openToastifyAlert } from '../../atom';
import { Select } from '../../atom/select';
import { COLOR } from '../../constants';
import { Alert } from '../../molecules/alert/Alert';

type authorityType = {
  idx: number;
  code: string;
  name: string;
  sort: number;
  createdBy: string;
  createdAt: string;
  lastModifiedBy: string;
  lastModifiedAt: string;
};

type authoritySelectType = {
  id: number;
  label: string;
  code: string;
  value: string;
};

type RegisterModalProps = {
  isRegister: boolean;
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSuccessAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function RegisterModal({ memberList }: { memberList?: MemberType[] }) {
  const { closeModal } = useModal();

  const [isIdError, setIsIdError] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [isAuthorityError, setIsAuthorityError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [idErrorMessage, setIdErrorMessage] = useState('');
  const [AuthorityErrorMessage, setAuthorityErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [duplicatedId, setduplicatedId] = useState('');

  const [isDuplicate, setIsDuplicate] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [commentValue, setCommentValue] = useState('');
  // const [authorityCode, setAuthorityCode] = useState<string>();
  const [authoritySelectList, setAuthoritySelectList] = useState<
    authoritySelectType[]
  >([]);
  const { control, watch } = useForm();

  // const AuthorityList = authoritySelectList.map((el) => {
  //   return [el.label, el.code];
  // });

  // const Authority = authorityCode;
  const Name = watch('name');
  const Id = watch('id');
  const Comment = commentValue;

  const closePopup = () => {
    // setIsRegister(false);
    closeModal();
  };

  // 아이디 중복 확인
  const checkDuplicate = () => {
    if (memberList) {
      // console.log('memberList', memberList);
      const idDuplicate = memberList.filter((el) => el.id === Id);
      // console.log('idDuplicate', Boolean(idDuplicate.length));
      setIsDuplicate(Boolean(idDuplicate.length));
    }
  };

  // 계정 등록하기 api
  const postCreateAccount = async () => {
    const account = {
      id: Id,
      name: Name,
      authorityCode: selectedValue,
      note: Comment,
    };
    // console.log('account', account);
    const res = await userInstance.post(`/v1/account`, account);
    // console.log('res.data.code', res.data);
    const code = res.data.code;
    // 등록 에러시 메세지 토스트
    if (code !== 'S-002') {
      openToastifyAlert({
        type: 'error',
        text: res.data.message,
      });
    }
    // 정상 등록시 메세지 토스트
    if (code === 'S-002') {
      openToastifyAlert({
        type: 'success',
        text: res.data.message,
      });
      closeModal();
    }
  };
  // const { data: createAccount, mutate: changeCreateAccount } = useMutation({
  //   mutationFn: postCreateAccount,
  //   onError: (context: { response: { data: { message: string } } }) => {
  //     openToastifyAlert({
  //       type: 'error',
  //       text: context.response.data.message,
  //     });
  //   },
  //   onSuccess: (response: { data: { message: string } }) => {
  //     console.log('createAccount', response);
  //     openToastifyAlert({
  //       type: 'success',
  //       text: response.data.message,
  //     });

  //     console.log('createAccount', createAccount && createAccount);
  //   },
  // });

  const submitRegister = () => {
    //필수 항목 에러처리
    if (Name === '') {
      setIsNameError(true);
      setNameErrorMessage('필수 항목을 입력해주세요');
      return;
    }
    if (Id === '') {
      setIsIdError(true);
      setIdErrorMessage('필수 항목을 입력해주세요');
      return;
    }
    if (selectedValue === '') {
      setIsAuthorityError(true);
      setAuthorityErrorMessage('필수 항목을 입력해주세요');
      return;
    }
    if (isDuplicate === true) {
      setIsIdError(true);
      setIdErrorMessage('사용 불가능한 아이디 입니다');
      return;
    }
    postCreateAccount();

    //버튼 disable 처리
  };

  // 권한 불러오기 api
  const getAuthority = async () => {
    const res = await userInstance.get(`/v1/authority?menuIdx=${9}`);
    // console.log(`get authority 결과값`, res);
    return res;
  };
  const {
    isLoading,
    error,
    data: authorityData,
    isFetching,
  } = useQuery({
    queryKey: ['get-authority'],
    queryFn: getAuthority,
    meta: {
      errorMessage: 'get-authority 에러 메세지',
    },
  });

  // 권한 데이터 받아온 후 셀렉트 초기값 설정
  useEffect(() => {
    // console.log('authorityData', authorityData && authorityData);
    if (authorityData && authorityData.data.data.authorityList) {
      const list: authoritySelectType[] =
        authorityData.data.data.authorityList.map((item: authorityType) => ({
          id: item.idx,
          label: item.name,
          code: item.code,
          value: item.name,
        }));
      setAuthoritySelectList([...list]);
    } else {
      setAuthoritySelectList([
        {
          id: 0,
          label: 'none',
          code: 'none',
          value: 'none',
        },
      ]);
    }
  }, [isFetching]);

  useEffect(() => {
    if (Id === '') {
      setIsDuplicate(false);
    }
  }, [Id]);

  return (
    <Container>
      {/* <AlertBar
        type="success"
        isAlertOpen={isSuccessAlertOpen}
        closeAlert={closeSuccessAlert}
        message={'정상 처리되었습니다.'}
      /> */}

      <Title>회원 아이디 만들기</Title>
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
                  width="100%"
                  height="38px"
                  fontSize="16px"
                  placeholderSize="12px"
                  margin="0px 0px 10px 0px"
                  border="black"
                  maxLength={10}
                  minLength={2}
                  borderbottom={isNameError && true}
                  onChange={field.onChange}
                  onClick={() => setIsNameError(false)}
                  errorMessage={isNameError && nameErrorMessage}
                />
              )}
            />
          </InputWrapper>
          <InputWrapper>
            {isIdError ? (
              <Label
                width="130px"
                type="error"
                fontSize="15px"
                value="* 아이디"
              />
            ) : (
              <Label width="130px" fontSize="15px" value="* 아이디" />
            )}
            <ButtonWrapper>
              <Controller
                control={control}
                name="id"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="띄워쓰기 없이 영문(소문자)과 숫자만 입력"
                    value={field.value}
                    width={`100%`}
                    height="38px"
                    fontSize="16px"
                    placeholderSize="12px"
                    margin="0px 0px 10px 0px"
                    border="black"
                    maxLength={10}
                    minLength={2}
                    onChange={field.onChange}
                    onClick={() => {
                      setIsIdError(false);
                    }}
                    errorMessage={isIdError && idErrorMessage}
                    className={Id && isDuplicate ? 'success' : ''}
                    borderbottom={isIdError}
                  />
                )}
              />
              {Id && isDuplicate && (
                <IdSuccessMessage>{successMessage}</IdSuccessMessage>
              )}

              <Button
                buttonType="button"
                $margin={'0 0 0 10px'}
                width={`130px`}
                onClick={checkDuplicate}
                $padding={'8px'}
                height={'38px'}
                fontSize="15px"
                $filled
                cursor
                disabled={!Id}
              >
                <span>중복확인</span>
              </Button>
            </ButtonWrapper>
          </InputWrapper>
          <InputWrapper>
            {isAuthorityError ? (
              <Label
                width="130px"
                fontSize="15px"
                type="error"
                value="* 권한"
              />
            ) : (
              <Label width="130px" fontSize="15px" value="* 권한" />
            )}

            <Controller
              control={control}
              name="authority"
              render={({ field }) => (
                <SelectWrapper>
                  <Select
                    width="100%"
                    height="50px"
                    padding="5px 0px 0px 0px"
                    defaultValue={'권한을 선택하세요'}
                    onClick={() => setIsAuthorityError(false)}
                    options={authoritySelectList}
                    setSelectedValue={setSelectedValue}
                  ></Select>
                </SelectWrapper>
              )}
            />

            {isAuthorityError && (
              <ErrorMessage>{AuthorityErrorMessage}</ErrorMessage>
            )}
          </InputWrapper>

          <InputWrapper>
            <Label width="130px" fontSize="15px" value="비고" />
            <Textarea
              onChange={(e) => {
                setCommentValue(e.target.value);
              }}
            ></Textarea>
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
              onClick={submitRegister}
              $padding="10px"
              height={'40px'}
              fontSize="16px"
              $filled
              cursor
            >
              <span>등록</span>
            </Button>
          </ButtonGroup>
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
  position: relative;
  padding-bottom: 20px;

  div:has(input) {
    width: calc(100% - 130px);
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  width: calc(100% - 130px);
  flex-direction: row;
`;

const SelectWrapper = styled.div`
  width: calc(100% - 130px);
`;

const Textarea = styled.textarea`
  width: calc(100% - 130px);
  height: 100px;
  font-size: 14px;
  border: 1px solid ${COLOR.BORDER_GRAY};
  padding: 10px;
  resize: none;
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

const IdSuccessMessage = styled.p`
  color: ${COLOR.SUCCESS};
  font-size: 12px;
  position: absolute;
`;
const ErrorMessage = styled.p`
  color: ${COLOR.ERROR};
  padding-left: 130px;
  font-size: 12px;
  position: absolute;
  bottom: 0;
  top: auto;
`;
