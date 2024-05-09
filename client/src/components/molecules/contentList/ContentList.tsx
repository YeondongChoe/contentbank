import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
} from '../../../components';
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
};

export function ContentList({
  list,
  tabVeiw,
  deleteBtn,
  ondeleteClick,
  totalCount,
}: ContentListProps) {
  const queryClient = useQueryClient();
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [checkList, setCheckList] = useState<string[]>([]);
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

  // 체크박스 설정
  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.checked);
    if (e.target.checked) {
      setCheckList(list.map((item: QuizListType) => item.code));
    } else {
      setCheckList([]);
    }
  };
  const handleButtonCheck = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
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
      queryClient.invalidateQueries({
        queryKey: ['get-quizList'],
        exact: true,
      });
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
    const filteredList = list.filter((item) => codesSet.has(item.code));
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
      queryClient.invalidateQueries({
        queryKey: ['get-quizList'],
        exact: true,
      });
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
  }, [checkList]);

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
  }, [tabVeiw]);

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
                checked={checkList.length === list.length ? true : false}
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
                onClick={() => {}}
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
          {list.map((item: QuizListType) => (
            <ListItem
              height="80px"
              key={item.code as string}
              isChecked={checkList.includes(item.code)}
              onClick={(e) => handleButtonCheck(e, item.code)}
            >
              <CheckBoxI
                id={item.code}
                value={item.code}
                $margin={`0 5px 0 0`}
                checked={checkList.includes(item.code)}
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
                  src={`/images/icon/favorites${checkList.includes(item.code) ? `_off_W` : `_off_B`}.svg`}
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
                {/* //TODO */}
                <span className="width_20px">{item.idx} </span>
                <i className="line"></i>
                <span>{item.code} </span>
                <i className="line"></i>
                <span>{item.type} </span>
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
                          ? checkList.includes(item.code)
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
                          ? checkList.includes(item.code)
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
