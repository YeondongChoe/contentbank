import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { quizService } from '../../api/axios';
import { Loader, MathViewer, ValueNone } from '../../components';
import { QuizListType } from '../../types';

export function QuizPreview() {
  const [sortedList, setSortedList] = useState<QuizListType>();

  const location = useLocation();

  const search = location.search;
  console.log('search', search);
  const idx = search.split('idx=')[1];
  console.log('idx', idx);

  const getQuiz = async () => {
    const res = await quizService.get(`/v1/quiz/${idx}`);
    return res.data.data;
  };
  const {
    data: quizData,
    refetch: quizDataRefetch,
    isLoading,
  } = useQuery({
    queryKey: ['get-idx-quizList'],
    queryFn: getQuiz,
    meta: {
      errorMessage: 'get-idx-quizList 에러 메세지',
    },
    enabled: !!idx,
  });

  useEffect(() => {
    console.log('quizData----------, ', quizData);
    if (quizData && quizData.quizList) {
      setSortedList(quizData.quizList[0]);
    }
  }, [quizData]);

  useEffect(() => {}, []);

  useEffect(() => {
    // console.log('sortedList----------, ', sortedList);
  }, [sortedList]);

  return (
    <Container>
      {isLoading && quizData && <Loader />}
      <MathViewerWrapper>
        {quizData && sortedList?.quizItemList ? (
          sortedList?.quizItemList?.map((el) => (
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
                el?.content && <MathViewer data={el.content}></MathViewer>}
              {Array.isArray(el?.content) && (
                <>
                  {el.content.map((item, index) => (
                    <MathViewer key={index}>{item}</MathViewer>
                  ))}
                </>
              )}
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
