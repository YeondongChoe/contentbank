import * as React from 'react';
import { useState, useRef, useEffect, useMemo } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IoMdClose, IoIosArrowBack } from 'react-icons/io';
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
} from '../..';
import { classificationInstance, quizService } from '../../../api/axios';
import { ReportProcessModal } from '../../../components/managements/ReportProcessModal';
import { useModal } from '../../../hooks';
import { contentQuotient, pageAtom } from '../../../store/utilAtom';
import {
  ItemCategoryType,
  ItemTreeListType,
  QuizListType,
} from '../../../types';
import {
  WorkbookData,
  WorkbookQuotientData,
  WorkbookCategoryData,
  FavoriteQuizList,
  QuizList,
  SimilarQuizList,
  Data,
  ContentNumQuotient,
} from '../../../types/WorkbookType';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { COLOR } from '../../constants';
interface RadioState {
  title: string;
  checkValue: number;
  code: string;
}

interface ContentItem {
  quizNum: number;
  value: string;
}

interface Option {
  idx: number;
  name: string;
  value: string;
}

interface SelectCategory {
  idx: number;
  name: string;
  value: string;
  options: Option[];
}

interface RadioStateType {
  title: string;
  checkValue: number;
  code: string;
  key: string;
  checkedDepthList?: number[];
}

interface ItemTreeIdxListType {
  itemTreeIdxList: number[];
}

type UnitClassificationType = RadioStateType | ItemTreeIdxListType;

