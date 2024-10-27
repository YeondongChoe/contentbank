import * as React from 'react';
import { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import { resourceServiceInstance } from '../../api/axios';
import { SettingList } from '../../components/molecules';
import { MenuDataType } from '../../types';

export function ManagingSetting() {
  const [menu, setMenu] = useState<MenuDataType[]>([]);

  //그룹 화면설정 정보 불러오기 api
  const getMenu = async () => {
    const res = await resourceServiceInstance.get(`/v1/menu?type=MANAGEMENT`);
    //console.log(res);
    return res;
  };
  const { data: menuData } = useQuery({
    queryKey: ['get-menu'],
    queryFn: getMenu,
    meta: {
      errorMessage: 'get-menu 에러 메세지',
    },
  });

  useEffect(() => {
    if (menuData) {
      setMenu(menuData.data.data.menuList);
    }
  }, [menuData]);

  return (
    <Container>
      <TitleWrapper>
        <Title>콘텐츠 관리 설정</Title>
      </TitleWrapper>
      <SettingList
        list={menu}
        totalCount={3}
        itemsCountPerPage={menuData?.data.data.pagination.pageUnit}
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
