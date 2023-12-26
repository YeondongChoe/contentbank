import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import Textarea from '@mui/joy/Textarea';
import { Controller, useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  getIndividualMemberInformation,
  getAuthorityList,
} from '../../api/getAxios';
import {
  putChangeMemberInformation,
  putInitPassword,
} from '../../api/putAxios';
import { Input, Label } from '../../components';
import { Button } from '../../components/atom';
import { Select } from '../../components/atom/select';
import { editerBoolAtom, memberKeyValueAtom } from '../../state/memberAtom';
import { alertBoolAtom } from '../../state/utilAtom';
import { NoticeAlert } from '../molecules/alert/NoticeAlert';

type authorityProps = {
  seq: number;
  code: string;
  name: string;
  sort: number;
};

export function EditPopup() {
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

  const keyValue = useRecoilValue(memberKeyValueAtom);
  const [isEditer, SetIsEditer] = useRecoilState(editerBoolAtom);
  const [isNameError, setIsNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [authorityList, setAuthorityList] = useState<authorityProps[]>([]);
  const [authorityCode, setAuthorityCode] = useState<string | undefined>();
  const [isEnabled, setIsEnabled] = useState(member.enabled as boolean | null);

  const AuthorityList = authorityList.map((el) => {
    return [el.name, el.code];
  });
  const AuthorityOption = AuthorityList.map((item, index) => ({
    id: `${index + 1}`,
    label: item[0],
    code: item[1],
    value: index + 1,
  }));
  //console.log(AuthorityOption);
  //console.log(AuthorityList);
  const setIsAlertOpen = useSetRecoilState(alertBoolAtom);
  const [isInit, setIsInit] = useState(false);

  const { control, setValue, watch } = useForm();

  const Authority = authorityCode;
  const Name = watch('name');
  const Comment = watch('comment');
  const CheckBox = isEnabled;

  const closePopup = () => {
    SetIsEditer(false);
  };

  const checkEnabled = () => {
    setIsEnabled(!isEnabled);
  };

  const clickInitPassword = () => {
    setIsAlertOpen(true);
    putInitPassword({ keyValue, setIsInit });
  };

  const submitEdit = async () => {
    putChangeMemberInformation({
      Authority,
      member,
      Name,
      Comment,
      CheckBox,
      keyValue,
      SetIsEditer,
      setIsNameError,
      setNameErrorMessage,
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
            <TitleWrapper>
              <Title>회원 정보 상세보기</Title>
              <ClearTwoToneIcon
                onClick={closePopup}
                sx={{ cursor: 'pointer' }}
              />
            </TitleWrapper>
            <form>
              <ContentBox>
                {isNameError ? (
                  <Label
                    width="350px"
                    type="error"
                    fontSize="16px"
                    value="이름(필수)"
                  />
                ) : (
                  <Label width="350px" fontSize="16px" value="이름(필수)" />
                )}
                <Controller
                  control={control}
                  name="name"
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <Input
                        type="text"
                        placeholder="띄워쓰기 없이 한글, 영문, 숫자만 입력"
                        value={field.value}
                        width="350px"
                        height="32px"
                        fontSize="16px"
                        placeholderSize="12px"
                        margin="0px 0px 10px 0px"
                        border="black"
                        borderbottom={isNameError && true}
                        onChange={field.onChange}
                        onClick={() => setIsNameError(false)}
                        errorMessage={isNameError && nameErrorMessage}
                      />
                    </>
                  )}
                />
                <Label width="350px" fontSize="16px" value="아이디" />
                <Controller
                  control={control}
                  name="id"
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      disabled
                      type="text"
                      value={field.value}
                      width="350px"
                      height="32px"
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
                    onClick={clickInitPassword}
                    $padding="10px"
                    height={'30px'}
                    width={'140px'}
                    fontSize="14px"
                    $borderRadius="15px"
                  >
                    <span>비밀번호 초기화</span>
                  </Button>
                </InitButtonWrapper>
                <DisableWrapper>
                  <Label fontSize="16px" width="200px" value="권한" />
                  {isEnabled ? (
                    <CheckBoxWrapper>
                      <CheckBoxOutlineBlankIcon onClick={checkEnabled} />
                      <span>비활성화</span>
                    </CheckBoxWrapper>
                  ) : (
                    <CheckBoxWrapper>
                      <IndeterminateCheckBoxIcon onClick={checkEnabled} />
                      <span>비활성화</span>
                    </CheckBoxWrapper>
                  )}
                </DisableWrapper>
                <Controller
                  control={control}
                  name="authority"
                  render={({ field }) => (
                    <Select
                      width="350px"
                      height="50px"
                      defaultValue={member.authority}
                      onSelect={(event, code) => {
                        setAuthorityCode(code);
                      }}
                      options={AuthorityOption}
                    ></Select>
                  )}
                />

                <Label width="350px" fontSize="16px" value="비고" />
                <Controller
                  control={control}
                  name="comment"
                  defaultValue=""
                  render={({ field }) => (
                    <Textarea
                      sx={{ mb: 1, mt: 1, fontSize: '14px', width: '350px' }}
                      placeholder=""
                      size="md"
                      minRows={3}
                      maxRows={3}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  )}
                />
                <NoticeWarpper>
                  <Notice>*초기 비밀번호는 drmath@369입니다.</Notice>
                  <Notice>*첫 로그인시 비밀번호를 변경할 수 있습니다.</Notice>
                </NoticeWarpper>
                <ButtonGroup>
                  <Button
                    buttonType="button"
                    onClick={closePopup}
                    $padding="10px"
                    height={'50px'}
                    width={'170px'}
                    fontSize="14px"
                    $border
                  >
                    <span>취소</span>
                  </Button>
                  <Button
                    buttonType="button"
                    onClick={submitEdit}
                    $padding="10px"
                    height={'50px'}
                    width={'170px'}
                    fontSize="14px"
                  >
                    <span>수정</span>
                  </Button>
                </ButtonGroup>
                {isInit && (
                  <NoticeAlert title="비밀번호가 초기화 되었습니다." />
                )}
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
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const Container = styled.div`
  min-width: 500px;
  padding: 20px;
  border: 1px solid gray;
  background-color: white;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
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
  gap: 5px;
`;
const InitButtonWrapper = styled.div`
  min-width: 350px;
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
`;
const DisableWrapper = styled.div`
  min-width: 350px;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px 0px 0px;
`;
const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const NoticeWarpper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 60px;
  gap: 10px;
`;
const Notice = styled.p`
  font-size: 12px;
`;
const ButtonGroup = styled.div`
  padding-top: 30px;
  display: flex;
  gap: 10px;
`;
