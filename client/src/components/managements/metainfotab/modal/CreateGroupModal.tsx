import * as React from 'react';
import { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@tanstack/react-query';
import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';

import { classificationInstance } from '../../../../api/axios';
import { Button, openToastifyAlert } from '../../../../components/atom';
import { COLOR } from '../../../../components/constants';
import { Search } from '../../../../components/molecules';
import { useModal } from '../../../../hooks';
import { postRefreshToken } from '../../../../utils/tokenHandler';

type CategoryListProps = {
  idx: number;
  name: string;
};

type CreateModalProps = {
  categoryList: CategoryListProps[];
  categoryGroupRefetch: () => void;
};

export function CreateGroupModal({
  categoryList,
  categoryGroupRefetch,
}: CreateModalProps) {
  const { closeModal } = useModal();
  const [categories, setCategories] =
    useState<CategoryListProps[]>(categoryList);
  const [selectedCategories, setSelectedCategories] = useState<
    CategoryListProps[]
  >([]);
  const [name, setName] = useState<string>('');
  const [typeIdxList, setTypeIdxList] = useState<number[]>([]);
  const [tagInputValue, setTagInputValue] = useState<string>('');

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const tagInputHandler = (
    e: React.KeyboardEvent<HTMLInputElement>,
    name: string,
  ) => {
    if (e.key === 'Enter') {
      const newTagsList = categories.filter((el) => el.name.includes(name));
      setCategories(newTagsList);
    }
    //초기화
    if (e.key === 'Backspace') {
      setCategories(categoryList);
    }
  };

  const handleCategoryClick = (category: CategoryListProps) => {
    setSelectedCategories(
      (prevSelected) =>
        prevSelected.some((tag) => tag.idx === category.idx) // idx를 사용하여 선택 여부 판단
          ? prevSelected.filter((c) => c.idx !== category.idx) // 선택된 항목 제거
          : [...prevSelected, category], // 선택된 항목 추가
    );
  };

  useEffect(() => {
    const processTypeIdx = selectedCategories.map((el) => el.idx);
    if (selectedCategories) {
      setTypeIdxList(processTypeIdx);
    }
  }, [selectedCategories]);

  //그룹 생성api
  const postGroup = async () => {
    const data = {
      name: name,
      types: typeIdxList,
    };
    return await classificationInstance.post(`/v1/category/group`, data);
  };
  const { mutate: postGroupData } = useMutation({
    mutationFn: postGroup,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: '잠시후 다시 시도해주세요',
      });
      if (context.response.data.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response) => {
      //저장 알람
      openToastifyAlert({
        type: 'success',
        text: '저장되었습니다.',
      });
      //그룹 리스트 재호출
      categoryGroupRefetch();
      setName('');
      closeModal();
    },
  });

  return (
    <Container>
      <Title>그룹 생성</Title>
      <div className="input_wrap">
        <strong>
          그룹명 <span className="red">*</span>
        </strong>
        <input
          type="text"
          placeholder="카테고리명을 입력해주세요"
          value={name}
          onChange={(e) => changeName(e)}
        />
      </div>
      <div className="search_wrap">
        <strong>
          카테고리 선택 <span className="red">*</span>
        </strong>
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
            {categories.map((category) => (
              <button
                key={category.idx}
                className={`value_button ${selectedCategories.some((t) => t.idx === category.idx) ? 'selected' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category.name}
              </button>
            ))}
          </ListWrapper>
        </PerfectScrollbar>
      </ScrollWrapper>
      <ButtonWrapper>
        <p>총 {selectedCategories.length}개의 카테고리 선택</p>
        <Button onClick={() => closeModal()}>취소</Button>
        <Button onClick={() => postGroupData()} $filled>
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

  .input_wrap {
    padding: 0 20px;
  }
  .input_wrap strong,
  .search_wrap strong {
    padding: 20px 0 10px 0;
    display: flex;
    font-size: 14px;
  }
  .red {
    color: ${COLOR.RED};
    margin-left: 4px;
  }
  .input_wrap > input {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 4px;
    width: 100%;
    text-indent: 10px;
  }
  .input_wrap input::placeholder {
    font-size: 14px;
    text-indent: 10px;
  }
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
