import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { MathJax, MathJax3Object, MathJaxContext } from 'better-react-mathjax';
import styled from 'styled-components';

import { QuizList } from '../../types/WorkbookType';
import { Loader } from '../atom/Loader';

type WorkbookMathViewerProps = {
  data?: QuizList;
  display?: string;
  width?: string;
  padding?: string;
  height?: string;
  isSetp3?: boolean;
  answerCommentary: string;
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

export function Step3MathViewer({
  data,
  width,
  padding,
  height,
  isSetp3,
  answerCommentary,
}: WorkbookMathViewerProps) {
  const [display, setDisplay] = useState('none');
  const [mathJax, setMathJax] = useState<MathJax3Object | null>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [commentary, setCommentary] = useState<string>(
    answerCommentary as string,
  );

  useEffect(() => {
    if (answerCommentary) {
      setCommentary(answerCommentary as string);
    }
  }, [answerCommentary]);

  const measureHeights = () => {
    if (measureRef.current) {
      const heights = Array.from(measureRef.current.children).map((child) => {
        const childElement = child as HTMLElement;
        const height = childElement.offsetHeight;
        return height;
      });

      //console.log('Measured heights in WorkbookMathViewer:', heights);
      //console.log('commentary:', commentary);
      window.postMessage(JSON.stringify({ heights, commentary }), '*');
    }
  };

  const offLoader = () => {
    setDisplay('block');
  };

  useEffect(() => {
    if (display === 'block') {
      measureHeights();
    }
  }, [display, commentary]);

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
        ref={measureRef}
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
              <strong>
                {data && data.num < 10 ? `0${data.num}` : `${data?.num}`}
              </strong>
            )}
            <MathJax
              inline
              dynamic
              onInitTypeset={() => {
                offLoader();
              }}
            >
              {commentary === '문제만' && (
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
              {commentary === '정답만' && (
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
              {commentary === '문제+해설별도' && (
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
              {commentary === '해설별도' && (
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
              {(commentary === '문제+해설같이' ||
                commentary === '문제+정답+해설') && (
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
              {commentary === '문제+정답' && (
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
  gap: 10px;
  //overflow-x: hidden;
`;

const ContentQuestion = styled.div`
  //padding-bottom: 10px;
  div {
    background-color: white;
  }
  p {
    background-color: white;
  }
`;
