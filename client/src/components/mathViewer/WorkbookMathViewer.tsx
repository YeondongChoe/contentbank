import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { MathJax, MathJax3Object, MathJaxContext } from 'better-react-mathjax';
import { BiSolidTrashAlt } from 'react-icons/bi';
import { LuSiren } from 'react-icons/lu';
import styled from 'styled-components';

import { QuizList } from '../../types/WorkbookType';
import { Button, Select, Icon } from '../atom';
import { Loader } from '../atom/Loader';

type WorkbookMathViewerProps = {
  data: QuizList;
  display?: string;
  width?: string;
  padding?: string;
  height?: string;
  isSetp3?: boolean;
  isPdfModal?: boolean;
  answerCommentary: string;
  isFavorite?: boolean;
  favoriteQuizItem?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    idx: number,
    isFavorite: boolean,
    type: string,
  ) => void;
  category?: any;
  quotient?: number;
  equalScore?: number;
  quotientOption?: { code: string; idx: number; name: string; value: number }[];
  getDefaultValue?: () => string | undefined;
  setSelectedValue?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setSelectedQuizNum?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setSelectedQuizCode?: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  quizNum?: number;
  isSimilarQuiz?: boolean;
  isNewQuiz?: boolean;
  index?: number;
  selectedCardIndex?: number | undefined;
  isSimilar?: boolean;
  onClick?: (code: string, index: number, type: string) => void;
  reportQuizitem?: (idx: number) => void;
  onSelectCard?: (index: number) => void;
  deleteQuizItem?: (code: string, type: string) => void;
  code?: string;
};

const config = {
  loader: {
    load: ['[tex]/html'],
  },
  tex: {
    packages: { '[+]': ['html'] },
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]'],
    ],
  },
};

