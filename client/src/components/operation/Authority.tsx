import * as React from 'react';
import { useState, useEffect, useCallback, useReducer } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BiSolidTrashAlt } from 'react-icons/bi';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { redirect } from 'react-router-dom';
import styled from 'styled-components';

import { userInstance } from '../../api/axios';
import {
  deleteAuthority,
  getAuthorityItem,
  getAuthorityList,
  postCreateAuthority,
  putChangeAuthority,
} from '../../api/user';
import { Input } from '../../components';
import {
  Button,
  Loader,
  ValueNone,
  openToastifyAlert,
} from '../../components/atom';
import { ItemAuthorityType } from '../../types';
import { postRefreshToken } from '../../utils/tokenHandler';
import { COLOR } from '../constants';
import { Alert } from '../molecules/alert/Alert';

export const defaultPermissions = [
  {
    key: 'isEditCreateChecked',
    checked: false,
    menuCode: 'isEditCreateChecked',
  },
  {
    key: 'isManageCreateChecked',
    checked: false,
    menuCode: 'isManageCreateChecked',
  },
  { key: 'QE_isEdit', checked: false, menuCode: 'QE_isEdit' },
  { key: 'QE_isManage', checked: false, menuCode: 'QE_isManage' },
  { key: 'WE_isEdit', checked: false, menuCode: 'WE_isEdit' },
  { key: 'WE_isManage', checked: false, menuCode: 'WE_isManage' },
  {
    key: 'isEditManagementChecked',
    checked: false,
    menuCode: 'isEditManagementChecked',
  },
  {
    key: 'isManageManagementChecked',
    checked: false,
    menuCode: 'isManageManagementChecked',
  },
  { key: 'QM_isEdit', checked: false, menuCode: 'QM_isEdit' },
  { key: 'QM_isManage', checked: false, menuCode: 'QM_isManage' },
  { key: 'RM_isEdit', checked: false, menuCode: 'RM_isEdit' },
  { key: 'RM_isManage', checked: false, menuCode: 'RM_isManage' },
  { key: 'IM_isEdit', checked: false, menuCode: 'IM_isEdit' },
  { key: 'IM_isManage', checked: false, menuCode: 'IM_isManage' },
  {
    key: 'isEditOperationChecked',
    checked: false,
    menuCode: 'isEditOperationChecked',
  },
  {
    key: 'isManageOperationChecked',
    checked: false,
    menuCode: 'isManageOperationChecked',
  },
  { key: 'AM_isEdit', checked: true, menuCode: 'AM_isEdit' },
  { key: 'AM_isManage', checked: false, menuCode: 'AM_isManage' },
  { key: 'PM_isEdit', checked: true, menuCode: 'PM_isEdit' },
  { key: 'PM_isManage', checked: false, menuCode: 'PM_isManage' },
  { key: 'PSM_isEdit', checked: true, menuCode: 'PSM_isEdit' },
  { key: 'PSM_isManage', checked: false, menuCode: 'PSM_isManage' },
  { key: 'COM_isEdit', checked: true, menuCode: 'COM_isEdit' },
  { key: 'COM_isManage', checked: false, menuCode: 'COM_isManage' },
  { key: 'MIM_isEdit', checked: true, menuCode: 'MIM_isEdit' },
  { key: 'MIM_isManage', checked: false, menuCode: 'MIM_isManage' },
  { key: 'LOM_isEdit', checked: true, menuCode: 'LOM_isEdit' },
  { key: 'LOM_isManage', checked: false, menuCode: 'LOM_isManage' },
  { key: 'STM_isEdit', checked: true, menuCode: 'STM_isEdit' },
  { key: 'STM_isManage', checked: false, menuCode: 'STM_isManage' },
  {
    key: 'isEditMenuChecked',
    checked: false,
    menuCode: 'isEditMenuChecked',
  },
  {
    key: 'isManageMenuChecked',
    checked: false,
    menuCode: 'isManageMenuChecked',
  },
  { key: 'CCC_isEdit', checked: true, menuCode: 'CCC_isEdit' },
  { key: 'CCC_isManage', checked: false, menuCode: 'CCC_isManage' },
  { key: 'CMC_isEdit', checked: true, menuCode: 'CMC_isEdit' },
  { key: 'CMC_isManage', checked: false, menuCode: 'CMC_isManage' },
];

export type PermissionInput = {
  key: string;
  checked: boolean;
  menuCode: string;
};

export type PermissionOutput = {
  idx: number;
  isEdit: boolean;
  isManage: boolean;
  menuCode: string;
  menuName: string;
};

