import * as React from 'react';
import { memo, useMemo, useRef } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { styled } from 'styled-components';

import { CheckBoxI, Icon } from '../../../components/atom';
import { COLOR } from '../../../components/constants';
import { MathViewer } from '../../../components/mathViewer';
import { QuizListType } from '../../../types';
import { windowOpenHandler } from '../../../utils/windowHandler';
import { Tooltip } from '../tooltip';

interface CreateQuizGroupListProps {
  questionList: QuizListType[];
  checkList: string[]; // 체크된 항목의 코드 리스트
  handleButtonCheck: (
    event: React.ChangeEvent<HTMLInputElement>,
    // | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    code: string,
  ) => void;
  setCheckList: React.Dispatch<React.SetStateAction<string[]>>;
  showCheckBox?: boolean;
  showViewAllButton?: boolean;
  handleClickItem: (
    e: React.MouseEvent<HTMLButtonElement>,
    code: string,
  ) => void;
}

interface GroupedQuestions {
  groups: Record<
    string,
    {
      items: QuizListType[];
      checked: boolean;
    }
  >;
  ungroupedItems: QuizListType[];
}

export function CreateQuizGroupList({
  questionList,
  checkList,
  handleButtonCheck,
  setCheckList,
  showCheckBox,
  showViewAllButton,
  handleClickItem,
}: CreateQuizGroupListProps) {
  // 그룹화된 질문과 그룹화되지 않은 질문 분리
  const groupedQuestions: GroupedQuestions = useMemo(() => {
    const groups: GroupedQuestions['groups'] = {};
    const ungroupedItems: QuizListType[] = [];

    questionList.forEach((quiz) => {
      if (quiz.groupCode) {
        const groupCode = quiz.groupCode || 'default'; // null-safe 처리
        if (!groups[groupCode]) {
          groups[groupCode] = {
            items: [],
            checked: false,
          };
        }
        groups[groupCode].items.push(quiz);
      } else {
        ungroupedItems.push(quiz);
      }
    });

    return { groups, ungroupedItems };
  }, [questionList]);

  const handleGroupCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    // group-checkbox인 경우에만 처리
    if (target && target.classList.contains('group_checkbox')) {
      const isChecked = target.checked;

      // 그룹 컨테이너 내부의 모든 체크박스 선택
      const parentDiv = target.closest('.groupedItemsContainer');
      if (parentDiv) {
        const childCheckboxes = parentDiv.querySelectorAll(
          '.groupedItemsContainer input[type="checkbox"]',
        );

        // 모든 자식 체크박스 상태 업데이트
        childCheckboxes.forEach((checkbox) => {
          const inputElement = checkbox as HTMLInputElement;

          // 체크 상태 동기화
          inputElement.checked = isChecked;

          // CheckList 업데이트 (React 상태 관리)
          const id = inputElement.value;
          if (isChecked) {
            setCheckList((prev) => [...prev, id]);
          } else {
            setCheckList((prev) => prev.filter((el) => el !== id));
          }
        });
        // 'on' 제거
        removeOnFromCheckList();
      }
    }
  };

  // 그룹 체크
  const removeOnFromCheckList = () => {
    setCheckList((prev) => prev.filter((item) => item !== 'on'));
  };

  return (
    <Container>
      {/* 그룹화된 항목들 렌더링 */}
      {Object.entries(groupedQuestions.groups).map(([groupCode, group]) => (
        <div key={groupCode} className="groupedItemsContainer">
          <div className="group_header">
            <input
              type="checkbox"
              className="group_checkbox"
              checked={group.items.every((item) =>
                checkList.includes(item.code),
              )}
              onChange={(e) => handleGroupCheck(e)}
            />
            <label className="group_checkbox_label">그룹 선택</label>
          </div>
          {group.items.map((quiz) => (
            <QuizItem
              key={quiz.code}
              quiz={quiz}
              checked={checkList.includes(quiz.code)}
              onCheck={handleButtonCheck}
              showCheckBox={showCheckBox}
              showViewAllButton={showViewAllButton}
              handleClickItem={handleClickItem}
            />
          ))}
        </div>
      ))}

      {/* 그룹화되지 않은 항목들 렌더링 */}
      <div className="noneGroupedItemsContainer">
        {groupedQuestions.ungroupedItems.map((quiz) => (
          <QuizItem
            key={quiz.code}
            quiz={quiz}
            checked={checkList.includes(quiz.code)}
            onCheck={handleButtonCheck}
            showCheckBox={showCheckBox}
            showViewAllButton={showViewAllButton}
            handleClickItem={handleClickItem}
          />
        ))}
      </div>
    </Container>
  );
}

