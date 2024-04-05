import * as React from 'react';
import { useState, useEffect, useCallback, useReducer } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { BiSolidTrashAlt } from 'react-icons/bi';
import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';

import { userInstance } from '../../api/axios';
import { Input } from '../../components';
import { Button, ValueNone, openToastifyAlert } from '../../components/atom';
import { ItemAuthorityType } from '../../types';
import { postRefreshToken } from '../../utils/tokenHandler';
import { COLOR } from '../constants';
import { Alert } from '../molecules/alert/Alert';

export const defaultPermissions = [
  { key: 'isEditCreateChecked', checked: false, valueIdx: 0 },
  { key: 'isManageCreateChecked', checked: false, valueIdx: 1 },
  { key: 'isEditCreateListChecked', checked: false, valueIdx: 2 },
  { key: 'isManageCreateListChecked', checked: false, valueIdx: 3 },
  { key: 'isEditWorksheetChecked', checked: false, valueIdx: 4 },
  { key: 'isManageWorksheetChecked', checked: false, valueIdx: 5 },
  { key: 'isEditManagementChecked', checked: false, valueIdx: 6 },
  { key: 'isManageManagementChecked', checked: false, valueIdx: 7 },
  { key: 'isEditManagementListChecked', checked: false, valueIdx: 8 },
  { key: 'isManageManagementListChecked', checked: false, valueIdx: 9 },
  { key: 'isEditTreeChecked', checked: false, valueIdx: 10 },
  { key: 'isManageTreeChecked', checked: false, valueIdx: 11 },
  { key: 'isEditOperationChecked', checked: false, valueIdx: 12 },
  { key: 'isManageOperationChecked', checked: false, valueIdx: 13 },
  { key: 'isEditMemberChecked', checked: false, valueIdx: 14 },
  { key: 'isManageMemberChecked', checked: false, valueIdx: 15 },
  { key: 'isEditAuthorityChecked', checked: false, valueIdx: 16 },
  { key: 'isManageAuthorityChecked', checked: false, valueIdx: 17 },
];