export function WorkbookMathViewer({
  data,
  width,
  padding,
  height,
  isSetp3,
  isPdfModal,
  answerCommentary,
  isFavorite,
  favoriteQuizItem,
  category,
  isSimilarQuiz,
  quotient,
  equalScore,
  quotientOption,
  getDefaultValue,
  setSelectedValue,
  setSelectedQuizNum,
  quizNum,
  isNewQuiz,
  index,
  selectedCardIndex,
  isSimilar,
  onClick,
  reportQuizitem,
  onSelectCard,
  deleteQuizItem,
  code,
  setSelectedQuizCode,
}: WorkbookMathViewerProps) {
  const [display, setDisplay] = useState('none');
  const [mathJax, setMathJax] = useState<MathJax3Object | null>(null);
  //console.log('data', data);
  const offLoader = () => {
    setDisplay('block');
  };

  //각문항당 배점
  const questionItems = data?.quizItemList?.filter(
    (item) => item.type === 'QUESTION',
  );

  const createMarkup = (data: string) => {
    return { __html: data || '' };
  };

  // useEffect(() => {
  //   if (mathJax) {
  //     // Typesetting 완료 이벤트 등록
  //     mathJax.startup.promise.then(() => {
  //       // Typesetting 완료 후 호출될 콜백
  //       mathJax.typeset();
  //     });

  //     // 컴포넌트가 언마운트 될 때 MathJax 정리
  //     return () => {
  //       mathJax.texReset();
  //     };
  //   }
  // }, [mathJax]);

  return (
    <>
      {display === 'none' && <Loader height="50px" size="35px" />}
      <Component
        display={display}
        width={width}
        height={height}
        $padding={padding}
      >
        <MathJaxContext
          version={3}
          config={config}
          //onStartup={(mathJax) => setMathJax(mathJax)}
        >
          <MathJaxWrapper>
            {isSetp3 && (
              <strong>{data.num < 10 ? `0${data.num}` : `${data.num}`}</strong>
            )}
            <MathJax
              inline
              dynamic
              onInitTypeset={() => {
                offLoader();
              }}
            >
              {answerCommentary === '문제만' && (
                <>
                  <>
                    {data?.quizItemList
                      .filter((quiz) => quiz.type === 'TEXT')
                      .map((quiz) => (
                        <MathJaxTextWrapper key={quiz.idx}>
                          <ContentQuestion
                            key={quiz.idx}
                            dangerouslySetInnerHTML={createMarkup(quiz.content)}
                          ></ContentQuestion>
                        </MathJaxTextWrapper>
                      ))}
                    {data?.quizItemList
                      .filter((quiz) => quiz.type === 'BIG')
                      .map((quiz) => (
                        <MathJaxTextWrapper key={quiz.idx}>
                          <ContentQuestion
                            key={quiz.idx}
                            dangerouslySetInnerHTML={createMarkup(quiz.content)}
                          ></ContentQuestion>
                        </MathJaxTextWrapper>
                      ))}
                    {data?.quizItemList
                      .filter((quiz) => quiz.type === 'QUESTION')
                      .map((quiz, i) => (
                        <MathJaxContentWrapper key={quiz.idx}>
                          {!isPdfModal ? (
                            <div className="leftInfomation">
                              {data.type === 'TEXT' ? (
                                <>
                                  {quiz.quizFavorite ? (
                                    <Icon
                                      width={`18px`}
                                      src={`/images/icon/favorites_on.svg`}
                                      onClick={(e) =>
                                        favoriteQuizItem &&
                                        favoriteQuizItem(
                                          e,
                                          quiz.quizIdx as number,
                                          quiz.quizFavorite as boolean,
                                          data.type,
                                        )
                                      }
                                      cursor
                                    />
                                  ) : (
                                    <Icon
                                      width={`18px`}
                                      src={`/images/icon/favorites${`_off_B`}.svg`}
                                      onClick={(e) =>
                                        favoriteQuizItem &&
                                        favoriteQuizItem(
                                          e,
                                          quiz.quizIdx as number,
                                          quiz.quizFavorite as boolean,
                                          data.type,
                                        )
                                      }
                                      cursor
                                    />
                                  )}
                                </>
                              ) : (
                                <>
                                  {data.isFavorite ? (
                                    <Icon
                                      width={`18px`}
                                      src={`/images/icon/favorites_on.svg`}
                                      onClick={(e) =>
                                        favoriteQuizItem &&
                                        favoriteQuizItem(
                                          e,
                                          data.idx as number,
                                          data.isFavorite as boolean,
                                          data.type,
                                        )
                                      }
                                      cursor
                                    />
                                  ) : (
                                    <Icon
                                      width={`18px`}
                                      src={`/images/icon/favorites${`_off_B`}.svg`}
                                      onClick={(e) =>
                                        favoriteQuizItem &&
                                        favoriteQuizItem(
                                          e,
                                          data.idx as number,
                                          data.isFavorite as boolean,
                                          data.type,
                                        )
                                      }
                                      cursor
                                    />
                                  )}
                                </>
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
                                    defaultValue={
                                      questionItems[i]?.score?.toString() ===
                                      undefined
                                        ? '0점'
                                        : `${questionItems[i]?.score?.toString()}점`
                                    }
                                    setSelectedQuotientValue={setSelectedValue}
                                    onClick={() =>
                                      setSelectedQuizCode &&
                                      setSelectedQuizCode(quiz.code as string)
                                    }
                                  ></Select>
                                )}
                            </div>
                          ) : (
                            <></>
                          )}

                          <ContentQuestion
                            key={quiz.idx}
                            dangerouslySetInnerHTML={createMarkup(quiz.content)}
                          ></ContentQuestion>
                          {!isPdfModal ? (
                            <MathJaxIconButton>
                              {isNewQuiz ? (
                                <ButtonWrapper>
                                  <div className="menuIcon">
                                    <LuSiren
                                      fontSize={'25px'}
                                      color="red"
                                      style={{ cursor: 'pointer' }}
                                      onClick={() =>
                                        data.type === 'TEXT'
                                          ? reportQuizitem &&
                                            reportQuizitem(
                                              quiz.quizIdx as number,
                                            )
                                          : reportQuizitem &&
                                            reportQuizitem(data.idx as number)
                                      }
                                    />
                                  </div>
                                </ButtonWrapper>
                              ) : (
                                <ButtonWrapper>
                                  {data.type === 'TEXT' ? (
                                    <>
                                      {quiz.quizIdx === selectedCardIndex &&
                                      isSimilar ? (
                                        <div
                                          onClick={() => {
                                            if (onSelectCard)
                                              onSelectCard(
                                                quiz.quizIdx as number,
                                              );
                                          }}
                                        >
                                          <Button
                                            buttonType="button"
                                            onClick={() =>
                                              data.type === 'TEXT'
                                                ? onClick &&
                                                  onClick(
                                                    quiz.quizCode as string,
                                                    i as number,
                                                    data.type,
                                                  )
                                                : onClick &&
                                                  onClick(
                                                    data.code,
                                                    i,
                                                    data.type,
                                                  )
                                            }
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
                                            if (onSelectCard)
                                              onSelectCard(
                                                quiz.quizIdx as number,
                                              );
                                          }}
                                        >
                                          <Button
                                            buttonType="button"
                                            onClick={() =>
                                              data.type === 'TEXT'
                                                ? onClick &&
                                                  onClick(
                                                    quiz.quizCode as string,
                                                    i as number,
                                                    data.type,
                                                  )
                                                : onClick &&
                                                  onClick(
                                                    data.code,
                                                    i,
                                                    data.type,
                                                  )
                                            }
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
                                    </>
                                  ) : (
                                    <>
                                      {data.idx === selectedCardIndex &&
                                      isSimilar ? (
                                        <div
                                          onClick={() => {
                                            if (onSelectCard)
                                              onSelectCard(data.idx as number);
                                          }}
                                        >
                                          <Button
                                            buttonType="button"
                                            onClick={() =>
                                              data.type === 'TEXT'
                                                ? onClick &&
                                                  onClick(
                                                    quiz.quizCode as string,
                                                    i as number,
                                                    data.type,
                                                  )
                                                : onClick &&
                                                  onClick(
                                                    data.code,
                                                    i,
                                                    data.type,
                                                  )
                                            }
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
                                            if (onSelectCard)
                                              onSelectCard(data.idx as number);
                                          }}
                                        >
                                          <Button
                                            buttonType="button"
                                            onClick={() =>
                                              data.type === 'TEXT'
                                                ? onClick &&
                                                  onClick(
                                                    quiz.quizCode as string,
                                                    i as number,
                                                    data.type,
                                                  )
                                                : onClick &&
                                                  onClick(
                                                    data.code,
                                                    i,
                                                    data.type,
                                                  )
                                            }
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
                                    </>
                                  )}

                                  <div>
                                    <LuSiren
                                      fontSize={'25px'}
                                      color="red"
                                      style={{ cursor: 'pointer' }}
                                      onClick={() =>
                                        data.type === 'TEXT'
                                          ? reportQuizitem &&
                                            reportQuizitem(
                                              quiz.quizIdx as number,
                                            )
                                          : reportQuizitem &&
                                            reportQuizitem(data.idx as number)
                                      }
                                    />
                                    <BiSolidTrashAlt
                                      fontSize={'25px'}
                                      style={{ cursor: 'pointer' }}
                                      onClick={() =>
                                        data.type === 'TEXT'
                                          ? deleteQuizItem &&
                                            deleteQuizItem(
                                              quiz.quizCode as string,
                                              data.type as string,
                                            )
                                          : deleteQuizItem &&
                                            deleteQuizItem(data.code, data.type)
                                      }
                                    />
                                  </div>
                                </ButtonWrapper>
                              )}
                            </MathJaxIconButton>
                          ) : (
                            <></>
                          )}
                        </MathJaxContentWrapper>
                      ))}
                    {data?.quizCategoryList
                      .filter(
                        (quizCategory) =>
                          quizCategory.quizCategory.문항타입 === '객관식',
                      )
                      .map((filteredCategory) =>
                        data?.quizItemList
                          .filter((quizItem) => quizItem.type === 'CHOICES')
                          .map((quiz) => (
                            <ContentQuestion
                              key={quiz.idx}
                              dangerouslySetInnerHTML={createMarkup(
                                quiz.content,
                              )}
                            ></ContentQuestion>
                          )),
                      )}
                  </>
                </>
              )}
              {answerCommentary === '정답만' && (
                <>
                  {data?.quizItemList
                    .filter((quiz) => quiz.type === 'ANSWER')
                    .map((quiz) => (
                      <ContentQuestion
                        key={quiz.idx}
                        dangerouslySetInnerHTML={createMarkup(quiz.content)}
                      ></ContentQuestion>
                    ))}
                </>
              )}
              {answerCommentary === '문제+해설별도' && (
                <>
                  {data?.quizItemList
                    .filter((quiz) => quiz.type === 'QUESTION')
                    .map((quiz) => (
                      <ContentQuestion
                        key={quiz.idx}
                        dangerouslySetInnerHTML={createMarkup(quiz.content)}
                      ></ContentQuestion>
                    ))}
                  {data?.quizCategoryList
                    .filter(
                      (quizCategory) =>
                        quizCategory.quizCategory.문항타입 === '객관식',
                    )
                    .map((filteredCategory) =>
                      data?.quizItemList
                        .filter((quizItem) => quizItem.type === 'CHOICES')
                        .map((quiz) => (
                          <ContentQuestion
                            key={quiz.idx}
                            dangerouslySetInnerHTML={createMarkup(quiz.content)}
                          ></ContentQuestion>
                        )),
                    )}
                </>
              )}
              {answerCommentary === '해설별도' && (
                <>
                  {data?.quizItemList
                    .filter((quiz) => quiz.type === 'COMMENTARY')
                    .map((quiz) => (
                      <ContentQuestion
                        key={quiz.idx}
                        dangerouslySetInnerHTML={createMarkup(quiz.content)}
                      ></ContentQuestion>
                    ))}
                  {data?.quizItemList
                    .filter((quiz) => quiz.type === 'ANSWER')
                    .map((quiz) => (
                      <ContentQuestion
                        key={quiz.idx}
                        dangerouslySetInnerHTML={createMarkup(quiz.content)}
                      ></ContentQuestion>
                    ))}
                </>
              )}
              {(answerCommentary === '문제+해설같이' ||
                answerCommentary === '문제+정답+해설') && (
                <>
                  {data?.quizItemList
                    .filter((quiz) => quiz.type === 'QUESTION')
                    .map((quiz) => (
                      <ContentQuestion
                        key={quiz.idx}
                        dangerouslySetInnerHTML={createMarkup(quiz.content)}
                      ></ContentQuestion>
                    ))}
                  {data?.quizCategoryList
                    .filter(
                      (quizCategory) =>
                        quizCategory.quizCategory.문항타입 === '객관식',
                    )
                    .map((filteredCategory) =>
                      data?.quizItemList
                        .filter((quizItem) => quizItem.type === 'CHOICES')
                        .map((quiz) => (
                          <ContentQuestion
                            key={quiz.idx}
                            dangerouslySetInnerHTML={createMarkup(quiz.content)}
                          ></ContentQuestion>
                        )),
                    )}
                  {data?.quizItemList
                    .filter((quiz) => quiz.type === 'COMMENTARY')
                    .map((quiz) => (
                      <ContentQuestion
                        key={quiz.idx}
                        dangerouslySetInnerHTML={createMarkup(quiz.content)}
                      ></ContentQuestion>
                    ))}
                  {data?.quizItemList
                    .filter((quiz) => quiz.type === 'ANSWER')
                    .map((quiz) => (
                      <ContentQuestion
                        key={quiz.idx}
                        dangerouslySetInnerHTML={createMarkup(quiz.content)}
                      ></ContentQuestion>
                    ))}
                </>
              )}
              {answerCommentary === '문제+정답' && (
                <>
                  {data?.quizItemList
                    .filter((quiz) => quiz.type === 'QUESTION')
                    .map((quiz) => (
                      <ContentQuestion
                        key={quiz.idx}
                        dangerouslySetInnerHTML={createMarkup(quiz.content)}
                      ></ContentQuestion>
                    ))}
                  {data?.quizCategoryList
                    .filter(
                      (quizCategory) =>
                        quizCategory.quizCategory.문항타입 === '객관식',
                    )
                    .map((filteredCategory) =>
                      data?.quizItemList
                        .filter((quizItem) => quizItem.type === 'CHOICES')
                        .map((quiz) => (
                          <ContentQuestion
                            key={quiz.idx}
                            dangerouslySetInnerHTML={createMarkup(quiz.content)}
                          ></ContentQuestion>
                        )),
                    )}
                  {data?.quizItemList
                    .filter((quiz) => quiz.type === 'ANSWER')
                    .map((quiz) => (
                      <ContentQuestion
                        key={quiz.idx}
                        dangerouslySetInnerHTML={createMarkup(quiz.content)}
                      ></ContentQuestion>
                    ))}
                </>
              )}
            </MathJax>
          </MathJaxWrapper>
        </MathJaxContext>
      </Component>
    </>
  );
}

type MathViewerStyleProps = {
  display: string;
  width?: string;
  height?: string;
  $padding?: string;
};

const Component = styled.div<MathViewerStyleProps>`
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
  min-height: ${({ height }) => height && ` ${height};`};
  display: ${({ display }) => (display ? `${display}` : 'block')};
  padding: ${({ $padding }) => ($padding ? `${$padding}` : '0')};
`;
const MathJaxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  //overflow-x: hidden;
`;
const MathJaxContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  gap: 5px;

  .leftInfomation {
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding-right: 20px;
    font-size: 14px;
  }
`;
const MathJaxTextWrapper = styled.div`
  padding-bottom: 20px;
`;
const MathJaxIconButton = styled.div``;
const ContentQuestion = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  div {
    background-color: white;
  }
  p {
    background-color: white;
  }
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
