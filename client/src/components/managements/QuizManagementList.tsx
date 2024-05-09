import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { GrPlan } from 'react-icons/gr';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import {
  Accordion,
  Alert,
  Button,
  CommonDate,
  ContentList,
  IconButton,
  List,
  ListItem,
  Loader,
  Modal,
  PaginationBox,
  Search,
  Select,
  TabMenu,
  ValueNone,
} from '..';
import { quizService } from '../../api/axios';
import { useModal } from '../../hooks';
import { pageAtom } from '../../store/utilAtom';
import { QuestionTableType } from '../../types';
import { windowOpenHandler } from '../../utils/windowHandler';
import { COLOR } from '../constants';

import { ReportProcessModal } from './ReportProcessModal';

export function QuizManagementList() {
  const { openModal } = useModal();
  const [page, setPage] = useRecoilState(pageAtom);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const [questionList, setQuestionList] = useState<QuestionTableType[]>([]);

  const [tabVeiw, setTabVeiw] = useState<string>('문항 리스트');
  const [content, setContent] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // TODO: 신고하기 임시 데이터 api 연결후 삭제
  const [reportQuestionList, setReportQuestionList] = useState([
    {
      id: 'ds1215515',
      num: '12',
      source: '교재, 자체제작',
      curriculum_th: '6차, 8차',
      level: '학교급',
      grade: '학년',
      semester: '학기',
      curriculum: '교과',
      subject: '과목',
      denouement: 'denouement',
      questionType: '주관식',
      manager: '담당자',
      changeAt: '2023.11.11 05:05:55',
      activate: '활성화',
      state: '처리대기',
      report: {
        reportAt: '신고일자',
        manager: '신고자',
        type: '신고유형ㄹㄹㄹㄹㄹ',
        details:
          '신고내용 신고내용 신고내용신고내용신고내용신고내용신고내용신고내용신고내용신고내용 신고내용 신고내용',
      },
      processed: {
        changeAt: null,
        manager: null,
        type: null,
        details: null,
      },
    },
    {
      id: 'ds1255515515',
      num: '12',
      source: '교재, 자체제작',
      curriculum_th: '6차, 8차',
      level: '학교급',
      grade: '학년',
      semester: '학기',
      curriculum: '교과',
      subject: '과목',
      denouement: 'denouement',
      questionType: '주관식',
      manager: '담당자',
      changeAt: '2023.11.11 05:05:55',
      activate: '활성화',
      state: '처리완료',
      report: {
        reportAt: '신고일자',
        manager: '신고자',
        type: '신고유형ㄹㄹㄹㄹㄹ',
        details:
          '신고내용 신고내용 신고내용신고내용신고내용신고내용신고내용신고내용신고내용신고내용 신고내용 신고내용',
      },
      processed: {
        changeAt: '2023.11.11 05:05:55',
        manager: '담당자',
        type: '신고유형ㄹㄹㄹㄹㄹ',
        details:
          '처리 내용 처리 내용 처리 내용 처리 내용 처리 내용ㅍ 처리 내용처리 내용처리 내용처리 내용 처리 내용처리 내용처리 내용',
      },
    },
  ]);
  // 문항리스트 불러오기 api
  const getQuiz = async () => {
    const res = await quizService.get('/v1/quiz');
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
    // console.log('questionList', questionList);
  }, [quizData]);

  // 탭 바뀔시 초기화
  useEffect(() => {
    quizDataRefetch();
    setSearchValue('');
  }, [tabVeiw]);

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const filterSearchValue = () => {
    console.log('기존데이터 입력된 값으로 솎아낸뒤 재출력');
  };
  const filterSearchValueEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      // setSearchKeywordValue(searchValue);
    }
    if (event.key === 'Backspace') {
      // setSearchKeywordValue('');
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
  const selectReportCategory = [];
  //신고리스트 처리완료 버튼
  const openReportProcess = () => {
    openModal({
      title: '',
      content: <ReportProcessModal />,
      callback: () => {},
    });
  };

  const openCreateEditWindow = () => {
    windowOpenHandler({
      name: 'createcontentwindow',
      url: '/createcontentwindow',
    });
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

  // 탭메뉴 클릭시 페이지네이션 초기화
  const changeTab = () => {
    setPage(1);
  };

  useEffect(() => {
    setPage(1);
  }, []);

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

      <TabMenu
        length={2}
        menu={menuList}
        width={'300px'}
        selected={tabVeiw}
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
                    ondeleteClick={() => {}}
                    tabVeiw={tabVeiw}
                  />
                  <PaginationBox itemsCountPerPage={10} totalItemsCount={10} />
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

      {tabVeiw === '신고 문항' && (
        <>
          <Total> Total : {reportQuestionList.length}</Total>

          <ListTitle>
            <strong className="width_30px">NO</strong>
            <strong>출처</strong>
            <strong>교육과정</strong>
            <strong>학교급</strong>
            <strong>학년</strong>
            <strong>학기</strong>
            <strong>교과</strong>
            <strong>과목</strong>
            <strong>대단원</strong>
            <strong>문항타입</strong>
            <strong>담당자</strong>
            <strong>일자</strong>
            <strong>오픈여부</strong>
          </ListTitle>
          <ScrollWrapper>
            <PerfectScrollbar>
              {reportQuestionList.length > 0 ? (
                <List margin={`10px 0`}>
                  {reportQuestionList.map(
                    (item: {
                      id: string;
                      num: string;
                      source: string;
                      curriculum_th: string;
                      level: string;
                      grade: string;
                      semester: string;
                      curriculum: string;
                      subject: string;
                      denouement: string;
                      questionType: string;
                      manager: string;
                      changeAt: string;
                      activate: string;
                      state: string;
                      report: {
                        reportAt: string;
                        manager: string;
                        type: string;
                        details: string;
                      };
                      processed: {
                        changeAt: null | string;
                        manager: null | string;
                        type: null | string;
                        details: null | string;
                      };
                    }) => (
                      <ListItem
                        height={'fit-content'}
                        key={item.id as string}
                        isChecked={false}
                        onClick={() => {}}
                      >
                        <AccordionWrapper>
                          <ItemLayout>
                            <span className="width_40px">{item.num} </span>
                            <div className="line"></div>
                            <span>{item.source} </span>
                            <div className="line"></div>
                            <span>{item.curriculum_th} </span>
                            <div className="line"></div>
                            <span>{item.level} </span>
                            <div className="line"></div>
                            <span>{item.grade} </span>
                            <div className="line"></div>
                            <span>{item.semester} </span>
                            <div className="line"></div>
                            <span>{item.curriculum} </span>
                            <div className="line"></div>
                            <span>{item.subject} </span>
                            <div className="line"></div>
                            <span>{item.denouement} </span>
                            <div className="line"></div>
                            <span>{item.questionType} </span>
                            <div className="line"></div>
                            <span>{item.manager} </span>
                            <div className="line"></div>
                            <span>{item.changeAt} </span>
                            <div className="line"></div>
                            <span>{item.activate} </span>
                          </ItemLayout>

                          <Accordion
                            $backgroundColor={`${item.state == '처리대기' ? `${COLOR.GRAY}` : `${COLOR.BLUEGREEN}`}`}
                            title={`${item.state == '처리대기' ? '처리대기' : '처리완료'}`}
                            id={`${item.id}`}
                          >
                            <AccordionItemLayout>
                              <div className="text_wrapper">
                                <strong className="title">신고일자</strong>
                                <span className="text">
                                  {item.report.reportAt}
                                </span>
                              </div>
                              <div className="text_wrapper">
                                <strong className="title">신고자</strong>
                                <span className="text">
                                  {item.report.manager}
                                </span>
                              </div>
                              <div className="text_wrapper">
                                <strong className="title">신고유형</strong>
                                <span className="text">{item.report.type}</span>
                              </div>
                              <div className="text_wrapper">
                                <strong className="title">신고내용</strong>
                                <span className="text">
                                  {item.report.details}
                                </span>
                              </div>
                              <div className="process_wrapper">
                                {item.state !== '처리대기' ? (
                                  <div className="processed">
                                    <div className="text_wrapper">
                                      <strong className="title">
                                        처리일자
                                      </strong>
                                      <span className="text">
                                        {item.processed.changeAt}
                                      </span>
                                    </div>
                                    <div className="text_wrapper">
                                      <strong className="title">처리자</strong>
                                      <span className="text">
                                        {item.processed.manager}
                                      </span>
                                    </div>
                                    <div className="text_wrapper">
                                      <strong className="title">
                                        처리유형
                                      </strong>
                                      <span className="text">
                                        {item.processed.type}
                                      </span>
                                    </div>
                                    <div className="text_wrapper">
                                      <strong className="title">
                                        처리내용
                                      </strong>
                                      <span className="text">
                                        {item.processed.details}
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="button_wrapper">
                                    <Button
                                      $filled
                                      height={'35px'}
                                      fontSize={'13px'}
                                      cursor
                                      onClick={() => {
                                        openCreateEditWindow();
                                      }}
                                    >
                                      문항 수정하러가기
                                    </Button>
                                    <Button
                                      $filled
                                      height={'35px'}
                                      fontSize={'13px'}
                                      cursor
                                      onClick={() => openReportProcess()}
                                    >
                                      처리 완료
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </AccordionItemLayout>
                          </Accordion>
                        </AccordionWrapper>
                      </ListItem>
                    ),
                  )}
                </List>
              ) : (
                <ValueNoneWrapper>
                  <ValueNone />
                </ValueNoneWrapper>
              )}
            </PerfectScrollbar>
          </ScrollWrapper>
        </>
      )}

      <Alert
        isAlertOpen={isAlertOpen}
        description="권한을 삭제할 경우, 해당 권한의 아이디는 접속이 불가합니다."
        action="삭제"
        onClose={closeAlert}
        // onClick={() => submitDelete()}
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
const Total = styled.span`
  text-align: right;
  font-size: 15px;
  font-weight: bold;
  color: ${COLOR.FONT_BLACK};
  padding: 10px;
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
const ScrollWrapper = styled.div`
  /* overflow-y: auto; */
  height: calc(100vh - 450px);
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
    display: flex;
    font-size: 14px;
    width: calc(100% / 13);
    word-break: break-all;
    justify-content: center;
  }
  .line {
    width: 1px;
    height: 15px;
    /* background-color: ${COLOR.BORDER_GRAY}; */
  }

  .width_30px {
    width: 30px;
  }
`;

const ItemLayout = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 10px;

  > span {
    width: calc(100% / 13);
    padding: 0 5px;
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

  .width_40px {
    width: 40px;
  }

  /* .tag {
    padding: 5px 15px;
    background-color: ${COLOR.BORDER_GRAY};
    border-radius: 20px;
  } */
`;
const AccordionWrapper = styled.div`
  width: 100%;
  flex: 1 0 0;
`;
const AccordionItemLayout = styled.div`
  padding: 15px;
  .text_wrapper {
    display: flex;
    align-items: flex-start;
    padding-bottom: 5px;
  }
  .title {
    width: 65px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &::after {
      content: '';
      display: block;
      height: 10px;
      width: 1px;
      background-color: ${COLOR.BORDER_GRAY};
    }
  }
  .text {
    width: calc(100% - 65px);
    text-align: left;
    text-indent: 10px;
  }
  .process_wrapper {
    padding: 10px;
    .processed {
      padding: 15px 20px;
      background-color: ${COLOR.LIGHT_GRAY};
    }
    .button_wrapper {
      padding: 0 20px;
      display: flex;
      gap: 10px;
    }
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
