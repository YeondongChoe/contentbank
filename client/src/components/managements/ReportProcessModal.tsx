import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { styled } from 'styled-components';

import { Button, Label, Select } from '../../components/atom';
import { useModal } from '../../hooks';
import { COLOR } from '../constants';

export function ReportProcessModal() {
  const { closeModal } = useModal();
  const [selectedValue, setSelectedValue] = useState('');
  const [commentValue, setCommentValue] = useState('');
  const [reportType, setReportType] = useState<
    {
      id: string;
      label: string;
      value: string;
    }[]
  >([
    {
      id: '단원·유형 분류 오류',
      label: '단원·유형 분류 오류',
      value: '단원·유형 분류 오류',
    },
    {
      id: '난이도 및 문항타입 오류',
      label: '난이도 및 문항타입 오류',
      value: '난이도 및 문항타입 오류',
    },
    {
      id: '이미지 및 그래프/도표 오류',
      label: '이미지 및 그래프/도표 오류',
      value: '이미지 및 그래프/도표 오류',
    },
    {
      id: '오탈자',
      label: '오탈자',
      value: '오탈자',
    },
    {
      id: '기타',
      label: '기타',
      value: '기타',
    },
  ]);

  const submitReportProcess = () => {
    //해당 신고내역에 처리된 상태 보내기
    closeModal();
  };

  return (
    <Container>
      <Title>처리완료 상태 등록</Title>
      <InputWrapper>
        <Label width="100px" fontSize="15px" value="처리 유형" />
        <Select
          width={`100%`}
          height="50px"
          padding="5px 0px 0px 0px"
          defaultValue={'처리유형을 선택해주세요'}
          options={reportType}
          setSelectedValue={setSelectedValue}
        />
      </InputWrapper>
      <InputWrapper>
        <Label width="100px" fontSize="15px" value="처리 내용" />
        <div>
          <Textarea
            onChange={(e) => {
              setCommentValue(e.target.value);
            }}
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
          onClick={() => submitReportProcess()}
          $padding="10px"
          height={'40px'}
          fontSize="16px"
          $filled
          cursor
        >
          <span>등록</span>
        </Button>
      </ButtonGroup>
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
