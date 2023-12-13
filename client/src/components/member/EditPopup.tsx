import * as React from 'react';
import { useState, useEffect } from 'react';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import Textarea from '@mui/joy/Textarea';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
import { Input } from '../../components/atom/input/Input';
import { Label } from '../../components/atom/label/Label';
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
  const keyValue = useRecoilValue(memberKeyValueAtom);
  const [isEditer, SetIsEditer] = useRecoilState(editerBoolAtom);
  const [isNameError, setIsNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [authorityList, setAuthorityList] = useState<authorityProps[]>([]);
  const [authorityCode, setAuthorityCode] = useState('');
  const [isEnabled, setIsEnabled] = useState(member.enabled as boolean | null);
  const [selectedAuthorityValue, setSelectedAuthorityValue] = useState<
    string[]
  >([]);
  const setIsAlertOpen = useSetRecoilState(alertBoolAtom);
  const [isInit, setIsInit] = useState(false);

  const { control, setValue, watch } = useForm();

  const selectAuthority = (
    event: SelectChangeEvent<typeof selectedAuthorityValue>,
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedAuthorityValue(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const Authority = authorityCode; //건들지말기
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

  useEffect(() => {
    getIndividualMemberInformation({
      keyValue,
      setMember,
    });
    getAuthorityList({
      setAuthorityList,
    });
  }, []);

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
                <Box
                  component="form"
                  display="flex"
                  flexDirection="column"
                  noValidate
                  autoComplete="off"
                >
                  {isNameError ? (
                    <Label type="error" fontSize="16" value="이름(필수)" />
                  ) : (
                    <Label fontSize="16" value="이름(필수)" />
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
                          width="350"
                          height="32"
                          fontSize="16"
                          placeholderSize="12"
                          marginBottom="10"
                          border="black"
                          borderbottom={isNameError && true}
                          onChange={field.onChange}
                          onClick={() => setIsNameError(false)}
                          errorMessage={isNameError && nameErrorMessage}
                        />
                      </>
                    )}
                  />
                  <Label fontSize="16" value="아이디" />
                  <Controller
                    control={control}
                    name="id"
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        disabled
                        type="text"
                        value={field.value}
                        width="350"
                        height="32"
                        fontSize="16"
                        marginBottom="10"
                        border="black"
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <InitButtonWrapper
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <StyleDuplicateBtn
                      variant="contained"
                      onClick={clickInitPassword}
                    >
                      비밀번호 초기화
                    </StyleDuplicateBtn>
                  </InitButtonWrapper>
                </Box>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { minWidth: '350px' },
                  }}
                  noValidate
                  autoComplete="off"
                  display="flex"
                  flexDirection="column"
                >
                  <DisableWrapper>
                    <Label fontSize="16" value="권한" />
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
                        sx={{ m: 1, minWidth: '350px' }}
                        displayEmpty
                        value={selectedAuthorityValue || member.authority} //name
                        onChange={selectAuthority}
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return <em>{member.authority}</em>;
                          }
                          return selected
                            .map((value) => {
                              const selectedAuthority = authorityList?.find(
                                (el) => el.code === value,
                              );
                              setAuthorityCode(
                                selectedAuthority?.code as string,
                              );
                              return selectedAuthority
                                ? selectedAuthority.name
                                : value;
                            })
                            .join(', ');
                        }}
                      >
                        {authorityList?.map((el, i) => (
                          <MenuItem key={i} value={el.code}>
                            {el.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </Box>
                <Box sx={{ minWidth: '350px' }}>
                  <Label fontSize="16" value="비고" />
                  <Controller
                    control={control}
                    name="comment"
                    defaultValue=""
                    render={({ field }) => (
                      <Textarea
                        sx={{ mb: 1, mt: 1, fontSize: '14px' }}
                        placeholder=""
                        size="md"
                        minRows={3}
                        maxRows={3}
                        onChange={field.onChange}
                        value={field.value}
                      />
                    )}
                  />
                </Box>
                <NoticeWarpper>
                  <Notice>*초기 비밀번호는 drmath@369입니다.</Notice>
                  <Notice>*첫 로그인시 비밀번호를 변경할 수 있습니다.</Notice>
                </NoticeWarpper>
                <ButtonGroup>
                  <StyleCancelBtn
                    variant="outlined"
                    onClick={(e) => {
                      e.preventDefault();
                      closePopup();
                    }}
                  >
                    취소
                  </StyleCancelBtn>
                  <StyleSaveBtn
                    variant="contained"
                    onClick={() => {
                      submitEdit();
                    }}
                  >
                    수정
                  </StyleSaveBtn>
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
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
`;
const DisableWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
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
const StyleDuplicateBtn = styled(Button)`
  && {
    width: 140px;
    height: 30px;
    border-radius: 15px;
    font-size: 14px;
    line-height: normal;
  }
`;
const StyleCancelBtn = styled(Button)`
  && {
    width: 170px;
    height: 50px;
    font-size: 14px;
    line-height: normal;
  }
`;
const StyleSaveBtn = styled(Button)`
  && {
    width: 170px;
    height: 50px;
    font-size: 14px;
    line-height: normal;
  }
`;
