import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { quizService } from '../../api/axios';
import { MathViewer, ValueNone } from '../../components';
import { QuizListType } from '../../types';

type QuizPreviewProps = {
  list?: any[];
};

export function QuizPreview() {
  const [sortedList, setSortedList] = useState<QuizListType[]>();
  const [list, setList] = useState<QuizListType[]>();
  const location = useLocation();
  const navigate = useNavigate();

  //iframe 데이터 통신시
  const receiveMessage = (event: any) => {
    // 불필요한 react-devtools 메세지 이벤트 차단
    if (/^react-devtools/gi.test(event.data.source)) {
      return;
    }
    const { type } = event.data;
    // if (type === 'BOOL')
  };

  // 부모 로컬스토리지에서 데이터 가져오기
  const getLocalData = () => {
    const data = localStorage.getItem('sendData');
    let sendData;
    if (data) sendData = JSON.parse(data);

    console.log('데이터 조회', sendData && sendData.data);
    setList(sendData.data);
    // setSortedList() // 문항데이터 넣기

    // 로컬스토리지 값 다받은 뒤 초기화
    window.opener.localStorage.clear();
  };

  const getQuiz = async () => {
    const idxList = list && list.join(',');
    const res = await quizService.get(`/v1/quiz/${idxList}`);
    return res.data.data;
  };
  const {
    data: quizData,
    isLoading,
    error: quizDataError,
    refetch: quizDataRefetch,
  } = useQuery({
    queryKey: ['get-idx-quizList'],
    queryFn: getQuiz,
    meta: {
      errorMessage: 'get-idx-quizList 에러 메세지',
    },
  });

  useEffect(() => {
    getLocalData();
  }, []);

  useEffect(() => {
    quizDataRefetch();
  }, [list]);

  useEffect(() => {
    if (quizData) setSortedList(quizData.quizList);
  }, [quizData]);

  return (
    <Container>
      <MathViewerWrapper>
        {sortedList && sortedList[sortedList.length - 1]?.quizItemList ? (
          sortedList[sortedList.length - 1]?.quizItemList?.map((el) => (
            <div key={`${el?.code} quizItemList sortedList`}>
              {[
                'TITLE',
                'QUESTION',
                'EXAMPLE',
                'ANSWER',
                'TIP',
                'COMMENTARY',
                'HINT',
              ].includes(el?.type) &&
                el?.content && <MathViewer data={el.content}></MathViewer>}
            </div>
          ))
        ) : (
          <>
            <ValueNone info="등록된 데이터가 없습니다" textOnly />
          </>
        )}
      </MathViewerWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -40px;
  position: relative;
`;

const MathViewerWrapper = styled.div`
  padding: 20px;
`;
