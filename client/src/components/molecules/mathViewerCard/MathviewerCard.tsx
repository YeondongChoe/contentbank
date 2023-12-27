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
import Contents2 from '../../mathViewer/test2.json';

type MathwiewerCardProps = {
  list?: ItemQuestionType[];
  onClick: () => void;
  isSimilar?: boolean;
  selectedCardIndex: number | undefined;
  onSelectCard: (value: number) => void;
  onCardClick: (value: number) => void;
};

export function MathwiewerCard({
  list = [],
  onClick,
  isSimilar,
  selectedCardIndex,
  onSelectCard,
  onCardClick,
}: MathwiewerCardProps) {
  const [contentList, setContentList] = useState(list);
  const [selected, setSelected] = useState<number | null>(null);

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
  const drop = (e: React.DragEvent) => {
    e.preventDefault();
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const newList = [...contentList];
      const [removed] = newList.splice(dragItem.current, 1);
      newList.splice(dragOverItem.current, 0, removed);
      dragItem.current = null;
      dragOverItem.current = null;
      setContentList(newList);
    }
  };
  console.log(selectedCardIndex);

  return (
    <>
      {contentList.map((el, i) => (
        <Component
          key={i}
          draggable
          onDragStart={(e) => dragStart(e, i)}
          onDragEnter={(e) => dragEnter(e, i)}
          onDragOver={dragOver}
          onDragEnd={drop}
          $isSimilar={isSimilar}
          isSelected={i === selectedCardIndex} // 추가: 현재 카드가 선택된 카드인지 확인
          onClick={() => {
            onSelectCard(i);
            onCardClick(i);
            setSelected(i);
          }} // 추가: 카드 클릭 시 선택 함수 호출
        >
          <div>{el.doc_num}</div>
          <MathViewer data={el} width="350px"></MathViewer>
          <ButtonWrapper>
            <div className="menuIcon">
              <IoMenuOutline fontSize={'30px'} style={{ cursor: 'grab' }} />
            </div>
            {isSimilar ? (
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
              <BiSolidTrashAlt
                fontSize={'25px'}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </ButtonWrapper>
        </Component>
      ))}
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
  border: ${({ $isSimilar, isSelected }) =>
    $isSimilar || isSelected
      ? `3px solid ${COLOR.PRIMARY};`
      : '3px solid white'};
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
