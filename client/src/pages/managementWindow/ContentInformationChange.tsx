import * as React from 'react';
import { useState, useEffect, useMemo, useRef } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { IoSearch } from 'react-icons/io5';
import { MdPublishedWithChanges } from 'react-icons/md';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { classificationInstance, quizService } from '../../api/axios';
import {
  Accordion,
  Button,
  ButtonFormatRadio,
  DepthBlock,
  Loader,
  PaginationBox,
  ResizeLayout,
  ValueNone,
  openToastifyAlert,
} from '../../components';
import { COLOR } from '../../components/constants';
import ArrowClockwiseIcon from '../../components/contents/createcontent/editer/components/icons/ArrowClockwiseIcon';
import ArrowCounterclockwiseIcon from '../../components/contents/createcontent/editer/components/icons/ArrowCounterclockwiseIcon';
import BarCharLineIcon from '../../components/contents/createcontent/editer/components/icons/BarCharLineIcon';
import BoxArrowInUpRightIcon from '../../components/contents/createcontent/editer/components/icons/BoxArrowInUpRightIcon';
import ChevronLeftIcon from '../../components/contents/createcontent/editer/components/icons/ChevronLeftIcon';
import ChevronRightIcon from '../../components/contents/createcontent/editer/components/icons/ChevronRightIcon';
import CloseIcon from '../../components/contents/createcontent/editer/components/icons/CloseIcon';
import TrashIcon from '../../components/contents/createcontent/editer/components/icons/TrashIcon';
import { QuizList } from '../../components/contents/createcontent/list';
import { pageAtom } from '../../store/utilAtom';
import {
  ItemCategoryType,
  ItemTreeListType,
  ItemTreeType,
  PaginationType,
  QuizListType,
} from '../../types';
import { postRefreshToken } from '../../utils/tokenHandler';

interface RadioStateType {
  title: string;
  checkValue: number;
  code: string;
  key: string;
}

interface ItemTreeKeyType {
  [key: string]: string;
}

