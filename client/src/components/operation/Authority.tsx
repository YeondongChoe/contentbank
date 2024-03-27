import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';

import { BiSolidTrashAlt } from 'react-icons/bi';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { DeleteAuthority } from '../../api/deleteAxios';
// import { getAuthorityList, getMemberAuthority } from '../../api/getAxios';
import { postCreateAuthority } from '../../api/postAxios';
import { Input } from '../../components';
import { Button } from '../../components/atom';
import { COLOR } from '../constants';
import { Alert } from '../molecules/alert/Alert';

type AuthorityListProps = {
  seq: number;
  code: string;
  name: string;
  sort: number;
};

export const defaultPermissions = [
  { key: 'isEditCreateChecked', checked: false },
  { key: 'isManageCreateChecked', checked: false },
  { key: 'isEditCreateListChecked', checked: false },
  { key: 'isManageCreateListChecked', checked: false },
  { key: 'isEditWorksheetChecked', checked: false },
  { key: 'isManageWorksheetChecked', checked: false },
  { key: 'isEditManagementChecked', checked: false },
  { key: 'isManageManagementChecked', checked: false },
  { key: 'isEditManagementListChecked', checked: false },
  { key: 'isManageManagementListChecked', checked: false },
  { key: 'isEditTreeChecked', checked: false },
  { key: 'isManageTreeChecked', checked: false },
  { key: 'isEditOperationChecked', checked: false },
  { key: 'isManageOperationChecked', checked: false },
  { key: 'isEditMemberChecked', checked: false },
  { key: 'isManageMemberChecked', checked: false },
  { key: 'isEditAuthorityChecked', checked: false },
  { key: 'isManageAuthorityChecked', checked: false },
];

