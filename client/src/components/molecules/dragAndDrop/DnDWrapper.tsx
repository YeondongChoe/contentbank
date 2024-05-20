import * as React from 'react';
import { useEffect, useState } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useDnD } from './useDnD';

interface DnDWrapperPropsType {
  dragList: any[];
  onDragging?: (newOrder: any[]) => void; // 항목이 드래그 중일 때 호출되는 함수
  onDragEnd: (newOrder: any[]) => void; // 드래그가 종료되었을 때 호출되는 함수
  children: (
    item: any,
    ref: React.RefObject<HTMLLIElement>,
    isDragging: boolean,
  ) => React.ReactNode; // 각 항목을 랜더링하는 함수
  dragSectionName: string; // 드래그 섹션 이름(각  드래그리스트는 섹션 이름을 다르게 해야 각 섹션 아이템간 이동이 불가)
  doubleDnD?: boolean; // 한페이지 드래그 2개일때(Cannot have two HTML5 backends at the same time 해결)
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
  ) => React.ReactNode; // 항목을 랜더링하는 함수
  dragSectionName: string; // 드래그 섹션 이름
}

// 드래그 앤 드랍을 처리하는 래퍼 컴포넌트를 정의한다.
export const DnDWrapper = ({
  dragList,
  onDragging,
  onDragEnd,
  children,
  dragSectionName,
  doubleDnD,
  isStartDnD,
  setIsStartDnd,
}: DnDWrapperPropsType) => {
  const [currentItems, setCurrentItems] = useState(dragList); // 현재 항목의 상태 관리

  useEffect(() => {
    if (dragList) {
      setCurrentItems(dragList);
    }
  }, [dragList]);

  // 항목이 이동했을 때 호출되는 함수.
  const handleItemMove = (
    dragIndex: number,
    hoverIndex: number,
    isFinished: boolean,
  ) => {
    // 상태 업데이트 로직을 함수 밖으로 빼내서, 렌더링 중에 호출되지 않도록 함
    const newItems = updateItems(dragIndex, hoverIndex);

    if (isFinished) {
      // 상태 업데이트 요청을 상위 컴포넌트로 전달
      onDragEnd(newItems);
    } else {
      // 드래깅 중인 상태 업데이트는 로컬 상태로 처리
      setCurrentItems(newItems);
    }
  };
  // 항목 업데이트 로직 분리
  function updateItems(dragIndex: number, hoverIndex: number) {
    const newItems = [...currentItems];
    const draggedItem = newItems.splice(dragIndex, 1)[0];
    newItems.splice(hoverIndex, 0, draggedItem);
    return newItems.map((item, index) => ({ ...item, order: index }));
  }

  return (
    <>
      {doubleDnD ? (
        <>
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
        </>
      ) : (
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
      )}
    </>
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
  return dragItem && itemRenderer(dragItem, ref, isDragging); // 항목 랜더링.
};
