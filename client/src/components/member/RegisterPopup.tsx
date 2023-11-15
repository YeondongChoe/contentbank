import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { register } from '../../recoil/MemberState';
import axios, { AxiosError } from 'axios';
import { getCookie, setCookie } from '../../utils/ReactCookie';
import NoticeAlert from '../alert/NoticeAlert';
import { alertState } from '../../recoil/UtilState';

import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/material/Input';
import Textarea from '@mui/joy/Textarea';

type Authority = {
  seq: number;
  code: string;
  name: string;
  sort: number;
};

const RegisterPopup = () => {
  const [isRegister, SetIsRegister] = useRecoilState(register);
  const [isIdError, setIsIdError] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState('');
  const [idErrorMsg, setIdErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isAuthorityList, setIsAuthorityList] = useState<Authority[]>();
  const [nameValue, setNameValue] = useState('');
  const [idValue, setIdValue] = useState('');
  const [duplicatedId, setduplicatedId] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [selectedAuthorityValue, setSelectedAuthorityValue] = useState('');
  const [commentValue, setCommentValue] = useState('');
  const setIsAlertOpen = useSetRecoilState(alertState);
  const [isRequired, setIsRequired] = useState(false);
  const [isRequiredDuplicate, setIsRequiredDuplicate] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleAuthorityChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedAuthorityValue(event.target.value);
  };

  const Authority = selectedAuthorityValue;
  const Name = nameValue;
  const Id = idValue;
  const Comment = commentValue;

  const closePopup = () => {
    SetIsRegister(false);
  };

  const duplicateCheck = async () => {
    try {
      const response = await axios.post(
        '/auth-service/api/v1/auth/checked-id',
        { id: Id },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        },
      );

      if (response.status === 200) {
        if (response.headers['authorization'] !== getCookie('accessToken')) {
          setCookie('accessToken', response.headers['authorization'], {
            path: '/',
            sameSite: 'strict',
            secure: false,
          });
        }
        setduplicatedId(Id);
        setIsDuplicate(true);
        setIsIdError(false);
        setSuccessMsg(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const responseData = axiosError.response.data as {
            [x: string]: any;
            message: string;
          };
          setIdErrorMsg(responseData.message);
          if (responseData.errors && responseData.errors.id) {
            // 'response.data.errors.id' 경로의 데이터가 있을 때에만 setIdErrorMsg를 호출
            setIdErrorMsg(responseData.errors.id);
          }
        }
      }
      setIsDuplicate(false);
      setIsIdError(true);
    }
  };

  const duplicateSubmit = () => {
    duplicateCheck();
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
      })
      .catch((response) => {
        alert(response.message);
      });
  };

  const onSubmit = async () => {
    await axios
      .post(
        '/auth-service/api/v1/auth/register',
        { id: Id, name: Name, authority: Authority, comment: Comment },
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
        }
        //성공메시지 서버쪽에서 넘겨주면 띄우기
        SetIsRegister(false);
        setIsNameError(false);
        alert('회원 생성 성공');
        //window.location.reload();
      })
      .catch((response) => {
        setIsDuplicate(false);
        setIsRequired(false);
        setIsRequiredDuplicate(false);
        setIsNameError(true);
        setNameErrorMsg(response.response.data.errors.name);
        //console.log(response.response.data.errors.name);
        //alert(response.errors.name);
      });
  };

  const handleOnSubmit = () => {
    if (nameValue === '' || idValue === '' || Authority === '') {
      setIsRequired(true);
      setIsAlertOpen(true);
    } else if (duplicatedId !== idValue || isDuplicate === false) {
      setIsRequiredDuplicate(true);
      setIsAlertOpen(true);
    } else {
      onSubmit();
    }
  };

  useEffect(() => {
    getAuthorityList();
  }, []);

  return (
    <>
      {isRegister && (
        <S.popupOverlay>
          <S.main>
            <S.popupHead>
              <S.popupTitle>회원 아이디 만들기</S.popupTitle>
              <S.cancelIcon onClick={closePopup}>
                <ClearTwoToneIcon />
              </S.cancelIcon>
            </S.popupHead>
            <S.popupBody>
              <Box
                component="form"
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{
                  '& .MuiTextField-root': { m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                {isNameError ? (
                  <FormControl error variant="standard" sx={{ m: 1 }}>
                    <InputLabel htmlFor="component-error">
                      이름(필수)
                    </InputLabel>
                    <Input
                      sx={{ width: '350px' }}
                      id="component-error"
                      placeholder=""
                      defaultValue=""
                      onChange={(e) => {
                        setNameValue(e.target.value);
                      }}
                    />
                    <FormHelperText id="component-error-text">
                      {nameErrorMsg}
                    </FormHelperText>
                  </FormControl>
                ) : (
                  <FormControl variant="standard" sx={{ m: 1 }}>
                    <InputLabel htmlFor="component-simple">
                      이름(필수)
                    </InputLabel>
                    <Input
                      sx={{ width: '350px' }}
                      id="component-simple"
                      placeholder=""
                      defaultValue=""
                      onChange={(e) => {
                        setNameValue(e.target.value);
                      }}
                    />
                  </FormControl>
                )}

                {isIdError ? (
                  <FormControl error variant="standard" sx={{ m: 1 }}>
                    <InputLabel htmlFor="component-error">
                      아이디(필수)
                    </InputLabel>
                    <Input
                      sx={{ width: '350px' }}
                      id="component-error"
                      defaultValue=""
                      placeholder=""
                      onChange={(e) => {
                        setIdValue(e.target.value);
                      }}
                    />
                    <FormHelperText id="component-error-text">
                      {idErrorMsg}
                    </FormHelperText>
                  </FormControl>
                ) : (
                  <FormControl variant="standard" sx={{ m: 1 }}>
                    <InputLabel htmlFor="component-simple">
                      아이디(필수)
                    </InputLabel>
                    <Input
                      sx={{ width: '350px' }}
                      id="component-simple"
                      placeholder=""
                      defaultValue=""
                      onChange={(e) => {
                        setIdValue(e.target.value);
                      }}
                    />
                    {idValue && isDuplicate === true && (
                      <FormHelperText id="component-simple-text">
                        {successMsg}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
                <S.duplicateBtnWrapper
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <StyleDuplicateBtn
                    variant="contained"
                    onClick={duplicateSubmit}
                  >
                    중복확인
                  </StyleDuplicateBtn>
                </S.duplicateBtnWrapper>
              </Box>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '350px' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  value={selectedAuthorityValue}
                  onChange={handleAuthorityChange}
                  id="outlined-select-currency"
                  select
                  label="권한"
                  helperText="(필수)권한을 선택하세요"
                >
                  {isAuthorityList?.map((el, i) => (
                    <MenuItem key={i} value={el.code}>
                      {el.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box sx={{ width: '350px' }}>
                <FormLabel
                  sx={{
                    fontSize: '14px',
                    marginLeft: '5px',
                    marginBottom: '5px',
                  }}
                >
                  비고
                </FormLabel>
                <Textarea
                  sx={{ mb: 1, fontSize: '14px' }}
                  placeholder=""
                  size="md"
                  name="Size"
                  minRows={3}
                  maxRows={3}
                  onChange={(e) => {
                    setCommentValue(e.target.value);
                  }}
                />
              </Box>
              <S.noticeWarpper>
                <S.notice>*초기 비밀번호는 drmath@369입니다.</S.notice>
                <S.notice>*첫 로그인시 비밀번호를 변경할 수 있습니다.</S.notice>
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
                <StyleSaveBtn variant="contained" onClick={handleOnSubmit}>
                  등록
                </StyleSaveBtn>
              </S.finalBtnContainer>
              {isRequired && <NoticeAlert title="필수 항목을 입력해주세요" />}
              {isRequiredDuplicate && (
                <NoticeAlert title="중복확인을 해주세요" />
              )}
              {isComplete && <NoticeAlert title="회원생성 성공" />}
            </S.popupBody>
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
    //justify-content: space-between;
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
  duplicateBtnWrapper: styled.div`
    width: 350px;
    display: flex;
    justify-content: flex-end;
    background-color: transparent;
    border: none;
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
    width: 110px;
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
    border-radius: 0px;
    font-size: 14px;
    line-height: normal;
  }
`;

const StyleSaveBtn = styled(Button)`
  && {
    width: 170px;
    height: 50px;
    border-radius: 0px;
    font-size: 14px;
    line-height: normal;
  }
`;

export default RegisterPopup;
