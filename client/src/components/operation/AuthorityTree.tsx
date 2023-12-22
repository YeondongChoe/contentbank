import * as React from 'react';
import { useState, useEffect } from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Checkbox from '@mui/material/Checkbox';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { getAuthorityMenu } from '../../api/getAxios';
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
import { Loader } from '../atom/Loader';

import {
  clickAllEdit,
  clickCreateEdit,
  clickListEdit,
  clickWorksheetEdit,
  clickManagemantEdit,
  clickManagemantListEdit,
  clickTreeEdit,
  clickAllManage,
  clickCreateManage,
  clickListManage,
  clickWorksheetManage,
  clickManagemantManage,
  clickManagemantListManage,
  clickTreeManage,
  clickOperationManage,
  clickMemberManage,
  clickAuthorityManage,
} from './authorityTreeHandler';

type menuProps = {
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

export function AuthorityTree() {
  const [didMount, setDidMount] = useState(false);
  const [menuValue, setMenuValue] = useState<menuProps[]>([]);
  const CreateContent = menuValue?.[0];
  const ManagementContent = menuValue?.[1];
  const Operation = menuValue?.[2];
  console.log(menuValue);

  let mountCount = 1;

  const authorityMenuList = [
    {
      firstTitle: '전체',
      tabIndex: 1,
      menuList: [
        {
          title: '콘텐츠 제작',
          tabIndex: 2,
          list: [
            { title: '문항', tabIndex: 3 },
            { title: '학습지', tabIndex: 4 },
          ],
        },
        {
          title: '콘텐츠 관리',
          tabIndex: 5,
          list: [
            { title: '문항', tabIndex: 6 },
            { title: '문항정보 트리구조', tabIndex: 7 },
          ],
        },
        {
          title: '운영 관리',
          tabIndex: 8,
          list: [
            { title: '회원 관리', tabIndex: 9 },
            { title: '권한 관리', tabIndex: 10 },
          ],
        },
      ],
    },
  ];

  /** 전체 편집, 하위 항목 체크 상태여부*/
  const [isEditAllChecked, setIsEditAllChecked] = useState<boolean>(false);

  /** 콘텐츠 제작 편집, 하위 항목 체크 상태여부*/
  const [isEditCreateChecked, setIsEditCreateChecked] = useRecoilState<boolean>(
    editCreateContentBool,
  );
  const [isEditCreateListChecked, setIsEditCreateListChecked] =
    useRecoilState<boolean>(editCreateListBool);
  const [isEditWorksheetChecked, setIsEditWorksheetChecked] =
    useRecoilState<boolean>(editCreateContentWorksheetBool);

  /** 콘텐츠 관리 편집, 하위 항목 체크 상태여부*/
  const [isEditManagementChecked, setIsEditManagementChecked] =
    useRecoilState<boolean>(editManagementContentBool);
  const [isEditManagementListChecked, setIsEditManagementListChecked] =
    useRecoilState<boolean>(editManagementListBool);
  const [isEditTreeChecked, setIsEditTreeChecked] = useRecoilState<boolean>(
    editManagementTreeBool,
  );

  /** 운영 관리 편집, 하위 항목 체크 상태여부*/
  const [isEditOperationChecked, setIsEditOperationChecked] =
    useRecoilState<boolean>(editOperationBoolAtom);
  const [isEditMemberChecked, setIsEditMemberChecked] =
    useRecoilState<boolean>(editMemberBoolAtom);
  const [isEditAuthorityChecked, setIsEditAuthorityChecked] =
    useRecoilState<boolean>(editAuthorityBoolAtom);

  /** 전체 관리, 하위 항목 체크 상태여부*/
  const [isManageAllChecked, setIsManageAllChecked] = useState<boolean>(false);

  /** 콘텐츠 제작 관리, 하위 항목 체크 상태여부*/
  const [isManageCreateChecked, setIsManageCreateChecked] =
    useRecoilState<boolean>(manageCreateContentBoolAtom);
  const [isManageCreateListChecked, setIsManageCreateListChecked] =
    useRecoilState<boolean>(manageCreateListBoolAtom);
  const [isManageWorksheetChecked, setIsManageWorksheetChecked] =
    useRecoilState<boolean>(manageCreateContentWorksheetBoolAtom);

  /** 콘텐츠 관리 관리, 하위 항목 체크 상태여부*/
  const [isManageManagementChecked, setIsManageManagementChecked] =
    useRecoilState<boolean>(manageManagementContentBoolAtom);
  const [isManageManagementListChecked, setIsManageManagementListChecked] =
    useRecoilState<boolean>(manageManagementListBoolAtom);
  const [isManageTreeChecked, setIsManageTreeChecked] = useRecoilState<boolean>(
    manageManagementTreeBoolAtom,
  );

  /** 운영 관리 관리, 하위 항목 체크 상태여부*/
  const [isManageOperationChecked, setIsManageOperationChecked] =
    useRecoilState<boolean>(manageOperationBoolAtom);
  const [isManageMemberChecked, setIsManageMemberChecked] =
    useRecoilState<boolean>(manageMemberBoolAtom);
  const [isManageAuthorityChecked, setIsManageAuthorityChecked] =
    useRecoilState<boolean>(manageAuthorityBoolAtom);

  /** 전체 편집 선택 상태 업데이트 */
  useEffect(() => {
    if (isEditCreateChecked === true && isEditManagementChecked === true) {
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

  const [display, setDisplay] = useState('none');

  const offLoader = () => {
    setDisplay('block');
  };

  useEffect(() => {
    if (didMount) {
      getAuthorityMenu({ setMenuValue });
    }
    offLoader();
  }, [didMount]);

  /** 페이지 접근시 체크박스 초기화 */
  useEffect(() => {
    setIsEditAllChecked(false);
    setIsEditCreateChecked(false);
    setIsEditCreateListChecked(false);
    setIsEditWorksheetChecked(false);
    setIsEditManagementChecked(false);
    setIsEditManagementListChecked(false);
    setIsEditTreeChecked(false);
    setIsEditOperationChecked(false);
    setIsEditMemberChecked(false);
    setIsEditAuthorityChecked(false);
    setIsManageAllChecked(false);
    setIsManageCreateChecked(false);
    setIsManageCreateListChecked(false);
    setIsManageWorksheetChecked(false);
    setIsManageManagementChecked(false);
    setIsManageManagementListChecked(false);
    setIsManageTreeChecked(false);
    setIsManageOperationChecked(false);
    setIsManageMemberChecked(false);
    setIsManageAuthorityChecked(false);
  }, []);

  const [isShowAllList, setIsShowAllList] = useState(true);

  const toggleTree = () => {
    setIsShowAllList((check: boolean) => !check);
  };
  const [isShowList, setIsShowList] = useState(
    Array(menuValue.length).fill(true),
  );
  const toggleSubMenu = (index: number) => {
    setIsShowList((prev) => {
      const updatedList = [...prev];
      updatedList[index] = !updatedList[index];
      return updatedList;
    });
  };

  return (
    <>
      {display === 'none' && <Loader height={'100px'} size="50px" />}
      <TreeWrapper>
        <>
          <IconWrapper onClick={toggleTree}>
            <ArrowDropDownIcon />
          </IconWrapper>
          <div>
            전체
            {isShowAllList && (
              <ul>
                {menuValue.map((menu, index) => (
                  <li key={menu.name} className={menu.name}>
                    <IconWrapper onClick={() => toggleSubMenu(index)}>
                      <ArrowDropDownIcon />
                    </IconWrapper>
                    {menu.name}
                    {isShowList[index] && (
                      <ul>
                        {menu.children.map((list) => (
                          <li key={list.name}>{list.name}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      </TreeWrapper>

      {/* <TreeView
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultExpanded={['Authority', 'CNC', 'CNM', 'OPM']}
        sx={{
          minWidth: 600,
          overflowY: 'auto',
          '&  .MuiTreeItem-content': {
            height: '30px',
          },
        }}
      >
        <TreeWrapper>
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
            <TreeWrapper>
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
                <TreeWrapper>
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
                  <CheckBoxWrapper>
                    <Checkbox
                      sx={{ height: '24px' }}
                      checked={isEditCreateListChecked}
                      onClick={() => {
                        clickListEdit({
                          setIsEditCreateListChecked,
                          setIsManageCreateListChecked,
                        });
                      }}
                    />
                    <Checkbox
                      sx={{ height: '24px' }}
                      checked={isManageCreateListChecked}
                      onClick={() => {
                        clickListManage({
                          isManageCreateListChecked,
                          isEditCreateListChecked,
                          setIsManageCreateListChecked,
                          setIsEditCreateListChecked,
                        });
                      }}
                    />
                  </CheckBoxWrapper>
                </TreeWrapper>
                <TreeWrapper>
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
                  <CheckBoxWrapper>
                    <Checkbox
                      sx={{ height: '24px' }}
                      checked={isEditWorksheetChecked}
                      onClick={() => {
                        clickWorksheetEdit({
                          setIsEditWorksheetChecked,
                          setIsManageWorksheetChecked,
                        });
                      }}
                    />
                    <Checkbox
                      sx={{ height: '24px' }}
                      checked={isManageWorksheetChecked}
                      onClick={() => {
                        clickWorksheetManage({
                          isManageWorksheetChecked,
                          isEditWorksheetChecked,
                          setIsManageWorksheetChecked,
                          setIsEditWorksheetChecked,
                        });
                      }}
                    />
                  </CheckBoxWrapper>
                </TreeWrapper>
              </TreeItem>
              <CheckBoxWrapper style={{ marginLeft: '-84px' }}>
                <Checkbox
                  sx={{ height: '24px' }}
                  checked={isEditCreateChecked}
                  onClick={() => {
                    clickCreateEdit({
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
                    clickCreateManage({
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
              </CheckBoxWrapper>
            </TreeWrapper>

            <TreeWrapper>
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
                <TreeWrapper>
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
                  <CheckBoxWrapper>
                    <Checkbox
                      sx={{ height: '24px' }}
                      checked={isEditManagementListChecked}
                      onClick={() => {
                        clickManagemantListEdit({
                          setIsEditManagementListChecked,
                          setIsManageManagementListChecked,
                        });
                      }}
                    />
                    <Checkbox
                      sx={{ height: '24px' }}
                      checked={isManageManagementListChecked}
                      onClick={() => {
                        clickManagemantListManage({
                          isManageManagementListChecked,
                          isEditManagementListChecked,
                          setIsManageManagementListChecked,
                          setIsEditManagementListChecked,
                        });
                      }}
                    />
                  </CheckBoxWrapper>
                </TreeWrapper>

                <TreeWrapper>
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
                  <CheckBoxWrapper>
                    <Checkbox
                      sx={{ height: '24px' }}
                      checked={isEditTreeChecked}
                      onClick={() => {
                        clickTreeEdit({
                          setIsEditTreeChecked,
                          setIsManageTreeChecked,
                        });
                      }}
                    />
                    <Checkbox
                      sx={{ height: '24px' }}
                      checked={isManageTreeChecked}
                      onClick={() => {
                        clickTreeManage({
                          isManageTreeChecked,
                          isEditTreeChecked,
                          setIsManageTreeChecked,
                          setIsEditTreeChecked,
                        });
                      }}
                    />
                  </CheckBoxWrapper>
                </TreeWrapper>
              </TreeItem>
              <CheckBoxWrapper style={{ marginLeft: '-84px' }}>
                <Checkbox
                  sx={{ height: '24px' }}
                  checked={isEditManagementChecked}
                  onClick={() => {
                    clickManagemantEdit({
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
                    clickManagemantManage({
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
              </CheckBoxWrapper>
            </TreeWrapper>

            <TreeWrapper>
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
                <TreeWrapper>
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
                  <CheckBoxWrapper>
                    <Checkbox
                      sx={{ height: '24px' }}
                      checked={isManageMemberChecked}
                      onClick={() => {
                        clickMemberManage({
                          isManageMemberChecked,
                          isEditMemberChecked,
                          setIsManageMemberChecked,
                          setIsEditMemberChecked,
                        });
                      }}
                    />
                  </CheckBoxWrapper>
                </TreeWrapper>

                <TreeWrapper>
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
                  <CheckBoxWrapper>
                    <Checkbox
                      sx={{ height: '24px' }}
                      checked={isManageAuthorityChecked}
                      onClick={() => {
                        clickAuthorityManage({
                          isManageAuthorityChecked,
                          isEditAuthorityChecked,
                          setIsManageAuthorityChecked,
                          setIsEditAuthorityChecked,
                        });
                      }}
                    />
                  </CheckBoxWrapper>
                </TreeWrapper>
              </TreeItem>
              <CheckBoxWrapper style={{ marginLeft: '-42px' }}>
                <Checkbox
                  sx={{ height: '24px' }}
                  checked={isManageOperationChecked}
                  onClick={() => {
                    clickOperationManage({
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
              </CheckBoxWrapper>
            </TreeWrapper>
          </TreeItem>
          <CheckBoxWrapper style={{ marginLeft: '-168px' }}>
            <Checkbox
              sx={{ height: '24px' }}
              checked={isEditAllChecked}
              onClick={() => {
                clickAllEdit({
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
                clickAllManage({
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
          </CheckBoxWrapper>
        </TreeWrapper>
      </TreeView> */}
    </>
  );
}
const TreeWrapper = styled.div`
  min-width: 600px;
  display: flex;
  font-size: 16px;
  padding: 0px 10px;

  .icon {
    cursor: pointer;
  }

  > div {
    padding-left: 5px;
    .icon {
      cursor: pointer;
    }

    > ul {
      > li {
        padding-top: 10px;

        > ul {
          padding-left: 40px;

          > li {
            padding-top: 10px;
          }
        }
      }
    }
  }
`;
const IconWrapper = styled.span`
  cursor: pointer;
`;
// const TreeWrapper = styled.div`
//   display: flex;
// `;
const CheckBoxWrapper = styled.div`
  height: 24px;
`;
