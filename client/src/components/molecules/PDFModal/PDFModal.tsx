import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { SlOptionsVertical, SlPrinter } from 'react-icons/sl';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactToPrint from 'react-to-print';
import { styled } from 'styled-components';

import { quizService } from '../../../api/axios';
import { Icon, IconButton, ValueNone } from '../../../components/atom';
import { MathViewer } from '../../../components/mathViewer';
import { ItemQuestionType, QuizListType } from '../../../types';
import { A4_HEIGHT, A4_WIDTH, COLOR } from '../../constants';

import { makePdf } from './makePDF';

type PDFModalProps = {
  list: any[];
};

export function PDFModal({ list }: PDFModalProps) {
  const [sortedList, setSortedList] = useState<QuizListType[]>();
  const pdf = makePdf();
  const printDivRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const getQuiz = async () => {
    const idxArray = list.map((list) => list.idx);
    const idxList = idxArray.join(',');
    console.log(idxList);
    const res = await quizService.get(`/v1/quiz/${idxList}`);
    // console.log('list data----------', res);
    return res.data.data;
  };
  const {
    data: quizData,
    isLoading,
    error: quizDataError,
    refetch: quizDataRefetch,
  } = useQuery({
    queryKey: ['get-idx-quizList'],
    queryFn: getQuiz,
    meta: {
      errorMessage: 'get-idx-quizList 에러 메세지',
    },
  });

  useEffect(() => {
    if (quizData) setSortedList(quizData.quizList);
  }, [quizData]);

  // const printPDF = async () => {
  //   await pdf.viewWithPdf();
  // };

  useEffect(() => {
    console.log('sortedList', sortedList);
  }, [sortedList]);

  return (
    <>
      <IconButtonWrapper>
        {/* <IconButton
          $iconOlny
          $borderNone
          onClick={() => printPDF()}
          width="20px"
          height="20px"
          $padding="0px"
        >
          <SlPrinter />
        </IconButton> */}

        <ReactToPrint
          trigger={() => (
            <SlPrinter style={{ fontSize: '20px', cursor: 'pointer' }} />
          )}
          content={() => printDivRef.current}
        />
      </IconButtonWrapper>

      <Component>
        <ScrollWrapper>
          <PerfectScrollbar
          // onScrollY={(container) =>
          //   console.log(`scrolled to: ${container.scrollTop}. ${scrollIndex}`)
          // }
          >
            <ContentsWrapper ref={printDivRef}>
              {sortedList &&
                sortedList.map((item, idx) => (
                  <MathViewerList
                    key={`${item.idx} pdf list`}
                    className="A4_paper"
                    ref={containerRef}
                  >
                    {item?.quizItemList?.length ? (
                      <PrintBox>
                        <ListWrap>
                          <RowList>
                            <ColumList>
                              {item.code && (
                                <span>
                                  <span className="title">문항번호:</span>
                                  {item.code}
                                </span>
                              )}
                              {item.quizCategoryList.length > 0 &&
                                // 조건에 맞는 항목 찾기
                                item.quizCategoryList.find(
                                  (el) => el.quizCategory?.교육과정,
                                ) && (
                                  <div>
                                    <span className="title">교육과정:</span>
                                    {item.quizCategoryList
                                      .flatMap((el) => {
                                        const course =
                                          el.quizCategory?.교육과정;
                                        if (Array.isArray(course)) {
                                          return course
                                            .map((sub) => sub.name)
                                            .filter(Boolean); // 배열 처리
                                        } else if (typeof course === 'string') {
                                          return [course]; // 문자열을 배열로 변환
                                        }
                                        return []; // 값이 없을 경우 빈 배열 반환
                                      })
                                      .join(', ')}
                                  </div>
                                )}

                              {item.quizCategoryList.length > 0 &&
                                // 조건에 맞는 항목 찾기
                                item.quizCategoryList.find(
                                  (el) => el.quizCategory?.학년,
                                ) && (
                                  <div>
                                    <span className="title">
                                      학&nbsp;&nbsp;&nbsp; 년:
                                    </span>
                                    {item.quizCategoryList
                                      .flatMap((el) => {
                                        const course = el.quizCategory?.학년;
                                        if (Array.isArray(course)) {
                                          return course
                                            .map((sub) => sub.name)
                                            .filter(Boolean); // 배열 처리
                                        } else if (typeof course === 'string') {
                                          return [course]; // 문자열을 배열로 변환
                                        }
                                        return []; // 값이 없을 경우 빈 배열 반환
                                      })
                                      .join(', ')}
                                  </div>
                                )}

                              {item.quizCategoryList.length > 0 &&
                                // 조건에 맞는 항목 찾기
                                item.quizCategoryList.find(
                                  (el) => el.quizCategory?.과목,
                                ) && (
                                  <div>
                                    <span className="title">
                                      과&nbsp;&nbsp;&nbsp; 목:
                                    </span>
                                    {item.quizCategoryList
                                      .flatMap((el) => {
                                        const course = el.quizCategory?.과목;
                                        if (Array.isArray(course)) {
                                          return course
                                            .map((sub) => sub.name)
                                            .filter(Boolean); // 배열 처리
                                        } else if (typeof course === 'string') {
                                          return [course]; // 문자열을 배열로 변환
                                        }
                                        return []; // 값이 없을 경우 빈 배열 반환
                                      })
                                      .join(', ')}
                                  </div>
                                )}

                              {item.quizCategoryList.length > 0 &&
                                // 조건에 맞는 항목 찾기
                                item.quizCategoryList.find(
                                  (el) => el.quizCategory?.대단원,
                                ) && (
                                  <div>
                                    <span className="title">대 분 류:</span>
                                    {item.quizCategoryList
                                      .flatMap((el) => {
                                        const course = el.quizCategory?.대단원;
                                        if (Array.isArray(course)) {
                                          return course
                                            .map((sub) => sub.name)
                                            .filter(Boolean); // 배열 처리
                                        } else if (typeof course === 'string') {
                                          return [course]; // 문자열을 배열로 변환
                                        }
                                        return []; // 값이 없을 경우 빈 배열 반환
                                      })
                                      .join(', ')}
                                  </div>
                                )}
                              {item.quizCategoryList.length > 0 &&
                                // 조건에 맞는 항목 찾기
                                item.quizCategoryList.find(
                                  (el) => el.quizCategory?.소단원,
                                ) && (
                                  <div>
                                    <span className="title">소 분 류:</span>
                                    {item.quizCategoryList
                                      .flatMap((el) => {
                                        const course = el.quizCategory?.소단원;
                                        if (Array.isArray(course)) {
                                          return course
                                            .map((sub) => sub.name)
                                            .filter(Boolean); // 배열 처리
                                        } else if (typeof course === 'string') {
                                          return [course]; // 문자열을 배열로 변환
                                        }
                                        return []; // 값이 없을 경우 빈 배열 반환
                                      })
                                      .join(', ')}
                                  </div>
                                )}
                            </ColumList>
                            <ColumList>
                              {item.quizCategoryList.length > 0 &&
                                // 조건에 맞는 항목 찾기
                                item.quizCategoryList.find(
                                  (el) => el.quizCategory?.학교급,
                                ) && (
                                  <div>
                                    <span className="title">학 교 급:</span>
                                    {item.quizCategoryList
                                      .flatMap((el) => {
                                        const course = el.quizCategory?.학교급;
                                        if (Array.isArray(course)) {
                                          return course
                                            .map((sub) => sub.name)
                                            .filter(Boolean); // 배열 처리
                                        } else if (typeof course === 'string') {
                                          return [course]; // 문자열을 배열로 변환
                                        }
                                        return []; // 값이 없을 경우 빈 배열 반환
                                      })
                                      .join(', ')}
                                  </div>
                                )}

                              {item.quizCategoryList.length > 0 &&
                                // 조건에 맞는 항목 찾기
                                item.quizCategoryList.find(
                                  (el) => el.quizCategory?.교과,
                                ) && (
                                  <div>
                                    <span className="title">
                                      교&nbsp;&nbsp;&nbsp; 과:
                                    </span>
                                    {item.quizCategoryList
                                      .flatMap((el) => {
                                        const course = el.quizCategory?.교과;
                                        if (Array.isArray(course)) {
                                          return course
                                            .map((sub) => sub.name)
                                            .filter(Boolean); // 배열 처리
                                        } else if (typeof course === 'string') {
                                          return [course]; // 문자열을 배열로 변환
                                        }
                                        return []; // 값이 없을 경우 빈 배열 반환
                                      })
                                      .join(', ')}
                                  </div>
                                )}

                              {item.quizCategoryList.length > 0 &&
                                // 조건에 맞는 항목 찾기
                                item.quizCategoryList.find(
                                  (el) => el.quizCategory?.학기,
                                ) && (
                                  <div>
                                    <span className="title">
                                      학&nbsp;&nbsp;&nbsp; 기:
                                    </span>
                                    {item.quizCategoryList
                                      .flatMap((el) => {
                                        const course = el.quizCategory?.학기;
                                        if (Array.isArray(course)) {
                                          return course
                                            .map((sub) => sub.name)
                                            .filter(Boolean); // 배열 처리
                                        } else if (typeof course === 'string') {
                                          return [course]; // 문자열을 배열로 변환
                                        }
                                        return []; // 값이 없을 경우 빈 배열 반환
                                      })
                                      .join(', ')}
                                  </div>
                                )}

                              {item.quizCategoryList.length > 0 &&
                                // 조건에 맞는 항목 찾기
                                item.quizCategoryList.find(
                                  (el) => el.quizCategory?.중단원,
                                ) && (
                                  <div>
                                    <span className="title">중 분 류:</span>
                                    {item.quizCategoryList
                                      .flatMap((el) => {
                                        const course = el.quizCategory?.중단원;
                                        if (Array.isArray(course)) {
                                          return course
                                            .map((sub) => sub.name)
                                            .filter(Boolean); // 배열 처리
                                        } else if (typeof course === 'string') {
                                          return [course]; // 문자열을 배열로 변환
                                        }
                                        return []; // 값이 없을 경우 빈 배열 반환
                                      })
                                      .join(', ')}
                                  </div>
                                )}

                              {item.quizCategoryList.length > 0 &&
                                // 조건에 맞는 항목 찾기
                                item.quizCategoryList.find(
                                  (el) => el.quizCategory?.문항타입,
                                ) && (
                                  <div>
                                    <span className="title">
                                      유&nbsp;&nbsp;&nbsp; 형:
                                    </span>
                                    {item.quizCategoryList
                                      .flatMap((el) => {
                                        const course =
                                          el.quizCategory?.문항타입;
                                        if (Array.isArray(course)) {
                                          return course
                                            .map((sub) => sub.name)
                                            .filter(Boolean); // 배열 처리
                                        } else if (typeof course === 'string') {
                                          return [course]; // 문자열을 배열로 변환
                                        }
                                        return []; // 값이 없을 경우 빈 배열 반환
                                      })
                                      .join(', ')}
                                  </div>
                                )}

                              {/* {item.quizCategoryList[0]?.quizCategory?.기타 && (
                                <span>
                                  <span className="title">
                                    기&nbsp;&nbsp;&nbsp; 타:
                                  </span>
                                  {item.quizCategoryList[0]?.quizCategory?.기타}
                                </span>
                              )} */}
                            </ColumList>
                          </RowList>

                          <ColumList>
                            {item.quizCategoryList.length > 0 &&
                              // 조건에 맞는 항목 찾기
                              item.quizCategoryList.find(
                                (el) => el.quizCategory?.난이도,
                              ) && (
                                <span>
                                  <span className="title">난 이 도:</span>
                                  {item.quizCategoryList
                                    .flatMap((el) => {
                                      const course = el.quizCategory?.난이도;
                                      if (Array.isArray(course)) {
                                        return course
                                          .map((sub) => sub.name)
                                          .filter(Boolean); // 배열 처리
                                      } else if (typeof course === 'string') {
                                        return [course]; // 문자열을 배열로 변환
                                      }
                                      return []; // 값이 없을 경우 빈 배열 반환
                                    })
                                    .join(', ')}
                                </span>
                              )}

                            {/* {item.quizCategoryList.length > 0 &&
                              // 조건에 맞는 항목 찾기
                              item.quizCategoryList.find(
                                (el) => el.quizCategory?.행동요소1,
                              ) && (
                                <span>
                                  <span className="title">행동요소1:</span>
                                  {item.quizCategoryList
                                    .flatMap((el) => {
                                      const course = el.quizCategory?.행동요소1;
                                      if (Array.isArray(course)) {
                                        return course
                                          .map((sub) => sub.name)
                                          .filter(Boolean); // 배열 처리
                                      } else if (typeof course === 'string') {
                                        return [course]; // 문자열을 배열로 변환
                                      }
                                      return []; // 값이 없을 경우 빈 배열 반환
                                    })
                                    .join(', ')}
                                </span>
                              )}

                            {item.quizCategoryList.length > 0 &&
                              // 조건에 맞는 항목 찾기
                              item.quizCategoryList.find(
                                (el) => el.quizCategory?.행동요소2,
                              ) && (
                                <span>
                                  <span className="title">행동요소2:</span>
                                  {item.quizCategoryList
                                    .flatMap((el) => {
                                      const course = el.quizCategory?.행동요소2;
                                      if (Array.isArray(course)) {
                                        return course
                                          .map((sub) => sub.name)
                                          .filter(Boolean); // 배열 처리
                                      } else if (typeof course === 'string') {
                                        return [course]; // 문자열을 배열로 변환
                                      }
                                      return []; // 값이 없을 경우 빈 배열 반환
                                    })
                                    .join(', ')}
                                </span>
                              )} */}
                          </ColumList>
                        </ListWrap>

                        <ListWrap>
                          <RowList>
                            <ColumList>
                              {item.quizItemList.map((el) => (
                                <MathViewerWrapper
                                  key={`${el?.code} quizItemList sortedList`}
                                  className="row"
                                >
                                  {[
                                    'BIG',
                                    'TEXT',
                                    'QUESTION',
                                    'SMALL',
                                    'EXAMPLE',
                                    'CHOICES',
                                    'ANSWER',
                                    'COMMENTARY',
                                    'HINT',
                                    'CONCEPT',
                                    'TITLE',
                                    'TIP',
                                  ].includes(el?.type) &&
                                    el?.content && (
                                      <MathViewer
                                        data={el.content}
                                      ></MathViewer>
                                    )}
                                </MathViewerWrapper>
                              ))}
                            </ColumList>
                          </RowList>
                        </ListWrap>
                      </PrintBox>
                    ) : (
                      <ValueNoneWrapper>
                        <ValueNone info="문항 데이터가 없습니다" textOnly />
                      </ValueNoneWrapper>
                    )}
                  </MathViewerList>
                ))}
            </ContentsWrapper>
          </PerfectScrollbar>
        </ScrollWrapper>
      </Component>
    </>
  );
}

