import * as React from 'react';
import { useState, useEffect } from 'react';

import styled from 'styled-components';

import { Select } from '../../components/atom/select';

export function ContentInformationChange() {
  const [didMount, setDidMount] = useState(false);
  let mountCount = 1;

  const [content, setContent] = useState({
    curriculum: '',
    schoolLevel: '',
    schoolYear: '',
    semester: '',
    unitMajor: '',
    unitType: '',
    serviced: '',
  });

  const category = [
    {
      id: '1',
      label: '개정과정',
      value: '1',
      options: [
        { id: '1', label: '2015학년', value: '1' },
        { id: '2', label: '2018학년', value: '2' },
        { id: '3', label: '2020학년', value: '3' },
      ],
    },
    {
      id: '2',
      label: '학교',
      value: '2',
      options: [
        { id: '1', label: '초등', value: '1' },
        { id: '2', label: '중등', value: '2' },
        { id: '3', label: '고등', value: '3' },
      ],
    },
    {
      id: '3',
      label: '학년',
      value: '3',
      options: [
        { id: '1', label: '초등1', value: '1' },
        { id: '2', label: '초등2', value: '2' },
        { id: '3', label: '중등1', value: '3' },
        { id: '4', label: '중등2', value: '4' },
        { id: '5', label: '고등1', value: '5' },
        { id: '6', label: '고등2', value: '6' },
      ],
    },
    {
      id: '4',
      label: '학기',
      value: '4',
      options: [
        { id: '1', label: '1학기', value: '1' },
        { id: '2', label: '2학기', value: '2' },
      ],
    },
    {
      id: '5',
      label: '대분류',
      value: '5',
      options: [
        {
          id: '1',
          label: '일차부등식 소분류를 연습해봅시다 초등학교 친구들',
          value: '1',
        },
        { id: '2', label: '일차부등식 중분류', value: '2' },
        { id: '3', label: '일차부등식 대분류', value: '3' },
      ],
    },
    {
      id: '6',
      label: '문항타입',
      value: '6',
      options: [
        { id: '1', label: '객관식', value: '1' },
        { id: '2', label: '주관식', value: '2' },
        { id: '3', label: '서술형', value: '3' },
      ],
    },
    {
      id: '7',
      label: '오픈여부',
      value: '7',
      options: [
        { id: '1', label: '활성화', value: '1' },
        { id: '2', label: '비활성화', value: '2' },
      ],
    },
  ];

  const selectCategory = (
    fieldName: string,
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setContent((prevContent) => ({
      ...prevContent,
      [fieldName]: event.target.value,
    }));
  };

  useEffect(() => {
    mountCount++;
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      //console.log('select bar list 불러오는 함수');
    }
  }, [didMount]);

  return (
    <Container>
      <SelectWrapper>
        {category.map((el) => (
          <Select
            width="120px"
            height="40px"
            value={el.value}
            defaultValue={el.label}
            onChange={(e) => selectCategory(el.value, e)}
            key={el.label}
            options={el.options}
          />
        ))}
      </SelectWrapper>
      <ContentBox>
        <div>아이텍에서 만들어야할거같은 느낌</div>
        <div>선택된 항목이 있으면 보여주기</div>
        <div>선택된 항목이 없으면 보여주지 않기</div>
        <div>선택된 항목이 있더라도 찾기했을때는 찾은 항목으로 보여주지</div>
        <div>항목을 눌렀을 때 정보를 가져오는 API 연결해서 우측에 보여주기</div>
      </ContentBox>
    </Container>
  );
}
const Container = styled.div``;
const SelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 40px;
  gap: 5px;
`;
const ContentBox = styled.div`
  padding-top: 40px;
`;
