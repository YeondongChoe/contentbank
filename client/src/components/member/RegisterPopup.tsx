import * as React from 'react';
import { useState, useEffect } from 'react';

import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { getAuthorityList } from '../../api/getAxios';
import { postRegister, postDuplicate } from '../../api/postAxios';
import { registerBoolAtom } from '../../state/memberAtom';
import { alertBoolAtom } from '../../state/utilAtom';
import { NoticeAlert } from '../molecules/alert/NoticeAlert';

type authorityListProps = {
  seq: number;
  code: string;
  name: string;
  sort: number;
};

export function RegisterPopup() {
  const [isRegister, SetIsRegister] = useRecoilState(registerBoolAtom);
  const [isIdError, setIsIdError] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [idErrorMessage, setIdErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [authorityList, setAuthorityList] = useState<authorityListProps[]>([]);
  const [nameValue, setNameValue] = useState('');
  const [idValue, setIdValue] = useState('');
  const [duplicatedId, setduplicatedId] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [selectedAuthorityValue, setSelectedAuthorityValue] = useState('');
  const [commentValue, setCommentValue] = useState('');
  const setIsAlertOpen = useSetRecoilState(alertBoolAtom);
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

  const checkDuplicate = () => {
    postDuplicate({
      Id,
      setduplicatedId,
      setIsDuplicate,
      setIsIdError,
      setSuccessMessage,
      setIdErrorMessage,
    });
  };

  const submitRegister = () => {
    if (nameValue === '' || idValue === '' || Authority === '') {
      setIsRequired(true);
      setIsAlertOpen(true);
    } else if (duplicatedId !== idValue || isDuplicate === false) {
      setIsRequiredDuplicate(true);
      setIsAlertOpen(true);
    } else {
      postRegister({
        Id,
        Name,
        Authority,
        Comment,
        SetIsRegister,
        setIsNameError,
        setIsDuplicate,
        setIsRequired,
        setIsRequiredDuplicate,
        setNameErrorMessage,
      });
    }
  };

  useEffect(() => {
    getAuthorityList({
      setAuthorityList,
    });
  }, []);

  return (
    <>
      {isRegister && (
        <Overlay>
          <Container>
            <TitleWrapper>
              <Title>회원 아이디 만들기</Title>
              <ClearTwoToneIcon
                onClick={closePopup}
                sx={{ cursor: 'pointer' }}
              />
            </TitleWrapper>
            <ContentBox>
              <Box
                component="form"
                display="flex"
                flexDirection="column"
                autoComplete="off"
              >
                {isNameError ? (
                  <FormControl error variant="standard" sx={{ mb: 1 }}>
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
                      {nameErrorMessage}
                    </FormHelperText>
                  </FormControl>
                ) : (
                  <FormControl variant="standard" sx={{ mb: 1 }}>
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
                  <FormControl error variant="standard" sx={{ mb: 1 }}>
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
                      {idErrorMessage}
                    </FormHelperText>
                  </FormControl>
                ) : (
                  <FormControl variant="standard" sx={{ mb: 1 }}>
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
                        {successMessage}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
                <DuplicationButtonWrapper
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <StyleDuplicateBtn
                    variant="contained"
                    onClick={checkDuplicate}
                  >
                    중복확인
                  </StyleDuplicateBtn>
                </DuplicationButtonWrapper>
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
                  {authorityList?.map((el, i) => (
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
                <StyleSaveBtn variant="contained" onClick={submitRegister}>
                  등록
                </StyleSaveBtn>
              </ButtonGroup>
              {isRequired && <NoticeAlert title="필수 항목을 입력해주세요" />}
              {isRequiredDuplicate && (
                <NoticeAlert title="중복확인을 해주세요" />
              )}
              {isComplete && <NoticeAlert title="회원생성 성공" />}
            </ContentBox>
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
const DuplicationButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
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
