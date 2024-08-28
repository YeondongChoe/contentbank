import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { COLOR } from '../../components/constants';
import { AlertBar, Button, Loader, ValueNone } from '../atom';
import { TabMenu } from '../molecules';

import { CategroyManagement, GroupManagement } from './metainfotab';

export function MetaInfo() {
  const [tabVeiw, setTabVeiw] = useState<string>('카테고리 관리');
  const backgroundRef = useRef<HTMLDivElement>(null);

  /* 안내 알럿 */
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const closeSuccessAlert = () => {
    setIsSuccessAlertOpen(false);
  };
  const tabMenuList = [
    {
      label: '카테고리 관리',
      value: '카테고리 관리',
    },
    {
      label: '그룹 관리',
      value: '그룹 관리',
    },
  ];

  // 탭메뉴 클릭시
  const changeTab = () => {};

  // 배경 클릭시 체크리스트 초기화
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target?.toString().includes('Div')) {
        console.log('background div');
      }
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [backgroundRef]);

  return (
    <Container ref={backgroundRef}>
      <AlertBar
        type="success"
        isAlertOpen={isSuccessAlertOpen}
        closeAlert={closeSuccessAlert}
        message={'아이디가 생성 되었습니다.'}
      ></AlertBar>
      <TitleWrapper>
        <Title>메타정보 관리</Title>
      </TitleWrapper>

      {/* TODO : 데이터 연결후 로딩 처리 */}
      {/* {isLoading && (
        <LoaderWrapper>
          <Loader width="50px" />
        </LoaderWrapper>
      )} */}
      {/* {!isLoading && memberListData && ( */}
      <>
        <TabMenu
          length={3}
          menu={tabMenuList}
          selected={tabVeiw}
          width={'300px'}
          setTabVeiw={setTabVeiw}
          lineStyle
          $margin={'10px 0'}
          onClickTab={changeTab}
        />

        {tabVeiw == '카테고리 관리' && <CategroyManagement />}
        {tabVeiw == '그룹 관리' && <GroupManagement />}
      </>
      {/* )} */}
    </Container>
  );
}

const Container = styled.div`
  padding: 40px;
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
