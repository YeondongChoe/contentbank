import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Loader, MathViewer, ValueNone } from '../../components';
import { QuizListType } from '../../types';

export function QuizPreview() {
  const [sortedList, setSortedList] = useState<QuizListType[]>();
  // const [list, setList] = useState<QuizListType>();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const parseJson = (str: string | null) => {
      try {
        return str ? JSON.parse(str) : null;
      } catch (e) {
        console.error('Parsing error on', str);
        return null;
      }
    };
    const quizData: QuizListType = {
      code: queryParams.get('code') || '',
      createdAt: queryParams.get('createdAt') || '',
      createdBy: queryParams.get('createdBy') || '',
      idx: parseInt(queryParams.get('idx') || '0', 10),
      isDelete: queryParams.get('isDelete') === 'true',
      isUse: queryParams.get('isUse') === 'true',
      isFavorite: queryParams.get('isFavorite') === 'true',
      lastArticle: parseJson(queryParams.get('lastArticle')),
      lastModifiedAt: queryParams.get('lastModifiedAt') || '',
      lastModifiedBy: queryParams.get('lastModifiedBy') || '',
      type: queryParams.get('type') || '',
      userKey: queryParams.get('userKey') || '',
      quizCategoryList: parseJson(queryParams.get('quizCategoryList')) || [],
      quizItemList: parseJson(queryParams.get('quizItemList')) || [],
      quizList: parseJson(queryParams.get('quizList')) || [],
    };

    setSortedList([quizData]);
  }, [location.search]);

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
  // const getLocalData = () => {
  //   const data = localStorage.getItem('sendData');
  //   let sendData;
  //   if (data) sendData = JSON.parse(data);

  //   console.log('데이터 조회', sendData && sendData.data);
  //   setList(sendData.data);
  //   // setSortedList() // 문항데이터 넣기

  //   // 로컬스토리지 값 다받은 뒤 초기화
  //   window.opener.localStorage.clear();
  // };

  // useEffect(() => {
  //   getLocalData();
  // }, []);

  // useEffect(() => {
  //   quizDataRefetch();
  // }, [list]);

  // useEffect(() => {
  //   if (quizData) setSortedList(quizData.quizList);
  // }, [quizData]);

  useEffect(() => {}, [sortedList]);

  return (
    <Container>
      {sortedList?.length == 0 && <Loader />}
      <MathViewerWrapper>
        {sortedList && sortedList[sortedList.length - 1]?.quizItemList ? (
          sortedList[sortedList.length - 1]?.quizItemList?.map((el) => (
            <div key={`${el?.code} quizItemList sortedList`}>
              {[
                'BIG',
                'TEXT',
                'QUESTION',
                'SMALL',
                'EXAMPLE',
                'CHOICES',
                'ANSWER',
                'COMMENTARY',
                'HINT',
                'CONCEPT',
                'TITLE',
                'TIP',
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
