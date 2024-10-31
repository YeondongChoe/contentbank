import { MutationFunction, UseMutationOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { userInstance } from './axios';

// 최초 로그인 패스워드 변경 api
export const patchPasswordInit = (auth: {
  code: string;
  password: string;
  passwordConfirm: string;
}) => {
  return userInstance.patch('/v1/account/init-change-password', auth);
};

// 마이페이지 패스워드 변경 api
export const patchPassword = (auth: {
  password: string;
  passwordConfirm: string;
}) => {
  return userInstance.patch('/v1/account/change-password', auth);
};

export const patchSaveName = async (nameValue: string) => {
  return await userInstance.patch(`/v1/account/change-name`, nameValue);
};

// 마이페이지 데이터 불러오기 api
export const getMyInfo = async () => {
  // console.log('getMyInfo sessionId', getAuthorityCookie('sessionId'));
  return await userInstance.get(`/v1/account/my-info`);
};

type PostCreateAccountFn = MutationFunction<
  { code: string; message: string },
  {
    Id: string;
    Name: string;
    selectedCode: string;
    Comment: string;
    IdxValue: string;
  }
>;
// 계정 등록하기 api
export const postCreateAccount: PostCreateAccountFn = async ({
  Id,
  Name,
  selectedCode,
  Comment,
  IdxValue,
}) => {
  const account = {
    id: Id,
    name: Name,
    authorityCode: selectedCode,
    note: Comment,
    companyIdx: IdxValue,
  };
  const response: AxiosResponse<{ code: string; message: string }> =
    await userInstance.post(`/v1/account`, account);
  return response.data;
};

// 권한 리스트 불러오기 api
export const getAuthorityList = async (companyIdx: string) => {
  const res = await userInstance.get(
    `/v1/authority?searchCondition=${companyIdx}`,
  );
  return res;
};
// 선택된 권한 불러오기 api
export const getAuthorityItem = async (codeValue: string) => {
  if (codeValue !== '')
    return await userInstance.get(`/v1/authority/${codeValue}`);
};

type PermissionOutput = {
  idx: number;
  isEdit: boolean;
  isManage: boolean;
  menuCode: string;
  menuName: string;
};
// 선택된 권한 수정하기 api
export const putChangeAuthority = async (data: {
  name: string;
  code: string;
  companyIdx: number;
  permissionList: PermissionOutput[];
}) => {
  const res = await userInstance.put(`/v1/authority`, data);
  console.log('authority', res);
  return res;
};

// 선택된 권한 생성하기 api
export const postCreateAuthority = async (data: {
  name: string;
  companyIdx: number;
  permissionList: PermissionOutput[];
}) => {
  const res = await userInstance.post(`/v1/authority`, data);
  return res;
};

// 선택된 권한 삭제하기 api
export const deleteAuthority = async (authorityCode: string) => {
  const res = await userInstance.delete(`/v1/authority/${authorityCode}`);
  return res;
};

// 유저 리스트 불러오기 api
export const getUserList = async ({
  page,
  searchKeywordValue,
  isUseFilter,
}: {
  page: number;
  searchKeywordValue: string;
  isUseFilter: '' | 'Y' | 'N' | undefined;
}) => {
  const res = await userInstance.get(
    `/v1/account?pageIndex=${page}&pageUnit=${8}&searchKeyword=${searchKeywordValue}&isUseFilter=${isUseFilter}
			`,
  );
  // console.log(`유저리스트 get 결과값`, res);
  return res;
};

// 아이디 중복 확인 && 토탈 유저 수
export const getUserListTotal = async ({
  totalCount,
  idxValue,
}: {
  totalCount: number;
  idxValue: string;
}) => {
  const res = await userInstance.get(
    `/v1/account?&pageIndex=${1}&pageUnit=${totalCount}&searchCondition=${idxValue}
		`,
  );
  //console.log(res);
  return res;
};

// 활성화/비활성화 api
export const patchChangeUse = async ({
  isUse,
  checkList,
}: {
  isUse: boolean;
  checkList: number[];
}) => {
  return await userInstance.patch(`/v1/account/change-use`, {
    isUse: isUse,
    idxList: checkList,
  });
};

// 유저 정보 변경 api
type PutChangeUserInfoFn = MutationFunction<
  { code: string; message: string }, // 성공 시 반환되는 데이터 타입
  {
    accountIdx: number;
    userInfo: {
      name: string;
      authorityCode: string;
      note: string;
      isUseNot: string;
      companyIdx: number;
    };
  } // 함수가 받아들이는 인자 타입
>;
export const putChangeUserInfo: PutChangeUserInfoFn = async ({
  accountIdx,
  userInfo,
}: {
  accountIdx: number;
  userInfo: {
    name: string;
    authorityCode: string;
    note: string;
    isUseNot: string;
    companyIdx: number;
  };
}) => {
  const res = await userInstance.put(`/v1/account/${accountIdx}`, userInfo);
  return res.data;
};

// 유저 비밀번호 초기화 api
export const patchUserPasswordInit = async (userKey: string) => {
  return await userInstance.patch(`/v1/account/initialize-password/${userKey}`);
};

// 유저 불러오기 api
export const getUser = async (accountIdx: number) => {
  const res = await userInstance.get(`/v1/account/${accountIdx}`);
  // console.log(`accountIdx get 결과값`, accountIdx, res);
  return res;
};
