import * as React from 'react';
import { useState, useRef, useEffect, useMemo } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import _shuffle from 'lodash/shuffle';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  IoMdClose,
  IoMdArrowDropdown,
  IoMdArrowDropup,
  IoIosArrowBack,
} from 'react-icons/io';
import { IoMenuOutline } from 'react-icons/io5';
import {
  PiArrowClockwiseBold,
  PiArrowCounterClockwiseBold,
} from 'react-icons/pi';
import { RiListSettingsLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  Button,
  TabMenu,
  Label,
  BarChart,
  MathviewerAccordion,
  MathviewerAccordionStep2,
  Select,
  CheckBox,
  StepDnDWrapper,
  openToastifyAlert,
  Search,
  ButtonFormatRadio,
  Accordion,
  DepthBlock,
  ValueNone,
  Loader,
  Icon,
  IconButton,
  Modal,
  ButtonFormatMultiRadio,
  Input,
  Alert,
} from '../..';
import {
  classificationInstance,
  quizService,
  workbookInstance,
  resourceServiceInstance,
} from '../../../api/axios';
import { useModal } from '../../../hooks';
import { contentQuotient, pageAtom } from '../../../store/utilAtom';
import {
  ItemCategoryType,
  ItemTreeListType,
  ItemTreeType,
} from '../../../types';
import {
  WorkbookData,
  WorkbookQuotientData,
  WorkbookCategoryData,
  FavoriteQuizList,
  QuizList,
  SimilarQuizList,
  ContentWithScore,
  QuizItemList,
  selectedListType,
} from '../../../types/WorkbookType';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { COLOR } from '../../constants';
import { ReportProcessModal } from '../../molecules/contentReport/ReportProcessModal';

interface RadioStateType {
  title: string;
  checkValue: number;
  code: string;
  key: string;
}

interface ItemTreeIdxListType {
  itemTreeIdxList: number[];
}

type UnitClassificationType =
  | RadioStateType
  | ItemTreeIdxListType
  | RadioStateType[];

interface EditWorkbookData {
  isEditWorkbook: number;
  workbookIdx: number;
}

