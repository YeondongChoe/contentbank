import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';

import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { Input, Label, AlertBar } from '../..';
import { getAuthorityList } from '../../../api/getAxios';
import { postRegister, postDuplicate } from '../../../api/postAxios';
import { useModal } from '../../../hooks';
import { Button } from '../../atom';
import { Select } from '../../atom/select';
import { COLOR } from '../../constants';
import { Alert } from '../../molecules/alert/Alert';

type authorityListProps = {
  seq: number;
  code: string;
  name: string;
  sort: number;
};

type RegisterModalProps = {
  isRegister: boolean;
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSuccessAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function RegisterModal() {
  const { closeModal } = useModal();

  const [didMount, setDidMount] = useState(false);
  const [isIdError, setIsIdError] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [isAuthorityError, setIsAuthorityError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [idErrorMessage, setIdErrorMessage] = useState('');
  const [AuthorityErrorMessage, setAuthorityErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [authorityList, setAuthorityList] = useState<authorityListProps[]>([]);
  const [duplicatedId, setduplicatedId] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [commentValue, setCommentValue] = useState('');

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
    // setIsRegister(false);
    closeModal();
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
    if (Name === '') {
      setIsNameError(true);
      setNameErrorMessage('필수 항목을 입력해주세요');
    }
    if (Id === '') {
      setIsIdError(true);
      setIdErrorMessage('필수 항목을 입력해주세요');
    }
    if (Authority === undefined) {
      setIsAuthorityError(true);
      setAuthorityErrorMessage('필수 항목을 입력해주세요');
    } else if (duplicatedId !== Id || isDuplicate === false) {
      setIsIdError(true);
      setIdErrorMessage('중복확인을 해주세요');
    } else {
      // postRegister({
      //   Id,
      //   Name,
      //   Authority,
      //   Comment,
      //   setIsRegister,
      //   setIsNameError,
      //   setIsDuplicate,
      //   setIsRequired,
      //   setIsRequiredDuplicate,
      //   setNameErrorMessage,
      //   setIsSuccessAlertOpen,
      // });
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

  useEffect(() => {
    if (Id === '') {
      setIsDuplicate(false);
    }
  }, [Id]);

  return (
    <Container>
      <TitleWrapper>
        <Title>회원 아이디 만들기</Title>
      </TitleWrapper>
      <ContentBox>
        <InputWrapper>
          {isNameError ? (
            <Label width="130px" type="error" fontSize="15px" value="* 이름" />
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
              disabled={!Id}
            >
              <span>중복확인</span>
            </Button>
          </DuplicationButtonWrapper>
        </InputWrapper>
        <SelectWrapper>
          <SelectBox>
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
                <Select
                  width="450px"
                  height="50px"
                  padding="5px 0px 10px 0px"
                  defaultValue={'권한을 선택하세요'}
                  onSelect={(event, code) => {
                    setAuthorityCode(code);
                  }}
                  onClick={() => setIsAuthorityError(false)}
                  options={AuthorityOption}
                ></Select>
              )}
            />
          </SelectBox>
          {isAuthorityError && (
            <ErrorMessage>{AuthorityErrorMessage}</ErrorMessage>
          )}
        </SelectWrapper>

        <TextareaWrapper>
          <Label width="130px" fontSize="15px" value="비고" />
          <Textarea
            onChange={(e) => {
              setCommentValue(e.target.value);
            }}
          ></Textarea>
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
            로그인 후 비밀번호를 변경하고 다시 로그인 하면 사용 할 수 있습니다.
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
    </Container>
  );
}

const Container = styled.div`
  max-width: 700px;
  padding: 30px;
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
  height: 84px;
`;
const InputBox = styled.div``;
const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;
const SelectBox = styled.div`
  display: flex;
`;
const IdSuccessMessage = styled.p`
  color: ${COLOR.SUCCESS};
  font-size: 12px;
`;
const ErrorMessage = styled.p`
  color: ${COLOR.ERROR};
  padding-left: 130px;
  font-size: 12px;
`;
const DuplicationButtonWrapper = styled.div`
  display: flex;
  padding-left: 10px;
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
  width: 100%;
  gap: 10px;
`;
