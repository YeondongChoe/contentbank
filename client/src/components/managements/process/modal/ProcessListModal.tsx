import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import {
  useQuery,
  useMutation,
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';
import { SlOptionsVertical, SlPrinter } from 'react-icons/sl';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactToPrint from 'react-to-print';
import { styled } from 'styled-components';

import { userInstance, quizService } from '../../../../api/axios';
import { Button, openToastifyAlert } from '../../../../components/atom';
import { ListItem } from '../../../../components/molecules';
import { useModal } from '../../../../hooks';
import { postRefreshToken } from '../../../../utils/tokenHandler';
import { COLOR } from '../../../constants';

type ProcessModalProps = {
  list: any[];
  refech?: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
};

type ProcessListProps = {
  idx: number;
  code: string;
  name: string;
};

export function ProcessListModal({ list, refech }: ProcessModalProps) {
  const { closeModal } = useModal();

  const [processList, setProcessList] = useState<ProcessListProps[]>();
  const [processCode, setProcessCode] = useState<string | null>(null);
  const [processIdxList, setProcessIdxList] = useState<number[]>([]);
  const [checkList, setCheckList] = useState<string[]>([]);
  console.log('processIdxList', processIdxList);
  console.log('checkList', checkList);

  useEffect(() => {
    const idxList = list.map((quiz) => quiz.idx);
    if (idxList) setProcessIdxList(idxList);
  }, [list]);

  console.log('processList', processList);

  //프로세스 리스트 불러오기 api
  const getProcessNameList = async () => {
    const res = await userInstance.get(`/v1/process/build`);
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
      setProcessList(processNameListData?.data.data.list);
  }, [processNameListData]);

  const postProcess = async () => {
    const data = {
      processCode: processCode,
      idxList: processIdxList,
    };
    return await quizService.put(`/v1/process/req`, data);
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
      //성공 시 리스트 리패치
      processNameListRefetch();
      //저장 알람
      openToastifyAlert({
        type: 'success',
        text: '저장되었습니다.',
      });
      refech && refech();
      setProcessCode(null);
      setProcessIdxList([]);
      closeModal();
    },
  });

  const handleButtonCheck = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    const target = e.currentTarget.childNodes[0].childNodes[0]
      .childNodes[0] as HTMLInputElement;
    if (!target.checked) {
      setCheckList([id]);
    } else {
      setCheckList([]);
    }
  };

  return (
    <Container>
      <Title>프로세스 리스트</Title>
      <ScrollWrapper>
        <PerfectScrollbar>
          <List>
            {processList?.map((list) => (
              <ListItem
                key={list.idx}
                isChecked={checkList.includes(list.name)}
                onClick={(e) => {
                  handleButtonCheck(e, list.name);
                  setProcessCode(list.code);
                }}
              >
                <ItemLayout>
                  <span>{list.name}</span>
                </ItemLayout>
              </ListItem>
            ))}
          </List>
        </PerfectScrollbar>
      </ScrollWrapper>
      <ButtonWrapper>
        <Button width="100px" height="40px" onClick={() => closeModal()}>
          취소
        </Button>
        <Button
          width="100px"
          height="40px"
          onClick={() => postProcessData()}
          $filled
        >
          확인
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  max-width: 500px;
  min-width: 400px;
  max-height: 600px;
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
  //margin-bottom: 10px;
`;
const ButtonWrapper = styled.div`
  background-color: #f1f1f1;
  padding: 20px;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
`;

const ScrollWrapper = styled.div`
  overflow-y: auto;
  height: calc(50vh - 100px);
  width: 100%;
  /* background-color: ${COLOR.LIGHT_GRAY}; */

  .line {
    border-top: 1px solid ${COLOR.LIGHT_GRAY};
    margin: 10px 0;

    &.bottom_text {
      font-size: 13px;
      padding-top: 2px;
    }
  }
`;
const List = styled.div`
  padding: 10px;
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
`;
