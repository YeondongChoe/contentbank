import * as React from 'react';

import { questionInstance, authInstance } from './axios';

/** 콘텐츠 파트 */

type questionListProps = {
  contentSeq: number;
  questionSeq: number;
  favorited: boolean;
  questionCode: string; //문항코드
  curriculum: string; //개정과정
  schoolLevel: string; //학교급
  schoolYear: string; //학년
  semester: string; //학기
  unitMajor: string; //대분류
  unitMiddle: string; //중분류
  questionType: string; //문항타입??
  questionCreatedByName: string; //작성자
  questionCreatedDate: string; //일자
  serviced: boolean; //오픈여부
};

type getQuestionListProps = {
  setQuestionList: React.Dispatch<React.SetStateAction<questionListProps[]>>;
  setIsChangedServiced: (result: boolean) => void;
  settotalPage: (result: number) => void;
  searchValue: string;
  MenuCode: string;
  page?: number;
  size: number;
};

/** 문항리스트 가져오는 API*/
export const getQuestionList = async ({
  setQuestionList,
  setIsChangedServiced,
  settotalPage,
  searchValue,
  MenuCode,
  page,
  size,
}: getQuestionListProps) => {};
// export const getQuestionList = async ({
//   setQuestionList,
//   setIsChangedServiced,
//   settotalPage,
//   searchValue,
//   MenuCode,
//   page,
//   size,
// }: getQuestionListProps) => {
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}.${month}.${day}`;
//   };
//   await questionInstance
//     .get(
//       `/questions?keyword=${
//         searchValue || ''
//       }&page=${page}&size=${size}&menuCode=${MenuCode}`,
//     )
//     .then((response) => {
//       // handleAuthorizationRenewal(response);
//       // console.log(response.data.data.totalElements);
//       settotalPage(response.data.data.totalElements);
//       const formattedQuestionList = response.data.data.content.map(
//         (content: any) => ({
//           ...content,
//           questionCreatedDate: formatDate(content.questionCreatedDate),
//         }),
//       );
//       setQuestionList(formattedQuestionList);
//       setIsChangedServiced(false);
//     })
//     .catch((err) => {
//       alert(err);
//     });
// };

/** 회원 파트 */

type memberProps = {
  id: null;
  name: null;
  key: null;
  authority: null;
  comment: null;
  enabled: null;
  authCode: null;
};

type getMemberInformationProps = {
  keyValue?: string;
  setMember: (result: memberProps) => void;
};

/** 회원정보 가져오는 API*/
export const getMemberInformation = async ({
  setMember,
}: getMemberInformationProps) => {
  await authInstance
    .get('/auth/my-info')
    .then((response) => {
      // handleAuthorizationRenewal(response);
      setMember({
        id: response?.data?.data?.id,
        name: response?.data?.data?.name,
        key: response?.data?.data?.key,
        authority: response?.data?.data?.authority.name,
        comment: response?.data?.data?.comment,
        enabled: response?.data?.data?.enabled,
        authCode: response?.data?.data?.authority.code,
      });
    })
    .catch((error) => {
      alert(error.response?.data?.message);
    });
};

export const getIndividualMemberInformation = async ({
  keyValue,
  setMember,
}: getMemberInformationProps) => {
  await authInstance
    .get(`/auth/${keyValue}`)
    .then((response) => {
      // handleAuthorizationRenewal(response);
      setMember({
        id: response?.data?.data?.id,
        name: response?.data?.data?.name,
        key: response?.data?.data?.key,
        authority: response?.data?.data?.authority.name,
        comment: response?.data?.data?.comment,
        enabled: response?.data?.data?.enabled,
        authCode: response?.data?.data?.authority.code,
      });
    })
    .catch((error) => {
      alert(error);
    });
};

type memberListProps = {
  seq: number;
  authority: {
    seq: number;
    code: string;
    name: string;
    sort: number;
  };
  name: string;
  key: string;
  id: string;
  comment: null;
  createdBy: null;
  createdDate: string;
  lastModifiedBy: null;
  lastModifiedDate: string;
  enabled: boolean;
};

type getMemberListProps = {
  setMemberList: React.Dispatch<React.SetStateAction<memberListProps[]>>;
  page: number;
  size: number;
  setTotalPage: (result: number) => void;
  enabled?: string | undefined;
  searchValue?: string | undefined;
};

/** 회원리스트 가져오는 API*/
export const getMemberList = async ({
  setMemberList,
  setTotalPage,
  page,
  size,
  enabled,
  searchValue,
}: getMemberListProps) => {
  await authInstance
    .get(
      `/auth?keyword=${
        searchValue || ''
      }&page=${page}&size=${size}&enabledType=${enabled || ''}`,
    )
    .then((response) => {
      // handleAuthorizationRenewal(response);
      setTotalPage(response.data.data.totalElements);
      setMemberList(response.data.data.content);
    })
    .catch((err) => {
      alert(err);
    });
};

/** 권한 파트 */

type AuthorityListProps = {
  seq: number;
  code: string;
  name: string;
  sort: number;
};

type getAuthorityListProps = {
  setAuthorityList: React.Dispatch<React.SetStateAction<AuthorityListProps[]>>;
};

/** 권한리스트 가져오는 API*/
export const getAuthorityList = async ({
  setAuthorityList,
}: getAuthorityListProps) => {
  await authInstance
    .get('/authority')
    .then((response) => {
      // handleAuthorizationRenewal(response);
      setAuthorityList(response.data.data);
    })
    .catch((err) => {
      alert(err);
    });
};

type getMemberAuthorityProps = {
  setIsEditCreateChecked: (result: boolean) => void;
  setIsManageCreateChecked: (result: boolean) => void;
  setIsEditCreateListChecked: (result: boolean) => void;
  setIsManageCreateListChecked: (result: boolean) => void;
  setIsEditWorksheetChecked: (result: boolean) => void;
  setIsManageWorksheetChecked: (result: boolean) => void;
  setIsEditManagementChecked: (result: boolean) => void;
  setIsManageManagementChecked: (result: boolean) => void;
  setIsEditManagementListChecked: (result: boolean) => void;
  setIsManageManagementListChecked: (result: boolean) => void;
  setIsEditTreeChecked: (result: boolean) => void;
  setIsManageTreeChecked: (result: boolean) => void;
  setIsEditOperationChecked: (result: boolean) => void;
  setIsManageOperationChecked: (result: boolean) => void;
  setIsEditMemberChecked: (result: boolean) => void;
  setIsManageMemberChecked: (result: boolean) => void;
  setIsEditAuthorityChecked: (result: boolean) => void;
  setIsManageAuthorityChecked: (result: boolean) => void;
};

/** 특정회원권한정보 가져오는 API*/
export const getMemberAuthority = async (
  {
    setIsEditCreateChecked,
    setIsManageCreateChecked,
    setIsEditCreateListChecked,
    setIsManageCreateListChecked,
    setIsEditWorksheetChecked,
    setIsManageWorksheetChecked,
    setIsEditManagementChecked,
    setIsManageManagementChecked,
    setIsEditManagementListChecked,
    setIsManageManagementListChecked,
    setIsEditTreeChecked,
    setIsManageTreeChecked,
    setIsEditOperationChecked,
    setIsManageOperationChecked,
    setIsEditMemberChecked,
    setIsManageMemberChecked,
    setIsEditAuthorityChecked,
    setIsManageAuthorityChecked,
  }: getMemberAuthorityProps,
  code: string,
) => {
  await authInstance
    .get(`/authority/${code}/permissions`)
    .then((response) => {
      // handleAuthorizationRenewal(response);
      setIsEditCreateChecked(response.data.data.permissions[0].edited);
      setIsManageCreateChecked(response.data.data.permissions[0].managed);
      setIsEditCreateListChecked(response.data.data.permissions[1].edited);
      setIsManageCreateListChecked(response.data.data.permissions[1].managed);
      setIsEditWorksheetChecked(response.data.data.permissions[2].edited);
      setIsManageWorksheetChecked(response.data.data.permissions[2].managed);
      setIsEditManagementChecked(response.data.data.permissions[3].edited);
      setIsManageManagementChecked(response.data.data.permissions[3].managed);
      setIsEditManagementListChecked(response.data.data.permissions[4].edited);
      setIsManageManagementListChecked(
        response.data.data.permissions[4].managed,
      );
      setIsEditTreeChecked(response.data.data.permissions[5].edited);
      setIsManageTreeChecked(response.data.data.permissions[5].managed);
      setIsEditOperationChecked(response.data.data.permissions[6].edited); //운영관리 편집
      setIsManageOperationChecked(response.data.data.permissions[6].managed);
      setIsEditMemberChecked(response.data.data.permissions[7].edited); //운영관리 회원 관리 편집
      setIsManageMemberChecked(response.data.data.permissions[7].managed);
      setIsEditAuthorityChecked(response.data.data.permissions[8].edited); //운영관리 권환 관리 편집
      setIsManageAuthorityChecked(response.data.data.permissions[8].managed);
    })
    .catch((err) => {
      alert(err);
    });
};

type menuProps = {
  seq: number;
  code: string;
  depth: number;
  method: string;
  name: string;
  sort: number;
  type: string;
  url: null;
  enabled: boolean;
  children: [
    {
      seq: number;
      code: string;
      depth: number;
      method: string;
      name: string;
      sort: number;
      type: string;
      url: null;
      enabled: boolean;
      children: null;
    },
    {
      seq: number;
      code: string;
      depth: number;
      method: string;
      name: string;
      sort: number;
      type: string;
      url: null;
      enabled: boolean;
      children: null;
    },
  ];
};

type getAuthorityMenuProps = {
  setMenuValue: React.Dispatch<React.SetStateAction<menuProps[]>>;
};

/** 권한메뉴정보 가져오는 API */
export const getAuthorityMenu = async ({
  setMenuValue,
}: getAuthorityMenuProps) => {
  await authInstance
    .get('/menu')
    .then((response) => {
      // handleAuthorizationRenewal(response);
      setMenuValue(response.data);
    })
    .catch((err) => {
      alert(err);
    });
};
