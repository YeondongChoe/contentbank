import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';

import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { getAuthorityList } from '../../api/getAxios';
import { postRegister, postDuplicate } from '../../api/postAxios';
import { Input, Label } from '../../components';
import { Button } from '../../components/atom';
import { Select } from '../../components/atom/select';
import { COLOR } from '../../components/constants';
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
  setIsSuccessAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function RegisterPopup({
  isRegister,
  setIsRegister,
  setIsSuccessAlertOpen,
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

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

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
        setIsSuccessAlertOpen,
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
            </TitleWrapper>
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
                    <>
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
                    </>
                  )}
                />
              </InputWrapper>
              <InputWrapper>
                {isNameError ? (
                  <Label
                    width="130px"
                    type="error"
                    fontSize="15px"
                    value="* 아이디"
                  />
                ) : (
                  <Label width="130px" fontSize="15px" value="* 아이디" />
                )}
                <InputBox>
                  <Controller
                    control={control}
                    name="id"
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        type="text"
                        placeholder="띄워쓰기 없이 영문(소문자)과 숫자만 입력"
                        value={field.value}
                        width="330px"
                        height="38px"
                        fontSize="16px"
                        placeholderSize="12px"
                        margin="0px 0px 10px 0px"
                        border="black"
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
                </InputBox>

                <DuplicationButtonWrapper>
                  <Button
                    buttonType="button"
                    onClick={checkDuplicate}
                    $padding="10px"
                    height={'38px'}
                    width={'110px'}
                    fontSize="15px"
                    $borderRadius="7px"
                    $filled
                  >
                    <span>중복확인</span>
                  </Button>
                </DuplicationButtonWrapper>
              </InputWrapper>
              <InputWrapper>
                <Label width="130px" fontSize="15px" value="* 권한" />
                <Controller
                  control={control}
                  name="authority"
                  render={({ field }) => (
                    <Select
                      width="450px"
                      height="50px"
                      padding="5px 0px 0px 0px"
                      defaultValue={'권한을 선택하세요'}
                      onSelect={(event, code) => {
                        setAuthorityCode(code);
                      }}
                      options={AuthorityOption}
                    ></Select>
                  )}
                />
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
                  width={'120px'}
                  fontSize="16px"
                  $border
                >
                  <span>취소</span>
                </Button>
                <Button
                  buttonType="button"
                  onClick={submitRegister}
                  $padding="10px"
                  height={'40px'}
                  width={'120px'}
                  fontSize="16px"
                  $filled
                >
                  <span>등록</span>
                </Button>
              </ButtonGroup>
              {isRequired && (
                <Alert
                  isAlertOpen={isAlertOpen}
                  notice
                  description="필수 항목을 입력해주세요"
                  onClose={closeAlert}
                />
              )}
              {isRequiredDuplicate && (
                <Alert
                  isAlertOpen={isAlertOpen}
                  notice
                  description="중복확인을 해주세요"
                  onClose={closeAlert}
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
  //background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;
const Container = styled.div`
  min-width: 700px;
  height: 650px;
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
  display: flex;
  justify-content: center;
  width: 680px;
  padding-bottom: 20px;
`;
const InputBox = styled.div``;
const IdSuccessMessage = styled.p`
  color: ${COLOR.SUCCESS};
  font-size: 12px;
`;
const DuplicationButtonWrapper = styled.div`
  display: flex;
  padding-left: 10px;
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
