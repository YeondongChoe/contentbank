import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';

import { BiSolidTrashAlt } from 'react-icons/bi';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { DeleteAuthority } from '../../api/deleteAxios';
import { getAuthorityList, getMemberAuthority } from '../../api/getAxios';
import { postCreateAuthority } from '../../api/postAxios';
import { Input } from '../../components';
import { Button, IndexInfo } from '../../components/atom';
// import {
//   editCreateContentBool,
//   editCreateListBool,
//   editCreateContentWorksheetBool,
//   editManagementContentBool,
//   editManagementListBool,
//   editManagementTreeBool,
//   editOperationBoolAtom,
//   editMemberBoolAtom,
//   editAuthorityBoolAtom,
//   manageCreateContentBoolAtom,
//   manageCreateListBoolAtom,
//   manageCreateContentWorksheetBoolAtom,
//   manageManagementContentBoolAtom,
//   manageManagementListBoolAtom,
//   manageManagementTreeBoolAtom,
//   manageOperationBoolAtom,
//   manageMemberBoolAtom,
//   manageAuthorityBoolAtom,
// } from '../../store/authorityAtom';
import { alertBoolAtom } from '../../store/utilAtom';
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
  const [isAlertOpen, setIsAlertOpen] = useRecoilState(alertBoolAtom);
  const [isPutAuthority, setIsPutAuthority] = useState(false);
  const [isUpdateAuthority, setIsUpdateAuthority] = useState(false);
  const [isCreateNameError, setIsCreateNameError] = useState(false);
  const [isPutNameError, setIsPutNameError] = useState(false);
  const [isDeleteAuthority, setIsDeleteAuthority] = useState(false);

  const [didMount, setDidMount] = useState(false);
  const [checkList, setCheckList] = useState(defaultPermissions);

  /** 콘텐츠 제작 편집 체크 상태여부*/
  // const [isEditCreateChecked, setIsEditCreateChecked] = useRecoilState<boolean>(
  //   editCreateContentBool,
  // );
  // const [isEditCreateListChecked, setIsEditCreateListChecked] =
  //   useRecoilState<boolean>(editCreateListBool);
  // const [isEditWorksheetChecked, setIsEditWorksheetChecked] =
  //   useRecoilState<boolean>(editCreateContentWorksheetBool);
  // const [isEditManagementChecked, setIsEditManagementChecked] =
  //   useRecoilState<boolean>(editManagementContentBool);
  // const [isEditManagementListChecked, setIsEditManagementListChecked] =
  //   useRecoilState<boolean>(editManagementListBool);
  // const [isEditTreeChecked, setIsEditTreeChecked] = useRecoilState<boolean>(
  //   editManagementTreeBool,
  // );
  // const [isEditOperationChecked, setIsEditOperationChecked] =
  //   useRecoilState<boolean>(editOperationBoolAtom);
  // const [isEditMemberChecked, setIsEditMemberChecked] =
  //   useRecoilState<boolean>(editMemberBoolAtom);
  // const [isEditAuthorityChecked, setIsEditAuthorityChecked] =
  //   useRecoilState<boolean>(editAuthorityBoolAtom);
  // const [isManageCreateChecked, setIsManageCreateChecked] =
  //   useRecoilState<boolean>(manageCreateContentBoolAtom);
  // const [isManageCreateListChecked, setIsManageCreateListChecked] =
  //   useRecoilState<boolean>(manageCreateListBoolAtom);
  // const [isManageWorksheetChecked, setIsManageWorksheetChecked] =
  //   useRecoilState<boolean>(manageCreateContentWorksheetBoolAtom);
  // const [isManageManagementChecked, setIsManageManagementChecked] =
  //   useRecoilState<boolean>(manageManagementContentBoolAtom);
  // const [isManageManagementListChecked, setIsManageManagementListChecked] =
  //   useRecoilState<boolean>(manageManagementListBoolAtom);
  // const [isManageTreeChecked, setIsManageTreeChecked] = useRecoilState<boolean>(
  //   manageManagementTreeBoolAtom,
  // );
  // const [isManageOperationChecked, setIsManageOperationChecked] =
  //   useRecoilState<boolean>(manageOperationBoolAtom);
  // const [isManageMemberChecked, setIsManageMemberChecked] =
  //   useRecoilState<boolean>(manageMemberBoolAtom);
  // const [isManageAuthorityChecked, setIsManageAuthorityChecked] =
  //   useRecoilState<boolean>(manageAuthorityBoolAtom);

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
  };

  // 권한관리 체크박스 핸들러
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 체크박스 선택시 해당 배열값변경
    const onList = checkList;
    const target = e.currentTarget;
    console.log(target.id, target.checked, target.value);

    onList.splice(Number(target.value), 1, {
      key: target.id,
      checked: target.checked,
    });

    setCheckList([...onList]);

    if (target.id === 'isEditCreateChecked') {
      // [0] 편집 전체 선택 토글
      onList.splice(Number(target.value), 1, {
        key: target.id,
        checked: target.checked,
      });

      onList.splice(2, 1, {
        key: checkList[2].key,
        checked: !checkList[2].checked,
      });
      onList.splice(4, 1, {
        key: checkList[4].key,
        checked: !checkList[4].checked,
      });
      // if (!target.checked) {
      //   onList.splice(1, 1, { key: 'isManageCreateChecked', checked: false });
      // }
      setCheckList([...onList]);
      return;
    }
    if (target.id === 'isManageCreateChecked') {
      // [1] 관리 전체 선택 토글 -> 편집 선택 해제시 disabled
      onList.splice(1, 1, { key: target.id, checked: target.checked });
      onList.splice(2, 1, {
        key: checkList[3].key,
        checked: !checkList[3].checked,
      });
      onList.splice(5, 1, {
        key: checkList[5].key,
        checked: !checkList[5].checked,
      });
      setCheckList([...onList]);
      return;
    }

    // [2] 콘텐츠 제작 문항 편집 선택
    console.log(onList);
    // } else if (i === 6 || i === 8) {
    //   // 6 편집 전체 선택 토글
    //   // 8 관리 전체 선택 토글 -> 편집 선택 해제시 disabled
    // } else if (i === 12 || i === 13) {
    //   // 12 편집 전체 선택 토글
    //   // 13 관리 전체 선택 토글 -> 편집 선택 해제시 disabled
    // }

    // });
    // for (let i = 0; i < checkList.length; i++) {
    //   if (onList[i].key == target.id) {
    //     onList.splice(i, 1, { key: target.id, checked: target.checked });
    //     setCheckList([...onList]);
    //     return;
    //   }
    // }
  };

  // 전체 체크로직
  const handleAllCheck = (
    i: number,
    target: EventTarget & HTMLInputElement,
  ) => {};

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
      <IndexInfo list={['운영관리', '권한관리']} />
      <Wrapper>
        {/* <strong>권한 관리</strong> */}
        <InputWrapper>
          {/* <Controller
            control={control}
            name="input"
            defaultValue=""
            render={({ field }) => (
              <Input
                width="100%"
                height="30px"
                padding="5px"
                placeholderSize="14px"
                fontSize="14px"
                borderradius="5px"
                type="text"
                placeholder="권한명을 작성해주세요."
                value={field.value || inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setIsClickedName(false);
                }}
              />
            )}
          /> */}
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
            $padding="10px"
            height={'40px'}
            width={'100px'}
            fontSize="12px"
            $border
          >
            <span>{isClickedName ? '수정' : '저장'}</span>
          </Button>
        </InputWrapper>

        <ListWrap>
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
                        value={'isEditManagementChecked'}
                        onChange={(e) => handleChecked(e)}
                      />
                    </label>
                  </td>
                  <td>
                    <label htmlFor={'isManageManagementChecked'}>
                      <input
                        type="checkbox"
                        name={'isManageManagementChecked'}
                        id={'isManageManagementChecked'}
                        value={'isManageManagementChecked'}
                        onChange={(e) => handleChecked(e)}
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
                        value={'isEditManagementListChecked'}
                        onChange={(e) => handleChecked(e)}
                      />
                    </label>
                  </td>
                  <td>
                    <label htmlFor={'isManageManagementListChecked'}>
                      <input
                        type="checkbox"
                        name={'isManageManagementListChecked'}
                        id={'isManageManagementListChecked'}
                        value={'isManageManagementListChecked'}
                        onChange={(e) => handleChecked(e)}
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
                        value={'isEditTreeChecked'}
                        onChange={(e) => handleChecked(e)}
                      />
                    </label>
                  </td>
                  <td>
                    <label htmlFor={'isManageTreeChecked'}>
                      <input
                        type="checkbox"
                        name={'isManageTreeChecked'}
                        id={'isManageTreeChecked'}
                        value={'isManageTreeChecked'}
                        onChange={(e) => handleChecked(e)}
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
                        value={'isEditOperationChecked'}
                        onChange={(e) => handleChecked(e)}
                      />
                    </label>
                  </td>
                  <td>
                    <label htmlFor={'isManageOperationChecked'}>
                      <input
                        type="checkbox"
                        name={'isManageOperationChecked'}
                        id={'isManageOperationChecked'}
                        value={'isManageOperationChecked'}
                        onChange={(e) => handleChecked(e)}
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
                        value={'isEditMemberChecked'}
                        onChange={(e) => handleChecked(e)}
                      />
                    </label>
                  </td>
                  <td>
                    <label htmlFor={'isManageMemberChecked'}>
                      <input
                        type="checkbox"
                        name={'isManageMemberChecked'}
                        id={'isManageMemberChecked'}
                        value={'isManageMemberChecked'}
                        onChange={(e) => handleChecked(e)}
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
                        value={'isEditAuthorityChecked'}
                        onChange={(e) => handleChecked(e)}
                      />
                    </label>
                  </td>
                  <td>
                    <label htmlFor={'isManageAuthorityChecked'}>
                      <input
                        type="checkbox"
                        name={'isManageAuthorityChecked'}
                        id={'isManageAuthorityChecked'}
                        value={'isManageAuthorityChecked'}
                        onChange={(e) => handleChecked(e)}
                      />
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </TableWrapper>
          {/* <AuthorityTree /> */}

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
        </ListWrap>
      </Wrapper>
      {isDeleteAuthority && (
        <Alert
          title="권한을 삭제할 경우, "
          description="해당 권한의 아이디는 접속이 불가합니다."
          action="삭제"
          onClick={() => submitDelete(codeValue)}
        />
      )}
      {isUpdateAuthority && (
        <Alert
          title={
            isClickedName
              ? '권한을 수정 하시겠습니까?'
              : '권한을 생성 하시겠습니까?'
          }
          action={isClickedName ? '수정' : '생성'}
          onClick={submitAuthority}
        />
      )}
      {isCreateNameError && <Alert notice title="권한명을 작성해주세요." />}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;
const Wrapper = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-top: 1px solid ${COLOR.SECONDARY};
  padding-top: 10px;
`;
const ListWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding-top: 10px;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
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
