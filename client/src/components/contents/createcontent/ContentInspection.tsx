import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  Alert,
  Button,
  Loader,
  MathViewer,
  Modal,
  openToastifyAlert,
  Select,
  ValueNone,
  AlertBar,
} from '../..';
import { quizService } from '../../../api/axios';
import { getMyInfo } from '../../../api/user';
import { useModal } from '../../../hooks';
import { quizListAtom } from '../../../store/quizListAtom';
import { QuizListType, QuizType } from '../../../types';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { COLOR } from '../../constants/COLOR';

import { InspectionList, QuizList } from './list';
import { InspectionModal } from './modal';

export function ContentInspection({
  setTabView,
  type,
}: {
  setTabView: React.Dispatch<React.SetStateAction<string>>;
  type: string;
}) {
  const { openModal } = useModal();
  const { closeModal } = useModal();
  const queryClient = useQueryClient();

  const [quizList, setQuizList] = useRecoilState(quizListAtom);
  const [parsedStoredQuizList, setParsedStoredQuizList] = useState<
    QuizListType[]
  >([]);
  const [data, setData] = useState<QuizType[] | null>(null);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  // 선택된 리스트 아이템 데이터
  const [onItemClickData, setOnItemClickData] = useState<QuizListType>();
  const [dataFetched, setDataFetched] = useState(false);
  // alert
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [inspectionArea, setInspectionArea] = useState<string>('');
  const [inspectionReason, setInspectionReason] = useState<string>('');
  const [status, setStatus] = useState<string | null>(null);
  const [comment, setComment] = useState<string>('');
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);

  const closeSuccessAlert = () => {
    setIsSuccessAlertOpen(false);
    window.opener.postMessage('inspectionPopupClosed', '*');
    window.close();

    //문항 다시 호출
    queryClient.invalidateQueries({
      queryKey: ['get-quizList'],
    });
  };

  // 수정시 체크리스트 값 가져오기
  useEffect(() => {
    const storedQuizList = window.localStorage.getItem('quizList');
    // console.log(
    //   '전역에서 로컬 스토리지에서 가져온 체크된 리스트값---',
    //   storedQuizList,
    // );

    if (storedQuizList) {
      setParsedStoredQuizList(JSON.parse(storedQuizList));

      // 로컬스토리지 값 다받은 뒤 초기화
      // window.opener.localStorage.clear();
      return;
    }
  }, []);

  // 마이페이지 데이터 불러오기 api
  const {
    isLoading,
    data: myInfoData,
    refetch,
  } = useQuery({
    queryKey: ['get-myInfo'],
    queryFn: getMyInfo,
    meta: {
      errorMessage: 'get-myInfo 에러 메세지',
    },
  });

  // 전역에서 가져온 체크된 리스트값을 수정용 검수 문항 상세 조회
  const getInspectionQuiz = async () => {
    const idxArray = parsedStoredQuizList.map((list) => list.idx);
    const idxList = idxArray.join(',');
    const res = await quizService.get(`/v1/process/${idxList}`);
    //console.log(res);
    return res.data.data.quizList;
  };
  const { data: inspectionQuizData, refetch: inspectionQuizDataRefetch } =
    useQuery({
      queryKey: ['get-inspectionQuiz'],
      queryFn: getInspectionQuiz,
      meta: {
        errorMessage: 'get-inspectionQuiz 에러 메세지',
      },
      enabled: parsedStoredQuizList.length > 0,
    });

  useEffect(() => {
    if (parsedStoredQuizList.length > 0) inspectionQuizDataRefetch();
  }, [parsedStoredQuizList]);

  useEffect(() => {
    if (inspectionQuizData) {
      setQuizList(inspectionQuizData);
      setDataFetched(true);
    }
  }, [inspectionQuizData, setQuizList]);

  const postProcess = async () => {
    const data = {
      idx: inspectionQuizData[0].processInfo.idx,
      currentStep: inspectionQuizData[0].currentStep,
      status: status,
      comment: comment,
    };
    return await quizService.put(`/v1/process`, data);
  };

  const { mutate: postProcessData } = useMutation({
    mutationFn: postProcess,
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
      setIsSuccessAlertOpen(true);
      closeModal();
    },
  });

  // 마지막으로 클릭된 문항 뷰어에 보이게
  // useEffect(() => {
  //   console.log('onItemClickData------------', onItemClickData);
  // }, [checkedList]);

  useEffect(() => {}, [inspectionArea, inspectionReason]);

  return (
    <Container>
      <ContentsWrapper>
        <ContentListWrapper>
          <Title>문항 데이터</Title>
          {/* <ContentList>
            {dataFetched && (
              <>
                <InspectionList
                  questionList={quizList}
                  $height={`calc(100vh - 550px)`}
                  showEditButton
                  onItemClick={setOnItemClickData}
                  setCheckedList={setCheckedList}
                />
              </>
            )}
            {!dataFetched && <Loader />}
          </ContentList> */}
        </ContentListWrapper>

        <ContentListWrapper>
          <PerfectScrollbar>
            <ViewerWrapper>
              <MathViewerWrapper>
                {onItemClickData ? (
                  <>
                    {onItemClickData?.quizItemList?.map((el) => (
                      <div key={`${el?.code} quizItemList sortedList`}>
                        {[
                          'BIG',
                          'TEXT',
                          'QUESTION',
                          'SMALL',
                          'EXAMPLE',
                          // 'CHOICES',
                          // 'ANSWER',
                          'COMMENTARY',
                          'HINT',
                          'CONCEPT',
                          'TITLE',
                          'TIP',
                        ].includes(el?.type) &&
                          el?.content && (
                            <MathViewer data={el.content}></MathViewer>
                          )}
                        {Array.isArray(el?.content) && (
                          <>
                            {el.content.map((item, index) => (
                              <MathViewer key={index}>{item}</MathViewer>
                            ))}
                          </>
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <ValueNone textOnly info="미리보기" />
                  </>
                )}
              </MathViewerWrapper>
            </ViewerWrapper>
          </PerfectScrollbar>
        </ContentListWrapper>

        <ContentListWrapper className="flex_1">
          <Title>프로세스</Title>
          {quizList && quizList.length > 0 ? (
            <>
              {quizList.map((process) => {
                return (
                  <ListBoxWrapper key={process.idx}>
                    {process.processInfo?.stepList.map((step) => {
                      return (
                        <ListBox key={step.stepSort}>
                          <strong className="title">
                            {step.stepName === 'BUILD'
                              ? '제작'
                              : step.stepName === 'EDITING'
                                ? '편집'
                                : step.stepName === 'REVIEW'
                                  ? '검수'
                                  : ''}
                          </strong>
                          <PerfectScrollbar>
                            {step.workerList.map((worker) => {
                              return (
                                <ul className="name_list" key={worker.idx}>
                                  {worker.account ? (
                                    <li>
                                      {myInfoData?.data.data.name ===
                                        worker.account.name &&
                                      process.currentStep === step.stepSort ? (
                                        <button
                                          className="active"
                                          onClick={() => {
                                            if (step.stepName === 'BUILD')
                                              return;

                                            setInspectionArea(
                                              worker.state === 'APPROVAL'
                                                ? '검수의견'
                                                : worker.state === 'REJECT'
                                                  ? '반려사유'
                                                  : worker.state === 'HOLD'
                                                    ? '보류사유'
                                                    : '',
                                            );
                                            setInspectionReason(
                                              worker?.account?.comment
                                                ?.comment ?? '',
                                            );
                                            setIsAlertOpen(
                                              worker.state !== null
                                                ? true
                                                : false,
                                            );
                                          }}
                                        >
                                          <span className="name">
                                            {`${worker.account.name}(${worker.account.id})`}
                                          </span>
                                          {worker.state === 'APPROVAL' ? (
                                            <span className="tag blue">
                                              승인
                                            </span>
                                          ) : worker.state === 'REJECT' ? (
                                            <span className="tag red">
                                              반려
                                            </span>
                                          ) : worker.state === 'HOLD' ? (
                                            <span className="tag gray">
                                              보류
                                            </span>
                                          ) : (
                                            <span className="tag">
                                              {worker.account.authorityName}
                                            </span>
                                          )}
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => {
                                            if (step.stepName === 'BUILD')
                                              return;

                                            setInspectionArea(
                                              worker.state === 'APPROVAL'
                                                ? '검수의견'
                                                : worker.state === 'REJECT'
                                                  ? '반려사유'
                                                  : worker.state === 'HOLD'
                                                    ? '보류사유'
                                                    : '',
                                            );
                                            setInspectionReason(
                                              worker?.account?.comment
                                                ?.comment ?? '',
                                            );
                                            setIsAlertOpen(
                                              worker.state !== null
                                                ? true
                                                : false,
                                            );
                                          }}
                                        >
                                          <span className="name">
                                            {`${worker.account.name}(${worker.account.id})`}
                                          </span>
                                          {/* 첫단계는 검수요청 */}
                                          {step.stepName === 'BUILD' ? (
                                            <span className="tag blue">
                                              검수요청
                                            </span>
                                          ) : (
                                            <>
                                              {worker.state === 'APPROVAL' ? (
                                                <span className="tag blue">
                                                  승인
                                                </span>
                                              ) : worker.state === 'REJECT' ? (
                                                <span className="tag red">
                                                  반려
                                                </span>
                                              ) : worker.state === 'HOLD' ? (
                                                <span className="tag gray">
                                                  보류
                                                </span>
                                              ) : (
                                                <span className="tag">
                                                  {worker.account.authorityName}
                                                </span>
                                              )}
                                            </>
                                          )}
                                        </button>
                                      )}
                                    </li>
                                  ) : worker.authority ? (
                                    <li>
                                      {myInfoData?.data.data.authority.name ===
                                        worker.authority.name &&
                                      process.currentStep === step.stepSort ? (
                                        <button
                                          className="active"
                                          onClick={() => {
                                            if (step.stepName === 'BUILD')
                                              return;

                                            setInspectionArea(
                                              worker.state === 'APPROVAL'
                                                ? '검수의견'
                                                : worker.state === 'REJECT'
                                                  ? '반려사유'
                                                  : worker.state === 'HOLD'
                                                    ? '보류사유'
                                                    : '',
                                            );
                                            setInspectionReason(
                                              worker?.authority?.comment
                                                ?.comment ?? '',
                                            );
                                            setIsAlertOpen(
                                              worker.state !== null
                                                ? true
                                                : false,
                                            );
                                          }}
                                        >
                                          <span className="name">
                                            {/* 권한이였다가 사용자로 바뀐 경우 */}
                                            {worker.authority.comment ===
                                            null ? (
                                              <>{worker.authority.name}</>
                                            ) : (
                                              <>
                                                {`${worker.authority.comment.userName}(${worker.authority.comment.userId})`}
                                              </>
                                            )}
                                          </span>
                                          {worker.state === 'APPROVAL' ? (
                                            <span className="tag blue">
                                              승인
                                            </span>
                                          ) : worker.state === 'REJECT' ? (
                                            <span className="tag red">
                                              반려
                                            </span>
                                          ) : worker.state === 'HOLD' ? (
                                            <span className="tag gray">
                                              보류
                                            </span>
                                          ) : (
                                            <span className="tag">
                                              {/* {worker.authority.code} */}
                                            </span>
                                          )}
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => {
                                            if (step.stepName === 'BUILD')
                                              return;

                                            setInspectionArea(
                                              worker.state === 'APPROVAL'
                                                ? '검수의견'
                                                : worker.state === 'REJECT'
                                                  ? '반려사유'
                                                  : worker.state === 'HOLD'
                                                    ? '보류사유'
                                                    : '',
                                            );
                                            setInspectionReason(
                                              worker?.authority?.comment
                                                ?.comment ?? '',
                                            );
                                            setIsAlertOpen(
                                              worker.state !== null
                                                ? true
                                                : false,
                                            );
                                          }}
                                        >
                                          <span className="name">
                                            {/* 권한이였다가 사용자로 바뀐 경우 */}
                                            {worker.authority.comment ===
                                            null ? (
                                              <>{worker.authority.name}</>
                                            ) : (
                                              <>
                                                {`${worker.authority.comment.userName}(${worker.authority.comment.userId})`}
                                              </>
                                            )}
                                          </span>
                                          {step.stepName === 'BUILD' ? (
                                            <span className="tag blue">
                                              검수요청
                                            </span>
                                          ) : (
                                            <>
                                              {worker.state === 'APPROVAL' ? (
                                                <span className="tag blue">
                                                  승인
                                                </span>
                                              ) : worker.state === 'REJECT' ? (
                                                <span className="tag red">
                                                  반려
                                                </span>
                                              ) : worker.state === 'HOLD' ? (
                                                <span className="tag gray">
                                                  보류
                                                </span>
                                              ) : (
                                                <span className="tag">
                                                  {/* {worker.authority.code} */}
                                                </span>
                                              )}
                                            </>
                                          )}
                                        </button>
                                      )}
                                    </li>
                                  ) : null}
                                </ul>
                              );
                            })}
                          </PerfectScrollbar>
                        </ListBox>
                      );
                    })}
                  </ListBoxWrapper>
                );
              })}
            </>
          ) : (
            <>
              <ValueNone />
            </>
          )}
        </ContentListWrapper>
        <Modal />

        <Alert
          top={`50%`}
          isAlertOpen={isAlertOpen}
          description={`${inspectionArea}`}
          subDescription={`${inspectionReason}`}
          notice
          bold="800"
          onClose={() => setIsAlertOpen(false)}
        />
      </ContentsWrapper>
      <BorderWrapper>
        <SubmitButtonWrapper>
          <Button
            buttonType="button"
            onClick={() => {
              setStatus('HOLD');
              openModal({
                title: '',
                content: (
                  <InspectionModal
                    type={'보류'}
                    onClick={postProcessData}
                    setComment={setComment}
                  />
                ),
              });
            }}
            $margin={'0 10px 0 0'}
            cursor
          >
            <span>보류</span>
          </Button>
          <Button
            buttonType="button"
            onClick={() => {
              setStatus('REJECT');
              openModal({
                title: '',
                content: (
                  <InspectionModal
                    type={'반려'}
                    onClick={postProcessData}
                    setComment={setComment}
                  />
                ),
              });
            }}
            $margin={'0 10px 0 0'}
            $filled
            $warning
            cursor
          >
            <span>반려</span>
          </Button>
          <Button
            buttonType="button"
            onClick={() => {
              setStatus('APPROVAL');
              openModal({
                title: '',
                content: (
                  <InspectionModal
                    type={'승인'}
                    onClick={postProcessData}
                    setComment={setComment}
                  />
                ),
              });
            }}
            $margin={'0 10px 0 0'}
            $filled
            cursor
          >
            <span>승인</span>
          </Button>
        </SubmitButtonWrapper>
      </BorderWrapper>
      <AlertBar
        isCloseKor
        type="success"
        isAlertOpen={isSuccessAlertOpen}
        closeAlert={closeSuccessAlert}
        message={'검수작업이 완료되었습니다'}
      ></AlertBar>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Title = styled.div`
  padding: 15px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  font-size: 15px;
  font-weight: bold;
`;

const ViewerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const MathViewerWrapper = styled.div`
  padding: 20px;

  p > img {
    width: 100% !important;
    height: auto !important;
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

const ContentListWrapper = styled.div`
  width: 50%;
  border: 1px solid ${COLOR.BORDER_BLUE};
  height: 500px;
  overflow: hidden;

  &.flex_1 {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;
const ContentList = styled.div`
  height: calc(100vh - 150px);
  width: 100%;
  padding: 10px;
  overflow: hidden;
  border-top: none;
  border-bottom: none;
  background-color: ${COLOR.LIGHT_GRAY};
`;

const ListBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 20px;
`;
const ListBox = styled.div`
  background-color: #eee;
  width: 25%;
  height: 320px;
  position: relative;
  padding-bottom: 10px;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -20px;
    transform: translateY(-50%) rotate(-90deg);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #aaa;
  }

  &:last-child::after {
    display: none;
  }

  .title {
    display: flex;
    padding: 10px;
  }
  .scrollbar-container {
    height: calc(100% - 50px);
  }
  .name_list {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    gap: 10px;
  }
  .name_list li {
    padding-bottom: 10px;
  }

  .name_list button {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 10px;
    border: 1px solid #eaeaea;
    background-color: #fff;
    border-radius: 5px;
  }
  .name_list button.active {
    border: 1px solid ${COLOR.PRIMARY};
  }
  .name_list button .name {
    display: flex;
    padding-bottom: 10px;
  }
  .name_list button .tag {
    display: flex;
    font-size: 13px;
    color: ${COLOR.FONT_GRAY};
  }
  .name_list button .tag.blue {
    display: flex;
    font-size: 13px;
    color: ${COLOR.PRIMARY};
  }
  .name_list button .tag.red {
    display: flex;
    font-size: 13px;
    color: ${COLOR.ERROR};
  }
  .name_list button .tag.gray {
    display: flex;
    font-size: 13px;
    color: ${COLOR.FONT_GRAY};
  }
`;

const BorderWrapper = styled.div`
  border-top: 1px solid ${COLOR.BORDER_BLUE};
  position: fixed;
  bottom: 0px;
  right: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: #fff;
`;
const SubmitButtonWrapper = styled.div`
  position: absolute;
  right: 30px;
  left: auto;
  top: 10px;
  bottom: 0px;
  display: flex;
  flex-direction: row;
  width: 50%;
`;
