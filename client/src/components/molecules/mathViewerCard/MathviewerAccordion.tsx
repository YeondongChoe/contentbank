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
import {
  ContentWithScore,
  QuizList,
  LastArticle,
  QuizItemList,
  QuizCategoryList,
} from '../../../types/WorkbookType';
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
          <span className="number">{quizNum}</span>
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
  reportQuizitem?: () => void;
  changeQuizitem?: () => void;
  addQuizItem?: () => void;
  deleteQuizItem?: () => void;
  favoriteQuizItem?: (e: any) => void;
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
  quotient?: number;
  minQuotient?: number;
  maxQuotient?: number;
  equalScore?: number;
  remainderContent?: number;
  nextRemainderContent?: number;
  setTotalEqualScore?: React.Dispatch<React.SetStateAction<number>>;
  category?: any;
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
  quotient,
  minQuotient,
  maxQuotient,
  equalScore,
  remainderContent,
  nextRemainderContent,
  category,
  setTotalEqualScore,
}: MathviewerCardProps) {
  const [didMount, setDidMount] = useState(false);
  const [quotientOption, setQuotientOption] = useState<any>([]);
  const [isRemainderContent, setIsRemainderContent] = useState(false);
  const [isNextRemainderContent, setIsNextRemainderContent] = useState(false);
  const [quotientAddOne, setQuotientAddOne] = useState<number>();
  const [contentNumQuotient, setContentNumQuotient] =
    useRecoilState<ContentWithScore[]>(contentQuotient);
  console.log(category);

  //문항 삭제될때마다 총점 변경
  const totalEqualScore = useMemo(
    () => contentNumQuotient.reduce((acc, el) => acc + el.score, 0),
    [contentNumQuotient, deleteQuizItem],
  );

  useEffect(() => {
    if (setTotalEqualScore) {
      setTotalEqualScore(totalEqualScore);
    }
  }, [contentNumQuotient, totalEqualScore]);

  useEffect(() => {
    if (quotient !== undefined) {
      setQuotientAddOne(quotient + 1);
    }
  }, []);

  const [selectedValue, setSelectedValue] = useState<number>();
  const [selectedQuizNum, setSelectedQuizNum] = useState<number>();

  useEffect(() => {
    if (selectedValue === undefined) {
      return; // selectedValue가 undefined일 경우 아무 작업도 수행하지 않음
    }

    const updatedData = contentNumQuotient.map((item) => {
      if (item.quizNum === selectedQuizNum) {
        return { ...item, score: selectedValue as number };
      }
      return item;
    });
    setContentNumQuotient(updatedData);
  }, [selectedValue]);

  useEffect(() => {
    if (minQuotient === quotient) {
      setQuotientOption([
        { code: '0', idx: 0, name: `${minQuotient}점`, value: minQuotient },
        { code: '1', idx: 1, name: `${maxQuotient}점`, value: maxQuotient },
      ]);
    } else {
      setQuotientOption([
        { code: '0', idx: 0, name: `${minQuotient}점`, value: minQuotient },
        {
          code: '1',
          idx: 1,
          name: `${quotient ? quotient : 0}점`,
          value: quotient ? quotient : 0,
        },
        { code: '2', idx: 2, name: `${maxQuotient}점`, value: maxQuotient },
      ]);
    }
  }, [quotient, minQuotient, maxQuotient]);

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      const isQuizNumExists = contentNumQuotient.some(
        (item) => item.quizNum === quizNum,
      );

      const newData: ContentWithScore = {
        quizNum: quizNum as number,
        score: isRemainderContent
          ? (quotient as number)
          : isNextRemainderContent
            ? (quotientAddOne as number)
            : 0,
        code: data.code,
      };

      if (!isQuizNumExists) {
        // 기존에 없는 경우, 새로운 데이터 추가
        setContentNumQuotient((prevData) => [...prevData, newData]);
      }
    }
  }, [didMount, quizNum]);

  useEffect(() => {
    if (
      quizNum !== undefined &&
      remainderContent !== undefined &&
      nextRemainderContent !== undefined
    ) {
      setIsRemainderContent(quizNum <= remainderContent);
      setIsNextRemainderContent(quizNum >= nextRemainderContent);
    }
  }, [quizNum, remainderContent, nextRemainderContent]);

  return (
    <Accordion
      onClick={onClick}
      changeQuizitem={changeQuizitem}
      addQuizItem={addQuizItem}
      title={title}
      quizNum={quizNum}
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
          {/* {isFavorite ? (
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
          )} */}
          <LuBookmarkPlus
            onClick={favoriteQuizItem}
            style={{ width: '18px', cursor: 'pointer' }}
          ></LuBookmarkPlus>
          <div>{category?.난이도 || 'N/A'}</div>
          <div>{category?.문항타입 || 'N/A'}</div>
          {!isSimilarQuiz && !isNewQuiz && equalScore === 2 && (
            <Select
              width={'90px'}
              options={quotientOption}
              isnormalizedOptions
              defaultValue={
                isRemainderContent
                  ? `${quotient?.toString()}점`
                  : isNextRemainderContent
                    ? `${quotientAddOne?.toString()}점`
                    : undefined
              }
              setSelectedQuotientValue={setSelectedValue}
              onClick={() => setSelectedQuizNum(quizNum as number)}
            ></Select>
          )}
        </div>
        <WorkbookMathViewer
          data={data}
          width={width}
          answerCommentary={'문제만'}
        ></WorkbookMathViewer>
        {isNewQuiz ? (
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
