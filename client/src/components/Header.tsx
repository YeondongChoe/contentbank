import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAuthorityCookie, removeAuthorityCookie } from '../utils/cookies';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { createListCodeValueAtom, checkBoxValueAtom } from '../state/valueAtom';
import { getAuthorityMenu } from '../api/getAxios';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

type menuListProps = {
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
  const [menuValue, setMenuValue] = useState<menuListProps[]>([]);
  const [didMount, setDidMount] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const setContentSeq = useSetRecoilState(checkBoxValueAtom);

  const setcreateListCodeValueAtom = useSetRecoilState(createListCodeValueAtom);

  const navigate = useNavigate();

  let mountCount = 1;

  const openTabMenu = (newValue: string) => {
    setValue(newValue);
    setActiveTab(0);
  };

  const removeCookie = () => {
    removeAuthorityCookie('accessToken');
  };

  const moveMainpage = () => {
    navigate('/contentlist');
  };

  const moveTabPanel = (code: string) => {
    if (code === 'CNC_Q') {
      setActiveTab(1);
      setcreateListCodeValueAtom(code);
      setContentSeq([]);
      navigate('/contentlist');
    } else if (code === 'CNC_W') {
      setActiveTab(2);
      setcreateListCodeValueAtom(code);
      navigate('/contentworksheet');
    } else if (code === 'CNM_Q') {
      setActiveTab(1);
      setcreateListCodeValueAtom(code);
      setContentSeq([]);
      navigate('/managementlist');
    } else if (code === 'CNM_T') {
      setActiveTab(2);
      setcreateListCodeValueAtom(code);
      navigate('/managementtree');
    } else if (code === 'OPM_M') {
      setActiveTab(1);
      setcreateListCodeValueAtom(code);
      navigate('/operationmember');
    } else if (code === 'OPM_R') {
      setActiveTab(2);
      setcreateListCodeValueAtom(code);
      navigate('/operationauthority');
    }
  };

  useEffect(() => {
    if (!getAuthorityCookie('accessToken')) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    mountCount++;
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      getAuthorityMenu({ setMenuValue });
    }
  }, [didMount, setcreateListCodeValueAtom]);

  return (
    <S.main>
      <S.head>
        <S.topHead>
          <S.iconWarpper onClick={moveMainpage}>
            <AccountBalanceIcon style={{ fontSize: '70px' }} />
          </S.iconWarpper>
          <S.navContainer
            onMouseEnter={() => {
              setValue('');
            }}
            onMouseLeave={() => {
              setValue('');
            }}
          >
            <Box sx={{ typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderColor: 'divider' }}>
                  <TabList>
                    {menuValue?.map((el, i) => (
                      <Tab
                        key={i}
                        label={el.name}
                        value={el.seq}
                        style={{ fontSize: '20px', fontWeight: 'bold' }}
                        onMouseEnter={() => {
                          openTabMenu(el.seq.toString());
                          setIsMenuVisible(true);
                        }}
                      />
                    ))}
                  </TabList>
                </Box>
                <S.navBar>
                  {menuValue?.map((el, i) => (
                    <S.panelContainer key={i}>
                      {isMenuVisible && (
                        <S.panelWarpper
                          onMouseLeave={() => {
                            setValue('');
                          }}
                        >
                          <S.tabPanelWarpper
                            onClick={(e) => {
                              moveTabPanel(el?.children?.[0]?.code);
                            }}
                          >
                            <TabPanel
                              className="hover-effect"
                              value={el.seq.toString()}
                              style={{
                                marginTop: '10px',
                                marginBottom: '10px',
                                padding: '0',
                                transition: 'border-bottom 0.3s',
                              }}
                            >
                              {el?.children?.[0]?.name}
                            </TabPanel>
                          </S.tabPanelWarpper>
                          <S.tabPanelWarpper
                            onClick={(e) => {
                              moveTabPanel(el?.children?.[1]?.code);
                            }}
                          >
                            <TabPanel
                              value={el.seq.toString()}
                              style={{
                                marginTop: '10px',
                                marginBottom: '10px',
                                padding: '0',
                                transition: 'border-bottom 0.3s',
                              }}
                            >
                              {el?.children?.[1]?.name}
                            </TabPanel>
                          </S.tabPanelWarpper>
                        </S.panelWarpper>
                      )}
                    </S.panelContainer>
                  ))}
                </S.navBar>
              </TabContext>
            </Box>
          </S.navContainer>
          <S.sideContainer>
            <div>
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
                  onClick={removeCookie}
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
    width: 1280px;
    display: flex;
    flex-direction: column;
  `,
  topHead: styled.div`
    display: flex;
    height: 113px;
    border-bottom: 1px solid #a3aed0;
  `,
  iconWarpper: styled.div`
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `,
  navContainer: styled.nav`
    display: flex;
    align-items: center;
    z-index: 1;
  `,
  navBar: styled.div`
    display: flex;
    position: absolute;
  `,
  panelContainer: styled.div`
    width: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  panelWarpper: styled.div`
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 1px 10px -4px rgba(112, 144, 176, 0.8);
  `,
  tabPanelWarpper: styled.div`
    width: 160px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
      color: white;
      border-radius: 5px;
    }
  `,
  sideContainer: styled.div`
    width: 650px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-bottom: 10px;
  `,
};

export { Header };
