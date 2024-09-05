import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
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
  | ClassificationStateType
  | QuizCategory
  | [];

interface ClassificationStateType {
  quizCodeList: string[];
  categoryList: {
    itemTreeKey?: QuizCategory;
    itemTreeIdxList?: number[];
    quizCategory?: QuizCategory;
  }[];
}

type CheckedItemType = {
  [key: string]: string;
};

export function ClassificationEdit({
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
      console.log('error--------------', error.response.data.code);

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
          return '대유형';
        case 2:
          return '중유형';
        case 3:
          return '소유형';
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
    console.log('체크된 요소 sortedList------------', sorted);
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
      console.log('체크된 마지막 lastQuiz------------', lastQuiz);
      const radioButtonLists: RadioStateType[][] = [];

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
      // 중복 제거 작업
      const uniqueRadioButtonArr = radioButtonArr.map((group) => {
        const uniqueGroup = group.filter(
          (item, index, self) =>
            index ===
            self.findIndex((t) => JSON.stringify(t) === JSON.stringify(item)),
        );
        return uniqueGroup;
      });

      // 라디오 버튼 배열을 순차적으로 추가
      uniqueRadioButtonArr.forEach((radioButtonGroup, index) => {
        setTimeout(
          () => {
            setRadioButtonList((prevList) => [...prevList, radioButtonGroup]);
          },
          index - 1 * 1000,
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

  // 수정
  const changeUnitClassification = (idx: number) => {};

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

  // 분류 등록 버튼
  const onSubmit = () => {
    // 최종적으로 전송 될 데이터
    console.log('퀴즈코드리스트 들어가야할 목록', checkedList);
  };

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
              setIsCheck={setIsChecked}
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
                      <>
                        {sortedQuizList &&
                        sortedQuizList[clickIdx]?.quizItemList ? (
                          sortedList[clickIdx]?.quizItemList?.map((el) => (
                            <div key={`${el?.code} quizItemList sortedList`}>
                              {[
                                'BIG',
                                'TEXT',
                                'QUESTION',
                                'SMALL',
                                'EXAMPLE',
                                'CHOICES',
                                'ANSWER',
                                'COMMENTARY',
                                'HINT',
                                'CONCEPT',
                                'TITLE',
                                'TIP',
                              ].includes(el?.type) &&
                                el?.content && (
                                  <MathViewer data={el.content}></MathViewer>
                                )}
                            </div>
                          ))
                        ) : (
                          <>
                            <ValueNone
                              info="등록된 데이터가 없습니다"
                              textOnly
                            />
                          </>
                        )}
                      </>
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

  p > img {
    width: 100% !important;
    height: auto !important;
  }

  div > img {
    width: 100% !important;
    height: auto !important;
  }
  table {
    width: inherit !important;
    height: auto !important;
  }
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
