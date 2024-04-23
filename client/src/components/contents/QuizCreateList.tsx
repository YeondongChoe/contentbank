import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  ContentList,
  Alert,
  Button,
  PaginationBox,
  Search,
  Select,
  TabMenu,
  Modal,
  ValueNone,
  Loader,
  List,
  ListItem,
  CheckBoxI,
  DropDownItemProps,
  DropDown,
} from '..';
import { userInstance, quizService } from '../../api/axios';
import { useModal } from '../../hooks';
import { pageAtom, totalPageAtom } from '../../store/utilAtom';
import { ItemQuestionType, QuizListType } from '../../types';
import { windowOpenHandler } from '../../utils/windowHandler';
import { COLOR } from '../constants';

import { CreateContentModal } from './CreateContentModal';

export function QuizCreateList() {
  const { openModal } = useModal();
  const [page, setPage] = useRecoilState(pageAtom);
  // 페이지네이션 index에 맞는 전체 데이터 불러오기
  const [questionList, setQuestionList] = useState<QuizListType[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchKeywordValue, setSearchKeywordValue] = useState<string>('');
  const [tabVeiw, setTabVeiw] = useState<string>('문항 리스트');
  const [checkList, setCheckList] = useState<number[]>([]);
  const [content, setContent] = useState<string[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const modalData = {
    title: '',
    content: <CreateContentModal />,
    callback: () => {},
  };

  // 모달 연뒤 문항 생성 윈도우 이동
  const openCreateModal = () => {
    openModal(modalData);
  };
  // 탭메뉴 클릭시 페이지네이션 초기화
  //              && 리스트 데이터 전송값 변경
  const changeTab = () => {
    setPage(1);
  };

  const dropDownList: DropDownItemProps[] = [
    {
      key: 'ListTabl/수정',
      title: '수정',
      onClick: () => {
        openCreateEditWindow();
        setShowDropDown(false);
      },
    },
    {
      key: 'ListTable/DropDownList복제 후 수정',
      title: '복제 후 수정',
      onClick: () => {
        openCreateEditWindow();
        setShowDropDown(false);
      },
    },
  ];

  // 문항 수정 윈도우 열기
  const openCreateEditWindow = () => {
    saveLocalData();
    windowOpenHandler({
      name: 'createcontentmain',
      url: '/createcontentmain',
    });
  };

  // 로컬스토리지에 보낼데이터 저장
  const saveLocalData = () => {
    const sendData = { data: false };
    localStorage.setItem('sendData', JSON.stringify(sendData));

    //새로운 리스트 데이터 조회
    // window.parentCallback = () => {
    //   getContents();
    // };
  };

  // 문항리스트 불러오기 api
  const getQuiz = async () => {
    const res = await quizService.get(`/v1/quiz`);
    console.log(`getQuiz 결과값`, res.data.data);
    return res.data.data;
  };
  const {
    data: quizData,
    isLoading,
    error: quizDataError,
    refetch: quizDataRefetch,
    isSuccess,
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
    console.log('questionList', questionList);
  }, [quizData]);

  // 활성화/비활성화 버튼상태 토글
  const openSubmitAlert = () => {
    setIsAlertOpen(true);
  };
  const closeSubmitAlert = () => {
    setIsAlertOpen(false);
  };
  // 활성화/비활성화 데이터 전송
  const submitDisabled = () => {};

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

  // 체크박스 설정
  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.checked);
    if (e.target.checked) {
      setCheckList(questionList.map((item: QuizListType) => item.idx));
    } else {
      setCheckList([]);
    }
  };
  const handleButtonCheck = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) => {
    const target = e.currentTarget.childNodes[0].childNodes[0]
      .childNodes[0] as HTMLInputElement;
    if (!target.checked) {
      setCheckList((prev) => [...prev, id]);
    } else {
      setCheckList(checkList.filter((el) => el !== id));
    }
  };

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

      {isLoading && (
        <LoaderWrapper>
          <Loader width="50px" />
        </LoaderWrapper>
      )}

      {!isLoading && quizData && (
        <>
          <TabMenu
            length={2}
            menu={menuList}
            selected={tabVeiw}
            width={'300px'}
            setTabVeiw={setTabVeiw}
            lineStyle
            $margin={'10px 0'}
            onClickTab={changeTab}
          />
          {/* 리스트 셀렉트 */}
          <SelectWrapper>
            {selectCategory.map((el) => (
              <Select
                width={'130px'}
                defaultValue={el.label}
                key={el.label}
                options={el.options}
                onSelect={(event) => selectCategoryOption(event)}
              />
            ))}
            <Search
              value={searchValue}
              onClick={() => filterSearchValue()}
              onKeyDown={(e) => filterSearchValueEnter(e)}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              placeholder="문항코드, 중단원, 담당자 검색"
              width={'25%'}
              height="40px"
            />
          </SelectWrapper>
          <InputWrapper>
            <ButtonWrapper>
              <CheckBoxWrapper>
                <CheckBoxI
                  $margin={'0 5px 0 0'}
                  onChange={(e) => handleAllCheck(e)}
                  checked={
                    checkList.length === questionList.length ? true : false
                  }
                  id={'all check'}
                  value={'all check'}
                />
                <span className="title_top">전체선택</span>
              </CheckBoxWrapper>
              <ActionButtonWrapper>
                <DropDown
                  list={dropDownList}
                  buttonText={'수정'}
                  showDropDown={showDropDown}
                  setShowDropDown={setShowDropDown}
                  disabled={isEnabled}
                ></DropDown>
                <Button
                  width="140px"
                  height="35px"
                  fontSize="14px"
                  $borderRadius="7px"
                  onClick={openSubmitAlert}
                  $filled
                  $success
                  disabled={isEnabled}
                  cursor
                >
                  활성화 / 비활성화
                </Button>
              </ActionButtonWrapper>
            </ButtonWrapper>
          </InputWrapper>
          <TableWrapper>
            <Total> Total : {quizData.pagination.totalCount}</Total>
            {questionList.length > 1 ? (
              // <ContentList list={questionList} onClick={openSubmitAlert} />
              <ListWrapper>
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
                      {questionList.map((item: QuizListType) => (
                        <ListItem
                          key={item.code}
                          isChecked={false}
                          onClick={() => {}}
                        >
                          <ItemLayout>
                            {/* <span className="width_20px">{item.num} </span>
                            <div className="line"></div>
                            <span className="width_10">{item.manager} </span>
                            <div className="line"></div>
                            <span>{item.changeAt} </span>
                            <div className="line"></div>
                            <span>{item.function} </span>
                            <div className="line"></div>
                            <span className="width_50">{item.changes} </span>
                            <div className="line"></div>
                            <span className="width_5">{item.totalItem}</span> */}
                          </ItemLayout>
                        </ListItem>
                      ))}
                    </List>
                  </PerfectScrollbar>
                </ScrollWrapper>
              </ListWrapper>
            ) : (
              <ValueNoneWrapper>
                <ValueNone />
              </ValueNoneWrapper>
            )}
          </TableWrapper>

          <PaginationBox
            itemsCountPerPage={quizData.pagination.pageUnit}
            totalItemsCount={quizData.pagination.totalCount}
          />
        </>
      )}
      <Alert
        isAlertOpen={isAlertOpen}
        description="비활성화 처리시 문항 사용이 불가합니다. 비활성화 처리 하시겠습니까?"
        action="확인"
        isWarning={true}
        onClose={closeSubmitAlert}
        onClick={submitDisabled}
      ></Alert>

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
  gap: 5px;
  /* padding-bottom: 10px; */
  padding-top: 10px;
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TableWrapper = styled.div`
  //min-height: 670px;
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

const Total = styled.span`
  text-align: right;
  font-size: 15px;
  font-weight: bold;
  color: ${COLOR.FONT_BLACK};
  padding: 10px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 10px;
`;
const ActionButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
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
