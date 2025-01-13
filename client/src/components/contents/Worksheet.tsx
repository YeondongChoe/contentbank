import * as React from 'react';
import { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { GrPlan } from 'react-icons/gr';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  workbookInstance,
  classificationInstance,
  resourceServiceInstance,
} from '../../api/axios';
import {
  Loader,
  Button,
  Search,
  TabMenu,
  Select,
  CommonDate,
  IconButton,
  openToastifyAlert,
  List,
  ListItem,
} from '../../components';
import { WorkbookList } from '../../components/molecules/workbookList';
import { pageAtom } from '../../store/utilAtom';
import { ItemCategoryType } from '../../types';
import { selectedListType } from '../../types/WorkbookType';
import { postRefreshToken } from '../../utils/tokenHandler';
import { windowOpenHandler } from '../../utils/windowHandler';

export function Worksheet() {
  const [tabView, setTabView] = useState<string>('학습지');
  const [searchValue, setSearchValue] = useState<string>('');
  const [content, setContent] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [categoryTitles, setCategoryTitles] = useState<ItemCategoryType[]>([]);
  const [categoryList, setCategoryList] = useState<ItemCategoryType[][]>([]);
  // 셀렉트
  const [selectedTag, setSelectedTag] = useState<string>(''); //태그
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>(''); //교육과정
  const [selectedLevel, setSelectedLevel] = useState<string>(''); //학교급
  //초기 셀렉트 list
  const [selectedList, setSelectedList] = useState<selectedListType[]>([]);

  const [page, setPage] = useRecoilState(pageAtom);

  const changeTab = () => {
    setPage(1);
  };

  //태그 선택값 하드코딩
  const tagData = {
    tageClassList: [
      {
        idx: 1,
        name: '연습문제',
        code: '태그',
      },
      {
        idx: 2,
        name: '일일테스트',
        code: '태그',
      },
      {
        idx: 3,
        name: '모의고사',
        code: '태그',
      },
      {
        idx: 4,
        name: '내신대비',
        code: '태그',
      },
      {
        idx: 5,
        name: '월말테스트',
        code: '태그',
      },
    ],
  };

  //  카테고리 불러오기 api
  const getCategory = async () => {
    const res = await classificationInstance.get(`/v1/category`);
    return res;
  };
  const { data: categoryData, isLoading: isCategoryLoading } = useQuery({
    queryKey: ['get-category'],
    queryFn: getCategory,
    meta: {
      errorMessage: 'get-category 에러 메세지',
    },
  });
  useEffect(() => {
    if (categoryData) {
      setCategoryTitles(categoryData.data.data.categoryItemList);
    }
  }, [categoryData]);

  // 카테고리의 그룹 유형 조회
  const getCategoryGroups = async () => {
    const response = await classificationInstance.get('/v1/category/group/A');
    return response.data.data.typeList;
  };
  const { data: groupsData, refetch: groupsDataRefetch } = useQuery({
    queryKey: ['get-category-groups-A'],
    queryFn: getCategoryGroups,
    enabled: !!categoryData,
    meta: {
      errorMessage: 'get-category-groups-A 에러 메세지',
    },
  });
  useEffect(() => {
    if (groupsData) {
      fetchCategoryItems(groupsData, setCategoryList);
    }
  }, [groupsData]);

  // 카테고리의 그룹 아이템 조회
  const fetchCategoryItems = async (
    typeList: string,
    setCategory: React.Dispatch<React.SetStateAction<ItemCategoryType[][]>>,
  ) => {
    const typeIds = typeList.split(',');
    try {
      const requests = typeIds.map((id) =>
        classificationInstance.get(`/v1/category/class/${id}`),
      );
      const responses = await Promise.all(requests);
      const itemsList = responses.map(
        (res) => res?.data?.data?.categoryClassList,
      );
      setCategory(itemsList);
    } catch (error: any) {
      if (error.response.data.code == 'GE-002') postRefreshToken();
    }
  };
  useEffect(() => {
    //console.log('categoryList', categoryList);
  }, [categoryList]);

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);
  };

  const [onSearch, setOnSearch] = useState<boolean>(false);

  // 학습지 리스트 불러오기 api
  const getWorkbookList = async () => {
    if (tabView == '즐겨찾는 학습지') {
      const res = await workbookInstance.get(
        !onSearch
          ? `/v1/workbook/favorite?pageIndex=${page}&pageUnit=${8}`
          : `/v1/workbook/favorite?pageIndex=${page}&pageUnit=${8}&searchKeyword=${searchValue}&tag=${selectedTag === '연습문제' ? 'EXERCISES' : selectedTag === '일일테스트' ? 'DAILY_TEST' : selectedTag === '모의고사' ? 'PRACTICE_TEST' : selectedTag === '내신대비' ? 'TEST_PREP' : selectedTag === '월말테스트' ? 'MONTHLY_TEST' : ''}&curriculum=${selectedCurriculum}&level=${selectedLevel}&searchKeywordFrom=${startDate}&searchKeywordTo=${endDate}`,
      );
      // console.log(`getWorkbook 즐겨찾기 결과값`, res);
      return res;
    } else {
      const res = await workbookInstance.get(
        !onSearch
          ? `/v1/workbook?pageIndex=${page}&pageUnit=${8}`
          : `/v1/workbook?pageIndex=${page}&pageUnit=${8}&searchKeyword=${searchValue}&tag=${selectedTag === '연습문제' ? 'EXERCISES' : selectedTag === '일일테스트' ? 'DAILY_TEST' : selectedTag === '모의고사' ? 'PRACTICE_TEST' : selectedTag === '내신대비' ? 'TEST_PREP' : selectedTag === '월말테스트' ? 'MONTHLY_TEST' : ''}&curriculum=${selectedCurriculum}&level=${selectedLevel}&searchKeywordFrom=${startDate}&searchKeywordTo=${endDate}`,
      );
      // console.log(`getWorkbook 결과값`, res);
      return res;
    }
  };
  const {
    isPending,
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

  //그룹 화면설정 정보 불러오기 api
  const getMenu = async () => {
    const res = await resourceServiceInstance.get(
      `/v1/menu/path?url=workbookListSetting`,
    );
    //console.log(res);
    return res;
  };
  const {
    data: menuData,
    isLoading: isMenuLoading,
    refetch: menuRefetch,
  } = useQuery({
    queryKey: ['get-menu'],
    queryFn: getMenu,
    meta: {
      errorMessage: 'get-menu 에러 메세지',
    },
  });

  useEffect(() => {
    menuRefetch();
  }, []);

  useEffect(() => {
    if (menuData) {
      const filterList = menuData.data.data.menuDetailList;
      const nameListArray = filterList[0]?.nameList?.split(',') || [];
      const viewListArray = (filterList[0]?.viewList?.split(',') || []).map(
        (item: string) => item === 'true',
      );
      const searchListArray = (filterList[0]?.searchList?.split(',') || []).map(
        (item: string) => item === 'true',
      );
      const newArray = nameListArray.map((name: string, index: number) => ({
        name,
        idx: index,
        view: viewListArray[index] || false,
        search: searchListArray[index] || false,
      }));
      setSelectedList(newArray);
    }
  }, [menuData]);

  // 탭 바뀔시 초기화
  useEffect(() => {
    workbookListRefetch();
    setSearchValue('');
  }, [tabView, page]);

  // 검색 기능 함수
  const filterSearchValue = () => {
    workbookListRefetch();
  };

  const filterSearchValueEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // if (event.key === 'Enter') {
    //   workbookListRefetch();
    // }
    if (event.key === 'Backspace') {
      setSearchValue('');
      workbookListRefetch();
    }
  };

  //셀렉트 초기화
  const handleDefaultSelect = (defaultValue?: string) => {
    if (defaultValue == 'all') {
      setSelectedTag('');
      setSelectedCurriculum('');
      setSelectedLevel('');
      setStartDate('');
      setEndDate('');
    }

    switch (defaultValue) {
      case '태그':
        setSelectedTag('');
        break;
      case categoryTitles[0]?.code:
        setSelectedCurriculum('');
        break;
      case categoryTitles[1]?.code:
        setSelectedLevel('');
        break;
      default:
        break;
    }

    setOnSearch(false);
  };

  // 검색용 셀렉트 선택시
  useEffect(() => {
    workbookListRefetch();
    setOnSearch(true);
  }, [
    searchValue,
    selectedTag,
    selectedCurriculum,
    selectedLevel,
    startDate,
    endDate,
  ]);

  // 학습지 만들기 페이지로 이동
  const openWindowCreateWorksheet = () => {
    windowOpenHandler({
      name: 'createworksheetwindow',
      url: '/content-create/exam/step1',
      options:
        'width=1600,height=965,top=Math.round(window.screen.height / 2 - windowHeight / 2),left=Math.round(window.screen.width / 2 - windowWidth / 2),toolbar=no,titlebar=no,scrollbars=no,status=no,location=no,menubar=no,frame=no',
    });
    window.localStorage.clear();
  };

  //step3 학습지 생성 후 postMessage로 리스트 갱신
  useEffect(() => {
    // 메시지 이벤트 리스너 설정
    const handleMessage = (event: any) => {
      if (event.data === 'popupClosed') {
        callServerAPI();
      }
    };
    window.addEventListener('message', handleMessage);
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  //리스트 갱신
  const callServerAPI = () => {
    workbookListRefetch();
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
            selected={tabView}
            setTabView={setTabView}
            $margin={'10px 0'}
            onClickTab={changeTab}
            lineStyle
          />
        </HeadWrapper>
        <SelectWrapper>
          {selectedList.map((list) => {
            if (list.name === '태그' && list.search === true) {
              return (
                <div key={list.idx}>
                  {tagData && (
                    <Select
                      onDefaultSelect={() => handleDefaultSelect('태그')}
                      width="130px"
                      defaultValue="태그"
                      key="태그"
                      options={tagData.tageClassList}
                      onSelect={(event) => selectCategoryOption(event)}
                      setSelectedValue={setSelectedTag}
                    />
                  )}
                </div>
              );
            } else if (
              ['대상학년', '학습지명', '작성자'].includes(list.name) &&
              list.search === true
            ) {
              return (
                <div key={list.idx}>
                  <Search
                    value={searchValue}
                    width="100%"
                    height="40px"
                    onClick={() => filterSearchValue()}
                    onKeyDown={(e) => filterSearchValueEnter(e)}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                      setOnSearch(true);
                    }}
                    placeholder={`${list.name} 검색`}
                  />
                </div>
              );
            } else if (list.name === '등록일' && list.search === true) {
              return (
                <DatePickerWrapper key={list.idx}>
                  <CommonDate
                    setDate={setStartDate}
                    $button={
                      <IconButton
                        width="125px"
                        height="40px"
                        fontSize="14px"
                        onClick={() => {}}
                      >
                        <span className="btn_title">
                          {startDate === '' ? `시작일` : `${startDate}`}
                        </span>
                        <GrPlan />
                      </IconButton>
                    }
                  />
                  <span> ~ </span>
                  <CommonDate
                    setDate={setEndDate}
                    minDate={startDate}
                    $button={
                      <IconButton
                        width="125px"
                        height="40px"
                        fontSize="14px"
                        onClick={() => {}}
                      >
                        <span className="btn_title">
                          {endDate === '' ? `종료일` : `${endDate}`}
                        </span>
                        <GrPlan />
                      </IconButton>
                    }
                  />
                </DatePickerWrapper>
              );
            }
            return null;
          })}
        </SelectWrapper>

        {isPending && (
          <LoaderWrapper>
            <Loader width="50px" />
          </LoaderWrapper>
        )}
        {!isPending && workbookListData && (
          <WorkbookList
            list={workbookList.workbookList}
            selectedList={selectedList}
            totalCount={workbookList.pagination.totalCount}
            itemsCountPerPage={workbookList.pagination.pageUnit}
            tabView={tabView}
          ></WorkbookList>
        )}
      </>
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
const SelectWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  padding-bottom: 10px;
  .btn_title {
    padding-right: 5px;
  }
`;
const DatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 30px;
  padding-left: calc(50% - 35px);
`;
