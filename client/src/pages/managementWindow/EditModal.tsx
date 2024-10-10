import * as React from 'react';
import { useState, useEffect } from 'react';

import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { ItemSelectProps, AlertBar, Label, Input } from '../../components/atom';
import { COLOR } from '../../components/constants';
import { Alert } from '../../components/molecules/alert';
import { useModal } from '../../hooks';
import { QuizListType } from '../../types';
import { postRefreshToken } from '../../utils/tokenHandler';

export function EditModal({
  sortedQuizList,
}: {
  sortedQuizList: QuizListType[];
}) {
  const { closeModal } = useModal();

  const [isNameError, setIsNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');

  const { control, setValue, watch } = useForm();
  const Name = watch('name');
  const Comment = watch('comment');

  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);

  const closeSuccessAlert = () => {
    setIsSuccessAlertOpen(false);
  };

  // 유저 정보 변경 버튼
  const submitEdit = () => {
    if (Name == '') {
      setIsNameError(true);
      setNameErrorMessage('필수 항목을 입력해주세요');
      return;
    }
  };

  return (
    <Container>
      <AlertBar
        type="success"
        isAlertOpen={isSuccessAlertOpen}
        closeAlert={closeSuccessAlert}
        message={'정상 처리되었습니다.'}
      />

      <Title>문항 수정</Title>
      <p>총 {sortedQuizList.length}문항에 대해</p>
      <p>변경할 분류</p>
      <p>변경할 내용 (현재 검색어 : 부채꼴)</p>
    </Container>
  );
}

const Container = styled.div`
  max-width: 700px;
  min-width: 600px;
  padding: 30px;
  padding-top: 0;
`;

const Title = styled.strong`
  font-size: 20px;
  width: 100%;
  display: block;
  font-weight: bold;
  text-align: left;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
`;

const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 50px;
  padding-left: calc(50% - 35px);
`;
