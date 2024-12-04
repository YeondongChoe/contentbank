import * as React from 'react';
import {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  CheckBoxI,
  DnDWrapper,
  Icon,
  MathViewer,
  Tooltip,
  ValueNone,
} from '../../..';
import { myAuthorityAtom } from '../../../../store/myAuthorityAtom';
import { quizListAtom } from '../../../../store/quizListAtom';
import { QuizItemListType, QuizListType, Source } from '../../../../types';
import { windowOpenHandler } from '../../../../utils/windowHandler';
import { COLOR } from '../../../constants/COLOR';

export const QuizElementList = forwardRef(
  (
    {
      questionList: initialQuestionList,
      $height,
      groupId,
      isHasMeta,
      onItemClick,
      setIsCheck,
      arrowPosition = `left: calc(50% - 25px)`,
      selectedDifficulty,
      selectedQuestionType,
    }: {
      questionList: QuizItemListType | [];
      $height?: string;
      groupId: string;
      isHasMeta?: boolean;
      onItemClick?: (item: QuizItemListType) => void;
      setIsCheck?: React.Dispatch<React.SetStateAction<boolean>>;
      arrowPosition?: string;
      selectedDifficulty: string;
      selectedQuestionType: string;
    },
    ref,
  ) => {
    const [myAuthority, setMyAuthority] = useRecoilState(myAuthorityAtom);
    const [quizList, setQuizList] = useRecoilState(quizListAtom);
    const [questionList, setQuestionList] = useState<QuizItemListType>([]);
    const [checkList, setCheckList] = useState<string[]>([]);
    const textRef = useRef<HTMLSpanElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [isPostMessage, setIsPostMessage] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const [radioCheck, setRadioCheck] = useState<
      { title: string; checkValue: string }[]
    >([]);

    // 그룹으로 묶기
    useEffect(() => {}, [groupId]);
    const AddGroup = () => {
      // 하나이상의 대발문은 그룹 불가능
      // 문제와 정답은 1:1 대응되도록 개수가 안맞으면 불가능
      // 체크값을 조건에 대응되게 그룹화후 div 생성
      console.log('전체 아이템 리스트 - ', questionList);
      console.log('체크된 아이템 리스트 - ', checkList);

      const checkSet = new Set(checkList);
      const items = questionList
        .filter((el) => checkSet.has(el.code as string))
        .sort(
          (a, b) =>
            checkList.indexOf(a.code as string) -
            checkList.indexOf(b.code as string),
        );
      console.log('체크된 아이템 리스트 솔팅- ', items);
      // 대발문(BIG) 타입 요소 카운트
      const bigItems = items.filter((el) => el.type === 'BIG');
      if (bigItems.length > 1) {
        alert('대발문 항목은 하나만 선택할 수 있습니다.');
        setCheckList([]);
        return;
      }
      // 문제(QUESTION) 타입 확인
      const questionItems = items.filter((el) => el.type === 'QUESTION');
      if (questionItems.length === 0) {
        alert('그룹에는 문제가 하나 이상 포함되어야 합니다.');
        return;
      }
      // 그룹화 DOM 생성
      const parentDiv = document.createElement('div');
      parentDiv.id = groupId; // props로 전달받은 groupId를 id로 설정
      parentDiv.className = 'groupedItemsContainer';
      // 그룹 체크박스 추가
      const groupCheckbox = document.createElement('input');
      groupCheckbox.type = 'checkbox';
      groupCheckbox.id = `groupCheckbox_${groupId}`;
      groupCheckbox.className = 'group-checkbox';

      const groupCheckboxLabel = document.createElement('label');
      groupCheckboxLabel.htmlFor = `groupCheckbox_${groupId}`;
      groupCheckboxLabel.innerText = '그룹 선택';

      parentDiv.appendChild(groupCheckbox);
      parentDiv.appendChild(groupCheckboxLabel);

      // 그룹 해제 버튼 추가
      const ungroupButton = document.createElement('button');
      ungroupButton.innerText = '그룹 해제';
      ungroupButton.className = 'ungroup-button';
      ungroupButton.onclick = (e) => {
        if (confirm('그룹을 해제하시겠습니까?')) {
          const button = e.currentTarget as HTMLButtonElement;
          const parentDiv = button.parentElement as HTMLElement;

          if (parentDiv) {
            // 원래 위치로 복원
            const childNodes = Array.from(parentDiv.childNodes);
            const elementsToMove = childNodes.slice(3); // 체크박스와 삭제버튼 제외
            console.log('Elements to move:', elementsToMove);

            // 이동 대상 컨테이너
            const scrollbarContainer = document.querySelector('.list_wrapper');
            if (scrollbarContainer) {
              elementsToMove.forEach((element) => {
                if (element instanceof HTMLElement) {
                  scrollbarContainer.appendChild(element); // 요소를 이동
                }
              });
            }
          }
          // 그룹 컨테이너 제거
          parentDiv.remove();
          alert('그룹이 해제되었습니다.');
        }
      };

      parentDiv.appendChild(ungroupButton);

      // 체크된 아이템 이동
      items.forEach((item) => {
        const originalElement = document.getElementById(item.code as string);
        const target =
          originalElement &&
          (originalElement.parentNode?.parentNode?.parentNode
            ?.parentNode as HTMLElement);

        console.log('target이동될 타겟', target);

        if (originalElement) {
          parentDiv.appendChild(target as HTMLElement); // 기존 요소를 새 부모로 이동
        }
      });

      const scrollbarContainer = document.querySelector('.list_wrapper');
      if (scrollbarContainer) {
        scrollbarContainer.appendChild(parentDiv);
        alert('그룹화되었습니다.');
        setCheckList([]);
      }
    };
    // 부모에서 자식의 함수를 호출할 수 있도록 연결
    useImperativeHandle(ref, () => ({
      AddGroup,
    }));

    const removeOnFromCheckList = () => {
      setCheckList((prev) => prev.filter((item) => item !== 'on'));
    };
    // 그룹 체크박스 상태 변경 처리 함수
    const handleGroupCheckboxChange = (e: Event) => {
      const target = e.target as HTMLInputElement;

      // group-checkbox인 경우에만 처리
      if (target && target.classList.contains('group-checkbox')) {
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

    useEffect(() => {
      // 이벤트 리스너 등록
      document.addEventListener('change', handleGroupCheckboxChange);

      // 정리 함수: 컴포넌트 언마운트 시 이벤트 리스너 제거
      return () => {
        document.removeEventListener('change', handleGroupCheckboxChange);
      };
    }, [checkList]);

    // 체크박스 설정
    const handleSingleCheck = (checked: boolean, id: string) => {
      if (checked) {
        setCheckList((prev) => [...prev, id]);
      } else {
        setCheckList(checkList.filter((el) => el !== id));
      }

      setIsChecked(checked);
    };

    useEffect(() => {
      console.log('checkList ------- ', checkList);
    }, [checkList]);

    useEffect(() => {
      if (setIsCheck) setIsCheck(isChecked);
    }, [isChecked]);

    const handleButtonCheck = (
      e: React.MouseEvent<HTMLButtonElement>,
      id: string,
    ) => {
      e.preventDefault();
      const target = e.currentTarget.childNodes[0].childNodes[0]
        .childNodes[0] as HTMLInputElement;

      if (!target.checked) {
        setCheckList((prev) => [...prev, id]);
      } else {
        setCheckList(checkList.filter((el) => el !== id));
      }
    };

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

    const whenDragEnd = (newList: QuizListType[]) => {
      // setQuestionList(newList); // 이동후 questionList를 업데이트
    };

    useEffect(() => {
      setQuestionList(initialQuestionList);
    }, [initialQuestionList]);

    useEffect(() => {
      // setQuestionList()
    }, [questionList, quizList]);

    // 클릭 된 아이템의 데이터
    const handleClickItem = (
      e: React.MouseEvent<HTMLButtonElement>,
      code: string,
    ) => {
      e.preventDefault();
      // const quiz = questionList.filter((el) => el.code === code);
      // console.log('선택된 요소', quiz[0]);
      // const data: QuizListType = quiz[0];

      // const combinedContent =
      //   data &&
      //   data.quizItemList &&
      //   data.quizItemList.map((item) => item.content).join(' ');

      // console.log('onItemClickData 선택된 아이템------------', combinedContent);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.usePostJsonData(combinedContent);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.iTeXEQ.latexrecovery();

      // if (onItemClick) onItemClick(data);
      // e.preventDefault();
      // const quiz = questionList.filter((el) => el.code === code);
      // const data: QuizListType = quiz[0];
      // if (onItemClick) onItemClick(data);
      // console.log('선택된 요소 퀴즈 데이터 ----------------', data);

      // if (data && data.quizItemList) {
      //   let fullContent = '';

      //   data.quizItemList.forEach((item) => {
      //     const temp = item.content;
      //     console.log('선택된 요소 퀴즈 데이터 temp----------------', temp);

      //     const parser = new DOMParser();
      //     const dom = parser.parseFromString(temp, 'text/html');

      //     const nodes = dom.querySelectorAll('.itexmath');
      //     nodes.forEach((node) => {
      //       const latex = node.getAttribute('data-latex');
      //       while (node.firstChild) {
      //         node.removeChild(node.firstChild);
      //       }
      //       if (latex) {
      //         node.textContent = latex;
      //       }
      //     });

      //     console.log('test: ', dom.body.innerHTML);

      //     fullContent += dom.body.innerHTML;
      //   });

      //   const content_0 = fullContent;

      //   console.log('content_0------------', content_0);

      //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //   // @ts-expect-error
      //   const editor = tinymce.get('tinyeditor');
      //   if (editor) {
      //     console.log('check!!!!!!');
      //     editor.setContent(content_0);

      //   } else {
      //     console.log('data read failed');
      //   }
      // }
    };

    // 스타틱 파일
    // const ocrIframeContainer = useRef<HTMLDivElement>(null);
    // useEffect(() => {
    //   const initialScripts = [
    //     '/static/tinymce5/js/tinymce/tinymce.min.js',
    //     '/static/iTeX_EQ/js/jquery-3.3.1.min.js',
    //     '/static/iTeX_EQ/js/jquery-ui.min.js',
    //     '/static/iTeX_EQ/js/ds.min.js',
    //     '/static/OCR/cropper/cropper.js',
    //     '/static/OCR/PDF/pdf.js',
    //     '/static/iTeX_fulltext/js/bootstrap.bundle.min.js',
    //     '/static/iTeX_fulltext/js/sort-list.js',
    //     '/static/dream_ui/js/dream_setting.js',
    //   ];

    //   const subsequentScripts = [
    //     '/static/iTeX_EQ/js/itex_total_eq_origin_32.js',
    //     '/static/dream_ui/js/init_setting.js',
    //     '/static/iTeX_EQ/js/itexLoader.js',
    //     '/static/iTeX_fulltext/js/dream_function.js',
    //     '/static/iTeX_fulltext/js/fulltext_dream.js?v=0.71',
    //     '/static/dream_ui/js/data_view_area.js',
    //     '/static/dream_ui/js/frame_controller.js',
    //     '/static/iTeX_fulltext/js/itex_parser_dream.js?v=0.9.6.12',
    //     '/static/iTeX_fulltext/js/itex_parser_pj2.js?v=0.9.1',
    //     '/static/iTeX_fulltext/js/cw_poc_pj_dream.js?v=0.87',
    //     '/static/iTeX_fulltext/js/hmlupload.js?v=0.1',
    //     '/static/iTeX_fulltext/js/pdf_postprocess.js?v=0.1',
    //   ];

    //   // 동적 스크립트 로딩 함수
    //   const dynamicallyLoadScripts = (
    //     scriptUrls: any[],
    //     callback: { (): Promise<void>; (): void; (): void },
    //   ) => {
    //     const promises = scriptUrls.map((url) => {
    //       return new Promise((resolve, reject) => {
    //         // 스크립트가 이미 존재하는지 확인
    //         if (document.querySelector(`script[src="${url}"]`)) {
    //           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //           // @ts-expect-error
    //           resolve(); // 이미 로드된 경우 건너뜀
    //           return;
    //         }

    //         // 존재하지 않는 경우 새로 로드
    //         const script = document.createElement('script');
    //         script.src = url;
    //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //         // @ts-expect-error
    //         script.onload = () => resolve();
    //         script.onerror = () =>
    //           reject(new Error(`Failed to load script ${url}`));
    //         document.body.appendChild(script);
    //       });
    //     });

    //     Promise.all(promises)
    //       .then(() => {
    //         if (callback) callback();
    //       })
    //       .catch((err) => {
    //         console.error(err);
    //       });
    //   };

    //   const initComponent = async () => {
    //     dynamicallyLoadScripts([...initialScripts], async () => {
    //       console.log('Initial scripts loaded');
    //       const checkTinyMCEReady = () => {
    //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //         // @ts-expect-error
    //         if (window.tinymce) {
    //           console.log('tinymce loaded successfully');
    //           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //           // @ts-expect-error
    //           dynamicallyLoadScripts([...subsequentScripts], () => {
    //             console.log('Subsequent scripts loaded');

    //             if (ocrIframeContainer.current) {
    //               const iframe = document.createElement('iframe');
    //               iframe.width = '0';
    //               iframe.height = '0';
    //               iframe.src = '/static/OCR/ocr_iframe_origin.html?v=0.34';
    //               iframe.frameBorder = '0';
    //               iframe.scrolling = 'no';
    //               iframe.id = 'itex_frame_area';
    //               ocrIframeContainer.current.appendChild(iframe);
    //             }
    //           });
    //         } else {
    //           setTimeout(checkTinyMCEReady, 50);
    //         }
    //       };

    //       checkTinyMCEReady();
    //     });
    //   };

    //   initComponent();
    // }, []);

    return (
      <Container>
        {questionList.length == 0 && (
          <ValueNone info="문항을 추가 해주세요" textOnly></ValueNone>
        )}
        {questionList.length > 0 && (
          <ScrollWrapper $height={$height}>
            <PerfectScrollbar>
              <ListWrapper className="list_wrapper">
                {/* <DnDWrapper
                  dragList={questionList}
                  onDragging={() => {}}
                  onDragEnd={whenDragEnd}
                  dragSectionName={'abc'}
                >
                  {(dragItem, ref, isDragging) => ( */}
                {questionList.map((dragItem) => (
                  <ListDnDItem
                    key={`${dragItem.code}`}
                    className={''}
                    // ref={ref}
                    // className={`${isDataColor && dragItem.classificationData?.length && `ondnd`} ${isDragging ? 'opacity' : ''} ${dragItem.quizCategoryList[0] ? 'isHasMeta' : ''}`}
                  >
                    <Quiz>
                      <CheckBoxI
                        $margin={'0 5px 0 0'}
                        onChange={(e) =>
                          handleSingleCheck(
                            e.target.checked,
                            dragItem.code as string,
                          )
                        }
                        checked={
                          checkList.includes(dragItem.code as string)
                            ? true
                            : false
                        }
                        id={dragItem.code as string}
                        value={dragItem.code}
                      />
                      <PerfectScrollbarWrapper>
                        <PerfectScrollbar>
                          <MathViewerWrapper>
                            <MathViewer data={dragItem.content}></MathViewer>
                          </MathViewerWrapper>
                        </PerfectScrollbar>
                      </PerfectScrollbarWrapper>
                    </Quiz>
                    {/* 출처 난이도 문항타입 */}
                    <QuizCategory>
                      {dragItem.quizCategory?.문항타입 != '' && (
                        <span>{`문항타입 : ${dragItem.quizCategory?.문항타입}`}</span>
                      )}
                      {dragItem.quizCategory?.난이도 != '' && (
                        <span>{`난이도 : ${dragItem.quizCategory?.난이도}`}</span>
                      )}
                      {dragItem.quizCategory?.sources?.map((el, idx) => (
                        <span key={idx}>{el}</span>
                      ))}
                    </QuizCategory>
                  </ListDnDItem>
                ))}
                {/* </DnDWrapper> */}
              </ListWrapper>
            </PerfectScrollbar>
          </ScrollWrapper>
        )}
      </Container>
    );
  },
);

const Container = styled.div<{ $height?: string }>`
  /* border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none; */
  width: 100%;
  height: fit-content;

  .groupedItemsContainer {
    padding: 10px;
    margin: 10px;
    border: 3px solid ${COLOR.BORDER_BLUE};
    position: relative;
  }

  .groupedItemsContainer {
    border: 1px solid #ddd;
    margin: 10px 0;
    padding: 10px;
    background-color: #f9f9f9;
  }

  .group-checkbox {
    margin-right: 5px;
  }

  .ungroup-button {
    padding: 5px;
    background-color: ${COLOR.ERROR};
    color: white;
    border: none;
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 12px;
  }
`;
const Quiz = styled.div`
  display: flex;
`;
const QuizCategory = styled.div`
  border-top: 1px solid #eee;
  background-color: ${COLOR.HOVER};
  font-size: 12px;
  padding: 5px 2px;
  span {
    font-weight: bold;
  }
`;
const PerfectScrollbarWrapper = styled.div`
  max-height: 300px;
  flex: 1 0 0;
`;
const ScrollWrapper = styled.div<{ $height?: string }>`
  /* overflow-y: auto; */
  width: 100%;
  height: ${({ $height }) => ($height ? ` ${$height}` : `calc(100vh - 200px)`)};
  background-color: ${COLOR.LIGHT_GRAY};
`;

const MathViewerWrapper = styled.div`
  div {
    width: 100% !important;
  }

  p > img {
    width: 100% !important;
    height: auto !important;
  }

  div > img {
    width: 100% !important;
    height: auto !important;
  }
  table {
    width: inherit !important;
    height: auto !important;
  }
`;
const ListWrapper = styled.ul`
  padding: 10px 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: fit-content;
`;

const ListDnDItem = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  height: fit-content;
  padding: 10px;
  border: 1px solid ${COLOR.BORDER_BLUE};
  background-color: #fff;
  border-radius: 5px;
  min-height: 50px;
  margin-bottom: 10px;

  > div {
    width: 100% !important;
  }

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
QuizElementList.displayName = 'QuizElementList';
export default QuizElementList;
