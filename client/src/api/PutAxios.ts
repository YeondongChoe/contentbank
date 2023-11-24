import React from 'react';
import {
  questionInstance,
  AuthInstance,
  handleAuthorizationRenewal,
} from './Axios';

/** 콘텐츠 파트 */

interface putChangeServiced {
  formattedArray: { contentSeq: number }[];
  setIsChangedServiced: (result: boolean) => void;
}

/** 문항 활성화/비활성화 API */
export const changeServiced = async ({
  formattedArray,
  setIsChangedServiced,
}: putChangeServiced) => {
  await questionInstance
    .put(`/questions/change-serviced`, { changeServiceds: formattedArray })
    .then((response) => {
      handleAuthorizationRenewal(response);
      setIsChangedServiced(true);
    })
    .catch((error) => {
      alert(error);
    });
};

/** 회원 파트 */

interface Member {
  id: null;
  name: null;
  key: null;
  authority: null;
  comment: null;
  enabled: null;
  authCode: null;
}

interface putNameSave {
  member: Member;
  nameValue: string;
  isNameEdit: boolean;
  setIsNameEdit: (result: boolean) => void;
  setIsError: (result: boolean) => void;
  setIsAlertOpen: (result: boolean) => void;
  setNameValue: (result: string) => void;
  setErrorMsg: (result: string) => void;
}

/** 이름 변경 API */
export const putNameSave = async ({
  member,
  nameValue,
  isNameEdit,
  setIsNameEdit,
  setIsError,
  setIsAlertOpen,
  setNameValue,
  setErrorMsg,
}: putNameSave) => {
  const data = {
    authority: member.authority,
    name: nameValue,
    comment: member.comment,
    enabled: member.enabled,
  };
  await AuthInstance.put(`/auth/${member.key}`, data)
    .then((response) => {
      handleAuthorizationRenewal(response);
      setIsNameEdit(!isNameEdit);
      setIsError(false);
      setIsAlertOpen(true);
      setNameValue('');
    })
    .catch((error) => {
      setErrorMsg('수정할 이름을 확인해주세요');
      setIsError(true);
      setIsAlertOpen(true);
    });
};

interface putChangePassword {
  Password: string;
  PasswordConfirm: string;
  navigate: (result: string) => void;
}

/** 비밀번호 변경 API */
export const putChangePassword = async ({
  Password,
  PasswordConfirm,
  navigate,
}: putChangePassword) => {
  const data = {
    password: Password,
    confirmPassword: PasswordConfirm,
  };
  await AuthInstance.put('/auth/changed-password', data)
    .then((response) => {
      handleAuthorizationRenewal(response);
      navigate('/relogin');
    })
    .catch(() => {
      alert('비밀번호 재확인을 입력해주세요.');
    });
};

interface putInitPassword {
  keyValue: string;
  setIsInit: (result: boolean) => void;
}

/** 비밀번호 초기화 API */
export const putInitPassword = async ({
  keyValue,
  setIsInit,
}: putInitPassword) => {
  await AuthInstance.put(`/auth/${keyValue}/init-password`, {})
    .then((response) => {
      handleAuthorizationRenewal(response);
      setIsInit(true);
    })
    .catch((error) => {
      alert(error);
    });
};

interface memberDisabled {
  selectedRows: string[];
  setIsEnabled: (result: boolean) => void;
}

/** 회원 비활성화 API */
export const memberDisabled = async ({
  selectedRows,
  setIsEnabled,
}: memberDisabled) => {
  const updatedRows = selectedRows.map((selectedId: any) => {
    return { id: selectedId, enabled: false };
  });
  await AuthInstance.put('/auth/enabled', updatedRows)
    .then((response) => {
      handleAuthorizationRenewal(response);
      setIsEnabled(false);
      window.location.reload();
    })
    .catch((error) => {
      alert(error);
    });
};

interface putChangeMemberInfo {
  Authority: string;
  member: Member;
  Name: string;
  Comment: string;
  CheckBox: boolean | null;
  keyValue: string;
  SetIsEditer: (result: boolean) => void;
  setIsNameError: (result: boolean) => void;
  setNameErrorMsg: (result: string) => void;
}

/** 회원 정보변경 API */
export const putChangeMemberInfo = async ({
  Authority,
  member,
  Name,
  Comment,
  CheckBox,
  keyValue,
  SetIsEditer,
  setIsNameError,
  setNameErrorMsg,
}: putChangeMemberInfo) => {
  const data = {
    authority: Authority || member.authCode, //code
    name: Name,
    comment: Comment,
    enabled: CheckBox,
  };
  await AuthInstance.put(`/auth/${keyValue}`, data)
    .then((response) => {
      handleAuthorizationRenewal(response);
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

/** 권한 파트 */
