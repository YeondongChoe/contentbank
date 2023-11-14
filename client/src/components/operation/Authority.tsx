import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getCookie, setCookie } from '../../utils/ReactCookie';
import AuthorityTree from './AuthorityTree';
import NoticeAlert from '../../components/alert/NoticeAlert';
import SelectAlert from '../../components/alert/SelectAlert';
import { useRecoilState } from 'recoil';
import {
  editCreateContent,
  editCreateList,
  editCreateContentWorksheet,
  editManagementContent,
  editManagementList,
  editManagementTree,
  editOperation,
  editMember,
  editAuthority,
  manageCreateContent,
  manageCreateList,
  manageCreateContentWorksheet,
  manageManagementContent,
  manageManagementList,
  manageManagementTree,
  manageOperation,
  manageMember,
  manageAuthority,
  alertState,
} from '../../recoil/State';

import { Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type AuthorityListType = {
  seq: number;
  code: string;
  name: string;
  sort: number;
};

const Authority = () => {
  const [authorityList, setAuthorityList] = useState<AuthorityListType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [codeValue, setCodeValue] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useRecoilState(alertState);
  const [isPutAuthority, setIsPutAuthority] = useState(false);
  const [isCreateAuthority, setIsCreateAuthority] = useState(false);
  const [isCreateNameError, setIsCreateNameError] = useState(false);
  const [isPutNameError, setIsPutNameError] = useState(false);
  const [isDeleteAuthority, setIsDeleteAuthority] = useState(false);

  const [didMount, setDidMount] = useState(false);
  let mountCount = 1;

  /** 콘텐츠 제작 편집 체크 상태여부*/
  const [isEditCreateChecked, setIsEditCreateChecked] =
    useRecoilState<boolean>(editCreateContent);
  const [isEditCreateListChecked, setIsEditCreateListChecked] =
    useRecoilState<boolean>(editCreateList);
  const [isEditWorksheetChecked, setIsEditWorksheetChecked] =
    useRecoilState<boolean>(editCreateContentWorksheet);
  const [isEditManagementChecked, setIsEditManagementChecked] =
    useRecoilState<boolean>(editManagementContent);
  const [isEditManagementListChecked, setIsEditManagementListChecked] =
    useRecoilState<boolean>(editManagementList);
  const [isEditTreeChecked, setIsEditTreeChecked] =
    useRecoilState<boolean>(editManagementTree);
  const [isEditOperationChecked, setIsEditOperationChecked] =
    useRecoilState<boolean>(editOperation);
  const [isEditMemberChecked, setIsEditMemberChecked] =
    useRecoilState<boolean>(editMember);
  const [isEditAuthorityChecked, setIsEditAuthorityChecked] =
    useRecoilState<boolean>(editAuthority);
  const [isManageCreateChecked, setIsManageCreateChecked] =
    useRecoilState<boolean>(manageCreateContent);
  const [isManageCreateListChecked, setIsManageCreateListChecked] =
    useRecoilState<boolean>(manageCreateList);
  const [isManageWorksheetChecked, setIsManageWorksheetChecked] =
    useRecoilState<boolean>(manageCreateContentWorksheet);
  const [isManageManagementChecked, setIsManageManagementChecked] =
    useRecoilState<boolean>(manageManagementContent);
  const [isManageManagementListChecked, setIsManageManagementListChecked] =
    useRecoilState<boolean>(manageManagementList);
  const [isManageTreeChecked, setIsManageTreeChecked] =
    useRecoilState<boolean>(manageManagementTree);
  const [isManageOperationChecked, setIsManageOperationChecked] =
    useRecoilState<boolean>(manageOperation);
  const [isManageMemberChecked, setIsManageMemberChecked] =
    useRecoilState<boolean>(manageMember);
  const [isManageAuthorityChecked, setIsManageAuthorityChecked] =
    useRecoilState<boolean>(manageAuthority);

  const getAuthorityList = async () => {
    await axios
      .get('/auth-service/api/v1/authority', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.headers['authorization'] !== getCookie('accessToken')) {
            setCookie('accessToken', response.headers['authorization'], {
              path: '/',
              sameSite: 'strict',
              secure: false,
            });
          }
        }
        setAuthorityList(response.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const CreateAuthority = async () => {
    const data = {
      name: inputValue,
      permissions: [
        {
          code: 'CNC',
          edited: isEditCreateChecked,
          managed: isManageCreateChecked,
        },
        {
          code: 'CNC_Q',
          edited: isEditCreateListChecked,
          managed: isManageCreateListChecked,
        },
        {
          code: 'CNC_W',
          edited: isEditWorksheetChecked,
          managed: isManageWorksheetChecked,
        },
        {
          code: 'CNM',
          edited: isEditManagementChecked,
          managed: isManageManagementChecked,
        },
        {
          code: 'CNM_Q',
          edited: isEditManagementListChecked,
          managed: isManageManagementListChecked,
        },
        {
          code: 'CNM_T',
          edited: isEditTreeChecked,
          managed: isManageTreeChecked,
        },
        {
          code: 'OPM',
          edited: isEditOperationChecked,
          managed: isManageOperationChecked,
        },
        {
          code: 'OPM_M',
          edited: isEditMemberChecked,
          managed: isManageMemberChecked,
        },
        {
          code: 'OPM_R',
          edited: isEditAuthorityChecked,
          managed: isManageAuthorityChecked,
        },
      ],
    };
    try {
      const response = await axios.post(
        '/auth-service/api/v1/authority',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        },
      );
      if (response.status === 200) {
        if (response.headers['authorization'] !== getCookie('accessToken')) {
          setCookie('accessToken', response.headers['authorization'], {
            path: '/',
            sameSite: 'strict',
            secure: false,
          });
        }
        setIsAlertOpen(true);
        setIsCreateAuthority(true);
        setIsPutNameError(false);
        window.location.reload();
      }
    } catch (error) {
      setIsPutNameError(false);
      setIsCreateNameError(true);
      setIsAlertOpen(true);
    }
  };

  const getMemberAuthority = async (code: string) => {
    await axios
      .get(`/auth-service/api/v1/authority/${code}/permissions`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.headers['authorization'] !== getCookie('accessToken')) {
            setCookie('accessToken', response.headers['authorization'], {
              path: '/',
              sameSite: 'strict',
              secure: false,
            });
          }
        }
        setIsEditCreateChecked(response.data.data.permissions[0].edited);
        setIsManageCreateChecked(response.data.data.permissions[0].managed);
        setIsEditCreateListChecked(response.data.data.permissions[1].edited);
        setIsManageCreateListChecked(response.data.data.permissions[1].managed);
        setIsEditWorksheetChecked(response.data.data.permissions[2].edited);
        setIsManageWorksheetChecked(response.data.data.permissions[2].managed);
        setIsEditManagementChecked(response.data.data.permissions[3].edited);
        setIsManageManagementChecked(response.data.data.permissions[3].managed);
        setIsEditManagementListChecked(
          response.data.data.permissions[4].edited,
        );
        setIsManageManagementListChecked(
          response.data.data.permissions[4].managed,
        );
        setIsEditTreeChecked(response.data.data.permissions[5].edited);
        setIsManageTreeChecked(response.data.data.permissions[5].managed);
        setIsEditOperationChecked(response.data.data.permissions[6].edited);
        setIsManageOperationChecked(response.data.data.permissions[6].managed);
        setIsEditMemberChecked(response.data.data.permissions[7].edited);
        setIsManageMemberChecked(response.data.data.permissions[7].managed);
        setIsEditAuthorityChecked(response.data.data.permissions[8].edited);
        setIsManageAuthorityChecked(response.data.data.permissions[8].managed);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const putAuthority = async (code: string) => {
    const data = {
      name: inputValue,
      permissions: [
        {
          code: 'CNC',
          edited: isEditCreateChecked,
          managed: isManageCreateChecked,
        },
        {
          code: 'CNC_Q',
          edited: isEditCreateListChecked,
          managed: isManageCreateListChecked,
        },
        {
          code: 'CNC_W',
          edited: isEditWorksheetChecked,
          managed: isManageWorksheetChecked,
        },
        {
          code: 'CNM',
          edited: isEditManagementChecked,
          managed: isManageManagementChecked,
        },
        {
          code: 'CNM_Q',
          edited: isEditManagementListChecked,
          managed: isManageManagementListChecked,
        },
        {
          code: 'CNM_T',
          edited: isEditTreeChecked,
          managed: isManageTreeChecked,
        },
        {
          code: 'OPM',
          edited: isEditOperationChecked,
          managed: isManageOperationChecked,
        },
        {
          code: 'OPM_M',
          edited: isEditMemberChecked,
          managed: isManageMemberChecked,
        },
        {
          code: 'OPM_R',
          edited: isEditAuthorityChecked,
          managed: isManageAuthorityChecked,
        },
      ],
    };
    return await axios
      .put(`/auth-service/api/v1/authority/${code}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.headers['authorization'] !== getCookie('accessToken')) {
            setCookie('accessToken', response.headers['authorization'], {
              path: '/',
              sameSite: 'strict',
              secure: false,
            });
          }
        }
        setIsCreateNameError(false);
        setIsPutNameError(false);
        setIsAlertOpen(true);
        setIsPutAuthority(true);
      })
      .catch((error) => {
        setIsAlertOpen(true);
        setIsCreateNameError(false);
        setIsPutNameError(true);
      });
  };

  const handleDeleteClick = (code: string) => {
    setCodeValue(code);
    setIsCreateNameError(false);
    setIsPutAuthority(false);
    setIsAlertOpen(true);
    setIsDeleteAuthority(true);
  };

  const DeleteAuthority = async (code: string) => {
    try {
      const response = await axios.delete(
        `/auth-service/api/v1/authority/${code}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        },
      );
      if (response.status === 200) {
        if (response.headers['authorization'] !== getCookie('accessToken')) {
          setCookie('accessToken', response.headers['authorization'], {
            path: '/',
            sameSite: 'strict',
            secure: false,
          });
        }
        setIsAlertOpen(false);
        window.location.reload();
      }
    } catch (error: unknown) {
      alert(error);
    }
  };

  useEffect(() => {
    mountCount++;
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      getAuthorityList();
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
              <S.input
                type="text"
                placeholder="권한명을 작성해주세요."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              ></S.input>
            </S.inputWrapper>
            <S.btnWrapper>
              <StyledSaveBtn variant="contained" onClick={CreateAuthority}>
                저장
              </StyledSaveBtn>
            </S.btnWrapper>
          </S.searchbarWarrper>
          <S.authorityMenuContainer>
            {authorityList?.map((el, i) => (
              <S.authorityWrapper key={i}>
                <S.authorityMenuWrapper>
                  <S.authorityMenu
                    onClick={() => {
                      getMemberAuthority(el.code);
                      setInputValue(el.name);
                    }}
                  >
                    {el.name}
                  </S.authorityMenu>
                  <S.iconWrapper>
                    <DeleteForeverIcon
                      onClick={() => {
                        handleDeleteClick(el.code);
                        //DeleteAuthority(el.code);
                      }}
                    />
                  </S.iconWrapper>
                </S.authorityMenuWrapper>
                <S.Btnwrapper>
                  <StyledEditBtn
                    variant="outlined"
                    onClick={() => putAuthority(el.code)}
                  >
                    수정
                  </StyledEditBtn>
                </S.Btnwrapper>
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
          onClick={() => DeleteAuthority(codeValue)}
        />
      )}
      {isCreateAuthority && <NoticeAlert title="권한이 생성되었습니다." />}
      {isPutAuthority && <NoticeAlert title="권한이 수정되었습니다." />}
      {isCreateNameError && <NoticeAlert title="권한명을 작성해주세요." />}
      {isPutNameError && <NoticeAlert title="수정할 권한을 선택해주세요." />}
    </S.main>
  );
};

const S = {
  main: styled.main`
    width: 100vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 50px;
  `,
  WholeContainer: styled.div`
    width: 1280px;
    height: 600px;
    display: flex;
    justify-content: space-around;
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
  `,
  authorityMenu: styled.div`
    display: flex;
    width: 80%;
    cursor: default;
    &:hover {
      background-color: #422afb;
      border-top: 1px solid #a3aed0;
      border-bottom: 1px solid #a3aed0;
      color: white;
    }
  `,
  iconWrapper: styled.div`
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
  `,
  Btnwrapper: styled.div``,
};

const StyledSaveBtn = styled(Button)`
  && {
    height: 30px;
    width: 80px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;
const StyledEditBtn = styled(Button)`
  && {
    border-radius: 5px;
    font-size: 11px;
    line-height: normal;
  }
`;

export default Authority;
