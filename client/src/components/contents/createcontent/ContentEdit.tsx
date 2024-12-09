import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  Button,
  Loader,
  MathViewer,
  Modal,
  openToastifyAlert,
  Select,
  ValueNone,
} from '../..';
import {
  classificationInstance,
  quizService,
  resourceServiceInstance,
} from '../../../api/axios';
import { quizListAtom } from '../../../store/quizListAtom';
import {
  AddQuestionListType,
  EditorDataType,
  IdxNamePair,
  ItemCategoryType,
  QuestionClassListType,
  QuizCategory,
  QuizCategoryList,
  QuizItemListType,
  QuizListType,
  QuizType,
} from '../../../types';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { COLOR } from '../../constants/COLOR';

import { EditerOneFile } from './editer';
import Type4 from './editer/components/Type4';
import { QuizList } from './list';
import { InputOptions } from './options/InputOptions';
import { OptionList } from './options/OptionList';
// import { OptionList } from './options/OptionList';

const loadMathJax = (setLoaded: (arg0: boolean) => void) => {
  if (window.MathJax) {
    setLoaded(true);
    return;
  }

  (window as any).MathJax = {
    startup: {
      ready: () => {
        const { MathJax } = window as any;
        MathJax.startup.defaultReady();
        console.log('MathJax is loaded, version: ', MathJax.version);
        setLoaded(true);
      },
    },
    tex: {
      inlineMath: [['\\(', '\\)']],
    },
    svg: {
      scale: 0.9,
      fontCache: 'local',
      minScale: 0.1,
    },
    options: {
      renderActions: {
        addMenu: [
          /* ... */
        ],
      },
      menuOptions: {
        settings: {},
      },
    },
  };

  const script = document.createElement('script');
  script.id = 'MathJax-script';
  script.src = '/static/iTeX_EQ/js/tex-svg-full_3_2_2.js';
  script.async = true;
  script.onload = () => {
    setLoaded(true);
  };
  script.onerror = () => {
    console.error('Failed to load MathJax.');
  };
  document.head.appendChild(script);
};

type SelectedValueType = string | { [key: string]: any };
type SelectedSourceItem = Record<string, any>;

