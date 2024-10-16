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

import { quizService } from '../../../api/axios';
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
} from '../../../components';
import { useModal } from '../../../hooks';
import { quizListAtom } from '../../../store/quizListAtom';
import { pageAtom } from '../../../store/utilAtom';
import { QuizListType } from '../../../types';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { windowOpenHandler } from '../../../utils/windowHandler';
import { COLOR } from '../../constants';

type ContentListProps = {
  list: QuizListType[] | any[]; // TODO
  tabVeiw: string;
  deleteBtn?: boolean;
  ondeleteClick?: () => void;
  totalCount?: number;
  setCheckListOn?: React.Dispatch<React.SetStateAction<number[]>>;
  deleteQuizIsSuccess?: boolean;
  quizDataRefetch?: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
  key?: number;
};

export function ContentList({
  list,
  tabVeiw,
  deleteBtn,
  ondeleteClick,
  totalCount,
  setCheckListOn,
  deleteQuizIsSuccess,
  quizDataRefetch,
}: ContentListProps) {
  const { openModal } = useModal();
  const [quizList, setQuizList] = useRecoilState(quizListAtom);
  const [page, setPage] = useRecoilState(pageAtom);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [checkList, setCheckList] = useState<number[]>([]);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [sortedList, setSortedList] = useState<QuizListType[]>([]);
  const [questionList, setQuestionList] = useState<QuizListType[]>([]);
  const textRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

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
      title: '수정 후 복제',
      onClick: () => {
        openCreateCopyEditWindow();
        setShowDropDown(false);
      },
    },
  ];
  const [usedToggle, setUsedToggle] = useState<string>('비활성화');

  // 문항 수정 윈도우 열기
  const openCreateEditWindow = () => {
    saveLocalData();
    windowOpenHandler({
      name: 'createcontentmain',
      url: '/createcontentmain',
      queryParams: { state: 'edit' },
    });
  };

  // 문항 복제후 수정 윈도우 열기
  const openCreateCopyEditWindow = () => {
    saveLocalData();
    windowOpenHandler({
      name: 'createcontentmain',
      url: '/createcontentmain',
      queryParams: { state: 'copyedit' },
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
      setCheckList((prev) => [...prev, id]);
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

  // 활성화/비활성화 데이터 전송
  const handleDisabled = () => {
    console.log('checkList', checkList);
    const codesSet = new Set(checkList);
    const filteredList = questionList.filter((item) => codesSet.has(item.idx));
    console.log('isUse chaeck arr', filteredList);
    const idxList: number[] = [];
    filteredList.map((item) => {
      return idxList.push(item.idx);
    });
    // 비활성화시
    if (usedToggle == '비활성화') {
      const data = {
        idxList: idxList,
        isUse: false,
      };
      mutateQuizDisabled(data);
    }
    //활성화시
    if (usedToggle == '활성화') {
      const data = {
        idxList: idxList,
        isUse: true,
      };
      mutateQuizDisabled(data);
    }
  };
  // 활성화/비활성화 토글 api
  const patchQuizDisabled = async (data: {
    idxList: number[];
    isUse: boolean;
  }) => {
    return await quizService.patch(`/v1/quiz/used`, data);
  };
  const { data: quizDisabled, mutate: mutateQuizDisabled } = useMutation({
    mutationFn: patchQuizDisabled,
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
      setIsAlertOpen(false);
      setCheckList([]);
      quizDataRefetch && quizDataRefetch();
    },
  });

  /* 문항 pdf 모달 열기 */
  const sortList = () => {
    const codesSet = new Set(checkList);
    const filteredList = questionList.filter((item) => codesSet.has(item.idx));
    console.log('sortedList------------', filteredList);

    setSortedList(filteredList);
  };

  const openCreatePDFModal = () => {
    console.log('sortedList ---', sortedList);
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
    if (setCheckListOn) setCheckListOn(checkList);

    // 체크 변경시 pdf 전달용 리스트도 변경
    sortList();
  }, [checkList]);

  useEffect(() => {
    if (deleteQuizIsSuccess) {
      setCheckList([]);
    }
  }, [deleteQuizIsSuccess]);

  // 알림창 상태
  const openSubmitAlert = () => {
    setIsAlertOpen(true);
  };
  const closeSubmitAlert = () => {
    setIsAlertOpen(false);
  };

  // 탭 바뀔시 초기화
  useEffect(() => {
    setCheckList([]);
  }, [tabVeiw, page]);

  useEffect(() => {
    // console.log('list/----------*', list);
  }, [list]);
  useEffect(() => {
    // console.log('list/----------*list', list);
    setQuestionList(list);
  }, []);

  useEffect(() => {
    // console.log('questionList/----------*', questionList);
  }, [questionList]);

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
      <Total> Total : {totalCount ? totalCount : 0}</Total>
      <ListButtonWrapper>
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
              {deleteBtn && (
                <Button
                  width="100px"
                  height="35px"
                  fontSize="14px"
                  $borderRadius="7px"
                  onClick={ondeleteClick}
                  $filled
                  $warning
                  disabled={isEnabled}
                  cursor
                >
                  삭제
                </Button>
              )}
              <DropDown
                list={dropDownList}
                buttonText={'수정'}
                showDropDown={showDropDown}
                setShowDropDown={setShowDropDown}
                disabled={isEnabled}
              />
              <Button
                width="100px"
                height="35px"
                fontSize="14px"
                $borderRadius="7px"
                $filled
                onClick={() => {
                  setUsedToggle('비활성화');
                  openSubmitAlert();
                }}
                disabled={isEnabled}
                cursor
              >
                비활성화
              </Button>
              <Button
                width="100px"
                height="35px"
                fontSize="14px"
                $borderRadius="7px"
                onClick={() => {
                  setUsedToggle('활성화');
                  openSubmitAlert();
                }}
                $filled
                $success
                disabled={isEnabled}
                cursor
              >
                활성화
              </Button>
            </ActionButtonWrapper>
          </ButtonWrapper>
        </InputWrapper>
      </ListButtonWrapper>
      <ListWrapper ref={backgroundRef}>
        <List margin={`10px 0`}>
          {questionList.map((item: QuizListType) => (
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
              {item.isFavorite ? (
                <Icon
                  width={`18px`}
                  $margin={'0 0 0 12px'}
                  src={`/images/icon/favorites_on.svg`}
                  onClick={(e) =>
                    handleFavorite(e, {
                      idx: item.idx,
                      isFavorite: true,
                    })
                  }
                  cursor
                />
              ) : (
                <Icon
                  width={`18px`}
                  $margin={'0 0 0 12px'}
                  src={`/images/icon/favorites${checkList.includes(item.idx) ? `_off_W` : `_off_B`}.svg`}
                  onClick={(e) =>
                    handleFavorite(e, {
                      idx: item.idx,
                      isFavorite: false,
                    })
                  }
                  cursor
                />
              )}
              <ItemLayout>
                <span
                  className="width_80px tooltip_wrapper "
                  onMouseOver={(e) => showTooltip(e)}
                  onMouseLeave={(e) => hideTooltip(e)}
                >
                  <strong className="title">출처</strong>

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
                  className="width_80px tooltip_wrapper "
                  onMouseOver={(e) => showTooltip(e)}
                  onMouseLeave={(e) => hideTooltip(e)}
                >
                  <strong className="title">교육과정</strong>

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
                  className="width_60px tooltip_wrapper "
                  onMouseOver={(e) => showTooltip(e)}
                  onMouseLeave={(e) => hideTooltip(e)}
                >
                  <strong className="title">학교급</strong>

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
                  className="width_50px tooltip_wrapper "
                  onMouseOver={(e) => showTooltip(e)}
                  onMouseLeave={(e) => hideTooltip(e)}
                >
                  <strong className="title">학년</strong>

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
                  className="width_60px tooltip_wrapper "
                  onMouseOver={(e) => showTooltip(e)}
                  onMouseLeave={(e) => hideTooltip(e)}
                >
                  <strong className="title">학기</strong>

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
                  className="width_60px tooltip_wrapper "
                  onMouseOver={(e) => showTooltip(e)}
                  onMouseLeave={(e) => hideTooltip(e)}
                >
                  <strong className="title">교과</strong>

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
                  className="width_80px tooltip_wrapper "
                  onMouseOver={(e) => showTooltip(e)}
                  onMouseLeave={(e) => hideTooltip(e)}
                >
                  <strong className="title">과목</strong>

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
                  className="width_150px tooltip_wrapper "
                  onMouseOver={(e) => showTooltip(e)}
                  onMouseLeave={(e) => hideTooltip(e)}
                >
                  <strong className="title">대단원</strong>

                  {item.quizCategoryList ? (
                    <span className="tag ellipsis" ref={textRef}>
                      {item.quizCategoryList.length !== 0 ? (
                        item.quizCategoryList.map((el, idx) => (
                          <span
                            key={`quizCategoryList quizCategory:대단원 ${idx}`}
                          >
                            {el.quizCategory.대단원
                              ? `${idx != 0 ? ',' : ''} ${el.quizCategory.대단원.split('^^^')[0]}`
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
                              ? `${idx != 0 ? ',' : ''} ${el.quizCategory.대단원.split('^^^')[0]}`
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
                  className="width_60px tag_s tooltip_wrapper "
                  onMouseOver={(e) => showTooltip(e)}
                  onMouseLeave={(e) => hideTooltip(e)}
                >
                  <span></span>
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
                <span className="width_10">{item.createdBy} </span>
                <i className="line"></i>
                <span className="width_10">{item.createdAt}</span>
                <i className="line"></i>
                <span className="width_5">
                  {item.isUse ? (
                    <Icon
                      width={`18px`}
                      $margin={'0 0 0 12px'}
                      src={`/images/icon/lock_open_${
                        checkList.length
                          ? checkList.includes(item.idx)
                            ? 'on'
                            : 'off'
                          : 'off'
                      }.svg`}
                      disabled={true}
                    />
                  ) : (
                    <Icon
                      width={`18px`}
                      $margin={'0 0 0 12px'}
                      src={`/images/icon/lock_${
                        checkList.length
                          ? checkList.includes(item.idx)
                            ? 'on'
                            : 'off'
                          : 'off'
                      }.svg`}
                      disabled={true}
                    />
                  )}
                </span>
              </ItemLayout>
            </ListItem>
          ))}
        </List>
      </ListWrapper>

      {usedToggle == '비활성화' && (
        <Alert
          isAlertOpen={isAlertOpen}
          description="비활성화 처리시 문항 사용이 불가합니다. 비활성화 처리 하시겠습니까?"
          action="확인"
          isWarning={true}
          onClose={closeSubmitAlert}
          onClick={handleDisabled}
        />
      )}
      {usedToggle == '활성화' && (
        <Alert
          isAlertOpen={isAlertOpen}
          description={`${checkList.length}개의 문항을 활성화 처리 하시겠습니까?`}
          action="확인"
          isWarning={true}
          onClose={closeSubmitAlert}
          onClick={handleDisabled}
        />
      )}
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
  align-items: center;
  flex-wrap: wrap;

  .tooltip_wrapper {
    position: relative;
  }
  > span {
    display: flex;
    /* flex: 1 0 0; */
    justify-content: space-around;
    flex-wrap: wrap;
    word-break: break-all;
    min-width: 30px;
    max-width: 150px;
    font-weight: normal;
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
  }
  .tag_s {
    font-weight: bold;
    font-size: 12px;
    padding: 2px;
    border-radius: 5px;
    background-color: ${COLOR.BORDER_GRAY};
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
  .width_50px {
    width: 50px;
  }
  .width_60px {
    width: 60px;
  }
  .width_80px {
    width: 80px;
  }
`;