type PDFModalStyleProps = {
  width?: string;
  height?: string;
  $margin?: string;
};

const Component = styled.div<PDFModalStyleProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: 100%;
  max-height: calc(100vh - 100px);
  background-color: ${COLOR.LIGHT_GRAY};
  border-radius: 0 0 10px 10px;
  border-top: 1px solid ${COLOR.BORDER_BLUE};
  overflow: hidden;
`;

const IconButtonWrapper = styled.div`
  position: absolute;
  top: 40px;
  right: calc(50% - 380px);
  width: 30px;
  height: 30px;
`;
const ScrollWrapper = styled.div`
  overflow-y: auto;
  height: calc(100vh - 100px);
  width: 100%;
  background-color: ${COLOR.LIGHT_GRAY};
  margin-bottom: 40px;

  .line {
    border-top: 1px solid ${COLOR.LIGHT_GRAY};
    margin: 10px 0;

    &.bottom_text {
      font-size: 13px;
      padding-top: 2px;
    }
  }
`;

const ContentsWrapper = styled.div`
  max-height: 100vh;
`;
const ListWrap = styled.div`
  margin: 20px;
  justify-content: center;
  align-items: center;
  /* height: 200px; */
  border-bottom: 1px solid #aaa;
  padding-bottom: 20px;

  .title {
    display: inline-block;
    width: 82px;
  }
