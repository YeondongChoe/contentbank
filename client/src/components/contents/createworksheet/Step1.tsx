import * as React from 'react';
import { useState, useEffect, useRef, useMemo } from 'react';

import { useIsMutating, useMutation, useQuery } from '@tanstack/react-query';
import { IoMdClose, IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  DifficultyRate,
  openToastifyAlert,
  CheckBox,
  Button,
  TabMenu,
  Input,
  Label,
  Search,
  ButtonFormatRadio,
  Accordion,
  DepthBlock,
  ValueNone,
  Loader,
  Icon,
  IconButton,
  PaginationBox,
} from '../..';
import { classificationInstance, quizService } from '../../../api/axios';
import { pageAtom } from '../../../store/utilAtom';
import {
  MockexamType,
  ItemCategoryType,
  ItemTreeListType,
} from '../../../types';
import {
  TextbookInfoType,
  TextBookDetailType,
} from '../../../types/TextbookType';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { COLOR } from '../../constants';
import dummy from '../../constants/data.json';

type RadioState = {
  title: string;
  checkValue: number;
  code: string;
};

type UnitClassificationListType = {
  title: string;
  checkValue: number;
  code: string;
  checkedDepthList?: number[];
};

type ProcessDataType = {
  bookPage: string;
  subChapter: string;
  isChecked: boolean;
  quizList: {
    idx: number;
    code: string;
    bookQuizNumber: string;
    isChecked: boolean;
    seq: string;
  }[];
};

type MockDataType = {
  seq: number;
  grade: string;
  year: string;
  month: string;
  isChecked?: boolean;
  content: MockContent[];
};

type MockContent = {
  seq: number;
  title: string;
  isChecked?: boolean;
};

//시중교재
const processData = (data: TextBookDetailType): ProcessDataType => {
  return {
    bookPage: data.bookPage || '',
    subChapter: data.subChapter || '',
    isChecked: false,
    quizList: data.quizList.map((quiz) => ({
      ...quiz,
      isChecked: false,
      seq: `${quiz.code}${quiz.bookQuizNumber}`,
    })),
  };
};

//수능모의고사
const processMockexam = (dataList: MockexamType[]): MockDataType[] => {
  return dataList.map((data) => {
    return {
      seq: data.seq,
      grade: data.grade,
      year: data.year,
      month: data.month,
      isChecked: false,
      content: data.content.map((contentItem) => ({
        seq: contentItem.seq,
        title: contentItem.title,
        isChecked: false,
      })),
    };
  });
};

