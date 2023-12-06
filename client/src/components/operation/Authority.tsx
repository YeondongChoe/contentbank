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

const Authority = () => {
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
    <S.main>
      <S.WholeContainer>
        <S.leftContainer>
          <S.leftTopBar>
            <S.manual>편집</S.manual>
            <S.manual>관리</S.manual>
          </S.leftTopBar>
          <AuthorityTree />
        </S.leftContainer>
        <S.rightContainer>
          <S.searchbarWarrper>
            <S.inputWrapper>
              <Controller
                control={control}
                name="input"
                defaultValue=""
                render={({ field }) => (
                  <S.input
                    type="text"
                    placeholder="권한명을 작성해주세요."
                    value={field.value || inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      setIsClickedName(false);
                    }}
                  ></S.input>
                )}
              />
            </S.inputWrapper>
            <S.btnWrapper>
              <StyledSaveBtn variant="contained" onClick={openUpdateAlert}>
                {isClickedName ? '수정' : '저장'}
              </StyledSaveBtn>
            </S.btnWrapper>
          </S.searchbarWarrper>
          <S.authorityMenuContainer>
            {authorityList?.map((el, i) => (
              <S.authorityWrapper key={i}>
                <S.authorityMenuWrapper>
                  <S.authorityMenu
                    onClick={() => {
                      clickMemberAuthority(el.code);
                      setInputValue(el.name);
                      setIsClickedName(true);
                    }}
                  >
                    {el.name}
                  </S.authorityMenu>
                  <S.iconWrapper>
                    <DeleteForeverIcon
                      onClick={() => {
                        openDeleteAlert(el.code);
                      }}
                    />
                  </S.iconWrapper>
                </S.authorityMenuWrapper>
              </S.authorityWrapper>
            ))}
          </S.authorityMenuContainer>
        </S.rightContainer>
      </S.WholeContainer>
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
    </S.main>
  );
};

const S = {
  main: styled.main`
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
  `,
  WholeContainer: styled.div`
    width: 1280px;
    height: 600px;
    display: flex;
    border-top: 1px solid #a3aed0;
  `,
  leftContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-right: 1px solid #a3aed0;
  `,
  leftTopBar: styled.div`
    width: 395px;
    display: flex;
    margin-top: 30px;
    margin-bottom: 20px;
    margin-left: 22px;
    gap: 10px;
    justify-content: flex-end;
  `,
  manual: styled.div``,
  editCheckbox: styled.input``,
  manageCheckbox: styled.input``,
  rightContainer: styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
  `,
  searchbarWarrper: styled.div`
    display: flex;
    justify-content: space-around;
  `,
  inputWrapper: styled.div`
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  input: styled.input`
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
  `,
  btnWrapper: styled.div`
    display: flex;
    align-items: center;
  `,
  authorityMenuContainer: styled.div`
    width: 400px;
    height: 400px;
    border: 1px solid #a3aed0;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
  `,
  authorityWrapper: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
  `,
  authorityMenuWrapper: styled.div`
    width: 100%;
    display: flex;
    &:hover {
      background-color: #422afb;
      border-top: 1px solid #a3aed0;
      border-bottom: 1px solid #a3aed0;
      color: white;
    }
  `,
  authorityMenu: styled.div`
    width: 100%;
    cursor: pointer;
  `,
  iconWrapper: styled.div`
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
  `,
};

const StyledSaveBtn = styled(Button)`
  && {
    width: 80px;
    height: 30px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;

export { Authority };
