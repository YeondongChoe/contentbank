import * as React from 'react';
import { useEffect, useState, useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  Button,
  CheckBoxI,
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

import quizData from './question_list.json';

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
  arrowPosition = `left: calc(50% - 25px)`,
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
  const textRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isPostMessage, setIsPostMessage] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [groupId, setGroupId] = useState<string | null>(null);

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
    const quiz = questionList.filter((el) => el.code === code);
    console.log('선택된 요소', quiz[0]);
    console.log('선택된 요소', quiz[0].idx);
    const data: QuizListType = quiz[0];
    // data 객체의 속성들을 문자열로 변환
    const dataStringified: Record<string, string> = {
      // ...data,
      idx: data.idx.toString(),
      // isDelete: data.isDelete.toString(),
      // isUse: data.isUse.toString(),
      // isFavorite:
      //   data.isFavorite !== undefined ? data.isFavorite.toString() : '',
      // lastArticle: JSON.stringify(data.lastArticle),
      // quizCategoryList: JSON.stringify(data.quizCategoryList),
      // quizItemList: data.quizItemList ? JSON.stringify(data.quizItemList) : '',
      // quizList: JSON.stringify(data.quizList),
    };
    const queryString = new URLSearchParams(dataStringified).toString();

    windowOpenHandler({
      name: 'quizpreview',
      url: `/quizpreview?${queryString}`,
      $width: 800,
      $height: 800,
    });

    setIsPostMessage(true);
  };

  // 그룹으로 묶기
  useEffect(() => {}, [groupId]);

  //문항 그룹 생성/해제 api
  const putGroup = async (items: QuizListType[]) => {
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

    return groupCode.data.data.groupCode;
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
      console.log('response ----- ', response);
      setGroupId(response);

      //저장 알람
      openToastifyAlert({
        type: 'success',
        text: '저장되었습니다.',
      });

      // 초기화
      queryClient.invalidateQueries({
        queryKey: ['get-quizList'],
        exact: true,
      });
    },
  });

  useEffect(() => {
    console.log('groupId ----- ', groupId);
  }, [groupId]);

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
        setGroupId(null);
        parentDiv.remove();
        // 서버에 그룹 상태 전송
        if (!isPending) putGroupData(items);
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
    // const result = rearrangeQuestionList(initialQuestionList);
    const result = rearrangeQuestionList(
      quizData.data.quizList as unknown as QuizListType[],
    );
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

      const groupMap: Record<string, HTMLElement> = {};

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
                // 서버에 그룹 상태 전송
                // if (!isPending) putGroupData(item);
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
          if (element) {
            const parentDiv = groupMap[item.groupCode];
            parentDiv.appendChild(element.parentElement as HTMLElement);
          }
        }
      });
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
                  // ref={ref}
                  // className={`${isDataColor && dragItem.classificationData?.length && `ondnd`} ${isDragging ? 'opacity' : ''} ${dragItem.quizCategoryList[0] ? 'isHasMeta' : ''}`}
                  className={`${dragItem.quizCategoryList[0] ? 'isHasMeta' : ''}`}
                >
                  {showCheckBox ? (
                    <button
                      type="button"
                      className="title"
                      onClick={(e) => {
                        handleButtonCheck(e, dragItem.code);
                      }}
                    >
                      <CheckBoxI
                        $margin={'0 5px 0 0'}
                        onChange={(e) =>
                          handleSingleCheck(e.target.checked, dragItem.code)
                        }
                        checked={
                          checkList.includes(dragItem.code as string)
                            ? true
                            : false
                        }
                        id={dragItem.code}
                        value={dragItem.code}
                      />
                      <span className="title_id">
                        {dragItem.quizItemList &&
                          dragItem.quizItemList.map((el) => (
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
                        {dragItem.quizCategoryList[0]?.quizCategory?.문항타입}
                      </span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="title"
                      onClick={(e) => {
                        handleClickItem(e, dragItem.code);
                      }}
                    >
                      <CheckBoxI
                        $margin={'0 5px 0 0'}
                        onChange={(e) =>
                          handleSingleCheck(e.target.checked, dragItem.code)
                        }
                        checked={
                          checkList.includes(dragItem.code as string)
                            ? true
                            : false
                        }
                        id={dragItem.code}
                        value={dragItem.code}
                      />
                      <span className="title_id">
                        {dragItem.quizItemList &&
                          dragItem.quizItemList.map((el) => (
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
                        {dragItem.quizCategoryList[0]?.quizCategory?.문항타입}
                      </span>
                    </button>
                  )}
                  <MetaGroup
                    onMouseOver={(e) => showTooltip(e)}
                    onMouseLeave={(e) => hideTooltip(e)}
                  >
                    <span className="sub_title ellipsis" ref={textRef}>
                      <span>
                        {dragItem.quizCategoryList[0]?.quizCategory?.교과 &&
                          `${dragItem.quizCategoryList[0].quizCategory.교과} ,`}
                      </span>
                      <span>
                        {dragItem.quizCategoryList[0]?.quizCategory?.과목 &&
                          `${dragItem.quizCategoryList[0].quizCategory.과목} ,`}
                      </span>
                      <span>
                        {dragItem.quizCategoryList[0]?.quizCategory?.학년 &&
                          `${dragItem.quizCategoryList[0].quizCategory.학년} ,`}
                      </span>
                      <span>
                        {dragItem.quizCategoryList[0]?.quizCategory?.난이도 &&
                          `${dragItem.quizCategoryList[0].quizCategory.난이도} ,`}
                      </span>
                      <span>
                        {dragItem.quizCategoryList[0]?.quizCategory?.학교급 &&
                          `${dragItem.quizCategoryList[0].quizCategory.학교급} ,`}
                      </span>
                      <span>
                        {dragItem.quizCategoryList[0]?.quizCategory?.문항타입 &&
                          `${dragItem.quizCategoryList[0].quizCategory.문항타입} ,`}
                      </span>

                      <span>
                        {dragItem.quizCategoryList[0]?.quizCategory?.대단원 &&
                          `${dragItem.quizCategoryList[0].quizCategory.대단원} ,`}
                      </span>
                      <span>
                        {dragItem.quizCategoryList[0]?.quizCategory?.중단원 &&
                          `${dragItem.quizCategoryList[0].quizCategory.중단원} ,`}
                      </span>
                      <span>
                        {dragItem.quizCategoryList[0]?.quizCategory?.소단원 &&
                          `${dragItem.quizCategoryList[0].quizCategory.소단원} ,`}
                      </span>

                      {dragItem.quizCategoryList[0]?.quizCategory?.sources &&
                        dragItem.quizCategoryList[0]?.quizCategory?.sources.map(
                          (item: Source) => (
                            <span key={`출처 배열 ${item.출처}`}>
                              {item?.출처}
                              {item?.기출명}
                              {item?.문항번호}
                              {item?.출제년도}
                              {item?.교재속성}
                              {item?.출판사}
                              {item?.시리즈}
                              {item?.교재명}
                              {item?.교재페이지}
                              {item?.교재번호}
                              {item?.출판년도}
                              {item?.내신형식}
                              {item?.학교명}
                              {item?.학사일정}
                              {item?.내신페이지}
                              {item?.내신배점}
                              {item?.기출속성}
                              {item?.주관사}
                              {item?.기출명}
                              {item?.시행학제}
                              {item?.시행학년}
                              {item?.시험지타입}
                              {item?.기출배점}
                              {item?.기출일시}
                            </span>
                          ),
                        )}
                    </span>

                    <Tooltip
                      arrowPosition={arrowPosition}
                      // arrowPosition={`left: calc(50% - 25px)`}
                      width={'100%'}
                      ref={tooltipRef}
                    >
                      <>
                        <span>
                          {dragItem.quizCategoryList[0]?.quizCategory?.교과 &&
                            `${dragItem.quizCategoryList[0].quizCategory.교과} ,`}
                        </span>
                        <span>
                          {dragItem.quizCategoryList[0]?.quizCategory?.과목 &&
                            `${dragItem.quizCategoryList[0].quizCategory.과목} ,`}
                        </span>
                        <span>
                          {dragItem.quizCategoryList[0]?.quizCategory?.학년 &&
                            `${dragItem.quizCategoryList[0].quizCategory.학년} ,`}
                        </span>
                        <span>
                          {dragItem.quizCategoryList[0]?.quizCategory?.난이도 &&
                            `${dragItem.quizCategoryList[0].quizCategory.난이도} ,`}
                        </span>
                        <span>
                          {dragItem.quizCategoryList[0]?.quizCategory?.학교급 &&
                            `${dragItem.quizCategoryList[0].quizCategory.학교급} ,`}
                        </span>
                        <span>
                          {dragItem.quizCategoryList[0]?.quizCategory
                            ?.문항타입 &&
                            `${dragItem.quizCategoryList[0].quizCategory.문항타입} ,`}
                        </span>

                        <span>
                          {dragItem.quizCategoryList[0]?.quizCategory?.대단원 &&
                            `${dragItem.quizCategoryList[0].quizCategory.대단원} ,`}
                        </span>
                        <span>
                          {dragItem.quizCategoryList[0]?.quizCategory?.소단원 &&
                            `${dragItem.quizCategoryList[0].quizCategory.소단원} ,`}
                        </span>

                        <span>
                          {dragItem.quizCategoryList[0]?.quizCategory?.중단원 &&
                            `${dragItem.quizCategoryList[0].quizCategory.중단원} ,`}
                        </span>

                        {dragItem.quizCategoryList[0]?.quizCategory?.sources &&
                          dragItem.quizCategoryList[0]?.quizCategory?.sources.map(
                            (item: Source) => (
                              <span key={`출처 배열 ${item.출처}`}>
                                {item?.출처}
                                {item?.기출명}
                                {item?.문항번호}
                                {item?.출제년도}
                                {item?.교재속성}
                                {item?.출판사}
                                {item?.시리즈}
                                {item?.교재명}
                                {item?.교재페이지}
                                {item?.교재번호}
                                {item?.출판년도}
                                {item?.내신형식}
                                {item?.학교명}
                                {item?.학사일정}
                                {item?.내신페이지}
                                {item?.내신배점}
                                {item?.기출속성}
                                {item?.주관사}
                                {item?.기출명}
                                {item?.시행학제}
                                {item?.시행학년}
                                {item?.시험지타입}
                                {item?.기출배점}
                                {item?.기출일시}
                              </span>
                            ),
                          )}
                      </>
                    </Tooltip>
                  </MetaGroup>
                  {showViewAllButton && (
                    <ViewAllButton>
                      <button
                        type="button"
                        onClick={() => openViewer(dragItem.code)}
                      >
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
                </ListDnDItem>
              ))}
              {/* //   )}
              // </DnDWrapper> */}
            </ListWrapper>
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
const ListWrapper = styled.ul`
  padding: 10px 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: fit-content;
`;

const ListDnDItem = styled.li<{ isChecked?: boolean }>`
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
  /* background-color: ${({ isChecked }) =>
    isChecked ? `${COLOR.IS_CHECK_BACKGROUND}` : 'white'}; */

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
