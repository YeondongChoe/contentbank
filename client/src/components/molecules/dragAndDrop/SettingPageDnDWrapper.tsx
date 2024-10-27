import * as React from 'react';
import { useEffect, useState } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useDnD } from './useDnD';

type MenuDataListProps = {
  code: string;
  detailIdx: string;
  idx: number;
  isCheck: boolean;
  name: string;
  nameList: string;
  searchList: string;
  typeList: string;
  viewList: string;
};

interface SettingDnDWrapperType {
  dragList: MenuDataListProps[];
  selectedValue: string;
  onDragging?: (newOrder: any[]) => void; // 항목이 드래그 중일 때 호출되는 함수
  onDragEnd: (newOrder: any[], selectedValue: string) => void; // 드래그가 종료되었을 때 호출되는 함수
  children: (
    item: any,
    ref: React.RefObject<HTMLLIElement>,
    isDragging: boolean,
    itemIndex: number,
  ) => React.ReactNode; // 각 항목을 랜더링하는 함수
  dragSectionName: string; // 드래그 섹션 이름(각  드래그리스트는 섹션 이름을 다르게 해야 각 섹션 아이템간 이동이 불가)
  isStartDnD?: boolean;
  setIsStartDnd?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DraggableItemProps {
  key?: string | number;
  dragItem: any;
  itemIndex: number; // 항목의 인덱스
  onMove: (dragIndex: number, hoverIndex: number, isFinished: boolean) => void; // 항목이 이동했을 때 호출되는 함수
  itemRenderer: (
    dragItem: any,
    ref: React.RefObject<HTMLLIElement>,
    isDragging: boolean,
    itemIndex: number,
  ) => React.ReactNode; // 항목을 랜더링하는 함수
  dragSectionName: string; // 드래그 섹션 이름
}

// 드래그 앤 드랍을 처리하는 래퍼 컴포넌트를 정의한다.
export const SettingPageDnDWrapper = ({
  dragList,
  selectedValue,
  onDragging,
  onDragEnd,
  children,
  dragSectionName,
  isStartDnD,
  setIsStartDnd,
}: SettingDnDWrapperType) => {
  const [currentItems, setCurrentItems] = useState<
    {
      name: string;
      idx: number;
      search: boolean;
      view: boolean;
      type: string;
    }[]
  >([]); // 현재 항목의 상태 관리

  useEffect(() => {
    const filteredArray = dragList.filter((el) => el.name === selectedValue);
    const nameListArray = filteredArray[0]?.nameList?.split(',') || [];
    const typeListArray = filteredArray[0]?.typeList?.split(',') || [];

    const searchListArray = filteredArray[0]?.searchList?.split(',') || [];
    const viewListArray = filteredArray[0]?.viewList?.split(',') || [];
    const searchListBooleans = searchListArray.map(
      (item) => item.trim() === 'true',
    );
    const viewListBooleans = viewListArray.map(
      (item) => item.trim() === 'true',
    );

    if (selectedValue) {
      setCurrentItems(
        nameListArray.map((name, index) => ({
          name,
          idx: index + 1,
          search: searchListBooleans[index],
          view: viewListBooleans[index],
          type: typeListArray[index],
        })),
      );
    }
  }, [dragList, selectedValue]);

  // 항목이 이동했을 때 호출되는 함수.
  const handleItemMove = (
    dragIndex: number,
    hoverIndex: number,
    isFinished: boolean,
  ) => {
    // 드래그 시작
    if (setIsStartDnd) {
      setIsStartDnd(true);
    }

    const newItems = updateItems(dragIndex, hoverIndex);

    // 드래그가 끝났을 때
    if (isFinished) {
      // 상태 업데이트 요청을 상위 컴포넌트로 전달
      setCurrentItems(newItems);
      onDragEnd(newItems, selectedValue); // 여기서 onDragEnd를 호출하여 상위 컴포넌트로 전달
    } else {
      // 드래깅 중인 상태 업데이트는 로컬 상태로 처리
      setCurrentItems(newItems);
      // Optional: 드래깅 중 상태를 부모 컴포넌트로 전달
      if (onDragging) {
        onDragging(newItems);
      }
    }
  };

  // 항목 업데이트 로직 분리
  function updateItems(dragIndex: number, hoverIndex: number) {
    const newItems = [...currentItems];
    const draggedItem = newItems.splice(dragIndex, 1)[0];
    newItems.splice(hoverIndex, 0, draggedItem);

    return newItems; // Return the new items array directly
  }

  return (
    <DndProvider backend={HTML5Backend}>
      {currentItems.length !== 0 ? (
        currentItems.map((item, idx) => (
          <DraggableItem
            key={idx}
            dragItem={item}
            itemIndex={idx}
            onMove={handleItemMove}
            itemRenderer={children}
            dragSectionName={dragSectionName}
          />
        ))
      ) : (
        <></>
      )}
    </DndProvider>
  );
};

// 드래그 가능한 항목 컴포넌트를 정의
const DraggableItem = ({
  dragItem,
  itemIndex,
  onMove,
  itemRenderer,
  dragSectionName,
}: DraggableItemProps) => {
  const { ref, isDragging } = useDnD({ itemIndex, onMove, dragSectionName }); // useDnD 훅을 사용하여 드래그 앤 드랍을 처리.
  return dragItem && itemRenderer(dragItem, ref, isDragging, itemIndex); // 항목 랜더링.
};
