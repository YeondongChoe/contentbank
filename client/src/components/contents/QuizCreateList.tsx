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
  Modal,
} from '..';
import { classificationInstance, quizService } from '../../api/axios';
import { useModal } from '../../hooks';
import { quizListAtom } from '../../store/quizListAtom';
import { pageAtom } from '../../store/utilAtom';
import { ItemCategoryType, QuizListType } from '../../types';
import { postRefreshToken } from '../../utils/tokenHandler';

import { CreateContentModal } from './CreateContentModal';

export function QuizCreateList() {
  const { openModal } = useModal();
  const [page, setPage] = useRecoilState(pageAtom);
  const [quizList, setQuizList] = useRecoilState(quizListAtom);
  // 페이지네이션 index에 맞는 전체 데이터 불러오기
  const [questionList, setQuestionList] = useState<QuizListType[]>([]);
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

  const [key, setKey] = useState(0);

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
    if (tabVeiw == '즐겨찾는 문항') {
      const res = await quizService.get(
        !onSearch
          ? `/v1/quiz/favorite?pageIndex=${page}&pageUnit=${8}`
          : `/v1/quiz/favorite?pageIndex=${page}&pageUnit=${8}&searchKeyword=${searchKeywordValue}&source=${selectedSource}&curriculum=${selectedCurriculum}&level=${selectedLevel}&grade=${selectedGrade}&semester=${selectedSemester}&subject=${selectedSubject}&course=${selectedCourse}&type=${selectedQuestionType}&isOpen=${selectedOpenStatus == '활성' ? true : ''}&searchKeywordFrom=${startDate}&searchKeywordTo=${endDate}`,
      );
      return res.data.data;
    } else {
      const res = await quizService.get(
        !onSearch
          ? `/v1/quiz?pageIndex=${page}&pageUnit=${8}`
          : `/v1/quiz?pageIndex=${page}&pageUnit=${8}&searchKeyword=${searchKeywordValue}&source=${selectedSource}&curriculum=${selectedCurriculum}&level=${selectedLevel}&grade=${selectedGrade}&semester=${selectedSemester}&subject=${selectedSubject}&course=${selectedCourse}&type=${selectedQuestionType}&isOpen=${selectedOpenStatus == '활성' ? true : ''}&searchKeywordFrom=${startDate}&searchKeywordTo=${endDate}`,
      );
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
        classificationInstance.get(`/v1/category/class/${id}`),
      );
      const responses = await Promise.all(requests);
      const itemsList = responses.map(
        (res) => res?.data?.data?.categoryClassList,
      );
      console.log('itemsList', itemsList);
      setCategory(itemsList);
    } catch (error: any) {
      if (error.response.data?.code == 'GE-002') postRefreshToken();
    }
  };
  useEffect(() => {
    // console.log('categoryList', categoryList);
  }, [categoryList]);

  //셀렉트 초기화
  const handleDefaultSelect = (defaultValue?: string) => {
    if (defaultValue == 'all') {
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
    }

    switch (defaultValue) {
      case categoryTitles[16]?.code:
        setSelectedSource('');
        break;
      case categoryTitles[0]?.code:
        setSelectedCurriculum('');
        break;
      case categoryTitles[1]?.code:
        setSelectedLevel('');
        break;
      case categoryTitles[2]?.code:
        setSelectedGrade('');
        break;
      case categoryTitles[3]?.code:
        setSelectedSemester('');
        break;
      case categoryTitles[6]?.code:
        setSelectedSubject('');
        break;
      case categoryTitles[7]?.code:
        setSelectedCourse('');
        break;
      case categoryTitles[40]?.code:
        setSelectedQuestionType('');
        break;
      case '오픈여부':
        setSelectedOpenStatus('');
        break;
      default:
        break;
    }

    setOnSearch(false);
  };

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);

    if (
      value !== categoryTitles[16]?.code ||
      value !== categoryTitles[0]?.code ||
      value !== categoryTitles[1]?.code ||
      value !== categoryTitles[2]?.code ||
      value !== categoryTitles[3]?.code ||
      value !== categoryTitles[6]?.code ||
      value !== categoryTitles[7]?.code ||
      value !== categoryTitles[40]?.code ||
      value !== '오픈여부'
    ) {
      setOnSearch(true);
    } else {
      setOnSearch(false);
    }
  };

  // 검색용 셀렉트 선택시
  useEffect(() => {
    // console.log('selectedSource', selectedSource);
    // console.log('selectedCurriculum', selectedCurriculum);
    // console.log('selectedLevel', selectedLevel);
    // console.log('selectedGrade', selectedGrade);
    // console.log('selectedSemester', selectedSemester);
    // console.log('selectedSubject', selectedSubject);
    // console.log('selectedCourse', selectedCourse);
    // console.log('selectedQuestionType', selectedQuestionType);
    // console.log('selectedOpenStatus', selectedOpenStatus);
    // console.log('startDate', startDate);
    // console.log('endDate', endDate);
    // console.log('searchKeywordValue', searchKeywordValue);
    quizDataRefetch();
    setOnSearch(true);
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

  useEffect(() => {
    reloadComponent();
  }, [questionList]);

  // 랜더링 초기화
  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1);
  };

  // 검색 기능 함수
  const filterSearchValue = () => {
    // 쿼리 스트링 변경 로직
    setSearchKeywordValue(searchValue);
    if (searchValue == '') setSearchKeywordValue('');
    quizDataRefetch();
  };
  const filterSearchValueEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      setSearchKeywordValue(searchValue);
      quizDataRefetch();
    }
    if (event.key === 'Backspace') {
      setSearchKeywordValue('');
      quizDataRefetch();
    }
  };

  useEffect(() => {
    if (quizData) {
      setQuestionList(quizData.quizList);
    }
    // console.log('questionList', questionList);
  }, [quizData]);

  // 모달 연뒤 문항 생성 윈도우 이동
  const openCreateModal = () => {
    openModal(modalData);
    // 수정시 체크리스트 전역데이터 초기화
    setQuizList([]);
  };
  // 탭메뉴 클릭시 페이지네이션 초기화
  const changeTab = () => {
    setPage(1);
  };

  // 탭 바뀔시 초기화
  useEffect(() => {
    setOnSearch(false);
    quizDataRefetch();
  }, [tabVeiw]);
  // 데이터 변경시 리랜더링
  useEffect(() => {
    quizDataRefetch();
    setOnSearch(false);
  }, [page]);
  // 검색 초기화
  useEffect(() => {
    if (!onSearch) {
      handleDefaultSelect('all');
      reloadComponent();
    }
  }, [onSearch]);

  return (
    <Container>
      <TitleWrapper>
        <Title>문항 제작</Title>
        <Button
          height={'35px'}
          width={'130px'}
          onClick={() => openCreateModal()}
          fontSize="13px"
          $filled
          cursor
          // disabled //TODO : 업로드 가능할때까지 임시로막기
        >
          + 문항 업로드
        </Button>
      </TitleWrapper>

      <TabMenu
        length={2}
        menu={menuList}
        selected={tabVeiw}
        width={'300px'}
        setTabVeiw={setTabVeiw}
        $margin={'10px 0'}
        onClickTab={changeTab}
      />
      {isLoading && (
        <LoaderWrapper>
          <Loader width="50px" />
        </LoaderWrapper>
      )}

      {!isLoading && quizData && (
        <>
          {/* 리스트 셀렉트 */}
          <SelectWrapper>
            {/* 출처 */}
            {categoriesE && categoryTitles[16] && (
              <Select
                onDefaultSelect={() =>
                  handleDefaultSelect(categoryTitles[16]?.code)
                }
                width={'130px'}
                defaultValue={categoryTitles[16]?.code}
                key={categoryTitles[16]?.code}
                options={categoriesE[2]}
                onSelect={(event) => selectCategoryOption(event)}
                setSelectedValue={setSelectedSource}
                heightScroll={'300px'}
              />
            )}
            {/* 교육과정 학교급 학년 학기 */}
            {categoryList && categoryTitles[0] && (
              <Select
                onDefaultSelect={() =>
                  handleDefaultSelect(categoryTitles[0]?.code)
                }
                width={'130px'}
                defaultValue={categoryTitles[0]?.code}
                key={categoryTitles[0]?.code}
                options={categoryList[0]}
                onSelect={(event) => selectCategoryOption(event)}
                setSelectedValue={setSelectedCurriculum}
                heightScroll={'300px'}
              />
            )}
            {categoryList && categoryTitles[1] && (
              <Select
                onDefaultSelect={() =>
                  handleDefaultSelect(categoryTitles[1]?.code)
                }
                width={'130px'}
                defaultValue={categoryTitles[1]?.code}
                key={categoryTitles[1]?.code}
                options={categoryList[1]}
                onSelect={(event) => selectCategoryOption(event)}
                setSelectedValue={setSelectedLevel}
                heightScroll={'300px'}
              />
            )}
            {categoryList && categoryTitles[2] && (
              <Select
                onDefaultSelect={() =>
                  handleDefaultSelect(categoryTitles[2]?.code)
                }
                width={'130px'}
                defaultValue={categoryTitles[2]?.code}
                key={categoryTitles[2]?.code}
                options={categoryList[2]}
                onSelect={(event) => selectCategoryOption(event)}
                setSelectedValue={setSelectedGrade}
                heightScroll={'300px'}
              />
            )}
            {categoryList && categoryTitles[3] && (
              <Select
                onDefaultSelect={() =>
                  handleDefaultSelect(categoryTitles[3]?.code)
                }
                width={'130px'}
                defaultValue={categoryTitles[3]?.code}
                key={categoryTitles[3]?.code}
                options={categoryList[3]}
                onSelect={(event) => selectCategoryOption(event)}
                setSelectedValue={setSelectedSemester}
                heightScroll={'300px'}
              />
            )}
            {/* 교과 */}
            {categoriesE && categoryTitles[6] && (
              <Select
                onDefaultSelect={() =>
                  handleDefaultSelect(categoryTitles[6]?.code)
                }
                width={'130px'}
                defaultValue={categoryTitles[6]?.code}
                key={categoryTitles[6]?.code}
                options={categoriesE[0]}
                onSelect={(event) => selectCategoryOption(event)}
                setSelectedValue={setSelectedSubject}
                heightScroll={'300px'}
              />
            )}
            {/* 과목 */}
            {categoriesE && categoryTitles[7] && (
              <Select
                onDefaultSelect={() =>
                  handleDefaultSelect(categoryTitles[7]?.code)
                }
                width={'130px'}
                defaultValue={categoryTitles[7]?.code}
                key={categoryTitles[7]?.code}
                options={categoriesE[1]}
                onSelect={(event) => selectCategoryOption(event)}
                setSelectedValue={setSelectedCourse}
                heightScroll={'300px'}
              />
            )}
            {/* 문항타입 */}
            {categoriesE && categoryTitles[40] && (
              <Select
                onDefaultSelect={() =>
                  handleDefaultSelect(categoryTitles[40]?.code)
                }
                width={'130px'}
                defaultValue={categoryTitles[40]?.code}
                key={categoryTitles[40]?.code}
                options={categoriesE[3]}
                onSelect={(event) => selectCategoryOption(event)}
                setSelectedValue={setSelectedQuestionType}
                heightScroll={'300px'}
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
              minDate={startDate}
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
              onDefaultSelect={() => handleDefaultSelect('오픈여부')}
              width={'130px'}
              defaultValue={'오픈여부'}
              key={'오픈여부'}
              options={[
                {
                  code: '활성',
                  idx: 999998,
                  name: '활성',
                },
                {
                  code: '비활성',
                  idx: 999997,
                  name: '비활성',
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
              onClick={() => handleDefaultSelect('all')}
              cursor
              width="20px"
              height="20px"
              $margin="0 0 0 5px"
            /> */}
          </SelectWrapper>

          {quizData && questionList.length > 0 ? (
            <>
              <ContentList
                key={key}
                list={questionList}
                quizDataRefetch={quizDataRefetch}
                tabVeiw={tabVeiw}
                totalCount={quizData?.pagination?.totalCount}
              />
              <PaginationBox
                itemsCountPerPage={quizData?.pagination?.pageUnit}
                totalItemsCount={quizData?.pagination?.totalCount}
              />
            </>
          ) : (
            <ValueNoneWrapper>
              <ValueNone />
            </ValueNoneWrapper>
          )}
        </>
      )}

      <Modal />
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
