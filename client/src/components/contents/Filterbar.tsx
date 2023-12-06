import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

const Filterbar = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [value, setValue] = useState('1');
  const [didMount, setDidMount] = useState(false);

  let mountCount = 1;

  const changeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setSelectedRows([]);
  };

  const filterList = (enabled: string) => {
    console.log('학습지 리스트 조건에 맞게 불러오는 API 함수');
  };

  useEffect(() => {
    mountCount++;
    setDidMount(true);
    return () => {};
  }, []);

  useEffect(() => {
    if (didMount) {
      console.log('학습지 리스트 불러오는 API 함수');
    }
  }, [didMount]);

  return (
    <Container>
      <Box sx={{ typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderColor: 'divider' }}>
            <TabList onChange={changeTab}>
              <Tab
                label="전체"
                value="1"
                style={{ fontSize: '16px', fontWeight: 'bold' }}
                onClick={() => filterList('')}
              />
              <Tab
                label="초등"
                value="2"
                style={{ fontSize: '16px', fontWeight: 'bold' }}
                onClick={() => filterList('elemental')}
              />
              <Tab
                label="중등"
                value="3"
                style={{ fontSize: '16px', fontWeight: 'bold' }}
                onClick={() => filterList('middle')}
              />
              <Tab
                label="고등"
                value="4"
                style={{ fontSize: '16px', fontWeight: 'bold' }}
                onClick={() => filterList('high')}
              />
            </TabList>
          </Box>
        </TabContext>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  margin: 20px 10px 20px 70px;
  display: flex;
  justify-content: space-between;
`;

export { Filterbar };
