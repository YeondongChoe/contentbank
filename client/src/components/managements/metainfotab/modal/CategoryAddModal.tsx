import * as React from 'react';
import { useState, useEffect } from 'react';

import { includes } from 'lodash';
import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';

import { Button } from '../../../../components/atom';
import { COLOR } from '../../../../components/constants';
import { Search } from '../../../../components/molecules';
import { useModal } from '../../../../hooks';

type CategoryListProps = {
  idx: number;
  name: string;
};

type AddModalProps = {
  categoryList: CategoryListProps[];
  nameList: string[];
  typeList: string;
  onSave: (selectedTags: number[]) => void;
};

export function CategoryAddModal({
  categoryList,
  nameList,
  typeList,
  onSave,
}: AddModalProps) {
  const { closeModal } = useModal();
  // 기존에 포함되어있는 카테고리는 필터링 해서 값을 저장
  const [tagsList, setTagsList] = useState<CategoryListProps[]>(() => {
    return categoryList.filter((el) => !nameList.includes(el.name));
  });
  //선택된 카테고리
  const [tags, setTags] = useState<CategoryListProps[]>([]);
  const [typeIdxList, setTypeIdxList] = useState<number[]>([]);
  const [tagInputValue, setTagInputValue] = useState<string>('');

  useEffect(() => {
    if (typeList) {
      const typeListArray = typeList.split(',').map(Number);
      const numberArray = typeListArray.map((item) => Number(item));
      setTypeIdxList(numberArray);
    }
  }, [typeList]);

  const handleCategoryClick = (category: CategoryListProps) => {
    setTags(
      (prevSelected) =>
        prevSelected.some((tag) => tag.idx === category.idx) // idx를 사용하여 선택 여부 판단
          ? prevSelected.filter((c) => c.idx !== category.idx) // 선택된 항목 제거
          : [...prevSelected, category], // 선택된 항목 추가
    );
  };

  const tagInputHandler = (
    e: React.KeyboardEvent<HTMLInputElement>,
    name: string,
  ) => {
    if (e.key === 'Enter') {
      const newTagsList = tagsList.filter((el) => el.name.includes(name));
      setTagsList(newTagsList);
    }
    //초기화
    if (e.key === 'Backspace') {
      setTagsList(categoryList.filter((el) => !nameList.includes(el.name)));
    }
  };

  return (
    <Container>
      <Title>카테고리 추가</Title>
      <div className="search_wrap">
        <Search
          placeholder="카테고리를 검색해주세요."
          value={tagInputValue}
          onChange={(e) => setTagInputValue(e.target.value)}
          onKeyDown={(e) => tagInputHandler(e, tagInputValue)}
        />
      </div>
      <ScrollWrapper>
        <PerfectScrollbar>
          <ListWrapper>
            {tagsList.map((tag) => (
              <button
                key={tag.idx}
                className={`value_button ${tags.some((t) => t.idx === tag.idx) ? 'selected' : ''}`}
                onClick={() => handleCategoryClick(tag)}
              >
                {tag.name}
              </button>
            ))}
          </ListWrapper>
        </PerfectScrollbar>
      </ScrollWrapper>
      <ButtonWrapper>
        <p>총 {tags.length}개의 카테고리 선택</p>
        <Button width="100px" height="40px" onClick={() => closeModal()}>
          취소
        </Button>
        <Button
          width="100px"
          height="40px"
          onClick={() => onSave([...typeIdxList, ...tags.map((el) => el.idx)])}
          $filled
        >
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
  gap: 10px;

  p {
    flex: 1 1 0;
    font-size: 12px;
    font-weight: 700;
    color: ${COLOR.PRIMARY};
  }
`;
const ScrollWrapper = styled.div`
  max-height: 300px;
  overflow-y: auto;
  width: 100%;
`;
