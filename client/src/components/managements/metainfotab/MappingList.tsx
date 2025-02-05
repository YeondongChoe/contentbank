import * as React from 'react';
import { useEffect, useState } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { styled } from 'styled-components';

import { classificationInstance } from '../../../api/axios';
import { CheckBoxI, Icon, Switch, ValueNone } from '../../../components/atom';
import { COLOR } from '../../../components/constants';
import { useDnD } from '../../../components/molecules';

interface CategoryItem {
  idx: number;
  classIdx: number;
  name: string;
  code: string;
  depth: number;
  parentClassIdx: number | null;
  isUse: boolean;
  sort: number;
}

interface MappingListProps {
  mappingList: CategoryItem[];
  activeItem: {
    idx: number;
    classIdx: number;
    name: string;
    code: string;
    depth: number;
    parentClassIdx: number | null;
    isUse: boolean;
    sort: number;
  } | null;
  handleTagClick: (item: {
    idx: number;
    classIdx: number;
    name: string;
    code: string;
    depth: number;
    parentClassIdx: number | null;
    isUse: boolean;
    sort: number;
  }) => void;
  moveTag: (
    dragIndex: number,
    hoverIndex: number,
    isFinished: boolean,
    list: CategoryItem[],
  ) => void;
  setShowMapHandleBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCheckBox: React.Dispatch<React.SetStateAction<number[]>>;
  tagTitle: string[];
}

export function MappingList({
  mappingList,
  activeItem,
  handleTagClick,
  moveTag,
  setShowMapHandleBtn,
  setSelectedCheckBox,
  tagTitle,
}: MappingListProps) {
  if (mappingList.length === 0) {
    return <ValueNone info="리스트가 없습니다" />;
  }

  const [expandedItems, setExpandedItems] = useState<
    { id: string; show: boolean; depth: number }[]
  >([]);
  const [selectedSwitchState, setSelectedSwitchState] = useState<
    Record<any, boolean>
  >({});

  const [selectedCheckBoxState, setSelectedCheckBoxState] = useState<
    Record<any, boolean>
  >({});

  // 아코디언 토글
  const toggleExpanded = (clickedItem: CategoryItem) => {
    setExpandedItems((prevList) => {
      const updatedList = [...prevList];
      const clickedIndex = prevList.findIndex(
        (item) => item.id === clickedItem.idx.toString(),
      );
      const clickedDepth = clickedItem.depth;

      if (clickedIndex === -1) return prevList;
      // 클릭된 아이템의 다음

      for (let i = clickedIndex + 1; i < updatedList.length; i++) {
        const currentItem = updatedList[i];
        if (currentItem.depth <= clickedDepth) break;
        currentItem.show = !currentItem.show;
      }

      return updatedList;
    });
  };
  useEffect(() => {
    console.log('expandedItems----', expandedItems);
  }, [expandedItems]);

  // 초기값
  useEffect(() => {
    // 스위치
    const initialSwitchState: Record<number, boolean> = {};

    const initializeSwitchState = (list: CategoryItem[]) => {
      list.forEach((item) => {
        initialSwitchState[item.idx] = item.isUse; // item.isUse 값을 기반으로 초기화
      });
    };

    initializeSwitchState(mappingList);
    setSelectedSwitchState(initialSwitchState);

    // 아코디언
    const initializeExpandedItems = mappingList.map((item) => ({
      id: item.idx.toString(), // id는 idx 값을 문자열로 변환하여 설정
      depth: item.depth,
      show: item.depth === 1, // depth가 1인 경우만 true로 설정
    }));
    console.log('initializeExpandedItems ---', initializeExpandedItems);

    setExpandedItems(initializeExpandedItems);
  }, [mappingList]);

  // 활성화 토글 api
  const patchTagActivationState = (data: {
    idxList: number[];
    isUse: boolean;
  }) => {
    return classificationInstance.patch('/v1/category/map/used', data);
  };

  const toggleSwitchState = async (itemIdx: number, isUse: boolean) => {
    // 로컬 상태 업데이트
    setSelectedSwitchState((prevState) => ({
      ...prevState,
      [itemIdx]: !isUse,
    }));

    // 서버에 상태 업데이트 요청 보내기
    await patchTagActivationState({
      idxList: [itemIdx],
      isUse: !isUse, // 토글된 새로운 상태
    });
  };

  const toggleCheckBoxState = (itemIdx: number) => {
    setSelectedCheckBoxState((prevState) => ({
      ...prevState,
      [itemIdx]: !prevState[itemIdx],
    }));
  };
  // 체크값 있을시 버튼 활성화
  useEffect(() => {
    console.log('체크값--', selectedCheckBoxState);

    // 태그 핸들링 버튼 보이게
    if (selectedCheckBoxState) {
      const hasTrueValue = Object.values(selectedCheckBoxState).some(
        (value) => value === true,
      );
      setShowMapHandleBtn(hasTrueValue);
      // 체크된 값 부모요소로
      const trueKeys = Object.entries(selectedCheckBoxState)
        .filter(([key, value]) => value === true) // 값이 true인 항목만 필터링
        .map(([key]) => Number(key));

      setSelectedCheckBox(trueKeys);
    }
  }, [selectedCheckBoxState]);

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
          moveTag={(dragIndex, hoverIndex, isFinished) =>
            moveTag(dragIndex, hoverIndex, isFinished, list)
          }
          toggleExpanded={toggleExpanded}
          isExpanded={expandedItems[idx]}
          nextIsExpanded={expandedItems[idx + 1]}
          isSwitchOn={selectedSwitchState[el.idx] || false}
          toggleSwitch={toggleSwitchState}
          isCheckBoxChecked={selectedCheckBoxState[el.idx] || false}
          toggleCheckBox={toggleCheckBoxState}
          tagTitle={tagTitle}
          mappingList={mappingList}
        />
      </div>
    ));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <TagsWrapper className={`height`}>
        {renderMappingList(mappingList)}
      </TagsWrapper>
    </DndProvider>
  );
}