export function ContentInformationChange() {
  const [page, setPage] = useRecoilState(pageAtom);
  const [questionList, setQuestionList] = useState<QuizListType[]>([]);
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
  const [radio7depthCheck, setRadio7depthCheck] = useState<RadioStateType>({
    title: '',
    checkValue: 0,
    code: '',
    key: '',
  });
  const [selected1depth, setSelected1depth] = useState<string>('');
  const [selected2depth, setSelected2depth] = useState<string>('');
  const [selected3depth, setSelected3depth] = useState<string>('');
  const [selected4depth, setSelected4depth] = useState<string>('');
  const [selected5depth, setSelected5depth] = useState<string>('');
  const [selected6depth, setSelected6depth] = useState<string>('');
  const [selected7depth, setSelected7depth] = useState<string>('');
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
  const [nextList6depth, setNextList6depth] = useState([
    { code: '', idx: 0, name: '' },
  ]);

  const [searchValue, setSearchValue] = useState<string>('');
  const [changeValue, setChangeValue] = useState<string>('');
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [checkedDepthList, setCheckedDepthList] = useState<number[]>([]);

  const [categoryItems, setCategoryItems] = useState<ItemCategoryType[]>([]); // 카테고리 항목을 저장할 상태
  const [categoryList, setCategoryList] = useState<ItemCategoryType[][]>([
    [{ code: '', idx: 0, name: '' }],
  ]);
  const [categoriesE, setCategoriesE] = useState<ItemCategoryType[][]>([]);
  const [itemTree, setItemTree] = useState<ItemTreeListType[]>([]);
  const [isCategoryLoaded, setIsCategoryLoaded] = useState(false);
  const [refreshTokenCalled, setRefreshTokenCalled] = useState(false);
  const [IsSearchOn, setIsSearchOn] = useState(false);

  //  카테고리 불러오기 api
  const getCategory = async () => {
    const res = await classificationInstance.get(`/v1/category`);
    // console.log(`getCategory 결과값`, res);
    return res;
  };
  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isFetching: isCategoryIsFething,
    error: categoryDataError,
    refetch: categoryDataRefetch,
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

  const getCategoryGroups = async () => {
    const response = await classificationInstance.get('/v1/category/group/A');
    return response.data.data.typeList;
  };
  const {
    data: groupsData,
    isFetching: groupsDataAIsFetching,
    refetch: groupsDataARefetch,
  } = useQuery({
    queryKey: ['get-category-groups-A'],
    queryFn: getCategoryGroups,
    enabled: !!categoryData,
    meta: {
      errorMessage: 'get-category-groups 에러 메세지',
    },
  });
  useEffect(() => {
    if (groupsData) {
      fetchCategoryItems(groupsData, setCategoryList);
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
        classificationInstance.get(`/v1/category/${id}`).catch((error) => {
          // console.log(error);
          if (error.response?.data?.code == 'GE-002' && !refreshTokenCalled) {
            setRefreshTokenCalled(true);
            postRefreshToken().then(() => {
              groupsDataARefetch();
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
      setRefreshTokenCalled(false);
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
      case '7depth':
        setSelected7depth(e.currentTarget.value);
        setRadio7depthCheck({
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
      if (error.response?.data?.code == 'GE-002')
        postRefreshToken().then(() => {
          console.error('1뎁스 선택시 2뎁스 설정되게 리프레쉬 토큰 호출이후');
          nextListData1Refetch();
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
      if (error.response?.data?.code == 'GE-002')
        postRefreshToken().then(() => {
          console.error('2뎁스 선택시 3뎁스 설정되게 리프레쉬 토큰 호출이후');
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
    } catch (error) {
      console.error('Error fetching next list: --- ', error);
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

  const setNextList = (idx: number) => {
    //교과 과목 오픈여부 라디오 버튼 셋팅
    if (categoriesE && idx == 4) {
      setNextList4depth(categoriesE[0]);
    }
    if (categoriesE && idx == 5) {
      setNextList5depth(categoriesE[1]);
    }
    if (categoriesE && idx == 6) {
      setNextList6depth([
        {
          code: '전체',
          idx: 999999,
          name: '전체',
        },
        {
          code: '활성화',
          idx: 999998,
          name: '활성화',
        },
        {
          code: '비활성화',
          idx: 999997,
          name: '비활성화',
        },
      ]);
    }
  };

  useEffect(() => {
    if (radio1depthCheck.code !== '') nextListData1Refetch();
    if (radio2depthCheck.code !== '') nextListData2Refetch();
    if (radio3depthCheck.code !== '') nextListData3Refetch();
    if (radio4depthCheck.code !== '') setNextList(4);
    if (radio5depthCheck.code !== '') setNextList(5);
    if (radio6depthCheck.code !== '') setNextList(6);
    if (radio7depthCheck.code !== '') setNextList(7);
  }, [
    radio1depthCheck,
    radio2depthCheck,
    radio3depthCheck,
    radio4depthCheck,
    radio5depthCheck,
    radio6depthCheck,
    radio7depthCheck,
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
    setCheckedDepthList([]);
    setRadio4depthCheck({ title: '', checkValue: 0, code: '', key: '' });
  }, [selected3depth]);
  useEffect(() => {
    setCheckedDepthList([]);
    setSelected5depth('');
    setRadio5depthCheck({ title: '', checkValue: 0, code: '', key: '' });
  }, [selected4depth]);
  useEffect(() => {
    setCheckedDepthList([]);
    setSelected6depth('');
    setRadio6depthCheck({ title: '', checkValue: 0, code: '', key: '' });
  }, [selected5depth]);
  useEffect(() => {
    setCheckedDepthList([]);
    setSelected7depth('');
    setRadio7depthCheck({ title: '', checkValue: 0, code: '', key: '' });
  }, [selected6depth]);
  useEffect(() => {
    setCheckedDepthList([]);
  }, [selected7depth]);

  // 카테고리 선택후 아이템트리
  // 아이템 트리 불러오기 api
  const getCategoryItemTree = async () => {
    const radioChecks = [
      radio1depthCheck,
      radio2depthCheck,
      radio3depthCheck,
      radio4depthCheck,
      radio5depthCheck,
      radio6depthCheck,
      // radio7depthCheck,
    ];

    const keyValuePairs = radioChecks.reduce<ItemTreeKeyType>((acc, curr) => {
      if (curr.key && curr.title) {
        acc[curr.key] = curr.title;
      }
      return acc;
    }, {});

    const itemTreeKeyList = { itemTreeKeyList: [keyValuePairs] };
    console.log('itemTreeKeyList 최종적으로 보내는 탭선택값:', itemTreeKeyList);

    const res = await classificationInstance.post('/v1/item', itemTreeKeyList);
    console.log('classificationInstance 응답:', res);
    return res;
  };

  const { data: categoryItemTreeData, mutate: categoryItemTreeDataMutate } =
    useMutation({
      mutationFn: getCategoryItemTree,
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
    if (selected7depth == '') return;
    categoryItemTreeDataMutate();
  }, [selected7depth]);

  useEffect(() => {
    // console.log(error);
  }, [itemTree]);

  // 해당  문항찾기
  const onSearchList = () => {
    // console.log(
    //   'selected',
    //   radio1depthCheck,
    //   radio2depthCheck,
    //   radio3depthCheck,
    //   radio4depthCheck,
    //   radio5depthCheck,
    //   radio6depthCheck,
    //   radio7depthCheck,
    // );
    // console.log('checkedDepthList', checkedDepthList);
    searchCategoryDataMutate();
  };

  // 문항 분류 검색 api
  const postSearchCategory = async () => {
    const radioChecks: RadioStateType[] = [
      radio1depthCheck,
      radio2depthCheck,
      radio3depthCheck,
      radio4depthCheck,
      radio5depthCheck, //TODO : api 에 키값 추가될시 주석 해제
      radio6depthCheck,
    ];

    const itemTreeKey = radioChecks.reduce<ItemTreeKeyType>((acc, curr) => {
      if (curr.key && curr.title) {
        acc[curr.key] = curr.title;
      }
      return acc;
    }, {});

    const data = {
      searchCondition: 'ALL',
      searchKeyword: searchValue,
      pageIndex: page,
      pageUnit: 10,
      itemTreeKey: itemTreeKey,
      itemTreeIdxList: checkedDepthList,
      isUse: radio7depthCheck.title !== '비활성화' ? null : false,
    };

    console.log('최종적으로 요청되는 데이터', data);

    const res = await quizService.post('/v1/search/quiz/category', data);
    console.log('/v1/search/quiz/category 응답:--------', res.data.data);

    return res;
  };

  const {
    data: searchCategoryData,
    mutate: searchCategoryDataMutate,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: postSearchCategory,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
      if (context.response.data?.code == 'GE-002') {
        postRefreshToken().then(() => {
          categoryDataRefetch(); // TODO : test
        });
      }
    },
    onSuccess: (response: {
      data: { data: { quizList: any[]; pagination: PaginationType } };
    }) => {
      // 응답 리스트 스텝2로
      // TODO : api 데이터 세부조건 미완성됨. 임시로 문항 리스트 불러옴 나중에 대체 필요
      setQuestionList(response.data?.data?.quizList);
      setIsSearchOn(true);
    },
  });

  // 리스트의 텍스트값 변경값으로 바꾸기
  const onChangeInfo = () => {
    console.log('searchValue --- ', searchValue);
    console.log('changeValue --- ', changeValue);
    console.log('checkedList --- ', checkedList);

    const idxList = questionList
      .filter((el) => checkedList.includes(el.code))
      .map((el) => el.idx);

    console.log('idxList', idxList);
    const data = {
      idxList: idxList,
      before: searchValue,
      after: changeValue,
    };
    mutateChangeText(data);
  };
  // 문항 즐겨찾기 토글 api
  const patchQuizFavorite = async (data: {
    idxList: number[];
    before: string;
    after: string;
  }) => {
    return await quizService.patch(`/v1/quiz/change/text`, data);
  };
  const { data: changeText, mutate: mutateChangeText } = useMutation({
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
      // console.log('changeText', response);
      openToastifyAlert({
        type: 'success',
        text: response.data.message,
      });

      // 초기화
    },
  });

  // 리스트 업데이트
  useEffect(() => {
    console.log('questionList', questionList);
  }, [searchCategoryData]);

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

  const buttonDisabled = useMemo(() => {
    if (
      searchValue.length > 1 && //2글자 이상
      selected1depth.length &&
      selected2depth.length &&
      selected3depth.length &&
      selected4depth.length &&
      selected5depth.length &&
      selected6depth.length &&
      selected7depth.length &&
      checkedDepthList.length > 0
    ) {
      return false;
    } else {
      return true;
    }
  }, [
    searchValue,
    selected1depth,
    selected2depth,
    selected3depth,
    selected4depth,
    selected5depth,
    selected6depth,
    selected7depth,
    checkedDepthList,
  ]);

  const changeButtonDisabled = useMemo(() => {
    if (
      changeValue.length > 1 && //2글자 이상
      searchValue.length > 1 &&
      checkedList.length > 0
    ) {
      return false;
    } else {
      return true;
    }
  }, [changeValue, checkedList]);

  const submitSave = () => {
    // saveHandler();
    // 이미지 데이터 저장
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  window.editorType_s = true;
  const ocrIframeContainer = useRef<HTMLDivElement>(null);
  const [eqText, setEqText] = useState<string | null>(null);
  const [eqChangeText, setEqChangeText] = useState<string | null>(null);

  useEffect(() => {
    const initialScripts = [
      '/static/tinymce5/js/tinymce/tinymce.min.js',
      '/static/iTeX_EQ/js/jquery-3.3.1.min.js',
      '/static/iTeX_EQ/js/jquery-ui.min.js',
      '/static/iTeX_EQ/js/ds.min.js',
      '/static/OCR/cropper/cropper.js',
      '/static/OCR/PDF/pdf.js',
      '/static/iTeX_fulltext/js/bootstrap.bundle.min.js',
      '/static/iTeX_fulltext/js/sort-list.js',
      '/static/dream_ui/js/dream_setting.js',
      '/static/iTeX_EQ/js/itex_total_eq_origin_32.js',
    ];
    const subsequentScripts = [
      '/static/dream_ui/js/init_setting.js',
      '/static/iTeX_EQ/js/itexLoader.js',
      '/static/iTeX_fulltext/js/fulltext_dream.js?v=0.71',
      '/static/dream_ui/js/data_view_area.js',
      '/static/dream_ui/js/frame_controller.js',
      '/static/iTeX_fulltext/js/itex_parser_dream.js?v=0.9.6.12',
      '/static/iTeX_fulltext/js/itex_parser_pj2.js?v=0.9.1',
      '/static/iTeX_fulltext/js/cw_poc_pj_dream.js?v=0.87',
      '/static/iTeX_fulltext/js/dream_function.js',
      '/static/iTeX_fulltext/js/hmlupload.js?v=0.1',
      '/static/iTeX_fulltext/js/pdf_postprocess.js?v=0.1',
    ];

    // 동적 스크립트 로딩 함수
    const dynamicallyLoadScripts = (
      scriptUrls: any[],
      callback: { (): Promise<void>; (): void; (): void },
    ) => {
      const promises = scriptUrls.map((url) => {
        return new Promise((resolve, reject) => {
          // 스크립트가 이미 존재하는지 확인
          if (document.querySelector(`script[src="${url}"]`)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            resolve(); // 이미 로드된 경우 건너뜀
            return;
          }

          // 존재하지 않는 경우 새로 로드
          const script = document.createElement('script');
          script.src = url;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          script.onload = () => resolve();
          script.onerror = () =>
            reject(new Error(`Failed to load script ${url}`));
          document.body.appendChild(script);
        });
      });

      Promise.all(promises)
        .then(() => {
          if (callback) callback();
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const initComponent = async () => {
      dynamicallyLoadScripts([...initialScripts], async () => {
        console.log('Initial scripts loaded');
        const checkTinyMCEReady = () => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          if (window.tinymce) {
            console.log('tinymce loaded successfully');
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            dynamicallyLoadScripts([...subsequentScripts], () => {
              console.log('Subsequent scripts loaded');

              if (ocrIframeContainer.current) {
                const iframe = document.createElement('iframe');
                iframe.width = '0';
                iframe.height = '0';
                iframe.src = '/static/OCR/ocr_iframe_origin.html?v=0.34';
                iframe.frameBorder = '0';
                iframe.scrolling = 'no';
                iframe.id = 'itex_frame_area';
                ocrIframeContainer.current.appendChild(iframe);
              }
            });
          } else {
            setTimeout(checkTinyMCEReady, 50);
          }
        };

        checkTinyMCEReady();
      });
    };

    initComponent();
  }, []);

  //수식 입력기
  const openFormula = (state: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.openEQ(state);
  };

  useEffect(() => {
    console.log('텍스트 내용 ----- ', eqText, eqChangeText);
  }, [eqText, eqChangeText]);

  return (
    <>
      <Container>
        <ResizeLayout
          height={'calc(100vh - 100px)'}
          column={'3rd'}
          item1Width={400}
          minWidth={330}
          maxWidth={1000}
          item1={
            <PositionWrapper>
              <Title>
                <span className="title_top">
                  <span className="point_text">STEP1</span> 찾을 내용 입력
                </span>
              </Title>
              <ScrollWrapper>
                <PerfectScrollbar>
                  {isCategoryIsFething &&
                    groupsDataAIsFetching &&
                    groupsDataEIsFetching &&
                    isCategoryLoaded && (
                      <LoaderWrapper>
                        <Loader height="50px" size="50px" />
                      </LoaderWrapper>
                    )}
                  {/* 라디오 버튼 부분 */}
                  <div className="meta_radio_select">
                    {categoryItems[0] && categoryList && (
                      <>
                        {/* 교육과정 */}
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
                        {/* 학교급 */}
                        {[categoryItems[1]].map((item) => (
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
                        {/* 학년 */}
                        {[categoryItems[2]].map((item) => (
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
                        {/* 학기 */}
                        {[categoryItems[3]].map((item) => (
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
                        {/* 교과 */}
                        {[categoryItems[6]].map((item) => (
                          <div
                            className={`5depth`}
                            id={`${item.name}`}
                            key={`selected5depth ${item.idx}`}
                          >
                            <ButtonFormatRadio
                              branchValue={`${item.name}`}
                              titleText={`${item.name}`}
                              list={nextList4depth}
                              selected={selected5depth}
                              onChange={(e) => handleRadioCheck(e)}
                              // defaultChecked={}
                              checkedInput={radio5depthCheck}
                            />
                          </div>
                        ))}
                        {/* 과목 */}
                        {[categoryItems[7]].map((item) => (
                          <div
                            className={`6depth`}
                            id={`${item.name}`}
                            key={`selected6depth ${item.idx}`}
                          >
                            <ButtonFormatRadio
                              branchValue={`${item.name}`}
                              titleText={`${item.name}`}
                              list={nextList5depth}
                              selected={selected6depth}
                              onChange={(e) => handleRadioCheck(e)}
                              // defaultChecked={}
                              checkedInput={radio6depthCheck}
                            />
                          </div>
                        ))}
                        {/* 오픈여부 */}
                        {[
                          {
                            idx: 0,
                            name: '오픈여부',
                            code: '오픈여부',
                            type: 'SELECT',
                          },
                        ].map((item) => (
                          <div
                            className={`7depth`}
                            id={`${item.name}`}
                            key={`selected7depth ${item.idx}`}
                          >
                            <ButtonFormatRadio
                              titleText={`${item.name}`}
                              list={nextList6depth}
                              selected={selected7depth}
                              onChange={(e) => handleRadioCheck(e)}
                              // defaultChecked={}
                              checkedInput={radio7depthCheck}
                            />
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                  <div className="meta_accordion_select">
                    {selected1depth &&
                      selected2depth &&
                      selected3depth &&
                      selected4depth &&
                      selected5depth &&
                      selected6depth &&
                      selected7depth && (
                        <>
                          <strong>세부 검색조건</strong>
                          <Accordion
                            $backgroundColor={`${COLOR.GRAY}`}
                            title={`${radio1depthCheck.title}/${radio2depthCheck.title}/${radio3depthCheck.title}학년/${radio4depthCheck.title}/${radio5depthCheck.title}/${radio6depthCheck.title}`}
                            id={`${radio1depthCheck.title}/${radio2depthCheck.title}/${radio3depthCheck.title}학년/${radio4depthCheck.title}/${radio5depthCheck.title}/${radio6depthCheck.title}`}
                            $margin={`0 0 20px 0`}
                            defaultChecked={true}
                          >
                            <>
                              {categoryItemTreeData ? (
                                <>
                                  {itemTree && itemTree.length ? (
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
                                                checkedDepthList.includes(
                                                  item?.idx,
                                                )
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
                            </>
                          </Accordion>
                        </>
                      )}
                  </div>
                </PerfectScrollbar>
              </ScrollWrapper>
              <ButtonWrapper>
                <InputWrapper>
                  <textarea
                    className="first_area_test"
                    style={{
                      display: 'inline-block',
                    }}
                    // onChange={(e) => setEqText(e.target.value)}
                  ></textarea>
                  <span className="first_area_test"></span>
                  <input
                    type="text"
                    minLength={2}
                    maxLength={20}
                    value={`${searchValue}`}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={`${`찾을값을 입력해주세요(두글자 이상)`}`}
                  />

                  <Button
                    width={'80px'}
                    height={'35px'}
                    fontSize={'14px'}
                    $margin={'0 0 0 5px'}
                    cursor
                    $filled
                    $success
                    onClick={() => {
                      openFormula('first_area_test');
                    }}
                  >
                    수식
                  </Button>
                </InputWrapper>

                <Button
                  $filled
                  cursor
                  disabled={buttonDisabled}
                  onClick={() => onSearchList()}
                >
                  <span>
                    찾기 <IoSearch />
                  </span>
                </Button>
              </ButtonWrapper>
            </PositionWrapper>
          }
          item2={
            <QuizListWrapper>
              <Title>
                <span className="title_top">
                  <span className="point_text">STEP2</span> 문항 선택
                </span>
              </Title>
              {/*TODO : 데이터 확인 */}
              {questionList.length ? (
                <>
                  <QuizList
                    questionList={questionList}
                    $height={`calc(100vh - 220px)`}
                    showTitle
                    showCheckBox
                    showViewAllButton
                    setCheckedList={setCheckedList}
                  />
                  <ButtonWrapper className="pagination">
                    <PaginationBox
                      itemsCountPerPage={
                        searchCategoryData?.data.data.pagination
                          .pageUnit as number
                      }
                      totalItemsCount={
                        searchCategoryData?.data.data.pagination
                          .totalCount as number
                      }
                    />
                  </ButtonWrapper>
                </>
              ) : (
                <ValueNoneWrapper>
                  {searchValue.length < 1 && !IsSearchOn && (
                    <ValueNone
                      textOnly
                      info={'STEP1 찾을 내용을 입력해주세요'}
                    />
                  )}
                  {IsSearchOn && (
                    <ValueNone textOnly info={'데이터가 없습니다'} />
                  )}
                </ValueNoneWrapper>
              )}
            </QuizListWrapper>
          }
          item3Width={400}
          item3={
            <PositionWrapper>
              <Title>
                <span className="title_top">
                  <span className="point_text">STEP3</span> 바꿀 내용 입력
                </span>
              </Title>
              {checkedList.length ? (
                <>
                  <ScrollWrapper>
                    <PerfectScrollbar>
                      <ChangeInfoWrapper>
                        <p className="info_total">
                          선택한 문항 총 {checkedList.length} 건
                        </p>
                        <div className="info_box">
                          {checkedList.length && (
                            <p>
                              총
                              <span className="strong">
                                {checkedList.length}
                              </span>
                              건
                            </p>
                          )}
                          {searchValue && (
                            <p>
                              <span className="strong">{searchValue}</span>
                              를(을)
                            </p>
                          )}
                          {changeValue && (
                            <p>
                              <span className="strong">{changeValue}</span>로
                              변경 하시겠습니까?
                            </p>
                          )}
                        </div>
                      </ChangeInfoWrapper>
                    </PerfectScrollbar>
                  </ScrollWrapper>
                </>
              ) : (
                <ValueNoneWrapper>
                  <ValueNone textOnly info={'STEP2 문항을 선택해주세요'} />
                </ValueNoneWrapper>
              )}
              <ButtonWrapper>
                <InputWrapper>
                  <textarea
                    className="second_area_test"
                    style={{
                      display: 'inline-block',
                    }}
                    // onChange={(e) => setEqChangeText(e.target.value)}
                  ></textarea>
                  <input
                    type="text"
                    minLength={2}
                    maxLength={20}
                    value={changeValue}
                    className="second_area_test"
                    onChange={(e) => setChangeValue(e.target.value)}
                    placeholder="변경값을 입력해주세요"
                  />
                  <Button
                    width={'80px'}
                    height={'35px'}
                    fontSize={'14px'}
                    $margin={'0 0 0 5px'}
                    cursor
                    $filled
                    $success
                    onClick={() => openFormula('second_area_test')}
                  >
                    수식
                  </Button>
                </InputWrapper>
                <Button
                  $filled
                  cursor
                  disabled={changeButtonDisabled}
                  onClick={() => onChangeInfo()}
                >
                  <span>
                    바꾸기 <MdPublishedWithChanges />
                  </span>
                </Button>
              </ButtonWrapper>
            </PositionWrapper>
          }
        />
      </Container>

      {/* 수식 입력창 영역 */}
      <div className="itex_editor_container">
        <div id="first" className="resizeable" style={{ display: 'none' }}>
          <div id="itex_viewer_area">
            <div id="data_viewer_body">
              <div className="trans_area h-100">
                <div
                  className="itex_hml_convert_view"
                  //   contentEditable="true"
                ></div>
                <button id="pasteButton" className="hml_copy_btn">
                  붙여넣기
                </button>
                <div className="origin_img_area h-100 hml_multi">
                  <div className="itex_ocrimg_area" style={{ width: '100%' }}>
                    <img id="itex_main_img" alt="" />
                  </div>
                  <div className="itex-drag-area multi">
                    <div className="icon">{/* <DocumentIcon /> */}</div>
                    <input
                      id="upload_file"
                      className="hml_multi"
                      name="images"
                      type="file"
                      accept=".hml"
                    />
                  </div>
                </div>
              </div>
              <div
                className="itex_fixed_tool position-absolute bottom-0 start-50 translate-middle-x zindex-fixed"
                role="toolbar"
                aria-label="Toolbar with button groups"
              >
                <div
                  className="btn-group btn-group-md"
                  role="group"
                  aria-label="1th group"
                >
                  <button
                    type="button"
                    className="btn btn-secondary"
                    id="itex_page_clear"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    title="지우기"
                  >
                    <TrashIcon />
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-method="rotate"
                    id="itex_Rotate_L"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    title="왼쪽으로 회전"
                    disabled={true}
                  >
                    <ArrowCounterclockwiseIcon />
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-method="rotate"
                    id="itex_Rotate_R"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    title="오른쪽으로 회전"
                    disabled={true}
                  >
                    <ArrowClockwiseIcon />
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    id="onPrevPage"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    title="이전 페이지"
                    disabled={true}
                  >
                    <ChevronLeftIcon />
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    id="onNextPage"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    title="다음 페이지"
                    disabled={true}
                  >
                    <ChevronRightIcon />
                  </button>
                  <div className="pdf_page_show pdf_page_hidden">
                    <input
                      className="input-group-text pdf_page_a"
                      id="inputGroup-sizing-sm"
                      type="text"
                    />
                    <span
                      className="input-group-text btn-secondary pdf_page_s"
                      id="inputGroup-sizing-sm"
                    >
                      /0
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary itex_edit_mv"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    title="모바일 환경에서 에디터 창으로 이동합니다."
                    style={{ display: 'none' }}
                  >
                    <BoxArrowInUpRightIcon />
                  </button>
                  <button
                    type="button"
                    className="btn btn-info itex_total_count"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    title="변환 내역"
                    style={{ display: 'none' }}
                  >
                    <BarCharLineIcon />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      <span className="itex_obj_count">0</span>
                      <span className="visually-hidden"></span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div id="data_viewer_footer"></div>
            <div className="qnai_trans_form">
              <div>
                <div className="btn-group btn-group-sm">
                  <button
                    type="button"
                    className="btn btn-primary"
                    title="선택영역의 컨텐츠를 인식합니다."
                    id="doc_ocr_converter"
                  >
                    문항인식
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    id="img_crop_normal"
                    title="선택영역을 이미지로 변환합니다."
                  >
                    그림넣기
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    id="itex_crop_clear"
                    title="크롭 해제"
                    aria-label="Close"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="dragger-left" className="dragger dragger-left">
          <button className="open_btn_left" style={{ display: 'none' }}>
            {'>'}
          </button>
        </div>
        <div id="second" className="resizeable" style={{ display: 'none' }}>
          <div className="col-lg-4 p-0 tiny_wrap">
            <textarea id="tinyeditor"></textarea>
            <div className="save_exam_btn_wrap">
              {/* <button id="exam_change">변경</button> */}
              <button
                id="exam_save_all"
                onClick={async () => {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  const gggg = await window.saveHmlData();
                  console.log(gggg);
                }}
              >
                저장
              </button>
            </div>
            <div className="poc_checker_block"></div>
          </div>
        </div>

        <div className="tools_wrap eq_config_hidden">
          <div id="editor_container"></div>
          <div id="iframe_ocr_box" ref={ocrIframeContainer}></div>
          <div id="itexhml_board"></div>
          <div id="modal_block">
            <div className="sk-cube-grid">
              <div className="sk-cube sk-cube1"></div>
              <div className="sk-cube sk-cube2"></div>
              <div className="sk-cube sk-cube3"></div>
              <div className="sk-cube sk-cube4"></div>
              <div className="sk-cube sk-cube5"></div>
              <div className="sk-cube sk-cube6"></div>
              <div className="sk-cube sk-cube7"></div>
              <div className="sk-cube sk-cube8"></div>
              <div className="sk-cube sk-cube9"></div>
            </div>
          </div>
        </div>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          id="itex_imgfile"
          style={{ display: 'none' }}
        />
      </div>
    </>
  );
}
const Container = styled.div`
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
`;
const PositionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const ScrollWrapper = styled.div`
  overflow-y: auto;
  height: calc(100vh - 280px);
  width: 100%;
  background-color: ${COLOR.LIGHT_GRAY};

  .line {
    border-top: 1px solid ${COLOR.BORDER_GRAY};
    margin: 10px 0;
  }

  .meta_accordion_select {
    padding: 20px;
  }
  .meta_accordion_select {
    strong {
      display: flex;
      font-size: 15px;
      margin-bottom: 5px;
    }
  }
`;
const QuizListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 38px);
  background-color: ${COLOR.LIGHT_GRAY};
`;
const Title = styled.div`
  padding: 15px;
  background-color: #fff;
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${COLOR.BORDER_BLUE};
  height: fit-content;
  .title_top {
    display: flex;
    align-items: center;
    font-size: 15px;
    /* font-weight: bold; */
  }
  .point_text {
    font-size: 25px;
    color: #1976d2;
    padding-right: 15px;
    font-weight: bold;
  }
`;
// const Span = styled.span`
//   color: #1976d2;
// `;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  width: 100%;
  border: 1px solid ${COLOR.BORDER_GRAY};
  border-radius: 5px;
  padding: 5px;

  > input {
    width: calc(100% - 85px);
    border: none;
    border-radius: 5px;
    font-size: 15px;
    padding: 0 10px;
    text-overflow: ellipsis;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  background-color: #fff;
  box-shadow:
    rgba(0, 17, 255, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  position: sticky;
  bottom: 0;
  right: 0;
  left: 0;

  .pagination {
    padding-bottom: 12px;
  }
`;
const ValueNoneWrapper = styled.div`
  background-color: ${COLOR.LIGHT_GRAY};
  display: flex;
  height: 100%;
`;
const ChangeInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  .info_total {
    color: #fff;
    font-weight: bold;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    background-color: ${COLOR.FONT_NAVI};
  }
  .info_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    width: 100%;
    text-align: center;
    color: ${COLOR.SECONDARY};
    /* font-weight: bold; */
    position: absolute;
    top: calc(50% - 60px);
    padding: 20px;

    p {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 2px;
    }
  }

  .strong {
    background-color: ${COLOR.FONT_NAVI};
    color: #fff;
    padding: 2px;
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 30px;
  padding-left: calc(50% - 35px);
`;
