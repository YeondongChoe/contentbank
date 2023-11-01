import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getCookie, setCookie } from '../../utils/ReactCookie';

import { Button } from '@mui/material';

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
        <S.leftContainer>왼쪽</S.leftContainer>
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
              <S.authorityMenu key={i}>{el.name}</S.authorityMenu>
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
    border: 1px solid black;
  `,
  leftContainer: styled.div`
    width: 100%;
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
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    padding: 20px;
  `,
  authorityMenu: styled.div`
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
