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
  Icon,
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
  const [questionSearchList, setQuestionSearchList] = useState<QuizListType[]>(
    [],
  );
  const [tabVeiw, setTabVeiw] = useState<string>('문항 리스트');
  const [content, setContent] = useState<string[]>([]);
  const [categoryTitles, setCategoryTitles] = useState<ItemCategoryType[]>([]);
  const [categoryList, setCategoryList] = useState<ItemCategoryType[][]>([]);
  const [categoriesE, setCategoriesE] = useState<ItemCategoryType[][]>([]);
  // 셀렉트
  const [selectedSource, setSelectedSource] = useState<string>(''); //출처
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>(''); //교육과정
  const [selectedLevel, setSelectedLevel] = useState<string>(''); //학교급
  const [selectedGrade, setSelectedGrade] = useState<string>(''); //학년
  const [selectedSemester, setSelectedSemester] = useState<string>(''); //학기
  const [selectedSubject, setSelectedSubject] = useState<string>(''); //교과
  const [selectedCourse, setSelectedCourse] = useState<string>(''); //과목
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>(''); //문항타입
  const [selectedOpenStatus, setSelectedOpenStatus] = useState<string>(''); //오픈여부
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchKeywordValue, setSearchKeywordValue] = useState<string>('');
  const [onSearch, setOnSearch] = useState<boolean>(false);

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

  // 문항리스트 불러오기 api
  const getQuiz = async () => {
    if (tabVeiw == '문항 리스트') {
      const res = await quizService.get(
        `/v1/quiz?pageIndex=${page}&pageUnit=${8}`,
      );
      // console.log(`getQuiz 결과값`, res.data.data);
      return res.data.data;
    }
    if (tabVeiw == '즐겨찾는 문항') {
      const res = await quizService.get(
        `/v1/quiz/favorite?pageIndex=${page}&pageUnit=${8}`,
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
      if (error.data?.code == 'GE-002') postRefreshToken();
    }
  };
  useEffect(() => {
    // console.log('categoryList', categoryList);
  }, [categoryList]);

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);
  };

  const handleDefaultSelect = () => {
    setOnSearch(false);
    setSelectedSource('');
    setSelectedCurriculum('');
    setSelectedLevel('');
    setSelectedGrade('');
    setSelectedSemester('');
    setSelectedSubject('');
    setSelectedCourse('');
    setSelectedQuestionType('');
    setSelectedOpenStatus('');
    setStartDate('');
    setEndDate('');
    setSearchKeywordValue('');
  };

  // 문항 검색 불러오기 api
  const getSearchQuiz = async () => {
    const res = await quizService.get(
      `/v1/search/quiz?pageIndex=${page}&pageUnit=${8}&searchKeyword=${searchKeywordValue}&source=${selectedSource}&curriculum=${selectedCurriculum}&level=${selectedLevel}&grade=${selectedGrade}&semester=${selectedSemester}&subject=${selectedSubject}&course=${selectedCourse}&type=${selectedQuestionType}&isOpen=${selectedOpenStatus}&searchKeywordFrom=${startDate}&searchKeywordTo=${endDate}`,
    );
    console.log(`getSearchQuiz 결과값`, res.data.data);
    return res.data.data;
  };
  const {
    data: quizSearchData,
    isLoading: quizSearchDataIsLoading,
    error: quizSearchDataError,
    refetch: quizSearchDataRefetch,
  } = useQuery({
    queryKey: ['get-quizList-search'],
    queryFn: getSearchQuiz,
    enabled: !!onSearch,
    meta: {
      errorMessage: 'get-quizList-search 에러 메세지',
    },
  });

  // 검색용 셀렉트 선택시
  useEffect(() => {
    setOnSearch(true);
    console.log('selectedSource', selectedSource);
    console.log('selectedCurriculum', selectedCurriculum);
    console.log('selectedLevel', selectedLevel);
    console.log('selectedGrade', selectedGrade);
    console.log('selectedSemester', selectedSemester);
    console.log('selectedSubject', selectedSubject);
    console.log('selectedCourse', selectedCourse);
    console.log('selectedQuestionType', selectedQuestionType);
    console.log('selectedOpenStatus', selectedOpenStatus);
    console.log('startDate', startDate);
    console.log('endDate', endDate);
    console.log('searchKeywordValue', searchKeywordValue);
    quizSearchDataRefetch();
  }, [
    selectedSource,
    selectedCurriculum,
    selectedLevel,
    selectedGrade,
    selectedSemester,
    selectedSubject,
    selectedCourse,
    selectedQuestionType,
    selectedOpenStatus,
    startDate,
    endDate,
    searchKeywordValue,
  ]);

  // 검색 기능 함수
  const filterSearchValue = () => {
    // 쿼리 스트링 변경 로직
    setSearchKeywordValue(searchValue);
    if (searchValue == '') setSearchKeywordValue('');
    quizSearchDataRefetch();
  };
  const filterSearchValueEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      console.log('searchValue', searchValue);
      setSearchKeywordValue(searchValue);
      quizSearchDataRefetch();
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

  // 검색 이후
  useEffect(() => {
    if (quizSearchData) {
      setQuestionSearchList(quizSearchData.quizList);
    }
  }, [quizSearchData]);
  // 검색 초기화
  useEffect(() => {}, [onSearch]);

  // 모달 연뒤 문항 생성 윈도우 이동
  const openCreateModal = () => {
    openModal(modalData);
  };
  // 탭메뉴 클릭시 페이지네이션 초기화
  const changeTab = () => {
    setPage(1);
    handleDefaultSelect();
  };
  // 탭 바뀔시 초기화
  useEffect(() => {
    quizSearchDataRefetch();
    quizDataRefetch();
    setSearchValue('');
    setOnSearch(false);
  }, [tabVeiw]);
  // 데이터 변경시 리랜더링
  useEffect(() => {
    quizSearchDataRefetch();
    quizDataRefetch();
    setOnSearch(false);
  }, [page]);

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
                onDefaultSelect={() => handleDefaultSelect()}
                width={'130px'}
                defaultValue={categoryTitles[16]?.code}
                key={categoryTitles[16]?.code}
                options={categoriesE[2]}
                onSelect={(event) => selectCategoryOption(event)}
                setSelectedValue={setSelectedSource}
              />
            )}
            {/* 교육과정 학교급 학년 학기 */}
            {/* {categoryList.map((el, idx) => (
              <Select
							onDefaultSelect={() => setOnSearch(false)}
                width={'130px'}
                defaultValue={categoryTitles[idx].name}
                key={categoryTitles[idx].name}
                options={el}
                onSelect={(event) => selectCategoryOption(event)}
                setSelectedValue={() => {}}
              />
            ))} */}
            {categoryList && categoryTitles[0] && (
              <Select
                width={'130px'}
                defaultValue={categoryTitles[0]?.code}
                key={categoryTitles[0]?.code}
                options={categoryList[0]}
                onSelect={(event) => selectCategoryOption(event)}
                setSelectedValue={setSelectedCurriculum}
              />
            )}
            {categoryList && categoryTitles[1] && (
              <Select
                width={'130px'}
                defaultValue={categoryTitles[1]?.code}
                key={categoryTitles[1]?.code}
                options={categoryList[1]}
                onSelect={(event) => selectCategoryOption(event)}
                setSelectedValue={setSelectedLevel}
              />
            )}
            {categoryList && categoryTitles[2] && (
              <Select
                width={'130px'}
                defaultValue={categoryTitles[2]?.code}
                key={categoryTitles[2]?.code}
                options={categoryList[2]}
                onSelect={(event) => selectCategoryOption(event)}
                setSelectedValue={setSelectedGrade}
              />
            )}
            {categoryList && categoryTitles[3] && (
              <Select
                width={'130px'}
                defaultValue={categoryTitles[3]?.code}
                key={categoryTitles[3]?.code}
                options={categoryList[3]}
                onSelect={(event) => selectCategoryOption(event)}
                setSelectedValue={setSelectedSemester}
              />
            )}
            {/* 교과 */}
            {categoriesE && categoryTitles[6] && (
              <Select
                width={'130px'}
                defaultValue={categoryTitles[6]?.code}
                key={categoryTitles[6]?.code}
                options={categoriesE[0]}
                onSelect={(event) => selectCategoryOption(event)}
                setSelectedValue={setSelectedSubject}
              />
            )}
            {/* 과목 */}
            {categoriesE && categoryTitles[7] && (
              <Select
                width={'130px'}
                defaultValue={categoryTitles[7]?.code}
                key={categoryTitles[7]?.code}
                options={categoriesE[1]}
                onSelect={(event) => selectCategoryOption(event)}
                setSelectedValue={setSelectedCourse}
              />
            )}
            {/* 문항타입 */}
            {categoriesE && categoryTitles[40] && (
              <Select
                width={'130px'}
                defaultValue={categoryTitles[40]?.code}
                key={categoryTitles[40]?.code}
                options={categoriesE[3]}
                onSelect={(event) => selectCategoryOption(event)}
                setSelectedValue={setSelectedQuestionType}
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
                    {/* 시작날짜 yyyy-MM-ddTHH:mm:ss(2023-05-21T10:30:00) */}
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
                    {/* 마지막날짜 yyyy-MM-ddTHH:mm:ss(2023-05-21T10:30:00) */}
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
              setSelectedValue={setSelectedOpenStatus}
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
            {/* <Icon
              src={`/images/icon/reflash.svg`}
              onClick={() => handleDefaultSelect()}
              cursor
              width="20px"
              height="20px"
              $margin="0 0 0 5px"
            /> */}
          </SelectWrapper>

          {questionList.length > 0 || questionSearchList.length > 0 ? (
            <>
              <ContentList
                questionList={questionSearchList}
                quizDataRefetch={quizDataRefetch}
                quizSearchDataRefetch={quizSearchDataRefetch}
                tabVeiw={tabVeiw}
                totalCount={
                  onSearch
                    ? quizSearchData.pagination.totalCount
                    : quizData.pagination.totalCount
                }
              />
              <PaginationBox
                itemsCountPerPage={
                  onSearch
                    ? quizSearchData.pagination.pageUnit
                    : quizData.pagination.pageUnit
                }
                totalItemsCount={
                  onSearch
                    ? quizSearchData.pagination.totalCount
                    : quizData.pagination.totalCount
                }
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
