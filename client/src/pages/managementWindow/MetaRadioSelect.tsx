import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { MdPublishedWithChanges } from 'react-icons/md';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { styled } from 'styled-components';

import { classificationInstance } from '../../api/axios';
import {
  openToastifyAlert,
  ButtonFormatRadio,
  Accordion,
  ValueNone,
  Loader,
  DepthBlock,
  Button,
} from '../../components';
import { COLOR } from '../../components/constants';
import {
  ItemCategoryType,
  ItemTreeListType,
  ItemTreeType,
  QuizListType,
} from '../../types';
import { postRefreshToken } from '../../utils/tokenHandler';

interface RadioStateType {
  title: string;
  checkValue: number;
  code: string;
  key: string;
}
interface ClassificationStateType {
  quizCodeList: string[];
  categoryList: {
    itemTreeKey?: Record<string, string>;
    itemTreeIdxList?: number[];
    quizCategory?: Record<string, string>;
  }[];
}

interface ItemTreeKeyType {
  [key: string]: string;
}

export function MetaRadioSelect({
  checkedList,
  setCheckedList,
  setQuestionListReset,
  setSelected1depthReset,
}: {
  checkedList: string[];
  setCheckedList: React.Dispatch<React.SetStateAction<string[]>>;
  setQuestionListReset: React.Dispatch<React.SetStateAction<QuizListType[]>>;
  setSelected1depthReset: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [questionList, setQuestionList] = useState<QuizListType[]>([]);

  // States for item3
  const [changeVlaue1depth, setChangeVlaue1depth] = useState<string>('');
  const [changeVlaue2depth, setChangeVlaue2depth] = useState<string>('');
  const [changeVlaue3depth, setChangeVlaue3depth] = useState<string>('');
  const [changeVlaue4depth, setChangeVlaue4depth] = useState<string>('');
  const [changeVlaue5depth, setChangeVlaue5depth] = useState<string>('');
  const [changeVlaue6depth, setChangeVlaue6depth] = useState<string>('');
  const [radio1depthChangeCheck, setRadio1depthChangeCheck] =
    useState<RadioStateType>({
      title: '',
      checkValue: 0,
      code: '',
      key: '',
    });
  const [radio2depthChangeCheck, setRadio2depthChangeCheck] =
    useState<RadioStateType>({
      title: '',
      checkValue: 0,
      code: '',
      key: '',
    });
  const [radio3depthChangeCheck, setRadio3depthChangeCheck] =
    useState<RadioStateType>({
      title: '',
      checkValue: 0,
      code: '',
      key: '',
    });
  const [radio4depthChangeCheck, setRadio4depthChangeCheck] =
    useState<RadioStateType>({
      title: '',
      checkValue: 0,
      code: '',
      key: '',
    });
  const [radio5depthChangeCheck, setRadio5depthChangeCheck] =
    useState<RadioStateType>({
      title: '',
      checkValue: 0,
      code: '',
      key: '',
    });
  const [radio6depthChangeCheck, setRadio6depthChangeCheck] =
    useState<RadioStateType>({
      title: '',
      checkValue: 0,
      code: '',
      key: '',
    });
  const [nextChangeList1depth, setNextChangeList1depth] = useState([
    { code: '', idx: 0, name: '' },
  ]);
  const [nextChangeList2depth, setNextChangeList2depth] = useState([
    { code: '', idx: 0, name: '' },
  ]);
  const [nextChangeList3depth, setNextChangeList3depth] = useState([
    { code: '', idx: 0, name: '' },
  ]);
  const [nextChangeList4depth, setNextChangeList4depth] = useState([
    { code: '', idx: 0, name: '' },
  ]);
  const [nextChangeList5depth, setNextChangeList5depth] = useState([
    { code: '', idx: 0, name: '' },
  ]);

  const [checkedDepthList, setCheckedDepthList] = useState<number[]>([]);
  const [categoryItems, setCategoryItems] = useState<ItemCategoryType[]>([]);
  const [categoryList, setCategoryList] = useState<ItemCategoryType[][]>([]);
  const [categoriesE, setCategoriesE] = useState<ItemCategoryType[][]>([]);
  const [itemTree, setItemTree] = useState<ItemTreeListType[]>([]);
  const [isCategoryLoaded, setIsCategoryLoaded] = useState(false);
  const [refreshTokenCalled, setRefreshTokenCalled] = useState(false);

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
  const { data: groupsEData, refetch: groupsDataERefetch } = useQuery({
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
    const depth =
      e.target.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement?.classList[0];
    const itemId =
      e.target.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement?.id;

    switch (depth) {
      case '1depth-change':
        setChangeVlaue1depth(e.currentTarget.value);
        setRadio1depthChangeCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
          key: itemId as string,
        });
        break;
      case '2depth-change':
        setChangeVlaue2depth(e.currentTarget.value);
        setRadio2depthChangeCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
          key: itemId as string,
        });
        break;
      case '3depth-change':
        setChangeVlaue3depth(e.currentTarget.value);
        setRadio3depthChangeCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
          key: itemId as string,
        });
        break;
      case '4depth-change':
        setChangeVlaue4depth(e.currentTarget.value);
        setRadio4depthChangeCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
          key: itemId as string,
        });
        break;
      case '5depth-change':
        setChangeVlaue5depth(e.currentTarget.value);
        setRadio5depthChangeCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
          key: itemId as string,
        });
        break;
      case '6depth-change':
        setChangeVlaue6depth(e.currentTarget.value);
        setRadio6depthChangeCheck({
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
    const pidx = radio1depthChangeCheck.checkValue; // 선택된 체크 박스의 idx
    try {
      const res = await classificationInstance.get(
        `/v1/category/${itemIdx}/${pidx}`,
      );
      setNextChangeList1depth(res?.data.data.categoryClassList);
      return res.data;
    } catch (error: any) {
      console.error('Error fetching next list: ', error);
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
    enabled: radio1depthChangeCheck.code !== '',
  });

  //2뎁스 선택시 3뎁스 설정되게
  const getNextList2 = async () => {
    const itemIdx = categoryItems[2].idx; //다음으로 선택할 배열의 idx
    const pidx = radio2depthChangeCheck.checkValue; // 선택된 체크 박스의 idx
    try {
      const res = await classificationInstance.get(
        `/v1/category/${itemIdx}/${pidx}`,
      );
      setNextChangeList2depth(res?.data.data.categoryClassList);
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
    enabled: radio2depthChangeCheck.code !== '',
  });

  //3뎁스 선택시 4뎁스 설정되게
  const getNextList3 = async () => {
    const itemIdx = categoryItems[3].idx; //다음으로 선택할 배열의 idx
    const pidx = radio3depthChangeCheck.checkValue; // 선택된 체크 박스의 idx
    try {
      const res = await classificationInstance.get(
        `/v1/category/${itemIdx}/${pidx}`,
      );
      setNextChangeList3depth(res?.data.data.categoryClassList);
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
    enabled: radio3depthChangeCheck.code !== '',
  });

  const setNextList = (idx: number) => {
    //교과 과목 오픈여부 라디오 버튼 셋팅
    if (categoriesE && idx == 4) {
      setNextChangeList4depth(categoriesE[0]);
    }
    if (categoriesE && idx == 5) {
      setNextChangeList5depth(categoriesE[1]);
    }
  };

  useEffect(() => {
    if (radio1depthChangeCheck.code !== '') nextListData1Refetch();
    if (radio2depthChangeCheck.code !== '') nextListData2Refetch();
    if (radio3depthChangeCheck.code !== '') nextListData3Refetch();
    if (radio4depthChangeCheck.code !== '') setNextList(4);
    if (radio5depthChangeCheck.code !== '') setNextList(5);
    if (radio6depthChangeCheck.code !== '') setNextList(6);
  }, [
    radio1depthChangeCheck,
    radio2depthChangeCheck,
    radio3depthChangeCheck,
    radio4depthChangeCheck,
    radio5depthChangeCheck,
    radio6depthChangeCheck,
  ]);

  // 체크값 변경시 초기화
  useEffect(() => {
    setChangeVlaue2depth('');
    setCheckedDepthList([]);
  }, [changeVlaue1depth]);
  useEffect(() => {
    setChangeVlaue3depth('');
    setCheckedDepthList([]);
  }, [changeVlaue2depth]);
  useEffect(() => {
    setChangeVlaue4depth('');
    setCheckedDepthList([]);
    setRadio4depthChangeCheck({ title: '', checkValue: 0, code: '', key: '' });
  }, [changeVlaue3depth]);
  useEffect(() => {
    setCheckedDepthList([]);
    setChangeVlaue5depth('');
    setRadio5depthChangeCheck({ title: '', checkValue: 0, code: '', key: '' });
  }, [changeVlaue4depth]);
  useEffect(() => {
    setCheckedDepthList([]);
    setChangeVlaue6depth('');
    setRadio6depthChangeCheck({ title: '', checkValue: 0, code: '', key: '' });
  }, [changeVlaue5depth]);
  useEffect(() => {
    setCheckedDepthList([]);
  }, [changeVlaue6depth]);

  // 카테고리 선택후 아이템트리
  // 아이템 트리 불러오기 api
  const getCategoryItemTree = async () => {
    const radioChecks = [
      radio1depthChangeCheck,
      radio2depthChangeCheck,
      radio3depthChangeCheck,
      radio4depthChangeCheck,
      radio5depthChangeCheck, //TODO : api 키값 추가되면 주석 해제
      radio6depthChangeCheck,
    ];

    const keyValuePairs = radioChecks.reduce<ItemTreeKeyType>((acc, curr) => {
      if (curr.key && curr.title) {
        acc[curr.key] = curr.title;
      }
      return acc;
    }, {});

    const itemTreeKeyList = { itemTreeKeyList: [keyValuePairs] };
    console.log(
      'itemTreeKeyList 최종적으로 보내는 탭선택값: 바꿀 분류',
      itemTreeKeyList,
    );

    const res = await classificationInstance.post('/v1/item', itemTreeKeyList);
    console.log('classificationInstance 응답 : ***바꿀 분류***', res);
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
    if (changeVlaue6depth == '') return;
    categoryItemTreeDataMutate();
  }, [changeVlaue6depth]);

  useEffect(() => {
    console.log('itemTree-----', itemTree);
  }, [itemTree]);

  // 리스트 업데이트
  useEffect(() => {
    console.log('questionList', questionList);
  }, [questionList]);

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

  // 변경 분류값 전송 버튼
  const onSubmitList = () => {
    const radioChecks: RadioStateType[] = [
      radio1depthChangeCheck,
      radio2depthChangeCheck,
      radio3depthChangeCheck,
      radio4depthChangeCheck,
      radio5depthChangeCheck,
      radio6depthChangeCheck,
    ];

    const itemTreeKey = radioChecks.reduce<ItemTreeKeyType>((acc, curr) => {
      if (curr.key && curr.title) {
        acc[curr.key] = curr.title;
      }
      return acc;
    }, {});

    const data: ClassificationStateType = {
      quizCodeList: checkedList,
      categoryList: [
        {
          itemTreeKey: itemTreeKey,
          itemTreeIdxList: checkedDepthList,
        },
      ],
    };
    console.log('최종 전송 데이터 형태 분류바꾸기', data);
    mutateChangeClassification(data);
  };
  // 분류 바꾸기 (등록) api
  const putClassification = async (data: ClassificationStateType) => {
    const res = await classificationInstance.put(`/v1/item/quiz`, data);
    console.log('putClassification', res);
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
        setCheckedList([]);
        setQuestionListReset([]);
        setSelected1depthReset('');
        setChangeVlaue1depth('');
        setRadio1depthChangeCheck({
          title: '',
          checkValue: 0,
          code: '',
          key: '',
        });
      },
    });

  const changeButtonDisabled = useMemo(() => {
    if (
      changeVlaue1depth.length &&
      changeVlaue2depth.length &&
      changeVlaue3depth.length &&
      changeVlaue4depth.length &&
      changeVlaue5depth.length &&
      changeVlaue6depth.length &&
      checkedDepthList.length > 0
    ) {
      return false;
    } else {
      return true;
    }
  }, [
    changeVlaue1depth,
    changeVlaue2depth,
    changeVlaue3depth,
    changeVlaue4depth,
    changeVlaue5depth,
    changeVlaue6depth,
    checkedDepthList,
  ]);

  return (
    <Container>
      {checkedList.length ? (
        <ScrollWrapper>
          <PerfectScrollbar>
            <ChangeInfoWrapper>
              <p className="info_total">
                선택한 문항 총 {checkedList.length} 건
              </p>
              {/* 라디오 버튼 부분 */}
              {isCategoryLoaded && (
                <LoaderWrapper>
                  <Loader height="50px" size="50px" />
                </LoaderWrapper>
              )}
              {categoryItems[0] && categoryList && (
                <>
                  {/* 교육과정 */}
                  {[categoryItems[0]].map((item) => (
                    <div
                      className={`1depth-change`}
                      id={`${item.name}`}
                      key={`selected1depth ${item.idx}`}
                    >
                      <ButtonFormatRadio
                        titleText={`${item.name}`}
                        list={categoryList[0]}
                        selected={changeVlaue1depth}
                        onChange={(e) => handleRadioCheck(e)}
                        // defaultChecked={}
                        checkedInput={radio1depthChangeCheck}
                        $margin={`10px 0 0 0`}
                        branchValue={'change'}
                      />
                    </div>
                  ))}
                  {/* 학교급 */}
                  {[categoryItems[1]].map((item) => (
                    <div
                      className={`2depth-change`}
                      id={`${item.name}`}
                      key={`selected2depth ${item.idx}`}
                    >
                      <ButtonFormatRadio
                        titleText={`${item.name}`}
                        list={nextChangeList1depth}
                        selected={changeVlaue2depth}
                        onChange={(e) => handleRadioCheck(e)}
                        // defaultChecked={}
                        checkedInput={radio2depthChangeCheck}
                        branchValue={'change'}
                      />
                    </div>
                  ))}
                  {/* 학년 */}
                  {[categoryItems[2]].map((item) => (
                    <div
                      className={`3depth-change`}
                      id={`${item.name}`}
                      key={`selected3depth ${item.idx}`}
                    >
                      <ButtonFormatRadio
                        titleText={`${item.name}`}
                        list={nextChangeList2depth}
                        selected={changeVlaue3depth}
                        onChange={(e) => handleRadioCheck(e)}
                        // defaultChecked={}
                        checkedInput={radio3depthChangeCheck}
                        branchValue={'change'}
                      />
                    </div>
                  ))}
                  {/* 학기 */}
                  {[categoryItems[3]].map((item) => (
                    <div
                      className={`4depth-change`}
                      id={`${item.name}`}
                      key={`selected4depth ${item.idx}`}
                    >
                      <ButtonFormatRadio
                        titleText={`${item.name}`}
                        list={nextChangeList3depth}
                        selected={changeVlaue4depth}
                        onChange={(e) => handleRadioCheck(e)}
                        // defaultChecked={}
                        checkedInput={radio4depthChangeCheck}
                        branchValue={'change'}
                      />
                    </div>
                  ))}
                  {/* 교과 */}
                  {[categoryItems[6]].map((item) => (
                    <div
                      className={`5depth-change`}
                      id={`${item.name}`}
                      key={`selected5depth ${item.idx}`}
                    >
                      <ButtonFormatRadio
                        titleText={`${item.name}`}
                        list={nextChangeList4depth}
                        selected={changeVlaue5depth}
                        onChange={(e) => handleRadioCheck(e)}
                        // defaultChecked={}
                        checkedInput={radio5depthChangeCheck}
                        branchValue={'change'}
                      />
                    </div>
                  ))}
                  {/* 과목 */}
                  {[categoryItems[7]].map((item) => (
                    <div
                      className={`6depth-change`}
                      id={`${item.name}`}
                      key={`selected6depth ${item.idx}`}
                    >
                      <ButtonFormatRadio
                        titleText={`${item.name}`}
                        list={nextChangeList5depth}
                        selected={changeVlaue6depth}
                        onChange={(e) => handleRadioCheck(e)}
                        // defaultChecked={}
                        checkedInput={radio6depthChangeCheck}
                        branchValue={'change'}
                      />
                    </div>
                  ))}
                </>
              )}

              <div className="meta_accordion_select">
                {changeVlaue1depth &&
                  changeVlaue2depth &&
                  changeVlaue3depth &&
                  changeVlaue4depth &&
                  changeVlaue5depth &&
                  changeVlaue6depth && (
                    <>
                      <strong>세부 검색조건</strong>

                      <Accordion
                        $backgroundColor={`${COLOR.GRAY}`}
                        title={`${radio1depthChangeCheck.title}/${radio2depthChangeCheck.title}/${radio3depthChangeCheck.title}학년/${radio4depthChangeCheck.title}/${radio5depthChangeCheck.title}/${radio6depthChangeCheck.title}`}
                        id={`${radio1depthChangeCheck.title}/${radio2depthChangeCheck.title}/${radio3depthChangeCheck.title}학년/${radio4depthChangeCheck.title}/${radio5depthChangeCheck.title}/${radio6depthChangeCheck.title}`}
                        $margin={`0 0 20px 0`}
                        defaultChecked={true}
                      >
                        <>
                          {categoryItemTreeData ? (
                            <>
                              {itemTree.length ? (
                                <>
                                  {itemTree.length !== 0 && (
                                    <>
                                      {itemTree.map((el) => (
                                        <div key={`${el.itemTreeKey}`}>
                                          {el.itemTreeList.map((item) => (
                                            <DepthBlock
                                              key={`depthList${item.code} ${item.name}`}
                                              classNameList={`depth-${item.level}`}
                                              id={item.idx}
                                              branchValue={'change'}
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
                        </>
                      </Accordion>
                    </>
                  )}
              </div>
            </ChangeInfoWrapper>
          </PerfectScrollbar>
        </ScrollWrapper>
      ) : (
        <ValueNoneWrapper>
          <ValueNone textOnly info={'STEP2 문항을 선택해주세요'} />
        </ValueNoneWrapper>
      )}
      <ButtonWrapper>
        <Button
          $filled
          cursor
          disabled={changeButtonDisabled}
          onClick={() => onSubmitList()}
        >
          <span>
            바꾸기 <MdPublishedWithChanges />
          </span>
        </Button>
      </ButtonWrapper>
    </Container>
  );
}
const Container = styled.div`
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

const ChangeInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  margin-bottom: 70px;

  .info_total {
    color: #fff;
    font-weight: bold;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    background-color: ${COLOR.FONT_NAVI};
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
