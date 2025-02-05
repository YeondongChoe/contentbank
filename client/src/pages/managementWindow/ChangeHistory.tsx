import * as React from 'react';
import { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { GrPlan } from 'react-icons/gr';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { historyService } from '../../api/axios';
import {
  CommonDate,
  IconButton,
  List,
  ListItem,
  PaginationBox,
  Search,
  Select,
  ValueNone,
} from '../../components';
import { COLOR } from '../../components/constants';
import { pageAtom } from '../../store/utilAtom';
import { HistoryDetailType } from '../../types';

export function ChangeHistory() {
  const [content, setContent] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [page, setPage] = useRecoilState(pageAtom);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // 히스토리 불러오기 api
  const getHistoryList = async () => {
    const res = await historyService.get(
      `/v1/quiz-manage?pageIndex=${page}&pageUnit=${7}&searchKeyword=${searchValue}&functionType=${content === '문항 분류 바꾸기' ? 'CHANGE_QUIZ_CLASS' : content === '문항 내용 바꾸기' ? 'CHANGE_QUIZ_CONTENT' : ''}&searchKeywordFrom=${startDate}&searchKeywordTo=${endDate}`,
    );
    console.log(`히스토리 get 결과값`, res);
    return res;
  };

  const {
    isLoading,
    data: historyListData,
    refetch,
  } = useQuery({
    queryKey: ['get-historylist'],
    queryFn: getHistoryList,
    meta: {
      errorMessage: 'get-historylist 에러 메세지',
    },
  });
  const historyList: HistoryDetailType[] =
    historyListData?.data.data.quizManageList;

  // 검색 기능 함수
  const filterSearchValue = () => {
    // 쿼리 스트링 변경 로직
    refetch();
  };

  const filterSearchValueEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // if (event.key === 'Enter') {
    //   refetch();
    // }
    if (event.key === 'Backspace') {
      setSearchValue('');
      refetch();
    }
  };

  // 페이지 조건값 변경시 리랜더링
  useEffect(() => {
    refetch();
  }, [endDate, startDate, searchValue, content, page]);

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent(value);
  };

  const selectCategory = [
    {
      id: '기능',
      label: '기능',
      name: '기능',
      options: [
        { id: '0', label: '전체', name: '전체' },
        { id: '1', label: '문항 내용 바꾸기', name: '문항 내용 바꾸기' },
        { id: '2', label: '문항 분류 바꾸기', name: '문항 분류 바꾸기' },
      ],
    },
  ];

  return (
    <Container>
      <TitleWrapper>
        <Title>문항 편집 이력</Title>
      </TitleWrapper>
      <InputWrapper>
        <SelectWrapper>
          <CommonDate
            setDate={setStartDate}
            minDate={startDate}
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
            minDate={startDate}
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
              isnormalizedOptions
              width={'200px'}
              defaultValue={el.label}
              key={el.label}
              options={el.options}
              onSelect={(event) => selectCategoryOption(event)}
            />
          ))}
        </SelectWrapper>

        {/* <Search
          value={searchValue}
          onClick={() => filterSearchValue()}
          onKeyDown={(e) => {
            filterSearchValueEnter(e);
          }}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="변경사항,담당자 검색"
          width={'50%'}
          height="40px"
        /> */}
      </InputWrapper>

      {!isLoading ? (
        <ListWrapper>
          <Total> Total : {historyList.length}</Total>
          <ListTitle>
            <strong className="width_20px">NO</strong>
            <strong>담당자</strong>
            <strong>변경일시</strong>
            <strong className="width_20">검색조건</strong>
            <strong className="width_50px">기능</strong>
            <strong className="width_20">변경내용</strong>
            {/* <strong>건수</strong> */}
          </ListTitle>
          <ScrollWrapper>
            <PerfectScrollbar>
              {historyList.length >= 1 ? (
                <>
                  <List
                    margin={`10px 0`}
                    width="99%"
                    noWrap={true}
                    height="none"
                  >
                    {historyList.map((item) => (
                      <ListItem
                        key={item.idx.toString()}
                        isChecked={false}
                        onClick={() => {}}
                      >
                        <ItemLayout>
                          <span className="width_20px">{item.idx} </span>
                          <div className="line"></div>
                          <span className="width_10">{item.changedByName}</span>
                          <div className="line"></div>
                          <span>{item.changedAt} </span>
                          <div className="line"></div>
                          <span className="width_20"> 검색조건 </span>
                          <div className="line"></div>
                          <span>{item.functionName} </span>
                          <div className="line"></div>
                          <span className="width_20">{item.content} </span>
                          {/* <div className="line"></div> */}
                          {/* <span className="width_5">{item.changedCnt}</span> */}
                        </ItemLayout>
                      </ListItem>
                    ))}
                  </List>
                </>
              ) : (
                <ValueNoneWrapper>
                  <ValueNone />
                </ValueNoneWrapper>
              )}
            </PerfectScrollbar>
          </ScrollWrapper>
        </ListWrapper>
      ) : (
        <ValueNone />
      )}
      <div className="position_bottom">
        <PaginationBox
          itemsCountPerPage={historyListData?.data.data.pagination.pageUnit}
          totalItemsCount={historyListData?.data.data.pagination.totalCount}
        />
      </div>
    </Container>
  );
}

const Container = styled.div`
  min-height: 700px;
  padding-bottom: 30px;
  margin-bottom: 10px;

  .position_bottom {
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  padding-bottom: 15px;
`;
const Title = styled.div`
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
const ValueNoneWrapper = styled.div`
  padding: 100px 0;
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
  padding: 15px 70px 15px 40px;
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
  .width_50px {
    width: 50px;
  }
  .width_20 {
    width: 22%;
  }
`;

const ItemLayout = styled.div`
  display: flex;
  width: 100%;
  //height: 40px;
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
    width: 8%;
  }
  .width_20 {
    width: 24%;
  }
  .width_50 {
    width: 50%;
  }
`;
