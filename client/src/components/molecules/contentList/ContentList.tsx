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
import { pageAtom } from '../../../store/utilAtom';
import { QuizListType } from '../../../types';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { windowOpenHandler } from '../../../utils/windowHandler';
import { COLOR } from '../../constants';

type ContentListProps = {
  questionList: QuizListType[] | any[]; // TODO
  tabVeiw: string;
  deleteBtn?: boolean;
  ondeleteClick?: () => void;
  totalCount?: number;
  setCheckListOn?: React.Dispatch<React.SetStateAction<number[]>>;
  deleteQuizIsSuccess?: boolean;
  quizDataRefetch?: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
  quizSearchDataRefetch?: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
};

export function ContentList({
  questionList,
  tabVeiw,
  deleteBtn,
  ondeleteClick,
  totalCount,
  setCheckListOn,
  deleteQuizIsSuccess,
  quizDataRefetch,
  quizSearchDataRefetch,
}: ContentListProps) {
  const { openModal } = useModal();
  const [page, setPage] = useRecoilState(pageAtom);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [checkList, setCheckList] = useState<number[]>([]);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
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
  const [usedToggle, setUsedToggle] = useState<string>('비활성화');

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

  /* 문항 pdf 모달 열기 */
  const openCreatePDFModal = () => {
    console.log(
      'checkList 체크된 문항 1개당 최소1페이지 문항데이터 배열로 직접 또는 idx 값으로 문항 데이터불러오기',
      checkList,
    );

    openModal({
      title: '',
      content: <PDFModal list={checkList} />,
    });
    //모달 열릴시 체크리스트 초기화
    setCheckList([]);
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
      quizSearchDataRefetch && quizSearchDataRefetch();
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
      quizSearchDataRefetch && quizSearchDataRefetch();
    },
  });

  // 배경 클릭시 체크리스트 초기화
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target?.toString().includes('Div')) setCheckList([]);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [backgroundRef]);

  useEffect(() => {
    // 체크시 활성화 버튼
    if (!checkList.length) {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
    if (setCheckListOn) setCheckListOn(checkList);
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

  const showTooltip = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const target = e.currentTarget.children[2];
    // console.log(target.classList);
    target.classList.add('on');
  };
  const hideTooltip = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const target = e.currentTarget.children[2];
    // console.log(target.classList);
    target.classList.remove('on');
  };

  useEffect(() => {}, [questionList]);

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
                  className="width_80px tooltip_wrapper"
                  onMouseOver={(e) => showTooltip(e)}
                  onMouseLeave={(e) => hideTooltip(e)}
                >
                  <strong className="title">출처</strong>

                  <span className="tag">{item.idx}</span>
                  <Tooltip arrowPosition={`left: 50%`}>
                    <span>출처 툴팁</span>
                  </Tooltip>
                </span>
                <i className="line"></i>
                <span className="width_80px">
                  <strong className="title">교육과정</strong>
                  <span className="tag">{item.idx}</span>
                </span>
                <i className="line"></i>
                <span className="width_50px">
                  <strong className="title">학교급</strong>
                  <span className="tag">{item.idx}</span>
                </span>
                <i className="line"></i>
                <span className="width_50px">
                  <strong className="title">학년</strong>
                  <span className="tag">{item.idx}</span>
                </span>
                <i className="line"></i>
                <span className="width_50px">
                  <strong className="title">학기</strong>
                  <span className="tag">{item.idx}</span>
                </span>
                <i className="line"></i>
                <span className="width_50px">
                  <strong className="title">교과</strong>
                  <span className="tag">{item.idx}</span>
                </span>
                <i className="line"></i>
                <span>
                  <strong className="title">과목</strong>
                  <span className="tag">{item.idx}</span>
                </span>
                <i className="line"></i>
                <span>
                  <strong className="title"> 대단원</strong>
                  <span className="tag">{item.idx}</span>
                </span>
                <i className="line"></i>
                <span className="width_50px">
                  {item.quizCategoryList.length == 0 && <>-</>}
                  {item.quizCategoryList.length > 0 &&
                    item.quizCategoryList.map((item) => (
                      <>{item.quizCategory.문항타입}</>
                    ))}
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
  .title {
    width: 100%;
    font-weight: 600;
    margin-bottom: 2px;
  }
  .tag {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 5px;
    padding: 3px 5px;
    border-radius: 10px;
    background-color: #aeaeae;
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
  .width_80px {
    width: 80px;
  }
`;
