import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GrPlan } from 'react-icons/gr';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import {
  Alert,
  Button,
  CommonDate,
  ContentList,
  IconButton,
  Loader,
  Modal,
  PaginationBox,
  Search,
  Select,
  TabMenu,
  ValueNone,
  openToastifyAlert,
} from '..';
import { classificationInstance, quizService } from '../../api/axios';
import { pageAtom } from '../../store/utilAtom';
import { ItemCategoryType, QuestionTableType } from '../../types';
import { postRefreshToken } from '../../utils/tokenHandler';
import { windowOpenHandler } from '../../utils/windowHandler';
import { COLOR } from '../constants';

import { QuizReportList } from './QuizReportList';

export function QuizManagementList() {
  const [page, setPage] = useRecoilState(pageAtom);
  const [categoryTitles, setCategoryTitles] = useState<ItemCategoryType[]>([]);
  const [categoryList, setCategoryList] = useState<ItemCategoryType[][]>([]);
  const [categoriesE, setCategoriesE] = useState<ItemCategoryType[][]>([]);
  const [questionList, setQuestionList] = useState<QuestionTableType[]>([]);
  const [checkListOn, setCheckListOn] = useState<number[]>([]);
  const [tabVeiw, setTabVeiw] = useState<string>('문항 리스트');
  const [content, setContent] = useState<string[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
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
      label: '신고 문항',
      value: '신고 문항',
    },
  ];

  // 문항리스트 불러오기 api
  const getQuiz = async () => {
    if (tabVeiw == '문항 리스트') {
      const res = await quizService.get(
        !onSearch
          ? `/v1/quiz?pageIndex=${page}&pageUnit=${8}`
          : `/v1/quiz?pageIndex=${page}&pageUnit=${8}&searchKeyword=${searchKeywordValue}&source=${selectedSource}&curriculum=${selectedCurriculum}&level=${selectedLevel}&grade=${selectedGrade}&semester=${selectedSemester}&subject=${selectedSubject}&course=${selectedCourse}&type=${selectedQuestionType}&isOpen=${selectedOpenStatus == '활성'}&searchKeywordFrom=${startDate}&searchKeywordTo=${endDate}`,
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

  // 선택된 문항 삭제하기 api
  const deleteQuiz = async (idxList: string) => {
    const res = await quizService.delete(`/v1/quiz/${idxList}`);
    return res;
  };

  const {
    data: deleteQuizData,
    mutate: mutateDeleteQuiz,
    isPending: isPendingDelete,
    isSuccess: deleteQuizIsSuccess,
  } = useMutation({
    mutationFn: deleteQuiz,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
      if (context.response.data?.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response: { data: { message: string } }) => {
      openToastifyAlert({
        type: 'success',
        text: response.data.message,
      });

      // 초기화
      quizDataRefetch();
      setIsAlertOpen(false);
    },
  });

  const submitDelete = () => {
    // console.log('checkListOn', checkListOn);
    const idxList = checkListOn.join(','); // 선택된 리스트데이터값
    mutateDeleteQuiz(idxList);
  };

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
      setSearchKeywordValue(searchValue);
    }
    if (event.key === 'Backspace') {
      setSearchKeywordValue('');
    }
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

  // 모달 연뒤 문항 일괄편집 윈도우 이동
  const openEditManagemantWindow = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    windowOpenHandler({
      name: 'managementEditMain',
      url: '/managementEditMain',
      // $height: 850,
      // $width: 1250,
    });
  };

  useEffect(() => {
    if (quizData) {
      setQuestionList(quizData.quizList);
    }
    // console.log('questionList', questionList);
  }, [quizData]);

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
  }, [page]);

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

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
        <Title>문항 관리</Title>
        <Button
          height={'35px'}
          width={'130px'}
          onClick={(e) => openEditManagemantWindow(e)}
          fontSize="13px"
          $filled
          cursor
        >
          문항 일괄 편집
        </Button>
      </TitleWrapper>

      {isLoading ||
        isPending ||
        (isPendingDelete && (
          <LoaderWrapper>
            <Loader width="50px" />
          </LoaderWrapper>
        ))}

      {!isLoading && quizData && (
        <>
          <TabMenu
            length={2}
            menu={menuList}
            width={'300px'}
            selected={tabVeiw}
            setTabVeiw={setTabVeiw}
            $margin={'10px 0'}
            onClickTab={changeTab}
          />

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
              />
            )}
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
              placeholder="문항코드, 중단원, 담당자 검색"
              width={'30%'}
              height="40px"
            />
          </SelectWrapper>
          {tabVeiw === '문항 리스트' && (
            <>
              {quizData && questionList.length > 0 ? (
                <>
                  <ContentList
                    key={key}
                    list={questionList}
                    deleteBtn
                    quizDataRefetch={quizDataRefetch}
                    ondeleteClick={() => {
                      setIsAlertOpen(true);
                    }}
                    setCheckListOn={setCheckListOn}
                    tabVeiw={tabVeiw}
                    totalCount={quizData.pagination.totalCount}
                    deleteQuizIsSuccess={deleteQuizIsSuccess}
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
        </>
      )}

      {tabVeiw === '신고 문항' && <QuizReportList />}

      <Alert
        isAlertOpen={isAlertOpen}
        description={`${checkListOn.length}개의 문항을 삭제 처리 하시겠습니까?`}
        action="삭제"
        isWarning={true}
        onClose={closeAlert}
        onClick={() => submitDelete()}
      />

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
