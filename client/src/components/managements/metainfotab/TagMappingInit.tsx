import * as React from 'react';
import { useEffect, useState } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';

import { Button, CheckBoxI, Icon } from '../../../components/atom';
import { useDnD } from '../../molecules/dragAndDrop';

export function TagMappingInit() {
  const [lists, setLists] = useState({
    categoryList: [''],
    mappingList: [''],
  });
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [checkList, setCheckList] = useState<string[]>([]);

  useEffect(() => {
    setLists({
      categoryList: ['전체', '수학', '영어'],
      mappingList: ['11차', '10차', '9차', '8차'],
    });
  }, []);

  const moveTag = (
    dragIndex: number,
    hoverIndex: number,
    listType: 'category' | 'mapping',
  ) => {
    const updatedList = [...lists[`${listType}List`]];
    const draggedItem = updatedList.splice(dragIndex, 1)[0];
    updatedList.splice(hoverIndex, 0, draggedItem);

    setLists((prev) => ({
      ...prev,
      [`${listType}List`]: updatedList,
    }));
  };

  const handleTagClick = (item: string) => {
    setActiveItem(activeItem === item ? null : item);
  };

  useEffect(() => {}, [lists]);
  return (
    <Container>
      {/* 최초 진입 */}
      <ListWrapper>
        <strong className="title">카테고리 순서</strong>
        <span className="sub_title">매핑할 태그 간의 순서를 지정해주세요.</span>
        <DndProvider backend={HTML5Backend}>
          <TagsWrappper>
            {lists.categoryList.map((el, idx) => (
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
          </TagsWrappper>
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
          <TagsWrappper className="height">
            {lists.mappingList.map((el, idx) => (
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
          </TagsWrappper>
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
      key={`${item} ${index}`}
      onClick={() => handleTagClick(item)}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <span className="icon_wwrap">
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

const TagsWrappper = styled.div`
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
