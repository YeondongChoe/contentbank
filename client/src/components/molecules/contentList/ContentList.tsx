import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
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
  ValueNone,
} from '../..';
import {
  quizService,
  resourceServiceInstance,
  userInstance,
} from '../../../api/axios';
import { InspectionModal } from '../../../components/contents/createcontent/modal';
import { ProcessListModal } from '../../../components/managements/process';
import { useModal } from '../../../hooks';
import { quizListAtom } from '../../../store/quizListAtom';
import { pageAtom } from '../../../store/utilAtom';
import { QuizListType } from '../../../types';
import { selectedListType } from '../../../types/WorkbookType';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { windowOpenHandler } from '../../../utils/windowHandler';
import { COLOR } from '../../constants';

type ContentListProps = {
  list: QuizListType[] | any[]; // TODO
  tabView: string;
  deleteBtn?: boolean;
  ondeleteClick?: () => void;
  totalCount?: number;
  setCheckListOn?: React.Dispatch<React.SetStateAction<number[]>>;
  deleteQuizIsSuccess?: boolean;
  quizDataRefetch?: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
  key?: number;
  selectedList: selectedListType[];
  isBuildWorker: boolean;
};

export type selectedListProps = {
  name: string;
  idx: number;
  view: boolean;
  search: boolean;
};

