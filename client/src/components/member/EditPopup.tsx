import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { editerBoolAtom, memberKeyValueAtom } from '../../state/memberAtom';
import { NoticeAlert } from '../alert/NoticeAlert';
import { alertBoolAtom } from '../../state/utilAtom';
import { Controller, useForm } from 'react-hook-form';
import {
  getIndividualMemberInformation,
  getAuthorityList,
} from '../../api/getAxios';
import {
  putChangeMemberInformation,
  putInitPassword,
} from '../../api/putAxios';

import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/material/Input';
import Textarea from '@mui/joy/Textarea';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

type authorityProps = {
  seq: number;
  code: string;
  name: string;
  sort: number;
};

const EditPopup = () => {
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
        <S.popupOverlay>
          <S.main>
            <S.popupHead>
              <S.popupTitle>회원 정보 상세보기</S.popupTitle>
              <S.cancelIcon onClick={closePopup}>
                <ClearTwoToneIcon />
              </S.cancelIcon>
            </S.popupHead>
            <form>
              <S.popupBody>
                <Box
                  className="sss"
                  component="form"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  noValidate
                  autoComplete="off"
                >
                  {isNameError ? (
                    <FormControl error variant="standard">
                      <InputLabel
                        htmlFor="component-error"
                        id="component-error"
                        sx={{
                          display: 'flex',
                          alignSelf: 'flex-start',
                        }}
                      >
                        이름(필수)
                      </InputLabel>
                      <Controller
                        control={control}
                        name="name"
                        defaultValue=""
                        render={({ field }) => (
                          <>
                            <Input
                              sx={{ width: '350px', marginBottom: '10px' }}
                              type="text"
                              placeholder="이름을 입력해주세요."
                              onChange={field.onChange}
                              value={field.value}
                            />
                            <FormHelperText id="component-error-text">
                              {nameErrorMessage}
                            </FormHelperText>
                          </>
                        )}
                      />
                    </FormControl>
                  ) : (
                    <>
                      <InputLabel
                        htmlFor="component-simple"
                        sx={{
                          display: 'flex',
                          alignSelf: 'flex-start',
                        }}
                      >
                        이름
                      </InputLabel>
                      <Controller
                        control={control}
                        name="name"
                        defaultValue=""
                        render={({ field }) => (
                          <Input
                            sx={{ width: '350px', marginBottom: '10px' }}
                            type="text"
                            placeholder="이름을 입력해주세요."
                            onChange={field.onChange}
                            value={field.value}
                          />
                        )}
                      />
                    </>
                  )}
                  <InputLabel
                    htmlFor="component-simple"
                    sx={{
                      display: 'flex',
                      alignSelf: 'flex-start',
                    }}
                  >
                    아이디
                  </InputLabel>
                  <Controller
                    control={control}
                    name="id"
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        sx={{ width: '350px', marginBottom: '10px' }}
                        disabled
                        type="text"
                        placeholder="이름을 입력해주세요."
                        onChange={field.onChange}
                        value={field.value}
                      />
                    )}
                  />
                  <S.initBtnWrapper
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
                  </S.initBtnWrapper>
                </Box>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '350px' },
                  }}
                  noValidate
                  autoComplete="off"
                  display="flex"
                  flexDirection="column"
                >
                  <S.disableBoxWarpper>
                    <InputLabel htmlFor="component-simple">권한</InputLabel>
                    {isEnabled ? (
                      <S.checkBox>
                        <CheckBoxOutlineBlankIcon onClick={checkEnabled} />
                        <span>비활성화</span>
                      </S.checkBox>
                    ) : (
                      <S.checkBox>
                        <IndeterminateCheckBoxIcon onClick={checkEnabled} />
                        <span>비활성화</span>
                      </S.checkBox>
                    )}
                  </S.disableBoxWarpper>
                  <Controller
                    control={control}
                    name="authority"
                    render={({ field }) => (
                      <Select
                        sx={{ m: 1, width: '350px' }}
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
                <Box sx={{ width: '350px' }}>
                  <InputLabel
                    htmlFor="component-simple"
                    sx={{
                      display: 'flex',
                      alignSelf: 'flex-start',
                      marginBottom: '10px',
                    }}
                  >
                    비고
                  </InputLabel>
                  <Controller
                    control={control}
                    name="comment"
                    defaultValue=""
                    render={({ field }) => (
                      <Textarea
                        sx={{ mb: 1, fontSize: '14px' }}
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
                <S.noticeWarpper>
                  <S.notice>*초기 비밀번호는 drmath@369입니다.</S.notice>
                  <S.notice>
                    *첫 로그인시 비밀번호를 변경할 수 있습니다.
                  </S.notice>
                </S.noticeWarpper>
                <S.finalBtnContainer>
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
                </S.finalBtnContainer>
                {isInit && (
                  <NoticeAlert title="비밀번호가 초기화 되었습니다." />
                )}
              </S.popupBody>
            </form>
          </S.main>
        </S.popupOverlay>
      )}
    </>
  );
};

const S = {
  popupOverlay: styled.div`
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
  `,
  main: styled.div`
    width: 550px;
    height: 650px;
    border: 1px solid gray;
    background-color: white;
  `,
  popupHead: styled.div`
    width: 100%;
    height: 50px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    padding: 10px;
  `,
  popupTitle: styled.div`
    width: 100%;
    font-size: 22px;
    display: flex;
    justify-content: center;
    margin-right: -30px;
  `,
  cancelIcon: styled.div`
    cursor: pointer;
    margin-right: 10px;
    display: flex;
  `,
  popupBody: styled.div`
    width: 100%;
    height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin-top: -20px;
  `,
  initBtnWrapper: styled.div`
    width: 350px;
    display: flex;
    justify-content: flex-end;
    background-color: transparent;
    border: none;
    margin-bottom: 10px;
  `,
  disableBoxWarpper: styled.div`
    width: 350px;
    display: flex;
    justify-content: space-between;
    margin-left: 10px;
  `,
  checkBox: styled.div`
    display: flex;
    align-items: center;
  `,

  noticeWarpper: styled.div`
    width: 350px;
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 10px;
  `,
  notice: styled.p`
    font-size: 12px;
  `,
  finalBtnContainer: styled.div`
    margin-top: 30px;
    display: flex;
    gap: 10px;
  `,
};

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
export { EditPopup };
