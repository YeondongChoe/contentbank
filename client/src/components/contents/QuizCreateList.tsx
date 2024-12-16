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
import {
  classificationInstance,
  quizService,
  resourceServiceInstance,
} from '../../api/axios';
import { useModal } from '../../hooks';
import { myAuthorityAtom } from '../../store/myAuthorityAtom';
import { quizListAtom } from '../../store/quizListAtom';
import { pageAtom } from '../../store/utilAtom';
import { ItemCategoryType, QuizListType } from '../../types';
import { selectedListType } from '../../types/WorkbookType';
import { postRefreshToken } from '../../utils/tokenHandler';

import { CreateContentModal } from './CreateContentModal';

export function QuizCreateList() {
  const { openModal } = useModal();
  const [page, setPage] = useRecoilState(pageAtom);
  const [myAuthority, setMyAuthority] = useRecoilState(myAuthorityAtom);
  const [quizList, setQuizList] = useRecoilState(quizListAtom);
  // 페이지네이션 index에 맞는 전체 데이터 불러오기
  const [questionList, setQuestionList] = useState<QuizListType[]>([]);

  const [tabVeiw, setTabVeiw] = useState<string>('문항 리스트');
  const [content, setContent] = useState<string[]>([]);
  // const [categoryTitles, setCategoryTitles] = useState<ItemCategoryType[]>([]);
  const [categoryList, setCategoryList] = useState<ItemCategoryType[][]>([]);
  const [categoriesE, setCategoriesE] = useState<ItemCategoryType[][]>([]);
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
  // const [startDate, setStartDate] = useState<string>('');
  // const [endDate, setEndDate] = useState<string>('');
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

  //그룹 화면설정 정보 불러오기 api
  const getMenu = async () => {
    const res = await resourceServiceInstance.get(
      `/v1/menu/path?url=contentListSetting`,
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

    if (tabVeiw == '즐겨찾는 문항') {
      const res = await quizService.get(
        `/v1/quiz/favorite?pageIndex=${page}&pageUnit=${8}&${queryString}`,
      );
      return res.data.data;
    } else {
      const res = await quizService.get(
        `/v1/quiz?pageIndex=${page}&pageUnit=${8}&${queryString}`,
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

  // 셀렉트 셋팅 api
  // /v1/menu/path

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
  //     console.log(
  //       '카테고라 리스트----',
  //       categoryData.data.data.categoryItemList,
  //     );
  //     setCategoryTitles(categoryData.data.data.categoryItemList);
  //   }
  // }, [categoryData]);

  // 카테고리의 그룹 유형 조회
  const getCategoryGroups = async () => {
    const response = await classificationInstance.get(
      `/v1/category/group/${groupCode}`,
    );
    return response.data.data.typeList;
  };
  const { data: groupsData, refetch: groupsDataRefetch } = useQuery({
    queryKey: ['get-category'],
    queryFn: getCategoryGroups,
    meta: {
      errorMessage: 'get-category 에러 메세지',
    },
    enabled: !!groupCode,
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
    const typeIds = typeList.split(',').map((id) => id.trim());
    const filteredIds = selectedList
      .filter((item) => item.search) // `search`가 true인 항목 필터링
      .map((item) => item.idx.toString()) // `idx`를 문자열로 변환
      .filter((id) => typeIds.includes(id)); // `typeIds`와 일치하는 항목만 필터링

    try {
      const requests = filteredIds.map((id) =>
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

  //탭이 바뀔 때 마다 selectedName 삭제
  useEffect(() => {
    setSelectedList((prevList) => {
      return prevList.map((item) => {
        // `selectedName` 키를 제거
        const { selectedName, ...rest } = item;
        return rest;
      });
    });
  }, [tabVeiw]);

  // 검색용 셀렉트 선택시
  useEffect(() => {
    quizDataRefetch();
  }, [selectedList]);

  // 데이터 변경시 리랜더링
  useEffect(() => {
    quizDataRefetch();
  }, [page]);

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
        lineStyle
      />
      {isLoading && (
        <LoaderWrapper>
          <Loader width="50px" />
        </LoaderWrapper>
      )}

      {!isLoading && quizData && (
        <>
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
            {/* 출처 */}
            {/* {categoriesE && categoryTitles[15] && (
              <Select
                onDefaultSelect={() =>
                  handleDefaultSelect(categoryTitles[15]?.code)
                }
                width={'130px'}
                defaultValue={categoryTitles[15]?.code}
                key={categoryTitles[15]?.code}
                options={categoriesE[2]}
                onSelect={(event) => selectCategoryOption(event)}
                setSelectedValue={setSelectedSource}
                heightScroll={'300px'}
              />
            )} */}
            {/* 교육과정 학교급 학년 학기 */}
            {/* <Select
              onDefaultSelect={() => handleDefaultSelect('교육과정')}
              width={'130px'}
              defaultValue={'교육과정'}
              key={'교육과정'}
              options={categoryList[0]}
              onSelect={(event) => selectCategoryOption(event)}
              setSelectedValue={setSelectedCurriculum}
              heightScroll={'300px'}
            />
            <Select
              onDefaultSelect={() => handleDefaultSelect('학교급')}
              width={'130px'}
              defaultValue={'학교급'}
              key={'학교급'}
              options={categoryList[1]}
              onSelect={(event) => selectCategoryOption(event)}
              setSelectedValue={setSelectedLevel}
              heightScroll={'300px'}
            />
            <Select
              onDefaultSelect={() => handleDefaultSelect('학년')}
              width={'130px'}
              defaultValue={'학년'}
              key={'학년'}
              options={categoryList[2]}
              onSelect={(event) => selectCategoryOption(event)}
              setSelectedValue={setSelectedGrade}
              heightScroll={'300px'}
            /> */}
            {/* {categoryList && categoryTitles[2] && (
              <Select
                onDefaultSelect={() =>
                  handleDefaultSelect(categoryTitles[2]?.code)
                }
                width={'130px'}
                defaultValue={categoryTitles[2]?.code}
                key={categoryTitles[2]?.code}
                options={categoryList[3]}
                onSelect={(event) => selectCategoryOption(event)}
                setSelectedValue={setSelectedSemester}
                heightScroll={'300px'}
              />
            )} */}
            {/* 교과 */}
            {/* {categoriesE && categoryTitles[5] && (
              <Select
                onDefaultSelect={() =>
                  handleDefaultSelect(categoryTitles[5]?.code)
                }
                width={'130px'}
                defaultValue={categoryTitles[5]?.code}
                key={categoryTitles[5]?.code}
                options={categoriesE[0]}
                onSelect={(event) => selectCategoryOption(event)}
                setSelectedValue={setSelectedSubject}
                heightScroll={'300px'}
              />
            )} */}
            {/* 과목 */}
            {/* {categoriesE && categoryTitles[6] && (
              <Select
                onDefaultSelect={() =>
                  handleDefaultSelect(categoryTitles[6]?.code)
                }
                width={'130px'}
                defaultValue={categoryTitles[6]?.code}
                key={categoryTitles[6]?.code}
                options={categoriesE[1]}
                onSelect={(event) => selectCategoryOption(event)}
                setSelectedValue={setSelectedCourse}
                heightScroll={'300px'}
              />
            )} */}
            {/* 문항타입 */}
            {/* {categoriesE && categoryTitles[38] && (
              <Select
                onDefaultSelect={() =>
                  handleDefaultSelect(categoryTitles[38]?.code)
                }
                width={'130px'}
                defaultValue={categoryTitles[38]?.code}
                key={categoryTitles[38]?.code}
                options={categoriesE[3]}
                onSelect={(event) => selectCategoryOption(event)}
                setSelectedValue={setSelectedQuestionType}
                heightScroll={'300px'}
              />
            )} */}
            {/* 오픈여부 */}
            {/* <Select
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
                selectedList={selectedList}
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
