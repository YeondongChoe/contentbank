import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { IoSearch } from 'react-icons/io5';
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

import { MetaRadioSelect } from './MetaRadioSelect';
interface RadioStateType {
  title: string;
  checkValue: number;
  code: string;
  key: string;
}
interface ItemTreeKeyType {
  [key: string]: string;
}

export function ContentCategoryChange() {
  const [page, setPage] = useRecoilState(pageAtom);
  const [questionList, setQuestionList] = useState<QuizListType[]>([]);
  // States for item1
  const [selected1depth, setSelected1depth] = useState<string>('');
  const [selected2depth, setSelected2depth] = useState<string>('');
  const [selected3depth, setSelected3depth] = useState<string>('');
  const [selected4depth, setSelected4depth] = useState<string>('');
  const [selected5depth, setSelected5depth] = useState<string>('');
  const [selected6depth, setSelected6depth] = useState<string>('');
  const [selected7depth, setSelected7depth] = useState<string>('');

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
  const [nextList4depth, setNextList4depth] = useState([
    { code: '', idx: 0, name: '' },
  ]);
  const [nextList5depth, setNextList5depth] = useState([
    { code: '', idx: 0, name: '' },
  ]);
  const [nextList6depth, setNextList6depth] = useState([
    { code: '', idx: 0, name: '' },
  ]);

  const [categoryItems, setCategoryItems] = useState<ItemCategoryType[]>([]);
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
    if (categoryDataError) {
      categoryDataRefetch();
    }
    if (categoryData) {
      setCategoryItems(categoryData.data.data.categoryItemList);
    }
  }, [categoryData, categoryDataError, categoryDataRefetch]);

  // 카테고리 항목이 변경될 때 각 항목의 상세 리스트를 불러오는 함수
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
              setRefreshTokenCalled(false);
            });
          }
        }),
      );
      const responses = await Promise.all(requests);
      const itemsList = responses.map(
        (res) => res?.data?.data?.categoryClassList,
      );
      console.log('itemsList====', itemsList);

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
      case '7depth':
        setSelected7depth(e.currentTarget.value);
        setRadio7depthCheck({
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
      if (error.response?.data?.code == 'GE-002') postRefreshToken();
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
    } catch (error) {
      console.error('Error fetching next list: ', error);
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
      console.error('Error fetching next list: ', error);
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
    setSelected6depth('');
    setRadio6depthCheck({ title: '', checkValue: 0, code: '', key: '' });
    setSelected7depth('');
    setRadio7depthCheck({ title: '', checkValue: 0, code: '', key: '' });
  }, [selected4depth]);

  // 카테고리 선택후 아이템트리
  // 아이템 트리 불러오기 api
  const getCategoryItemTree = async () => {
    const depthChecks = [
      radio1depthCheck,
      radio2depthCheck,
      radio3depthCheck,
      radio4depthCheck,
      // radio5depthCheck,
      // radio6depthCheck,
      // radio7depthCheck,
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
    // console.log('classificationInstance 응답:', res);
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
        setItemTree(response.data.data);
      },
    });

  useEffect(() => {
    if (selected7depth == '') return;
    categoryItemTreeDataMutate();
  }, [selected7depth]);

  useEffect(() => {}, [itemTree]);

  // 해당 분류 문항찾기
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
      // radio5depthCheck, //TODO : api 에 키값 추가될시 주석 해제
      // radio6depthCheck,
    ];

    const itemTreeKey = radioChecks.reduce<ItemTreeKeyType>((acc, curr) => {
      if (curr.key && curr.title) {
        acc[curr.key] = curr.title;
      }
      return acc;
    }, {});

    const data = {
      // searchKeyword: '',
      // pageIndex: page,
      // pageUnit: 8,
      itemTreeKey: itemTreeKey,
      itemTreeIdxList: checkedDepthList,
      isUse: radio7depthCheck.title !== '비활성화',
    };

    const res = await quizService.post('/v1/search/quiz/category', data);
    console.log('/v1/search/quiz/category 응답:', res);
    return res;
  };

  const {
    data: searchCategoryData,
    mutate: searchCategoryDataMutate,
    isPending,
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
        postRefreshToken();
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

  //TODO : 임시로 문항 리스트 불러옴 나중에 대체 필요
  // const getQuiz = async () => {
  //   const res = await quizService.get(`/v1/quiz`);
  //   console.log(`getQuiz---- 결과값`, res.data.data);
  //   return res.data.data;
  // };
  // const { data: quizData } = useQuery({
  //   queryKey: ['get-quizList'],
  //   queryFn: getQuiz,
  //   meta: {
  //     errorMessage: 'get-quizList 에러 메세지',
  //   },
  // });

  // 리스트 업데이트
  useEffect(() => {
    console.log('questionList', questionList);
    console.log('checkedDepthList', checkedDepthList);
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
    selected1depth,
    selected2depth,
    selected3depth,
    selected4depth,
    selected5depth,
    selected6depth,
    selected7depth,
    checkedDepthList,
  ]);

  return (
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
                <span className="point_text">STEP1</span> 찾을 분류 선택
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
                          title={`${radio1depthCheck.title}/${radio2depthCheck.title}/${radio3depthCheck.title}학년/${radio4depthCheck.title}`}
                          id={`${radio1depthCheck.title}/${radio2depthCheck.title}/${radio3depthCheck.title}학년/${radio4depthCheck.title}`}
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
            {questionList && questionList.length > 0 ? (
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
                {!IsSearchOn && (
                  <ValueNone textOnly info={'STEP1 찾을 내용을 입력해주세요'} />
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
                <span className="point_text">STEP3</span> 바꿀 분류 선택
              </span>
            </Title>
            {/* 해당 문항 분류 바꾸기 컴포넌트 */}
            <MetaRadioSelect checkedList={checkedList} />
          </PositionWrapper>
        }
      />
    </Container>
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
  height: calc(100vh - 220px);
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
  height: calc(110vh);
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
const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 30px;
  padding-left: calc(50% - 35px);
`;
