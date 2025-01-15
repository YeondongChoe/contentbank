import * as React from 'react';
import { useEffect, useState, useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  Button,
  CheckBoxI,
  CreateQuizGroupList,
  DnDWrapper,
  Icon,
  openToastifyAlert,
  Tooltip,
  ValueNone,
} from '../../..';
import { quizService } from '../../../../api/axios';
import { myAuthorityAtom } from '../../../../store/myAuthorityAtom';
import { quizListAtom } from '../../../../store/quizListAtom';
import { QuizListType, Source } from '../../../../types';
import { postRefreshToken } from '../../../../utils/tokenHandler';
import { windowOpenHandler } from '../../../../utils/windowHandler';
import { COLOR } from '../../../constants/COLOR';

// import quizData from './question_list.json';

export function QuizList({
  questionList: initialQuestionList,
  showTitle,
  $height,
  showCheckBox,
  showViewAllButton,
  fontBold,
  setCheckedList,
  isDataColor,
  isHasMeta,
  onItemClick,
  setIsCheck,
}: {
  questionList: QuizListType[] | [];
  showTitle?: boolean;
  showCheckBox?: boolean;
  showViewAllButton?: boolean;
  $height?: string;
  fontBold?: boolean;
  setCheckedList: React.Dispatch<React.SetStateAction<string[]>>;
  isDataColor?: boolean;
  isHasMeta?: boolean;
  onItemClick?: (item: QuizListType) => void;
  setIsCheck?: React.Dispatch<React.SetStateAction<boolean>>;
  arrowPosition?: string;
}) {
  const queryClient = useQueryClient();
  const [myAuthority, setMyAuthority] = useRecoilState(myAuthorityAtom);
  const [quizList, setQuizList] = useRecoilState(quizListAtom);
  const [questionList, setQuestionList] = useState<QuizListType[]>([]);
  const [checkList, setCheckList] = useState<string[]>([]);

  const [isPostMessage, setIsPostMessage] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [groupId, setGroupId] = useState<string | null>(null);
  const [isAllowed, setIsAllowed] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [radioCheck, setRadioCheck] = useState<
    { title: string; checkValue: string }[]
  >([]);

  // 체크박스 설정
  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.checked);

    if (e.target.checked) {
      setCheckList(questionList.map((item) => item.code as string)); //
    } else {
      setCheckList([]);
    }
  };
  const handleSingleCheck = (checked: boolean, id: string) => {
    if (checked) {
      setCheckList((prev) => [...prev, id]);
    } else {
      setCheckList(checkList.filter((el) => el !== id));
    }

    setIsChecked(checked);
  };
  // 그룹 체크
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

  useEffect(() => {
    if (setIsCheck) setIsCheck(isChecked);
  }, [isChecked]);

  const handleButtonCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    code: string,
  ) => {
    event.preventDefault();
    const target = event.currentTarget.childNodes[0].childNodes[0]
      .childNodes[0] as HTMLInputElement;

    if (!target.checked) {
      setCheckList((prev) => [...prev, code]);
    } else {
      setCheckList(checkList.filter((el) => el !== code));
    }
  };

  //문항 그룹 생성/해제 api
  const putGroup = async (items: QuizListType[]) => {
    if (isAllowed) {
      console.log('groupId ----- ', groupId);
      console.log('group ----- ', items);
      const quizList = items.map((item, index) => ({
        idx: item.idx, // idx 값 가져오기
        sort: index + 1, // 순번은 배열 순서대로 1부터 시작
      }));

      console.log('quizList ----- ', quizList);

      const data = {
        groupCode: groupId,
        quizList: quizList,
      };
      const groupCode = await quizService.put(`/v1/quiz/group`, data);
      setGroupId(groupCode.data.data.groupCode);
      return groupCode.data.data.groupCode;
    }
  };

  const { mutate: putGroupData, isPending } = useMutation({
    mutationFn: putGroup,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: '잠시후 다시 시도해주세요',
      });
      if (context.response.data.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response) => {
      // console.log('response ----- ', response);

      //저장 알람
      openToastifyAlert({
        type: 'success',
        text: '저장되었습니다.',
      });
      // 초기화
      setIsAllowed(false);
      setIsDelete(false);
      queryClient.invalidateQueries({
        queryKey: ['get-quizList'],
        exact: true,
      });
    },
  });

  // 그룹으로 묶기
  useEffect(() => {
    // if (isDelete) {
    //   putGroupData([]);
    //   alert('그룹이 해제되었습니다.');
    // }
  }, [groupId]);
  useEffect(() => {}, [isAllowed]);
  useEffect(() => {
    if (isDelete) {
      putGroupData([]);
      alert('그룹이 해제되었습니다.');
    }
  }, [isDelete]);

  const AddGroup = () => {
    setIsAllowed(true);
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
    const bigItems = items.filter((el) =>
      el?.quizItemList?.some((item) => item.type === 'BIG'),
    );
    console.log('대발문 조건 ---- ', bigItems);
    if (bigItems.length > 1) {
      alert('대발문 항목은 하나만 선택할 수 있습니다.');
      setCheckList([]);
      return;
    }
    // 문제(QUESTION) 타입 확인
    const questionItems = items.filter((el) =>
      el?.quizItemList?.some((item) => item.type === 'QUESTION'),
    );
    //
    if (questionItems.length === 0) {
      alert('그룹에는 문제가 하나 이상 포함되어야 합니다.');
      return;
    }
    // 그룹화 DOM 생성
    // 서버에 그룹 상태 전송
    if (!isPending) putGroupData(items);
    const parentDiv = document.createElement('div') as HTMLElement;
    parentDiv.id = groupId as string; // props로 전달받은 groupId를 id로 설정
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
        console.log('해제할 그룹 parentDiv', parentDiv);
        if (parentDiv) {
          // 원래 위치로 복원
          const childNodes = Array.from(parentDiv.childNodes);
          const elementsToMove = childNodes.slice(3); // 체크박스와 삭제버튼 제외
          // console.log('Elements to move:', elementsToMove);

          console.log('해제할 그룹 아이디', parentDiv.id);
          setIsDelete(true); // 서버에 그룹 상태 전송
          setGroupId(null);
          // 그룹 컨테이너 제거
          // parentDiv.remove();

          // // 이동 대상 컨테이너
          // const scrollbarContainer = document.querySelector('.list_wrapper');
          // if (scrollbarContainer) {
          //   elementsToMove.forEach((element) => {
          //     if (element instanceof HTMLElement) {
          //       scrollbarContainer.appendChild(element); // 요소를 이동
          //     }
          //   });
          // }
        }
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

  // 클릭 된 아이템의 데이터
  const handleClickItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    code: string,
  ) => {
    e.preventDefault();
    // 체크 표시
    const target = e.currentTarget.childNodes[0].childNodes[0]
      .childNodes[0] as HTMLInputElement;

    if (!target.checked) {
      setCheckList((prev) => [...prev, code]);
    } else {
      setCheckList(checkList.filter((el) => el !== code));
    }

    //
    const quiz = questionList.filter((el) => el.code === code);
    console.log('선택된 요소', quiz[0]);
    const data: QuizListType = quiz[0];

    const combinedContent =
      data &&
      data.quizItemList &&
      data.quizItemList.map((item) => item.content).join(' ');

    console.log('onItemClickData 선택된 아이템------------', combinedContent);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.usePostJsonData(combinedContent);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.iTeXEQ.latexrecovery();

    if (onItemClick) {
      onItemClick(data);
    }
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

  // useEffect(() => {
  //   if (isPostMessage && childWindowRef.current) {
  //     childWindowRef.current.postMessage({ data: 'Hello from Parent' }, '*');
  //   }
  // }, [isPostMessage]);

  useEffect(() => {
    setCheckedList(checkList);
  }, [checkList]);

  useEffect(() => {
    setCheckedList(checkList); // 체크리스트 상태를 외부로 전달
  }, [checkList, setCheckedList]);

  useEffect(() => {
    const result = rearrangeQuestionList(initialQuestionList);

    setQuestionList(result);

    console.log('그룹 값에 대한 결과 솔팅 --- ', result);
  }, [initialQuestionList]);
  // 최초값 들어올시 그룹 아이디를 가진 문항이있을 때
  function rearrangeQuestionList(questionList: QuizListType[]): QuizListType[] {
    const grouped: Record<string, QuizListType[]> = {};
    const ungrouped: QuizListType[] = [];

    questionList.forEach((item) => {
      if (item.groupCode) {
        if (!grouped[item.groupCode]) {
          grouped[item.groupCode] = [];
        }
        grouped[item.groupCode].push(item);
      } else {
        ungrouped.push(item);
      }
    });

    const groupedArray = Object.values(grouped).flat();

    return [...groupedArray, ...ungrouped];
  }

  useEffect(() => {
    // DOM에서 그룹코드에 따라 요소를 동적으로 그룹화
    const groupElementsByCode = () => {
      const listWrapper = document.querySelector('.list_wrapper');
      if (!listWrapper) return;

      // // 기존 그룹화된 부모 요소 초기화
      // const existingGroups = document.querySelectorAll(
      //   '.groupedItemsContainer',
      // );
      // existingGroups.forEach((group) => group.remove());

      const groupMap: Record<string, HTMLElement> = {};
      const itemsToSend: QuizListType[] = [];
      // 그룹 ID로 부모 요소 생성
      questionList.forEach((item) => {
        if (item.groupCode) {
          if (!groupMap[item.groupCode]) {
            const parentDiv = document.createElement('div') as HTMLElement;
            parentDiv.id = item.groupCode;
            parentDiv.className = 'groupedItemsContainer';

            const groupCheckbox = document.createElement('input');
            groupCheckbox.type = 'checkbox';
            groupCheckbox.id = `groupCheckbox_${item.groupCode}`;
            groupCheckbox.className = 'group-checkbox';

            const groupCheckboxLabel = document.createElement('label');
            groupCheckboxLabel.htmlFor = `groupCheckbox_${item.groupCode}`;
            groupCheckboxLabel.innerText = '그룹 선택';

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
                  const scrollbarContainer =
                    document.querySelector('.list_wrapper');
                  if (scrollbarContainer) {
                    elementsToMove.forEach((element) => {
                      if (element instanceof HTMLElement) {
                        scrollbarContainer.appendChild(element); // 요소를 이동
                      }
                    });
                  }
                }
                // 그룹 컨테이너 제거
                setGroupId(null);
                parentDiv.remove();

                alert('그룹이 해제되었습니다.');
              }
            };

            parentDiv.appendChild(groupCheckbox);
            parentDiv.appendChild(groupCheckboxLabel);
            parentDiv.appendChild(ungroupButton);

            groupMap[item.groupCode] = parentDiv;
            listWrapper.appendChild(parentDiv);
          }
        }
      });
      // 동일한 그룹 ID를 가진 리스트 요소를 이동
      questionList.forEach((item) => {
        if (item.groupCode) {
          const element = document.getElementById(item.code);
          console.log('동일한 그룹 ID를 가진 리스트 요소를 이동', element);
          const target =
            element &&
            (element.parentNode?.parentNode?.parentNode
              ?.parentNode as HTMLElement);

          console.log('target이동될 타겟', target);

          if (element) {
            const parentDiv = groupMap[item.groupCode];
            parentDiv.appendChild(target as HTMLElement); // 기존 요소를 새 부모로 이동
          }

          itemsToSend.push(item);
        }
      });

      // 서버에 그룹 상태 한 번에 전송
      console.log('최종 그룹 리스트 데이터 ---', itemsToSend);
      if (!isPending && isAllowed && itemsToSend.length > 0) {
        putGroupData(itemsToSend);
      }
    };

    groupElementsByCode();
  }, [questionList]);

  useEffect(() => {
    // setQuestionList()
    console.log('questionList -------- ', questionList);
    // console.log('quizList -------- ', quizList);
  }, [questionList, quizList]);

  // 스타틱 파일
  const ocrIframeContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const initialScripts = [
      '/static/tinymce5/js/tinymce/tinymce.min.js',
      '/static/iTeX_EQ/js/jquery-3.3.1.min.js',
      '/static/iTeX_EQ/js/jquery-ui.min.js',
      '/static/iTeX_EQ/js/ds.min.js',
      '/static/OCR/cropper/cropper.js',
      '/static/OCR/PDF/pdf.js',
      '/static/iTeX_fulltext/js/bootstrap.bundle.min.js',
      '/static/iTeX_fulltext/js/sort-list.js',
      '/static/dream_ui/js/dream_setting.js',
    ];

    const subsequentScripts = [
      '/static/iTeX_EQ/js/itex_total_eq_origin_32.js',
      '/static/dream_ui/js/init_setting.js',
      '/static/iTeX_EQ/js/itexLoader.js',
      '/static/iTeX_fulltext/js/dream_function.js',
      '/static/iTeX_fulltext/js/fulltext_dream.js?v=0.71',
      '/static/dream_ui/js/data_view_area.js',
      '/static/dream_ui/js/frame_controller.js',
      '/static/iTeX_fulltext/js/itex_parser_dream.js?v=0.9.6.12',
      '/static/iTeX_fulltext/js/itex_parser_pj2.js?v=0.9.1',
      '/static/iTeX_fulltext/js/cw_poc_pj_dream.js?v=0.87',
      '/static/iTeX_fulltext/js/hmlupload.js?v=0.1',
      '/static/iTeX_fulltext/js/pdf_postprocess.js?v=0.1',
    ];

    // 동적 스크립트 로딩 함수
    const dynamicallyLoadScripts = (
      scriptUrls: any[],
      callback: { (): Promise<void>; (): void; (): void },
    ) => {
      const promises = scriptUrls.map((url) => {
        return new Promise((resolve, reject) => {
          // 스크립트가 이미 존재하는지 확인
          if (document.querySelector(`script[src="${url}"]`)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            resolve(); // 이미 로드된 경우 건너뜀
            return;
          }

          // 존재하지 않는 경우 새로 로드
          const script = document.createElement('script');
          script.src = url;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          script.onload = () => resolve();
          script.onerror = () =>
            reject(new Error(`Failed to load script ${url}`));
          document.body.appendChild(script);
        });
      });

      Promise.all(promises)
        .then(() => {
          if (callback) callback();
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const initComponent = async () => {
      dynamicallyLoadScripts([...initialScripts], async () => {
        console.log('Initial scripts loaded');
        const checkTinyMCEReady = () => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          if (window.tinymce) {
            console.log('tinymce loaded successfully');
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            dynamicallyLoadScripts([...subsequentScripts], () => {
              console.log('Subsequent scripts loaded');

              if (ocrIframeContainer.current) {
                const iframe = document.createElement('iframe');
                iframe.width = '0';
                iframe.height = '0';
                iframe.src = '/static/OCR/ocr_iframe_origin.html?v=0.34';
                iframe.frameBorder = '0';
                iframe.scrolling = 'no';
                iframe.id = 'itex_frame_area';
                ocrIframeContainer.current.appendChild(iframe);
              }
            });
          } else {
            setTimeout(checkTinyMCEReady, 50);
          }
        };

        checkTinyMCEReady();
      });
    };

    initComponent();
  }, []);

  return (
    <Container>
      {questionList.length == 0 && (
        <ValueNone info="문항을 추가 해주세요" textOnly></ValueNone>
      )}
      {questionList.length > 0 && (
        <ScrollWrapper $height={$height}>
          <PerfectScrollbar>
            {showTitle && (
              <Title>
                {showCheckBox && (
                  <CheckBoxI
                    $margin={'0 5px 0 0'}
                    onChange={(e) => handleAllCheck(e)}
                    checked={
                      checkList.length === questionList.length ? true : false
                    }
                    // checked={true}
                    id={'all check'}
                    value={'all check'}
                  />
                )}
                <span className={`${fontBold ? `bold` : ''} title_top`}>
                  전체선택
                </span>
              </Title>
            )}

            <CreateQuizGroupList
              questionList={questionList}
              checkList={checkList}
              setCheckList={setCheckList}
              handleButtonCheck={handleButtonCheck}
              showCheckBox={showCheckBox}
              showViewAllButton={showViewAllButton}
              handleClickItem={handleClickItem}
            />
          </PerfectScrollbar>
        </ScrollWrapper>
      )}

      <EditerButtonWrapper>
        <Button onClick={() => AddGroup()} width="310px" height="35px" $filled>
          그룹 묶기
        </Button>
      </EditerButtonWrapper>
    </Container>
  );
}

const Container = styled.div<{ $height?: string }>`
  /* border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none; */
  width: 100%;
  height: fit-content;
  position: relative;
  height: 100%;

  .groupedItemsContainer {
    border: 3px solid ${COLOR.BORDER_BLUE};
    position: relative;
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

const EditerButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid ${COLOR.BORDER_BLUE};
`;

const ScrollWrapper = styled.div<{ $height?: string }>`
  /* overflow-y: auto; */
  width: 100%;
  height: ${({ $height }) => ($height ? ` ${$height}` : `calc(100vh - 200px)`)};
  background-color: ${COLOR.LIGHT_GRAY};
`;
const Title = styled.div`
  padding: 15px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  .title_top {
    font-size: 15px;
  }
  .bold {
    font-weight: bold;
  }
`;
