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
import {
  classificationInstance,
  quizService,
  resourceServiceInstance,
} from '../../api/axios';
import { pageAtom } from '../../store/utilAtom';
import { ItemCategoryType, QuestionTableType } from '../../types';
import { selectedListType } from '../../types/WorkbookType';
import { postRefreshToken } from '../../utils/tokenHandler';
import { windowOpenHandler } from '../../utils/windowHandler';
import { COLOR } from '../constants';
import { QuizReportList } from '../molecules/contentReport/QuizReportList';

export function QuizManagementList() {
  const [page, setPage] = useRecoilState(pageAtom);
  // const [categoryTitles, setCategoryTitles] = useState<ItemCategoryType[]>([]);
  const [categoryList, setCategoryList] = useState<ItemCategoryType[][]>([]);
  const [categoriesE, setCategoriesE] = useState<ItemCategoryType[][]>([]);
  const [questionList, setQuestionList] = useState<QuestionTableType[]>([]);
  const [isBuildWorker, setIsBuildWorker] = useState<boolean>(false);
  const [checkListOn, setCheckListOn] = useState<number[]>([]);
  const [tabView, setTabView] = useState<string>('문항 리스트');
  const [content, setContent] = useState<string[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  // 셀렉트
  const [selectedList, setSelectedList] = useState<selectedListType[]>([]);
  const [groupCode, setGroupCode] = useState<string | null>(null);

  // const [selectedSource, setSelectedSource] = useState<string>(''); //출처
  //const [selectedCurriculum, setSelectedCurriculum] = useState<string>(''); //교육과정
  //const [selectedLevel, setSelectedLevel] = useState<string>(''); //학교급
  //const [selectedGrade, setSelectedGrade] = useState<string>(''); //학년
  // const [selectedSemester, setSelectedSemester] = useState<string>(''); //학기
  // const [selectedSubject, setSelectedSubject] = useState<string>(''); //교과
  // const [selectedCourse, setSelectedCourse] = useState<string>(''); //과목
  // const [selectedQuestionType, setSelectedQuestionType] = useState<string>(''); //문항타입
  // const [selectedOpenStatus, setSelectedOpenStatus] = useState<string>(''); //오픈여부
  // const [startDate, setStartDate] = useState<string>('');// 시작날자
  // const [endDate, setEndDate] = useState<string>('');//끝날자
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchKeywordValue, setSearchKeywordValue] = useState<string>('');
  const [onSearch, setOnSearch] = useState<boolean>(false);

  const [key, setKey] = useState(0);

  //탭 고정 데이터
  // const menuList = [
  //   {
  //     label: '문항 리스트',
  //     value: '문항 리스트',
  //   },
  //   {
  //     label: '신고 문항',
  //     value: '신고 문항',
  //   },
  // ];

  //그룹 화면설정 정보 불러오기 api
  const getMenu = async () => {
    const res = await resourceServiceInstance.get(
      `/v1/menu/path?url=contentListManagementSetting`,
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
      const categoryIdxArray = filterList[0]?.idxList?.split(',') || [];
      const typeListArray = filterList[0]?.inputList?.split(',') || [];
      const viewListArray = (filterList[0]?.viewList?.split(',') || []).map(
        (item: string) => item === 'true',
      );
      const searchListArray = (filterList[0]?.searchList?.split(',') || []).map(
        (item: string) => item === 'true',
      );
      const newArray = nameListArray.map((name: string, index: number) => ({
        name,
        idx: categoryIdxArray[index] || '',
        type: typeListArray[index] || '',
        view: viewListArray[index] || false,
        search: searchListArray[index] || false,
      }));
      setSelectedList(newArray);
      setGroupCode(filterList[0]?.groupCode);
    }
  }, [menuData]);

  ///쿼리스트링 만드는 함수
  const createQueryString = (params: Record<string, string>) => {
    return Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join('&');
  };

  // 문항리스트 불러오기 api
  const getQuiz = async () => {
    const depthChecks = selectedList.map((el) => el.selectedName);
    const groupsArray = selectedList.map((el) => el.name);
    const keyValuePairs = groupsArray.reduce<Record<string, string>>(
      (acc, item, index) => {
        const depthCheck = depthChecks[index];
        if (depthCheck) {
          acc[item] = depthCheck; // title 속성을 사용하여 acc 객체에 추가
        }
        return acc;
      },
      {},
    );

    const queryString = createQueryString(keyValuePairs);
    // if (tabView == '문항 리스트') {
    const res = await quizService.get(
      `/v1/quiz?pageIndex=${page}&pageUnit=${8}&${queryString}`,
    );
    return res.data.data;
    // }
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
  // const filterSearchValue = () => {
  //   // 쿼리 스트링 변경 로직
  //   setSearchKeywordValue(searchValue);
  //   if (searchValue == '') setSearchKeywordValue('');
  //   quizDataRefetch();
  // };
  // const filterSearchValueEnter = (
  //   event: React.KeyboardEvent<HTMLInputElement>,
  // ) => {
  //   if (event.key === 'Enter') {
  //     setSearchKeywordValue(searchValue);
  //     quizDataRefetch();
  //   }
  //   if (event.key === 'Backspace') {
  //     setSearchKeywordValue('');
  //     quizDataRefetch();
  //   }
  // };

  //  카테고리 불러오기 api
  // const getCategory = async () => {
  //   const res = await classificationInstance.get(`/v1/category`);
  //   return res;
  // };
  // const { data: categoryData, isLoading: isCategoryLoading } = useQuery({
  //   queryKey: ['get-category'],
  //   queryFn: getCategory,
  //   meta: {
  //     errorMessage: 'get-category 에러 메세지',
  //   },
  // });
  // useEffect(() => {
  //   if (categoryData) {
  //     setCategoryTitles(categoryData.data.data.categoryItemList);
  //   }
  // }, [categoryData]);

  // console.log('ategoryTitles-------------', categoryTitles);

  // 카테고리의 그룹 유형 조회
  const getCategoryGroups = async () => {
    const response = await classificationInstance.get('/v1/category/group/A');
    return response.data.data.typeList;
  };
  const { data: groupsData, refetch: groupsDataRefetch } = useQuery({
    queryKey: ['get-category-groups-A'],
    queryFn: getCategoryGroups,
    // enabled: !!categoryData,
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
    // enabled: !!categoryData,
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
      setCategory(itemsList);
    } catch (error: any) {
      if (error.data?.code == 'GE-002') postRefreshToken();
    }
  };
  useEffect(() => {
    // console.log('categoryList', categoryList);
  }, [categoryList]);

  //선택값 업데이트 함수
  const selectCategoryOption = (
    event: React.MouseEvent<HTMLButtonElement>,
    idx: number,
  ) => {
    const selectedValue = event.currentTarget.value;

    setSelectedList((prevList) =>
      prevList.map((item) => {
        if (item.idx === idx) {
          // 선택된 값이 item.name과 같으면 `selectedName` 제거
          if (item.name === selectedValue) {
            const { selectedName, ...rest } = item; // `selectedName` 키 제거
            return rest;
          }

          // 선택된 값이 다르면 `selectedName` 업데이트
          return { ...item, selectedName: selectedValue };
        }
        return item; // 나머지 항목은 변경 없이 유지
      }),
    );
  };

  //셀렉트 초기화
  const handleDefaultSelect = (defaultValue?: string) => {
    if (defaultValue == 'all') {
      // setSelectedSource('');
      //setSelectedCurriculum('');
      //setSelectedLevel('');
      //setSelectedGrade('');
      // setSelectedSemester('');
      // setSelectedSubject('');
      // setSelectedCourse('');
      // setSelectedQuestionType('');
      // setSelectedOpenStatus('');
      // setStartDate('');
      // setEndDate('');
      setSearchKeywordValue('');
    }
    switch (defaultValue) {
      case '교육과정':
        //setSelectedCurriculum('');
        break;
      case '학교급':
        //setSelectedLevel('');
        break;
      case '학년':
        //setSelectedGrade('');
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
    // selectedSource,
    //selectedCurriculum,
    //selectedLevel,
    //selectedGrade,
    // selectedSemester,
    // selectedSubject,
    // selectedCourse,
    // selectedQuestionType,
    // selectedOpenStatus,
    // startDate,
    // endDate,
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
      name: 'managementeditmain',
      url: '/managementeditmain',
      // $height: 850,
      // $width: 1250,
    });
  };

  useEffect(() => {
    if (quizData) {
      setQuestionList(quizData.quizList);
      setIsBuildWorker(quizData?.isBuildWorker);
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
  }, [tabView]);

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

      {/* <TabMenu
        length={2}
        menu={menuList}
        width={'300px'}
        selected={tabView}
        setTabView={setTabView}
        $margin={'10px 0'}
        onClickTab={changeTab}
      /> */}
      {isLoading && (
        <LoaderWrapper>
          <Loader width="50px" />
        </LoaderWrapper>
      )}

      {!isLoading && quizData && (
        <>
          {/* 리스트 셀렉트 */}
          <SelectWrapper>
            {selectedList.map((list, i) => {
              if (list.type === 'SELECT' && list.search) {
                console.log(selectedList.filter((selected) => selected.name));
                return (
                  <Select
                    key={`${list.idx}-${list.selectedName}`}
                    width={'130px'}
                    defaultValue={list.selectedName || list.name}
                    options={categoryList[i]}
                    onSelect={(event) => selectCategoryOption(event, list.idx)}
                    heightScroll={'300px'}
                    isnormalizedOptions
                  />
                );
              }
            })}
            {/* 교육과정 */}
            {/* <Select
              onDefaultSelect={() => handleDefaultSelect('교육과정')}
              width={'130px'}
              defaultValue={'교육과정'}
              key={'교육과정'}
              options={categoryList[0]}
              onSelect={(event) => selectCategoryOption(event)}
              setSelectedValue={setSelectedCurriculum}
              heightScroll={'300px'}
            /> */}
            {/* 학교급 */}
            {/* <Select
              onDefaultSelect={() => handleDefaultSelect('학교급')}
              width={'130px'}
              defaultValue={'학교급'}
              key={'학교급'}
              options={categoryList[1]}
              onSelect={(event) => selectCategoryOption(event)}
              setSelectedValue={setSelectedLevel}
              heightScroll={'300px'}
            /> */}
            {/* 학년 */}
            {/* <Select
              onDefaultSelect={() => handleDefaultSelect('학년')}
              width={'130px'}
              defaultValue={'학년'}
              key={'학년'}
              options={categoryList[2]}
              onSelect={(event) => selectCategoryOption(event)}
              setSelectedValue={setSelectedGrade}
              heightScroll={'300px'}
            /> */}

            {/* <Search
              value={searchValue}
              onClick={() => filterSearchValue()}
              onKeyDown={(e) => filterSearchValueEnter(e)}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              placeholder="대단원, 담당자를 입력해주세요"
              width={'30%'}
              height="40px"
            /> */}
          </SelectWrapper>
          {/* {tabView === '문항 리스트' && ( */}
          <>
            <ContentList
              key={key}
              list={questionList}
              selectedList={selectedList}
              isBuildWorker={isBuildWorker}
              deleteBtn
              quizDataRefetch={quizDataRefetch}
              ondeleteClick={() => {
                setIsAlertOpen(true);
              }}
              setCheckListOn={setCheckListOn}
              tabView={tabView}
              totalCount={quizData.pagination.totalCount}
              deleteQuizIsSuccess={deleteQuizIsSuccess}
            />
            <PaginationBox
              itemsCountPerPage={quizData.pagination.pageUnit}
              totalItemsCount={quizData.pagination.totalCount}
            />
          </>
          {/* // )} */}
        </>
      )}

      {/* {tabView === '신고 문항' && <QuizReportList />} */}

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
  align-self: flex-end;
  align-items: center;
  gap: 5px;
  padding-bottom: 10px;
  padding-top: 15px;
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
