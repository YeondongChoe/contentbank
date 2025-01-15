import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useIsMutating, useMutation, useQuery } from '@tanstack/react-query';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  Button,
  CheckBoxI,
  Icon,
  IconButton,
  Loader,
  MathViewer,
  ResizeLayout,
  Select,
  ValueNone,
  openToastifyAlert,
} from '../..';
import {
  classificationInstance,
  quizService,
  resourceServiceInstance,
} from '../../../api/axios';
import {
  Accordion,
  ButtonFormatRadio,
  ButtonFormatMultiRadio,
  DepthBlock,
  Search,
} from '../../../components/molecules';
import { quizListAtom } from '../../../store/quizListAtom';
import {
  CategoryGroup,
  IdxNamePair,
  ItemCategoryType,
  ItemTreeListType,
  ItemTreeType,
  QuizCategory,
  QuizCategoryList,
  QuizClassificationData,
  QuizListType,
} from '../../../types';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { windowOpenHandler } from '../../../utils/windowHandler';
import { COLOR } from '../../constants/COLOR';

interface RadioStateType {
  title: string;
  checkValue: number;
  code: string;
  key: string;
  classification: string;
}

interface ItemTreeIdxListType {
  itemTreeIdxList: number[];
}

type UnitClassificationType =
  | CategoryGroup[]
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

  const [radioEtc1Check, setRadioEtc1Check] = useState<RadioStateType[]>([]);
  const [radioEtc2Check, setRadioEtc2Check] = useState<RadioStateType[]>([]);

  const [selectedCategoryEtc1, setSelectedCategoryEtc1] = useState<string[]>([
    '',
  ]);
  const [selectedCategoryEtc2, setSelectedCategoryEtc2] = useState<string[]>([
    '',
  ]);

  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [checkedDepthList, setCheckedDepthList] = useState<number[]>([]);

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

  const [categoryTypeList, setCategoryTypeList] = useState<string>('');
  const [categoryNameList, setCategoryNameList] = useState<string>('');
  //첫번째 카테고리 선택 리스트
  const [idxNamePairsA, setIdxNamePairsA] = useState<IdxNamePair[][]>([]);
  const [titleA, setTitleA] = useState<string[]>([]);
  const [idxNamePairsDD, setIdxNamePairsDD] = useState<IdxNamePair[][]>([]);
  const [groupId, setGroupId] = useState<string | null>(null);
  const [categoriesA, setCategoriesA] = useState<ItemCategoryType[]>([]);
  const [categoriesDD1, setCategoriesDD1] = useState<ItemCategoryType[]>([]);
  const [categoriesDD2, setCategoriesDD2] = useState<ItemCategoryType[]>([]);

  const [radioChecks, setRadioChecks] = useState<Record<string, any>>({});
  const [selectedDepth, setSelectedDepth] = useState<Record<string, string>>(
    {},
  );
  const [nextLists, setNextLists] = useState<Record<string, any>>({});
  const [prevSelectedDepth, setPrevSelectedDepth] = useState<string[]>([]);

  // 추가 선택
  const [selectedDDCategories, setSelectedDDCategories] = useState<
    Record<string, string[]>
  >({});
  const [radioDDChecks, setRadioDDChecks] = useState<
    Record<
      string,
      { title: string; checkValue: number; code: string; key: string }[]
    >
  >({});

  //리스트 솔팅 정렬
  const [columnsCount, setColumnsCount] = useState<number>(2);
  const [itemHeight, setItemHeight] = useState<string | undefined>('350px');
  useEffect(() => {}, [columnsCount, itemHeight]);

  // 메뉴 목록 조회 api (셋팅값)
  const getMenuSetting = async () => {
    const res = await resourceServiceInstance.get(
      `/v1/menu/path?url=contentClassificationSetting`,
    );
    console.log('getMenuSetting--------', res);
    return res.data.data;
  };
  const {
    data: menuSettingData,
    isLoading: isMenuSettingLoading,
    refetch: menuSettingRefetch,
  } = useQuery({
    queryKey: ['get-menuSetting'],
    queryFn: getMenuSetting,
    meta: {
      errorMessage: 'get-menuSetting 에러 메세지',
    },
  });
  // 셋팅 데이터 바뀔때 선택 구성요소값
  useEffect(() => {
    if (menuSettingData) {
      //   idxs : 해당 키값으로 2뎁스 셀렉트 조회
      console.log(
        '메뉴 셋팅값 ------ ',
        menuSettingData.menuDetailList.length,
        menuSettingData,
      );

      // 셋팅값 없을시 얼럿
      if (menuSettingData.menuDetailList.length == 0) {
        // openToastifyAlert({
        //   type: 'error',
        //   text: '셋팅에서 우선 셀렉트값을 선택해주세요',
        // });
        alert('셋팅에서 우선 셀렉트값을 선택해주세요!');
        window.close();
        return;
      }

      const filteredCategoriesA: any[] = [];
      const filteredCategoriesDD: any[] = [];

      // idx 와 names를 인덱스 순번에 맞게 짝지어 배치
      menuSettingData?.menuDetailList.forEach(
        (
          menuDetail: {
            [x: string]: any;
            idxList: string;
            nameList: string;
            inputList: string;
            searchList: string;
            viewList: string;
          },
          index: any,
        ) => {
          const idxList = menuDetail?.idxList?.split(',');
          const nameList = menuDetail?.nameList?.split(',');
          const inputList = menuDetail?.inputList?.split(',');
          const searchList = menuDetail?.searchList?.split(',');
          const viewList = menuDetail?.viewList?.split(',');

          if (menuDetail.groupCode == 'MOREINFO') {
            const categories = idxList.map((idx, idxIndex) => ({
              idx,
              name: nameList[idxIndex],
              code: nameList[idxIndex],
              inputType: inputList[idxIndex],
              searchList: searchList[idxIndex],
              // viewList: viewList[idxIndex] ,
            }));
            filteredCategoriesDD.push(categories);
          } else {
            const categories = idxList.map((idx, idxIndex) => ({
              idx,
              name: nameList[idxIndex],
              code: nameList[idxIndex],
              inputType: inputList[idxIndex],
              searchList: searchList[idxIndex],
              viewList: viewList[idxIndex],
            }));
            filteredCategoriesA.push(categories);
          }
        },
      );

      console.log(
        '메뉴데이터 솎아내기 ',
        filteredCategoriesA,
        filteredCategoriesDD,
      );
      setIdxNamePairsA(filteredCategoriesA);
      setIdxNamePairsDD(filteredCategoriesDD);
    }
  }, [menuSettingData]);

  useEffect(() => {
    if (menuSettingData) {
      // 첫번째 카테고리의 그룹 아이템 조회
    }
  }, [menuSettingData]);
  useEffect(() => {
    console.log('---------titleA ----- ', titleA);
  }, [titleA]);

  useEffect(() => {
    if (
      idxNamePairsA[0] &&
      idxNamePairsA[0][0].idx &&
      Array.isArray(idxNamePairsA[0])
    ) {
      console.log('idxNamePairsA ----- ', idxNamePairsA);
      console.log('idxNamePairsA[0].idx ----- ', idxNamePairsA[0][0].idx);
      fetchCategoryItems(idxNamePairsA[0][0].idx, setCategoriesA);

      // 단원 분류 타이틀
      const titles = idxNamePairsA[0].map((el) => el.name);
      setTitleA(titles);
    }
    if (
      idxNamePairsDD[0] &&
      idxNamePairsDD[0][0].idx &&
      Array.isArray(idxNamePairsDD[0])
    ) {
      console.log('idxNamePairsDD ----- ', idxNamePairsDD);
      console.log('idxNamePairsDD[0].idx ----- ', idxNamePairsDD[0][0]?.idx);
      fetchCategoryItems(idxNamePairsDD[0][0]?.idx, setCategoriesDD1);
      fetchCategoryItems(idxNamePairsDD[0]?.[1]?.idx, setCategoriesDD2);
    }
  }, [idxNamePairsA, idxNamePairsDD]);

  const fetchCategoryItems = async (
    typeList: string | number,
    setCategory: React.Dispatch<React.SetStateAction<ItemCategoryType[]>>,
  ) => {
    if (typeList)
      try {
        const response = await classificationInstance.get(
          `/v1/category/class/${typeList}`,
        );

        setCategory(response.data.data.categoryClassList);
        return response.data.data.categoryClassList;
      } catch (error: any) {
        if (error.data?.code == 'GE-002') postRefreshToken();
      }
  };

  useEffect(() => {
    console.log('categoriesA ----- ', categoriesA);
  }, [categoriesA, categoriesDD1, categoriesDD2]);

  // 라디오 버튼 설정
  const handleRadioCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const depth =
      e.target.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement?.classList[0];
    const id =
      e.target.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement?.id;
    const itemId = id?.split('/') as string[];

    console.log('depth-----,itemId----------', depth, itemId);
    const className = e.currentTarget.className || 'default-class';
    const name = e.currentTarget.name || 'default-name';
    const value = e.currentTarget.value;

    console.log(
      'className:',
      className,
      'name:',
      name,
      'value:',
      value,
      'classification:',
      itemId[1],
    );

    if (!depth || !itemId) return;

    // 선택된 값의 뎁스 추출
    const currentDepthIndex = parseInt(depth.replace('depth', ''), 10);

    // 4뎁스 선택이후 아이템트리 api 호출
    if (currentDepthIndex > 3 && !isPending) {
      categoryItemTreeDataMutate();
    }

    // 선택된 값을 저장
    setSelectedDepth((prev) => ({
      ...prev,
      [depth]: name,
    }));

    setRadioChecks((prev) => ({
      ...prev,
      [depth]: {
        title: name,
        checkValue: Number(value),
        code: className,
        key: itemId[0],
        classification: itemId[1],
      },
    }));

    // 다음 뎁스 데이터 호출
    // const currentDepthIndex = parseInt(depth.replace('depth', ''), 10);
    const nextDepth = `${currentDepthIndex + 1}depth`;
    const nextdepth: number = parseInt(depth.replace('depth', ''), 10);
    console.log('nextdepth --', nextdepth);
    const nextItemIdx = idxNamePairsA[0]?.[nextdepth]?.idx;

    console.log(
      'nextDepth:',
      nextDepth,
      'nextItemIdx:',
      nextItemIdx,
      'value:',
      value,
    );

    if (!nextItemIdx) {
      console.warn('Cannot find nextItemIdx for depth:', depth);
      return;
    }

    try {
      const res = await classificationInstance.get(
        `/v1/category/${nextItemIdx}/${value}`,
      );

      // console.log('res.data.data', res.data.data);
      setNextLists((prev) => ({
        ...prev,
        [nextDepth]: res.data.data.categoryClassList,
      }));
      console.log(
        `다음 리스트 불러오기 --- ${nextDepth}:`,
        res.data.data.categoryClassList,
      );
    } catch (error: any) {
      if (error.data?.code == 'GE-002') postRefreshToken();

      console.error('Error fetching next list:', error);
    }
  };

  useEffect(() => {
    console.log('nextLists -----', nextLists);
  }, [nextLists]);

  useEffect(() => {
    console.log('selectedDepth -----', selectedDepth);
    //이전 뎁스의 값이 변경될시 다음뎁스의 값 초기화
    // 모든 선택된 뎁스를 배열로 변환
    const depthKeys = Object.keys(selectedDepth);
    const currentSelectedDepthValues = depthKeys.map(
      (key) => selectedDepth[key],
    );

    // 변경점 찾기
    let changedIndex = -1;
    for (let i = 0; i < currentSelectedDepthValues.length; i++) {
      if (prevSelectedDepth[i] !== currentSelectedDepthValues[i]) {
        changedIndex = i;
        break;
      }
    }

    // 변경된 뎁스 이후로 초기화
    if (changedIndex !== -1) {
      const lastDepthIndex = changedIndex + 1;

      setNextLists((prev) => {
        const updated = Object.keys(prev).reduce(
          (acc, key) => {
            const keyDepthIndex = parseInt(key.replace('depth', ''), 10);
            if (keyDepthIndex <= lastDepthIndex) {
              acc[key] = prev[key]; // 현재 뎁스와 이전 뎁스만 유지
            }
            return acc;
          },
          {} as Record<string, any>,
        );
        return updated;
      });

      setRadioChecks((prev) => {
        const updated = Object.keys(prev).reduce(
          (acc, key) => {
            const keyDepthIndex = parseInt(key.replace('depth', ''), 10);
            if (keyDepthIndex <= lastDepthIndex) {
              acc[key] = prev[key]; // 현재 뎁스와 이전 뎁스만 유지
            }
            return acc;
          },
          {} as Record<string, any>,
        );
        return updated;
      });

      setSelectedDepth((prev) => {
        const updated = Object.keys(prev).reduce(
          (acc, key) => {
            const keyDepthIndex = parseInt(key.replace('depth', ''), 10);
            if (keyDepthIndex <= lastDepthIndex) {
              acc[key] = prev[key]; // 현재 뎁스와 이전 뎁스만 유지
            }
            return acc;
          },
          {} as Record<string, string>,
        );
        return updated;
      });

      console.log(`States reset after depth index: ${changedIndex}`);
    }

    // 현재 선택 상태를 이전 선택 상태로 업데이트
    setPrevSelectedDepth([...currentSelectedDepthValues]);
  }, [selectedDepth]);

  useEffect(() => {
    setItemTree([]);
  }, [prevSelectedDepth]);

  // 다중 라디오 버튼 설정
  const handleMultiRadioCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const depth =
      e.target.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement?.classList[0];
    const id =
      e.target.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement?.id;
    const itemId = id?.split('/') as string[];

    const title = e.currentTarget.name;
    const code = e.currentTarget.className;
    const value = e.currentTarget.value;

    switch (code) {
      case idxNamePairsDD[0][0].code:
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
                key: itemId[0],
                classification: itemId[1],
              },
            ];
          }
        });
        break;

      case idxNamePairsDD[0][1].code:
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
                key: itemId[0],
                classification: itemId[1],
              },
            ];
          }
        });
        break;
      default:
        break;
    }
  };

  // 카테고리 선택후 아이템트리
  // 아이템 트리 불러오기 api
  const postCategoryItemTree = async () => {
    const queryParams = Object.keys(nextLists).reduce<Record<string, string>>(
      (acc, depthKey) => {
        const list = nextLists[depthKey]; // 각 depth의 배열 가져오기
        const code = list?.[0]?.code || depthKey; // 배열의 첫 번째 아이템의 code 사용
        const value = selectedDepth[depthKey] || ''; // selectedDepth에서 해당 depth의 값 가져오기
        if (code && value) {
          acc[code] = value; // 값이 존재할 경우 쿼리 파라미터에 추가
        }
        return acc;
      },
      {},
    );

    console.log('Generated Query Params:', queryParams);

    // 모든 라디오가 선택되지 않은 경우 처리
    // const allSelected = Object.values(queryParams).length === nextLists.length;
    // if (!allSelected) {
    // 	console.warn('모든 라디오 버튼이 선택되지 않았습니다.');
    // 	throw new Error('모든 라디오 버튼이 선택되지 않았습니다.');
    // }

    // 쿼리 스트링 생성
    const queryString = Object.entries(queryParams)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join('&');

    const url = `/v2/item?${queryString}`;

    const res = await classificationInstance.get(url);
    console.log('반환된 아이템 트리 ---- ', res);
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

  const saveCheckItems = () => {
    console.log(
      'radioEtc1Check,radioEtc2Check',
      radioEtc1Check,
      radioEtc2Check,
    );

    // 동적으로 라디오 버튼 상태를 가져옴
    const dynamicChecks = Object.keys(radioChecks).map(
      (key) => radioChecks[key],
    );

    // 새로운 교과정보 생성
    const newClassification: UnitClassificationType[] = [
      ...dynamicChecks.flat(),
      radioEtc1Check,
      radioEtc2Check,
      ...checkedItems,
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
    // onResetList();
  };

  //삭제
  const deleteUnitClassification = (idx: number) => {
    setUnitClassificationList((prevList) => [
      ...prevList.slice(0, idx),
      ...prevList.slice(idx + 1),
    ]);

    setCheckedItems([]);
  };

  const transformData = (): CategoryGroup[] => {
    console.log('아이템트리키 들어가야할 목록', unitClassificationList);

    return unitClassificationList.map((group) => {
      const result: CategoryGroup = {};

      group.forEach((item) => {
        if (
          item &&
          typeof item === 'object' &&
          'code' in item &&
          'title' in item &&
          'classification' in item &&
          typeof (item as RadioStateType).code === 'string' &&
          typeof (item as RadioStateType).title === 'string' &&
          typeof (item as RadioStateType).classification === 'string'
        ) {
          // classification 값이 없으면 초기화
          if (!result[item.classification]) {
            result[item.classification] = [];
          }

          // 존재하는 경우 push
          result[item.classification]!.push({
            code: item.code,
            name: item.title,
          });
        }
      });

      return result;
    });
  };
  // 분류 등록 버튼
  const onSubmit = () => {
    // 최종적으로 전송 될 데이터
    console.log('퀴즈코드리스트 들어가야할 목록', checkedList);

    const categoryListArr: CategoryGroup[] = transformData();
    console.log('categoryList 들어가야할 목록------', categoryListArr);

    const data: QuizClassificationData = {
      commandCode: 1,
      quizCodeList: checkedList,
      categoryList: categoryListArr,
    };
    console.log('최종 전송 데이터 형태', data);
    mutateChangeClassification(data);
  };

  // 분류 바꾸기 (등록) api
  const putClassification = async (data: QuizClassificationData) => {
    const res = await quizService.put(`/v1/item`, data);
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
        // onResetList();
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
  // (그룹데이터 업데이트된 상테로 다시 불러오기)
  const getQuiz = async () => {
    const idxArray = quizList.map((list) => list.idx);
    const idxList = idxArray.join(',');
    console.log('진입시 불러올 문항 데이터 idx', idxList);
    const res = await quizService.get(`/v1/quiz/${idxList}`);
    return res.data.data.quizList;
  };
  const { data: quizData, refetch: quizDataRefetch } = useQuery({
    queryKey: ['get-idx-quizList'],
    queryFn: getQuiz,
    meta: {
      errorMessage: 'get-idx-quizList 에러 메세지',
    },
    enabled: quizList.length > 0,
  });
  useEffect(() => {
    console.log('quizData-----------', quizData);
    // 퀴즈리스트 idx 값으로 최신 리스트 다시불러오기
    if (quizData) setQuestionList(quizData);
  }, [quizData]);

  useEffect(() => {
    groupElementsByCode();
  }, [questionList]);
  // 그룹 아이디끼리 묶기
  // DOM에서 그룹코드에 따라 요소를 동적으로 그룹화
  const groupElementsByCode = () => {
    const listWrapper = document.querySelector('.list_wrapper');
    if (!listWrapper) return;

    const groupMap: Record<string, HTMLElement> = {};

    // 그룹 ID로 부모 요소 생성
    questionList.forEach((item) => {
      if (item.groupCode) {
        if (
          !groupMap[item.groupCode] &&
          !document.getElementById(item.groupCode)
        ) {
          const parentDiv = document.createElement('div') as HTMLElement;
          parentDiv.id = item.groupCode;
          console.log('parentDiv---생성된', parentDiv);
          parentDiv.className = `groupedItemsContainer ${columnsCount == 2 ? 'colum_2' : 'colum_1'}`;

          const groupCheckbox = document.createElement('input');
          groupCheckbox.type = 'checkbox';
          groupCheckbox.id = `groupCheckbox_${item.groupCode}`;
          groupCheckbox.className = 'group-checkbox';

          const groupCheckboxLabel = document.createElement('label');
          groupCheckboxLabel.htmlFor = `groupCheckbox_${item.groupCode}`;
          groupCheckboxLabel.innerText = '그룹 선택';
          groupCheckboxLabel.className = 'group_checkbox_label';

          parentDiv.appendChild(groupCheckbox);
          parentDiv.appendChild(groupCheckboxLabel);
          // parentDiv.appendChild(ungroupButton);

          groupMap[item.groupCode] = parentDiv;
          listWrapper.appendChild(parentDiv);
        }
      }
    });
    // 동일한 그룹 ID를 가진 리스트 요소를 이동
    questionList.forEach((item) => {
      if (item.groupCode) {
        const element = document.getElementById(item.code);
        console.log('동일한 그룹 ID를 가진 리스트 요소를 이동', element);
        const target =
          element &&
          (element.parentNode?.parentNode?.parentNode?.parentNode
            ?.parentNode as HTMLElement);

        console.log('target이동될 타겟', target);

        const parentDiv = groupMap[item.groupCode];

        if (parentDiv && target && target instanceof HTMLElement) {
          parentDiv.appendChild(target); // 기존 요소를 새 부모로 이동
        }
      }
    });
  };
  // 그룹 체크
  const removeOnFromCheckList = () => {
    setCheckedList((prev) => prev.filter((item) => item !== 'on'));
  };
  // 그룹 체크박스 상태 변경 처리 함수
  const handleGroupCheckboxChange = (e: Event) => {
    const target = e.target as HTMLInputElement;

    // group-checkbox인 경우에만 처리
    if (target && target.classList.contains('group-checkbox')) {
      const isChecked = target.checked;

      // 그룹 컨테이너 내부의 모든 체크박스 선택
      const parentDiv = target.closest('.groupedItemsContainer');
      if (parentDiv) {
        const childCheckboxes = parentDiv.querySelectorAll(
          '.groupedItemsContainer input[type="checkbox"]',
        );

        // 모든 자식 체크박스 상태 업데이트
        childCheckboxes.forEach((checkbox) => {
          const inputElement = checkbox as HTMLInputElement;

          // 체크 상태 동기화
          inputElement.checked = isChecked;

          // CheckList 업데이트 (React 상태 관리)
          const id = inputElement.value;
          if (isChecked) {
            setCheckedList((prev) => [...prev, id]);
          } else {
            setCheckedList((prev) => prev.filter((el) => el !== id));
          }
        });
        // 'on' 제거
        removeOnFromCheckList();
      }
    }
  };

  useEffect(() => {
    // 이벤트 리스너 등록
    document.addEventListener('change', handleGroupCheckboxChange);

    // 정리 함수: 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('change', handleGroupCheckboxChange);
    };
  }, [checkedList]);
  // 동적으로 바뀔 때 그룹ui 클래스명 재할당
  useEffect(() => {
    const groupedItemsContainers = document.querySelectorAll(
      '.groupedItemsContainer',
    );

    groupedItemsContainers.forEach((element) => {
      element.className = `groupedItemsContainer ${
        columnsCount === 2 ? 'colum_2' : 'colum_1'
      }`;
    });
  }, [columnsCount]);

  const sortList = () => {
    const sorted = questionList.filter((el) => checkedList.includes(el.code));
    console.log('sortedList------------', sorted);
    setSortedList(sorted);
    // onResetList();
  };

  useEffect(() => {
    console.log('checkedList------------', checkedList);
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
        // Object.keys(category.quizCategory).forEach((key) => {
        //   const value = category.quizCategory[
        //     key as keyof UnitClassificationType
        //   ] as any;
        //   console.log('value key----', value);
        //   // 행동요소1, 행동요소2인 경우 객체 배열로 추가
        //   if ((value.key as string) === '행동요소1') {
        //     console.log('typedKey key---- in ', value);
        //     actionElement1.push({
        //       title: value.title,
        //       checkValue: value.checkValue,
        //       code: value.code,
        //       key: value.key,
        //     });
        //   } else if ((value.key as string) === '행동요소2') {
        //     actionElement2.push({
        //       title: value.title,
        //       checkValue: value.checkValue,
        //       code: value.code,
        //       key: value.key,
        //     });
        //   } else {
        //     console.log('title: value', value);
        //     const title = value.map((item: { name: any }) => item.name)[0];
        //     list.push({
        //       title: title as string,
        //       checkValue: 0,
        //       code: key,
        //       key: key,
        //     });
        //   }
        // });
        // category를 순회하며 필요한 형태로 변환
        Object.keys(category.quizCategory).forEach((key) => {
          const value = category.quizCategory[
            key as keyof UnitClassificationType
          ] as any;
          const title =
            Array.isArray(value) &&
            value.map((item: { name: any }) => item.name).join(', ');

          console.log('value key----', value);
          console.log('title: title', title);

          if (title) {
            list.push({
              title: title,
              checkValue: 0,
              code: key,
              key: key,
              classification: 'classification',
            });
          }
        });

        // order 변수를 선언 및 초기화
        const order: Record<string, number> = {};

        // titleA 배열을 순회하며 order에 키-값 추가
        titleA.forEach((title, index) => {
          order[title] = index;
        });

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
        // const idxList = finalList
        //   .map((item) => {
        //     if (typeof item.title === 'string' && item.title) {
        //       const parts = item.title;
        //       return parseInt(parts[1], 10); // ^^^ 뒤의 숫자를 추출하여 정수로 변환
        //     }
        //     return null; // ^^^이 포함되지 않은 경우 null 반환
        //   })
        //   .filter((number) => number !== null);

        // 새로운 배열 생성
        const newFinalList: RadioStateType[] = [];
        // 라디오 버튼에 들어갈 요소 재정의
        const keysOrder = [
          ...titleA,
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
            // } else if (key === 'itemTreeIdxList') {
            // itemTreeIdxList 일때 배열로 값추가
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // newFinalList.push({ itemTreeIdxList: idxList });
            // } else if (key === '행동요소1') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //   newFinalList.push([...items]);
            // } else if (key === '행동요소2') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //   newFinalList.push([...items]);
            // } else {
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
    // const newClassificationLists = radioButtonList
    //   .map((buttonList, index) => {
    //     if (buttonList[0].key === '교육과정') {
    //       const newClassification: UnitClassificationType[] = [
    //         buttonList[0],
    //         buttonList[1],
    //         buttonList[2],
    //         buttonList[3],
    //         ...buttonList.filter((item) => item.key === '행동요소1'),
    //         ...buttonList.filter((item) => item.key === '행동요소2'),
    //       ];

    //       if (checkedDepthList.length > 0) {
    //         newClassification.splice(4, 0, {
    //           itemTreeIdxList: checkedDepthList,
    //         });
    //       }

    //       return newClassification;
    //     }
    //     return null; // 조건을 만족하지 않는 경우 null 반환
    //   })
    //   .filter((item) => item !== null); // null 값 필터링

    // console.log('newClassificationLists ---------', newClassificationLists);

    // // 최대 5개의 UnitClassificationType 배열만 추가
    // if (unitClassificationList.length + newClassificationLists.length < 6) {
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   setUnitClassificationList((prevList) => [
    //     ...prevList,
    //     ...newClassificationLists,
    //   ]);
    // } else {
    //   openToastifyAlert({
    //     type: 'error',
    //     text: '교과정보는 최대 5개 까지 저장 가능합니다',
    //   });
    // }

    // onResetList();
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
  // const addButtonBool = useMemo(() => {
  //   if (
  //     unitClassificationList.length < 5 &&
  //     radio1depthCheck?.code !== '' &&
  //     radio2depthCheck?.code !== '' &&
  //     radio3depthCheck?.code !== '' &&
  //     radio4depthCheck?.code !== '' &&
  //     checkedDepthList.length > 0
  //   ) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }, [
  //   unitClassificationList,
  //   radio1depthCheck,
  //   radio2depthCheck,
  //   radio3depthCheck,
  //   radio4depthCheck,
  //   checkedDepthList,
  // ]);

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

  //셀렉트 데이터
  // const [content, setContent] = useState<string[]>([]);
  // const [topSelect, setTopSelect] = useState<string>('문제만 보기');
  // const sortArr = [
  //   {
  //     idx: '대발문 + 지문 + 문제',
  //     label: '대발문 + 지문 + 문제',
  //     code: '대발문 + 지문 + 문제',
  //     value: '대발문 + 지문 + 문제',
  //     name: '대발문 + 지문 + 문제',
  //   },
  //   {
  //     idx: '문제 + 정답 + 해설',
  //     label: '문제 + 정답 + 해설',
  //     code: '문제 + 정답 + 해설',
  //     value: '문제 + 정답 + 해설',
  //     name: '문제 + 정답 + 해설',
  //   },
  //   {
  //     idx: '대발문 + 지문 + 문제 + 정답 + 해설',
  //     label: '대발문 + 지문 + 문제 + 정답 + 해설',
  //     code: '대발문 + 지문 + 문제 + 정답 + 해설',
  //     value: '대발문 + 지문 + 문제 + 정답 + 해설',
  //     name: '대발문 + 지문 + 문제 + 정답 + 해설',
  //   },
  // ];
  // const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   const value = event.currentTarget.value;
  //   setContent((prevContent) => [...prevContent, value]);
  // };
  // useEffect(() => {
  //   console.log('셀렉트 값', topSelect);
  // }, [topSelect]);

  // 체크박스 설정
  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.checked);

    if (e.target.checked) {
      setCheckedList(questionList.map((item) => item.code as string)); //
    } else {
      setCheckedList([]);
    }
  };
  const handleSingleCheckIcon = (checked: boolean, id: string) => {
    if (checked) {
      setCheckedList((prev) => [...prev, id]);
    } else {
      setCheckedList(checkedList.filter((el) => el !== id));
    }

    setIsChecked(checked);
  };

  // 전체보기 버튼 누를시
  const openViewer = (code: string) => {
    const quiz = questionList.filter((el) => el.code === code);
    console.log('선택된 요소', quiz[0]);
    console.log('선택된 요소', quiz[0].idx);
    const data: QuizListType = quiz[0];
    // data 객체의 속성들을 문자열로 변환
    const dataStringified: Record<string, string> = {
      // ...data,
      idx: data.idx.toString(),
    };
    const queryString = new URLSearchParams(dataStringified).toString();

    windowOpenHandler({
      name: 'quizpreview',
      url: `/quizpreview?${queryString}`,
      $width: 800,
      $height: 800,
    });
  };

  return (
    <Container>
      <LayoutBodyWrapper>
        <LayoutWrapper className="auto">
          <TopButtonWrapper>
            <div>
              <CheckBoxI
                $margin={'0 5px 0 0'}
                onChange={(e) => handleAllCheck(e)}
                checked={
                  checkedList.length === questionList.length ? true : false
                }
                // checked={true}
                id={'all check'}
                value={'all check'}
              />
              <span className={`title_top`}>
                총 {`${questionList.length} 건`} 전체선택
              </span>
            </div>
            {/* <p>총 {`${questionList.length} 건`} 중 5건 분류없음</p> */}
          </TopButtonWrapper>
          <TopButtonWrapper>
            {/* <Select
              width={'250px'}
              defaultValue={'문제만 보기'}
              key={'문제만 보기'}
              options={sortArr}
              onSelect={(event) => selectCategoryOption(event)}
              setSelectedValue={setTopSelect}
            /> */}
            <ButtonWrapper>
              <button
                onClick={() => {
                  setColumnsCount(2);
                  setItemHeight('250px');
                }}
                className={`button ${columnsCount == 2 ? 'on' : ''} `}
              >
                {/* 작게보기 */}
                <Icon
                  width={`20px`}
                  src={`/images/icon/sorting_default_view.svg`}
                />
              </button>
              <button
                onClick={() => {
                  setColumnsCount(1);
                  setItemHeight(undefined);
                }}
                className={`button ${columnsCount == 1 ? 'on' : ''}`}
              >
                {/* 크게보기 */}
                <Icon
                  width={`20px`}
                  src={`/images/icon/sorting_larger_view.svg`}
                />
              </button>
              {/* <button
                onClick={() => {
                  setColumnsCount(2);
                  setItemHeight(undefined);
                }}
                className={`button ${columnsCount == 2 ? 'on' : ''}`}
              >
                <Icon
                  width={`20px`}
                  src={`/images/icon/sorting_custom_view.svg`}
                />
              </button> */}
            </ButtonWrapper>
          </TopButtonWrapper>
          <ScrollWrapper className="height_100">
            <PerfectScrollbar>
              <ListWrapper className={`list_wrapper `}>
                {questionList.map((quiz, index) => (
                  <ItemWrapper
                    key={quiz.idx}
                    height={itemHeight}
                    className={`${columnsCount == 2 ? 'colum_item_2' : 'colum_item_1'} `}
                    classHeight={`${columnsCount == 3 ? '60px' : 'auto'}`}
                  >
                    <TopButtonWrapper>
                      <div className="quiz_top_wrap">
                        <CheckBoxI
                          $margin={'0 5px 0 0'}
                          onChange={(e) =>
                            handleSingleCheckIcon(e.target.checked, quiz.code)
                          }
                          checked={
                            checkedList.includes(quiz.code as string)
                              ? true
                              : false
                          }
                          id={quiz.code}
                          value={quiz.code}
                        />
                        <span className={`title_top`}>
                          {`${0} 건`}
                          <Icon
                            onClick={() => openViewer(quiz.code)}
                            width={`15px`}
                            src={`/images/icon/entypo_popup.svg`}
                          />
                        </span>
                      </div>
                      {/* <span>
                        {quiz.quizCategoryList[0] && (
                          <span
                            className={`${quiz.quizCategoryList[0].quizCategory?.문항타입 == '객관식' && 'green'} 
                  ${quiz.quizCategoryList[0].quizCategory?.문항타입 == '주관식' && 'yellow'} tag`}
                          >
                            {quiz.quizCategoryList[0].quizCategory?.문항타입}
                          </span>
                        )}
                      </span> */}
                    </TopButtonWrapper>
                    <ScrollWrapper
                      className="items_height"
                      itemsHeight={`${columnsCount == 2 ? '150px' : 'auto'}`}
                    >
                      <PerfectScrollbar>
                        <div className="quiz_wrap">
                          {quiz?.quizItemList?.map((el) => (
                            <div key={`${el?.code} quizItemList sortedList`}>
                              {[
                                'BIG',
                                'TEXT',
                                'QUESTION',
                                'SMALL',
                                'EXAMPLE',
                                // 'CHOICES',
                                // 'ANSWER',
                                'COMMENTARY',
                                'HINT',
                                'CONCEPT',
                                'TITLE',
                                'TIP',
                              ].includes(el?.type) &&
                                el?.content && (
                                  <MathViewer data={el.content}></MathViewer>
                                )}
                              {Array.isArray(el?.content) && (
                                <>
                                  {el.content.map((item, index) => (
                                    <MathViewer key={index}>{item}</MathViewer>
                                  ))}
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </PerfectScrollbar>
                    </ScrollWrapper>
                    <ScrollWrapper className={`height_class_wrap`}>
                      <PerfectScrollbar>
                        <div className="class_wrap">
                          {quiz.quizCategoryList.some((item) =>
                            Array.isArray(item.quizCategory?.교육과정),
                          ) ? (
                            quiz.quizCategoryList.map((item, idx) => {
                              const 교육과정 =
                                Array.isArray(item.quizCategory?.교육과정) &&
                                item.quizCategory.교육과정
                                  .map((cat) => cat.name)
                                  .join(', ');

                              const 과목 =
                                Array.isArray(item.quizCategory?.과목) &&
                                item.quizCategory.과목
                                  .map((cat) => cat.name)
                                  .join(', ');

                              const 교과 =
                                Array.isArray(item.quizCategory?.교과) &&
                                item.quizCategory.교과
                                  .map((cat) => cat.name)
                                  .join(', ');

                              const 학년 =
                                Array.isArray(item.quizCategory?.학년) &&
                                item.quizCategory.학년
                                  .map((cat) => cat.name)
                                  .join(', ');

                              const 학기 =
                                Array.isArray(item.quizCategory?.학기) &&
                                item.quizCategory.학기
                                  .map((cat) => cat.name)
                                  .join(', ');

                              return (
                                <span key={idx}>
                                  {`${교육과정 || ''}/${과목 || ''}/${교과 || ''}/${학년 || ''}/${학기 || ''}`}
                                </span>
                              );
                            })
                          ) : (
                            <span>(분류없음)</span>
                          )}
                        </div>
                      </PerfectScrollbar>
                    </ScrollWrapper>
                  </ItemWrapper>
                ))}
              </ListWrapper>
            </PerfectScrollbar>
          </ScrollWrapper>
        </LayoutWrapper>
        <LayoutWrapper>
          <ScrollWrapper className="height">
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
                          // onClick={() => changeUnitClassification(idx)}
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
                  {idxNamePairsA && categoriesA.length > 0 && (
                    <>
                      {/* 첫 번째 버튼: 1depth */}
                      <div
                        className="1depth"
                        id={`${categoriesA[0].code}/${titleA[0]}`}
                      >
                        <ButtonFormatRadio
                          branchValue={`${categoriesA[0].code}`}
                          titleText={`${titleA[0]}`}
                          list={categoriesA}
                          selected={selectedDepth['1depth'] || ''}
                          onChange={(e) => handleRadioCheck(e)}
                          checkedInput={radioChecks['1depth']}
                          $margin={`10px 0 0 0`}
                        />
                      </div>

                      {/* 동적 버튼 생성 */}
                      {Object.keys(nextLists).map((depth, index) => {
                        const previousDepth = `${index}depth`; // 이전 뎁스 (예: 0depth, 1depth)

                        // 이전 뎁스가 선택되어 있거나 첫 번째 뎁스일 경우에만 렌더링
                        if (index === 0 || selectedDepth[previousDepth]) {
                          return (
                            <div
                              className={depth}
                              key={depth}
                              id={`${nextLists[depth][0]?.code || ''}/${titleA[index + 1]}`}
                            >
                              <ButtonFormatRadio
                                key={`${nextLists[depth][0]?.idx}`}
                                branchValue={`${nextLists[depth][0]?.idx}`}
                                titleText={`${titleA[index + 1]}`}
                                list={nextLists[depth]}
                                selected={selectedDepth[depth] || ''}
                                onChange={(e) => handleRadioCheck(e)}
                                checkedInput={radioChecks[depth]}
                                $margin={`10px 0 0 0`}
                              />
                            </div>
                          );
                        }

                        // 렌더링하지 않음
                        return null;
                      })}
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
              {sortedList.length > 0 && selectedDepth['1depth'] !== '' ? (
                <AccordionWrapper>
                  <Accordion
                    defaultChecked={isModifying}
                    title={Object.keys(selectedDepth)
                      .filter((key) => selectedDepth[key]) // 선택된 값이 있는 키만 포함
                      .map((key) => selectedDepth[key]) // 선택된 값을 추출
                      .join('/')} // '/'로 연결
                    id={Object.keys(selectedDepth)
                      .filter((key) => selectedDepth[key]) // 선택된 값이 있는 키만 포함
                      .map((key) => selectedDepth[key]) // 선택된 값을 추출
                      .join('/')}
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
                      {idxNamePairsDD[0] && idxNamePairsDD[0][0] && (
                        <div
                          id={idxNamePairsDD[0][0].idx}
                          className={`${idxNamePairsDD[0][0].code}`}
                          key={idxNamePairsDD[0][0].idx}
                        >
                          <ButtonFormatMultiRadio
                            titleText={`${idxNamePairsDD[0][0].name}`}
                            list={categoriesDD1}
                            selected={selectedCategoryEtc1}
                            onChange={(e) => handleMultiRadioCheck(e)}
                            checkedInputs={radioEtc1Check}
                            branchValue={`etc${1}`}
                          />
                        </div>
                      )}
                      {idxNamePairsDD[0] && idxNamePairsDD[0][1] && (
                        <div
                          id={idxNamePairsDD[0][1].idx}
                          className={`${idxNamePairsDD[0][1].code}`}
                          key={idxNamePairsDD[0][1].idx}
                        >
                          <ButtonFormatMultiRadio
                            titleText={`${idxNamePairsDD[0][1].name}`}
                            list={categoriesDD2}
                            selected={selectedCategoryEtc2}
                            onChange={(e) => handleMultiRadioCheck(e)}
                            checkedInputs={radioEtc2Check}
                            branchValue={`etc${2}`}
                          />
                        </div>
                      )}
                    </RowListWrapper>
                  </Accordion>
                </AccordionWrapper>
              ) : (
                <ValueNoneWrapper>
                  {/* <ValueNone
                    textOnly
                    info="교육과정, 학교급, 학년, 학기를 선택해주세요"
                  /> */}
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
            // disabled={addButtonBool}
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

  .groupedItemsContainer {
    border: 3px solid ${COLOR.BORDER_BLUE};
    position: relative;
    margin: 10px 0;
    padding: 10px;
    background-color: #f9f9f9;
    display: flex;
    padding-top: 30px;
    width: 100%;
  }

  .group-checkbox {
    position: absolute;
    top: 15px;
  }
  label.group_checkbox_label {
    position: absolute;
    top: 10px;
    right: auto;
    left: 30px;
  }
`;
const LayoutBodyWrapper = styled.div`
  display: flex;
`;
const LayoutWrapper = styled.div`
  width: 400px;
  border: 1px solid ${COLOR.BORDER_GRAY};
  &.auto {
    flex: 1 0 0;
  }
`;
const ScrollWrapper = styled.div<{ itemsHeight?: string }>`
  overflow-y: auto;
  height: calc(100vh - 150px);
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
  &.height_100 {
    overflow-y: auto;
    height: calc(100vh - 250px);
  }

  &.class_items_height {
    height: 50px;
    overflow-y: auto;
    position: sticky;
    bottom: 0;
  }
  .height_class_wrap {
    height: fit-content;
  }
  &.none_class_items_height {
    height: 50px;
    .class_wrap {
      position: absolute;
      height: 20px;
      bottom: 0px;
      z-index: 9;
    }
  }
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

const ListWrapper = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  .colum_2 {
    display: flex;
    flex-wrap: wrap;

    > div {
      width: calc(50% - 10px);
    }
  }

  .colum_1 {
    display: flex;
    flex-wrap: wrap;

    > div {
      width: 100%;
    }
  }
`;

const ItemWrapper = styled.div<{ height?: string; classHeight?: string }>`
  padding: 10px;
  border: 1px solid #aaa;
  border-radius: 10px;
  height: ${({ height }) => height || 'auto'};
  margin: 5px;
  overflow: auto;
  position: relative;

  &.colum_item_1 {
    width: 100%;
  }
  &.colum_item_2 {
    width: calc(50% - 10px);
    > .items_height {
      max-height: 250px;
    }
  }

  img {
    width: 100%;
    height: fit-content;
  }

  .quiz_wrap {
    overflow: auto;
  }

  .quiz_top_wrap {
    position: absolute;
    top: 10px;
    right: 10px;
    left: 10px;
  }

  .class_wrap {
    font-size: 12px;
    color: #aaa;
    background-color: #fff;
    height: ${({ classHeight }) => classHeight || 'auto'};
    /* display: flex;
    flex-direction: column-reverse; */

    span {
      display: -webkit-box;
      -webkit-line-clamp: 2; /* Change the number to the number of lines you want to show */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .title_top {
    button {
      height: 15px;
      margin: 5px;
    }
  }

  .tag {
    position: absolute;
    right: 10px;
    top: 10px;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: bold;
    border-radius: 27px;

    &.yellow {
      background-color: ${COLOR.ALERTBAR_WARNING};
    }
    &.green {
      background-color: ${COLOR.ALERTBAR_SUCCESS};
    }
    &.gray {
      background-color: ${COLOR.BORDER_GRAY};
    }
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 5px;

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border: 1px solid #aaa;
    border-radius: 5px;
    background-color: transparent;

    &.on {
      background-color: ${COLOR.IS_HAVE_DATA};
    }
  }
`;
const TopButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  /* padding-top: 15px; */
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
const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 50px;
  padding-left: calc(50% - 35px);
`;

const DepthBlockScrollWrapper = styled.div`
  overflow-y: auto;
  /* height: 300px; */
  width: 100%;
  margin-top: 10px;
`;
