import * as React from 'react';
import { useState, useEffect } from 'react';

import { MdAccountBalance } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Label } from './atom';
import { COLOR } from './constants';

export function Navigation() {
  const navigate = useNavigate();

  return (
    <Container>
      <IconWrapper>
        <MdAccountBalance
          style={{ fontSize: '50px', color: 'white', cursor: 'pointer' }}
        />
      </IconWrapper>
      <NavigationMenuWrapper>
        <NavigationMenu>
          <Label value={'콘텐츠 제작'} fontSize="14px"></Label>
          <Link to={'/contentlist'}>
            <li>문항.</li>
          </Link>
          <Link to={'/contentworksheet'}>
            <li>학습지</li>
          </Link>
        </NavigationMenu>
        <NavigationMenu>
          <Label value={'콘텐츠 관리'}></Label>
          <Link to={'/managementlist'}>
            <li>문항</li>
          </Link>
          <Link to={'/managementtree'}>
            <li>문항 정보 트리 구조</li>
          </Link>
        </NavigationMenu>
        <NavigationMenu>
          <Label value={'운영 관리'}></Label>
          <Link to={'/operationmember'}>
            <li>회원 관리</li>
          </Link>
          <Link to={'/operationauthority'}>
            <li>권한 관리</li>
          </Link>
        </NavigationMenu>
      </NavigationMenuWrapper>
    </Container>
  );
}

const Container = styled.div`
  //position: fixed;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.SECONDARY};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;
const IconWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NavigationMenuWrapper = styled.div`
  width: 200px;
  //padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: white;
`;
const NavigationMenu = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: white;
  font-size: 14px;

  a {
    text-decoration: none;
    color: inherit;
  }

  li {
    padding: 10px;
    cursor: pointer;

    a {
      color: white;
    }

    &:hover {
      background-color: #5a76be;
      border-radius: 7px;
    }
  }
`;
