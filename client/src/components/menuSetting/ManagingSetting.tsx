import * as React from 'react';

import styled from 'styled-components';

import { SettingList } from '../../components/molecules';

export function ManagingSetting() {
  const dummyData = [
    {
      idx: 1,
      tag: '문항',
      name: '문항 리스트',
      lastModifiedAt: '2024.06.01',
      examiner: '김드림',
      path: '/contentListManagementSetting',
    },
    {
      idx: 2,
      tag: '문항',
      name: '문항 일괄편집',
      lastModifiedAt: '2024.06.01',
      examiner: '김드림',
      path: '/contentEditingSetting',
    },
    {
      idx: 3,
      tag: '검수관리',
      name: '검수관리 리스트',
      lastModifiedAt: '2024.06.01',
      examiner: '김드림',
      path: '/inspectionManagementSetting',
    },
  ];

  return (
    <Container>
      <TitleWrapper>
        <Title>콘텐츠 관리 설정</Title>
      </TitleWrapper>
      <SettingList
        list={dummyData}
        totalCount={3}
        //itemsCountPerPage={workbookList.pagination.pageUnit}
        //tabVeiw={tabVeiw}
      ></SettingList>
    </Container>
  );
}

const Container = styled.div`
  padding: 40px 80px;
  width: 100%;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 800;
`;