export function Step2() {
  const [getLocalData, setGetLocalData] = useState<WorkbookData | null>(null);
  const [getQuotientLocalData, setGetQuotientLocalData] =
    useState<WorkbookQuotientData | null>(null);
  const [getCategoryLocalData, setGetCategoryLocalData] =
    useState<WorkbookCategoryData | null>(null);

  const [initialItems, setInitialItems] = useState<QuizList[]>(
    getLocalData?.data.quizList || [],
  );

  const categoryType = initialItems.map(
    (item) => item.quizCategoryList[0]?.quizCategory.문항타입,
  );
  const categoryLevel = initialItems.map(
    (item) => item.quizCategoryList[0]?.quizCategory.난이도,
  );
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

  const [contentNumQuotient, setContentNumQuotient] =
    useRecoilState<ContentNumQuotient[]>(contentQuotient);

  //나머지 시작 컨텐츠
  const [remainderContent, setRemainderContent] = useState<number>();
  //나머지 시작 전 컨텐츠
  const [nextRemainderContent, setNextRemainderContent] = useState<number>();
  //문항당 배점
  const [quotient, setQuotient] = useState<number>(0);
  const [minQuotient, setMinQuotient] = useState<number>();
  const [maxQuotient, setMaxQuotient] = useState<number>();
  const [equalScore, setEqualScore] = useState<number | null>(null);
  const [equalTotalValue, setEqualTotlaValue] = useState('0');
  //총 문항 점수
  const [totalEqualScore, setTotalEqualScore] = useState<number>(0);
  //console.log(totalEqualScore);
  //문제와 점수 관리
  const [contentWithScore, setContentWithScore] = useState<ContentItem[]>([]);
  useEffect(() => {
    setContentWithScore([]);
  }, []);

  useEffect(() => {
    if (getQuotientLocalData) {
      setEqualScore(getQuotientLocalData.equalScore);
      setEqualTotlaValue(getQuotientLocalData.equalTotalValue);
      setRemainderContent(getQuotientLocalData.remainderContent);
      setNextRemainderContent(getQuotientLocalData.nextRemainderContent);
      setQuotient(getQuotientLocalData.quotient);
      setMinQuotient(getQuotientLocalData.minQuotient);
      setMaxQuotient(getQuotientLocalData.maxQuotient);
    }
  }, [getQuotientLocalData]);

  // 로컬 스토리지에서 데이터 가져오기
  useEffect(() => {
    const fetchDataFromStorage = () => {
      const data = localStorage.getItem('sendData');
      const quotientData = localStorage.getItem('sendQuotientData');
      const categoryData = localStorage.getItem('sendCategoryData');
      if (data) {
        try {
          const parsedData = JSON.parse(data);
          const parsedQuotientData = JSON.parse(quotientData as string);
          const parsedCategoryData = JSON.parse(categoryData as string);
          setGetLocalData(parsedData);
          setGetQuotientLocalData(parsedQuotientData);
          setGetCategoryLocalData(parsedCategoryData);
        } catch (error) {
          console.error('로컬 스토리지 데이터 파싱 에러:', error);
        }
      } else {
        console.log('로컬 스토리지에 데이터가 없습니다.');
      }
    };

    fetchDataFromStorage();

    const retryTimeout = setTimeout(fetchDataFromStorage, 3000); // 3초 후에 다시 시도

    return () => clearTimeout(retryTimeout);
  }, []);

  // 로컬 스토리지 값 다 받은 뒤 초기화
  useEffect(() => {
    if (getLocalData) {
      //window.opener.localStorage.clear();
    }
  }, [getLocalData]);

  const [tabVeiw, setTabVeiw] = useState<string>('학습지 요약');
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

  //즐겨찾기
  const [page, setPage] = useRecoilState(pageAtom);
  const [questionList, setQuestionList] = useState<FavoriteQuizList>();

  // 문항 즐겨찾기리스트 불러오기 api
  const getFavoriteQuiz = async () => {
    const res = await quizService.get(
      `/v1/quiz/favorite?pageIndex=${page}&pageUnit=${8}`,
    );
    // const res = await quizService.get(
    //     ? `/v1/quiz/favorite?pageIndex=${page}&pageUnit=${8}`
    //     : `/v1/quiz/favorite?pageIndex=${page}&pageUnit=${8}&searchKeyword=${searchKeywordValue}&source=${selectedSource}&curriculum=${selectedCurriculum}&level=${selectedLevel}&grade=${selectedGrade}&semester=${selectedSemester}&subject=${selectedSubject}&course=${selectedCourse}&type=${selectedQuestionType}&isOpen=${selectedOpenStatus == '활성' ? true : ''}&searchKeywordFrom=${startDate}&searchKeywordTo=${endDate}`,
    // );
    console.log(`getFavoriteQuiz 결과값`, res.data.data);
    return res.data.data;
  };

  const { data: favoriteQuizData, refetch: favoriteQuizDataRefetch } = useQuery(
    {
      queryKey: ['get-favoriteQuizList'],
      queryFn: getFavoriteQuiz,
      meta: {
        errorMessage: 'get-favoriteQuizList 에러 메세지',
      },
    },
  );

  useEffect(() => {
    if (favoriteQuizData) {
      setQuestionList(favoriteQuizData);
    }
  }, [favoriteQuizData]);

  const [isStartDnD, setIsStartDnd] = useState(false);

  // 선택한 문항 배열 정렬
  const selectArrange: SelectCategory[] = [
    {
      idx: 1,
      name: '사용자 정렬',
      value: '1',
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

  const [defaultValues, setDefaultValues] = useState(initialValues);

  useEffect(() => {
    if (isStartDnD) {
      setDefaultValues(initialValues);
    }
  }, [isStartDnD]);

  const selectListCategoryOption = (
    event: React.MouseEvent<HTMLButtonElement>,
    idx: number,
  ) => {
    const newValue = (event.target as HTMLButtonElement).value;
    setDefaultValues((prev) => ({ ...prev, [idx]: newValue }));
  };

  //선택한 문항 보기 정렬
  const selectCategory = [
    {
      idx: '1',
      name: '문제만 보기',
      value: '2',
      options: [
        { idx: '0', name: '문제만 보기', value: '0' },
        { idx: '1', name: '문제+정답', value: '1' },
        { idx: '2', name: '문제+정답+해설', value: '2' },
      ],
    },
  ];

  const bookmarkSelectCategory = [
    {
      id: '1',
      label: '1000이 10인 수 알아보기',
      value: '1',
      options: [
        { id: '0', label: '1000이 10인 수 알아보기', value: '0' },
        { id: '1', label: '객관식 상단배치', value: '1' },
        { id: '2', label: '무작위 정렬', value: '2' },
      ],
    },
  ];
  const [bookmarkCategory, setBookmarkCategory] = useState<string[]>([]);
  const selectBookmarkCategoryOption = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const value = event.currentTarget.value;
    setBookmarkCategory((prevContent) => [...prevContent, value]);
  };

  // 새 문항 추가
  const [newQuizItems, setNewQuizItems] = useState<SimilarQuizList>();
  const [newQuizPrevItems, setNewQuizPrevItems] = useState<SimilarQuizList[]>(
    [],
  );

  // 새 문항 문항 불러오기 api
  const postnewQuizList = async (data: any) => {
    return await quizService.post(`/v1/search/quiz/step/1`, data);
  };

  const { mutate: postNewQuizData } = useMutation({
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
      setNewQuizItems(response.data.data);
    },
  });

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

  //범위 변경
  const [isRangeSetting, setIsRangeSetting] = useState<boolean>(false);
  const openRangeSetting = () => {
    setIsRangeSetting(true);
  };
  const closeRangeSetting = () => {
    setIsRangeSetting(false);
  };

  useEffect(() => {
    setIsRangeSetting(false);
  }, [tabVeiw]);

  const [radio1depthCheck, setRadio1depthCheck] = useState<RadioStateType>({
    title: '',
    checkValue: 0,
    code: '',
    key: '',
  });
  const [radio2depthCheck, setRadio2depthCheck] = useState<RadioStateType>({
    title: '',
    checkValue: 0,
    code: '',
    key: '',
  });
  const [radio3depthCheck, setRadio3depthCheck] = useState<RadioStateType>({
    title: '',
    checkValue: 0,
    code: '',
    key: '',
  });
  const [radio4depthCheck, setRadio4depthCheck] = useState<RadioStateType>({
    title: '',
    checkValue: 0,
    code: '',
    key: '',
  });
  const [radioEtc1Check, setRadioEtc1Check] = useState<RadioStateType>({
    title: '',
    checkValue: 0,
    code: '',
    key: '',
  });
  const [radioEtc2Check, setRadioEtc2Check] = useState<RadioStateType>({
    title: '',
    checkValue: 0,
    code: '',
    key: '',
  });
  const [selected1depth, setSelected1depth] = useState<string>('');
  const [selected2depth, setSelected2depth] = useState<string>('');
  const [selected3depth, setSelected3depth] = useState<string>('');
  const [selected4depth, setSelected4depth] = useState<string>('');
  const [selectedCategoryEtc1, setSelectedCategoryEtc1] = useState<string>('');
  const [selectedCategoryEtc2, setSelectedCategoryEtc2] = useState<string>('');
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [checkedDepthList, setCheckedDepthList] = useState<number[]>([]);

  const [nextList1depth, setNextList1depth] = useState([
    { code: '', idx: 0, name: '' },
  ]);
  const [nextList2depth, setNextList2depth] = useState([
    { code: '', idx: 0, name: '' },
  ]);
  const [nextList3depth, setNextList3depth] = useState([
    { code: '', idx: 0, name: '' },
  ]);

  const [unitClassificationList, setUnitClassificationList] = useState<
    UnitClassificationType[][]
  >([]);

  const [selectedClassification, setSelectedClassification] = useState<
    UnitClassificationType[]
  >([]);

  const [isModifying, setIsModifying] = useState(false);

  const [categoryItems, setCategoryItems] = useState<ItemCategoryType[]>([]); // 카테고리 항목을 저장할 상태
  const [categoryList, setCategoryList] = useState<ItemCategoryType[][]>([]); // 각 카테고리의 상세 리스트를 저장할 상태
  const [categoryAddInfoList, setCategoryAddInfoList] = useState<
    ItemCategoryType[][]
  >([]); // 각 카테고리의 상세 리스트를 저장할 상태
  const [itemTree, setItemTree] = useState<ItemTreeListType[]>([]);
  const [isCategoryLoaded, setIsCategoryLoaded] = useState(false);

  //  카테고리 불러오기 api
  const getCategory = async () => {
    const res = await classificationInstance.get(`/v1/category`);
    // console.log(`getCategory 결과값`, res);
    return res;
  };
  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    error: categoryDataError,
    refetch: categoryDataRefetch,
    isSuccess,
  } = useQuery({
    queryKey: ['get-category'],
    queryFn: getCategory,
    meta: {
      errorMessage: 'get-category 에러 메세지',
    },
  });

  // 카테고리 데이터가 변경될 때 카테고리 항목 상태 업데이트
  useEffect(() => {
    if (categoryData) {
      setCategoryItems(categoryData.data.data.categoryItemList);
    } else if (categoryDataError) {
      categoryDataRefetch();
    }
  }, [categoryData, categoryDataError, categoryDataRefetch]);

  useEffect(() => {
    if (isSuccess) {
      setIsCategoryLoaded(true);
    }
  }, [isSuccess]);

  // 카테고리의 그룹 유형 조회
  const getCategoryGroups = async () => {
    const response = await classificationInstance.get('/v1/category/group/A'); //TODO: /group/${``} 하드코딩된 유형 나중에 해당 변수로 변경
    return response.data.data.typeList;
  };
  const { data: groupsData, refetch: groupsDataRefetch } = useQuery({
    queryKey: ['get-category-groups-A'],
    queryFn: getCategoryGroups,
    enabled: !!categoryData,
    meta: {
      errorMessage: 'get-category-groups 에러 메세지',
    },
  });
  useEffect(() => {
    if (isRangeSetting && groupsData) {
      fetchCategoryItems(groupsData);
    }
  }, [groupsData, isRangeSetting]);

  // 카테고리의 그룹 유형 조회
  const fetchCategoryItems = async (typeList: string) => {
    const typeIds = typeList.split(',');
    try {
      const requests = typeIds.map((id) =>
        classificationInstance.get(`/v1/category/${id}`),
      );
      const responses = await Promise.all(requests);
      const itemsList = responses.map(
        (res) => res?.data?.data?.categoryClassList,
      );
      setCategoryList(itemsList);
    } catch (error: any) {
      if (error.response.data.code == 'GE-002') postRefreshToken();
    }
  };

  // 라디오 버튼 설정
  const handleRadioCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const depth =
      e.target.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement?.classList[0];
    const itemId =
      e.target.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement?.id;
    switch (depth) {
      case '1depth':
        setSelected1depth(e.currentTarget.id);
        setRadio1depthCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
          key: itemId as string,
        });
        break;
      case '2depth':
        setSelected2depth(e.currentTarget.value);
        setRadio2depthCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
          key: itemId as string,
        });
        break;
      case '3depth':
        setSelected3depth(e.currentTarget.value);
        setRadio3depthCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
          key: itemId as string,
        });
        break;
      case '4depth':
        setSelected4depth(e.currentTarget.value);
        setRadio4depthCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
          key: itemId as string,
        });
        break;

      case 'etc1':
        setSelectedCategoryEtc1(e.currentTarget.value);
        setRadioEtc1Check({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
          key: itemId as string,
        });
        break;
      case 'etc2':
        setSelectedCategoryEtc2(e.currentTarget.value);
        setRadioEtc2Check({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
          key: itemId as string,
        });
        break;
    }
  };

  /* 선택된 유형에따라 항목 조회 */
  //1뎁스 선택시 2뎁스 설정되게
  const getNextList1 = async () => {
    const itemIdx = categoryItems[1].idx; //다음으로 선택할 배열의 idx
    const pidx = radio1depthCheck.checkValue; // 선택된 체크 박스의 idx
    try {
      const res = await classificationInstance.get(
        `/v1/category/${itemIdx}/${pidx}`,
      );
      setNextList1depth(res?.data.data.categoryClassList);
      return res.data;
    } catch (error: any) {
      if (error.response.data.code == 'GE-002') postRefreshToken();
      return undefined;
    }
  };
  const { data: nextListData1, refetch: nextListData1Refetch } = useQuery({
    queryKey: ['get-nextList1'],
    queryFn: getNextList1,
    meta: {
      errorMessage: 'get-nextList1 에러 메세지',
    },
    // 체크된 값이 있을때 조회
    enabled: radio1depthCheck.code !== '',
  });

  //2뎁스 선택시 3뎁스 설정되게
  const getNextList2 = async () => {
    const itemIdx = categoryItems[2].idx; //다음으로 선택할 배열의 idx
    const pidx = radio2depthCheck.checkValue; // 선택된 체크 박스의 idx
    try {
      const res = await classificationInstance.get(
        `/v1/category/${itemIdx}/${pidx}`,
      );
      setNextList2depth(res?.data.data.categoryClassList);
      return res.data;
    } catch (error: any) {
      if (error.response.data.code == 'GE-002') postRefreshToken();
      return undefined;
    }
  };
  const { data: nextListData2, refetch: nextListData2Refetch } = useQuery({
    queryKey: ['get-nextList2'],
    queryFn: getNextList2,
    meta: {
      errorMessage: 'get-nextList2 에러 메세지',
    },
    // 체크된 값이 있을때 조회
    enabled: radio2depthCheck.code !== '',
  });

  //3뎁스 선택시 4뎁스 설정되게
  const getNextList3 = async () => {
    const itemIdx = categoryItems[3].idx; //다음으로 선택할 배열의 idx
    const pidx = radio3depthCheck.checkValue; // 선택된 체크 박스의 idx
    try {
      const res = await classificationInstance.get(
        `/v1/category/${itemIdx}/${pidx}`,
      );
      setNextList3depth(res?.data.data.categoryClassList);
      return res.data;
    } catch (error: any) {
      if (error.response.data.code == 'GE-002') postRefreshToken();
      return undefined;
    }
  };
  const { data: nextListData3, refetch: nextListData3Refetch } = useQuery({
    queryKey: ['get-nextList3'],
    queryFn: getNextList3,
    meta: {
      errorMessage: 'get-nextList3 에러 메세지',
    },
    // 체크된 값이 있을때 조회
    enabled: radio3depthCheck.code !== '',
  });

  const isRadioStateType = (
    item: UnitClassificationType,
  ): item is RadioStateType => {
    return (item as RadioStateType).title !== undefined;
  };

  //useMemo를 사용하여 makingdata값을 기억하며 unitClassificationList가 변경될때 업데이트
  const makingdata = useMemo(
    () =>
      unitClassificationList.map((item) => {
        // 타입 가드로 RadioStateType인지 확인 후 title에 접근
        const itemTreeKey = {
          교육과정: isRadioStateType(item[0]) ? item[0].title : '',
          학교급: isRadioStateType(item[1]) ? item[1].title : '',
          학기: isRadioStateType(item[2]) ? item[2].title : '',
          학년: isRadioStateType(item[3]) ? item[3].title : '',
        };

        // ItemTreeIdxListType인지 확인 후 checkedDepthList에 접근
        const itemTreeIdxList =
          (item[4] as ItemTreeIdxListType).itemTreeIdxList || [];

        return {
          itemTreeKey,
          itemTreeIdxList,
        };
      }),
    [unitClassificationList],
  );

  useEffect(() => {
    if (radio1depthCheck.code !== '') nextListData1Refetch();
    if (radio2depthCheck.code !== '') nextListData2Refetch();
    if (radio3depthCheck.code !== '') nextListData3Refetch();
  }, [radio1depthCheck, radio2depthCheck, radio3depthCheck]);

  // 체크값 변경시 초기화
  useEffect(() => {
    setSelected2depth('');
    setItemTree([]);
  }, [selected1depth]);
  useEffect(() => {
    setSelected3depth('');
    setItemTree([]);
  }, [selected2depth]);
  useEffect(() => {
    setSelected4depth('');
    setRadio4depthCheck({ title: '', checkValue: 0, code: '', key: '' });
    setItemTree([]);
  }, [selected3depth]);
  useEffect(() => {
    setSelectedCategoryEtc1('');
    setSelectedCategoryEtc2('');
    setRadioEtc1Check({ title: '', checkValue: 0, code: '', key: '' });
    setRadioEtc2Check({ title: '', checkValue: 0, code: '', key: '' });
    setItemTree([]);
  }, [selected4depth]);

  // 카테고리 선택후 아이템트리
  // 아이템 트리 불러오기 api
  const postCategoryItemTree = async () => {
    const depthChecks = [
      radio1depthCheck,
      radio2depthCheck,
      radio3depthCheck,
      radio4depthCheck,
    ];

    const keyValuePairs = categoryItems.reduce<Record<string, string>>(
      (acc, item, index) => {
        const depthCheck = depthChecks[index];
        if (depthCheck) {
          acc[item.name] = depthCheck.title; // title 속성을 사용하여 acc 객체에 추가
        }
        return acc;
      },
      {},
    );

    const itemTreeKeyList = { itemTreeKeyList: [keyValuePairs] };
    console.log('itemTreeKeyList :', itemTreeKeyList);

    const res = await classificationInstance.post('/v1/item', itemTreeKeyList);
    console.log('classificationInstance 응답:', res);
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
      if (context.response.data.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response: { data: { data: ItemTreeListType[] } }) => {
      // setItemTreeList(res.data.data[0].itemTreeList);
      setItemTree(response.data.data);
    },
  });

  useEffect(() => {
    if (selected4depth == '') return;
    categoryItemTreeDataMutate();
  }, [selected4depth]);

  // 카테고리의 그룹 유형 조회 (추가정보)
  const getAddInfoGroups = async () => {
    const response = await classificationInstance.get('/v1/category/group/B');
    return response.data.data.typeList;
  };
  const { data: addInfoData } = useQuery({
    queryKey: ['get-add-info-groups'],
    queryFn: getAddInfoGroups,
    enabled: !!categoryData,
    meta: {
      errorMessage: 'get-add-info-groups 에러 메세지',
    },
  });
  useEffect(() => {
    if (addInfoData) {
      fetchAddInfoItems(addInfoData);
    }
  }, [addInfoData]);

  // 카테고리의 그룹 아이템 조회 (추가정보)
  const fetchAddInfoItems = async (typeList: string) => {
    const typeIds = typeList.split(',');
    try {
      const requests = typeIds.map((id) =>
        classificationInstance.get(`/v1/category/${id}`),
      );
      const responses = await Promise.all(requests);
      const itemsList = responses.map(
        (res) => res?.data?.data?.categoryClassList,
      );
      setCategoryAddInfoList(itemsList);
    } catch (error: any) {
      if (error.response?.data?.code == 'GE-002') {
        postRefreshToken();
        groupsDataRefetch();
      }
    }
  };

  const saveCheckItems = () => {
    const newClassification: UnitClassificationType[] = [
      radio1depthCheck,
      radio2depthCheck,
      radio3depthCheck,
      radio4depthCheck,
      radioEtc1Check,
      radioEtc2Check,
    ];

    if (checkedDepthList.length > 0) {
      newClassification.splice(4, 0, { itemTreeIdxList: checkedDepthList });
    }

    if (unitClassificationList.length < 6) {
      setUnitClassificationList((prevList) => [...prevList, newClassification]);
    } else {
      openToastifyAlert({
        type: 'error',
        text: '교과정보는 최대 5개 까지 저장 가능합니다',
      });
    }
    //선택정보 저장과 함께 체크상태 초기화
    //저장 성공 후
    onResetList();
  };

  //삭제
  const deleteUnitClassification = (idx: number) => {
    setUnitClassificationList((prevList) => [
      ...prevList.slice(0, idx),
      ...prevList.slice(idx + 1),
    ]);
  };

  //분류 리스트 리셋
  const onResetList = () => {
    const reset = { title: '', checkValue: 0, code: '', key: '' };
    setRadio1depthCheck(reset);
    setRadio2depthCheck(reset);
    setRadio3depthCheck(reset);
    setRadio4depthCheck(reset);
    setRadioEtc1Check(reset);
    setRadioEtc2Check(reset);

    setSelected1depth('');
    setSelected2depth('');
    setSelected3depth('');
    setSelected4depth('');
    setSelectedCategoryEtc1('');
    setSelectedCategoryEtc2('');
    setCheckedDepthList([]);
  };

  // 수정
  const changeUnitClassification = (idx: number) => {
    console.log('수정에서의 itemTree checkedDepthList', checkedDepthList);
    onResetList();
    setSelectedClassification(unitClassificationList[idx]);
    setIsModifying(true);
  };

  // 수정시 작동
  useEffect(() => {
    if (isModifying && selectedClassification.length > 0) {
      const classification = selectedClassification[0] as RadioStateType;
      setSelected1depth(classification?.checkValue?.toString() || '');
      setRadio1depthCheck(classification);
    }
  }, [isModifying, selectedClassification]);

  useEffect(() => {
    if (isModifying && selected1depth !== '') {
      const classification = selectedClassification[1] as RadioStateType;
      setSelected2depth(classification?.checkValue?.toString() || '');
      setRadio2depthCheck(classification);
    }
  }, [isModifying, selected1depth]);

  useEffect(() => {
    if (isModifying && selected2depth !== '') {
      const classification = selectedClassification[2] as RadioStateType;
      setSelected3depth(classification?.checkValue?.toString() || '');
      setRadio3depthCheck(classification);
    }
  }, [isModifying, selected2depth]);

  useEffect(() => {
    if (isModifying && selected3depth !== '') {
      const classification = selectedClassification[3] as RadioStateType;
      setSelected4depth(classification?.checkValue?.toString() || '');
      setRadio4depthCheck(classification as RadioStateType);
    }
  }, [isModifying, selected3depth]);

  useEffect(() => {
    if (isModifying && selected4depth !== '') {
      const classification = selectedClassification[4] as ItemTreeIdxListType;
      setCheckedDepthList(classification.itemTreeIdxList);

      const classificationEtc1 = selectedClassification[5] as RadioStateType;
      setSelectedCategoryEtc1(classificationEtc1?.checkValue?.toString() || '');
      setRadioEtc1Check(classificationEtc1);

      const classificationEtc2 = selectedClassification[6] as RadioStateType;
      setSelectedCategoryEtc2(classificationEtc2?.checkValue?.toString() || '');
      setRadioEtc2Check(classificationEtc2);

      //초기화
      setIsModifying(false);
    }
  }, [isModifying, selected4depth]);

  // 교과정보 추가버튼 disable 처리
  const addButtonBool = useMemo(() => {
    if (
      unitClassificationList.length < 5 &&
      radio1depthCheck.code !== '' &&
      radio2depthCheck.code !== '' &&
      radio3depthCheck.code !== '' &&
      radio4depthCheck.code !== ''
    ) {
      return false;
    } else {
      return true;
    }
  }, [
    unitClassificationList,
    radio1depthCheck,
    radio2depthCheck,
    radio3depthCheck,
    radio4depthCheck,
  ]);

  const [classificationSearchValue, setClassificationSearchValue] =
    useState<string>('');

  // 검색 기능
  const filterSearchValue = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    // 쿼리 스트링 변경 로직
    setClassificationSearchValue(e.currentTarget.value);
  };
  const filterSearchValueEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setClassificationSearchValue(e.currentTarget.value);
    }
  };

  // 깊이가 있는 리스트 체크박스
  const handleSingleCheck = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedDepthList((prev) => [...prev, id]);
    } else {
      setCheckedDepthList(checkedDepthList.filter((el) => el !== id));
    }
  };

  //즐겨찾는 문항
  const [recommend, setRecommend] = useState<boolean>(false);

  const navigate = useNavigate();

  //신고하기
  const { openModal } = useModal();
  const openReportProcess = (idx: number) => {
    openModal({
      title: '',
      content: <ReportProcessModal registorReport={true} reportIdx={idx} />,
      callback: () => {},
    });
  };

  //리스트에서 문항 삭제하기(배열의 경우)
  const deleteQuizItem = (code: string) => {
    if (initialItems) {
      const selectedQuizItem = initialItems.find((item) => item.code === code);
      const isQuizNumExists = contentNumQuotient.find(
        (item) => item.code === code,
      );
      if (selectedQuizItem) {
        setInitialItems((prevItems) =>
          prevItems.filter((item) => item !== selectedQuizItem),
        );
      }
      //총 배점 관리를 위해서 전역 데이터 업데이트
      if (isQuizNumExists) {
        setContentNumQuotient((prevItems) =>
          prevItems.filter((item) => item !== isQuizNumExists),
        );
      }
    }
  };

  // 유사문항
  const [isSimilar, setIsSimilar] = useState(false);
  const [similarItems, setSimilarItems] = useState<SimilarQuizList>();
  const [similarItemCode, setSimilarItemCode] = useState<string>('');
  const [similarItemIndex, setSimilarItemIndex] = useState<number | null>(null);
  const [similarPrevItems, setSimilarPrevItems] = useState<SimilarQuizList[]>(
    [],
  );
  //console.log('');

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
    console.log('quizService 응답:', res);
    return res;
  };

  const { data: similarData, mutate: similarDataMutate } = useMutation({
    mutationFn: postSimilarItems,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
      // if (context.response.data.code == 'GE-002') {
      //   postRefreshToken();
      // }
    },
    onSuccess: (response: { data: { data: SimilarQuizList } }) => {
      setSimilarItems(response.data.data);
    },
  });
  // 유사문항 버튼 클릭
  const showSimilarContent = (code: string, index: number) => {
    setSimilarItemCode(code);
    setSimilarItemIndex(index);
    if (isSimilar) {
      setIsSimilar(!isSimilar);
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

  // 리스트에 문항 추가하기(객체인 경우)
  const clickAddQuizItem = (code: string) => {
    if (similarItems) {
      const selectedQuizItem = similarItems.quizList.find(
        (item) => item.code === code,
      );
      if (selectedQuizItem) {
        setInitialItems((prevItems) => [...prevItems, selectedQuizItem]);
        setSimilarItems((prevItems) => {
          if (prevItems) {
            return {
              ...prevItems,
              quizList: prevItems.quizList.filter(
                (item) => item !== selectedQuizItem,
              ),
            };
          }
          return prevItems; // 만약 prevItems가 undefined이면 그대로 반환
        });
      }
    } else if (newQuizItems) {
      const selectedQuizItem = newQuizItems.quizList.find(
        (item) => item.code === code,
      );
      if (selectedQuizItem) {
        setInitialItems((prevItems) => [...prevItems, selectedQuizItem]);
        setNewQuizItems((prevItems) => {
          if (prevItems) {
            return {
              ...prevItems,
              quizList: prevItems.quizList.filter(
                (item) => item !== selectedQuizItem,
              ),
            };
          }
          return prevItems; // 만약 prevItems가 undefined이면 그대로 반환
        });
      }
    }
  };

  //리스트 문항 교체하기
  const clickSwapQuizItem = (
    similarItems: SimilarQuizList | undefined,
    similarItemIndex: number,
    initialItems: QuizList[],
    initialItemIndex: number,
  ) => {
    if (similarItems && initialItems) {
      const newSimilarItems = [...similarItems.quizList];
      const newInitialItems = [...initialItems];

      // 교체할 항목을 임시 저장
      const temp = newSimilarItems[similarItemIndex];
      newSimilarItems[similarItemIndex] = newInitialItems[initialItemIndex];
      newInitialItems[initialItemIndex] = temp;

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

  useEffect(() => {
    if (getLocalData?.data.quizList) {
      setInitialItems(getLocalData.data.quizList);
    }
  }, [getLocalData]);

  const whenDragEnd = (newList: QuizList[]) => {
    setInitialItems(newList);
    console.log('@드래그끝났을떄', newList);
  };

  const handleButtonCheck = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.currentTarget.childNodes[0].childNodes[0]
      .childNodes[0] as HTMLInputElement;
  };

  // 로컬스토리지에 보낼데이터 저장
  const saveLocalData = (data: any) => {
    //const sendData = { data: data };
    if (data) {
      localStorage.setItem('sendData', JSON.stringify(data));
    }
  };

  const goBackStep1 = () => {
    const data = {
      문항수: initialItems.length,
      난이도: '중',
      문항타입: '객관식',
    };
    saveLocalData(data);
    setContentNumQuotient([]);
    navigate('/content-create/exam/step1');
  };

  //단원분류 입력 도중 해당 화면을 벗어나는 경우, '저장하지 않고 나가시겠습니까?' 얼럿
  useEffect(() => {
    if (
      tabVeiw == '학습지 요약' ||
      tabVeiw == '새 문항 추가' ||
      tabVeiw == '즐겨찾는 문항' ||
      tabVeiw == '개념'
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
      };
    }
  }, [tabVeiw]);

  const moveStep3 = () => {
    const data = {
      data: initialItems,
    };
    saveLocalData(data);
    navigate('/content-create/exam/step3');
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
                        onClick={() => setIsSimilar(false)}
                        style={{ fontSize: '22px', cursor: 'pointer' }}
                      />
                    </SimilarCloseButtonWrapper>
                    <SimilarWrapper>
                      <SimilarTitleWrapper>
                        <SimilarTitle>
                          1번 유사 문항
                          <SimilarTitleSpan>
                            문항을 교체하거나, 추가할 수 있습니다.
                          </SimilarTitleSpan>
                        </SimilarTitle>
                        <SimilarIconWrapper>
                          <SimilarIcon>
                            <PiArrowCounterClockwiseBold
                              style={{ fontSize: '22px', cursor: 'pointer' }}
                              onClick={clickPrevSimilarList}
                            />
                            이전 불러오기
                          </SimilarIcon>
                          <SimilarIcon>
                            <PiArrowClockwiseBold
                              style={{ fontSize: '22px', cursor: 'pointer' }}
                              onClick={clickNewSimilarList}
                            />
                            새로 불러오기
                          </SimilarIcon>
                        </SimilarIconWrapper>
                      </SimilarTitleWrapper>
                      <SimilarContentsWrapper>
                        <AddNewContensWrapper>
                          {similarItems?.quizList.map((item, i) => (
                            <MathviewerAccordion
                              key={item.idx}
                              componentWidth="600px"
                              width="450px"
                              componentHeight="150px"
                              onClick={() => {}}
                              isBorder={true}
                              isNewQuiz={true}
                              isSimilarQuiz={true}
                              data={item}
                              index={item.idx}
                              title={item.code}
                              quizNum={item.idx}
                              selectedCardIndex={selectedCardIndex}
                              onSelectCard={setSelectedCardIndex}
                              reportQuizitem={() => openReportProcess(item.idx)}
                              changeQuizitem={() =>
                                clickSwapQuizItem(
                                  similarItems,
                                  i,
                                  initialItems,
                                  similarItemIndex as number,
                                )
                              }
                              addQuizItem={() => clickAddQuizItem(item.code)}
                            ></MathviewerAccordion>
                          ))}
                        </AddNewContensWrapper>
                      </SimilarContentsWrapper>
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
                        selected={tabVeiw}
                        setTabVeiw={setTabVeiw}
                      />
                    </TabWrapper>
                    <DiscriptionWrapper>
                      {tabVeiw === '학습지 요약' && (
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
                                const quizCategory =
                                  dragItem.quizCategoryList?.[0]?.quizCategory;

                                return (
                                  <li
                                    ref={ref}
                                    className={`${isDragging ? 'opacity' : ''}`}
                                  >
                                    <Content
                                      // key={i}
                                      onClick={(e) => {
                                        handleButtonCheck(e);
                                      }}
                                    >
                                      <div className="number">
                                        {itemIndex + 1}
                                      </div>
                                      <div className="type">
                                        {quizCategory?.문항타입 || 'N/A'}
                                        {/* 값이 없으면 'N/A' 출력 */}
                                      </div>
                                      <div className="level">
                                        {quizCategory?.난이도 || 'N/A'}
                                        {/* 값이 없으면 'N/A' 출력 */}
                                      </div>
                                      <div className="title">
                                        {quizCategory?.출처 || 'N/A'}
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
                      {tabVeiw === '새 문항 추가' && (
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
                            <Button
                              buttonType="button"
                              onClick={() => {}}
                              $padding="10px"
                              height={'30px'}
                              width={'100px'}
                              fontSize="13px"
                              $filled
                              cursor
                            >
                              <span>+ 전체 추가</span>
                            </Button>
                          </AddNewContentOption>
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
                                        교과정보는 최대 5개 까지 저장 가능합니다
                                      </p>
                                      {unitClassificationList.map((el, idx) => (
                                        <IconButtonWrapper key={`${el} idx`}>
                                          <IconButton
                                            width={`calc(100% - 25px)`}
                                            fontSize="14px"
                                            height="35px"
                                            textAlign="left"
                                            $padding="0 50px 0 10px"
                                            rightIconSrc={
                                              <IconWrapper>
                                                <button
                                                  type="button"
                                                  className="icon_button primery"
                                                >
                                                  수정
                                                </button>
                                              </IconWrapper>
                                            }
                                            onClick={() =>
                                              changeUnitClassification(idx)
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
                                                  (item) => `${item.title} / `,
                                                )}
                                            </span>
                                          </IconButton>

                                          <Icon
                                            onClick={() =>
                                              deleteUnitClassification(idx)
                                            }
                                            $margin={'0 0 0 2px'}
                                            width={`15px`}
                                            src={`/images/icon/icoclose.svg`}
                                          />
                                        </IconButtonWrapper>
                                      ))}
                                    </>
                                  ) : (
                                    <p className="info">
                                      교과정보는 최대 5개 까지 저장 가능합니다
                                    </p>
                                  )}
                                </UnitClassifications>

                                {/* 교육과정 라디오 버튼 부분 */}
                                {isCategoryLoaded &&
                                  categoryItems[0] &&
                                  categoryList && (
                                    <>
                                      {[categoryItems[0]].map((item) => (
                                        <div
                                          className={`1depth`}
                                          key={`selected1depth ${item.idx}`}
                                        >
                                          <ButtonFormatRadio
                                            titleText={`${item.name}`}
                                            list={categoryList[0]}
                                            selected={selected1depth}
                                            onChange={(e) =>
                                              handleRadioCheck(e)
                                            }
                                            // defaultChecked={}
                                            checkedInput={radio1depthCheck}
                                            $margin={`10px 0 0 0`}
                                          />
                                        </div>
                                      ))}

                                      {radio1depthCheck.code !== '' &&
                                        selected1depth !== '' &&
                                        [categoryItems[1]].map((item) => (
                                          <div
                                            className={`2depth`}
                                            key={`selected2depth ${item.idx}`}
                                          >
                                            <ButtonFormatRadio
                                              titleText={`${item.name}`}
                                              list={nextList1depth}
                                              selected={selected2depth}
                                              onChange={(e) =>
                                                handleRadioCheck(e)
                                              }
                                              // defaultChecked={}
                                              checkedInput={radio2depthCheck}
                                            />
                                          </div>
                                        ))}

                                      {radio2depthCheck.code !== '' &&
                                        selected2depth !== '' &&
                                        [categoryItems[2]].map((item) => (
                                          <div
                                            className={`3depth`}
                                            key={`selected3depth ${item.idx}`}
                                          >
                                            <ButtonFormatRadio
                                              titleText={`${item.name}`}
                                              list={nextList2depth}
                                              selected={selected3depth}
                                              onChange={(e) =>
                                                handleRadioCheck(e)
                                              }
                                              // defaultChecked={}
                                              checkedInput={radio3depthCheck}
                                            />
                                          </div>
                                        ))}
                                      {radio3depthCheck.code !== '' &&
                                        selected3depth !== '' &&
                                        [categoryItems[3]].map((item) => (
                                          <div
                                            className={`4depth`}
                                            key={`selected4depth ${item.idx}`}
                                          >
                                            <ButtonFormatRadio
                                              titleText={`${item.name}`}
                                              list={nextList3depth}
                                              selected={selected4depth}
                                              onChange={(e) =>
                                                handleRadioCheck(e)
                                              }
                                              // defaultChecked={}
                                              checkedInput={radio4depthCheck}
                                            />
                                          </div>
                                        ))}
                                    </>
                                  )}

                                <p className="line"></p>

                                {/* 교과정보 아코디언 리스트  */}
                                {radio1depthCheck.code !== '' &&
                                radio2depthCheck.code !== '' &&
                                radio3depthCheck.code !== '' &&
                                radio4depthCheck.code !== '' &&
                                selected1depth !== '' &&
                                selected2depth !== '' &&
                                selected3depth !== '' ? (
                                  <AccordionWrapper>
                                    <Accordion
                                      title={`${radio1depthCheck.title}/${radio2depthCheck.title}/${radio3depthCheck.title}학년/${radio4depthCheck.title}`}
                                      id={`${radio1depthCheck.title}/${radio2depthCheck.title}/${radio3depthCheck.title}학년/${radio4depthCheck.title}`}
                                    >
                                      <RowListWrapper>
                                        <Search
                                          height={'30px'}
                                          value={classificationSearchValue}
                                          onClick={(e) => filterSearchValue(e)}
                                          onKeyDown={(e) =>
                                            filterSearchValueEnter(e)
                                          }
                                          onChange={(e) => {
                                            setClassificationSearchValue(
                                              e.target.value,
                                            );
                                          }}
                                          placeholder="검색어를 입력해주세요.(두글자 이상)"
                                          maxLength={20}
                                        />
                                        {classificationSearchValue.length >
                                          0 && (
                                          <p className="line bottom_text">
                                            {`총 
                          ${
                            categoryItemTreeData && itemTree.length
                              ? itemTree.map(
                                  (el) =>
                                    el.itemTreeList.filter((el) =>
                                      el.name.includes(
                                        classificationSearchValue,
                                      ),
                                    ).length,
                                )
                              : 0
                          } 
                          건`}
                                          </p>
                                        )}
                                        {isPending && (
                                          <LoaderWrapper>
                                            <Loader width="50px" />
                                          </LoaderWrapper>
                                        )}

                                        {categoryItemTreeData ? (
                                          <>
                                            {itemTree.length ? (
                                              <>
                                                {classificationSearchValue.length >
                                                0 ? (
                                                  <>
                                                    {itemTree.map((el) => (
                                                      <div
                                                        key={`${el.itemTreeKey}`}
                                                      >
                                                        {el.itemTreeList.map(
                                                          (item) => (
                                                            <DepthBlock
                                                              defaultChecked
                                                              key={`depthList${item?.idx} ${item.name}`}
                                                              classNameList={`depth-${item.level}`}
                                                              id={item?.code}
                                                              name={item.name}
                                                              value={item?.idx}
                                                              onChange={(e) =>
                                                                handleSingleCheck(
                                                                  e.target
                                                                    .checked,
                                                                  item?.idx,
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
                                                                classificationSearchValue
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
                                                ) : (
                                                  <>
                                                    {itemTree.map((el) => (
                                                      <div
                                                        key={`${el.itemTreeKey}`}
                                                      >
                                                        {el.itemTreeList.map(
                                                          (item) => (
                                                            <DepthBlock
                                                              defaultChecked
                                                              key={`depthList${item?.idx} ${item.name}`}
                                                              classNameList={`depth-${item.level}`}
                                                              id={item?.code}
                                                              name={item.name}
                                                              value={item?.idx}
                                                              onChange={(e) =>
                                                                handleSingleCheck(
                                                                  e.target
                                                                    .checked,
                                                                  item?.idx,
                                                                )
                                                              }
                                                              checked={
                                                                checkedDepthList?.includes(
                                                                  item?.idx,
                                                                )
                                                                  ? true
                                                                  : false
                                                              }
                                                              searchValue={
                                                                classificationSearchValue
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
                                              </>
                                            ) : (
                                              <ValueNone
                                                textOnly
                                                info="등록된 데이터가 없습니다"
                                              />
                                            )}
                                          </>
                                        ) : (
                                          <Loader />
                                        )}
                                      </RowListWrapper>
                                    </Accordion>

                                    <Accordion
                                      title={'추가정보'}
                                      id={'추가정보'}
                                      $margin={'4px 0 0 0 '}
                                    >
                                      <RowListWrapper>
                                        {categoryAddInfoList ? (
                                          <>
                                            {[categoryItems[4]].map((item) => (
                                              <div
                                                className={`etc1`}
                                                key={`etc1 ${item.idx}`}
                                              >
                                                <ButtonFormatRadio
                                                  titleText={`${item.name}`}
                                                  list={categoryAddInfoList[0]}
                                                  selected={
                                                    selectedCategoryEtc1
                                                  }
                                                  onChange={(e) =>
                                                    handleRadioCheck(e)
                                                  }
                                                  // defaultChecked={}
                                                  checkedInput={radioEtc1Check}
                                                />
                                              </div>
                                            ))}
                                            {[categoryItems[5]].map((item) => (
                                              <div
                                                className={`etc2`}
                                                key={`etc2 ${item.idx}`}
                                              >
                                                <ButtonFormatRadio
                                                  titleText={`${item.name}`}
                                                  list={categoryAddInfoList[1]}
                                                  selected={
                                                    selectedCategoryEtc2
                                                  }
                                                  onChange={(e) =>
                                                    handleRadioCheck(e)
                                                  }
                                                  // defaultChecked={}
                                                  checkedInput={radioEtc2Check}
                                                />
                                              </div>
                                            ))}
                                          </>
                                        ) : (
                                          <ValueNone
                                            textOnly
                                            info="등록된 데이터가 없습니다"
                                          />
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
                              {newQuizItems?.quizList.map((item, i) => (
                                <MathviewerAccordion
                                  key={item.idx}
                                  componentWidth="600px"
                                  width="450px"
                                  componentHeight="150px"
                                  onClick={() => {}}
                                  isBorder={true}
                                  isNewQuiz={true}
                                  data={item}
                                  index={item.idx}
                                  selectedCardIndex={selectedCardIndex}
                                  onSelectCard={setSelectedCardIndex}
                                  reportQuizitem={() =>
                                    openReportProcess(item.idx)
                                  }
                                  addQuizItem={() =>
                                    clickAddQuizItem(item.code)
                                  }
                                ></MathviewerAccordion>
                              ))}
                            </AddNewContensWrapper>
                          )}
                        </>
                      )}
                      {tabVeiw === '즐겨찾는 문항' && (
                        <>
                          {favoriteQuizData && questionList ? (
                            <>
                              <BookmarkContentOption>
                                <SelectWrapper>
                                  {bookmarkSelectCategory.map((el) => (
                                    <Select
                                      width={'250px'}
                                      defaultValue={el.label}
                                      key={el.label}
                                      options={el.options}
                                      onSelect={(event) =>
                                        selectBookmarkCategoryOption(event)
                                      }
                                    />
                                  ))}
                                </SelectWrapper>
                                <BookmarkContentCheckWrapper>
                                  <CheckBox
                                    isChecked={recommend}
                                    onClick={() => setRecommend(!recommend)}
                                  ></CheckBox>
                                  내 문항 우선 추천
                                </BookmarkContentCheckWrapper>
                                <Button
                                  buttonType="button"
                                  onClick={() => {}}
                                  $padding="10px"
                                  height={'30px'}
                                  width={'100px'}
                                  fontSize="13px"
                                  $filled
                                  cursor
                                >
                                  <span>+ 전체 추가</span>
                                </Button>
                              </BookmarkContentOption>
                              <BookmarkContensWrapper>
                                {questionList.quizList?.map((item) => (
                                  <MathviewerAccordion
                                    key={item.idx}
                                    componentWidth="600px"
                                    width="450px"
                                    componentHeight="150px"
                                    onClick={() => {}}
                                    isBorder={true}
                                    isNewQuiz={true}
                                    data={item}
                                    index={item.idx}
                                    selectedCardIndex={selectedCardIndex}
                                    onSelectCard={setSelectedCardIndex}
                                    reportQuizitem={() =>
                                      openReportProcess(item.idx)
                                    }
                                    addQuizItem={() =>
                                      clickAddQuizItem(item.code)
                                    }
                                  ></MathviewerAccordion>
                                ))}
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
                      {tabVeiw === '개념' && (
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
                <ListFilter>
                  <Label
                    value={`선택한 문항 목록 (총 ${initialItems.length} 문항)`}
                    fontSize="16px"
                  />
                  {/* 사용자정렬 */}
                  {/* <SelectWrapper>
                    {selectArrange.map((el) => (
                      <Select
                        width={'150px'}
                        isnormalizedOptions
                        key={el.idx}
                        defaultValue={defaultValues[el.idx]}
                        options={el.options}
                        onSelect={(event) =>
                          selectListCategoryOption(event, el.idx)
                        }
                        blackMode
                        isStartDnD={isStartDnD}
                      ></Select>
                    ))}
                    {selectCategory.map((el) => (
                      <Select
                        width={'150px'}
                        isnormalizedOptions
                        key={el.idx}
                        defaultValue={el.name}
                        options={el.options}
                        //onSelect={(event) => selectListCategoryOption(event, el.idx)}
                        blackMode
                      ></Select>
                    ))}
                  </SelectWrapper> */}
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
                    quotient={quotient}
                  >
                    {(dragItem, ref, isDragging, itemIndex, quotient) => (
                      <li
                        ref={ref}
                        className={`${isDragging ? 'opacity' : ''}`}
                      >
                        <MathviewerAccordion
                          componentWidth="750px"
                          width="550px"
                          onClick={() => {
                            showSimilarContent(dragItem.code, itemIndex);
                          }}
                          isSimilar={isSimilar}
                          data={dragItem}
                          quizNum={itemIndex + 1}
                          title={dragItem.code}
                          index={itemIndex}
                          selectedCardIndex={selectedCardIndex}
                          onSelectCard={setSelectedCardIndex}
                          reportQuizitem={() => openReportProcess(dragItem.idx)}
                          deleteQuizItem={() => deleteQuizItem(dragItem.code)}
                          quotient={quotient}
                          minQuotient={minQuotient}
                          maxQuotient={maxQuotient}
                          equalScore={equalScore as number}
                          remainderContent={remainderContent}
                          nextRemainderContent={nextRemainderContent}
                          setTotalEqualScore={setTotalEqualScore}
                        ></MathviewerAccordion>
                      </li>
                    )}
                  </StepDnDWrapper>
                </ContentListWrapper>
              </ContentListSection>
            </MainWrapper>
            <NextStepButtonWrapper>
              <p>
                총 배점: <Span>{totalEqualScore}점</Span>/
                <Span>{equalTotalValue}점</Span>
              </p>
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
const DiscriptionSection = styled.section`
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
  width: 100%;
  padding-bottom: 50px;
  padding-left: calc(50% - 35px);
`;
const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
//즐겨찾는 문항
const BookmarkContentOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
const ContentListSection = styled.section`
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
const MathviewerCardWrapper = styled.div<{ $isSelected?: boolean }>`
  &.dragging {
    transition: transform 0.3s ease-in-out;
    transform: translate(0, 0);
    background-color: ${({ $isSelected }) =>
      $isSelected ? `${COLOR.BORDER_BLUE}` : 'none'};
    color: ${({ $isSelected }) => ($isSelected ? 'white' : 'none')};
  }
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
