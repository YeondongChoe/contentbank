import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { getAuthorityMenu } from '../../api/GetAxios';
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
} from '../../recoil/AuthorityState';
import {
  handleClickAllEdit,
  handleClickCreateEdit,
  handleClickListEdit,
  handleClickWorksheetEdit,
  handleClickManagemantEdit,
  handleClickManagemantListEdit,
  handleClickTreeEdit,
  handleClickAllManage,
  handleClickCreateManage,
  handleClickListManage,
  handleClickWorksheetManage,
  handleClickManagemantManage,
  handleClickManagemantListManage,
  handleClickTreeManage,
  handleClickOperationManage,
  handleClickMemberManage,
  handleClickAuthorityManage,
} from './AuthorityTreeHandler';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Checkbox from '@mui/material/Checkbox';

type MenuType = {
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
  const [menuValue, setMenuValue] = useState<MenuType[]>([]);
  const CreateContent = menuValue?.[0];
  const ManagementContent = menuValue?.[1];
  const Operation = menuValue?.[2];

  let mountCount = 1;

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

  useEffect(() => {
    mountCount++;
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      getAuthorityMenu({ setMenuValue });
    }
  }, [didMount]);

  return (
    <TreeView
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultExpanded={['Authority', 'CNC', 'CNM', 'OPM']}
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
              nodeId="CNC"
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
                    sx={{ height: '24px' }}
                    checked={isEditCreateListChecked}
                    onClick={() => {
                      handleClickListEdit({
                        setIsEditCreateListChecked,
                        setIsManageCreateListChecked,
                      });
                    }}
                  />
                  <Checkbox
                    sx={{ height: '24px' }}
                    checked={isManageCreateListChecked}
                    onClick={() => {
                      handleClickListManage({
                        isManageCreateListChecked,
                        isEditCreateListChecked,
                        setIsManageCreateListChecked,
                        setIsEditCreateListChecked,
                      });
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
                    sx={{ height: '24px' }}
                    checked={isEditWorksheetChecked}
                    onClick={() => {
                      handleClickWorksheetEdit({
                        setIsEditWorksheetChecked,
                        setIsManageWorksheetChecked,
                      });
                    }}
                  />
                  <Checkbox
                    sx={{ height: '24px' }}
                    checked={isManageWorksheetChecked}
                    onClick={() => {
                      handleClickWorksheetManage({
                        isManageWorksheetChecked,
                        isEditWorksheetChecked,
                        setIsManageWorksheetChecked,
                        setIsEditWorksheetChecked,
                      });
                    }}
                  />
                </S.CheckboxDiv>
              </S.treeDiv>
            </TreeItem>
            <S.CheckboxDiv style={{ marginLeft: '-85px' }}>
              <Checkbox
                sx={{ height: '24px' }}
                checked={isEditCreateChecked}
                onClick={() => {
                  handleClickCreateEdit({
                    isEditCreateChecked,
                    isEditCreateListChecked,
                    isEditWorksheetChecked,
                    setIsEditCreateListChecked,
                    setIsEditWorksheetChecked,
                    setIsEditCreateChecked,
                    setIsManageCreateChecked,
                    setIsManageCreateListChecked,
                    setIsManageWorksheetChecked,
                  });
                }}
              />
              <Checkbox
                sx={{ height: '24px' }}
                checked={isManageCreateChecked}
                onClick={() => {
                  handleClickCreateManage({
                    isManageCreateChecked,
                    isManageCreateListChecked,
                    isManageWorksheetChecked,
                    setIsManageCreateChecked,
                    setIsManageCreateListChecked,
                    setIsManageWorksheetChecked,
                    isEditCreateChecked,
                    isEditCreateListChecked,
                    isEditWorksheetChecked,
                    setIsEditCreateChecked,
                    setIsEditCreateListChecked,
                    setIsEditWorksheetChecked,
                  });
                }}
              />
            </S.CheckboxDiv>
          </S.treeDiv>

          <S.treeDiv>
            <TreeItem
              nodeId="CNM"
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
                    sx={{ height: '24px' }}
                    checked={isEditManagementListChecked}
                    onClick={() => {
                      handleClickManagemantListEdit({
                        setIsEditManagementListChecked,
                        setIsManageManagementListChecked,
                      });
                    }}
                  />
                  <Checkbox
                    sx={{ height: '24px' }}
                    checked={isManageManagementListChecked}
                    onClick={() => {
                      handleClickManagemantListManage({
                        isManageManagementListChecked,
                        isEditManagementListChecked,
                        setIsManageManagementListChecked,
                        setIsEditManagementListChecked,
                      });
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
                    sx={{ height: '24px' }}
                    checked={isEditTreeChecked}
                    onClick={() => {
                      handleClickTreeEdit({
                        setIsEditTreeChecked,
                        setIsManageTreeChecked,
                      });
                    }}
                  />
                  <Checkbox
                    sx={{ height: '24px' }}
                    checked={isManageTreeChecked}
                    onClick={() => {
                      handleClickTreeManage({
                        isManageTreeChecked,
                        isEditTreeChecked,
                        setIsManageTreeChecked,
                        setIsEditTreeChecked,
                      });
                    }}
                  />
                </S.CheckboxDiv>
              </S.treeDiv>
            </TreeItem>
            <S.CheckboxDiv style={{ marginLeft: '-85px' }}>
              <Checkbox
                sx={{ height: '24px' }}
                checked={isEditManagementChecked}
                onClick={() => {
                  handleClickManagemantEdit({
                    isEditManagementChecked,
                    isEditManagementListChecked,
                    isEditTreeChecked,
                    setIsEditManagementChecked,
                    setIsEditManagementListChecked,
                    setIsEditTreeChecked,
                    setIsManageManagementChecked,
                    setIsManageManagementListChecked,
                    setIsManageTreeChecked,
                  });
                }}
              />
              <Checkbox
                sx={{ height: '24px' }}
                checked={isManageManagementChecked}
                onClick={() => {
                  handleClickManagemantManage({
                    isManageManagementChecked,
                    isManageManagementListChecked,
                    isManageTreeChecked,
                    setIsManageManagementChecked,
                    setIsManageManagementListChecked,
                    setIsManageTreeChecked,
                    isEditManagementChecked,
                    isEditManagementListChecked,
                    isEditTreeChecked,
                    setIsEditManagementChecked,
                    setIsEditManagementListChecked,
                    setIsEditTreeChecked,
                  });
                }}
              />
            </S.CheckboxDiv>
          </S.treeDiv>

          <S.treeDiv>
            <TreeItem
              nodeId="OPM"
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
                  {/* <Checkbox
                    sx={{ height: '24px' }}
                    checked={isEditMemberChecked}
                    onClick={() => {
                      handleClickMemberEdit();
                    }}
                  /> */}
                  <Checkbox
                    sx={{ height: '24px' }}
                    checked={isManageMemberChecked}
                    onClick={() => {
                      handleClickMemberManage({
                        isManageMemberChecked,
                        isEditMemberChecked,
                        setIsManageMemberChecked,
                        setIsEditMemberChecked,
                      });
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
                  {/* <Checkbox
                    sx={{ height: '24px' }}
                    checked={isEditAuthorityChecked}
                    onClick={() => {
                      handleClickAuthorityEdit();
                    }}
                  /> */}
                  <Checkbox
                    sx={{ height: '24px' }}
                    checked={isManageAuthorityChecked}
                    onClick={() => {
                      handleClickAuthorityManage({
                        isManageAuthorityChecked,
                        isEditAuthorityChecked,
                        setIsManageAuthorityChecked,
                        setIsEditAuthorityChecked,
                      });
                    }}
                  />
                </S.CheckboxDiv>
              </S.treeDiv>
            </TreeItem>
            <S.CheckboxDiv style={{ marginLeft: '-43px' }}>
              {/* <Checkbox
  
                sx={{ height: '24px' }}
                checked={isEditOperationChecked}
                onClick={() => {
                  handleClickOperationEdit();
                }}
              /> */}
              <Checkbox
                sx={{ height: '24px' }}
                checked={isManageOperationChecked}
                onClick={() => {
                  handleClickOperationManage({
                    isManageOperationChecked,
                    isManageMemberChecked,
                    isManageAuthorityChecked,
                    setIsManageOperationChecked,
                    setIsManageMemberChecked,
                    setIsManageAuthorityChecked,
                    isEditOperationChecked,
                    isEditMemberChecked,
                    isEditAuthorityChecked,
                    setIsEditOperationChecked,
                    setIsEditMemberChecked,
                    setIsEditAuthorityChecked,
                  });
                }}
              />
            </S.CheckboxDiv>
          </S.treeDiv>
        </TreeItem>
        <S.CheckboxDiv style={{ marginLeft: '-168px' }}>
          <Checkbox
            sx={{ height: '24px' }}
            checked={isEditAllChecked}
            onClick={() => {
              handleClickAllEdit({
                setIsEditAllChecked,
                setIsEditCreateChecked,
                setIsEditCreateListChecked,
                setIsEditWorksheetChecked,
                setIsEditManagementChecked,
                setIsEditManagementListChecked,
                setIsEditTreeChecked,
                setIsEditOperationChecked,
                setIsEditMemberChecked,
                setIsEditAuthorityChecked,
                setIsManageAllChecked,
                setIsManageCreateChecked,
                setIsManageCreateListChecked,
                setIsManageWorksheetChecked,
                setIsManageManagementChecked,
                setIsManageManagementListChecked,
                setIsManageTreeChecked,
                setIsManageOperationChecked,
                setIsManageMemberChecked,
                setIsManageAuthorityChecked,
              });
            }}
          />
          <Checkbox
            sx={{ height: '24px' }}
            checked={isManageAllChecked}
            onClick={() => {
              handleClickAllManage({
                isEditAllChecked,
                isManageAllChecked,
                setIsEditAllChecked,
                setIsEditCreateChecked,
                setIsEditCreateListChecked,
                setIsEditWorksheetChecked,
                setIsEditManagementChecked,
                setIsEditManagementListChecked,
                setIsEditTreeChecked,
                setIsEditOperationChecked,
                setIsEditMemberChecked,
                setIsEditAuthorityChecked,
                setIsManageAllChecked,
                setIsManageCreateChecked,
                setIsManageCreateListChecked,
                setIsManageWorksheetChecked,
                setIsManageManagementChecked,
                setIsManageManagementListChecked,
                setIsManageTreeChecked,
                setIsManageOperationChecked,
                setIsManageMemberChecked,
                setIsManageAuthorityChecked,
              });
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
