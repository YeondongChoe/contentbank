import * as React from 'react';

import { AxiosError } from 'axios';

import { setAuthorityCookie, removeAuthorityCookie } from '../utils/cookies';

import {
  questionInstance,
  authInstance,
  handleAuthorizationRenewal,
} from './axios';

/** 문항 파트 */

type postFavoriteQuestionProps = {
  isFavorited: boolean;
  setIsFavorited: (result: boolean) => void;
};

/** 즐겨찾기 API */
export const postFavoriteQuestion = async (
  { isFavorited, setIsFavorited }: postFavoriteQuestionProps,
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

type dataProps = {
  id: string;
  password: string;
};

type postLoginProps = {
  isClicked: boolean;
  Id: string;
  navigate: (result: string) => void;

  setErrorMessage: (result: string) => void;
  openAlert: () => void;
};

/** 로그인 API */
// export const postLogin = async (
//   { navigate, isClicked, Id, setErrorMessage, openAlert }: postLoginProps,
//   data: dataProps,
// ) => {
//   await authInstance
//     .post('/auth/login', data)
//     .then((response) => {
//       if (response.status === 200) {
//         setAuthorityCookie('accessToken', response.data.access_token, {
//           path: '/',
//           sameSite: 'strict',
//           secure: false,
//         });
//         if (response.data.initPassword === true) {
//           navigate('/firstlogin');
//         } else {
//           navigate('/contentlist');
//         }
//       }
//       if (isClicked === true) {
//         setAuthorityCookie('userId', Id, { path: '/' });
//       } else {
//         removeAuthorityCookie('userId', { path: '/' });
//       }
//     })
//     .catch((error) => {
//       setErrorMessage(error.response.data.message);
//       openAlert();
//     });
// };

type postRegisterProps = {
  Id: string;
  Name: string;
  Authority: string | undefined;
  Comment: string;
  setIsRegister: (result: boolean) => void;
  setIsNameError: (result: boolean) => void;
  setIsDuplicate: (result: boolean) => void;
  setIsRequired: (result: boolean) => void;
  setIsRequiredDuplicate: (result: boolean) => void;
  setIsSuccessAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNameErrorMessage: (result: string) => void;
};

/** 회원등록 API */
export const postRegister = async ({
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
}: postRegisterProps) => {
  await authInstance
    .post('/auth/register', {
      id: Id,
      name: Name,
      authority: Authority,
      comment: Comment,
    })
    .then((response) => {
      handleAuthorizationRenewal(response);
      setIsRegister(false);
      setIsNameError(false);
      setIsSuccessAlertOpen(true);
      window.location.reload();
    })
    .catch((response) => {
      setIsDuplicate(false);
      setIsRequired(false);
      setIsRequiredDuplicate(false);
      setIsNameError(true);
      setNameErrorMessage(response.response.data.errors.name);
    });
};

type postDuplicateProps = {
  Id: string;
  setduplicatedId: (result: string) => void;
  setIsIdError: (result: boolean) => void;
  setIsDuplicate: (result: boolean) => void;
  setSuccessMessage: (result: string) => void;
  setIdErrorMessage: (result: string) => void;
};

/** 회원 아이디 중복체크 API */
export const postDuplicate = async ({
  Id,
  setduplicatedId,
  setIsDuplicate,
  setIsIdError,
  setSuccessMessage,
  setIdErrorMessage,
}: postDuplicateProps) => {
  await authInstance
    .post('/auth/checked-id', { id: Id })
    .then((response) => {
      if (response.status === 200) {
        handleAuthorizationRenewal(response);
        setduplicatedId(Id);
        setIsDuplicate(true);
        setIsIdError(false);
        setSuccessMessage(response.data.message);
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
          setIdErrorMessage(responseData.message);
          if (responseData.errors && responseData.errors.id) {
            // 'response.data.errors.id' 경로의 데이터가 있을 때에만 setIdErrorMessage를 호출
            setIdErrorMessage(responseData.errors.id);
          }
        }
      }
      setIsDuplicate(false);
      setIsIdError(true);
    });
};

/** 권한 파트 */
type PostCreateAuthorityProps = {
  inputValue: string;
  isEditCreateChecked?: boolean;
  isManageCreateChecked?: boolean;
  isEditCreateListChecked: boolean;
  isManageCreateListChecked: boolean;
  isEditWorksheetChecked: boolean;
  isManageWorksheetChecked: boolean;
  isEditManagementChecked?: boolean;
  isManageManagementChecked?: boolean;
  isEditManagementListChecked: boolean;
  isManageManagementListChecked: boolean;
  isEditTreeChecked: boolean;
  isManageTreeChecked: boolean;
  isEditOperationChecked?: boolean;
  isManageOperationChecked?: boolean;
  isEditMemberChecked: boolean;
  isManageMemberChecked: boolean;
  isEditAuthorityChecked: boolean;
  isManageAuthorityChecked: boolean;
};

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
}: PostCreateAuthorityProps) => {
  const data = {
    name: inputValue,
    permissions: [
      {
        code: 'CNC', // 콘텐츠 제작 //전체
        edited: isEditCreateChecked,
        managed: isManageCreateChecked,
      },
      {
        code: 'CNC_Q', // 콘텐츠 제작 문항
        edited: isEditCreateListChecked,
        managed: isManageCreateListChecked,
      },
      {
        code: 'CNC_W', // 콘텐츠 제작 학습지
        edited: isEditWorksheetChecked,
        managed: isManageWorksheetChecked,
      },
      {
        code: 'CNM', // 콘텐츠 관리 //전체
        edited: isEditManagementChecked,
        managed: isManageManagementChecked,
      },
      {
        code: 'CNM_Q', // 콘텐츠 관리 문항
        edited: isEditManagementListChecked,
        managed: isManageManagementListChecked,
      },
      {
        code: 'CNM_T', // 콘텐츠 관리 문항트리
        edited: isEditTreeChecked,
        managed: isManageTreeChecked,
      },
      {
        code: 'OPM', // 운영관리 //전체
        edited: isEditOperationChecked,
        managed: isManageOperationChecked,
      },
      {
        code: 'OPM_M', //운영관리 회원관리
        edited: isEditMemberChecked,
        managed: isManageMemberChecked,
      },
      {
        code: 'OPM_R', //운영관리 권한관리
        edited: isEditAuthorityChecked,
        managed: isManageAuthorityChecked,
      },
    ],
  };
  await authInstance
    .post('/authority', data)
    .then((response) => {
      handleAuthorizationRenewal(response);
      window.location.reload();
    })
    .catch((error) => {
      alert(error);
    });
};
