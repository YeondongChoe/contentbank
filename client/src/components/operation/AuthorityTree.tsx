import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCookie, setCookie } from '../../utils/ReactCookie';
import { useRecoilState, useRecoilCallback } from 'recoil';

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
} from '../../recoil/State';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Checkbox from '@mui/material/Checkbox';

type MenuListType = {
  seq: number;
  code: string;
  depth: number;
  method: string;
  name: string;
  sort: number;
  type: string;
  url: null;
  enabled: boolean;
  children: [
    {
      seq: number;
      code: string;
      depth: number;
      method: string;
      name: string;
      sort: number;
      type: string;
      url: null;
      enabled: boolean;
      children: null;
    },
    {
      seq: number;
      code: string;
      depth: number;
      method: string;
      name: string;
      sort: number;
      type: string;
      url: null;
      enabled: boolean;
      children: null;
    },
  ];
};

const AuthorityTree: React.FC = () => {
  const [didMount, setDidMount] = useState(false);
  const [menuValue, setMenuValue] = useState<MenuListType[]>();
  const CreateContent = menuValue?.[0];
  const ManagementContent = menuValue?.[1];
  const Operation = menuValue?.[2];

  const navigate = useNavigate();

  let mountCount = 1;
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  /** 전체 편집, 하위 항목 체크 상태여부*/
  const [isEditAllChecked, setIsEditAllChecked] = useState<boolean>(false);

  /** 콘텐츠 제작 편집, 하위 항목 체크 상태여부*/
  const [isEditCreateChecked, setIsEditCreateChecked] =
    useRecoilState<boolean>(editCreateContent);
  const [isEditCreateListChecked, setIsEditCreateListChecked] =
    useRecoilState<boolean>(editCreateList);
  const [isEditWorksheetChecked, setIsEditWorksheetChecked] =
    useRecoilState<boolean>(editCreateContentWorksheet);

  /** 콘텐츠 관리 편집, 하위 항목 체크 상태여부*/
  const [isEditManagementChecked, setIsEditManagementChecked] =
    useRecoilState<boolean>(editManagementContent);
  const [isEditManagementListChecked, setIsEditManagementListChecked] =
    useRecoilState<boolean>(editManagementList);
  const [isEditTreeChecked, setIsEditTreeChecked] =
    useRecoilState<boolean>(editManagementTree);

  /** 운영 관리 편집, 하위 항목 체크 상태여부*/
  const [isEditOperationChecked, setIsEditOperationChecked] =
    useRecoilState<boolean>(editOperation);
  const [isEditMemberChecked, setIsEditMemberChecked] =
    useRecoilState<boolean>(editMember);
  const [isEditAuthorityChecked, setIsEditAuthorityChecked] =
    useRecoilState<boolean>(editAuthority);

  /** 전체 관리, 하위 항목 체크 상태여부*/
  const [isManageAllChecked, setIsManageAllChecked] = useState<boolean>(false);

  /** 콘텐츠 제작 관리, 하위 항목 체크 상태여부*/
  const [isManageCreateChecked, setIsManageCreateChecked] =
    useRecoilState<boolean>(manageCreateContent);
  const [isManageCreateListChecked, setIsManageCreateListChecked] =
    useRecoilState<boolean>(manageCreateList);
  const [isManageWorksheetChecked, setIsManageWorksheetChecked] =
    useRecoilState<boolean>(manageCreateContentWorksheet);

  /** 콘텐츠 관리 관리, 하위 항목 체크 상태여부*/
  const [isManageManagementChecked, setIsManageManagementChecked] =
    useRecoilState<boolean>(manageManagementContent);
  const [isManageManagementListChecked, setIsManageManagementListChecked] =
    useRecoilState<boolean>(manageManagementList);
  const [isManageTreeChecked, setIsManageTreeChecked] =
    useRecoilState<boolean>(manageManagementTree);

  /** 운영 관리 관리, 하위 항목 체크 상태여부*/
  const [isManageOperationChecked, setIsManageOperationChecked] =
    useRecoilState<boolean>(manageOperation);
  const [isManageMemberChecked, setIsManageMemberChecked] =
    useRecoilState<boolean>(manageMember);
  const [isManageAuthorityChecked, setIsManageAuthorityChecked] =
    useRecoilState<boolean>(manageAuthority);

  /** 전체 편집 클릭*/
  const handleClickAllEdit = () => {
    setIsEditAllChecked((prevAllChecked) => {
      const newAllChecked = !prevAllChecked;
      setIsEditCreateChecked(newAllChecked);
      setIsEditCreateListChecked(newAllChecked);
      setIsEditWorksheetChecked(newAllChecked);
      setIsEditManagementChecked(newAllChecked);
      setIsEditManagementListChecked(newAllChecked);
      setIsEditTreeChecked(newAllChecked);
      setIsEditOperationChecked(newAllChecked);
      setIsEditMemberChecked(newAllChecked);
      setIsEditAuthorityChecked(newAllChecked);
      return newAllChecked;
    });
  };

  /** 콘텐츠 제작 편집 클릭*/
  const handleClickCreateEdit = () => {
    const newCreateChecked = isEditCreateChecked;
    const newCreateListChecked = isEditCreateListChecked;
    const newWorksheetChecked = isEditWorksheetChecked;

    if (newCreateListChecked === false && newWorksheetChecked === false) {
      setIsEditCreateChecked(true);
      setIsEditCreateListChecked(true);
      setIsEditWorksheetChecked(true);
    }
    if (
      newCreateChecked === true &&
      newCreateListChecked === true &&
      newWorksheetChecked === true
    ) {
      setIsEditCreateChecked(false);
      setIsEditCreateListChecked(false);
      setIsEditWorksheetChecked(false);
    } else if (newCreateListChecked === true || newWorksheetChecked === true) {
      setIsEditCreateChecked(true);
      setIsEditCreateListChecked(true);
      setIsEditWorksheetChecked(true);
    }
  };
  /** 콘텐츠 제작/문항 편집 클릭*/
  const handleClickListEdit = () => {
    setIsEditCreateListChecked((prevCreateListChecked) => {
      const newCreateListChecked = !prevCreateListChecked;
      return newCreateListChecked;
    });
  };

  /** 콘텐츠 제작/학습지 편집 클릭*/
  const handleClickWorksheetEdit = () => {
    setIsEditWorksheetChecked((prevCreateListChecked) => {
      const newCreateListChecked = !prevCreateListChecked;
      return newCreateListChecked;
    });
  };

  /** 콘텐츠 관리 편집 클릭*/
  const handleClickManagemantEdit = () => {
    const newManagementChecked = isEditManagementChecked;
    const newManagementListChecked = isEditManagementListChecked;
    const newTreeChecked = isEditTreeChecked;
    if (newManagementListChecked === false && newTreeChecked === false) {
      setIsEditManagementChecked(true);
      setIsEditManagementListChecked(true);
      setIsEditTreeChecked(true);
    }
    if (
      newManagementChecked === true &&
      newManagementListChecked === true &&
      newTreeChecked === true
    ) {
      setIsEditManagementChecked(false);
      setIsEditManagementListChecked(false);
      setIsEditTreeChecked(false);
    } else if (newManagementListChecked === true || newTreeChecked === true) {
      setIsEditManagementChecked(true);
      setIsEditManagementListChecked(true);
      setIsEditTreeChecked(true);
    }
  };
  /** 콘텐츠 관리/문항 편집 클릭*/
  const handleClickManagemantListEdit = () => {
    setIsEditManagementListChecked((prevCreateListChecked) => {
      const newCreateListChecked = !prevCreateListChecked;
      return newCreateListChecked;
    });
  };

  /** 콘텐츠 관리/트리 편집 클릭*/
  const handleClickTreeEdit = () => {
    setIsEditTreeChecked((prevCreateListChecked) => {
      const newCreateListChecked = !prevCreateListChecked;
      return newCreateListChecked;
    });
  };

  /** 운영 관리 편집 클릭*/
  const handleClickOperationEdit = () => {
    const newOperationChecked = isEditOperationChecked;
    const newMemberChecked = isEditMemberChecked;
    const newAuthorityChecked = isEditAuthorityChecked;
    if (newMemberChecked === false && newAuthorityChecked === false) {
      setIsEditOperationChecked(true);
      setIsEditMemberChecked(true);
      setIsEditAuthorityChecked(true);
    }
    if (
      newOperationChecked === true &&
      newMemberChecked === true &&
      newAuthorityChecked === true
    ) {
      setIsEditOperationChecked(false);
      setIsEditMemberChecked(false);
      setIsEditAuthorityChecked(false);
    } else if (newMemberChecked === true || newAuthorityChecked === true) {
      setIsEditOperationChecked(true);
      setIsEditMemberChecked(true);
      setIsEditAuthorityChecked(true);
    }
  };

  /** 운영 관리/회원 편집 클릭*/
  const handleClickMemberEdit = () => {
    setIsEditMemberChecked((prevCreateListChecked) => {
      const newCreateListChecked = !prevCreateListChecked;
      return newCreateListChecked;
    });
  };

  /** 운영 관리/권한 편집 클릭*/
  const handleClickAuthorityEdit = () => {
    setIsEditAuthorityChecked((prevCreateListChecked) => {
      const newCreateListChecked = !prevCreateListChecked;
      return newCreateListChecked;
    });
  };

  /** 전체 편집 선택 상태 업데이트 */
  useEffect(() => {
    if (
      isEditCreateChecked === true &&
      isEditManagementChecked === true &&
      isEditOperationChecked === true
    ) {
      setIsEditAllChecked(true);
    } else {
      setIsEditAllChecked(false);
    }
  }, [isEditCreateChecked, isEditManagementChecked, isEditOperationChecked]);

  /** 콘텐츠 제작 편집 상태 업데이트 */
  useEffect(() => {
    if (isEditCreateListChecked === true && isEditWorksheetChecked === true) {
      setIsEditCreateChecked(true);
    } else {
      setIsEditCreateChecked(false);
    }
  }, [isEditCreateListChecked, isEditWorksheetChecked]);

  /** 콘텐츠 관리 편집 상태 업데이트 */
  useEffect(() => {
    if (isEditManagementListChecked === true && isEditTreeChecked === true) {
      setIsEditManagementChecked(true);
    } else {
      setIsEditManagementChecked(false);
    }
  }, [isEditManagementListChecked, isEditTreeChecked]);

  /** 운영 관리 편집 상태 업데이트 */
  useEffect(() => {
    if (isEditMemberChecked === true && isEditAuthorityChecked === true) {
      setIsEditOperationChecked(true);
    } else {
      setIsEditOperationChecked(false);
    }
  }, [isEditMemberChecked, isEditAuthorityChecked]);

  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////

  /** 전체 관리 클릭*/
  const handleClickAllManage = () => {
    setIsManageAllChecked((prevAllChecked) => {
      const newAllChecked = !prevAllChecked;
      setIsManageCreateChecked(newAllChecked);
      setIsManageCreateListChecked(newAllChecked);
      setIsManageWorksheetChecked(newAllChecked);
      setIsManageManagementChecked(newAllChecked);
      setIsManageManagementListChecked(newAllChecked);
      setIsManageTreeChecked(newAllChecked);
      setIsManageOperationChecked(newAllChecked);
      setIsManageMemberChecked(newAllChecked);
      setIsManageAuthorityChecked(newAllChecked);
      return newAllChecked;
    });
  };

  /** 콘텐츠 제작 관리 클릭*/
  const handleClickCreateManage = () => {
    const newCreateChecked = isManageCreateChecked;
    const newCreateListChecked = isManageCreateListChecked;
    const newWorksheetChecked = isManageWorksheetChecked;

    if (newCreateListChecked === false && newWorksheetChecked === false) {
      setIsManageCreateChecked(true);
      setIsManageCreateListChecked(true);
      setIsManageWorksheetChecked(true);
    }
    if (
      newCreateChecked === true &&
      newCreateListChecked === true &&
      newWorksheetChecked === true
    ) {
      setIsManageCreateChecked(false);
      setIsManageCreateListChecked(false);
      setIsManageWorksheetChecked(false);
    } else if (newCreateListChecked === true || newWorksheetChecked === true) {
      setIsManageCreateChecked(true);
      setIsManageCreateListChecked(true);
      setIsManageWorksheetChecked(true);
    }
  };

  /** 콘텐츠 제작/문항 관리 클릭*/
  const handleClickListManage = () => {
    setIsManageCreateListChecked((prevCreateListChecked) => {
      const newCreateListChecked = !prevCreateListChecked;
      return newCreateListChecked;
    });
  };
  /** 콘텐츠 제작/학습지 관리 클릭*/
  const handleClickWorksheetManage = () => {
    setIsManageWorksheetChecked((prevCreateListChecked) => {
      const newCreateListChecked = !prevCreateListChecked;
      return newCreateListChecked;
    });
  };

  /** 콘텐츠 관리 관리 클릭*/
  const handleClickManagemantManage = () => {
    const newManagementChecked = isManageManagementChecked;
    const newManagementListChecked = isManageManagementListChecked;
    const newTreeChecked = isManageTreeChecked;

    if (newManagementListChecked === false && newTreeChecked === false) {
      setIsManageManagementChecked(true);
      setIsManageManagementListChecked(true);
      setIsManageTreeChecked(true);
    }
    if (
      newManagementChecked === true &&
      newManagementListChecked === true &&
      newTreeChecked === true
    ) {
      setIsManageManagementChecked(false);
      setIsManageManagementListChecked(false);
      setIsManageTreeChecked(false);
    } else if (newManagementListChecked === true || newTreeChecked === true) {
      setIsManageManagementChecked(true);
      setIsManageManagementListChecked(true);
      setIsManageTreeChecked(true);
    }
  };
  /** 콘텐츠 관리/문항 관리 클릭*/
  const handleClickManagemantListManage = () => {
    setIsManageManagementListChecked((prevCreateListChecked) => {
      const newCreateListChecked = !prevCreateListChecked;
      return newCreateListChecked;
    });
  };

  /** 콘텐츠 관리/트리 관리 클릭*/
  const handleClickTreeManage = () => {
    setIsManageTreeChecked((prevCreateListChecked) => {
      const newCreateListChecked = !prevCreateListChecked;
      return newCreateListChecked;
    });
  };

  /** 운영 관리 관리 클릭*/
  const handleClickOperationManage = () => {
    const newOperationChecked = isManageOperationChecked;
    const newMemberChecked = isManageMemberChecked;
    const newAuthorityChecked = isManageAuthorityChecked;

    if (newMemberChecked === false && newAuthorityChecked === false) {
      setIsManageOperationChecked(true);
      setIsManageMemberChecked(true);
      setIsManageAuthorityChecked(true);
    }
    if (
      newOperationChecked === true &&
      newMemberChecked === true &&
      newAuthorityChecked === true
    ) {
      setIsManageOperationChecked(false);
      setIsManageMemberChecked(false);
      setIsManageAuthorityChecked(false);
    } else if (newMemberChecked === true || newAuthorityChecked === true) {
      setIsManageOperationChecked(true);
      setIsManageMemberChecked(true);
      setIsManageAuthorityChecked(true);
    }
  };

  /** 운영 관리/회원 관리 클릭*/
  const handleClickMemberManage = () => {
    setIsManageMemberChecked((prevCreateListChecked) => {
      const newCreateListChecked = !prevCreateListChecked;
      return newCreateListChecked;
    });
  };

  /** 운영 관리/권한 관리 클릭*/
  const handleClickAuthorityManage = () => {
    setIsManageAuthorityChecked((prevCreateListChecked) => {
      const newCreateListChecked = !prevCreateListChecked;
      return newCreateListChecked;
    });
  };
  /** 전체 관리 선택 상태 업데이트 */
  useEffect(() => {
    if (
      isManageCreateChecked === true &&
      isManageManagementChecked === true &&
      isManageOperationChecked === true
    ) {
      setIsManageAllChecked(true);
    } else {
      setIsManageAllChecked(false);
    }
  }, [
    isManageCreateChecked,
    isManageManagementChecked,
    isManageOperationChecked,
  ]);

  /** 콘텐츠 제작 관리 상태 업데이트 */
  useEffect(() => {
    if (
      isManageCreateListChecked === true &&
      isManageWorksheetChecked === true
    ) {
      setIsManageCreateChecked(true);
    } else {
      setIsManageCreateChecked(false);
    }
  }, [isManageCreateListChecked, isManageWorksheetChecked]);

  /** 콘텐츠 관리 관리 상태 업데이트 */
  useEffect(() => {
    if (
      isManageManagementListChecked === true &&
      isManageTreeChecked === true
    ) {
      setIsManageManagementChecked(true);
    } else {
      setIsManageManagementChecked(false);
    }
  }, [isManageManagementListChecked, isManageTreeChecked]);

  /** 운영 관리 관리 상태 업데이트 */
  useEffect(() => {
    if (isManageMemberChecked === true && isManageAuthorityChecked === true) {
      setIsManageOperationChecked(true);
    } else {
      setIsManageOperationChecked(false);
    }
  }, [isManageMemberChecked, isManageAuthorityChecked]);

  /** 권한 리스트 가져오기 */
  const getAuthorityList = async () => {
    await axios
      .get('/auth-service/api/v1/menu', {
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
        setMenuValue(response.data);
      })
      .catch(() => {
        alert('로그인이 필요합니다');
        navigate('/login');
      });
  };

  useEffect(() => {
    mountCount++;
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      getAuthorityList();
    }
  }, [didMount]);

  return (
    <TreeView
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      sx={{
        width: 600,
        flexGrow: 1,
        maxWidth: 600,
        overflowY: 'auto',
        '&  .MuiTreeItem-content': {
          width: '200px',
          height: '30px',
        },
      }}
    >
      <S.treeDiv>
        <TreeItem
          nodeId="Authority"
          label="전체"
          sx={{
            flexGrow: 1,
            maxWidth: 600,
            overflowY: 'auto',
            '&  .MuiTreeItem-content': {
              width: '200px',
            },
          }}
        >
          <S.treeDiv>
            <TreeItem
              nodeId={CreateContent?.code as string}
              label={CreateContent?.name as string}
              sx={{
                flexGrow: 1,
                maxWidth: 500,
                overflowY: 'auto',
                '&  .MuiTreeItem-content': {
                  width: '200px',
                },
              }}
            >
              <S.treeDiv>
                <TreeItem
                  nodeId={CreateContent?.children?.[0].code as string}
                  label={CreateContent?.children?.[0].name as string}
                  sx={{
                    flexGrow: 1,
                    maxWidth: 500,
                    overflowY: 'auto',
                    '&  .MuiTreeItem-content': {
                      width: '200px',
                    },
                  }}
                />
                <S.CheckboxDiv>
                  <Checkbox
                    {...label}
                    sx={{ height: '24px' }}
                    checked={isEditCreateListChecked}
                    onClick={() => {
                      handleClickListEdit();
                    }}
                  />
                  <Checkbox
                    {...label}
                    sx={{ height: '24px' }}
                    checked={isManageCreateListChecked}
                    onClick={() => {
                      handleClickListManage();
                    }}
                  />
                </S.CheckboxDiv>
              </S.treeDiv>
              <S.treeDiv>
                <TreeItem
                  nodeId={CreateContent?.children?.[1].code as string}
                  label={CreateContent?.children?.[1].name as string}
                  sx={{
                    flexGrow: 1,
                    maxWidth: 500,
                    overflowY: 'auto',
                    '&  .MuiTreeItem-content': {
                      width: '200px',
                    },
                  }}
                />
                <S.CheckboxDiv>
                  <Checkbox
                    {...label}
                    sx={{ height: '24px' }}
                    checked={isEditWorksheetChecked}
                    onClick={() => {
                      handleClickWorksheetEdit();
                    }}
                  />
                  <Checkbox
                    {...label}
                    sx={{ height: '24px' }}
                    checked={isManageWorksheetChecked}
                    onClick={() => {
                      handleClickWorksheetManage();
                    }}
                  />
                </S.CheckboxDiv>
              </S.treeDiv>
            </TreeItem>
            <S.CheckboxDiv style={{ marginLeft: '-85px' }}>
              <Checkbox
                {...label}
                sx={{ height: '24px' }}
                checked={isEditCreateChecked}
                onClick={() => {
                  handleClickCreateEdit();
                }}
              />
              <Checkbox
                {...label}
                sx={{ height: '24px' }}
                checked={isManageCreateChecked}
                onClick={() => {
                  handleClickCreateManage();
                }}
              />
            </S.CheckboxDiv>
          </S.treeDiv>

          <S.treeDiv>
            <TreeItem
              nodeId={ManagementContent?.code as string}
              label={ManagementContent?.name as string}
              sx={{
                flexGrow: 1,
                maxWidth: 500,
                overflowY: 'auto',
                '&  .MuiTreeItem-content': {
                  width: '200px',
                },
              }}
            >
              <S.treeDiv>
                <TreeItem
                  nodeId={ManagementContent?.children?.[0].code as string}
                  label={ManagementContent?.children?.[0].name as string}
                  sx={{
                    flexGrow: 1,
                    maxWidth: 500,
                    overflowY: 'auto',
                    '&  .MuiTreeItem-content': {
                      width: '200px',
                    },
                  }}
                />
                <S.CheckboxDiv>
                  <Checkbox
                    {...label}
                    sx={{ height: '24px' }}
                    checked={isEditManagementListChecked}
                    onClick={() => {
                      handleClickManagemantListEdit();
                    }}
                  />
                  <Checkbox
                    {...label}
                    sx={{ height: '24px' }}
                    checked={isManageManagementListChecked}
                    onClick={() => {
                      handleClickManagemantListManage();
                    }}
                  />
                </S.CheckboxDiv>
              </S.treeDiv>

              <S.treeDiv>
                <TreeItem
                  nodeId={ManagementContent?.children?.[1].code as string}
                  label={ManagementContent?.children?.[1].name as string}
                  sx={{
                    flexGrow: 1,
                    maxWidth: 500,
                    overflowY: 'auto',
                    '&  .MuiTreeItem-content': {
                      width: '200px',
                    },
                  }}
                />
                <S.CheckboxDiv>
                  <Checkbox
                    {...label}
                    sx={{ height: '24px' }}
                    checked={isEditTreeChecked}
                    onClick={() => {
                      handleClickTreeEdit();
                    }}
                  />
                  <Checkbox
                    {...label}
                    sx={{ height: '24px' }}
                    checked={isManageTreeChecked}
                    onClick={() => {
                      handleClickTreeManage();
                    }}
                  />
                </S.CheckboxDiv>
              </S.treeDiv>
            </TreeItem>
            <S.CheckboxDiv style={{ marginLeft: '-85px' }}>
              <Checkbox
                {...label}
                sx={{ height: '24px' }}
                checked={isEditManagementChecked}
                onClick={() => {
                  handleClickManagemantEdit();
                }}
              />
              <Checkbox
                {...label}
                sx={{ height: '24px' }}
                checked={isManageManagementChecked}
                onClick={() => {
                  handleClickManagemantManage();
                }}
              />
            </S.CheckboxDiv>
          </S.treeDiv>

          <S.treeDiv>
            <TreeItem
              nodeId={Operation?.code as string}
              label={Operation?.name as string}
              sx={{
                flexGrow: 1,
                maxWidth: 500,
                overflowY: 'auto',
                '&  .MuiTreeItem-content': {
                  width: '200px',
                },
              }}
            >
              <S.treeDiv>
                <TreeItem
                  nodeId={Operation?.children?.[0].code as string}
                  label={Operation?.children?.[0].name as string}
                  sx={{
                    flexGrow: 1,
                    maxWidth: 500,
                    overflowY: 'auto',
                    '&  .MuiTreeItem-content': {
                      width: '200px',
                    },
                  }}
                />
                <S.CheckboxDiv>
                  <Checkbox
                    {...label}
                    sx={{ height: '24px' }}
                    checked={isEditMemberChecked}
                    onClick={() => {
                      handleClickMemberEdit();
                    }}
                  />
                  <Checkbox
                    {...label}
                    sx={{ height: '24px' }}
                    checked={isManageMemberChecked}
                    onClick={() => {
                      handleClickMemberManage();
                    }}
                  />
                </S.CheckboxDiv>
              </S.treeDiv>

              <S.treeDiv>
                <TreeItem
                  nodeId={Operation?.children?.[1].code as string}
                  label={Operation?.children?.[1].name as string}
                  sx={{
                    flexGrow: 1,
                    maxWidth: 500,
                    overflowY: 'auto',
                    '&  .MuiTreeItem-content': {
                      width: '200px',
                    },
                  }}
                />
                <S.CheckboxDiv>
                  <Checkbox
                    {...label}
                    sx={{ height: '24px' }}
                    checked={isEditAuthorityChecked}
                    onClick={() => {
                      handleClickAuthorityEdit();
                    }}
                  />
                  <Checkbox
                    {...label}
                    sx={{ height: '24px' }}
                    checked={isManageAuthorityChecked}
                    onClick={() => {
                      handleClickAuthorityManage();
                    }}
                  />
                </S.CheckboxDiv>
              </S.treeDiv>
            </TreeItem>
            <S.CheckboxDiv style={{ marginLeft: '-85px' }}>
              <Checkbox
                {...label}
                sx={{ height: '24px' }}
                checked={isEditOperationChecked}
                onClick={() => {
                  handleClickOperationEdit();
                }}
              />
              <Checkbox
                {...label}
                sx={{ height: '24px' }}
                checked={isManageOperationChecked}
                onClick={() => {
                  handleClickOperationManage();
                }}
              />
            </S.CheckboxDiv>
          </S.treeDiv>
        </TreeItem>
        <S.CheckboxDiv style={{ marginLeft: '-168px' }}>
          <Checkbox
            {...label}
            sx={{ height: '24px' }}
            checked={isEditAllChecked}
            onClick={() => {
              handleClickAllEdit();
            }}
          />
          <Checkbox
            {...label}
            sx={{ height: '24px' }}
            checked={isManageAllChecked}
            onClick={() => {
              handleClickAllManage();
            }}
          />
        </S.CheckboxDiv>
      </S.treeDiv>
    </TreeView>
  );
};

const S = {
  treeDiv: styled.div`
    display: flex;
  `,
  CheckboxDiv: styled.div`
    height: 24px;
  `,
};

export default AuthorityTree;
