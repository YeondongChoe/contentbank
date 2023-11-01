import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { contentCreateState } from '../recoil/State';
import axios from 'axios';
import { getCookie, setCookie } from '../utils/ReactCookie';

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
  const setClickValue = useSetRecoilState(contentCreateState);
  const [activeTab, setActiveTab] = useState(0);
  const [menuValue, setMenuValue] = useState<MenuListType[]>();

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setActiveTab(0);
  };

  const handleClickSidebar = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {};

  const clickTabPanel = (code: string) => {
    if (code === 'CNC_Q') {
      setActiveTab(1);
      setClickValue(1);
    } else if (code === 'CNC_W') {
      setActiveTab(2);
      setClickValue(2);
    } else if (code === 'CNM_Q') {
      setActiveTab(1);
      setClickValue(3);
    } else if (code === 'CNM_T') {
      setActiveTab(2);
      setClickValue(4);
    } else if (code === 'OPM_M') {
      setActiveTab(1);
      setClickValue(5);
    } else if (code === 'OPM_R') {
      setActiveTab(2);
      setClickValue(6);
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
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    getMenuList();
  }, []);

  return (
    <S.main>
      <S.head>
        <S.topHead>
          <S.iconContainer>
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
                        style={{ fontSize: '20px' }}
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
                <Link underline="hover" color="inherit" href="/">
                  가이드
                </Link>
                <Link underline="hover" color="inherit" href="/mypage">
                  고객센터
                </Link>
                <Link underline="hover" color="inherit" href="/mypage">
                  마이페이지
                </Link>
                <Link underline="hover" color="inherit" href="/">
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
    //margin-bottom: 50px;
    display: flex;
  `,
  head: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
  `,
  topHead: styled.div`
    display: flex;
    border-bottom: 1px solid gray;
  `,
  iconContainer: styled.div`
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
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
