import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';

import { BiSolidTrashAlt } from 'react-icons/bi';
import { GoFold, GoUnfold } from 'react-icons/go';
import { IoMenuOutline } from 'react-icons/io5';
import { LuSiren, LuBookmarkPlus } from 'react-icons/lu';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';

import { WorkbookMathViewer } from '../../../components/mathViewer';
import { contentQuotient } from '../../../store/utilAtom';
import { ItemQuestionType } from '../../../types/ItemQuestionType';
import { ContentWithScore, QuizList } from '../../../types/WorkbookType';
import { Button, Select, CheckBoxI, Icon } from '../../atom';
import { COLOR } from '../../constants';
import { MathViewer } from '../../mathViewer/MathViewer';

type AccordionProps = {
  onClick: () => void;
  changeQuizitem?: () => void;
  addQuizItem?: () => void;
  title?: string;
  quizNum?: number;
  children: React.ReactNode;
  componentWidth?: string;
  componentHeight?: string;
  isSimilar?: boolean;
  isSelected?: boolean;
  isBorder?: boolean;
  isSimilarQuiz?: boolean;
  isNewQuiz?: boolean;
  index: number;
};

function Accordion({
  onClick,
  title,
  quizNum,
  children,
  isSimilarQuiz,
  isNewQuiz,
  componentWidth,
  componentHeight,
  isSimilar,
  isSelected,
  isBorder,
  index,
  changeQuizitem,
  addQuizItem,
}: AccordionProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleAccordion = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <AccordionContainer
      $componentWidth={componentWidth}
      $isSimilar={isSimilar}
      $isSelected={isSelected}
      $isBorder={isBorder}
    >
      <AccordionHeader>
        <AccordionHeaderTitle>
          <span className="number">{index + 1}</span>
          <span className="title">{title}</span>
        </AccordionHeaderTitle>
        <ActionButtonWrapper>
          {isNewQuiz && (
            <>
              {isSimilarQuiz ? (
                <>
                  <Button
                    buttonType="button"
                    onClick={changeQuizitem}
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
                    onClick={addQuizItem}
                    $padding="10px"
                    height={'30px'}
                    width={'70px'}
                    fontSize="12px"
                    $normal
                    cursor
                  >
                    <span>+ 추가</span>
                  </Button>
                </>
              ) : (
                <Button
                  buttonType="button"
                  onClick={addQuizItem}
                  $padding="10px"
                  height={'30px'}
                  width={'70px'}
                  fontSize="12px"
                  $normal
                  cursor
                >
                  <span>+ 추가</span>
                </Button>
              )}
            </>
          )}
          {isCollapsed ? (
            <GoUnfold
              fontSize={'30px'}
              style={{ cursor: 'pointer' }}
              onClick={toggleAccordion}
            ></GoUnfold>
          ) : (
            <GoFold
              fontSize={'30px'}
              style={{ cursor: 'pointer' }}
              onClick={toggleAccordion}
            />
          )}
        </ActionButtonWrapper>
      </AccordionHeader>
      {!isCollapsed && <AccordionContent>{children}</AccordionContent>}
    </AccordionContainer>
  );
}

type MathviewerCardProps = {
  onClick: () => void;
  reportQuizitem?: (idx: number) => void;
  changeQuizitem?: () => void;
  addQuizItem?: () => void;
  deleteQuizItem?: () => void;
  favoriteQuizItem?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    idx: number,
    isFavorite: boolean,
    type: string,
  ) => void;
  isFavorite?: boolean;
  isSimilar?: boolean;
  isBorder?: boolean;
  data: QuizList;
  index: number;
  quizNum?: number;
  selectedCardIndex: number | undefined;
  onSelectCard: (index: number) => void;
  width?: string;
  isSimilarQuiz?: boolean;
  isNewQuiz?: boolean;
  componentWidth?: string;
  componentHeight?: string;
  className?: string;
  title?: string;
  category?: any;
  viewerOption?: string;
};

