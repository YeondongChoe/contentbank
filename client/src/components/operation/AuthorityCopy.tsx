import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';

import { BiSolidTrashAlt } from 'react-icons/bi';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { Input } from '..';
import { DeleteAuthority } from '../../api/deleteAxios';
import { getAuthorityList, getMemberAuthority } from '../../api/getAxios';
import { postCreateAuthority } from '../../api/postAxios';
import {
  editCreateContentBool,
  editCreateListBool,
  editCreateContentWorksheetBool,
  editManagementContentBool,
  editManagementListBool,
  editManagementTreeBool,
  editOperationBoolAtom,
  editMemberBoolAtom,
  editAuthorityBoolAtom,
  manageCreateContentBoolAtom,
  manageCreateListBoolAtom,
  manageCreateContentWorksheetBoolAtom,
  manageManagementContentBoolAtom,
  manageManagementListBoolAtom,
  manageManagementTreeBoolAtom,
  manageOperationBoolAtom,
  manageMemberBoolAtom,
  manageAuthorityBoolAtom,
} from '../../store/authorityAtom';
import { alertBoolAtom } from '../../store/utilAtom';
import { Button, IndexInfo } from '../atom';
import { COLOR } from '../constants';
import { Alert } from '../molecules/alert/Alert';

import { AuthorityTree } from './AuthorityTree';

type authorityListProps = {
  seq: number;
  code: string;
  name: string;
  sort: number;
};

export function Authority() {
  const [checked, setChecked] = useState<boolean[]>([false]);

  const [authorityList, setAuthorityList] = useState<authorityListProps[]>([]);
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
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    console.log(target.id, target.checked);
  };

  const openDeleteAlert = (code: string) => {
    setCodeValue(code);
    setIsUpdateAuthority(false);
    setIsCreateNameError(false);
    setIsPutAuthority(false);
    setIsAlertOpen(true);
    setIsDeleteAuthority(true);
  };

  const submitDelete = (code: string) => {
    DeleteAuthority({ setIsAlertOpen }, code);
  };

  const loadData = useCallback(() => {
    getAuthorityList({
      setAuthorityList,
    });
  }, [setAuthorityList]);

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      loadData();
    }
  }, [didMount]);

  return (
    <Container>
      <IndexInfo list={['운영관리', '권한관리']} />

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
  display: flex;
  flex-direction: column;
`;
const Wrapper = styled.div`
  margin-top: 40px;
  //height: 500px;
  display: flex;
  justify-content: space-evenly;
  border-top: 1px solid ${COLOR.SECONDARY};
  //gap: 40px;
`;
const TreeWrapper = styled.div`
  display: flex;
  align-items: center;
  //flex-direction: column;
  //background-color: white;
  border-right: 1px solid ${COLOR.SECONDARY};
  padding-right: 70px;
`;
const TableWrapper = styled.div`
  padding: 10px;

  table {
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

const AuthorityMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-top: 30px;
`;
const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;
const InputWrapper = styled.div`
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 10px -4px rgba(112, 144, 176, 0.8);
`;
const AuthorityListWrapper = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid ${COLOR.SECONDARY};
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 20px;
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
