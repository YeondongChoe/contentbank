import {
  questionInstance,
  authInstance,
  handleAuthorizationRenewal,
} from './axios';

/** 콘텐츠 파트 */

type putChangeServicedProps = {
  formattedArray: { contentSeq: number }[];
  setIsChangedServiced: (result: boolean) => void;
};

/** 문항 활성화/비활성화 API */
export const putChangeServiced = async ({
  formattedArray,
  setIsChangedServiced,
}: putChangeServicedProps) => {
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

type MemberProps = {
  id: null;
  name: null;
  key: null;
  authority: null;
  comment: null;
  enabled: null;
  authCode: null;
};

type putSaveNameProps = {
  member: MemberProps;
  nameValue: string;
  isNameEdit: boolean;
  setIsNameEdit: (result: boolean) => void;
  setIsError: (result: boolean) => void;
  setIsAlertOpen: (result: boolean) => void;
  setNameValue: (result: string) => void;
  setErrorMessage: (result: string) => void;
};

/** 이름 변경 API */
export const putSaveName = async ({
  member,
  nameValue,
  isNameEdit,
  setIsNameEdit,
  setIsError,
  setIsAlertOpen,
  setNameValue,
  setErrorMessage,
}: putSaveNameProps) => {
  const data = {
    authority: member.authority,
    name: nameValue,
    comment: member.comment,
    enabled: member.enabled,
  };
  await authInstance
    .put(`/auth/${member.key}`, data)
    .then((response) => {
      handleAuthorizationRenewal(response);
      setIsNameEdit(!isNameEdit);
      setIsError(false);
      setIsAlertOpen(true);
      setNameValue('');
    })
    .catch((error) => {
      setErrorMessage('수정할 이름을 확인해주세요');
      setIsError(true);
      setIsAlertOpen(true);
    });
};

type putChangePasswordProps = {
  Password: string;
  PasswordConfirm: string;
  navigate: (result: string) => void;
};

/** 비밀번호 변경 API */
export const putChangePassword = async ({
  Password,
  PasswordConfirm,
  navigate,
}: putChangePasswordProps) => {
  const data = {
    password: Password,
    confirmPassword: PasswordConfirm,
  };
  await authInstance
    .put('/auth/changed-password', data)
    .then((response) => {
      handleAuthorizationRenewal(response);
      navigate('/relogin');
    })
    .catch(() => {
      alert('비밀번호 재확인을 입력해주세요.');
    });
};

type putInitPasswordProps = {
  keyValue: string;
  setIsInit: (result: boolean) => void;
};

/** 비밀번호 초기화 API */
export const putInitPassword = async ({
  keyValue,
  setIsInit,
}: putInitPasswordProps) => {
  await authInstance
    .put(`/auth/${keyValue}/init-password`, {})
    .then((response) => {
      handleAuthorizationRenewal(response);
      setIsInit(true);
    })
    .catch((error) => {
      alert(error);
    });
};

type putDisableMemberProps = {
  selectedRows: string[];
  setIsEnabled: (result: boolean) => void;
};

/** 회원 비활성화 API */
export const putDisableMember = async ({
  selectedRows,
  setIsEnabled,
}: putDisableMemberProps) => {
  const updatedRows = selectedRows.map((selectedId: any) => {
    return { id: selectedId, enabled: false };
  });
  await authInstance
    .put('/auth/enabled', updatedRows)
    .then((response) => {
      handleAuthorizationRenewal(response);
      setIsEnabled(false);
      window.location.reload();
    })
    .catch((error) => {
      alert(error);
    });
};

type putChangeMemberInformationProps = {
  Authority: string | undefined;
  member: MemberProps;
  Name: string;
  Comment: string;
  CheckBox: boolean | null;
  keyValue: string;
  SetIsEditer: (result: boolean) => void;
  setIsNameError: (result: boolean) => void;
  setNameErrorMessage: (result: string) => void;
};

/** 회원 정보변경 API */
export const putChangeMemberInformation = async ({
  Authority,
  member,
  Name,
  Comment,
  CheckBox,
  keyValue,
  SetIsEditer,
  setIsNameError,
  setNameErrorMessage,
}: putChangeMemberInformationProps) => {
  const data = {
    authority: Authority || member.authCode, //code
    name: Name,
    comment: Comment,
    enabled: CheckBox,
  };
  await authInstance
    .put(`/auth/${keyValue}`, data)
    .then((response) => {
      handleAuthorizationRenewal(response);
      //성공메시지 서버쪽에서 넘겨주면 띄우기
      SetIsEditer(false);
      setIsNameError(false);
      window.location.reload();
    })
    .catch((response) => {
      setIsNameError(true);
      setNameErrorMessage(response.response.data.errors.name);
    });
};

/** 권한 파트 */
