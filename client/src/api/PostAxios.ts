import React from 'react';
import { AxiosError } from 'axios';
import { getCookie, setCookie, removeCookie } from '../utils/ReactCookie';
import {
  questionInstance,
  AuthInstance,
  handleAuthorizationRenewal,
} from './Axios';

/** 문항 파트 */

interface postFavoriteQuestion {
  isFavorited: boolean;
  setIsFavorited: (result: boolean) => void;
}

/** 즐겨찾기 API */
export const postFavoriteQuestion = async (
  { isFavorited, setIsFavorited }: postFavoriteQuestion,
  questionSeq: number,
) => {
  await questionInstance
    .post(`/questions/${questionSeq}/favorite`)
    .then((response) => {
      handleAuthorizationRenewal(response);
      setIsFavorited(!isFavorited);
    })
    .catch((err) => {
      alert(err);
    });
};

/** 회원 파트 */

interface PostData {
  id: string;
  password: string;
}

interface postLogin {
  isClicked: boolean;
  Id: string;
  navigate: (result: string) => void;
  openAlert: () => void;
  setErrorMsg: (result: string) => void;
}

/** 로그인 API */
export const postLogin = async (
  { navigate, isClicked, Id, setErrorMsg, openAlert }: postLogin,
  data: PostData,
) => {
  await AuthInstance.post('/auth/login', data)
    .then((response) => {
      if (response.status === 200) {
        setCookie('accessToken', response.data.access_token, {
          path: '/',
          sameSite: 'strict',
          secure: false,
        });
        if (response.data.initPassword === true) {
          navigate('/firstlogin');
        } else {
          navigate('/contentlist');
        }
      }
      if (isClicked === true) {
        setCookie('userId', Id, { path: '/' });
      } else {
        removeCookie('userId', { path: '/' });
      }
    })
    .catch((error) => {
      setErrorMsg(error.response.data.message);
      openAlert();
    });
};

interface postRegister {
  Id: string;
  Name: string;
  Authority: string;
  Comment: string;
  SetIsRegister: (result: boolean) => void;
  setIsNameError: (result: boolean) => void;
  setIsDuplicate: (result: boolean) => void;
  setIsRequired: (result: boolean) => void;
  setIsRequiredDuplicate: (result: boolean) => void;
  setNameErrorMsg: (result: string) => void;
}

/** 회원등록 API */
export const postRegister = async ({
  Id,
  Name,
  Authority,
  Comment,
  SetIsRegister,
  setIsNameError,
  setIsDuplicate,
  setIsRequired,
  setIsRequiredDuplicate,
  setNameErrorMsg,
}: postRegister) => {
  await AuthInstance.post('/auth/register', {
    id: Id,
    name: Name,
    authority: Authority,
    comment: Comment,
  })
    .then((response) => {
      handleAuthorizationRenewal(response);
      //성공메시지 서버쪽에서 넘겨주면 띄우기
      SetIsRegister(false);
      setIsNameError(false);
      alert('회원 생성 성공');
    })
    .catch((response) => {
      setIsDuplicate(false);
      setIsRequired(false);
      setIsRequiredDuplicate(false);
      setIsNameError(true);
      setNameErrorMsg(response.response.data.errors.name);
    });
};

interface duplicateCheck {
  Id: string;
  setduplicatedId: (result: string) => void;
  setIsIdError: (result: boolean) => void;
  setIsDuplicate: (result: boolean) => void;
  setSuccessMsg: (result: string) => void;
  setIdErrorMsg: (result: string) => void;
}

/** 회원 아이디 중복체크 API */
export const duplicateCheck = async ({
  Id,
  setduplicatedId,
  setIsDuplicate,
  setIsIdError,
  setSuccessMsg,
  setIdErrorMsg,
}: duplicateCheck) => {
  await AuthInstance.post('/auth/checked-id', { id: Id })
    .then((response) => {
      if (response.status === 200) {
        handleAuthorizationRenewal(response);
        setduplicatedId(Id);
        setIsDuplicate(true);
        setIsIdError(false);
        setSuccessMsg(response.data.message);
      }
    })
    .catch((error) => {
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
    });
};

/** 권한 파트 */

interface postCreateAuthority {
  inputValue: string;
  isEditCreateChecked: boolean;
  isManageCreateChecked: boolean;
  isEditCreateListChecked: boolean;
  isManageCreateListChecked: boolean;
  isEditWorksheetChecked: boolean;
  isManageWorksheetChecked: boolean;
  isEditManagementChecked: boolean;
  isManageManagementChecked: boolean;
  isEditManagementListChecked: boolean;
  isManageManagementListChecked: boolean;
  isEditTreeChecked: boolean;
  isManageTreeChecked: boolean;
  isEditOperationChecked: boolean;
  isManageOperationChecked: boolean;
  isEditMemberChecked: boolean;
  isManageMemberChecked: boolean;
  isEditAuthorityChecked: boolean;
  isManageAuthorityChecked: boolean;
}

/** 권한생성 API */
export const postCreateAuthority = async ({
  inputValue,
  isEditCreateChecked,
  isManageCreateChecked,
  isEditCreateListChecked,
  isManageCreateListChecked,
  isEditWorksheetChecked,
  isManageWorksheetChecked,
  isEditManagementChecked,
  isManageManagementChecked,
  isEditManagementListChecked,
  isManageManagementListChecked,
  isEditTreeChecked,
  isManageTreeChecked,
  isEditOperationChecked,
  isManageOperationChecked,
  isEditMemberChecked,
  isManageMemberChecked,
  isEditAuthorityChecked,
  isManageAuthorityChecked,
}: postCreateAuthority) => {
  const data = {
    name: inputValue,
    permissions: [
      {
        code: 'CNC',
        edited: isEditCreateChecked,
        managed: isManageCreateChecked,
      },
      {
        code: 'CNC_Q',
        edited: isEditCreateListChecked,
        managed: isManageCreateListChecked,
      },
      {
        code: 'CNC_W',
        edited: isEditWorksheetChecked,
        managed: isManageWorksheetChecked,
      },
      {
        code: 'CNM',
        edited: isEditManagementChecked,
        managed: isManageManagementChecked,
      },
      {
        code: 'CNM_Q',
        edited: isEditManagementListChecked,
        managed: isManageManagementListChecked,
      },
      {
        code: 'CNM_T',
        edited: isEditTreeChecked,
        managed: isManageTreeChecked,
      },
      {
        code: 'OPM',
        edited: isEditOperationChecked,
        managed: isManageOperationChecked,
      },
      {
        code: 'OPM_M',
        edited: isEditMemberChecked,
        managed: isManageMemberChecked,
      },
      {
        code: 'OPM_R',
        edited: isEditAuthorityChecked,
        managed: isManageAuthorityChecked,
      },
    ],
  };
  await AuthInstance.post('/authority', data)
    .then((response) => {
      handleAuthorizationRenewal(response);
      window.location.reload();
    })

    .catch((error) => {
      alert(error);
    });
};
