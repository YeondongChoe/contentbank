import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import {
  MdCheckBoxOutlineBlank,
  MdIndeterminateCheckBox,
} from 'react-icons/md';
import styled from 'styled-components';

import {
  getIndividualMemberInformation,
  getAuthorityList,
} from '../../api/getAxios';
import {
  putChangeMemberInformation,
  putInitPassword,
} from '../../api/putAxios';
import { Input, Label, AlertBar } from '../../components';
import { Button } from '../../components/atom';
import { Select } from '../../components/atom/select';
import { COLOR } from '../../components/constants';
import { Alert } from '../molecules/alert/Alert';

type authorityProps = {
  seq: number;
  code: string;
  name: string;
  sort: number;
};

type EditPopupProps = {
  isEditer: boolean;
  keyValue: string;
  setIsEditer: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function EditPopup({
  isEditer,
  keyValue,
  setIsEditer,
  setIsEditAlertOpen,
}: EditPopupProps) {
  const [member, setMember] = useState({
    id: null,
    name: null,
    key: null,
    authority: null,
    comment: null,
    enabled: null,
    authCode: null,
  });
  const [didMount, setDidMount] = useState(false);
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

  const Authority = authorityCode;
  const Name = watch('name');
  const Comment = watch('comment');
  const CheckBox = isEnabled;

  const closePopup = () => {
    setIsEditer(false);
  };

  const checkEnabled = () => {
    setIsEnabled(!isEnabled);
  };

  const openInitPasswordAlert = () => {
    setIsAlertOpen(true);
  };
  const closeInitPasswordAlert = () => {
    setIsAlertOpen(false);
  };

  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);

  const closeSuccessAlert = () => {
    setIsSuccessAlertOpen(false);
  };

  const clickInitPassword = () => {
    putInitPassword({
      keyValue,
      setIsInit,
      setIsAlertOpen,
      setIsSuccessAlertOpen,
    });
  };

  const submitEdit = async () => {
    putChangeMemberInformation({
      Authority,
      member,
      Name,
      Comment,
      CheckBox,
      keyValue,
      setIsEditer,
      setIsNameError,
      setNameErrorMessage,
      setIsEditAlertOpen,
    });
  };

  const loadData = useCallback(() => {
    getIndividualMemberInformation({
      keyValue,
      setMember,
    });
    getAuthorityList({
      setAuthorityList,
    });
  }, []);

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      loadData();
    }
  }, [didMount]);

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

  return (
    <>
      {isEditer && (
        <Overlay>
          <Container>
            <AlertBar
              type="success"
              isAlertOpen={isSuccessAlertOpen}
              closeAlert={closeSuccessAlert}
              message={'정상 처리되었습니다.'}
            ></AlertBar>
            <TitleWrapper>
              <Title>회원 정보 상세보기</Title>
            </TitleWrapper>
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
                        width="450px"
                        height="38px"
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
                  <Controller
                    control={control}
                    name="id"
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        disabled
                        type="text"
                        value={field.value}
                        width="310px"
                        height="38px"
                        fontSize="16px"
                        margin="0px 0px 10px 0px"
                        border="black"
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <InitButtonWrapper>
                    <Button
                      buttonType="button"
                      onClick={openInitPasswordAlert}
                      $padding="10px"
                      height={'38px'}
                      width={'130px'}
                      fontSize="15px"
                      $borderRadius="7px"
                      $filled
                    >
                      <span>비밀번호 초기화</span>
                    </Button>
                  </InitButtonWrapper>
                </InputWrapper>
                <SelectWrapper>
                  <Label width="130px" fontSize="15px" value="* 권한" />
                  <DisableWrapper>
                    <Controller
                      control={control}
                      name="authority"
                      render={({ field }) => (
                        <Select
                          width="360px"
                          height="50px"
                          padding="5px 0px 0px 0px"
                          defaultValue={member.authority}
                          onSelect={(event, code) => {
                            setAuthorityCode(code);
                          }}
                          options={AuthorityOption}
                        ></Select>
                      )}
                    />
                    {isEnabled ? (
                      <CheckBoxWrapper>
                        <MdCheckBoxOutlineBlank
                          style={{ width: '20px', height: '20px' }}
                          onClick={checkEnabled}
                        />
                        <span>비활성화</span>
                      </CheckBoxWrapper>
                    ) : (
                      <CheckBoxWrapper>
                        <MdIndeterminateCheckBox
                          style={{ width: '20px', height: '20px' }}
                          onClick={checkEnabled}
                        />
                        <span>비활성화</span>
                      </CheckBoxWrapper>
                    )}
                  </DisableWrapper>
                </SelectWrapper>
                <TextareaWrapper>
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
                </TextareaWrapper>
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
                    width={'120px'}
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
                    width={'120px'}
                    fontSize="16px"
                    $filled
                    cursor
                  >
                    <span>수정</span>
                  </Button>
                </ButtonGroup>
                <Alert
                  isAlertOpen={isAlertOpen}
                  description="초기화된 아이디는 자동 로그아웃 처리 됩니다."
                  subDescription="비밀번호를 초기화 하시겠습니까?"
                  onClick={clickInitPassword}
                  onClose={closeInitPasswordAlert}
                  action="확인"
                />
              </ContentBox>
            </form>
          </Container>
        </Overlay>
      )}
    </>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const Container = styled.div`
  min-width: 700px;
  height: 700px;
  padding: 30px;
  border: 1px solid ${COLOR.BORDER_GRAY};
  background-color: white;
  border-radius: 5px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
`;

const Title = styled.div`
  font-size: 22px;
  display: flex;
  justify-content: center;
  flex: 1 0 0;
`;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const InputWrapper = styled.div`
  width: 680px;
  height: 84px;
  display: flex;
  justify-content: center;
`;
const SelectWrapper = styled.div`
  width: 680px;
  height: 100px;
  display: flex;
  justify-content: center;
`;
const InitButtonWrapper = styled.div`
  display: flex;
  padding-left: 10px;
`;
const DisableWrapper = styled.div`
  min-width: 450px;
  display: flex;
`;
const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  height: 64px;
  gap: 5px;
  font-size: 14px;
`;
const TextareaWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 680px;
  height: 200px;
`;
const Textarea = styled.textarea`
  width: 450px;
  height: 180px;
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
  gap: 10px;
`;