export function ContentList({
  list,
  isBuildWorker,
  tabView,
  deleteBtn,
  ondeleteClick,
  totalCount,
  setCheckListOn,
  deleteQuizIsSuccess,
  quizDataRefetch,
  selectedList,
}: ContentListProps) {
  const { openModal } = useModal();
  const { closeModal } = useModal();

  const [quizList, setQuizList] = useRecoilState(quizListAtom);
  const [page, setPage] = useRecoilState(pageAtom);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [checkList, setCheckList] = useState<number[]>([]);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDeleteAlert, setIsDeleteAlert] = useState(false);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [sortedList, setSortedList] = useState<QuizListType[]>([]);
  const [questionList, setQuestionList] = useState<QuizListType[]>([]);
  //프로세스 요청시 코멘트
  const [comment, setComment] = useState<string>('');
  const textRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  //const [selectedList, setSelectedList] = useState<selectedListProps[]>([]);

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
    console.log('로컬스토리지에 들어갈 리스트 체크값 ----- ', quizList);

    window.localStorage.setItem('quizList', JSON.stringify(quizList));

    console.log(
      '로컬스토리지에 저장된 값:',
      window.localStorage.getItem('quizList'),
    );
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
    const filteredList = questionList?.filter((item) => codesSet.has(item.idx));
    //console.log('sortedList------------', filteredList);
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

  const openProcessListModal = () => {
    const hasProcess = sortedList.filter(
      (el) => el.process?.step !== 1 && el.process !== null,
    );
    if (hasProcess.length > 0) {
      openToastifyAlert({
        type: 'error',
        text: '검수 진행중인 문항이 포함되어 있습니다.',
      });
    } else {
      openModal({
        title: '',
        content: (
          <ProcessListModal list={sortedList} refech={quizDataRefetch} />
        ),
      });
    }

    //모달 열릴시 체크리스트 초기화
    setCheckList([]);
  };

  const deleteProcess = async (idxList: string) => {
    const res = await quizService.delete(`/v1/process/${idxList}`);
    return res;
  };

  const {
    data: deleteProcessData,
    mutate: mutateDeleteProcess,
    //isPending: isPendingDelete,
    //isSuccess: deleteQuizIsSuccess,
  } = useMutation({
    mutationFn: deleteProcess,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
      if (context.response.data?.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response: { data: { message: string } }) => {
      openToastifyAlert({
        type: 'success',
        text: response.data.message,
      });

      // 리스트 다시 불러오기
      quizDataRefetch && quizDataRefetch();
    },
  });

  const openDeleteAlert = () => {
    setIsDeleteAlert(true);
  };
  const closeDeleteAlert = () => {
    setIsDeleteAlert(false);
  };

  const submitDelete = () => {
    // 선택된 리스트데이터 string값으로 변경
    const idxList = checkList.join(',');
    const filterList = questionList.filter((list) =>
      checkList.includes(list.idx),
    );
    const checkProcessState = filterList.some(
      (list) => list?.process?.state === 'COMPLETE',
    );
    if (checkProcessState) {
      openDeleteAlert();
    } else {
      mutateDeleteProcess(idxList);
    }
  };

  // 프로세스 생성 요청 api
  const putProcessRequest = async () => {
    const data = {
      comment: comment,
    };
    return await userInstance.put(`/v1/process/create/req`, data);
  };

  const { mutate: putProcessData } = useMutation({
    mutationFn: putProcessRequest,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: '잠시후 다시 시도해주세요',
      });
      if (context.response.data.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response) => {
      openToastifyAlert({
        type: 'success',
        text: '프로세스 요청 완료했습니다',
      });
      closeModal();
    },
  });

  // const putProcessRequest = async (data: { comment: string }) => {
  //   return await userInstance.patch(`/v1/process/create/req`, data);
  // };
  // const { data: processRequestData, mutate: mutateProcessRequest } =
  //   useMutation({
  //     mutationFn: putProcessRequest,
  //     onError: (context: {
  //       response: { data: { message: string; code: string } };
  //     }) => {
  //       openToastifyAlert({
  //         type: 'error',
  //         text: context.response.data.message,
  //       });
  //       if (context.response.data.code == 'GE-002') {
  //         postRefreshToken();
  //       }
  //     },
  //     onSuccess: (response: { data: { message: string } }) => {
  //       // console.log('quizFavorite', response);
  //       openToastifyAlert({
  //         type: 'success',
  //         text: response.data.message,
  //       });
  //     },
  //   });

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
  }, [tabView, page]);

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
                  checkList.length === questionList?.length ? true : false
                }
                id={'all check'}
                value={'all check'}
              />
              <span className="title_top">전체선택</span>
            </CheckBoxWrapper>
            <ActionButtonWrapper>
              {isBuildWorker ? (
                <>
                  <Button
                    width="100px"
                    height="35px"
                    fontSize="14px"
                    $borderRadius="7px"
                    $filled
                    onClick={() => openProcessListModal()}
                    disabled={isEnabled}
                    cursor
                  >
                    검수 요청
                  </Button>
                  <Button
                    width="130px"
                    height="35px"
                    fontSize="14px"
                    $borderRadius="7px"
                    onClick={() => {
                      submitDelete();
                    }}
                    disabled={isEnabled}
                    cursor
                  >
                    검수 요청 취소
                  </Button>
                </>
              ) : (
                <>
                  <span className="info">
                    문항 제작 후, 검수를 진행하시려면 프로세스 요청을 먼저
                    진행해야 합니다.
                  </span>
                  <Button
                    width="130px"
                    height="35px"
                    fontSize="14px"
                    $borderRadius="7px"
                    onClick={() => {
                      openModal({
                        title: '',
                        content: (
                          <InspectionModal
                            type={'프로세스'}
                            onClick={putProcessData}
                            setComment={setComment}
                          />
                        ),
                      });
                    }}
                    cursor
                  >
                    프로세스 요청
                  </Button>
                </>
              )}
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
              <strong>오픈여부</strong>
            </span>
            <i className="line"></i>
            <span className="width_10 item_wrapper">
              <strong>상태</strong>
            </span>
          </ItemLayout>
        </ListItem>
      </List>
      {questionList?.length > 0 ? (
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
                    <strong className="title">당담자</strong>
                    <span className="tag ellipsis">{item.createdBy}</span>
                  </span>
                  <i className="line"></i>
                  <span className="width_10 item_wrapper">
                    <strong className="title">등록일자</strong>
                    <span className="tag">{item.createdAt}</span>
                  </span>
                  <i className="line"></i>
                  <span className="width_10 item_wrapper">
                    <strong className="title">오픈여부</strong>
                    <span className="width_5 item_wrapper tag_icon">
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
                  </span>

                  <i className="line"></i>
                  <span className="width_10 item_wrapper">
                    <strong className="title">상태</strong>
                    {item.process?.step === 1 ? (
                      <span className="tag">{`반려(${item.process?.name})`}</span>
                    ) : (
                      <span className="tag">{`${item.process?.state === 'REJECT' ? '반려' : item.process?.state === 'HOLD' ? '보류' : item.process?.state === 'COMPLETE' ? '검수완료' : item.process?.state === 'REVIEW' ? `검수중(${item.process?.step}/${item.process?.totalStep})` : ''}`}</span>
                    )}
                  </span>
                </ItemLayout>
              </ListItem>
            ))}
          </List>
        </ListWrapper>
      ) : (
        <ValueNoneWrapper>
          <ValueNone />
        </ValueNoneWrapper>
      )}
      {isDeleteAlert && (
        <Alert
          isAlertOpen={isDeleteAlert}
          description="검수완료된 문항이 포함되어 있습니다 취소 요청 하시겠습니까?"
          action="확인"
          isWarning={true}
          onClose={closeDeleteAlert}
          onClick={submitDelete}
        />
      )}

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
  .info {
    color: ${COLOR.PRIMARY};
    font-size: 13px;
  }
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
const ValueNoneWrapper = styled.div`
  padding: 100px 0;
`;
