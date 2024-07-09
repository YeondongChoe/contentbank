import * as React from 'react';
import { useState, useEffect, useRef, useMemo } from 'react';

import { useIsMutating, useMutation, useQuery } from '@tanstack/react-query';
import { IoMdClose, IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
  Alert,
  ButtonFormatMultiRadio,
} from '../..';
import { classificationInstance, quizService } from '../../../api/axios';
import { pageAtom } from '../../../store/utilAtom';
import {
  MockexamType,
  ItemCategoryType,
  ItemTreeListType,
  CastListType,
  csatListType,
  CastQuizListType,
  ItemTreeType,
} from '../../../types';
import {
  TextbookInfoType,
  TextBookDetailType,
} from '../../../types/TextbookType';
import { DifficultyDataType } from '../../../types/WorkbookType';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { COLOR } from '../../constants';

type ProcessTextbookDataType = {
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

type QuizType = {
  idx: number;
  code: string;
  isChecked: boolean;
};

type HierarchicalDataType = {
  title: string;
  seq: string;
  value: HierarchicalDataType[] | QuizType[] | any;
  isChecked: boolean;
};

type NodeDataType = {
  hierarchicalData: HierarchicalDataType[];
};

type ProcessCsatListDataType = {
  id: string;
  grade: number;
  level: string;
  month: number;
  year: string;
  isChecked: boolean;
  nodeData: NodeDataType;
};

type ProcessCsatQuizListDataType = {
  id: string;
  grade: number;
  level: string;
  month: number;
  year: string;
  isChecked: boolean;
  quizNumberList: {
    idx: number;
    code: string;
    quizNumber: string;
    isChecked: boolean;
  }[];
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
      // console.log('error--------------', error.response.data.code);

      if (error.response?.data?.code == 'GE-002')
        postRefreshToken().then(() => {
          groupsDataRefetch();
        });
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
    const itemIdx = categoryItems[1].idx; //다음으로 선택할 배열의 idx
    const pidx = radio1depthCheck.checkValue; // 선택된 체크 박스의 idx
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
    const itemIdx = categoryItems[2].idx; //다음으로 선택할 배열의 idx
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
    const itemIdx = categoryItems[3].idx; //다음으로 선택할 배열의 idx
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

  useEffect(() => {
    if (radio1depthCheck?.code !== '') nextListData1Refetch();
    if (radio2depthCheck?.code !== '') nextListData2Refetch();
    if (radio3depthCheck?.code !== '') nextListData3Refetch();
  }, [radio1depthCheck, radio2depthCheck, radio3depthCheck]);

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
    setSelectedCategoryEtc1([]);
    setSelectedCategoryEtc2([]);
    setRadioEtc1Check([]);
    setRadioEtc2Check([]);
    setCheckedDepthList([]);
    setSearchValue('');
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
        classificationInstance.get(`/v1/category/${id}`),
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
    setRadioEtc1Check([]);
    setRadioEtc2Check([]);

    setSelected1depth('');
    setSelected2depth('');
    setSelected3depth('');
    setSelected4depth('');
    setSelectedCategoryEtc1([]);
    setSelectedCategoryEtc2([]);
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

      const classificationEtc1 = selectedClassification[5] as RadioStateType[];
      // 저장되었던 행동 요소1
      setSelectedCategoryEtc1(
        classificationEtc1.map((el) => el.checkValue?.toString()),
      );
      setRadioEtc1Check(classificationEtc1);

      const classificationEtc2 = selectedClassification[6] as RadioStateType[];
      // 저장되었던 행동 요소2
      setSelectedCategoryEtc2(
        classificationEtc2.map((el) => el.checkValue?.toString()),
      );
      setRadioEtc2Check(classificationEtc2);

      //초기화
      setIsModifying(false);
    }
  }, [isModifying, selected4depth]);

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

  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    console.log('itemTree ------ ', itemTree);
  }, [itemTree, searchValue]);

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

  //단원.유형별
  const [inputValue, setInputValue] = useState<string>('');

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // 정규표현식을 사용하여 숫자 이외의 문자 제거
    inputValue = inputValue.replace(/[^0-9]/g, '');

    const parsedValue = parseInt(inputValue, 10);
    if (tabVeiw === '시중교재') {
      if (!isNaN(parsedValue) && parsedValue > 0) {
        setInputValue(
          parsedValue < 1 ? '1' : parsedValue >= 5 ? '5' : inputValue,
        );
      }
    } else {
      if (!isNaN(parsedValue) && parsedValue > 0) {
        setInputValue(
          parsedValue < 1 ? '1' : parsedValue >= 100 ? '100' : inputValue,
        );
      }
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
  //난이도
  const [isDifficulty, setIsDifficulty] = useState(false);
  const [difficultyData, setDifficultyData] = useState<DifficultyDataType[]>(
    [],
  );

  const openDifficultySetting = () => {
    setIsDifficulty(true);
  };
  const closeDifficultySetting = () => {
    setIsDifficulty(false);
  };

  const getDifficulty = async () => {
    const res = await quizService.get(`/v1/difficulty`);
    return res;
  };
  const { data: difficultyRate } = useQuery({
    queryKey: ['get-difficultyDetail'],
    queryFn: getDifficulty,
    meta: {
      errorMessage: 'get-difficultyDetail 에러 메세지',
    },
    //enabled: !!selectedTextbookIdx,
  });

  useEffect(() => {
    setDifficultyData(difficultyRate?.data.data.difficultyList);
  }, [difficultyRate]);

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

  const openEqualScoreSettingModal = () => {
    if (questionNum || inputValue || includeQuizList.length > 0) {
      setIsEqualScoreModal(true);
      setIsSaveEqualValue(false);
      //setEqualTotlaValue('0');
    } else {
      openToastifyAlert({
        type: 'error',
        text: '문항을 먼저 선택해주세요',
      });
      selectEqualScore(null);
      setIsSaveEqualValue(false);
    }
  };
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
    const questionNumValue = parseInt(
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
      setEqualTotlaValue(
        questionNum ||
          inputValue ||
          (includeQuizList.length as unknown as string),
      );
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
        // console.log('remainderContent', remainderContent);
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

  //시중교재 검색값
  const [searchTextbookValue, setSearchTextbookValue] = useState<string>('');

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
  const selectedTextbook: ProcessTextbookDataType[] =
    textbookDetailData?.data.data.textbookList;
  //다른 교재 선택
  const selectOtherTextbook = () => {
    setQuestionNum('');
    setIsSelectTextbook(true);
    setIsSelectTextbookContent(false);
    setClickedIdx(0);
    setIsChoice(false);
    setProcessTextbookData([]);
    setSelectedTextbookIdx(null);
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
  const textbookList: TextbookInfoType[] = textbookData?.data.data.textbookList;

  //조건값이 바뀔때 재검색
  useEffect(() => {
    if (tabVeiw === '시중교재') {
      textbookDataRefetch();
    }
  }, [page, schoolLevel, gradeLevel, searchTextbookValue, tabVeiw]);

  const [isChoice, setIsChoice] = useState(false);
  const [clickedIdx, setClickedIdx] = useState<number | null>(null);
  const [processTextbookData, setProcessTextbookData] = useState<
    ProcessTextbookDataType[]
  >([]);

  // 시중교재 값을 받아왔을 때 원하는 모양의 데이타로 가공
  useEffect(() => {
    if (selectedTextbook?.length > 0) {
      const initialData = selectedTextbook?.map((textbook) => ({
        bookPage: textbook.bookPage || '',
        subChapter: textbook.subChapter || '',
        isChecked: false,
        quizList: textbook.quizList.map((quiz) => ({
          ...quiz,
          isChecked: false,
          seq: `${quiz.code}${quiz.bookQuizNumber}`,
        })),
      }));
      setProcessTextbookData(initialData);
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
    toggleQuizCode(quizCode, isChecked);
  };
  // 수능/모의고사
  // 수능/모의고사 드롭다운 카테고리 get api
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
  //선택 초기화
  const selectExamReset = () => {
    setExamGrade([]);
    setExamYear([]);
    setExamMonthly([]);
    setIncludeQuizList([]);
    setExamOption(null);
    setProcessCastQuizListData([]);
    setProcessCastListData([]);
  };

  // 수능 모의고사 문항 get api 선택 완료
  const selectExam = () => {
    setIsDropdown(false);
    setIncludeQuizList([]);
    castDataRefetch();
  };
  const getcsat = async () => {
    const grades = examGrade.join(',');
    const years = examYear.join(',');
    const months = examMonthly.join(',');
    const res = await quizService.get(
      `/v1/csat?option=${examOption}&level=고등&subject=수학&grades=${grades}&years=${years}&months=${months}`,
    );
    return res;
  };

  const { data: castData, refetch: castDataRefetch } = useQuery({
    queryKey: ['get-cast'],
    queryFn: getcsat,
    meta: {
      errorMessage: 'get-cast 에러 메세지',
    },
    enabled: false,
  });

  //문항 번호로 추가
  const castQuizListData: CastQuizListType[] = castData?.data.data.quizList;
  //문항 번호로 추가 데이터 가공
  const [processCastQuizListData, setProcessCastQuizListData] = useState<
    ProcessCsatQuizListDataType[]
  >([]);

  // 문항 번호 전체 선택
  const toggleCheckAllCastQuiz = (
    id: string,
    quizCode: string[],
    isChecked: boolean,
  ) => {
    setProcessCastQuizListData((prevList) => {
      return prevList.map((item) => {
        if (item.id === id) {
          const isChecked = !item.isChecked;
          return {
            ...item,
            isChecked,
            quizNumberList: item.quizNumberList.map((quiz) => ({
              ...quiz,
              isChecked,
            })),
          };
        }
        return item;
      });
    });
    toggleQuizCode(quizCode, isChecked);
  };
  // 문항 번호 부분 선택
  const toggleCheckPartialCastQuiz = (
    parentId: string,
    quizNumber: string,
    quizCode: string,
    isChecked: boolean,
  ) => {
    setProcessCastQuizListData((prevList) => {
      return prevList.map((item) => {
        if (item.id === parentId) {
          const updatedQuizNumberList = item.quizNumberList.map((quiz) => {
            if (quiz.quizNumber === quizNumber) {
              return {
                ...quiz,
                isChecked: !quiz.isChecked,
              };
            }
            return quiz;
          });
          const isChecked = updatedQuizNumberList.every(
            (quiz) => quiz.isChecked,
          );
          return {
            ...item,
            isChecked,
            quizNumberList: updatedQuizNumberList,
          };
        }
        return item;
      });
    });
    toggleQuizCode(quizCode, isChecked);
  };

  // 수능/모의고사 문항 번호 값을 받아왔을 때 원하는 모양의 데이타로 가공
  useEffect(() => {
    if (castQuizListData?.length > 0) {
      const initialData = castQuizListData.map((mock) => ({
        id: `${mock.grade}-${mock.level}-${mock.month}-${mock.year}`,
        ...mock,
        isChecked: false,
        quizNumberList: mock.quizNumberList.map((quiz) => ({
          ...quiz,
          isChecked: false,
        })),
      }));
      setProcessCastQuizListData(initialData);
    }
  }, [castQuizListData, castDataRefetch]);

  //단원으로 추가
  const castListData: csatListType[] = castData?.data.data.csatList;
  //단원으로 추가 데이터 가공
  const [processCastListData, setProcessCastListData] = useState<
    ProcessCsatListDataType[]
  >([]);

  // 단원으로 추가 재귀형태 함수
  const renderHierarchicalData = (
    data: HierarchicalDataType[],
    depth: number = 0,
  ) => {
    return data.map((item, index) => (
      <CastListWrapper key={index} style={{ paddingLeft: `${depth * 15}px` }}>
        {item.title &&
          item.title !== 'root' && ( // key 값이 존재하고 "root"가 아닌 경우에만 렌더링
            <CheckBoxWrapper>
              <CheckBox
                isChecked={item.isChecked}
                width="15"
                height="15"
                onClick={() =>
                  toggleCheckPartialCastList(
                    item.seq,
                    extractCodesFromHierarchicalData(item.value),
                    item.isChecked,
                    depth,
                  )
                }
              />
              <Label value={item.title} width="100px" />
            </CheckBoxWrapper>
          )}
        {/* key 값이 존재하고 "root"가 아닌 경우에만 하위 요소 렌더링 */}
        {Array.isArray(item.value) &&
          renderHierarchicalData(
            item.value as HierarchicalDataType[],
            depth + 1,
          )}
      </CastListWrapper>
    ));
  };
  // 재귀함수 사용해서 isChecked값 부여
  const addIsCheckedToHierarchicalData = (
    data: any,
    seq: string,
  ): HierarchicalDataType[] => {
    if (Array.isArray(data)) {
      // 배열인 경우
      return [
        {
          title: 'root',
          seq: seq + 'root',
          value: data.map((item: any) => ({
            ...item,
            isChecked: false,
          })),
          isChecked: false,
        },
      ];
    } else {
      // 객체인 경우, 재귀적으로 호출하여 처리
      const hierarchicalData: HierarchicalDataType[] = [];
      for (const title in data) {
        if (Object.prototype.hasOwnProperty.call(data, title)) {
          const value = data[title];
          hierarchicalData.push({
            title: title,
            seq: seq + title,
            value: addIsCheckedToHierarchicalData(value, seq), // 재귀 호출로 하위 항목 처리
            isChecked: false,
          });
        }
      }
      return hierarchicalData;
    }
  };

  // 수능/모의고사 단원 값을 받아왔을 때 원하는 모양의 데이타로 가공
  useEffect(() => {
    if (castListData?.length > 0) {
      const initialData = castListData.map((mock) => ({
        id: `${mock.grade}-${mock.level}-${mock.month}-${mock.year}`,
        grade: mock.grade,
        level: mock.level,
        month: mock.month,
        year: mock.year,
        isChecked: false,
        nodeData: {
          hierarchicalData: addIsCheckedToHierarchicalData(
            mock.nodeData.hierarchicalData,
            `${mock.grade}-${mock.level}-${mock.month}-${mock.year}`,
          ),
        },
      }));
      setProcessCastListData(initialData);
    }
  }, [castListData, castDataRefetch]);

  // HierarchicalDataType 배열에서 QuizType 객체의 code 값들을 추출하는 함수
  const extractCodesFromHierarchicalData = (
    data: HierarchicalDataType[],
  ): string[] => {
    const codes: string[] = [];

    const extractCodes = (value: any) => {
      if (Array.isArray(value)) {
        value.forEach((item) => extractCodes(item));
      } else if (value && typeof value === 'object') {
        if ('code' in value) {
          codes.push(value.code);
        } else {
          Object.values(value).forEach((item) => extractCodes(item));
        }
      }
    };

    data.forEach((item) => {
      extractCodes(item.value);
    });

    return codes;
  };

  // 단원 전체 선택
  const toggleCheckAllCastList = (
    id: string,
    codes: string[],
    isChecked: boolean,
  ) => {
    setProcessCastListData((prevData) =>
      prevData.map((mock) => {
        if (mock.id === id) {
          const updatedHierarchicalData = updateCheckStatus(
            mock.nodeData.hierarchicalData,
            isChecked,
          );
          return {
            ...mock,
            isChecked: !isChecked,
            nodeData: {
              ...mock.nodeData,
              hierarchicalData: updatedHierarchicalData,
            },
          };
        }
        return mock;
      }),
    );
    toggleQuizCode(codes, isChecked);
  };

  // 단원 전체 선택 isChecked 값 갱신
  const updateCheckStatus = (
    data: HierarchicalDataType[],
    isChecked: boolean,
  ): HierarchicalDataType[] => {
    return data.map((item) => {
      if (Array.isArray(item.value)) {
        return {
          ...item,
          isChecked: !isChecked,
          value: updateCheckStatus(
            item.value as HierarchicalDataType[],
            isChecked,
          ),
        };
      } else {
        return {
          ...item,
          isChecked: !isChecked,
        };
      }
    });
  };

  // 단원 부분 선택
  const toggleCheckPartialCastList = (
    seq: string,
    codes: string[],
    isChecked: boolean,
    depth: number,
  ) => {
    setProcessCastListData((prevData) =>
      prevData.map((mock) => {
        const updatedHierarchicalData = updateCheckStatusByKey(
          mock.nodeData.hierarchicalData,
          seq,
          isChecked,
          depth,
        );
        return {
          ...mock,
          nodeData: {
            ...mock.nodeData,
            hierarchicalData: updatedHierarchicalData,
          },
        };
      }),
    );
    toggleQuizCode(codes, isChecked);
  };

  // 부분 클릭 isChecked 값 갱신
  const updateCheckStatusByKey = (
    data: HierarchicalDataType[],
    seq: string,
    isChecked: boolean,
    depth: number,
  ): HierarchicalDataType[] => {
    const traverseToDepth = (
      items: HierarchicalDataType[],
      currentDepth: number,
    ): HierarchicalDataType[] => {
      return items.map((item) => {
        if (currentDepth === depth) {
          if (item.seq === seq) {
            return { ...item, isChecked: !isChecked };
          }
        } else if (Array.isArray(item.value)) {
          return {
            ...item,
            value: traverseToDepth(
              item.value as HierarchicalDataType[],
              currentDepth + 1,
            ),
          };
        }
        return item;
      });
    };

    return traverseToDepth(data, 0);
  };

  // 항목 삭제
  const removeMockexam = (id: string, title: string) => {
    if (title === '문항') {
      setProcessCastQuizListData((prevData) =>
        prevData.filter((mock) => mock.id !== id),
      );
    }
    if (title === '단원') {
      setProcessCastListData((prevData) =>
        prevData.filter((mock) => mock.id !== id),
      );
    }
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
    setQuestionLevel('');
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

  const { mutate: postStep1Data } = useMutation({
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
        if (
          (receivedQuizCount && receivedQuizCount === Number(questionNum)) ||
          receivedQuizCount === Number(inputValue)
        ) {
          navigate('/content-create/exam/step2');
        } else {
          setIsAlertOpen(true);
        }
      } else if (tabVeiw === '시중교재') {
        if (
          (receivedQuizCount && receivedQuizCount === Number(questionNum)) ||
          Number(inputValue)
        ) {
          saveLocalData(response.data.data);
          navigate('/content-create/exam/step2');
        } else {
          openToastifyAlert({
            type: 'error',
            text: `가지고 올 수 있는 문항의 수는 ${response.data.data.quizList.length} 입니다.`,
          });
          //문항수 초기화
          setQuestionNum('');
          //배점 초기화
          selectEqualScore(null);
        }
      } else if (tabVeiw === '수능/모의고사') {
        saveLocalData(response.data.data);
        navigate('/content-create/exam/step2');
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
        };

        // ItemTreeIdxListType인지 확인 후 checkedDepthList에 접근
        const itemTreeIdxList =
          (item[4] as ItemTreeIdxListType).itemTreeIdxList || [];
        //console.log(itemTreeIdxList);

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
        tabVeiw !== '수능/모의고사'
          ? Number(questionNum) || Number(inputValue)
          : Number(includeQuizList.length),
      //수능/모의고사 경우 어떻게 보내야할지 나중에 수정해야함
      difficulty: questionLevel === '선택안함' ? null : questionLevel || '',
      type: questionType,
      mock: containMock,
      score: equalScore,
      isScoreEven: true,
      isQuizEven: isQuizEven,
      isMePriority: isPriority,
      filterList: null,
      includeList: tabVeiw === '단원·유형별' ? null : includeQuizList,
    };

    postStep1Data(data);
  };

  const [sendLocalData, setSendLocalData] = useState<any | null>(null);

  // 로컬 스토리지에서 데이터 가져오기
  useEffect(() => {
    const data = localStorage.getItem('sendData');
    if (data) {
      const parsedData = JSON.parse(data);
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
      if (
        inputValue !== '' ||
        (questionNum !== null &&
          questionNum !== '' &&
          unitClassificationList.length > 0 &&
          questionLevel !== null &&
          questionType !== null &&
          containMock !== null &&
          equalScore !== null)
      ) {
        clickNextButton();
      } else {
        openToastifyAlert({
          type: 'error',
          text: '필수항목을 선택해주세요',
        });
      }
    else if (tabVeiw === '시중교재') {
      if (
        inputValue !== '' ||
        (questionNum !== null &&
          questionNum !== '' &&
          includeQuizList.length > 0 &&
          questionLevel !== null &&
          questionType !== null &&
          containMock !== null &&
          equalScore !== null)
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
    }
  };

  //단원분류 입력 도중 해당 화면을 벗어나는 경우, '저장하지 않고 나가시겠습니까?' 얼럿
  useEffect(() => {
    if (
      tabVeiw === '단원·유형별' ||
      tabVeiw === '시중교재' ||
      tabVeiw === '수능/모의고사'
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
    //단원 유형별버튼 초기화
    setQuestionNum('');
    setQuestionLevel('');
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
    //모의시험 버튼 초기화
    setProcessCastQuizListData([]);
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
                  <PerfectScrollbar id="scrollTopWrapper">
                    <UnitClassifications>
                      {unitClassificationList.length > 0 ? (
                        <>
                          <p className="info">
                            교과정보는 최대 5개 까지 저장 가능합니다
                          </p>
                          {unitClassificationList.map((el, idx) => (
                            <IconButtonWrapper key={`${el} ${idx} `}>
                              <IconButton
                                width={`calc(100% - 25px)`}
                                fontSize="14px"
                                height="35px"
                                textAlign="left"
                                $padding="0 50px 0 10px"
                                onClick={() => changeUnitClassification(idx)}
                                // rightIconSrc={
                                //   <IconWrapper>
                                //     <button
                                //       type="button"
                                //       className="icon_button primery"
                                //     >
                                //       수정
                                //     </button>
                                //   </IconWrapper>
                                // }
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
                          [categoryItems[1]].map((item) => (
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
                          [categoryItems[2]].map((item) => (
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
                          [categoryItems[3]].map((item) => (
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
                            <PerfectScrollbar>
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
                                </AccordionItemWrapper>
                              ) : (
                                <Loader />
                              )}
                            </PerfectScrollbar>
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
                        onClick={() => saveCheckItems()}
                      >
                        교과정보 추가
                      </Button>
                    </SubmitButtonWrapper>
                  </PerfectScrollbar>
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
                      onClick={() => selectQuestionNum(null)}
                      style={{
                        color:
                          questionNum === null ? 'white' : `${COLOR.PRIMARY}`,
                        backgroundColor:
                          questionNum === null ? `${COLOR.PRIMARY}` : 'white',
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
                  <AdditionOption onClick={openDifficultySetting}>
                    <IoSettingsOutline />
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
                    onClick={() => {
                      selectEqualScore(2);
                      openEqualScoreSettingModal();
                    }}
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
                  학습지 문항수 {inputValue || questionNum} 개 | 유형
                  {selectedItemTreeCount.length}개
                </Summary>
              </SchoolSelectorSection>
            </>
          )}
          {tabVeiw === '시중교재' && (
            <>
              {isSelectTextbook && (
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
                        value={searchTextbookValue}
                        width={'50%'}
                        height="40px"
                        onKeyDown={(e) => {}}
                        onChange={(e) => setSearchTextbookValue(e.target.value)}
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
                      {textbookList?.length > 0 ? (
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
                        value="한 문제당 최대 유사문항수"
                        fontSize="12px"
                        width="440px"
                      />
                    </SubTitleWrapper>
                    <SelectorGroup>
                      <SelectorWrapper>
                        <Button
                          buttonType="button"
                          onClick={() => {
                            selectQuestionNum('1');
                          }}
                          $padding="10px"
                          height={'34px'}
                          width={'100px'}
                          fontSize="14px"
                          $normal={questionNum !== '1'}
                          $filled={questionNum === '1'}
                          cursor
                        >
                          <span>1</span>
                        </Button>
                        <Button
                          buttonType="button"
                          onClick={() => {
                            selectQuestionNum('3');
                          }}
                          $padding="10px"
                          height={'34px'}
                          width={'100px'}
                          fontSize="14px"
                          $normal={questionNum !== '3'}
                          $filled={questionNum === '3'}
                          cursor
                        >
                          <span>3</span>
                        </Button>
                        <Button
                          buttonType="button"
                          onClick={() => {
                            selectQuestionNum('5');
                          }}
                          $padding="10px"
                          height={'34px'}
                          width={'100px'}
                          fontSize="14px"
                          $normal={questionNum !== '5'}
                          $filled={questionNum === '5'}
                          cursor
                        >
                          <span>5</span>
                        </Button>
                        <DivideBar>|</DivideBar>
                        <NumberInput
                          value={inputValue}
                          maxLength={3}
                          onClick={() => selectQuestionNum(null)}
                          style={{
                            color:
                              questionNum === null
                                ? 'white'
                                : `${COLOR.PRIMARY}`,
                            backgroundColor:
                              questionNum === null
                                ? `${COLOR.PRIMARY}`
                                : 'white',
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
                      <AdditionOption onClick={openDifficultySetting}>
                        <IoSettingsOutline />
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
                        onClick={() => {
                          selectEqualScore(2);
                          openEqualScoreSettingModal();
                        }}
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
                            {processTextbookData.map((item, i) => (
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
                                          quiz.code,
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

                            {isChoice &&
                              processTextbookData.map((item, k) => (
                                <RightWrapper key={k}>
                                  {item.quizList.map((quiz, l) => (
                                    <CheckBoxWrapper key={l}>
                                      <CheckBox
                                        onClick={() =>
                                          checkPartialToggle(
                                            item.subChapter,
                                            quiz.seq,
                                            quiz.isChecked || false,
                                            quiz.code,
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
                        value="한 문제당 최대 유사문항수"
                        fontSize="12px"
                        width="440px"
                      />
                    </SubTitleWrapper>
                    <SelectorGroup>
                      <SelectorWrapper>
                        <Button
                          buttonType="button"
                          onClick={() => {
                            selectQuestionNum('1');
                          }}
                          $padding="10px"
                          height={'34px'}
                          width={'100px'}
                          fontSize="14px"
                          $normal={questionNum !== '1'}
                          $filled={questionNum === '1'}
                          cursor
                        >
                          <span>1</span>
                        </Button>
                        <Button
                          buttonType="button"
                          onClick={() => {
                            selectQuestionNum('3');
                          }}
                          $padding="10px"
                          height={'34px'}
                          width={'100px'}
                          fontSize="14px"
                          $normal={questionNum !== '3'}
                          $filled={questionNum === '3'}
                          cursor
                        >
                          <span>3</span>
                        </Button>
                        <Button
                          buttonType="button"
                          onClick={() => {
                            selectQuestionNum('5');
                          }}
                          $padding="10px"
                          height={'34px'}
                          width={'100px'}
                          fontSize="14px"
                          $normal={questionNum !== '5'}
                          $filled={questionNum === '5'}
                          cursor
                        >
                          <span>5</span>
                        </Button>
                        <DivideBar>|</DivideBar>
                        <NumberInput
                          value={inputValue}
                          maxLength={3}
                          onClick={() => selectQuestionNum(null)}
                          style={{
                            color:
                              questionNum === null
                                ? 'white'
                                : `${COLOR.PRIMARY}`,
                            backgroundColor:
                              questionNum === null
                                ? `${COLOR.PRIMARY}`
                                : 'white',
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
                      <AdditionOption onClick={openDifficultySetting}>
                        <IoSettingsOutline />
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
                        onClick={() => {
                          selectEqualScore(2);
                          openEqualScoreSettingModal();
                        }}
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
                        <MockExamSummary>
                          학습지 문항수 {includeQuizList.length}개
                        </MockExamSummary>
                        <Button
                          buttonType="button"
                          onClick={() => {
                            selectEqualScore(2);
                            openEqualScoreSettingModal();
                          }}
                          $padding="10px"
                          height={'35px'}
                          width={'160px'}
                          fontSize="13px"
                          $normal={equalScore !== 2}
                          $filled={equalScore === 2}
                          cursor
                        >
                          <span>균등 배점</span>
                        </Button>
                        <Button
                          buttonType="button"
                          onClick={() => {
                            selectEqualScore(1);
                          }}
                          $padding="10px"
                          height={'35px'}
                          width={'160px'}
                          fontSize="13px"
                          $normal={equalScore !== 1}
                          $filled={equalScore === 1}
                          cursor
                        >
                          <span>배점 선택안함</span>
                        </Button>
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
                          <Label value="학년 선택" fontSize="14px" center />
                          <Label
                            value="복수 선택 가능"
                            fontSize="12px"
                            center
                          />
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
                          <Label value="년도 선택" fontSize="14px" center />
                          <Label
                            value="복수 선택 가능"
                            fontSize="12px"
                            center
                          />
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
                          <Label value="월 선택" fontSize="14px" center />
                          <Label
                            value="복수 선택 가능"
                            fontSize="12px"
                            center
                          />
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
                            //width="100px"
                            center
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
                  {examOption === 0 && (
                    <MockExamContentWrapper>
                      {processCastQuizListData?.map((mock) => (
                        <MockExamBox key={mock.id}>
                          <MockExamLabelWrapper>
                            <CheckBoxWrapper>
                              <CheckBox
                                isChecked={mock.isChecked}
                                width="15"
                                height="15"
                                onClick={() =>
                                  toggleCheckAllCastQuiz(
                                    mock.id,
                                    mock.quizNumberList.map(
                                      (item) => item.code,
                                    ),
                                    mock.isChecked,
                                  )
                                }
                              ></CheckBox>
                              <Label
                                value={`${mock.level}${mock.grade} | ${mock.year}년 ${mock.month}월`}
                                width="150px"
                              />
                            </CheckBoxWrapper>
                            <CloseIconWrapper>
                              <IoMdClose
                                style={{ cursor: 'pointer' }}
                                onClick={() => removeMockexam(mock.id, '문항')}
                              />
                            </CloseIconWrapper>
                          </MockExamLabelWrapper>
                          <MockExamContent>
                            {mock.quizNumberList.map((el, i) => (
                              <CheckBoxWrapper key={i}>
                                <CheckBox
                                  isChecked={el.isChecked}
                                  width="15"
                                  height="15"
                                  onClick={() =>
                                    toggleCheckPartialCastQuiz(
                                      mock.id,
                                      el.quizNumber,
                                      el.code,
                                      el.isChecked,
                                    )
                                  }
                                ></CheckBox>
                                <Label
                                  value={`${el.quizNumber}번`}
                                  width="30px"
                                />
                              </CheckBoxWrapper>
                            ))}
                          </MockExamContent>
                        </MockExamBox>
                      ))}
                    </MockExamContentWrapper>
                  )}
                  {examOption === 1 && (
                    <MockExamContentWrapper>
                      {processCastListData?.map((mock) => (
                        <MockExamBox key={mock.id}>
                          <MockExamLabelWrapper>
                            <CheckBoxWrapper>
                              <CheckBox
                                isChecked={mock.isChecked}
                                width="15"
                                height="15"
                                onClick={() =>
                                  toggleCheckAllCastList(
                                    mock.id,
                                    extractCodesFromHierarchicalData(
                                      mock.nodeData.hierarchicalData,
                                    ),
                                    mock.isChecked,
                                  )
                                }
                              ></CheckBox>
                              <Label
                                value={`${mock.level}${mock.grade} | ${mock.year}년 ${mock.month}월`}
                                width="150px"
                              />
                            </CheckBoxWrapper>
                            <CloseIconWrapper>
                              <IoMdClose
                                style={{ cursor: 'pointer' }}
                                onClick={() => removeMockexam(mock.id, '단원')}
                              />
                            </CloseIconWrapper>
                          </MockExamLabelWrapper>
                          <MockExamContent>
                            {renderHierarchicalData(
                              mock.nodeData.hierarchicalData,
                            )}
                          </MockExamContent>
                        </MockExamBox>
                      ))}
                    </MockExamContentWrapper>
                  )}
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
      {isDifficulty && (
        <Overlay>
          <DifficultyRate
            onClose={closeDifficultySetting}
            difficultyData={difficultyData}
            setDifficultyData={setDifficultyData}
          />
        </Overlay>
      )}
      {isEqualScoreModal && (
        <Overlay>
          <EqualScoreModalContainer>
            <EqualScoreModalWrapper>
              <EqualScoreModalTitleWrapper>
                <Label
                  value={`총 ${receivedQuizCount ? receivedQuizCount : questionNum || inputValue || includeQuizList.length} 문항`}
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
  max-height: 250px;
`;
const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const ValueNoneWrapper = styled.div`
  display: flex;
`;
const SchoolSelectorSection = styled.div<{
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
  cursor: pointer;
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
