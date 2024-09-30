import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { styled } from 'styled-components';

import { quizService } from '../../api/axios';
import { useModal } from '../../hooks';
import { Button, Label, Select, openToastifyAlert } from '../atom';
import { COLOR } from '../constants';
import { Alert } from '../molecules';

type ReportProcessType = {
  registorReport?: boolean;
  reportIdx?: number;
};

export function ReportProcessModal({
  registorReport,
  reportIdx,
}: ReportProcessType) {
  const { closeModal } = useModal();
  const [content, setContent] = useState<string>();
  const [commentValue, setCommentValue] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [reportType, setReportType] = useState<
    {
      id: string;
      label: string;
      name: string;
    }[]
  >([
    {
      id: '단원·유형 분류 오류',
      label: '단원·유형 분류 오류',
      name: '단원·유형 분류 오류',
    },
    {
      id: '난이도 및 문항타입 오류',
      label: '난이도 및 문항타입 오류',
      name: '난이도 및 문항타입 오류',
    },
    {
      id: '이미지 및 그래프/도표 오류',
      label: '이미지 및 그래프/도표 오류',
      name: '이미지 및 그래프/도표 오류',
    },
    {
      id: '오탈자',
      label: '오탈자',
      name: '오탈자',
    },
    {
      id: '기타',
      label: '기타',
      name: '기타',
    },
  ]);
  // 문항 신고
  const postReportQuiz = async (data: any) => {
    return await quizService.post(`/v1/report`, data);
  };

  const { mutate: postReportQuizData } = useMutation({
    mutationFn: postReportQuiz,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
    },
    onSuccess: (response) => {
      openToastifyAlert({
        type: 'success',
        text: response.data.message,
      });
      closeModal();
    },
  });

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent(value);
  };

  console.log(content);
  const submitReportProcess = () => {
    const data = {
      reportType: registorReport ? 'REPORT' : 'ANSWER',
      idx: reportIdx,
      type: content,
      content: commentValue,
    };
    if (content === undefined) {
      openToastifyAlert({
        type: 'error',
        text: '신고유형을 선택해주세요',
      });
    } else {
      postReportQuizData(data);
    }

    //해당 신고내역에 처리된 상태 보내기
  };

  return (
    <Container>
      <Title>{registorReport ? '문항 신고' : '처리완료 상태 등록'}</Title>
      <InputWrapper>
        <Label
          width="100px"
          fontSize="15px"
          value={registorReport ? '신고 유형' : '처리 유형'}
        />
        <Select
          width={`100%`}
          height="50px"
          padding="5px 0px 0px 0px"
          defaultValue={
            registorReport
              ? '신고유형을 선택해주세요'
              : '처리유형을 선택해주세요'
          }
          options={reportType}
          isnormalizedOptions
          onSelect={(event) => selectCategoryOption(event)}
        />
      </InputWrapper>
      <InputWrapper>
        <Label
          width="100px"
          fontSize="15px"
          value={registorReport ? '신고 내용' : '처리 내용'}
        />
        <div>
          <Textarea
            onChange={(e) => {
              setCommentValue(e.target.value);
            }}
            maxLength={1000}
          />
        </div>
      </InputWrapper>
      <ButtonGroup>
        <Button
          buttonType="button"
          onClick={() => closeModal()}
          $padding="10px"
          height={'40px'}
          fontSize="16px"
          $border
          cursor
        >
          <span>취소</span>
        </Button>
        <Button
          buttonType="button"
          onClick={() => setIsAlertOpen(true)}
          $padding="10px"
          height={'40px'}
          fontSize="16px"
          $filled
          cursor
        >
          <span>등록</span>
        </Button>
      </ButtonGroup>

      <Alert
        top="calc(50% - 100px)"
        isAlertOpen={isAlertOpen}
        description={'해당 문항을 신고하시겠습니까?'}
        subDescription={
          '신고 후 해당 문항은 리스트에서 사라지며, 취소는 불가합니다.'
        }
        action="확인"
        isWarning={true}
        onClick={() => submitReportProcess()}
        onClose={() => setIsAlertOpen(false)}
      />
    </Container>
  );
}

const Container = styled.div`
  padding: 0 40px;
  padding-bottom: 40px;
  width: 100%;
  min-width: 400px;
`;
const Title = styled.strong`
  font-size: 22px;
  width: 100%;
  display: block;
  font-weight: normal;
  text-align: center;
  padding-bottom: 20px;
`;
const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;

const InputWrapper = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding-bottom: 20px;

  > div {
    width: calc(100% - 100px);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  font-size: 14px;
  border: 1px solid ${COLOR.BORDER_GRAY};
  padding: 10px;
  resize: none;
  border-radius: 5px;
`;
