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
import { ItemCategoryType, ItemTreeListType } from '../../../types';
import {
  WorkbookData,
  QuizList,
  SimilarQuizList,
  QuizCategory,
  QuizCategoryList,
  Data,
} from '../../../types/WorkbookType';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { COLOR } from '../../constants';

interface RadioState {
  title: string;
  checkValue: number;
  code: string;
}

export function Step2() {
  const [sendLocalData, setSendLocalData] = useState<WorkbookData | null>(null);
  const [initialItems, setInitialItems] = useState<QuizList[]>(
    sendLocalData?.data.quizList || [],
  );

  // 로컬 스토리지에서 데이터 가져오기
  useEffect(() => {
    const fetchDataFromStorage = () => {
      const data = localStorage.getItem('sendData');
      if (data) {
        try {
          const parsedData = JSON.parse(data);
          console.log('데이터 조회', parsedData);
          setSendLocalData(parsedData);
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
  // useEffect(() => {
  //   const isDataInStorage = localStorage.getItem('sendData') !== null;

  //   if (isDataInStorage) {
  //     console.log('로컬 스토리지에 데이터가 남아있습니다.');
  //     const data = localStorage.getItem('sendData');

  //     try {
  //       const parsedData = JSON.parse(data as string);
  //       console.log('데이터 조회', parsedData);
  //       setSendLocalData(parsedData);
  //     } catch (error) {
  //       console.error('로컬 스토리지 데이터 파싱 에러:', error);
  //     }
  //   } else {
  //     console.log('로컬 스토리지에 데이터가 없습니다.');
  //   }
  // }, []);

  // 로컬 스토리지 값 다 받은 뒤 초기화
  useEffect(() => {
    if (sendLocalData) {
      window.opener.localStorage.clear();
    }
  }, [sendLocalData]);

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
  const Data = [
    { value: 0, label: '하' },
    { value: 0, label: '중하' },
    { value: 100, label: '중' },
    { value: 0, label: '상' },
    { value: 0, label: '최상' },
  ];
  const bookmark: any[] = [];
  const selectCategory = [
    {
      id: '1',
      label: '사용자 정렬',
      value: '1',
      options: [
        { id: '0', label: '사용자 정렬', value: '0' },
        { id: '1', label: '객관식 상단배치', value: '1' },
        { id: '2', label: '무작위 정렬', value: '2' },
      ],
    },
    {
      id: '2',
      label: '문제만 보기',
      value: '2',
      options: [
        { id: '0', label: '문제만 보기', value: '0' },
        { id: '1', label: '문제+정답', value: '1' },
        { id: '2', label: '문제+정답+해설', value: '2' },
      ],
    },
  ];
  const [listCategory, setListCategory] = useState<string[]>([]);
  const selectListCategoryOption = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const value = event.currentTarget.value;
    setListCategory((prevContent) => [...prevContent, value]);
  };
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
      // if (context.response.data.code == 'GE-002') {
      //   postRefreshToken();
      // }
    },
    onSuccess: (response) => {
      saveLocalData(response.data.data);
      //navigate('/content-create/exam/step2');
      // openToastifyAlert({
      //   type: 'success',
      //   text: response.data.message,
      // });
    },
  });

  const makingdata = [
    {
      itemTreeKey: {
        교육과정: '8차',
        학교급: '초등',
        학년: '1',
        학기: '1학기',
      },
      itemTreeIdxList: [1, 2],
    },
  ];

  const clickGetNewQuiz = () => {
    const data = {
      itemTreeKeyList: makingdata,
      //count: Number(questionNum),
      count: 10,
      // difficulty: questionLevel === '선택안함' ? null : questionLevel,
      difficulty: 'BEST',
      //type: questionType,
      type: ['MULTIPLE_CHOICE'],
      //mock: containMock,
      mock: 1,
      //score: equalScore,
      score: 2,
      isScoreEven: true,
      isQuizEven: true,
      isMePriority: true,
      filterList: null,
    };
    //   //console.log(data);
    postNewQuizData(data);
  };
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
  const [checkedDepthList, setCheckedDepthList] = useState<string[]>([]);

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
    RadioState[][]
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
      if (error?.data?.code == 'GE-002') {
        postRefreshToken();
        groupsDataRefetch();
      }
    }
  };

  const saveCheckItems = () => {
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
        ],
      ]);
    } else {
      openToastifyAlert({
        type: 'error',
        text: '교과정보는 최대 5개 까지 저장 가능합니다',
      });
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

  //교과정보 문항 조회
  const getCheckedItems = () => {};

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

  // 교과정보 추가버튼 disable 처리
  const getButtonBool = useMemo(() => {
    if (unitClassificationList.length > 0) {
      return false;
    } else {
      return true;
    }
  }, [unitClassificationList]);

  useEffect(() => {}, []);

  useEffect(() => {
    if (selected4depth == '') return;
    categoryItemTreeDataMutate();
  }, [selected4depth]);

  useEffect(() => {}, [itemTree]);

  // 깊이가 있는 리스트 체크박스
  const handleSingleCheck = (checked: boolean, id: string) => {
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
      if (selectedQuizItem) {
        setInitialItems((prevItems) =>
          prevItems.filter((item) => item !== selectedQuizItem),
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
      if (context.response.data.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response: { data: { data: SimilarQuizList } }) => {
      console.log('성공');
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
    if (sendLocalData?.data.quizList) {
      setInitialItems(sendLocalData.data.quizList);
    }
  }, [sendLocalData]);

  const whenDragEnd = (newList: QuizList[]) => {
    setInitialItems(newList);
    console.log('@드래그끝났을떄', newList);
  };

  const handleButtonCheck = (
    e: React.MouseEvent<HTMLDivElement>,
    id: string,
  ) => {
    e.preventDefault();
    const target = e.currentTarget.childNodes[0].childNodes[0]
      .childNodes[0] as HTMLInputElement;
  };
  const [isStartDnD, setIsStartDnd] = useState(false);

  // 로컬스토리지에 보낼데이터 저장
  const saveLocalData = (data: any) => {
    //const sendData = { data: data };
    if (data) {
      localStorage.setItem('sendData', JSON.stringify(data));
    }
  };

  const goBackStep1 = () => {
    const data = {
      문항수: '25',
      난이도: '중',
      문항타입: '객관식',
    };
    saveLocalData(data);
    navigate('/content-create/exam/step1');
  };

  const moveStep3 = () => {
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
                              onClick={() => showSimilarContent(item.code, i)}
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
                              <div>총 {sendLocalData?.data.quizCnt} 문항</div>
                              <DiscriptionType>객관식 20</DiscriptionType>
                              <DiscriptionType>주관식 10</DiscriptionType>
                              <DiscriptionType>서술형 15</DiscriptionType>
                            </DiscriptionOutline>
                            <BarChart data={Data}></BarChart>
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
                            >
                              {(dragItem, ref, isDragging) => (
                                <li
                                  ref={ref}
                                  className={`${isDragging ? 'opacity' : ''}`}
                                >
                                  <Content
                                    // key={i}
                                    onClick={(e) => {
                                      handleButtonCheck(e, dragItem.idx);
                                    }}
                                  >
                                    <div className="number">{dragItem.idx}</div>
                                    <div className="type">
                                      {
                                        dragItem.quizCategoryList[0]
                                          .quizCategory.문항타입
                                      }
                                    </div>
                                    <div className="level">
                                      {
                                        dragItem.quizCategoryList[0]
                                          .quizCategory.난이도
                                      }
                                    </div>
                                    <div className="title">
                                      {
                                        dragItem.quizCategoryList[0]
                                          .quizCategory.출처
                                      }
                                    </div>
                                    <div className="icon">
                                      <IoMenuOutline
                                        style={{ cursor: 'grab' }}
                                      />
                                    </div>
                                  </Content>
                                </li>
                              )}
                            </StepDnDWrapper>
                          </ContentsList>
                        </>
                      )}
                      {tabVeiw === '새 문항 추가' && (
                        <>
                          <AddNewContentOption>
                            <AddNewContentIcon>
                              <RiListSettingsLine
                                style={{ fontSize: '22px', cursor: 'pointer' }}
                                onClick={openRangeSetting}
                              />
                              범위 변경
                            </AddNewContentIcon>
                            <AddNewContentIcon>
                              <PiArrowCounterClockwiseBold
                                style={{ fontSize: '22px', cursor: 'pointer' }}
                              />
                              이전 불러오기
                            </AddNewContentIcon>
                            <AddNewContentIcon>
                              <PiArrowClockwiseBold
                                style={{ fontSize: '22px', cursor: 'pointer' }}
                                onClick={clickGetNewQuiz}
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
                                              {el.map(
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
                                          value={''}
                                          height={'30px'}
                                          onClick={() => {}}
                                          onChange={() => {}}
                                          onKeyDown={() => {}}
                                        />
                                        <p className="line bottom_text">
                                          Total : {`${0}`}
                                        </p>
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
                                                  <div
                                                    key={`${el.itemTreeKey}`}
                                                  >
                                                    {el.itemTreeList.map(
                                                      (item) => (
                                                        <DepthBlock
                                                          key={`depthList${item.code} ${item.name}`}
                                                          classNameList={`depth-${item.level}`}
                                                          id={item.code}
                                                          name={item.name}
                                                          value={item.code}
                                                          onChange={(e) =>
                                                            handleSingleCheck(
                                                              e.target.checked,
                                                              item.code,
                                                            )
                                                          }
                                                          checked={
                                                            checkedDepthList.includes(
                                                              item.code,
                                                            )
                                                              ? true
                                                              : false
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
                                  <Button
                                    $filled
                                    disabled={getButtonBool}
                                    cursor
                                    $margin={'0 10px 0 0'}
                                    onClick={getCheckedItems}
                                  >
                                    불러오기
                                  </Button>
                                </SubmitButtonWrapper>
                              </CategoryWrapper>
                            </AddNewContensWrapper>
                          ) : (
                            <AddNewContensWrapper>
                              {initialItems.map((item, i) => (
                                <MathviewerAccordion
                                  key={item.idx}
                                  componentWidth="600px"
                                  width="450px"
                                  componentHeight="150px"
                                  onClick={() =>
                                    showSimilarContent(item.code, i)
                                  }
                                  isBorder={true}
                                  isNewQuiz={true}
                                  data={item}
                                  index={item.idx}
                                  selectedCardIndex={selectedCardIndex}
                                  onSelectCard={setSelectedCardIndex}
                                  reportQuizitem={() =>
                                    openReportProcess(item.idx)
                                  }
                                ></MathviewerAccordion>
                              ))}
                            </AddNewContensWrapper>
                          )}
                        </>
                      )}
                      {tabVeiw === '즐겨찾는 문항' && (
                        <>
                          {bookmark.length !== 0 ? (
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
                                {/* {list.map((card, i) => (
                              <div
                                key={i}
                                // draggable
                                // onDragStart={(e) => dragStart(e, i)}
                                // onDragEnter={(e) => dragEnter(e, i)}
                                // onDragOver={dragOver}
                                // onDragEnd={drop}
                              >
                                <MathviewerCard
                                  width="300px"
                                  onClick={() => {}}
                                  isSimilarQuiz={true}
                                  index={i + 1}
                                  data={card}
                                  selectedCardIndex={selectedCardIndex}
                                  onSelectCard={setSelectedCardIndex}
                                ></MathviewerCard>
                              </div>
                            ))} */}
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
                  <Label value="선택한 문항 목록(총45문항)" fontSize="16px" />
                  <SelectWrapper>
                    {selectCategory.map((el) => (
                      <Select
                        width={'150px'}
                        key={el.label}
                        defaultValue={el.label}
                        options={el.options}
                        onSelect={(event) => selectListCategoryOption(event)}
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
                  >
                    {(dragItem, ref, isDragging, itemIndex) => (
                      <li
                        ref={ref}
                        className={`${isDragging ? 'opacity' : ''}`}
                      >
                        <MathviewerAccordion
                          componentWidth="750px"
                          width="550px"
                          onClick={() => {
                            // const similarIndex = getIndex(
                            //   dragItem,
                            //   dragItem.idx,
                            // );
                            showSimilarContent(dragItem.code, itemIndex);
                          }}
                          isSimilar={isSimilar}
                          data={dragItem}
                          quizNum={dragItem.idx}
                          title={dragItem.code}
                          index={itemIndex}
                          selectedCardIndex={selectedCardIndex}
                          onSelectCard={setSelectedCardIndex}
                          reportQuizitem={() => openReportProcess(dragItem.idx)}
                          deleteQuizItem={() => deleteQuizItem(dragItem.code)}
                        ></MathviewerAccordion>
                      </li>
                    )}
                  </StepDnDWrapper>
                </ContentListWrapper>
              </ContentListSection>
            </MainWrapper>
            <NextStepButtonWrapper>
              <p>
                총 배점: <Span>100점</Span>/<Span>100점</Span>
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
