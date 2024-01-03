import * as React from 'react';
import { useRef, useState } from 'react';

import { BiSolidTrashAlt } from 'react-icons/bi';
import { IoMenuOutline } from 'react-icons/io5';
import { LuSiren, LuBookmarkPlus } from 'react-icons/lu';
import { styled } from 'styled-components';

import { ItemQuestionType } from '../../../types';
import { Button } from '../../atom';
import { COLOR } from '../../constants';
import { MathViewer } from '../../mathViewer/MathViewer';

type MathviewerCardProps = {
  onClick: () => void;
  isSimilar?: boolean;
  data: ItemQuestionType;
  index: number;
  selectedCardIndex: number | undefined;
  onSelectCard: (index: number) => void;
};

export function MathviewerCard({
  onClick,
  isSimilar,
  selectedCardIndex,
  onSelectCard,
  index,
  data,
}: MathviewerCardProps) {
  const [contentList, setContentList] = useState(data);
  const propcessData = { ...data };
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const dragStart = (e: React.DragEvent, position: number) => {
    dragItem.current = position;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', '');
  };
  const dragEnter = (e: React.DragEvent, position: number) => {
    dragOverItem.current = position;
  };
  const dragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  // const drop = (e: React.DragEvent) => {
  //   e.preventDefault();
  //   if (dragItem.current !== null && dragOverItem.current !== null) {
  //     const newList = [...contentList];
  //     const [removed] = newList.splice(dragItem.current, 1);
  //     newList.splice(dragOverItem.current, 0, removed);
  //     dragItem.current = null;
  //     dragOverItem.current = null;
  //     setContentList(newList);
  //   }
  // };

  return (
    <>
      <Component
        //draggable
        //onDragStart={(e) => dragStart(e, index)}
        //onDragEnter={(e) => dragEnter(e, index)}
        //onDragOver={dragOver}
        //onDragEnd={drop}
        $isSimilar={isSimilar}
        isSelected={index === selectedCardIndex}
        onClick={() => {
          onSelectCard(index);
        }}
      >
        <div className="numbering">{index}</div>
        <MathViewer data={data} width="350px"></MathViewer>
        <ButtonWrapper>
          <div className="menuIcon">
            <IoMenuOutline fontSize={'30px'} style={{ cursor: 'grab' }} />
          </div>
          {index === selectedCardIndex && isSimilar ? (
            <Button
              buttonType="button"
              onClick={onClick}
              $padding="10px"
              height={'30px'}
              width={'70px'}
              fontSize="12px"
              $margin="0 0 60px 0"
            >
              <span>유사문항</span>
            </Button>
          ) : (
            <Button
              buttonType="button"
              onClick={onClick}
              $padding="10px"
              height={'30px'}
              width={'70px'}
              fontSize="12px"
              $margin="0 0 60px 0"
              $border
            >
              <span>유사문항</span>
            </Button>
          )}
          <div>
            <LuBookmarkPlus fontSize={'25px'} style={{ cursor: 'pointer' }} />
            <LuSiren
              fontSize={'25px'}
              color="red"
              style={{ cursor: 'pointer' }}
            />
            <BiSolidTrashAlt fontSize={'25px'} style={{ cursor: 'pointer' }} />
          </div>
        </ButtonWrapper>
      </Component>
    </>
  );
}

const Component = styled.div<{
  $isSimilar?: boolean;
  isSelected?: boolean;
}>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 200px;
  background-color: white;
  border-radius: 15px;
  padding: 10px;
  border: ${({ isSelected, $isSimilar }) =>
    $isSimilar && isSelected
      ? `3px solid ${COLOR.PRIMARY}`
      : '3px solid white'};

  .numbering {
    padding-right: 10px;
    font-size: 18px;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  gap: 10px;

  .menuIcon {
    display: flex;
    justify-content: flex-end;
  }

  div {
    display: flex;
    gap: 5px;
  }
`;
