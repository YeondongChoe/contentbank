import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import {
  useQuery,
  useMutation,
  useQueryClient,
  RefetchOptions,
  QueryObserverResult,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { LuFileSearch2 } from 'react-icons/lu';
import { SlOptionsVertical, SlPrinter } from 'react-icons/sl';
import { useRecoilState } from 'recoil';
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
} from '../../../components';
import { useModal } from '../../../hooks';
import { isEditWorkbookAtom } from '../../../store/utilAtom';
import { WorksheetListType } from '../../../types';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { windowOpenHandler } from '../../../utils/windowHandler';
import { COLOR } from '../../constants';
import { WorkbookPDFModal } from '../PDFModal/WorkbookPDFModal';

type ContentListProps = {
  list: WorksheetListType[] | any[]; // TODO
  tabVeiw: string;
  deleteBtn?: boolean;
  ondeleteClick?: () => void;
  totalCount?: number;
  itemsCountPerPage?: number;
};

export function WorkbookList({
  list,
  tabVeiw,
  deleteBtn,
  ondeleteClick,
  itemsCountPerPage,
  totalCount,
}: ContentListProps) {
  const queryClient = useQueryClient();
  const { openModal } = useModal();
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [checkList, setCheckList] = useState<string[]>([]);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);

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

  const [workbookIdx, setWorkbookIdx] = useState<number>(0);
  const [isEditWorkbook, setIsEditWorkbook] = useState<boolean>(false);

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
    console.log(idx);
    setIsDeleteWorkbook(true);
    setWorkbookIdx(idx);
  };
  console.log(workbookIdx);
  console.log(isDeleteWorkbook);

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

  //pdf 미리보기
  const [showPdf, setShowPdf] = useState(false);

  const closePdfViewer = () => {
    setShowPdf(false);
  };

  const [pdfUrl, setPdfUrl] = useState<string>('');

  const getPdf = (fileName: string) => {
    setShowPdf(true);
    setPdfUrl(`https://j-dev01.dreamonesys.co.kr/CB/${fileName}`);
  };

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
  }, [tabVeiw]);

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
      {showPdf ? (
        <IframeWrapper>
          <IframeButtonWrapper>
            <Button
              height={'30px'}
              width={'80px'}
              fontSize="13px"
              $filled
              cursor
              onClick={closePdfViewer}
            >
              닫기
            </Button>
          </IframeButtonWrapper>
          <iframe
            title="PDF Viewer"
            src={pdfUrl}
            width="1100"
            height="750"
            style={{ border: 'none', borderRadius: 25 }}
          ></iframe>
        </IframeWrapper>
      ) : (
        <>
          <Total> Total : {totalCount ? totalCount : 0}</Total>
          <ListButtonWrapper>
            {/* <InputWrapper>
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
            </InputWrapper> */}
          </ListButtonWrapper>
          <ListWrapper ref={backgroundRef}>
            <List margin={`10px 0`}>
              {list.map((item: WorksheetListType) => (
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
                        clickFavorite(e, item.idx, item.isFavorite)
                      }
                      cursor
                    />
                  ) : (
                    <Icon
                      width={`18px`}
                      $margin={'0 0 0 12px'}
                      src={`/images/icon/favorites${checkList.includes(item.code) ? `_off_W` : `_off_B`}.svg`}
                      onClick={(e) =>
                        clickFavorite(e, item.idx, item.isFavorite)
                      }
                      cursor
                    />
                  )}
                  <ItemLayout>
                    {/* //TODO */}
                    <i className="line"></i>
                    <span>{item.grade}</span>
                    <i className="line"></i>
                    <span>
                      {(item.tag === 'DAILY_TEST' && '일일테스트') ||
                        (item.tag === 'MONTHLY_TEST' && '월말테스트') ||
                        (item.tag === 'EXERCISES' && '연습문제') ||
                        (item.tag === 'PRACTICE_TEST' && '모의고사') ||
                        (item.tag === 'TEST_PREP' && '내신대비')}
                    </span>
                    <i className="line"></i>
                    <span className="width_20">{item.name}</span>
                    <i className="line"></i>
                    <span className="width_20">{item.createdAt}</span>
                    <i className="line"></i>
                    <span className="width_5">{item.examiner}</span>
                    <i className="line"></i>
                    <span className="width_5">
                      <LuFileSearch2
                        style={{ fontSize: '22px', cursor: 'pointer' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          openCreatePDFModal(item.idx);
                        }}
                        // onClick={() =>
                        //   getPdf(item.lastArticle.originalName as string)
                        // }
                      />
                    </span>
                    <i className="line"></i>
                    <span className="width_5">
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
        </>
      )}
      <Modal />
    </>
  );
}

const IframeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const IframeButtonWrapper = styled.div`
  width: 1100px;
  display: flex;
  justify-content: flex-end;
`;
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
