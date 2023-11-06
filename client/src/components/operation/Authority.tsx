import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getCookie, setCookie } from '../../utils/ReactCookie';

import { Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

type AuthorityListType = {
  seq: number;
  code: string;
  name: string;
  sort: number;
};

const Authority = () => {
  const [authorityList, setAuthorityList] = useState<AuthorityListType[]>([]);
  console.log(authorityList);

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
        console.log(response.data.data);
        setAuthorityList(response.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    getAuthorityList();
  }, []);

  return (
    <S.main>
      <S.WholeContainer>
        <S.leftContainer>
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{
              height: 240,
              flexGrow: 1,
              maxWidth: 400,
              overflowY: 'auto',
            }}
          >
            <TreeItem nodeId="1" label="전체">
              <input type="checkbox" />
              <input type="checkbox" />
              <TreeItem nodeId="2" label="콘텐츠 제작">
                <TreeItem nodeId="3" label="문항" />
                <TreeItem nodeId="4" label="학습지" />
              </TreeItem>
              <TreeItem nodeId="5" label="컨텐츠 관리">
                <TreeItem nodeId="6" label="문항" />
                <TreeItem nodeId="7" label="문항정보 트리구조" />
              </TreeItem>
              <TreeItem nodeId="8" label="운영 관리">
                <TreeItem nodeId="9" label="회원 관리" />
                <TreeItem nodeId="10" label="권한 관리" />
              </TreeItem>
            </TreeItem>
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
    border: 1px solid #a3aed0;
  `,
  leftContainer: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
  `,

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
