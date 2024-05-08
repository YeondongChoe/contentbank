import * as React from 'react';
import { useState, useEffect, useCallback, useReducer } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BiSolidTrashAlt } from 'react-icons/bi';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { redirect } from 'react-router-dom';
import styled from 'styled-components';

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
  { key: 'isEditTreeChecked', checked: false, menuCode: 'isEditTreeChecked' },
  {
    key: 'isManageTreeChecked',
    checked: false,
    menuCode: 'isManageTreeChecked',
  },
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
  { key: 'AM_isEdit', checked: false, menuCode: 'AM_isEdit' },
  { key: 'AM_isManage', checked: false, menuCode: 'AM_isManage' },
  { key: 'PM_isEdit', checked: false, menuCode: 'PM_isEdit' },
  { key: 'PM_isManage', checked: false, menuCode: 'PM_isManage' },
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
  const [isDeleteAuthority, setIsDeleteAuthority] = useState(false);

  const [checkList, setCheckList] =
    useState<PermissionInput[]>(defaultPermissions);
  const queryClient = useQueryClient();

  // 권한 리스트 불러오기 api
  const { data: authorityListData, refetch: authorityListDataRefetch } =
    useQuery({
      queryKey: ['get-authorityList'],
      queryFn: getAuthorityList,
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
  };
  useEffect(() => {
    // queryClient.invalidateQueries({
    //   queryKey: ['get-authority'],
    // });
    authorityDataRefetch();
  }, [codeValue, setCodeValue]);

  useEffect(() => {
    if (isSuccess && authorityData) {
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
    QE: { idx: 7, name: '문항 편집' },
    WE: { idx: 8, name: '학습지 편집' },
    QM: { idx: 9, name: '문항 관리' },
    AM: { idx: 11, name: '운영 관리' },
    PM: { idx: 12, name: '권한 관리' },
  };

  // 등록 수정시 서버 데이터 형식 맞추는 함수
  const createPermissions = (permissions: PermissionInput[]) => {
    const results: PermissionOutput[] = [];

    // 메뉴 매핑 정보를 기반으로 각 메뉴 코드에 대한 권한 설정
    Object.keys(menuMapping).forEach((code) => {
      const menuInfo = menuMapping[code];

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
    // console.log('checkList', checkList);
    const permissionList: PermissionOutput[] = createPermissions(checkList);
    setCodeUpdateList(permissionList);
    // console.log('permissionList', permissionList);

    if (isClickedName) {
      mutateChangeAuthority({
        name: inputValue,
        code: codeValue,
        permissionList: codeUpdateList,
      });
      return;
    }
    if (!isClickedName) {
      mutateCreateAuthority({
        name: inputValue,
        permissionList: codeUpdateList,
      });
      return;
    }
  };

  // 선택된 권한 수정하기 api
  const { data: changeAuthorityData, mutate: mutateChangeAuthority } =
    useMutation({
      mutationFn: putChangeAuthority,
      onError: (context: { response: { data: { message: string } } }) => {
        openToastifyAlert({
          type: 'error',
          text: context.response.data.message,
        });
      },
      onSuccess: (response: { data: { message: string } }) => {
        openToastifyAlert({
          type: 'success',
          text: response.data.message,
        });
        //초기화
        setIsAlertOpen(false);
        authorityListDataRefetch();
        setInputValue('');
        setCheckList([...defaultPermissions]);
        setIsClickedName(false);
      },
    });
  // 선택된 권한 생성하기 api
  const { data: createAuthorityData, mutate: mutateCreateAuthority } =
    useMutation({
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
        setIsAlertOpen(false);
        authorityListDataRefetch();
        authorityDataRefetch();
        setInputValue('');
        setCheckList([...defaultPermissions]);
        setIsClickedName(false);
      },
    });

  // 선택된 권한 삭제하기 api
  const { data: deleteAuthorityData, mutate: mutateDeleteAuthority } =
    useMutation({
      mutationFn: deleteAuthority,
      onError: (context: { response: { data: { message: string } } }) => {
        openToastifyAlert({
          type: 'error',
          text: context.response.data.message,
        });
      },
      onSuccess: (response: { data: { message: string } }) => {
        // console.log('deleteAuthorityData', response);
        openToastifyAlert({
          type: 'success',
          text: response.data.message,
        });
        //초기화
        authorityListDataRefetch();
        setInputValue('');
        setCheckList([...defaultPermissions]);
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
    if (target.id === 'isEditCreateChecked') {
      if (target.checked === true) {
        onList.splice(2, 1, {
          key: checkList[2].key,
          checked: true,
          menuCode: 'QE_isEdit',
        });
        onList.splice(4, 1, {
          key: checkList[4].key,
          checked: true,
          menuCode: 'WE_isEdit',
        });

        setCheckList([...onList]);
      }
      if (target.checked === false) {
        onList.splice(2, 1, {
          key: checkList[2].key,
          checked: false,
          menuCode: 'QE_isEdit',
        });
        onList.splice(4, 1, {
          key: checkList[4].key,
          checked: false,
          menuCode: 'WE_isEdit',
        });
        // 편집 false일시 관리도 false
        onList.splice(1, 1, {
          key: checkList[1].key,
          checked: false,
          menuCode: 'isManageCreateChecked',
        });
        onList.splice(3, 1, {
          key: checkList[3].key,
          checked: false,
          menuCode: 'QE_isManage',
        });
        onList.splice(5, 1, {
          key: checkList[5].key,
          checked: false,
          menuCode: 'WE_isManage',
        });

        setCheckList([...onList]);
      }
      return;
    }
    // [2][4] 문항 학습지 전체 체크 초기화
    if (Number(target.value) === 2 || Number(target.value) === 4) {
      if (target.checked === false) {
        onList.splice(0, 1, {
          key: target.id,
          checked: false,
          menuCode: 'isEditCreateChecked',
        });

        // 편집 false일시 관리도 false
        onList.splice(1, 1, {
          key: checkList[1].key,
          checked: false,
          menuCode: 'isManageCreateChecked',
        });
        onList.splice(3, 1, {
          key: checkList[3].key,
          checked: false,
          menuCode: 'QE_isManage',
        });
        onList.splice(5, 1, {
          key: checkList[5].key,
          checked: false,
          menuCode: 'WE_isManage',
        });

        setCheckList([...onList]);
      }
      if (checkList[2].checked && checkList[4].checked) {
        onList.splice(0, 1, {
          key: target.id,
          checked: true,
          menuCode: 'isEditCreateChecked',
        });

        setCheckList([...onList]);
      }
      return;
    }
    // [1][3][5] 관리 전체 선택 토글 또는 개별 선택
    if (
      Number(target.value) === 1 ||
      Number(target.value) === 3 ||
      Number(target.value) === 5
    ) {
      if (Number(target.value) === 1 && target.checked === true) {
        onList.splice(3, 1, {
          key: checkList[3].key,
          checked: true,
          menuCode: 'QE_isManage',
        });
        onList.splice(5, 1, {
          key: checkList[5].key,
          checked: true,
          menuCode: 'WE_isManage',
        });
        setCheckList([...onList]);
        return;
      }
      if (Number(target.value) === 1 && target.checked === false) {
        onList.splice(3, 1, {
          key: checkList[3].key,
          checked: false,
          menuCode: 'QE_isManage',
        });
        onList.splice(5, 1, {
          key: checkList[5].key,
          checked: false,
          menuCode: 'WE_isManage',
        });
        setCheckList([...onList]);
        return;
      }
      if (Number(target.value) === 3 || Number(target.value) === 5) {
        if (target.checked === false) {
          onList.splice(1, 1, {
            key: checkList[1].key,
            checked: false,
            menuCode: 'isManageCreateChecked',
          });
          setCheckList([...onList]);
          return;
        }
        if (checkList[3].checked && checkList[5].checked) {
          onList.splice(1, 1, {
            key: checkList[1].key,
            checked: true,
            menuCode: 'isManageCreateChecked',
          });
          setCheckList([...onList]);
          return;
        }
      }
    }

    //콘텐츠 관리
    // [6] 편집 전체 선택 토글 // 편집 선택false시 관리 체크 초기화
    if (target.id === 'isEditManagementChecked') {
      if (target.checked === true) {
        onList.splice(8, 1, {
          key: checkList[8].key,
          checked: true,
          menuCode: 'QM_isEdit',
        });
        onList.splice(10, 1, {
          key: checkList[10].key,
          checked: true,
          menuCode: 'isEditTreeChecked',
        });

        setCheckList([...onList]);
      }
      if (target.checked === false) {
        onList.splice(8, 1, {
          key: checkList[8].key,
          checked: false,
          menuCode: 'QM_isEdit',
        });
        onList.splice(10, 1, {
          key: checkList[10].key,
          checked: false,
          menuCode: 'isEditTreeChecked',
        });
        // 편집 false일시 관리도 false
        onList.splice(7, 1, {
          key: checkList[7].key,
          checked: false,
          menuCode: 'isManageManagementChecked',
        });
        onList.splice(9, 1, {
          key: checkList[9].key,
          checked: false,
          menuCode: 'QM_isManage',
        });
        onList.splice(11, 1, {
          key: checkList[11].key,
          checked: false,
          menuCode: 'isManageTreeChecked',
        });

        setCheckList([...onList]);
      }
      return;
    }
    // [8][10] 문항 학습지 전체 체크 초기화
    if (Number(target.value) === 8 || Number(target.value) === 10) {
      if (target.checked === false) {
        onList.splice(6, 1, {
          key: target.id,
          checked: false,
          menuCode: 'isEditManagementChecked',
        });

        // 편집 false일시 관리도 false
        onList.splice(7, 1, {
          key: checkList[7].key,
          checked: false,
          menuCode: 'isManageManagementChecked',
        });
        onList.splice(9, 1, {
          key: checkList[9].key,
          checked: false,
          menuCode: 'QM_isManage',
        });
        onList.splice(11, 1, {
          key: checkList[11].key,
          checked: false,
          menuCode: 'isManageTreeChecked',
        });

        setCheckList([...onList]);
      }
      if (checkList[8].checked && checkList[10].checked) {
        onList.splice(6, 1, {
          key: target.id,
          checked: true,
          menuCode: 'isEditManagementChecked',
        });

        setCheckList([...onList]);
      }
      return;
    }
    // [7][9][11] 관리 전체 선택 토글 또는 개별 선택
    if (
      Number(target.value) === 7 ||
      Number(target.value) === 9 ||
      Number(target.value) === 11
    ) {
      if (Number(target.value) === 7 && target.checked === true) {
        onList.splice(9, 1, {
          key: checkList[9].key,
          checked: true,
          menuCode: 'QM_isManage',
        });
        onList.splice(11, 1, {
          key: checkList[11].key,
          checked: true,
          menuCode: 'isManageTreeChecked',
        });
        setCheckList([...onList]);
        return;
      }
      if (Number(target.value) === 7 && target.checked === false) {
        onList.splice(9, 1, {
          key: checkList[9].key,
          checked: false,
          menuCode: 'QM_isManage',
        });
        onList.splice(11, 1, {
          key: checkList[11].key,
          checked: false,
          menuCode: 'isManageTreeChecked',
        });
        setCheckList([...onList]);
        return;
      }
      if (Number(target.value) === 9 || Number(target.value) === 11) {
        if (target.checked === false) {
          onList.splice(7, 1, {
            key: checkList[7].key,
            checked: false,
            menuCode: 'isManageManagementChecked',
          });
          setCheckList([...onList]);
          return;
        }
        if (checkList[9].checked && checkList[11].checked) {
          onList.splice(7, 1, {
            key: checkList[7].key,
            checked: true,
            menuCode: 'isManageManagementChecked',
          });
          setCheckList([...onList]);
          return;
        }
      }
    }

    //운영 관리
    // [12] 편집 전체 선택 토글 // 편집 선택false시 관리 체크 초기화
    if (target.id === 'isEditOperationChecked') {
      if (target.checked === true) {
        onList.splice(14, 1, {
          key: checkList[14].key,
          checked: true,
          menuCode: 'AM_isEdit',
        });
        onList.splice(16, 1, {
          key: checkList[16].key,
          checked: true,
          menuCode: 'PM_isEdit',
        });

        setCheckList([...onList]);
      }
      if (target.checked === false) {
        onList.splice(14, 1, {
          key: checkList[14].key,
          checked: false,
          menuCode: 'AM_isEdit',
        });
        onList.splice(16, 1, {
          key: checkList[16].key,
          checked: false,
          menuCode: 'PM_isEdit',
        });
        // 편집 false일시 관리도 false
        onList.splice(13, 1, {
          key: checkList[13].key,
          checked: false,
          menuCode: 'isManageOperationChecked',
        });
        onList.splice(15, 1, {
          key: checkList[15].key,
          checked: false,
          menuCode: 'AM_isManage',
        });
        onList.splice(17, 1, {
          key: checkList[17].key,
          checked: false,
          menuCode: 'PM_isManage',
        });

        setCheckList([...onList]);
      }
      return;
    }
    // [14][16] 문항 학습지 전체 체크 초기화
    if (Number(target.value) === 14 || Number(target.value) === 16) {
      if (target.checked === false) {
        onList.splice(12, 1, {
          key: target.id,
          checked: false,
          menuCode: 'isEditOperationChecked',
        });

        // 편집 false일시 관리도 false
        onList.splice(13, 1, {
          key: checkList[13].key,
          checked: false,
          menuCode: 'isManageOperationChecked',
        });
        onList.splice(15, 1, {
          key: checkList[15].key,
          checked: false,
          menuCode: 'AM_isManage',
        });
        onList.splice(17, 1, {
          key: checkList[17].key,
          checked: false,
          menuCode: 'PM_isManage',
        });

        setCheckList([...onList]);
      }
      if (checkList[14].checked && checkList[16].checked) {
        onList.splice(12, 1, {
          key: target.id,
          checked: true,
          menuCode: 'isEditOperationChecked',
        });

        setCheckList([...onList]);
      }
      return;
    }
    // [13][15][17] 관리 전체 선택 토글 또는 개별 선택
    if (
      Number(target.value) === 13 ||
      Number(target.value) === 15 ||
      Number(target.value) === 17
    ) {
      if (Number(target.value) === 13 && target.checked === true) {
        onList.splice(15, 1, {
          key: checkList[15].key,
          checked: true,
          menuCode: 'AM_isManage',
        });
        onList.splice(17, 1, {
          key: checkList[17].key,
          checked: true,
          menuCode: 'PM_isManage',
        });
        setCheckList([...onList]);
        return;
      }
      if (Number(target.value) === 13 && target.checked === false) {
        onList.splice(15, 1, {
          key: checkList[15].key,
          checked: false,
          menuCode: 'AM_isManage',
        });
        onList.splice(17, 1, {
          key: checkList[17].key,
          checked: false,
          menuCode: 'PM_isManage',
        });
        setCheckList([...onList]);
        return;
      }
      // if (Number(target.value) === 15 || Number(target.value) === 17) {
      //   if (target.checked === false) {
      //     onList.splice(13, 1, {
      //       key: checkList[13].key,
      //       checked: false,
      //     });
      //     setCheckList([...onList]);
      //     return;
      //   }
      //   if (checkList[15].checked && checkList[17].checked) {
      //     onList.splice(13, 1, {
      //       key: checkList[13].key,
      //       checked: true,
      //     });
      //     setCheckList([...onList]);
      //     return;
      //   }
      // }
    }
    // console.log(onList);
  };

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onCancel = () => {
    setIsClickedName(false);
    setInputValue('');
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
    // console.log('checkList');
    // console.log(checkList);
  }, [checkList, setCheckList]);

  const openUpdateAlert = () => {
    setIsAlertOpen(true);
    if (inputValue === '') {
      setIsCreateNameError(true);
      setIsUpdateAuthority(false);
    }
    if (inputValue) {
      setIsCreateNameError(false);
      setIsUpdateAuthority(true);
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
                        <td rowSpan={2}>콘텐츠 제작</td>
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
                        <td rowSpan={2}>콘텐츠 관리</td>
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
                      {/* <tr>
                    <td>문항트리</td>
                    <td>
                      <label htmlFor={'isEditTreeChecked'}>
                        <input
                          type="checkbox"
                          name={'isEditTreeChecked'}
                          id={'isEditTreeChecked'}
                          value={10}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[10].checked}
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'isManageTreeChecked'}>
                        <input
                          type="checkbox"
                          name={'isManageTreeChecked'}
                          id={'isManageTreeChecked'}
                          value={11}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[11].checked}
                          disabled={!checkList[10].checked}
                        />
                      </label>
                    </td>
                  </tr> */}
                      <tr>
                        <td rowSpan={2}>운영 관리</td>
                        {/* <td>전체</td>
                    <td>
                      <label htmlFor={'isEditOperationChecked'}>
                        <input
                          type="checkbox"
                          name={'isEditOperationChecked'}
                          id={'isEditOperationChecked'}
                          value={12}
                          // onChange={(e) => handleChecked(e)}
                          // checked={checkList[12].checked}
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
                          value={13}
                          onChange={(e) => handleChecked(e)}
                          // disabled={!checkList[12].checked}
                          checked={checkList[13].checked}
                        />
                      </label>
                    </td> */}
                        {/* </tr>
                  <tr> */}
                        <td>회원관리</td>
                        <td>
                          <label htmlFor={'AM_isEdit'}>
                            <input
                              type="checkbox"
                              name={'AM_isEdit'}
                              id={'AM_isEdit'}
                              value={14}
                              // onChange={(e) => handleChecked(e)}
                              // checked={checkList[14].checked}
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
                              value={15}
                              onChange={(e) => handleChecked(e)}
                              // disabled={!checkList[14].checked}
                              checked={checkList[15].checked}
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
                              value={16}
                              // onChange={(e) => handleChecked(e)}
                              // checked={checkList[16].checked}
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
                              value={17}
                              onChange={(e) => handleChecked(e)}
                              // disabled={!checkList[16].checked}
                              checked={checkList[17].checked}
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
                    <td rowSpan={2}>콘텐츠 제작</td>
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
                    <td rowSpan={2}>콘텐츠 관리</td>
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
                  {/* <tr>
									<td>문항트리</td>
									<td>
										<label htmlFor={'isEditTreeChecked'}>
											<input
												type="checkbox"
												name={'isEditTreeChecked'}
												id={'isEditTreeChecked'}
												value={10}
												onChange={(e) => handleChecked(e)}
												checked={checkList[10].checked}
											/>
										</label>
									</td>
									<td>
										<label htmlFor={'isManageTreeChecked'}>
											<input
												type="checkbox"
												name={'isManageTreeChecked'}
												id={'isManageTreeChecked'}
												value={11}
												onChange={(e) => handleChecked(e)}
												checked={checkList[11].checked}
												disabled={!checkList[10].checked}
											/>
										</label>
									</td>
								</tr> */}
                  <tr>
                    <td rowSpan={2}>운영 관리</td>
                    {/* <td>전체</td>
									<td>
										<label htmlFor={'isEditOperationChecked'}>
											<input
												type="checkbox"
												name={'isEditOperationChecked'}
												id={'isEditOperationChecked'}
												value={12}
												// onChange={(e) => handleChecked(e)}
												// checked={checkList[12].checked}
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
												value={13}
												onChange={(e) => handleChecked(e)}
												// disabled={!checkList[12].checked}
												checked={checkList[13].checked}
											/>
										</label>
									</td> */}
                    {/* </tr>
								<tr> */}
                    <td>회원관리</td>
                    <td>
                      <label htmlFor={'AM_isEdit'}>
                        <input
                          type="checkbox"
                          name={'AM_isEdit'}
                          id={'AM_isEdit'}
                          value={14}
                          // onChange={(e) => handleChecked(e)}
                          // checked={checkList[14].checked}
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
                          value={15}
                          onChange={(e) => handleChecked(e)}
                          // disabled={!checkList[14].checked}
                          checked={checkList[15].checked}
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
                          value={16}
                          // onChange={(e) => handleChecked(e)}
                          // checked={checkList[16].checked}
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
                          value={17}
                          onChange={(e) => handleChecked(e)}
                          // disabled={!checkList[16].checked}
                          checked={checkList[17].checked}
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
  max-width: 1000px;
`;
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(50% - 20px);
  position: relative;
  &::after {
    content: '';
    display: block;
    width: 1px;
    height: 300px;
    background-color: ${COLOR.BORDER_BLUE};
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
  }
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
      text-align: center;
      font-size: 13px;
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
  margin-right: 5px;
  cursor: pointer;
  font-weight: bold;
  position: relative;
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
