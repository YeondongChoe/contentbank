import * as React from 'react';
import { useState, useEffect, useRef, useMemo } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import styled from 'styled-components';

import {
  openToastifyAlert,
  Button,
  TabMenu,
  Search,
  ButtonFormatRadio,
  Accordion,
  DepthBlock,
  ValueNone,
  Loader,
  Icon,
  IconButton,
  ButtonFormatMultiRadio,
} from '../..';
import {
  classificationInstance,
  resourceServiceInstance,
} from '../../../api/axios';
import {
  ItemCategoryType,
  ItemTreeListType,
  ItemTreeType,
} from '../../../types';
import { selectedListType } from '../../../types/WorkbookType';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { COLOR } from '../../constants';

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

type UnitTypeTabProps = {
  menuList: {
    label: string;
    value: string;
  }[];
  tabVeiw: string;
  setTabVeiw: React.Dispatch<React.SetStateAction<string>>;
  unitClassificationList: UnitClassificationType[][];
  setUnitClassificationList: React.Dispatch<
    React.SetStateAction<UnitClassificationType[][]>
  >;
};

export function UnitTypeTab({
  menuList,
  tabVeiw,
  setTabVeiw,
  unitClassificationList,
  setUnitClassificationList,
}: UnitTypeTabProps) {
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
  //검색
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedList, setSelectedList] = useState<selectedListType[]>([]);
  const [menuGroupCode, setMenuGroupCode] = useState<string | null>(null);
  //선택한 값의 idx
  const [pidxList, setPidxList] = useState<number[]>([]);

  //그룹 화면설정 정보 불러오기 api
  const getMenu = async () => {
    const res = await resourceServiceInstance.get(
      `/v1/menu/path?url=workbookClassificationSetting`,
    );
    console.log(res);
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
      const nameList = filterList[0]?.nameList;

      const viewListArray = (filterList[0]?.viewList?.split(',') || []).map(
        (item: string) => item === 'true',
      );
      const searchListArray = (filterList[0]?.searchList?.split(',') || []).map(
        (item: string) => item === 'true',
      );
      const newArray = nameListArray.map((name: string, index: number) => ({
        name,
        idx: typeListArray[index],
        view: viewListArray[index] || false,
        search: searchListArray[index] || false,
      }));
      setCategoryTypeList(typeList);
      setSelectedList(newArray);
      setMenuGroupCode(filterList[0].groupCode);
      setCategoryNameList(nameList);
      //setCategoryTypeList(filterList[0].typeList);
    }
  }, [menuData]);

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
  // const getCategoryGroups = async () => {
  //   const response = await classificationInstance.get(
  //     `/v1/category/group/${menuGroupCode}`,
  //   );
  //   return response.data.data;
  // };
  // const {
  //   data: groupsData,
  //   isFetching: groupsDataAIsFetching,
  //   refetch: groupsDataRefetch,
  // } = useQuery({
  //   queryKey: ['get-category-groups', menuGroupCode],
  //   queryFn: getCategoryGroups,
  //   enabled: !!categoryData,
  //   meta: {
  //     errorMessage: 'get-category-groups 에러 메세지',
  //   },
  // });

  useEffect(() => {
    if (tabVeiw === '단원·유형별' && categoryTypeList) {
      fetchCategoryItems(categoryTypeList, setCategoryList);
    }
  }, [categoryTypeList, tabVeiw]);

  //groupsData값 들어왔을때 typeList 관리
  // useEffect(() => {
  //   if (groupsData) {
  //     setCategoryTypeList(groupsData.typeList);
  //   }
  // }, [groupsData]);

  //groupsData값 들어왔을때 nameList 관리
  // useEffect(() => {
  //   if (groupsData) {
  //     setCategoryNameList(groupsData.nameList);
  //   }
  // }, [groupsData]);

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
  const [selectedDepth, setSelectedDepth] = useState<{
    [key: number]: string | null;
  }>({});
  console.log('categoryList', categoryList);
  console.log('selectedDepth', selectedDepth);
  //console.log('selectedList', selectedList);
  //console.log('menuGroupCode', menuGroupCode);
  //console.log('categoryTypeList', categoryTypeList);
  //console.log(unitClassificationList);
  //console.log('pidxList', pidxList);
  //console.log(itemIdx);

  const handleRadioCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const radioValue = e.currentTarget.value; // 선택된 값
    const radioName = e.currentTarget.name; // radio 버튼의 name 값
    const radioClass = e.currentTarget.className; // radio 버튼의 class 값
    const itemId = e.target.closest('.depth')?.id; // 부모 요소의 ID

    // selectedList에서 해당 name에 맞는 항목을 찾아서 selected 값을 업데이트
    const updatedSelectedList = selectedList.map((item) => {
      if (item.name === radioClass) {
        return {
          ...item,
          selected: radioValue, // 선택된 값을 selected로 업데이트
        };
      }
      return item;
    });
    console.log('radioValue', radioValue);

    // selectedList를 업데이트합니다.
    setSelectedList(updatedSelectedList);

    // pidxList를 업데이트 (radioValue를 pidx로 설정)
    const updatedPidxList = [...pidxList];
    const indexToUpdate = selectedList.findIndex(
      (item) => item.name === radioClass,
    );
    console.log('indexToUpdate', indexToUpdate);

    if (indexToUpdate !== -1) {
      updatedPidxList[indexToUpdate] = Number(radioValue);
      setPidxList(updatedPidxList);
    }
  };

  // 라디오 버튼 설정
  // const handleRadioCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const depth =
  //     e.target.parentElement?.parentElement?.parentElement?.parentElement
  //       ?.parentElement?.classList[0];
  //   const itemId =
  //     e.target.parentElement?.parentElement?.parentElement?.parentElement
  //       ?.parentElement?.id;
  //   console.log('선택값', e.currentTarget.value);

  //   switch (depth) {
  //     case '1depth':
  //       setSelected1depth(e.currentTarget.value);
  //       setRadio1depthCheck({
  //         title: e.currentTarget.name,
  //         checkValue: Number(e.currentTarget.value),
  //         code: e.currentTarget.className,
  //         key: itemId as string,
  //       });
  //       break;
  //     case '2depth':
  //       setSelected2depth(e.currentTarget.value);
  //       setRadio2depthCheck({
  //         title: e.currentTarget.name,
  //         checkValue: Number(e.currentTarget.value),
  //         code: e.currentTarget.className,
  //         key: itemId as string,
  //       });
  //       break;
  //     case '3depth':
  //       setSelected3depth(e.currentTarget.value);
  //       setRadio3depthCheck({
  //         title: e.currentTarget.name,
  //         checkValue: Number(e.currentTarget.value),
  //         code: e.currentTarget.className,
  //         key: itemId as string,
  //       });
  //       break;
  //     case '4depth':
  //       setSelected4depth(e.currentTarget.value);
  //       setRadio4depthCheck({
  //         title: e.currentTarget.name,
  //         checkValue: Number(e.currentTarget.value),
  //         code: e.currentTarget.className,
  //         key: itemId as string,
  //       });
  //       break;
  //     case '5depth':
  //       setSelected5depth(e.currentTarget.value);
  //       setRadio5depthCheck({
  //         title: e.currentTarget.name,
  //         checkValue: Number(e.currentTarget.value),
  //         code: e.currentTarget.className,
  //         key: itemId as string,
  //       });
  //       break;
  //     case '6depth':
  //       setSelected6depth(e.currentTarget.value);
  //       setRadio6depthCheck({
  //         title: e.currentTarget.name,
  //         checkValue: Number(e.currentTarget.value),
  //         code: e.currentTarget.className,
  //         key: itemId as string,
  //       });
  //       break;
  //     default:
  //       break;
  //   }
  // };

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

  const [categoryLists, setCategoryLists] = useState<ItemCategoryType[][]>([]);
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
      newCategoryLists[index + 1] = res?.data?.data?.categoryClassList || [];
      setCategoryList(newCategoryLists);
    } catch (error) {
      console.error(`Error fetching category list for index ${index}:`, error);
    }
  };
  console.log('categoryLists', categoryLists);
  console.log('categoryList', categoryList);
  console.log('selectedList', selectedList);
  useEffect(() => {
    console.log(selectedList);
    console.log(pidxList);
    selectedList.forEach((list, index) => {
      if (list.search) {
        //클릭한 항목의 idx의 다음번째 idx의 list.idx
        const nextItem = selectedList[index + 1];
        const itemIdx = nextItem ? nextItem.idx : null; //구하고자 하는 유형의 idx
        const pidx = pidxList[index]; //클릭한 유형의 idx

        if (itemIdx !== null && pidx !== undefined) {
          fetchCategoryList(itemIdx, pidx, index);
        }
      }
    });
  }, [selectedList, pidxList]);

  /* 선택된 유형에따라 항목 조회 */
  //1뎁스 선택시 2뎁스 설정되게
  // const getNextList1 = async () => {
  //   const groupsArray = categoryTypeList.split(',').map(Number);
  //   const itemIdx = groupsArray[1];
  //   const pidx = radio1depthCheck.checkValue; // 선택된 체크 박스의 idx
  //   try {
  //     const res = await classificationInstance.get(
  //       `/v1/category/${itemIdx}/${pidx}`,
  //     );
  //     setNextList1depth(res?.data.data.categoryClassList);
  //     return res.data;
  //   } catch (error: any) {
  //     if (error.response?.data?.code == 'GE-002')
  //       postRefreshToken().then(() => {
  //         //groupsDataRefetch();
  //       });
  //     return undefined;
  //   }
  // };
  // const {
  //   data: nextListData1,
  //   refetch: nextListData1Refetch,
  //   isLoading: nextListData1IsLoading,
  // } = useQuery({
  //   queryKey: ['get-nextList1'],
  //   queryFn: getNextList1,
  //   meta: {
  //     errorMessage: 'get-nextList1 에러 메세지',
  //   },
  //   // 체크된 값이 있을때 조회
  //   enabled: radio1depthCheck?.code !== '',
  // });

  //2뎁스 선택시 3뎁스 설정되게
  // const getNextList2 = async () => {
  //   const groupsArray = categoryTypeList.split(',').map(Number);
  //   const itemIdx = groupsArray[2];
  //   const pidx = radio2depthCheck.checkValue; // 선택된 체크 박스의 idx
  //   try {
  //     const res = await classificationInstance.get(
  //       `/v1/category/${itemIdx}/${pidx}`,
  //     );
  //     setNextList2depth(res?.data.data.categoryClassList);
  //     return res.data;
  //   } catch (error: any) {
  //     if (error.response?.data?.code == 'GE-002')
  //       postRefreshToken().then(() => {
  //         nextListData1Refetch();
  //       });
  //     return undefined;
  //   }
  // };
  // const {
  //   data: nextListData2,
  //   refetch: nextListData2Refetch,
  //   isLoading: nextListData2IsLoading,
  // } = useQuery({
  //   queryKey: ['get-nextList2'],
  //   queryFn: getNextList2,
  //   meta: {
  //     errorMessage: 'get-nextList2 에러 메세지',
  //   },
  //   // 체크된 값이 있을때 조회
  //   enabled: radio2depthCheck?.code !== '',
  // });

  //3뎁스 선택시 4뎁스 설정되게
  // const getNextList3 = async () => {
  //   const groupsArray = categoryTypeList.split(',').map(Number);
  //   const itemIdx = groupsArray[3];
  //   const pidx = radio3depthCheck.checkValue; // 선택된 체크 박스의 idx
  //   try {
  //     const res = await classificationInstance.get(
  //       `/v1/category/${itemIdx}/${pidx}`,
  //     );
  //     setNextList3depth(res?.data.data.categoryClassList);
  //     return res.data;
  //   } catch (error: any) {
  //     if (error.response?.data?.code == 'GE-002')
  //       postRefreshToken().then(() => {
  //         nextListData2Refetch();
  //       });
  //     return undefined;
  //   }
  // };
  // const {
  //   data: nextListData3,
  //   refetch: nextListData3Refetch,
  //   isLoading: nextListData3IsLoading,
  // } = useQuery({
  //   queryKey: ['get-nextList3'],
  //   queryFn: getNextList3,
  //   meta: {
  //     errorMessage: 'get-nextList3 에러 메세지',
  //   },
  //   // 체크된 값이 있을때 조회
  //   enabled: radio3depthCheck?.code !== '',
  // });

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
    //if (radio1depthCheck.code !== '') nextListData1Refetch();
    //if (radio2depthCheck.code !== '') nextListData2Refetch();
    //if (radio3depthCheck.code !== '') nextListData3Refetch();
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

  ///쿼리스트링 만드는 함수
  const createQueryString = (params: Record<string, string>) => {
    return Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join('&');
  };
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
        //groupsDataRefetch();
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
        currentElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [highlightIndex]);

  useEffect(() => {
    setHighlightIndex(-1);
  }, [itemTree, searchValue]);

  //단원.유형별 랜더링
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
            {/* {
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
            } */}
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
                        selectedList.find((item) => item.name === list.name)
                          ?.selected || ''
                      }
                      onChange={(e) => handleRadioCheck(e)}
                      $margin={`10px 0 0 0`}
                    />
                  </div>
                );
              }
              return null;
            })}

            {/* 학교급 */}
            {/* {radio1depthCheck.code !== '' &&
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
              )} */}
            {/* 학년 */}
            {/* {radio2depthCheck.code !== '' &&
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
              )} */}
            {/* 학기 */}
            {/* {radio3depthCheck.code !== '' &&
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
              )} */}
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
                                        {highlightText(item.name, searchValue)}
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
      </>
    );
  };

  return (
    <Container>
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
        <CategoryWrapper>{renderCategoryFields()}</CategoryWrapper>
      </CategorySection>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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
