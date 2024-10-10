import * as React from 'react';
import { useState, useEffect } from 'react';

import styled from 'styled-components';

import { Search } from '../../../../components/molecules';
import { useModal } from '../../../../hooks';

export function TagsModal({ tags }: { tags: string[] }) {
  const [tagsList, setTagsList] = useState<string[]>(tags);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const { closeModal } = useModal();

  //검색어에 따른 태그리스트 필터
  useEffect(() => {
    if (searchValue) {
      const filteredList = tags.filter(
        (tag) => tag.toLowerCase().includes(searchValue.toLowerCase()), // 검색어와 일치하는 태그 필터링
      );
      setTagsList(filteredList);
    } else {
      // 검색어가 없으면 전체 태그 리스트를 다시 설정
      setTagsList(tags);
    }
  }, [searchValue, tags]);

  return (
    <Container>
      <Title>태그</Title>
      <Search
        value={searchValue as string}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        onKeyDown={() => {}}
      />
      <ButtonWrapper>
        {tagsList.map((tag) => (
          <button
            key={`태그 : ${tag}`}
            type="button"
            className={`value_button`}
            onClick={() => {}}
          >
            {tag}
          </button>
        ))}
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  max-width: 700px;
  min-width: 600px;
  min-height: 450px;
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
  max-height: 400px;
  overflow-y: auto;

  .value_button {
    border: 1px solid #ddd;
    background-color: transparent;
    border-radius: 5px;
    font-size: 13px;
    padding: 5px 15px;
  }
`;
