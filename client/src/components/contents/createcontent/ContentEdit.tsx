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
  Source,
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

  // 출처 셋팅
  const [idxNamePairsMATERIALS, setIdxNamePairsMATERIALS] = useState<
    IdxNamePair[]
  >([]);
  const [idxNamePairsEXAMS, setIdxNamePairsEXAMS] = useState<IdxNamePair[]>([]);
  const [idxNamePairsINTERNAL, setIdxNamePairsINTERNAL] = useState<
    IdxNamePair[]
  >([]);
  const [idxNamePairsETC, setIdxNamePairsETC] = useState<IdxNamePair[]>([]);
  const [idxNamePairsSELFPRODUCED, setIdxNamePairsSELFPRODUCED] = useState<
    IdxNamePair[]
  >([]);
  const [idxNamePairsMOREINFO, setIdxNamePairsMOREINFO] = useState<
    IdxNamePair[]
  >([]);

  const [content, setContent] = useState<string[]>([]);
  const [dataFetched, setDataFetched] = useState(false);

  const [editorData, setEditorData] = useState<EditorDataType | null>(null);
  const [isEditor, setIsEditor] = useState<boolean>(false);
  const [quizItemList, setQuizItemList] = useState<QuizItemListType>([]);

  const [categories, setCategories] = useState({});

  // 선택된 리스트 아이템 데이터
  const [onItemClickData, setOnItemClickData] = useState<QuizListType>();
  const [quizIdx, setQuizIdx] = useState<number[]>([]);

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

  // 수정시 체크리스트 값 가져오기
  useEffect(() => {
    const storedQuizList = window.localStorage.getItem('quizList');

    if (storedQuizList) {
      const parsedList = JSON.parse(storedQuizList);
      console.log(
        '전역에서 로컬 스토리지에서 가져온 체크된 리스트값---',
        parsedList,
      );

      setParsedStoredQuizList(parsedList);

      // 로컬스토리지 값이 정상적으로 읽힌 후 값이 state에 들어간 뒤 초기화
      setTimeout(() => {
        window.opener.localStorage.clear();
      }, 100);
    }
  }, []);

  // 메뉴 목록 조회 api (셋팅값)
  const getMenuSetting = async () => {
    const res = await resourceServiceInstance.get(
      `/v1/menu/path?url=contentDtEditingSetting`,
    );
    // console.log('getMenuSetting--------', res);
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
      // 교재
      // const filteredCategoriesF: any[] = [];
      // //내신
      // const filteredCategoriesG: any[] = [];
      // //기출
      // const filteredCategoriesH: any[] = [];
      // // 두번째 추가정보
      // const filteredCategoriesDD: any[] = [];

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

          if (menuDetail.groupCode == 'MATERIALS') {
            setIdxNamePairsMATERIALS((prev) => {
              const uniquePairs = pairs.filter(
                (pair) => !prev.some((prevPair) => prevPair.idx === pair.idx),
              );
              return [...prev, ...uniquePairs];
            });
          }
          if (menuDetail.groupCode == 'EXAMS') {
            setIdxNamePairsEXAMS((prev) => {
              const uniquePairs = pairs.filter(
                (pair) => !prev.some((prevPair) => prevPair.idx === pair.idx),
              );
              return [...prev, ...uniquePairs];
            });
          }
          if (menuDetail.groupCode == 'ETC') {
            setIdxNamePairsETC((prev) => {
              const uniquePairs = pairs.filter(
                (pair) => !prev.some((prevPair) => prevPair.idx === pair.idx),
              );
              return [...prev, ...uniquePairs];
            });
          }
          if (menuDetail.groupCode == 'SELFPRODUCED') {
            setIdxNamePairsSELFPRODUCED((prev) => {
              const uniquePairs = pairs.filter(
                (pair) => !prev.some((prevPair) => prevPair.idx === pair.idx),
              );
              return [...prev, ...uniquePairs];
            });
          }
          if (menuDetail.groupCode == 'INTERNAL') {
            setIdxNamePairsINTERNAL((prev) => {
              const uniquePairs = pairs.filter(
                (pair) => !prev.some((prevPair) => prevPair.idx === pair.idx),
              );
              return [...prev, ...uniquePairs];
            });
          }
          if (menuDetail.groupCode == 'EXAMS') {
            setIdxNamePairsEXAMS((prev) => {
              const uniquePairs = pairs.filter(
                (pair) => !prev.some((prevPair) => prevPair.idx === pair.idx),
              );
              return [...prev, ...uniquePairs];
            });
          }
          if (menuDetail.groupCode == 'MOREINFO') {
            setIdxNamePairsMOREINFO((prev) => {
              const uniquePairs = pairs.filter(
                (pair) => !prev.some((prevPair) => prevPair.idx === pair.idx),
              );
              return [...prev, ...uniquePairs];
            });
          }

          // if (menuDetail.groupCode == 'EXAMS') {
          //   const categories = idxList.map((idx, idxIndex) => ({
          //     idx,
          //     name: nameList[idxIndex],
          //     code: nameList[idxIndex],
          //     inputType: inputList[idxIndex] === 'true',
          //     searchList: searchList[idxIndex] === 'true',
          //     viewList: viewList[idxIndex] === 'true',
          //   }));
          //   filteredCategoriesH.push(categories);
          // } else if (menuDetail.groupCode == 'MATERIALS') {
          //   const categories = idxList.map((idx, idxIndex) => ({
          //     idx,
          //     name: nameList[idxIndex],
          //     code: nameList[idxIndex],
          //     inputType: inputList[idxIndex] === 'true',
          //     searchList: searchList[idxIndex] === 'true',
          //     viewList: viewList[idxIndex] === 'true',
          //   }));
          //   filteredCategoriesF.push(categories);
          // } else if (menuDetail.groupCode == 'INTERNAL') {
          //   const categories = idxList.map((idx, idxIndex) => ({
          //     idx,
          //     name: nameList[idxIndex],
          //     code: nameList[idxIndex],
          //     inputType: inputList[idxIndex] === 'true',
          //     searchList: searchList[idxIndex] === 'true',
          //     viewList: viewList[idxIndex] === 'true',
          //   }));
          //   filteredCategoriesG.push(categories);
          // } else if (menuDetail.groupCode == 'MOREINFO') {
          //   const categories = idxList.map((idx, idxIndex) => ({
          //     idx,
          //     name: nameList[idxIndex],
          //     code: nameList[idxIndex],
          //     inputType: inputList[idxIndex] === 'true',
          //     searchList: searchList[idxIndex] === 'true',
          //     // viewList: viewList[idxIndex] === 'true',
          //   }));
          //   filteredCategoriesDD.push(categories);
          // }
        },
      );
    }
  }, [menuSettingData]);

  // 이전 idx[0] 값을 저장할 ref
  const prevIdxRef = useRef<number | null>(null);

  useEffect(() => {
    console.log('prevIdxRef ------', prevIdxRef);
  }, [prevIdxRef]);

  useEffect(() => {
    if (data) {
      const combinedContent = data.map((item) => item.content).join(' ');
      const idx = data.map((item) => item.idx);

      // 데이터 업데이트
      console.log('onItemClickData 선택된 아이템------------', combinedContent);
      console.log('data선택된 아이템 idx------------', idx[0]);

      // 이전 값과 비교하여 업데이트 조건 확인
      if (prevIdxRef.current !== idx[0]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        window.usePostJsonData(combinedContent);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        window.iTeXEQ.latexrecovery();

        prevIdxRef.current = idx[0];
        console.log('prevIdxRef 업데이트됨:', prevIdxRef.current);
      } else {
        console.log('같은 idx[0] 값이 선택되어 업데이트하지 않음');
      }
    }
  }, [data]);

  useEffect(() => {
    console.log(
      '출처 셀렉트 담긴 값 ----',
      idxNamePairsMATERIALS,
      idxNamePairsEXAMS,
      idxNamePairsINTERNAL,
      idxNamePairsETC,
      idxNamePairsSELFPRODUCED,
      idxNamePairsMOREINFO,
      idxNamePairsETC,
    );
  }, [
    idxNamePairsMATERIALS,
    idxNamePairsEXAMS,
    idxNamePairsINTERNAL,
    idxNamePairsETC,
    idxNamePairsSELFPRODUCED,
    idxNamePairsMOREINFO,
    idxNamePairsETC,
  ]);

  // 리스트 선택시 기존값 셋팅
  useEffect(() => {
    if (onItemClickData) {
      const quizCategories = onItemClickData?.quizCategoryList.map(
        (item) => item?.quizCategory,
      );

      // 기존 카테고리 데이터
      const quizCategoryList = onItemClickData.quizCategoryList;
      const categoriesWithoutSources = quizCategoryList.filter(
        (item) => !item.quizCategory?.sources,
      );

      // 클래스 타입이 아닌 추가 등록 카테고리
      console.log(
        '리스트 선택 시 기존값 셋팅--- categoriesWithoutSources------------',
        categoriesWithoutSources,
        categoriesWithoutSources[0]?.quizCategory,
      );
      setCategories(categoriesWithoutSources[0]?.quizCategory);
      console.log('리스트 선택 시 기존값 셋팅-------------', quizCategories);

      if (quizCategories) {
        // '문항타입' 설정
        const questionType = quizCategories.find(
          (category) => category?.문항타입,
        )?.문항타입;
        setSelectedQuestionType((questionType as string) || '');

        // '난이도' 설정
        const difficulty = quizCategories.find(
          (category) => category?.난이도,
        )?.난이도;
        setSelectedDifficulty((difficulty as string) || '');

        // '난이도공통' 설정
        const difficultyCommon = quizCategories.find(
          (category) => category?.난이도공통,
        )?.난이도공통;
        setSelectedDifficultyCommon((difficultyCommon as string) || '');

        // 'sources' 설정
        const sources = quizCategories.find(
          (category) => category?.sources,
        )?.sources;
        setSelectedSource((sources as Source[]) || []);
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

      // 에디터 값이 리스트에 담김
      console.log('itemDataList 각 데이터를 배열에 담음', itemDataList);
      setQuizItemList(itemDataList);
    }
  }, [editorData]);

  // 문항 등록 후 메타데이터 수정 되게
  const postQuiz = async () => {
    console.log(
      '보내질 값 ----',
      selectedSource,
      selectedDifficulty,
      categories,
    );
    if (selectedSource.length > 0) {
      const quizClassList = {
        sources: selectedSource,
        ...(selectedDifficulty && { 난이도: selectedDifficulty }),
        ...(selectedQuestionType && { 문항타입: selectedQuestionType }),
        ...(selectedDifficultyCommon && {
          난이도공통: selectedDifficultyCommon,
        }),
      };

      const quizCategory = categories
        ? {
            type: 'CATEGORY',
            quizCategory: categories,
          }
        : undefined;
      const data = {
        commandCode: 0,
        quizIdx: null,
        articleList: [],
        quizItemList: quizItemList,
        quizClassList: [
          {
            type: 'CLASS',
            quizCategory: quizClassList,
          },
          quizCategory,
        ],
      };
      console.log('최종 적으로 수정될 문항 data값', data);
      const res = await quizService.post(`/v2/quiz`, data);
      console.log('res문항 data값', res.data.data.quizList);
      setQuizList([...quizList, ...res.data.data.quizList]);
      // setQuestionList([...quizList, ...res.data.data.quizList]);

      return res.data.data.quizList;
    }
  };

  const {
    data: postQuizData,
    mutate: postQuizDataMutate,
    isPending,
  } = useMutation({
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
        text: `문항이 수정 되었습니다 ${response[0]?.idx}`,
      });
      // 추가된 문항의 idx값을 배열에 넣기 전체리스트에서 idx값으로 찾아온뒤 필수 메타값넣고 등록

      // 초기화
      queryClient.invalidateQueries({
        queryKey: ['get-quizList'],
        exact: true,
      });
    },
  });
  // 분류 등록
  useEffect(() => {
    console.log(',selectedSourceList 전체 출처 리스트 ', selectedSource);
  }, [selectedSource]);
  useEffect(() => {
    console.log(',selectedDifficulty 난이도 ', selectedDifficulty);
  }, [selectedDifficulty]);
  useEffect(() => {
    console.log(
      ',selectedDifficultyCommon 난이도공통 ',
      selectedDifficultyCommon,
    );
  }, [selectedDifficultyCommon]);
  useEffect(() => {
    console.log(',selectedQuestionType 문항타입 ', selectedQuestionType);
  }, [selectedQuestionType]);

  const submitSave = () => {
    setIsEditor(true);
    // 버튼 누를 시 에디터 값 축출
    saveHandler();
  };
  // 등록 버튼 입력시 에디터에서 문항값 축출 등록
  useEffect(() => {
    console.log('quizItemList 에디터에서 나온 문항 요소 --', quizItemList);
    // 등록 호출
    if (isEditor && !isPending) postQuizDataMutate();
  }, [quizItemList]);

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);
  };

  // 셀렉트 초기화
  const handleDefaultSelect = (defaultValue?: string) => {
    //TODO : 고정값이 아닌 셋팅값으로
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

  const saveHandler = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const data = await window.saveExamData();
    console.log('에디터 데이터 ----------------', data);
    setEditorData(JSON.parse(data));
  };

  useEffect(() => {
    console.log('quizList', quizList);
  }, [quizList]);

  useEffect(() => {
    if (onItemClickData && onItemClickData.quizItemList) {
      setData(onItemClickData.quizItemList);
      // 선택 데이터 바뀔시 초기화
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.tinymce.activeEditor.setContent('');
    }
  }, [onItemClickData]);

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
      // `sources` 출처가 포함된 quizCategoryList항목 찾기
      const category = onItemClickData.quizCategoryList.find(
        (item) => item.quizCategory?.sources,
      )?.quizCategory;

      // console.log('category?.sources 출처 --------', category?.sources);

      //TODO: 고정값이 아닌 셋팅 값으로
      return {
        문항타입: category?.문항타입 || '',
        난이도: category?.난이도 || '',
        난이도공통: category?.난이도공통 || '',
        sources: category?.sources || [],
      };
    }
    return {
      문항타입: '',
      난이도: '',
      난이도공통: '',
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
                      {idxNamePairsMATERIALS &&
                        idxNamePairsEXAMS &&
                        idxNamePairsINTERNAL &&
                        idxNamePairsETC &&
                        idxNamePairsSELFPRODUCED &&
                        idxNamePairsMOREINFO &&
                        idxNamePairsETC && (
                          <>
                            {quizCategory.sources.length > 0 ? (
                              <OptionList
                                quizCategory={quizCategory.sources}
                                setSelectedSource={setSelectedSource}
                                selectedValue={setSelectedList}
                                onItemClickData={onItemClickData}
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
                                groupsDataMATERIALS={idxNamePairsMATERIALS}
                                groupsDataINTERNAL={idxNamePairsINTERNAL}
                                groupsDataEXAMS={idxNamePairsEXAMS}
                                groupsDataETC={idxNamePairsETC}
                                groupsDataSELFPRODUCED={
                                  idxNamePairsSELFPRODUCED
                                }
                              />
                            ) : (
                              <OptionList
                                setSelectedSource={setSelectedSource}
                                selectedValue={setSelectedList}
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
                                groupsDataMATERIALS={idxNamePairsMATERIALS}
                                groupsDataINTERNAL={idxNamePairsINTERNAL}
                                groupsDataEXAMS={idxNamePairsEXAMS}
                                groupsDataETC={idxNamePairsETC}
                                groupsDataSELFPRODUCED={
                                  idxNamePairsSELFPRODUCED
                                }
                              />
                            )}
                          </>
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
                            defaultValue={
                              (quizCategory?.문항타입 as string) || '문항타입'
                            }
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
                              (quizCategory?.난이도공통 as string) ||
                              '공통(시험)'
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
                            defaultValue={
                              (quizCategory?.난이도 as string) || '난이도'
                            }
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
