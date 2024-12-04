import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { userInstance } from '../../../../api/axios';
import { getUserList, getUserListTotal } from '../../../../api/user';
import { useModal } from '../../../../hooks';
import { pageAtom } from '../../../../store/utilAtom';
import { MemberType } from '../../../../types';
import {
  Button,
  Select,
  Input,
  CheckBoxI,
  ValueNone,
  Icon,
} from '../../../atom';
import { COLOR } from '../../../constants';
import {
  Alert,
  TabMenu,
  List,
  PaginationBox,
  ListItem,
  Search,
} from '../../../molecules';

type ProcessWorkerAccountListProps = {
  idx: number;
  id: string;
  name: string;
  authorityName: string;
  createdAt: string;
};

type ProcessWorkerAuthorityListProps = {
  idx: number;
  name: string;
  count: number;
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
    };
    authority: {
      idx: number;
      name: string;
    };
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

type AddModalProps = {
  isEdit: boolean;
  processIdx: number;
  stepSort: number;
  processListData?: processStepListProps[];
  setProcessListData: React.Dispatch<
    React.SetStateAction<processStepListProps[]>
  >;
  processDetailInfo?: processDetailInfoProps;
  setProcessDetailInfo: React.Dispatch<
    React.SetStateAction<processDetailInfoProps | undefined>
  >;
};