export function ContentEdit({
  setTabView,
  type,
}: {
  setTabView: React.Dispatch<React.SetStateAction<string>>;
  type: string;
}) {
  const queryClient = useQueryClient();
  const [isMathJaxLoaded, setMathJaxLoaded] = useState(false);
  const [quizList, setQuizList] = useRecoilState(quizListAtom);
  const [parsedStoredQuizList, setParsedStoredQuizList] = useState<
    QuizListType[]
  >([]);
  const [data, setData] = useState<QuizType[] | null>(null);
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const [idxNamePairsF, setIdxNamePairsF] = useState<IdxNamePair[]>([]);
  const [idxNamePairsG, setIdxNamePairsG] = useState<IdxNamePair[]>([]);
  const [idxNamePairsH, setIdxNamePairsH] = useState<IdxNamePair[]>([]);

  const [content, setContent] = useState<string[]>([]);
  const [dataFetched, setDataFetched] = useState(false);

  const [editorData, setEditorData] = useState<EditorDataType | null>(null);
  const [isEditor, setIsEditor] = useState<boolean>(false);
  const [quizItemList, setQuizItemList] = useState<QuizItemListType>([]);
  const [quizItemArrList, setQuizItemArrList] = useState<QuizItemListType[]>(
    [],
  );
  const [addQuestionList, setAddQuestionList] = useState<AddQuestionListType>(
    [],
  );
  const [quizClassList, setQuizClassList] = useState<QuestionClassListType>([]);

  // 선택된 리스트 아이템 데이터
  const [onItemClickData, setOnItemClickData] = useState<QuizListType>();
  const [quizIdx, setQuizIdx] = useState<number[]>([]);

  // 수정시 체크리스트 값 가져오기
  useEffect(() => {
    const storedQuizList = window.localStorage.getItem('quizList');

    // console.log(
    //   '전역에서 로컬 스토리지에서 가져온 체크된 리스트값---',
    //   storedQuizList,
    // );

    if (storedQuizList) {
      setParsedStoredQuizList(JSON.parse(storedQuizList));

      // 로컬스토리지 값 다받은 뒤 초기화
      window.opener.localStorage.clear();
      return;
    }
  }, []);

  //셀렉트 값
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>(''); //문항타입
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(''); //난이도
  const [selectedDifficultyCommon, setSelectedDifficultyCommon] =
    useState<string>(''); //난이도 공통
  const [selectedSource, setSelectedSource] = useState<SelectedSourceItem[]>(
    [],
  ); //출처
  const [selectedList, setSelectedList] = useState<
    {
      [key: number]: string;
    }[]
  >([]);

  // 리스트 선택시 기존값 셋팅
  useEffect(() => {
    // if (onItemClickData) {
    //   const quizCategoryList = onItemClickData?.quizCategoryList;

    //   console.log('quizCategoryList-------------', quizCategoryList);

    //   let foundSources: any[] = [];
    //   let foundQuestionType = '';
    //   let foundDifficulty = '';

    //   // 값이 존재하면 상태값을 업데이트
    //   quizCategoryList.forEach((item) => {
    //     const quizCategory = item?.quizCategory;

    //     console.log(
    //       '값이 존재하면 상태값을 업데이트quizCategory -------',
    //       quizCategory,
    //     );

    //     if (quizCategory) {
    //       if (quizCategory.sources && Array.isArray(quizCategory.sources)) {
    //         foundSources = [...foundSources, ...quizCategory.sources];
    //       }
    //       if (quizCategory.문항타입 && !foundQuestionType) {
    //         foundQuestionType = quizCategory.문항타입;
    //       }
    //       if (quizCategory.난이도 && !foundDifficulty) {
    //         foundDifficulty = quizCategory.난이도;
    //       }
    //     }
    //   });

    //   console.log(
    //     '값이 존재하면 상태값을 업데이트 최종 -------',
    //     foundQuestionType,
    //     foundDifficulty,
    //     foundSources,
    //   );

    //   setSelectedQuestionType(foundQuestionType);
    //   setSelectedDifficulty(foundDifficulty);
    //   setSelectedSource(foundSources);

    //   // 데이터 바뀔시 실행
    // }

    if (onItemClickData) {
      const quizCategory = onItemClickData?.quizCategoryList[0]?.quizCategory;

      console.log('quizCategory-------------', quizCategory);

      // 값이 존재하면 상태값을 업데이트
      if (quizCategory) {
        setSelectedQuestionType(quizCategory?.문항타입 || '');
        setSelectedDifficulty(quizCategory?.난이도 || '');
        setSelectedDifficultyCommon(quizCategory?.난이도공통 || '');
        setSelectedSource(quizCategory?.sources || []);
      }
    }
  }, [onItemClickData]);

  useEffect(() => {
    if (!isMathJaxLoaded) {
      // console.log('===============mathjax=============');
      loadMathJax(setMathJaxLoaded);
    }
  }, [isMathJaxLoaded]);

  // 전역에서 가져온 체크된 리스트값을 수정용 문항리스트로 다시 셋팅
  // TODO : 그룹값과 함께 대발문 지문도 문제랑 함께 들어오는지 확인
  const getQuiz = async () => {
    const idxArray = parsedStoredQuizList.map((list) => list.idx);
    const idxList = idxArray.join(',');
    const res = await quizService.get(`/v1/quiz/${idxList}`);
    return res.data.data.quizList;
  };
  const { data: quizData, refetch: quizDataRefetch } = useQuery({
    queryKey: ['get-idx-quizList'],
    queryFn: getQuiz,
    meta: {
      errorMessage: 'get-idx-quizList 에러 메세지',
    },
    enabled: parsedStoredQuizList.length > 0,
  });

  useEffect(() => {
    if (parsedStoredQuizList.length > 0) quizDataRefetch();
  }, [parsedStoredQuizList]);

  useEffect(() => {
    if (quizData) {
      setQuizList(quizData);
      setDataFetched(true);
    }
  }, [quizData, setQuizList]);

  // 에디터에서 데이터 가져올시
  useEffect(() => {
    if (editorData) {
      // console.log(editorData, 'editorData--------');
      const itemDataList: QuizItemListType = [];
      let sort = 1;

      Object.keys(editorData).forEach((key) => {
        const value = editorData[key];
        // console.log('value----', value);
        if (Array.isArray(value) && value.length > 0) {
          let type = key.replace('tag_', '').replace('tl_', '').toUpperCase();

          switch (type) {
            case 'EXAM':
              type = 'QUESTION';
              break;
            case 'BIGCONTENT':
              type = 'BIG';
              break;
            case 'CONTENT':
              type = 'TEXT';
              break;
            case 'EXAM_SM':
              type = 'SMALL';
              break;
            default:
              break;
          }

          value.forEach((content) => {
            itemDataList.push({
              code: null,
              type: type,
              content: content,
              sort: sort++,
            });
          });
        }
      });

      setQuizItemList(itemDataList);
    }
  }, [editorData]);

  useEffect(() => {
    // console.log('quizItemList', quizItemList);
    //문항 리스트에 추가
    if (quizItemList.length > 0) {
      setQuizItemArrList((prevArrList) => [...prevArrList, quizItemList]);
    }
  }, [quizItemList]);

  useEffect(() => {
    // console.log('quizItemArrList', quizItemArrList);
    // console.log('quizIdx', quizIdx);

    // 등록될 값
    const newQuestionList = quizItemArrList.map((quizItems, idx) => ({
      commandCode: 1,
      quizIdx: quizIdx[idx] as number, //문항 idx
      articleList: [
        //에디터 이미지 값
      ],
      quizItemList: quizItems,
      quizClassList: quizClassList,
    }));
    setAddQuestionList(newQuestionList);
  }, [quizItemArrList]);

  useEffect(() => {
    console.log('selectedQuestionType 문항타입', selectedQuestionType);
    console.log('selectedDifficulty 난이도', selectedDifficulty);
    //출처
    console.log('selectedSource 출처', selectedSource);
    //카테고리 값
    console.log('onItemClickData카테고리', onItemClickData?.quizCategoryList);

    // 특정 필드를 제외하는 유틸리티 함수
    const omitFields = (quizCategory: QuizCategory): QuizCategory => {
      const { sources, 난이도, 문항타입, ...rest } = quizCategory;
      return rest; // 나머지 필드만 반환
    };

    // 카테고리 값을 매핑하는 함수
    const mapQuizCategoryList = (
      quizCategoryList: QuizCategoryList[] | undefined,
    ): { type: string; quizCategory: QuizCategory }[] => {
      if (quizCategoryList && Array.isArray(quizCategoryList)) {
        return quizCategoryList
          .map((item) => {
            if (item.quizCategory && typeof item.quizCategory === 'object') {
              const newQuizCategory = omitFields(item.quizCategory);
              // Return the item only if it has valid keys
              if (Object.keys(newQuizCategory).length > 0) {
                return {
                  type: 'CATEGORY',
                  quizCategory: newQuizCategory,
                };
              }
            }
            // Instead of returning null, return undefined
            return undefined; // This will be filtered out
          })
          .filter(
            (item): item is { type: string; quizCategory: QuizCategory } =>
              item !== undefined,
          ); // Filter out undefined entries
      }
      return []; // Return an empty array if input is not valid
    };

    // 카테고리 매핑
    const category = mapQuizCategoryList(onItemClickData?.quizCategoryList);
    // console.log('매핑된 카테고리값 ----', category);

    const quizClassList: QuestionClassListType = [
      {
        type: 'CLASS',
        quizCategory: {
          sources: selectedSource,
          난이도: selectedDifficulty,
          문항타입: selectedQuestionType,
          난이도공통: selectedDifficultyCommon,
        },
      },
      ...category.filter(
        (cat) => cat.quizCategory && Object.keys(cat.quizCategory).length > 0,
      ), // 추가된 카테고리도 유효한 경우에만 추가
    ];

    // 빈 객체 또는 빈 배열이 아닌 경우에만 quizClassList에 추가
    const filteredQuizClassList = quizClassList.filter((item) => {
      // item이 null이 아닌 경우, 객체가 비어있지 않거나 배열이 비어있지 않은 경우
      if (item) {
        // Type assertion to inform TypeScript of the expected types
        if (typeof item === 'object') {
          return Object.keys(item).length > 0; // Check if the object is not empty
        }
        // if (Array.isArray(item)) {
        //   return item.length > 0; // Check if the array is not empty
        // }
      }
      return false; // Return false for any other cases
    });

    console.log('최종적으로 담길 quizClassList ----', filteredQuizClassList);
    // 필수 메타값 추가 및 변경
    setQuizClassList(filteredQuizClassList);
  }, [
    selectedQuestionType,
    selectedSource,
    selectedDifficulty,
    onItemClickData,
    selectedList,
  ]);

  useEffect(() => {
    if (addQuestionList.length) postQuizDataMutate();
  }, [addQuestionList]);

  // 문항 등록 후 메타데이터 수정 되게
  const postQuiz = async () => {
    const data = addQuestionList[addQuestionList.length - 1];

    return await quizService.post(`/v1/quiz`, data);
  };

  const { data: postQuizData, mutate: postQuizDataMutate } = useMutation({
    mutationFn: postQuiz,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
    },
    onSuccess: (response) => {
      openToastifyAlert({
        type: 'success',
        text: `문항이 수정 되었습니다 ${response.data.data.quiz.idx}`,
      });
      // 추가된 문항의 idx값을 배열에 넣기 전체리스트에서 idx값으로 찾아온뒤 필수 메타값넣고 등록

      // 초기화
      queryClient.invalidateQueries({
        queryKey: ['get-quizList'],
        exact: true,
      });
    },
  });

  // 메뉴 목록 조회 api (셋팅값)
  const getMenuSetting = async () => {
    const res = await resourceServiceInstance.get(
      `/v1/menu/path?url=contentDtEditingSetting`,
    );
    console.log('getMenuSetting--------', res);
    return res.data.data;
  };
  const {
    data: menuSettingData,
    isLoading: isMenuSettingLoading,
    refetch: menuSettingRefetch,
  } = useQuery({
    queryKey: ['get-menuSetting'],
    queryFn: getMenuSetting,
    meta: {
      errorMessage: 'get-menuSetting 에러 메세지',
    },
  });

  // 셋팅 데이터 바뀔때 선택 구성요소값
  useEffect(() => {
    if (menuSettingData) {
      //   idxs : 해당 키값으로 2뎁스 셀렉트 조회
      console.log(
        '메뉴 셋팅값 ------ ',
        menuSettingData.menuDetailList.length,
        menuSettingData,
      );

      // 셋팅값 없을시 얼럿
      if (menuSettingData.menuDetailList.length == 0) {
        // openToastifyAlert({
        //   type: 'error',
        //   text: '셋팅에서 우선 셀렉트값을 선택해주세요',
        // });
        alert('셋팅에서 우선 셀렉트값을 선택해주세요!');
        window.close();
        return;
      }

      // 첫번째 출처 값
      const filteredCategoriesH: any[] = [];
      // 두번째 추가정보
      const filteredCategoriesDD: any[] = [];

      // idx 와 names를 인덱스 순번에 맞게 짝지어 배치
      menuSettingData?.menuDetailList.forEach(
        (
          menuDetail: {
            [x: string]: any;
            idxList: string;
            nameList: string;
            inputList: string;
            searchList: string;
            viewList: string;
          },
          index: any,
        ) => {
          const idxList = menuDetail?.idxList?.split(',');
          const nameList = menuDetail?.nameList?.split(',');
          const inputList = menuDetail?.inputList?.split(',');
          const searchList = menuDetail?.searchList?.split(',');
          const viewList = menuDetail?.viewList?.split(',');

          // idx와 name을 짝지어 배열로 저장
          const pairs = idxList.map((idx, index) => ({
            idx,
            name: nameList[index],
            inputType: inputList[index],
            searchList: searchList[index] === 'true',
            viewList: viewList[index] === 'true',
          }));

          if (menuDetail.groupCode == 'H') {
            setIdxNamePairsH((prev) => [...prev, ...pairs]);
          }

          if (menuDetail.groupCode == 'H') {
            const categories = idxList.map((idx, idxIndex) => ({
              idx,
              name: nameList[idxIndex],
              code: nameList[idxIndex],
              inputType: inputList[idxIndex] === 'true',
              searchList: searchList[idxIndex] === 'true',
              viewList: viewList[idxIndex] === 'true',
            }));
            filteredCategoriesH.push(categories);
          } else if (menuDetail.groupCode == 'DD') {
            const categories = idxList.map((idx, idxIndex) => ({
              idx,
              name: nameList[idxIndex],
              code: nameList[idxIndex],
              inputType: inputList[idxIndex] === 'true',
              searchList: searchList[idxIndex] === 'true',
              // viewList: viewList[idxIndex] === 'true',
            }));
            filteredCategoriesDD.push(categories);
          }
        },
      );

      const idxListH = filteredCategoriesH
        .flat()
        // .filter((category) => category.inputType === 'SELECT')
        .map((category) => category.idx)
        .join(',');
      const idxListDD = filteredCategoriesDD
        .flat()
        // .filter((category) => category.inputType === 'SELECT')
        .map((category) => category.idx)
        .join(',');

      console.log('inputType 이 셀렉트인것만', idxListH, '/', idxListDD);
    }
  }, [menuSettingData]);

  // 카테고리의 그룹 아이템 조회
  const fetchCategoryItems = async (
    typeList: string,
    setCategory: React.Dispatch<React.SetStateAction<ItemCategoryType[][]>>,
  ) => {
    const typeIds = typeList.split(',');
    try {
      const requests = typeIds.map((id) =>
        classificationInstance.get(`/v1/category/class/${id}`),
      );
      const responses = await Promise.all(requests);
      const itemsList = responses.map(
        (res) => res?.data?.data?.categoryClassList,
      );
      setCategory(itemsList);
    } catch (error: any) {
      if (error.response.data?.code == 'GE-002') postRefreshToken();
    }
  };

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);
  };

  // 셀렉트 초기화
  const handleDefaultSelect = (defaultValue?: string) => {
    switch (defaultValue) {
      case '문항 타입':
        setSelectedQuestionType('');
        break;
      case '난이도':
        setSelectedDifficulty('');
        break;
      case '공통(시험)':
        setSelectedDifficulty('');
        break;
      default:
        break;
    }
  };

  const submitSave = () => {
    // console.log('등록하려는 신규 문항에 대한 데이터 post 요청');
    // console.log('신규 등록된 문항 리스트 get 요청 API');

    // 등록 api
    // console.log('selectedSubject 교과', selectedSubject);
    // console.log('selectedCourse 과목', selectedCourse);
    console.log('selectedQuestionType 문항타입', selectedQuestionType);
    console.log('selectedDifficulty 난이도', selectedDifficulty);
    //출처
    console.log('selectedSource 난이도', selectedSource);
    saveHandler();
  };
  const saveHandler = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const data = await window.saveExamData();
    console.log('에디터 데이터 ----------------', data);
    setEditorData(JSON.parse(data));
  };

  // useEffect(() => {
  //   if (postQuizData) {
  //     setQuestionList([...questionList, postQuizData.data.data.quiz]);
  //   }
  // }, [postQuizData]);
  // useEffect(() => {
  //   setQuizList([...questionList]);
  // }, [questionList]);

  useEffect(() => {
    console.log('quizList', quizList);
  }, [quizList]);

  useEffect(() => {
    if (data) {
      const combinedContent = data.map((item) => item.content).join(' ');

      console.log('onItemClickData 선택된 아이템------------', combinedContent);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.usePostJsonData(combinedContent);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.iTeXEQ.latexrecovery();
    }
  }, [data]);

  // useEffect(() => {
  //   if (onItemClickData && onItemClickData.quizItemList) {
  //     setData(onItemClickData.quizItemList);
  //     // 선택 데이터 바뀔시 초기화
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-expect-error
  //     window.tinymce.activeEditor.setContent('');
  //   }
  // }, [onItemClickData]);

  // useEffect(() => {
  //   if (data) {
  // const combinedContent = data.map((item) => item.content).join(' ');
  // console.log('onItemClickData 선택된 아이템------------', combinedContent);
  // if (data && data.quizItemList) {
  //   const temp = data.quizItemList[0].content;
  //   console.log('선택된 요소 퀴즈 데이터 temp----------------', temp);
  // const parser = new DOMParser();
  // const dom = parser.parseFromString(combinedContent, 'text/html');
  // const nodes = dom.querySelectorAll('.itexmath');
  // nodes.forEach((node) => {
  //   const latex = node.getAttribute('data-latex');
  //   while (node.firstChild) {
  //     node.removeChild(node.firstChild);
  //   }
  //   if (latex) {
  //     node.textContent = latex;
  //   }
  // });
  // console.log('test: ', dom.body.innerHTML);
  // const content_0 = dom.body.innerHTML;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // const editor = tinymce.get('tinyeditor');
  // if (editor) {
  //   console.log('check!!!!!!');
  //   editor.setContent(content_0);
  // } else {
  //   console.log('data read failed');
  // }
  // }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // window.usePostJsonData(combinedContent);
  //   }
  // }, [data]);

  useEffect(() => {
    if (onItemClickData && onItemClickData.quizItemList) {
      setData(onItemClickData.quizItemList);
      // 선택 데이터 바뀔시 초기화
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.tinymce.activeEditor.setContent('');
    }

    // 선택된 문항의 idx 값 가져오기
    const idx = onItemClickData?.idx as number | undefined;

    // idx 값이 존재하고 중복되지 않았을 경우에만 추가
    if (idx !== undefined && !quizIdx.includes(idx)) {
      setQuizIdx((prevQuizIdx) => [...prevQuizIdx, idx]);
    }
  }, [onItemClickData]);

  const quizCategory = useMemo(() => {
    console.log('onItemClickData 클릭된 아이템 ----', onItemClickData);
    if (onItemClickData) {
      const category = onItemClickData.quizCategoryList[0].quizCategory;
      return {
        문항타입: category?.문항타입 || '',
        난이도: category?.난이도 || '',
        난이도공통: category?.난이도공통 || '',
        sources: category.sources || [],
      };
    }
    return {
      문항타입: '',
      난이도: '',
      sources: [],
    };
  }, [onItemClickData]);

  // 문항 추가버튼 disable 처리
  const addButtonBool = useMemo(() => {
    if (
      // selectedSubject !== '' &&
      // selectedCourse !== '' &&
      selectedQuestionType !== ''
    ) {
      return false;
    } else {
      return true;
    }
  }, [selectedQuestionType]);

  return (
    <Container>
      <ContentsWrapper>
        <EditContainerWrapper>
          <PerfectScrollbar>
            <EditWrapper>
              <EditerOneFile
                type={type}
                setEditorData={setEditorData}
                saveHandler={saveHandler}
                onItemClickData={onItemClickData}
              />
            </EditWrapper>

            {quizCategory && (
              <>
                <BackgroundWrapper>
                  <SelectListWrapper>
                    <strong className="top_title">
                      출처<span>*</span>
                      <span className="info">(최대 5개)</span>
                    </strong>
                    <SourceOptionWrapper>
                      {/* 옵션 리스트 셀렉트 컴포넌트 */}
                      {idxNamePairsH && idxNamePairsF && idxNamePairsG && (
                        <OptionList
                          quizCategory={quizCategory.sources}
                          setSelectedSource={setSelectedSource}
                          categoriesE={[
                            {
                              code: '교재',
                              idx: 1,
                              name: '교재',
                            },
                            {
                              code: '내신',
                              idx: 2,
                              name: '내신',
                            },
                            {
                              code: '기출',
                              idx: 3,
                              name: '기출',
                            },
                            {
                              code: '자체제작',
                              idx: 4,
                              name: '자체제작',
                            },
                            {
                              code: '기타',
                              idx: 5,
                              name: '기타',
                            },
                          ]}
                          groupsDataF={idxNamePairsF}
                          groupsDataG={idxNamePairsG}
                          groupsDataH={idxNamePairsH}
                          selectedValue={setSelectedList}
                          onItemClickData={onItemClickData}
                        />
                      )}
                    </SourceOptionWrapper>
                  </SelectListWrapper>
                </BackgroundWrapper>
                <BackgroundWrapper className="bottom">
                  <SelectListWrapper>
                    <strong className="top_title">추가정보</strong>
                  </SelectListWrapper>
                  <SelectListWrapper>
                    <SelectList>
                      <li>
                        <SelectWrapper>
                          <strong className="title">문항타입</strong>
                          <Select
                            onDefaultSelect={() =>
                              handleDefaultSelect('문항 타입')
                            }
                            width={'120px'}
                            defaultValue={quizCategory?.문항타입 || '문항타입'}
                            key={'문항 타입'}
                            options={[
                              {
                                code: '객관식',
                                idx: 1,
                                name: '객관식',
                              },
                              {
                                code: '주관식',
                                idx: 2,
                                name: '주관식',
                              },
                              {
                                code: '서술형',
                                idx: 3,
                                name: '서술형',
                              },
                            ]}
                            onSelect={(event) => selectCategoryOption(event)}
                            setSelectedValue={setSelectedQuestionType}
                            $positionTop
                            height="35px"
                          />
                        </SelectWrapper>
                      </li>
                      <li>
                        <SelectWrapper>
                          <strong className="title">난이도</strong>
                          <Select
                            onDefaultSelect={() =>
                              handleDefaultSelect('공통(시험)')
                            }
                            width={'120px'}
                            defaultValue={
                              quizCategory?.난이도공통 || '공통(시험)'
                            }
                            key={'공통(시험)'}
                            options={[
                              {
                                code: '개념',
                                idx: 1,
                                name: '개념',
                              },
                              {
                                code: '기본',
                                idx: 2,
                                name: '기본',
                              },
                              {
                                code: '심화',
                                idx: 3,
                                name: '심화',
                              },
                              {
                                code: '없음',
                                idx: 4,
                                name: '없음',
                              },
                            ]}
                            onSelect={(event) => selectCategoryOption(event)}
                            setSelectedValue={setSelectedDifficultyCommon}
                            $positionTop
                            height="35px"
                          />
                          <Select
                            onDefaultSelect={() =>
                              handleDefaultSelect('난이도')
                            }
                            width={'120px'}
                            defaultValue={quizCategory?.난이도 || '난이도'}
                            key={'난이도'}
                            options={[
                              {
                                code: '상',
                                idx: 1,
                                name: '상',
                              },
                              {
                                code: '중상',
                                idx: 2,
                                name: '중상',
                              },
                              {
                                code: '중',
                                idx: 3,
                                name: '중',
                              },
                              {
                                code: '중하',
                                idx: 4,
                                name: '중하',
                              },
                              {
                                code: '하',
                                idx: 5,
                                name: '하',
                              },
                            ]}
                            onSelect={(event) => selectCategoryOption(event)}
                            setSelectedValue={setSelectedDifficulty}
                            $positionTop
                            height="35px"
                          />
                        </SelectWrapper>
                      </li>
                    </SelectList>
                  </SelectListWrapper>
                </BackgroundWrapper>
              </>
            )}
          </PerfectScrollbar>
        </EditContainerWrapper>

        <ContentListWrapper>
          <ContentList>
            {dataFetched && (
              <QuizList
                questionList={quizList}
                $height={`calc(100vh - 200px)`}
                showViewAllButton
                onItemClick={setOnItemClickData}
                setCheckedList={setCheckedList}
              />
            )}
            {!dataFetched && <Loader />}
          </ContentList>
        </ContentListWrapper>

        <Modal />
      </ContentsWrapper>
      <BorderWrapper>
        <SubmitButtonWrapper>
          <Button
            buttonType="button"
            // disabled={addButtonBool}
            onClick={submitSave}
            width={'calc(50% - 5px)'}
            $margin={'0 10px 0 0'}
            $filled
            cursor
          >
            <span>수정</span>
          </Button>
          <Button
            buttonType="button"
            onClick={() => setTabView('문항 분류')}
            width={'calc(50% - 5px)'}
            cursor
          >
            <span>추가 정보 등록</span>
          </Button>
        </SubmitButtonWrapper>
      </BorderWrapper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const ContentsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  height: calc(100vh - 200px);
  position: relative;
`;

const EditContainerWrapper = styled.div`
  flex: 1 0 0;
  margin-bottom: 300px;
`;

const EditWrapper = styled.div`
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
  width: 100%;

  /* .type4_container {
    height: 50vh;
  } */
`;
const BackgroundWrapper = styled.div`
  background-color: ${COLOR.BUTTON_LIGHT_NORMAL};
  margin-bottom: 10px;

  &.bottom {
    margin-bottom: 70px;
  }
`;
const SelectListWrapper = styled.div`
  display: flex;
  /* align-items: center; */
  padding: 0 15px;

  strong {
    min-width: 40px;
    padding-top: 10px;
    /* line-height: 1.2; */
    font-size: 15px;
    padding-right: 10px;
    position: relative;
    > span {
      position: absolute;
      top: 10px;
      right: 0px;
      color: ${COLOR.RED};
      font-size: 14px;
    }
  }

  &:last-child {
    padding-bottom: 20px;

    .top_title {
      flex: 1 0 0;
    }
    .info {
      width: 100%;
      display: flex;
      position: static;
      color: ${COLOR.GRAY};
      font-size: 12px;
      letter-spacing: -1px;
    }
  }
  &:nth-child(1) {
    padding-top: 20px;
  }
`;

const SourceOptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 70px);
`;
const SelectList = styled.ul`
  /* padding: 5px 10px; */
  display: flex;
  width: 100%;

  li {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
`;
const SelectWrapper = styled.div`
  display: flex;
  flex: 1 0 0;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;

  .title {
    padding: 10px;
    font-weight: normal;
  }
`;

const ContentListWrapper = styled.div`
  width: 340px;
  padding-left: 10px;
  /* border-bottom: 1px solid ${COLOR.BORDER_BLUE}; */

  position: absolute;
  right: 0;
`;
const ContentList = styled.div`
  height: calc(100vh - 145px);
  width: 100%;
  overflow: hidden;
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
  border-bottom: none;
  background-color: ${COLOR.LIGHT_GRAY};
`;

const BorderWrapper = styled.div`
  border-top: 1px solid ${COLOR.BORDER_BLUE};
  position: fixed;
  bottom: 0px;
  right: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: #fff;
`;
const SubmitButtonWrapper = styled.div`
  position: absolute;
  right: 30px;
  left: auto;
  top: 10px;
  bottom: 0px;
  display: flex;
  flex-direction: row;
  width: 50%;
`;