`;

const ColumList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  flex-wrap: wrap;
`;
const RowList = styled.div`
  text-align: left;
  display: flex;
  flex-direction: row;
  /* justify-content: space-evenly; */
  flex-wrap: wrap;

  > div {
    width: 50%;
  }
`;

const PrintBox = styled.div`
  width: ${`${A4_WIDTH / 3 - 15}px`};
  /* border: 2px solid black; */
  margin: 0 auto;
  padding-top: 10px;
  margin-right: -15px;
`;

const MathViewerWrapper = styled.div`
  display: flex;
  width: ${`${A4_WIDTH / 3 - 30}px`};
  /* border: 2px solid blue; */
  padding: 0 20px;
  /* padding-top: 10px; */
  margin: 0 -15px;

  > div {
    width: calc(50% - 10px);
  }
  div {
    background-color: transparent !important;
  }
  div > img {
    width: 100% !important;
    height: auto !important;
  }
  table {
    width: inherit !important;
    height: auto !important;
  }
`;

const MathViewerList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: white;
  text-align: center;
  width: ${`${A4_WIDTH / 3 - 30}px`};
  height: ${`${A4_HEIGHT / 3 - 14}px`};
  /* border: 1px solid red; */
  margin: 20px;
  &.A4_paper > div {
    padding: 10px;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
`;
const ValueNoneWrapper = styled.div``;
