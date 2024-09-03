import * as React from 'react';

import styled from 'styled-components';

import { SettingList } from '../../components/molecules';

export function CreatingSetting() {
  const dummyData = [
    {
      idx: 1,
      tag: '문항',
      name: '문항 리스트',
      lastModifiedAt: '2024.06.01',
      examiner: '김드림',
      path: '/contentListSetting',
    },
    {
      idx: 2,
      tag: '문항',
      name: '문항 등록/수정 > DT&Editing',
      lastModifiedAt: '2024.06.01',
      examiner: '김드림',
      path: '/contentDtEditingSetting',
    },
    {
      idx: 3,
      tag: '문항',
      name: '문항 등록/수정 > 문항분류',
      lastModifiedAt: '2024.06.01',
      examiner: '김드림',
    },
    {
      idx: 4,
      tag: '학습지',
      name: '학습지 리스트',
      lastModifiedAt: '2024.06.01',
      examiner: '김드림',
    },
    {
      idx: 5,
      tag: '학습지',
      name: '학습지 등록/수정 > 단원유형별',
      lastModifiedAt: '2024.06.01',
      examiner: '김드림',
    },
    {
      idx: 6,
      tag: '학습지',
      name: '학습지 등록/수정 > 기출(학교내신)',
      lastModifiedAt: '2024.06.01',
      examiner: '김드림',
    },
    {
      idx: 7,
      tag: '학습지',
      name: '학습지 등록/수정 > 기출(전국시험)',
      lastModifiedAt: '2024.06.01',
      examiner: '김드림',
    },
  ];

  return (
    <Container>
      <TitleWrapper>
        <Title>콘텐츠 제작 설정</Title>
      </TitleWrapper>
      <SettingList
        list={dummyData}
        totalCount={7}
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
