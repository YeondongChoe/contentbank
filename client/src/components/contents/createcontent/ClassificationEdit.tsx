import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
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
import { classificationInstance, quizService } from '../../../api/axios';
import {
  Accordion,
  ButtonFormatRadio,
  ButtonFormatMultiRadio,
  DepthBlock,
  Search,
} from '../../../components/molecules';
import { MyStaticWrapper } from '../../../components/molecules/sortBox/Masonry';
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
import { windowOpenHandler } from '../../../utils/windowHandler';
import { COLOR } from '../../constants/COLOR';

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
  type,
}: {
  setTabView: React.Dispatch<React.SetStateAction<string>>;
  type: string;
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
  // 교과 과목
  const [selected5depth, setSelected5depth] = useState<string>('');
  const [selected6depth, setSelected6depth] = useState<string>('');
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
  const [nextList4depth, setNextList4depth] = useState([
    { code: '', idx: 0, name: '' },
  ]);
  const [nextList5depth, setNextList5depth] = useState([
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
  const [categoryNameList, setCategoryNameList] = useState<string>('');
  const [categoriesE, setCategoriesE] = useState<ItemCategoryType[][]>([]);

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
    if (categoryDataError) {
      categoryDataRefetch();
    }
    if (categoryData) {
      setCategoryItems(categoryData.data.data.categoryItemList);
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

  // 카테고리의 그룹 아이템 조회
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
    const depth =
      e.target.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement?.classList[0];
    const itemId =
      e.target.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement?.id;
    console.log('depth-----,itemId----------', depth, itemId);
    console.log(
      'e.currentTarget.className----------',
      e.currentTarget.className,
    );

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
          교과: 4,
          과목: 5,
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
          '교과',
          '과목',
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
            // buttonList[4],
            // buttonList[5],
            ...buttonList.filter((item) => item.key === '행동요소1'),
            ...buttonList.filter((item) => item.key === '행동요소2'),
          ];

          if (checkedDepthList.length > 0) {
            newClassification.splice(6, 0, {
              itemTreeIdxList: checkedDepthList,
            });
          }

          // 라디오 배열값 초기화
          setRadioButtonList([]);
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
        // ...prevList,
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

    const res = await classificationInstance.post('/v1/item', itemTreeKeyList);
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
      radio5depthCheck,
      radio6depthCheck,
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
    setCheckedItems([]);
  };

  // 수정
  const changeUnitClassification = (idx: number) => {
    console.log('수정에서의 itemTree checkedDepthList', checkedDepthList);
    console.log(
      '수정에서의 itemTree unitClassificationList',
      unitClassificationList[idx],
    );
    onResetList();
    setSelectedClassification(unitClassificationList[idx]);
    setIsModifying(true);
  };

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
  useEffect(() => {
    console.log('type', type);
  }, []);

  //리스트 솔팅 정렬
  const [columnsCount, setColumnsCount] = useState<number>(2);
  const [itemHeight, setItemHeight] = useState<string | undefined>('250px');
  useEffect(() => {}, [columnsCount, itemHeight]);

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
              <span className={`title_top`}>총 {`${0} 건`} 전체선택</span>
            </div>
            <p>총 22건 중 5건 분류없음</p>
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
          <ScrollWrapper className="height">
            <PerfectScrollbar>
              <MyStaticWrapper columnsCount={columnsCount} padding="5px">
                {questionList.map((quiz, index) => (
                  <ItemWrapper
                    key={quiz.idx}
                    height={itemHeight}
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
                      <span>
                        {quiz.quizCategoryList[0] && (
                          <span
                            className={`${quiz.quizCategoryList[0].quizCategory?.문항타입 == '객관식' && 'green'} 
                  ${quiz.quizCategoryList[0].quizCategory?.문항타입 == '주관식' && 'yellow'} tag`}
                          >
                            {quiz.quizCategoryList[0].quizCategory?.문항타입}
                          </span>
                        )}
                      </span>
                    </TopButtonWrapper>
                    <ScrollWrapper
                      className="items_height"
                      itemsHeight={`${columnsCount == 3 ? '150px' : 'auto'}`}
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
                          ))}
                        </div>
                      </PerfectScrollbar>
                    </ScrollWrapper>
                    <ScrollWrapper
                      className={`${
                        columnsCount == 3
                          ? `${
                              quiz.quizCategoryList.some(
                                (item) => item.quizCategory?.교육과정,
                              )
                                ? 'class_items_height'
                                : 'none_class_items_height'
                            }`
                          : 'items_height'
                      }`}
                    >
                      <PerfectScrollbar>
                        <div className="class_wrap">
                          {quiz.quizCategoryList.some(
                            (item) => item.quizCategory?.교육과정,
                          ) ? (
                            quiz.quizCategoryList.map((item, idx) => (
                              <span key={idx}>
                                {item.quizCategory?.교육과정}/
                                {item.quizCategory?.과목}/
                                {item.quizCategory?.교과}/
                                {item.quizCategory?.학년}/
                                {item.quizCategory?.학기}/
                                {item.quizCategory?.대단원?.split('^^^')[0]}/
                                {item.quizCategory?.중단원?.split('^^^')[0]}/
                                {item.quizCategory?.소단원?.split('^^^')[0]}/
                                {item.quizCategory?.유형?.split('^^^')[0]}
                              </span>
                            ))
                          ) : (
                            <span>(분류없음)</span>
                          )}
                        </div>
                      </PerfectScrollbar>
                    </ScrollWrapper>
                  </ItemWrapper>
                ))}
              </MyStaticWrapper>
            </PerfectScrollbar>
          </ScrollWrapper>
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
                  {categoryList && (
                    <>
                      {[
                        {
                          idx: 0,
                          name: '교육과정',
                          code: '교육과정',
                          type: 'SELECT',
                        },
                      ].map((item) => (
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
                        [
                          {
                            idx: 0,
                            name: '학교급',
                            code: '학교급',
                            type: 'SELECT',
                          },
                        ].map((item) => (
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
                        [
                          {
                            idx: 0,
                            name: '학년',
                            code: '학년',
                            type: 'SELECT',
                          },
                        ].map((item) => (
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
                        [
                          {
                            idx: 0,
                            name: '학기',
                            code: '학기',
                            type: 'SELECT',
                          },
                        ].map((item) => (
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
                      {radio4depthCheck.code !== '' &&
                        selected4depth !== '' && (
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
                      {radio5depthCheck.code !== '' &&
                        selected5depth !== '' && (
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
              radio5depthCheck?.code !== '' &&
              radio6depthCheck?.code !== '' &&
              selected1depth !== '' &&
              selected2depth !== '' &&
              selected3depth !== '' &&
              selected4depth !== '' ? (
                <AccordionWrapper>
                  <Accordion
                    defaultChecked={isModifying}
                    title={`${radio1depthCheck.title}/${radio2depthCheck.title}/${radio3depthCheck.title}학년/${radio4depthCheck.title}학기/${radio5depthCheck.title}/${radio6depthCheck.title}`}
                    id={`${radio1depthCheck.title}/${radio2depthCheck.title}/${radio3depthCheck.title}학년/${radio4depthCheck.title}학기/${radio5depthCheck.title}/${radio6depthCheck.title}`}
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
                          {[
                            {
                              idx: 0,
                              name: '행동요소1',
                              code: '행동요소1',
                              type: 'SELECT',
                            },
                          ].map((item) => (
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
                          {[
                            {
                              idx: 0,
                              name: '행동요소2',
                              code: '행동요소2',
                              type: 'SELECT',
                            },
                          ].map((item) => (
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
            {type === 'copyedit' ? '등록' : '수정'}
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
  width: 400px;
  border: 1px solid ${COLOR.BORDER_GRAY};
  &.auto {
    flex: 1 0 0;
  }
`;
const ScrollWrapper = styled.div<{ itemsHeight?: string }>`
  overflow-y: auto;
  height: calc(100vh - 40px);
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
  &.height {
    overflow-y: auto;
    height: calc(100vh - 150px);
  }
  &.items_height {
    margin-top: 5px;
    overflow-y: auto;
    height: ${({ itemsHeight }) => itemsHeight || 'auto'};
  }
  &.class_items_height {
    height: 50px;
    overflow-y: auto;
    position: sticky;
    bottom: 0;
  }
  &.none_class_items_height {
    height: 50px;
    .class_wrap {
      position: absolute;
      height: 20px;
      bottom: 0px;
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

const ItemWrapper = styled.div<{ height?: string; classHeight?: string }>`
  padding: 10px;
  border: 1px solid #aaa;
  border-radius: 10px;
  height: ${({ height }) => height || 'auto'};
  margin: 5px;
  overflow: auto;
  position: relative;

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
  }
`;