export function Authority() {
  const [authorityList, setAuthorityList] = useState<ItemAuthorityType[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isClickedName, setIsClickedName] = useState(false);
  const [codeValue, setCodeValue] = useState('');
  const [codeUpdateList, setCodeUpdateList] = useState<PermissionOutput[]>([]);
  const [deleteCodeValue, setDeleteCodeValue] = useState('');

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isUpdateAuthority, setIsUpdateAuthority] = useState(false);
  const [isCreateNameError, setIsCreateNameError] = useState(false);
  const [isCheckNullError, setIsCheckNullError] = useState(false);
  const [isDeleteAuthority, setIsDeleteAuthority] = useState(false);
  const [checkList, setCheckList] =
    useState<PermissionInput[]>(defaultPermissions);

  const [companyCoadValue, setCompanyCoadValue] = useState<string | null>(null);
  const [companyIdxValue, setCompanyIdxValue] = useState<string>('0');
  //로컬스토리지에 있는 기업코드 가져오기
  useEffect(() => {
    const storedCompanyCode = localStorage.getItem('companyCode');
    setCompanyCoadValue(storedCompanyCode);
  }, []);

  //기업코드로 기업 idx 가져오기
  const getCompanyList = async () => {
    const res = await userInstance.get(
      `/v1/company?searchCondition=${companyCoadValue}`,
    );
    //console.log(`getCompanyList 결과값`, res);
    return res;
  };

  const { data: companyListData, refetch: companyListRefetch } = useQuery({
    queryKey: ['get-companyList'],
    queryFn: getCompanyList,
    meta: {
      errorMessage: 'get-companyList 에러 메세지',
    },
    enabled: companyCoadValue !== null,
  });

  useEffect(() => {
    if (companyListData) {
      setCompanyIdxValue(
        companyListData?.data.data.list[0].idx.toLocaleString(),
      );
    }
  }, [companyListData]);

  const queryClient = useQueryClient();

  //TODO: 권한 리스트 불러오기 api : 기업코드 변경해줘야함
  const { data: authorityListData, refetch: authorityListDataRefetch } =
    useQuery({
      queryKey: ['get-authorityList', companyIdxValue],
      queryFn: ({ queryKey }) => getAuthorityList(queryKey[1]),
      meta: {
        errorMessage: 'get-authorityList 에러 메세지',
      },
    });
  const updateAuthorityList = () => {
    if (authorityListData) {
      const authority: ItemAuthorityType[] = [];
      authorityListData.data.data.authorityList.map((el: ItemAuthorityType) => {
        authority.push({
          idx: el.idx,
          code: el.code,
          name: el.name,
          sort: el.sort,
          createdBy: el.createdBy,
          createdAt: el.createdAt,
          lastModifiedBy: el.lastModifiedBy,
          lastModifiedAt: el.lastModifiedAt,
        });
      });
      setAuthorityList([...authority]);
    }
  };

  // 선택된 권한 불러오기 api
  const {
    data: authorityData,
    isSuccess,
    isPending,
    refetch: authorityDataRefetch,
  } = useQuery({
    queryKey: ['get-authority'],
    queryFn: () => getAuthorityItem(codeValue),
    meta: {
      errorMessage: 'get-authority 에러 메세지',
    },
    enabled: !!codeValue,
  });

  // 등록된 권한 데이터 불러올 시 체크박스에 맞춘 데이터로 변환
  const updatePermissions = (permissions: PermissionOutput[]) => {
    // 결과 배열 생성
    const results = [...defaultPermissions.map((perm) => ({ ...perm }))];

    permissions.forEach((serverPerm) => {
      // 해당 메뉴 코드의 '_isEdit'에 대한 업데이트
      const editIndex = results.findIndex(
        (perm) => perm.menuCode === `${serverPerm.menuCode}_isEdit`,
      );
      if (editIndex !== -1) {
        results[editIndex].checked = serverPerm.isEdit;
      }

      // 해당 메뉴 코드의 '_isManage'에 대한 업데이트
      const manageIndex = results.findIndex(
        (perm) => perm.menuCode === `${serverPerm.menuCode}_isManage`,
      );
      if (manageIndex !== -1) {
        results[manageIndex].checked = serverPerm.isManage;
      }
    });

    return results;
  };

  useEffect(() => {
    updateAuthorityList();
  }, [authorityListData]);

  //등록된 권한 이름 클릭시
  const clickMemberAuthority = (code: string) => {
    setCodeValue(code);
    setIsClickedName(true);
    authorityDataRefetch();
  };
  useEffect(() => {
    // queryClient.invalidateQueries({
    //   queryKey: ['get-authority'],
    // });
    authorityDataRefetch();
  }, [codeValue, setCodeValue]);

  useEffect(() => {
    if (
      isSuccess &&
      authorityData?.data.data.permissionList &&
      inputValue !== ''
    ) {
      console.log(
        'authorityData.data.data.permissionList',
        authorityData.data.data.permissionList,
      );

      const updatedPermissions = updatePermissions(
        authorityData.data.data.permissionList,
      );
      console.log('updatedPermissions', updatedPermissions);
      setCheckList(updatedPermissions);
    }
  }, [authorityData]);

  // 메뉴 코드 및 이름에 대한 매핑 정보
  const menuMapping: Record<string, { idx: number; name: string }> = {
    QE: { idx: 1, name: '문항 제작' },
    WE: { idx: 2, name: '학습지 제작' },
    QM: { idx: 3, name: '문항 관리' },
    RM: { idx: 4, name: '신고 문항' },
    IM: { idx: 5, name: '검수 관리' },
    AM: { idx: 6, name: '회원 관리' },
    PM: { idx: 7, name: '권한 관리' },
    PSM: { idx: 8, name: '프로세스 관리' },
    COM: { idx: 9, name: '기업 관리' },
    MIM: { idx: 10, name: '메타정보 관리' },
    LOM: { idx: 11, name: '로그 관리' },
    STM: { idx: 12, name: '통계 관리' },
    CCC: { idx: 13, name: '콘텐츠 제작 설정' },
    CMC: { idx: 14, name: '콘텐츠 관리 설정' },
  };

  // 등록 수정시 서버 데이터 형식 맞추는 함수
  const createPermissions = (permissions: PermissionInput[]) => {
    const results: PermissionOutput[] = [];
    console.log('permissions', permissions);

    // 메뉴 매핑 정보를 기반으로 각 메뉴 코드에 대한 권한 설정
    Object.keys(menuMapping).forEach((code) => {
      const menuInfo = menuMapping[code];
      console.log('menuInfo', menuInfo);

      // 'Edit' 권한 확인
      const isEdit = permissions.some(
        (p) => p.menuCode === `${code}_isEdit` && p.checked,
      );
      // 'Manage' 권한 확인
      const isManage = permissions.some(
        (p) => p.menuCode === `${code}_isManage` && p.checked,
      );

      results.push({
        idx: menuInfo.idx,
        isEdit: isEdit,
        isManage: isManage,
        menuCode: code,
        menuName: menuInfo.name,
      });
    });

    return results;
  };

  // 등록 && 수정 버튼
  const submitAuthority = () => {
    console.log('checkList----------------', checkList);
    const permissionList: PermissionOutput[] = createPermissions(checkList);
    setCodeUpdateList(permissionList);
    console.log('permissionList----------', permissionList);
    const onList = defaultPermissions;
    setCheckList([...onList]);

    if (isClickedName && permissionList.length > 0) {
      mutateChangeAuthority({
        name: inputValue,
        code: codeValue,
        companyIdx: 1, //수정해야함
        permissionList,
      });

      return;
    }
    if (!isClickedName && permissionList.length > 0) {
      mutateCreateAuthority({
        name: inputValue,
        companyIdx: 1, //수정해야함
        permissionList,
      });

      return;
    }
  };

  // 선택된 권한 수정하기 api
  const {
    data: changeAuthorityData,
    mutate: mutateChangeAuthority,
    isPending: changeAuthorityisPending,
  } = useMutation({
    mutationFn: putChangeAuthority,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
      if (context.response.data.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response: { data: { message: string } }) => {
      openToastifyAlert({
        type: 'success',
        text: response.data.message,
      });
      //초기화
      setCheckList([...defaultPermissions]);
      setIsAlertOpen(false);
      authorityListDataRefetch();
      setInputValue('');
      setIsClickedName(false);
    },
  });
  // 선택된 권한 생성하기 api
  const {
    data: createAuthorityData,
    mutate: mutateCreateAuthority,
    isPending: createAuthorityIsPending,
  } = useMutation({
    mutationFn: postCreateAuthority,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
      if (context.response.data.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response: { data: { message: string } }) => {
      openToastifyAlert({
        type: 'success',
        text: response.data.message,
      });
      //초기화
      setCheckList([...defaultPermissions]);
      setIsAlertOpen(false);
      authorityListDataRefetch();
      authorityDataRefetch();
      setInputValue('');
      setIsClickedName(false);
    },
  });

  // 선택된 권한 삭제하기 api
  const { data: deleteAuthorityData, mutate: mutateDeleteAuthority } =
    useMutation({
      mutationFn: deleteAuthority,
      onError: (context: {
        response: { data: { message: string; code: string } };
      }) => {
        openToastifyAlert({
          type: 'error',
          text: context.response.data.message,
        });
        if (context.response.data.code == 'GE-002') {
          postRefreshToken();
        }
      },
      onSuccess: (response: { data: { message: string } }) => {
        // console.log('deleteAuthorityData', response);
        openToastifyAlert({
          type: 'success',
          text: response.data.message,
        });
        //초기화
        setCheckList([...defaultPermissions]);
        authorityListDataRefetch();
        setInputValue('');
        setIsClickedName(false);
        //얼럿 닫기
        setIsAlertOpen(false);
      },
    });

  const submitDelete = () => {
    console.log('deleteCodeValue', deleteCodeValue);
    mutateDeleteAuthority(deleteCodeValue);
  };

  useEffect(() => {
    redirect('/operation-manage/authority');
  }, [changeAuthorityData, createAuthorityData, deleteAuthorityData]);

  // 권한관리 체크박스 핸들러
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 체크박스 선택시 해당 배열값변경
    const onList = checkList;
    const target = e.currentTarget;
    // console.log(target.id, target.checked);

    // 개당 체크시 체크 토글
    onList.splice(Number(target.value), 1, {
      key: target.id,
      checked: target.checked,
      menuCode: target.id,
    });
    setCheckList([...onList]);

    //콘텐츠 제작
    // [0] 편집 전체 선택 토글 // 편집 선택false시 관리 체크 초기화
    console.log(target.id, target.value);

    // [2][4] 문항 학습지 전체 체크 초기화
    if (Number(target.value) === 2) {
      if (target.checked === false) {
        // 편집 false일시 관리도 false
        onList.splice(3, 1, {
          key: checkList[3].key,
          checked: false,
          menuCode: 'QE_isManage',
        });

        setCheckList([...onList]);
      }
      return;
    }
    if (Number(target.value) === 4) {
      if (target.checked === false) {
        // 편집 false일시 관리도 false
        onList.splice(5, 1, {
          key: checkList[5].key,
          checked: false,
          menuCode: 'WE_isManage',
        });

        setCheckList([...onList]);
      }
      return;
    }

    // [1][3][5] 관리 전체 선택 토글 또는 개별 선택

    //콘텐츠 관리
    // [6] 편집 전체 선택 토글 // 편집 선택false시 관리 체크 초기화

    // [8][10][12] 문항 신고 검수 전체 체크 초기화
    if (Number(target.value) === 8) {
      if (target.checked === false) {
        // 편집 false일시 관리도 false
        onList.splice(9, 1, {
          key: checkList[9].key,
          checked: false,
          menuCode: 'QM_isManage',
        });

        setCheckList([...onList]);
      }

      return;
    }
    //신고문항
    if (Number(target.value) === 10) {
      if (target.checked === false) {
        // 편집 false일시 관리도 false
        onList.splice(11, 1, {
          key: checkList[11].key,
          checked: false,
          menuCode: 'RM_isManage',
        });

        setCheckList([...onList]);
      }

      return;
    }

    //검수문항
    if (Number(target.value) === 12) {
      if (target.checked === false) {
        // 편집 false일시 관리도 false
        onList.splice(13, 1, {
          key: checkList[13].key,
          checked: false,
          menuCode: 'IM_isManage',
        });

        setCheckList([...onList]);
      }

      return;
    }

    //운영 관리
    // [14] 편집 전체 선택 토글 // 편집 선택false시 관리 체크 초기화

    // [20][22][24][26][28] 프로세스 기업 메타정보 로그 통계 전체 체크 초기화
    //프로세스관리
    if (Number(target.value) === 20) {
      if (target.checked === false) {
        // 편집 false일시 관리도 false
        onList.splice(21, 1, {
          key: checkList[21].key,
          checked: false,
          menuCode: 'PSM_isManage',
        });

        setCheckList([...onList]);
      }

      return;
    }

    //기업관리
    if (Number(target.value) === 22) {
      if (target.checked === false) {
        // 편집 false일시 관리도 false
        onList.splice(23, 1, {
          key: checkList[23].key,
          checked: false,
          menuCode: 'COM_isManage',
        });

        setCheckList([...onList]);
      }

      return;
    }

    //메타정보관리
    if (Number(target.value) === 24) {
      if (target.checked === false) {
        // 편집 false일시 관리도 false
        onList.splice(25, 1, {
          key: checkList[25].key,
          checked: false,
          menuCode: 'MIM_isManage',
        });

        setCheckList([...onList]);
      }

      return;
    }

    //로그관리
    if (Number(target.value) === 26) {
      if (target.checked === false) {
        // 편집 false일시 관리도 false
        onList.splice(27, 1, {
          key: checkList[27].key,
          checked: false,
          menuCode: 'LOM_isManage',
        });

        setCheckList([...onList]);
      }

      return;
    }

    //통계관리
    if (Number(target.value) === 28) {
      if (target.checked === false) {
        // 편집 false일시 관리도 false
        onList.splice(29, 1, {
          key: checkList[29].key,
          checked: false,
          menuCode: 'STM_isManage',
        });

        setCheckList([...onList]);
      }

      return;
    }

    //메뉴 관리
    // [30] 편집 전체 선택 토글 // 편집 선택false시 관리 체크 초기화

    // [32][34] 콘텐츠 제작 설정 콘텐츠 관리 설정 전체 체크 초기화
    //프로세스관리
    //콘텐츠 제작 설정
    if (Number(target.value) === 32) {
      if (target.checked === false) {
        // 편집 false일시 관리도 false
        onList.splice(33, 1, {
          key: checkList[33].key,
          checked: false,
          menuCode: 'CCC_isManage',
        });

        setCheckList([...onList]);
      }

      return;
    }

    //콘텐츠 관리 설정
    if (Number(target.value) === 34) {
      if (target.checked === false) {
        // 편집 false일시 관리도 false
        onList.splice(35, 1, {
          key: checkList[35].key,
          checked: false,
          menuCode: 'CMC_isManage',
        });

        setCheckList([...onList]);
      }

      return;
    }

    // [7][9][11] 관리 전체 선택 토글 또는 개별 선택
    // if (
    //   Number(target.value) === 7 ||
    //   Number(target.value) === 9 ||
    //   Number(target.value) === 11
    // ) {
    //   if (Number(target.value) === 7 && target.checked === true) {
    //     onList.splice(9, 1, {
    //       key: checkList[9].key,
    //       checked: true,
    //       menuCode: 'QM_isManage',
    //     });
    //     onList.splice(11, 1, {
    //       key: checkList[11].key,
    //       checked: true,
    //       menuCode: 'isManageTreeChecked',
    //     });
    //     setCheckList([...onList]);
    //     return;
    //   }
    //   if (Number(target.value) === 7 && target.checked === false) {
    //     onList.splice(9, 1, {
    //       key: checkList[9].key,
    //       checked: false,
    //       menuCode: 'QM_isManage',
    //     });
    //     onList.splice(11, 1, {
    //       key: checkList[11].key,
    //       checked: false,
    //       menuCode: 'isManageTreeChecked',
    //     });
    //     setCheckList([...onList]);
    //     return;
    //   }
    //   if (Number(target.value) === 9 || Number(target.value) === 11) {
    //     if (target.checked === false) {
    //       onList.splice(7, 1, {
    //         key: checkList[7].key,
    //         checked: false,
    //         menuCode: 'isManageManagementChecked',
    //       });
    //       setCheckList([...onList]);
    //       return;
    //     }
    //     if (checkList[9].checked && checkList[11].checked) {
    //       onList.splice(7, 1, {
    //         key: checkList[7].key,
    //         checked: true,
    //         menuCode: 'isManageManagementChecked',
    //       });
    //       setCheckList([...onList]);
    //       return;
    //     }
    //   }
    // }

    //운영 관리
    // [12] 편집 전체 선택 토글 // 편집 선택false시 관리 체크 초기화
    // if (target.id === 'isEditOperationChecked') {
    //   if (target.checked === true) {
    //     onList.splice(14, 1, {
    //       key: checkList[14].key,
    //       checked: true,
    //       menuCode: 'AM_isEdit',
    //     });
    //     onList.splice(16, 1, {
    //       key: checkList[16].key,
    //       checked: true,
    //       menuCode: 'PM_isEdit',
    //     });

    //     setCheckList([...onList]);
    //   }
    // if (target.checked === false) {
    //   onList.splice(14, 1, {
    //     key: checkList[14].key,
    //     checked: false,
    //     menuCode: 'AM_isEdit',
    //   });
    //   onList.splice(16, 1, {
    //     key: checkList[16].key,
    //     checked: false,
    //     menuCode: 'PM_isEdit',
    //   });
    //     // 편집 false일시 관리도 false
    //     onList.splice(13, 1, {
    //       key: checkList[13].key,
    //       checked: false,
    //       menuCode: 'isManageOperationChecked',
    //     });
    //     onList.splice(15, 1, {
    //       key: checkList[15].key,
    //       checked: false,
    //       menuCode: 'AM_isManage',
    //     });
    //     onList.splice(17, 1, {
    //       key: checkList[17].key,
    //       checked: false,
    //       menuCode: 'PM_isManage',
    //     });

    //     setCheckList([...onList]);
    //   }
    //   return;
    // }
    // [14][16] 문항 학습지 전체 체크 초기화
    // if (Number(target.value) === 14 || Number(target.value) === 16) {
    //   if (target.checked === false) {
    //     onList.splice(12, 1, {
    //       key: target.id,
    //       checked: false,
    //       menuCode: 'isEditOperationChecked',
    //     });

    //     // 편집 false일시 관리도 false
    //     onList.splice(13, 1, {
    //       key: checkList[13].key,
    //       checked: false,
    //       menuCode: 'isManageOperationChecked',
    //     });
    //     onList.splice(15, 1, {
    //       key: checkList[15].key,
    //       checked: false,
    //       menuCode: 'AM_isManage',
    //     });
    //     onList.splice(17, 1, {
    //       key: checkList[17].key,
    //       checked: false,
    //       menuCode: 'PM_isManage',
    //     });

    //     setCheckList([...onList]);
    //   }
    //   if (checkList[14].checked && checkList[16].checked) {
    //     onList.splice(12, 1, {
    //       key: target.id,
    //       checked: true,
    //       menuCode: 'isEditOperationChecked',
    //     });

    //     setCheckList([...onList]);
    //   }
    //   return;
    // }
    // [13][15][17] 관리 전체 선택 토글 또는 개별 선택
    // if (
    //   Number(target.value) === 13 ||
    //   Number(target.value) === 15 ||
    //   Number(target.value) === 17
    // ) {
    //   if (Number(target.value) === 13 && target.checked === true) {
    //     onList.splice(15, 1, {
    //       key: checkList[15].key,
    //       checked: true,
    //       menuCode: 'AM_isManage',
    //     });
    //     onList.splice(17, 1, {
    //       key: checkList[17].key,
    //       checked: true,
    //       menuCode: 'PM_isManage',
    //     });
    //     setCheckList([...onList]);
    //     return;
    //   }
    //   if (Number(target.value) === 13 && target.checked === false) {
    //     onList.splice(15, 1, {
    //       key: checkList[15].key,
    //       checked: false,
    //       menuCode: 'AM_isManage',
    //     });
    //     onList.splice(17, 1, {
    //       key: checkList[17].key,
    //       checked: false,
    //       menuCode: 'PM_isManage',
    //     });
    //     setCheckList([...onList]);
    //     return;
    //   }
    //   // if (Number(target.value) === 15 || Number(target.value) === 17) {
    //   //   if (target.checked === false) {
    //   //     onList.splice(13, 1, {
    //   //       key: checkList[13].key,
    //   //       checked: false,
    //   //     });
    //   //     setCheckList([...onList]);
    //   //     return;
    //   //   }
    //   //   if (checkList[15].checked && checkList[17].checked) {
    //   //     onList.splice(13, 1, {
    //   //       key: checkList[13].key,
    //   //       checked: true,
    //   //     });
    //   //     setCheckList([...onList]);
    //   //     return;
    //   //   }
    //   // }
    // }
    // console.log(onList);
  };

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onCancel = () => {
    // 초기화
    setIsClickedName(false);
    setInputValue('');
    setCheckList([...defaultPermissions]);
  };

  useEffect(() => {
    if (isClickedName === false) {
      // isClickedName상태값이 저장일시 defaultPermissions 로
      setCheckList([...defaultPermissions]);
    }
  }, [isClickedName]);

  useEffect(() => {
    //페이지 변경시 초기화
    setCheckList([...defaultPermissions]);
  }, []);

  useEffect(() => {
    console.log('checkList', checkList);
  }, [checkList, setCheckList]);

  const openUpdateAlert = () => {
    setIsAlertOpen(true);

    if (inputValue === '') {
      setIsCreateNameError(true);
      setIsUpdateAuthority(false);
    }

    const hasChecked = checkList.some((item) => item.checked);
    setIsCheckNullError(!hasChecked);

    if (!isCheckNullError) {
      setIsUpdateAuthority(true);
      setIsCreateNameError(false);
    }
  };

  return (
    <Container>
      <Title>권한 관리</Title>
      <Wrapper>
        <ListWrapper>
          <SubTitleWrapper>
            <SubTitle>권한 {isClickedName ? '수정' : '등록'}</SubTitle>
            <InputWrapper>
              {isClickedName ? (
                <Input
                  width="100%"
                  height="35px"
                  padding="5px"
                  placeholderSize="14px"
                  fontSize="14px"
                  borderradius="5px"
                  type="text"
                  readOnly
                  value={inputValue}
                />
              ) : (
                <Input
                  width="100%"
                  height="35px"
                  padding="5px"
                  placeholderSize="14px"
                  fontSize="14px"
                  borderradius="5px"
                  type="text"
                  placeholder="권한명을 작성해주세요."
                  value={inputValue}
                  onChange={(e) => changeName(e)}
                />
              )}
            </InputWrapper>
          </SubTitleWrapper>
          <TableWrapper>
            {isClickedName ? (
              // 수정 테이블
              <>
                {!isPending && isSuccess ? (
                  <table className="authority_table">
                    <thead>
                      <tr>
                        <th colSpan={2}>권한</th>
                        <th>편집</th>
                        <th>관리</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td rowSpan={3}>콘텐츠 제작</td>
                        {/* <td>전체</td>
                    <td>
                      <label htmlFor={'isEditCreateChecked'}>
                        <input
                          type="checkbox"
                          name={'isEditCreateChecked'}
                          id={'isEditCreateChecked'}
                          value={0}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[0].checked}
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'isManageCreateChecked'}>
                        <input
                          type="checkbox"
                          name={'isManageCreateChecked'}
                          id={'isManageCreateChecked'}
                          value={1}
                          onChange={(e) => handleChecked(e)}
                          disabled={!checkList[0].checked}
                          checked={checkList[1].checked}
                        />
                      </label>
                    </td> */}
                        {/* </tr>
                  <tr> */}
                      </tr>
                      <tr>
                        <td>문항</td>
                        <td>
                          <label htmlFor={'QE_isEdit'}>
                            <input
                              type="checkbox"
                              name={'QE_isEdit'}
                              id={'QE_isEdit'}
                              value={2}
                              onChange={(e) => handleChecked(e)}
                              checked={checkList[2].checked}
                            />
                          </label>
                        </td>
                        <td>
                          <label htmlFor={'QE_isManage'}>
                            <input
                              type="checkbox"
                              name={'QE_isManage'}
                              id={'QE_isManage'}
                              value={3}
                              onChange={(e) => handleChecked(e)}
                              checked={checkList[3].checked}
                              disabled={!checkList[2].checked}
                            />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>학습지</td>
                        <td>
                          <label htmlFor={'WE_isEdit'}>
                            <input
                              type="checkbox"
                              name={'WE_isEdit'}
                              id={'WE_isEdit'}
                              value={4}
                              onChange={(e) => handleChecked(e)}
                              checked={checkList[4].checked}
                            />
                          </label>
                        </td>
                        <td>
                          <label htmlFor={'WE_isManage'}>
                            <input
                              type="checkbox"
                              name={'WE_isManage'}
                              id={'WE_isManage'}
                              value={5}
                              onChange={(e) => handleChecked(e)}
                              checked={checkList[5].checked}
                              disabled={!checkList[4].checked}
                            />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td rowSpan={4}>콘텐츠 관리</td>
                        {/* <td>전체</td>
                    <td>
                      <label htmlFor={'isEditManagementChecked'}>
                        <input
                          type="checkbox"
                          name={'isEditManagementChecked'}
                          id={'isEditManagementChecked'}
                          value={6}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[6].checked}
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'isManageManagementChecked'}>
                        <input
                          type="checkbox"
                          name={'isManageManagementChecked'}
                          id={'isManageManagementChecked'}
                          value={7}
                          onChange={(e) => handleChecked(e)}
                          disabled={!checkList[6].checked}
                          checked={checkList[7].checked}
                        />
                      </label>
                    </td> */}
                      </tr>
                      <tr>
                        <td>문항</td>
                        <td>
                          <label htmlFor={'QM_isEdit'}>
                            <input
                              type="checkbox"
                              name={'QM_isEdit'}
                              id={'QM_isEdit'}
                              value={8}
                              onChange={(e) => handleChecked(e)}
                              checked={checkList[8].checked}
                            />
                          </label>
                        </td>
                        <td>
                          <label htmlFor={'QM_isManage'}>
                            <input
                              type="checkbox"
                              name={'QM_isManage'}
                              id={'QM_isManage'}
                              value={9}
                              onChange={(e) => handleChecked(e)}
                              checked={checkList[9].checked}
                              disabled={!checkList[8].checked}
                            />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>신고문항</td>
                        <td>
                          <label htmlFor={'RM_isEdit'}>
                            <input
                              type="checkbox"
                              name={'RM_isEdit'}
                              id={'RM_isEdit'}
                              value={10}
                              onChange={(e) => handleChecked(e)}
                              checked={checkList[10].checked}
                            />
                          </label>
                        </td>
                        <td>
                          <label htmlFor={'RM_isManage'}>
                            <input
                              type="checkbox"
                              name={'RM_isManage'}
                              id={'RM_isManage'}
                              value={11}
                              onChange={(e) => handleChecked(e)}
                              checked={checkList[11].checked}
                              disabled={!checkList[10].checked}
                            />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>검수관리</td>
                        <td>
                          <label htmlFor={'IM_isEdit'}>
                            <input
                              type="checkbox"
                              name={'IM_isEdit'}
                              id={'IM_isEdit'}
                              value={12}
                              onChange={(e) => handleChecked(e)}
                              checked={checkList[12].checked}
                            />
                          </label>
                        </td>
                        <td>
                          <label htmlFor={'IM_isManage'}>
                            <input
                              type="checkbox"
                              name={'IM_isManage'}
                              id={'IM_isManage'}
                              value={13}
                              onChange={(e) => handleChecked(e)}
                              checked={checkList[13].checked}
                              disabled={!checkList[12].checked}
                            />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td rowSpan={8}>운영 관리</td>
                        {/* <td>전체</td>
                    <td>
                      <label htmlFor={'isEditOperationChecked'}>
                        <input
                          type="checkbox"
                          name={'isEditOperationChecked'}
                          id={'isEditOperationChecked'}
                          value={14}
                          // onChange={(e) => handleChecked(e)}
                          // checked={checkList[14].checked}
                          disabled
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'isManageOperationChecked'}>
                        <input
                          type="checkbox"
                          name={'isManageOperationChecked'}
                          id={'isManageOperationChecked'}
                          value={15}
                          onChange={(e) => handleChecked(e)}
                          // disabled={!checkList[14].checked}
                          checked={checkList[15].checked}
                        />
                      </label>
                    </td> */}
                        {/* </tr>
                  <tr> */}
                      </tr>
                      <tr>
                        <td>회원관리</td>
                        <td>
                          <label htmlFor={'AM_isEdit'}>
                            <input
                              type="checkbox"
                              name={'AM_isEdit'}
                              id={'AM_isEdit'}
                              value={16}
                              // onChange={(e) => handleChecked(e)}
                              checked={checkList[16].checked}
                              disabled
                            />
                          </label>
                        </td>
                        <td>
                          <label htmlFor={'AM_isManage'}>
                            <input
                              type="checkbox"
                              name={'AM_isManage'}
                              id={'AM_isManage'}
                              value={17}
                              onChange={(e) => handleChecked(e)}
                              // disabled={!checkList[16].checked}
                              checked={checkList[17].checked}
                            />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>권한관리</td>
                        <td>
                          <label htmlFor={'PM_isEdit'}>
                            <input
                              type="checkbox"
                              name={'PM_isEdit'}
                              id={'PM_isEdit'}
                              value={18}
                              // onChange={(e) => handleChecked(e)}
                              checked={checkList[18].checked}
                              disabled
                            />
                          </label>
                        </td>
                        <td>
                          <label htmlFor={'PM_isManage'}>
                            <input
                              type="checkbox"
                              name={'PM_isManage'}
                              id={'PM_isManage'}
                              value={19}
                              onChange={(e) => handleChecked(e)}
                              // disabled={!checkList[18].checked}
                              checked={checkList[19].checked}
                            />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>프로세스관리</td>
                        <td>
                          <label htmlFor={'PSM_isEdit'}>
                            <input
                              type="checkbox"
                              name={'PSM_isEdit'}
                              id={'PSM_isEdit'}
                              value={20}
                              //onChange={(e) => handleChecked(e)}
                              checked={checkList[20].checked}
                              disabled
                            />
                          </label>
                        </td>
                        <td>
                          <label htmlFor={'PSM_isManage'}>
                            <input
                              type="checkbox"
                              name={'PSM_isManage'}
                              id={'PSM_isManage'}
                              value={21}
                              onChange={(e) => handleChecked(e)}
                              //disabled={!checkList[20].checked}
                              checked={checkList[21].checked}
                            />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>기업관리</td>
                        <td>
                          <label htmlFor={'COM_isEdit'}>
                            <input
                              type="checkbox"
                              name={'COM_isEdit'}
                              id={'COM_isEdit'}
                              value={22}
                              //onChange={(e) => handleChecked(e)}
                              checked={checkList[22].checked}
                              disabled
                            />
                          </label>
                        </td>
                        <td>
                          <label htmlFor={'COM_isManage'}>
                            <input
                              type="checkbox"
                              name={'COM_isManage'}
                              id={'COM_isManage'}
                              value={23}
                              onChange={(e) => handleChecked(e)}
                              //disabled={!checkList[22].checked}
                              checked={checkList[23].checked}
                            />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>메타정보관리</td>
                        <td>
                          <label htmlFor={'MIM_isEdit'}>
                            <input
                              type="checkbox"
                              name={'MIM_isEdit'}
                              id={'MIM_isEdit'}
                              value={24}
                              //onChange={(e) => handleChecked(e)}
                              checked={checkList[24].checked}
                              disabled
                            />
                          </label>
                        </td>
                        <td>
                          <label htmlFor={'MIM_isManage'}>
                            <input
                              type="checkbox"
                              name={'MIM_isManage'}
                              id={'MIM_isManage'}
                              value={25}
                              onChange={(e) => handleChecked(e)}
                              //disabled={!checkList[24].checked}
                              checked={checkList[25].checked}
                            />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>로그관리</td>
                        <td>
                          <label htmlFor={'LOM_isEdit'}>
                            <input
                              type="checkbox"
                              name={'LOM_isEdit'}
                              id={'LOM_isEdit'}
                              value={26}
                              //onChange={(e) => handleChecked(e)}
                              checked={checkList[26].checked}
                              disabled
                            />
                          </label>
                        </td>
                        <td>
                          <label htmlFor={'LOM_isManage'}>
                            <input
                              type="checkbox"
                              name={'LOM_isManage'}
                              id={'LOM_isManage'}
                              value={27}
                              onChange={(e) => handleChecked(e)}
                              //disabled={!checkList[26].checked}
                              checked={checkList[27].checked}
                            />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>통계관리</td>
                        <td>
                          <label htmlFor={'STM_isEdit'}>
                            <input
                              type="checkbox"
                              name={'STM_isEdit'}
                              id={'STM_isEdit'}
                              value={28}
                              //onChange={(e) => handleChecked(e)}
                              checked={checkList[28].checked}
                              disabled
                            />
                          </label>
                        </td>
                        <td>
                          <label htmlFor={'STM_isManage'}>
                            <input
                              type="checkbox"
                              name={'STM_isManage'}
                              id={'STM_isManage'}
                              value={29}
                              onChange={(e) => handleChecked(e)}
                              //disabled={!checkList[28].checked}
                              checked={checkList[29].checked}
                            />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td rowSpan={3}>메뉴 관리</td>
                        {/* <td>전체</td>
                    <td>
                      <label htmlFor={'isEditMenuChecked'}>
                        <input
                          type="checkbox"
                          name={'isEditCreateChecked'}
                          id={'isEditCreateChecked'}
                          value={30}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[30].checked}
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'isManageMenuChecked'}>
                        <input
                          type="checkbox"
                          name={'isManageCreateChecked'}
                          id={'isManageCreateChecked'}
                          value={31}
                          onChange={(e) => handleChecked(e)}
                          disabled={!checkList[30].checked}
                          checked={checkList[31].checked}
                        />
                      </label>
                    </td> */}
                        {/* </tr>
                  <tr> */}
                      </tr>
                      <tr>
                        <td>콘텐츠 제작 설정</td>
                        <td>
                          <label htmlFor={'CCC_isEdit'}>
                            <input
                              type="checkbox"
                              name={'CCC_isEdit'}
                              id={'CCC_isEdit'}
                              value={32}
                              //onChange={(e) => handleChecked(e)}
                              checked={checkList[32].checked}
                              disabled
                            />
                          </label>
                        </td>
                        <td>
                          <label htmlFor={'CCC_isManage'}>
                            <input
                              type="checkbox"
                              name={'CCC_isManage'}
                              id={'CCC_isManage'}
                              value={33}
                              onChange={(e) => handleChecked(e)}
                              checked={checkList[33].checked}
                              //disabled={!checkList[32].checked}
                            />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>콘텐츠 관리 설정</td>
                        <td>
                          <label htmlFor={'CMC_isEdit'}>
                            <input
                              type="checkbox"
                              name={'CMC_isEdit'}
                              id={'CMC_isEdit'}
                              value={34}
                              onChange={(e) => handleChecked(e)}
                              checked={checkList[34].checked}
                              disabled
                            />
                          </label>
                        </td>
                        <td>
                          <label htmlFor={'CMC_isManage'}>
                            <input
                              type="checkbox"
                              name={'CMC_isManage'}
                              id={'CMC_isManage'}
                              value={35}
                              onChange={(e) => handleChecked(e)}
                              checked={checkList[35].checked}
                              //disabled={!checkList[34].checked}
                            />
                          </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <LoaderWrapper>
                    <Loader />
                  </LoaderWrapper>
                )}
              </>
            ) : (
              // 등록 테이블
              <table>
                <thead>
                  <tr>
                    <th colSpan={2}>권한</th>
                    <th>편집</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan={3}>콘텐츠 제작</td>
                    {/* <td>전체</td>
                    <td>
                      <label htmlFor={'isEditCreateChecked'}>
                        <input
                          type="checkbox"
                          name={'isEditCreateChecked'}
                          id={'isEditCreateChecked'}
                          value={0}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[0].checked}
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'isManageCreateChecked'}>
                        <input
                          type="checkbox"
                          name={'isManageCreateChecked'}
                          id={'isManageCreateChecked'}
                          value={1}
                          onChange={(e) => handleChecked(e)}
                          disabled={!checkList[0].checked}
                          checked={checkList[1].checked}
                        />
                      </label>
                    </td> */}
                    {/* </tr>
                  <tr> */}
                  </tr>
                  <tr>
                    <td>문항</td>
                    <td>
                      <label htmlFor={'QE_isEdit'}>
                        <input
                          type="checkbox"
                          name={'QE_isEdit'}
                          id={'QE_isEdit'}
                          value={2}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[2].checked}
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'QE_isManage'}>
                        <input
                          type="checkbox"
                          name={'QE_isManage'}
                          id={'QE_isManage'}
                          value={3}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[3].checked}
                          disabled={!checkList[2].checked}
                        />
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>학습지</td>
                    <td>
                      <label htmlFor={'WE_isEdit'}>
                        <input
                          type="checkbox"
                          name={'WE_isEdit'}
                          id={'WE_isEdit'}
                          value={4}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[4].checked}
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'WE_isManage'}>
                        <input
                          type="checkbox"
                          name={'WE_isManage'}
                          id={'WE_isManage'}
                          value={5}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[5].checked}
                          disabled={!checkList[4].checked}
                        />
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan={4}>콘텐츠 관리</td>
                    {/* <td>전체</td>
                    <td>
                      <label htmlFor={'isEditManagementChecked'}>
                        <input
                          type="checkbox"
                          name={'isEditManagementChecked'}
                          id={'isEditManagementChecked'}
                          value={6}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[6].checked}
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'isManageManagementChecked'}>
                        <input
                          type="checkbox"
                          name={'isManageManagementChecked'}
                          id={'isManageManagementChecked'}
                          value={7}
                          onChange={(e) => handleChecked(e)}
                          disabled={!checkList[6].checked}
                          checked={checkList[7].checked}
                        />
                      </label>
                    </td> */}
                  </tr>
                  <tr>
                    <td>문항</td>
                    <td>
                      <label htmlFor={'QM_isEdit'}>
                        <input
                          type="checkbox"
                          name={'QM_isEdit'}
                          id={'QM_isEdit'}
                          value={8}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[8].checked}
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'QM_isManage'}>
                        <input
                          type="checkbox"
                          name={'QM_isManage'}
                          id={'QM_isManage'}
                          value={9}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[9].checked}
                          disabled={!checkList[8].checked}
                        />
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>신고문항</td>
                    <td>
                      <label htmlFor={'RM_isEdit'}>
                        <input
                          type="checkbox"
                          name={'RM_isEdit'}
                          id={'RM_isEdit'}
                          value={10}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[10].checked}
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'RM_isManage'}>
                        <input
                          type="checkbox"
                          name={'RM_isManage'}
                          id={'RM_isManage'}
                          value={11}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[11].checked}
                          disabled={!checkList[10].checked}
                        />
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>검수관리</td>
                    <td>
                      <label htmlFor={'IM_isEdit'}>
                        <input
                          type="checkbox"
                          name={'IM_isEdit'}
                          id={'IM_isEdit'}
                          value={12}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[12].checked}
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'IM_isManage'}>
                        <input
                          type="checkbox"
                          name={'IM_isManage'}
                          id={'IM_isManage'}
                          value={13}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[13].checked}
                          disabled={!checkList[12].checked}
                        />
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan={8}>운영 관리</td>
                    {/* <td>전체</td>
                    <td>
                      <label htmlFor={'isEditOperationChecked'}>
                        <input
                          type="checkbox"
                          name={'isEditOperationChecked'}
                          id={'isEditOperationChecked'}
                          value={14}
                          // onChange={(e) => handleChecked(e)}
                          // checked={checkList[14].checked}
                          disabled
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'isManageOperationChecked'}>
                        <input
                          type="checkbox"
                          name={'isManageOperationChecked'}
                          id={'isManageOperationChecked'}
                          value={15}
                          onChange={(e) => handleChecked(e)}
                          // disabled={!checkList[14].checked}
                          checked={checkList[15].checked}
                        />
                      </label>
                    </td> */}
                    {/* </tr>
                  <tr> */}
                  </tr>
                  <tr>
                    <td>회원관리</td>
                    <td>
                      <label htmlFor={'AM_isEdit'}>
                        <input
                          type="checkbox"
                          name={'AM_isEdit'}
                          id={'AM_isEdit'}
                          value={16}
                          // onChange={(e) => handleChecked(e)}
                          checked={checkList[16].checked}
                          disabled
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'AM_isManage'}>
                        <input
                          type="checkbox"
                          name={'AM_isManage'}
                          id={'AM_isManage'}
                          value={17}
                          onChange={(e) => handleChecked(e)}
                          // disabled={!checkList[16].checked}
                          checked={checkList[17].checked}
                        />
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>권한관리</td>
                    <td>
                      <label htmlFor={'PM_isEdit'}>
                        <input
                          type="checkbox"
                          name={'PM_isEdit'}
                          id={'PM_isEdit'}
                          value={18}
                          // onChange={(e) => handleChecked(e)}
                          checked={checkList[18].checked}
                          disabled
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'PM_isManage'}>
                        <input
                          type="checkbox"
                          name={'PM_isManage'}
                          id={'PM_isManage'}
                          value={19}
                          onChange={(e) => handleChecked(e)}
                          // disabled={!checkList[18].checked}
                          checked={checkList[19].checked}
                        />
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>프로세스관리</td>
                    <td>
                      <label htmlFor={'PSM_isEdit'}>
                        <input
                          type="checkbox"
                          name={'PSM_isEdit'}
                          id={'PSM_isEdit'}
                          value={20}
                          //onChange={(e) => handleChecked(e)}
                          checked={checkList[20].checked}
                          disabled
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'PSM_isManage'}>
                        <input
                          type="checkbox"
                          name={'PSM_isManage'}
                          id={'PSM_isManage'}
                          value={21}
                          onChange={(e) => handleChecked(e)}
                          //disabled={!checkList[20].checked}
                          checked={checkList[21].checked}
                        />
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>기업관리</td>
                    <td>
                      <label htmlFor={'COM_isEdit'}>
                        <input
                          type="checkbox"
                          name={'COM_isEdit'}
                          id={'COM_isEdit'}
                          value={22}
                          //onChange={(e) => handleChecked(e)}
                          checked={checkList[22].checked}
                          disabled
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'COM_isManage'}>
                        <input
                          type="checkbox"
                          name={'COM_isManage'}
                          id={'COM_isManage'}
                          value={23}
                          onChange={(e) => handleChecked(e)}
                          //disabled={!checkList[22].checked}
                          checked={checkList[23].checked}
                        />
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>메타정보관리</td>
                    <td>
                      <label htmlFor={'MIM_isEdit'}>
                        <input
                          type="checkbox"
                          name={'MIM_isEdit'}
                          id={'MIM_isEdit'}
                          value={24}
                          //onChange={(e) => handleChecked(e)}
                          checked={checkList[24].checked}
                          disabled
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'MIM_isManage'}>
                        <input
                          type="checkbox"
                          name={'MIM_isManage'}
                          id={'MIM_isManage'}
                          value={25}
                          onChange={(e) => handleChecked(e)}
                          //disabled={!checkList[24].checked}
                          checked={checkList[25].checked}
                        />
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>로그관리</td>
                    <td>
                      <label htmlFor={'LOM_isEdit'}>
                        <input
                          type="checkbox"
                          name={'LOM_isEdit'}
                          id={'LOM_isEdit'}
                          value={26}
                          //onChange={(e) => handleChecked(e)}
                          checked={checkList[26].checked}
                          disabled
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'LOM_isManage'}>
                        <input
                          type="checkbox"
                          name={'LOM_isManage'}
                          id={'LOM_isManage'}
                          value={27}
                          onChange={(e) => handleChecked(e)}
                          //disabled={!checkList[26].checked}
                          checked={checkList[27].checked}
                        />
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>통계관리</td>
                    <td>
                      <label htmlFor={'STM_isEdit'}>
                        <input
                          type="checkbox"
                          name={'STM_isEdit'}
                          id={'STM_isEdit'}
                          value={28}
                          //onChange={(e) => handleChecked(e)}
                          checked={checkList[28].checked}
                          disabled
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'STM_isManage'}>
                        <input
                          type="checkbox"
                          name={'STM_isManage'}
                          id={'STM_isManage'}
                          value={29}
                          onChange={(e) => handleChecked(e)}
                          //disabled={!checkList[28].checked}
                          checked={checkList[29].checked}
                        />
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan={3}>메뉴 관리</td>
                    {/* <td>전체</td>
                    <td>
                      <label htmlFor={'isEditMenuChecked'}>
                        <input
                          type="checkbox"
                          name={'isEditCreateChecked'}
                          id={'isEditCreateChecked'}
                          value={30}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[30].checked}
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'isManageMenuChecked'}>
                        <input
                          type="checkbox"
                          name={'isManageCreateChecked'}
                          id={'isManageCreateChecked'}
                          value={31}
                          onChange={(e) => handleChecked(e)}
                          disabled={!checkList[30].checked}
                          checked={checkList[31].checked}
                        />
                      </label>
                    </td> */}
                    {/* </tr>
                  <tr> */}
                  </tr>
                  <tr>
                    <td>콘텐츠 제작 설정</td>
                    <td>
                      <label htmlFor={'CCC_isEdit'}>
                        <input
                          type="checkbox"
                          name={'CCC_isEdit'}
                          id={'CCC_isEdit'}
                          value={32}
                          //onChange={(e) => handleChecked(e)}
                          checked={checkList[32].checked}
                          disabled
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'CCC_isManage'}>
                        <input
                          type="checkbox"
                          name={'CCC_isManage'}
                          id={'CCC_isManage'}
                          value={33}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[33].checked}
                          //disabled={!checkList[32].checked}
                        />
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>콘텐츠 관리 설정</td>
                    <td>
                      <label htmlFor={'CMC_isEdit'}>
                        <input
                          type="checkbox"
                          name={'CMC_isEdit'}
                          id={'CMC_isEdit'}
                          value={34}
                          //onChange={(e) => handleChecked(e)}
                          checked={checkList[34].checked}
                          disabled
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'CMC_isManage'}>
                        <input
                          type="checkbox"
                          name={'CMC_isManage'}
                          id={'CMC_isManage'}
                          value={35}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[35].checked}
                          //disabled={!checkList[34].checked}
                        />
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </TableWrapper>
          <ButtonWrapper>
            <Button
              buttonType="button"
              onClick={() => {
                openUpdateAlert();
              }}
              cursor
              $padding="10px"
              $margin="10px 0 0 0"
              height={'40px'}
              fontSize="14px"
              $filled
            >
              <span>{isClickedName ? '수정' : '저장'}</span>
            </Button>
            {isClickedName && (
              <Button
                buttonType="button"
                onClick={onCancel}
                cursor
                $padding="10px"
                $margin="10px 0 0 0"
                height={'40px'}
                fontSize="14px"
              >
                <span>취소</span>
              </Button>
            )}
          </ButtonWrapper>
        </ListWrapper>

        <ScrollWrapper>
          <PerfectScrollbar>
            <SubTitle className="center">등록 된 권한 목록</SubTitle>
            <AuthorityListWrapper>
              {authorityListData && (
                <>
                  {authorityList.length > 0 ? (
                    <>
                      {authorityList.map((el) => (
                        <AuthorityWrapper
                          key={`${el.idx} ${el.code} ${el.name}`}
                          onClick={() => {
                            clickMemberAuthority(el.code);
                            setInputValue(el.name);
                          }}
                        >
                          <AuthorityName
                            onClick={() => {
                              clickMemberAuthority(el.code);
                              setInputValue(el.name);
                            }}
                          >
                            <span className="ellipsis">{el.name}</span>
                          </AuthorityName>
                          <DeleteIconWrapper>
                            <BiSolidTrashAlt
                              onClick={() => {
                                setDeleteCodeValue(el.code);
                                setIsDeleteAuthority(true);
                                setIsUpdateAuthority(false);
                                setIsAlertOpen(true);
                              }}
                            />
                          </DeleteIconWrapper>
                        </AuthorityWrapper>
                      ))}
                    </>
                  ) : (
                    <>
                      <ValueNone textOnly info="등록된 권한이 없습니다" />
                    </>
                  )}
                </>
              )}
              {changeAuthorityisPending ||
                (createAuthorityIsPending && <Loader />)}
            </AuthorityListWrapper>
          </PerfectScrollbar>
        </ScrollWrapper>
      </Wrapper>
      {isDeleteAuthority && (
        <Alert
          isAlertOpen={isAlertOpen}
          description="권한을 삭제할 경우, 해당 권한의 아이디는 접속이 불가합니다."
          action="삭제"
          onClick={() => submitDelete()}
          onClose={() => setIsAlertOpen(false)}
        />
      )}
      {isUpdateAuthority && (
        <Alert
          isAlertOpen={isAlertOpen}
          description={
            isClickedName
              ? '권한을 수정 하시겠습니까?'
              : '권한을 생성 하시겠습니까?'
          }
          action={isClickedName ? '수정' : '생성'}
          onClick={() => submitAuthority()}
          onClose={() => setIsAlertOpen(false)}
        />
      )}
      {isCreateNameError && (
        <Alert
          isAlertOpen={isAlertOpen}
          notice
          description="권한명을 작성해주세요."
          onClose={() => setIsAlertOpen(false)}
        />
      )}
      {isCheckNullError && (
        <Alert
          isAlertOpen={isAlertOpen}
          notice
          description="권한을 선택해주세요."
          onClose={() => setIsAlertOpen(false)}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 40px;
  width: 100%;
`;
const Wrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(50% - 20px);
  position: relative;
  /* &::after {
    content: '';
    display: block;
    width: 1px;
    height: 300px;
    background-color: ${COLOR.BORDER_BLUE};
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
  } */
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 5px;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 800;
  width: 100%;
  text-align: left;
`;
const SubTitle = styled.span`
  font-weight: bold;
  color: ${COLOR.FONT_BLACK};
  font-size: 16px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  padding-top: 10px;

  &.center {
    padding: 10px 0;
    width: 100%;
    justify-content: center;
  }
`;
const SubTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;

  > span {
    display: flex;
    padding: 0;
    margin: 0;
    margin-right: 15px;
  }
`;
const InputWrapper = styled.div`
  border: 1px solid ${COLOR.SECONDARY};
  width: calc(100% - 100px);
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 5px;
  > div {
    width: 100%;
  }
`;

const TableWrapper = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    table-layout: fixed;

    tr {
    }
    th {
      border: 1px solid ${COLOR.SECONDARY};
      color: ${COLOR.SECONDARY};
      padding: 15px;
      font-size: 14px;
      font-weight: bold;
    }
    td {
      text-align: center;
      border: 1px solid ${COLOR.SECONDARY};
      padding: 15px;
      font-size: 13px;
      font-weight: 300;
    }
    .textLeft {
      text-align: left;
    }
  }
`;
const ScrollWrapper = styled.div`
  width: calc(50% - 20px);
  height: 580px;
  background-color: ${COLOR.LIGHT_GRAY};
`;

const AuthorityListWrapper = styled.div`
  width: 100%;
  height: fit-content;
  /* border-left: 1px solid ${COLOR.SECONDARY}; */
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  background-color: ${COLOR.LIGHT_GRAY};
  padding: 10px;
`;

const AuthorityWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  padding: 0 10px;
`;
const AuthorityName = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 10px;
  padding-right: 50px;
  border-radius: 5px;
  background-color: white;
  border: none;
  margin-right: 8px;
  cursor: pointer;
  font-weight: bold;
  position: relative;
  font-size: 14px;
  &::after {
    content: '| 수정';
    display: flex;
    font-size: 12px;
    position: absolute;
    right: 10px;
    color: ${COLOR.SELECT_BLUE};
  }

  &:hover {
    background-color: ${COLOR.SELECT_BLUE};
    color: white;
    &::after {
      content: '| 수정';
      color: ${COLOR.LIGHT_GRAY};
    }
  }
  > span {
    display: flex;
    text-align: left;
    width: 100%;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
const DeleteIconWrapper = styled.button`
  font-size: 12px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${COLOR.FONT_BLACK};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  color: #fff;
  /* background-color: transparent; */
  &:hover {
    background: ${COLOR.RED};
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 30px;
  margin-bottom: 100px;
  padding-left: calc(50% - 35px);
`;