export function Step2() {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const contentRef = useRef<HTMLDivElement>(null);

  const [getLocalData, setGetLocalData] = useState<WorkbookData | null>(null);
  // const [getQuotientLocalData, setGetQuotientLocalData] =
  //   useState<WorkbookQuotientData | null>(null);
  const [getCategoryLocalData, setGetCategoryLocalData] =
    useState<WorkbookCategoryData | null>(null);
  const [getEditData, setGetEditData] = useState<EditWorkbookData | null>(null);
  const [getItemCountData, setGetItemCountData] = useState<number | null>(null);
  const [initialItems, setInitialItems] = useState<QuizList[]>([]);
  const [isEditWorkbook, setIsEditWorkbook] = useState<number>();
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const categoryType = initialItems.map((item) => {
    const category = item.quizCategoryList.find(
      (quizCategoryItem) => quizCategoryItem.quizCategory.문항타입,
    );
    return category ? category.quizCategory.문항타입 : undefined;
  });
  const categoryLevel = initialItems.map((item) => {
    const category = item.quizCategoryList.find(
      (quizCategoryItem) => quizCategoryItem.quizCategory.난이도,
    );
    return category ? category.quizCategory.난이도 : undefined;
  });
  const subjectiveType = categoryType.filter(
    (type) => type === '주관식',
  ).length;
  const multipleType = categoryType.filter((type) => type === '객관식').length;
  const descriptiveType = categoryType.filter(
    (type) => type === '서술형',
  ).length;
  const levelLower = categoryLevel.filter((type) => type === '하').length;
  const levelInterMediate = categoryLevel.filter(
    (type) => type === '중하',
  ).length;
  const levelMedium = categoryLevel.filter((type) => type === '중').length;
  const levelUpper = categoryLevel.filter((type) => type === '상').length;
  const levelBest = categoryLevel.filter((type) => type === '최상').length;

  const [workbookIdx, setWorkbookIdx] = useState<number>();
  const [nameValue, setNameValue] = useState('');
  const [gradeValue, setGradeValue] = useState('');
  const [contentAuthor, setContentAuthor] = useState('');
  const [tag, setTag] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [multiLevel, setMultiLevel] = useState<string>('');
  const [assign, setAssign] = useState<string>('');
  const [isDate, setIsDate] = useState<boolean>(false);
  const [isQuizType, setIsQuizType] = useState<boolean>(false);
  const [itemType, setItemType] = useState<number>();

  const [categoryTypeList, setCategoryTypeList] = useState<string>('');

  const [selectedList, setSelectedList] = useState<selectedListType[]>([]);
  //탭 값
  const [tabView, setTabView] = useState<string>('학습지 요약');
  //페이지 번호
  const [page, setPage] = useRecoilState(pageAtom);
  //드레그 여부부
  const [isStartDnD, setIsStartDnd] = useState(false);
  // 선택한 문항 배열 정렬
  const selectArrange = [
    {
      idx: 0,
      name: '사용자 정렬',
      value: '0',
      options: [
        { idx: 0, name: '객관식 상단배치', value: '0' },
        { idx: 1, name: '무작위 정렬', value: '1' },
      ],
    },
  ];

  const initialValues: { [key: number]: string } = selectArrange.reduce(
    (acc, el) => {
      acc[el.idx] = el.name;
      return acc;
    },
    {} as { [key: number]: string },
  );
  //정렬 기본 값
  const [defaultValues, setDefaultValues] = useState(initialValues);
  // 새 문항 추가
  const [newQuizItems, setNewQuizItems] = useState<SimilarQuizList>();
  // 이전 불러오기에 저장된 새 문항
  const [newQuizPrevItems, setNewQuizPrevItems] = useState<SimilarQuizList[]>(
    [],
  );
  //범위 변경
  const [isRangeSetting, setIsRangeSetting] = useState<boolean>(false);
  //범위 변경한 리스트
  const [unitClassificationList, setUnitClassificationList] = useState<
    UnitClassificationType[][]
  >([]);
  //범위변경 카테고리 리스트
  const [categoryList, setCategoryList] = useState<ItemCategoryType[][]>([
    [{ code: '', idx: 0, name: '' }],
  ]);
  //세분류 트리리스트
  const [itemTree, setItemTree] = useState<ItemTreeListType[]>([]);
  //세분류 리스트 중 선택된 항목
  const [checkedDepthList, setCheckedDepthList] = useState<number[]>([]);
  // 검색 단어 하이라이트 && 하이라이트간 이동 처리
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  //즐겨찾기 문항
  const [favoriteQuestionList, setFavoriteQuestionList] =
    useState<FavoriteQuizList>();
  //즐겨찾기 필터
  const [onFilter, setOnFilter] = useState<boolean>(false);
  //즐겨찾기 필터명
  const [filterValue, setFilterValue] = useState<string>('');
  //내 문항 우선
  const [isPriorityQuiz, setIsPriorityEven] = useState(false);
  // 유사문항
  const [isSimilar, setIsSimilar] = useState(false);
  const [similarItems, setSimilarItems] = useState<SimilarQuizList | null>(
    null,
  );
  const [similarItemCode, setSimilarItemCode] = useState<string>('');
  const [initialItemOrder, setInitialItemOrder] = useState<number | null>(null);
  const [initialItemIdx, setInitialItemIdx] = useState<number>();
  const [similarPrevItems, setSimilarPrevItems] = useState<SimilarQuizList[]>(
    [],
  );
  //즐겨찾기 문항 추가 여부
  const [isAdded, setIsAdded] = useState(false);
  //배점 모달
  const [isEqualScoreModal, setIsEqualScoreModal] = useState<boolean>(false);
  // 문항당 배점
  const [isSaveEqualValue, setIsSaveEqualValue] = useState<boolean>(false);
  //문항수 확인
  const [receivedQuizCount, setReceivedQuizCount] = useState<number | null>(
    null,
  );
  //평균 배점 문항
  const [remainderContent, setRemainderContent] = useState<number>();
  //평균 배점 이상 문항
  const [nextRemainderContent, setNextRemainderContent] = useState<number>();
  //문항당 배점
  const [quotient, setQuotient] = useState<number>(0);
  const [minQuotient, setMinQuotient] = useState<number>();
  const [maxQuotient, setMaxQuotient] = useState<number>();
  const [equalScore, setEqualScore] = useState<number | null>(null);
  //문항의 배점을 다 더한 값
  const [equalTotalValue, setEqualTotalValue] = useState<string>('0');
  //문항의 총합이 되어야 하는 값값
  const [totalEqualScore, setTotalEqualScore] = useState<number>(0);

  //배점 옵션 => MathviewerAccordionStep2로 넘겨줌
  const [quotientOption, setQuotientOption] = useState<
    { code: string; idx: number; name: string; value: number }[]
  >([]);
  //배점 나머지
  const [remainder, setRemainder] = useState<number>();

  // 로컬 스토리지에서 데이터 가져오기
  useEffect(() => {
    const fetchDataFromStorage = () => {
      const data = localStorage.getItem('sendData');
      //const quotientData = localStorage.getItem('sendQuotientData');
      const categoryData = localStorage.getItem('sendCategoryData');
      const editData = localStorage.getItem('sendEditData');
      const itemCount = localStorage.getItem('itemCount');

      if (data) {
        try {
          const parsedData = JSON.parse(data);
          //console.log('sendData:', parsedData); // 디버깅용 콘솔 로그
          setGetLocalData(parsedData);
          setNameValue(parsedData.title);
          setGradeValue(parsedData.grade);
          setContentAuthor(parsedData.examiner);
          setTag(parsedData.tag);
        } catch (error) {
          console.error('로컬 스토리지 sendData 파싱 에러:', error);
        }
      } else {
        console.log('로컬 스토리지에 sendData가 없습니다.');
      }

      // if (quotientData) {
      //   try {
      //     const parsedQuotientData = JSON.parse(quotientData);
      //     // console.log('sendQuotientData:', parsedQuotientData); // 디버깅용 콘솔 로그
      //     setGetQuotientLocalData(parsedQuotientData);
      //   } catch (error) {
      //     console.error('로컬 스토리지 sendQuotientData 파싱 에러:', error);
      //   }
      // } else {
      //   console.log('로컬 스토리지에 sendQuotientData가 없습니다.');
      // }

      if (categoryData) {
        try {
          const parsedCategoryData = JSON.parse(categoryData);
          // console.log('sendCategoryData:', parsedCategoryData); // 디버깅용 콘솔 로그
          setGetCategoryLocalData(parsedCategoryData);
        } catch (error) {
          console.error('로컬 스토리지 sendCategoryData 파싱 에러:', error);
        }
      } else {
        console.log('로컬 스토리지에 sendCategoryData가 없습니다.');
      }

      if (editData) {
        try {
          const parsedEditData = JSON.parse(editData);
          // console.log('sendEditData:', parsedEditData); // 디버깅용 콘솔 로그
          setGetEditData(parsedEditData);
        } catch (error) {
          console.error('로컬 스토리지 sendEditData 파싱 에러:', error);
        }
      } else {
        console.log('로컬 스토리지에 sendEditData가 없습니다.');
      }
      if (itemCount) {
        try {
          const parsedItemCountData = JSON.parse(itemCount);
          setGetItemCountData(parsedItemCountData);
        } catch (error) {
          console.error('로컬 스토리지 sendItemCount 파싱 에러:', error);
        }
      } else {
        console.log('로컬 스토리지에 sendItemCount가 없습니다.');
      }
    };

    fetchDataFromStorage();

    const retryTimeout = setTimeout(fetchDataFromStorage, 3000); // 3초 후에 다시 시도

    return () => clearTimeout(retryTimeout);
  }, []);

  useEffect(() => {
    if (getEditData) setWorkbookIdx(getEditData?.workbookIdx);
  }, [getEditData]);

  // 학습지 상세 정보 불러오기 api
  const getWorkbookData = async (idx: number) => {
    const res = await workbookInstance.get(`/v1/workbook/detail/${idx}`);
    console.log(`getWorkbook 결과값`, res);
    return res;
  };

  const { data: workbookData, isLoading: isWorkbookLoading } = useQuery({
    queryKey: ['get-workbookData', workbookIdx],
    queryFn: () => getWorkbookData(workbookIdx as number),
    meta: {
      errorMessage: 'get-workbookData 에러 메세지',
    },
    enabled: !!workbookIdx,
  });

  //로컬스토리지에서 Idx받아오면 서버 요청
  useEffect(() => {
    if (workbookIdx) {
      getWorkbookData(workbookIdx);
    }
  }, [workbookIdx]);

  //서버로부터 값을 받아오면 넣어주기
  useEffect(() => {
    if (workbookData) {
      const arrayScore = workbookData?.data.data.quizList.map(
        (item: QuizList) => item.score,
      );
      const totalScore = arrayScore.reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
        0,
      );
      const avgScore = totalScore / workbookData?.data.data.quizList.length;
      //setQuotient(avgScore === 0 ? null : avgScore);
      //setQuotient(avgScore);
      //setMinQuotient(avgScore > 1 ? avgScore - 1 : avgScore);
      //setMaxQuotient(avgScore + 1);
      //setEqualTotalValue(totalScore.toString());
      //setTotalEqualScore(totalScore);
      //setRemainderContent(workbookData?.data.data.quizList.length);
      //setNextRemainderContent(workbookData?.data.data.quizList.length + 1);
      //setEqualScore(2);
      //그룹코드로 묶는 함수
      processData(workbookData?.data.data.quizList);
      //setInitialItems(workbookData?.data.data.quizList);
      setNameValue(workbookData?.data.data.name);
      setGradeValue(workbookData?.data.data.grade);
      setContentAuthor(workbookData?.data.data.examiner);
      setTag(workbookData?.data.data.tag);
      setGetItemCountData(workbookData?.data.data.quizCnt);
      setColor(workbookData?.data.data.templateList[0].color);
      setType(workbookData?.data.data.templateList[0].type);
      setMultiLevel(workbookData?.data.data.templateList[0].multiLevel);
      setAssign(workbookData?.data.data.templateList[0].assign);
      setIsDate(workbookData?.data.data.templateList[0].isDate);
      setIsQuizType(workbookData?.data.data.templateList[0].isQuizType);
      setItemType(workbookData?.data.data.templateList[0].itemType);
      //window.opener.localStorage.clear();
    }
  }, [workbookData]);

  // useEffect(() => {
  //   if (getQuotientLocalData) {
  //     setEqualScore(getQuotientLocalData.equalScore);
  //     //setEqualTotalValue(getQuotientLocalData.equalTotalValue);
  //     setRemainderContent(getQuotientLocalData.remainderContent);
  //     setNextRemainderContent(getQuotientLocalData.nextRemainderContent);
  //     setQuotient(getQuotientLocalData.quotient);
  //     setMinQuotient(getQuotientLocalData.minQuotient);
  //     setMaxQuotient(getQuotientLocalData.maxQuotient);
  //   }
  // }, [getQuotientLocalData]);

  useEffect(() => {
    if (minQuotient === quotient) {
      setQuotientOption([
        {
          code: '0',
          idx: 0,
          name: `${minQuotient}점`,
          value: minQuotient as number,
        },
        {
          code: '1',
          idx: 1,
          name: `${maxQuotient}점`,
          value: maxQuotient as number,
        },
      ]);
    } else {
      setQuotientOption([
        {
          code: '0',
          idx: 0,
          name: `${minQuotient}점`,
          value: minQuotient as number,
        },
        {
          code: '1',
          idx: 1,
          name: `${quotient ? quotient : 0}점`,
          value: quotient ? quotient : 0,
        },
        {
          code: '2',
          idx: 2,
          name: `${maxQuotient}점`,
          value: maxQuotient as number,
        },
      ]);
    }
  }, [quotient, minQuotient, maxQuotient]);

  //수정, 복제후 수정일 때 step3 갔다가 돌아왔을 때 상태관리
  useEffect(() => {
    if (getLocalData) {
      setIsEditWorkbook(getLocalData.data.isEditWorkbook);
      setInitialItems(getLocalData.data.quizList);
      setTotalEqualScore(0);
    }
  }, [getLocalData]);

  useEffect(() => {
    if (getEditData) setIsEditWorkbook(getEditData?.isEditWorkbook);
  }, [getEditData]);

  const menuList = [
    {
      label: '학습지 요약',
      value: '학습지 요약',
    },
    {
      label: '새 문항 추가',
      value: '새 문항 추가',
    },
    {
      label: '즐겨찾는 문항',
      value: '즐겨찾는 문항',
    },
    {
      label: '개념',
      value: '개념',
    },
  ];

  const levelRateData = [
    { value: levelLower, label: '하' },
    { value: levelInterMediate, label: '중하' },
    { value: levelMedium, label: '중' },
    { value: levelUpper, label: '상' },
    { value: levelBest, label: '최상' },
  ];

  //객관식 상단배치
  useEffect(() => {
    if (defaultValues[0] === '객관식 상단배치') {
      const updatedItems = initialItems.slice(); // 초기 상태 복사

      // quizCategoryList에서 객관식인 item을 맨 앞으로 이동
      updatedItems.sort((a, b) => {
        // a가 객관식이면 -1, b가 객관식이면 1, 둘 다 아니면 0 반환
        const aIsObjective = a.quizCategoryList.some(
          (item) => item.quizCategory.문항타입 === '객관식',
        );
        const bIsObjective = b.quizCategoryList.some(
          (item) => item.quizCategory.문항타입 === '객관식',
        );
        if (aIsObjective && !bIsObjective) return -1;
        if (!aIsObjective && bIsObjective) return 1;
        return 0;
      });

      // 상태 업데이트
      setInitialItems(updatedItems);
    }
  }, [defaultValues[0] === '객관식 상단배치']);

  //무작위 정렬
  useEffect(() => {
    if (defaultValues[0] === '무작위 정렬') {
      const updatedItems = initialItems.slice(); // 초기 상태 복사

      // 각 객체의 quizCategoryList를 무작위로 섞음
      const shuffleList = _shuffle(updatedItems);

      // 상태 업데이트
      setInitialItems(shuffleList);
    }
  }, [defaultValues[0] === '무작위 정렬']);

  const selectListCategoryOption = (
    event: React.MouseEvent<HTMLButtonElement>,
    idx: number,
  ) => {
    const newValue = (event.target as HTMLButtonElement)?.innerText;
    setDefaultValues((prev) => ({
      ...prev,
      [idx]: newValue,
    }));
  };

  //선택한 문항 보기 정렬
  const selectCategory = [
    {
      idx: 1,
      name: '문제만 보기',
      value: '1',
      options: [
        { idx: 0, name: '문제만 보기', value: '0' },
        { idx: 1, name: '문제+정답', value: '1' },
        { idx: 2, name: '문제+정답+해설', value: '2' },
      ],
    },
  ];

  // 새 문항 문항 불러오기 api
  const postnewQuizList = async (data: any) => {
    return await quizService.post(`/v1/search/quiz/step/1`, data);
  };

  const { mutate: postNewQuizData, isPending: postNewQuizDataPending } =
    useMutation({
      mutationFn: postnewQuizList,
      onError: (context: {
        response: { data: { message: string; code: string } };
      }) => {
        openToastifyAlert({
          type: 'error',
          text: context.response.data.message,
        });
        if (context.response.data.code == 'GE-002') {
          postRefreshToken();
        }
      },
      onSuccess: (response) => {
        if (response.data.data.quizList.length <= 0) {
          openToastifyAlert({
            type: 'error',
            text: '범위 변경 버튼을 눌러 새 문항을 추가해보세요.',
          });
        } else {
          setNewQuizItems(response.data.data);
          setIsRangeSetting(false);
        }
      },
    });

  useEffect(() => {
    if (tabView === '새 문항 추가') {
      const data = {
        itemTreeKeyList: isRangeSetting ? makingdata : getCategoryLocalData,
        count: 10,
        difficulty: null,
        type: null,
        mock: 1,
        score: 1,
        isScoreEven: true,
        isQuizEven: false,
        isMePriority: false,
        filterList: initialItems.map((quiz) => quiz.code),
      };
      postNewQuizData(data);
    }
  }, [tabView]);

  //새로 불러오기
  const clickGetNewQuiz = () => {
    if (newQuizItems) {
      setNewQuizPrevItems((prevItem) => [...prevItem, newQuizItems]);
    }
    const data = {
      itemTreeKeyList: isRangeSetting ? makingdata : getCategoryLocalData,
      count: 10,
      difficulty: null,
      type: null,
      mock: 1,
      score: 1,
      isScoreEven: true,
      isQuizEven: false,
      isMePriority: false,
      filterList: initialItems.map((quiz) => quiz.code),
    };
    //setNewQuizItemSetting(data);
    postNewQuizData(data);
  };

  //이전 불러오기
  const clickPrevNewQuizList = () => {
    if (newQuizPrevItems.length > 0) {
      // 마지막 요소를 추출
      const lastItem = newQuizPrevItems[newQuizPrevItems.length - 1];
      setNewQuizItems(lastItem);
      // 마지막 요소 제거
      setNewQuizPrevItems((prevItems) => prevItems.slice(0, -1));
    } else {
      openToastifyAlert({
        type: 'warning',
        text: '불러올 이전 문항이 없습니다.',
      });
    }
  };

  const openRangeSetting = () => {
    setIsRangeSetting(true);
  };
  const closeRangeSetting = () => {
    setIsRangeSetting(false);
  };

  useEffect(() => {
    setIsRangeSetting(false);
  }, [tabView]);

  //그룹 화면설정 정보 불러오기 api
  const getMenu = async () => {
    const res = await resourceServiceInstance.get(
      `/v1/menu/path?url=workbookClassificationSetting`,
    );
    //console.log(res);
    return res;
  };
  const {
    data: menuData,
    isLoading: isMenuLoading,
    refetch: menuRefetch,
  } = useQuery({
    queryKey: ['get-menu'],
    queryFn: getMenu,
    meta: {
      errorMessage: 'get-menu 에러 메세지',
    },
  });

  useEffect(() => {
    if (menuData) {
      const filterList = menuData.data.data.menuDetailList;
      const nameListArray = filterList[0]?.nameList?.split(',') || [];
      const typeListArray = filterList[0]?.idxList.split(',') || [];
      const typeList = filterList[0]?.idxList;

      const viewListArray = (filterList[0]?.viewList?.split(',') || []).map(
        (item: string) => item === 'true',
      );
      const searchListArray = (filterList[0]?.searchList?.split(',') || []).map(
        (item: string) => item === 'true',
      );
      const newArray = nameListArray
        .map((name: string, index: number) => ({
          name,
          idx: typeListArray[index],
          view: viewListArray[index] || false,
          search: searchListArray[index] || false,
        }))
        .filter((item: string) => item.search);
      setSelectedList(newArray);
      setCategoryTypeList(typeList);
    }
  }, [menuData]);

  useEffect(() => {
    if (isRangeSetting && categoryTypeList) {
      fetchCategoryItems(categoryTypeList, setCategoryList);
    }
  }, [categoryTypeList, isRangeSetting]);

  // 카테고리의 그룹 유형 조회
  const fetchCategoryItems = async (
    typeList: string,
    setCategory: React.Dispatch<React.SetStateAction<ItemCategoryType[][]>>,
  ) => {
    const typeIds = typeList.split(',');
    try {
      if (typeIds.length > 0) {
        const response = await classificationInstance.get(
          `/v1/category/class/${typeIds[0]}`,
        );
        const itemsList = response?.data?.data?.categoryClassList || [];

        setCategory([itemsList]); // 2D 배열로 설정
      }
    } finally {
      //console.log('finally');
    }
  };

  // 라디오 버튼 설정
  const handleRadioCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const radioValue = e.currentTarget.value; // 선택된 값
    const radioName = e.currentTarget.name; // radio 버튼의 name 값
    const radioClass = e.currentTarget.className; // radio 버튼의 class

    // selectedList에서 해당 name에 맞는 항목을 찾아서 selected 값을 업데이트
    const updatedSelectedList = selectedList.map((item) => {
      if (item.name === radioClass) {
        return {
          ...item,
          selected: radioValue, // 선택된 값을 selected로 업데이트
          selectedName: radioName,
        };
      }
      return item;
    });

    // 현재 선택된 항목의 인덱스
    const updateIndex = updatedSelectedList.findIndex(
      (item) => item.name === radioClass,
    );

    // 선택된 항목 이후의 값 초기화
    const finalizedSelectedList = updatedSelectedList.map((item, index) => {
      if (index > updateIndex) {
        const { selected, selectedName, ...rest } = item; // selected와 selectedName 제거
        return rest;
      }
      return item;
    });

    // selectedList를 업데이트합니다.
    setSelectedList(finalizedSelectedList);

    // pidxList를 업데이트 (radioValue를 pidx로 설정)
    const updatedPidxList: number[] = [];
    const indexToUpdate = selectedList.findIndex(
      (item) => item.name === radioClass,
    );

    if (indexToUpdate !== -1) {
      updatedPidxList[indexToUpdate] = Number(radioValue);
    }

    // 선택된 리스트를 순회하며 필요한 데이터 가져오기
    updatedSelectedList.forEach((list, index) => {
      if (list.search) {
        const nextItem = updatedSelectedList[index + 1]; // 다음 항목
        const itemIdx = nextItem ? nextItem.idx : null; // 다음 항목의 idx
        const pidx = updatedPidxList[index]; // 현재 선택된 pidx

        if (itemIdx !== null && pidx !== undefined) {
          fetchCategoryList(itemIdx, pidx, index);
        }
      }
    });

    // 마지막 항목인지 확인하고 `categoryItemTreeDataMutate` 실행
    const isLastItem =
      updatedSelectedList.findIndex((item) => item.name === radioClass) ===
      updatedSelectedList.length - 1;

    if (isLastItem) {
      categoryItemTreeDataMutate();
    }
  };

  /* 선택된 유형에따라 항목 조회 */
  const fetchCategoryList = async (
    itemIdx: number, //구하고자 하는 유형의 idx
    pidx: number, //클릭한 유형의 idx
    index: number,
  ) => {
    try {
      const res = await classificationInstance.get(
        `/v1/category/${itemIdx}/${pidx}`,
      );
      const newCategoryLists = [...categoryList];
      newCategoryLists.splice(index + 1);
      newCategoryLists[index + 1] = res?.data?.data?.categoryClassList || [];
      setCategoryList(newCategoryLists);
    } catch (error) {
      console.error(`Error fetching category list for index ${index}:`, error);
    }
  };

  ///쿼리스트링 만드는 함수
  const createQueryString = (params: Record<string, string>) => {
    return Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join('&');
  };

  const postCategoryItemTree = async () => {
    const depthChecks = selectedList.map((el) => el.selectedName);

    //서버로 부터 받은 nameList에 맞게 서버에 요청
    //const groupsArray = categoryNameList.split(',');
    const groupsArray = selectedList.map((el) => el.name);
    const keyValuePairs = groupsArray.reduce<Record<string, string>>(
      (acc, item, index) => {
        const depthCheck = depthChecks[index];
        if (depthCheck) {
          acc[item] = depthCheck; // title 속성을 사용하여 acc 객체에 추가
        }
        return acc;
      },
      {},
    );

    const queryString = createQueryString(keyValuePairs);

    const res = await classificationInstance.get(`/v2/item?${queryString}`);
    return res;
  };

  const {
    data: categoryItemTreeData,
    mutate: categoryItemTreeDataMutate,
    isPending,
  } = useMutation({
    mutationFn: postCategoryItemTree,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
      if (context.response.data?.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response: { data: { data: ItemTreeListType[] } }) => {
      setItemTree(response.data.data);
    },
  });

  const isRadioStateType = (
    item: UnitClassificationType,
  ): item is RadioStateType => {
    return (item as RadioStateType).title !== undefined;
  };

  //useMemo를 사용하여 makingdata값을 기억하며 unitClassificationList가 변경될때 업데이트
  const makingdata = useMemo(() => {
    return unitClassificationList.map((item) => {
      // itemTreeKey를 동적으로 생성
      const itemTreeKey = item.reduce(
        (acc, cur, index) => {
          if (isRadioStateType(cur)) {
            // RadioStateType인 경우에만 code를 사용
            const code = cur.code || `key_${index}`; // `code`가 없을 경우 기본 키 사용
            acc[code] = cur.title;
          }
          return acc;
        },
        {} as Record<string, string>,
      );

      // ItemTreeIdxListType인지 확인 후 itemTreeIdxList에 접근
      const lastItem = item[item.length - 1];
      const itemTreeIdxList =
        (lastItem as ItemTreeIdxListType)?.itemTreeIdxList || [];

      return {
        itemTreeKey,
        itemTreeIdxList,
      };
    });
  }, [unitClassificationList]);

  const saveCheckItems = () => {
    const newClassification: UnitClassificationType[] = selectedList.map(
      (item) => ({
        title: item.selectedName || '',
        checkValue: item.selected ? Number(item.selected) : 0,
        code: item.name || '',
        key: item.idx?.toString() || '',
      }),
    );

    if (checkedDepthList.length > 0) {
      newClassification.splice(6, 0, { itemTreeIdxList: checkedDepthList });
    }

    if (unitClassificationList.length < 6) {
      setUnitClassificationList((prevList) => [...prevList, newClassification]);
    } else {
      openToastifyAlert({
        type: 'error',
        text: '교과정보는 최대 5개 까지 저장 가능합니다',
      });
    }

    //저장 성공 후
    onResetList();
  };

  //삭제
  const deleteUnitClassification = (idx: number) => {
    setUnitClassificationList((prevList) => [
      ...prevList.slice(0, idx),
      ...prevList.slice(idx + 1),
    ]);
    setCheckedDepthList([]);
    setSearchValue('');
  };

  //분류 리스트 리셋
  const onResetList = () => {
    // categoryList의 첫 번째 항목을 제외한 나머지 항목을 지웁니다
    const resetCategoryList = [categoryList[0]];

    // selectedList의 항목들의 selected와 selectedName을 지웁니다
    const resetSelectedList = selectedList.map((item) => {
      // `selected`와 `selectedName` 키를 삭제
      const newItem = { ...item }; // item을 복사하여 원본을 보호
      delete newItem.selected; // selected 키 삭제
      delete newItem.selectedName; // selectedName 키 삭제
      return newItem;
    });

    // categoryList와 selectedList를 업데이트합니다.
    setCategoryList(resetCategoryList);
    setSelectedList(resetSelectedList);
    setCheckedDepthList([]);
  };

  // 수정
  const changeUnitClassification = async (idx: number) => {
    onResetList();
    const transformedList = unitClassificationList[idx]
      .map((item) => {
        // RadioStateType일 경우
        if (
          'key' in item &&
          'code' in item &&
          'checkValue' in item &&
          'title' in item
        ) {
          return {
            idx: Number(item.key), // key -> idx
            name: item.code, // code -> name
            search: true, // search는 true로 설정
            selected: item.checkValue.toString(), // checkValue -> selected
            selectedName: item.title, // title -> selectedName
            view: false, // view는 false로 설정
          };
        }

        // 만약 다른 타입이 있을 경우에는 처리하지 않음 (필요시 추가 처리)
        return null;
      })
      // null을 제거하고 selectedListType[]으로 강제 변환
      .filter((item) => item !== null) as selectedListType[];

    setSelectedList(transformedList);

    // categoryList를 업데이트할 배열을 미리 준비
    const updatedCategoryList = [...categoryList];

    // fetchCategoryLists 호출 후, 그 결과를 updatedCategoryList에 반영
    const fetchPromises = transformedList.map(async (item, index) => {
      const itemIdx = item.idx;
      const pidx = Number(transformedList[index - 1]?.selected); // pidx는 현재 항목의 selected 값

      if (itemIdx && pidx) {
        try {
          const res = await classificationInstance.get(
            `/v1/category/${itemIdx}/${pidx}`,
          );
          // 서버 응답을 받아서 해당 위치에 값 반영
          updatedCategoryList[index] = res?.data?.data?.categoryClassList || [];
        } catch (error) {
          console.error(
            `Error fetching category list for index ${index}:`,
            error,
          );
        }
      }
    });

    // 모든 fetchCategoryLists 호출이 완료된 후, 한 번에 setCategoryList 호출
    await Promise.all(fetchPromises);

    // 최종적으로 updatedCategoryList를 setCategoryList에 넣어줌
    setCategoryList(updatedCategoryList);
    categoryItemTreeDataMutate();
  };

  // 교과정보 추가버튼 disable 처리
  const addButtonBool = useMemo(() => {
    if (unitClassificationList.length < 5 && checkedDepthList.length > 0) {
      return false;
    } else {
      return true;
    }
  }, [unitClassificationList, checkedDepthList]);

  const [searchValue, setSearchValue] = useState<string>('');

  // 검색 기능
  const filterSearchValue = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    // 쿼리 스트링 변경 로직
    setSearchValue(e.currentTarget.value);
  };
  const filterSearchValueEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchValue(e.currentTarget.value);
    }
  };

  // 깊이가 있는 리스트 체크박스
  const handleSingleCheck = (checked: boolean, idx: number, level: number) => {
    setCheckedDepthList((prev) => {
      let updatedList = checked
        ? [...prev, idx]
        : prev.filter((item) => item !== idx);

      if (checked) {
        // 상위 요소를 체크
        let currentItem = findItemByIdx(idx);
        while (currentItem && currentItem.parentIdx !== 0) {
          const parentItem = findItemByIdx(currentItem.parentIdx as number);
          if (parentItem) {
            if (!updatedList.includes(parentItem.idx)) {
              updatedList.push(parentItem.idx);
            }
            currentItem = parentItem;
          } else {
            break;
          }
        }
      } else {
        // 하위 요소를 모두 체크 해제
        const removeDescendants = (currentIdx: number) => {
          const childItems = findChildItems(currentIdx);
          childItems.forEach((child) => {
            updatedList = updatedList.filter(
              (itemIdx) => itemIdx !== child.idx,
            );
            removeDescendants(child.idx);
          });
        };
        removeDescendants(idx);
      }

      return updatedList;
    });
  };
  const findItemByIdx = (idx: number): ItemTreeType | undefined => {
    for (const tree of itemTree) {
      for (const item of tree.itemTreeList) {
        if (item.idx === idx) {
          return item;
        }
      }
    }
    return undefined;
  };
  const findChildItems = (parentIdx: number): ItemTreeType[] => {
    const children: ItemTreeType[] = [];
    for (const tree of itemTree) {
      children.push(
        ...tree.itemTreeList.filter((item) => item.parentIdx === parentIdx),
      );
    }
    return children;
  };

  const highlightText = (text: string, searchValue: string) => {
    if (searchValue.length < 2) return text;
    const parts = text.split(new RegExp(`(${searchValue})`, 'gi'));
    return (
      <span className="text">
        {parts.map((part, index) => {
          const className =
            part.toLowerCase() === searchValue.toLowerCase() ? 'highlight' : '';
          return (
            <span key={index} className={className}>
              {part}
            </span>
          );
        })}
      </span>
    );
  };

  const prevHighlight = () => {
    setHighlightIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const nextHighlight = () => {
    setHighlightIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    const highlightedElements = document.querySelectorAll('.highlight');
    if (highlightedElements.length > 0 && highlightIndex !== -1) {
      highlightedElements.forEach((el) => el.classList.remove('current'));
      const currentElement =
        highlightedElements[highlightIndex % highlightedElements.length];
      if (currentElement) {
        currentElement.classList.add('current');
        currentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [highlightIndex]);

  useEffect(() => {
    setHighlightIndex(-1);
  }, [itemTree, searchValue]);

  //신고하기
  const openReportProcess = (idx: number) => {
    openModal({
      title: '',
      content: (
        <ReportProcessModal
          registorReport={true}
          reportIdx={idx}
          initialItems={initialItems}
          setInitialItems={setInitialItems}
        />
      ),
      callback: () => {},
    });
  };

  //리스트에서 문항 삭제하기(배열의 경우)
  const deleteQuizItem = (code: string, type: string) => {
    if (initialItems) {
      // type이 "TEXT"일 경우
      if (type === 'TEXT') {
        // initialItems의 quizItemList 배열을 순회하여 code 값에 맞는 항목을 삭제
        const updatedItems = initialItems.map((item) => ({
          ...item,
          quizCategoryList: item.quizCategoryList.filter(
            (quizItem) => quizItem.quizCode !== code,
          ),
          quizItemList: item.quizItemList.filter(
            (quizItem) => quizItem.quizCode !== code,
          ),
        }));

        const finalItems = updatedItems.filter((item) => {
          const types = item.quizItemList.map((el) => el.type); // quizItemList의 모든 type을 가져옴
          const uniqueTypes = [...new Set(types)]; // 중복을 제거하여 고유한 type만 가져옴

          // "QUESTION" 타입이 포함되지 않으면 제외
          if (!uniqueTypes.includes('QUESTION')) {
            return false;
          }

          // 'BIG'과 'TEXT'만 있는 경우 제외 (길이가 1이거나 2인 경우)
          if (uniqueTypes.length <= 2 && uniqueTypes.includes('BIG')) {
            return false; // 제외
          }
          if (uniqueTypes.length <= 2 && uniqueTypes.includes('TEXT')) {
            return false; // 제외
          }

          // 그 외는 유지
          return true;
        });

        setInitialItems(finalItems); // 새로운 initialItems로 상태 업데이트
      } else {
        // 기존 로직: type이 "QUESTION"일 경우
        const selectedQuizItem = initialItems.find(
          (item) => item.code === code,
        );

        if (selectedQuizItem) {
          setInitialItems((prevItems) =>
            prevItems.filter((item) => item !== selectedQuizItem),
          );
        }
      }
    }
  };

  //즐겨찾기
  //내문항 우선 선택
  const getFavoriteCategory = async () => {
    const res = await quizService.get(`/v1/quiz/favorite/select`);
    return res.data.data;
  };

  const { data: favoriteCategoryData, refetch: favoriteCategoryDataRefetch } =
    useQuery({
      queryKey: ['get-favoriteCategory'],
      queryFn: getFavoriteCategory,
      meta: {
        errorMessage: 'get-favoriteCategory 에러 메세지',
      },
      enabled: tabView == '즐겨찾는 문항',
    });

  const [selectItemList, setSelectItemList] = useState<any[]>([]);

  useEffect(() => {
    if (favoriteCategoryData && favoriteCategoryData.selectItemList) {
      setSelectItemList(favoriteCategoryData.selectItemList);
    }
  }, [favoriteCategoryData]);

  const bookmarkSelectCategory = [
    {
      idx: 2,
      name: '유형을 선택해주세요.',
      value: '2',
      options: selectItemList.map((el: any, i: number) => ({
        idx: i,
        name: el,
        value: i.toString(),
      })),
    },
  ];

  useEffect(() => {
    if (defaultValues[2] === '유형을 선택해주세요.') {
      setOnFilter(false);
      favoriteQuizDataRefetch();
    } else {
      setOnFilter(true);
      setFilterValue(defaultValues[2]);
      favoriteQuizDataRefetch();
    }
  }, [defaultValues[2]]);

  // 문항 즐겨찾기리스트 불러오기 api
  const getFavoriteQuiz = async (page: any) => {
    const res = await quizService.get(
      !onFilter
        ? `/v1/quiz/favorite?pageIndex=${page}&pageUnit=${8}&searchKeyword=${filterValue}&searchCondition=유형`
        : `/v1/quiz/favorite?pageIndex=${page}&pageUnit=${8}`,
    );
    // console.log('불러오기', res.data.data);
    return res.data.data;
  };

  const { data: favoriteQuizData, refetch: favoriteQuizDataRefetch } = useQuery(
    {
      queryKey: ['get-favoriteQuizList', page],
      queryFn: () => getFavoriteQuiz(page),
      meta: {
        errorMessage: 'get-favoriteQuizList 에러 메세지',
      },
      enabled: tabView == '즐겨찾는 문항',
    },
  );

  useEffect(() => {
    if (favoriteQuizData) {
      const transformedData = {
        quizList: Array.isArray(favoriteQuizData.quizList)
          ? favoriteQuizData.quizList.flat()
          : [],
      };
      setFavoriteQuestionList(transformedData);
    }
  }, [favoriteQuizData]);

  // 문항 즐겨찾기 토글 api
  const patchQuizFavorite = async (data: {
    idx: number;
    isFavorite: boolean;
  }) => {
    return await quizService.patch(`/v1/quiz/favorite`, data);
  };
  const { data: quizFavorite, mutate: mutateQuizFavorite } = useMutation({
    mutationFn: patchQuizFavorite,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
      if (context.response.data.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response: { data: { message: string } }) => {
      openToastifyAlert({
        type: 'success',
        text: response.data.message,
      });
      favoriteQuizDataRefetch();
    },
  });

  // 즐겨찾기 토글 버튼
  const handleFavorite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    idx: number,
    isFavorite: boolean,
    type: string,
  ) => {
    e.stopPropagation();

    const favoriteItem = {
      idx: idx,
      isFavorite: !isFavorite,
    };

    // 초기 항목 즐겨찾기 업데이트
    if (type === 'TEXT') {
      setInitialItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          quizItemList: item.quizItemList.map((quizItem) =>
            quizItem.quizIdx === favoriteItem.idx
              ? { ...quizItem, quizFavorite: favoriteItem.isFavorite }
              : quizItem,
          ),
        })),
      );
    } else {
      setInitialItems((prevItems) =>
        prevItems.map((item) =>
          item.idx === favoriteItem.idx
            ? { ...item, isFavorite: favoriteItem.isFavorite }
            : item,
        ),
      );
    }

    // 유사문항 추가 즐겨찾기 업데이트
    if (similarItems) {
      setSimilarItems((prevItems) => {
        if (!prevItems) return prevItems; // prevItems가 null이면 그대로 반환

        if (type === 'TEXT') {
          return {
            ...prevItems,
            quizList: prevItems.quizList.map((item) => ({
              ...item,
              quizItemList: item.quizItemList.map((quizItem) =>
                quizItem.quizIdx === favoriteItem.idx
                  ? { ...quizItem, quizFavorite: favoriteItem.isFavorite }
                  : quizItem,
              ),
            })),
          };
        } else {
          return {
            ...prevItems,
            quizList: prevItems.quizList.map((item) =>
              item.idx === favoriteItem.idx
                ? { ...item, isFavorite: favoriteItem.isFavorite }
                : item,
            ),
          };
        }
      });
    }

    // 새 문항 추가 즐겨찾기 업데이트
    if (newQuizItems) {
      setNewQuizItems((prevItems) => {
        if (!prevItems) return prevItems; // prevItems가 null이면 그대로 반환

        if (type === 'TEXT') {
          return {
            ...prevItems,
            quizList: prevItems.quizList.map((item) => ({
              ...item,
              quizItemList: item.quizItemList.map((quizItem) =>
                quizItem.quizIdx === favoriteItem.idx
                  ? { ...quizItem, quizFavorite: favoriteItem.isFavorite }
                  : quizItem,
              ),
            })),
          };
        } else {
          return {
            ...prevItems,
            quizList: prevItems.quizList.map((item) =>
              item.idx === favoriteItem.idx
                ? { ...item, isFavorite: favoriteItem.isFavorite }
                : item,
            ),
          };
        }
      });
    }

    // API 호출
    mutateQuizFavorite(favoriteItem);
  };

  const selectPriorityQuiz = () => {
    setIsPriorityEven(!isPriorityQuiz);
  };

  // 유사문항 요청 api
  const postSimilarItems = async () => {
    const data = {
      quizCode: similarItemCode,
      count: 10,
      filterList: [
        similarPrevItems
          .map((item) => item.quizList.map((item) => item.code))
          .flat(),
        similarItemCode,
      ].flat(),
    };
    const res = await quizService.post('/v1/quiz/similar', data);
    //console.log('quizService 응답:', res);
    return res;
  };

  const {
    data: similarData,
    mutate: similarDataMutate,
    isPending: similarDataPending,
  } = useMutation({
    mutationFn: postSimilarItems,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
      if (context.response.data.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response: { data: { data: SimilarQuizList } }) => {
      setSimilarItems(response.data.data);
    },
  });

  // 유사문항 버튼 클릭
  const showSimilarContent = (code: string, order: number, idx: number) => {
    setSimilarItemCode(code);
    setInitialItemOrder(order);
    setInitialItemIdx(idx);
    if (isSimilar) {
      setIsSimilar(!isSimilar);
      setSimilarItems(null);
    } else {
      setIsSimilar(!isSimilar);
      similarDataMutate();
    }
  };
  //새로 불러오기
  const clickNewSimilarList = () => {
    if (similarItems) {
      setSimilarPrevItems((prevItem) => [...prevItem, similarItems]);
    }
    similarDataMutate();
  };

  //이전 불러오기
  const clickPrevSimilarList = () => {
    if (similarPrevItems.length > 0) {
      // 마지막 요소를 추출
      const lastItem = similarPrevItems[similarPrevItems.length - 1];
      setSimilarItems(lastItem);
      // 마지막 요소 제거
      setSimilarPrevItems((prevItems) => prevItems.slice(0, -1));
    } else {
      openToastifyAlert({
        type: 'warning',
        text: '불러올 이전 문항이 없습니다.',
      });
    }
  };
  //리스트 문항 전체 추가
  // const clickAddAllQuizItem = () => {
  //   //새문항 전체추가
  //   if (newQuizItems && getItemCountData) {
  //     const allNewQuizItems = newQuizItems.quizList;
  //     if (initialItems.length + allNewQuizItems.length <= getItemCountData) {
  //       setInitialItems((prevItems) => {
  //         const updatedQuizItem = allNewQuizItems.map((item, index) => ({
  //           ...item,
  //         }));
  //         const filteredQuizItem = updatedQuizItem.filter(
  //           (updatedItem) =>
  //             !initialItems.some(
  //               (initialItem) => initialItem.code === updatedItem.code,
  //             ),
  //         );
  //         return [...prevItems, ...filteredQuizItem];
  //       });
  //       setNewQuizItems((prevItems) => {
  //         if (prevItems) {
  //           return {
  //             ...prevItems,
  //             quizList: [],
  //           };
  //         }
  //         return prevItems;
  //       });
  //     } else {
  //       openToastifyAlert({
  //         type: 'error',
  //         text: `총 문항수 ${getItemCountData}개를 초과합니다.`,
  //       });
  //     }
  //   }
  //   //즐겨찾기 전체추가
  //   else if (favoriteQuestionList && getItemCountData) {
  //     const allNewQuizItems = favoriteQuestionList.quizList;
  //     if (initialItems.length + allNewQuizItems.length <= getItemCountData) {
  //       setInitialItems((prevItems) => {
  //         const updatedQuizItem = allNewQuizItems.map((item, index) => ({
  //           ...item,
  //         }));
  //         const filteredQuizItem = updatedQuizItem.filter(
  //           (updatedItem) =>
  //             !initialItems.some(
  //               (initialItem) => initialItem.code === updatedItem.code,
  //             ),
  //         );
  //         return [...prevItems, ...filteredQuizItem];
  //       });
  //     } else {
  //       openToastifyAlert({
  //         type: 'error',
  //         text: `총 문항수 ${getItemCountData}개를 초과합니다.`,
  //       });
  //     }
  //   }
  // };

  // 리스트에 문항 추가하기(객체인 경우)
  const clickAddSimilarQuizItem = (code: string) => {
    // 우사문항 불러오기 리스트
    if (similarItems && getItemCountData) {
      const selectedQuizItem = similarItems.quizList.find(
        (item) => item.code === code,
      );
      if (selectedQuizItem) {
        if (initialItems.length + 1 <= getItemCountData) {
          const alreadyExists = initialItems.some((item) => {
            // 현재 item의 code와 비교
            if (item.code === selectedQuizItem.code) {
              return true;
            }

            // item의 quizItemList의 quizCode와 비교
            if (
              item.quizItemList?.some(
                (quiz) => quiz.quizCode === selectedQuizItem.code,
              )
            ) {
              return true;
            }

            return false;
          });
          if (alreadyExists) {
            openToastifyAlert({
              type: 'error',
              text: `이미 포함되어있는 문항입니다.`,
            });
          } else {
            setInitialItems((prevItems) => {
              if (prevItems) {
                const updatedQuizItem = {
                  ...selectedQuizItem,
                };
                return [...prevItems, updatedQuizItem];
              }
              return [selectedQuizItem]; // 초기 상태 설정
            });
            setSimilarItems((prevItems) => {
              if (prevItems) {
                return {
                  ...prevItems,
                  quizList: prevItems.quizList.filter(
                    (item) => item.code !== selectedQuizItem.code,
                  ),
                };
              }
              return prevItems; // 초기 상태 설정
            });
          }
        } else {
          openToastifyAlert({
            type: 'error',
            text: `총 문항수 ${getItemCountData}개를 초과합니다.`,
          });
        }
      }
    }
  };
  const clickAddNewQuizItem = (code: string) => {
    // 새문항 불러오기 리스트
    if (newQuizItems && getItemCountData) {
      const selectedQuizItem = newQuizItems.quizList.find(
        (item) => item.code === code,
      );
      if (selectedQuizItem) {
        if (initialItems.length + 1 <= getItemCountData) {
          const alreadyExists = initialItems.some((item) => {
            // 현재 item의 code와 비교
            if (item.code === selectedQuizItem.code) {
              return true;
            }

            // item의 quizItemList의 quizCode와 비교
            if (
              item.quizItemList?.some(
                (quiz) => quiz.quizCode === selectedQuizItem.code,
              )
            ) {
              return true;
            }

            return false;
          });
          if (alreadyExists) {
            openToastifyAlert({
              type: 'error',
              text: `이미 포함되어있는 문항입니다.`,
            });
          } else {
            setInitialItems((prevItems) => {
              if (prevItems) {
                const updatedQuizItem = {
                  ...selectedQuizItem,
                };
                return [...prevItems, updatedQuizItem];
              }
              return [selectedQuizItem];
            });
            setNewQuizItems((prevItems) => {
              if (prevItems) {
                return {
                  ...prevItems,
                  quizList: prevItems.quizList.filter(
                    (item) => item.code !== selectedQuizItem.code,
                  ),
                };
              }
              return prevItems; // 초기 상태 설정
            });
          }
        } else {
          openToastifyAlert({
            type: 'error',
            text: `총 문항수 ${getItemCountData}개를 초과합니다.`,
          });
        }
      }
    }
  };

  const clickAddFavoriteQuizItem = (code: string) => {
    // 즐겨찾기 리스트
    if (favoriteQuestionList && getItemCountData) {
      const selectedQuizItem = favoriteQuestionList.quizList.find(
        (item) => item.code === code,
      );
      if (selectedQuizItem) {
        if (initialItems.length + 1 <= getItemCountData) {
          const alreadyExists = initialItems.some((item) => {
            // 현재 item의 code와 비교
            if (item.code === selectedQuizItem.code) {
              return true;
            }

            // item의 quizItemList의 quizCode와 비교
            if (
              item.quizItemList?.some(
                (quiz) => quiz.quizCode === selectedQuizItem.code,
              )
            ) {
              return true;
            }

            return false;
          });
          if (alreadyExists) {
            openToastifyAlert({
              type: 'error',
              text: `이미 포함되어있는 문항입니다.`,
            });
          } else {
            setInitialItems((prevItems) => {
              if (prevItems) {
                const updatedQuizItem = {
                  ...selectedQuizItem,
                };

                return [...prevItems, updatedQuizItem];
              }
              return [
                {
                  ...selectedQuizItem,
                },
              ];
            });
            setIsAdded(!isAdded);
          }
        } else {
          openToastifyAlert({
            type: 'error',
            text: `총 문항수 ${getItemCountData}개를 초과합니다.`,
          });
        }
      }
    }
  };

  //문항 추가 후 그룹 코드 별로 가공
  useEffect(() => {
    if (!initialItems || initialItems.length === 0) return; // 데이터 없을 때 방어 코드

    const groupedItems = initialItems.reduce(
      (acc, item) => {
        if (!acc[item.groupCode]) {
          acc[item.groupCode] = [];
        }
        acc[item.groupCode].push(item);
        return acc;
      },
      {} as Record<string, typeof initialItems>,
    );

    const processedItems = Object.values(groupedItems).flatMap((group) => {
      const textItem = group.find((item) => item.type === 'TEXT');
      const nonTextItems = group.filter((item) => item.type !== 'TEXT');

      if (textItem) {
        // quizItemList 가공
        let updatedNonTextQuizItems = nonTextItems.flatMap((item) =>
          (item.quizItemList || []).map((quizItem) => ({
            ...quizItem,
            quizIdx: item.idx ?? 0, // 기본값 처리
            quizCode: item.code ?? '', // 기본값 처리
          })),
        );

        // 중복 제거: quizIdx와 quizCode를 기준으로 중복 제거
        updatedNonTextQuizItems = updatedNonTextQuizItems.filter(
          (item, index, self) =>
            index ===
            self.findIndex((t) => t.idx === item.idx && t.code === item.code),
        );

        // quizCategoryList 가공
        const updatedNonTextQuizCategories = nonTextItems.flatMap((item) =>
          (item.quizCategoryList || []).map((category) => ({
            ...category,
            quizIdx: item.idx ?? 0, // 기본값 처리
            quizCode: item.code ?? '', // 기본값 처리
          })),
        );

        // textItem에 quizItemList와 quizCategoryList 병합
        textItem.quizItemList = [
          ...(textItem.quizItemList || []),
          ...updatedNonTextQuizItems,
        ];

        textItem.quizCategoryList = [
          ...(textItem.quizCategoryList || []),
          ...updatedNonTextQuizCategories,
        ];

        // 중복된 항목들까지 처리되었으므로 최종적으로 textItem만 반환
        return [textItem];
      }

      // textItem이 없으면 기존 group 반환
      return group;
    });

    setInitialItems(processedItems); // 중복 제거된 데이터로 상태 갱신
  }, [similarItems, newQuizItems, isAdded]);

  //수정, 복제 후 수정으로 들어왔을때 그룹끼리 묶는 함수수
  const processData = (data: QuizList[]) => {
    const groupedItems = data.reduce(
      (acc, item) => {
        if (!acc[item.groupCode]) {
          acc[item.groupCode] = [];
        }
        acc[item.groupCode].push(item);
        return acc;
      },
      {} as Record<string, typeof initialItems>,
    );

    const processedItems = Object.values(groupedItems).flatMap((group) => {
      const textItem = group.find((item) => item.type === 'TEXT');
      const nonTextItems = group.filter((item) => item.type !== 'TEXT');

      if (textItem) {
        // quizItemList 가공
        let updatedNonTextQuizItems = nonTextItems.flatMap((item) =>
          (item.quizItemList || []).map((quizItem) => ({
            ...quizItem,
            quizIdx: item.idx ?? 0, // 기본값 처리
            quizCode: item.code ?? '', // 기본값 처리
          })),
        );

        // 중복 제거: quizIdx와 quizCode를 기준으로 중복 제거
        updatedNonTextQuizItems = updatedNonTextQuizItems.filter(
          (item, index, self) =>
            index ===
            self.findIndex((t) => t.idx === item.idx && t.code === item.code),
        );

        // quizCategoryList 가공
        const updatedNonTextQuizCategories = nonTextItems.flatMap((item) =>
          (item.quizCategoryList || []).map((category) => ({
            ...category,
            quizIdx: item.idx ?? 0, // 기본값 처리
            quizCode: item.code ?? '', // 기본값 처리
          })),
        );

        // textItem에 quizItemList와 quizCategoryList 병합
        textItem.quizItemList = [
          ...(textItem.quizItemList || []),
          ...updatedNonTextQuizItems,
        ];

        textItem.quizCategoryList = [
          ...(textItem.quizCategoryList || []),
          ...updatedNonTextQuizCategories,
        ];

        // 중복된 항목들까지 처리되었으므로 최종적으로 textItem만 반환
        return [textItem];
      }

      // textItem이 없으면 기존 group 반환
      return group;
    });
    setInitialItems(processedItems);
  };

  //console.log('similarItems', similarItems);
  //console.log('initialItems', initialItems);
  //리스트 문항 교체하기
  const clickSwapQuizItem = (
    similarItems: SimilarQuizList | undefined,
    similarItemIndex: number,
    initialItems: QuizList[],
    initialItemOrder: number,
  ) => {
    //console.log('similarItems;', similarItems);
    //console.log('similarItemIndex;', similarItemIndex);
    //console.log('initialItems;', initialItems);
    //console.log('initialItemOrder;', initialItemOrder);

    if (similarItems && initialItems) {
      const newSimilarItems = [...similarItems.quizList];
      const newInitialItems = [...initialItems];

      // initialItems에서 quizItemList를 순회하며 order가 initialItemOrder와 같은 항목 찾기
      let initialItemIndex = -1;
      for (let i = 0; i < newInitialItems.length; i++) {
        const quizItemIndex = newInitialItems[i].quizItemList.findIndex(
          (quizItem: any) => quizItem.order === initialItemOrder,
        );
        if (quizItemIndex !== -1) {
          initialItemIndex = i; // 해당 quizItem이 있는 initialItem의 index
          break;
        }
      }

      if (initialItemIndex === -1) {
        console.error('Order not found in quizItemList');
        return;
      }

      // 교체할 항목을 임시 저장
      const temp = newSimilarItems[similarItemIndex];

      // newInitialItems에서 찾은 항목과 교체
      newSimilarItems[similarItemIndex] = {
        ...newInitialItems[initialItemIndex],
        quizItemList: newInitialItems[initialItemIndex].quizItemList.map(
          (quizItem: any) => ({
            ...quizItem,
            //order: initialItemOrder, // 교체 시 initialItemOrder 값 추가
          }),
        ),
      };

      newInitialItems[initialItemIndex] = {
        ...temp,
        quizItemList: temp.quizItemList.map((quizItem: any) => ({
          ...quizItem,
          order: initialItemOrder, // 기존 order 값 유지
        })),
      };

      setSimilarItems({
        ...similarItems,
        quizList: newSimilarItems,
      });
      setInitialItems(newInitialItems);

      return [newSimilarItems, newInitialItems];
    }
  };

  // 문항 DnD
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>();
  const whenDragEnd = (newList: QuizList[]) => {
    setInitialItems(newList);
  };

  const handleButtonCheck = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // 로컬스토리지에 보낼데이터 저장
  const saveLocalData = (data: any) => {
    if (data) {
      localStorage.setItem('sendData', JSON.stringify(data));
    }
  };

  const goBackStep1 = () => {
    //setContentNumQuotient([]);
    navigate('/content-create/exam/step1');
    window.localStorage.clear();
  };

  //단원분류 입력 도중 해당 화면을 벗어나는 경우, '저장하지 않고 나가시겠습니까?' 얼럿
  useEffect(() => {
    if (
      tabView == '학습지 요약' ||
      tabView == '새 문항 추가' ||
      tabView == '즐겨찾는 문항' ||
      tabView == '개념'
    ) {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        // 사용자에게 경고 메시지를 표시하도록 설정
        const message =
          '저장 버튼을 누르지 않을시 저장되지 않습니다. 정말 나가시겠습니까?';
        event.preventDefault();
        event.returnValue = message; // 표준에 따른 설정 (Chrome에서는 무시됨)
        return message; // 대부분의 브라우저에서 필요
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        //window.opener.localStorage.clear();
      };
    }
  }, [tabView]);

  //tab 선택시 선택 초기화
  useEffect(() => {
    setUnitClassificationList([]);
    onResetList();
  }, [tabView]);

  function createEditingItems(initialItems: QuizList[]) {
    console.log('editedItems:', initialItems);
  }

  //그룹이였던 문항을 각각 풀어서 가공
  function createNewItems(processedItems: QuizList[]) {
    const restoredItems: QuizList[] = [];

    processedItems.forEach((item) => {
      // groupCode가 없는 경우 -> 원본 그대로 유지
      if (!item.groupCode) {
        restoredItems.push(item);
        return;
      }

      // groupCode가 있는 경우 -> quizCode를 기준으로 분리
      const quizCodeMap = new Map<string, QuizList>();

      item.quizItemList.forEach((quizItem) => {
        if (!quizItem.quizCode) return; // quizCode가 없는 경우 무시

        if (!quizCodeMap.has(quizItem.quizCode)) {
          quizCodeMap.set(quizItem.quizCode, {
            ...item,
            idx: quizItem.quizIdx as number,
            type: 'TEXT', // 기본값을 TEXT로 설정
            quizItemList: [],
            quizCategoryList: [],
          });
        }

        const existingItem = quizCodeMap.get(quizItem.quizCode)!;

        // quizItemList에 추가
        existingItem.quizItemList.push(quizItem);

        // QUESTION이 하나라도 있으면 type을 "QUESTION"으로 변경
        if (quizItem.type === 'QUESTION') {
          existingItem.type = 'QUESTION';
        }
      });

      item.quizCategoryList.forEach((quizCategory) => {
        if (!quizCategory.quizCode) return; // quizCode가 없는 경우 무시
        if (!quizCodeMap.has(quizCategory.quizCode)) {
          quizCodeMap.set(quizCategory.quizCode, {
            ...item,
            idx: quizCategory.quizIdx as number,
            quizItemList: [],
            quizCategoryList: [],
          });
        }
        quizCodeMap
          .get(quizCategory.quizCode)!
          .quizCategoryList.push(quizCategory);
      });
      console.log('quizCodeMap:', quizCodeMap);

      // quizCode 기준으로 분리된 데이터 중 TEXT 또는 QUESTION이 있는 경우만 추가
      quizCodeMap.forEach((quizItem) => {
        const hasValidType = quizItem.quizItemList.some(
          (qi) => qi.type === 'TEXT' || qi.type === 'QUESTION',
        );

        if (hasValidType) {
          restoredItems.push(quizItem);
        }
      });
      // quizCode 기준으로 분리된 데이터 추가
      //restoredItems.push(...quizCodeMap.values());
    });
    console.log('restoredItems:', restoredItems);

    return restoredItems;
  }

  // function createNewItems(initialItems: QuizList[]) {
  //   let numCounter = 1; // 'QUESTION' 타입의 항목에 대한 순차 번호
  //   const divideItems = initialItems.filter((item) => item.type === 'TEXT');
  //   const asidedItems = initialItems.filter((item) => item.type !== 'TEXT');
  //   console.log('divideItems:', divideItems);
  //   // quizCategoryList를 quizCode별로 그룹화
  //   const groupedCategoryItems = divideItems.reduce(
  //     (acc, list) => {
  //       list.quizCategoryList.forEach((category) => {
  //         if (category.quizCode) {
  //           if (!acc[category.quizCode]) {
  //             acc[category.quizCode] = [];
  //           }
  //           acc[category.quizCode].push({
  //             ...category,
  //             groupCode: list.groupCode, // groupCode 추가
  //             num: list.num,
  //           });
  //         }
  //       });
  //       return acc;
  //     },
  //     {} as Record<string, any[]>,
  //   );

  //   // quizItemList를 quizCode별로 그룹화
  //   const groupedItems = divideItems.reduce(
  //     (acc, list) => {
  //       list.quizItemList.forEach((item) => {
  //         if (item.quizCode) {
  //           // 그룹화할 때 quizCode를 키로 사용
  //           if (!acc[item.quizCode]) {
  //             acc[item.quizCode] = [];
  //           }

  //           // 각 quizCode별로 groupCode와 함께 항목을 저장
  //           acc[item.quizCode].push({
  //             groupCode: list.groupCode,
  //             groupType: item.type,
  //             num: item.num,
  //             ...item,
  //           });
  //         }
  //       });
  //       return acc;
  //     },
  //     {} as Record<
  //       string,
  //       (QuizItemList & { groupCode: string; groupType: string })[]
  //     >,
  //   );

  //   console.log('groupedItems:', groupedItems);
  //   const newQuizListItems = Object.keys(groupedItems).map((quizCode, idx) => {
  //     const groupedItem = groupedItems[quizCode];
  //     console.log('groupedItem:', groupedItem);
  //     const groupedCategory = groupedCategoryItems[quizCode] || [];
  //     // 각 quizCode별로 QuizList 객체 생성
  //     const newQuizList: QuizList = {
  //       groupCode: groupedItem[0].groupCode, // groupCode는 첫 번째 항목에서 가져옴
  //       code: quizCode,
  //       idx: isEditWorkbook
  //         ? groupedItem
  //             .map((quiz) => quiz.idx)
  //             .find((idx) => idx !== undefined && idx !== null) ?? 0
  //         : groupedItem
  //             .map((quiz) => quiz.quizIdx)
  //             .find((quizIdx) => quizIdx !== undefined && quizIdx !== null) ??
  //           0,
  //       num: isEditWorkbook
  //         ? groupedItem
  //             .map((quiz) => quiz.num)
  //             .find((num) => num !== undefined && num !== null) ?? 0
  //         : groupedItem
  //             .filter((quiz) => quiz.type === 'QUESTION')
  //             .map((quiz) => quiz.num)
  //             .find((num) => num !== undefined && num !== null) ?? 0,
  //       score: isEditWorkbook
  //         ? groupedItem
  //             .map((quiz) => quiz.score)
  //             .find((score) => score !== undefined && score !== null) ?? 0
  //         : groupedItem
  //             .filter((item) => item.type === 'QUESTION')
  //             .map((quiz) => quiz.score)
  //             .find((score) => score !== undefined && score !== null) ?? 0,
  //       isQuiz: true,
  //       height: 0,
  //       createdAt: '',
  //       createdBy: '',
  //       isDelete: false,
  //       isFavorite: false,
  //       isUse: true,
  //       lastArticle: null,
  //       lastModifiedAt: '',
  //       lastModifiedBy: '',
  //       quizCategoryList: groupedCategory,
  //       quizItemList: groupedItem.map((item) => {
  //         return {
  //           ...item,
  //         };
  //       }),
  //       // item.type이 TEXT나 BIG이면 'TEXT'로 설정, 그렇지 않으면 'QUESTION'으로 설정
  //       type:
  //         groupedItem[0].groupType === 'BIG' ||
  //         groupedItem[0].groupType === 'TEXT'
  //           ? 'TEXT'
  //           : 'QUESTION',
  //       userKey: '', // userKey는 추가적인 데이터가 필요하면 지정
  //     };
  //     return newQuizList;
  //   });

  //   // `newQuizListItems`와 `asidedItems`를 합쳐서 새로운 배열로 반환
  //   const combinedItems = [...newQuizListItems, ...asidedItems].map((item) => {
  //     const score =
  //       item.quizItemList
  //         .filter((quiz) => quiz.type === 'QUESTION')
  //         .map((quiz) => quiz.score)
  //         .find((score) => score !== undefined && score !== null) ?? 0;
  //     if (item.type === 'QUESTION') {
  //       return {
  //         ...item,
  //         num: numCounter++,
  //         score: score,
  //       };
  //     }

  //     return item;
  //   });
  //   //console.log('combinedItems', combinedItems);
  //   return combinedItems; // 합쳐진 배열을 반환
  // }

  //배점 로컬스토리지 저장
  // const saveLocalQutientData = () => {
  //   const sendQuotientData = {
  //     equalScore: equalScore,
  //     equalTotalValue: equalTotalValue,
  //     remainderContent: remainderContent,
  //     quotient: quotient,
  //     nextRemainderContent: nextRemainderContent,
  //     minQuotient: minQuotient,
  //     maxQuotient: maxQuotient,
  //   };
  //   if (equalScore === 2) {
  //     localStorage.setItem(
  //       'sendQuotientData',
  //       JSON.stringify(sendQuotientData),
  //     );
  //   }
  // };

  //균등배점 저장
  const saveEqualScoreSettingModal = () => {
    if (isSaveEqualValue) {
      closeEqualScoreSettingModal();
      //saveLocalQutientData();
    } else {
      if (equalTotalValue) {
        openToastifyAlert({
          type: 'error',
          text: '저장을 눌러주세요.',
        });
      } else {
        openToastifyAlert({
          type: 'error',
          text: '배점을 입력해주세요.',
        });
      }
    }
    // 상태 업데이트
    setInitialItems((prev) => {
      const newItems = prev.map((list) => ({
        ...list,
        quizItemList: list.quizItemList.map((quiz) => {
          if (quiz.type === 'QUESTION') {
            if (remainderContent && quiz.num && quiz.num <= remainderContent) {
              return { ...quiz, score: quotient }; // num이 remainderContent 이하인 경우
            } else {
              return { ...quiz, score: maxQuotient }; // num이 remainderContent보다 큰 경우
            }
          }
          return quiz; // type이 QUESTION이 아닌 경우
        }),
      }));

      // score의 합계 계산
      const totalScore = newItems.reduce((total, item) => {
        const quizScoreSum = item.quizItemList.reduce((sum, el) => {
          return sum + (Number(el.score) || 0); // score를 숫자로 변환해서 합산
        }, 0);
        return total + quizScoreSum;
      }, 0);

      // score 합계를 상태에 업데이트
      setTotalEqualScore && setTotalEqualScore(totalScore);

      return newItems; // 상태에 업데이트할 새로운 데이터 반환
    });
  };

  //문항리스트가 변경됐을때 배점 수정
  // useEffect(() => {
  //   // score의 합계 계산
  //   const totalScore = initialItems.reduce((total, item) => {
  //     const quizScoreSum = item.quizItemList.reduce((sum, el) => {
  //       return sum + (Number(el.score) || 0); // score를 숫자로 변환해서 합산
  //     }, 0);
  //     return total + quizScoreSum;
  //   }, 0);

  //   // score 합계를 상태에 업데이트
  //   setTotalEqualScore && setTotalEqualScore(totalScore);
  // }, [initialItems]);

  // 균등배점 모달 닫기
  const closeEqualScoreSettingModal = () => {
    setIsEqualScoreModal(false);
  };
  //균등배점 취소
  const cancelEqualScoreSettingModal = () => {
    closeEqualScoreSettingModal();
    setEqualScore(null);
    setEqualTotalValue('0');
    setRemainderContent(0);
    setNextRemainderContent(0);
    setQuotient(0);
    setMinQuotient(0);
    setMaxQuotient(0);
  };
  //console.log('initialItems', initialItems);
  //console.log('totalEqualScore', totalEqualScore);
  //console.log('equalTotalValue', equalTotalValue);

  //선택안함 했을때
  const noEqualScoreSetting = () => {
    //문항 번호 정해주기기
    let globalQuestionNumber = 1; // 전역적으로 사용할 번호 변수

    const updatedQuizList = initialItems.map((quiz) => ({
      ...quiz,
      quizItemList: quiz.quizItemList.map((quizItem) => {
        if (quizItem.type === 'QUESTION') {
          return {
            ...quizItem,
            num: globalQuestionNumber++, // QUESTION 항목에만 번호 할당
          };
        }
        return quizItem;
      }),
    }));
    setInitialItems(updatedQuizList);
    setEqualTotalValue('0');
    setTotalEqualScore(0);
  };

  //균등 배점 Modal
  const openEqualScoreSettingModal = () => {
    const questionTypeCount = initialItems.reduce((totalCount, item) => {
      const questionCount = item.quizItemList.filter(
        (quizItem) => quizItem.type === 'QUESTION',
      ).length;

      return totalCount + questionCount;
    }, 0);
    //총 문항수 가져오기기
    setReceivedQuizCount(questionTypeCount);

    //문항 번호 정해주기기
    let globalQuestionNumber = 1; // 전역적으로 사용할 번호 변수

    const updatedQuizList = initialItems.map((quiz) => ({
      ...quiz,
      quizItemList: quiz.quizItemList.map((quizItem) => {
        if (quizItem.type === 'QUESTION') {
          return {
            ...quizItem,
            num: globalQuestionNumber++, // QUESTION 항목에만 번호 할당
          };
        }
        return quizItem;
      }),
    }));
    setInitialItems(updatedQuizList);

    //알람 열기기
    setIsAlert(true);
  };

  //문항 배점 설정 함수
  const selectEqualScore = (newValue: number | null) => {
    if (newValue === null) {
      setRemainderContent(0);
      setNextRemainderContent(0);
      setQuotient(0);
      setMinQuotient(0);
      setMaxQuotient(0);
    }
    setEqualScore(newValue);
  };

  //배점 인풋 설정 함수
  const changeEqualInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let equalTotalValue = e.target.value;
    // 정규표현식을 사용하여 숫자 이외의 문자 제거
    equalTotalValue = equalTotalValue.replace(/[^0-9]/g, '');

    const parsedValue = parseInt(equalTotalValue, 10);

    setEqualTotalValue(parsedValue >= 200 ? '200' : equalTotalValue);
  };

  //배점 저장 함수
  const saveEqualInputValue = () => {
    //받아온 문항 수 넘버타입 변경
    const parsedreceivedQuiz = receivedQuizCount?.toString();
    //받아온 문항 수 넘버타입 변경
    const parsedreceivedQuizValue = parseInt(parsedreceivedQuiz as string, 10);
    //총 배점 타입 변경
    const parsedValue = parseInt(equalTotalValue, 10);

    //선택된 문항 수
    if (equalTotalValue === '') {
      openToastifyAlert({
        type: 'error',
        text: '총 배점을 입력해주세요.',
      });
      setIsSaveEqualValue(false);
      setEqualTotalValue('0');
      setQuotient(0);
    } else if (
      !receivedQuizCount &&
      !parsedreceivedQuizValue &&
      equalTotalValue
    ) {
      openToastifyAlert({
        type: 'error',
        text: '총 배점은 총 문항수보다 크거나 같아야합니다.',
      });
      //setEqualTotlaValue(questionNumValue.toString());
      setIsSaveEqualValue(false);
    } else if (equalTotalValue && parsedValue < parsedreceivedQuizValue) {
      openToastifyAlert({
        type: 'error',
        text: '총 배점은 총 문항수보다 크거나 같아야합니다.',
      });
      if (receivedQuizCount) {
        setEqualTotalValue(receivedQuizCount.toString());
      }
      setIsSaveEqualValue(false);
    } else {
      openToastifyAlert({
        type: 'success',
        text: '저장되었습니다.',
      });
      setEqualTotalValue(equalTotalValue);
      setIsSaveEqualValue(true);
    }
  };

  //몇번부터 몇번까지 몇점 이후 몇점 설정값
  useEffect(() => {
    const parsedValue = parseInt(equalTotalValue, 10);
    //const questionNumValue = parseInt(receivedQuizCount, 10);
    //console.log('parsedValue', parsedValue);
    //console.log('receivedQuizCount', receivedQuizCount);
    //console.log('isSaveEqualValue', isSaveEqualValue);
    if (isSaveEqualValue && receivedQuizCount) {
      const quotient = Math.floor(parsedValue / receivedQuizCount);
      const remainder = parsedValue % receivedQuizCount;
      //console.log('quotient', quotient);
      //console.log('remainder', remainder);
      setQuotient(quotient);
      setRemainder(remainder);
      if (quotient || remainder) {
        const remainderContent = receivedQuizCount - remainder;
        const minQuotient = quotient - 1;
        const maxQuotient = quotient + 1;
        //console.log('remainderContent', remainderContent);
        //console.log('minQuotient', minQuotient);
        //console.log('maxQuotient', maxQuotient);
        setRemainderContent(remainderContent);
        setNextRemainderContent(remainderContent + 1);
        setMinQuotient(minQuotient <= 0 ? 1 : minQuotient);
        setMaxQuotient(maxQuotient);
      }
    }
  }, [isSaveEqualValue, equalTotalValue, receivedQuizCount]);

  const renderScoreButtons = () => {
    const buttonOption = [
      { value: 1, label: '선택안함' },
      { value: 2, label: '균등 배점' },
    ];

    return buttonOption.map((button, i) => (
      <ButtonWrapper key={i}>
        <Button
          key={button.value}
          buttonType="button"
          onClick={() => {
            selectEqualScore(button.value);
            if (button.value === 1) {
              noEqualScoreSetting();
            }
            if (button.value === 2) {
              openEqualScoreSettingModal();
            }
          }}
          $padding="10px"
          height={'34px'}
          width={'100%'}
          fontSize="14px"
          $normal={equalScore !== button.value}
          $filled={equalScore === button.value}
          disabled={isAlert}
        >
          <span>{button.label}</span>
        </Button>
      </ButtonWrapper>
    ));
  };

  console.log('initialItems:', initialItems);
  //Step3로 이동하는 함수
  const moveStep3 = () => {
    console.log('initialItems:', initialItems);
    const createdItems = createNewItems(initialItems);
    const editedItems = createEditingItems(initialItems);
    console.log('createdItems:', createdItems);
    console.log('editedItems:', editedItems);
    const data = {
      data: isEditWorkbook ? initialItems : createdItems,
      isEditWorkbook: isEditWorkbook,
      workSheetIdx: workbookIdx,
      title: nameValue,
      examiner: contentAuthor,
      grade: gradeValue,
      tag: tag,
      color: color,
      type: type,
      multiLevel: multiLevel,
      assign: assign,
      isDate: isDate,
      isQuizType: isQuizType,
      itemType: itemType,
    };
    const quotientData = {
      equalScore: equalScore,
      equalTotalValue: equalTotalValue,
      maxQuotient: maxQuotient,
      minQuotient: minQuotient,
      nextRemainderContent: nextRemainderContent,
      quotient: quotient,
      remainderContent: remainderContent,
    };
    //totalEqualScore === Number(equalTotalValue)
    if (totalEqualScore !== Number(equalTotalValue)) {
      openToastifyAlert({
        type: 'error',
        text: '총 배점 합이 같아야 합니다.',
      });
    } else {
      if (equalScore !== null) {
        //window.opener.localStorage.clear();
        saveLocalData(data);
        //localStorage.setItem('sendQuotientData', JSON.stringify(quotientData));
        navigate('/content-create/exam/step3');
        setTotalEqualScore(0);
      } else {
        openToastifyAlert({
          type: 'error',
          text: '배점여부를 선택해야합니다.',
        });
      }
    }
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Container>
          <Wrapper>
            <TitleWrapper>
              <TitleIconWrapper>
                <IoIosArrowBack
                  style={{ fontSize: '24px', cursor: 'pointer' }}
                  onClick={goBackStep1}
                />
              </TitleIconWrapper>
              <Title>
                <Span style={{ paddingRight: '10px' }}>
                  <FrontSpan onClick={goBackStep1}>STEP 1 - </FrontSpan>
                  STEP 2
                </Span>
                학습지 상세 편집
              </Title>
            </TitleWrapper>
            <MainWrapper>
              <DiscriptionSection>
                {isSimilar ? (
                  <>
                    <SimilarCloseButtonWrapper>
                      <IoMdClose
                        onClick={() => {
                          setIsSimilar(false);
                          setSimilarItems(null);
                        }}
                        style={{ fontSize: '22px', cursor: 'pointer' }}
                      />
                    </SimilarCloseButtonWrapper>
                    <SimilarWrapper>
                      <SimilarTitleWrapper>
                        <SimilarTitle>
                          {initialItemIdx}번 유사 문항
                          <SimilarTitleSpan>
                            문항을 교체하거나, 추가할 수 있습니다.
                          </SimilarTitleSpan>
                        </SimilarTitle>
                        <SimilarIconWrapper>
                          <SimilarIcon onClick={clickPrevSimilarList}>
                            <PiArrowCounterClockwiseBold
                              style={{ fontSize: '22px' }}
                            />
                            이전 불러오기
                          </SimilarIcon>
                          <SimilarIcon onClick={clickNewSimilarList}>
                            <PiArrowClockwiseBold
                              style={{ fontSize: '22px' }}
                            />
                            새로 불러오기
                          </SimilarIcon>
                        </SimilarIconWrapper>
                      </SimilarTitleWrapper>
                      {!similarDataPending ? (
                        <>
                          {similarItems && similarItems?.quizList.length > 0 ? (
                            <SimilarContentsWrapper>
                              <AddNewContensWrapper>
                                {similarItems?.quizList.map((item, i) => {
                                  const quizCategoryType =
                                    item.quizCategoryList?.find(
                                      (quizCategoryItem: any) =>
                                        quizCategoryItem.quizCategory.문항타입,
                                    )?.quizCategory;
                                  const quizCategory =
                                    item.quizCategoryList?.find(
                                      (quizCategoryItem: any) =>
                                        quizCategoryItem.quizCategory.유형,
                                    )?.quizCategory;
                                  return (
                                    //<></>
                                    <MathviewerAccordion
                                      key={item.idx}
                                      componentWidth="650px"
                                      width="600px"
                                      componentHeight="150px"
                                      onClick={() => {}}
                                      isBorder={true}
                                      isNewQuiz={true}
                                      isSimilarQuiz={true}
                                      isFavorite={item.isFavorite}
                                      data={item}
                                      index={item.idx}
                                      //title={quizCategory?.유형 || 'N/A'}
                                      //category={quizCategoryType}
                                      quizNum={item.num}
                                      selectedCardIndex={selectedCardIndex}
                                      onSelectCard={setSelectedCardIndex}
                                      reportQuizitem={() =>
                                        openReportProcess(item.idx)
                                      }
                                      changeQuizitem={() =>
                                        clickSwapQuizItem(
                                          similarItems,
                                          i,
                                          initialItems,
                                          initialItemOrder as number,
                                        )
                                      }
                                      addQuizItem={() =>
                                        clickAddSimilarQuizItem(item.code)
                                      }
                                      favoriteQuizItem={(e) =>
                                        item.isFavorite
                                          ? handleFavorite(
                                              e,
                                              item.idx,
                                              true,
                                              item.type,
                                            )
                                          : handleFavorite(
                                              e,
                                              item.idx,
                                              false,
                                              item.type,
                                            )
                                      }
                                    ></MathviewerAccordion>
                                  );
                                })}
                              </AddNewContensWrapper>
                            </SimilarContentsWrapper>
                          ) : (
                            <ValueNone textOnly info="유사문항이 없습니다" />
                          )}
                        </>
                      ) : (
                        <>
                          <Loader width="50px" />
                        </>
                      )}
                    </SimilarWrapper>
                  </>
                ) : (
                  <>
                    <TabWrapper>
                      <TabMenu
                        length={4}
                        menu={menuList}
                        width={'500px'}
                        lineStyle
                        selected={tabView}
                        setTabView={setTabView}
                      />
                    </TabWrapper>
                    <DiscriptionWrapper>
                      {tabView === '학습지 요약' && (
                        <>
                          <Label value="문항 통계" fontSize="16px" />
                          <Discription>
                            <DiscriptionOutline>
                              <div>총 {initialItems.length} 문항</div>
                              <DiscriptionType>
                                객관식 {multipleType}
                              </DiscriptionType>
                              <DiscriptionType>
                                주관식 {subjectiveType}
                              </DiscriptionType>
                              <DiscriptionType>
                                서술형 {descriptiveType}
                              </DiscriptionType>
                            </DiscriptionOutline>
                            <BarChart data={levelRateData}></BarChart>
                          </Discription>
                          <Label
                            value="문항 상세 내용 및 순서 변경"
                            fontSize="16px"
                          />
                          <ContentsList>
                            <ListCategory>
                              <div className="number">번호</div>
                              <div className="type">문항타입</div>
                              <div className="level">난이도</div>
                              <div className="title">유형명</div>
                              <div className="icon">순서변경</div>
                            </ListCategory>
                            <StepDnDWrapper
                              dragList={initialItems}
                              onDragging={() => {}}
                              onDragEnd={whenDragEnd}
                              dragSectionName={'학습지요약'}
                              doubleDnD
                              isStartDnD={isStartDnD}
                              setIsStartDnd={setIsStartDnd}
                            >
                              {(dragItem, ref, isDragging, itemIndex) => {
                                // dragItem과 그 속성들을 안전하게 접근하기 위해 옵셔널 체이닝 사용
                                const quizCategoryType =
                                  dragItem.quizCategoryList.find(
                                    (quizCategoryItem: any) =>
                                      quizCategoryItem.quizCategory.문항타입,
                                  )?.quizCategory;
                                const quizCategory =
                                  dragItem.quizCategoryList.find(
                                    (quizCategoryItem: any) =>
                                      quizCategoryItem.quizCategory.유형,
                                  )?.quizCategory;

                                return (
                                  <li
                                    ref={ref}
                                    className={`${isDragging ? 'opacity' : ''}`}
                                  >
                                    <Content
                                      onClick={(e) => {
                                        handleButtonCheck(e);
                                      }}
                                    >
                                      <div className="number">
                                        {itemIndex + 1}
                                      </div>
                                      <div className="type">
                                        {quizCategoryType?.문항타입 || 'N/A'}
                                        {/* 값이 없으면 'N/A' 출력 */}
                                      </div>
                                      <div className="level">
                                        {quizCategoryType?.난이도 || 'N/A'}
                                        {/* 값이 없으면 'N/A' 출력 */}
                                      </div>
                                      <div className="title">
                                        {/* {quizCategory?.유형.split('^^^')[0] ||
                                          'N/A'} */}
                                        {quizCategory?.유형[0].name || 'N/A'}
                                        {/* 값이 없으면 'N/A' 출력 */}
                                      </div>
                                      <div className="icon">
                                        <IoMenuOutline
                                          style={{ cursor: 'grab' }}
                                        />
                                      </div>
                                    </Content>
                                  </li>
                                );
                              }}
                            </StepDnDWrapper>
                          </ContentsList>
                        </>
                      )}
                      {tabView === '새 문항 추가' && (
                        <>
                          <AddNewContentOption>
                            <AddNewContentIcon onClick={openRangeSetting}>
                              <RiListSettingsLine
                                style={{ fontSize: '22px' }}
                              />
                              범위 변경
                            </AddNewContentIcon>
                            <AddNewContentIcon onClick={clickPrevNewQuizList}>
                              <PiArrowCounterClockwiseBold
                                style={{ fontSize: '22px' }}
                              />
                              이전 불러오기
                            </AddNewContentIcon>
                            <AddNewContentIcon onClick={clickGetNewQuiz}>
                              <PiArrowClockwiseBold
                                style={{ fontSize: '22px' }}
                              />
                              새로 불러오기
                            </AddNewContentIcon>
                            {/* <Button
                              buttonType="button"
                              onClick={clickAddAllQuizItem}
                              $padding="10px"
                              height={'30px'}
                              width={'100px'}
                              fontSize="13px"
                              $filled
                              cursor
                            >
                              <span>+ 전체 추가</span>
                            </Button> */}
                          </AddNewContentOption>
                          {!postNewQuizDataPending ? (
                            <>
                              {isRangeSetting ? (
                                <AddNewContensWrapper>
                                  <CategoryWrapper>
                                    <CategoryTitleWrapper>
                                      <div>범위변경</div>
                                      <IconWrapper>
                                        <IoMdClose
                                          style={{ cursor: 'pointer' }}
                                          onClick={closeRangeSetting}
                                        />
                                      </IconWrapper>
                                    </CategoryTitleWrapper>

                                    <UnitClassifications>
                                      {unitClassificationList.length > 0 ? (
                                        <>
                                          <p className="info">
                                            교과정보는 최대 5개 까지 저장
                                            가능합니다
                                          </p>
                                          {unitClassificationList.map(
                                            (el, idx) => (
                                              <IconButtonWrapper
                                                key={`${el} ${idx}`}
                                              >
                                                <IconButton
                                                  width={`calc(100% - 25px)`}
                                                  fontSize="14px"
                                                  height="35px"
                                                  textAlign="left"
                                                  $padding="0 50px 0 10px"
                                                  onClick={() =>
                                                    changeUnitClassification(
                                                      idx,
                                                    )
                                                  }
                                                >
                                                  <span>
                                                    {el
                                                      .filter(
                                                        (
                                                          item,
                                                        ): item is RadioStateType =>
                                                          'title' in item,
                                                      )
                                                      .map(
                                                        (item) =>
                                                          `${item.title} / `,
                                                      )}
                                                  </span>
                                                </IconButton>

                                                <Icon
                                                  onClick={() =>
                                                    deleteUnitClassification(
                                                      idx,
                                                    )
                                                  }
                                                  $margin={'0 0 0 2px'}
                                                  width={`15px`}
                                                  src={`/images/icon/icoclose.svg`}
                                                />
                                              </IconButtonWrapper>
                                            ),
                                          )}
                                        </>
                                      ) : (
                                        <p className="info">
                                          교과정보는 최대 5개 까지 저장
                                          가능합니다
                                        </p>
                                      )}
                                    </UnitClassifications>

                                    {/* 교육과정 라디오 버튼 부분 */}
                                    {selectedList.map((list, index) => {
                                      if (list.search) {
                                        return (
                                          <div
                                            className={`${list.idx + 1}depth`}
                                            id={list.name}
                                            key={`selected${list.idx + 1}depth ${list.name}`}
                                          >
                                            <ButtonFormatRadio
                                              branchValue={list.name}
                                              titleText={list.name}
                                              list={categoryList[index] || []}
                                              selected={
                                                selectedList.find(
                                                  (item) =>
                                                    item.name === list.name,
                                                )?.selectedName || ''
                                              }
                                              onChange={(e) =>
                                                handleRadioCheck(e)
                                              }
                                              $margin={`5px 0 0 0`}
                                            />
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                    <p className="line"></p>

                                    {/* 교과정보 아코디언 리스트  */}
                                    {categoryList.length ===
                                      selectedList.length &&
                                    selectedList[selectedList.length - 1]
                                      .selectedName ? (
                                      <AccordionWrapper>
                                        <Accordion
                                          title={`${selectedList.flatMap((el) => el.selectedName).join('/')}`}
                                          id={`${selectedList.flatMap((el) => el.selectedName).join('/')}`}
                                        >
                                          <RowListWrapper>
                                            <Search
                                              height={'30px'}
                                              value={searchValue}
                                              onClick={(e) =>
                                                filterSearchValue(e)
                                              }
                                              onKeyDown={(e) =>
                                                filterSearchValueEnter(e)
                                              }
                                              onChange={(e) => {
                                                setSearchValue(e.target.value);
                                              }}
                                              placeholder="검색어를 입력해주세요.(두글자 이상)"
                                              maxLength={20}
                                            />
                                            {searchValue.length > 1 && (
                                              <p className="line bottom_text">
                                                {`총 
                                                                  ${
                                                                    categoryItemTreeData &&
                                                                    itemTree.length
                                                                      ? itemTree.reduce(
                                                                          (
                                                                            total,
                                                                            el,
                                                                          ) =>
                                                                            total +
                                                                            el.itemTreeList.filter(
                                                                              (
                                                                                item,
                                                                              ) =>
                                                                                item.name.includes(
                                                                                  searchValue,
                                                                                ),
                                                                            )
                                                                              .length,
                                                                          0,
                                                                        )
                                                                      : 0
                                                                  } 
                                                                  건`}
                                                <ArrowButtonWrapper>
                                                  <button
                                                    onClick={() =>
                                                      prevHighlight()
                                                    }
                                                  >
                                                    <IoMdArrowDropup />
                                                  </button>
                                                  <button
                                                    onClick={() =>
                                                      nextHighlight()
                                                    }
                                                  >
                                                    <IoMdArrowDropdown />
                                                  </button>
                                                </ArrowButtonWrapper>
                                              </p>
                                            )}
                                            {isPending && (
                                              <LoaderWrapper>
                                                <Loader width="50px" />
                                              </LoaderWrapper>
                                            )}
                                            {categoryItemTreeData ? (
                                              <AccordionItemWrapper>
                                                {itemTree.length ? (
                                                  <div
                                                    ref={contentRef}
                                                    className="content"
                                                  >
                                                    {searchValue.length > 0 ? (
                                                      <>
                                                        {itemTree.map((el) => (
                                                          <div
                                                            key={`${el.itemTreeKey}`}
                                                          >
                                                            {el.itemTreeList.map(
                                                              (item) => (
                                                                <DepthBlock
                                                                  branchValue={`${item.name}`}
                                                                  highlightText={
                                                                    highlightText
                                                                  }
                                                                  defaultChecked
                                                                  key={`depthList${item?.idx} ${item.name}`}
                                                                  classNameList={`depth-${item.level}`}
                                                                  id={item?.idx}
                                                                  name={
                                                                    item.name
                                                                  }
                                                                  value={
                                                                    item?.idx
                                                                  }
                                                                  level={
                                                                    item?.level
                                                                  }
                                                                  onChange={(
                                                                    e,
                                                                  ) =>
                                                                    handleSingleCheck(
                                                                      e.target
                                                                        .checked,
                                                                      item?.idx,
                                                                      item?.level,
                                                                    )
                                                                  }
                                                                  checked={
                                                                    checkedDepthList.includes(
                                                                      item?.idx,
                                                                    )
                                                                      ? true
                                                                      : false
                                                                  }
                                                                  searchValue={
                                                                    searchValue
                                                                  }
                                                                >
                                                                  <span>
                                                                    {highlightText(
                                                                      item.name,
                                                                      searchValue,
                                                                    )}
                                                                  </span>
                                                                </DepthBlock>
                                                              ),
                                                            )}
                                                          </div>
                                                        ))}
                                                      </>
                                                    ) : (
                                                      <>
                                                        {itemTree.map((el) => (
                                                          <div
                                                            key={`${el.itemTreeKey}`}
                                                          >
                                                            {el.itemTreeList.map(
                                                              (item) => (
                                                                <DepthBlock
                                                                  branchValue={`${item.name}`}
                                                                  defaultChecked
                                                                  key={`depthList${item?.idx} ${item.name}`}
                                                                  classNameList={`depth-${item.level}`}
                                                                  id={item?.idx}
                                                                  name={
                                                                    item.name
                                                                  }
                                                                  value={
                                                                    item?.idx
                                                                  }
                                                                  level={
                                                                    item?.level
                                                                  }
                                                                  onChange={(
                                                                    e,
                                                                  ) =>
                                                                    handleSingleCheck(
                                                                      e.target
                                                                        .checked,
                                                                      item?.idx,
                                                                      item?.level,
                                                                    )
                                                                  }
                                                                  checked={
                                                                    checkedDepthList.includes(
                                                                      item?.idx,
                                                                    )
                                                                      ? true
                                                                      : false
                                                                  }
                                                                  searchValue={
                                                                    searchValue
                                                                  }
                                                                >
                                                                  <span>
                                                                    {item.name}
                                                                  </span>
                                                                </DepthBlock>
                                                              ),
                                                            )}
                                                          </div>
                                                        ))}
                                                      </>
                                                    )}
                                                  </div>
                                                ) : (
                                                  <ValueNone
                                                    textOnly
                                                    info="등록된 데이터가 없습니다"
                                                  />
                                                )}
                                              </AccordionItemWrapper>
                                            ) : (
                                              <Loader />
                                            )}
                                          </RowListWrapper>
                                        </Accordion>
                                      </AccordionWrapper>
                                    ) : (
                                      <ValueNoneWrapper>
                                        <ValueNone
                                          textOnly
                                          info="교육과정, 학교급, 학년, 학기를 선택해주세요"
                                        />
                                      </ValueNoneWrapper>
                                    )}
                                    <SubmitButtonWrapper>
                                      <Button
                                        $filled
                                        disabled={addButtonBool}
                                        cursor
                                        $margin={'0 10px 0 0'}
                                        onClick={saveCheckItems}
                                      >
                                        교과정보 추가
                                      </Button>
                                    </SubmitButtonWrapper>
                                  </CategoryWrapper>
                                </AddNewContensWrapper>
                              ) : (
                                <AddNewContensWrapper>
                                  {newQuizItems &&
                                  newQuizItems?.quizList.length > 0 ? (
                                    <>
                                      {newQuizItems?.quizList.map((item, i) => {
                                        const quizCategoryType =
                                          item.quizCategoryList.find(
                                            (quizCategoryItem: any) =>
                                              quizCategoryItem.quizCategory
                                                .문항타입,
                                          )?.quizCategory;
                                        const quizCategory =
                                          item.quizCategoryList.find(
                                            (quizCategoryItem: any) =>
                                              quizCategoryItem.quizCategory
                                                .유형,
                                          )?.quizCategory;
                                        return (
                                          <MathviewerAccordion
                                            key={item.idx}
                                            componentWidth="650px"
                                            width="600px"
                                            componentHeight="150px"
                                            onClick={() => {}}
                                            isBorder={true}
                                            isNewQuiz={true}
                                            isFavorite={item.isFavorite}
                                            data={item}
                                            index={item.idx}
                                            // title={
                                            //   quizCategory?.유형 || 'N/A'
                                            // }
                                            category={quizCategoryType}
                                            quizNum={item.num}
                                            selectedCardIndex={
                                              selectedCardIndex
                                            }
                                            onSelectCard={setSelectedCardIndex}
                                            reportQuizitem={() =>
                                              openReportProcess(item.idx)
                                            }
                                            addQuizItem={() =>
                                              clickAddNewQuizItem(item.code)
                                            }
                                            favoriteQuizItem={(e) =>
                                              item.isFavorite
                                                ? handleFavorite(
                                                    e,
                                                    item.idx,
                                                    true,
                                                    item.type,
                                                  )
                                                : handleFavorite(
                                                    e,
                                                    item.idx,
                                                    false,
                                                    item.type,
                                                  )
                                            }
                                          ></MathviewerAccordion>
                                        );
                                      })}
                                    </>
                                  ) : (
                                    <ValueNone
                                      textOnly
                                      info="등록된 문항이 없습니다"
                                    />
                                  )}
                                </AddNewContensWrapper>
                              )}
                            </>
                          ) : (
                            <>
                              <Loader width="50px" />
                            </>
                          )}
                        </>
                      )}
                      {tabView === '즐겨찾는 문항' && (
                        <>
                          {favoriteQuizData && favoriteQuestionList ? (
                            <>
                              <BookmarkContentOption>
                                <SelectWrapper>
                                  {bookmarkSelectCategory.map((el) => (
                                    <Select
                                      width={'250px'}
                                      defaultValue={el.name}
                                      key={el.name}
                                      options={el.options}
                                      onSelect={(event) =>
                                        selectListCategoryOption(
                                          event,
                                          Number(el.idx),
                                        )
                                      }
                                    />
                                  ))}
                                </SelectWrapper>
                                <BookmarkContentCheckWrapper>
                                  <CheckBox
                                    $margin={`0 0 5px 0`}
                                    isChecked={isPriorityQuiz}
                                    onClick={selectPriorityQuiz}
                                  />
                                  <Label
                                    onClick={selectPriorityQuiz}
                                    value="내 문항 우선 추천"
                                    fontSize="16px"
                                    width="140px"
                                    cursor
                                  />
                                </BookmarkContentCheckWrapper>
                                {/* <Button
                                  buttonType="button"
                                  onClick={clickAddAllQuizItem}
                                  $padding="10px"
                                  height={'30px'}
                                  width={'100px'}
                                  fontSize="13px"
                                  $filled
                                  cursor
                                >
                                  <span>+ 전체 추가</span>
                                </Button> */}
                              </BookmarkContentOption>
                              <BookmarkContensWrapper>
                                {favoriteQuestionList.quizList &&
                                  favoriteQuestionList.quizList.map((item) => {
                                    const quizCategoryType =
                                      item.quizCategoryList.find(
                                        (quizCategoryItem: any) =>
                                          quizCategoryItem.quizCategory
                                            .문항타입,
                                      )?.quizCategory;
                                    const quizCategory =
                                      item.quizCategoryList.find(
                                        (quizCategoryItem: any) =>
                                          quizCategoryItem.quizCategory.유형,
                                      )?.quizCategory;
                                    return (
                                      <MathviewerAccordion
                                        key={item.idx}
                                        componentWidth="650px"
                                        width="600px"
                                        componentHeight="150px"
                                        onClick={() => {}}
                                        isBorder={true}
                                        isNewQuiz={true}
                                        data={item}
                                        index={item.idx}
                                        title={
                                          quizCategory?.유형?.[0].name || 'N/A'
                                        }
                                        category={quizCategoryType}
                                        quizNum={item.num}
                                        isFavorite={item.isFavorite}
                                        selectedCardIndex={selectedCardIndex}
                                        onSelectCard={setSelectedCardIndex}
                                        reportQuizitem={() =>
                                          openReportProcess(item.idx)
                                        }
                                        addQuizItem={() =>
                                          clickAddFavoriteQuizItem(item.code)
                                        }
                                        favoriteQuizItem={(e) =>
                                          item.isFavorite
                                            ? handleFavorite(
                                                e,
                                                item.idx,
                                                true,
                                                item.type,
                                              )
                                            : handleFavorite(
                                                e,
                                                item.idx,
                                                false,
                                                item.type,
                                              )
                                        }
                                      ></MathviewerAccordion>
                                    );
                                  })}
                              </BookmarkContensWrapper>
                            </>
                          ) : (
                            <BookmarkContensEmptyWrapper>
                              <BookmarkContensEmptyDiscription>
                                즐겨 찾기에 추가된 문항이 없습니다.
                              </BookmarkContensEmptyDiscription>
                              <BookmarkContensEmptyDiscription>
                                마음에 드는 문항을 저장하여 학습지나 교재를
                              </BookmarkContensEmptyDiscription>
                              <BookmarkContensEmptyDiscription>
                                만들 때 활용하세요.
                              </BookmarkContensEmptyDiscription>
                            </BookmarkContensEmptyWrapper>
                          )}
                        </>
                      )}
                      {tabView === '개념' && (
                        <>
                          <ConceptWrapper>
                            <ConceptDiscription>
                              준비중인 기능입니다...
                            </ConceptDiscription>
                          </ConceptWrapper>
                        </>
                      )}
                    </DiscriptionWrapper>
                  </>
                )}
              </DiscriptionSection>
              <ContentListSection>
                {isWorkbookLoading && (
                  <LoaderWrapper>
                    <Loader width="50px" />
                  </LoaderWrapper>
                )}
                {!isWorkbookLoading && (
                  <>
                    {initialItems.length > 0 ? (
                      <>
                        <ListFilter>
                          <Label
                            value={`선택한 문항 목록 (총 ${initialItems.length} 문항)`}
                            fontSize="16px"
                          />
                          {/* 사용자정렬 */}
                          <SelectWrapper>
                            {selectArrange.map((el) => (
                              <Select
                                width={'150px'}
                                isnormalizedOptions
                                key={`${el.idx} - ${el.name}`}
                                defaultValue={el.name}
                                options={el.options}
                                onSelect={(event) =>
                                  selectListCategoryOption(
                                    event,
                                    Number(el.idx),
                                  )
                                }
                                blackMode
                              ></Select>
                            ))}
                            {selectCategory.map((el) => (
                              <Select
                                width={'150px'}
                                isnormalizedOptions
                                key={`${el.idx} - ${el.name}`}
                                defaultValue={el.name}
                                options={el.options}
                                onSelect={(event) =>
                                  selectListCategoryOption(event, el.idx)
                                }
                                blackMode
                              ></Select>
                            ))}
                          </SelectWrapper>
                        </ListFilter>
                        <ContentListWrapper>
                          <StepDnDWrapper
                            dragList={initialItems}
                            onDragging={() => {}}
                            onDragEnd={whenDragEnd}
                            dragSectionName={'선택한 문항 목록'}
                            doubleDnD
                            isStartDnD={isStartDnD}
                            setIsStartDnd={setIsStartDnd}
                            quotient={quotient as number}
                          >
                            {(
                              dragItem,
                              ref,
                              isDragging,
                              itemIndex,
                              quotient,
                            ) => {
                              const quizCategoryType =
                                dragItem.quizCategoryList.find(
                                  (quizCategoryItem: any) =>
                                    quizCategoryItem.quizCategory.문항타입,
                                )?.quizCategory;
                              const quizCategory =
                                dragItem.quizCategoryList.find(
                                  (quizCategoryItem: any) =>
                                    quizCategoryItem.quizCategory.유형,
                                )?.quizCategory;
                              return (
                                <li
                                  ref={ref}
                                  className={`${isDragging ? 'opacity' : ''}`}
                                >
                                  <MathviewerAccordionStep2
                                    componentWidth="750px"
                                    width="720px"
                                    onClick={showSimilarContent}
                                    viewerOption={defaultValues[1]}
                                    isSimilar={isSimilar}
                                    isFavorite={dragItem.isFavorite}
                                    data={dragItem}
                                    itemIndex={itemIndex}
                                    quizNum={
                                      dragItem.quizItemList
                                        .filter(
                                          (el: any) => el.type === 'QUESTION',
                                        ) // type이 QUESTION인 항목만 필터링
                                        .map((el: any) => el.num) // num 값만 추출
                                    }
                                    title={quizCategory?.유형[0].name || 'N/A'}
                                    index={dragItem.idx}
                                    selectedCardIndex={selectedCardIndex}
                                    onSelectCard={setSelectedCardIndex}
                                    reportQuizitem={openReportProcess}
                                    deleteQuizItem={deleteQuizItem}
                                    // clickSwapQuizItem={() =>
                                    //   clickSwapQuizItem(
                                    //     similarItems as SimilarQuizList,
                                    //     itemIndex,
                                    //     initialItems,
                                    //     similarItemIndex as number,
                                    //   )
                                    // }
                                    code={dragItem.quizItemList
                                      .filter(
                                        (el: any) => el.type === 'QUESTION',
                                      ) // type이 QUESTION인 항목만 필터링
                                      .map((el: any) => el.code)}
                                    quotient={
                                      dragItem.quizItemList
                                        .filter(
                                          (el: any) => el.type === 'QUESTION',
                                        ) // type이 QUESTION인 항목만 필터링
                                        .map((el: any) => el.score) // score 값만 추출
                                    }
                                    equalScore={equalScore as number}
                                    remainderContent={remainderContent}
                                    nextRemainderContent={nextRemainderContent}
                                    setTotalEqualScore={setTotalEqualScore}
                                    category={quizCategoryType}
                                    favoriteQuizItem={handleFavorite}
                                    quotientOption={quotientOption}
                                    initialItems={initialItems}
                                    setInitialItems={setInitialItems}
                                  ></MathviewerAccordionStep2>
                                </li>
                              );
                            }}
                          </StepDnDWrapper>
                        </ContentListWrapper>
                      </>
                    ) : (
                      <>
                        <ValueNone info="데이터가 없습니다" />
                      </>
                    )}
                  </>
                )}
              </ContentListSection>
            </MainWrapper>
            <NextStepButtonWrapper>
              {totalEqualScore !== 0 && equalTotalValue !== '0' && (
                <>
                  {totalEqualScore !== Number(equalTotalValue) ? (
                    <p>
                      총 배점: <ErrorSpan>{totalEqualScore}점</ErrorSpan>/
                      <Span>{equalTotalValue}점</Span>
                    </p>
                  ) : (
                    <p>
                      총 배점: <Span>{totalEqualScore}점</Span>/
                      <Span>{equalTotalValue}점</Span>
                    </p>
                  )}
                </>
              )}
              {/* <Button
              buttonType="button"
              onClick={() => {}}
              $padding="10px"
              height={'35px'}
              width={'100px'}
              fontSize="13px"
              $normal
              cursor
            >
              <span>임시저장</span>
            </Button> */}
              <>{renderScoreButtons()}</>
              <Button
                buttonType="button"
                onClick={moveStep3}
                $padding="10px"
                height={'35px'}
                width={'100px'}
                fontSize="13px"
                $filled
                cursor
              >
                <span>다음 단계</span>
              </Button>
            </NextStepButtonWrapper>
          </Wrapper>
        </Container>
      </DndProvider>
      <Alert
        top="calc(50% - 100px)"
        isAlertOpen={isAlert}
        description="균등 배점 진행 하시겠습니까?"
        subDescription="이후 문항이 추가되면 배점은 초기화 됩니다"
        action="진행"
        isWarning={true}
        onClick={() => {
          setIsEqualScoreModal(true);
          setIsAlert(false);
        }}
        onClose={() => {
          setIsAlert(false);
          selectEqualScore(null);
          setTotalEqualScore(0);
          setEqualTotalValue('0');
        }}
      />
      {isEqualScoreModal && (
        <Overlay>
          <EqualScoreModalContainer>
            <EqualScoreModalWrapper>
              <EqualScoreModalTitleWrapper>
                <Label
                  value={`총 ${receivedQuizCount} 문항`}
                  fontSize="25px"
                  width="160px"
                />
                <EqualScoreModalOptionWrapper>
                  <Label value="총 배점" fontSize="25px" width="89px" />
                  <Input
                    width="50px"
                    height="34px"
                    border="black"
                    placeholderSize="16px"
                    padding="10px"
                    fontSize="16px"
                    type="text"
                    value={equalTotalValue}
                    maxLength={10}
                    minLength={2}
                    onClick={() => {
                      setEqualTotalValue('');
                      setIsSaveEqualValue(false);
                      setRemainderContent(0);
                      setNextRemainderContent(0);
                    }}
                    onChange={(e) => {
                      changeEqualInputValue(e);
                    }}
                  ></Input>
                  <Button
                    buttonType="button"
                    onClick={saveEqualInputValue}
                    $padding="10px"
                    height={'34px'}
                    width={'100px'}
                    fontSize="13px"
                    $filled
                    cursor
                  >
                    <span>저장</span>
                  </Button>
                </EqualScoreModalOptionWrapper>
              </EqualScoreModalTitleWrapper>
              <EqualScoreModalScript>
                {remainder === 0 || (remainder === null && isSaveEqualValue) ? (
                  <>
                    {/* 나머지가 없는경우 */}
                    <div>
                      01번 문항부터
                      {receivedQuizCount}번 문항까지
                      {quotient || 0}점
                    </div>
                    {isSaveEqualValue ? (
                      <div className="pointsPerQuestion">
                        문항당 배점 {minQuotient}점 ~ {quotient + 1}점
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <>
                    {/* 나머지가 있는경우 */}
                    <div>
                      01번 문항부터
                      {remainderContent}번 문항까지 {quotient || 0}점
                    </div>
                    <div>
                      {nextRemainderContent}번 문항부터 {maxQuotient}점
                    </div>
                    {isSaveEqualValue ? (
                      <div className="pointsPerQuestion">
                        문항당 배점 {minQuotient}점 ~ {maxQuotient}점
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </EqualScoreModalScript>
              <EqualScoreModalButtonWrapper>
                <Button
                  buttonType="button"
                  onClick={cancelEqualScoreSettingModal}
                  $padding="10px"
                  height={'100%'}
                  width={'100%'}
                  fontSize="13px"
                  $normal
                  cursor
                >
                  <span>취소</span>
                </Button>
                <Button
                  buttonType="button"
                  onClick={saveEqualScoreSettingModal}
                  $padding="10px"
                  height={'100%'}
                  width={'100%'}
                  fontSize="13px"
                  $filled
                  cursor
                >
                  <span>확인</span>
                </Button>
              </EqualScoreModalButtonWrapper>
            </EqualScoreModalWrapper>
          </EqualScoreModalContainer>
        </Overlay>
      )}

      <Modal />
    </>
  );
}

const Container = styled.div``;
const TitleWrapper = styled.div`
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;
const TitleIconWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  font-size: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1 0 0;
  padding-left: 10px;
`;
const FrontSpan = styled.span`
  color: ${COLOR.SPAN_LIGHT_BLUE};
  font-size: 20px;
  cursor: pointer;
`;
const Span = styled.span`
  color: ${COLOR.SPAN_BlUE};
`;
const ErrorSpan = styled.span`
  color: ${COLOR.ERROR};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const MainWrapper = styled.div`
  min-height: 750px;
  display: flex;
  gap: 20px;
`;
//왼쪽 section 공용
const DiscriptionSection = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${COLOR.BORDER_POPUP};
  border-radius: 25px;
`;
const TabWrapper = styled.div`
  width: 100%;
  padding: 10px 0px;
`;
//학습지 요약
const DiscriptionWrapper = styled.div`
  width: 100%;
  height: 680px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0px 20px;
`;
const Discription = styled.div`
  display: flex;
  justify-content: space-between;
  //gap: 100px;
  padding: 10px 20px;
`;
const DiscriptionOutline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  //padding-right: 30px;
`;
const DiscriptionType = styled.div`
  padding-top: 10px;
  font-size: 14px;
  color: ${COLOR.TEXT_GRAY};
`;
const ArrowButtonWrapper = styled.span`
  padding: 0 10px;
  > button {
    cursor: pointer;
    padding: 4px;
    background-color: transparent;
    border: none;
  }
`;
//유사문항
const SimilarCloseButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  padding-right: 20px;
`;
const SimilarWrapper = styled.div`
  width: 100%;
  height: 708px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0px 20px;
`;
const SimilarTitleWrapper = styled.div`
  padding: 0 0 20px 0;
`;
const SimilarTitle = styled.div``;
const SimilarTitleSpan = styled.span`
  font-size: 12px;
  padding-left: 10px;
  color: ${COLOR.BORDER_BLUE};
`;
const SimilarIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 20px;
  gap: 20px;
`;
const SimilarIcon = styled.div`
  display: flex;
  gap: 5px;
  cursor: pointer;
`;
const SimilarContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  overflow-y: auto;
`;
//새 문항 추가
const AddNewContentOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
  padding: 10px 0;
`;
const AddNewContentIcon = styled.div`
  display: flex;
  gap: 5px;
  cursor: pointer;
`;
const AddNewContensWrapper = styled.div`
  height: 620px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  overflow-y: auto;
`;
const CategoryWrapper = styled.div`
  width: 100%;
  border-top: 1px solid ${COLOR.BORDER_BLUE};
  padding: 10px;
`;
const IconWrapper = styled.div`
  .icon_button {
    padding: 5px;
    border: none;
    font-size: 13px;
    font-weight: bold;
    color: ${COLOR.SECONDARY};
    background-color: transparent;
    cursor: pointer;
    color: ${COLOR.PRIMARY};
  }
`;
const IconButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  img {
    opacity: 0.5;
    cursor: pointer;
  }
`;
const UnitClassifications = styled.div`
  padding: 10px 20px;
  gap: 5px;
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.IS_HAVE_DATA};
  .info {
    color: ${COLOR.SECONDARY};
    font-size: 14px;
  }
`;
const CategoryTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const AccordionWrapper = styled.div`
  margin: 10px;
`;
const RowListWrapper = styled.div`
  padding: 10px;
`;
const ValueNoneWrapper = styled.div`
  display: flex;
`;
const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const AccordionItemWrapper = styled.div`
  overflow-y: auto;
  max-height: 250px;
`;
const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
//즐겨찾는 문항
const BookmarkContentOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 25px;
  padding: 10px 0;
`;
const BookmarkContentCheckWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const BookmarkContensWrapper = styled.div`
  height: 620px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  overflow-y: auto;
`;
const BookmarkContensEmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const BookmarkContensEmptyDiscription = styled.div`
  width: 400px;
  display: flex;
  align-items: flex-start;
`;
//개념
const ConceptWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ConceptDiscription = styled.div`
  display: flex;
  align-items: center;
`;
//오른쪽 section
const ContentListSection = styled.div`
  flex: 1 0 10%;
  border-radius: 25px;
  padding: 10px;
  background-color: black;
`;
const ContentListWrapper = styled.div`
  height: 683px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  overflow-y: auto;
`;
const ContentsList = styled.div`
  padding: 10px 20px;
  height: 450px;
  overflow-y: auto;
`;
const ListCategory = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 16px;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  padding: 10px 0;

  .number {
    display: flex;
    justify-content: center;
    width: 40px;
  }
  .type {
    display: flex;
    justify-content: center;
    width: 70px;
  }
  .level {
    display: flex;
    justify-content: center;
    width: 50px;
  }
  .title {
    display: flex;
    justify-content: center;
    width: 200px;
  }
  .icon {
    display: flex;
    justify-content: center;
    width: 70px;
  }
`;
const Content = styled.div<{ $isSelected?: boolean }>`
  font-size: 14px;
  display: flex;
  justify-content: space-around;
  gap: 10px;
  border-bottom: 1px solid gray;
  padding: 10px 0;
  .number {
    display: flex;
    justify-content: center;
    width: 40px;
  }
  .type {
    display: flex;
    justify-content: center;
    width: 70px;
  }
  .level {
    display: flex;
    justify-content: center;
    width: 50px;
  }
  .title {
    display: flex;
    justify-content: center;
    width: 200px;
  }
  .icon {
    display: flex;
    justify-content: center;
    width: 70px;
  }

  &.dragging {
    transition: transform 0.3s ease-in-out;
    transform: translate(0, 0);
    background-color: ${({ $isSelected }) =>
      $isSelected ? `${COLOR.BORDER_BLUE}` : 'none'};
    color: ${({ $isSelected }) => ($isSelected ? 'white' : 'none')};
  }
`;
const ListFilter = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
  color: white;
  gap: 5px;
  padding-bottom: 10px;
`;
const SelectWrapper = styled.div`
  display: flex;
  gap: 5px;
`;
const NextStepButtonWrapper = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  p {
    display: flex;
    font-weight: bold;
  }
`;
const ButtonWrapper = styled.div`
  width: 200px;
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
//균등 배점 모달
const EqualScoreModalContainer = styled.div`
  width: 800px;
  height: 400px;
  background-color: white;
  border: 1px solid ${COLOR.BORDER_GRAY};
  border-radius: 10px;
  padding: 10px;
`;
const EqualScoreModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const EqualScoreModalTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 10px;
`;
const EqualScoreModalOptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const EqualScoreModalScript = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  div {
    font-size: 20px;
  }
  .pointsPerQuestion {
    padding-top: 20px;
  }
`;
const EqualScoreModalButtonWrapper = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: center;
  gap: 10px;
  padding-top: 10px;
`;
