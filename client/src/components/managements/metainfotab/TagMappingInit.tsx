import * as React from 'react';
import { useEffect, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { classificationInstance } from '../../../api/axios';
import {
  Button,
  CheckBoxI,
  Icon,
  openToastifyAlert,
} from '../../../components/atom';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { useDnD } from '../../molecules/dragAndDrop';

import { GroupListProps } from './GroupManagement';

export function TagMappingInit() {
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [mappingList, setMappingList] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  useEffect(() => {
    if (query.get('state')) {
      console.log('query', query.get('state'));
    }
  }, []);

  // Load category group data
  const getCategoryGroup = async () => {
    const res = await classificationInstance.get(`/v1/category/group`);
    console.log(res);
    return res;
  };

  const { data: categoryGroupData, isLoading: isCategoryGroupLoading } =
    useQuery({
      queryKey: ['get-categoryGroup'],
      queryFn: getCategoryGroup,
      meta: {
        errorMessage: 'get-categoryGroup 에러 메세지',
      },
    });

  useEffect(() => {
    if (categoryGroupData) {
      const item = categoryGroupData.data.data.groupList.filter(
        (el: GroupListProps) => el.idx === Number(query.get('state')),
      );

      console.log('item----', item[0]);
    }
  }, [categoryGroupData]);

  // Update category group
  const putCategoryGroup = async () => {
    const data = {
      groupIdx: 1,
      name: '출처정보12',
      types: [1, 2, 3],
    };
    const res = await classificationInstance.put(`/v1/category/group`, data);
    console.log('putCategoryGroup', res);
    return res;
  };

  const { data: categoryGroup, mutate: mutateCategoryGroup } = useMutation({
    mutationFn: putCategoryGroup,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
      if (context.response.data.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response: { data: { message: string } }) => {
      openToastifyAlert({
        type: 'success',
        text: response.data.message,
      });
    },
  });

  // Initialize lists
  useEffect(() => {
    setCategoryList(['전체', '수학', '영어']);
    setMappingList(['11차', '10차', '9차', '8차']);
  }, []);

  const moveTag = (
    dragIndex: number,
    hoverIndex: number,
    listType: 'category' | 'mapping',
  ) => {
    const updatedList =
      listType === 'category' ? [...categoryList] : [...mappingList];
    const draggedItem = updatedList.splice(dragIndex, 1)[0];
    updatedList.splice(hoverIndex, 0, draggedItem);

    if (listType === 'category') {
      setCategoryList(updatedList);
    } else {
      setMappingList(updatedList);
    }
  };

  const handleTagClick = (item: string) => {
    setActiveItem(activeItem === item ? null : item);
  };

  return (
    <Container>
      <ListWrapper>
        <strong className="title">카테고리 순서</strong>
        <span className="sub_title">매핑할 태그 간의 순서를 지정해주세요.</span>
        <DndProvider backend={HTML5Backend}>
          <TagsWrapper>
            {categoryList.map((el, idx) => (
              <DraggableInitItem
                key={`${el} ${idx}`}
                item={el}
                index={idx}
                activeItem={activeItem}
                handleTagClick={handleTagClick}
                moveTag={(dragIndex, hoverIndex) =>
                  moveTag(dragIndex, hoverIndex, 'category')
                }
              />
            ))}
          </TagsWrapper>
        </DndProvider>

        <Button $filled onClick={() => {}} $margin="15px 0 0 0">
          <span>지금 순서로 매핑하기</span>
        </Button>
        <p className="sub_info">
          카테고리 순서 변경 시, 기존에 매핑된 정보가 초기화될 수 있습니다.
        </p>
        <p className="sub_info_s">
          *기 등록된 문항 정보는 변경되지 않습니다. 변경된 매핑 정보로 이미
          등록된 문항 분류를 수정하고 싶으시다면, 문항 일괄 편집 기능을
          이용해주세요.
        </p>
      </ListWrapper>

      <ListItemWrapper>
        <strong>매핑</strong>
        <DndProvider backend={HTML5Backend}>
          <TagsWrapper className="height">
            {mappingList.map((el, idx) => (
              <DraggableInitItem
                key={`${el} ${idx}`}
                item={el}
                index={idx}
                activeItem={activeItem}
                handleTagClick={handleTagClick}
                moveTag={(dragIndex, hoverIndex) =>
                  moveTag(dragIndex, hoverIndex, 'mapping')
                }
              />
            ))}
          </TagsWrapper>
        </DndProvider>
      </ListItemWrapper>
    </Container>
  );
}

interface DraggableInitItemProps {
  item: string;
  index: number;
  activeItem: string | null;
  handleTagClick: (item: string) => void;
  moveTag: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableInitItem: React.FC<DraggableInitItemProps> = ({
  item,
  index,
  activeItem,
  handleTagClick,
  moveTag,
}) => {
  const { ref, isDragging } = useDnD({
    itemIndex: index,
    onMove: moveTag,
    dragSectionName: 'TAG_INIT_SECTION',
  });

  return (
    <Tags
      ref={ref}
      className={`gap ${activeItem === item ? 'on' : ''}`}
      onClick={() => handleTagClick(item)}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <span className="icon_wrap">
        <Icon width={`18px`} src={`/images/icon/icon-move.svg`} />
      </span>
      <span className="category_title">{item}</span>
      <span className="category_sub_title end">{'교육 과정'}</span>
    </Tags>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  .title {
    font-size: 20px;
  }
  .sub_title {
    color: #7d7d7d;
    padding-bottom: 10px;
  }
  .border_tag {
    border: 1px solid #aaa;
    padding: 10px 20px;
    display: inline-flex;
    border-radius: 10px;
    margin-bottom: 10px;
    font-size: 13px;
    align-self: flex-start;
    width: auto;
  }
`;

const TagsWrapper = styled.div`
  border: 1px solid #eaeaea;
  background-color: #fff;
  min-width: 300px;
  height: 400px;
  border-radius: 5px;
  overflow-y: auto;
  overflow-x: hidden;

  &.height {
    display: flex;
    flex-direction: column;
    height: 550px;
    padding: 15px;
    gap: 10px;
  }
`;
const Tags = styled.button`
  border: none;
  width: 100%;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  position: relative;
  .icon_wwrap {
    display: flex;
    align-items: center;
    padding-right: 10px;
  }

  .category_title {
    max-width: 150px;
    display: flex;
    align-items: flex-start;
  }
  .category_sub_title {
    color: #b3b3b3;
    font-size: 14px;
    line-height: 1.4;
    display: inline-block;
  }
  .end {
    margin-left: auto;
  }
`;
const ListWrapper = styled.div`
  background-color: #eee;
  display: flex;
  flex-direction: column;
  padding: 20px;

  .sub_info {
    width: 300px;
    font-weight: 500;
    padding: 10px 0;
    font-size: 14px;
    color: #aaa;
    line-height: 1.2;
  }
  .sub_info_s {
    width: 300px;
    font-weight: 500;
    font-size: 12px;
    color: #aaa;
  }
`;
const ListItemWrapper = styled.div`
  background-color: #eee;
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  margin-left: 20px;
  padding: 20px;
`;