// QuizItem 컴포넌트
interface QuizItemProps {
  quiz: QuizListType;
  checked: boolean;
  onCheck: (event: React.ChangeEvent<HTMLInputElement>, code: string) => void;
  showCheckBox?: boolean;
  showViewAllButton?: boolean;
  handleClickItem: (
    e: React.MouseEvent<HTMLButtonElement>,
    code: string,
  ) => void;
}

const QuizItem: React.FC<QuizItemProps> = ({
  quiz,
  checked,
  onCheck,
  showCheckBox,
  showViewAllButton,
  handleClickItem,
}) => {
  // console.log('Rendering:', quiz.code);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  // 툴팁 토글
  const calculateTextWidth = (nodes: NodeList) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context && textRef.current) {
      const style = window.getComputedStyle(textRef.current);
      context.font = `${style.fontSize} ${style.fontFamily}`;

      let totalWidth = 0;
      nodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          totalWidth += context.measureText(node.textContent || '').width;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          totalWidth += context.measureText(
            (node as HTMLElement).innerText,
          ).width;
        }
      });
      return totalWidth;
    }
    return 0;
  };

  const showTooltip = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const textNodes = e.currentTarget.children[0].childNodes; // 말줄임 요소
    const target = e.currentTarget.children[1]; // 숨겨진 툴팁박스
    const textWidth = calculateTextWidth(textNodes);
    const containerWidth = textRef.current?.clientWidth || 0;

    // console.log(textWidth, containerWidth);
    if (textWidth > containerWidth) {
      target.classList.add('on');
    }
  };

  const hideTooltip = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const target = e.currentTarget.children[1];
    // console.log(target.classList);
    target.classList.remove('on');
  };

  // 전체보기 버튼 누를시
  const openViewer = (code: string) => {
    const data: QuizListType = quiz;
    // data 객체의 속성들을 문자열로 변환
    const dataStringified: Record<string, string> = {
      // ...data,
      idx: data.idx.toString(),
    };
    const queryString = new URLSearchParams(dataStringified).toString();

    windowOpenHandler({
      name: 'quizpreview',
      url: `/quizpreview?${queryString}`,
      $width: 800,
      $height: 800,
    });
  };

  return (
    <ListWrapper className={`list_wrapper `}>
      <ItemWrapper
        key={quiz.idx}
        // height={itemHeight}
        className={`${quiz.quizCategoryList[0] ? 'isHasMeta' : ''}`}
      >
        {showCheckBox ? (
          <button
            type="button"
            className="title"
            onClick={(e) => {
              handleClickItem(e, quiz.code);
            }}
          >
            <CheckBoxI
              $margin={'0 5px 0 0'}
              onChange={(e) => onCheck}
              checked={checked}
              id={quiz.code}
              value={quiz.code}
            />
            <span className="title_id">
              {quiz.quizItemList &&
                quiz.quizItemList.map((el) => (
                  <span key={el.code}>
                    {el.type === 'BIG' && '대발문'}
                    {el.type === 'TEXT' && '지문'}
                    {el.type === 'QUESTION' && '문제'}
                    {/* {el.type === 'SMALL' && '소문제'} */}
                    {/* {el.type === 'EXAMPLE' && ''} */}
                    {el.type === 'CHOICES' && '선지'}
                    {el.type === 'ANSWER' && '정답'}
                    {el.type === 'COMMENTARY' && '해설'}
                    {el.type === 'HINT' && '힌트'}
                    {el.type === 'CONCEPT' && '개념'}
                    {/* {el.type === 'TITLE' && ''} */}
                    {/* {el.type === 'TIP' && ''} */} /
                  </span>
                ))}
            </span>
            <span className="title_tag">
              {quiz.quizCategoryList.length > 0 &&
                quiz.quizCategoryList?.[0]?.quizCategory?.문항타입 &&
                typeof quiz.quizCategoryList[0].quizCategory.문항타입 ===
                  'string' &&
                quiz.quizCategoryList[0]?.quizCategory?.문항타입}
            </span>
          </button>
        ) : (
          <button
            type="button"
            className="title"
            onClick={(e) => {
              handleClickItem(e, quiz.code);
            }}
          >
            <CheckBoxI
              $margin={'0 5px 0 0'}
              onChange={(e) => onCheck}
              checked={checked}
              id={quiz.code}
              value={quiz.code}
            />
            <span className="title_id">
              {quiz.quizItemList &&
                quiz.quizItemList.map((el) => (
                  <span key={el.code}>
                    {el.type === 'BIG' && '대발문'}
                    {el.type === 'TEXT' && '지문'}
                    {el.type === 'QUESTION' && '문제'}
                    {/* {el.type === 'SMALL' && '소문제'} */}
                    {/* {el.type === 'EXAMPLE' && ''} */}
                    {el.type === 'CHOICES' && '선지'}
                    {el.type === 'ANSWER' && '정답'}
                    {el.type === 'COMMENTARY' && '해설'}
                    {el.type === 'HINT' && '힌트'}
                    {el.type === 'CONCEPT' && '개념'}
                    {/* {el.type === 'TITLE' && ''} */}
                    {/* {el.type === 'TIP' && ''} */} /
                  </span>
                ))}
            </span>
            <span className="title_tag">
              {quiz.quizCategoryList.length > 0 &&
              quiz.quizCategoryList.find((el) => el.quizCategory?.문항타입) ? (
                <span>
                  {
                    // 조건에 맞는 첫 번째 값 찾기
                    (() => {
                      const foundItem = quiz.quizCategoryList.find(
                        (el) => el.quizCategory?.문항타입,
                      );

                      if (foundItem) {
                        const course = foundItem.quizCategory?.문항타입;
                        if (Array.isArray(course)) {
                          return course[0]?.name || ''; // 배열인 경우 첫 번째 값 반환
                        } else if (typeof course === 'string') {
                          return course; // 문자열인 경우 그대로 반환
                        }
                      }

                      return ''; // 조건에 맞는 값이 없을 경우 빈 문자열 반환
                    })()
                  }
                </span>
              ) : (
                <></>
              )}
            </span>
          </button>
        )}
        <MetaGroup
          onMouseOver={(e) => showTooltip(e)}
          onMouseLeave={(e) => hideTooltip(e)}
        >
          <span className="sub_title ellipsis" ref={textRef}>
            {quiz.quizCategoryList.length > 0 &&
            quiz.quizCategoryList.find((el) => el.quizCategory?.교과) ? (
              <span>
                {quiz.quizCategoryList
                  .flatMap((el) => {
                    const course = el.quizCategory?.교과;
                    if (Array.isArray(course)) {
                      return course.map((sub) => sub.name).filter(Boolean); // 배열 처리
                    } else if (typeof course === 'string') {
                      return [course]; // 문자열을 배열로 변환
                    }
                    return []; // 값이 없을 경우 빈 배열 반환
                  })
                  .join(', ')}
                ,
              </span>
            ) : (
              <></>
            )}

            {quiz.quizCategoryList.length > 0 &&
            quiz.quizCategoryList.find((el) => el.quizCategory?.과목) ? (
              <span>
                {quiz.quizCategoryList
                  .flatMap((el) => {
                    const course = el.quizCategory?.과목;
                    if (Array.isArray(course)) {
                      return course.map((sub) => sub.name).filter(Boolean); // 배열 처리
                    } else if (typeof course === 'string') {
                      return [course]; // 문자열을 배열로 변환
                    }
                    return []; // 값이 없을 경우 빈 배열 반환
                  })
                  .join(', ')}
                ,
              </span>
            ) : (
              <></>
            )}

            {quiz.quizCategoryList.length > 0 &&
            quiz.quizCategoryList.find((el) => el.quizCategory?.학년) ? (
              <span>
                {quiz.quizCategoryList
                  .flatMap((el) => {
                    const course = el.quizCategory?.학년;
                    if (Array.isArray(course)) {
                      return course.map((sub) => sub.name).filter(Boolean); // 배열 처리
                    } else if (typeof course === 'string') {
                      return [course]; // 문자열을 배열로 변환
                    }
                    return []; // 값이 없을 경우 빈 배열 반환
                  })
                  .join(', ')}
                학년,
              </span>
            ) : (
              <></>
            )}

            {quiz.quizCategoryList.length > 0 &&
            quiz.quizCategoryList.find((el) => el.quizCategory?.난이도) ? (
              <span>
                {quiz.quizCategoryList
                  .flatMap((el) => {
                    const course = el.quizCategory?.난이도;
                    if (Array.isArray(course)) {
                      return course.map((sub) => sub.name).filter(Boolean); // 배열 처리
                    } else if (typeof course === 'string') {
                      return [course]; // 문자열을 배열로 변환
                    }
                    return []; // 값이 없을 경우 빈 배열 반환
                  })
                  .join(', ')}
                ,
              </span>
            ) : (
              <></>
            )}

            {quiz.quizCategoryList.length > 0 &&
            quiz.quizCategoryList.find((el) => el.quizCategory?.학교급) ? (
              <span>
                {quiz.quizCategoryList
                  .flatMap((el) => {
                    const course = el.quizCategory?.학교급;
                    if (Array.isArray(course)) {
                      return course.map((sub) => sub.name).filter(Boolean); // 배열 처리
                    } else if (typeof course === 'string') {
                      return [course]; // 문자열을 배열로 변환
                    }
                    return []; // 값이 없을 경우 빈 배열 반환
                  })
                  .join(', ')}
                ,
              </span>
            ) : (
              <></>
            )}

            {quiz.quizCategoryList.length > 0 &&
            quiz.quizCategoryList.find((el) => el.quizCategory?.문항타입) ? (
              <span>
                {quiz.quizCategoryList
                  .flatMap((el) => {
                    const course = el.quizCategory?.문항타입;
                    if (Array.isArray(course)) {
                      return course.map((sub) => sub.name).filter(Boolean); // 배열 처리
                    } else if (typeof course === 'string') {
                      return [course]; // 문자열을 배열로 변환
                    }
                    return []; // 값이 없을 경우 빈 배열 반환
                  })
                  .join(', ')}
                ,
              </span>
            ) : (
              <></>
            )}

            {quiz.quizCategoryList.length > 0 &&
            quiz.quizCategoryList.find((el) => el.quizCategory?.대단원) ? (
              <span>
                {quiz.quizCategoryList
                  .flatMap((el) => {
                    const course = el.quizCategory?.대단원;
                    if (Array.isArray(course)) {
                      return course.map((sub) => sub.name).filter(Boolean); // 배열 처리
                    } else if (typeof course === 'string') {
                      return [course]; // 문자열을 배열로 변환
                    }
                    return []; // 값이 없을 경우 빈 배열 반환
                  })
                  .join(', ')}
                ,
              </span>
            ) : (
              <></>
            )}

            {quiz.quizCategoryList.length > 0 &&
            quiz.quizCategoryList.find((el) => el.quizCategory?.중단원) ? (
              <span>
                {quiz.quizCategoryList
                  .flatMap((el) => {
                    const course = el.quizCategory?.중단원;
                    if (Array.isArray(course)) {
                      return course.map((sub) => sub.name).filter(Boolean); // 배열 처리
                    } else if (typeof course === 'string') {
                      return [course]; // 문자열을 배열로 변환
                    }
                    return []; // 값이 없을 경우 빈 배열 반환
                  })
                  .join(', ')}
                ,
              </span>
            ) : (
              <></>
            )}

            {quiz.quizCategoryList.length > 0 &&
            quiz.quizCategoryList.find((el) => el.quizCategory?.소단원) ? (
              <span>
                {quiz.quizCategoryList
                  .flatMap((el) => {
                    const course = el.quizCategory?.소단원;
                    if (Array.isArray(course)) {
                      return course.map((sub) => sub.name).filter(Boolean); // 배열 처리
                    } else if (typeof course === 'string') {
                      return [course]; // 문자열을 배열로 변환
                    }
                    return []; // 값이 없을 경우 빈 배열 반환
                  })
                  .join(', ')}
                ,
              </span>
            ) : (
              <></>
            )}

            {quiz.quizCategoryList[0]?.quizCategory?.sources?.map(
              (item: Record<string, any>, idx) => {
                // 렌더링할 속성 이름 배열
                const attributes = [
                  '출처',
                  '기출명',
                  '문항번호',
                  '출제년도',
                  '교재속성',
                  '출판사',
                  '시리즈',
                  '교재명',
                  '교재페이지',
                  '교재번호',
                  '출판년도',
                  '내신형식',
                  '학교명',
                  '학사일정',
                  '내신페이지',
                  '내신배점',
                  '기출속성',
                  '주관사',
                  '시행학제',
                  '시행학년',
                  '시험지타입',
                  '기출배점',
                  '기출일시',
                ];

                // 값이 있는 속성만 필터링하여 렌더링
                const renderedAttributes = attributes
                  .map((attr) => {
                    const value = item[attr];
                    if (Array.isArray(value)) {
                      return value.join(', '); // 배열 값을 문자열로 결합
                    }
                    return value ? String(value) : ''; // 값을 문자열로 변환
                  })
                  .filter(Boolean) // 빈 값 제거
                  .join(', '); // 원하는 구분자 사용 (여기서는 ', ')

                return (
                  <span key={`출처 배열 ${idx}`}>{renderedAttributes}</span>
                );
              },
            )}
          </span>

          <Tooltip
            arrowPosition={`left: calc(50% - 25px)`}
            width={'100%'}
            ref={tooltipRef}
          >
            <>
              {quiz.quizCategoryList.length > 0 &&
              quiz.quizCategoryList.find((el) => el.quizCategory?.교과) ? (
                <span>
                  {quiz.quizCategoryList
                    .flatMap((el) => {
                      const course = el.quizCategory?.교과;
                      if (Array.isArray(course)) {
                        return course.map((sub) => sub.name).filter(Boolean); // 배열 처리
                      } else if (typeof course === 'string') {
                        return [course]; // 문자열을 배열로 변환
                      }
                      return []; // 값이 없을 경우 빈 배열 반환
                    })
                    .join(', ')}
                  ,
                </span>
              ) : (
                <></>
              )}

              {quiz.quizCategoryList.length > 0 &&
              quiz.quizCategoryList.find((el) => el.quizCategory?.과목) ? (
                <span>
                  {quiz.quizCategoryList
                    .flatMap((el) => {
                      const course = el.quizCategory?.과목;
                      if (Array.isArray(course)) {
                        return course.map((sub) => sub.name).filter(Boolean); // 배열 처리
                      } else if (typeof course === 'string') {
                        return [course]; // 문자열을 배열로 변환
                      }
                      return []; // 값이 없을 경우 빈 배열 반환
                    })
                    .join(', ')}
                  ,
                </span>
              ) : (
                <></>
              )}

              {quiz.quizCategoryList.length > 0 &&
              quiz.quizCategoryList.find((el) => el.quizCategory?.학년) ? (
                <span>
                  {quiz.quizCategoryList
                    .flatMap((el) => {
                      const course = el.quizCategory?.학년;
                      if (Array.isArray(course)) {
                        return course.map((sub) => sub.name).filter(Boolean); // 배열 처리
                      } else if (typeof course === 'string') {
                        return [course]; // 문자열을 배열로 변환
                      }
                      return []; // 값이 없을 경우 빈 배열 반환
                    })
                    .join(', ')}
                  학년,
                </span>
              ) : (
                <></>
              )}

              {quiz.quizCategoryList.length > 0 &&
              quiz.quizCategoryList.find((el) => el.quizCategory?.난이도) ? (
                <span>
                  {quiz.quizCategoryList
                    .flatMap((el) => {
                      const course = el.quizCategory?.난이도;
                      if (Array.isArray(course)) {
                        return course.map((sub) => sub.name).filter(Boolean); // 배열 처리
                      } else if (typeof course === 'string') {
                        return [course]; // 문자열을 배열로 변환
                      }
                      return []; // 값이 없을 경우 빈 배열 반환
                    })
                    .join(', ')}
                  ,
                </span>
              ) : (
                <></>
              )}

              {quiz.quizCategoryList.length > 0 &&
              quiz.quizCategoryList.find((el) => el.quizCategory?.학교급) ? (
                <span>
                  {quiz.quizCategoryList
                    .flatMap((el) => {
                      const course = el.quizCategory?.학교급;
                      if (Array.isArray(course)) {
                        return course.map((sub) => sub.name).filter(Boolean); // 배열 처리
                      } else if (typeof course === 'string') {
                        return [course]; // 문자열을 배열로 변환
                      }
                      return []; // 값이 없을 경우 빈 배열 반환
                    })
                    .join(', ')}
                  ,
                </span>
              ) : (
                <></>
              )}

              {quiz.quizCategoryList.length > 0 &&
              quiz.quizCategoryList.find((el) => el.quizCategory?.문항타입) ? (
                <span>
                  {quiz.quizCategoryList
                    .flatMap((el) => {
                      const course = el.quizCategory?.문항타입;
                      if (Array.isArray(course)) {
                        return course.map((sub) => sub.name).filter(Boolean); // 배열 처리
                      } else if (typeof course === 'string') {
                        return [course]; // 문자열을 배열로 변환
                      }
                      return []; // 값이 없을 경우 빈 배열 반환
                    })
                    .join(', ')}
                  ,
                </span>
              ) : (
                <></>
              )}

              {quiz.quizCategoryList.length > 0 &&
              quiz.quizCategoryList.find((el) => el.quizCategory?.대단원) ? (
                <span>
                  {quiz.quizCategoryList
                    .flatMap((el) => {
                      const course = el.quizCategory?.대단원;
                      if (Array.isArray(course)) {
                        return course.map((sub) => sub.name).filter(Boolean); // 배열 처리
                      } else if (typeof course === 'string') {
                        return [course]; // 문자열을 배열로 변환
                      }
                      return []; // 값이 없을 경우 빈 배열 반환
                    })
                    .join(', ')}
                  ,
                </span>
              ) : (
                <></>
              )}

              {quiz.quizCategoryList.length > 0 &&
              quiz.quizCategoryList.find((el) => el.quizCategory?.중단원) ? (
                <span>
                  {quiz.quizCategoryList
                    .flatMap((el) => {
                      const course = el.quizCategory?.중단원;
                      if (Array.isArray(course)) {
                        return course.map((sub) => sub.name).filter(Boolean); // 배열 처리
                      } else if (typeof course === 'string') {
                        return [course]; // 문자열을 배열로 변환
                      }
                      return []; // 값이 없을 경우 빈 배열 반환
                    })
                    .join(', ')}
                  ,
                </span>
              ) : (
                <></>
              )}

              {quiz.quizCategoryList.length > 0 &&
              quiz.quizCategoryList.find((el) => el.quizCategory?.소단원) ? (
                <span>
                  {quiz.quizCategoryList
                    .flatMap((el) => {
                      const course = el.quizCategory?.소단원;
                      if (Array.isArray(course)) {
                        return course.map((sub) => sub.name).filter(Boolean); // 배열 처리
                      } else if (typeof course === 'string') {
                        return [course]; // 문자열을 배열로 변환
                      }
                      return []; // 값이 없을 경우 빈 배열 반환
                    })
                    .join(', ')}
                  ,
                </span>
              ) : (
                <></>
              )}

              {quiz.quizCategoryList[0]?.quizCategory?.sources?.map(
                (item: Record<string, any>, idx) => {
                  // 렌더링할 속성 이름 배열
                  const attributes = [
                    '출처',
                    '기출명',
                    '문항번호',
                    '출제년도',
                    '교재속성',
                    '출판사',
                    '시리즈',
                    '교재명',
                    '교재페이지',
                    '교재번호',
                    '출판년도',
                    '내신형식',
                    '학교명',
                    '학사일정',
                    '내신페이지',
                    '내신배점',
                    '기출속성',
                    '주관사',
                    '시행학제',
                    '시행학년',
                    '시험지타입',
                    '기출배점',
                    '기출일시',
                  ];

                  // 값이 있는 속성만 필터링하여 렌더링
                  const renderedAttributes = attributes
                    .map((attr) => {
                      const value = item[attr];
                      if (Array.isArray(value)) {
                        return value.join(', '); // 배열 값을 문자열로 결합
                      }
                      return value ? String(value) : ''; // 값을 문자열로 변환
                    })
                    .filter(Boolean) // 빈 값 제거
                    .join(', '); // 원하는 구분자 사용 (여기서는 ', ')

                  return (
                    <span key={`출처 배열 ${idx}`}>{renderedAttributes}</span>
                  );
                },
              )}
            </>
          </Tooltip>
        </MetaGroup>
        {showViewAllButton && (
          <ViewAllButton>
            <button type="button" onClick={() => openViewer(quiz.code)}>
              전체보기
              <Icon
                $margin={'0 0 0 2px'}
                width={`10px`}
                src={`/images/icon/view_arrow.svg`}
                disabled={true}
              />
            </button>
          </ViewAllButton>
        )}
      </ItemWrapper>
    </ListWrapper>
  );
};

