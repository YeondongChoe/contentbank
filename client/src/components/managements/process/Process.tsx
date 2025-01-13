import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { info } from 'console';

import { useMutation, useQuery } from '@tanstack/react-query';
import { BiSolidTrashAlt } from 'react-icons/bi';
import { SlOptionsVertical, SlPrinter } from 'react-icons/sl';
import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';

import { userInstance } from '../../../api/axios';
import { Modal, Alert } from '../../../components';
import { useModal } from '../../../hooks';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { AlertBar, Button, Loader, Input, openToastifyAlert } from '../../atom';
import { COLOR } from '../../constants';

import { ProcessAddModal, ProcessEditModal } from './modal';

type processNameListProps = {
  idx: number;
  code: string;
  name: string;
};

type processStepListProps = {
  idx: number;
  stepName: string;
  stepSort: number;
  createdBy: string;
  createdAt: string;
  lastModifiedBy: string;
  lastModifiedAt: string;
  workers: {
    idx: number;
    workerSort: number;
    createdBy: string;
    createdAt: string;
    account: {
      idx: number;
      id: string;
      name: string;
      authorityName: string;
    } | null;
    authority: {
      idx: number;
      name: string;
    } | null;
  }[];
};

type processDetailInfoProps = {
  idx: number;
  code: string;
  companyCode: string;
  processName: string;
  isUse: boolean;
  isDelete: boolean;
  createdBy: string;
  createdAt: string;
  lastModifiedBy: string;
  lastModifiedAt: string;
  steps: processStepListProps[];
};

