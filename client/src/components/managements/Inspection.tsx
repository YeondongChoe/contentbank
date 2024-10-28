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
  InspectionList,
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

export function Inspection() {
  const [page, setPage] = useRecoilState(pageAtom);
  // const [categoryTitles, setCategoryTitles] = useState<ItemCategoryType[]>([]);
  const [categoryList, setCategoryList] = useState<ItemCategoryType[][]>([]);
  const [categoriesE, setCategoriesE] = useState<ItemCategoryType[][]>([]);
  const [questionList, setQuestionList] = useState<QuestionTableType[]>([]);
  const [checkListOn, setCheckListOn] = useState<number[]>([]);
  const [content, setContent] = useState<string[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  // 셀렉트
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>(''); //교육과정
  const [selectedLevel, setSelectedLevel] = useState<string>(''); //학교급
  const [selectedGrade, setSelectedGrade] = useState<string>(''); //학년
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchKeywordValue, setSearchKeywordValue] = useState<string>('');
  const [onSearch, setOnSearch] = useState<boolean>(false);

  const [key, setKey] = useState(0);

  // 문항리스트 불러오기 api
  const getQuiz = async () => {
    const res = await quizService.get(
      !onSearch
        ? `/v1/quiz?pageIndex=${page}&pageUnit=${8}`
        : `/v1/quiz?pageIndex=${page}&pageUnit=${8}&searchKeyword=${searchKeywordValue}&curriculum=${selectedCurriculum}&level=${selectedLevel}&grade=${selectedGrade}`,
    );
    return res.data.data;
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
      console.log('itemsList', itemsList);
      setCategory(itemsList);
    } catch (error: any) {
      if (error.data?.code == 'GE-002') postRefreshToken();
    }
  };
  useEffect(() => {
    console.log('categoryList', categoryList);
  }, [categoryList]);

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);
    // if (value !== '교육과정' || value !== '학교급' || value !== '학년') {
    //   setOnSearch(true);
    // } else {
    //   setOnSearch(false);
    // }
  };
  //셀렉트 초기화
  const handleDefaultSelect = (defaultValue?: string) => {
    if (defaultValue == 'all') {
      setSelectedCurriculum('');
      setSelectedLevel('');
      setSelectedGrade('');
      setSearchKeywordValue('');
    }
    switch (defaultValue) {
      case '교육과정':
        setSelectedCurriculum('');
        break;
      case '학교급':
        setSelectedLevel('');
        break;
      case '학년':
        setSelectedGrade('');
        break;

      default:
        break;
    }

    setOnSearch(false);
  };

  // 검색용 셀렉트 선택시
  useEffect(() => {
    quizDataRefetch();
    setOnSearch(true);
  }, [selectedCurriculum, selectedLevel, selectedGrade, searchKeywordValue]);

  useEffect(() => {
    reloadComponent();
  }, [questionList]);

  // 랜더링 초기화
  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    if (quizData) {
      setQuestionList(quizData.quizList);
    }
    // console.log('questionList', questionList);
  }, [quizData]);

  // 데이터 변경시 리랜더링
  useEffect(() => {
    quizDataRefetch();
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
        <Title>검수 관리</Title>
      </TitleWrapper>

      {isLoading && (
        <LoaderWrapper>
          <Loader width="50px" />
        </LoaderWrapper>
      )}

      {!isLoading && quizData && (
        <>
          {/* 리스트 셀렉트 */}
          <SelectWrapper>
            {/* 교육과정 */}
            <Select
              onDefaultSelect={() => handleDefaultSelect('교육과정')}
              width={'130px'}
              defaultValue={'교육과정'}
              key={'교육과정'}
              options={categoryList[0]}
              onSelect={(event) => selectCategoryOption(event)}
              setSelectedValue={setSelectedCurriculum}
              heightScroll={'300px'}
            />
            {/* 학교급 */}
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
            {/* 학년 */}
            <Select
              onDefaultSelect={() => handleDefaultSelect('학년')}
              width={'130px'}
              defaultValue={'학년'}
              key={'학년'}
              options={categoryList[2]}
              onSelect={(event) => selectCategoryOption(event)}
              setSelectedValue={setSelectedGrade}
              heightScroll={'300px'}
            />
            {/* 상태 */}
            <Select
              onDefaultSelect={() => handleDefaultSelect('상태')}
              width={'130px'}
              defaultValue={'상태'}
              key={'상태'}
              options={categoryList[2]}
              onSelect={(event) => selectCategoryOption(event)}
              setSelectedValue={setSelectedGrade}
              heightScroll={'300px'}
            />
          </SelectWrapper>

          {quizData && questionList.length > 0 ? (
            <>
              <InspectionList
                key={key}
                list={questionList}
                deleteBtn
                quizDataRefetch={quizDataRefetch}
                ondeleteClick={() => {
                  setIsAlertOpen(true);
                }}
                setCheckListOn={setCheckListOn}
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

      {/* <Alert
        isAlertOpen={isAlertOpen}
        description={`${checkListOn.length}개의 문항을 삭제 처리 하시겠습니까?`}
        action="삭제"
        isWarning={true}
        onClose={closeAlert}
        onClick={() => submitDelete()}
      /> */}

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
