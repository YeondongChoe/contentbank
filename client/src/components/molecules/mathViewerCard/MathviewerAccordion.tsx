import * as React from 'react';
import { useState } from 'react';

import { BiSolidTrashAlt } from 'react-icons/bi';
import { GoFold, GoUnfold } from 'react-icons/go';
import { IoMenuOutline } from 'react-icons/io5';
import { LuSiren, LuBookmarkPlus } from 'react-icons/lu';
import { styled } from 'styled-components';

import { WorkbookMathViewer } from '../../../components/mathViewer';
import { ItemQuestionType } from '../../../types/ItemQuestionType';
import { QuizList } from '../../../types/WorkbookType';
import { Button } from '../../atom';
import { COLOR } from '../../constants';
import { MathViewer } from '../../mathViewer/MathViewer';

type AccordionProps = {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
  componentWidth?: string;
  componentHeight?: string;
  isSimilar?: boolean;
  isSelected?: boolean;
  isBorder?: boolean;
  isSimilarQuiz?: boolean;
  isNewQuiz?: boolean;
};

function Accordion({
  onClick,
  title,
  children,
  isSimilarQuiz,
  isNewQuiz,
  componentWidth,
  componentHeight,
  isSimilar,
  isSelected,
  isBorder,
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
        <span>{title}</span>
        <ActionButtonWrapper>
          {isNewQuiz && (
            <>
              {isSimilarQuiz ? (
                <>
                  <Button
                    buttonType="button"
                    onClick={() => {}}
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
                    onClick={() => {}}
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
                  onClick={() => {}}
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
  reportOnClick?: () => void;
  isSimilar?: boolean;
  isBorder?: boolean;
  data: QuizList;
  index: number;
  selectedCardIndex: number | undefined;
  onSelectCard: (index: number) => void;
  width?: string;
  isSimilarQuiz?: boolean;
  isNewQuiz?: boolean;
  componentWidth?: string;
  componentHeight?: string;
  className?: string;
};

export function MathviewerAccordion({
  onClick,
  reportOnClick,
  isSimilar,
  isBorder,
  selectedCardIndex,
  onSelectCard,
  index,
  data,
  width,
  isSimilarQuiz,
  isNewQuiz,
  componentWidth,
  componentHeight,
  className,
}: MathviewerCardProps) {
  return (
    <Accordion
      onClick={onClick}
      title={`Question ${index}`}
      componentWidth={componentWidth}
      componentHeight={componentHeight}
      isSimilar={isSimilar}
      isBorder={isBorder}
      isSelected={index === selectedCardIndex}
      isSimilarQuiz={isSimilarQuiz}
      isNewQuiz={isNewQuiz}
    >
      <Component className={className} $componentHeight={componentHeight}>
        <div className="leftInfomation">
          <LuBookmarkPlus
            fontSize={'25px'}
            style={{ cursor: 'pointer', color: 'gray' }}
          />
          <div>중</div>
          <div>객관식</div>
        </div>
        <WorkbookMathViewer data={data} width={width}></WorkbookMathViewer>
        {isNewQuiz ? (
          <ButtonWrapper>
            <div className="menuIcon">
              <LuSiren
                fontSize={'25px'}
                color="red"
                style={{ cursor: 'pointer' }}
                onClick={reportOnClick}
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
                onClick={reportOnClick}
              />
              <BiSolidTrashAlt
                fontSize={'25px'}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </ButtonWrapper>
        )}
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

const AccordionContent = styled.div`
  //border: 1px solid red;
  border-radius: 15px;
`;
