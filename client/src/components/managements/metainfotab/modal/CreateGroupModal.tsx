import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';

import { Search } from '../../../../components/molecules';
import { useModal } from '../../../../hooks';

export function CreateGroupModal() {
  const [tagsList, setTagsList] = useState([
    '분류1',
    '분류2',
    '분류3',
    '분류4',
    '분류5',
    '분류6',
    '분류7777777',
    '분류분류분류분류분류분류분류분류분류분류',
  ]);
  const { closeModal } = useModal();
  return (
    <Container>
      <Title>그룹 생성</Title>
      <Search value={''} onChange={() => {}} onKeyDown={() => {}} />
      <ButtonWrapper></ButtonWrapper>
    </Container>
  );
}
const Container = styled.div`
  max-width: 700px;
  min-width: 600px;
  padding: 0 30px;
  padding-bottom: 30px;
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

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding-top: 15px;

  .value_button {
    border: 1px solid #ddd;
    background-color: transparent;
    border-radius: 5px;
    font-size: 13px;
    padding: 5px 15px;
  }
`;
