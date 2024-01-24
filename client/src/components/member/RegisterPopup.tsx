import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';

import Textarea from '@mui/joy/Textarea';
import { Controller, useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { getAuthorityList } from '../../api/getAxios';
import { postRegister, postDuplicate } from '../../api/postAxios';
import { Input, Label } from '../../components';
import { Button } from '../../components/atom';
import { Select } from '../../components/atom/select';
import { Alert } from '../molecules/alert/Alert';

type authorityListProps = {
  seq: number;
  code: string;
  name: string;
  sort: number;
};

type RegisterPopupProps = {
  isRegister: boolean;
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
};

export function RegisterPopup({
  isRegister,
  setIsRegister,
}: RegisterPopupProps) {
  const [didMount, setDidMount] = useState(false);
  const [isIdError, setIsIdError] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [idErrorMessage, setIdErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [authorityList, setAuthorityList] = useState<authorityListProps[]>([]);
  const [duplicatedId, setduplicatedId] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [isRequired, setIsRequired] = useState(false);
  const [isRequiredDuplicate, setIsRequiredDuplicate] = useState(false);

  const { control, watch } = useForm();

  const [authorityCode, setAuthorityCode] = useState<string>();

  const AuthorityList = authorityList.map((el) => {
    return [el.name, el.code];
  });
  const AuthorityOption = AuthorityList.map((item, index) => ({
    id: `${index + 1}`,
    label: item[0],
    code: item[1],
    value: index + 1,
  }));

  const Authority = authorityCode;
  const Name = watch('name');
  const Id = watch('id');
  const Comment = commentValue;

  const closePopup = () => {
    setIsRegister(false);
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
    if (Name === '' || Id === '' || Authority === undefined) {
      setIsRequired(true);
      setIsAlertOpen(true);
    } else if (duplicatedId !== Id || isDuplicate === false) {
      setIsRequiredDuplicate(true);
      setIsAlertOpen(true);
    } else {
      postRegister({
        Id,
        Name,
        Authority,
        Comment,
        setIsRegister,
        setIsNameError,
        setIsDuplicate,
        setIsRequired,
        setIsRequiredDuplicate,
        setNameErrorMessage,
      });
    }
  };

  const loadData = useCallback(() => {
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

  return (
    <>
      {isRegister && (
        <Overlay>
          <Container>
            <TitleWrapper>
              <Title>회원 아이디 만들기</Title>
              <IoMdClose
                onClick={closePopup}
                style={{ fontSize: '20px', cursor: 'pointer' }}
              />
            </TitleWrapper>
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
              {isNameError ? (
                <Label
                  width="350px"
                  type="error"
                  fontSize="16px"
                  value="아이디(필수)"
                />
              ) : (
                <Label width="350px" fontSize="16px" value="아이디(필수)" />
              )}
              <Controller
                control={control}
                name="id"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="띄워쓰기 없이 영문(소문자)과 숫자만 입력"
                    value={field.value}
                    width="350px"
                    height="32px"
                    fontSize="16px"
                    placeholderSize="12px"
                    margin="0px 0px 10px 0px"
                    border="black"
                    onChange={field.onChange}
                    onClick={() => setIsIdError(false)}
                    errorMessage={isIdError && idErrorMessage}
                  />
                )}
              />
              {Id && isDuplicate === true && (
                <IdSuccessMessage>{successMessage}</IdSuccessMessage>
              )}
              <DuplicationButtonWrapper>
                <Button
                  buttonType="button"
                  onClick={checkDuplicate}
                  $padding="10px"
                  height={'30px'}
                  width={'110px'}
                  fontSize="14px"
                  $borderRadius="15px"
                >
                  <span>중복확인</span>
                </Button>
              </DuplicationButtonWrapper>

              <Label width="350px" fontSize="16px" value="권한" />
              <Controller
                control={control}
                name="authority"
                render={({ field }) => (
                  <Select
                    width="350px"
                    height="50px"
                    padding="5px 0px 0px 0px"
                    onSelect={(event, code) => {
                      setAuthorityCode(code);
                    }}
                    options={AuthorityOption}
                  ></Select>
                )}
              />
              <Label
                width="350px"
                fontSize="11px"
                value="(필수)권한을 선택하세요"
              />
              <Label width="350px" fontSize="16px" value="비고" />
              <Textarea
                sx={{ mb: 1, mt: 1, fontSize: '14px', width: '350px' }}
                placeholder=""
                size="md"
                name="Size"
                minRows={3}
                maxRows={3}
                onChange={(e) => {
                  setCommentValue(e.target.value);
                }}
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
                  onClick={submitRegister}
                  $padding="10px"
                  height={'50px'}
                  width={'170px'}
                  fontSize="14px"
                >
                  <span>등록</span>
                </Button>
              </ButtonGroup>
              {isRequired && (
                <Alert
                  isAlertOpen={isAlertOpen}
                  notice
                  title="필수 항목을 입력해주세요"
                />
              )}
              {isRequiredDuplicate && (
                <Alert
                  isAlertOpen={isAlertOpen}
                  notice
                  title="중복확인을 해주세요"
                />
              )}
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
  background-color: rgba(0, 0, 0, 0.5);
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
  border-radius: 5px;
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
const IdSuccessMessage = styled.p`
  color: rgba(0, 0, 0, 0.6);
  font-size: 12px;
`;
const DuplicationButtonWrapper = styled.div`
  min-width: 350px;
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
