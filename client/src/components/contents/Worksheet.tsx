import * as React from 'react';
import { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { GrPlan } from 'react-icons/gr';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  workbookInstance,
  classificationInstance,
  quizService,
} from '../../api/axios';
import {
  Loader,
  Button,
  Search,
  TabMenu,
  Select,
  CommonDate,
  IconButton,
} from '../../components';
import { WorkbookList } from '../../components/molecules/workbookList';
import { pageAtom } from '../../store/utilAtom';
import { ItemCategoryType, QuizListType } from '../../types';
import { postRefreshToken } from '../../utils/tokenHandler';
import { windowOpenHandler } from '../../utils/windowHandler';

export function Worksheet() {
  const [tabVeiw, setTabVeiw] = useState<string>('학습지');
  const [searchValue, setSearchValue] = useState<string>('');
  const [content, setContent] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [categoryTitles, setCategoryTitles] = useState<ItemCategoryType[]>([]);
  const [categoryList, setCategoryList] = useState<ItemCategoryType[][]>([]);
  const [categoriesE, setCategoriesE] = useState<ItemCategoryType[][]>([]);

  const [page, setPage] = useRecoilState(pageAtom);

  const changeTab = () => {
    setPage(1);
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
  // 카테고리의 그룹 유형 조회 (출처)
  const getCategoryGroupsE = async () => {
    const response = await classificationInstance.get('/v1/category/group/E');
    return response.data.data.typeList;
  };
  const { data: groupsEData, refetch: groupsDataERefetch } = useQuery({
    queryKey: ['get-category-groups-E'],
    queryFn: getCategoryGroupsE,
    enabled: !!categoryData,
    meta: {
      errorMessage: 'get-category-groups-E 에러 메세지',
    },
  });

  useEffect(() => {
    if (groupsEData) {
      fetchCategoryItems(groupsEData, setCategoriesE);
    }
  }, [groupsEData]);

  // 카테고리의 그룹 아이템 조회
  const fetchCategoryItems = async (
    typeList: string,
    setCategory: React.Dispatch<React.SetStateAction<ItemCategoryType[][]>>,
  ) => {
    const typeIds = typeList.split(',');
    try {
      const requests = typeIds.map((id) =>
        classificationInstance.get(`/v1/category/${id}`),
      );
      const responses = await Promise.all(requests);
      const itemsList = responses.map(
        (res) => res?.data?.data?.categoryClassList,
      );
      //console.log('itemsList', itemsList);
      //itemsList에서마지막 인덱스(학기) 빼기
      const data = itemsList.slice(1, 3);
      //console.log('data', data);
      setCategory(data);
    } catch (error: any) {
      if (error.data.code == 'GE-002') postRefreshToken();
    }
  };
  useEffect(() => {
    //console.log('categoryList', categoryList);
  }, [categoryList]);

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);
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
            <SelectWrapper>
              {/* 리스트 셀렉트 */}
              {/* 출처 */}
              {categoriesE && categoryTitles[16] && (
                <Select
                  width={'130px'}
                  defaultValue={categoryTitles[16].code}
                  key={categoryTitles[16].code}
                  options={categoriesE[1]}
                  onSelect={(event) => selectCategoryOption(event)}
                />
              )}
              {/* 교육과정 학교급 학년 학기 */}
              {categoryList.map((el, idx) => (
                <Select
                  width={'130px'}
                  defaultValue={categoryTitles[idx].name}
                  key={categoryTitles[idx].name}
                  options={el}
                  onSelect={(event) => selectCategoryOption(event)}
                />
              ))}
              {/* 교과 */}
              {/* {categoriesE && categoryTitles[6] && (
                <Select
                  width={'130px'}
                  defaultValue={categoryTitles[6].code}
                  key={categoryTitles[6].code}
                  options={categoriesE[0]}
                  onSelect={(event) => selectCategoryOption(event)}
                />
              )} */}
              {/* 과목 */}
              {/* {categoriesE && categoryTitles[7] && (
                <Select
                  width={'130px'}
                  defaultValue={categoryTitles[7].code}
                  key={categoryTitles[7].code}
                  options={categoriesE[1]}
                  onSelect={(event) => selectCategoryOption(event)}
                />
              )} */}
              {/* 문항타입 */}
              {/* {categoriesE && categoryTitles[40] && (
                <Select
                  width={'130px'}
                  defaultValue={categoryTitles[40].code}
                  key={categoryTitles[40].code}
                  options={categoriesE[3]}
                  onSelect={(event) => selectCategoryOption(event)}
                />
              )} */}
              <CommonDate
                setDate={setStartDate}
                $button={
                  <IconButton
                    width={'125px'}
                    height={'40px'}
                    fontSize={'14px'}
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
                $button={
                  <IconButton
                    width={'125px'}
                    height={'40px'}
                    fontSize={'14px'}
                    onClick={() => {}}
                  >
                    <span className="btn_title">
                      {endDate === '' ? `종료일` : `${endDate}`}
                    </span>
                    <GrPlan />
                  </IconButton>
                }
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
            </SelectWrapper>
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
const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 30px;
  padding-left: calc(50% - 35px);
`;
