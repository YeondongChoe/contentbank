import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';

import { useIsMutating, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
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
import { classificationInstance } from '../../../api/axios';
import {
  Accordion,
  ButtonFormatRadio,
  DepthBlock,
  Search,
} from '../../../components/molecules';
import { quizListAtom } from '../../../store/quizListAtom';
import {
  ItemCategoryType,
  ItemTreeListType,
  ItemTreeType,
  QuizListType,
} from '../../../types';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { COLOR } from '../../constants/COLOR';

import { QuizList } from './list';

interface RadioState {
  title: string;
  checkValue: number;
  code: string;
  key: string;
}

interface ClassificationState {
  quizCodeList: string[];
  categoryList: {
    itemTreeKey?: Record<string, string>;
    itemTreeIdxList?: number[];
    quizCategory?: Record<string, string>;
  }[];
}

export function Classification() {
  const [quizList, setQuizList] = useRecoilState(quizListAtom);
  const [questionList, setQuestionList] = useState<QuizListType[]>([]);
  const [sortedList, setSortedList] = useState<QuizListType[]>([]);
  const [radio1depthCheck, setRadio1depthCheck] = useState<RadioState>({
    title: '',
    checkValue: 0,
    code: '',
    key: '',
  });
  const [radio2depthCheck, setRadio2depthCheck] = useState<RadioState>({
    title: '',
    checkValue: 0,
    code: '',
    key: '',
  });
  const [radio3depthCheck, setRadio3depthCheck] = useState<RadioState>({
    title: '',
    checkValue: 0,
    code: '',
    key: '',
  });
  const [radio4depthCheck, setRadio4depthCheck] = useState<RadioState>({
    title: '',
    checkValue: 0,
    code: '',
    key: '',
  });
  const [radioEtc1Check, setRadioEtc1Check] = useState<RadioState>({
    title: '',
    checkValue: 0,
    code: '',
    key: '',
  });
  const [radioEtc2Check, setRadioEtc2Check] = useState<RadioState>({
    title: '',
    checkValue: 0,
    code: '',
    key: '',
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
    // console.log(categoryData && categoryData);
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
    const response = await classificationInstance.get('/v1/category/group/A');
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
    if (groupsData) {
      fetchCategoryItems(groupsData);
    }
  }, [groupsData]);

  // 카테고리의 그룹 아이템 조회
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
      // console.error('Error fetching next list: ', error?.data?.code);
      if (error.data?.code == 'GE-002') postRefreshToken();
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

      case 'etc1':
        setSelectedCategoryEtc1(e.currentTarget.value);
        setRadioEtc1Check({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
          key: itemId as string,
        });
        break;
      case 'etc2':
        setSelectedCategoryEtc2(e.currentTarget.value);
        setRadioEtc2Check({
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
      // console.error('Error fetching next list: ', error.data?.code);
      if (error.data?.code == 'GE-002') postRefreshToken();
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
      // console.error('Error fetching next list: ', error.data?.code);
      if (error.data?.code == 'GE-002') postRefreshToken();
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
    try {
      const res = await classificationInstance.get(
        `/v1/category/${itemIdx}/${pidx}`,
      );
      setNextList3depth(res?.data.data.categoryClassList);
      return res.data;
    } catch (error: any) {
      // console.error('Error fetching next list: ', error.data?.code);
      if (error.data?.code == 'GE-002') postRefreshToken();
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
    setItemTree([]);
  }, [selected1depth]);
  useEffect(() => {
    setSelected3depth('');
    setItemTree([]);
  }, [selected2depth]);
  useEffect(() => {
    setSelected4depth('');
    setRadio4depthCheck({ title: '', checkValue: 0, code: '', key: '' });
    setItemTree([]);
  }, [selected3depth]);
  useEffect(() => {
    setSelectedCategoryEtc1('');
    setSelectedCategoryEtc2('');
    setRadioEtc1Check({ title: '', checkValue: 0, code: '', key: '' });
    setRadioEtc2Check({ title: '', checkValue: 0, code: '', key: '' });
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
      // console.error('Error fetching next list: ', error?.data??.code);
      if (error?.data?.code == 'GE-002') {
        postRefreshToken();
        groupsDataRefetch();
      }
    }
  };

  const saveCheckItems = () => {
    console.log('saveCheckItems', [
      radio1depthCheck,
      radio2depthCheck,
      radio3depthCheck,
      radio4depthCheck,
      radioEtc1Check,
      radioEtc2Check,
    ]);

    if (unitClassificationList.length < 6) {
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
    const reset = { title: '', checkValue: 0, code: '', key: '' };
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
    console.log('unitClassificationList', unitClassificationList);
    const selectedClassification = unitClassificationList[idx];

    if (selectedClassification) {
      if (selectedClassification[0]) {
        setRadio1depthCheck(selectedClassification[0]);
        setSelected1depth(selectedClassification[0]?.code);
      } else {
        setRadio1depthCheck({ title: '', checkValue: 0, code: '', key: '' });
        setSelected1depth('');
      }

      if (selectedClassification[1]) {
        setRadio2depthCheck(selectedClassification[1]);
        setSelected2depth(selectedClassification[1]?.code);
      } else {
        setRadio2depthCheck({ title: '', checkValue: 0, code: '', key: '' });
        setSelected2depth('');
      }

      if (selectedClassification[2]) {
        setRadio3depthCheck(selectedClassification[2]);
        setSelected3depth(selectedClassification[2]?.code);
      } else {
        setRadio3depthCheck({ title: '', checkValue: 0, code: '', key: '' });
        setSelected3depth('');
      }

      if (selectedClassification[3]) {
        setRadio4depthCheck(selectedClassification[3]);
        setSelected4depth(selectedClassification[3]?.code);
      } else {
        setRadio4depthCheck({ title: '', checkValue: 0, code: '', key: '' });
        setSelected4depth('');
      }

      if (selectedClassification[4]) {
        setRadioEtc1Check(selectedClassification[4]);
        setSelectedCategoryEtc1(selectedClassification[4]?.code);
      } else {
        setRadioEtc1Check({ title: '', checkValue: 0, code: '', key: '' });
        setSelectedCategoryEtc1('');
      }

      if (selectedClassification[5]) {
        setRadioEtc2Check(selectedClassification[5]);
        setSelectedCategoryEtc2(selectedClassification[5]?.code);
      } else {
        setRadioEtc2Check({ title: '', checkValue: 0, code: '', key: '' });
        setSelectedCategoryEtc2('');
      }
    }
  };

  const sortedArr = () => {
    console.log('아이템트리키 들어가야할 목록', unitClassificationList);
    console.log('아이템idx 들어가야할 목록', checkedDepthList);

    const arr = unitClassificationList.map((classification) => {
      const itemTreeKey = classification.reduce(
        (acc, curr) => {
          if (curr.title) {
            acc[curr.key] = curr.title;
          }
          return acc;
        },
        {} as Record<string, string>,
      );
      return {
        itemTreeKey,
        itemTreeIdxList: checkedDepthList,
      };
    });

    return arr;
  };
  // 분류 등록 버튼
  const onSubmit = () => {
    // 최종적으로 전송 될 데이터
    console.log('퀴즈코드리스트 들어가야할 목록', checkedList);

    const categoryListArr = sortedArr();
    const data: ClassificationState = {
      quizCodeList: checkedList,
      categoryList: categoryListArr,
    };
    console.log('최종 전송 데이터 형태', data);
    mutateChangeClassification(data);
  };

  // 분류 바꾸기 (등록) api
  const putClassification = async (data: ClassificationState) => {
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
      },
    });

  useEffect(() => {
    // console.log('itemTree ------ ', itemTree);
  }, [itemTree]);

  // 깊이가 있는 리스트 체크박스
  const handleSingleCheck = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedDepthList((prev) => [...prev, id]);
    } else {
      setCheckedDepthList(checkedDepthList.filter((el) => el !== id));
    }
  };

  // 추가된 문항 데이터 TODO : 전역으로 저장한 추가된 문항 데이터들 불러오기
  // 화면 진입시 문항 데이터들 리스트ui에넣기
  useEffect(() => {
    // console.log('quizList-----------', quizList);
    setQuestionList(quizList);
  }, []);

  const sortList = () => {
    const sorted = questionList.filter((el) => checkedList.includes(el.code));
    // console.log('sortedList------------', sorted);
    setSortedList(sorted);
  };

  useEffect(() => {
    // console.log('checkedList------------', checkedList);
    sortList();
  }, [checkedList]);
  useEffect(() => {}, [sortedList, questionList]);

  // 교과정보 추가버튼 disable 처리
  const addButtonBool = useMemo(() => {
    if (
      unitClassificationList.length < 5 &&
      radio1depthCheck?.code !== '' &&
      radio2depthCheck?.code !== '' &&
      radio3depthCheck?.code !== '' &&
      radio4depthCheck?.code !== ''
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

  return (
    <Container>
      <ResizeLayoutWrapper>
        <ResizeLayout
          height={'calc(100vh - 100px)'}
          column={'3rd'}
          item1Width={300}
          item1={
            <QuizList
              questionList={questionList}
              showTitle
              showCheckBox
              fontBold
              setCheckedList={setCheckedList}
              isDataColor
            />
          }
          item2={
            <ScrollWrapper>
              <PerfectScrollbar>
                <ViewerWrapper>
                  <Title>
                    <span className="title_top">문항뷰어</span>
                  </Title>
                  <MathViewerWrapper>
                    {sortedList.length > 0 ? (
                      sortedList[sortedList.length - 1]?.quizItemList?.map(
                        (el) => (
                          <div key={`${el?.code} quizItemList sortedList`}>
                            <MathViewer>
                              {el?.type == 'TITLE' ? (
                                el.content && (
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: el.content || '',
                                    }}
                                  ></div>
                                )
                              ) : (
                                <></>
                              )}
                              {el?.type == 'QUESTION' ? (
                                el.content && (
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: el.content || '',
                                    }}
                                  ></div>
                                )
                              ) : (
                                <></>
                              )}
                              {el?.type == 'EXAMPLE' ? (
                                el.content && (
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: el.content || '',
                                    }}
                                  ></div>
                                )
                              ) : (
                                <></>
                              )}
                              {el?.type == 'ANSWER' ? (
                                el.content && (
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: el.content || '',
                                    }}
                                  ></div>
                                )
                              ) : (
                                <></>
                              )}
                              {el?.type == 'TIP' ? (
                                el.content && (
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: el.content || '',
                                    }}
                                  ></div>
                                )
                              ) : (
                                <></>
                              )}
                              {el?.type == 'COMMENTARY' ? (
                                el.content && (
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: el.content || '',
                                    }}
                                  ></div>
                                )
                              ) : (
                                <></>
                              )}
                              {el?.type == 'HINT' ? (
                                el.content && (
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: el.content || '',
                                    }}
                                  ></div>
                                )
                              ) : (
                                <></>
                              )}
                            </MathViewer>
                          </div>
                        ),
                      )
                    ) : (
                      <>
                        <ValueNone info="문항을 선택해 주세요" textOnly />
                      </>
                    )}
                  </MathViewerWrapper>
                </ViewerWrapper>
              </PerfectScrollbar>
            </ScrollWrapper>
          }
          item3Width={600}
          item3={
            <ScrollWrapper>
              <PerfectScrollbar>
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
                            <span>{el.map((item) => `${item.title} / `)}</span>
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

                    {radio1depthCheck?.code !== '' &&
                      selected1depth !== '' &&
                      [categoryItems[1]].map((item) => (
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

                    {radio2depthCheck?.code !== '' &&
                      selected2depth !== '' &&
                      [categoryItems[2]].map((item) => (
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
                    {radio3depthCheck?.code !== '' &&
                      selected3depth !== '' &&
                      [categoryItems[3]].map((item) => (
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
                          {/* Total : {itemTree.length && itemTree.length} */}
                        </p>
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
                                  <>
                                    {itemTree.map((el) => (
                                      <div key={`${el.itemTreeKey}`}>
                                        {el.itemTreeList.map((item) => (
                                          <DepthBlock
                                            key={`depthList${item?.idx} ${item.name}`}
                                            classNameList={`depth-${item.level}`}
                                            id={item?.code}
                                            name={item.name}
                                            value={item?.idx}
                                            onChange={(e) =>
                                              handleSingleCheck(
                                                e.target.checked,
                                                item?.idx,
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
                          </PerfectScrollbar>
                        </DepthBlockScrollWrapper>
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
                                id={`${item.name}`}
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
                                id={`${item.name}`}
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
          }
        />
      </ResizeLayoutWrapper>
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
const ResizeLayoutWrapper = styled.div`
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
  height: calc(100vh - 100px);
`;
const ScrollWrapper = styled.div`
  overflow-y: auto;
  height: calc(100vh - 100px);
  width: 100%;
  background-color: ${COLOR.LIGHT_GRAY};

  .line {
    border-top: 1px solid ${COLOR.BORDER_GRAY};
    margin: 10px 0;

    &.bottom_text {
      font-size: 13px;
      padding-top: 2px;
    }
  }
`;
const DepthBlockScrollWrapper = styled.div`
  overflow-y: auto;
  /* height: 300px; */
  width: 100%;
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
const ValueNoneWrapper = styled.div`
  display: flex;
`;
const ViewerWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
const MathViewerWrapper = styled.div`
  padding: 20px;
`;
