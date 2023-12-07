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

export function Header() {
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
    <Container>
      <Warpper>
        <IconWarpper onClick={moveMainpage}>
          <AccountBalanceIcon style={{ fontSize: '50px' }} />
        </IconWarpper>
        <NavBarWarpper
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
              <NavMenuWarpper>
                {menuValue?.map((el, i) => (
                  <PanelWarpper key={i}>
                    {isMenuVisible && (
                      <EachPanelWarpper
                        onMouseLeave={() => {
                          setValue('');
                        }}
                      >
                        <TabPanelWarpper
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
                        </TabPanelWarpper>
                        <TabPanelWarpper
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
                        </TabPanelWarpper>
                      </EachPanelWarpper>
                    )}
                  </PanelWarpper>
                ))}
              </NavMenuWarpper>
            </TabContext>
          </Box>
        </NavBarWarpper>
        <SideMenuWarpper>
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
        </SideMenuWarpper>
      </Warpper>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 20px;
`;

const Warpper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 110px;
  border-bottom: 1px solid #a3aed0;
  padding: 0px 20px;
`;

const IconWarpper = styled.div`
  width: 50px;
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
`;

const NavBarWarpper = styled.nav`
  display: flex;
  align-items: center;
  flex: 1 0 0;
  z-index: 1;
  font-size: 20px;
`;

const NavMenuWarpper = styled.div`
  display: flex;
  position: absolute;
`;

const PanelWarpper = styled.div`
  width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EachPanelWarpper = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 1px 10px -4px rgba(112, 144, 176, 0.8);
`;

const TabPanelWarpper = styled.div`
  width: 160px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
    border-radius: 5px;
  }
`;

const SideMenuWarpper = styled.div`
  display: flex;
  align-items: flex-end;
  padding-bottom: 10px;
`;
