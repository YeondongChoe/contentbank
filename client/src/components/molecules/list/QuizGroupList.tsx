import * as React from 'react';
import { memo, useMemo } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { styled } from 'styled-components';

import { CheckBoxI, Icon } from '../../../components/atom';
import { COLOR } from '../../../components/constants';
import { MathViewer } from '../../../components/mathViewer';
import { QuizListType } from '../../../types';
import { windowOpenHandler } from '../../../utils/windowHandler';

interface QuizGroupListProps {
  questionList: QuizListType[];
  checkList: string[]; // 체크된 항목의 코드 리스트
  handleButtonCheck: (
    event: React.ChangeEvent<HTMLInputElement>,
    // | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    code: string,
  ) => void;
  setCheckList: React.Dispatch<React.SetStateAction<string[]>>;
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

export function QuizGroupList({
  questionList,
  checkList,
  handleButtonCheck,
  setCheckList,
}: QuizGroupListProps) {
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
}

const QuizItem: React.FC<QuizItemProps> = ({ quiz, checked, onCheck }) => {
  // console.log('Rendering:', quiz.code);

  // 전체보기 버튼 누를시
  const openViewer = () => {
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
        className={`colum_item_2 `}
        classHeight={`auto`}
      >
        <TopButtonWrapper>
          <div className="quiz_top_wrap">
            <CheckBoxI
              $margin={'0 5px 0 0'}
              checked={checked}
              onChange={(e) => onCheck(e, quiz.code)}
              // onChange={(e) => handleButtonCheck(e, quiz.code)}
              // checked={checkList.includes(quiz.code) ? true : false}
              id={quiz.code}
              value={quiz.code}
            />
            <span className={`title_top`}>
              {`${0} 건`}
              <Icon
                onClick={() => openViewer()}
                width={`15px`}
                src={`/images/icon/entypo_popup.svg`}
              />
            </span>
          </div>
          <span>
            {quiz.quizCategoryList.length > 0 &&
              quiz.quizCategoryList?.[0]?.quizCategory?.문항타입 &&
              typeof quiz.quizCategoryList[0].quizCategory.문항타입 ===
                'string' && (
                <span
                  className={`${quiz.quizCategoryList[0].quizCategory?.문항타입 == '객관식' && 'green'}
														${quiz.quizCategoryList[0].quizCategory?.문항타입 == '서술형' && 'gray'} 
                  ${quiz.quizCategoryList[0].quizCategory?.문항타입 == '주관식' && 'yellow'} tag`}
                >
                  {quiz.quizCategoryList[0].quizCategory?.문항타입}
                </span>
              )}
          </span>
        </TopButtonWrapper>
        <ScrollWrapper
          className="items_height"
          // itemsHeight={`150px`}
        >
          <PerfectScrollbar>
            <div className="quiz_wrap">
              {quiz?.quizItemList?.map(
                (el: { code: any; type: string; content: any }) => (
                  <div key={`${el?.code} quizItemList sortedList`}>
                    {[
                      'BIG',
                      'TEXT',
                      'QUESTION',
                      'SMALL',
                      'EXAMPLE',
                      'CHOICES',
                      'ANSWER',
                      'COMMENTARY',
                      'HINT',
                      'CONCEPT',
                      'TITLE',
                      'TIP',
                    ].includes(el?.type) &&
                      el?.content && (
                        <MathViewer data={el.content}></MathViewer>
                      )}
                  </div>
                ),
              )}
            </div>
          </PerfectScrollbar>
        </ScrollWrapper>
        <ScrollWrapper>
          <PerfectScrollbar>
            <div className="class_wrap">
              {quiz.quizCategoryList.length > 0 ? (
                quiz.quizCategoryList.map((item, idx) => {
                  const quizCategory = item.quizCategory || {};

                  // quizCategory에서 각 항목을 문자열로 변환
                  const details = (
                    [
                      '교육과정',
                      '과목',
                      '교과',
                      '학년',
                      '학기',
                      '대단원',
                      '중단원',
                      '소단원',
                      '유형',
                    ] as const
                  )
                    .map((key) => {
                      const categoryArray = quizCategory[key]; // quizCategory 내부의 배열
                      if (Array.isArray(categoryArray)) {
                        return categoryArray
                          .map((sub) => (sub.name ? sub.name : sub)) // name이 있으면 사용
                          .join(', '); // 배열 항목을 ', '로 결합
                      }
                      return ''; // 배열이 아니면 빈 문자열 반환
                    })
                    .filter(Boolean) // 빈 문자열 제거
                    .join(' / '); // '/'로 항목 연결

                  return <span key={idx}>{details || ''}</span>;
                })
              ) : (
                <span>(분류없음)</span>
              )}
            </div>
          </PerfectScrollbar>
        </ScrollWrapper>
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
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  .colum_item_2 > .items_height {
    height: 250px;
  }
`;
const ItemWrapper = styled.div<{ height?: string; classHeight?: string }>`
  padding: 10px;
  border: 1px solid #aaa;
  border-radius: 10px;
  height: ${({ height }) => height || 'auto'};
  margin: 5px;
  overflow: auto;
  position: relative;

  img {
    width: 100%;
    height: fit-content;
  }

  .quiz_wrap {
    overflow: auto;
  }

  .quiz_top_wrap {
    position: absolute;
    top: 10px;
    right: 10px;
    left: 10px;
  }

  .class_wrap {
    font-size: 12px;
    color: #aaa;
    background-color: #fff;
    height: ${({ classHeight }) => classHeight || 'auto'};
    /* display: flex;
    flex-direction: column-reverse; */

    span {
      display: -webkit-box;
      -webkit-line-clamp: 2; /* Change the number to the number of lines you want to show */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .title_top {
    button {
      height: 15px;
      margin: 5px;
    }
  }

  .tag {
    position: absolute;
    right: 10px;
    top: 10px;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: bold;
    border-radius: 27px;

    &.yellow {
      background-color: ${COLOR.ALERTBAR_WARNING};
    }
    &.green {
      background-color: ${COLOR.ALERTBAR_SUCCESS};
    }
    &.gray {
      background-color: ${COLOR.BORDER_GRAY};
    }
  }
`;
const TopButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  /* padding-top: 15px; */
`;
const ScrollWrapper = styled.div`
  margin-top: 10px;

  overflow-y: auto;
  width: 100%;
  background-color: ${COLOR.LIGHT_GRAY};

  &.height_500 {
    height: calc(100vh - 500px);
  }

  &.height {
    height: calc(100vh - 280px);
  }

  .flex_line {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: flex-start;
  }
  .size_12 {
    font-size: 12px;
  }
`;