export function ProcessAddModal({
  isEdit,
  processIdx,
  stepSort,
  processListData,
  setProcessListData,
  processDetailInfo,
  setProcessDetailInfo,
}: AddModalProps) {
  const { closeModal } = useModal();
  // 기존에 설정되어 있는 단계 값을 저장
  //페이지네이션
  const [page, setPage] = useRecoilState(pageAtom);
  //탭
  const [tabVeiw, setTabVeiw] = useState<string>('계정으로 추가');
  //검색이름
  const [nameValue, setNameValue] = useState('');
  const [checkList, setCheckList] = useState<number[]>([]);

  //const [processList, setProcessList] = useState<ProcessListProps[]>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchKeywordValue, setSearchKeywordValue] = useState<string>('');

  //프로세스 저장
  const [isProcessAlert, setIsProcessAlert] = useState(false);
  const clickProcessAlert = () => {
    setIsProcessAlert(true);
  };

  const [processList, setProcessList] = useState<processStepListProps[]>([]);
  useEffect(() => {
    if (processListData) {
      setProcessList(processListData);
    }
  }, [processListData]);
  const [processDetailList, setProcessDetailList] =
    useState<processDetailInfoProps>();
  useEffect(() => {
    if (processDetailInfo && isEdit) {
      setProcessDetailList(processDetailInfo);
    }
  }, [processDetailInfo]);
  const [selectedworkerAccountList, setselectedWorkerAccountList] = useState<
    ProcessWorkerAccountListProps[]
  >([]);
  console.log(selectedworkerAccountList);
  const [selectedworkerAuthorityList, setselectedWorkerAuthorityList] =
    useState<ProcessWorkerAuthorityListProps[]>([]);
  console.log(selectedworkerAuthorityList);

  const clickAccountListSave = () => {
    if (isEdit) {
      const updatedProcessList =
        processDetailList?.steps?.map((process) => {
          if (process.stepSort === stepSort) {
            const updatedWorkersAccount = selectedworkerAccountList.map(
              (worker) => ({
                idx: process.idx,
                workerSort: 0, // 새로 추가되는 worker의 정렬 값 설정
                createdBy: process.createdBy, // 필요하면 생성자 값 설정
                createdAt: process.createdAt, // 현재 시간 설정
                account: {
                  idx: worker.idx,
                  id: worker.id,
                  name: worker.name,
                  authorityName: worker.authorityName,
                },
                authority: {
                  idx: 0, // authority는 비워두거나 기본값 설정
                  name: '',
                },
              }),
            );

            // 기존 workers 배열과 updatedWorkers를 병합할 때, 중복되는 id를 제거
            const mergedWorkers = [
              ...process.workers,
              ...updatedWorkersAccount.filter(
                (newWorker) =>
                  !process.workers.some(
                    (existingWorker) =>
                      existingWorker.account?.idx === newWorker.account?.idx,
                  ),
              ),
            ];

            return {
              ...process,
              workers: mergedWorkers,
            };
          }
          return process; // Ensure we return the unchanged process for other steps
        }) || []; // Fallback to an empty array if steps is undefined

      setProcessDetailInfo({
        idx: processDetailList?.idx ?? 0, // idx가 undefined이면 0을 기본값으로 사용
        code: processDetailList?.code ?? '',
        companyCode: processDetailList?.companyCode ?? '',
        processName: processDetailList?.processName ?? '',
        isUse: processDetailList?.isUse ?? false,
        isDelete: processDetailList?.isDelete ?? false,
        createdBy: processDetailList?.createdBy ?? '',
        createdAt: processDetailList?.createdAt ?? '',
        lastModifiedBy: processDetailList?.lastModifiedBy ?? '', // 추가된 부분
        lastModifiedAt: processDetailList?.lastModifiedAt ?? '', // 추가된 부분
        steps: updatedProcessList, // Update only the steps property
      });
    } else {
      const updatedProcessList = processList.map((process) => {
        if (process.stepSort === stepSort) {
          // selectedworkerList에 필요한 필드를 추가하여 workers 배열에 맞게 업데이트
          const updatedWorkersAccount = selectedworkerAccountList.map(
            (worker) => ({
              idx: 0,
              workerSort: 0, // 새로 추가되는 worker의 정렬 값 설정
              createdBy: '', // 필요하면 생성자 값 설정
              createdAt: '', // 현재 시간 설정
              account: {
                idx: worker.idx,
                id: worker.id,
                name: worker.name,
                authorityName: worker.authorityName,
              },
              authority: {
                idx: 0, // authority는 비워두거나 기본값 설정
                name: '',
              },
            }),
          );

          // 기존 workers 배열과 updatedWorkers를 병합할 때, 중복되는 id를 제거
          const mergedWorkers = [
            ...process.workers,
            ...updatedWorkersAccount.filter(
              (newWorker) =>
                !process.workers.some(
                  (existingWorker) =>
                    existingWorker.account?.idx === newWorker.account?.idx,
                ),
            ),
          ];

          return {
            ...process,
            workers: mergedWorkers, // workers 배열에 필드가 추가된 worker들로 업데이트
          };
        }
        return process;
      });

      setProcessListData(updatedProcessList);
    }
    closeModal();
  };

  const clickAuthorityListSave = () => {
    if (isEdit) {
      const updatedProcessList =
        processDetailList?.steps?.map((process) => {
          if (process.stepSort === stepSort) {
            const updatedWorkersAuthority = selectedworkerAuthorityList.map(
              (worker) => ({
                idx: process.idx,
                workerSort: 0, // 새로 추가되는 worker의 정렬 값 설정
                createdBy: process.createdBy, // 필요하면 생성자 값 설정
                createdAt: process.createdAt, // 현재 시간 설정
                account: {
                  idx: 0,
                  id: '',
                  name: '',
                  authorityName: '',
                },
                authority: {
                  idx: worker.idx, // authority는 비워두거나 기본값 설정
                  name: worker.name,
                },
              }),
            );

            // 기존 workers 배열과 updatedWorkers를 병합할 때, 중복되는 id를 제거
            const mergedWorkers = [
              ...process.workers,
              ...updatedWorkersAuthority.filter(
                (newWorker) =>
                  !process.workers.some(
                    (existingWorker) =>
                      existingWorker.authority?.idx ===
                      newWorker.authority?.idx,
                  ),
              ),
            ];

            return {
              ...process,
              workers: mergedWorkers,
            };
          }
          return process; // Ensure we return the unchanged process for other steps
        }) || []; // Fallback to an empty array if steps is undefined

      setProcessDetailInfo({
        idx: processDetailList?.idx ?? 0, // idx가 undefined이면 0을 기본값으로 사용
        code: processDetailList?.code ?? '',
        companyCode: processDetailList?.companyCode ?? '',
        processName: processDetailList?.processName ?? '',
        isUse: processDetailList?.isUse ?? false,
        isDelete: processDetailList?.isDelete ?? false,
        createdBy: processDetailList?.createdBy ?? '',
        createdAt: processDetailList?.createdAt ?? '',
        lastModifiedBy: processDetailList?.lastModifiedBy ?? '', // 추가된 부분
        lastModifiedAt: processDetailList?.lastModifiedAt ?? '', // 추가된 부분
        steps: updatedProcessList, // Update only the steps property
      });
    } else {
      const updatedProcessList = processList.map((process) => {
        if (process.stepSort === stepSort) {
          // selectedworkerList에 필요한 필드를 추가하여 workers 배열에 맞게 업데이트
          const updatedWorkersAuthority = selectedworkerAuthorityList.map(
            (worker) => ({
              idx: 0,
              workerSort: 0, // 새로 추가되는 worker의 정렬 값 설정
              createdBy: '', // 필요하면 생성자 값 설정
              createdAt: '', // 현재 시간 설정
              account: {
                idx: 0,
                id: '',
                name: '',
                authorityName: '',
              },
              authority: {
                idx: worker.idx, // authority는 비워두거나 기본값 설정
                name: worker.name,
              },
            }),
          );

          // 기존 workers 배열과 updatedWorkers를 병합할 때, 중복되는 id를 제거
          const mergedWorkers = [
            ...process.workers,
            ...updatedWorkersAuthority.filter(
              (newWorker) =>
                !process.workers.some(
                  (existingWorker) =>
                    existingWorker.authority?.idx === newWorker.authority?.idx,
                ),
            ),
          ];

          return {
            ...process,
            workers: mergedWorkers, // workers 배열에 필드가 추가된 worker들로 업데이트
          };
        }
        return process;
      });

      setProcessListData(updatedProcessList);
    }
    closeModal();
  };

  const changeTab = () => {
    setPage(1);
  };
  const menuList = [
    {
      label: '계정으로 추가',
      value: '계정으로 추가',
    },
    {
      label: '권한으로 추가',
      value: '권한으로 추가',
    },
  ];
  const [processWorkerAccountList, setProcessWorkerAccountList] = useState<
    ProcessWorkerAccountListProps[]
  >([]);
  const [processWorkerAuthorityList, setProcessWorkerAuthorityList] = useState<
    ProcessWorkerAuthorityListProps[]
  >([]);

  const getProcessWorkerList = async () => {
    const res = await userInstance.get(
      `/v1/process/${processIdx === null ? 0 : processIdx}/${stepSort}/worker?searchCondition=${tabVeiw === '계정으로 추가' ? 'USER' : tabVeiw === '권한으로 추가' ? 'AUTH' : 'USER'}&searchKeyword=${searchValue}`,
    );
    //console.log(`getCompanyList 결과값`, res);
    return res;
  };

  const {
    data: processWorkerListData,
    refetch: processWorkerListRefetch,
    isFetching: processWorkderListLoading,
  } = useQuery({
    queryKey: ['get-processWorkerList'],
    queryFn: getProcessWorkerList,
    meta: {
      errorMessage: 'get-processWorkerList 에러 메세지',
    },
    //enabled: companyCoadValue !== null,
  });

  useEffect(() => {
    if (tabVeiw) {
      processWorkerListRefetch();
    }
  }, [tabVeiw, searchValue]);

  useEffect(() => {
    if (processWorkerListData) {
      setProcessWorkerAccountList(
        processWorkerListData?.data.data.processWorkerList.map(
          (el: any) => el.account,
        ),
      );
      setProcessWorkerAuthorityList(
        processWorkerListData?.data.data.processWorkerList.map(
          (el: any) => el.authority,
        ),
      );
    }
  }, [processWorkerListData]);

  // 검색 기능 함수
  const filterSearchValue = () => {
    // 쿼리 스트링 변경 로직
    setSearchKeywordValue(searchValue);
    if (searchValue == '') setSearchKeywordValue('');
  };
  const filterSearchValueEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      setSearchKeywordValue(searchValue);
    }
    if (event.key === 'Backspace') {
      setSearchKeywordValue('');
    }
  };

  const handleButtonCheck = (id: number) => {
    setCheckList((prev) =>
      prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id],
    );
  };

  const handleSelectAccountList = (account: ProcessWorkerAccountListProps) => {
    setselectedWorkerAccountList((prevWorkerArray) => {
      const workerExists = prevWorkerArray.some((w) => w.idx === account.idx);
      if (workerExists) {
        // worker가 이미 배열에 있으면 제거
        return prevWorkerArray.filter((w) => w.idx !== account.idx);
      } else {
        // worker가 없으면 추가
        return [...prevWorkerArray, account];
      }
    });
  };
  const handleSelectAuthorityList = (
    authority: ProcessWorkerAuthorityListProps,
  ) => {
    setselectedWorkerAuthorityList((prevWorkerArray) => {
      const workerExists = prevWorkerArray.some((w) => w.idx === authority.idx);
      if (workerExists) {
        // worker가 이미 배열에 있으면 제거
        return prevWorkerArray.filter((w) => w.idx !== authority.idx);
      } else {
        // worker가 없으면 추가
        return [...prevWorkerArray, authority];
      }
    });
  };

  useEffect(() => {
    if (tabVeiw === '권한으로 추가') {
      setselectedWorkerAccountList([]);
      setCheckList([]);
    } else if (tabVeiw === '계정으로 추가') {
      setselectedWorkerAuthorityList([]);
      setCheckList([]);
    }
  }, [tabVeiw]);

  return (
    <Container>
      <Wrapper>
        <Title>작업자 추가</Title>
        <TabWrapper>
          <TabMenu
            length={2}
            menu={menuList}
            width={'450px'}
            lineStyle
            selected={tabVeiw}
            setTabVeiw={setTabVeiw}
            onClickTab={changeTab}
          />
        </TabWrapper>
        {tabVeiw === '계정으로 추가' && (
          <>
            <Search
              value={searchValue}
              width={`calc(100% - 40px)`}
              height="35px"
              margin="0 20px"
              onClick={() => filterSearchValue()}
              onKeyDown={(e) => filterSearchValueEnter(e)}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              placeholder="이름, 아이디, 권한을 검색해주세요"
              maxLength={20}
              minLength={2}
            />
            {!processWorkderListLoading && processWorkerListData ? (
              <ListWrapper>
                <List margin={`10px 0`}>
                  {processWorkerAccountList.map(
                    (account: ProcessWorkerAccountListProps, i) => (
                      <ListItem
                        key={account?.id}
                        isChecked={checkList.includes(account?.idx)}
                        onClick={(e) => {
                          handleButtonCheck(account?.idx);
                          handleSelectAccountList(account);
                        }}
                      >
                        {/* <CheckBoxI
                          id={i.toLocaleString()}
                          value={account?.idx}
                          $margin={`0 5px 0 0`}
                          checked={checkList.includes(account?.idx)}
                          readOnly
                          onClick={() => handleSelectAccountList(account)}
                        /> */}
                        <ItemLayout>
                          <span>{account?.name} </span>
                          <i className="line"></i>
                          <span>{account?.id} </span>
                          <i className="line"></i>
                          <span>{account?.authorityName}</span>
                          <i className="line"></i>
                          <span>{account?.createdAt}</span>
                        </ItemLayout>
                      </ListItem>
                    ),
                  )}
                </List>
                <PaginationBox
                  itemsCountPerPage={
                    processWorkerListData.data.data.pagination.pageUnit
                  }
                  totalItemsCount={
                    processWorkerListData.data.data.pagination.totalCount
                  }
                />
              </ListWrapper>
            ) : (
              <>
                {searchKeywordValue ? (
                  <ValueNoneWrapper>
                    <ValueNone
                      info={`${searchKeywordValue} (으)로 검색결과 데이터가 없습니다`}
                    />
                  </ValueNoneWrapper>
                ) : (
                  <ValueNoneWrapper>
                    <ValueNone info={`등록된 데이터가 없습니다`} />
                  </ValueNoneWrapper>
                )}
              </>
            )}
          </>
        )}
        {tabVeiw === '권한으로 추가' && (
          <>
            <Search
              value={searchValue}
              width={`calc(100% - 40px)`}
              height="35px"
              margin="0 20px"
              onClick={() => filterSearchValue()}
              onKeyDown={(e) => filterSearchValueEnter(e)}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              placeholder="권한을 검색해주세요"
              maxLength={20}
              minLength={2}
            />
            {!processWorkderListLoading && processWorkerListData ? (
              <ListWrapper>
                <List margin={`10px 0`}>
                  {processWorkerAuthorityList.map(
                    (authority: ProcessWorkerAuthorityListProps, i) => (
                      <ListItem
                        key={authority?.idx}
                        isChecked={checkList.includes(authority?.idx)}
                        onClick={(e) => {
                          handleButtonCheck(authority?.idx);
                          handleSelectAuthorityList(authority);
                        }}
                      >
                        {/* <CheckBoxI
                          id={i.toLocaleString()}
                          value={authority?.idx}
                          $margin={`0 5px 0 0`}
                          checked={checkList.includes(authority?.idx)}
                          readOnly
                        /> */}
                        <ItemLayout>
                          <span>{authority?.name} </span>
                          <i className="line"></i>
                          <span>{authority?.count} </span>
                        </ItemLayout>
                      </ListItem>
                    ),
                  )}
                </List>
                <PaginationBox
                  itemsCountPerPage={
                    processWorkerListData.data.data.pagination.pageUnit
                  }
                  totalItemsCount={
                    processWorkerListData.data.data.pagination.totalCount
                  }
                />
              </ListWrapper>
            ) : (
              <>
                {searchKeywordValue ? (
                  <ValueNoneWrapper>
                    <ValueNone
                      info={`${searchKeywordValue} (으)로 검색결과 데이터가 없습니다`}
                    />
                  </ValueNoneWrapper>
                ) : (
                  <ValueNoneWrapper>
                    <ValueNone info={`등록된 데이터가 없습니다`} />
                  </ValueNoneWrapper>
                )}
              </>
            )}
          </>
        )}
      </Wrapper>
      <ButtonWrapper>
        <Button width="100px" height="40px" onClick={() => closeModal()}>
          취소
        </Button>
        <Button
          width="100px"
          height="40px"
          onClick={clickProcessAlert}
          $filled
          disabled={
            selectedworkerAccountList.length === 0 &&
            selectedworkerAuthorityList.length === 0
          }
        >
          확인
        </Button>
      </ButtonWrapper>
      {isProcessAlert && (
        <Alert
          description="진행 중인 제작 프로세스가 초기화될 수 있습니다. 그래도 변경하시겠습니까?"
          isAlertOpen={isProcessAlert}
          action="확인"
          onClose={() => setIsProcessAlert(false)}
          onClick={() =>
            tabVeiw === '계정으로 추가'
              ? clickAccountListSave()
              : clickAuthorityListSave()
          }
        ></Alert>
      )}
    </Container>
  );
}
const Container = styled.div`
  max-width: 700px;
  min-width: 600px;
  min-height: 850px;
  overflow: hidden;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Wrapper = styled.div``;
const Title = styled.strong`
  font-size: 20px;
  width: 100%;
  display: block;
  font-weight: bold;
  text-align: left;
  padding: 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;
const TabWrapper = styled.div`
  width: 100%;
  padding: 10px 0;
  margin-left: 20px;
  display: flex;
  justify-content: space-between;
`;
const ListWrapper = styled.div`
  padding: 0 20px;
`;
const ItemLayout = styled.span`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  > span {
    display: flex;
    min-width: 20%;
    justify-content: space-around;
    flex-wrap: wrap;
    word-break: break-all;
  }
  .line {
    width: 1px;
    height: 15px;
    background-color: ${COLOR.BORDER_GRAY};
  }
`;
const ValueNoneWrapper = styled.div`
  padding: 50px;
  margin-top: 10px;
`;
const ButtonWrapper = styled.div`
  background-color: #f1f1f1;
  padding: 10px 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;
