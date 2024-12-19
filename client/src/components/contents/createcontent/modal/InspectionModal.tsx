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

type InspectionModalProps = {
  item: any;
  type: string;
  onClick: () => void;
  setComment: React.Dispatch<React.SetStateAction<string>>;
};

export function InspectionModal({
  item,
  type,
  onClick,
  setComment,
}: InspectionModalProps) {
  const { closeModal } = useModal();

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

  return (
    <Container>
      <Title>
        {type == '보류' && '보류사유 *'}
        {type == '반려' && '반려사유 *'}
        {type == '승인' && '검수의견'}
      </Title>
      <Textarea onChange={(e) => setComment(e.currentTarget.value)}></Textarea>
      <ButtonWrapper>
        <Button width="100px" height="40px" onClick={() => closeModal()}>
          취소
        </Button>
        <Button width="100px" height="40px" onClick={onClick} $filled>
          확인
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  max-width: 600px;
  min-width: 500px;
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

const Textarea = styled.textarea`
  width: calc(100% - 40px);
  height: 100px;
  font-size: 14px;
  border: 1px solid ${COLOR.BORDER_GRAY};
  padding: 10px;
  resize: none;
  border-radius: 5px;
  margin: 20px;
`;