// React.memo로 컴포넌트를 메모이제이션
export default memo(QuizItem);

const Container = styled.div`
  .groupedItemsContainer {
    border: 3px solid ${COLOR.BORDER_BLUE};
    position: relative;
    margin: 10px 0;
    padding: 10px;
    background-color: #f9f9f9;
    display: flex;
    padding-top: 30px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .noneGroupedItemsContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .group_checkbox {
    position: absolute;
    top: 15px;
  }
  label.group_checkbox_label {
    position: absolute;
    top: 10px;
    right: auto;
    left: 30px;
  }
`;
const ListWrapper = styled.div`
  padding: 10px 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: fit-content;
`;
const ItemWrapper = styled.div<{ height?: string; classHeight?: string }>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  padding: 10px;
  border: 1px solid ${COLOR.BORDER_BLUE};
  background-color: #fff;
  border-radius: 5px;
  min-height: 50px;
  margin-bottom: 10px;

  &.ondnd {
    background-color: ${COLOR.IS_HAVE_DATA};
    button.title {
      background-color: ${COLOR.IS_HAVE_DATA};
    }
  }
  button.title {
    font-size: 15px;
    width: 100%;
    padding-bottom: 5px;
    display: flex;
    flex-wrap: wrap;
    /* align-items: center; */
    border: none;
    background-color: transparent;
    cursor: pointer;

    .title_id {
      flex: 1 0 0;
      text-overflow: ellipsis;
      word-break: break-all;
      text-align: left;
      color: ${COLOR.PRIMARY};
      background-color: transparent;
    }
    .title_tag {
      width: 40px;
      text-align: left;
      font-size: 13px;
      font-weight: bold;
      color: ${COLOR.ALERTBAR_SUCCESS};
      background-color: transparent;
    }
  }
  span.title {
    display: flex;
    flex-wrap: wrap;
    /* align-items: center; */
    padding-bottom: 5px;
    width: 100%;

    span.title_id {
      text-overflow: ellipsis;
      word-break: break-all;
      color: ${COLOR.PRIMARY};
      width: calc(100% - 40px);
      background-color: transparent;
    }
    .title_tag {
      width: 40px;
      text-align: right;
      font-size: 13px;
      font-weight: bold;
      color: ${COLOR.ALERTBAR_ERROR};
      background-color: transparent;
    }
  }

  &.opacity {
    opacity: 0.8;
  }

  &.isHasMeta {
    background-color: ${COLOR.IS_HAVE_DATA};
  }
`;

const MetaGroup = styled.span`
  border: none;
  background-color: transparent;
  position: relative;
  display: flex;
  width: 100%;

  .sub_title {
    padding-top: 5px;
    width: 100%;
    font-size: 13px;
    border-top: 1px solid ${COLOR.BORDER_BLUE};
    background-color: transparent;
  }

  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

const ViewAllButton = styled.p`
  padding-top: 10px;
  width: 100%;
  text-align: right;
  > button {
    font-size: 13px;
    font-weight: bold;
    height: 20px;
    display: inline-block;
    border: none;
    background-color: #fff;
    color: ${COLOR.ALERTBAR_SUCCESS};
    background-color: transparent;
    cursor: pointer;

    > button {
      transform: translateY(1px);
    }
  }
`;
