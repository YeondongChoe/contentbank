import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useIsMutating, useMutation, useQuery } from '@tanstack/react-query';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  Button,
  Icon,
  IconButton,
  Loader,
  MathViewer,
  ResizeLayout,
  ValueNone,
  openToastifyAlert,
} from '../..';
import { classificationInstance, quizService } from '../../../api/axios';
import {
  Accordion,
  ButtonFormatRadio,
  ButtonFormatMultiRadio,
  DepthBlock,
  Search,
} from '../../../components/molecules';
import { quizListAtom } from '../../../store/quizListAtom';
import {
  ItemCategoryType,
  ItemTreeListType,
  ItemTreeType,
  QuizCategory,
  QuizCategoryList,
  QuizClassificationData,
  QuizListType,
} from '../../../types';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { COLOR } from '../../constants/COLOR';

import { QuizList } from './list';

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
  | CheckedItemType
  | RadioStateType
  | ItemTreeIdxListType
  | RadioStateType[]
  | QuizCategoryList
  | QuizClassificationData
  | QuizCategory
  | [];

type CheckedItemType = {
  [key: string]: string;
};

export function Classification({
  setTabView,
}: {
  setTabView: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [quizList, setQuizList] = useRecoilState(quizListAtom);
  const [questionList, setQuestionList] = useState<QuizListType[]>([]);
  const [sortedList, setSortedList] = useState<QuizListType[]>([]);
  const [sortedQuizList, setSortedQuizList] = useState<QuizListType[]>([]);
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
  const [radioEtc1Check, setRadioEtc1Check] = useState<RadioStateType[]>([]);
  const [radioEtc2Check, setRadioEtc2Check] = useState<RadioStateType[]>([]);
  const [selected1depth, setSelected1depth] = useState<string>('');
  const [selected2depth, setSelected2depth] = useState<string>('');
  const [selected3depth, setSelected3depth] = useState<string>('');
  const [selected4depth, setSelected4depth] = useState<string>('');
  const [selectedCategoryEtc1, setSelectedCategoryEtc1] = useState<string[]>([
    '',
  ]);
  const [selectedCategoryEtc2, setSelectedCategoryEtc2] = useState<string[]>([
    '',
  ]);
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
  const [radioButtonList, setRadioButtonList] = useState<RadioStateType[][]>(
    [],
  );
  const [radioButtonArr, setRadioButtonArr] = useState<RadioStateType[][]>([]);
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
  const [searchValue, setSearchValue] = useState<string>('');
  const [checkedItems, setCheckedItems] = useState<CheckedItemType[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [isCategoryLoaded, setIsCategoryLoaded] = useState(false);
  const [refreshTokenCalled, setRefreshTokenCalled] = useState(false);
  const [categoryTypeList, setCategoryTypeList] = useState<string>('');

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
    // console.log(categoryData && categoryData);
    if (categoryData) {
      setCategoryItems(categoryData.data.data.categoryItemList);
    } else if (categoryDataError) {
      categoryDataRefetch();
    }
  }, [categoryData, categoryDataError, categoryDataRefetch]);

  // 카테고리의 그룹 유형 조회
  const getCategoryGroups = async () => {
    const response = await classificationInstance.get('/v1/category/group/A');
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
    if (categoryTypeList) {
      fetchCategoryItems(categoryTypeList, setCategoryList);
    }
  }, [categoryTypeList]);

  //groupsData값 들어왔을때 typeList 관리
  useEffect(() => {
    if (groupsData) {
      setCategoryTypeList(groupsData.typeList);
    }
  }, [groupsData]);

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
            console.log(error);
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
      // console.log('itemsList', itemsList);
      setCategory(itemsList);
    } finally {
      setIsCategoryLoaded(false);
    }
  };

  // 라디오 버튼 설정
  const handleRadioCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.className);
    const depth =
      e.target.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement?.classList[0];
    const itemId =
      e.target.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement?.id;

    switch (depth) {
      case '1depth':
        setSelected1depth(e.currentTarget.value);
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

    // console.log('e.currentTarget.value', e.currentTarget?.value);
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
    console.log('두번째 뎁스`````', pidx);
    try {
      const res = await classificationInstance.get(
        `/v1/category/${itemIdx}/${pidx}`,
      );
      setNextList1depth(res?.data.data.categoryClassList);
      return res.data;
    } catch (error: any) {
      // console.log('error--------------', error.response.data.code);
      if (error.response?.data?.code == 'GE-002')
        postRefreshToken().then(() => {
          groupsDataRefetch();
        });
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
    enabled: radio1depthCheck?.code !== '',
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
      console.log('error--------------', error.response.data.code);

      if (error.response?.data?.code == 'GE-002')
        postRefreshToken().then(() => {
          nextListData1Refetch();
        });
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
    enabled: radio2depthCheck?.code !== '',
  });

  //3뎁스 선택시 4뎁스 설정되게
  const getNextList3 = async () => {
    const groupsArray = categoryTypeList.split(',').map(Number);
    const itemIdx = groupsArray[3];
    const pidx = radio3depthCheck.checkValue; // 선택된 체크 박스의 idx
    console.log('row--------------4-------');
    try {
      const res = await classificationInstance.get(
        `/v1/category/${itemIdx}/${pidx}`,
      );
      console.log('4-------', res?.data.data.categoryClassList);
      setNextList3depth(res?.data.data.categoryClassList);
      return res.data;
    } catch (error: any) {
      console.log('error--------------', error.response.data.code);

      if (error.response?.data?.code == 'GE-002')
        postRefreshToken().then(() => {
          nextListData2Refetch();
        });
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
    enabled: radio3depthCheck?.code !== '',
  });

  // 체크값 변경시 초기화
  useEffect(() => {
    setSelected2depth('');
    setCheckedDepthList([]);
  }, [selected1depth]);
  useEffect(() => {
    setSelected3depth('');
    setCheckedDepthList([]);
    setCheckedItems([]);
  }, [selected2depth]);
  useEffect(() => {
    setSelected4depth('');
    setRadio4depthCheck({ title: '', checkValue: 0, code: '', key: '' });
    setCheckedDepthList([]);
    setCheckedItems([]);
  }, [selected3depth]);
  useEffect(() => {
    setSelectedCategoryEtc1([]);
    setSelectedCategoryEtc2([]);
    setRadioEtc1Check([]);
    setRadioEtc2Check([]);
    setCheckedDepthList([]);
    setSearchValue('');
    setCheckedItems([]);
  }, [selected4depth]);

  // 카테고리 선택후 아이템트리
  // 아이템 트리 불러오기 api
  const postCategoryItemTree = async () => {
    const depthChecks: RadioStateType[] = [
      radio1depthCheck,
      radio2depthCheck,
      radio3depthCheck,
      radio4depthCheck,
    ];

    // itemTreeKeyList 객체를 빈 객체로 초기화
    const itemTreeKeyList: CheckedItemType = {};

    // depthChecks 배열을 순회하여 itemTreeKeyList에 각 라디오 버튼의 code와 title 추가
    depthChecks.forEach((depthCheck) => {
      if (depthCheck && depthCheck.code && depthCheck.title) {
        itemTreeKeyList[`${depthCheck.code}`] = `${depthCheck.title}`;
      }
    });

    console.log(
      '최종 카테고리 전달값 유형 조회 itemTreeKeyList:',
      itemTreeKeyList,
    );
    const data = {
      itemTreeKeyList: [itemTreeKeyList],
    };
    const res = await classificationInstance.post('/v1/item', data);
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
      if (context.response.data?.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response: { data: { data: ItemTreeListType[] } }) => {
      // setItemTreeList(res.data.data[0].itemTreeList);
      setItemTree(response.data.data);
    },
  });

  useEffect(() => {
    console.log(radio4depthCheck);
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
        classificationInstance.get(`/v1/category/class/${id}`),
      );
      const responses = await Promise.all(requests);
      const itemsList = responses.map(
        (res) => res?.data?.data?.categoryClassList,
      );
      setCategoryAddInfoList(itemsList);
    } catch (error: any) {
      console.error('Error fetching next list: ', error?.data?.code);
      if (error.response?.data?.code == 'GE-002') {
        postRefreshToken();
        groupsDataRefetch();
      }
    }
  };

  // 교과정보 추가
  const saveCheckItems = () => {
    console.log(
      'radioEtc1Check,radioEtc2Check',
      radioEtc1Check,
      radioEtc2Check,
    );

    const newClassification: UnitClassificationType[] = [
      radio1depthCheck,
      radio2depthCheck,
      radio3depthCheck,
      radio4depthCheck,
      radioEtc1Check,
      radioEtc2Check,
      ...checkedItems,
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

    setCheckedItems([]);
  };

  //분류 리스트 리셋
  const onResetList = () => {
    const reset = { title: '', checkValue: 0, code: '', key: '' };

    setRadio1depthCheck(reset);
    setRadio2depthCheck(reset);
    setRadio3depthCheck(reset);
    setRadio4depthCheck(reset);
    setRadioEtc1Check([]);
    setRadioEtc2Check([]);

    setSelected1depth('');
    setSelected2depth('');
    setSelected3depth('');
    setSelected4depth('');
    setSelectedCategoryEtc1([]);
    setSelectedCategoryEtc2([]);
    setCheckedDepthList([]);
    setCheckedItems([]);
  };

  useEffect(() => {
    if (radio1depthCheck?.code !== '') nextListData1Refetch();
    if (radio2depthCheck?.code !== '') nextListData2Refetch();
    if (radio3depthCheck?.code !== '') nextListData3Refetch();
  }, [
    radio1depthCheck,
    radio2depthCheck,
    radio3depthCheck,
    selected1depth,
    selected2depth,
    selected3depth,
    selected4depth,
    isModifying,
  ]);

  // 수정
  const changeUnitClassification = (idx: number) => {
    console.log('수정에서의 itemTree checkedDepthList', checkedDepthList);
    console.log(
      '수정에서의 itemTree unitClassificationList',
      unitClassificationList[idx],
    );
    setSelectedClassification(unitClassificationList[idx]);
    setIsModifying(true);
  };
  // 수정시 작동
  useEffect(() => {
    if (isModifying && selectedClassification.length > 0) {
      const classification = selectedClassification[0] as RadioStateType;
      const matchingItem = categoryList[0].find(
        (item) => item.name === classification.title,
      );
      if (matchingItem) {
        const updatedObject = {
          ...classification,
          checkValue: matchingItem.idx as number,
        };
        console.log('1뎁스----------updatedObject----', updatedObject);
        // 체크 밸류값을 재설정
        setSelected1depth(matchingItem.idx.toString());
        setRadio1depthCheck(updatedObject);
      }
      // onDepths();
    }
  }, [isModifying, selectedClassification]);
  // const onDepths = () => {
  // 1뎁스이후 2뎁스 활성화
  // };
  useEffect(() => {
    if (isModifying && selected1depth !== '') {
      const classification = selectedClassification[1] as RadioStateType;
      const matchingItem = nextListData1?.data?.categoryClassList.find(
        (item: { name: string }) => item.name === classification.title,
      );
      if (matchingItem) {
        const updatedObject = {
          ...classification,
          checkValue: matchingItem.idx as number,
        };
        console.log('2뎁스----------updatedObject----', updatedObject);
        setSelected2depth(matchingItem.idx.toString());
        setRadio2depthCheck(updatedObject);
      }
    }
  }, [isModifying, selected1depth]);
  useEffect(() => {
    if (isModifying && selected2depth !== '') {
      const classification = selectedClassification[2] as RadioStateType;
      const matchingItem = nextListData2?.data?.categoryClassList.find(
        (item: { name: string }) => item.name === classification.title,
      );
      if (matchingItem) {
        const updatedObject = {
          ...classification,
          checkValue: matchingItem.idx as number,
        };
        console.log('3뎁스----------updatedObject----', updatedObject);
        setSelected3depth(matchingItem.idx.toString());
        setRadio3depthCheck(updatedObject);
      }
    }
  }, [isModifying, selected2depth]);
  useEffect(() => {
    if (isModifying && selected3depth !== '') {
      const classification = selectedClassification[3] as RadioStateType;
      const matchingItem = nextListData3?.data?.categoryClassList.find(
        (item: { name: string }) => item.name === classification.title,
      );
      if (matchingItem) {
        const updatedObject = {
          ...classification,
          checkValue: matchingItem.idx as number,
        };
        console.log('4뎁스----------updatedObject----', updatedObject);
        setSelected4depth(matchingItem.idx.toString());
        setRadio4depthCheck(updatedObject);
      }
    }
  }, [isModifying, selected3depth]);
  useEffect(() => {
    if (selected4depth !== '') {
      const classification = selectedClassification[4] as ItemTreeIdxListType;
      // idx 유형 리스트
      console.log('수정시 idx 리스트 ----- ', classification);
      if (classification?.itemTreeIdxList)
        setCheckedDepthList(classification.itemTreeIdxList);

      const classificationEtc1 = selectedClassification[5] as RadioStateType[];
      // 저장되었던 행동 요소1
      if (classificationEtc1) {
        // const filteredArrayE1 = classificationEtc1.filter(
        //   (item) => item.key === '행동요소1',
        // );
        // console.log(filteredArrayE1);
        setSelectedCategoryEtc1(
          classificationEtc1.map((el) => el.checkValue?.toString()),
        );
        setRadioEtc1Check(classificationEtc1);
      }
      const classificationEtc2 = selectedClassification[6] as RadioStateType[];
      console.log(
        '수정시 classificationEtc2 리스트 ----- ',
        classificationEtc2,
      );
      // const filteredArrayE2 = classificationEtc2.filter(
      //   (item) => item.key === '행동요소2',
      // );
      // 저장되었던 행동 요소2
      if (classificationEtc2) {
        setSelectedCategoryEtc2(
          classificationEtc2.map((el) => el.checkValue?.toString()),
        );
        setRadioEtc2Check(classificationEtc2);
      }
      //초기화
      setIsModifying(false);
    }
  }, [isModifying, selected4depth]);

  const sortedArr = () => {
    console.log('아이템트리키 들어가야할 목록', unitClassificationList);
    const arr = unitClassificationList.map((classification) => {
      const itemTreeKey = classification.reduce(
        (acc: Record<string, string | string[]>, curr) => {
          if ('key' in curr && curr.title) {
            if (curr.key === '행동요소1' || curr.key === '행동요소2') {
              // 행동요소1 또는 행동요소2인 경우 배열로 처리
              if (acc[curr.key]) {
                // 이미 해당 키가 존재하는 경우 배열에 추가
                (acc[curr.key] as string[]).push(curr.title);
              } else {
                // 새로 배열을 생성하여 추가
                acc[curr.key] = [curr.title];
              }
            } else {
              // 일반적인 키 처리
              acc[curr.key] = curr.title;
            }
          } else if (typeof curr === 'object' && !('itemTreeIdxList' in curr)) {
            // checkedItems 객체 병합
            Object.assign(acc, curr);
          }
          return acc;
        },
        {} as Record<string, string | string[]>,
      );

      const itemTreeIdxList =
        classification.find(
          (item): item is ItemTreeIdxListType => 'itemTreeIdxList' in item,
        )?.itemTreeIdxList || [];

      // 등록시 앞쪽에서 등록한 필수 메타값도 함께 등록
      const requiredMetacategory =
        sortedList[sortedList.length - 1].quizCategoryList[0].quizCategory;

      console.log('itemTreeKey------', itemTreeKey);
      console.log('requiredMetacategory------', requiredMetacategory);
      const mergedItemTreeKey = {
        ...itemTreeKey,
        ...requiredMetacategory,
      };
      return {
        itemTreeKey: mergedItemTreeKey,
        itemTreeIdxList,
        quizCategory: {},
      };
    });

    return arr;
  };

  // 분류 등록 버튼
  const onSubmit = () => {
    // 최종적으로 전송 될 데이터
    console.log('퀴즈코드리스트 들어가야할 목록', checkedList);

    const categoryListArr = sortedArr();
    console.log('categoryList 들어가야할 목록------', categoryListArr);

    const data: QuizClassificationData = {
      quizCodeList: checkedList,
      categoryList: categoryListArr,
    };
    console.log('최종 전송 데이터 형태', data);
    mutateChangeClassification(data);
  };

  // 분류 바꾸기 (등록) api
  const putClassification = async (data: QuizClassificationData) => {
    const res = await classificationInstance.put(`/v1/item/quiz`, data);
    console.log('데이터 최종 등록 후 리턴값', res);
    return res;
  };

  const { data: changeClassificationData, mutate: mutateChangeClassification } =
    useMutation({
      mutationFn: putClassification,
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
        //초기화
        onResetList();
      },
    });

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

  // 깊이가 있는 리스트 DepthBlock 체크박스
  const handleSingleCheck = (
    checked: boolean,
    idx: number,
    level: number,
    name: string,
    findItemByIdx: (idx: number) => any,
    findChildItems: (idx: number) => any[],
  ) => {
    // idx리스트 담기
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
    // 유형 값 담기
    const getTypeKey = (level: number): string => {
      switch (level) {
        case 1:
          return '대단원';
        case 2:
          return '중단원';
        case 3:
          return '소단원';
        case 4:
          return '유형';
        default:
          return '유형';
      }
    };
    const key = getTypeKey(level);

    setCheckedItems((prev) => {
      let updatedList = checked
        ? [...prev, { [key]: `${name}^^^${idx}` }]
        : prev.filter((item) => Object.values(item)[0] !== `${name}^^^${idx}`);

      if (checked) {
        // 상위 요소를 체크
        let currentItem = findItemByIdx(idx);
        while (currentItem && currentItem.parentIdx !== 0) {
          const parentItem = findItemByIdx(currentItem.parentIdx as number);
          if (parentItem) {
            const parentKey = getTypeKey(parentItem.level);
            if (
              !updatedList.some(
                (item) =>
                  item[parentKey] === `${parentItem.name}^^^${parentItem.idx}`,
              )
            ) {
              updatedList.push({
                [parentKey]: `${parentItem.name}^^^${parentItem.idx}`,
              });
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
            const childKey = getTypeKey(child.level);
            updatedList = updatedList.filter(
              (item) => item[childKey] !== `${child.name}^^^${child.idx}`,
            );
            removeDescendants(child.idx);
          });
        };
        removeDescendants(idx);
      }
      return updatedList;
    });
  };

  useEffect(() => {
    // 유형 값 담기
    console.log('checkedDepthList---', checkedDepthList);
    console.log('checkedItems---', checkedItems);
  }, [checkedDepthList, checkedItems]);

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

  // 전역으로 저장한 추가된 문항 데이터들 불러오기
  // 화면 진입시 문항 데이터들 리스트ui에넣기
  useEffect(() => {
    console.log('quizList-----------', quizList);
    setQuestionList(quizList);
  }, []);

  const sortList = () => {
    const sorted = questionList.filter((el) => checkedList.includes(el.code));
    console.log('sortedList------------', sorted);
    setSortedList(sorted);
    onResetList();
  };

  useEffect(() => {
    // console.log('checkedList------------', checkedList);
    setUnitClassificationList([]);
    sortList();
  }, [checkedList]);

  // 수정시 체크된 리스트의 카테고리값에서 메타값 속아내기
  useEffect(() => {
    if (sortedList.length > 0) {
      const lastQuiz = sortedList[sortedList.length - 1];
      const radioButtonLists: RadioStateType[][] = [];
      console.log('lastQuiz---', lastQuiz);

      lastQuiz.quizCategoryList.map((category) => {
        const list: UnitClassificationType[] = [];
        const actionElement1: UnitClassificationType[] = [];
        const actionElement2: UnitClassificationType[] = [];

        // category를 순회하며 필요한 형태로 변환
        Object.keys(category.quizCategory).forEach((key) => {
          const value = category.quizCategory[
            key as keyof UnitClassificationType
          ] as any;
          console.log('value key----', value);
          // 행동요소1, 행동요소2인 경우 객체 배열로 추가
          if ((value.key as string) === '행동요소1') {
            console.log('typedKey key---- in ', value);
            actionElement1.push({
              title: value.title as string,
              checkValue: value.checkValue,
              code: value.code,
              key: value.key,
            });
          } else if ((value.key as string) === '행동요소2') {
            actionElement2.push({
              title: value.title as string,
              checkValue: value.checkValue,
              code: value.code,
              key: value.key,
            });
          } else {
            list.push({
              title: value as string,
              checkValue: 0,
              code: key,
              key: key,
            });
          }
        });

        // order 변수를 선언 및 초기화
        const order: Record<string, number> = {
          교육과정: 0,
          학교급: 1,
          학년: 2,
          학기: 3,
        };

        // order에 따른 정렬된 배열 만들기
        const sortedArray: (RadioStateType | null)[] = new Array(
          Object.keys(order).length,
        ).fill(null);

        list.forEach((item) => {
          if ('code' in item && order[item.code] !== undefined) {
            sortedArray[order[item.code]] = item as RadioStateType;
          } else {
            sortedArray.push(item as RadioStateType);
          }
        });

        // null 항목 필터링
        const finalList = sortedArray.filter(
          (item): item is RadioStateType => item !== null,
        );

        console.log('actionElement 1 2 ---- ', actionElement1, actionElement2);

        // 추가 항목들 추가
        if (actionElement1.length > 0) {
          finalList.push(...(actionElement1 as unknown as RadioStateType[]));
        }

        if (actionElement2.length > 0) {
          finalList.push(...(actionElement2 as unknown as RadioStateType[]));
        }

        console.log('push on list ----', finalList);
        //idx 리스트 재구축
        const idxList = finalList
          .map((item) => {
            if (typeof item.title === 'string' && item.title.includes('^^^')) {
              const parts = item.title.split('^^^');
              return parseInt(parts[1], 10); // ^^^ 뒤의 숫자를 추출하여 정수로 변환
            }
            return null; // ^^^이 포함되지 않은 경우 null 반환
          })
          .filter((number) => number !== null);

        // 새로운 배열 생성
        const newFinalList: RadioStateType[] = [];
        // 라디오 버튼에 들어갈 요소 재정의
        const keysOrder = [
          '교육과정',
          '학교급',
          '학년',
          '학기',
          'itemTreeIdxList',
          '행동요소1',
          '행동요소2',
        ];

        keysOrder.forEach((key) => {
          // 일반 키 처리
          const items = finalList.filter(
            (element: RadioStateType) => element.key === key,
          );

          if (items.length > 0) {
            // 찾은 모든 요소를 newFinalList에 추가
            newFinalList.push(...items);
          } else if (key === 'itemTreeIdxList') {
            // itemTreeIdxList 일때 배열로 값추가
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            newFinalList.push({ itemTreeIdxList: idxList });
          } else if (key === '행동요소1') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            newFinalList.push([...items]);
          } else if (key === '행동요소2') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            newFinalList.push([...items]);
          } else {
            // 행동요소가 없을 경우 빈 배열 추가
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            newFinalList.push([]);
          }
        });

        // checkValue 값 추가 선택 전 임시
        newFinalList.forEach((finalItem: RadioStateType) => {
          const categoryItem = categoryItems.find(
            (catItem) => catItem.name === finalItem.code,
          );

          if (categoryItem) {
            console.log('categoryItem --- ', categoryItem);
            finalItem.checkValue = categoryItem.idx;
          }
        });

        console.log('newFinalList ---------', newFinalList);
        radioButtonLists.push(newFinalList);
      });

      setRadioButtonArr(radioButtonLists);
    }
  }, [sortedList]);

  useEffect(() => {
    console.log('문항에 등록된 분류 묶음 --- ', radioButtonArr);
    if (radioButtonArr.length > 0) {
      // 라디오 버튼 배열을 순차적으로 추가
      radioButtonArr.forEach((radioButtonGroup, index) => {
        setTimeout(
          () => {
            setRadioButtonList((prevList) => {
              // 중복 확인: 이미 존재하는지 검사
              const isDuplicate = prevList.some((existingGroup) =>
                existingGroup.every(
                  (item, i) => item.title === radioButtonGroup[i]?.title,
                ),
              );

              // 중복이 아닌 경우에만 추가
              if (!isDuplicate) {
                return [...prevList, radioButtonGroup];
              }
              return prevList; // 중복이면 기존 리스트를 그대로 반환
            });
          },
          (index - 1) * 1000,
        ); // 각 그룹마다 1초 간격으로 추가
      });
    }
  }, [radioButtonArr]);

  // radioButtonList에 담긴 값을 순서대로 체크값에 넣고 아이템트리 조회
  useEffect(() => {
    if (radioButtonList.length === 0) return;
    // 타이틀 값에 맞는 체크밸류 찾기
    console.log('radioButtonList ---------', radioButtonList);
    const newClassificationLists = radioButtonList
      .map((buttonList, index) => {
        if (buttonList[0].key === '교육과정') {
          const newClassification: UnitClassificationType[] = [
            buttonList[0],
            buttonList[1],
            buttonList[2],
            buttonList[3],
            ...buttonList.filter((item) => item.key === '행동요소1'),
            ...buttonList.filter((item) => item.key === '행동요소2'),
          ];

          if (checkedDepthList.length > 0) {
            newClassification.splice(4, 0, {
              itemTreeIdxList: checkedDepthList,
            });
          }

          return newClassification;
        }
        return null; // 조건을 만족하지 않는 경우 null 반환
      })
      .filter((item) => item !== null); // null 값 필터링

    console.log('newClassificationLists ---------', newClassificationLists);

    // 최대 5개의 UnitClassificationType 배열만 추가
    if (unitClassificationList.length + newClassificationLists.length < 6) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setUnitClassificationList((prevList) => [
        ...prevList,
        ...newClassificationLists,
      ]);
    } else {
      openToastifyAlert({
        type: 'error',
        text: '교과정보는 최대 5개 까지 저장 가능합니다',
      });
    }

    onResetList();
  }, [radioButtonList]);

  // 아이템 트리 체크값 유형 키값으로 타이틀명 맞춰서 체크
  useEffect(() => {
    console.log('isChecked----------', isChecked);
    //문항 단원 분류 초기화
    setUnitClassificationList([]);
    setRadioButtonList([]);
    setRadioButtonArr([]);
  }, [isChecked]);
  useEffect(() => {
    console.log('unitClassificationList', unitClassificationList);
  }, [unitClassificationList]);

  useEffect(() => {}, [questionList]);
  // 교과정보 추가버튼 disable 처리
  const addButtonBool = useMemo(() => {
    if (
      unitClassificationList.length < 5 &&
      radio1depthCheck?.code !== '' &&
      radio2depthCheck?.code !== '' &&
      radio3depthCheck?.code !== '' &&
      radio4depthCheck?.code !== '' &&
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
    checkedDepthList,
  ]);

  // 검색 단어 하이라이트 && 하이라이트간 이동 처리
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  const contentRef = useRef<HTMLDivElement>(null);

  const highlightText = (text: string, searchValue: string) => {
    if (searchValue.length < 2) return text;
    const parts = text.split(new RegExp(`(${searchValue})`, 'gi'));
    const highlightedText = (
      <span className="text">
        {parts.map((part, index) => {
          const className =
            part.toLowerCase() === searchValue.toLowerCase() ? 'highlight' : '';
          return part.toLowerCase() === searchValue.toLowerCase() ? (
            <span key={index} className={className}>
              {part}
            </span>
          ) : (
            <span>{part}</span>
          );
        })}
      </span>
    );
    return highlightedText;
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
        const container = document.getElementById('scrollTopWrapper');
        // console.log('container', container?.offsetTop);
        if (
          container instanceof HTMLElement &&
          currentElement instanceof HTMLElement
        ) {
          const elementPosition =
            currentElement.parentElement?.parentElement?.parentElement
              ?.parentElement?.offsetTop;
          // console.log('elementPosition', elementPosition);
          container.scrollTop = elementPosition as number;
        }
      }
    }
  }, [highlightIndex]);

  // 마지막으로 클릭된 문항 뷰어에 보이게
  const clickIdx = useMemo(() => {
    const num = sortedList.length - 1;
    return num;
  }, [sortedQuizList]);

  useEffect(() => {
    setSortedQuizList(sortedList);
  }, [sortedList]);
  useEffect(() => {}, [sortedQuizList]);

  useEffect(() => {
    // console.log('itemTree ------ ', itemTree);
    setHighlightIndex(-1);
  }, [itemTree, searchValue]);

  // 탭바뀔 때 에디터
  useEffect(() => {}, [setTabView]);

  return (
    <Container>
      <LayoutBodyWrapper>
        <LayoutWrapper className="auto">
          {/* MyResponsiveWrapper  */}
        </LayoutWrapper>
        <LayoutWrapper>
          <ScrollWrapper>
            <PerfectScrollbar id="scrollTopWrapper">
              <Title>
                <span className="title_top">문항단원분류</span>
              </Title>
              {/* 추가된 단원분류 리스트 최대5개 저장 */}
              <UnitClassifications>
                {unitClassificationList.length > 0 ? (
                  <>
                    {unitClassificationList.map((el, idx) => (
                      <IconButtonWrapper key={`${el} idx`}>
                        <IconButton
                          width={`calc(100% - 25px)`}
                          fontSize="14px"
                          height="35px"
                          textAlign="left"
                          $padding="0 50px 0 10px"
                          onClick={() => changeUnitClassification(idx)}
                        >
                          <span>
                            {el
                              .filter(
                                (item): item is RadioStateType =>
                                  'title' in item,
                              )
                              .map((item) => `${item.title} / `)}
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
              {/* 체크박스에 선택된 리스트없을시 안보이게 */}
              {sortedList.length > 0 ? (
                <>
                  {categoryItems[0] && categoryList && (
                    <>
                      {[categoryItems[0]].map((item) => (
                        <div
                          className={`1depth`}
                          id={`${item.name}`}
                          key={`selected1depth ${item.idx}`}
                        >
                          <ButtonFormatRadio
                            branchValue={`${item.name}`}
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

                      {radio1depthCheck?.code !== '' &&
                        selected1depth !== '' &&
                        [categoryItems[41]].map((item) => (
                          <div
                            className={`2depth`}
                            id={`${item.name}`}
                            key={`selected2depth ${item.idx}`}
                          >
                            <ButtonFormatRadio
                              branchValue={`${item.name}`}
                              titleText={`${item.name}`}
                              list={nextList1depth}
                              selected={selected2depth}
                              onChange={(e) => handleRadioCheck(e)}
                              // defaultChecked={}
                              checkedInput={radio2depthCheck}
                            />
                          </div>
                        ))}

                      {radio2depthCheck?.code !== '' &&
                        selected2depth !== '' &&
                        [categoryItems[1]].map((item) => (
                          <div
                            className={`3depth`}
                            id={`${item.name}`}
                            key={`selected3depth ${item.idx}`}
                          >
                            <ButtonFormatRadio
                              branchValue={`${item.name}`}
                              titleText={`${item.name}`}
                              list={nextList2depth}
                              selected={selected3depth}
                              onChange={(e) => handleRadioCheck(e)}
                              // defaultChecked={}
                              checkedInput={radio3depthCheck}
                            />
                          </div>
                        ))}
                      {radio3depthCheck?.code !== '' &&
                        selected3depth !== '' &&
                        [categoryItems[2]].map((item) => (
                          <div
                            className={`4depth`}
                            id={`${item.name}`}
                            key={`selected4depth ${item.idx}`}
                          >
                            <ButtonFormatRadio
                              branchValue={`${item.name}`}
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
                </>
              ) : (
                <ValueNoneWrapper>
                  <ValueNone info="문항을 선택해 주세요" textOnly />
                </ValueNoneWrapper>
              )}

              <p className="line"></p>

              {/* 교과정보 아코디언 리스트  */}
              {radio1depthCheck?.code !== '' &&
              radio2depthCheck?.code !== '' &&
              radio3depthCheck?.code !== '' &&
              radio4depthCheck?.code !== '' &&
              selected1depth !== '' &&
              selected2depth !== '' &&
              selected3depth !== '' ? (
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
                        onClick={(e) => filterSearchValue(e)}
                        onKeyDown={(e) => filterSearchValueEnter(e)}
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
                            <button onClick={() => prevHighlight()}>
                              <IoMdArrowDropup />
                            </button>
                            <button onClick={() => nextHighlight()}>
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
                      <DepthBlockScrollWrapper>
                        <PerfectScrollbar>
                          {categoryItemTreeData ? (
                            <>
                              {itemTree.length ? (
                                <div ref={contentRef} className="content">
                                  {searchValue.length > 0 ? (
                                    <>
                                      {itemTree.map((el) => (
                                        <div key={`${el.itemTreeKey}`}>
                                          {el.itemTreeList.map((item) => (
                                            <DepthBlock
                                              branchValue={`${item.name}`}
                                              highlightText={highlightText}
                                              defaultChecked
                                              key={`depthList${item?.idx} ${item.name}`}
                                              classNameList={`depth-${item.level}`}
                                              id={item?.idx}
                                              name={item.name}
                                              value={item?.idx}
                                              level={item?.level}
                                              onChange={(e) =>
                                                handleSingleCheck(
                                                  e.target.checked,
                                                  item?.idx,
                                                  item?.level,
                                                  item.name,
                                                  findItemByIdx,
                                                  findChildItems,
                                                )
                                              }
                                              checked={
                                                checkedDepthList.includes(
                                                  item?.idx,
                                                )
                                                  ? true
                                                  : false
                                              }
                                              searchValue={searchValue}
                                            >
                                              <span>{item.name}</span>
                                            </DepthBlock>
                                          ))}
                                        </div>
                                      ))}
                                    </>
                                  ) : (
                                    <>
                                      {itemTree.map((el) => (
                                        <div key={`${el.itemTreeKey}`}>
                                          {el.itemTreeList.map((item) => (
                                            <DepthBlock
                                              branchValue={`${item.name}`}
                                              defaultChecked
                                              key={`depthList${item?.idx} ${item.name}`}
                                              classNameList={`depth-${item.level}`}
                                              id={item?.code}
                                              name={item.name}
                                              value={item?.idx}
                                              level={item?.level}
                                              onChange={(e) =>
                                                handleSingleCheck(
                                                  e.target.checked,
                                                  item?.idx,
                                                  item?.level,
                                                  item.name,
                                                  findItemByIdx,
                                                  findChildItems,
                                                )
                                              }
                                              checked={
                                                checkedDepthList.includes(
                                                  item?.idx,
                                                )
                                                  ? true
                                                  : false
                                              }
                                              searchValue={searchValue}
                                            >
                                              <span>{item.name}</span>
                                            </DepthBlock>
                                          ))}
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
                            </>
                          ) : (
                            <Loader />
                          )}
                        </PerfectScrollbar>
                      </DepthBlockScrollWrapper>
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
                          {[categoryItems[4]].map((item) => (
                            <div
                              id={`${item.name}`}
                              className={`etc1`}
                              key={`etc1 ${item.idx}`}
                            >
                              <ButtonFormatMultiRadio
                                titleText={`${item.name}`}
                                list={categoryAddInfoList[0]}
                                selected={selectedCategoryEtc1}
                                onChange={(e) => handleMultiRadioCheck(e)}
                                checkedInputs={radioEtc1Check}
                                branchValue={`etc1`}
                              />
                            </div>
                          ))}
                          {[categoryItems[5]].map((item) => (
                            <div
                              id={`${item.name}`}
                              className={`etc2`}
                              key={`etc2 ${item.idx}`}
                            >
                              <ButtonFormatMultiRadio
                                titleText={`${item.name}`}
                                list={categoryAddInfoList[1]}
                                selected={selectedCategoryEtc2}
                                onChange={(e) => handleMultiRadioCheck(e)}
                                checkedInputs={radioEtc2Check}
                                branchValue={`etc2`}
                              />
                            </div>
                          ))}
                        </>
                      ) : (
                        <ValueNone textOnly info="등록된 데이터가 없습니다" />
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
            </PerfectScrollbar>
          </ScrollWrapper>
        </LayoutWrapper>
      </LayoutBodyWrapper>
      <BorderWrapper>
        <SubmitButtonWrapper>
          <Button
            $filled
            disabled={addButtonBool}
            cursor
            width={'calc(50% - 5px)'}
            $margin={'0 10px 0 0'}
            onClick={() => saveCheckItems()}
          >
            교과정보 추가
          </Button>
          <Button
            $filled
            disabled={unitClassificationList.length !== 0 ? false : true}
            cursor
            width={'calc(50% - 5px)'}
            onClick={() => onSubmit()}
          >
            저장
          </Button>
        </SubmitButtonWrapper>
      </BorderWrapper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;
const LayoutBodyWrapper = styled.div`
  display: flex;
`;
const LayoutWrapper = styled.div`
  min-width: 400px;
  border: 1px solid ${COLOR.BORDER_GRAY};
  &.auto {
    flex: 1 0 0;
  }
`;
const ScrollWrapper = styled.div`
  overflow-y: auto;
  height: calc(100vh - 100px);
  width: 100%;
  background-color: ${COLOR.LIGHT_GRAY};

  .line {
    border-bottom: 1px solid ${COLOR.BORDER_GRAY};
    padding: 5px 0;

    &.bottom_text {
      text-align: right;
      font-size: 13px;
      padding-bottom: 2px;
    }
  }
`;
const DepthBlockScrollWrapper = styled.div`
  overflow-y: auto;
  /* height: 300px; */
  width: 100%;
  margin-top: 10px;
`;
const Title = styled.div`
  padding: 15px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  .title_top {
    font-size: 15px;
    font-weight: bold;
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
const ValueNoneWrapper = styled.div`
  display: flex;
`;

const BorderWrapper = styled.div`
  border-top: 1px solid ${COLOR.BORDER_BLUE};
  position: sticky;
  bottom: 0px;
  width: 100%;
  height: 70px;
  background-color: #fff;
`;
const SubmitButtonWrapper = styled.div`
  position: absolute;
  right: 10px;
  left: auto;
  top: 10px;
  bottom: 0;
  display: flex;
  flex-direction: row;
  width: 50%;
`;
const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 50px;
  padding-left: calc(50% - 35px);
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
