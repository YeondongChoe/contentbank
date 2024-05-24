import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import {
  Accordion,
  Button,
  List,
  ListItem,
  Modal,
  ValueNone,
  PaginationBox,
} from '..';
import { quizService } from '../../api/axios';
import { useModal } from '../../hooks';
import { pageAtom } from '../../store/utilAtom';
import { ReportData, Report } from '../../types';
import { windowOpenHandler } from '../../utils/windowHandler';
import { COLOR } from '../constants';

import { ReportProcessModal } from './ReportProcessModal';

export function QuizReportList() {
  const { openModal } = useModal();
  const [page, setPage] = useRecoilState(pageAtom);
  const [reportList, setReportList] = useState<Report[]>([]);

  const getReportList = async () => {
    const res = await quizService.get(`/v1/report`);
    // console.log(`getCategory 결과값`, res);
    return res.data;
  };

  const {
    data: reportData,
    isLoading,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ['get-reportList'],
    queryFn: getReportList,
    meta: {
      errorMessage: 'get-reportList 에러 메세지',
    },
  });
  console.log(reportData?.data.pagination);

  useEffect(() => {
    if (reportData) {
      setReportList(reportData.data.reportList);
    }
  }, [reportData]);

  // TODO: 신고하기 임시 데이터 api 연결후 삭제
  const [reportQuestionList, setReportQuestionList] = useState([
    {
      id: 'ds1215515',
      num: '12',
      source: '교ㅣ재, 자체제작',
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

  return (
    <>
      <Total> Total : {reportData?.data.pagination.totalCount}</Total>

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
          <>
            {reportList.length > 0 ? (
              <List margin={`10px 0`} width="99%" noWrap={true}>
                {reportList.map((item: Report) => (
                  <ListItem
                    height={'fit-content'}
                    key={item.idx.toLocaleString()}
                    isChecked={false}
                    onClick={() => {}}
                  >
                    <AccordionWrapper>
                      <ItemLayout>
                        <span className="width_40px">{item.idx}</span>
                        <div className="line"></div>
                        <span>출처</span>
                        <div className="line"></div>
                        <span>교육과정</span>
                        <div className="line"></div>
                        <span>학교급</span>
                        <div className="line"></div>
                        <span>학년</span>
                        <div className="line"></div>
                        <span>학기</span>
                        <div className="line"></div>
                        <span>교과</span>
                        <div className="line"></div>
                        <span>과목</span>
                        <div className="line"></div>
                        <span>대단원</span>
                        <div className="line"></div>
                        <span>문항타입</span>
                        <div className="line"></div>
                        <span>{item.answerBy}</span>
                        <div className="line"></div>
                        <span>{item.answerAt}</span>
                        <div className="line"></div>
                        <span>{item.quiz.isUse ? '활성화' : '비활성화'}</span>
                      </ItemLayout>

                      <Accordion
                        $backgroundColor={`${item.isUse ? `${COLOR.BLUEGREEN}` : `${COLOR.GRAY}`}`}
                        title={`${item.isUse === false ? '처리대기' : '처리완료'}`}
                        id={`${item.idx}`}
                      >
                        <AccordionItemLayout>
                          <div className="text_wrapper">
                            <strong className="title">신고일자</strong>
                            <span className="text">{item.reportAt}</span>
                          </div>
                          <div className="text_wrapper">
                            <strong className="title">신고자</strong>
                            <span className="text">{item.reportBy}</span>
                          </div>
                          <div className="text_wrapper">
                            <strong className="title">신고유형</strong>
                            <span className="text">{item.reportType}</span>
                          </div>
                          <div className="text_wrapper">
                            <strong className="title">신고내용</strong>
                            <span className="text">{item.reportContent}</span>
                          </div>
                          <div className="process_wrapper">
                            {item.isUse ? (
                              <div className="processed">
                                <div className="text_wrapper">
                                  <strong className="title">처리일자</strong>
                                  <span className="text">{item.answerAt}</span>
                                </div>
                                <div className="text_wrapper">
                                  <strong className="title">처리자</strong>
                                  <span className="text">{item.answerBy}</span>
                                </div>
                                <div className="text_wrapper">
                                  <strong className="title">처리유형</strong>
                                  <span className="text">
                                    {item.answerType}
                                  </span>
                                </div>
                                <div className="text_wrapper">
                                  <strong className="title">처리내용</strong>
                                  <span className="text">
                                    {item.answerContent}
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
                ))}
              </List>
            ) : (
              <ValueNoneWrapper>
                <ValueNone />
              </ValueNoneWrapper>
            )}
          </>
        </PerfectScrollbar>
      </ScrollWrapper>
      <PaginationBox
        itemsCountPerPage={reportData?.data.pagination.pageUnit as number}
        totalItemsCount={reportData?.data.pagination.totalCount as number}
      />
      <Modal />
    </>
  );
}

const Total = styled.span`
  text-align: right;
  font-size: 15px;
  font-weight: bold;
  color: ${COLOR.FONT_BLACK};
  padding: 10px;
`;

const ScrollWrapper = styled.div`
  overflow-y: auto;
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
