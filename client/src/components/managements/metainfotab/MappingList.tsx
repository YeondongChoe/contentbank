import * as React from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { styled } from 'styled-components';

import { CheckBoxI, Icon, Switch, ValueNone } from '../../../components/atom';
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
  const [selectedSwitchState, setSelectedSwitchState] = React.useState<
    Record<any, boolean>
  >({});

  const [selectedCheckBoxState, setSelectedCheckBoxState] = React.useState<
    Record<any, boolean>
  >({});

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

  // 스위치 초기상태
  React.useEffect(() => {
    const initialSwitchState: Record<number, boolean> = {};

    const initializeSwitchState = (list: CategoryItem[]) => {
      list.forEach((item) => {
        initialSwitchState[item.idx] = true; // Set all switches to true initially
        if (item.children && item.children.length > 0) {
          initializeSwitchState(item.children); // Recursively initialize children
        }
      });
    };

    initializeSwitchState(mappingList);
    setSelectedSwitchState(initialSwitchState);
  }, []);

  const toggleSwitchState = (itemIdx: number) => {
    setSelectedSwitchState((prevState) => ({
      ...prevState,
      [itemIdx]: !prevState[itemIdx],
    }));
  };
  const toggleCheckBoxState = (itemIdx: number) => {
    setSelectedCheckBoxState((prevState) => ({
      ...prevState,
      [itemIdx]: !prevState[itemIdx],
    }));
  };
  const renderMappingList = (list: CategoryItem[], depth: number = 0) => {
    return list.map((el, idx) => (
      <div
        key={`${el.idx}-${el.depth || ''}`}
        style={{ paddingLeft: `${el.depth * 20}px` }}
      >
        <DraggableMappingItem
          item={el}
          index={idx}
          depth={depth}
          activeItem={activeItem}
          handleTagClick={handleTagClick}
          moveTag={(dragIndex, hoverIndex) =>
            moveTag(dragIndex, hoverIndex, list)
          }
          toggleExpanded={toggleExpanded}
          isExpanded={expandedItems.has(el.idx)}
          isSwitchOn={selectedSwitchState[el.idx] || false}
          toggleSwitch={toggleSwitchState}
          isCheckBoxChecked={selectedCheckBoxState[el.idx] || false}
          toggleCheckBox={toggleCheckBoxState}
        />
        {el.children &&
          el.children.length > 0 &&
          renderMappingList(el.children, depth + 1)}
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
  depth: number;
  isSwitchOn: boolean;
  toggleSwitch: (itemIdx: number) => void;
  isCheckBoxChecked: boolean;
  toggleCheckBox: (itemIdx: number) => void;
}

const DraggableMappingItem: React.FC<DraggableMappingItemProps> = ({
  item,
  index,
  activeItem,
  handleTagClick,
  moveTag,
  toggleExpanded,
  isExpanded,
  depth,
  isSwitchOn,
  toggleSwitch,
  isCheckBoxChecked,
  toggleCheckBox,
}) => {
  const { ref, isDragging } = useDnD({
    itemIndex: index,
    onMove: moveTag,
    dragSectionName: 'TAG_MAPPING_SECTION',
  });

  return (
    <>
      <Tags
        ref={ref}
        className={`gap ${activeItem === item ? 'on_map_item' : ''} `}
        onClick={() => {
          handleTagClick(item);
          toggleExpanded(item);
        }}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <span className="icon_wrap">
          <Icon width="18px" src={`/images/icon/icon-move.svg`} />
        </span>
        <span className="category_title">
          {item.name}
          <span className="category_sub_title">{`${item.code}`}</span>
        </span>
        <TagsButtonWrapper>
          <span className="switch_title">활성화</span>
          <Switch
            marginTop={5}
            $ison={isSwitchOn}
            onClick={() => toggleSwitch(item.idx)}
          />
          <CheckBoxI
            className={'side_bar'}
            id={`checkbox-${item.idx}`}
            checked={isCheckBoxChecked}
            onChange={() => toggleCheckBox(item.idx)}
            value={item.idx}
          />
        </TagsButtonWrapper>
        {/* <span className="category_sub_title end">{`${item.children?.length || 0}개의 태그`}</span> */}
      </Tags>
      {activeItem === item && item.children && item.children.length == 0 && (
        <InfoButtonWrapper>
          + ‘태그 선택’에서 매핑할 태그를 선택해주세요.
        </InfoButtonWrapper>
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
  margin-bottom: 5px;
  .icon_wwrap {
    display: flex;
    align-items: center;
    padding-right: 10px;
  }

  .category_title {
    max-width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 5px;
  }
  .category_sub_title {
    color: #b3b3b3;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 5px;
  }
  .end {
    margin-left: auto;
  }
  &.on_map_item {
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
const InfoButtonWrapper = styled.div`
  border: 1px dotted #aaa;
  border-radius: 5px;
  color: #aaa;
  font-size: 14px;
  padding: 20px;
  margin-left: 20px;
  margin-top: 5px;
`;

const TagsButtonWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 5px;
  .switch_title {
    font-size: 12px;
    color: ${COLOR.PRIMARY};
  }
  .side_bar {
    margin-left: 10px;
    position: relative;
  }
  .side_bar::after {
    content: '';
    display: block;
    width: 1px;
    height: 12px;
    background-color: #aaa;
    position: absolute;
    top: 8px;
    right: 25px;
  }
`;
