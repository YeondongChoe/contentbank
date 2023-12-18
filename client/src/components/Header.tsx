import * as React from 'react';
import { useState, useEffect } from 'react';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { getAuthorityMenu } from '../api/getAxios';
import { createListCodeValueAtom, checkBoxValueAtom } from '../state/valueAtom';
import { getAuthorityCookie, removeAuthorityCookie } from '../utils/cookies';

import { COLOR } from './contents';

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
      <IconWrapper onClick={moveMainpage}>
        <AccountBalanceIcon
          style={{ fontSize: '50px', color: `${COLOR.PRIMARY}` }}
        />
      </IconWrapper>

      <NavBarWrapper
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
            <NavMenuWrapper>
              {menuValue?.map((el, i) => (
                <PanelWrapper key={i}>
                  {isMenuVisible && (
                    <EachPanelWrapper
                      onMouseLeave={() => {
                        setValue('');
                      }}
                    >
                      {el?.children.map((li) => (
                        <TabPanelWrapper
                          key={li.name}
                          onClick={(e) => {
                            moveTabPanel(li.code);
                          }}
                        >
                          <TabPanel
                            className="hover-effect"
                            value={li.seq.toString()}
                            style={{
                              marginTop: '10px',
                              marginBottom: '10px',
                              padding: '0',
                              transition: 'border-bottom 0.3s',
                            }}
                          >
                            {li.name}
                          </TabPanel>
                        </TabPanelWrapper>
                      ))}
                    </EachPanelWrapper>
                  )}
                </PanelWrapper>
              ))}
            </NavMenuWrapper>
          </TabContext>
        </Box>
      </NavBarWrapper>

      <SideMenuWrapper>
        <Link color="inherit" href="/preparing">
          가이드
        </Link>
        <Link color="inherit" href="/preparing">
          고객센터
        </Link>
        <Link color="inherit" href="/mypage">
          마이페이지
        </Link>
        <Link color="inherit" href="/login" onClick={removeCookie}>
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

const Wrapper = styled.div`
  /* padding: 0px 20px; */
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
  z-index: 1;
  font-size: 20px;
`;

const NavMenuWrapper = styled.div`
  display: flex;
  position: absolute;
`;

const PanelWrapper = styled.div`
  width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EachPanelWrapper = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 1px 10px -4px rgba(112, 144, 176, 0.8);
`;

const TabPanelWrapper = styled.div`
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
