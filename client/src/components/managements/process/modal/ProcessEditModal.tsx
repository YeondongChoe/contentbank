import * as React from 'react';
import { useState, useEffect } from 'react';

import styled from 'styled-components';

import { Alert } from '../../../../components/molecules';
import { useModal } from '../../../../hooks';
import { Button, Select } from '../../../atom';
import { COLOR } from '../../../constants';

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

type EditModalProps = {
  isEdit: boolean;
  processListData?: processStepListProps[];
  setProcessListData: React.Dispatch<
    React.SetStateAction<processStepListProps[]>
  >;
  processDetailInfo?: processDetailInfoProps;
  setProcessDetailInfo: React.Dispatch<
    React.SetStateAction<processDetailInfoProps | undefined>
  >;
};

export function ProcessEditModal({
  processListData,
  setProcessListData,
  processDetailInfo,
  setProcessDetailInfo,
  isEdit,
}: EditModalProps) {
  const selectList = [
    {
      name: '검수',
    },
    {
      name: '편집',
    },
  ];
  const { closeModal } = useModal();
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
  //프로세스 저장
  const [isProcessAlert, setIsProcessAlert] = useState(false);
  //확인 클릭시 알람창 띄우기
  const clickSaveAlert = () => {
    setIsProcessAlert(true);
  };
  const increaseButtonHandler = () => {
    const data = {
      stepName: 'REVIEW',
      idx: processList.length + 1,
      stepSort: 0,
      createdBy: '',
      createdAt: '',
      lastModifiedBy: '',
      lastModifiedAt: '',
      workers: [],
    };
    if (isEdit) {
      setProcessDetailList(
        (prev) =>
          prev
            ? {
                ...prev, // 기존 값 유지
                steps: [
                  ...(prev.steps || []), // 기존 steps 유지 (없으면 빈 배열 사용)
                  {
                    stepName: 'REVIEW',
                    idx: (prev.steps?.length || 0) + 1, // steps 배열 길이에 따라 idx 설정
                    stepSort: (prev.steps?.length || 0) + 1,
                    createdBy: '',
                    createdAt: '',
                    lastModifiedBy: '',
                    lastModifiedAt: '',
                    workers: [],
                  },
                ],
              }
            : undefined, // prev가 undefined인 경우 그대로 undefined 반환
      );
    } else {
      setProcessList((prev) => [...prev, data]);
    }
  };
  const decreaseButtonHandler = () => {
    if (isEdit) {
      setProcessDetailList(
        (prev) =>
          prev
            ? {
                ...prev,
                steps: prev.steps.slice(0, -1), // steps 배열에서 마지막 항목 제거
              }
            : prev, // prev가 undefined일 경우 그대로 반환
      );
    } else {
      setProcessList((prev) => prev.slice(0, -1));
    }
  };

  const handleClickSelect = (name: string, index: number) => {
    if (isEdit) {
      setProcessDetailList(
        (pre) =>
          pre
            ? {
                ...pre,
                steps: pre.steps.map(
                  (step) =>
                    step.stepSort === index + 1 // 조건을 확인
                      ? { ...step, stepName: name } // stepName 업데이트
                      : step, // 조건에 맞지 않으면 그대로 반환
                ),
              }
            : pre, // pre가 undefined일 경우 그대로 반환
      );
    } else {
      setProcessList((pre) =>
        pre.map((list, i) =>
          i === index ? { ...list, stepName: name } : list,
        ),
      );
    }
  };

  const handleClickSave = () => {
    if (isEdit) {
      setProcessDetailInfo(processDetailList);
    } else {
      setProcessListData(processList);
    }
    closeModal();
  };
  return (
    <Container>
      <Title>단계 수정</Title>
      <ListWrapper>
        <DefaultSelect>제작</DefaultSelect>
        <Arrow>&gt;</Arrow>
        {isEdit ? (
          <>
            {processDetailList?.steps.slice(1).map((process, i) => (
              <React.Fragment key={i}>
                <Select
                  width="120px"
                  height="35px"
                  defaultValue={
                    process.stepName === 'BUILD'
                      ? '제작'
                      : process.stepName === 'EDITING'
                        ? '편집'
                        : process.stepName === 'REVIEW'
                          ? '검수'
                          : ''
                  }
                  isnormalizedOptions
                  onSelect={(e) =>
                    handleClickSelect(
                      e.currentTarget.value === '편집'
                        ? 'EDITING'
                        : e.currentTarget.value === '검수'
                          ? 'REVIEW'
                          : '',
                      i + 1,
                    )
                  }
                  options={selectList}
                />
                {/* 마지막에는 > 추가 안함 */}
                {i < processDetailList.steps.slice(1).length - 1 && (
                  <Arrow>&gt;</Arrow>
                )}
              </React.Fragment>
            ))}
          </>
        ) : (
          <>
            {processList.slice(1).map((process, i) => (
              <React.Fragment key={i}>
                <Select
                  width="120px"
                  height="35px"
                  defaultValue={
                    process.stepName === 'BUILD'
                      ? '제작'
                      : process.stepName === 'EDITING'
                        ? '편집'
                        : process.stepName === 'REVIEW'
                          ? '검수'
                          : ''
                  }
                  isnormalizedOptions
                  onSelect={(e) =>
                    handleClickSelect(
                      e.currentTarget.value === '편집'
                        ? 'EDITING'
                        : e.currentTarget.value === '검수'
                          ? 'REVIEW'
                          : '',
                      i + 1,
                    )
                  }
                  options={selectList}
                />
                {/* 마지막에는 > 추가 안함 */}
                {i < processList.slice(1).length - 1 && <Arrow>&gt;</Arrow>}
              </React.Fragment>
            ))}
          </>
        )}

        <ButtonBox>
          <IncreaseButton onClick={increaseButtonHandler}>+</IncreaseButton>
          <DecreaseButton onClick={decreaseButtonHandler}>-</DecreaseButton>
        </ButtonBox>
      </ListWrapper>
      <Subscription>
        *&apos;제작&apos;은 문항에 대한 등록/수정/조회, &apos;검수&apos;는 조회,
        &apos;편집&apos;은 수정/조회의 권한을 한명에게만 부여합니다.
      </Subscription>
      <Subscription>
        *최초 단계인 &apos;제작&apos;은 변경할 수 없습니다.
      </Subscription>
      <ButtonWrapper>
        <Button width="100px" height="40px" onClick={() => closeModal()}>
          취소
        </Button>
        <Button width="100px" height="40px" onClick={clickSaveAlert} $filled>
          확인
        </Button>
      </ButtonWrapper>
      {isProcessAlert && (
        <Alert
          description="진행 중인 제작 프로세스가 초기화될 수 있습니다. 그래도 변경하시겠습니까?"
          isAlertOpen={isProcessAlert}
          action="확인"
          onClose={() => setIsProcessAlert(false)}
          onClick={() => handleClickSave()}
        ></Alert>
      )}
    </Container>
  );
}
const Container = styled.div`
  max-width: 700px;
  min-width: 600px;
  overflow: hidden;
  border-radius: 20px;
`;
const Title = styled.strong`
  font-size: 20px;
  width: 100%;
  display: block;
  font-weight: bold;
  text-align: left;
  padding: 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  //height: 100px;
  gap: 5px;
  padding: 15px 20px;
  background-color: #f1f1f1;
  margin: 0 20px 10px 20px;
  //align-items: center;
`;
const DefaultSelect = styled.div`
  width: 120px;
  height: 35px;
  font-size: 14px;
  background-color: ${COLOR.FONT_GRAY};
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding-left: 15px;
`;
const Arrow = styled.span`
  display: flex;
  align-items: center;
`;
const ButtonBox = styled.div`
  display: flex;
  gap: 5px;
`;
const IncreaseButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 35px;
  border: 1px solid ${COLOR.PRIMARY};
  color: ${COLOR.PRIMARY};
  cursor: pointer;
`;
const DecreaseButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 35px;
  border: 1px solid ${COLOR.ERROR};
  color: ${COLOR.ERROR};
  cursor: pointer;
`;
const Subscription = styled.p`
  font-size: 12px;
  color: ${COLOR.FONT_GRAY};
  padding: 0 20px;
`;
const ButtonWrapper = styled.div`
  background-color: #f1f1f1;
  padding: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;
