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
  const [getLocalData, setGetLocalData] = useState<WorkbookData | null>(null);
  const [getQuotientLocalData, setGetQuotientLocalData] =
    useState<WorkbookQuotientData | null>(null);
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
  const [categoryNameList, setCategoryNameList] = useState<string>('');
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    if (getEditData) setWorkbookIdx(getEditData?.workbookIdx);
  }, [getEditData]);

  // 학습지 상세 정보 불러오기 api
  const getWorkbookData = async (idx: number) => {
    const res = await workbookInstance.get(`/v1/workbook/detail/${idx}`);
    // console.log(`getWorkbook 결과값`, res);
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
      setInitialItems(workbookData?.data.data.quizList);
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
      setIsDone(true);
      //window.opener.localStorage.clear();
    }
  }, [workbookData]);

  //배점이 바뀔때마다 변경되는 전역변수
  // const [contentNumQuotient, setContentNumQuotient] =
  //   useRecoilState<ContentWithScore[]>(contentQuotient);
  //기존 문항 데이타에 배점 넣기
  //console.log('contentNumQuotient', contentNumQuotient);

  // useEffect(() => {
  //   const updatedItems = initialItems.map((item) => {
  //     // 각 initialItems의 item에 대해 contentNumQuotient 배열을 탐색합니다.
  //     const matchingItem = contentNumQuotient.find(
  //       (quotient) => quotient.code === item.code,
  //     );
  //     // 일치하는 항목이 있으면 score를 추가합니다.
  //     if (matchingItem) {
  //       return {
  //         ...item,
  //         score: matchingItem.score,
  //       };
  //     }

  //     // 일치하는 항목이 없으면 원래 항목을 반환합니다.
  //     return item;
  //   });
  //   setInitialItems(updatedItems);
  // }, [contentNumQuotient]);

  //평균 배점 문항
  const [remainderContent, setRemainderContent] = useState<number>();
  //평균 배점 이상 문항
  const [nextRemainderContent, setNextRemainderContent] = useState<number>();
  //문항당 배점
  //const [quotient, setQuotient] = useState<number | null>(null);
  const [quotient, setQuotient] = useState<number>(0);
  const [minQuotient, setMinQuotient] = useState<number>();
  const [maxQuotient, setMaxQuotient] = useState<number>();
  const [equalScore, setEqualScore] = useState<number | null>(null);
  const [equalTotalValue, setEqualTotalValue] = useState<string>('0');
  //총 문항 점수
  const [totalEqualScore, setTotalEqualScore] = useState<number>(0);
  useEffect(() => {
    if (getQuotientLocalData) {
      setEqualScore(getQuotientLocalData.equalScore);
      //setEqualTotalValue(getQuotientLocalData.equalTotalValue);
      setRemainderContent(getQuotientLocalData.remainderContent);
      setNextRemainderContent(getQuotientLocalData.nextRemainderContent);
      setQuotient(getQuotientLocalData.quotient);
      setMinQuotient(getQuotientLocalData.minQuotient);
      setMaxQuotient(getQuotientLocalData.maxQuotient);
    }
  }, [getQuotientLocalData]);
  //step1에서 step2로 넘어왔을때 전역변수에 score 넣어줌
  //step1에서 step2로 넘어왔을때 문항 추가했을 때 score 넣어줌
  // useEffect(() => {
  //   if (
  //     contentNumQuotient &&
  //     quotient !== null &&
  //     isEditWorkbook === undefined
  //   ) {
  //     setContentNumQuotient((prevData) => {
  //       let updated = false;
  //       const newData = prevData.map((item) => {
  //         if (item.score === undefined) {
  //           updated = true;
  //           return {
  //             ...item,
  //             score:
  //               remainderContent && item.num <= remainderContent
  //                 ? (quotient as number)
  //                 : nextRemainderContent && item.num >= nextRemainderContent
  //                   ? quotient + 1
  //                   : 0,
  //           };
  //         }
  //         return item;
  //       });
  //       return updated ? newData : prevData;
  //     });
  //   }
  // }, [contentNumQuotient]);
  //수정, 복제 후 수정일 때 문항 추가 했을 때 score 넣어줌
  // useEffect(() => {
  //   if (contentNumQuotient && quotient !== null && isEditWorkbook === 1) {
  //     setContentNumQuotient((prevData) => {
  //       let updated = false;
  //       const newData = prevData.map((item) => {
  //         if (item.score === undefined) {
  //           updated = true;
  //           return {
  //             ...item,
  //             score:
  //               remainderContent && item.num <= remainderContent
  //                 ? (quotient as number)
  //                 : nextRemainderContent && item.num >= nextRemainderContent
  //                   ? quotient + 1
  //                   : 0,
  //           };
  //         }
  //         return item;
  //       });
  //       return updated ? newData : prevData;
  //     });
  //   }
  // }, [contentNumQuotient]);

  //문항 번호가 없을 때 문항 번호 부여해주기
  // useEffect(() => {
  //   if (initialItems && initialItems.length > 0) {
  //     // initialItems 배열에서 num 속성이 있는 항목들만 모아서 정렬
  //     const itemsWithNum = initialItems
  //       .filter((item) => item.num)
  //       .sort((a, b) => a.num - b.num);

  //     // 가장 큰 num 값을 찾음
  //     const maxNum =
  //       itemsWithNum.length > 0 ? itemsWithNum[itemsWithNum.length - 1].num : 0;

  //     // num 속성이 없는 항목들에 새로운 num 값을 부여
  //     let newNum = maxNum + 1;
  //     let updated = false;
  //     const updatedItems = initialItems.map((item) => {
  //       if (!item.num) {
  //         updated = true;
  //         return { ...item, num: newNum++ };
  //       }
  //       return item;
  //     });
  //     if (updated) {
  //       setInitialItems(updatedItems);
  //     }
  //   }
  // }, []);

  //배점 옵션 => MathviewerAccordionStep2로 넘겨줌
  const [quotientOption, setQuotientOption] = useState<
    { code: string; idx: number; name: string; value: number }[]
  >([]);
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

  // 로컬 스토리지에서 데이터 가져오기
  useEffect(() => {
    const fetchDataFromStorage = () => {
      const data = localStorage.getItem('sendData');
      const quotientData = localStorage.getItem('sendQuotientData');
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

      if (quotientData) {
        try {
          const parsedQuotientData = JSON.parse(quotientData);
          // console.log('sendQuotientData:', parsedQuotientData); // 디버깅용 콘솔 로그
          setGetQuotientLocalData(parsedQuotientData);
        } catch (error) {
          console.error('로컬 스토리지 sendQuotientData 파싱 에러:', error);
        }
      } else {
        console.log('로컬 스토리지에 sendQuotientData가 없습니다.');
      }

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

  //로컬데이터에서 데이타 가져 온 후 번호 부여와 함께 상태관리 변수에 저장
  // useEffect(() => {
  //   const filterQuizItem = initialItems.some((item) => 'score' in item);

  //   if (filterQuizItem === false && getLocalData?.data.quizList) {
  //     let globalQuestionNumber = 1; // 전역적으로 사용할 번호 변수

  //     const updatedQuizList = getLocalData.data.quizList.map((quiz) => ({
  //       ...quiz,
  //       quizItemList: quiz.quizItemList.map((quizItem) => {
  //         if (quizItem.type === 'QUESTION') {
  //           return {
  //             ...quizItem,
  //             num: globalQuestionNumber++, // QUESTION 항목에만 번호 할당
  //           };
  //         }
  //         return quizItem;
  //       }),
  //     }));

  //     setInitialItems(updatedQuizList);
  //   }
  // }, [getLocalData]);

  //수정, 복제후 수정일 때 step3 갔다가 돌아왔을 때 상태관리
  useEffect(() => {
    if (getLocalData) {
      setIsEditWorkbook(getLocalData.data.isEditWorkbook);
      setInitialItems(getLocalData.data.quizList);
    }
  }, [getLocalData]);

  useEffect(() => {
    if (getEditData) setIsEditWorkbook(getEditData?.isEditWorkbook);
  }, [getEditData]);

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

  const [page, setPage] = useRecoilState(pageAtom);

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
  const [defaultValues, setDefaultValues] = useState(initialValues);

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

  // 새 문항 추가
  const [newQuizItems, setNewQuizItems] = useState<SimilarQuizList>();
  const [newQuizPrevItems, setNewQuizPrevItems] = useState<SimilarQuizList[]>(
    [],
  );
  //console.log('newQuizItems', newQuizItems);
  const [newQuizItemSetting, setNewQuizItemSetting] = useState<any>();

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
    if (tabVeiw === '새 문항 추가') {
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
  }, [tabVeiw]);

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
    setNewQuizItemSetting(data);
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
  const [radio5depthCheck, setRadio5depthCheck] = useState<RadioStateType>({
    title: '',
    checkValue: 0,
    code: '',
    key: '',
  });
  const [radio6depthCheck, setRadio6depthCheck] = useState<RadioStateType>({
    title: '',
    checkValue: 0,
    code: '',
    key: '',
  });
  const [radioEtc1Check, setRadioEtc1Check] = useState<RadioStateType[]>([]);
  const [radioEtc2Check, setRadioEtc2Check] = useState<RadioStateType[]>([]);
  const [selected1depth, setSelected1depth] = useState<string>('');
  const [selected2depth, setSelected2depth] = useState<string>('');
  const [selected3depth, setSelected3depth] = useState<string>('');
  const [selected4depth, setSelected4depth] = useState<string>('');
  const [selected5depth, setSelected5depth] = useState<string>('');
  const [selected6depth, setSelected6depth] = useState<string>('');
  const [selectedCategoryEtc1, setSelectedCategoryEtc1] = useState<string[]>([
    '',
  ]);
  const [selectedCategoryEtc2, setSelectedCategoryEtc2] = useState<string[]>([
    '',
  ]);
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
  const [nextList4depth, setNextList4depth] = useState([
    { code: '', idx: 0, name: '' },
  ]);
  const [nextList5depth, setNextList5depth] = useState([
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
  const [categoryList, setCategoryList] = useState<ItemCategoryType[][]>([
    [{ code: '', idx: 0, name: '' }],
  ]);
  const [categoriesE, setCategoriesE] = useState<ItemCategoryType[][]>([]);
  const [refreshTokenCalled, setRefreshTokenCalled] = useState(false);

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
    if (categoryDataError) {
      categoryDataRefetch();
    }
    if (categoryData) {
      setCategoryItems(categoryData.data.data.categoryItemList);
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
    return response.data.data;
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
    if (isRangeSetting && categoryTypeList) {
      fetchCategoryItems(categoryTypeList, setCategoryList);
    }
  }, [categoryTypeList, isRangeSetting]);

  //groupsData값 들어왔을때 typeList 관리
  useEffect(() => {
    if (groupsData) {
      setCategoryTypeList(groupsData.typeList);
    }
  }, [groupsData]);

  //groupsData값 들어왔을때 nameList 관리
  useEffect(() => {
    if (groupsData) {
      setCategoryNameList(groupsData.nameList);
    }
  }, [groupsData]);

  // 카테고리의 그룹 유형 조회 (출처)
  const getCategoryGroupsE = async () => {
    const response = await classificationInstance.get('/v1/category/group/E');
    return response.data.data.typeList;
  };
  const {
    data: groupsEData,
    refetch: groupsDataERefetch,
    isFetching: groupsDataEIsFetching,
  } = useQuery({
    queryKey: ['get-category-groups-E'],
    queryFn: getCategoryGroupsE,
    enabled: !!categoryData,
    meta: {
      errorMessage: 'get-category-groups-E 에러 메세지',
    },
  });
  useEffect(() => {
    if (groupsEData) {
      fetchCategoryItems(groupsEData, setCategoriesE);
    }
  }, [groupsEData]);

  // 카테고리의 그룹 유형 조회
  const fetchCategoryItems = async (
    typeList: string,
    setCategory: React.Dispatch<React.SetStateAction<ItemCategoryType[][]>>,
  ) => {
    const typeIds = typeList.split(',');
    try {
      setIsCategoryLoaded(true);

      const requests = typeIds.map((id) =>
        classificationInstance
          .get(`/v1/category/class/${id}`)
          .catch((error) => {
            if (error.response?.data?.code == 'GE-002' && !refreshTokenCalled) {
              setRefreshTokenCalled(true);
              postRefreshToken().then(() => {
                setRefreshTokenCalled(false);
              });
            }
          }),
      );
      const responses = await Promise.all(requests);
      const itemsList = responses.map(
        (res) => res?.data?.data?.categoryClassList,
      );

      setCategory(itemsList);
    } finally {
      setIsCategoryLoaded(false);
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
      case '5depth':
        setSelected5depth(e.currentTarget.value);
        setRadio5depthCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
          key: itemId as string,
        });
        break;
      case '6depth':
        setSelected6depth(e.currentTarget.value);
        setRadio6depthCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
          key: itemId as string,
        });
        break;
      default:
        break;
    }
  };

  // 다중 라디오 버튼 설정
  const handleMultiRadioCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const depth =
      e.target.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement?.classList[0];
    const itemId =
      e.target.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement?.id;

    const title = e.currentTarget.name;
    const code = e.currentTarget.className;
    const value = e.currentTarget.value;

    switch (depth) {
      case 'etc1':
        setSelectedCategoryEtc1(() => {
          if (selectedCategoryEtc1.includes(value)) {
            const updated = selectedCategoryEtc1.filter((v) => v !== value);
            return updated;
          } else {
            const updated = [...selectedCategoryEtc1, value];
            return updated;
          }
        });

        setRadioEtc1Check(() => {
          if (radioEtc1Check.some((item) => item.checkValue == Number(value))) {
            return radioEtc1Check.filter(
              (item) => item.checkValue !== Number(value),
            );
          } else {
            return [
              ...radioEtc1Check,
              {
                title: title,
                checkValue: Number(value),
                code: code,
                key: itemId as string,
              },
            ];
          }
        });
        break;

      case 'etc2':
        setSelectedCategoryEtc2(() => {
          if (selectedCategoryEtc2.includes(value)) {
            const updated = selectedCategoryEtc2.filter((v) => v !== value);
            return updated;
          } else {
            const updated = [...selectedCategoryEtc2, value];
            return updated;
          }
        });

        setRadioEtc2Check(() => {
          if (radioEtc2Check.some((item) => item.checkValue == Number(value))) {
            return radioEtc2Check.filter(
              (item) => item.checkValue !== Number(value),
            );
          } else {
            return [
              ...radioEtc2Check,
              {
                title: title,
                checkValue: Number(value),
                code: code,
                key: itemId as string,
              },
            ];
          }
        });
        break;
      default:
        break;
    }
  };

  /* 선택된 유형에따라 항목 조회 */
  //1뎁스 선택시 2뎁스 설정되게
  const getNextList1 = async () => {
    const groupsArray = categoryTypeList.split(',').map(Number);
    const itemIdx = groupsArray[1];
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
    const groupsArray = categoryTypeList.split(',').map(Number);
    const itemIdx = groupsArray[2];
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
    const groupsArray = categoryTypeList.split(',').map(Number);
    const itemIdx = groupsArray[3];
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
          학년: isRadioStateType(item[2]) ? item[2].title : '',
          학기: isRadioStateType(item[3]) ? item[3].title : '',
          교과: isRadioStateType(item[4]) ? item[4].title : '',
          과목: isRadioStateType(item[5]) ? item[5].title : '',
        };

        // ItemTreeIdxListType인지 확인 후 checkedDepthList에 접근
        const itemTreeIdxList =
          (item[6] as ItemTreeIdxListType).itemTreeIdxList || [];

        return {
          itemTreeKey,
          itemTreeIdxList,
        };
      }),
    [unitClassificationList],
  );

  const setNextList = (idx: number) => {
    //교과 과목 오픈여부 라디오 버튼 셋팅
    if (categoriesE && idx == 4) {
      setNextList4depth(categoriesE[0]);
    }
    if (categoriesE && idx == 5) {
      setNextList5depth(categoriesE[1]);
    }
  };

  useEffect(() => {
    if (radio1depthCheck.code !== '') nextListData1Refetch();
    if (radio2depthCheck.code !== '') nextListData2Refetch();
    if (radio3depthCheck.code !== '') nextListData3Refetch();
    if (radio4depthCheck.code !== '') setNextList(4);
    if (radio5depthCheck.code !== '') setNextList(5);
    if (radio6depthCheck.code !== '') setNextList(6);
  }, [
    radio1depthCheck,
    radio2depthCheck,
    radio3depthCheck,
    radio4depthCheck,
    radio5depthCheck,
    radio6depthCheck,
  ]);

  // 체크값 변경시 초기화
  useEffect(() => {
    setSelected2depth('');
    setCheckedDepthList([]);
  }, [selected1depth]);
  useEffect(() => {
    setSelected3depth('');
    setCheckedDepthList([]);
  }, [selected2depth]);
  useEffect(() => {
    setSelected4depth('');
    setRadio4depthCheck({ title: '', checkValue: 0, code: '', key: '' });
    setCheckedDepthList([]);
  }, [selected3depth]);
  useEffect(() => {
    setSelected5depth('');
    setCheckedDepthList([]);
    setRadio5depthCheck({ title: '', checkValue: 0, code: '', key: '' });
  }, [selected4depth]);
  useEffect(() => {
    setSelected6depth('');
    setCheckedDepthList([]);
    setRadio6depthCheck({ title: '', checkValue: 0, code: '', key: '' });
  }, [selected5depth]);
  useEffect(() => {
    setSearchValue('');
    setCheckedDepthList([]);
    setSelectedCategoryEtc1([]);
    setSelectedCategoryEtc2([]);
    setRadioEtc1Check([]);
    setRadioEtc2Check([]);
  }, [selected6depth]);

  // 카테고리 선택후 아이템트리
  // 아이템 트리 불러오기 api
  const postCategoryItemTree = async () => {
    const depthChecks = [
      radio1depthCheck,
      radio2depthCheck,
      radio3depthCheck,
      radio4depthCheck,
      radio5depthCheck,
      radio6depthCheck,
    ];

    //서버로 부터 받은 nameList에 맞게 서버에 요청
    const groupsArray = categoryNameList.split(',');
    const keyValuePairs = groupsArray.reduce<Record<string, string>>(
      (acc, item, index) => {
        const depthCheck = depthChecks[index];
        if (depthCheck) {
          acc[item] = depthCheck.title; // title 속성을 사용하여 acc 객체에 추가
        }
        return acc;
      },
      {},
    );

    const itemTreeKeyList = { itemTreeKeyList: [keyValuePairs] };

    const res = await classificationInstance.post('/v2/item', itemTreeKeyList);
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
    if (selected6depth == '') return;
    categoryItemTreeDataMutate();
  }, [selected6depth]);

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
        classificationInstance.get(`/v1/category/class/${id}`),
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
      radio5depthCheck,
      radio6depthCheck,
      radioEtc1Check,
      radioEtc2Check,
    ];

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
    const listReset = [{ code: '', idx: 0, name: '' }];
    setRadio1depthCheck(reset);
    setRadio2depthCheck(reset);
    setRadio3depthCheck(reset);
    setRadio4depthCheck(reset);
    setRadio5depthCheck(reset);
    setRadio6depthCheck(reset);
    setRadioEtc1Check([]);
    setRadioEtc2Check([]);
    setSelected1depth('');
    setSelected2depth('');
    setSelected3depth('');
    setSelected4depth('');
    setSelected5depth('');
    setSelected6depth('');
    setNextList1depth(listReset);
    setNextList2depth(listReset);
    setNextList3depth(listReset);
    setNextList4depth(listReset);
    setNextList5depth(listReset);
    setSelectedCategoryEtc1([]);
    setSelectedCategoryEtc2([]);
    setCheckedDepthList([]);
  };

  // 수정
  const changeUnitClassification = (idx: number) => {
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
      const classification = selectedClassification[4] as RadioStateType;
      setSelected5depth(classification?.checkValue?.toString() || '');
      setRadio5depthCheck(classification as RadioStateType);
    }
  }, [isModifying, selected4depth]);

  useEffect(() => {
    if (isModifying && selected5depth !== '') {
      const classification = selectedClassification[5] as RadioStateType;
      setSelected6depth(classification?.checkValue?.toString() || '');
      setRadio6depthCheck(classification as RadioStateType);
    }
  }, [isModifying, selected5depth]);

  useEffect(() => {
    if (isModifying && selected6depth !== '') {
      const classification = selectedClassification[6] as ItemTreeIdxListType;
      setCheckedDepthList(classification.itemTreeIdxList);

      const classificationEtc1 = selectedClassification[7] as RadioStateType[];
      // 저장되었던 행동 요소1
      setSelectedCategoryEtc1(
        classificationEtc1.map((el) => el.checkValue?.toString()),
      );
      setRadioEtc1Check(classificationEtc1);

      const classificationEtc2 = selectedClassification[8] as RadioStateType[];
      // 저장되었던 행동 요소2
      setSelectedCategoryEtc2(
        classificationEtc2.map((el) => el.checkValue?.toString()),
      );
      setRadioEtc2Check(classificationEtc2);

      //초기화
      setIsModifying(false);
    }
  }, [isModifying, selected6depth]);

  // 교과정보 추가버튼 disable 처리
  const addButtonBool = useMemo(() => {
    if (
      unitClassificationList.length < 5 &&
      radio1depthCheck.code !== '' &&
      radio2depthCheck.code !== '' &&
      radio3depthCheck.code !== '' &&
      radio4depthCheck.code !== '' &&
      radio5depthCheck.code !== '' &&
      radio6depthCheck.code !== '' &&
      checkedDepthList.length > 0
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
    radio5depthCheck,
    radio6depthCheck,
    checkedDepthList,
  ]);

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

  // 검색 단어 하이라이트 && 하이라이트간 이동 처리
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  const contentRef = useRef<HTMLDivElement>(null);

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

        // 총 배점 관리를 위해서 전역 데이터 업데이트
        // if (isQuizNumExists) {
        //   setContentNumQuotient((prevItems) => {
        //     // 항목을 필터링하고 quizNum 순서로 정렬
        //     const updatedItems = prevItems
        //       .filter((item) => item !== isQuizNumExists)
        //       .sort((a, b) => a.num - b.num);
        //     return updatedItems;
        //   });
        // }
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
      enabled: tabVeiw == '즐겨찾는 문항',
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

  const [onFilter, setOnFilter] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState<string>('');
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

  const [favoriteQuestionList, setFavoriteQuestionList] =
    useState<FavoriteQuizList>();

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
      enabled: tabVeiw == '즐겨찾는 문항',
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

  const [isPriorityQuiz, setIsPriorityEven] = useState(false);
  const selectPriorityQuiz = () => {
    setIsPriorityEven(!isPriorityQuiz);
  };

  // 유사문항
  const [isSimilar, setIsSimilar] = useState(false);
  const [similarOriginItems, setSimilarOriginItems] =
    useState<SimilarQuizList | null>(null);
  const [similarItems, setSimilarItems] = useState<SimilarQuizList | null>(
    null,
  );
  const [similarItemCode, setSimilarItemCode] = useState<string>('');
  const [similarItemIndex, setSimilarItemIndex] = useState<number | null>(null);
  const [similarItemNumber, setSimilarItemNumber] = useState<number>();
  const [similarPrevItems, setSimilarPrevItems] = useState<SimilarQuizList[]>(
    [],
  );

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
  const showSimilarContent = (code: string, index: number, type: string) => {
    setSimilarItemCode(code);
    setSimilarItemIndex(index);
    setSimilarItemNumber(index + 1);
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
  const clickAddAllQuizItem = () => {
    //새문항 전체추가
    if (newQuizItems && getItemCountData) {
      const allNewQuizItems = newQuizItems.quizList;
      if (initialItems.length + allNewQuizItems.length <= getItemCountData) {
        setInitialItems((prevItems) => {
          // const maxNum = prevItems.reduce((max, item) => {
          //   return item.num && item.num > max ? item.num : max;
          // }, 0);
          const updatedQuizItem = allNewQuizItems.map((item, index) => ({
            ...item,
            //num: item.num ?? maxNum + 1 + index,
          }));
          const filteredQuizItem = updatedQuizItem.filter(
            (updatedItem) =>
              !initialItems.some(
                (initialItem) => initialItem.code === updatedItem.code,
              ),
          );
          return [...prevItems, ...filteredQuizItem];
        });
        setNewQuizItems((prevItems) => {
          if (prevItems) {
            return {
              ...prevItems,
              quizList: [],
            };
          }
          return prevItems;
        });
      } else {
        openToastifyAlert({
          type: 'error',
          text: `총 문항수 ${getItemCountData}개를 초과합니다.`,
        });
      }
    }
    //즐겨찾기 전체추가
    else if (favoriteQuestionList && getItemCountData) {
      const allNewQuizItems = favoriteQuestionList.quizList;
      if (initialItems.length + allNewQuizItems.length <= getItemCountData) {
        setInitialItems((prevItems) => {
          // const maxNum = prevItems.reduce((max, item) => {
          //   return item.num && item.num > max ? item.num : max;
          // }, 0);
          const updatedQuizItem = allNewQuizItems.map((item, index) => ({
            ...item,
            //num: item.num ?? maxNum + 1 + index,
          }));
          const filteredQuizItem = updatedQuizItem.filter(
            (updatedItem) =>
              !initialItems.some(
                (initialItem) => initialItem.code === updatedItem.code,
              ),
          );
          return [...prevItems, ...filteredQuizItem];
        });
        // setFavoriteQuestionList((prevItems) => {
        //   if (prevItems) {
        //     return {
        //       ...prevItems,
        //       quizList: [],
        //     };
        //   }
        //   return prevItems;
        // });
      } else {
        openToastifyAlert({
          type: 'error',
          text: `총 문항수 ${getItemCountData}개를 초과합니다.`,
        });
      }
    }
  };

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
                // const maxNum = prevItems.reduce((max, item) => {
                //   return item.num && item.num > max ? item.num : max;
                // }, 0);
                const updatedQuizItem = {
                  ...selectedQuizItem,
                  //num: selectedQuizItem.num ?? maxNum + 1,
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
                // 현재 문항들 중에서 num이 있는 문항들만 필터링하여 num의 최대값 찾기
                // const maxNum = prevItems.reduce((max, item) => {
                //   return item.num && item.num > max ? item.num : max;
                // }, 0);
                const updatedQuizItem = {
                  ...selectedQuizItem,
                  //num: selectedQuizItem.num ?? maxNum + 1,
                };
                return [...prevItems, updatedQuizItem];
              }
              return [selectedQuizItem]; // 초기 상태 설정
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

  //즐겨찾기 문항 추가 여부
  const [isAdded, setIsAdded] = useState(false);

  // useEffect(() => {
  //   // 누적 `num` 값을 유지할 변수
  //   let currentNum = 1;

  //   // `initialItems` 순회
  //   const updatedItems = initialItems.map((item) => {
  //     const updatedQuizItemList = item.quizItemList.map((quizItem) => {
  //       if (quizItem.type === 'QUESTION') {
  //         return {
  //           ...quizItem,
  //           num: currentNum++, // `num` 값을 부여하고 증가
  //         };
  //       }
  //       return quizItem; // `QUESTION`이 아니면 그대로 반환
  //     });

  //     return {
  //       ...item,
  //       quizItemList: updatedQuizItemList,
  //     };
  //   });

  //   setInitialItems(updatedItems);
  // }, [similarItems, newQuizItems, isAdded]);

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
                // 현재 문항들 중에서 num이 있는 문항들만 필터링하여 num의 최대값 찾기
                // const maxNum = prevItems.reduce((max, item) => {
                //   return item.num && item.num > max ? item.num : max;
                // }, 0);

                // selectedQuizItem에 num이 없으면 부여해서 score 부여
                const updatedQuizItem = {
                  ...selectedQuizItem,
                  //num: selectedQuizItem.num ?? maxNum + 1,
                };

                return [...prevItems, updatedQuizItem];
              }
              return [
                {
                  ...selectedQuizItem,
                  //num: selectedQuizItem.num ?? 1
                },
              ]; // 초기 상태 설정, num이 없으면 1 부여
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

  //수정, 복제 후 수정으로 들어왔을때 그룹끼리 묶기기
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
  }, [isDone]);

  //리스트 문항 교체하기 버그 발견/해결요망
  const clickSwapQuizItem = (
    similarItems: SimilarQuizList | undefined,
    similarItemIndex: number,
    initialItems: QuizList[],
    initialItemIndex: number,
  ) => {
    //console.log('similarItems;', similarItems);
    //console.log('similarItemIndex;', similarItemIndex);
    //console.log('initialItems;', initialItems);
    //console.log('initialItemIndex;', initialItemIndex);
    if (similarItems && initialItems) {
      const newSimilarItems = [...similarItems.quizList];
      const newInitialItems = [...initialItems];
      //console.log('newSimilarItems;', newSimilarItems);
      //console.log('newInitialItems;', newInitialItems);

      // 교체할 항목을 임시 저장
      const temp = newSimilarItems[similarItemIndex];

      //문항 번호 넣어주기
      newSimilarItems[similarItemIndex] = {
        ...newInitialItems[initialItemIndex],
        //num: similarItemIndex,
      };

      newInitialItems[initialItemIndex] = {
        ...temp,
        //num: newInitialItems[initialItemIndex].num,
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
    const target = e.currentTarget.childNodes[0].childNodes[0]
      .childNodes[0] as HTMLInputElement;
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
        //window.opener.localStorage.clear();
      };
    }
  }, [tabVeiw]);

  //tab 선택시 선택 초기화
  useEffect(() => {
    setUnitClassificationList([]);
    onResetList();
  }, [tabVeiw]);

  function createNewItems(initialItems: QuizList[]) {
    let numCounter = 1; // 'QUESTION' 타입의 항목에 대한 순차 번호
    const divideItems = initialItems.filter((item) => item.type === 'TEXT');
    const asidedItems = initialItems.filter((item) => item.type !== 'TEXT');

    // quizCategoryList를 quizCode별로 그룹화
    const groupedCategoryItems = divideItems.reduce(
      (acc, list) => {
        list.quizCategoryList.forEach((category) => {
          if (category.quizCode) {
            if (!acc[category.quizCode]) {
              acc[category.quizCode] = [];
            }
            acc[category.quizCode].push({
              ...category,
              groupCode: list.groupCode, // groupCode 추가
            });
          }
        });
        return acc;
      },
      {} as Record<string, any[]>,
    );

    const groupedItems = divideItems.reduce(
      (acc, list) => {
        list.quizItemList.forEach((item) => {
          if (item.quizCode) {
            // 그룹화할 때 quizCode를 키로 사용
            if (!acc[item.quizCode]) {
              acc[item.quizCode] = [];
            }

            // 각 quizCode별로 groupCode와 함께 항목을 저장
            acc[item.quizCode].push({
              groupCode: list.groupCode,
              groupType: item.type,
              ...item,
            });
          }
        });
        return acc;
      },
      {} as Record<
        string,
        (QuizItemList & { groupCode: string; groupType: string })[]
      >,
    );

    const newQuizListItems = Object.keys(groupedItems).map((quizCode, idx) => {
      const groupedItem = groupedItems[quizCode];
      const groupedCategory = groupedCategoryItems[quizCode] || [];

      // 각 quizCode별로 QuizList 객체 생성
      const newQuizList: QuizList = {
        groupCode: groupedItem[0].groupCode, // groupCode는 첫 번째 항목에서 가져옴
        code: quizCode,
        idx: idx + 1, // idx는 1부터 시작 (예시로 순차적인 인덱스)
        num: 0,
        score:
          groupedItem
            .filter((item) => item.type === 'QUESTION')
            .map((quiz) => quiz.score)
            .find((score) => score !== undefined && score !== null) ?? 0,
        isQuiz: true,
        height: 0,
        createdAt: '',
        createdBy: '',
        isDelete: false,
        isFavorite: false,
        isUse: true,
        lastArticle: null,
        lastModifiedAt: '',
        lastModifiedBy: '',
        quizCategoryList: groupedCategory,
        quizItemList: groupedItem.map((item) => {
          return {
            ...item,
          };
        }),
        // item.type이 TEXT나 BIG이면 'TEXT'로 설정, 그렇지 않으면 'QUESTION'으로 설정
        type:
          groupedItem[0].groupType === 'BIG' ||
          groupedItem[0].groupType === 'TEXT'
            ? 'TEXT'
            : 'QUESTION',
        userKey: '', // userKey는 추가적인 데이터가 필요하면 지정
      };

      return newQuizList;
    });

    // `newQuizListItems`와 `asidedItems`를 합쳐서 새로운 배열로 반환
    const combinedItems = [...newQuizListItems, ...asidedItems].map((item) => {
      const score =
        item.quizItemList
          .filter((quiz) => quiz.type === 'QUESTION')
          .map((quiz) => quiz.score)
          .find((score) => score !== undefined && score !== null) ?? 0;
      // `QUESTION` 타입을 확인하며 순차적으로 `num` 값을 설정
      if (item.type === 'QUESTION') {
        return {
          ...item,
          num: numCounter++,
          score: score,
        };
      }

      // // asidedItems에 score 값 추가
      // if (item.quizItemList) {
      //   const score =
      //     item.quizItemList
      //       .filter((quiz) => quiz.type === 'QUESTION')
      //       .map((quiz) => quiz.score)
      //       .find((score) => score !== undefined && score !== null) ?? 0;
      //   return {
      //     ...item,
      //     score: score, // score 값을 추가
      //   };
      // }

      return item;
    });

    return combinedItems; // 합쳐진 배열을 반환
  }

  //배점 모달
  const [isEqualScoreModal, setIsEqualScoreModal] = useState<boolean>(false);
  // 문항당 배점
  const [isSaveEqualValue, setIsSaveEqualValue] = useState<boolean>(false);
  //문항수 확인
  const [receivedQuizCount, setReceivedQuizCount] = useState<number | null>(
    null,
  );
  const [remainder, setRemainder] = useState<number>();

  //배점 로컬스토리지 저장
  const saveLocalQutientData = () => {
    const sendQuotientData = {
      equalScore: equalScore,
      equalTotalValue: equalTotalValue,
      remainderContent: remainderContent,
      quotient: quotient,
      nextRemainderContent: nextRemainderContent,
      minQuotient: minQuotient,
      maxQuotient: maxQuotient,
    };
    if (equalScore === 2) {
      localStorage.setItem(
        'sendQuotientData',
        JSON.stringify(sendQuotientData),
      );
    }
  };

  //균등배점 저장
  const saveEqualScoreSettingModal = () => {
    if (isSaveEqualValue) {
      closeEqualScoreSettingModal();
      saveLocalQutientData();
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
  useEffect(() => {
    // score의 합계 계산
    const totalScore = initialItems.reduce((total, item) => {
      const quizScoreSum = item.quizItemList.reduce((sum, el) => {
        return sum + (Number(el.score) || 0); // score를 숫자로 변환해서 합산
      }, 0);
      return total + quizScoreSum;
    }, 0);

    // score 합계를 상태에 업데이트
    setTotalEqualScore && setTotalEqualScore(totalScore);
  }, [initialItems]);

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

  // useEffect(() => {
  //   if (!isSaveEqualValue) {
  //     const quotientData = localStorage.getItem('sendQuotientData');

  //     if (quotientData) {
  //       try {
  //         const parsedQuotientData = JSON.parse(quotientData);
  //         // console.log('sendQuotientData:', parsedQuotientData); // 디버깅용 콘솔 로그
  //         setGetQuotientLocalData(parsedQuotientData);
  //       } catch (error) {
  //         console.error('로컬 스토리지 sendQuotientData 파싱 에러:', error);
  //       }
  //     } else {
  //       console.log('로컬 스토리지에 sendQuotientData가 없습니다.');
  //     }
  //   }
  // }, [isSaveEqualValue]);
  // useEffect(() => {
  //   // 누적 `num` 값을 유지할 변수
  //   let currentNum = 0;

  //   // `initialItems` 순회
  //   const updatedItems = initialItems.map((item) => {
  //     const updatedQuizItemList = item.quizItemList.map((quizItem) => {
  //       if (quizItem.type === 'QUESTION') {
  //         return {
  //           ...quizItem,
  //           num: currentNum++, // `num` 값을 부여하고 증가
  //         };
  //       }
  //       return quizItem; // `QUESTION`이 아니면 그대로 반환
  //     });

  //     return {
  //       ...item,
  //       quizItemList: updatedQuizItemList,
  //     };
  //   });
  //   setInitialItems(updatedItems);
  // }, []);
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
    const filterQuizItem = initialItems.some((item) => 'score' in item);

    if (filterQuizItem === false) {
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
    }

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

  // useEffect(() => {
  //   if (equalScore === null) {
  //     setTotalEqualScore(0);
  //   }
  // }, [equalScore === null]);

  const moveStep3 = () => {
    const createdItems = createNewItems(initialItems);
    const data = {
      data: createdItems,
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
                          {similarItemNumber}번 유사 문항
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
                                          similarItemIndex as number,
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
                                    {categoryItems[0] && categoryList && (
                                      <>
                                        {/* 교육과정 */}
                                        {
                                          <div
                                            className={`1depth`}
                                            id={categoryNameList.split(',')[0]}
                                            key={`selected1depth ${categoryNameList.split(',')[0]}`}
                                          >
                                            <ButtonFormatRadio
                                              titleText={
                                                categoryNameList.split(',')[0]
                                              }
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
                                        }
                                        {/* 학교급 */}
                                        {radio1depthCheck.code !== '' &&
                                          selected1depth !== '' && (
                                            <div
                                              className={`2depth`}
                                              id={
                                                categoryNameList.split(',')[1]
                                              }
                                              key={`selected2depth ${categoryNameList.split(',')[1]}`}
                                            >
                                              <ButtonFormatRadio
                                                branchValue={
                                                  categoryNameList.split(',')[1]
                                                }
                                                titleText={
                                                  categoryNameList.split(',')[1]
                                                }
                                                list={nextList1depth}
                                                selected={selected2depth}
                                                onChange={(e) =>
                                                  handleRadioCheck(e)
                                                }
                                                // defaultChecked={}
                                                checkedInput={radio2depthCheck}
                                              />
                                            </div>
                                          )}
                                        {/* 학년 */}
                                        {radio2depthCheck.code !== '' &&
                                          selected2depth !== '' && (
                                            <div
                                              className={`3depth`}
                                              id={
                                                categoryNameList.split(',')[2]
                                              }
                                              key={`selected3depth ${categoryNameList.split(',')[2]}`}
                                            >
                                              <ButtonFormatRadio
                                                branchValue={
                                                  categoryNameList.split(',')[2]
                                                }
                                                titleText={
                                                  categoryNameList.split(',')[2]
                                                }
                                                list={nextList2depth}
                                                selected={selected3depth}
                                                onChange={(e) =>
                                                  handleRadioCheck(e)
                                                }
                                                // defaultChecked={}
                                                checkedInput={radio3depthCheck}
                                              />
                                            </div>
                                          )}
                                        {/* 학기 */}
                                        {radio3depthCheck.code !== '' &&
                                          selected3depth !== '' && (
                                            <div
                                              className={`4depth`}
                                              id={
                                                categoryNameList.split(',')[3]
                                              }
                                              key={`selected4depth ${categoryNameList.split(',')[3]}`}
                                            >
                                              <ButtonFormatRadio
                                                branchValue={
                                                  categoryNameList.split(',')[3]
                                                }
                                                titleText={
                                                  categoryNameList.split(',')[3]
                                                }
                                                list={nextList3depth}
                                                selected={selected4depth}
                                                onChange={(e) =>
                                                  handleRadioCheck(e)
                                                }
                                                // defaultChecked={}
                                                checkedInput={radio4depthCheck}
                                              />
                                            </div>
                                          )}
                                        {/* 교과 */}
                                        {radio4depthCheck.code !== '' &&
                                          selected4depth !== '' && (
                                            <div
                                              className={`5depth`}
                                              id={
                                                categoryNameList.split(',')[4]
                                              }
                                              key={`selected5depth ${categoryNameList.split(',')[4]}`}
                                            >
                                              <ButtonFormatRadio
                                                branchValue={
                                                  categoryNameList.split(',')[4]
                                                }
                                                titleText={
                                                  categoryNameList.split(',')[4]
                                                }
                                                list={nextList4depth}
                                                selected={selected5depth}
                                                onChange={(e) =>
                                                  handleRadioCheck(e)
                                                }
                                                // defaultChecked={}
                                                checkedInput={radio5depthCheck}
                                              />
                                            </div>
                                          )}
                                        {/* 과목 */}
                                        {radio5depthCheck.code !== '' &&
                                          selected5depth !== '' && (
                                            <div
                                              className={`6depth`}
                                              id={
                                                categoryNameList.split(',')[5]
                                              }
                                              key={`selected6depth ${categoryNameList.split(',')[5]}`}
                                            >
                                              <ButtonFormatRadio
                                                overFlow
                                                branchValue={
                                                  categoryNameList.split(',')[5]
                                                }
                                                titleText={
                                                  categoryNameList.split(',')[5]
                                                }
                                                list={nextList5depth}
                                                selected={selected6depth}
                                                onChange={(e) =>
                                                  handleRadioCheck(e)
                                                }
                                                // defaultChecked={}
                                                checkedInput={radio6depthCheck}
                                              />
                                            </div>
                                          )}
                                      </>
                                    )}

                                    <p className="line"></p>

                                    {/* 교과정보 아코디언 리스트  */}
                                    {radio1depthCheck.code !== '' &&
                                    radio2depthCheck.code !== '' &&
                                    radio3depthCheck.code !== '' &&
                                    radio4depthCheck.code !== '' &&
                                    radio5depthCheck.code !== '' &&
                                    radio6depthCheck?.code !== '' &&
                                    selected1depth !== '' &&
                                    selected2depth !== '' &&
                                    selected3depth !== '' &&
                                    selected4depth !== '' &&
                                    selected5depth !== '' ? (
                                      <AccordionWrapper>
                                        <Accordion
                                          defaultChecked={isModifying}
                                          title={`${radio1depthCheck.title}/${radio2depthCheck.title}/${radio3depthCheck.title}학년/${radio4depthCheck.title}`}
                                          id={`${radio1depthCheck.title}/${radio2depthCheck.title}/${radio3depthCheck.title}학년/${radio4depthCheck.title}`}
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
                              categoryItemTreeData && itemTree.length
                                ? itemTree.reduce(
                                    (total, el) =>
                                      total +
                                      el.itemTreeList.filter((item) =>
                                        item.name.includes(searchValue),
                                      ).length,
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

                                        <Accordion
                                          title={'추가정보'}
                                          id={'추가정보'}
                                          $margin={'4px 0 0 0 '}
                                          defaultChecked={isModifying}
                                        >
                                          <RowListWrapper>
                                            {categoryAddInfoList ? (
                                              <>
                                                {[categoryItems[4]].map(
                                                  (item) => (
                                                    <div
                                                      id={`${item.name}`}
                                                      className={`etc1`}
                                                      key={`etc1 ${item.idx}`}
                                                    >
                                                      <ButtonFormatMultiRadio
                                                        branchValue={`${item.name}`}
                                                        titleText={`${item.name}`}
                                                        list={
                                                          categoryAddInfoList[0]
                                                        }
                                                        selected={
                                                          selectedCategoryEtc1
                                                        }
                                                        onChange={(e) =>
                                                          handleMultiRadioCheck(
                                                            e,
                                                          )
                                                        }
                                                        checkedInputs={
                                                          radioEtc1Check
                                                        }
                                                      />
                                                    </div>
                                                  ),
                                                )}
                                                {[categoryItems[5]].map(
                                                  (item) => (
                                                    <div
                                                      id={`${item.name}`}
                                                      className={`etc2`}
                                                      key={`etc2 ${item.idx}`}
                                                    >
                                                      <ButtonFormatMultiRadio
                                                        branchValue={`${item.name}`}
                                                        titleText={`${item.name}`}
                                                        list={
                                                          categoryAddInfoList[1]
                                                        }
                                                        selected={
                                                          selectedCategoryEtc2
                                                        }
                                                        onChange={(e) =>
                                                          handleMultiRadioCheck(
                                                            e,
                                                          )
                                                        }
                                                        checkedInputs={
                                                          radioEtc2Check
                                                        }
                                                      />
                                                    </div>
                                                  ),
                                                )}
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
                      {tabVeiw === '즐겨찾는 문항' && (
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
                                    clickSwapQuizItem={() =>
                                      clickSwapQuizItem(
                                        similarItems as SimilarQuizList,
                                        0,
                                        initialItems,
                                        similarItemIndex as number,
                                      )
                                    }
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
