import * as React from 'react';
import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { TbCopy } from 'react-icons/tb';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  Accordion,
  Button,
  List,
  ListItem,
  Modal,
  ValueNone,
  PaginationBox,
  ImagePreviewModal,
} from '../..';
import { quizService } from '../../../api/axios';
import Image from '../../../assets/images/ClassificationImg.png';
import { useModal } from '../../../hooks';
import { pageAtom } from '../../../store/utilAtom';
import { ReportData, ReportType } from '../../../types';
import { windowOpenHandler } from '../../../utils/windowHandler';
import { COLOR } from '../../constants';

import { ReportProcessModal } from './ReportProcessModal';

type QuizReportListProps = {
  list: ReportType[];
  totalCount?: number;
  itemsCountPerPage?: number;
};

export function QuizReportList({
  list,
  totalCount,
  itemsCountPerPage,
}: QuizReportListProps) {
  const { openModal } = useModal();
  const [page, setPage] = useRecoilState(pageAtom);
  console.log(list);

  //신고리스트 처리완료 버튼
  const openReportProcess = (idx: number) => {
    openModal({
      title: '',
      content: <ReportProcessModal registorReport={false} reportIdx={idx} />,
      callback: () => {},
    });
  };
  //이미지 확대 버튼
  const openImagePreviewModal = (src: string) => {
    openModal({
      title: '',
      content: <ImagePreviewModal imgSrc={src} />,
    });
  };
  // 로컬스토리지에 보낼데이터 저장
  const saveLocalData = (idx?: number) => {
    if (idx) {
      window.localStorage.setItem('quizIdx', JSON.stringify(idx));
    } else {
      window.localStorage.setItem('quizList', JSON.stringify(list));
    }
  };
  const openCreateEditWindow = () => {
    saveLocalData();
    windowOpenHandler({
      name: 'createcontentmain',
      url: '/createcontentmain',
      queryParams: { state: 'edit' },
    });
  };
  const openContentPreviewWindow = (idx: number) => {
    saveLocalData(idx);
    windowOpenHandler({
      name: 'contentPreview',
      url: '/content-preview/report',
      $width: 850,
    });
  };

  return (
    <Container>
      <Total> Total : {totalCount}</Total>

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
            {list && list.length > 0 ? (
              <List margin={`10px 0`} width="99%" noWrap={true}>
                {list.map((item: ReportType) => (
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
                          <div className="text_wrapper">
                            <strong className="title">첨부파일</strong>
                            <span className="text">
                              <ImgWrapper>
                                {item.articleList.map((img, i) => (
                                  <img
                                    key={i}
                                    className="icon"
                                    src={img.storedPath}
                                    width={150}
                                    onClick={() => {
                                      openImagePreviewModal(img.storedPath);
                                    }}
                                  ></img>
                                ))}
                              </ImgWrapper>
                            </span>
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
                                <div className="button_wrapper">
                                  <Button
                                    $filled
                                    width="450px"
                                    height={'35px'}
                                    fontSize={'13px'}
                                    cursor
                                    $margin="15px 0 0 45px"
                                    onClick={() => {
                                      openContentPreviewWindow(item.quiz.idx);
                                    }}
                                  >
                                    처리된 문항 보기
                                  </Button>
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
                                  onClick={() => openReportProcess(item.idx)}
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
        itemsCountPerPage={itemsCountPerPage as number}
        totalItemsCount={totalCount as number}
      />
      <Modal />
    </Container>
  );
}
const Container = styled.div`
  position: relative;
`;
const Total = styled.span`
  text-align: right;
  font-size: 15px;
  font-weight: bold;
  color: ${COLOR.FONT_BLACK};
  padding: 10px;
`;

const ScrollWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid ${COLOR.BORDER_GRAY};
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
  .icon {
    cursor: pointer;
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
const ImgWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding-left: 10px;
`;
const ValueNoneWrapper = styled.div`
  padding: 100px 0;
  height: 550px;
`;
