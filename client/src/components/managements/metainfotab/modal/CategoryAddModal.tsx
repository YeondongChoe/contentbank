import * as React from 'react';
import { useState } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';

import { Button } from '../../../../components/atom';
import { COLOR } from '../../../../components/constants';
import { Search } from '../../../../components/molecules';
import { useModal } from '../../../../hooks';

export function CategoryAddModal({ category }: { category: string[] }) {
  const { closeModal } = useModal();
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
  const [tags, setTags] = useState<string[]>([]);

  const handleCategoryClick = (category: string) => {
    setTags((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((c) => c !== category)
        : [...prevSelected, category],
    );
  };

  return (
    <Container>
      <Title>카테고리 추가</Title>
      <div className="search_wrap">
        <Search
          placeholder="카테고리를 검색해주세요."
          value={''}
          onChange={() => {}}
          onKeyDown={() => {}}
        />
      </div>
      <ScrollWrapper>
        <PerfectScrollbar>
          <ListWrapper>
            {tagsList.map((tag) => (
              <button
                key={tag}
                className={`value_button ${tags.includes(tag) ? 'selected' : ''}`}
                onClick={() => handleCategoryClick(tag)}
              >
                {tag}
              </button>
            ))}
          </ListWrapper>
        </PerfectScrollbar>
      </ScrollWrapper>
      <ButtonWrapper>
        <p>총 {tags.length}개의 카테고리 선택</p>
        <Button onClick={() => closeModal()}>취소</Button>
        <Button onClick={() => {}} $filled>
          확인
        </Button>
      </ButtonWrapper>
    </Container>
  );
}
const Container = styled.div`
  max-width: 700px;
  min-width: 600px;
  overflow: hidden;
  border-radius: 20px;
  .search_wrap {
    padding: 0 20px;
  }
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
  margin-bottom: 10px;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 15px 20px;

  .value_button {
    border: 1px solid #ddd;
    background-color: transparent;
    border-radius: 5px;
    font-size: 13px;
    padding: 5px 15px;
    cursor: pointer;

    &.selected {
      color: ${COLOR.PRIMARY};
      border-color: ${COLOR.PRIMARY};
    }
  }
`;

const ButtonWrapper = styled.div`
  background-color: #f1f1f1;
  padding: 20px;
  display: flex;
  align-items: center;

  p {
    flex: 1 1 0;
    font-size: 12px;
    font-weight: 700;
    color: ${COLOR.PRIMARY};
  }
  button {
    margin-left: 10px;
    width: 100px;
    height: 40px;
  }
`;
const ScrollWrapper = styled.div`
  max-height: 300px;
  overflow-y: auto;
  width: 100%;
`;
