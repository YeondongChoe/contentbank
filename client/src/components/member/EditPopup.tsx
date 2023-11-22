import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { editer, memberKeyValue } from '../../recoil/MemberState';
import axios from 'axios';
import { getCookie, setCookie } from '../../utils/ReactCookie';
import NoticeAlert from '../alert/NoticeAlert';
import { alertState } from '../../recoil/UtilState';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

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

type Authority = {
  seq: number;
  code: string;
  name: string;
  sort: number;
};

const EditPopup = () => {
  const keyValue = useRecoilValue(memberKeyValue);
  const [isEditer, SetIsEditer] = useRecoilState(editer);
  const [isNameError, setIsNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState('');
  const [isAuthorityList, setIsAuthorityList] = useState<Authority[]>();
  const [nameValue, setNameValue] = useState('');
  const [idValue, setIdValue] = useState('');
  const [authorityValue, setAuthorityValue] = useState('');
  const [authorityDefaultValue, setAuthorityDefaultValue] = useState('');
  const [authorityCode, setAuthorityCode] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);
  const [commentValue, setCommentValue] = useState('');
  const [selectedAuthorityValue, setSelectedAuthorityValue] = useState<
    string[]
  >([]);
  const setIsAlertOpen = useSetRecoilState(alertState);
  const [isInit, setIsInit] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const handleAuthorityChange = (
    event: SelectChangeEvent<typeof selectedAuthorityValue>,
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedAuthorityValue(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const Authority = authorityCode;
  const Name = watch('name');
  const Comment = watch('comment');
  const CheckBox = isEnabled;

  const closePopup = () => {
    SetIsEditer(false);
  };

  const getMemberInfo = async () => {
    await axios
      .get(`/auth-service/api/v1/auth/${keyValue}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.headers['authorization'] !== getCookie('accessToken')) {
            setCookie('accessToken', response.headers['authorization'], {
              path: '/',
              sameSite: 'strict',
              secure: false,
            });
          }
          setNameValue(response.data.data.name);
          setIdValue(response.data.data.id);
          setCommentValue(response.data.data.comment);
          setAuthorityValue(response.data.data.authority.name);
          setAuthorityDefaultValue(response.data.data.authority.code);
          setIsEnabled(response.data.data.enabled);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const initPassword = async () => {
    await axios
      .put(
        `/auth-service/api/v1/auth/${keyValue}/init-password`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        },
      )
      .then((response) => {
        if (response.status === 200) {
          if (response.headers['authorization'] !== getCookie('accessToken')) {
            setCookie('accessToken', response.headers['authorization'], {
              path: '/',
              sameSite: 'strict',
              secure: false,
            });
          }
          setIsInit(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const initPasswordSubmit = () => {
    setIsAlertOpen(true);
    initPassword();
  };

  const getAuthorityList = async () => {
    await axios
      .get('/auth-service/api/v1/authority', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.headers['authorization'] !== getCookie('accessToken')) {
            setCookie('accessToken', response.headers['authorization'], {
              path: '/',
              sameSite: 'strict',
              secure: false,
            });
          }
        }
        setIsAuthorityList(response.data.data);
      });
  };

  const onSubmit = async () => {
    const data = {
      authority: Authority || authorityDefaultValue,
      name: Name,
      comment: Comment,
      enabled: CheckBox,
    };
    await axios
      .put(`/auth-service/api/v1/auth/${keyValue}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.headers['authorization'] !== getCookie('accessToken')) {
            setCookie('accessToken', response.headers['authorization'], {
              path: '/',
              sameSite: 'strict',
              secure: false,
            });
          }
        }
        //성공메시지 서버쪽에서 넘겨주면 띄우기
        SetIsEditer(false);
        setIsNameError(false);
        window.location.reload();
      })
      .catch((response) => {
        setIsNameError(true);
        setNameErrorMsg(response.response.data.errors.name);
      });
  };

  useEffect(() => {
    getMemberInfo();
    getAuthorityList();
  }, []);

  useEffect(() => {
    if (nameValue) {
      setValue('name', nameValue);
    }
    if (idValue) {
      setValue('id', idValue);
    }
    if (authorityValue) {
      setValue('authority', authorityValue);
    }
    if (commentValue) {
      setValue('comment', commentValue);
    }
  }, [nameValue, idValue, authorityValue, commentValue, setValue]);

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
                              {nameErrorMsg}
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
                      onClick={initPasswordSubmit}
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
                        <CheckBoxOutlineBlankIcon
                          onClick={() => setIsEnabled(!isEnabled)}
                        />
                        <span>비활성화</span>
                      </S.checkBox>
                    ) : (
                      <S.checkBox>
                        <IndeterminateCheckBoxIcon
                          onClick={() => setIsEnabled(!isEnabled)}
                        />
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
                        value={selectedAuthorityValue || authorityValue}
                        onChange={handleAuthorityChange}
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return <em>{authorityValue}</em>;
                          }
                          return selected
                            .map((value) => {
                              const selectedAuthority = isAuthorityList?.find(
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
                        {isAuthorityList?.map((el, i) => (
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
                      onSubmit();
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

export default EditPopup;
