import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { GrPlan } from 'react-icons/gr';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { userInstance, historyService } from '../../api/axios';
import {
  Button,
  CommonDate,
  IconButton,
  List,
  ListItem,
  Loader,
  PaginationBox,
  Search,
  Select,
  ValueNone,
} from '../../components';
import { COLOR } from '../../components/constants';
import { pageAtom } from '../../store/utilAtom';

export function ChangeHistory() {
  const [content, setContent] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [page, setPage] = useRecoilState(pageAtom);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  //TODO: 임시 가다 데이터
  const [changesList, setChangesList] = useState([
    {
      id: 'dsadadsad',
      num: '12',
      manager: '담당자',
      changeAt: '2023.11.11 05:05:55',
      function: '문항내용 바꾸기',
      changes:
        '2줄이상 전체 보이기 2줄이상 전체 보이기 2줄이상 전체 보이기 2줄이상 전체 보이기 2줄이상 전체 보이기 2줄이상 전체 보이기 2줄이상 전체 보이기 2줄이상 전체 보이기 2줄이상 전체 보이기 2줄이상 전체 보이기 (교육과정 10차, 학교급 중등, 학년 3학년, 학기 1학기, 교과 수학, 과목 공통수학, 오픈여부 전체) 부채표 >> (교육과정 유지) 부채꼴',
      totalItem: '203',
    },
    {
      id: 'dsadasssssdsds',
      num: '13',
      manager: '담당d자',
      changeAt: '2023.11.11 05:05:55',
      function: '문항내용 바꾸기',
      changes:
        '(교육과정 10차, 학교급 중등, 학년 3학년, 학기 1학기, 교과 수학, 과목 공통수학, 오픈여부 전체) 부채표 >> (교육과정 유지) 부채꼴',
      totalItem: '203',
    },
    {
      id: 'dsadadsdsds',
      num: '14',
      manager: '담dsddda당ds자',
      changeAt: '2023.11.11 05:05:55',
      function: '문항내용 바꾸기',
      changes:
        '(교육과정 10차, 학교급 중등, 학년 3학년, 학기 1학기, 교과 수학, 과목 공통수학, 오픈여부 전체) 부채표 >> (교육과정 유지) 부채꼴',
      totalItem: '203',
    },
    {
      id: 'dssadadsad',
      num: '12',
      manager: '담당자',
      changeAt: '2023.11.11 05:05:55',
      function: '문항내용 바꾸기',
      changes:
        '2줄이상 전체 보이기 2줄이상 전체 보이기 2줄이상 전체 보이기 2줄이상 전체 보이기 2줄이상 전체 보이기 2줄이상 전체 보이기 2줄이상 전체 보이기 2줄이상 전체 보이기 2줄이상 전체 보이기 2줄이상 전체 보이기 (교육과정 10차, 학교급 중등, 학년 3학년, 학기 1학기, 교과 수학, 과목 공통수학, 오픈여부 전체) 부채표 >> (교육과정 유지) 부채꼴',
      totalItem: '203',
    },
    {
      id: 'dsadasdsds',
      num: '13',
      manager: '담당d자',
      changeAt: '2023.11.11 05:05:55',
      function: '문항내용 바꾸기',
      changes:
        '(교육과정 10차, 학교급 중등, 학년 3학년, 학기 1학기, 교과 수학, 과목 공통수학, 오픈여부 전체) 부채표 >> (교육과정 유지) 부채꼴',
      totalItem: '203',
    },
    {
      id: 'dsaddsaaaddsds',
      num: '14',
      manager: '담dsddda당ds자',
      changeAt: '2023.11.11 05:05:55',
      function: '문항내용 바꾸기',
      changes:
        '(교육과정 10차, 학교급 중등, 학년 3학년, 학기 1학기, 교과 수학, 과목 공통수학, 오픈여부 전체) 부채표 >> (교육과정 유지) 부채꼴',
      totalItem: '203',
    },
    {
      id: 'dasadaaaasdsad',
      num: '12',
      manager: '담당자',
      changeAt: '2023.11.11 05:05:55',
      function: '문항내용 바꾸기',
      changes:
        '2줄이상 전체 보이기 2줄이상 전체 보이기 2줄이상 전체 보이기 2줄이상 전체 보이기 2줄이상 전체 보이기 2줄이상 전체 보이기 2줄이상 전체 보이기 2줄이상 전체 보이기 2줄이상 전체 보이기 2줄이상 전체 보이기 (교육과정 10차, 학교급 중등, 학년 3학년, 학기 1학기, 교과 수학, 과목 공통수학, 오픈여부 전체) 부채표 >> (교육과정 유지) 부채꼴',
      totalItem: '203',
    },
    {
      id: 'aadsadaddsdsds',
      num: '13',
      manager: '담당d자',
      changeAt: '2023.11.11 05:05:55',
      function: '문항내용 바꾸기',
      changes:
        '(교육과정 10차, 학교급 중등, 학년 3학년, 학기 1학기, 교과 수학, 과목 공통수학, 오픈여부 전체) 부채표 >> (교육과정 유지) 부채꼴',
      totalItem: '203',
    },
    {
      id: 'dsadadddsadsasds',
      num: '14',
      manager: '담dsddda당ds자',
      changeAt: '2023.11.11 05:05:55',
      function: '문항내용 바꾸기',
      changes:
        '(교육과정 10차, 학교급 중등, 학년 3학년, 학기 1학기, 교과 수학, 과목 공통수학, 오픈여부 전체) 부채표 >> (교육과정 유지) 부채꼴',
      totalItem: '203',
    },
  ]);

  // 히스토리 불러오기 api
  const getHistoryList = async () => {
    const res = await historyService.get(
      `/v1/quiz-manage?pageIndex=${page}&pageUnit=${8}&searchKeyword=${searchValue}&functionType=${content}&beginDate=${startDate}&endDate=${endDate}`,
    );
    console.log(`히스토리 get 결과값`, res);
    return res;
  };

  const {
    isLoading,
    error,
    data: historyListData,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['get-historylist'],
    queryFn: getHistoryList,
    meta: {
      errorMessage: 'get-historylist 에러 메세지',
    },
  });

  console.log(historyListData);

  // 검색 기능 함수
  const filterSearchValue = () => {
    // 쿼리 스트링 변경 로직
    setSearchValue(value);
    getHistoryList();
  };

  // 페이지 조건값 변경시 리랜더링
  useEffect(() => {
    refetch();
  }, [endDate, startDate, searchValue, content, page]);

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    console.log(event.currentTarget);
    setContent(value);
  };

  const selectCategory = [
    {
      id: '변경 영역',
      label: '변경 영역',
      name: '변경 영역',
      options: [
        { id: '0', label: '전체', name: '전체' },
        { id: '1', label: 'CHANGE_QUIZ_CLASS', name: 'CHANGE_QUIZ_CLASS' },
        { id: '2', label: '문항 분류 바꾸기', name: '문항 분류 바꾸기' },
      ],
    },
  ];

  return (
    <Container>
      <InputWrapper>
        <SelectWrapper>
          <CommonDate
            setDate={setStartDate}
            $button={
              <IconButton
                width={'140px'}
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
                width={'140px'}
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

          {selectCategory.map((el) => (
            <Select
              width={'150px'}
              defaultValue={el.label}
              key={el.label}
              options={el.options}
              onSelect={(event) => selectCategoryOption(event)}
            />
          ))}
        </SelectWrapper>

        <Search
          value={value}
          onClick={() => filterSearchValue()}
          onKeyDown={(e) => {}}
          onChange={(e) => setValue(e.target.value)}
          placeholder="변경사항,담당자 검색"
          width={'50%'}
          height="40px"
        />
      </InputWrapper>

      {/* { list.length ?  */}
      {!isLoading ? (
        <ListWrapper>
          <Total> Total : {changesList.length}</Total>

          <ListTitle>
            <strong className="width_10px">NO</strong>
            <strong>담당자</strong>
            <strong>변경일시</strong>
            <strong>변경영역</strong>
            <strong className="width_40">변경사항</strong>
            <strong>건수</strong>
          </ListTitle>
          <ScrollWrapper>
            <PerfectScrollbar>
              <List margin={`10px 0`}>
                {changesList.map(
                  (item: {
                    id: string;
                    num: string;
                    manager: string;
                    changeAt: string;
                    function: string;
                    changes: string;
                    totalItem: string;
                  }) => (
                    <ListItem
                      key={item.id as string}
                      isChecked={false}
                      onClick={() => {}}
                    >
                      <ItemLayout>
                        <span className="width_20px">{item.num} </span>
                        <div className="line"></div>
                        <span className="width_10">{item.manager} </span>
                        <div className="line"></div>
                        <span>{item.changeAt} </span>
                        <div className="line"></div>
                        <span>{item.function} </span>
                        <div className="line"></div>
                        <span className="width_50">{item.changes} </span>
                        <div className="line"></div>
                        <span className="width_5">{item.totalItem}</span>
                      </ItemLayout>
                    </ListItem>
                  ),
                )}
              </List>
            </PerfectScrollbar>
          </ScrollWrapper>
        </ListWrapper>
      ) : (
        <ValueNone />
      )}
      <div className="position_bottom">
        <PaginationBox itemsCountPerPage={10} totalItemsCount={10} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
  min-height: 700px;
  position: relative;
  padding-bottom: 30px;
  margin-bottom: 10px;

  .position_bottom {
    position: absolute;
    width: 100%;
    bottom: 20px;
  }
`;
const Title = styled.p`
  font-size: 24px;
  font-weight: 800;
`;
const Total = styled.span`
  text-align: right;
  font-size: 15px;
  font-weight: bold;
  color: ${COLOR.FONT_BLACK};
  padding: 10px;
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: ${COLOR.LIGHT_GRAY};
`;
const SelectWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  > div,
  > span {
    margin-right: 10px;
  }
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
const ListWrapper = styled.div`
  padding: 10px;
  height: calc(100vh - 200px);
`;
const ScrollWrapper = styled.div`
  /* overflow-y: auto; */
  height: calc(100vh - 300px);
  width: 100%;
  border-top: 1px solid ${COLOR.BORDER_GRAY};
  border-bottom: 1px solid ${COLOR.BORDER_GRAY};
  /* margin-top: 5px; */
  padding: 0 15px;
  padding-bottom: 15px;
  background-color: #eee;
`;
const ListTitle = styled.p`
  padding: 15px 40px;
  background-color: #eee;
  border-top: 1px solid ${COLOR.BORDER_GRAY};
  border-bottom: 1px solid ${COLOR.BORDER_GRAY};
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  > strong {
    font-size: 14px;
    /* flex-wrap: nowrap;
    word-break: break-all; */
    text-align: center;
  }
  .line {
    width: 1px;
    height: 15px;
    /* background-color: ${COLOR.BORDER_GRAY}; */
  }

  .width_10px {
    width: 10px;
  }
  .width_20px {
    width: 20px;
  }
  .width_40 {
    width: 45%;
  }
`;

const ItemLayout = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  > span {
    display: flex;
    /* flex: 1 0 0; */
    justify-content: space-around;
    flex-wrap: wrap;
    word-break: break-all;
  }
  .line {
    width: 1px;
    height: 15px;
    background-color: ${COLOR.BORDER_GRAY};
  }
  .width_5 {
    width: 5%;
  }
  .width_10 {
    width: 10%;
  }
  .width_20px {
    width: 20px;
  }
  .width_50 {
    width: 50%;
  }
`;
