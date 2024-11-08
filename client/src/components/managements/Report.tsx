import * as React from 'react';
import { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { GrPlan } from 'react-icons/gr';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { classificationInstance, quizService } from '../../api/axios';
import {
  Loader,
  Button,
  Search,
  Select,
  CommonDate,
  IconButton,
  openToastifyAlert,
  QuizReportList,
} from '../../components';
import { pageAtom } from '../../store/utilAtom';
import { ItemCategoryType, ReportType } from '../../types';
import { postRefreshToken } from '../../utils/tokenHandler';

export type selectedListProps = {
  name: string;
  idx: number;
  view: boolean;
  search: boolean;
};

export function Report() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [content, setContent] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [reportList, setReportList] = useState<ReportType[]>([]);
  const [categoryTitles, setCategoryTitles] = useState<ItemCategoryType[]>([]);
  const [categoryList, setCategoryList] = useState<ItemCategoryType[][]>([]);
  const [categoriesE, setCategoriesE] = useState<ItemCategoryType[][]>([]);
  const [page, setPage] = useRecoilState(pageAtom);

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
  const [searchKeywordValue, setSearchKeywordValue] = useState<string>('');

  const changeTab = () => {
    setPage(1);
  };

  const getReportList = async () => {
    const res = await quizService.get(`/v1/report`);
    //console.log(`getReportList 결과값`, res);
    return res.data;
  };

  const {
    data: reportData,
    isLoading,
    refetch: reportListRefetch,
    isSuccess,
  } = useQuery({
    queryKey: ['get-reportList'],
    queryFn: getReportList,
    meta: {
      errorMessage: 'get-reportList 에러 메세지',
    },
  });

  useEffect(() => {
    if (reportData) {
      setReportList(reportData.data.reportList);
    }
  }, [reportData]);

  //  카테고리 불러오기 api
  //   const getCategory = async () => {
  //     const res = await classificationInstance.get(`/v1/category`);
  //     return res;
  //   };
  //   const { data: categoryData, isLoading: isCategoryLoading } = useQuery({
  //     queryKey: ['get-category'],
  //     queryFn: getCategory,
  //     meta: {
  //       errorMessage: 'get-category 에러 메세지',
  //     },
  //   });
  //   useEffect(() => {
  //     if (categoryData) {
  //       setCategoryTitles(categoryData.data.data.categoryItemList);
  //     }
  //   }, [categoryData]);

  // 카테고리의 그룹 유형 조회
  const getCategoryGroups = async () => {
    const response = await classificationInstance.get('/v1/category/group/A');
    return response.data.data.typeList;
  };
  const { data: groupsData, refetch: groupsDataRefetch } = useQuery({
    queryKey: ['get-category-groups-A'],
    queryFn: getCategoryGroups,
    //enabled: !!categoryData,
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

  // 탭 바뀔시 초기화
  useEffect(() => {
    reportListRefetch();
    setSearchValue('');
  }, [page]);

  // 검색 기능 함수
  const filterSearchValue = () => {
    reportListRefetch();
  };

  const filterSearchValueEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // if (event.key === 'Enter') {
    //   reportListRefetch();
    // }
    if (event.key === 'Backspace') {
      setSearchValue('');
      reportListRefetch();
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
      case '출처':
        setSelectedSource('');
        break;
      case '교육과정':
        setSelectedCurriculum('');
        break;
      case '학교급':
        setSelectedLevel('');
        break;
      case '학년':
        setSelectedGrade('');
        break;
      case '학기':
        setSelectedSemester('');
        break;
      case '교과':
        setSelectedSubject('');
        break;
      case '과목':
        setSelectedCourse('');
        break;
      case '문항타입':
        setSelectedQuestionType('');
        break;
      case '오픈여부':
        setSelectedOpenStatus('');
        break;
      default:
        break;
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
    reportListRefetch();
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

  return (
    <Container>
      <>
        <TitleWrapper>
          <Title>신고문항</Title>
          {/* <Button
            height={'35px'}
            width={'150px'}
            onClick={openWindowCreateWorksheet}
            fontSize="13px"
            $filled
            cursor
          >
            문항 일괄 편집
          </Button> */}
        </TitleWrapper>

        {isLoading && (
          <LoaderWrapper>
            <Loader width="50px" />
          </LoaderWrapper>
        )}
        {!isLoading && reportData && (
          <>
            {/* 리스트 셀렉트 */}
            <SelectWrapper>
              {/* 출처 */}
              {categoriesE && (
                <Select
                  onDefaultSelect={() => handleDefaultSelect('출처')}
                  width={'130px'}
                  defaultValue={'출처'}
                  key={'출처'}
                  options={categoriesE[2]}
                  onSelect={(event) => selectCategoryOption(event)}
                  setSelectedValue={setSelectedSource}
                  heightScroll={'300px'}
                />
              )}

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
              {/* 학기 */}
              {categoryList && (
                <Select
                  onDefaultSelect={() => handleDefaultSelect('학기')}
                  width={'130px'}
                  defaultValue={'학기'}
                  key={'학기'}
                  options={categoryList[3]}
                  onSelect={(event) => selectCategoryOption(event)}
                  setSelectedValue={setSelectedSemester}
                  heightScroll={'300px'}
                />
              )}
              {/* 교과 */}
              {categoriesE && (
                <Select
                  onDefaultSelect={() => handleDefaultSelect('교과')}
                  width={'130px'}
                  defaultValue={'교과'}
                  key={'교과'}
                  options={categoriesE[0]}
                  onSelect={(event) => selectCategoryOption(event)}
                  setSelectedValue={setSelectedSubject}
                  heightScroll={'300px'}
                />
              )}
              {/* 과목 */}
              {categoriesE && (
                <Select
                  onDefaultSelect={() => handleDefaultSelect('과목')}
                  width={'130px'}
                  defaultValue={'과목'}
                  key={'과목'}
                  options={categoriesE[1]}
                  onSelect={(event) => selectCategoryOption(event)}
                  setSelectedValue={setSelectedCourse}
                  heightScroll={'300px'}
                />
              )}
              {/* 문항타입 */}
              {categoriesE && (
                <Select
                  onDefaultSelect={() => handleDefaultSelect('문항타입')}
                  width={'130px'}
                  defaultValue={'문항타입'}
                  key={'문항타입'}
                  options={categoriesE[3]}
                  onSelect={(event) => selectCategoryOption(event)}
                  setSelectedValue={setSelectedQuestionType}
                  heightScroll={'300px'}
                />
              )}
              <DatePickerWrapper>
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
                  minDate={startDate}
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
              </DatePickerWrapper>
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
            </SelectWrapper>

            <QuizReportList
              list={reportList}
              totalCount={reportData.data.pagination.totalCount}
              itemsCountPerPage={reportData.data.pagination.pageUnit}
            ></QuizReportList>
          </>
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
