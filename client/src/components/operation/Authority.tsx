import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getCookie, setCookie } from '../../utils/ReactCookie';

import { Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Checkbox from '@mui/material/Checkbox';

type AuthorityListType = {
  seq: number;
  code: string;
  name: string;
  sort: number;
};

type CheckedItems = { [key: string]: boolean };

const Authority = () => {
  const [authorityList, setAuthorityList] = useState<AuthorityListType[]>([]);
  const [didMount, setDidMount] = useState(false);
  let mountCount = 1;
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});

  const handleParentItemChange = (nodeId: string) => {
    // 현재 선택 상태를 가져옴
    const isChecked = checkedItems[nodeId];

    // 하위 항목의 체크 상태를 모두 업데이트
    const updatedItems = { ...checkedItems };
    updatedItems[nodeId] = !isChecked;

    // 상위 항목의 하위 항목도 업데이트
    // 이 예제에서는 간단하게 하위 항목들의 체크 상태를 업데이트함
    if (nodeId === '1') {
      // '전체' 항목의 하위 항목
      updatedItems['2'] = !isChecked;
      updatedItems['5'] = !isChecked;
      updatedItems['6'] = !isChecked;
      updatedItems['8'] = !isChecked;
    } else if (nodeId === '2') {
      // '콘텐츠 제작' 항목의 하위 항목
      updatedItems['3'] = !isChecked;
      updatedItems['4'] = !isChecked;
    }
    // 이렇게 계속 반복
    else if (nodeId === '5') {
      // '콘텐츠 제작' 항목의 하위 항목
      updatedItems['6'] = !isChecked;
      updatedItems['7'] = !isChecked;
    } else if (nodeId === '8') {
      // '콘텐츠 제작' 항목의 하위 항목
      updatedItems['9'] = !isChecked;
      updatedItems['10'] = !isChecked;
    }

    // 상태 업데이트
    setCheckedItems(updatedItems);
  };

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

  useEffect(() => {
    mountCount++;
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      getAuthorityList();
    }
  }, [didMount]);

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <S.main>
      <S.WholeContainer>
        <S.leftContainer>
          <S.leftTopBar>
            <S.manual>편집</S.manual>
            <S.manual>관리</S.manual>
          </S.leftTopBar>
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
                nodeId="1"
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
                    nodeId="2"
                    label="콘텐츠 제작"
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
                        nodeId="3"
                        label="문항"
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
                          checked={checkedItems['3']}
                          onClick={() => handleParentItemChange('3')}
                        />
                        <Checkbox
                          {...label}
                          sx={{ height: '24px' }}
                          checked={checkedItems['3']}
                          onClick={() => handleParentItemChange('3')}
                        />
                      </S.CheckboxDiv>
                    </S.treeDiv>
                    <S.treeDiv>
                      <TreeItem
                        nodeId="4"
                        label="학습지"
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
                          checked={checkedItems['4']}
                          onClick={() => handleParentItemChange('4')}
                        />
                        <Checkbox
                          {...label}
                          sx={{ height: '24px' }}
                          checked={checkedItems['4']}
                          onClick={() => handleParentItemChange('4')}
                        />
                      </S.CheckboxDiv>
                    </S.treeDiv>
                  </TreeItem>
                  <S.CheckboxDiv style={{ marginLeft: '-85px' }}>
                    <Checkbox
                      {...label}
                      sx={{ height: '24px' }}
                      checked={checkedItems['2']}
                      onClick={() => handleParentItemChange('2')}
                    />
                    <Checkbox
                      {...label}
                      sx={{ height: '24px' }}
                      checked={checkedItems['2']}
                      onClick={() => handleParentItemChange('2')}
                    />
                  </S.CheckboxDiv>
                </S.treeDiv>

                <S.treeDiv>
                  <TreeItem
                    nodeId="5"
                    label="콘텐츠 관리"
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
                        nodeId="6"
                        label="문항"
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
                          checked={checkedItems['6']}
                          onClick={() => handleParentItemChange('6')}
                        />
                        <Checkbox
                          {...label}
                          sx={{ height: '24px' }}
                          checked={checkedItems['6']}
                          onClick={() => handleParentItemChange('6')}
                        />
                      </S.CheckboxDiv>
                    </S.treeDiv>

                    <S.treeDiv>
                      <TreeItem
                        nodeId="7"
                        label="문항정보 트리구조"
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
                          checked={checkedItems['7']}
                          onClick={() => handleParentItemChange('7')}
                        />
                        <Checkbox
                          {...label}
                          sx={{ height: '24px' }}
                          checked={checkedItems['7']}
                          onClick={() => handleParentItemChange('7')}
                        />
                      </S.CheckboxDiv>
                    </S.treeDiv>
                  </TreeItem>
                  <S.CheckboxDiv style={{ marginLeft: '-85px' }}>
                    <Checkbox
                      {...label}
                      sx={{ height: '24px' }}
                      checked={checkedItems['5']}
                      onClick={() => handleParentItemChange('5')}
                    />
                    <Checkbox
                      {...label}
                      sx={{ height: '24px' }}
                      checked={checkedItems['5']}
                      onClick={() => handleParentItemChange('5')}
                    />
                  </S.CheckboxDiv>
                </S.treeDiv>

                <S.treeDiv>
                  <TreeItem
                    nodeId="8"
                    label="운영 관리"
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
                        nodeId="9"
                        label="회원 관리"
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
                          checked={checkedItems['9']}
                          onClick={() => handleParentItemChange('9')}
                        />
                        <Checkbox
                          {...label}
                          sx={{ height: '24px' }}
                          checked={checkedItems['9']}
                          onClick={() => handleParentItemChange('9')}
                        />
                      </S.CheckboxDiv>
                    </S.treeDiv>

                    <S.treeDiv>
                      <TreeItem
                        nodeId="10"
                        label="권한 관리"
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
                          checked={checkedItems['10']}
                          onClick={() => handleParentItemChange('10')}
                        />
                        <Checkbox
                          {...label}
                          sx={{ height: '24px' }}
                          checked={checkedItems['10']}
                          onClick={() => handleParentItemChange('10')}
                        />
                      </S.CheckboxDiv>
                    </S.treeDiv>
                  </TreeItem>
                  <S.CheckboxDiv style={{ marginLeft: '-85px' }}>
                    <Checkbox
                      {...label}
                      sx={{ height: '24px' }}
                      checked={checkedItems['8']}
                      onClick={() => handleParentItemChange('8')}
                    />
                    <Checkbox
                      {...label}
                      sx={{ height: '24px' }}
                      checked={checkedItems['8']}
                      onClick={() => handleParentItemChange('8')}
                    />
                  </S.CheckboxDiv>
                </S.treeDiv>
              </TreeItem>
              <S.CheckboxDiv style={{ marginLeft: '-168px' }}>
                <Checkbox
                  {...label}
                  sx={{ height: '24px' }}
                  checked={checkedItems['1']}
                  onClick={() => handleParentItemChange('1')}
                />
                <Checkbox
                  {...label}
                  sx={{ height: '24px' }}
                  checked={checkedItems['1']}
                  onClick={() => handleParentItemChange('1')}
                />
              </S.CheckboxDiv>
            </S.treeDiv>
          </TreeView>
        </S.leftContainer>
        <S.rightContainer>
          <S.searchbarWarrper>
            <S.inputWrapper>
              <S.input
                type="text"
                placeholder="권한명을 작성해주세요."
              ></S.input>
            </S.inputWrapper>
            <S.btnWrapper>
              <StyledUplodeBtn variant="contained">저장</StyledUplodeBtn>
            </S.btnWrapper>
          </S.searchbarWarrper>
          <S.authorityMenuContainer>
            {authorityList?.map((el, i) => (
              <S.authorityMenuWrapper key={i}>
                <S.authorityMenu>{el.name}</S.authorityMenu>
                <S.iconWrapper>
                  <DeleteForeverIcon />
                </S.iconWrapper>
              </S.authorityMenuWrapper>
            ))}
          </S.authorityMenuContainer>
        </S.rightContainer>
      </S.WholeContainer>
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
    width: 400px;
    display: flex;
    margin-top: 30px;
    margin-bottom: 20px;
    margin-left: 23px;
    gap: 10px;
    justify-content: flex-end;
  `,
  manual: styled.div``,
  treeDiv: styled.div`
    display: flex;
  `,
  CheckboxDiv: styled.div`
    height: 24px;
    //display: flex;
    //justify-content: flex-end;
    //gap: 40px;
  `,
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
  authorityMenuWrapper: styled.div`
    width: 100%;
    display: flex;
    padding: 0px 30px;
    &:hover {
      background-color: #422afb;
      border-top: 1px solid #a3aed0;
      border-bottom: 1px solid #a3aed0;
      color: white;
    }
  `,
  authorityMenu: styled.div`
    width: 100%;
    display: flex;
    cursor: default;
  `,
  iconWrapper: styled.div`
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
  `,
};

const StyledUplodeBtn = styled(Button)`
  && {
    height: 30px;
    width: 80px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;

export default Authority;