export function Process() {
  const DummyData: processStepListProps[] = [
    {
      stepName: 'BUILD',
      idx: 0,
      stepSort: 1,
      createdBy: '',
      createdAt: '',
      lastModifiedBy: '',
      lastModifiedAt: '',
      workers: [],
    },
    {
      stepName: 'REVIEW',
      idx: 1,
      stepSort: 2,
      createdBy: '',
      createdAt: '',
      lastModifiedBy: '',
      lastModifiedAt: '',
      workers: [],
    },
    {
      stepName: 'EDITING',
      idx: 2,
      stepSort: 3,
      createdBy: '',
      createdAt: '',
      lastModifiedBy: '',
      lastModifiedAt: '',
      workers: [],
    },
    {
      stepName: 'REVIEW',
      idx: 3,
      stepSort: 4,
      createdBy: '',
      createdAt: '',
      lastModifiedBy: '',
      lastModifiedAt: '',
      workers: [],
    },
  ];
  const { openModal } = useModal();
  // const backgroundRef = useRef<HTMLDivElement>(null);
  const [processList, setProcessList] =
    useState<processStepListProps[]>(DummyData);
  //프로세스명
  const [nameValue, setNameValue] = useState('');
  /* 안내 알럿 */
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const closeSuccessAlert = () => {
    setIsSuccessAlertOpen(false);
  };
  const [processNameList, setProcessNameList] = useState<
    processNameListProps[]
  >([]);
  const [processNameIdx, setProcessNameIdx] = useState<number | null>(null);
  //서버로 받은 최초의 데이터값
  const [processDetailInfoOrigin, setProcessDetailInfoOrigin] =
    useState<processDetailInfoProps>();
  const [processDetailInfo, setProcessDetailInfo] =
    useState<processDetailInfoProps>();
  const [stepSortList, setStepSortList] = useState<number[]>([]);

  const openCreateGroupModal = () => {
    openModal({
      title: '',
      content: (
        <ProcessEditModal
          isEdit={processNameIdx !== null ? true : false}
          processListData={processList}
          setProcessListData={setProcessList}
          processDetailInfo={processDetailInfo}
          setProcessDetailInfo={setProcessDetailInfo}
        />
      ),
    });
  };

  const openSettingList = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.currentTarget.children[1].classList.add('show');
  };
  const closeSettingList = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.currentTarget.children[1].classList.remove('show');
  };

  const deleteCard = (sort: number, id: string, isAccount: boolean) => {
    console.log('sort', sort);
    console.log('processNameIdx', processNameIdx);
    console.log('id', id);
    console.log('isAccount', isAccount);
    if (processNameIdx === null) {
      setProcessList((prev) =>
        prev.map((list) => {
          if (list.stepSort === sort) {
            return {
              ...list,
              workers: list.workers.filter((worker) => {
                if (isAccount) {
                  return worker.account?.id !== id;
                } else {
                  return worker.authority?.name !== id;
                }
              }),
            };
          }
          return list;
        }),
      );
    } else {
      setProcessDetailInfo((prev) => {
        if (!prev) return undefined; // prev가 null이면 그대로 반환
        return {
          ...prev,
          steps: prev.steps.map((list) => {
            if (list.stepSort === sort) {
              return {
                ...list,
                workers: list.workers.filter((worker) => {
                  if (isAccount) {
                    return worker.account?.id !== id;
                  } else {
                    return worker.authority?.name !== id;
                  }
                }),
              };
            }
            return list; // stepSort가 일치하지 않는 경우 그대로 반환
          }),
        };
      });
    }
  };

  /*  모달 열기 */
  const openAddModal = (sort: number, name: string) => {
    openModal({
      title: '',
      content: (
        <ProcessAddModal
          isEdit={processNameIdx !== null ? true : false}
          processIdx={processNameIdx as number}
          stepSort={sort}
          stepName={name}
          processListData={processList}
          setProcessListData={setProcessList}
          processDetailInfo={processDetailInfo}
          setProcessDetailInfo={setProcessDetailInfo}
        />
      ),
    });
  };

  //프로세스 리스트 불러오기 api
  const getProcessNameList = async () => {
    const res = await userInstance.get(`/v1/process`);
    //console.log(res);
    return res;
  };
  const {
    data: processNameListData,
    isFetching: isProcessNameListLoading,
    refetch: processNameListRefetch,
  } = useQuery({
    queryKey: ['get-processNameList'],
    queryFn: getProcessNameList,
    meta: {
      errorMessage: 'get-processNameList 에러 메세지',
    },
  });

  useEffect(() => {
    if (processNameListData)
      setProcessNameList(processNameListData?.data.data.list);
  }, [processNameListData]);

  //프로세스 상세정보 불러오기 api
  const getProcessDetailInfo = async () => {
    if (processNameIdx === null) {
      return;
    } else {
      const res = await userInstance.get(`/v1/process/${processNameIdx}`);
      //console.log(res);
      return res;
    }
  };
  const {
    data: processDetailInfoData,
    isFetching: isProcessDetailInfoLoading,
    refetch: processDetailInfoRefetch,
  } = useQuery({
    queryKey: ['get-processDetailInfo', processNameIdx],
    queryFn: getProcessDetailInfo,
    meta: {
      errorMessage: 'get-processDetailInfo 에러 메세지',
    },
  });

  useEffect(() => {
    if (processDetailInfoData) {
      setProcessDetailInfo(processDetailInfoData?.data.data.processDetail);
      setProcessDetailInfoOrigin(
        processDetailInfoData?.data.data.processDetail,
      );
    }
  }, [processDetailInfoData]);

  useEffect(() => {
    processDetailInfoRefetch();
    setStepSortList([]);
  }, [processNameIdx]);

  const postNewProcess = async () => {
    const stepData = processList.map((step, index) => ({
      name: step.stepName,
      sort: index + 1, // sort는 1부터 시작
      workers: step.workers.map((worker, workerIndex) => ({
        accountIdx: worker.account?.idx || null,
        authorityIdx: worker.authority?.idx || null,
        sort: workerIndex + 1, // worker의 순서 1부터 시작
      })),
    }));

    const data = {
      name: nameValue,
      steps: stepData,
    };
    return await userInstance.post(`/v1/process`, data);
  };

  const { mutate: postNewProcessData, isPending: postNewProcessPending } =
    useMutation({
      mutationFn: postNewProcess,
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
        //성공 시 리스트 리패치
        processNameListRefetch();
        //저장 알람
        openToastifyAlert({
          type: 'success',
          text: '저장되었습니다.',
        });
        setProcessList(DummyData);
        setProcessNameIdx(null);
        setNameValue('');
      },
    });

  const handleNewProcess = () => {
    postNewProcessData();
    setIsSaveAlert(false);
  };

  const putProcess = async () => {
    const stepData = processDetailInfo?.steps.map((step, index) => ({
      name: step.stepName,
      sort: index + 1, // sort는 1부터 시작
      workers: step.workers.map((worker, workerIndex) => ({
        accountIdx: worker.account?.idx || null,
        authorityIdx: worker.authority?.idx || null,
        sort: workerIndex + 1, // worker의 순서 1부터 시작
      })),
    }));

    const data = {
      idx: processNameIdx,
      name: nameValue,
      steps: stepData,
      changStepSort: stepSortList,
    };
    return await userInstance.put(`/v1/process`, data);
  };

  const { mutate: putProcessData, isPending: putProcessPending } = useMutation({
    mutationFn: putProcess,
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
      //성공 시 리스트 리패치
      processNameListRefetch();
      //저장 알람
      openToastifyAlert({
        type: 'success',
        text: '저장되었습니다.',
      });
      setProcessList(DummyData);
      setNameValue('');
      setProcessNameIdx(null);
    },
  });

  const handlePutProcess = () => {
    putProcessData();
    setIsSaveAlert(false);
  };

  //저장 클릭시 alert 띄우기
  const [isSaveAlert, setIsSaveAlert] = useState(false);
  const handleSaveProcess = () => {
    if (processNameIdx === null) {
      const stepData = processList.map((step, index) => ({
        name: step.stepName,
        sort: index + 1, // sort는 1부터 시작
        workers: step.workers.map((worker, workerIndex) => ({
          accountIdx: worker.account?.idx || null,
          authorityIdx: worker.authority?.idx || null,
          sort: workerIndex + 1, // worker의 순서 1부터 시작
        })),
      }));
      if (nameValue === '') {
        openToastifyAlert({
          type: 'error',
          text: '프로세스명을 입력해주세요',
        });
      } else if (stepData.some((el) => el.workers.length === 0)) {
        openToastifyAlert({
          type: 'error',
          text: '반드시 단계별 1명 이상의 작업자가 필요합니다',
        });
      } else {
        setIsSaveAlert(true);
      }
    } else {
      //기존의 값과 비교하여서 변화된 stepSort를 저장
      const changedStepSorts = new Set<number>(); // 중복 방지를 위해 Set 사용

      processDetailInfo?.steps.forEach((currentStep) => {
        const originalStep = processDetailInfoOrigin?.steps.find(
          (originStep) => originStep.stepSort === currentStep.stepSort,
        );

        if (originalStep) {
          // 기존 값이 존재하면 workers를 비교
          const currentWorkers = JSON.stringify(currentStep.workers);
          const originalWorkers = JSON.stringify(originalStep.workers);

          if (currentWorkers !== originalWorkers) {
            // workers 값이 다르면 stepSort 저장
            changedStepSorts.add(currentStep.stepSort);
          }
        } else {
          // 추가된 항목이라면 stepSort 저장
          changedStepSorts.add(currentStep.stepSort);
        }
      });

      // 삭제된 항목 확인
      processDetailInfoOrigin?.steps.forEach((originalStep) => {
        const currentStep = processDetailInfo?.steps.find(
          (step) => step.stepSort === originalStep.stepSort,
        );

        if (!currentStep) {
          // 현재 값에 없는 항목이라면 삭제된 것으로 간주
          changedStepSorts.add(originalStep.stepSort);
        }
      });

      // `changedStepSorts`를 배열로 변환하여 상태에 추가
      setStepSortList((prevList) => [
        ...prevList,
        ...Array.from(changedStepSorts).filter(
          (sort) => !prevList.includes(sort),
        ),
      ]);

      const stepData = processDetailInfo?.steps.map((step, index) => ({
        name: step.stepName,
        sort: index + 1, // sort는 1부터 시작
        workers: step.workers.map((worker, workerIndex) => ({
          accountIdx: worker.account?.idx || null,
          authorityIdx: worker.authority?.idx || null,
          sort: workerIndex + 1, // worker의 순서 1부터 시작
        })),
      }));
      if (nameValue === '') {
        openToastifyAlert({
          type: 'error',
          text: '프로세스명을 입력해주세요',
        });
      } else if (stepData?.some((el) => el.workers.length === 0)) {
        openToastifyAlert({
          type: 'error',
          text: '반드시 단계별 1명 이상의 작업자가 필요합니다',
        });
      } else {
        setIsSaveAlert(true);
      }
    }
  };

  const [isDeleteProcess, setIsDeleteProcess] = useState(false);
  const clickDeleteProcess = () => {
    setIsDeleteProcess(true);
  };
  const deleteProcess = async () => {
    const res = await userInstance.delete(`/v1/process/${processNameIdx}`);
    // console.log(`기업 삭제 결과값`, res);
    return res.data;
  };

  const { mutate: deleteProcessMutate } = useMutation({
    mutationFn: deleteProcess,
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
      setIsDeleteProcess(false);
      openToastifyAlert({
        type: 'success',
        text: '삭제 되었습니다.',
      });
      //리스트 다시 불러오기
      processNameListRefetch();
      //초기화
      setProcessNameIdx(null);
      setNameValue('');
      setStepSortList([]);
    },
  });

  // 배경 클릭시 체크리스트 초기화
  // useEffect(() => {
  //   const handleClick = (e: MouseEvent) => {
  //     if (e.target?.toString().includes('Div')) {
  //       //console.log('background div');
  //     }
  //   };
  //   window.addEventListener('click', handleClick);
  //   return () => window.removeEventListener('click', handleClick);
  // }, [backgroundRef]);

  return (
    <Container>
      <AlertBar
        type="success"
        isAlertOpen={isSuccessAlertOpen}
        closeAlert={closeSuccessAlert}
        message={'아이디가 생성 되었습니다.'}
      ></AlertBar>
      <Title>프로세스 관리</Title>
      <ProcessMainWrapper>
        <ProcessListWrapper>
          <ScrollWrapper>
            <PerfectScrollbar>
              <ListTitle>
                프로세스 리스트
                <span className="sub">콘텐츠 제작 프로세스를 관리합니다.</span>
                <span className="sub">
                  작업자를 지정하여 제작 단계를 설정합니다.
                </span>
              </ListTitle>
              <ProcessListBox>
                {isProcessNameListLoading ? (
                  <>
                    <Loader />
                  </>
                ) : (
                  <>
                    {processNameList.map((process) => (
                      <ProcessList key={`${process.idx} - ${process.name}`}>
                        <ProcessWrapper>
                          <ProcessName
                            $isSelected={true}
                            onClick={() => {
                              setProcessNameIdx(process.idx);
                              setNameValue(process.name as string);
                              //항목 눌렀을때 추가해뒀던 데이터 초기화
                              setProcessList(DummyData);
                            }}
                          >
                            <div className="title">{process.name}</div>
                          </ProcessName>
                        </ProcessWrapper>
                        <DeleteIconWrapper>
                          <BiSolidTrashAlt
                            onClick={() => {
                              clickDeleteProcess();
                              //삭제할 카테고리 idx값 관리
                              setProcessNameIdx(process.idx);
                            }}
                          />
                        </DeleteIconWrapper>
                      </ProcessList>
                    ))}
                    {processNameIdx === null && (
                      <ProcessName className="add" $isSelected={true}>
                        <div className="title">
                          {nameValue || '검수라인명을 입력해주세요'}
                        </div>
                      </ProcessName>
                    )}
                  </>
                )}
              </ProcessListBox>
            </PerfectScrollbar>
          </ScrollWrapper>
        </ProcessListWrapper>
        {/* 프로세스 관리 */}
        <ProcessManageWrapper>
          <InfoTitleWrapper>
            <InfoTitle>프로세스 관리</InfoTitle>
            <Button
              height={'35px'}
              width={'150px'}
              onClick={() => {
                setProcessNameIdx(null);
                setNameValue('');
                setStepSortList([]);
              }}
              fontSize="13px"
              $filled
              cursor
            >
              신규 프로세스 추가
            </Button>
          </InfoTitleWrapper>
          <Input
            width={`calc(100% - 40px)`}
            height="35px"
            padding="10px"
            margin="0 20px"
            border="normal"
            placeholderSize="14px"
            fontSize="14px"
            type="text"
            placeholder="프로세스명을 입력해주세요"
            borderradius="5px"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            maxLength={20}
          />
          {processNameIdx !== null ? (
            <ProcessCardList>
              {processDetailInfo?.steps
                ?.slice()
                .sort((a, b) => a.stepSort - b.stepSort)
                .map((info) => (
                  <ProcessCardWrapper key={`${info?.idx} - ${info?.stepName}`}>
                    <CardTitleWrapper>
                      <CardTitle>
                        {info.stepName === 'BUILD'
                          ? '제작'
                          : info.stepName === 'EDITING'
                            ? '편집'
                            : info.stepName === 'REVIEW'
                              ? '검수'
                              : ''}
                      </CardTitle>
                      <ProcessType>
                        {info.stepName === 'BUILD'
                          ? '등록/수정/조회'
                          : info.stepName === 'EDITING'
                            ? '수정/조회'
                            : info.stepName === 'REVIEW'
                              ? '조회'
                              : ''}
                      </ProcessType>
                    </CardTitleWrapper>
                    {info.workers.map((work) => (
                      <>
                        <ProcessCard key={work.workerSort}>
                          <CradInfo>
                            {work.account?.name ? (
                              <span className="name">
                                {work.account?.name}({work.account?.id})
                              </span>
                            ) : (
                              <span className="name">
                                {work.authority?.name}
                              </span>
                            )}
                            {work.account?.name && (
                              <span className="authority">
                                {work.account?.authorityName}
                              </span>
                            )}
                          </CradInfo>
                          <SettingButton
                            type="button"
                            onClick={(e) => openSettingList(e)}
                            onMouseLeave={(e) => closeSettingList(e)}
                          >
                            <SlOptionsVertical
                              style={{
                                fontSize: '14px',
                                cursor: 'pointer',
                              }}
                            />
                            <SettingList>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => {
                                    deleteCard(
                                      info.stepSort,
                                      work.account !== null
                                        ? (work.account?.id as string)
                                        : (work.authority?.name as string),
                                      work.account !== null ? true : false,
                                    );
                                  }}
                                >
                                  삭제
                                </button>
                              </li>
                            </SettingList>
                          </SettingButton>
                        </ProcessCard>
                        {/* {(info.workers.length === 0 ||
                        i === info.workers.length - 1) && (
                        <IncreaseBox
                          onClick={() => openAddModal(work.workerSort)}
                        >
                          +
                        </IncreaseBox>
                      )} */}
                      </>
                    ))}
                    <IncreaseBox
                      onClick={() => openAddModal(info.stepSort, info.stepName)}
                    >
                      +
                    </IncreaseBox>
                  </ProcessCardWrapper>
                ))}
            </ProcessCardList>
          ) : (
            <ProcessCardList>
              {processList
                ?.slice()
                .sort((a, b) => a.stepSort - b.stepSort)
                ?.map((process) => (
                  <ProcessCardWrapper
                    key={`${process.idx}-${process.stepName}`}
                  >
                    <>
                      <CardTitleWrapper>
                        <CardTitle>
                          {process.stepName === 'BUILD'
                            ? '제작'
                            : process.stepName === 'EDITING'
                              ? '편집'
                              : process.stepName === 'REVIEW'
                                ? '검수'
                                : ''}
                        </CardTitle>
                        <ProcessType>
                          {process.stepName === 'BUILD'
                            ? '등록/수정/조회'
                            : process.stepName === 'EDITING'
                              ? '수정/조회'
                              : process.stepName === 'REVIEW'
                                ? '조회'
                                : ''}
                        </ProcessType>
                      </CardTitleWrapper>
                      {process?.workers.length === 0 ? null : (
                        <>
                          {process.workers.map((worker) => (
                            <>
                              <ProcessCard key={worker.idx}>
                                <CradInfo>
                                  {worker.account?.name ? (
                                    <span className="name">
                                      {worker.account?.name}(
                                      {worker.account?.id})
                                    </span>
                                  ) : (
                                    <span className="name">
                                      {worker.authority?.name}
                                    </span>
                                  )}
                                  {worker.account?.name && (
                                    <span className="authority">
                                      {worker.account?.authorityName}
                                    </span>
                                  )}
                                </CradInfo>
                                <SettingButton
                                  type="button"
                                  onClick={(e) => openSettingList(e)}
                                  onMouseLeave={(e) => closeSettingList(e)}
                                >
                                  <SlOptionsVertical
                                    style={{
                                      fontSize: '14px',
                                      cursor: 'pointer',
                                    }}
                                  />
                                  <SettingList>
                                    <li>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          deleteCard(
                                            process.stepSort,
                                            worker.account !== null
                                              ? (worker.account?.id as string)
                                              : (worker.authority
                                                  ?.name as string),
                                            worker.account !== null
                                              ? true
                                              : false,
                                          );
                                        }}
                                      >
                                        삭제
                                      </button>
                                    </li>
                                  </SettingList>
                                </SettingButton>
                              </ProcessCard>
                            </>
                          ))}
                        </>
                      )}
                    </>
                    <IncreaseBox
                      onClick={() =>
                        openAddModal(process.stepSort, process.stepName)
                      }
                    >
                      +
                    </IncreaseBox>
                  </ProcessCardWrapper>
                ))}
            </ProcessCardList>
          )}
          <ButtonWrapper>
            <Button
              height={'35px'}
              width={'120px'}
              onClick={openCreateGroupModal}
              fontSize="13px"
              cursor
            >
              단계 수정
            </Button>
            <Button
              height={'35px'}
              width={'120px'}
              onClick={handleSaveProcess}
              fontSize="13px"
              $filled
              cursor
              disabled={postNewProcessPending || putProcessPending}
            >
              저장
            </Button>
          </ButtonWrapper>
        </ProcessManageWrapper>
        {isSaveAlert && (
          <Alert
            description={
              processNameIdx === null
                ? '신규 프로세스를 생성하시겠습니까?'
                : '해당 프로세스를 저장하시겠습니까?'
            }
            subDescription={
              processNameIdx === null
                ? ''
                : '프로세스가 수정될 시, 현재 진행 중인 검수가 모두 초기화 됩니다.(변경필요)'
            }
            isAlertOpen={isSaveAlert}
            action="확인"
            onClose={() => setIsSaveAlert(false)}
            onClick={
              processNameIdx === null ? handleNewProcess : handlePutProcess
            }
          ></Alert>
        )}
        {isDeleteProcess && (
          <Alert
            description="해당 제작 프로세스를 삭제하시겠습니까?"
            subDescription="제작 프로세스 삭제 시, 현재 진행 중인 검수가 모두 초기화 됩니다."
            isAlertOpen={isDeleteProcess}
            action="삭제"
            onClose={() => setIsDeleteProcess(false)}
            onClick={() => deleteProcessMutate()}
          ></Alert>
        )}
      </ProcessMainWrapper>
      <Modal />
    </Container>
  );
}

