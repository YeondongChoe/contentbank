import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { DndProvider, useDrag, useDrop, DragSourceMonitor } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';

import { COLOR } from '../../constants/COLOR';

export type DnDListProps = DnDListItemProps[];
export type DnDListItemProps = {
  id: number;
  column: string;
  index: number;
  name: string;
  type: string;
};

const MovableItem = ({
  name,
  index,
  currentColumnName,
  moveCardHandler,
  setItems,
}: {
  name?: string;
  index: number;
  currentColumnName: string;
  moveCardHandler: (dragIndex: number, hoverIndex: number) => void;
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const [, drop] = useDrop({
    accept: 'Our first type',
    hover(item: DnDListItemProps, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect: DOMRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      if (clientOffset) {
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        // Time to actually perform the action
        moveCardHandler(dragIndex, hoverIndex);
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'image',
    item: { index, name, currentColumnName, type: 'Our first type' },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} className="movable-item" style={{ opacity }}>
      name:
      {name}
    </div>
  );
};

const DnDList = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'Our first type',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const getBackgroundColor = () => {
    if (isOver) {
      if (canDrop) {
        return `${COLOR.SELECT_HOVER}`;
      } else if (!canDrop) {
        return 'rgb(255, 255, 255)';
      }
    } else {
      return '';
    }
  };

  return (
    <div
      ref={drop}
      className={`dnd-list-default ${className}`}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      {children}
    </div>
  );
};

export function DnDWrapperB({
  height,
  list,
  className,
}: {
  height: string;
  list: any[];
  className?: string;
}) {
  const [items, setItems] = useState(list);

  const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((prevState) => {
        const coppiedStateArray = [...prevState];

        // remove item by "hoverIndex" and put "dragItem" instead
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

        // remove item by "dragIndex" and put "prevItem" instead
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      });
    }
  };

  return (
    // <Container height={height}>
    <DndProvider backend={HTML5Backend}>
      <DnDList className={`column do-it-column ${className}`}>
        {items.map((item, index) => (
          <MovableItem
            key={item.id}
            name={item.name}
            currentColumnName={item.column}
            setItems={setItems}
            index={index}
            moveCardHandler={moveCardHandler}
          />
        ))}
      </DnDList>
    </DndProvider>
    // </Container>
  );
}

const Container = styled.div<{ height: string }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: ${({ height }) => (height ? ` ${height}` : `100%`)};

  .dnd-list-default {
    margin: 10px 0;
    /* padding-right: 10px; */
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    height: max-content;
  }

  .movable-item {
    padding: 10px;
    width: 100%;
    text-align: left;
    margin: 5px;
    border: 1px solid ${COLOR.BORDER_BLUE};
    border-radius: 5px;
  }
`;
