import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';

import {
  Button,
  DropDown,
  DropDownItemProps,
  CheckBox,
  List,
  ListItem,
  CheckBoxI,
  Modal,
  Alert,
  Icon,
  openToastifyAlert,
  PDFModal,
  Tooltip,
} from '../..';
import { quizService } from '../../../api/axios';
import { useModal } from '../../../hooks';
import { quizListAtom } from '../../../store/quizListAtom';
import { pageAtom } from '../../../store/utilAtom';
import { QuizListType, QuizCategory, QuizItemListType } from '../../../types';
import { selectedListType } from '../../../types/WorkbookType';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { windowOpenHandler } from '../../../utils/windowHandler';
import { COLOR } from '../../constants';
import { ProcessListModal } from '../../managements/process';

type InspectionListProps = {
  list: QuizListType[] | any[]; // TODO
  totalCount?: number;
  deleteQuizIsSuccess?: boolean;
  quizDataRefetch?: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
  selectedList: selectedListType[];
};

export function InspectionList({
  list,
  totalCount,
  deleteQuizIsSuccess,
  quizDataRefetch,
  selectedList,
}: InspectionListProps) {
  const { openModal } = useModal();
  const [quizList, setQuizList] = useRecoilState(quizListAtom);
  const [page, setPage] = useRecoilState(pageAtom);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [checkList, setCheckList] = useState<number[]>([]);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [sortedList, setSortedList] = useState<QuizListType[]>([]);
  const [questionList, setQuestionList] = useState<QuizListType[]>([]);
  const textRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  // 문항 검수/수정 윈도우 열기
  const openCreateEditWindow = () => {
    saveLocalData();
    windowOpenHandler({
      name: 'inspection',
      url: '/inspection',
      queryParams: { state: 'inspection' },
    });
  };

  // 로컬스토리지에 보낼데이터 저장
  const saveLocalData = () => {
    window.localStorage.setItem('quizList', JSON.stringify(quizList));
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
      setCheckList([id]);
    } else {
      setCheckList(checkList.filter((el) => el !== id));
    }
  };

  // 문항 즐겨찾기 토글 api
  const patchQuizFavorite = async (data: {
    idx: number;
    isFavorite: boolean;
  }) => {
    return await quizService.patch(`/v1/quiz/favorite`, data);
  };
  const { data: quizFavorite, mutate: mutateQuizFavorite } = useMutation({
    mutationFn: patchQuizFavorite,
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
      // console.log('quizFavorite', response);
      openToastifyAlert({
        type: 'success',
        text: response.data.message,
      });

      // 초기화
      quizDataRefetch && quizDataRefetch();
    },
  });

  // 즐겨찾기 토글 버튼
  const handleFavorite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: { idx: number; isFavorite: boolean },
  ) => {
    e.stopPropagation();

    const favoriteItem = {
      idx: data.idx,
      isFavorite: !data.isFavorite,
    };
    mutateQuizFavorite(favoriteItem);
  };

  /* 문항 pdf 모달 열기 */
  const sortList = () => {
    const codesSet = new Set(checkList);
    const filteredList = questionList.filter((item) => codesSet.has(item.idx));
    setSortedList(filteredList);
  };

  const openCreatePDFModal = () => {
    console.log('sortedList ---', sortedList);
    // 선택 된 리스트중 미검수가 아닌것이 있을시 요청 불가
    openModal({
      title: '',
      content: <PDFModal list={sortedList} />,
    });
    //모달 열릴시 체크리스트 초기화
    setCheckList([]);
  };

  // 배경 클릭시 체크리스트 초기화
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target?.toString().includes('Div')) setCheckList([]);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [backgroundRef]);

  //체크된 리스트값 전역에 넣기
  useEffect(() => {
    if (sortedList) {
      // console.log('체크된 리스트값 전역에 넣기', sortedList);
      setQuizList([...sortedList]);
    }
  }, [sortedList]);

  useEffect(() => {
    // 체크시 활성화 버튼
    if (!checkList.length) {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }

    // 체크 변경시 pdf 전달용 리스트도 변경
    sortList();
  }, [checkList]);

  useEffect(() => {
    if (deleteQuizIsSuccess) {
      setCheckList([]);
    }
  }, [deleteQuizIsSuccess]);

  // 초기화
  useEffect(() => {
    setCheckList([]);
  }, [page]);

  useEffect(() => {
    setQuestionList(list);
  }, [list]);

  // 툴팁 토글
  const calculateTextWidth = (nodes: NodeList) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context && textRef.current) {
      const style = window.getComputedStyle(textRef.current);
      context.font = `${style.fontSize} ${style.fontFamily}`;

      let totalWidth = 0;
      nodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          totalWidth += context.measureText(node.textContent || '').width;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          totalWidth += context.measureText(
            (node as HTMLElement).innerText,
          ).width;
        }
      });
      return totalWidth;
    }
    return 0;
  };

  const showTooltip = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const textNodes = e.currentTarget.children[1].childNodes; // 말줄임 요소
    const target = e.currentTarget.children[2]; // 숨겨진 툴팁박스
    const textWidth = calculateTextWidth(textNodes);
    const containerWidth = textRef.current?.clientWidth || 0;

    if (textWidth > containerWidth) {
      target?.classList.add('on');
    }
  };

  const hideTooltip = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const target = e.currentTarget.children[2];
    // console.log(target.classList);
    target?.classList.remove('on');
  };

  return (
    <>
      <ListButtonWrapper>
        <InputWrapper>
          <ButtonWrapper>
            <CheckBoxWrapper>
              <Total> Total : {totalCount ? totalCount : 0}</Total>
            </CheckBoxWrapper>
            <ActionButtonWrapper>
              <Button
                width="100px"
                height="35px"
                fontSize="14px"
                $borderRadius="7px"
                $filled
                $normal
                onClick={() => openCreatePDFModal()}
                disabled={isEnabled}
                cursor
              >
                문항 출력
              </Button>
              <Button
                width="100px"
                height="35px"
                fontSize="14px"
                $borderRadius="7px"
                onClick={() => {
                  openCreateEditWindow();
                }}
                $filled
                disabled={isEnabled}
                cursor
              >
                검수
              </Button>
            </ActionButtonWrapper>
          </ButtonWrapper>
        </InputWrapper>
      </ListButtonWrapper>
      <List margin={`10px 0 5px 0`} height="none">
        <ListItem isChecked={false} columnTitle marginBottom="0px">
          <CheckBoxI
            id={''}
            value={''}
            $margin={`0 5px 0 0`}
            checked={false}
            readOnly
          />
          <ItemLayout>
            {selectedList.map((list) => {
              if (list.view === true) {
                return (
                  <>
                    <span key={list.name} className="width_10 item_wrapper">
                      <strong>{list.name}</strong>
                    </span>
                    <i className="line"></i>
                  </>
                );
              }
              return null;
            })}
            <span className="width_10 item_wrapper">
              <strong>담당자</strong>
            </span>
            <i className="line"></i>
            <span className="width_10 item_wrapper">
              <strong>등록일자</strong>
            </span>
            <i className="line"></i>
            <span className="width_10 item_wrapper">
              <strong>프로세스(단계)</strong>
            </span>
            <i className="line"></i>
            <span className="width_10 item_wrapper">
              <strong>상태</strong>
            </span>
          </ItemLayout>
        </ListItem>
      </List>
      <ListWrapper ref={backgroundRef}>
        <List margin={`10px 0`}>
          {questionList
            // .sort(
            //   (a, b) =>
            //     new Date(a.lastModifiedAt).getTime() -
            //     new Date(b.lastModifiedAt).getTime(),
            // )
            .map((item: QuizListType) => (
              <ListItem
                key={item.code}
                isChecked={checkList.includes(item.idx)}
                onClick={(e) => handleButtonCheck(e, item.idx)}
              >
                <CheckBoxI
                  id={item.code}
                  value={item.idx}
                  $margin={`0 5px 0 0`}
                  checked={checkList.includes(item.idx)}
                  readOnly
                />
                <ItemLayout>
                  {selectedList.map((list) => {
                    const matchedCategory = item.quizCategoryList.find(
                      (category) =>
                        Object.keys(category.quizCategory).some(
                          (key) => key === list.name,
                        ),
                    );
                    if (matchedCategory && list.view === true) {
                      const matchedKey = Object.keys(
                        matchedCategory.quizCategory,
                      ).find((key) => key === list.name);

                      const codeValue =
                        matchedKey &&
                        Array.isArray(
                          (
                            matchedCategory.quizCategory as Record<
                              string,
                              Array<{ name: string }>
                            >
                          )[matchedKey],
                        ) &&
                        (
                          matchedCategory.quizCategory as Record<
                            string,
                            Array<{ name: string }>
                          >
                        )[matchedKey][0]?.name;

                      return (
                        <>
                          <span className="width_10 item_wrapper">
                            <span className="ellipsis">{codeValue}</span>
                          </span>
                          <i className="line"></i>
                        </>
                      );
                    } else {
                      if (list.view === true) {
                        return (
                          <>
                            <span className="width_10 item_wrapper">
                              <span className="ellipsis"></span>
                            </span>
                            <i className="line"></i>
                          </>
                        );
                      }
                    }
                  })}
                  <span className="width_10 item_wrapper">
                    <strong className="title">담당자</strong>
                    <span className="tag ellipsis">{item.createdBy}</span>
                  </span>
                  <i className="line"></i>
                  <span className="width_10 item_wrapper">
                    <strong className="title">등록일자</strong>
                    <span className="tag">{item.createdAt}</span>
                  </span>
                  <i className="line"></i>
                  <span className="width_10 item_wrapper">
                    <strong className="title">프로세스(단계)</strong>
                    <span className="tag">{`${item.process?.name}/(${item.process?.stepName === 'REVIEW' ? '검수' : item.process?.stepName === 'EDITING' ? '편집' : ''})`}</span>
                  </span>
                  <i className="line"></i>
                  <span className="width_10 item_wrapper">
                    <strong className="title">상태</strong>
                    <span className="tag">{`${item.process?.state === 'REJECT' ? '반려' : item.process?.state === 'HOLD' ? '보류' : item.process?.state === 'APPROVAL' ? '승인' : ''}`}</span>
                  </span>
                  {/* <span
                  className="width_80px tooltip_wrapper item_wrapper"
                  onMouseOver={(e) => showTooltip(e)}
                  onMouseLeave={(e) => hideTooltip(e)}
                >
                  {item.quizCategoryList ? (
                    <span className="tag ellipsis" ref={textRef}>
                      {item.quizCategoryList.length !== 0 ? (
                        item.quizCategoryList.map((el, idx) => (
                          <span key={`quizCategoryList quizCategory: ${idx}`}>
                            {el.quizCategory.sources
                              ? el.quizCategory.sources.map(
                                  (el) =>
                                    `${el.출처 ? `${el.출처}` : ''} ${el.문항번호 ? `${el.문항번호}` : ''} ${el.출제년도 ? `${el.출제년도}` : ''} ${el.교재속성 ? `${el.교재속성}` : ''} ${el.출판사 ? `${el.출판사}` : ''} ${el.시리즈 ? `${el.시리즈}` : ''} ${el.교재명 ? `${el.교재명}` : ''} ${el.교재페이지 ? `${el.교재페이지}` : ''} ${el.교재번호 ? `${el.교재번호}` : ''} ${el.출판년도 ? `${el.출판년도}` : ''} ${el.내신형식 ? `${el.내신형식}` : ''} ${el.학교명 ? `${el.학교명}` : ''} ${el.학사일정 ? `${el.학사일정}` : ''} ${el.내신페이지 ? `${el.내신페이지}` : ''} ${el.내신배점 ? `${el.내신배점}` : ''} ${el.기출속성 ? `${el.기출속성}` : ''} ${el.주관사 ? `${el.주관사}` : ''} ${el.기출명 ? `${el.기출명}` : ''} ${el.시행학제 ? `${el.시행학제}` : ''} ${el.시행학년 ? `${el.시행학년} 학년` : ''} ${el.시험지타입 ? `${el.시험지타입}` : ''} ${el.기출배점 ? `${el.기출배점}` : ''} ${el.기출일시 ? `${el.기출일시}` : ''} `,
                                )
                              : ''}
                          </span>
                        ))
                      ) : (
                        <span></span>
                      )}
                    </span>
                  ) : (
                    <span className="tag"></span>
                  )}

                  <Tooltip
                    top={'90px'}
                    arrowPosition={`left: calc(50% - 10px)`}
                    width={'130px'}
                    ref={tooltipRef}
                  >
                    <span>
                      {item.quizCategoryList.map((el, idx) => (
                        <span key={`quizCategoryList quizCategory: ${idx}`}>
                          {el.quizCategory.sources
                            ? el.quizCategory.sources.map(
                                (el) =>
                                  `${el.출처 ? `${el.출처}` : ''} ${el.문항번호 ? `,${el.문항번호}` : ''} ${el.출제년도 ? `,${el.출제년도}` : ''} ${el.교재속성 ? `,${el.교재속성}` : ''} ${el.출판사 ? `,${el.출판사}` : ''} ${el.시리즈 ? `,${el.시리즈}` : ''} ${el.교재명 ? `,${el.교재명}` : ''} ${el.교재페이지 ? `,${el.교재페이지}` : ''} ${el.교재번호 ? `,${el.교재번호}` : ''} ${el.출판년도 ? `,${el.출판년도}` : ''} ${el.내신형식 ? `,${el.내신형식}` : ''} ${el.학교명 ? `,${el.학교명}` : ''} ${el.학사일정 ? `,${el.학사일정}` : ''} ${el.내신페이지 ? `,${el.내신페이지}` : ''} ${el.내신배점 ? `,${el.내신배점}` : ''} ${el.기출속성 ? `,${el.기출속성}` : ''} ${el.주관사 ? `,${el.주관사}` : ''} ${el.기출명 ? `,${el.기출명}` : ''} ${el.시행학제 ? `,${el.시행학제}` : ''} ${el.시행학년 ? `,${el.시행학년} 학년` : ''} ${el.시험지타입 ? `,${el.시험지타입}` : ''} ${el.기출배점 ? `,${el.기출배점}` : ''} ${el.기출일시 ? `,${el.기출일시}` : ''} `,
                              )
                            : ''}
                        </span>
                      ))}
                    </span>
                  </Tooltip>
                </span>
                <i className="line"></i>
                <span
                  className="width_80px tooltip_wrapper item_wrapper"
                  onMouseOver={(e) => showTooltip(e)}
                  onMouseLeave={(e) => hideTooltip(e)}
                >
                  {item.quizCategoryList ? (
                    <span className="tag ellipsis" ref={textRef}>
                      {item.quizCategoryList.length !== 0 ? (
                        item.quizCategoryList.map((el, idx) => (
                          <span
                            key={`quizCategoryList quizCategory:교육과정 ${idx}`}
                          >
                            {el.quizCategory.교육과정
                              ? `${idx != 0 ? ',' : ''} ${el.quizCategory.교육과정}`
                              : ''}
                          </span>
                        ))
                      ) : (
                        <span></span>
                      )}
                    </span>
                  ) : (
                    <span className="tag"></span>
                  )}

                  <Tooltip
                    top={'90px'}
                    arrowPosition={`left: calc(50% - 10px)`}
                    width={'130px'}
                    ref={tooltipRef}
                  >
                    <span>
                      {item.quizCategoryList.length !== 0 ? (
                        item.quizCategoryList.map((el, idx) => (
                          <span
                            key={`quizCategoryList quizCategory:교육과정 ${idx}`}
                          >
                            {el.quizCategory.교육과정
                              ? `${idx != 0 ? ',' : ''} ${el.quizCategory.교육과정}`
                              : ''}
                          </span>
                        ))
                      ) : (
                        <span></span>
                      )}
                    </span>
                  </Tooltip>
                </span>
                <i className="line"></i>
                <span
                  className="width_60px tooltip_wrapper item_wrapper"
                  onMouseOver={(e) => showTooltip(e)}
                  onMouseLeave={(e) => hideTooltip(e)}
                >
                  {item.quizCategoryList ? (
                    <span className=" tag ellipsis" ref={textRef}>
                      {item.quizCategoryList.length !== 0 ? (
                        item.quizCategoryList.map((el, idx) => (
                          <span
                            key={`quizCategoryList quizCategory:학교급 ${idx}`}
                          >
                            {el.quizCategory.학교급
                              ? `${idx != 0 ? ',' : ''} ${el.quizCategory.학교급}`
                              : ''}
                          </span>
                        ))
                      ) : (
                        <span></span>
                      )}
                    </span>
                  ) : (
                    <span className="tag"></span>
                  )}
                  <Tooltip
                    top={'90px'}
                    arrowPosition={`left: calc(50% - 10px)`}
                    width={'130px'}
                    ref={tooltipRef}
                  >
                    <span>
                      {item.quizCategoryList.length !== 0 ? (
                        item.quizCategoryList.map((el, idx) => (
                          <span
                            key={`quizCategoryList quizCategory:학교급 ${idx}`}
                          >
                            {el.quizCategory.학교급
                              ? `${idx != 0 ? ',' : ''} ${el.quizCategory.학교급}`
                              : ''}
                          </span>
                        ))
                      ) : (
                        <span></span>
                      )}
                    </span>
                  </Tooltip>
                </span>
                <i className="line"></i>
                <span
                  className="width_50px tooltip_wrapper item_wrapper"
                  onMouseOver={(e) => showTooltip(e)}
                  onMouseLeave={(e) => hideTooltip(e)}
                >
                  {item.quizCategoryList ? (
                    <span className="tag ellipsis" ref={textRef}>
                      {item.quizCategoryList.length !== 0 ? (
                        item.quizCategoryList.map((el, idx) => (
                          <span
                            key={`quizCategoryList quizCategory:학년 ${idx}`}
                          >
                            {el.quizCategory.학년
                              ? `${idx != 0 ? ',' : ''} ${el.quizCategory.학년}`
                              : ''}
                          </span>
                        ))
                      ) : (
                        <span></span>
                      )}
                    </span>
                  ) : (
                    <span className="tag"></span>
                  )}
                  <Tooltip
                    top={'90px'}
                    arrowPosition={`left: calc(50% - 10px)`}
                    width={'130px'}
                    ref={tooltipRef}
                  >
                    <span>
                      {item.quizCategoryList.length !== 0 ? (
                        item.quizCategoryList.map((el, idx) => (
                          <span
                            key={`quizCategoryList quizCategory:학년 ${idx}`}
                          >
                            {el.quizCategory.학년
                              ? `${idx != 0 ? ',' : ''} ${el.quizCategory.학년}`
                              : ''}
                          </span>
                        ))
                      ) : (
                        <span></span>
                      )}
                    </span>
                  </Tooltip>
                </span>
                <i className="line"></i>
                <span
                  className="width_60px tooltip_wrapper item_wrapper"
                  onMouseOver={(e) => showTooltip(e)}
                  onMouseLeave={(e) => hideTooltip(e)}
                >
                  {item.quizCategoryList ? (
                    <span className="tag ellipsis" ref={textRef}>
                      {item.quizCategoryList.length !== 0 ? (
                        item.quizCategoryList.map((el, idx) => (
                          <span
                            key={`quizCategoryList quizCategory:학기 ${idx}`}
                          >
                            {el.quizCategory.학기
                              ? `${idx != 0 ? ',' : ''} ${el.quizCategory.학기}`
                              : ''}
                          </span>
                        ))
                      ) : (
                        <span></span>
                      )}
                    </span>
                  ) : (
                    <span className="tag"></span>
                  )}
                  <Tooltip
                    top={'90px'}
                    arrowPosition={`left: calc(50% - 10px)`}
                    width={'130px'}
                    ref={tooltipRef}
                  >
                    <span>
                      {item.quizCategoryList.length !== 0 ? (
                        item.quizCategoryList.map((el, idx) => (
                          <span
                            key={`quizCategoryList quizCategory:학기 ${idx}`}
                          >
                            {el.quizCategory.학기
                              ? `${idx != 0 ? ',' : ''} ${el.quizCategory.학기}`
                              : ''}
                          </span>
                        ))
                      ) : (
                        <span></span>
                      )}
                    </span>
                  </Tooltip>
                </span>
                <i className="line"></i>
                <span
                  className="width_60px tooltip_wrapper item_wrapper"
                  onMouseOver={(e) => showTooltip(e)}
                  onMouseLeave={(e) => hideTooltip(e)}
                >
                  {item.quizCategoryList ? (
                    <span className="tag ellipsis" ref={textRef}>
                      {item.quizCategoryList.length !== 0 ? (
                        item.quizCategoryList.map((el, idx) => (
                          <span
                            key={`quizCategoryList quizCategory:교과 ${idx}`}
                          >
                            {el.quizCategory.교과
                              ? `${idx != 0 ? ',' : ''} ${el.quizCategory.교과}`
                              : ''}
                          </span>
                        ))
                      ) : (
                        <span></span>
                      )}
                    </span>
                  ) : (
                    <span className="tag"></span>
                  )}
                  <Tooltip
                    top={'90px'}
                    arrowPosition={`left: calc(50% - 10px)`}
                    width={'130px'}
                    ref={tooltipRef}
                  >
                    <span>
                      {item.quizCategoryList.length !== 0 ? (
                        item.quizCategoryList.map((el, idx) => (
                          <span
                            key={`quizCategoryList quizCategory:교과 ${idx}`}
                          >
                            {el.quizCategory.교과
                              ? `${idx != 0 ? ',' : ''} ${el.quizCategory.교과}`
                              : ''}
                          </span>
                        ))
                      ) : (
                        <span></span>
                      )}
                    </span>
                  </Tooltip>
                </span>
                <i className="line"></i>
                <span
                  className="width_80px tooltip_wrapper item_wrapper"
                  onMouseOver={(e) => showTooltip(e)}
                  onMouseLeave={(e) => hideTooltip(e)}
                >
                  {item.quizCategoryList ? (
                    <span className="tag ellipsis" ref={textRef}>
                      {item.quizCategoryList.length !== 0 ? (
                        item.quizCategoryList.map((el, idx) => (
                          <span
                            key={`quizCategoryList quizCategory:과목 ${idx}`}
                          >
                            {el.quizCategory.과목
                              ? `${idx != 0 ? ',' : ''} ${el.quizCategory.과목}`
                              : ''}
                          </span>
                        ))
                      ) : (
                        <span></span>
                      )}
                    </span>
                  ) : (
                    <span className="tag"></span>
                  )}
                  <Tooltip
                    top={'90px'}
                    arrowPosition={`left: calc(50% - 10px)`}
                    width={'130px'}
                    ref={tooltipRef}
                  >
                    <span>
                      {item.quizCategoryList.length !== 0 ? (
                        item.quizCategoryList.map((el, idx) => (
                          <span
                            key={`quizCategoryList quizCategory:과목 ${idx}`}
                          >
                            {el.quizCategory.과목
                              ? `${idx != 0 ? ',' : ''} ${el.quizCategory.과목}`
                              : ''}
                          </span>
                        ))
                      ) : (
                        <span></span>
                      )}
                    </span>
                  </Tooltip>
                </span>
                <i className="line"></i>
                <span
                  className="width_150px tooltip_wrapper item_wrapper"
                  onMouseOver={(e) => showTooltip(e)}
                  onMouseLeave={(e) => hideTooltip(e)}
                >
                  {item.quizCategoryList ? (
                    <span className="tag ellipsis" ref={textRef}>
                      {item.quizCategoryList.length !== 0 ? (
                        item.quizCategoryList.map((el, idx) => (
                          <span
                            key={`quizCategoryList quizCategory:대단원 ${idx}`}
                          >
                            {el.quizCategory.대단원
                              ? `${idx != 0 ? ',' : ''} ${el.quizCategory.대단원}`
                              : ''}
                          </span>
                        ))
                      ) : (
                        <span></span>
                      )}
                    </span>
                  ) : (
                    <span className="tag"></span>
                  )}
                  <Tooltip
                    top={'90px'}
                    arrowPosition={`left: calc(50% - 10px)`}
                    width={'130px'}
                    ref={tooltipRef}
                  >
                    <span>
                      {item.quizCategoryList.length !== 0 ? (
                        item.quizCategoryList.map((el, idx) => (
                          <span
                            key={`quizCategoryList quizCategory:대단원 ${idx}`}
                          >
                            {el.quizCategory.대단원
                              ? `${idx != 0 ? ',' : ''} ${el.quizCategory.대단원}`
                              : ''}
                          </span>
                        ))
                      ) : (
                        <span></span>
                      )}
                    </span>
                  </Tooltip>
                </span>
                <i className="line"></i>
                <span
                  className="tooltip_wrapper item_wrapper"
                  onMouseOver={(e) => showTooltip(e)}
                  onMouseLeave={(e) => hideTooltip(e)}
                >
                  {item.quizCategoryList ? (
                    <span className="tag ellipsis" ref={textRef}>
                      {item.quizCategoryList.length > 0 ? (
                        item.quizCategoryList.map((item, idx) => (
                          <span key={`문항타입 ${idx}`}>
                            {item.quizCategory.문항타입 &&
                            item.quizCategory.문항타입.length > 1
                              ? `${item.quizCategory.문항타입}`
                              : ``}
                          </span>
                        ))
                      ) : (
                        <span></span>
                      )}
                    </span>
                  ) : (
                    <span className="tag"></span>
                  )}
                  <Tooltip
                    top={'90px'}
                    arrowPosition={`left: calc(50% - 10px)`}
                    width={'130px'}
                    ref={tooltipRef}
                  >
                    <span>
                      {item.quizCategoryList.length > 0 ? (
                        item.quizCategoryList.map((item, idx) => (
                          <span key={`문항타입 ${idx}`}>
                            {item.quizCategory.문항타입 &&
                            item.quizCategory.문항타입.length > 1
                              ? `${idx != 0 ? ',' : ''} ${item.quizCategory.문항타입}`
                              : ``}
                          </span>
                        ))
                      ) : (
                        <span></span>
                      )}
                    </span>
                  </Tooltip>
                </span>
                <i className="line"></i>
                <span className="width_10 item_wrapper">
                  <strong className="title">당담자</strong>
                  <span className="tag ellipsis">{item.createdBy}</span>
                </span>
                <i className="line"></i>
                <span className="width_10 item_wrapper">
                  <strong className="title">등록일자</strong>
                  <span className="tag ">{item.createdAt}</span>
                </span>
                <i className="line"></i>
                <span className="width_10 item_wrapper">
                  <strong className="title">프로세스(단계)</strong>
                  <span className="tag ">{item.createdAt}</span>
                </span>
                <i className="line"></i>
                <span
                  className="tooltip_wrapper item_wrapper"
                  // onMouseOver={(e) => showTooltip(e)}
                  // onMouseLeave={(e) => hideTooltip(e)}
                >
                  <strong className="title">상태</strong>
                  {item.quizCategoryList ? (
                    <span className="tag ellipsis" ref={textRef}>
                      {item.quizCategoryList.length > 0 ? (
                        item.quizCategoryList.map((item, idx) => (
                          <span key={`문항타입 ${idx}`}>
                            {item.quizCategory.문항타입 &&
                            item.quizCategory.문항타입.length > 1
                              ? `${item.quizCategory.문항타입}`
                              : ``}
                          </span>
                        ))
                      ) : (
                        <span></span>
                      )}
                    </span>
                  ) : (
                    <span className="tag"></span>
                  )}
                </span> */}
                </ItemLayout>
              </ListItem>
            ))}
        </List>
      </ListWrapper>

      <Modal />
    </>
  );
}

const ListButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Total = styled.span`
  display: inline-block;
  text-align: right;
  font-size: 15px;
  font-weight: bold;
  color: ${COLOR.FONT_BLACK};
  margin-top: 10px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ItemLayout = styled.span`
  display: flex;
  width: 100%;
  min-height: 40px;
  justify-content: space-around;
  align-content: center;
  flex-wrap: wrap;

  .tooltip_wrapper item_wrapper {
    position: relative;
  }
  .item_wrapper {
    display: flex;
    /* flex: 1 0 0; */
    justify-content: space-around;
    flex-wrap: wrap;
    word-break: break-all;
    min-width: 30px;
    max-width: 150px;
    font-weight: normal;
    align-content: center;
  }

  /* 두줄 이상 ellipsis 처리  */
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .title {
    width: 100%;
    font-weight: 600;
    margin-bottom: 2px;
  }
  .tag {
    /* display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 5px; */
    margin: 0 5px;
    padding: 3px 5px;
    border-radius: 5px;
    background-color: ${COLOR.BORDER_GRAY};
    margin-top: 5px;
  }
  .tag_icon {
    display: flex;
    align-self: center;
  }
  .line {
    width: 1px;
    height: 15px;
    background-color: ${COLOR.BORDER_GRAY};
    display: flex;
    align-self: center;
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
  .width_50px {
    width: 50px;
  }
  .width_60px {
    width: 60px;
  }
  .width_80px {
    width: 80px;
  }
  .width_150px {
    width: 150px;
  }
`;
