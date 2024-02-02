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
  width?: string;
  isSimilarQuiz?: boolean;
  componentWidth?: string;
};

export function MathviewerCard({
  onClick,
  isSimilar,
  selectedCardIndex,
  onSelectCard,
  index,
  data,
  width,
  isSimilarQuiz,
  componentWidth,
}: MathviewerCardProps) {
  const [contentList, setContentList] = useState(data);
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
        $isSelected={index === selectedCardIndex}
        $componentWidth={componentWidth}
      >
        <div className="leftInfomation">
          <div className="numbering">{index}</div>
          <LuBookmarkPlus
            fontSize={'25px'}
            style={{ cursor: 'pointer', color: 'gray' }}
          />
          <div>중</div>
          <div>객관식</div>
        </div>
        <MathViewer data={data} width={width}></MathViewer>
        {isSimilarQuiz ? (
          <SimilarButtonWrapper>
            <Button
              buttonType="button"
              onClick={onClick}
              $padding="10px"
              height={'30px'}
              width={'70px'}
              fontSize="12px"
              $normal
              cursor
            >
              <span>교체</span>
            </Button>
            <Button
              buttonType="button"
              onClick={onClick}
              $padding="10px"
              height={'30px'}
              width={'70px'}
              fontSize="12px"
              $normal
              cursor
            >
              <span>+ 추가</span>
            </Button>
            <div className="menuIcon">
              <IoMenuOutline fontSize={'30px'} style={{ cursor: 'grab' }} />
              <LuSiren
                fontSize={'25px'}
                color="red"
                style={{ cursor: 'pointer' }}
              />
            </div>
          </SimilarButtonWrapper>
        ) : (
          <ButtonWrapper>
            <div className="menuIcon">
              <IoMenuOutline fontSize={'30px'} style={{ cursor: 'grab' }} />
            </div>

            {index === selectedCardIndex && isSimilar ? (
              <div
                onClick={() => {
                  onSelectCard(index);
                }}
              >
                <Button
                  buttonType="button"
                  onClick={onClick}
                  $padding="10px"
                  height={'30px'}
                  width={'70px'}
                  fontSize="12px"
                  $filled
                  cursor
                >
                  <span>유사문항</span>
                </Button>
              </div>
            ) : (
              <div
                onClick={() => {
                  onSelectCard(index);
                }}
              >
                <Button
                  buttonType="button"
                  onClick={onClick}
                  $padding="10px"
                  height={'30px'}
                  width={'70px'}
                  fontSize="12px"
                  $normal
                  cursor
                >
                  <span>유사문항</span>
                </Button>
              </div>
            )}
            <div>
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
        )}
      </Component>
    </>
  );
}

const Component = styled.div<{
  $isSimilar?: boolean;
  $isSelected?: boolean;
  $componentWidth?: string;
}>`
  display: flex;
  //justify-content: space-between;
  //min-width: 600px;
  width: ${({ $componentWidth }) =>
    $componentWidth ? ` ${$componentWidth};` : '600px'};
  min-height: 250px;
  background-color: white;
  border-radius: 15px;
  padding: ${({ $componentWidth }) => ($componentWidth ? '20px;' : '10px')};
  border: ${({ $isSelected, $isSimilar }) =>
    $isSimilar && $isSelected
      ? `3px solid ${COLOR.PRIMARY}`
      : '3px solid white'};
  border: ${({ $componentWidth }) => !$componentWidth && `1px solid gray`};
  .leftInfomation {
    width: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding-right: 20px;
    font-size: 14px;
  }
  .numbering {
    font-size: 20px;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 70px;

  .menuIcon {
    display: flex;
    justify-content: flex-end;
  }

  div {
    display: flex;
    justify-content: center;
    gap: 5px;
  }
`;
const SimilarButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding-left: 10px;

  .menuIcon {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;
