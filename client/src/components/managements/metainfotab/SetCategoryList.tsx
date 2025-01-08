import * as React from 'react';
import { useEffect, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { classificationInstance } from '../../../api/axios';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { Button, CheckBoxI, Icon, openToastifyAlert } from '../../atom';
import { COLOR } from '../../constants';
import { useDnD } from '../../molecules/dragAndDrop';

export function SetCategoryList({
  setSelectedItem,
  setSelectedList,
}: {
  setSelectedList: React.Dispatch<React.SetStateAction<any[]>>;
  setSelectedItem?: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [categoryList, setCategoryList] = useState<
    { type: string; name: string; count: string }[]
  >([]);
  const [groupIdx, setGgroupIdx] = useState<number>();
  const [groupName, setGgroupName] = useState<string>();
  const [groupData, setGroupData] = useState<{
    groupIdx: number | undefined;
    name: string | undefined;
    types: number[];
  } | null>(null);

  const [activeItem, setActiveItem] = useState<{
    name: string;
    type: string;
    count: string;
  } | null>(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const queryValue = query.get('state');

  useEffect(() => {
    if (query.get('state')) {
      console.log('query', query.get('state'));
    }
  }, []);

  //카테고리 그룹 리스트 불러오기 api
  const getCategoryGroup = async () => {
    if (queryValue) {
      const res = await classificationInstance.get(
        `/v1/category/group/${queryValue.split('/')[0]}`,
      );
      console.log(res.data.data);
      return res.data.data;
    }
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
      console.log('가져온 카테고리 ----', categoryGroupData);
      const item = categoryGroupData;
      const { nameList, typeList, idx, name, countList } = item;
      const names = nameList ? nameList.split(',') : [];
      const types = typeList ? typeList.split(',') : [];
      const counts = countList ? countList.split(',') : [];

      const newCategoryList = names.map(
        (name: any, index: string | number) => ({
          name,
          type: types[index] || '',
          count: counts[index] || '',
        }),
      );

      setCategoryList(newCategoryList);
      setGgroupIdx(idx);
      setGgroupName(name);
    }
  }, [categoryGroupData]);

  // 카테고리 순서 변경 api
  const putCategoryGroup = async (data: {
    groupIdx: number | undefined;
    name: string | undefined;
    types: number[];
  }) => {
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
        text: `${context.response.data.message}`,
      });
      if (context.response.data.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response: { data: { message: string } }) => {
      openToastifyAlert({
        type: 'success',
        text: `${response.data.message ? response.data.message : '순서가 변경되었습니다'}`,
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.onload();
    },
  });

  useEffect(() => {
    //최종 순서 데이터
    const sortList = categoryList.map((item) => Number(item.type));
    console.log('sortList ---------- ', sortList);
    const data = {
      groupIdx: groupIdx,
      name: groupName,
      types: sortList,
    };
    setGroupData(data);
    // console.log('카테고리 변경 ----- ', categoryList);
    if (setSelectedList) setSelectedList(categoryList);
  }, [categoryList, groupIdx, groupName]);

  const submitMapping = () => {
    if (groupData) mutateCategoryGroup(groupData);
  };

  const moveCategoryTag = (dragIndex: number, hoverIndex: number) => {
    const updatedList = [...categoryList];
    const draggedItem = updatedList.splice(dragIndex, 1)[0];
    updatedList.splice(hoverIndex, 0, draggedItem);
    setCategoryList(updatedList);
  };

  const handleTagClick = (item: {
    name: string;
    type: string;
    count: string;
  }) => {
    setActiveItem(activeItem === item ? null : item);
    // console.log('click item ----- ', item);
    if (setSelectedItem) setSelectedItem(item);
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
                key={`${el.name} ${el.type}`}
                item={el}
                index={idx}
                activeItem={activeItem}
                handleTagClick={handleTagClick}
                moveTag={(dragIndex, hoverIndex) =>
                  moveCategoryTag(dragIndex, hoverIndex)
                }
              />
            ))}
          </TagsWrapper>
        </DndProvider>

        <Button $filled onClick={() => submitMapping()} $margin="15px 0 0 0">
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
    </Container>
  );
}

interface DraggableInitItemProps {
  item: { name: string; type: string; count: string };
  index: number;
  activeItem: { name: string; type: string } | null;
  handleTagClick: (item: { name: string; type: string; count: string }) => void;
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
      <span className="category_title">{item.name}</span>
      <span className="category_sub_title end">{`${item.count}개의 태그`}</span>
    </Tags>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
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
  height: 500px;
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
  &.on {
    border: 1px solid ${COLOR.PRIMARY};
  }
`;
const ListWrapper = styled.div`
  background-color: #eee;
  display: flex;
  flex-direction: column;

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