export function MathviewerAccordion({
  onClick,
  reportQuizitem,
  changeQuizitem,
  addQuizItem,
  deleteQuizItem,
  favoriteQuizItem,
  isFavorite,
  isSimilar,
  isBorder,
  selectedCardIndex,
  onSelectCard,
  index,
  quizNum,
  data,
  width,
  isSimilarQuiz,
  isNewQuiz,
  componentWidth,
  componentHeight,
  className,
  title,
  category,
  viewerOption,
}: MathviewerCardProps) {
  return (
    <Accordion
      onClick={onClick}
      changeQuizitem={changeQuizitem}
      addQuizItem={addQuizItem}
      title={title}
      quizNum={quizNum}
      index={index}
      componentWidth={componentWidth}
      componentHeight={componentHeight}
      isSimilar={isSimilar}
      isBorder={isBorder}
      isSelected={index === selectedCardIndex}
      isSimilarQuiz={isSimilarQuiz}
      isNewQuiz={isNewQuiz}
    >
      <Component className={className} $componentHeight={componentHeight}>
        {/* <div className="leftInfomation">
          {isFavorite ? (
            <Icon
              width={`18px`}
              src={`/images/icon/favorites_on.svg`}
              onClick={favoriteQuizItem}
              cursor
            />
          ) : (
            <Icon
              width={`18px`}
              src={`/images/icon/favorites${`_off_B`}.svg`}
              onClick={favoriteQuizItem}
              cursor
            />
          )}
          <div>{category?.난이도 || 'N/A'}</div>
          <div>{category?.문항타입 || 'N/A'}</div>
        </div> */}
        <WorkbookMathViewer
          data={data}
          width={width}
          answerCommentary={
            viewerOption === '문제만 보기'
              ? '문제만'
              : viewerOption === '문제+정답'
                ? '문제+정답'
                : viewerOption === '문제+정답+해설'
                  ? '문제+정답+해설'
                  : '문제만'
          }
          isNewQuiz={isNewQuiz}
          reportQuizitem={reportQuizitem}
          favoriteQuizItem={favoriteQuizItem}
        ></WorkbookMathViewer>
        {/* {isNewQuiz ? (
          <ButtonWrapper>
            <div className="menuIcon">
              <LuSiren
                fontSize={'25px'}
                color="red"
                style={{ cursor: 'pointer' }}
                onClick={reportQuizitem}
              />
            </div>
          </ButtonWrapper>
        ) : (
          <ButtonWrapper>
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
                onClick={reportQuizitem}
              />
              <BiSolidTrashAlt
                fontSize={'25px'}
                style={{ cursor: 'pointer' }}
                onClick={deleteQuizItem}
              />
            </div>
          </ButtonWrapper>
        )} */}
      </Component>
    </Accordion>
  );
}

const Component = styled.div<{
  $isDragged?: boolean;
  $componentHeight?: string;
}>`
  display: flex;
  min-height: ${({ $componentHeight }) =>
    $componentHeight ? ` ${$componentHeight};` : '250px'};
  background-color: white;
  padding: 10px;
  border-radius: 15px;

  .leftInfomation {
    width: 100px;
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
  ${({ $isDragged }) =>
    $isDragged &&
    `
    transition: transform 0.3s ease-in-out;
    transform: translate(0, 0);
    border: 3px solid ${COLOR.PRIMARY};
  `}
`;
const ActionButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
`;
const ButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;

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

const AccordionContainer = styled.div<{
  $isSimilar?: boolean;
  $isSelected?: boolean;
  $componentWidth?: string;
  $isDragged?: boolean;
  $isBorder?: boolean;
}>`
  width: ${({ $componentWidth }) =>
    $componentWidth ? ` ${$componentWidth};` : '600px'};
  border: ${({ $isSelected, $isSimilar }) =>
    $isSimilar && $isSelected
      ? `3px solid ${COLOR.PRIMARY}`
      : '3px solid white'};
  background-color: white;
  border-radius: 15px;
  margin-top: 10px;
  border: ${({ $isBorder }) => $isBorder && `solid 1px ${COLOR.PRIMARY}`};
`;

const AccordionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: white;
  border: 3px solid white;
  width: 100%;
  border-radius: 15px;
`;

const AccordionHeaderTitle = styled.div`
  display: flex;
  padding-left: 16px;
  gap: 20px;
  .number {
    font-size: 18px;
    font-weight: bold;
  }
  .title {
    font-size: 16px;
  }
`;

const AccordionContent = styled.div`
  //border: 1px solid red;
  border-radius: 15px;
`;
