import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NoticeAlert } from '../../components/alert/NoticeAlert';
import { SelectAlert } from '../../components/alert/SelectAlert';
import { Controller, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
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
} from '../../state/authorityAtom';
import { AuthorityTree } from './AuthorityTree';
import { alertBoolAtom } from '../../state/utilAtom';
import { getAuthorityList, getMemberAuthority } from '../../api/getAxios';
import { postCreateAuthority } from '../../api/postAxios';
import { DeleteAuthority } from '../../api/deleteAxios';

import { Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type authorityListProps = {
  seq: number;
  code: string;
  name: string;
  sort: number;
};

export function Authority() {
  const { control } = useForm();
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
  let mountCount = 1;

  /** 콘텐츠 제작 편집 체크 상태여부*/
  const [isEditCreateChecked, setIsEditCreateChecked] = useRecoilState<boolean>(
    editCreateContentBool,
  );
  const [isEditCreateListChecked, setIsEditCreateListChecked] =
    useRecoilState<boolean>(editCreateListBool);
  const [isEditWorksheetChecked, setIsEditWorksheetChecked] =
    useRecoilState<boolean>(editCreateContentWorksheetBool);
  const [isEditManagementChecked, setIsEditManagementChecked] =
    useRecoilState<boolean>(editManagementContentBool);
  const [isEditManagementListChecked, setIsEditManagementListChecked] =
    useRecoilState<boolean>(editManagementListBool);
  const [isEditTreeChecked, setIsEditTreeChecked] = useRecoilState<boolean>(
    editManagementTreeBool,
  );
  const [isEditOperationChecked, setIsEditOperationChecked] =
    useRecoilState<boolean>(editOperationBoolAtom);
  const [isEditMemberChecked, setIsEditMemberChecked] =
    useRecoilState<boolean>(editMemberBoolAtom);
  const [isEditAuthorityChecked, setIsEditAuthorityChecked] =
    useRecoilState<boolean>(editAuthorityBoolAtom);
  const [isManageCreateChecked, setIsManageCreateChecked] =
    useRecoilState<boolean>(manageCreateContentBoolAtom);
  const [isManageCreateListChecked, setIsManageCreateListChecked] =
    useRecoilState<boolean>(manageCreateListBoolAtom);
  const [isManageWorksheetChecked, setIsManageWorksheetChecked] =
    useRecoilState<boolean>(manageCreateContentWorksheetBoolAtom);
  const [isManageManagementChecked, setIsManageManagementChecked] =
    useRecoilState<boolean>(manageManagementContentBoolAtom);
  const [isManageManagementListChecked, setIsManageManagementListChecked] =
    useRecoilState<boolean>(manageManagementListBoolAtom);
  const [isManageTreeChecked, setIsManageTreeChecked] = useRecoilState<boolean>(
    manageManagementTreeBoolAtom,
  );
  const [isManageOperationChecked, setIsManageOperationChecked] =
    useRecoilState<boolean>(manageOperationBoolAtom);
  const [isManageMemberChecked, setIsManageMemberChecked] =
    useRecoilState<boolean>(manageMemberBoolAtom);
  const [isManageAuthorityChecked, setIsManageAuthorityChecked] =
    useRecoilState<boolean>(manageAuthorityBoolAtom);

  const submitAuthority = () => {
    postCreateAuthority({
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
    });
  };

  const openUpdateAlert = () => {
    if (inputValue === '') {
      setIsAlertOpen(true);
      setIsCreateNameError(true);
      setIsUpdateAuthority(false);
    } else if (inputValue) {
      setIsAlertOpen(true);
      setIsCreateNameError(false);
      setIsUpdateAuthority(true);
    }
  };

  const clickMemberAuthority = (code: string) => {
    getMemberAuthority(
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
      },
      code,
    );
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

  useEffect(() => {
    mountCount++;
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      getAuthorityList({
        setAuthorityList,
      });
    }
  }, [didMount, setAuthorityList]);

  return (
    <Container>
      <Wrapper>
        <TreeWrapper>
          <TreeMenuWrapper>
            <Menu>편집</Menu>
            <Menu>관리</Menu>
          </TreeMenuWrapper>
          <AuthorityTree />
        </TreeWrapper>
        <AuthorityMenuWrapper>
          <SearchBarWrapper>
            <InputWrapper>
              <Controller
                control={control}
                name="input"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="권한명을 작성해주세요."
                    value={field.value || inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      setIsClickedName(false);
                    }}
                  ></Input>
                )}
              />
            </InputWrapper>
            <StyledSaveBtn variant="contained" onClick={openUpdateAlert}>
              {isClickedName ? '수정' : '저장'}
            </StyledSaveBtn>
          </SearchBarWrapper>
          <AuthorityListWrapper>
            {authorityList?.map((el, i) => (
              <AuthorityWrapper key={i}>
                <AuthorityName
                  onClick={() => {
                    clickMemberAuthority(el.code);
                    setInputValue(el.name);
                    setIsClickedName(true);
                  }}
                >
                  {el.name}
                </AuthorityName>
                <DeleteIconWrapper>
                  <DeleteForeverIcon
                    onClick={() => {
                      openDeleteAlert(el.code);
                    }}
                  />
                </DeleteIconWrapper>
              </AuthorityWrapper>
            ))}
          </AuthorityListWrapper>
        </AuthorityMenuWrapper>
      </Wrapper>
      {isDeleteAuthority && (
        <SelectAlert
          title="권한을 삭제할 경우, "
          description="해당 권한의 아이디는 접속이 불가합니다."
          action="삭제"
          onClick={() => submitDelete(codeValue)}
        />
      )}
      {isUpdateAuthority && (
        <SelectAlert
          title={
            isClickedName
              ? '권한을 수정 하시겠습니까?'
              : '권한을 생성 하시겠습니까?'
          }
          action={isClickedName ? '수정' : '생성'}
          onClick={() => submitAuthority()}
        />
      )}
      {/* {isPutAuthority && <NoticeAlert title="권한이 수정되었습니다." />} */}
      {isCreateNameError && <NoticeAlert title="권한명을 작성해주세요." />}
      {/* {isPutNameError && <NoticeAlert title="수정할 권한을 선택해주세요." />} */}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
`;
const Wrapper = styled.div`
  height: 500px;
  display: flex;
  border-top: 1px solid #a3aed0;
  gap: 40px;
`;
const TreeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-right: 1px solid #a3aed0;
  padding: 10px;
`;
const TreeMenuWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px 90px 20px;
  gap: 10px;
`;
const Menu = styled.div``;
const AuthorityMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
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
`;
const Input = styled.input`
  width: 300px;
  height: 30px;
  outline: none;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid white;
  font-size: 14px;
  box-shadow: 0px 1px 10px -4px rgba(112, 144, 176, 0.8);
  &::placeholder {
    font-size: 14px;
  }
`;
const AuthorityListWrapper = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid #a3aed0;
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
    background-color: #422afb;
    border-top: 1px solid #a3aed0;
    border-bottom: 1px solid #a3aed0;
    color: white;
  }
`;
const AuthorityName = styled.div`
  cursor: pointer;
`;
const DeleteIconWrapper = styled.div`
  display: flex;
  cursor: pointer;
`;
const StyledSaveBtn = styled(Button)`
  && {
    width: 80px;
    height: 30px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;
