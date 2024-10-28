import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { SlOptionsVertical, SlPrinter } from 'react-icons/sl';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactToPrint from 'react-to-print';
import { styled } from 'styled-components';

import { quizService } from '../../../../api/axios';
import { Button } from '../../../../components/atom';
import { ListItem } from '../../../../components/molecules';
import { useModal } from '../../../../hooks';
import { COLOR } from '../../../constants';

type ProcessModalProps = {
  list: any[];
};

type ProcessListProps = {
  title: string;
  type: string;
  card: { name: string; id: string; authority: string }[];
};

export function ProcessListModal({ list }: ProcessModalProps) {
  const { closeModal } = useModal();
  const [processList, setProcessList] = useState<ProcessListProps[]>();
  const [checkList, setCheckList] = useState<string[]>([]);
  // const getQuiz = async () => {
  //   const res = await quizService.get(`/v1/quiz/${idxList}`);
  //   // console.log('list data----------', res);
  //   return res.data.data;
  // };
  // const {
  //   data: quizData,
  //   isLoading,
  //   error: quizDataError,
  //   refetch: quizDataRefetch,
  // } = useQuery({
  //   queryKey: ['get-idx-quizList'],
  //   queryFn: getQuiz,
  //   meta: {
  //     errorMessage: 'get-idx-quizList 에러 메세지',
  //   },
  // });
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

  useEffect(() => {
    setProcessList([
      {
        title: '프로세스명01',
        type: 'string',
        card: [{ name: 'string', id: 'string', authority: 'string' }],
      },
      {
        title: '프로세스명02',
        type: 'string',
        card: [{ name: 'string', id: 'string', authority: 'string' }],
      },
      {
        title: '프로세스명03',
        type: 'string',
        card: [{ name: 'string', id: 'string', authority: 'string' }],
      },
      {
        title: '프로세스명04',
        type: 'string',
        card: [{ name: 'string', id: 'string', authority: 'string' }],
      },
      {
        title: '프로세스명05',
        type: 'string',
        card: [{ name: 'string', id: 'string', authority: 'string' }],
      },
    ]);
  }, []);
  return (
    <Container>
      <Title>프로세스 리스트</Title>
      <ScrollWrapper>
        <PerfectScrollbar>
          <List>
            {processList?.map((list) => (
              <ListItem
                key={list.title as string}
                isChecked={checkList.includes(list.title)}
                onClick={(e) => handleButtonCheck(e, list.title)}
              >
                <ItemLayout>
                  <span>{list.title}</span>
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
        <Button width="100px" height="40px" onClick={() => {}} $filled>
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