const Container = styled.div`
  padding: 40px;
  width: 100%;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 800;
`;
const ProcessMainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProcessListWrapper = styled.div`
  display: flex;
  min-width: 430px;
  //width: calc(40% - 20px);
`;
const ScrollWrapper = styled.div`
  width: calc(100% - 20px);
  height: 630px;
  background-color: ${COLOR.LIGHT_GRAY};
`;
const ListTitle = styled.span`
  font-weight: bold;
  color: ${COLOR.FONT_BLACK};
  font-size: 16px;
  padding: 0 20px;
  margin-top: 15px;
  display: inline-block;

  .sub {
    width: 100%;
    display: block;
    font-size: 12px;
    font-weight: 400;
    color: ${COLOR.FONT_GRAY};
  }
`;
const ProcessListBox = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  background-color: ${COLOR.LIGHT_GRAY};
  padding: 10px;
`;
const ProcessList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ProcessWrapper = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-right: 8px;
  margin-bottom: 5px;
  background-color: white;
  border-radius: 5px;
`;
const ProcessName = styled.div<{ $isSelected: boolean }>`
  width: 100%;
  font-size: 14px;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  ${({ $isSelected }) =>
    $isSelected
      ? `color: ${COLOR.PRIMARY}; border: 1px solid ${COLOR.PRIMARY};`
      : 'none'};
  background-color: ${({ className }) =>
    className === 'add' ? 'white' : 'inherit'};

  .title {
    display: flex;
    justify-content: center;
  }

  &:hover {
    background-color: ${COLOR.SELECT_BLUE};
    color: white;
    border-radius: 5px;
  }
  /* .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  } */
`;
const DeleteIconWrapper = styled.button`
  font-size: 12px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${COLOR.FONT_BLACK};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  color: #fff;
  /* background-color: transparent; */
  &:hover {
    background: ${COLOR.RED};
  }
`;
const ProcessManageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  background-color: ${COLOR.LIGHT_GRAY};
`;
const InfoTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;
const InfoTitle = styled.span`
  font-weight: bold;
  color: ${COLOR.FONT_BLACK};
  font-size: 16px;
`;
const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 30px;
  padding-left: calc(50% - 35px);
`;
const ProcessCardList = styled.li`
  max-width: 1000px;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  overflow-x: auto;
  //white-space: nowrap;
`;
const ProcessCardWrapper = styled.div`
  background-color: white;
  border-radius: 5px;
  min-width: 230px;
  height: 450px;
`;
const CardTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;
const CardTitle = styled.span`
  font-weight: bold;
  color: ${COLOR.FONT_BLACK};
  font-size: 12px;
`;
const ProcessType = styled.span`
  font-weight: bold;
  color: ${COLOR.PRIMARY};
  font-size: 12px;
`;
const ProcessCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${COLOR.BORDER_GRAY};
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
`;
const CradInfo = styled.div`
  display: flex;
  flex-direction: column;
  .name {
    font-weight: bold;
    font-size: 14px;
  }
  .authority {
    font-size: 12px;
    color: ${COLOR.FONT_GRAY};
  }
`;
const IncreaseBox = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dotted ${COLOR.FONT_GRAY};
  color: ${COLOR.FONT_GRAY};
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
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
    width: 70px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      font-size: 12px;
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
        color: ${COLOR.ERROR};
      }
    }
  }
`;
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 5px 20px;
`;
