import * as React from 'react';
import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { GrPlan } from 'react-icons/gr';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  ContentList,
  Button,
  PaginationBox,
  Search,
  Select,
  TabMenu,
  ValueNone,
  Loader,
  CommonDate,
  IconButton,
} from '..';
import { classificationInstance, quizService } from '../../api/axios';
import { useModal } from '../../hooks';
import { pageAtom } from '../../store/utilAtom';
import { ItemCategoryType, QuizListType } from '../../types';
import { postRefreshToken } from '../../utils/tokenHandler';

import { CreateContentModal } from './CreateContentModal';

export function QuizCreateList() {
  const { openModal } = useModal();
  const [page, setPage] = useRecoilState(pageAtom);
  // 페이지네이션 index에 맞는 전체 데이터 불러오기
  const [questionList, setQuestionList] = useState<QuizListType[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchKeywordValue, setSearchKeywordValue] = useState<string>('');
  const [tabVeiw, setTabVeiw] = useState<string>('문항 리스트');
  const [content, setContent] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [categoryTitles, setCategoryTitles] = useState<ItemCategoryType[]>([]);
  const [categoryList, setCategoryList] = useState<ItemCategoryType[][]>([]);
  const [categoriesE, setCategoriesE] = useState<ItemCategoryType[][]>([]);

  //탭 고정 데이터
  const menuList = [
    {
      label: '문항 리스트',
      value: '문항 리스트',
    },
    {
      label: '즐겨찾는 문항',
      value: '즐겨찾는 문항',
    },
  ];
  const modalData = {
    title: '',
    content: <CreateContentModal />,
    callback: () => {},
  };

  // 모달 연뒤 문항 생성 윈도우 이동
  const openCreateModal = () => {
    openModal(modalData);
  };
  // 탭메뉴 클릭시 페이지네이션 초기화
  const changeTab = () => {
    setPage(1);
  };

  // 문항리스트 불러오기 api
  const getQuiz = async () => {
    if (tabVeiw == '문항 리스트') {
      const res = await quizService.get(
        `/v1/quiz?pageIndex=${page}&pageUnit=${8}&searchKeyword=${searchKeywordValue}`,
      );
      // console.log(`getQuiz 결과값`, res.data.data);
      return res.data.data;
    }
    if (tabVeiw == '즐겨찾는 문항') {
      const res = await quizService.get(
        `/v1/quiz/favorite?pageIndex=${page}&pageUnit=${8}&searchKeyword=${searchKeywordValue}`,
      );
      console.log(`getQuizfavorite 결과값`, res.data.data);
      return res.data.data;
    }
  };
  const {
    data: quizData,
    isLoading,
    error: quizDataError,
    refetch: quizDataRefetch,
    isPending,
  } = useQuery({
    queryKey: ['get-quizList'],
    queryFn: getQuiz,
    meta: {
      errorMessage: 'get-quizList 에러 메세지',
    },
  });

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
      console.log('itemsList', itemsList);
      setCategory(itemsList);
    } catch (error: any) {
      if (error.data.code == 'GE-002') postRefreshToken();
    }
  };
  useEffect(() => {
    // console.log('categoryList', categoryList);
  }, [categoryList]);

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);
  };

  //   {
  //     id: '1',
  //     label: '개정과정',
  //     value: '1',
  //     options: [
  //       { id: '0', label: '개정과정', value: '0' },
  //       { id: '1', label: '2015학년', value: '1' },
  //       { id: '2', label: '2018학년', value: '2' },
  //       { id: '3', label: '2020학년', value: '3' },
  //     ],
  //   },
  //   {
  //     id: '2',
  //     label: '학교',
  //     value: '2',
  //     options: [
  //       { id: '0', label: '학교', value: '0' },
  //       { id: '1', label: '초등', value: '1' },
  //       { id: '2', label: '중등', value: '2' },
  //       { id: '3', label: '고등', value: '3' },
  //     ],
  //   },
  //   {
  //     id: '3',
  //     label: '학년',
  //     value: '3',
  //     options: [
  //       { id: '0', label: '학년', value: '0' },
  //       { id: '1', label: '초등1', value: '1' },
  //       { id: '2', label: '초등2', value: '2' },
  //       { id: '3', label: '중등1', value: '3' },
  //       { id: '4', label: '중등2', value: '4' },
  //       { id: '5', label: '고등1', value: '5' },
  //       { id: '6', label: '고등2', value: '6' },
  //     ],
  //   },
  //   {
  //     id: '4',
  //     label: '학기',
  //     value: '4',
  //     options: [
  //       { id: '0', label: '학기', value: '0' },
  //       { id: '1', label: '1학기', value: '1' },
  //       { id: '2', label: '2학기', value: '2' },
  //     ],
  //   },
  //   {
  //     id: '5',
  //     label: '대분류',
  //     value: '5',
  //     options: [
  //       { id: '0', label: '대분류', value: '0' },
  //       {
  //         id: '1',
  //         label: '일차부등식 소분류를 연습해봅시다 초등학교 친구들',
  //         value: '1',
  //       },
  //       { id: '2', label: '일차부등식 중분류', value: '2' },
  //       { id: '3', label: '일차부등식 대분류', value: '3' },
  //     ],
  //   },
  //   {
  //     id: '6',
  //     label: '문항타입',
  //     value: '6',
  //     options: [
  //       { id: '0', label: '문항타입', value: '0' },
  //       { id: '1', label: '객관식', value: '1' },
  //       { id: '2', label: '주관식', value: '2' },
  //       { id: '3', label: '서술형', value: '3' },
  //     ],
  //   },
  //   {
  //     id: '7',
  //     label: '오픈여부',
  //     value: '7',
  //     options: [
  //       { id: '0', label: '오픈여부', value: '0' },
  //       { id: '1', label: '활성화', value: '1' },
  //       { id: '2', label: '비활성화', value: '2' },
  //     ],
  //   },
  // ];
  // 검색 기능 함수
  const filterSearchValue = () => {
    // 쿼리 스트링 변경 로직
    setSearchKeywordValue(searchValue);
    if (searchValue == '') setSearchKeywordValue('');
  };
  const filterSearchValueEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      console.log('searchValue', searchValue);
      setSearchKeywordValue(searchValue);
    }
    if (event.key === 'Backspace') {
      setSearchKeywordValue('');
    }
  };

  useEffect(() => {
    if (quizData) {
      setQuestionList(quizData.quizList);
    }
    // console.log('questionList', questionList);
  }, [quizData]);

  // 탭 바뀔시 초기화
  useEffect(() => {
    quizDataRefetch();
    setSearchValue('');
  }, [tabVeiw]);
  // 데이터 변경시 리랜더링
  useEffect(() => {
    quizDataRefetch();
    console.log('searchKeywordValue', searchKeywordValue);
  }, [page, searchKeywordValue]);

  return (
    <Container>
      <TitleWrapper>
        <Title>문항 제작</Title>
        <Button
          height={'35px'}
          width={'130px'}
          onClick={openCreateModal}
          fontSize="13px"
          $filled
          cursor
        >
          + 문항 업로드
        </Button>
      </TitleWrapper>

      {isLoading ||
        (isPending && (
          <LoaderWrapper>
            <Loader width="50px" />
          </LoaderWrapper>
        ))}

      {!isLoading && quizData && (
        <>
          <TabMenu
            length={2}
            menu={menuList}
            selected={tabVeiw}
            width={'300px'}
            setTabVeiw={setTabVeiw}
            $margin={'10px 0'}
            onClickTab={changeTab}
          />
          {/* 리스트 셀렉트 */}
          <SelectWrapper>
            {/* 출처 */}
            {categoriesE && categoryTitles[16] && (
              <Select
                width={'130px'}
                defaultValue={categoryTitles[16].code}
                key={categoryTitles[16].code}
                options={categoriesE[2]}
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
            {categoriesE && categoryTitles[6] && (
              <Select
                width={'130px'}
                defaultValue={categoryTitles[6].code}
                key={categoryTitles[6].code}
                options={categoriesE[0]}
                onSelect={(event) => selectCategoryOption(event)}
              />
            )}
            {/* 과목 */}
            {categoriesE && categoryTitles[7] && (
              <Select
                width={'130px'}
                defaultValue={categoryTitles[7].code}
                key={categoryTitles[7].code}
                options={categoriesE[1]}
                onSelect={(event) => selectCategoryOption(event)}
              />
            )}
            {/* 문항타입 */}
            {categoriesE && categoryTitles[40] && (
              <Select
                width={'130px'}
                defaultValue={categoryTitles[40].code}
                key={categoryTitles[40].code}
                options={categoriesE[3]}
                onSelect={(event) => selectCategoryOption(event)}
              />
            )}
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
            {/* 오픈여부 */}
            <Select
              width={'130px'}
              defaultValue={'오픈여부'}
              key={'오픈여부'}
              options={[
                {
                  code: '활성화',
                  idx: '활성화',
                  name: '활성화',
                },
                {
                  code: '비활성화',
                  idx: '비활성화',
                  name: '비활성화',
                },
              ]}
              onSelect={(event) => selectCategoryOption(event)}
            />
            <Search
              value={searchValue}
              onClick={() => filterSearchValue()}
              onKeyDown={(e) => filterSearchValueEnter(e)}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              placeholder="대단원, 담당자를 입력해주세요"
              width={'30%'}
              height="40px"
            />
          </SelectWrapper>

          {questionList.length > 0 ? (
            <>
              <ContentList
                list={questionList}
                quizDataRefetch={quizDataRefetch}
                tabVeiw={tabVeiw}
                totalCount={quizData.pagination.totalCount}
              />
              <PaginationBox
                itemsCountPerPage={quizData.pagination.pageUnit}
                totalItemsCount={quizData.pagination.totalCount}
              />
            </>
          ) : (
            <ValueNoneWrapper>
              <ValueNone />
            </ValueNoneWrapper>
          )}
        </>
      )}
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

const ValueNoneWrapper = styled.div`
  padding: 100px 0;
`;
const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 30px;
  padding-left: calc(50% - 35px);
`;
