import * as React from 'react';
import { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { workbookInstance } from '../../api/axios';
import { Loader, Button, Search, TabMenu } from '../../components';
import { WorkbookList } from '../../components/molecules/workbookList';
import { pageAtom } from '../../store/utilAtom';
import { windowOpenHandler } from '../../utils/windowHandler';

export function Worksheet() {
  const [tabVeiw, setTabVeiw] = useState<string>('학습지');
  const [subTabVeiw, setSubTabVeiw] = useState<string>('전체');
  const [searchValue, setSearchValue] = useState<string>('');

  const [page, setPage] = useRecoilState(pageAtom);

  const changeTab = () => {
    setPage(1);
  };

  // 학습지 리스트 불러오기 api
  const getWorkbookList = async () => {
    const res = await workbookInstance.get(
      `${tabVeiw == '즐겨찾는 학습지' ? `/v1/workbook/favorite?pageIndex=${page}&pageUnit=${8}` : `/v1/workbook?pageIndex=${page}&pageUnit=${8}`}`,
    );
    console.log(`getWorkbook 결과값`, res);
    return res;
  };

  const {
    isLoading,
    data: workbookListData,
    refetch: workbookListRefetch,
  } = useQuery({
    queryKey: ['get-workbookList'],
    queryFn: getWorkbookList,
    meta: {
      errorMessage: 'get-workbookList 에러 메세지',
    },
  });

  const workbookList = workbookListData?.data.data;

  // 탭 바뀔시 초기화
  useEffect(() => {
    workbookListRefetch();
    setSearchValue('');
  }, [tabVeiw, page]);

  // 검색 기능 함수
  const filterSearchValue = () => {
    console.log('기존데이터 입력된 값으로 솎아낸뒤 재출력');
  };

  // 학습지 만들기 페이지로 이동
  const openWindowCreateWorksheet = () => {
    windowOpenHandler({
      name: 'createworksheetwindow',
      url: '/content-create/exam/step1',
      options:
        'width=1600,height=965,top=Math.round(window.screen.height / 2 - windowHeight / 2),left=Math.round(window.screen.width / 2 - windowWidth / 2),toolbar=no,titlebar=no,scrollbars=no,status=no,location=no,menubar=no,frame=no',
    });
  };

  const menuList = [
    {
      label: '학습지',
      value: '학습지',
    },
    {
      label: '즐겨찾는 학습지',
      value: '즐겨찾는 학습지',
    },
  ];
  const subMenuList = [
    {
      label: '전체',
      value: '전체',
    },
    {
      label: '초등',
      value: '초등',
    },
    {
      label: '중등',
      value: '중등',
    },
    {
      label: '고등',
      value: '고등',
    },
  ];

  return (
    <Container>
      <>
        <TitleWrapper>
          <Title>학습지</Title>
          <Button
            height={'35px'}
            width={'150px'}
            onClick={openWindowCreateWorksheet}
            fontSize="13px"
            $filled
            cursor
          >
            + 학습지 만들기
          </Button>
        </TitleWrapper>
        <HeadWrapper>
          <TabMenu
            length={2}
            menu={menuList}
            width={'300px'}
            selected={tabVeiw}
            setTabVeiw={setTabVeiw}
            $margin={'10px 0'}
            onClickTab={changeTab}
          />
        </HeadWrapper>

        {isLoading && (
          <LoaderWrapper>
            <Loader width="50px" />
          </LoaderWrapper>
        )}

        {!isLoading && workbookListData && (
          <>
            <TabWrapper>
              <TabMenu
                length={4}
                menu={subMenuList}
                width={'300px'}
                selected={subTabVeiw}
                setTabVeiw={setSubTabVeiw}
                lineStyle
                $margin={'10px 0 20px 0'}
              />
              <Search
                value={searchValue}
                width={'25%'}
                height="40px"
                onClick={() => filterSearchValue()}
                onKeyDown={(e) => {}}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="학습지명, 학년, 태그, 작성자 검색."
              />
            </TabWrapper>
            <WorkbookList
              list={workbookList.workbookList}
              totalCount={workbookList.pagination.totalCount}
              itemsCountPerPage={workbookList.pagination.pageUnit}
              tabVeiw={tabVeiw}
            ></WorkbookList>
          </>
        )}
      </>
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
const HeadWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
`;
const TabWrapper = styled.div`
  //min-height: 280px;
  display: flex;
  justify-content: space-between;
`;
const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 30px;
  padding-left: calc(50% - 35px);
`;
