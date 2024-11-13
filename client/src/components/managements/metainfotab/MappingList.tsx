import * as React from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { styled } from 'styled-components';

import { Icon, ValueNone } from '../../../components/atom';
import { COLOR } from '../../../components/constants';
import { useDnD } from '../../../components/molecules';

interface CategoryItem {
  idx: number;
  name: string;
  code: string;
  depth: number;
  isUse: boolean;
  children?: CategoryItem[];
}

interface MappingListProps {
  mappingList: CategoryItem[];
  activeItem: {
    idx: number;
    name: string;
    code: string;
    depth: number;
    isUse: boolean;
    children?: any[];
  } | null;
  handleTagClick: (item: {
    idx: number;
    name: string;
    code: string;
    depth: number;
    isUse: boolean;
    children?: any[];
  }) => void;
  moveTag: (
    dragIndex: number,
    hoverIndex: number,
    list: CategoryItem[],
  ) => void;
}

export function MappingList({
  mappingList,
  activeItem,
  handleTagClick,
  moveTag,
}: MappingListProps) {
  if (mappingList.length === 0) {
    return <ValueNone info="리스트가 없습니다" />;
  }

  const [expandedItems, setExpandedItems] = React.useState<Set<number>>(
    new Set(),
  );

  const toggleExpanded = (item: CategoryItem) => {
    if (item.depth === 0) {
      const newExpandedItems = new Set(expandedItems);
      if (newExpandedItems.has(item.idx)) {
        newExpandedItems.delete(item.idx);
      } else {
        newExpandedItems.add(item.idx);
      }
      setExpandedItems(newExpandedItems);
    }
  };

  const renderMappingList = (list: CategoryItem[]) => {
    return list.map((el, idx) => (
      <div
        key={`${el.idx}-${el.depth || ''}`}
        style={{ paddingLeft: `${el.depth * 20}px` }}
      >
        <DraggableMappingItem
          item={el}
          index={idx}
          activeItem={activeItem}
          handleTagClick={handleTagClick}
          moveTag={(dragIndex, hoverIndex) =>
            moveTag(dragIndex, hoverIndex, list)
          }
          toggleExpanded={toggleExpanded}
          isExpanded={expandedItems.has(el.idx)}
        />
        {el.children &&
          el.children.length > 0 &&
          renderMappingList(el.children)}
      </div>
    ));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <TagsWrapper className="height">
        {renderMappingList(mappingList)}
      </TagsWrapper>
    </DndProvider>
  );
}

interface DraggableMappingItemProps {
  item: {
    idx: number;
    name: string;
    code: string;
    depth: number;
    isUse: boolean;
    children?: any[];
  };
  index: number;
  activeItem: {
    idx: number;
    name: string;
    code: string;
    depth: number;
    isUse: boolean;
    children?: any[];
  } | null;
  handleTagClick: (item: {
    idx: number;
    name: string;
    code: string;
    depth: number;
    isUse: boolean;
    children?: any[];
  }) => void;
  moveTag: (dragIndex: number, hoverIndex: number) => void;
  toggleExpanded: (item: any) => void;
  isExpanded: boolean;
}

const DraggableMappingItem: React.FC<DraggableMappingItemProps> = ({
  item,
  index,
  activeItem,
  handleTagClick,
  moveTag,
  toggleExpanded,
  isExpanded,
}) => {
  const { ref, isDragging } = useDnD({
    itemIndex: index,
    onMove: moveTag,
    dragSectionName: 'TAG_MAPPING_SECTION',
  });

  return (
    <>
      {item.depth == 0 ? (
        <Tags
          ref={ref}
          className={`gap ${activeItem === item ? 'on' : ''}`}
          onClick={() => {
            handleTagClick(item);
            toggleExpanded(item);
          }}
          style={{ opacity: isDragging ? 0.5 : 1 }}
        >
          <span className="icon_wrap">
            <Icon width="18px" src={`/images/icon/icon-move.svg`} />
          </span>
          <span className="category_title">{item.name}</span>
          <span className="category_sub_title end">{`${item.code}`}</span>
          {/* <span className="category_sub_title end">{`${item.children?.length || 0}개의 태그`}</span> */}
          {/* {item.children && item.children.length > 0 && (
            <span className="expand_indicator">
              {isExpanded ? '[-]' : '[+]'}
            </span>
          )} */}
        </Tags>
      ) : (
        <></>
      )}
    </>
  );
};

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
