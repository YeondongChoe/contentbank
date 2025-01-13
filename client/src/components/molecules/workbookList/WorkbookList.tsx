import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LuFileSearch2 } from 'react-icons/lu';
import { SlOptionsVertical, SlPrinter } from 'react-icons/sl';
import { styled } from 'styled-components';

import { workbookInstance } from '../../../api/axios';
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
  PaginationBox,
  ValueNone,
} from '../../../components';
import { useModal } from '../../../hooks';
import { WorksheetListType } from '../../../types';
import { selectedListType } from '../../../types/WorkbookType';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { windowOpenHandler } from '../../../utils/windowHandler';
import { COLOR } from '../../constants';
import { WorkbookPDFModal } from '../PDFModal/WorkbookPDFModal';

type ContentListProps = {
  list: WorksheetListType[] | any[]; // TODO
  tabView: string;
  deleteBtn?: boolean;
  ondeleteClick?: () => void;
  totalCount?: number;
  itemsCountPerPage?: number;
  selectedList: selectedListType[];
};

export function WorkbookList({
  list,
  tabView,
  deleteBtn,
  ondeleteClick,
  itemsCountPerPage,
  totalCount,
  selectedList,
}: ContentListProps) {
  const queryClient = useQueryClient();
  const { openModal } = useModal();
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [checkList, setCheckList] = useState<string[]>([]);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [workbookIdx, setWorkbookIdx] = useState<number>(0);
  const [isEditWorkbook, setIsEditWorkbook] = useState<boolean>(false);

  const openSettingList = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    //console.log(event.currentTarget.children[1].classList);
    event.currentTarget.children[1].classList.add('show');
  };
  const closeSettingList = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.currentTarget.children[1].classList.remove('show');
  };

  // 체크박스 설정
  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.checked);
    if (e.target.checked) {
      setCheckList(list.map((item: WorksheetListType) => item.code));
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

  // 문항 수정 윈도우 열기
  const openCreateEditWindow = (idx: number) => {
    setWorkbookIdx(idx);
    windowOpenHandler({
      name: 'step2',
      url: '/content-create/exam/step2',
      options:
        'width=1600,height=965,top=Math.round(window.screen.height / 2 - windowHeight / 2),left=Math.round(window.screen.width / 2 - windowWidth / 2),toolbar=no,titlebar=no,scrollbars=no,status=no,location=no,menubar=no,frame=no',
    });
  };

  //문항 삭제
  const [isDeleteWorkbook, setIsDeleteWorkbook] = useState(false);
  const clickDeleteWorkbook = (idx: number) => {
    setIsDeleteWorkbook(true);
    setWorkbookIdx(idx);
  };

  const deleteWorkbook = async () => {
    const res = await workbookInstance.delete(`/v1/workbook/${workbookIdx}`);
    // console.log(`문항 삭제 결과값`, res);
    return res.data;
  };

  const { mutate: deleteItemMutate } = useMutation({
    mutationFn: deleteWorkbook,
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
      setIsDeleteWorkbook(false);
      openToastifyAlert({
        type: 'success',
        text: '삭제 되었습니다.',
      });

      // 초기화
      queryClient.invalidateQueries({
        queryKey: ['get-workbookList'],
        exact: true,
      });
    },
  });

  // 로컬스토리지에 보낼데이터 저장 수정일 경우 isEditWorkbook
  const saveLocalData = (idx: number) => {
    window.localStorage.clear();
    const sendData = {
      isEditWorkbook: isEditWorkbook ? 1 : 0,
      workbookIdx: idx,
    };
    if (workbookIdx) {
      localStorage.setItem('sendEditData', JSON.stringify(sendData));
    }
  };

  useEffect(() => {
    if (isDeleteWorkbook === false && workbookIdx) {
      saveLocalData(workbookIdx);
      setWorkbookIdx(0);
    }
  }, [workbookIdx]);

  // 학습지 즐겨찾기 api
  const patchWorkbookFavorite = (data: any) => {
    return workbookInstance.patch(`/v1/workbook/favorite`, data);
  };

  const clickFavorite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    idx: number,
    isFavorite: boolean,
  ) => {
    e.stopPropagation();
    if (isFavorite) {
      workbookFavoriteData({ idx: idx, isFavorite: false });
    } else {
      workbookFavoriteData({ idx: idx, isFavorite: true });
    }
  };

  const { mutate: workbookFavoriteData } = useMutation({
    mutationFn: patchWorkbookFavorite,
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
        queryKey: ['get-workbookList'],
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

  // 탭 바뀔시 초기화
  useEffect(() => {
    setCheckList([]);
  }, [tabView]);

  const openCreatePDFModal = (idx: number) => {
    openModal({
      title: '',
      content: <WorkbookPDFModal idx={idx} />,
    });
    //모달 열릴시 체크리스트 초기화
    setCheckList([]);
  };

  return (
    <>
      <Total> Total : {totalCount ? totalCount : 0}</Total>
      {/* <ListButtonWrapper>
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
            </ActionButtonWrapper>
          </ButtonWrapper>
        </InputWrapper>
      </ListButtonWrapper> */}
      <List margin={`10px 0 5px 0`} height="none">
        <ListItem isChecked={false} columnTitle marginBottom="0px">
          <CheckBoxI
            id={''}
            value={''}
            $margin={`0 5px 0 0`}
            checked={false}
            readOnly
          />
          <Icon
            width={`18px`}
            $margin={'0 0 0 10px'}
            src={`/images/icon/favorites_off_B.svg`}
            onClick={() => {}}
            cursor
          />
          <ItemLayout>
            {selectedList.map((list) => {
              if (
                ['태그', '대상학년', '작성자'].includes(list.name) &&
                list.view === true
              ) {
                return (
                  <>
                    <span key={list.name} className="width_80px item_wrapper">
                      <strong>{list.name}</strong>
                    </span>
                    <i className="line"></i>
                  </>
                );
              } else if (
                ['학습지명', '등록일'].includes(list.name) &&
                list.view === true
              ) {
                return (
                  <>
                    <span key={list.name} className="width_150px item_wrapper">
                      <strong>{list.name}</strong>
                    </span>
                    <i className="line"></i>
                  </>
                );
              }
              return null;
            })}
            <span className="width_80px item_wrapper">
              <strong>미리보기</strong>
            </span>
            <i className="line"></i>
            <span className="width_20px item_wrapper">
              <strong>설정</strong>
            </span>
          </ItemLayout>
        </ListItem>
      </List>
      {list?.length > 0 ? (
        <ListWrapper ref={backgroundRef}>
          <List margin={`10px 0`}>
            {list.map((item: WorksheetListType) => (
              <ListItem
                height="90px"
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
                    $margin={'0 0 0 10px'}
                    src={`/images/icon/favorites_on.svg`}
                    onClick={(e) => clickFavorite(e, item.idx, item.isFavorite)}
                    cursor
                  />
                ) : (
                  <Icon
                    width={`18px`}
                    $margin={'0 0 0 10px'}
                    src={`/images/icon/favorites${checkList.includes(item.code) ? `_off_W` : `_off_B`}.svg`}
                    onClick={(e) => clickFavorite(e, item.idx, item.isFavorite)}
                    cursor
                  />
                )}
                <ItemLayout>
                  {selectedList.map((list) => {
                    if (list.name === '태그' && list.view === true) {
                      return (
                        <>
                          <span className="width_80px item_wrapper">
                            <span className="ellipsis">
                              {(item.tag === 'DAILY_TEST' && '일일테스트') ||
                                (item.tag === 'MONTHLY_TEST' && '월말테스트') ||
                                (item.tag === 'EXERCISES' && '연습문제') ||
                                (item.tag === 'PRACTICE_TEST' && '모의고사') ||
                                (item.tag === 'TEST_PREP' && '내신대비')}
                            </span>
                          </span>
                          <i className="line"></i>
                        </>
                      );
                    } else if (list.name === '대상학년' && list.view === true) {
                      return (
                        <>
                          <span className="width_80px item_wrapper">
                            <span className="ellipsis">{item.grade}</span>
                          </span>
                          <i className="line"></i>
                        </>
                      );
                    } else if (list.name === '작성자' && list.view === true) {
                      return (
                        <>
                          <span className="width_80px item_wrapper">
                            <span className="ellipsis">{item.examiner}</span>
                          </span>
                          <i className="line"></i>
                        </>
                      );
                    } else if (list.name === '학습지명' && list.view === true) {
                      return (
                        <>
                          <span className="width_150px item_wrapper">
                            <span className="ellipsis">{item.name}</span>
                          </span>
                          <i className="line"></i>
                        </>
                      );
                    } else if (list.name === '등록일' && list.view === true) {
                      return (
                        <>
                          <span className="width_150px item_wrapper">
                            <span className="ellipsis">{item.createdAt}</span>
                          </span>
                          <i className="line"></i>
                        </>
                      );
                    }
                  })}
                  <span className="width_20px item_wrapper">
                    <LuFileSearch2
                      style={{ fontSize: '22px', cursor: 'pointer' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        openCreatePDFModal(item.idx);
                      }}
                    />
                  </span>
                  <i className="line"></i>
                  <span className="width_20px item_wrapper">
                    <SettingButton
                      type="button"
                      onClick={(e) => openSettingList(e)}
                      onMouseLeave={(e) => closeSettingList(e)}
                    >
                      <SlOptionsVertical
                        style={{ fontSize: '16px', cursor: 'pointer' }}
                      />
                      <SettingList>
                        <li>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openCreateEditWindow(item.idx);
                              setIsEditWorkbook(true);
                            }}
                          >
                            수정
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openCreateEditWindow(item.idx);
                              setIsEditWorkbook(false);
                            }}
                          >
                            복제 후 수정
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              clickDeleteWorkbook(item.idx);
                            }}
                          >
                            삭제
                          </button>
                        </li>
                      </SettingList>
                    </SettingButton>
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

      {isDeleteWorkbook && (
        <Alert
          description={'학습지를 삭제하시겠습니까?'}
          isAlertOpen={isDeleteWorkbook}
          action="삭제"
          onClose={() => setIsDeleteWorkbook(false)}
          onClick={() => deleteItemMutate()}
        ></Alert>
      )}
      <PaginationBox
        itemsCountPerPage={itemsCountPerPage as number}
        totalItemsCount={totalCount as number}
      />
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

  .tooltip_wrapper {
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
  .width_80px {
    width: 80px;
  }
  .width_50 {
    width: 50%;
  }
  .width_150px {
    width: 150px;
  }
`;

const SettingButton = styled.button`
  position: relative;
  padding: 5px;
  margin: -5px;
  border: none;
  background-color: white;
  color: black;
`;

const SettingList = styled.ul`
  padding-left: 0;
  display: none;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border: 1px solid ${COLOR.SECONDARY};
  border-radius: 5px;
  overflow: hidden;
  z-index: 1;

  &.show {
    display: block;
  }

  li {
    padding-left: 0;
    width: 140px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      font-size: 14px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: #fff;
      color: ${COLOR.GRAY};
      transition: all 0.1s;
      z-index: 2;
      border: none;

      &:hover {
        background-color: ${COLOR.HOVER};
        color: ${COLOR.PRIMARY};
      }
    }
  }
`;
const ValueNoneWrapper = styled.div`
  padding: 100px 0;
`;