export function Authority() {
  // const [checked, setChecked] = useState<boolean[]>([false]);

  // const { control } = useForm();
  const [authorityList, setAuthorityList] = useState<AuthorityListProps[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isClickedName, setIsClickedName] = useState(false);
  const [codeValue, setCodeValue] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isPutAuthority, setIsPutAuthority] = useState(false);
  const [isUpdateAuthority, setIsUpdateAuthority] = useState(false);
  const [isCreateNameError, setIsCreateNameError] = useState(false);
  const [isPutNameError, setIsPutNameError] = useState(false);
  const [isDeleteAuthority, setIsDeleteAuthority] = useState(false);

  const [didMount, setDidMount] = useState(false);

  const [checkList, setCheckList] = useState<
    {
      key: string;
      checked: boolean;
    }[]
  >(defaultPermissions);

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

  // const clickMemberAuthority = (code: string) => {
  //   getMemberAuthority(
  //     {
  //       setIsEditCreateChecked,
  //       setIsManageCreateChecked,
  //       setIsEditCreateListChecked,
  //       setIsManageCreateListChecked,
  //       setIsEditWorksheetChecked,
  //       setIsManageWorksheetChecked,
  //       setIsEditManagementChecked,
  //       setIsManageManagementChecked,
  //       setIsEditManagementListChecked,
  //       setIsManageManagementListChecked,
  //       setIsEditTreeChecked,
  //       setIsManageTreeChecked,
  //       setIsEditOperationChecked,
  //       setIsManageOperationChecked,
  //       setIsEditMemberChecked,
  //       setIsManageMemberChecked,
  //       setIsEditAuthorityChecked,
  //       setIsManageAuthorityChecked,
  //     },
  //     code,
  //   );
  // };

  const submitAuthority = () => {
    // postCreateAuthority({
    //   inputValue,
    //   isEditCreateChecked,
    //   isManageCreateChecked,
    //   isEditCreateListChecked,
    //   isManageCreateListChecked,
    //   isEditWorksheetChecked,
    //   isManageWorksheetChecked,
    //   isEditManagementChecked,
    //   isManageManagementChecked,
    //   isEditManagementListChecked,
    //   isManageManagementListChecked,
    //   isEditTreeChecked,
    //   isManageTreeChecked,
    //   isEditOperationChecked,
    //   isManageOperationChecked,
    //   isEditMemberChecked,
    //   isManageMemberChecked,
    //   isEditAuthorityChecked,
    //   isManageAuthorityChecked,
    // });
    setIsAlertOpen(false);
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
    });
    setCheckList([...onList]);

    //콘텐츠 제작
    // [0] 편집 전체 선택 토글 // 편집 선택false시 관리 체크 초기화
    if (target.id === 'isEditCreateChecked') {
      if (target.checked === true) {
        onList.splice(2, 1, {
          key: checkList[2].key,
          checked: true,
        });
        onList.splice(4, 1, {
          key: checkList[4].key,
          checked: true,
        });

        setCheckList([...onList]);
      }
      if (target.checked === false) {
        onList.splice(2, 1, {
          key: checkList[2].key,
          checked: false,
        });
        onList.splice(4, 1, {
          key: checkList[4].key,
          checked: false,
        });
        // 편집 false일시 관리도 false
        onList.splice(1, 1, {
          key: checkList[1].key,
          checked: false,
        });
        onList.splice(3, 1, {
          key: checkList[3].key,
          checked: false,
        });
        onList.splice(5, 1, {
          key: checkList[5].key,
          checked: false,
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
        });

        // 편집 false일시 관리도 false
        onList.splice(1, 1, {
          key: checkList[1].key,
          checked: false,
        });
        onList.splice(3, 1, {
          key: checkList[3].key,
          checked: false,
        });
        onList.splice(5, 1, {
          key: checkList[5].key,
          checked: false,
        });

        setCheckList([...onList]);
      }
      if (checkList[2].checked && checkList[4].checked) {
        onList.splice(0, 1, {
          key: target.id,
          checked: true,
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
        });
        onList.splice(5, 1, {
          key: checkList[5].key,
          checked: true,
        });
        setCheckList([...onList]);
        return;
      }
      if (Number(target.value) === 1 && target.checked === false) {
        onList.splice(3, 1, {
          key: checkList[3].key,
          checked: false,
        });
        onList.splice(5, 1, {
          key: checkList[5].key,
          checked: false,
        });
        setCheckList([...onList]);
        return;
      }
      if (Number(target.value) === 3 || Number(target.value) === 5) {
        if (target.checked === false) {
          onList.splice(1, 1, {
            key: checkList[1].key,
            checked: false,
          });
          setCheckList([...onList]);
          return;
        }
        if (checkList[3].checked && checkList[5].checked) {
          onList.splice(1, 1, {
            key: checkList[1].key,
            checked: true,
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
        });
        onList.splice(10, 1, {
          key: checkList[10].key,
          checked: true,
        });

        setCheckList([...onList]);
      }
      if (target.checked === false) {
        onList.splice(8, 1, {
          key: checkList[8].key,
          checked: false,
        });
        onList.splice(10, 1, {
          key: checkList[10].key,
          checked: false,
        });
        // 편집 false일시 관리도 false
        onList.splice(7, 1, {
          key: checkList[7].key,
          checked: false,
        });
        onList.splice(9, 1, {
          key: checkList[9].key,
          checked: false,
        });
        onList.splice(11, 1, {
          key: checkList[11].key,
          checked: false,
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
        });

        // 편집 false일시 관리도 false
        onList.splice(7, 1, {
          key: checkList[7].key,
          checked: false,
        });
        onList.splice(9, 1, {
          key: checkList[9].key,
          checked: false,
        });
        onList.splice(11, 1, {
          key: checkList[11].key,
          checked: false,
        });

        setCheckList([...onList]);
      }
      if (checkList[8].checked && checkList[10].checked) {
        onList.splice(6, 1, {
          key: target.id,
          checked: true,
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
        });
        onList.splice(11, 1, {
          key: checkList[11].key,
          checked: true,
        });
        setCheckList([...onList]);
        return;
      }
      if (Number(target.value) === 7 && target.checked === false) {
        onList.splice(9, 1, {
          key: checkList[9].key,
          checked: false,
        });
        onList.splice(11, 1, {
          key: checkList[11].key,
          checked: false,
        });
        setCheckList([...onList]);
        return;
      }
      if (Number(target.value) === 9 || Number(target.value) === 11) {
        if (target.checked === false) {
          onList.splice(7, 1, {
            key: checkList[7].key,
            checked: false,
          });
          setCheckList([...onList]);
          return;
        }
        if (checkList[9].checked && checkList[11].checked) {
          onList.splice(7, 1, {
            key: checkList[7].key,
            checked: true,
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
        });
        onList.splice(16, 1, {
          key: checkList[16].key,
          checked: true,
        });

        setCheckList([...onList]);
      }
      if (target.checked === false) {
        onList.splice(14, 1, {
          key: checkList[14].key,
          checked: false,
        });
        onList.splice(16, 1, {
          key: checkList[16].key,
          checked: false,
        });
        // 편집 false일시 관리도 false
        onList.splice(13, 1, {
          key: checkList[13].key,
          checked: false,
        });
        onList.splice(15, 1, {
          key: checkList[15].key,
          checked: false,
        });
        onList.splice(17, 1, {
          key: checkList[17].key,
          checked: false,
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
        });

        // 편집 false일시 관리도 false
        onList.splice(13, 1, {
          key: checkList[13].key,
          checked: false,
        });
        onList.splice(15, 1, {
          key: checkList[15].key,
          checked: false,
        });
        onList.splice(17, 1, {
          key: checkList[17].key,
          checked: false,
        });

        setCheckList([...onList]);
      }
      if (checkList[14].checked && checkList[16].checked) {
        onList.splice(12, 1, {
          key: target.id,
          checked: true,
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
        });
        onList.splice(17, 1, {
          key: checkList[17].key,
          checked: true,
        });
        setCheckList([...onList]);
        return;
      }
      if (Number(target.value) === 13 && target.checked === false) {
        onList.splice(15, 1, {
          key: checkList[15].key,
          checked: false,
        });
        onList.splice(17, 1, {
          key: checkList[17].key,
          checked: false,
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

  useEffect(() => {
    if (isClickedName === true) {
      // isClickedName상태값이 수정이고 데이터가 있을시 해당 데이터로
      loadData();
      // 불러온 체크박스 배열값넣기
      // setCheckList();
    }

    if (isClickedName === false) {
      // isClickedName상태값이 저장일시 디폴트 (defaultPermissions) 로
      setCheckList(defaultPermissions);
    }
  }, [isClickedName]);

  // const openDeleteAlert = (code: string) => {
  //   setCodeValue(code);
  //   setIsUpdateAuthority(false);
  //   setIsCreateNameError(false);
  //   setIsPutAuthority(false);
  //   setIsAlertOpen(true);
  //   setIsDeleteAuthority(true);
  // };

  const submitDelete = (code: string) => {
    // DeleteAuthority({ setIsAlertOpen }, code);
  };

  const loadData = useCallback(() => {
    // getAuthorityList({
    //   setAuthorityList,
    // });
  }, [setAuthorityList]);

  useEffect(() => {
    setDidMount(true);
  }, []);
  // 저장된 권한리스트 데이터 불러오기
  useEffect(() => {
    if (didMount) {
      loadData();
    }
  }, [didMount]);

  useEffect(() => {
    console.log(checkList);
  }, [checkList, setCheckList, handleChecked]);

  return (
    <Container>
      <Title>권한 관리</Title>
      <Wrapper>
        <InputWrapper>
          <Input
            height="40px"
            padding="5px"
            placeholderSize="14px"
            fontSize="14px"
            borderradius="5px"
            type="text"
            placeholder="권한명을 작성해주세요."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsClickedName(false);
            }}
          />
          <Button
            buttonType="button"
            onClick={openUpdateAlert}
            cursor
            $padding="10px"
            height={'40px'}
            width={'100px'}
            fontSize="12px"
            $filled
          >
            <span>{isClickedName ? '수정' : '저장'}</span>
          </Button>
        </InputWrapper>

        <ListWrapper>
          <TableWrapper>
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
          </TableWrapper>
          <AuthorityListWrapper>
            {/* {authorityList?.map((el, i) => (
              <AuthorityWrapper
                key={i}
                onClick={() => {
                  // clickMemberAuthority(el.code);
                  setInputValue(el.name);
                  setIsClickedName(true);
                }}
              >
                <AuthorityName
                  onClick={() => {
                    // clickMemberAuthority(el.code);
                    setInputValue(el.name);
                    setIsClickedName(true);
                  }}
                >
                  {el.name}
                </AuthorityName>
                <DeleteIconWrapper>
                  <BiSolidTrashAlt
                    onClick={() => {
                      // openDeleteAlert(el.code);
                    }}
                  />
                </DeleteIconWrapper>
              </AuthorityWrapper>
            ))} */}
          </AuthorityListWrapper>
        </ListWrapper>
      </Wrapper>
      {isDeleteAuthority && (
        <Alert
          isAlertOpen={isAlertOpen}
          description="권한을 삭제할 경우, 해당 권한의 아이디는 접속이 불가합니다."
          action="삭제"
          onClick={() => submitDelete(codeValue)}
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
  margin-top: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 10px;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 800;
  width: 100%;
  text-align: left;
`;
const ListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding-top: 10px;
`;

const InputWrapper = styled.div`
  border: 1px solid ${COLOR.SECONDARY};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 5px;
  padding: 5px;
  > div {
    width: 100%;
    margin-right: 10px;
  }
`;

const TableWrapper = styled.div`
  width: calc(50% - 20px);
  height: 500px;

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

const AuthorityListWrapper = styled.div`
  width: calc(50% - 20px);
  height: 500px;
  border: 1px solid ${COLOR.SECONDARY};
  background-color: white;
  display: flex;
  flex-direction: column;
`;
const AuthorityWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  &:hover {
    background-color: ${COLOR.SELECT_HOVER};
    color: white;
  }
`;
const AuthorityName = styled.div`
  //cursor: pointer;
`;
const DeleteIconWrapper = styled.div`
  font-size: 17px;
  cursor: pointer;
`;
