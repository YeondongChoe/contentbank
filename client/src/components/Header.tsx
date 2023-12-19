import * as React from 'react';
import { useState, useEffect } from 'react';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getAuthorityCookie, removeAuthorityCookie } from '../utils/cookies';

import { COLOR } from './contents';

export function Header() {
  const navigate = useNavigate();

  // 메인메뉴 버튼 이벤트
  // 1뎁스 네비버튼 이벤트
  const handleShowList = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    const currentButton = event.currentTarget.tabIndex;
    const currentTargetUl = event.currentTarget.children[1].className;
    if (currentButton === Number(currentTargetUl)) {
      event.currentTarget.children[1].classList.add('show');
    }
  };
  const handleRemoveList = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.currentTarget.children[1].classList.remove('show');
  };
  //2뎁스 네비버튼 이벤트
  const removeClass = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.currentTarget.parentElement?.parentElement?.classList.remove('show');
  };

  useEffect(() => {}, []);

  // 사이드메뉴 로그아웃 시
  const removeCookie = () => {
    removeAuthorityCookie('accessToken');
  };

  const moveMainpage = () => {
    navigate('/contentlist');
  };

  useEffect(() => {
    // 사이드메뉴
    if (!getAuthorityCookie('accessToken')) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, []);

  const mainMenuList = [
    {
      firstTItle: '콘텐츠 제작',
      tabIndex: 1,
      menuList: [
        { title: '문항', link: '/contentlist', tabIndex: 2 },
        { title: '학습지', link: '/contentworksheet', tabIndex: 3 },
      ],
    },
    {
      firstTItle: '콘텐츠 관리',
      tabIndex: 4,
      menuList: [
        { title: '문항', link: '/managementlist', tabIndex: 5 },
        { title: '문항 트리 구조', link: '/managementtree', tabIndex: 6 },
      ],
    },
    {
      firstTItle: '운영관리',
      tabIndex: 7,
      menuList: [
        { title: '회원관리', link: '/operationmember', tabIndex: 8 },
        { title: '권한관리', link: '/operationauthority', tabIndex: 9 },
      ],
    },
  ];

  return (
    <Container>
      <IconWrapper onClick={moveMainpage} tabIndex={0}>
        <AccountBalanceIcon
          style={{ fontSize: '50px', color: `${COLOR.PRIMARY}` }}
        />
      </IconWrapper>

      {/* 메인 메뉴 */}
      <NavBarWrapper>
        {mainMenuList.map((menu) => (
          <button
            type="button"
            key={menu.firstTItle}
            tabIndex={menu.tabIndex}
            onMouseEnter={(event) => handleShowList(event)}
            onMouseLeave={(event) => handleRemoveList(event)}
          >
            <strong>{menu.firstTItle}</strong>

            <ul className={`${menu.tabIndex} `}>
              {menu.menuList.map((list) => (
                <li key={list.title}>
                  <Link
                    onClick={(event) => removeClass(event)}
                    to={list.link}
                    tabIndex={list.tabIndex}
                  >
                    {list.title}
                  </Link>
                </li>
              ))}
            </ul>
          </button>
        ))}
      </NavBarWrapper>

      {/* 사이드메뉴 */}
      <SideMenuWrapper>
        <Link to="/preparing">가이드</Link>
        <Link to="/preparing">고객센터</Link>
        <Link to="/mypage">마이페이지</Link>
        <Link to="/login" onClick={removeCookie}>
          로그아웃
        </Link>
      </SideMenuWrapper>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 110px;
  border-bottom: 1px solid ${COLOR.SECONDARY};
`;

const IconWrapper = styled.div`
  width: 50px;
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
`;

const NavBarWrapper = styled.nav`
  display: flex;
  align-items: center;
  flex: 1 0 0;
  font-size: 20px;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 20px;
    border: none;
    background-color: transparent;
    position: relative;
    /* transition: all 0.5s; */
    z-index: 1;

    &:hover,
    :active {
      > strong {
        color: ${COLOR.PRIMARY};
      }
    }

    cursor: pointer;
    > strong {
      font-size: 20px;
      color: ${COLOR.DARK_GRAY};
    }

    ul {
      display: none;
      position: absolute;
      top: 50px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #fff;
      border: 1px solid ${COLOR.LIGHT_GRAY};
      border-radius: 5px;

      &.show {
        display: block;
      }

      li {
        width: 140px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;

        a {
          font-size: 14px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          color: ${COLOR.DARK_GRAY};
          /* transition: all 0.1s; */
          z-index: 2;

          &:hover {
            background-color: ${COLOR.HOVER};
          }
        }
      }
    }
  }
`;

const SideMenuWrapper = styled.div`
  display: flex;
  align-items: flex-end;

  a {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    color: ${COLOR.SECONDARY};
    padding: 5px 10px;
    text-decoration: none;
    position: relative;

    &::after {
      content: '';
      display: block;
      position: absolute;
      right: 0px;
      width: 1px;
      height: 10px;
      background-color: ${COLOR.SECONDARY};
    }
    &:last-child {
      &::after {
        display: none;
      }
    }
  }
`;
