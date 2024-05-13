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
import { quizService } from '../../api/axios';
import { useModal } from '../../hooks';
import { pageAtom } from '../../store/utilAtom';
import { QuestionTableType } from '../../types';
import { postRefreshToken } from '../../utils/tokenHandler';
import { windowOpenHandler } from '../../utils/windowHandler';
import { COLOR } from '../constants';

import { QuizReportList } from './QuizReportList';

export function QuizManagementList() {
  const { openModal } = useModal();
  const [page, setPage] = useRecoilState(pageAtom);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const [questionList, setQuestionList] = useState<QuestionTableType[]>([]);
  const [checkListOn, setCheckListOn] = useState<number[]>([]);
  const [tabVeiw, setTabVeiw] = useState<string>('문항 리스트');
  const [content, setContent] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchKeywordValue, setSearchKeywordValue] = useState<string>('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // 문항리스트 불러오기 api
  const getQuiz = async () => {
    const res = await quizService.get(
      `/v1/quiz?pageIndex=${page}&pageUnit=${8}&searchKeyword=${searchKeywordValue}`,
    );
    console.log(`getQuiz 결과값`, res.data.data);
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

  useEffect(() => {
    if (quizData) {
      setQuestionList(quizData.quizList);
    }
    // console.log('questionList', questionList);
  }, [quizData]);

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
      if (context.response.data.code == 'GE-002') {
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

  // 탭 바뀔시 초기화
  useEffect(() => {
    quizDataRefetch();
    setSearchValue('');
  }, [tabVeiw]);
  // 데이터 변경시 리랜더링
  useEffect(() => {
    quizDataRefetch();
  }, [page]);

  const closeAlert = () => {
    setIsAlertOpen(false);
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

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);
  };
  const selectCategory = [
    {
      id: '1',
      label: '개정과정',
      value: '1',
      options: [
        { id: '0', label: '개정과정', value: '0' },
        { id: '1', label: '2015학년', value: '1' },
        { id: '2', label: '2018학년', value: '2' },
        { id: '3', label: '2020학년', value: '3' },
      ],
    },
    {
      id: '2',
      label: '학교',
      value: '2',
      options: [
        { id: '0', label: '학교', value: '0' },
        { id: '1', label: '초등', value: '1' },
        { id: '2', label: '중등', value: '2' },
        { id: '3', label: '고등', value: '3' },
      ],
    },
    {
      id: '3',
      label: '학년',
      value: '3',
      options: [
        { id: '0', label: '학년', value: '0' },
        { id: '1', label: '초등1', value: '1' },
        { id: '2', label: '초등2', value: '2' },
        { id: '3', label: '중등1', value: '3' },
        { id: '4', label: '중등2', value: '4' },
        { id: '5', label: '고등1', value: '5' },
        { id: '6', label: '고등2', value: '6' },
      ],
    },
    {
      id: '4',
      label: '학기',
      value: '4',
      options: [
        { id: '0', label: '학기', value: '0' },
        { id: '1', label: '1학기', value: '1' },
        { id: '2', label: '2학기', value: '2' },
      ],
    },
    {
      id: '5',
      label: '대분류',
      value: '5',
      options: [
        { id: '0', label: '대분류', value: '0' },
        {
          id: '1',
          label: '일차부등식 소분류를 연습해봅시다 초등학교 친구들',
          value: '1',
        },
        { id: '2', label: '일차부등식 중분류', value: '2' },
        { id: '3', label: '일차부등식 대분류', value: '3' },
      ],
    },
    {
      id: '6',
      label: '문항타입',
      value: '6',
      options: [
        { id: '0', label: '문항타입', value: '0' },
        { id: '1', label: '객관식', value: '1' },
        { id: '2', label: '주관식', value: '2' },
        { id: '3', label: '서술형', value: '3' },
      ],
    },
    {
      id: '7',
      label: '오픈여부',
      value: '7',
      options: [
        { id: '0', label: '오픈여부', value: '0' },
        { id: '1', label: '활성화', value: '1' },
        { id: '2', label: '비활성화', value: '2' },
      ],
    },
  ];

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

  // 탭메뉴 클릭시 페이지네이션 초기화
  const changeTab = () => {
    setPage(1);
  };

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
            {selectCategory.map((el) => (
              <Select
                width={'120px'}
                defaultValue={el.label}
                key={el.label}
                options={el.options}
                onSelect={(event) => selectCategoryOption(event)}
              />
            ))}
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
              {questionList.length > 0 ? (
                <>
                  <ContentList
                    list={questionList}
                    deleteBtn
                    ondeleteClick={() => {
                      setIsAlertOpen(true);
                    }}
                    setCheckListOn={setCheckListOn}
                    tabVeiw={tabVeiw}
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
