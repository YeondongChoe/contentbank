import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';

import { BiSolidTrashAlt } from 'react-icons/bi';
import { GoFold, GoUnfold } from 'react-icons/go';
import { LuSiren } from 'react-icons/lu';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';

import { contentQuotient } from '../../../store/utilAtom';
import { ContentWithScore, QuizList } from '../../../types/WorkbookType';
import { Button, Select, Icon } from '../../atom';
import { COLOR } from '../../constants';
import { WorkbookMathViewer } from '../../mathViewer';

type AccordionProps = {
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
  itemIndex: number;
};

function Accordion({
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
  itemIndex,
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
          <span className="number">{itemIndex + 1}</span>
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
  onClick: (code: string, order: number, idx: number) => void;
  reportQuizitem?: (idx: number) => void;
  changeQuizitem?: () => void;
  addQuizItem?: () => void;
  deleteQuizItem?: (code: string, type: string) => void;
  clickSwapQuizItem?: () => void;
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
  quotient?: number;
  equalScore?: number;
  remainderContent?: number;
  nextRemainderContent?: number;
  setTotalEqualScore?: React.Dispatch<React.SetStateAction<number>>;
  category?: any;
  viewerOption?: string;
  code: string;
  itemIndex: number;
  quotientOption: { code: string; idx: number; name: string; value: number }[];
  initialItems: QuizList[];
  setInitialItems: React.Dispatch<React.SetStateAction<QuizList[]>>;
};

export function MathviewerAccordionStep2({
  onClick,
  reportQuizitem,
  changeQuizitem,
  addQuizItem,
  deleteQuizItem,
  clickSwapQuizItem,
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
  equalScore,
  remainderContent,
  nextRemainderContent,
  category,
  setTotalEqualScore,
  viewerOption,
  code,
  itemIndex,
  quotientOption,
  initialItems,
  setInitialItems,
}: MathviewerCardProps) {
  const [didMount, setDidMount] = useState(false);
  const [isRemainderContent, setIsRemainderContent] = useState(false);
  const [isNextRemainderContent, setIsNextRemainderContent] = useState(false);
  const [quotientAddOne, setQuotientAddOne] = useState<number>();
  const [contentNumQuotient, setContentNumQuotient] =
    useRecoilState<ContentWithScore[]>(contentQuotient);

  //문항 삭제 추가 될때마다 총점 변경
  // const totalEqualScore = useMemo(() => {
  //   const total = contentNumQuotient.reduce((acc, el) => acc + el.score, 0);
  //   return isNaN(total) ? 0 : total;
  // }, [contentNumQuotient, deleteQuizItem, addQuizItem, clickSwapQuizItem]);

  // useEffect(() => {
  //   if (setTotalEqualScore) {
  //     setTotalEqualScore(totalEqualScore);
  //   }
  // }, [contentNumQuotient, totalEqualScore]);

  // useEffect(() => {
  //   if (quotient !== undefined) {
  //     setQuotientAddOne(quotient + 1);
  //   }
  // }, []);

  const [selectedValue, setSelectedValue] = useState<number>();
  const [selectedQuizNum, setSelectedQuizNum] = useState<number>();
  const [selectedQuizCode, setSelectedQuizCode] = useState<string>();

  useEffect(() => {
    if (selectedQuizCode !== undefined && selectedValue !== undefined) {
      // updatedItems를 순회해서 조건에 맞는 항목 수정
      const newItems = initialItems.map((item) => ({
        ...item,
        quizItemList: item.quizItemList.map((el) =>
          el.code === selectedQuizCode
            ? { ...el, score: selectedValue } // 조건에 맞는 항목의 score 업데이트
            : el,
        ),
      }));

      setInitialItems(newItems); // 상태 업데이트
      // score의 합계 계산
      const totalScore = newItems.reduce((total, item) => {
        const quizScoreSum = item.quizItemList.reduce((sum, el) => {
          return sum + (Number(el.score) || 0); // score를 숫자로 변환해서 합산
        }, 0);
        return total + quizScoreSum;
      }, 0);

      // score 합계를 상태에 업데이트
      setTotalEqualScore && setTotalEqualScore(totalScore);
    }
  }, [selectedQuizCode, selectedValue]);

  // useEffect(() => {
  //   if (selectedValue === undefined) {
  //     return; // selectedValue가 undefined일 경우 아무 작업도 수행하지 않음
  //   }

  //   const updatedData = contentNumQuotient.map((item) => {
  //     if (item.num === selectedQuizNum) {
  //       return { ...item, score: selectedValue as number };
  //     }
  //     return item;
  //   });
  //   console.log('updatedData', updatedData);
  //   setContentNumQuotient(updatedData);
  // }, [selectedValue]);

  useEffect(() => {
    setDidMount(true);
  }, []);

  //최초 문항이 추가
  // useEffect(() => {
  //   if (didMount) {
  //     const isQuizNumExists = contentNumQuotient.some(
  //       (item) => item.code === code,
  //     );

  //     const newData: ContentWithScore = {
  //       index: index,
  //       num: quizNum as number,
  //       score: isRemainderContent
  //         ? (quotient as number)
  //         : isNextRemainderContent
  //           ? (quotientAddOne as number)
  //           : (quotient as number),
  //       code: data.code,
  //     };

  //     if (!isQuizNumExists) {
  //       // 기존에 없는 경우, 새로운 데이터 추가
  //       setContentNumQuotient((prevData) => [...prevData, newData]);
  //     }
  //   }
  // }, [didMount]);

  // useEffect(() => {
  //   if (
  //     quizNum !== undefined &&
  //     remainderContent !== undefined &&
  //     nextRemainderContent !== undefined
  //   ) {
  //     setIsRemainderContent(quizNum <= remainderContent);
  //     setIsNextRemainderContent(quizNum >= nextRemainderContent);
  //   }
  // }, [quizNum, remainderContent, nextRemainderContent]);
  //console.log('contentNumQuotient', contentNumQuotient);

  // const getDefaultValue = () => {
  //   const matchedItem = contentNumQuotient.find((item) => item.num === quizNum);
  //   if (matchedItem) {
  //     return `${matchedItem.score}점`;
  //   } else if (isRemainderContent) {
  //     return `${quotient?.toString()}점`;
  //   } else if (isNextRemainderContent) {
  //     return `${quotientAddOne?.toString()}점`;
  //   } else {
  //     return undefined;
  //   }
  // };

  // const getDefaultValue = () => {
  //   // initialItems 배열에서 각 항목을 순회
  //   for (const item of initialItems) {
  //     // quizItemList 배열에서 QUESTION 항목을 필터링하고 num 값 비교
  //     const matchedQuiz = item.quizItemList.find(
  //       (quiz) => quiz.type === 'QUESTION' && quiz.num === quizNum,
  //     );
  //     console.log('matchedQuiz', matchedQuiz);
  //     // 조건에 맞는 항목이 존재하면 해당 score 반환
  //     if (matchedQuiz) {
  //       return `${matchedQuiz.score}점`;
  //     }
  //   }
  //   // 조건에 맞는 항목이 없으면 undefined 반환
  //   return undefined;
  // };

  return (
    <Accordion
      changeQuizitem={changeQuizitem}
      addQuizItem={addQuizItem}
      title={title}
      itemIndex={itemIndex}
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
          {!isSimilarQuiz &&
            !isNewQuiz &&
            equalScore === 2 &&
            quotient !== 0 && (
              <Select
                width={'90px'}
                options={quotientOption}
                isnormalizedOptions
                defaultValue={getDefaultValue()}
                setSelectedQuotientValue={setSelectedValue}
                onClick={() => setSelectedQuizNum(quizNum as number)}
              ></Select>
            )}
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
          isFavorite={isFavorite}
          favoriteQuizItem={favoriteQuizItem}
          category={category}
          isSimilarQuiz={isSimilarQuiz}
          quotient={quotient}
          equalScore={equalScore}
          quotientOption={quotientOption}
          //getDefaultValue={getDefaultValue}
          setSelectedValue={setSelectedValue}
          setSelectedQuizNum={setSelectedQuizNum}
          quizNum={quizNum}
          isNewQuiz={isNewQuiz}
          index={index}
          selectedCardIndex={selectedCardIndex}
          isSimilar={isSimilar}
          onClick={onClick}
          reportQuizitem={reportQuizitem}
          onSelectCard={onSelectCard}
          deleteQuizItem={deleteQuizItem}
          code={code}
          setSelectedQuizCode={setSelectedQuizCode}
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
