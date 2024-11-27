import * as React from 'react';
import { useState, useEffect, useRef, useMemo } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
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
  Alert,
  ButtonFormatMultiRadio,
} from '../..';
import { classificationInstance, quizService } from '../../../api/axios';
import { pageAtom } from '../../../store/utilAtom';
import {
  ItemCategoryType,
  ItemTreeListType,
  ItemTreeType,
} from '../../../types';
import { TextbookInfoType } from '../../../types/TextbookType';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { COLOR } from '../../constants';

import { MockExamTab } from './MockExamTab';
import { PreviousTab } from './PreviousTab';
import { SelectSection } from './SelectSection';

type ProcessTextbookDataType = {
  pageList: {
    bookPage: string;
    isChecked: boolean;
    quizList: {
      idx: number;
      code: string;
      bookQuizNumber: string;
      isChecked: boolean;
      seq: string;
    }[];
  }[];
  subChapter: string;
};

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
    {
      label: '기출',
      value: '기출',
    },
  ];

  const [tabVeiw, setTabVeiw] = useState<string>('단원·유형별');
  const navigate = useNavigate();

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
  const [categoryTypeList, setCategoryTypeList] = useState<string>('');
  const [categoryNameList, setCategoryNameList] = useState<string>('');
  const [categoriesE, setCategoriesE] = useState<ItemCategoryType[][]>([]);
  const [refreshTokenCalled, setRefreshTokenCalled] = useState(false);

  const [categoryAddInfoList, setCategoryAddInfoList] = useState<
    ItemCategoryType[][]
  >([]); // 각 카테고리의 상세 리스트를 저장할 상태
  const [itemTree, setItemTree] = useState<ItemTreeListType[]>([]);
  //  카테고리 불러오기 api
  const getCategory = async () => {
    const res = await classificationInstance.get(`/v1/category`);
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

  // 카테고리의 그룹 유형 조회
  const getCategoryGroups = async () => {
    const response = await classificationInstance.get('/v1/category/group/A'); //TODO: /group/${``} 하드코딩된 유형 나중에 해당 변수로 변경
    return response.data.data;
  };
  const {
    data: groupsData,
    isFetching: groupsDataAIsFetching,
    refetch: groupsDataRefetch,
  } = useQuery({
    queryKey: ['get-category-groups-A'],
    queryFn: getCategoryGroups,
    enabled: !!categoryData,
    meta: {
      errorMessage: 'get-category-groups 에러 메세지',
    },
  });
  useEffect(() => {
    if (tabVeiw === '단원·유형별' && categoryTypeList) {
      fetchCategoryItems(categoryTypeList, setCategoryList);
    }
  }, [categoryTypeList, tabVeiw]);

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
      const requests = typeIds.map((id) =>
        classificationInstance
          .get(`/v1/category/class/${id}`)
          .catch((error) => {
            // console.log(error);
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
      console.log('finally');
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
      if (error.response?.data?.code == 'GE-002')
        postRefreshToken().then(() => {
          //groupsDataRefetch();
        });
      return undefined;
    }
  };
  const {
    data: nextListData1,
    refetch: nextListData1Refetch,
    isLoading: nextListData1IsLoading,
  } = useQuery({
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
      if (error.response?.data?.code == 'GE-002')
        postRefreshToken().then(() => {
          nextListData1Refetch();
        });
      return undefined;
    }
  };
  const {
    data: nextListData2,
    refetch: nextListData2Refetch,
    isLoading: nextListData2IsLoading,
  } = useQuery({
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
    try {
      const res = await classificationInstance.get(
        `/v1/category/${itemIdx}/${pidx}`,
      );
      setNextList3depth(res?.data.data.categoryClassList);
      return res.data;
    } catch (error: any) {
      if (error.response?.data?.code == 'GE-002')
        postRefreshToken().then(() => {
          nextListData2Refetch();
        });
      return undefined;
    }
  };
  const {
    data: nextListData3,
    refetch: nextListData3Refetch,
    isLoading: nextListData3IsLoading,
  } = useQuery({
    queryKey: ['get-nextList3'],
    queryFn: getNextList3,
    meta: {
      errorMessage: 'get-nextList3 에러 메세지',
    },
    // 체크된 값이 있을때 조회
    enabled: radio3depthCheck?.code !== '',
  });

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
    const reset = { title: '', checkValue: 0, code: '', key: '' };
    setRadio2depthCheck(reset);
    setRadio3depthCheck(reset);
    setRadio4depthCheck(reset);
    setRadio5depthCheck(reset);
    setRadio6depthCheck(reset);
    setRadioEtc1Check([]);
    setRadioEtc2Check([]);

    setSelected2depth('');
    setCheckedDepthList([]);
  }, [selected1depth]);
  useEffect(() => {
    const reset = { title: '', checkValue: 0, code: '', key: '' };
    setRadio3depthCheck(reset);
    setRadio4depthCheck(reset);
    setRadio5depthCheck(reset);
    setRadio6depthCheck(reset);
    setRadioEtc1Check([]);
    setRadioEtc2Check([]);

    setSelected3depth('');
    setCheckedDepthList([]);
  }, [selected2depth]);
  useEffect(() => {
    const reset = { title: '', checkValue: 0, code: '', key: '' };
    setRadio4depthCheck(reset);
    setRadio5depthCheck(reset);
    setRadio6depthCheck(reset);
    setRadioEtc1Check([]);
    setRadioEtc2Check([]);

    setSelected4depth('');
    setCheckedDepthList([]);
    setRadio4depthCheck({ title: '', checkValue: 0, code: '', key: '' });
  }, [selected3depth]);
  useEffect(() => {
    const reset = { title: '', checkValue: 0, code: '', key: '' };
    setRadio5depthCheck(reset);
    setRadio6depthCheck(reset);
    setRadioEtc1Check([]);
    setRadioEtc2Check([]);

    setSelected5depth('');
    setCheckedDepthList([]);
    setRadio5depthCheck({ title: '', checkValue: 0, code: '', key: '' });
  }, [selected4depth]);
  useEffect(() => {
    const reset = { title: '', checkValue: 0, code: '', key: '' };
    setRadio6depthCheck(reset);
    setRadioEtc1Check([]);
    setRadioEtc2Check([]);

    setSelected6depth('');
    setCheckedDepthList([]);
    setRadio6depthCheck({ title: '', checkValue: 0, code: '', key: '' });
  }, [selected5depth]);
  useEffect(() => {
    setRadioEtc1Check([]);
    setRadioEtc2Check([]);

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
    //console.log('itemTreeKeyList', itemTreeKeyList);

    const res = await classificationInstance.post('/v2/item', itemTreeKeyList);
    // console.log('item', res);
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
      radio1depthCheck?.code !== '' &&
      radio2depthCheck?.code !== '' &&
      radio3depthCheck?.code !== '' &&
      radio4depthCheck?.code !== '' &&
      radio5depthCheck?.code !== '' &&
      radio6depthCheck?.code !== '' &&
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

  useEffect(() => {}, [tabVeiw]);

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

  // 깊이가 있는 리스트 DepthBlock 체크박스
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

  //단원.유형별
  const [inputValue, setInputValue] = useState<string>('');

  const [questionNum, setQuestionNum] = useState<string | null>(null);

  const [questionLevel, setQuestionLevel] = useState<string | null>(null);

  const [questionType, setQuestionType] = useState<string[] | null>(null);

  const [containMock, setContainMock] = useState<number | null>(null);
  //배점
  const [equalScore, setEqualScore] = useState<number | null>(null);
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
  //배점 모달 띄우는 값
  const [isEqualScoreModal, setIsEqualScoreModal] = useState<boolean>(false);

  //총 배점
  const [equalTotalValue, setEqualTotlaValue] = useState('0');
  // 문항당 배점
  const [isSaveEqualValue, setIsSaveEqualValue] = useState<boolean>(false);

  //나머지 시작 컨텐츠
  const [remainderContent, setRemainderContent] = useState<number>();
  //나머지 시작 전 컨텐츠
  const [nextRemainderContent, setNextRemainderContent] = useState<number>();
  //문항당 배점
  const [quotient, setQuotient] = useState<number>(0);
  const [remainder, setRemainder] = useState<number>();
  //문항수 확인
  const [receivedQuizCount, setReceivedQuizCount] = useState<number | null>(
    null,
  );
  //문항 재배점
  const [isResaveEqualValue, setIsResaveEqualValue] = useState(false);
  //최종 확인
  const [isConfirm, setIsConfirm] = useState(false);

  // 균등배점 모달 닫기
  const closeEqualScoreSettingModal = () => {
    setIsEqualScoreModal(false);
  };
  //균등배점 저장
  const saveEqualScoreSettingModal = () => {
    if (isSaveEqualValue) {
      //재균등배점
      if (isResaveEqualValue) {
        setIsConfirm(true);
        closeEqualScoreSettingModal();
        //로컬에 배점 저장하기
        saveLocalQutientData();
      } else {
        closeEqualScoreSettingModal();
        saveLocalQutientData();
      }
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
  };
  //균등배점 취소
  const cancelEqualScoreSettingModal = () => {
    closeEqualScoreSettingModal();
    setEqualScore(null);
    setEqualTotlaValue('0');
    setRemainderContent(0);
    setNextRemainderContent(0);
    setQuotient(0);
    setMinQuotient(0);
    setMaxQuotient(0);
  };

  const changeEqualInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let equalTotalValue = e.target.value;
    // 정규표현식을 사용하여 숫자 이외의 문자 제거
    equalTotalValue = equalTotalValue.replace(/[^0-9]/g, '');

    const parsedValue = parseInt(equalTotalValue, 10);

    setEqualTotlaValue(parsedValue >= 200 ? '200' : equalTotalValue);
  };

  useEffect(() => {
    if (receivedQuizCount) {
      setEqualTotlaValue(receivedQuizCount.toString());
      //값초기화
      setRemainderContent(0);
      setNextRemainderContent(0);
    }
  }, [receivedQuizCount]);

  const saveEqualInputValue = () => {
    //받아온 문항 수 넘버타입 변경
    const parsedreceivedQuiz = receivedQuizCount?.toString();
    //받아온 문항 수 넘버타입 변경
    const parsedreceivedQuizValue = parseInt(parsedreceivedQuiz as string, 10);
    //총배점 타입 변경
    const parsedValue = parseInt(equalTotalValue, 10);

    //선택된 문항 수
    const questionNumValue =
      tabVeiw === '시중교재' || tabVeiw === '기출'
        ? questionNum
          ? parseInt(questionNum, 10) * includeQuizList.length
          : inputValue
            ? parseInt(inputValue, 10) * includeQuizList.length
            : 0
        : parseInt(
            questionNum ||
              inputValue ||
              (includeQuizList.length as unknown as string),
            10,
          );

    if (equalTotalValue === '') {
      openToastifyAlert({
        type: 'error',
        text: '총 배점을 입력해주세요.',
      });
      setIsSaveEqualValue(false);
      setEqualTotlaValue('0');
      setQuotient(0);
    } else if (
      !receivedQuizCount &&
      !parsedreceivedQuizValue &&
      equalTotalValue &&
      parsedValue < questionNumValue
    ) {
      openToastifyAlert({
        type: 'error',
        text: '총 배점은 총 문항수보다 크거나 같아야합니다.',
      });
      setEqualTotlaValue(questionNumValue.toString());
      setIsSaveEqualValue(false);
    } else if (equalTotalValue && parsedValue < parsedreceivedQuizValue) {
      openToastifyAlert({
        type: 'error',
        text: '총 배점은 총 문항수보다 크거나 같아야합니다.',
      });
      if (receivedQuizCount) {
        setEqualTotlaValue(receivedQuizCount.toString());
      }
      setIsSaveEqualValue(false);
    } else {
      openToastifyAlert({
        type: 'success',
        text: '저장되었습니다.',
      });
      setEqualTotlaValue(equalTotalValue);
      setIsSaveEqualValue(true);
    }
  };

  const [minQuotient, setMinQuotient] = useState<number>();
  const [maxQuotient, setMaxQuotient] = useState<number>();

  useEffect(() => {
    const parsedValue = parseInt(equalTotalValue, 10);
    const questionNumValue = parseInt(
      questionNum ||
        inputValue ||
        (includeQuizList.length as unknown as string),
      10,
    );

    if (isSaveEqualValue && receivedQuizCount) {
      const quotient = Math.floor(parsedValue / receivedQuizCount);
      const remainder = parsedValue % receivedQuizCount;
      setQuotient(quotient);
      setRemainder(remainder);
      if (quotient || remainder) {
        const remainderContent = receivedQuizCount - remainder;
        const minQuotient = quotient - 1;
        const maxQuotient = quotient + 1;
        setRemainderContent(remainderContent);
        setNextRemainderContent(remainderContent + 1);
        setMinQuotient(minQuotient <= 0 ? 1 : minQuotient);
        setMaxQuotient(maxQuotient);
      }
    } else if (isSaveEqualValue && !receivedQuizCount) {
      const quotient = Math.floor(parsedValue / questionNumValue);
      const remainder = parsedValue % questionNumValue;
      setQuotient(quotient);
      setRemainder(remainder);
      if (quotient || remainder) {
        const remainderContent = questionNumValue - remainder;
        const minQuotient = quotient - 1;
        const maxQuotient = quotient + 1;
        setRemainderContent(remainderContent);
        setNextRemainderContent(remainderContent + 1);
        setMinQuotient(minQuotient <= 0 ? 1 : minQuotient);
        setMaxQuotient(maxQuotient);
      }
    }
  }, [isSaveEqualValue, equalTotalValue, receivedQuizCount]);

  //문항 수 균등 배분
  const [isQuizEven, setIsQuizEven] = useState(false);
  //내 문항 우선 추천
  const [isPriority, setIsPriority] = useState(false);

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

  //시중교재 검색값
  const [searchTextbookValue, setSearchTextbookValue] = useState<string>('');

  const searchTextbook = (value: string) => {
    setSearchTextbookValue(value);
  };

  const [isSelectTextbook, setIsSelectTextbook] = useState(true);
  const [selectedTextbookTitle, setSelectedTextbookTitle] = useState<
    string | null
  >(null);
  const [selectedTextbookIdx, setSelectedTextbookIdx] = useState<number | null>(
    null,
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
  const [selectedTextbook, setSelectedTextbook] = useState<
    ProcessTextbookDataType[]
  >([]);
  useEffect(() => {
    if (textbookDetailData) {
      setSelectedTextbook(textbookDetailData?.data.data.textbookList);
    }
  }, [textbookDetailData]);

  //다른 교재 선택
  const selectOtherTextbook = () => {
    setQuestionNum('');
    setIsSelectTextbook(true);
    setIsSelectTextbookContent(false);
    setIsChoice(false);
    setProcessTextbookData([]);
    setTextbookList([]);
    setSelectedTextbookIdx(null);
    setSelectedTextbook([]);
    setClickedIdx(null);
    setClickedPageIdx(null);
    textbookDataRefetch();
  };
  // 시중교재 불러오기 api
  const getTextbook = async () => {
    const res = await quizService.get(
      `/v1/textbook?pageIndex=${page}&pageUnit=${8}&level=${schoolLevel}&grade=${gradeLevel || ''}&searchKeyword=${searchTextbookValue || ''}`,
    );
    return res;
  };
  const { data: textbookData, refetch: textbookDataRefetch } = useQuery({
    queryKey: ['get-textbook'],
    queryFn: getTextbook,
    meta: {
      errorMessage: 'get-textbook 에러 메세지',
    },
    enabled: false,
  });
  const [textbookList, setTextbookList] = useState<TextbookInfoType[]>([]);
  useEffect(() => {
    if (textbookData) {
      setTextbookList(textbookData?.data.data.textbookList);
    }
  }, [textbookData]);

  //조건값이 바뀔때 재검색
  useEffect(() => {
    if (tabVeiw === '시중교재') {
      textbookDataRefetch();
    }
  }, [page, schoolLevel, gradeLevel, searchTextbookValue, tabVeiw]);

  const [isChoice, setIsChoice] = useState(false);
  const [clickedIdx, setClickedIdx] = useState<number | null>(null);
  const [clickedPageIdx, setClickedPageIdx] = useState<string | null>(null);
  const [processTextbookData, setProcessTextbookData] = useState<
    ProcessTextbookDataType[]
  >([]);

  // 클릭한 페이지 인덱스를 기억하는 함수
  const handlePageClick = (bookPage: string) => {
    if (clickedPageIdx !== bookPage) {
      setClickedPageIdx(bookPage);
    } else {
      setClickedPageIdx(null); // 같은 페이지를 다시 클릭하면 숨기기
    }
  };

  // 시중교재 값을 받아왔을 때 원하는 모양의 데이타로 가공
  useEffect(() => {
    if (selectedTextbook && selectedTextbook.length > 0) {
      const initialData = selectedTextbook.map((textbook) => ({
        subChapter: textbook?.subChapter || '',
        pageList: (textbook?.pageList || [])
          .map((page) => ({
            bookPage: page?.bookPage || '',
            isChecked: false,
            quizList: (page?.quizList || [])
              .map((quiz) => ({
                ...quiz,
                isChecked: false,
                seq: `${quiz.code}${quiz.bookQuizNumber}`,
              }))
              .sort(
                (a, b) => Number(a.bookQuizNumber) - Number(b.bookQuizNumber),
              ),
          }))
          .sort((a, b) => Number(a.bookPage) - Number(b.bookPage)), // quizNumber로 정렬
      }));
      setProcessTextbookData(initialData);
    }
  }, [selectedTextbook]);

  // 선택시 배경색이 나타남
  const choiceType = (idx: number) => {
    if (clickedIdx !== idx) {
      setClickedIdx(idx);
      setIsChoice(!isChoice);
    } else {
      setClickedIdx(null);
      setIsChoice(!isChoice);
    }
  };

  const [includeQuizList, setIncludeQuizList] = useState<string[]>([]);
  // 선택된 문항 코드 넣기
  const toggleQuizCode = (quizCode: string | string[], isChecked: boolean) => {
    if (Array.isArray(quizCode)) {
      setIncludeQuizList((prev) => {
        if (isChecked) {
          // isChecked가 true일 때: quizCode를 제거
          return prev.filter((code) => !quizCode.includes(code));
        } else {
          // isChecked가 false일 때: 중복을 제거하고 quizCode를 추가
          const uniqueCodesToAdd = quizCode.filter(
            (code, index, self) =>
              self.indexOf(code) === index && !prev.includes(code),
          );
          return [...prev, ...uniqueCodesToAdd];
        }
      });
    } else {
      setIncludeQuizList((prev) => {
        if (isChecked) {
          // isChecked가 true일 때: quizCode를 제거
          return prev.filter((code) => code !== quizCode);
        } else {
          // isChecked가 false일 때: quizCode를 추가
          if (!prev.includes(quizCode)) {
            return [...prev, quizCode];
          }
          return prev;
        }
      });
    }
  };

  // 전체 선택
  const checkAllToggle = (
    subChapter: string,
    isChecked: boolean,
    contentSeqs: string[],
    quizCode: string,
  ) => {
    setProcessTextbookData((prevData) => {
      if (!prevData) return prevData;

      return prevData.map((textbook) => {
        if (textbook.subChapter === subChapter) {
          const updatedPageList = textbook.pageList.map((page) => {
            const updatedQuizList = page.quizList.map((quiz) => {
              if (contentSeqs.includes(quiz.seq)) {
                return { ...quiz, isChecked: !isChecked };
              }
              return quiz;
            });

            // 모든 퀴즈가 선택되어 있는지 확인
            const allContentsChecked = updatedQuizList.every(
              (quiz) => quiz.isChecked,
            );

            return {
              ...page,
              isChecked: allContentsChecked,
              quizList: updatedQuizList,
            };
          });

          return { ...textbook, pageList: updatedPageList };
        }
        return textbook;
      });
    });
    toggleQuizCode(quizCode, isChecked);
  };

  //부분 선택
  const checkPartialToggle = (
    subChapter: string,
    contentSeq: string,
    isChecked: boolean,
    quizCode: string,
  ) => {
    setProcessTextbookData((prevData) => {
      if (!prevData) return prevData;

      return prevData.map((textbook) => {
        if (textbook.subChapter === subChapter) {
          const updatedPageList = textbook.pageList.map((page) => {
            const updatedQuizList = page.quizList.map((quiz) => {
              if (quiz.seq === contentSeq) {
                return { ...quiz, isChecked: !isChecked };
              }
              return quiz;
            });

            // 모든 퀴즈가 선택되어 있는지 확인
            const allContentsChecked = updatedQuizList.every(
              (quiz) => quiz.isChecked,
            );

            return {
              ...page,
              isChecked: allContentsChecked,
              quizList: updatedQuizList,
            };
          });

          // 모든 페이지가 선택되어 있는지 확인
          const allPagesChecked = updatedPageList.every(
            (page) => page.isChecked,
          );

          return {
            ...textbook,
            isChecked: allPagesChecked,
            pageList: updatedPageList,
          };
        }
        return textbook;
      });
    });
    toggleQuizCode(quizCode, isChecked);
  };

  //선택한 유형 확인
  const [selectedItemTreeCount, setSelectedItemTreeCount] = useState<number[]>(
    [],
  );

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  //alert 취소클릭
  const cancelAlert = () => {
    //alert 끄기
    setIsAlertOpen(false);
    //선택된 값 초기화
    setQuestionNum('');
    selectEqualScore(null);
    setQuestionLevel(null);
    setQuestionType([]);
    setContainMock(null);
    setIsQuizEven(false);
    setIsPriority(false);
    setReceivedQuizCount(null);
    setRemainderContent(0);
    setNextRemainderContent(0);
    setQuotient(0);
    setMinQuotient(0);
    setMaxQuotient(0);
    setEqualTotlaValue('');
  };

  //alert 진행클릭
  const keepGoingAlert = () => {
    //난이도 설정 다시 열기
    if (equalScore === 2) {
      setIsEqualScoreModal(true);
      setIsAlertOpen(false);
      setIsResaveEqualValue(true);
      setIsSaveEqualValue(false);
    } else {
      navigate('/content-create/exam/step2');
    }
  };

  useEffect(() => {
    if (isConfirm) {
      navigate('/content-create/exam/step2');
    }
  }, [isConfirm]);

  // step1 선택된 문항 불러오기 api
  const postWorkbookStep1 = async (data: any) => {
    return await quizService.post(`/v1/search/quiz/step/1`, data);
  };

  const { mutate: postStep1Data, isPending: postStep1Pending } = useMutation({
    mutationFn: postWorkbookStep1,
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
      //성공했을 때 문항 수 카운트
      setReceivedQuizCount(response.data.data.quizList.length);
      saveLocalData(response.data.data);
      //받아온 문항수와 선택한 문항수가 같을경우 다음단계
      if (tabVeiw === '단원·유형별') {
        if (response.data.data.quizList.length === 0) {
          openToastifyAlert({
            type: 'error',
            text: `가지고 올 수 있는 문항의 수는 ${response.data.data.quizList.length} 입니다.`,
          });
          return;
        } else {
          if (
            response.data.data.quizList.length === Number(questionNum) ||
            response.data.data.quizList.length === Number(inputValue)
          ) {
            navigate('/content-create/exam/step2');
            const itemCount =
              Number(questionNum) ||
              Number(inputValue) ||
              Number(includeQuizList.length);
            localStorage.setItem('itemCount', JSON.stringify(itemCount));
          } else {
            setIsAlertOpen(true);
            const itemCount =
              Number(questionNum) ||
              Number(inputValue) ||
              Number(includeQuizList.length);
            localStorage.setItem('itemCount', JSON.stringify(itemCount));
          }
        }
      } else if (tabVeiw === '시중교재') {
        if (response.data.data.quizList.length === 0) {
          openToastifyAlert({
            type: 'error',
            text: `가지고 올 수 있는 문항의 수는 ${response.data.data.quizList.length} 입니다.`,
          });
          return;
        } else {
          if (
            response.data.data.quizList.length ===
              Number(questionNum) * Number(includeQuizList.length) ||
            response.data.data.quizList.length ===
              Number(inputValue) * Number(includeQuizList.length)
          ) {
            navigate('/content-create/exam/step2');
            const itemCount =
              Number(questionNum) * Number(includeQuizList.length) ||
              Number(inputValue) * Number(includeQuizList.length);
            localStorage.setItem('itemCount', JSON.stringify(itemCount));
          } else {
            setIsAlertOpen(true);
            const itemCount = response.data.data.quizList.length;
            localStorage.setItem('itemCount', JSON.stringify(itemCount));
          }
        }
      } else if (tabVeiw === '수능/모의고사') {
        if (response.data.data.quizList.length === 0) {
          openToastifyAlert({
            type: 'error',
            text: `가지고 올 수 있는 문항의 수는 ${response.data.data.quizList.length} 입니다.`,
          });
          return;
        } else {
          if (
            response.data.data.quizList.length ===
            Number(includeQuizList.length)
          ) {
            navigate('/content-create/exam/step2');
            const itemCount = Number(includeQuizList.length);
            localStorage.setItem('itemCount', JSON.stringify(itemCount));
          } else {
            setIsAlertOpen(true);
            const itemCount = Number(includeQuizList.length);
            localStorage.setItem('itemCount', JSON.stringify(itemCount));
          }
        }
      } else if (tabVeiw === '기출') {
        if (response.data.data.quizList.length === 0) {
          openToastifyAlert({
            type: 'error',
            text: `가지고 올 수 있는 문항의 수는 ${response.data.data.quizList.length} 입니다.`,
          });
          return;
        } else {
          if (
            response.data.data.quizList.length ===
              Number(questionNum) * Number(includeQuizList.length) ||
            response.data.data.quizList.length ===
              Number(inputValue) * Number(includeQuizList.length)
          ) {
            navigate('/content-create/exam/step2');
            const itemCount =
              Number(questionNum) * Number(includeQuizList.length) ||
              Number(inputValue) * Number(includeQuizList.length);
            localStorage.setItem('itemCount', JSON.stringify(itemCount));
          } else {
            setIsAlertOpen(true);
            const itemCount = response.data.data.quizList.length;
            localStorage.setItem('itemCount', JSON.stringify(itemCount));
          }
        }
      }
    },
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

  useEffect(() => {
    const allItemTreeIdxList = makingdata.flatMap(
      (data) => data.itemTreeIdxList,
    );
    setSelectedItemTreeCount(allItemTreeIdxList);
  }, [makingdata]);

  const clickNextButton = () => {
    const data = {
      itemTreeKeyList: tabVeiw === '단원·유형별' ? makingdata : null,
      count:
        tabVeiw === '시중교재' || tabVeiw === '기출'
          ? Number(questionNum) * Number(includeQuizList.length) ||
            Number(inputValue) * Number(includeQuizList.length)
          : tabVeiw === '수능/모의고사'
            ? Number(includeQuizList.length)
            : tabVeiw === '단원·유형별'
              ? Number(questionNum) || Number(inputValue)
              : null,
      //수능/모의고사 경우 어떻게 보내야할지 나중에 수정해야함
      difficulty: questionLevel === '선택안함' ? null : questionLevel || null,
      type: questionType,
      mock: containMock,
      score: equalScore,
      //isScoreEven 안쓰는거
      isScoreEven: true,
      isQuizEven: isQuizEven,
      isMePriority: isPriority,
      filterList: null,
      includeList: tabVeiw === '단원·유형별' ? null : includeQuizList,
    };

    postStep1Data(data);
  };

  const [getLocalData, setGetLocalData] = useState<any | null>(null);

  // 로컬 스토리지에서 데이터 가져오기
  useEffect(() => {
    const data = localStorage.getItem('sendData');
    if (data) {
      const parsedData = JSON.parse(data);
      setGetLocalData(parsedData);
    }
  }, []);

  // 로컬 스토리지 값 다 받은 뒤 초기화
  useEffect(() => {
    if (getLocalData) {
      //window.opener.localStorage.clear();
    }
  }, [getLocalData]);
  //로컬 스토리지에서 받아온 값이 있다면 보여주기
  useEffect(() => {
    if (getLocalData) {
      setQuestionNum(getLocalData.문항수);
      setInputValue(getLocalData.문항수);
      setQuestionLevel(getLocalData.난이도);
      setQuestionType([getLocalData.문항타입]);
    }
  }, [getLocalData]);

  // 로컬스토리지에 보낼데이터 저장
  const saveLocalData = (data: any) => {
    const sendData = { data: data };
    const categoryData = makingdata;
    localStorage.setItem('sendData', JSON.stringify(sendData));
    localStorage.setItem('sendCategoryData', JSON.stringify(categoryData));
  };

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

  const moveStep2 = () => {
    if (tabVeiw === '단원·유형별')
      if (unitClassificationList.length > 0) {
        if (
          (inputValue !== '' || questionNum !== null || questionNum !== '') &&
          questionLevel !== null &&
          questionType?.length !== 0 &&
          containMock !== null &&
          equalScore !== null
        ) {
          clickNextButton();
        } else {
          openToastifyAlert({
            type: 'error',
            text: '필수항목을 선택해주세요',
          });
        }
      } else {
        openToastifyAlert({
          type: 'error',
          text: '교과정보 추가버튼을 눌러주세요.',
        });
      }
    else if (tabVeiw === '시중교재') {
      if (
        (inputValue !== '' || questionNum !== null || questionNum !== '') &&
        includeQuizList.length > 0 &&
        questionLevel !== null &&
        questionType?.length !== 0 &&
        containMock !== null &&
        equalScore !== null
      ) {
        clickNextButton();
      } else {
        openToastifyAlert({
          type: 'error',
          text: '필수항목을 선택해주세요',
        });
      }
    } else if (tabVeiw === '수능/모의고사') {
      if (includeQuizList.length > 0 && equalScore !== null) {
        clickNextButton();
      } else {
        openToastifyAlert({
          type: 'error',
          text: '필수항목을 선택해주세요',
        });
      }
    } else if (tabVeiw === '기출') {
      if (
        (inputValue !== '' || questionNum !== null || questionNum !== '') &&
        includeQuizList.length > 0 &&
        questionLevel !== null &&
        questionType?.length !== 0 &&
        equalScore !== null
      ) {
        clickNextButton();
      } else {
        openToastifyAlert({
          type: 'error',
          text: '필수항목을 선택해주세요',
        });
      }
    }
  };

  //단원분류 입력 도중 해당 화면을 벗어나는 경우, '저장하지 않고 나가시겠습니까?' 얼럿
  useEffect(() => {
    if (
      tabVeiw === '단원·유형별' ||
      tabVeiw === '시중교재' ||
      tabVeiw === '수능/모의고사' ||
      tabVeiw === '기출'
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

  useEffect(() => {
    setReceivedQuizCount(null);
    //단원 유형별버튼 초기화
    setQuestionNum('');
    setQuestionLevel(null);
    setQuestionType([]);
    setContainMock(null);
    selectEqualScore(null);
    setIsQuizEven(false);
    setIsPriority(false);
    setUnitClassificationList([]);
    onResetList();
    //시중교재
    setSearchTextbookValue('');
    setSchoolLevel('초등');
    setgradeLevel(null);
    setIncludeQuizList([]);
    setClickedIdx(null);
    setClickedPageIdx(null);
    //기출탭
    setIsSelectPreviousExamContent(false);
    setQuestionNum('');
    setQuestionLevel(null);
    setQuestionType([]);
    selectEqualScore(null);
    setIsQuizEven(false);
  }, [tabVeiw]);

  //단원.유형별
  const renderCategoryFields = () => {
    return (
      <>
        <UnitClassifications>
          {unitClassificationList.length > 0 ? (
            <>
              <p className="info">교과정보는 최대 5개 까지 저장 가능합니다</p>
              {unitClassificationList.map((el, idx) => (
                <IconButtonWrapper key={`${el} ${idx} `}>
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
                          (item): item is RadioStateType => 'title' in item,
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
            <p className="info">교과정보는 최대 5개 까지 저장 가능합니다</p>
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
                  branchValue={categoryNameList.split(',')[0]}
                  titleText={categoryNameList.split(',')[0]}
                  list={categoryList[0]}
                  selected={selected1depth}
                  onChange={(e) => handleRadioCheck(e)}
                  // defaultChecked={}
                  checkedInput={radio1depthCheck}
                  $margin={`10px 0 0 0`}
                />
              </div>
            }
            {/* 학교급 */}
            {radio1depthCheck.code !== '' &&
              selected1depth !== '' &&
              !nextListData1IsLoading && (
                <div
                  className={`2depth`}
                  id={categoryNameList.split(',')[1]}
                  key={`selected2depth ${categoryNameList.split(',')[1]}`}
                >
                  <ButtonFormatRadio
                    branchValue={categoryNameList.split(',')[1]}
                    titleText={categoryNameList.split(',')[1]}
                    list={nextList1depth}
                    selected={selected2depth}
                    onChange={(e) => handleRadioCheck(e)}
                    // defaultChecked={}
                    checkedInput={radio2depthCheck}
                  />
                </div>
              )}
            {/* 학년 */}
            {radio2depthCheck.code !== '' &&
              selected2depth !== '' &&
              !nextListData2IsLoading && (
                <div
                  className={`3depth`}
                  id={categoryNameList.split(',')[2]}
                  key={`selected3depth ${categoryNameList.split(',')[2]}`}
                >
                  <ButtonFormatRadio
                    branchValue={categoryNameList.split(',')[2]}
                    titleText={categoryNameList.split(',')[2]}
                    list={nextList2depth}
                    selected={selected3depth}
                    onChange={(e) => handleRadioCheck(e)}
                    // defaultChecked={}
                    checkedInput={radio3depthCheck}
                  />
                </div>
              )}
            {/* 학기 */}
            {radio3depthCheck.code !== '' &&
              selected3depth !== '' &&
              !nextListData3IsLoading && (
                <div
                  className={`4depth`}
                  id={categoryNameList.split(',')[3]}
                  key={`selected4depth ${categoryNameList.split(',')[3]}`}
                >
                  <ButtonFormatRadio
                    branchValue={categoryNameList.split(',')[3]}
                    titleText={categoryNameList.split(',')[3]}
                    list={nextList3depth}
                    selected={selected4depth}
                    onChange={(e) => handleRadioCheck(e)}
                    // defaultChecked={}
                    checkedInput={radio4depthCheck}
                  />
                </div>
              )}
            {/* 교과 */}
            {radio4depthCheck.code !== '' && selected4depth !== '' && (
              <div
                className={`5depth`}
                id={categoryNameList.split(',')[4]}
                key={`selected5depth ${categoryNameList.split(',')[4]}`}
              >
                <ButtonFormatRadio
                  branchValue={categoryNameList.split(',')[4]}
                  titleText={categoryNameList.split(',')[4]}
                  list={nextList4depth}
                  selected={selected5depth}
                  onChange={(e) => handleRadioCheck(e)}
                  // defaultChecked={}
                  checkedInput={radio5depthCheck}
                />
              </div>
            )}
            {/* 과목 */}
            {radio5depthCheck.code !== '' && selected5depth !== '' && (
              <div
                className={`6depth`}
                id={categoryNameList.split(',')[5]}
                key={`selected6depth ${categoryNameList.split(',')[5]}`}
              >
                <ButtonFormatRadio
                  overFlow
                  branchValue={categoryNameList.split(',')[5]}
                  titleText={categoryNameList.split(',')[5]}
                  list={nextList5depth}
                  selected={selected6depth}
                  onChange={(e) => handleRadioCheck(e)}
                  // defaultChecked={}
                  checkedInput={radio6depthCheck}
                />
              </div>
            )}
          </>
        )}

        <p className="line"></p>

        {!postStep1Pending ? (
          <>
            {/* 교과정보 아코디언 리스트  */}
            {radio1depthCheck?.code !== '' &&
            radio2depthCheck?.code !== '' &&
            radio3depthCheck?.code !== '' &&
            radio4depthCheck?.code !== '' &&
            radio5depthCheck?.code !== '' &&
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
                    {categoryItemTreeData ? (
                      <AccordionItemWrapper>
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
                                          )
                                        }
                                        checked={
                                          checkedDepthList.includes(item?.idx)
                                            ? true
                                            : false
                                        }
                                        searchValue={searchValue}
                                      >
                                        <span>
                                          {highlightText(
                                            item.name,
                                            searchValue,
                                          )}
                                        </span>
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
                                        id={item?.idx}
                                        name={item.name}
                                        value={item?.idx}
                                        level={item?.level}
                                        onChange={(e) =>
                                          handleSingleCheck(
                                            e.target.checked,
                                            item?.idx,
                                            item?.level,
                                          )
                                        }
                                        checked={
                                          checkedDepthList.includes(item?.idx)
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
                          <ValueNone textOnly info="등록된 데이터가 없습니다" />
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
                        {categoryItems
                          .filter((el) => el.name === '행동요소1')
                          .map((item) => (
                            <div
                              id={`${item.name}`}
                              className={`etc1`}
                              key={`etc1 ${item.idx}`}
                            >
                              <ButtonFormatMultiRadio
                                branchValue={`${item.name}`}
                                titleText={`${item.name}`}
                                list={categoryAddInfoList[0]}
                                selected={selectedCategoryEtc1}
                                onChange={(e) => handleMultiRadioCheck(e)}
                                checkedInputs={radioEtc1Check}
                              />
                            </div>
                          ))}
                        {categoryItems
                          .filter((el) => el.name === '행동요소2')
                          .map((item) => (
                            <div
                              id={`${item.name}`}
                              className={`etc2`}
                              key={`etc2 ${item.idx}`}
                            >
                              <ButtonFormatMultiRadio
                                branchValue={`${item.name}`}
                                titleText={`${item.name}`}
                                list={categoryAddInfoList[1]}
                                selected={selectedCategoryEtc2}
                                onChange={(e) => handleMultiRadioCheck(e)}
                                checkedInputs={radioEtc2Check}
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
            <SubmitButtonWrapper>
              <Button
                $filled
                disabled={addButtonBool}
                cursor
                width={'150px'}
                $margin={'0 10px 0 0'}
                onClick={() => saveCheckItems()}
              >
                교과정보 추가
              </Button>
            </SubmitButtonWrapper>
          </>
        ) : (
          <>
            <Loader width="50px" />
          </>
        )}
      </>
    );
  };

  //시중교재
  const renderGradeButtons = () => {
    const buttonSchoolOption = [
      { value: '초등', label: '초' },
      { value: '중등', label: '중' },
      { value: '고등', label: '고' },
    ];
    const buttonGradeOption = [
      { value: '1', label: '1학년' },
      { value: '2', label: '2학년' },
      { value: '3', label: '3학년' },
      { value: '4', label: '4학년' },
      { value: '5', label: '5학년' },
      { value: '6', label: '6학년' },
    ];

    return (
      <>
        {buttonSchoolOption.map((button) => (
          <Button
            key={button.value}
            buttonType="button"
            onClick={() => {
              selectSchoolLevel(button.value);
              selectGradeLevel('');
            }}
            $padding="10px"
            height={'34px'}
            width={'100%'}
            fontSize="14px"
            $normal={schoolLevel !== button.value}
            $filled={schoolLevel === button.value}
            cursor
          >
            <span>{button.label}</span>
          </Button>
        ))}
        <DivideBar>|</DivideBar>
        {schoolLevel === '중등' || schoolLevel === '고등' ? (
          <>
            {buttonGradeOption.slice(0, 3).map((button) => (
              <Button
                key={button.value}
                buttonType="button"
                onClick={() => {
                  selectGradeLevel(button.value);
                }}
                $padding="10px"
                height={'34px'}
                width={'100%'}
                fontSize="14px"
                $normal={gradeLevel !== button.value}
                $filled={gradeLevel === button.value}
                cursor
              >
                <span>{button.label}</span>
              </Button>
            ))}
          </>
        ) : (
          <>
            {buttonGradeOption.map((button) => (
              <Button
                key={button.value}
                buttonType="button"
                onClick={() => {
                  selectGradeLevel(button.value);
                }}
                $padding="10px"
                height={'34px'}
                width={'100%'}
                fontSize="14px"
                $normal={gradeLevel !== button.value}
                $filled={gradeLevel === button.value}
                cursor
              >
                <span>{button.label}</span>
              </Button>
            ))}
          </>
        )}
      </>
    );
  };

  //기출
  const [isSelectPreviousExamContent, setIsSelectPreviousExamContent] =
    useState<boolean>(false);

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
                    length={4}
                    menu={menuList}
                    width={'450px'}
                    lineStyle
                    selected={tabVeiw}
                    setTabVeiw={setTabVeiw}
                    onClickTab={changeTab}
                  />
                </TabWrapper>
                <CategoryWrapper>{renderCategoryFields()}</CategoryWrapper>
              </CategorySection>
              <SelectSection
                tabVeiw={tabVeiw}
                questionNum={questionNum}
                setQuestionNum={setQuestionNum}
                inputValue={inputValue}
                setInputValue={setInputValue}
                questionLevel={questionLevel}
                setQuestionLevel={setQuestionLevel}
                questionType={questionType}
                setQuestionType={setQuestionType}
                containMock={containMock}
                setContainMock={setContainMock}
                equalScore={equalScore}
                setEqualScore={setEqualScore}
                isQuizEven={isQuizEven}
                setIsQuizEven={setIsQuizEven}
                isPriority={isPriority}
                setIsPriority={setIsPriority}
                includeQuizList={includeQuizList}
                categoryCount={selectedItemTreeCount.length}
                receivedQuizCount={receivedQuizCount}
                setReceivedQuizCount={setReceivedQuizCount}
              ></SelectSection>
            </>
          )}
          {tabVeiw === '시중교재' && (
            <>
              {isSelectTextbook && (
                <>
                  <CategorySection>
                    <TabWrapper>
                      <TabMenu
                        length={4}
                        menu={menuList}
                        width={'450px'}
                        lineStyle
                        selected={tabVeiw}
                        setTabVeiw={setTabVeiw}
                      />
                    </TabWrapper>
                    <SchoolGradeWrapper>
                      <SelectorGroup>{renderGradeButtons()}</SelectorGroup>
                    </SchoolGradeWrapper>
                    <SearchWrapper>
                      <Search
                        value={searchTextbookValue}
                        width={'50%'}
                        height="40px"
                        onKeyDown={(e) => {}}
                        onChange={(e) => searchTextbook(e.target.value)}
                        placeholder="교재명 검색"
                        maxLength={20}
                      />
                    </SearchWrapper>
                    <ListWrapper>
                      <ListTitleWrapper>
                        <ListTitle className="schoolGrade">학교급</ListTitle>
                        <ListTitle className="title">교재명</ListTitle>
                        <ListTitle className="series">시리즈</ListTitle>
                        <ListTitle className="publisher">출판사</ListTitle>
                      </ListTitleWrapper>
                      {textbookList && textbookList?.length > 0 ? (
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
                        <ValueNone
                          textOnly
                          info="선택하신 조건의 교재가 없습니다"
                        />
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
                  <SelectSection
                    tabVeiw={tabVeiw}
                    questionNum={questionNum}
                    setQuestionNum={setQuestionNum}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    questionLevel={questionLevel}
                    setQuestionLevel={setQuestionLevel}
                    questionType={questionType}
                    setQuestionType={setQuestionType}
                    containMock={containMock}
                    setContainMock={setContainMock}
                    equalScore={equalScore}
                    setEqualScore={setEqualScore}
                    isQuizEven={isQuizEven}
                    setIsQuizEven={setIsQuizEven}
                    isPriority={isPriority}
                    setIsPriority={setIsPriority}
                    includeQuizList={includeQuizList}
                    categoryCount={selectedItemTreeCount.length}
                    receivedQuizCount={receivedQuizCount}
                    setReceivedQuizCount={setReceivedQuizCount}
                    isSelectTextbookContent={isSelectTextbookContent}
                  ></SelectSection>
                </>
              )}
              {isSelectTextbookContent && (
                <>
                  <CategorySection>
                    <TabWrapper onClick={selectOtherTextbook}>
                      <TabMenu
                        length={4}
                        menu={menuList}
                        width={'450px'}
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
                    {!postStep1Pending ? (
                      <TextbookWrapper>
                        {selectedTextbook &&
                          selectedTextbook?.length > 0 &&
                          selectedTextbook?.map((item, idx) => (
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
                                {processTextbookData &&
                                  processTextbookData?.length > 0 &&
                                  processTextbookData?.map((item, i) => (
                                    <LeftWrapper key={i}>
                                      {item.pageList.map((page, j) => (
                                        <TextBookCheckBoxWrapper
                                          key={j}
                                          onClick={() => {
                                            handlePageClick(page.bookPage);
                                            choiceType(j);
                                          }}
                                          $isChoice={clickedIdx === j}
                                        >
                                          <CheckBox
                                            key={`checkbox-${j}`}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              checkAllToggle(
                                                item.subChapter,
                                                page.isChecked,
                                                page.quizList.map(
                                                  (quiz) => quiz.seq,
                                                ),
                                                page.quizList[0]?.code || '',
                                              );
                                            }}
                                            isChecked={page.isChecked}
                                            width="15"
                                            height="15"
                                            $margin="0 0 5px 0"
                                          />
                                          <Label
                                            key={`label-${j}`}
                                            value={`${page.bookPage}P`}
                                            width="100px"
                                          />
                                        </TextBookCheckBoxWrapper>
                                      ))}
                                    </LeftWrapper>
                                  ))}

                                {clickedPageIdx !== null && (
                                  <RightWrapper key={clickedPageIdx}>
                                    {processTextbookData.map((item) => {
                                      const page = item.pageList.find(
                                        (page) =>
                                          page.bookPage === clickedPageIdx,
                                      );

                                      if (page) {
                                        return (
                                          <BookListWrapper
                                            key={`page-${clickedPageIdx}`}
                                          >
                                            {page.quizList.map((quiz, m) => (
                                              <CheckBoxWrapper
                                                key={`quiz-${m}`}
                                              >
                                                <CheckBox
                                                  onClick={() =>
                                                    checkPartialToggle(
                                                      item.subChapter,
                                                      quiz.seq,
                                                      quiz.isChecked || false,
                                                      quiz.code,
                                                    )
                                                  }
                                                  isChecked={
                                                    quiz.isChecked || false
                                                  }
                                                  width="15"
                                                  height="15"
                                                  $margin="0 0 5px 0"
                                                />
                                                <Label
                                                  key={`label-${m}`}
                                                  value={`${quiz.bookQuizNumber}번`}
                                                  width="40px"
                                                />
                                              </CheckBoxWrapper>
                                            ))}
                                          </BookListWrapper>
                                        );
                                      }

                                      return null;
                                    })}
                                  </RightWrapper>
                                )}
                              </SelectWrapper>
                            </TextbookTypeWrapper>
                          ))}
                      </TextbookWrapper>
                    ) : (
                      <>
                        <Loader width="50px" />
                      </>
                    )}
                  </CategorySection>
                  <SelectSection
                    tabVeiw={tabVeiw}
                    questionNum={questionNum}
                    setQuestionNum={setQuestionNum}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    questionLevel={questionLevel}
                    setQuestionLevel={setQuestionLevel}
                    questionType={questionType}
                    setQuestionType={setQuestionType}
                    containMock={containMock}
                    setContainMock={setContainMock}
                    equalScore={equalScore}
                    setEqualScore={setEqualScore}
                    isQuizEven={isQuizEven}
                    setIsQuizEven={setIsQuizEven}
                    isPriority={isPriority}
                    setIsPriority={setIsPriority}
                    includeQuizList={includeQuizList}
                    categoryCount={selectedItemTreeCount.length}
                    receivedQuizCount={receivedQuizCount}
                    setReceivedQuizCount={setReceivedQuizCount}
                    isSelectTextbookContent={isSelectTextbookContent}
                  ></SelectSection>
                </>
              )}
            </>
          )}
          {tabVeiw === '수능/모의고사' && (
            <>
              <MockExamTab
                menuList={menuList}
                tabVeiw={tabVeiw}
                setTabVeiw={setTabVeiw}
                equalScore={equalScore}
                setEqualScore={setEqualScore}
                includeQuizList={includeQuizList}
                setIncludeQuizList={setIncludeQuizList}
                toggleQuizCode={toggleQuizCode}
                receivedQuizCount={receivedQuizCount}
              ></MockExamTab>
            </>
          )}
          {tabVeiw === '기출' && (
            <>
              <PreviousTab
                menuList={menuList}
                tabVeiw={tabVeiw}
                setTabVeiw={setTabVeiw}
                isSelectPreviousExamContent={isSelectPreviousExamContent}
                setIsSelectPreviousExamContent={setIsSelectPreviousExamContent}
                setQuestionNum={setQuestionNum}
                setInputValue={setInputValue}
                setQuestionLevel={setQuestionLevel}
                setQuestionType={setQuestionType}
                setContainMock={setContainMock}
                setEqualScore={setEqualScore}
                setIsQuizEven={setIsQuizEven}
                setIsPriority={setIsPriority}
                setIncludeQuizList={setIncludeQuizList}
              ></PreviousTab>
              <SelectSection
                tabVeiw={tabVeiw}
                questionNum={questionNum}
                setQuestionNum={setQuestionNum}
                inputValue={inputValue}
                setInputValue={setInputValue}
                questionLevel={questionLevel}
                setQuestionLevel={setQuestionLevel}
                questionType={questionType}
                setQuestionType={setQuestionType}
                containMock={containMock}
                setContainMock={setContainMock}
                equalScore={equalScore}
                setEqualScore={setEqualScore}
                isQuizEven={isQuizEven}
                setIsQuizEven={setIsQuizEven}
                isPriority={isPriority}
                setIsPriority={setIsPriority}
                includeQuizList={includeQuizList}
                categoryCount={selectedItemTreeCount.length}
                receivedQuizCount={receivedQuizCount}
                setReceivedQuizCount={setReceivedQuizCount}
                isSelectPreviousExamContent={isSelectPreviousExamContent} //수정필요
              ></SelectSection>
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
      <Alert
        top="calc(50% - 100px)"
        isAlertOpen={isAlertOpen}
        description={`가지고 올 수 있는 문항의 수가 ${receivedQuizCount}개 입니다.`}
        subDescription={
          equalScore === 2
            ? '이대로 진행할 경우 균등 배점을 다시 설정해야합니다.'
            : '이대로 진행하시겠습니까?'
        }
        action="진행"
        isWarning={true}
        onClick={keepGoingAlert}
        onClose={cancelAlert}
      />
      {isEqualScoreModal && (
        <Overlay>
          <EqualScoreModalContainer>
            <EqualScoreModalWrapper>
              <EqualScoreModalTitleWrapper>
                <Label
                  value={`총 ${receivedQuizCount ? receivedQuizCount : tabVeiw === '시중교재' || tabVeiw === '기출' ? Number(questionNum) * Number(includeQuizList.length) || Number(inputValue) * Number(includeQuizList.length) : questionNum || inputValue || includeQuizList.length} 문항`}
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
                      setEqualTotlaValue('');
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
                      {receivedQuizCount
                        ? receivedQuizCount
                        : questionNum || inputValue || includeQuizList.length}
                      번 문항까지
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
                      {nextRemainderContent}번 문항부터
                      {receivedQuizCount
                        ? receivedQuizCount
                        : questionNum || inputValue || includeQuizList.length}
                      번 문항까지 {quotient + 1 || 0}점
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
const CategorySection = styled.div`
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
const ArrowButtonWrapper = styled.span`
  padding: 0 10px;
  > button {
    cursor: pointer;
    padding: 4px;
    background-color: transparent;
    border: none;
  }
`;
const AccordionItemWrapper = styled.div`
  overflow-y: auto;
  max-height: 200px;
`;
const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const ValueNoneWrapper = styled.div`
  display: flex;
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
  height: 550px;
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
  height: 550px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px 10px;
  background-color: ${({ $isChoice }) =>
    $isChoice ? COLOR.SELECT_BLUE : 'white'};
  overflow-y: auto;
`;
const TextBookCheckBoxWrapper = styled.div<{
  $isChoice?: boolean;
}>`
  display: flex;
  align-items: center;
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
const BookListWrapper = styled.div`
  width: 794px;
  height: 550px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  overflow-y: auto;
`;
const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;
const MockExamSummaryWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;
const MockExamSummary = styled.div`
  width: 100%;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CastListWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
