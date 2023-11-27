import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

const Filterbar = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [value, setValue] = React.useState('1');
  const [didMount, setDidMount] = useState(false);

  let mountCount = 1;

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setSelectedRows([]);
  };

  const handleMemberList = (enabled: string) => {
    // getMemberList({ setMemberList }, enabled);
  };

  useEffect(() => {
    mountCount++;
    setDidMount(true);
    return () => {};
  }, []);

  useEffect(() => {
    if (didMount) {
      //   getMemberList({ setMemberList }, '');
    }
  }, [didMount]);

  return (
    <S.mainContainer>
      <Box sx={{ typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderColor: 'divider' }}>
            <TabList onChange={handleChangeTab}>
              <Tab
                label="전체"
                value="1"
                style={{ fontSize: '16px', fontWeight: 'bold' }}
                onClick={() => handleMemberList('')}
              />
              <Tab
                label="초등"
                value="2"
                style={{ fontSize: '16px', fontWeight: 'bold' }}
                onClick={() => handleMemberList('Y')}
              />
              <Tab
                label="중등"
                value="3"
                style={{ fontSize: '16px', fontWeight: 'bold' }}
                onClick={() => handleMemberList('N')}
              />
              <Tab
                label="고등"
                value="4"
                style={{ fontSize: '16px', fontWeight: 'bold' }}
                onClick={() => handleMemberList('N')}
              />
            </TabList>
          </Box>
        </TabContext>
      </Box>
    </S.mainContainer>
  );
};

const S = {
  mainContainer: styled.div`
    margin: 20px 10px 20px 70px;
    display: flex;
    justify-content: space-between;
  `,
};

export default Filterbar;
