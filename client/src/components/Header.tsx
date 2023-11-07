import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getCookie, setCookie, removeCookie } from '../utils/ReactCookie';
import { useNavigate } from 'react-router-dom';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

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

const Header = () => {
  const [value, setValue] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [menuValue, setMenuValue] = useState<MenuListType[]>();
  const [didMount, setDidMount] = useState(false);

  const navigate = useNavigate();

  let mountCount = 1;

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setActiveTab(0);
  };

  const handleRemoveCookie = () => {
    removeCookie('accessToken');
  };

  const handleClickSidebar = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {};

  const clickIcon = () => {
    if (getCookie('accessToken')) {
      navigate('/contentlist');
    } else {
      navigate('/');
    }
  };

  const clickTabPanel = (code: string) => {
    if (code === 'CNC_Q') {
      setActiveTab(1);
      navigate('/contentlist');
    } else if (code === 'CNC_W') {
      setActiveTab(2);
      navigate('/contentworksheet');
    } else if (code === 'CNM_Q') {
      setActiveTab(1);
      navigate('/managementlist');
    } else if (code === 'CNM_T') {
      setActiveTab(2);
      navigate('/managementtree');
    } else if (code === 'OPM_M') {
      setActiveTab(1);
      navigate('/operationmember');
    } else if (code === 'OPM_R') {
      setActiveTab(2);
      navigate('/operationauthority');
    }
  };

  const getMenuList = async () => {
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
    //console.log('mount: ', mountCount);
    mountCount++;
    setDidMount(true);
    return () => {
      //console.log('unmount');
    };
  }, []);

  useEffect(() => {
    if (didMount) {
      getMenuList();
    }
  }, [didMount]);

  return (
    <S.main>
      <S.head>
        <S.topHead>
          <S.iconContainer onClick={clickIcon}>
            <AccountBalanceIcon style={{ fontSize: '70px' }} />
          </S.iconContainer>
          <S.navContainer>
            <Box sx={{ typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderColor: 'divider' }}>
                  <TabList onChange={handleChangeTab}>
                    {menuValue?.map((el, i) => (
                      <Tab
                        key={i}
                        label={el.name}
                        value={el.seq}
                        style={{ fontSize: '20px', fontWeight: 'bold' }}
                      />
                    ))}
                  </TabList>
                </Box>
                <S.navBar>
                  {menuValue?.map((el, i) => (
                    <>
                      <TabPanel
                        value={el.seq}
                        onClick={(e) => {
                          clickTabPanel(el?.children?.[0]?.code);
                        }}
                        style={{
                          marginTop: '20px',
                          marginBottom: '20px',
                          padding: '0',
                          borderBottom:
                            activeTab === 1 ? '2px solid #58a9ffda' : 'initial',
                        }}
                      >
                        {el?.children?.[0]?.name}
                      </TabPanel>
                      <TabPanel
                        value={el.seq}
                        onClick={(e) => {
                          clickTabPanel(el?.children?.[1]?.code);
                        }}
                        style={{
                          marginTop: '20px',
                          marginBottom: '20px',
                          padding: '0',
                          borderBottom:
                            activeTab === 2 ? '2px solid #58a9ffda' : 'initial',
                        }}
                      >
                        {el?.children?.[1]?.name}
                      </TabPanel>
                    </>
                  ))}
                </S.navBar>
              </TabContext>
            </Box>
          </S.navContainer>
          <S.sideContainer>
            <div role="presentation" onClick={handleClickSidebar}>
              <Breadcrumbs separator="|">
                <Link underline="hover" color="inherit" href="/preparing">
                  가이드
                </Link>
                <Link underline="hover" color="inherit" href="/preparing">
                  고객센터
                </Link>
                <Link underline="hover" color="inherit" href="/mypage">
                  마이페이지
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  href="/login"
                  onClick={handleRemoveCookie}
                >
                  로그아웃
                </Link>
              </Breadcrumbs>
            </div>
          </S.sideContainer>
        </S.topHead>
      </S.head>
    </S.main>
  );
};

const S = {
  main: styled.main`
    width: 1280px;
    margin-top: 20px;
  `,
  head: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
  `,
  topHead: styled.div`
    display: flex;
    border-bottom: 1px solid #a3aed0;
  `,
  iconContainer: styled.div`
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `,
  navContainer: styled.nav`
    width: 500px;
  `,
  navBar: styled.div`
    display: flex;
    align-items: flex-end;
    gap: 50px;
    cursor: pointer;
  `,
  sideContainer: styled.div`
    width: 600px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-bottom: 10px;
  `,
};

export default Header;