export function Step1() {
  const menuList = [
    {
      label: '단원·유형별',
      value: '단원·유형별',
    },
    {
      label: '시중교재',
      value: '시중교재',
    },
    {
      label: '수능/모의고사',
      value: '수능/모의고사',
    },
  ];

  const [tabVeiw, setTabVeiw] = useState<string>('단원·유형별');
  const navigate = useNavigate();

  const [radio1depthCheck, setRadio1depthCheck] = useState<RadioState>({
    title: '',
    checkValue: 0,
    code: '',
  });
  const [radio2depthCheck, setRadio2depthCheck] = useState<RadioState>({
    title: '',
    checkValue: 0,
    code: '',
  });
  const [radio3depthCheck, setRadio3depthCheck] = useState<RadioState>({
    title: '',
    checkValue: 0,
    code: '',
  });
  const [radio4depthCheck, setRadio4depthCheck] = useState<RadioState>({
    title: '',
    checkValue: 0,
    code: '',
  });
  const [radioEtc1Check, setRadioEtc1Check] = useState<RadioState>({
    title: '',
    checkValue: 0,
    code: '',
  });
  const [radioEtc2Check, setRadioEtc2Check] = useState<RadioState>({
    title: '',
    checkValue: 0,
    code: '',
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
    UnitClassificationListType[][]
  >([]);

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
    if (tabVeiw === '단원·유형별' && groupsData) {
      fetchCategoryItems(groupsData);
    }
  }, [groupsData, tabVeiw]);

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
      if (error.data.code == 'GE-002') postRefreshToken();
    }
  };

  // 라디오 버튼 설정
  const handleRadioCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const depth =
      e.target.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement?.classList[0];
    switch (depth) {
      case '1depth':
        setSelected1depth(e.currentTarget.id);
        setRadio1depthCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
        });
        break;
      case '2depth':
        setSelected2depth(e.currentTarget.value);
        setRadio2depthCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
        });
        break;
      case '3depth':
        setSelected3depth(e.currentTarget.value);
        setRadio3depthCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
        });
        break;
      case '4depth':
        setSelected4depth(e.currentTarget.value);
        setRadio4depthCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
        });
        break;

      case 'etc1':
        setSelectedCategoryEtc1(e.currentTarget.value);
        setRadioEtc1Check({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
        });
        break;
      case 'etc2':
        setSelectedCategoryEtc2(e.currentTarget.value);
        setRadioEtc2Check({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
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
      if (error.data.code == 'GE-002') postRefreshToken();
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
      if (error.data.code == 'GE-002') postRefreshToken();
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
      if (error.data.code == 'GE-002') postRefreshToken();
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
    setRadio4depthCheck({ title: '', checkValue: 0, code: '' });
    setItemTree([]);
  }, [selected3depth]);
  useEffect(() => {
    setSelectedCategoryEtc1('');
    setSelectedCategoryEtc2('');
    setRadioEtc1Check({ title: '', checkValue: 0, code: '' });
    setRadioEtc2Check({ title: '', checkValue: 0, code: '' });
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

    const res = await classificationInstance.post('/v1/item', itemTreeKeyList);
    // console.log('classificationInstance 응답:', res);
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
      if (error?.data?.code == 'GE-002') {
        postRefreshToken();
        groupsDataRefetch();
      }
    }
  };

  const saveCheckItems = (checkedDepthList: number[]) => {
    if (unitClassificationList.length < 5) {
      setUnitClassificationList((prevList) => [
        ...prevList,
        [
          radio1depthCheck,
          radio2depthCheck,
          radio3depthCheck,
          radio4depthCheck,
          radioEtc1Check,
          radioEtc2Check,
          { title: '', checkValue: 0, code: '', checkedDepthList },
        ],
      ]);
    }
    //선택정보 저장과 함께 체크상태 초기화
    //저장 성공 후
    const reset = { title: '', checkValue: 0, code: '' };
    setRadio1depthCheck(reset);
    setRadio2depthCheck(reset);
    setRadio3depthCheck(reset);
    setRadio4depthCheck(reset);
  };
  //삭제
  const deleteUnitClassification = (idx: number) => {
    setUnitClassificationList((prevList) => [
      ...prevList.slice(0, idx),
      ...prevList.slice(idx + 1),
    ]);
  };

  // 수정
  const changeUnitClassification = (idx: number) => {
    // console.log('unitClassificationList', unitClassificationList);
    const selectedClassification = unitClassificationList[idx];

    if (selectedClassification) {
      if (selectedClassification[0]) {
        setRadio1depthCheck(selectedClassification[0]);
        setSelected1depth(selectedClassification[0].code);
      } else {
        setRadio1depthCheck({ title: '', checkValue: 0, code: '' });
        setSelected1depth('');
      }

      if (selectedClassification[1]) {
        setRadio2depthCheck(selectedClassification[1]);
        setSelected2depth(selectedClassification[1].code);
      } else {
        setRadio2depthCheck({ title: '', checkValue: 0, code: '' });
        setSelected2depth('');
      }

      if (selectedClassification[2]) {
        setRadio3depthCheck(selectedClassification[2]);
        setSelected3depth(selectedClassification[2].code);
      } else {
        setRadio3depthCheck({ title: '', checkValue: 0, code: '' });
        setSelected3depth('');
      }

      if (selectedClassification[3]) {
        setRadio4depthCheck(selectedClassification[3]);
        setSelected4depth(selectedClassification[3].code);
      } else {
        setRadio4depthCheck({ title: '', checkValue: 0, code: '' });
        setSelected4depth('');
      }

      if (selectedClassification[4]) {
        setRadioEtc1Check(selectedClassification[4]);
        setSelectedCategoryEtc1(selectedClassification[4].code);
      } else {
        setRadioEtc1Check({ title: '', checkValue: 0, code: '' });
        setSelectedCategoryEtc1('');
      }

      if (selectedClassification[5]) {
        setRadioEtc2Check(selectedClassification[5]);
        setSelectedCategoryEtc2(selectedClassification[5].code);
      } else {
        setRadioEtc2Check({ title: '', checkValue: 0, code: '' });
        setSelectedCategoryEtc2('');
      }
    }
  };

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

  useEffect(() => {}, []);

  // 깊이가 있는 리스트 체크박스
  const handleSingleCheck = (checked: boolean, idx: number) => {
    if (checked) {
      setCheckedDepthList((prev) => [...prev, idx]);
    } else {
      setCheckedDepthList(checkedDepthList.filter((el) => el !== idx));
    }
  };

  //단원.유형별
  const [inputValue, setInputValue] = useState('');
  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // 정규표현식을 사용하여 숫자 이외의 문자 제거
    inputValue = inputValue.replace(/[^0-9]/g, '');

    const parsedValue = parseInt(inputValue, 10);

    if (!isNaN(parsedValue) && parsedValue > 0) {
      setInputValue(
        parsedValue < 1 ? '1' : parsedValue >= 100 ? '100' : inputValue,
      );
    }
  };

  const [questionNum, setQuestionNum] = useState<string | null>(null);
  const selectQuestionNum = (newValue: string | null) => {
    setQuestionNum(newValue);
    setInputValue('');
  };

  const [questionLevel, setQuestionLevel] = useState<string | null>(null);
  const selectQuestionLevel = (newValue: string | null) => {
    setQuestionLevel(newValue);
  };

  const [questionType, setQuestionType] = useState<string[] | null>(null);

  const selectQuestionType = (newValue: string | null) => {
    setQuestionType((prev) => {
      // prev가 null일 경우 빈 배열로 초기화
      const prevArray = prev ?? [];

      if (newValue === null) {
        return prevArray; // newValue가 null이면 변경하지 않음
      }

      if (prevArray.includes(newValue)) {
        // 이미 선택된 경우 선택 취소
        return prevArray.filter((type) => type !== newValue);
      } else {
        // 새로운 선택 추가
        return [...prevArray, newValue];
      }
    });
  };

  const [isDifficulty, setIsDifficulty] = useState(false);
  const openDifficultySetting = () => {
    setIsDifficulty(true);
  };
  const closeDifficultySetting = () => {
    setIsDifficulty(false);
  };

  const [isAutoGrading, setIsAutoGrading] = useState(false);
  const checkAutoGrading = () => {
    setIsAutoGrading(!isAutoGrading);
  };

  const isAllSelectedQuestionType =
    questionType?.includes('MULTIPLE_CHOICE') &&
    questionType?.includes('SHORT_ANSWER') &&
    questionType?.includes('ESSAY_ANSWER');

  const [containMock, setContainMock] = useState<number | null>(null);
  const selectContainMock = (newValue: number | null) => {
    setContainMock(newValue);
  };
  //배점
  const [equalScore, setEqualScore] = useState<number | null>(null);
  const selectEqualScore = (newValue: number | null) => {
    setEqualScore(newValue);
  };
  const [isEqualScoreModal, setIsEqualScoreModal] = useState<boolean>(false);

  const openEqualScoreSettingModal = () => {
    if (questionNum || inputValue) {
      setIsEqualScoreModal(true);
      setIsSaveEqualValue(false);
      setEqualInputValue('0');
    } else {
      alert('문항수 선택해라');
      selectEqualScore(null);
      setIsSaveEqualValue(false);
    }
  };
  const [equalInputValue, setEqualInputValue] = useState('0');
  const [isSaveEqualValue, setIsSaveEqualValue] = useState<boolean>(false);

  //나머지 시작 컨텐츠
  const [remainderContent, setRemainderContent] = useState<number>();
  //나머지 시작 전 컨텐츠
  const [nextRemainderContent, setNextRemainderContent] = useState<number>();
  //문항당 배점
  const [quotient, setQuotient] = useState<number>(0);
  const [remainder, setRemainder] = useState<number>();

  const closeEqualScoreSettingModal = () => {
    setIsEqualScoreModal(false);
    setEqualInputValue('0');
  };
  const saveEqualScoreSettingModal = () => {
    if (isSaveEqualValue) {
      setIsEqualScoreModal(false);
      closeEqualScoreSettingModal();
    } else {
      if (equalInputValue) {
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
  };

  const changeEqualInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let equalInputValue = e.target.value;

    // 정규표현식을 사용하여 숫자 이외의 문자 제거
    equalInputValue = equalInputValue.replace(/[^0-9]/g, '');

    const parsedValue = parseInt(equalInputValue, 10);
    setEqualInputValue(parsedValue >= 200 ? '200' : equalInputValue);
  };

  const saveEqualInputValue = () => {
    const parsedValue = parseInt(equalInputValue, 10);
    const questionNumValue = parseInt(questionNum || inputValue, 10);
    if (equalInputValue === '') {
      openToastifyAlert({
        type: 'error',
        text: '총 배점을 입력해주세요.',
      });
      setIsSaveEqualValue(false);
      setEqualInputValue('0');
      setQuotient(0);
    } else if (equalInputValue && parsedValue < questionNumValue) {
      openToastifyAlert({
        type: 'error',
        text: '총 배점은 총 문항수보다 크거나 같아야합니다.',
      });
      setEqualInputValue(questionNum || inputValue);
      setIsSaveEqualValue(false);
    } else {
      openToastifyAlert({
        type: 'success',
        text: '저장되었습니다.',
      });
      setEqualInputValue(equalInputValue);
      setIsSaveEqualValue(true);
    }
  };

  const [minQuotient, setMinQuotient] = useState<number>();
  const [maxQuotient, setMaxQuotient] = useState<number>();

  useEffect(() => {
    const parsedValue = parseInt(equalInputValue, 10);
    const questionNumValue = parseInt(questionNum || inputValue, 10);

    if (isSaveEqualValue) {
      const quotient = Math.floor(parsedValue / questionNumValue);
      const remainder = parsedValue % questionNumValue;
      setQuotient(quotient);
      setRemainder(remainder);
      if (quotient || remainder) {
        const remainderContent = questionNumValue - remainder;
        const minQuotient = quotient - 1;
        const maxQuotient = quotient + 2;
        setRemainderContent(remainderContent);
        setNextRemainderContent(remainderContent + 1);
        setMinQuotient(minQuotient <= 0 ? 1 : minQuotient);
        setMaxQuotient(maxQuotient);
      }
    }
  }, [isSaveEqualValue, equalInputValue]);

  const [isOption1, setIsOption1] = useState(false);
  const selectOption1 = () => {
    setIsOption1(!isOption1);
  };
  const [isOption2, setIsOption2] = useState(false);
  const selectOption2 = () => {
    setIsOption2(!isOption2);
  };
  //문항 수 균등 배분
  const [isQuizEven, setIsQuizEven] = useState(false);
  const selectQuizEven = () => {
    setIsQuizEven(!isQuizEven);
  };
  //내 문항 우선 추천
  const [isPriority, setIsPriority] = useState(false);
  const selectPriority = () => {
    setIsPriority(!isPriority);
  };

  //시중교재
  const [page, setPage] = useRecoilState(pageAtom);
  const changeTab = () => {
    setPage(1);
  };
  const [schoolLevel, setSchoolLevel] = useState<string>('초등');
  const selectSchoolLevel = (newValue: string) => {
    setSchoolLevel(newValue);
  };
  const [gradeLevel, setgradeLevel] = useState<string | null>(null);
  const selectGradeLevel = (newValue: string | null) => {
    setgradeLevel(newValue);
  };

  const [searchValue, setSearchValue] = useState<string>('');

  const [isSelectTextbook, setIsSelectTextbook] = useState(true);
  const [selectedTextbookTitle, setSelectedTextbookTitle] = useState<
    string | null
  >(null);
  const [selectedTextbookIdx, setSelectedTextbookIdx] = useState<number | null>(
    null,
  );
  const [selectedTextbook, setSelectedTextbook] = useState<ProcessDataType[]>(
    [],
  );
  const [isSelectTextbookContent, setIsSelectTextbookContent] = useState(false);

  //선택한 시중교재 get api
  const selectTextbook = async (idx: number, title: string) => {
    setSelectedTextbookIdx(idx);
    setSelectedTextbookTitle(title);
    setIsSelectTextbook(false);
    setIsSelectTextbookContent(true);
  };
  const getTextbookDetail = async (idx: number) => {
    const res = await quizService.get(`/v1/textbook/${idx}`);
    // console.log(`getTextbookDetail 결과값`, res);
    setSelectedTextbook(res.data.data.textbookList);
    return res;
  };
  const { data: textbookDetailData } = useQuery({
    queryKey: ['get-textbookDetail'],
    queryFn: () => getTextbookDetail(selectedTextbookIdx as number),
    meta: {
      errorMessage: 'get-textbookDetail 에러 메세지',
    },
    enabled: !!selectedTextbookIdx,
  });
  //다른 교재 선택
  const selectOtherTextbook = () => {
    setIsSelectTextbook(true);
    setIsSelectTextbookContent(false);
    setClickedIdx(0);
    setIsChoice(false);
    setData([]);
    setSelectedTextbookIdx(null);
  };
  // 시중교재 불러오기 api
  const getTextbook = async () => {
    const res = await quizService.get(
      `/v1/textbook?pageIndex=${page}&pageUnit=${8}&level=${schoolLevel}&grade=${gradeLevel || ''}&searchKeyword=${searchValue || ''}`,
    );
    // console.log(`getTextbook 결과값`, res);
    return res;
  };
  const { data: textbookData, refetch: textbookDataRefetch } = useQuery({
    queryKey: ['get-textbook'],
    queryFn: getTextbook,
    meta: {
      errorMessage: 'get-textbook 에러 메세지',
    },
    enabled: tabVeiw === '시중교재',
  });
  const textbookList: TextbookInfoType[] = textbookData?.data.data.textbookList;
  //조건값이 바뀔때 재검색
  useEffect(() => {
    textbookDataRefetch();
  }, [page, schoolLevel, gradeLevel, searchValue]);

  const [isChoice, setIsChoice] = useState(false);
  const [clickedIdx, setClickedIdx] = useState<number | null>(null);
  const [data, setData] = useState<ProcessDataType[]>([]);

  useEffect(() => {
    if (selectedTextbook && Array.isArray(selectedTextbook)) {
      setData(() => {
        return selectedTextbook.map((textbook) => processData(textbook));
      });
    }
  }, [selectedTextbook]);

  // 선택시 배경색이 나타남
  const choiceType = (idx: number) => {
    setIsChoice(!isChoice);
    if (clickedIdx === idx) {
      setClickedIdx(null);
    } else {
      setClickedIdx(idx);
    }
  };

  // 전체 선택
  const checkAllToggle = (
    subChapter: string,
    isChecked: boolean,
    contentSeqs: string[],
  ) => {
    setData((prevData) => {
      if (!prevData) return prevData;

      return prevData.map((page) => {
        if (page.subChapter === subChapter) {
          const updatedQuizList = page.quizList.map((quiz) => {
            if (contentSeqs.includes(quiz.seq)) {
              return { ...quiz, isChecked: !isChecked };
            }
            return quiz;
          });
          return { ...page, isChecked: !isChecked, quizList: updatedQuizList };
        }
        return page;
      });
    });
  };

  //부분 선택
  const checkPartialToggle = (
    subChapter: string,
    contentSeq: string,
    isChecked: boolean,
  ) => {
    setData((prevData) => {
      if (!prevData) return prevData;

      return prevData.map((page) => {
        if (page.subChapter === subChapter) {
          const updatedQuizList = page.quizList.map((quiz) => {
            if (quiz.seq === contentSeq) {
              return { ...quiz, isChecked: !isChecked };
            }
            return quiz;
          });

          // 모든 컨텐츠가 선택되어 있는지 확인
          const allContentsChecked = updatedQuizList.every(
            (quiz) => quiz.isChecked,
          );

          return {
            ...page,
            isChecked: allContentsChecked,
            quizList: updatedQuizList,
          };
        }
        return page;
      });
    });
  };

  // 수능/모의고사
  const getCategoryExamGroups = async () => {
    const response = await classificationInstance.get('/v1/category/group/D'); //TODO: /group/${``} 하드코딩된 유형 나중에 해당 변수로 변경
    return response.data.data.typeList;
  };
  const { data: examData } = useQuery({
    queryKey: ['get-category-exam-groups'],
    queryFn: getCategoryExamGroups,
    meta: {
      errorMessage: 'get-category-exam-groups 에러 메세지',
    },
  });
  useEffect(() => {
    if (tabVeiw === '수능/모의고사' && examData) {
      fetchCategoryItems(examData);
    }
  }, [examData, tabVeiw]);

  const excludedNames = ['1', '2', '8', '12'];

  // 드롭다운에서 선택한 값으로 더미데이터를 대신해서 넣고 선택 완료를 누르면 서버에 요청해서 값을 저장함
  const [isDropdown, setIsDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const openDropdown = () => {
    setIsDropdown((prevState) => !prevState);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // 클릭된 엘리먼트가 드롭다운 영역 안에 속하지 않으면 드롭다운을 닫습니다.
      if (
        //수능/모의고사 선택 화살표
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdown(false);
      }
    };

    // document에 클릭 이벤트 리스너를 추가합니다.
    document.addEventListener('click', handleOutsideClick);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const [examGrade, setExamGrade] = useState<string[]>([]);
  const selectExamGrade = (newValue: string) => {
    setExamGrade((prev) => {
      if (prev.includes(newValue)) {
        // 이미 선택된 경우 선택 취소
        return prev.filter((type) => type !== newValue);
      } else {
        // 새로운 선택 추가
        return [...prev, newValue];
      }
    });
  };
  const isAllSelectedExamGrade =
    examGrade.includes('1') &&
    examGrade.includes('2') &&
    examGrade.includes('3');

  const [examYear, setExamYear] = useState<string[]>([]);
  const selectExamYear = (newValue: string) => {
    setExamYear((prev) => {
      if (prev.includes(newValue)) {
        // 이미 선택된 경우 선택 취소
        return prev.filter((type) => type !== newValue);
      } else {
        // 새로운 선택 추가
        return [...prev, newValue];
      }
    });
  };

  const isAllSelectedExamYear =
    examYear.includes('2024') &&
    examYear.includes('2023') &&
    examYear.includes('2022') &&
    examYear.includes('2021') &&
    examYear.includes('2020');

  const [examMonthly, setExamMonthly] = useState<string[]>([]);
  const selectExamMonthly = (newValue: string) => {
    setExamMonthly((prev) => {
      if (prev.includes(newValue)) {
        // 이미 선택된 경우 선택 취소
        return prev.filter((type) => type !== newValue);
      } else {
        // 새로운 선택 추가
        return [...prev, newValue];
      }
    });
  };

  const isAllSelectedExamMonthly =
    examMonthly.includes('3') &&
    examMonthly.includes('4') &&
    examMonthly.includes('5') &&
    examMonthly.includes('6') &&
    examMonthly.includes('7') &&
    examMonthly.includes('9') &&
    examMonthly.includes('10') &&
    examMonthly.includes('11');

  const [examOption, setExamOption] = useState<number | null>(null);
  const selectExamOption = (newValue: number | null) => {
    setExamOption(newValue);
  };
  const selectExamReset = () => {
    setExamGrade([]);
    setExamYear([]);
    setExamMonthly([]);
    setExamOption(null);
  };
  // 수능 모의고사 불러오기 api
  const selectExam = () => {
    setIsDropdown(false);
    const grades = examGrade.join(',');
    const years = examYear.join(',');
    const months = examMonthly.join(',');
    const res = quizService.get(
      `/v1/csat?option=${examOption}&level='고등'&subject='수학'&grades=${grades}&years=${years}&months=${months}`,
    );
    // console.log(`getCsat 결과값`, res);
    return res;
  };

  const mockexamList: MockexamType[] = dummy.Mockexam;
  const [processedData, setProcessedData] = useState(
    processMockexam(mockexamList),
  );

  const removeMockexam = (seq: number) => {
    setProcessedData((prevData) => prevData.filter((mock) => mock.seq !== seq));
  };

  // 전체 선택
  const checkAllMockexamToggle = (
    seq: number,
    isChecked: boolean,
    contentSeqs: number[],
  ) => {
    //setProcessedData에 있는 기존 값을 가져와서 그 값을 순회하며 비교하여 값을 갱신
    setProcessedData((prevData) => {
      const newData = prevData.map((mock) => {
        if (mock.seq === seq) {
          mock.isChecked = !isChecked;

          if (contentSeqs.length > 0) {
            mock.content.forEach((content) => {
              if (contentSeqs.includes(content.seq)) {
                content.isChecked = !isChecked;
              }
            });
          }
        }
        // 갱신된 값을 가져오기
        return mock;
      });
      //가져온 값을 최종적으로 상태값으로 갱신하기
      return [...newData];
    });
  };

  //부분 선택
  const checkPartialMockexamToggle = (
    seq: number,
    contentSeq: number,
    isChecked: boolean,
  ) => {
    setProcessedData((prevData) => {
      const newData = prevData.map((mock) => {
        if (mock.seq === seq) {
          const targetContent = mock.content.find(
            (content) => content.seq === contentSeq,
          );

          if (targetContent) {
            targetContent.isChecked = !isChecked;

            const allContentsChecked = mock.content.every(
              (content) => content.isChecked,
            );
            mock.isChecked = allContentsChecked;
          }
        }
        return mock;
      });

      return [...newData];
    });
  };

  // step1 선택된 문항 불러오기 api
  const postWorkbookStep1 = async (data: any) => {
    return await quizService.post(`/v1/search/quiz/step/1`, data);
  };

  const { mutate: postStep1Data } = useMutation({
    mutationFn: postWorkbookStep1,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
    },
    onSuccess: (response) => {
      saveLocalData(response.data.data);
      navigate('/content-create/exam/step2');
    },
  });

  const makingdata = unitClassificationList.map((item) => ({
    itemTreeKey: {
      교육과정: item[0].title,
      학교급: item[1].title,
      학기: item[2].title,
      학년: item[3].title,
    },
    itemTreeIdxList: item[6].checkedDepthList,
  }));
  const clickNextButton = () => {
    const data = {
      itemTreeKeyList: makingdata,
      count: Number(questionNum),
      difficulty: questionLevel === '선택안함' ? null : questionLevel,
      type: questionType,
      mock: containMock,
      score: equalScore,
      isScoreEven: true,
      isQuizEven: isQuizEven,
      isMePriority: isPriority,
      filterList: null,
    };
    postStep1Data(data);
  };

  const [sendLocalData, setSendLocalData] = useState<any | null>(null);

  // 로컬 스토리지에서 데이터 가져오기
  useEffect(() => {
    const data = localStorage.getItem('sendData');
    if (data) {
      const parsedData = JSON.parse(data);
      // console.log('데이터 조회', parsedData);
      setSendLocalData(parsedData);
    }
  }, []);

  // 로컬 스토리지 값 다 받은 뒤 초기화
  useEffect(() => {
    if (sendLocalData) {
      window.opener.localStorage.clear();
    }
  }, [sendLocalData]);
  //로컬 스토리지에서 받아온 값이 있다면 보여주기
  useEffect(() => {
    if (sendLocalData) {
      setQuestionNum(sendLocalData.문항수);
      setQuestionLevel(sendLocalData.난이도);
      setQuestionType([sendLocalData.문항타입]);
    }
  }, [sendLocalData]);

  // 로컬스토리지에 보낼데이터 저장
  const saveLocalData = (data: any) => {
    const sendData = { data: data };
    // console.log(sendData);
    localStorage.setItem('sendData', JSON.stringify(sendData));
  };

  const moveStep2 = () => {
    clickNextButton();
  };

  useEffect(() => {
    //단원 유형별버튼 초기화
    setQuestionNum(null);
    setQuestionLevel('');
    setQuestionType([]);
    setContainMock(null);
    setIsOption1(false);
    setIsOption2(false);
    setIsQuizEven(false);
    setIsPriority(false);
    //시중교재
    setSearchValue('');
    setSchoolLevel('초등');
    setgradeLevel(null);
    //모의시험 버튼 초기화
    setIsDropdown(false);
    setExamGrade([]);
    setExamYear([]);
    setExamMonthly([]);
    setExamOption(null);
  }, [tabVeiw]);

  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <Title>
            <Span>STEP 1</Span> 학습지 종류 및 범위 선택
          </Title>
        </TitleWrapper>
        <MainWrapper>
          {tabVeiw === '단원·유형별' && (
            <>
              <CategorySection>
                <TabWrapper>
                  <TabMenu
                    length={3}
                    menu={menuList}
                    width={'350px'}
                    lineStyle
                    selected={tabVeiw}
                    setTabVeiw={setTabVeiw}
                    onClickTab={changeTab}
                  />
                </TabWrapper>
                <CategoryWrapper>
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
                              onClick={() => changeUnitClassification(idx)}
                            >
                              <span>
                                {el.map((item) => `${item.title} / `)}
                              </span>
                            </IconButton>

                            <Icon
                              onClick={() => deleteUnitClassification(idx)}
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
                  {isCategoryLoaded && categoryItems[0] && categoryList && (
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
                            onChange={(e) => handleRadioCheck(e)}
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
                              onChange={(e) => handleRadioCheck(e)}
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
                              onChange={(e) => handleRadioCheck(e)}
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
                              onChange={(e) => handleRadioCheck(e)}
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
                            value={''}
                            height={'30px'}
                            onClick={() => {}}
                            onChange={() => {}}
                            onKeyDown={() => {}}
                          />
                          <p className="line bottom_text">Total : {`${0}`}</p>
                          {isPending && (
                            <LoaderWrapper>
                              <Loader width="50px" />
                            </LoaderWrapper>
                          )}

                          {categoryItemTreeData ? (
                            <>
                              {itemTree.length ? (
                                <>
                                  {itemTree.map((el, idx) => (
                                    <div key={`${el.itemTreeKey}`}>
                                      {el.itemTreeList.map((item) => (
                                        <DepthBlock
                                          key={`depthList${item.code} ${item.name}`}
                                          classNameList={`depth-${item.level}`}
                                          id={item.code}
                                          name={item.name}
                                          value={item.code}
                                          onChange={(e) =>
                                            handleSingleCheck(
                                              e.target.checked,
                                              item.idx,
                                            )
                                          }
                                          checked={
                                            checkedDepthList.includes(item.idx)
                                              ? true
                                              : false
                                          }
                                        >
                                          <span>{item.name}</span>
                                        </DepthBlock>
                                      ))}
                                    </div>
                                  ))}
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
                                    selected={selectedCategoryEtc1}
                                    onChange={(e) => handleRadioCheck(e)}
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
                                    selected={selectedCategoryEtc2}
                                    onChange={(e) => handleRadioCheck(e)}
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
                      width={'150px'}
                      $margin={'0 10px 0 0'}
                      onClick={() => saveCheckItems(checkedDepthList)}
                    >
                      교과정보 추가
                    </Button>
                  </SubmitButtonWrapper>
                </CategoryWrapper>
              </CategorySection>
              <SchoolSelectorSection>
                <SubTitleWrapper>
                  <Label value="*문항수" fontSize="16px" width="60px" />
                  <Label value="최대 100문항" fontSize="12px" width="440px" />
                </SubTitleWrapper>
                <SelectorGroup>
                  <SelectorWrapper>
                    <Button
                      buttonType="button"
                      onClick={() => {
                        selectQuestionNum('25');
                      }}
                      $padding="10px"
                      height={'34px'}
                      width={'100px'}
                      fontSize="14px"
                      $normal={questionNum !== '25'}
                      $filled={questionNum === '25'}
                      cursor
                    >
                      <span>25</span>
                    </Button>
                    <Button
                      buttonType="button"
                      onClick={() => {
                        selectQuestionNum('50');
                      }}
                      $padding="10px"
                      height={'34px'}
                      width={'100px'}
                      fontSize="14px"
                      $normal={questionNum !== '50'}
                      $filled={questionNum === '50'}
                      cursor
                    >
                      <span>50</span>
                    </Button>
                    <Button
                      buttonType="button"
                      onClick={() => {
                        selectQuestionNum('100');
                      }}
                      $padding="10px"
                      height={'34px'}
                      width={'100px'}
                      fontSize="14px"
                      $normal={questionNum !== '100'}
                      $filled={questionNum === '100'}
                      cursor
                    >
                      <span>100</span>
                    </Button>
                    <DivideBar>|</DivideBar>
                    <NumberInput
                      value={inputValue}
                      maxLength={3}
                      onClick={() => selectQuestionNum('')}
                      style={{
                        color:
                          questionNum === '' ? 'white' : `${COLOR.PRIMARY}`,
                        backgroundColor:
                          questionNum === '' ? `${COLOR.PRIMARY}` : 'white',
                      }}
                      onChange={(e) => {
                        changeInputValue(e);
                      }}
                    ></NumberInput>
                    문항
                  </SelectorWrapper>
                </SelectorGroup>

                <SubTitleWrapper>
                  <Label value="*난이도" fontSize="16px" width="200px" />
                  <AdditionOption>
                    <IoSettingsOutline
                      onClick={openDifficultySetting}
                      style={{ cursor: 'pointer' }}
                    />
                    난이도 설정
                  </AdditionOption>
                </SubTitleWrapper>
                <SelectorGroup>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      selectQuestionLevel('선택안함');
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'81px'}
                    fontSize="14px"
                    $normal={questionLevel !== '선택안함'}
                    $filled={questionLevel === '선택안함'}
                    cursor
                  >
                    <span>선택안함</span>
                  </Button>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      selectQuestionLevel('LOWER');
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'74px'}
                    fontSize="14px"
                    $normal={questionLevel !== 'LOWER'}
                    $filled={questionLevel === 'LOWER'}
                    cursor
                  >
                    <span>하</span>
                  </Button>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      selectQuestionLevel('INTERMEDIATE');
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'74px'}
                    fontSize="14px"
                    $normal={questionLevel !== 'INTERMEDIATE'}
                    $filled={questionLevel === 'INTERMEDIATE'}
                    cursor
                  >
                    <span>중하</span>
                  </Button>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      selectQuestionLevel('MEDIUM');
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'74px'}
                    fontSize="14px"
                    $normal={questionLevel !== 'MEDIUM'}
                    $filled={questionLevel === 'MEDIUM'}
                    cursor
                  >
                    <span>중</span>
                  </Button>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      selectQuestionLevel('UPPER');
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'74px'}
                    fontSize="14px"
                    $normal={questionLevel !== 'UPPER'}
                    $filled={questionLevel === 'UPPER'}
                    cursor
                  >
                    <span>상</span>
                  </Button>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      selectQuestionLevel('BEST');
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'74px'}
                    fontSize="14px"
                    $normal={questionLevel !== 'BEST'}
                    $filled={questionLevel === 'BEST'}
                    cursor
                  >
                    <span>최상</span>
                  </Button>
                </SelectorGroup>
                <SubTitleWrapper>
                  <Label value="*문항 타입" fontSize="16px" width="200px" />
                  {/* <AdditionOption>
                    자동 체점
                    <CheckBox
                      width="16"
                      height="16"
                      isChecked={isAutoGrading}
                      onClick={checkAutoGrading}
                    />
                  </AdditionOption> */}
                </SubTitleWrapper>
                <SelectorGroup>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      if (isAllSelectedQuestionType) {
                        setQuestionType([]);
                      } else {
                        setQuestionType([
                          'MULTIPLE_CHOICE',
                          'SHORT_ANSWER',
                          'ESSAY_ANSWER',
                        ]);
                      }
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'120px'}
                    fontSize="14px"
                    $normal={!isAllSelectedQuestionType}
                    $filled={isAllSelectedQuestionType}
                    cursor
                  >
                    <span>전체</span>
                  </Button>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      selectQuestionType('MULTIPLE_CHOICE');
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'117px'}
                    fontSize="14px"
                    $normal={!questionType?.includes('MULTIPLE_CHOICE')}
                    $filled={questionType?.includes('MULTIPLE_CHOICE')}
                    cursor
                  >
                    <span>객관식</span>
                  </Button>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      selectQuestionType('SHORT_ANSWER');
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'117px'}
                    fontSize="14px"
                    $normal={!questionType?.includes('SHORT_ANSWER')}
                    $filled={questionType?.includes('SHORT_ANSWER')}
                    cursor
                  >
                    <span>주관식</span>
                  </Button>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      selectQuestionType('ESSAY_ANSWER');
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'117px'}
                    fontSize="14px"
                    $normal={!questionType?.includes('ESSAY_ANSWER')}
                    $filled={questionType?.includes('ESSAY_ANSWER')}
                    cursor
                  >
                    <span>서술형</span>
                  </Button>
                </SelectorGroup>
                <Label
                  value="*모의고사 포함 여부"
                  fontSize="16px"
                  width="200px"
                />
                <SelectorGroup>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      selectContainMock(1);
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'161px'}
                    fontSize="14px"
                    $normal={containMock !== 1}
                    $filled={containMock === 1}
                    cursor
                  >
                    <span>포함</span>
                  </Button>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      selectContainMock(2);
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'160px'}
                    fontSize="14px"
                    $normal={containMock !== 2}
                    $filled={containMock === 2}
                    cursor
                  >
                    <span>제외</span>
                  </Button>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      selectContainMock(3);
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'160px'}
                    fontSize="14px"
                    $normal={containMock !== 3}
                    $filled={containMock === 3}
                    cursor
                  >
                    <span>모의고사만</span>
                  </Button>
                </SelectorGroup>
                <Label value="*배점" fontSize="16px" width="200px" />
                <SelectorGroup>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      selectEqualScore(1);
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'246px'}
                    fontSize="14px"
                    $normal={equalScore !== 1}
                    $filled={equalScore === 1}
                    cursor
                  >
                    <span>선택안함</span>
                  </Button>
                  <Button
                    buttonType="button"
                    onClick={openEqualScoreSettingModal}
                    $padding="10px"
                    height={'34px'}
                    width={'245px'}
                    fontSize="14px"
                    $normal={equalScore !== 2}
                    $filled={equalScore === 2}
                    cursor
                  >
                    <span>균등 배점</span>
                  </Button>
                </SelectorGroup>
                <AdditionOptionList>
                  <Label value="추가 옵션" fontSize="16px" width="200px" />
                  {/* <AdditionOption>
                    <CheckBox isChecked={isOption1} onClick={selectOption1} />
                    기존 출제 문항 제외
                  </AdditionOption>
                  <AdditionOption>
                    <CheckBox isChecked={isOption2} onClick={selectOption2} />
                    교육 과정 외 유형 제외
                  </AdditionOption> */}
                  <AdditionOption>
                    <CheckBox isChecked={isQuizEven} onClick={selectQuizEven} />
                    <Label
                      onClick={selectQuizEven}
                      value="문항 수 균등 배분"
                      fontSize="16px"
                      width="140px"
                    />
                  </AdditionOption>
                  <AdditionOption>
                    <CheckBox
                      isChecked={isPriority}
                      onClick={selectPriority}
                    ></CheckBox>
                    <Label
                      onClick={selectPriority}
                      value="내 문항 우선 추천"
                      fontSize="16px"
                      width="140px"
                    />
                  </AdditionOption>
                </AdditionOptionList>
                <Summary>
                  학습지 문항수 {inputValue || questionNum} 개 | 유형 3개
                </Summary>
              </SchoolSelectorSection>
            </>
          )}
          {tabVeiw === '시중교재' && (
            <>
              {isSelectTextbook && (
                <>
                  <CategorySection>
                    <TabWrapper
                    // onClick={() => {
                    //   selectSchoolLevel('초등');
                    //   setgradeLevel('');
                    // }}
                    >
                      <TabMenu
                        length={3}
                        menu={menuList}
                        width={'350px'}
                        lineStyle
                        selected={tabVeiw}
                        setTabVeiw={setTabVeiw}
                      />
                    </TabWrapper>
                    <SchoolGradeWrapper>
                      <SelectorGroup>
                        <Button
                          buttonType="button"
                          onClick={() => {
                            selectSchoolLevel('초등');
                            selectGradeLevel('');
                          }}
                          $padding="10px"
                          height={'34px'}
                          width={'97px'}
                          fontSize="14px"
                          $normal={schoolLevel !== '초등'}
                          $filled={schoolLevel === '초등'}
                          cursor
                        >
                          <span>초</span>
                        </Button>
                        <Button
                          buttonType="button"
                          onClick={() => {
                            selectSchoolLevel('중등');
                            selectGradeLevel('');
                          }}
                          $padding="10px"
                          height={'34px'}
                          width={'97px'}
                          fontSize="14px"
                          $normal={schoolLevel !== '중등'}
                          $filled={schoolLevel === '중등'}
                          cursor
                        >
                          <span>중</span>
                        </Button>
                        <Button
                          buttonType="button"
                          onClick={() => {
                            selectSchoolLevel('고등');
                            selectGradeLevel('');
                          }}
                          $padding="10px"
                          height={'34px'}
                          width={'97px'}
                          fontSize="14px"
                          $normal={schoolLevel !== '고등'}
                          $filled={schoolLevel === '고등'}
                          cursor
                        >
                          <span>고</span>
                        </Button>
                        <DivideBar>|</DivideBar>
                        {schoolLevel === '중등' || schoolLevel === '고등' ? (
                          <SelectorGroup>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('1');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '1'}
                              $filled={gradeLevel === '1'}
                              cursor
                            >
                              <span>1학년</span>
                            </Button>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('2');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '2'}
                              $filled={gradeLevel === '2'}
                              cursor
                            >
                              <span>2학년</span>
                            </Button>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('3');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '3'}
                              $filled={gradeLevel === '3'}
                              cursor
                            >
                              <span>3학년</span>
                            </Button>
                          </SelectorGroup>
                        ) : (
                          <SelectorGroup>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('1');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '1'}
                              $filled={gradeLevel === '1'}
                              cursor
                            >
                              <span>1학년</span>
                            </Button>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('2');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '2'}
                              $filled={gradeLevel === '2'}
                              cursor
                            >
                              <span>2학년</span>
                            </Button>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('3');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '3'}
                              $filled={gradeLevel === '3'}
                              cursor
                            >
                              <span>3학년</span>
                            </Button>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('4');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '4'}
                              $filled={gradeLevel === '4'}
                              cursor
                            >
                              <span>4학년</span>
                            </Button>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('5');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '5'}
                              $filled={gradeLevel === '5'}
                              cursor
                            >
                              <span>5학년</span>
                            </Button>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('6');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '6'}
                              $filled={gradeLevel === '6'}
                              cursor
                            >
                              <span>6학년</span>
                            </Button>
                          </SelectorGroup>
                        )}
                      </SelectorGroup>
                    </SchoolGradeWrapper>
                    <SearchWrapper>
                      <Search
                        value={searchValue}
                        width={'50%'}
                        height="40px"
                        onKeyDown={(e) => {}}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="교재명 검색"
                      />
                    </SearchWrapper>
                    <ListWrapper>
                      <ListTitleWrapper>
                        <ListTitle className="schoolGrade">학교급</ListTitle>
                        <ListTitle className="title">교재명</ListTitle>
                        <ListTitle className="series">시리즈</ListTitle>
                        <ListTitle className="publisher">출판사</ListTitle>
                      </ListTitleWrapper>
                      {textbookList.length > 0 ? (
                        <>
                          {textbookList?.map((book, idx) => (
                            <TextbookList
                              key={idx}
                              onClick={() =>
                                selectTextbook(book.idx, book.title)
                              }
                            >
                              <div className="schoolGrade">
                                {book.schoolLevel}
                                {book.grade}-{book.semester}
                              </div>
                              <div className="title">{book.title}</div>
                              <div className="series">{book.series}</div>
                              <div className="publisher">{book.publisher}</div>
                            </TextbookList>
                          ))}
                        </>
                      ) : (
                        <ValueNone textOnly info="등록된 데이터가 없습니다" />
                      )}
                    </ListWrapper>
                    <PaginationBox
                      itemsCountPerPage={
                        textbookData?.data.data.pagination.pageUnit as number
                      }
                      totalItemsCount={
                        textbookData?.data.data.pagination.totalCount as number
                      }
                    />
                  </CategorySection>
                  <SchoolSelectorSection
                    $isSelectTextbookContent={isSelectTextbookContent}
                    $tabVeiw={tabVeiw}
                  >
                    <SubTitleWrapper>
                      <Label value="*문항수" fontSize="16px" width="60px" />
                      <Label
                        value="최대 100문항"
                        fontSize="12px"
                        width="440px"
                      />
                    </SubTitleWrapper>
                    <SelectorGroup>
                      <SelectorWrapper>
                        <Button
                          buttonType="button"
                          onClick={() => {
                            selectQuestionNum('25');
                          }}
                          $padding="10px"
                          height={'34px'}
                          width={'100px'}
                          fontSize="14px"
                          $normal={questionNum !== '25'}
                          $filled={questionNum === '25'}
                          cursor
                        >
                          <span>25</span>
                        </Button>
                        <Button
                          buttonType="button"
                          onClick={() => {
                            selectQuestionNum('50');
                          }}
                          $padding="10px"
                          height={'34px'}
                          width={'100px'}
                          fontSize="14px"
                          $normal={questionNum !== '50'}
                          $filled={questionNum === '50'}
                          cursor
                        >
                          <span>50</span>
                        </Button>
                        <Button
                          buttonType="button"
                          onClick={() => {
                            selectQuestionNum('100');
                          }}
                          $padding="10px"
                          height={'34px'}
                          width={'100px'}
                          fontSize="14px"
                          $normal={questionNum !== '100'}
                          $filled={questionNum === '100'}
                          cursor
                        >
                          <span>100</span>
                        </Button>
                        <DivideBar>|</DivideBar>
                        <NumberInput
                          value={inputValue}
                          maxLength={3}
                          onClick={() => selectQuestionNum('')}
                          style={{
                            color:
                              questionNum === '' ? 'white' : `${COLOR.PRIMARY}`,
                            backgroundColor:
                              questionNum === '' ? `${COLOR.PRIMARY}` : 'white',
                          }}
                          onChange={(e) => {
                            changeInputValue(e);
                          }}
                        ></NumberInput>
                        문항
                      </SelectorWrapper>
                    </SelectorGroup>

                    <SubTitleWrapper>
                      <Label value="*난이도" fontSize="16px" width="200px" />
                      <AdditionOption>
                        <IoSettingsOutline
                          onClick={openDifficultySetting}
                          style={{ cursor: 'pointer' }}
                        />
                        난이도 설정
                      </AdditionOption>
                    </SubTitleWrapper>
                    <SelectorGroup>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionLevel('선택안함');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'81px'}
                        fontSize="14px"
                        $normal={questionLevel !== '선택안함'}
                        $filled={questionLevel === '선택안함'}
                        cursor
                      >
                        <span>선택안함</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionLevel('LOWER');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'74px'}
                        fontSize="14px"
                        $normal={questionLevel !== 'LOWER'}
                        $filled={questionLevel === 'LOWER'}
                        cursor
                      >
                        <span>하</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionLevel('INTERMEDIATE');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'74px'}
                        fontSize="14px"
                        $normal={questionLevel !== 'INTERMEDIATE'}
                        $filled={questionLevel === 'INTERMEDIATE'}
                        cursor
                      >
                        <span>중하</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionLevel('MEDIUM');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'74px'}
                        fontSize="14px"
                        $normal={questionLevel !== 'MEDIUM'}
                        $filled={questionLevel === 'MEDIUM'}
                        cursor
                      >
                        <span>중</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionLevel('UPPER');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'74px'}
                        fontSize="14px"
                        $normal={questionLevel !== 'UPPER'}
                        $filled={questionLevel === 'UPPER'}
                        cursor
                      >
                        <span>상</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionLevel('BEST');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'74px'}
                        fontSize="14px"
                        $normal={questionLevel !== 'BEST'}
                        $filled={questionLevel === 'BEST'}
                        cursor
                      >
                        <span>최상</span>
                      </Button>
                    </SelectorGroup>
                    <SubTitleWrapper>
                      <Label value="*문항 타입" fontSize="16px" width="200px" />
                    </SubTitleWrapper>
                    <SelectorGroup>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          if (isAllSelectedQuestionType) {
                            setQuestionType([]);
                          } else {
                            setQuestionType([
                              'MULTIPLE_CHOICE',
                              'SHORT_ANSWER',
                              'ESSAY_ANSWER',
                            ]);
                          }
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'120px'}
                        fontSize="14px"
                        $normal={!isAllSelectedQuestionType}
                        $filled={isAllSelectedQuestionType}
                        cursor
                      >
                        <span>전체</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionType('MULTIPLE_CHOICE');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'117px'}
                        fontSize="14px"
                        $normal={!questionType?.includes('MULTIPLE_CHOICE')}
                        $filled={questionType?.includes('MULTIPLE_CHOICE')}
                        cursor
                      >
                        <span>객관식</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionType('SHORT_ANSWER');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'117px'}
                        fontSize="14px"
                        $normal={!questionType?.includes('SHORT_ANSWER')}
                        $filled={questionType?.includes('SHORT_ANSWER')}
                        cursor
                      >
                        <span>주관식</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionType('ESSAY_ANSWER');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'117px'}
                        fontSize="14px"
                        $normal={!questionType?.includes('ESSAY_ANSWER')}
                        $filled={questionType?.includes('ESSAY_ANSWER')}
                        cursor
                      >
                        <span>서술형</span>
                      </Button>
                    </SelectorGroup>
                    <Label
                      value="*모의고사 포함 여부"
                      fontSize="16px"
                      width="200px"
                    />
                    <SelectorGroup>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectContainMock(1);
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'161px'}
                        fontSize="14px"
                        $normal={containMock !== 1}
                        $filled={containMock === 1}
                        cursor
                      >
                        <span>포함</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectContainMock(2);
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'160px'}
                        fontSize="14px"
                        $normal={containMock !== 2}
                        $filled={containMock === 2}
                        cursor
                      >
                        <span>제외</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectContainMock(3);
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'160px'}
                        fontSize="14px"
                        $normal={containMock !== 3}
                        $filled={containMock === 3}
                        cursor
                      >
                        <span>모의고사만</span>
                      </Button>
                    </SelectorGroup>
                    <Label value="*배점" fontSize="16px" width="200px" />
                    <SelectorGroup>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectEqualScore(1);
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'246px'}
                        fontSize="14px"
                        $normal={equalScore !== 1}
                        $filled={equalScore === 1}
                        cursor
                      >
                        <span>선택안함</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={openEqualScoreSettingModal}
                        $padding="10px"
                        height={'34px'}
                        width={'245px'}
                        fontSize="14px"
                        $normal={equalScore !== 2}
                        $filled={equalScore === 2}
                        cursor
                      >
                        <span>균등 배점</span>
                      </Button>
                    </SelectorGroup>
                    <AdditionOptionList>
                      <Label value="추가 옵션" fontSize="16px" width="200px" />
                      <AdditionOption>
                        <CheckBox
                          isChecked={isQuizEven}
                          onClick={selectQuizEven}
                        />
                        <Label
                          onClick={selectQuizEven}
                          value="문항 수 균등 배분"
                          fontSize="16px"
                          width="140px"
                        />
                      </AdditionOption>
                      <AdditionOption>
                        <CheckBox
                          isChecked={isPriority}
                          onClick={selectPriority}
                        ></CheckBox>
                        <Label
                          onClick={selectPriority}
                          value="내 문항 우선 추천"
                          fontSize="16px"
                          width="140px"
                        />
                      </AdditionOption>
                    </AdditionOptionList>
                    {/* <Summary>
                      학습지 문항수 {inputValue || questionNum} 개
                    </Summary> */}
                  </SchoolSelectorSection>
                </>
              )}
              {isSelectTextbookContent && (
                <>
                  <CategorySection>
                    <TabWrapper onClick={selectOtherTextbook}>
                      <TabMenu
                        length={3}
                        menu={menuList}
                        width={'350px'}
                        lineStyle
                        selected={tabVeiw}
                        setTabVeiw={setTabVeiw}
                      />
                    </TabWrapper>
                    <TextbookTitleWrapper>
                      <Label
                        value={selectedTextbookTitle as string}
                        width="500px"
                        fontSize="15px"
                      />
                      <Button
                        buttonType="button"
                        onClick={selectOtherTextbook}
                        $padding="10px"
                        height={'30px'}
                        width={'110px'}
                        fontSize="12px"
                        $normal
                        cursor
                      >
                        <span>다른 교재 선택</span>
                      </Button>
                    </TextbookTitleWrapper>
                    <TextbookWrapper>
                      {selectedTextbook?.map((item, idx) => (
                        <TextbookTypeWrapper key={idx}>
                          <TextbookTypeTitleWrapper>
                            <TextbookTypeTitleWrapperLeft>
                              <Label
                                value={item.subChapter as string}
                                width="100%"
                              />
                            </TextbookTypeTitleWrapperLeft>
                            <TextbookTypeTitleWrapperRight>
                              <Label
                                value="유형UP"
                                width="100%"
                                padding="5px 20px"
                              />
                            </TextbookTypeTitleWrapperRight>
                          </TextbookTypeTitleWrapper>
                          <SelectWrapper>
                            {data.map((item, i) => (
                              <LeftWrapper
                                key={i}
                                onClick={() => choiceType(i)}
                                $isChoice={clickedIdx === i}
                              >
                                {item.quizList.map((quiz, j) => (
                                  <>
                                    <CheckBox
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        checkAllToggle(
                                          item.subChapter,
                                          quiz.isChecked,
                                          [quiz.seq],
                                        );
                                      }}
                                      isChecked={quiz.isChecked}
                                      width="15"
                                      height="15"
                                    />
                                    <Label
                                      key={j}
                                      value={`${quiz.bookQuizNumber}P`}
                                      width="100px"
                                    />
                                  </>
                                ))}
                              </LeftWrapper>
                            ))}

                            {!isChoice &&
                              data.map((item, k) => (
                                <RightWrapper key={k}>
                                  {item.quizList.map((quiz, l) => (
                                    <CheckBoxWrapper key={l}>
                                      <CheckBox
                                        onClick={() =>
                                          checkPartialToggle(
                                            item.subChapter,
                                            quiz.seq,
                                            quiz.isChecked || false,
                                          )
                                        }
                                        isChecked={quiz.isChecked || false}
                                        width="15"
                                        height="15"
                                      />
                                      <Label
                                        key={l}
                                        value={`${quiz.bookQuizNumber}P`}
                                        width="100px"
                                      />
                                    </CheckBoxWrapper>
                                  ))}
                                </RightWrapper>
                              ))}
                          </SelectWrapper>
                        </TextbookTypeWrapper>
                      ))}
                    </TextbookWrapper>
                  </CategorySection>
                  <SchoolSelectorSection>
                    <SubTitleWrapper>
                      <Label value="*문항수" fontSize="16px" width="60px" />
                      <Label
                        value="최대 100문항"
                        fontSize="12px"
                        width="440px"
                      />
                    </SubTitleWrapper>
                    <SelectorGroup>
                      <SelectorWrapper>
                        <Button
                          buttonType="button"
                          onClick={() => {
                            selectQuestionNum('25');
                          }}
                          $padding="10px"
                          height={'34px'}
                          width={'100px'}
                          fontSize="14px"
                          $normal={questionNum !== '25'}
                          $filled={questionNum === '25'}
                          cursor
                        >
                          <span>25</span>
                        </Button>
                        <Button
                          buttonType="button"
                          onClick={() => {
                            selectQuestionNum('50');
                          }}
                          $padding="10px"
                          height={'34px'}
                          width={'100px'}
                          fontSize="14px"
                          $normal={questionNum !== '50'}
                          $filled={questionNum === '50'}
                          cursor
                        >
                          <span>50</span>
                        </Button>
                        <Button
                          buttonType="button"
                          onClick={() => {
                            selectQuestionNum('100');
                          }}
                          $padding="10px"
                          height={'34px'}
                          width={'100px'}
                          fontSize="14px"
                          $normal={questionNum !== '100'}
                          $filled={questionNum === '100'}
                          cursor
                        >
                          <span>100</span>
                        </Button>
                        <DivideBar>|</DivideBar>
                        <NumberInput
                          value={inputValue}
                          maxLength={3}
                          onClick={() => selectQuestionNum('')}
                          style={{
                            color:
                              questionNum === '' ? 'white' : `${COLOR.PRIMARY}`,
                            backgroundColor:
                              questionNum === '' ? `${COLOR.PRIMARY}` : 'white',
                          }}
                          onChange={(e) => {
                            changeInputValue(e);
                          }}
                        ></NumberInput>
                        문항
                      </SelectorWrapper>
                    </SelectorGroup>
                    <SubTitleWrapper>
                      <Label value="*난이도" fontSize="16px" width="200px" />
                      <AdditionOption>
                        <IoSettingsOutline
                          onClick={openDifficultySetting}
                          style={{ cursor: 'pointer' }}
                        />
                        난이도 설정
                      </AdditionOption>
                    </SubTitleWrapper>
                    <SelectorGroup>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionLevel('선택안함');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'81px'}
                        fontSize="14px"
                        $normal={questionLevel !== '선택안함'}
                        $filled={questionLevel === '선택안함'}
                        cursor
                      >
                        <span>선택안함</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionLevel('LOWER');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'74px'}
                        fontSize="14px"
                        $normal={questionLevel !== 'LOWER'}
                        $filled={questionLevel === 'LOWER'}
                        cursor
                      >
                        <span>하</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionLevel('INTERMEDIATE');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'74px'}
                        fontSize="14px"
                        $normal={questionLevel !== 'INTERMEDIATE'}
                        $filled={questionLevel === 'INTERMEDIATE'}
                        cursor
                      >
                        <span>중하</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionLevel('MEDIUM');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'74px'}
                        fontSize="14px"
                        $normal={questionLevel !== 'MEDIUM'}
                        $filled={questionLevel === 'MEDIUM'}
                        cursor
                      >
                        <span>중</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionLevel('UPPER');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'74px'}
                        fontSize="14px"
                        $normal={questionLevel !== 'UPPER'}
                        $filled={questionLevel === 'UPPER'}
                        cursor
                      >
                        <span>상</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionLevel('BEST');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'74px'}
                        fontSize="14px"
                        $normal={questionLevel !== 'BEST'}
                        $filled={questionLevel === 'BEST'}
                        cursor
                      >
                        <span>최상</span>
                      </Button>
                    </SelectorGroup>
                    <SubTitleWrapper>
                      <Label value="*문항 타입" fontSize="16px" width="200px" />
                    </SubTitleWrapper>
                    <SelectorGroup>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          if (isAllSelectedQuestionType) {
                            setQuestionType([]);
                          } else {
                            setQuestionType([
                              'MULTIPLE_CHOICE',
                              'SHORT_ANSWER',
                              'ESSAY_ANSWER',
                            ]);
                          }
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'120px'}
                        fontSize="14px"
                        $normal={!isAllSelectedQuestionType}
                        $filled={isAllSelectedQuestionType}
                        cursor
                      >
                        <span>전체</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionType('MULTIPLE_CHOICE');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'117px'}
                        fontSize="14px"
                        $normal={!questionType?.includes('MULTIPLE_CHOICE')}
                        $filled={questionType?.includes('MULTIPLE_CHOICE')}
                        cursor
                      >
                        <span>객관식</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionType('SHORT_ANSWER');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'117px'}
                        fontSize="14px"
                        $normal={!questionType?.includes('SHORT_ANSWER')}
                        $filled={questionType?.includes('SHORT_ANSWER')}
                        cursor
                      >
                        <span>주관식</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionType('ESSAY_ANSWER');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'117px'}
                        fontSize="14px"
                        $normal={!questionType?.includes('ESSAY_ANSWER')}
                        $filled={questionType?.includes('ESSAY_ANSWER')}
                        cursor
                      >
                        <span>서술형</span>
                      </Button>
                    </SelectorGroup>
                    <Label
                      value="*모의고사 포함 여부"
                      fontSize="16px"
                      width="200px"
                    />
                    <SelectorGroup>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectContainMock(1);
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'161px'}
                        fontSize="14px"
                        $normal={containMock !== 1}
                        $filled={containMock === 1}
                        cursor
                      >
                        <span>포함</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectContainMock(2);
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'160px'}
                        fontSize="14px"
                        $normal={containMock !== 2}
                        $filled={containMock === 2}
                        cursor
                      >
                        <span>제외</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectContainMock(3);
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'160px'}
                        fontSize="14px"
                        $normal={containMock !== 3}
                        $filled={containMock === 3}
                        cursor
                      >
                        <span>모의고사만</span>
                      </Button>
                    </SelectorGroup>
                    <Label value="*배점" fontSize="16px" width="200px" />
                    <SelectorGroup>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectEqualScore(1);
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'246px'}
                        fontSize="14px"
                        $normal={equalScore !== 1}
                        $filled={equalScore === 1}
                        cursor
                      >
                        <span>선택안함</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={openEqualScoreSettingModal}
                        $padding="10px"
                        height={'34px'}
                        width={'245px'}
                        fontSize="14px"
                        $normal={equalScore !== 2}
                        $filled={equalScore === 2}
                        cursor
                      >
                        <span>균등 배점</span>
                      </Button>
                    </SelectorGroup>
                    <AdditionOptionList>
                      <Label value="추가 옵션" fontSize="16px" width="200px" />
                      <AdditionOption>
                        <CheckBox
                          isChecked={isQuizEven}
                          onClick={selectQuizEven}
                        />
                        <Label
                          onClick={selectQuizEven}
                          value="문항 수 균등 배분"
                          fontSize="16px"
                          width="140px"
                        />
                      </AdditionOption>
                      <AdditionOption>
                        <CheckBox
                          isChecked={isPriority}
                          onClick={selectPriority}
                        ></CheckBox>
                        <Label
                          onClick={selectPriority}
                          value="내 문항 우선 추천"
                          fontSize="16px"
                          width="140px"
                        />
                      </AdditionOption>
                    </AdditionOptionList>
                    {/* <Summary>
                      학습지 문항수 {inputValue || questionNum} 개
                    </Summary> */}
                  </SchoolSelectorSection>
                </>
              )}
            </>
          )}
          {tabVeiw === '수능/모의고사' && (
            <>
              <CategorySection>
                <TabWrapper>
                  <TabMenu
                    length={3}
                    menu={menuList}
                    width={'350px'}
                    lineStyle
                    selected={tabVeiw}
                    setTabVeiw={setTabVeiw}
                  />
                </TabWrapper>
                <MockExamWrapper>
                  <MockExamSelectWrapper>
                    <MockExamSelect ref={dropdownRef}>
                      <Label
                        value="수능/모의고사 선택"
                        padding="5px 10px"
                        width="150px"
                        cursor
                        onClick={(event) => {
                          event.stopPropagation();
                          openDropdown();
                        }}
                      />
                      {isDropdown ? (
                        <IoMdArrowDropup
                          onClick={(event) => {
                            event.stopPropagation();
                            openDropdown();
                          }}
                          style={{ cursor: 'pointer' }}
                        />
                      ) : (
                        <IoMdArrowDropdown
                          onClick={(event) => {
                            event.stopPropagation();
                            openDropdown();
                          }}
                          style={{ cursor: 'pointer' }}
                        />
                      )}
                    </MockExamSelect>
                    {!isDropdown && (
                      <MockExamSummaryWrapper>
                        <MockExamSummary>학습지 문항수 {100}개</MockExamSummary>
                        <Button
                          buttonType="button"
                          onClick={selectExamReset}
                          $padding="10px"
                          height={'35px'}
                          width={'200px'}
                          fontSize="13px"
                          $normal
                          cursor
                        >
                          <span>선택 초기화</span>
                        </Button>
                      </MockExamSummaryWrapper>
                    )}
                  </MockExamSelectWrapper>
                  {isDropdown && (
                    <MockExamDropdownWrapper ref={dropdownRef}>
                      <MockExamOptionWrapper>
                        <MockExamTitleWrapper>
                          <Label value="학년 선택" fontSize="14px" />
                          <Label value="복수 선택 가능" fontSize="12px" />
                        </MockExamTitleWrapper>
                        <MockExamButtonWrapper>
                          <Button
                            buttonType="button"
                            onClick={() => {
                              if (isAllSelectedExamGrade) {
                                setExamGrade([]);
                              } else {
                                setExamGrade(['1', '2', '3']);
                              }
                            }}
                            $padding="10px"
                            height={'35px'}
                            width={'160px'}
                            fontSize="13px"
                            $normal={!isAllSelectedExamGrade}
                            $filled={isAllSelectedExamGrade}
                            cursor
                          >
                            <span>전체</span>
                          </Button>
                          <Button
                            buttonType="button"
                            onClick={() => selectExamGrade('1')}
                            $padding="10px"
                            height={'35px'}
                            width={'160px'}
                            fontSize="13px"
                            $normal={!examGrade.includes('1')}
                            $filled={examGrade.includes('1')}
                            cursor
                          >
                            <span>고1</span>
                          </Button>
                          <Button
                            buttonType="button"
                            onClick={() => selectExamGrade('2')}
                            $padding="10px"
                            height={'35px'}
                            width={'160px'}
                            fontSize="13px"
                            $normal={!examGrade.includes('2')}
                            $filled={examGrade.includes('2')}
                            cursor
                          >
                            <span>고2</span>
                          </Button>
                          <Button
                            buttonType="button"
                            onClick={() => selectExamGrade('3')}
                            $padding="10px"
                            height={'35px'}
                            width={'160px'}
                            fontSize="13px"
                            $normal={!examGrade.includes('3')}
                            $filled={examGrade.includes('3')}
                            cursor
                          >
                            <span>고3</span>
                          </Button>
                        </MockExamButtonWrapper>
                      </MockExamOptionWrapper>
                      <MockExamOptionWrapper>
                        <MockExamTitleWrapper>
                          <Label value="년도 선택" fontSize="14px" />
                          <Label value="복수 선택 가능" fontSize="12px" />
                        </MockExamTitleWrapper>
                        <MockExamHalfButtonWrapper>
                          <Button
                            buttonType="button"
                            onClick={() => {
                              if (isAllSelectedExamYear) {
                                setExamYear([]);
                              } else {
                                setExamYear([
                                  '2024',
                                  '2023',
                                  '2022',
                                  '2021',
                                  '2020',
                                ]);
                              }
                            }}
                            $padding="10px"
                            height={'35px'}
                            width={'80px'}
                            fontSize="13px"
                            $normal={!isAllSelectedExamYear}
                            $filled={isAllSelectedExamYear}
                            cursor
                          >
                            <span>전체</span>
                          </Button>
                          {categoryList[2].map((el) => (
                            <Button
                              key={el.idx}
                              onClick={() => selectExamYear(el.name)}
                              $padding="10px"
                              height={'35px'}
                              width={'80px'}
                              fontSize="13px"
                              $normal={!examYear.includes(el.name)}
                              $filled={examYear.includes(el.name)}
                              cursor
                            >
                              <span>{el.name}년</span>
                            </Button>
                          ))}
                        </MockExamHalfButtonWrapper>
                      </MockExamOptionWrapper>
                      <MockExamOptionWrapper>
                        <MockExamTitleWrapper>
                          <Label value="월 선택" fontSize="14px" />
                          <Label value="복수 선택 가능" fontSize="12px" />
                        </MockExamTitleWrapper>
                        <MockExamHalfButtonWrapper>
                          <Button
                            buttonType="button"
                            onClick={() => {
                              if (isAllSelectedExamMonthly) {
                                setExamMonthly([]);
                              } else {
                                setExamMonthly([
                                  '3',
                                  '4',
                                  '5',
                                  '6',
                                  '7',
                                  '9',
                                  '10',
                                  '11',
                                ]);
                              }
                            }}
                            $padding="10px"
                            height={'35px'}
                            width={'80px'}
                            fontSize="13px"
                            $normal={!isAllSelectedExamMonthly}
                            $filled={isAllSelectedExamMonthly}
                            cursor
                          >
                            <span>전체</span>
                          </Button>
                          {categoryList[3]
                            .filter((el) => {
                              return !excludedNames.includes(el.name);
                            })
                            .map((el) => (
                              <Button
                                key={el.idx}
                                buttonType="button"
                                onClick={() => selectExamMonthly(el.name)}
                                $padding="10px"
                                height={'35px'}
                                width={'80px'}
                                fontSize="13px"
                                $normal={!examMonthly.includes(el.name)}
                                $filled={examMonthly.includes(el.name)}
                                cursor
                              >
                                <span>{el.name}월</span>
                              </Button>
                            ))}
                        </MockExamHalfButtonWrapper>
                      </MockExamOptionWrapper>
                      <MockExamOptionWrapper>
                        <MockExamSingleTitleWrapper>
                          <Label
                            value="문항 추가 옵션"
                            fontSize="14px"
                            width="100px"
                          />
                        </MockExamSingleTitleWrapper>
                        <MockExamButtonWrapper>
                          <Button
                            buttonType="button"
                            onClick={() => selectExamOption(0)}
                            $padding="10px"
                            height={'35px'}
                            width={'160px'}
                            fontSize="13px"
                            $normal={examOption !== 0}
                            $filled={examOption === 0}
                            cursor
                          >
                            <span>문항 번호로 추가</span>
                          </Button>
                          <Button
                            buttonType="button"
                            onClick={() => selectExamOption(1)}
                            $padding="10px"
                            height={'35px'}
                            width={'160px'}
                            fontSize="13px"
                            $normal={examOption !== 1}
                            $filled={examOption === 1}
                            cursor
                          >
                            <span>단원으로 추가</span>
                          </Button>
                        </MockExamButtonWrapper>
                      </MockExamOptionWrapper>
                      <MockExamOptionWrapper>
                        <MockExamActionButtonWrapper>
                          <Button
                            buttonType="button"
                            onClick={selectExamReset}
                            $padding="10px"
                            height={'35px'}
                            width={'200px'}
                            fontSize="13px"
                            $normal
                            cursor
                          >
                            <span>선택 초기화</span>
                          </Button>
                          <Button
                            buttonType="button"
                            onClick={selectExam}
                            $padding="10px"
                            height={'35px'}
                            width={'200px'}
                            fontSize="13px"
                            $normal
                            cursor
                            disabled={
                              examGrade.length === 0 ||
                              examYear.length === 0 ||
                              examMonthly.length === 0 ||
                              examOption === null
                            }
                          >
                            <span>선택 완료</span>
                          </Button>
                        </MockExamActionButtonWrapper>
                      </MockExamOptionWrapper>
                    </MockExamDropdownWrapper>
                  )}
                  <MockExamContentWrapper>
                    {processedData.map((mock) => (
                      <MockExamBox key={mock.seq}>
                        <MockExamLabelWrapper>
                          <CheckBoxWrapper>
                            <CheckBox
                              isChecked={mock.isChecked as boolean}
                              width="15"
                              height="15"
                              onClick={() =>
                                checkAllMockexamToggle(
                                  mock.seq,
                                  mock.isChecked as boolean,
                                  mock.content.map((content) => content.seq),
                                )
                              }
                            ></CheckBox>
                            <Label
                              value={`${mock.grade} | ${mock.year} ${mock.month}`}
                              width="150px"
                            />
                          </CheckBoxWrapper>
                          <CloseIconWrapper>
                            <IoMdClose
                              style={{ cursor: 'pointer' }}
                              onClick={() => removeMockexam(mock.seq)}
                            />
                          </CloseIconWrapper>
                        </MockExamLabelWrapper>
                        <MockExamContent>
                          {mock.content.map((el) => (
                            <CheckBoxWrapper key={el.seq}>
                              <CheckBox
                                isChecked={el.isChecked as boolean}
                                width="15"
                                height="15"
                                onClick={() =>
                                  checkPartialMockexamToggle(
                                    mock.seq,
                                    el.seq,
                                    el.isChecked as boolean,
                                  )
                                }
                              ></CheckBox>
                              <Label value={el.title} width="30px" />
                            </CheckBoxWrapper>
                          ))}
                        </MockExamContent>
                      </MockExamBox>
                    ))}
                  </MockExamContentWrapper>
                </MockExamWrapper>
              </CategorySection>
            </>
          )}
        </MainWrapper>
        <NextStepButtonWrapper>
          <Button
            buttonType="button"
            onClick={moveStep2}
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
      {isDifficulty && (
        <Overlay>
          <DifficultyRate onClose={closeDifficultySetting} />
        </Overlay>
      )}
      {isEqualScoreModal && (
        <Overlay>
          <EqualScoreModalContainer>
            <EqualScoreModalWrapper>
              <EqualScoreModalTitleWrapper>
                <Label
                  value={`총 ${questionNum || inputValue} 문항`}
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
                    value={equalInputValue}
                    maxLength={10}
                    minLength={2}
                    onClick={() => {
                      setEqualInputValue('');
                      setIsSaveEqualValue(false);
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
                      01번 문항부터 {questionNum || inputValue}번 문항까지
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
                      01번 문항부터 {remainderContent}번 문항까지{' '}
                      {quotient || 0}점
                    </div>
                    <div>
                      {nextRemainderContent}번 문항부터{' '}
                      {questionNum || inputValue}번 문항까지 {quotient + 1 || 0}
                      점
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
                  onClick={closeEqualScoreSettingModal}
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
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const TitleWrapper = styled.div`
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  font-size: 30px;
`;
const Span = styled.span`
  color: #1976d2;
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
const CategorySection = styled.section`
  //flex: 1 0 30%;
  min-width: 956px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${COLOR.BORDER_POPUP};
  border-radius: 25px;
`;
const TabWrapper = styled.div`
  width: 100%;
  padding: 10px 0px;
`;
const SelectorGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
`;
const DivideBar = styled.div`
  color: ${COLOR.BORDER_BLUE};
  font-size: 25px;
`;
const CategoryWrapper = styled.div`
  width: 100%;
  border-top: 1px solid ${COLOR.BORDER_BLUE};
  padding: 10px;
  .line {
    border-top: 1px solid ${COLOR.BORDER_GRAY};
    margin: 10px 0;

    &.bottom_text {
      font-size: 13px;
      padding-top: 2px;
    }
  }
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
const AccordionWrapper = styled.div`
  margin: 10px;
`;
const RowListWrapper = styled.div`
  padding: 10px;
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
const ValueNoneWrapper = styled.div`
  display: flex;
`;
const SchoolSelectorSection = styled.section<{
  $isSelectTextbookContent?: boolean;
  $tabVeiw?: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${COLOR.BORDER_POPUP};
  padding: 20px;
  border-radius: 25px;
  flex: 1 0 0;
  ${({ $isSelectTextbookContent, $tabVeiw }) =>
    !$isSelectTextbookContent &&
    $tabVeiw === '시중교재' &&
    'pointer-events: none; opacity: 0.5;'}
`;
const SubTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 14px;
`;
const SelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  font-size: 14px;
  span {
    &::after {
      content: '';
      display: block;
      position: absolute;
      right: 0px;
      width: 1px;
      height: 10px;
      background-color: ${COLOR.SECONDARY};
    }
    &:last-child {
      &::after {
        display: none;
      }
    }
  }
`;
const NumberInput = styled.input`
  width: 100px;
  height: 34px;
  border-radius: 5px;
  line-height: normal;
  border: 1px solid ${COLOR.PRIMARY};
  color: ${COLOR.PRIMARY};
  padding: 5px 15px;
  font-size: 14px;
  outline: none;
  text-align: center;
  cursor: pointer;
`;
const AdditionOptionList = styled.li`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 20px;
`;
const AdditionOption = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 10px;
`;
const Summary = styled.div`
  font-size: 20px;
  display: flex;
  margin: 0 auto;
`;
const NextStepButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
`;
//시중교재
const SchoolGradeWrapper = styled.div`
  width: 100%;
  border-top: 1px solid ${COLOR.BORDER_BLUE};
  padding: 10px;
`;
const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0 10px 10px 0;
`;
const ListWrapper = styled.div`
  width: 100%;
  min-height: 550px;
  padding: 0 10px;
`;
const ListTitleWrapper = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: ${COLOR.TABLE_GRAY};
  border-top: 1px solid ${COLOR.BORDER_GRAY};
  border-bottom: 1px solid ${COLOR.BORDER_GRAY};

  .schoolGrade {
    min-width: 15%;
  }
  .title {
    min-width: 60%;
  }
  .series {
    min-width: 10%;
  }
  .publisher {
    min-width: 15%;
  }
`;
const ListTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: center;
`;
const TextbookList = styled.li`
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: white;
  font-size: 14px;
  border-bottom: 1px solid ${COLOR.BORDER_GRAY};

  .schoolGrade {
    min-width: 15%;
    display: flex;
    justify-content: center;
  }
  .title {
    min-width: 60%;
    display: flex;
    justify-content: center;
  }
  .series {
    min-width: 10%;
    display: flex;
    justify-content: center;
  }
  .publisher {
    min-width: 15%;
    display: flex;
    justify-content: center;
  }
`;
//시중교재 선택 후
const TextbookTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${COLOR.BORDER_BLUE};
  padding: 10px 20px;
`;
const TextbookWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  border-top: 1px solid ${COLOR.BORDER_BLUE};
`;
const TextbookTypeWrapper = styled.div`
  width: 100%;
  padding-bottom: 10px;
`;
const TextbookTypeTitleWrapper = styled.div`
  display: flex;
`;
const TextbookTypeTitleWrapperLeft = styled.div`
  display: flex;
  flex: 1 0 0;
`;
const TextbookTypeTitleWrapperRight = styled.div`
  display: flex;
  flex: 1 0 50%;
`;
const SelectWrapper = styled.div`
  display: flex;
`;
const LeftWrapper = styled.div<{
  $isChoice?: boolean;
}>`
  display: flex;
  align-items: center;
  //flex: 1 0 0;
  gap: 5px;
  padding: 5px 10px;
  background-color: ${({ $isChoice }) =>
    $isChoice ? COLOR.SELECT_BLUE : 'white'};
`;
const RightWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex: 1 0 50%;
  padding-left: 10px;
`;
const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;
// 수능/모의고사
const MockExamWrapper = styled.div`
  min-width: 1518px;
  max-width: 1824px;
  border-top: 1px solid ${COLOR.BORDER_BLUE};
`;
const MockExamSelectWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;
const MockExamSelect = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
`;
const MockExamSummaryWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const MockExamSummary = styled.div`
  width: 150px;
  font-size: 15px;
  display: flex;
  align-items: center;
`;
const MockExamDropdownWrapper = styled.div`
  position: absolute;
  width: 1518px;
  height: 350px;
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
  border-top: 1px solid ${COLOR.BORDER_BLUE};
  border-bottom: 1px solid ${COLOR.BORDER_BLUE};
  background-color: white;
  z-index: 1;
`;
const MockExamOptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MockExamTitleWrapper = styled.div`
  width: 190px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;
const MockExamSingleTitleWrapper = styled.div`
  width: 180px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;
const MockExamButtonWrapper = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  gap: 10px;
`;
const MockExamHalfButtonWrapper = styled.div`
  width: 190px;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  gap: 10px;
`;
const MockExamActionButtonWrapper = styled.div`
  width: 200px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 20px;
`;
const MockExamContentWrapper = styled.div`
  display: flex;
  max-width: 1518px;
  overflow-x: auto;
  padding-top: 10px;
  gap: 10px;
  border-top: 1px solid ${COLOR.BORDER_BLUE};
`;
const MockExamBox = styled.div`
  min-width: 240px;
  height: 600px;
  overflow-y: auto;
`;
const MockExamLabelWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #8080806f;
`;
const CloseIconWrapper = styled.div`
  padding-right: 10px;
`;

const MockExamContent = styled.div`
  padding: 10px;
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
  //padding: 20px 0;
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