export function Authority() {
  const [authorityList, setAuthorityList] = useState<ItemAuthorityType[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isClickedName, setIsClickedName] = useState(false);
  const [codeValue, setCodeValue] = useState('');
  const [codeUpdateList, setCodeUpdateList] = useState<
    {
      idx: number;
      isEdit: 'Y' | 'N';
      isManage: 'Y' | 'N';
    }[]
  >([]);
  const [codeGetList, setCodeGetList] = useState<
    {
      idx: number;
      isEdit: boolean;
      isManage: boolean;
    }[]
  >([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isUpdateAuthority, setIsUpdateAuthority] = useState(false);
  const [isCreateNameError, setIsCreateNameError] = useState(false);

  const [isDeleteAuthority, setIsDeleteAuthority] = useState(false);

  const [checkList, setCheckList] = useState<
    {
      key: string;
      checked: boolean;
      valueIdx: number;
    }[]
  >(defaultPermissions);

  // 권한 셀렉트 불러오기 api
  const getAuthorityList = async () => {
    const res = await userInstance.get(`/v1/authority?idx=${9}`);
    return res;
  };
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
  useEffect(() => {
    updateAuthorityList();
  }, [authorityListData]);

  // 선택된 권한 불러오기 api
  const getAuthority = async () => {
    return await userInstance.get(`/v1/authority/${codeValue}`);
  };
  const {
    data: authorityData,
    isSuccess,
    refetch: authorityDataRefetch,
  } = useQuery({
    queryKey: ['get-authority'],
    queryFn: getAuthority,
    meta: {
      errorMessage: 'get-authority 에러 메세지',
    },
    enabled: codeValue !== '',
  });

  // 등록된 권한 데이터 불러올 시 체크박스에 맞춘 데이터로 변환
  const updatePermissions = (
    permissions: { idx: number; isEdit: boolean; isManage: boolean }[],
  ) => {
    const keys = [
      'isEditCreateChecked',
      'isManageCreateChecked',
      'isEditCreateListChecked',
      'isManageCreateListChecked',
      'isEditWorksheetChecked',
      'isManageWorksheetChecked',
      'isEditManagementChecked',
      'isManageManagementChecked',
      'isEditManagementListChecked',
      'isManageManagementListChecked',
      'isEditTreeChecked',
      'isManageTreeChecked',
      'isEditOperationChecked',
      'isManageOperationChecked',
      'isEditMemberChecked',
      'isManageMemberChecked',
      'isEditAuthorityChecked',
      'isManageAuthorityChecked',
    ];
    // 결과 배열 생성
    const result: { key: string; checked: boolean; valueIdx: number }[] = [];

    // permissions 배열 순회
    permissions.forEach((perm, index) => {
      // 결과 배열 길이가 18을 초과하지 않도록 확인
      if (result.length < 18) {
        result.push({
          key: keys[index * 2], // isEdit에 해당하는 key
          checked: perm.isEdit,
          valueIdx: index * 2,
        });
      }

      // 두 번째 push 조건 추가로 길이 체크
      if (result.length < 18) {
        result.push({
          key: keys[index * 2 + 1], // isManage에 해당하는 key
          checked: perm.isManage,
          valueIdx: index * 2 + 1,
        });
      }
    });

    return result;
  };

  //등록된 권한 이름 버튼
  const clickMemberAuthority = (code: string) => {
    setCodeValue(code);
    setIsClickedName(true);
    if (isSuccess && authorityData) {
      const updatedPermissions = updatePermissions(
        authorityData.data.data.permissionList,
      );
      setCheckList(updatedPermissions);
    }
  };

  useEffect(() => {
    authorityDataRefetch();
  }, [codeValue, setCodeValue]);

  // 등록 수정시 서버 데이터 형식 맞추는 함수
  const createPermissions = (
    permissions: { key: string; checked: boolean; valueIdx: number }[],
  ) => {
    // 결과를 저장할 임시 배열 생성
    const results: {
      idx: number;
      isEdit: 'Y' | 'N';
      isManage: 'Y' | 'N';
    }[] = permissions.map((permission, index) => ({
      idx: index + 1, // idx는 1부터 시작하여 순서대로 할당
      isEdit: 'N', // 초기값 'N'
      isManage: 'N', // 초기값 'N'
    }));

    // permissions 배열을 순회하면서 isEdit와 isManage 상태 설정
    permissions.forEach(({ key, checked, valueIdx }, index) => {
      // 'Edit' 권한 처리
      if (key.includes('Edit')) {
        results[index].isEdit = checked ? 'Y' : 'N';
      }

      // 'Manage' 권한 처리
      if (key.includes('Manage')) {
        results[index].isManage = checked ? 'Y' : 'N';
      }

      // idx 값이 7, 8, 9일 경우, isEdit를 isManage와 동일하게
      if ([6, 7, 8].includes(index)) {
        results[index].isEdit = results[index].isManage;
      }
    });

    return results;
  };

  // 등록 && 수정 버튼
  const submitAuthority = () => {
    const permissionList: {
      idx: number;
      isEdit: 'Y' | 'N';
      isManage: 'Y' | 'N';
    }[] = createPermissions(checkList);
    setCodeUpdateList(permissionList);
    console.log(permissionList);

    if (isClickedName) {
      mutateChangeAuthority();
      return;
    }
    if (!isClickedName) {
      mutateCreateAuthority();
      return;
    }
  };

  // 선택된 권한 수정하기 api
  const putChangeAuthority = async () => {
    const data = {
      name: inputValue,
      code: codeValue,
      permissionList: codeUpdateList,
    };
    const res = await userInstance.put(`/v1/authority`, data);
    console.log('fdsfdsf', res);
    return res;
  };
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
      },
    });
  // 선택된 권한 생성하기 api
  const postCreateAuthority = async () => {
    const data = {
      name: inputValue,
      permissionList: codeUpdateList,
    };
    const res = await userInstance.post(`/v1/authority`, data);
    return res;
  };
  const { data: createAuthorityData, mutate: mutateCreateAuthority } =
    useMutation({
      mutationFn: postCreateAuthority,
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
      },
    });

  useEffect(() => {}, [changeAuthorityData, createAuthorityData]);

  const submitDelete = () => {
    // DeleteAuthority({ setIsAlertOpen }, codeValue);
    // codeValue
  };

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
      valueIdx: Number(target.value),
    });
    setCheckList([...onList]);

    //콘텐츠 제작
    // [0] 편집 전체 선택 토글 // 편집 선택false시 관리 체크 초기화
    if (target.id === 'isEditCreateChecked') {
      if (target.checked === true) {
        onList.splice(2, 1, {
          key: checkList[2].key,
          checked: true,
          valueIdx: 2,
        });
        onList.splice(4, 1, {
          key: checkList[4].key,
          checked: true,
          valueIdx: 4,
        });

        setCheckList([...onList]);
      }
      if (target.checked === false) {
        onList.splice(2, 1, {
          key: checkList[2].key,
          checked: false,
          valueIdx: 2,
        });
        onList.splice(4, 1, {
          key: checkList[4].key,
          checked: false,
          valueIdx: 4,
        });
        // 편집 false일시 관리도 false
        onList.splice(1, 1, {
          key: checkList[1].key,
          checked: false,
          valueIdx: 1,
        });
        onList.splice(3, 1, {
          key: checkList[3].key,
          checked: false,
          valueIdx: 3,
        });
        onList.splice(5, 1, {
          key: checkList[5].key,
          checked: false,
          valueIdx: 5,
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
          valueIdx: 0,
        });

        // 편집 false일시 관리도 false
        onList.splice(1, 1, {
          key: checkList[1].key,
          checked: false,
          valueIdx: 1,
        });
        onList.splice(3, 1, {
          key: checkList[3].key,
          checked: false,
          valueIdx: 3,
        });
        onList.splice(5, 1, {
          key: checkList[5].key,
          checked: false,
          valueIdx: 5,
        });

        setCheckList([...onList]);
      }
      if (checkList[2].checked && checkList[4].checked) {
        onList.splice(0, 1, {
          key: target.id,
          checked: true,
          valueIdx: 0,
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
          valueIdx: 3,
        });
        onList.splice(5, 1, {
          key: checkList[5].key,
          checked: true,
          valueIdx: 5,
        });
        setCheckList([...onList]);
        return;
      }
      if (Number(target.value) === 1 && target.checked === false) {
        onList.splice(3, 1, {
          key: checkList[3].key,
          checked: false,
          valueIdx: 3,
        });
        onList.splice(5, 1, {
          key: checkList[5].key,
          checked: false,
          valueIdx: 5,
        });
        setCheckList([...onList]);
        return;
      }
      if (Number(target.value) === 3 || Number(target.value) === 5) {
        if (target.checked === false) {
          onList.splice(1, 1, {
            key: checkList[1].key,
            checked: false,
            valueIdx: 1,
          });
          setCheckList([...onList]);
          return;
        }
        if (checkList[3].checked && checkList[5].checked) {
          onList.splice(1, 1, {
            key: checkList[1].key,
            checked: true,
            valueIdx: 1,
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
          valueIdx: 8,
        });
        onList.splice(10, 1, {
          key: checkList[10].key,
          checked: true,
          valueIdx: 10,
        });

        setCheckList([...onList]);
      }
      if (target.checked === false) {
        onList.splice(8, 1, {
          key: checkList[8].key,
          checked: false,
          valueIdx: 8,
        });
        onList.splice(10, 1, {
          key: checkList[10].key,
          checked: false,
          valueIdx: 10,
        });
        // 편집 false일시 관리도 false
        onList.splice(7, 1, {
          key: checkList[7].key,
          checked: false,
          valueIdx: 7,
        });
        onList.splice(9, 1, {
          key: checkList[9].key,
          checked: false,
          valueIdx: 9,
        });
        onList.splice(11, 1, {
          key: checkList[11].key,
          checked: false,
          valueIdx: 11,
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
          valueIdx: 6,
        });

        // 편집 false일시 관리도 false
        onList.splice(7, 1, {
          key: checkList[7].key,
          checked: false,
          valueIdx: 7,
        });
        onList.splice(9, 1, {
          key: checkList[9].key,
          checked: false,
          valueIdx: 9,
        });
        onList.splice(11, 1, {
          key: checkList[11].key,
          checked: false,
          valueIdx: 11,
        });

        setCheckList([...onList]);
      }
      if (checkList[8].checked && checkList[10].checked) {
        onList.splice(6, 1, {
          key: target.id,
          checked: true,
          valueIdx: 6,
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
          valueIdx: 9,
        });
        onList.splice(11, 1, {
          key: checkList[11].key,
          checked: true,
          valueIdx: 11,
        });
        setCheckList([...onList]);
        return;
      }
      if (Number(target.value) === 7 && target.checked === false) {
        onList.splice(9, 1, {
          key: checkList[9].key,
          checked: false,
          valueIdx: 9,
        });
        onList.splice(11, 1, {
          key: checkList[11].key,
          checked: false,
          valueIdx: 11,
        });
        setCheckList([...onList]);
        return;
      }
      if (Number(target.value) === 9 || Number(target.value) === 11) {
        if (target.checked === false) {
          onList.splice(7, 1, {
            key: checkList[7].key,
            checked: false,
            valueIdx: 7,
          });
          setCheckList([...onList]);
          return;
        }
        if (checkList[9].checked && checkList[11].checked) {
          onList.splice(7, 1, {
            key: checkList[7].key,
            checked: true,
            valueIdx: 7,
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
          valueIdx: 14,
        });
        onList.splice(16, 1, {
          key: checkList[16].key,
          checked: true,
          valueIdx: 16,
        });

        setCheckList([...onList]);
      }
      if (target.checked === false) {
        onList.splice(14, 1, {
          key: checkList[14].key,
          checked: false,
          valueIdx: 14,
        });
        onList.splice(16, 1, {
          key: checkList[16].key,
          checked: false,
          valueIdx: 16,
        });
        // 편집 false일시 관리도 false
        onList.splice(13, 1, {
          key: checkList[13].key,
          checked: false,
          valueIdx: 13,
        });
        onList.splice(15, 1, {
          key: checkList[15].key,
          checked: false,
          valueIdx: 15,
        });
        onList.splice(17, 1, {
          key: checkList[17].key,
          checked: false,
          valueIdx: 17,
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
          valueIdx: 12,
        });

        // 편집 false일시 관리도 false
        onList.splice(13, 1, {
          key: checkList[13].key,
          checked: false,
          valueIdx: 13,
        });
        onList.splice(15, 1, {
          key: checkList[15].key,
          checked: false,
          valueIdx: 15,
        });
        onList.splice(17, 1, {
          key: checkList[17].key,
          checked: false,
          valueIdx: 17,
        });

        setCheckList([...onList]);
      }
      if (checkList[14].checked && checkList[16].checked) {
        onList.splice(12, 1, {
          key: target.id,
          checked: true,
          valueIdx: 12,
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
          valueIdx: 15,
        });
        onList.splice(17, 1, {
          key: checkList[17].key,
          checked: true,
          valueIdx: 17,
        });
        setCheckList([...onList]);
        return;
      }
      if (Number(target.value) === 13 && target.checked === false) {
        onList.splice(15, 1, {
          key: checkList[15].key,
          checked: false,
          valueIdx: 15,
        });
        onList.splice(17, 1, {
          key: checkList[17].key,
          checked: false,
          valueIdx: 17,
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
  useEffect(() => {}, [checkList]);

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
            {isClickedName && isSuccess ? (
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
                    <td>전체</td>
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
                    </td>
                  </tr>
                  <tr>
                    <td>문항</td>
                    <td>
                      <label htmlFor={'isEditCreateListChecked'}>
                        <input
                          type="checkbox"
                          name={'isEditCreateListChecked'}
                          id={'isEditCreateListChecked'}
                          value={2}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[2].checked}
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'isManageCreateListChecked'}>
                        <input
                          type="checkbox"
                          name={'isManageCreateListChecked'}
                          id={'isManageCreateListChecked'}
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
                      <label htmlFor={'isEditWorksheetChecked'}>
                        <input
                          type="checkbox"
                          name={'isEditWorksheetChecked'}
                          id={'isEditWorksheetChecked'}
                          value={4}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[4].checked}
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'isManageWorksheetChecked'}>
                        <input
                          type="checkbox"
                          name={'isManageWorksheetChecked'}
                          id={'isManageWorksheetChecked'}
                          value={5}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[5].checked}
                          disabled={!checkList[4].checked}
                        />
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan={3}>콘텐츠 관리</td>
                    <td>전체</td>
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
                    </td>
                  </tr>
                  <tr>
                    <td>문항</td>
                    <td>
                      <label htmlFor={'isEditManagementListChecked'}>
                        <input
                          type="checkbox"
                          name={'isEditManagementListChecked'}
                          id={'isEditManagementListChecked'}
                          value={8}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[8].checked}
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'isManageManagementListChecked'}>
                        <input
                          type="checkbox"
                          name={'isManageManagementListChecked'}
                          id={'isManageManagementListChecked'}
                          value={9}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[9].checked}
                          disabled={!checkList[8].checked}
                        />
                      </label>
                    </td>
                  </tr>
                  <tr>
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
                  </tr>
                  <tr>
                    <td rowSpan={3}>운영 관리</td>
                    <td>전체</td>
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
                    </td>
                  </tr>
                  <tr>
                    <td>회원관리</td>
                    <td>
                      <label htmlFor={'isEditMemberChecked'}>
                        <input
                          type="checkbox"
                          name={'isEditMemberChecked'}
                          id={'isEditMemberChecked'}
                          value={14}
                          // onChange={(e) => handleChecked(e)}
                          // checked={checkList[14].checked}
                          disabled
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'isManageMemberChecked'}>
                        <input
                          type="checkbox"
                          name={'isManageMemberChecked'}
                          id={'isManageMemberChecked'}
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
                      <label htmlFor={'isEditAuthorityChecked'}>
                        <input
                          type="checkbox"
                          name={'isEditAuthorityChecked'}
                          id={'isEditAuthorityChecked'}
                          value={16}
                          // onChange={(e) => handleChecked(e)}
                          // checked={checkList[16].checked}
                          disabled
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'isManageAuthorityChecked'}>
                        <input
                          type="checkbox"
                          name={'isManageAuthorityChecked'}
                          id={'isManageAuthorityChecked'}
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
                    <td>전체</td>
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
                    </td>
                  </tr>
                  <tr>
                    <td>문항</td>
                    <td>
                      <label htmlFor={'isEditCreateListChecked'}>
                        <input
                          type="checkbox"
                          name={'isEditCreateListChecked'}
                          id={'isEditCreateListChecked'}
                          value={2}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[2].checked}
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'isManageCreateListChecked'}>
                        <input
                          type="checkbox"
                          name={'isManageCreateListChecked'}
                          id={'isManageCreateListChecked'}
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
                      <label htmlFor={'isEditWorksheetChecked'}>
                        <input
                          type="checkbox"
                          name={'isEditWorksheetChecked'}
                          id={'isEditWorksheetChecked'}
                          value={4}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[4].checked}
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'isManageWorksheetChecked'}>
                        <input
                          type="checkbox"
                          name={'isManageWorksheetChecked'}
                          id={'isManageWorksheetChecked'}
                          value={5}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[5].checked}
                          disabled={!checkList[4].checked}
                        />
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan={3}>콘텐츠 관리</td>
                    <td>전체</td>
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
                    </td>
                  </tr>
                  <tr>
                    <td>문항</td>
                    <td>
                      <label htmlFor={'isEditManagementListChecked'}>
                        <input
                          type="checkbox"
                          name={'isEditManagementListChecked'}
                          id={'isEditManagementListChecked'}
                          value={8}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[8].checked}
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'isManageManagementListChecked'}>
                        <input
                          type="checkbox"
                          name={'isManageManagementListChecked'}
                          id={'isManageManagementListChecked'}
                          value={9}
                          onChange={(e) => handleChecked(e)}
                          checked={checkList[9].checked}
                          disabled={!checkList[8].checked}
                        />
                      </label>
                    </td>
                  </tr>
                  <tr>
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
                  </tr>
                  <tr>
                    <td rowSpan={3}>운영 관리</td>
                    <td>전체</td>
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
                    </td>
                  </tr>
                  <tr>
                    <td>회원관리</td>
                    <td>
                      <label htmlFor={'isEditMemberChecked'}>
                        <input
                          type="checkbox"
                          name={'isEditMemberChecked'}
                          id={'isEditMemberChecked'}
                          value={14}
                          // onChange={(e) => handleChecked(e)}
                          // checked={checkList[14].checked}
                          disabled
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'isManageMemberChecked'}>
                        <input
                          type="checkbox"
                          name={'isManageMemberChecked'}
                          id={'isManageMemberChecked'}
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
                      <label htmlFor={'isEditAuthorityChecked'}>
                        <input
                          type="checkbox"
                          name={'isEditAuthorityChecked'}
                          id={'isEditAuthorityChecked'}
                          value={16}
                          // onChange={(e) => handleChecked(e)}
                          // checked={checkList[16].checked}
                          disabled
                        />
                      </label>
                    </td>
                    <td>
                      <label htmlFor={'isManageAuthorityChecked'}>
                        <input
                          type="checkbox"
                          name={'isManageAuthorityChecked'}
                          id={'isManageAuthorityChecked'}
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
                onClick={() => {
                  setIsClickedName(false);
                  setInputValue('');
                  authorityListDataRefetch();
                }}
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
                                // openDeleteAlert(el.code);
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