interface DraggableMappingItemProps {
  item: {
    idx: number;
    classIdx: number;
    name: string;
    code: string;
    depth: number;
    parentClassIdx: number | null;
    isUse: boolean;
    sort: number;
  };
  index: number;
  activeItem: {
    idx: number;
    classIdx: number;
    name: string;
    code: string;
    depth: number;
    parentClassIdx: number | null;
    isUse: boolean;
    sort: number;
  } | null;
  handleTagClick: (item: {
    idx: number;
    classIdx: number;
    name: string;
    code: string;
    depth: number;
    parentClassIdx: number | null;
    isUse: boolean;
    sort: number;
  }) => void;
  moveTag: (dragIndex: number, hoverIndex: number, isFinished: boolean) => void;
  toggleExpanded: (item: any) => void;
  isExpanded: { id: string; show: boolean; depth: number };
  nextIsExpanded: { id: string; show: boolean; depth: number };
  depth: number;
  isSwitchOn: boolean;
  toggleSwitch: (itemIdx: number, isUse: boolean) => void;
  isCheckBoxChecked: boolean;
  toggleCheckBox: (itemIdx: number) => void;
  tagTitle: string[];
  mappingList: CategoryItem[];
}

const DraggableMappingItem: React.FC<DraggableMappingItemProps> = ({
  item,
  index,
  activeItem,
  handleTagClick,
  moveTag,
  toggleExpanded,
  isExpanded,
  nextIsExpanded,
  depth,
  isSwitchOn,
  toggleSwitch,
  isCheckBoxChecked,
  toggleCheckBox,
  tagTitle,
  mappingList,
}) => {
  const { ref, isDragging } = useDnD({
    itemIndex: index,
    onMove: moveTag,
    dragSectionName: 'TAG_MAPPING_SECTION',
  });

  return (
    <>
      <Tags
        ref={ref as React.RefObject<HTMLButtonElement>}
        className={`gap ${activeItem === item ? 'on_map_item' : ''}  ${!isSwitchOn ? 'inactive_tag' : ''} ${isExpanded?.show ? 'show' : 'hide'}`}
        onClick={() => {
          handleTagClick(item);
          toggleExpanded(item);
        }}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        {/* {index + 1 < mappingList.length && ( */}
        <span
          className={`${nextIsExpanded?.show ? 'up' : 'down'} arrow`}
        ></span>
        {/*  )} */}
        <span className="icon_wrap">
          <Icon width="18px" src={`/images/icon/icon-move.svg`} />
        </span>
        <span className="category_title">
          {item.name}
          <span className="category_sub_title">{`${tagTitle[item.depth - 1]}`}</span>
        </span>
        <TagsButtonWrapper>
          <span className="switch_title">활성화</span>
          <Switch
            marginTop={5}
            $ison={isSwitchOn}
            onClick={() => toggleSwitch(item.idx, isSwitchOn)}
          />
          <CheckBoxI
            className={'side_bar'}
            id={`checkbox-${item.idx}`}
            checked={isCheckBoxChecked}
            onChange={() => toggleCheckBox(item.idx)}
            value={item.idx}
            disabled={!isSwitchOn}
          />
        </TagsButtonWrapper>
      </Tags>

      {activeItem === item &&
        index + 1 < mappingList.length && // 다음 아이템이 존재하는지 확인
        mappingList[index + 1].parentClassIdx !== activeItem.classIdx && (
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
  &.inactive_tag {
    background-color: #cecece; /* 회색 배경 */
  }
  &.hide {
    display: none;
  }
  &.show {
    display: flex;
  }
`;

const TagsWrapper = styled.div`
  border: 1px solid #eaeaea;
  background-color: #fff;
  min-width: 300px;
  border-radius: 5px;
  overflow-y: auto;
  overflow-x: hidden;

  &.height {
    display: flex;
    flex-direction: column;
    height: 650px;
    padding: 15px;
    /* gap: 10px; */
  }
  .arrow {
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #000;
    margin-right: 8px;
    display: inline-block;
  }
  .up {
    transform: rotate(0deg);
    transition: transform 0.3s ease;
  }
  .down {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
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
  margin-bottom: 5px;
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
