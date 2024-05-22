import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { useIsMutating, useMutation, useQuery } from '@tanstack/react-query';
import { IoMdClose, IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
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
} from '../..';
import { classificationInstance } from '../../../api/axios';
import {
  TextbookType,
  MockexamType,
  ItemCategoryType,
  ItemTreeListType,
} from '../../../types';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { COLOR } from '../../constants';
import dummy from '../../constants/data.json';

type Content = {
  seq: number;
  title: string;
  isChecked?: boolean;
  pageTitle: string;
};

type Page = {
  seq: number;
  title: string;
  isChecked?: boolean;
  content: Content[];
};

type DataType = {
  title: string;
  page: Page[];
};

type MockDataType = {
  seq: number;
  grade: string;
  year: string;
  month: string;
  isChecked?: boolean;
  content: MockContent[];
};

type MockContent = {
  seq: number;
  title: string;
  isChecked?: boolean;
};
//시중교재
const processData = (data: TextbookType): DataType => {
  const newData: DataType = {
    title: data.title || '',
    page:
      data.type?.flatMap((type) =>
        type.page?.map((page) => ({
          seq: page.seq || 0,
          title: page.title || '',
          isChecked: false,
          content:
            page.content?.map((content) => ({
              seq: content.seq || 0,
              title: content.title || '',
              isChecked: false,
              pageTitle: page.title,
            })) || [],
        })),
      ) || [],
  };

  return newData;
};
//수능모의고사
const processMockexam = (dataList: MockexamType[]): MockDataType[] => {
  return dataList.map((data) => {
    return {
      seq: data.seq,
      grade: data.grade,
      year: data.year,
      month: data.month,
      isChecked: false,
      content: data.content.map((contentItem) => ({
        seq: contentItem.seq,
        title: contentItem.title,
        isChecked: false,
      })),
    };
  });
};

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

  const [radio1depthCheck, setRadio1depthCheck] = useState<{
    title: string;
    checkValue: number;
    code: string;
  }>({ title: '', checkValue: 0, code: '' });
  const [radio2depthCheck, setRadio2depthCheck] = useState<{
    title: string;
    checkValue: number;
    code: string;
  }>({ title: '', checkValue: 0, code: '' });
  const [radio3depthCheck, setRadio3depthCheck] = useState<{
    title: string;
    checkValue: number;
    code: string;
  }>({ title: '', checkValue: 0, code: '' });
  const [radio4depthCheck, setRadio4depthCheck] = useState<{
    title: string;
    checkValue: number;
    code: string;
  }>({ title: '', checkValue: 0, code: '' });
  const [selected1depth, setSelected1depth] = useState<string>('');
  const [selected2depth, setSelected2depth] = useState<string>('');
  const [selected3depth, setSelected3depth] = useState<string>('');
  const [selected4depth, setSelected4depth] = useState<string>('');
  const [checkedDepthList, setCheckedDepthList] = useState<string[]>([]);

  const [nextList1depth, setNextList1depth] = useState([
    { code: '', idx: 0, name: '' },
  ]);
  const [nextList2depth, setNextList2depth] = useState([
    { code: '', idx: 0, name: '' },
  ]);
  const [nextList3depth, setNextList3depth] = useState([
    { code: '', idx: 0, name: '' },
  ]);

  const [categoryItems, setCategoryItems] = useState<ItemCategoryType[]>([]); // 카테고리 항목을 저장할 상태
  const [categoryList, setCategoryList] = useState<ItemCategoryType[][]>([]); // 각 카테고리의 상세 리스트를 저장할 상태
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

  const getCategoryGroups = async () => {
    const response = await classificationInstance.get('/v1/category/group/A'); //TODO: /group/${``} 하드코딩된 유형 나중에 해당 변수로 변경
    return response.data.data.typeList;
  };
  const { data: groupsData } = useQuery({
    queryKey: ['get-category-groups'],
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
    // console.log(typeIds);
    const requests = typeIds.map((id) =>
      classificationInstance.get(`/v1/category/${id}`),
    );
    const responses = await Promise.all(requests);
    const itemsList = responses.map((res) => res.data.data.categoryClassList);
    setCategoryList(itemsList);
  };

  // 라디오 버튼 설정
  const handleRadioCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.className);
    const depth =
      e.target.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement?.classList[0];
    switch (depth) {
      case '1depth':
        setSelected1depth(e.currentTarget.id);
        setRadio1depthCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
        });
        break;
      case '2depth':
        setSelected2depth(e.currentTarget.value);
        setRadio2depthCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
        });
        break;
      case '3depth':
        setSelected3depth(e.currentTarget.value);
        setRadio3depthCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
        });
        break;
      case '4depth':
        setSelected4depth(e.currentTarget.value);
        setRadio4depthCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
        });
        break;

      // case 'etc1':
      //   setSelectedCategoryEtc1(e.currentTarget.value);
      //   break;
      // case 'etc2':
      //   setSelectedCategoryEtc2(e.currentTarget.value);
      //   break;
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
      setNextList1depth(res.data.data.categoryClassList);
      return res.data;
    } catch (error) {
      console.error('Error fetching next list: ', error);
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
      setNextList2depth(res.data.data.categoryClassList);
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
      setNextList3depth(res.data.data.categoryClassList);
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

  useEffect(() => {
    if (radio1depthCheck.code !== '') nextListData1Refetch();
    if (radio2depthCheck.code !== '') nextListData2Refetch();
    if (radio3depthCheck.code !== '') nextListData3Refetch();
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
    setRadio4depthCheck({ title: '', checkValue: 0, code: '' });
    setItemTree([]);
  }, [selected3depth]);

  // 카테고리 선택후 아이템트리
  // 아이템 트리 불러오기 api
  const getCategoryItemTree = async () => {
    const keyValuePairs = categoryItems.reduce<Record<string, string>>(
      (acc, item, index) => {
        const radioDepthCheck = [
          selected1depth,
          selected2depth,
          selected3depth,
          selected4depth,
        ][index];
        if (radioDepthCheck !== undefined) {
          // undefined가 아닐 때만 추가
          acc[item.code] = radioDepthCheck;
        }
        return acc;
      },
      {},
    );

    const itemTreeKey = { itemTreeKey: [keyValuePairs] };
    console.log('itemTreeKey :', itemTreeKey);

    const res = await classificationInstance.post('/v1/item', itemTreeKey);
    console.log('classificationInstance 응답:', res);
    return res;
  };

  const { data: categoryItemTreeData, mutate: categoryItemTreeDataMutate } =
    useMutation({
      mutationFn: getCategoryItemTree,
      onError: (context: { response: { data: { message: string } } }) => {
        openToastifyAlert({
          type: 'error',
          text: context.response.data.message,
        });
      },
      onSuccess: (response: { data: { data: ItemTreeListType[] } }) => {
        // setItemTreeList(res.data.data[0].itemTreeList);
        setItemTree(response.data.data);
      },
    });

  useEffect(() => {
    // console.log(radio4depthCheck);
    if (selected4depth == '') return;
    categoryItemTreeDataMutate();
  }, [selected4depth]);

  useEffect(() => {
    // console.log(error);
  }, [itemTree]);

  // 깊이가 있는 리스트 체크박스
  const handleSingleCheck = (checked: boolean, id: string) => {
    if (checked) {
      setCheckedDepthList((prev) => [...prev, id]);
    } else {
      setCheckedDepthList(checkedDepthList.filter((el) => el !== id));
    }
  };

  // const [didMount, setDidMount] = useState(false);

  // useEffect(() => {
  //   setDidMount(true);
  // }, []);

  // useEffect(() => {
  //   if (didMount) {
  //     //console.log('schoolLevel, schoolYear이 선택 됐을 때 범위 트리 get API');
  //   }
  // }, [didMount]);

  //단원.유형별
  const [inputValue, setInputValue] = useState('');
  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // 정규표현식을 사용하여 숫자 이외의 문자 제거
    inputValue = inputValue.replace(/[^0-9]/g, '');

    const parsedValue = parseInt(inputValue, 10);

    if (!isNaN(parsedValue) && parsedValue > 0) {
      setInputValue(
        parsedValue < 1 ? '1' : parsedValue >= 100 ? '100' : inputValue,
      );
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

  const [questionType, setQuestionType] = useState<string[]>([]);
  const selectQuestionType = (newValue: string) => {
    setQuestionType((prev) => {
      if (prev.includes(newValue)) {
        // 이미 선택된 경우 선택 취소
        return prev.filter((type) => type !== newValue);
      } else {
        // 새로운 선택 추가
        return [...prev, newValue];
      }
    });
  };

  const [isDifficulty, setIsDifficulty] = useState(false);
  const openDifficultySetting = () => {
    setIsDifficulty(true);
  };
  const closeDifficultySetting = () => {
    setIsDifficulty(false);
  };

  const [isAutoGrading, setIsAutoGrading] = useState(false);
  const checkAutoGrading = () => {
    setIsAutoGrading(!isAutoGrading);
  };

  const isAllSelectedQuestionType =
    questionType.includes('객관식') &&
    questionType.includes('주관식') &&
    questionType.includes('서술형');

  const [containMock, setContainMock] = useState<string | null>(null);
  const selectContainMock = (newValue: string | null) => {
    setContainMock(newValue);
  };
  //배점
  const [equalScore, setEqualScore] = useState<string | null>(null);
  const selectEqualScore = (newValue: string | null) => {
    setEqualScore(newValue);
  };
  const [isEqualScoreModal, setIsEqualScoreModal] = useState<boolean>(false);

  const openEqualScoreSettingModal = () => {
    if (questionNum || inputValue) {
      setIsEqualScoreModal(true);
      setIsSaveEqualValue(false);
      setEqualInputValue('0');
    } else {
      alert('문항수 선택해라');
      selectEqualScore('');
      setIsSaveEqualValue(false);
    }
  };
  const [equalInputValue, setEqualInputValue] = useState('0');
  const [isSaveEqualValue, setIsSaveEqualValue] = useState<boolean>(false);

  //나머지 시작 컨텐츠
  const [remainderContent, setRemainderContent] = useState<number>();
  //나머지 시작 전 컨텐츠
  const [nextRemainderContent, setNextRemainderContent] = useState<number>();
  //문항당 배점
  const [quotient, setQuotient] = useState<number>(0);
  const [remainder, setRemainder] = useState<number>();

  const closeEqualScoreSettingModal = () => {
    setIsEqualScoreModal(false);
    setEqualInputValue('0');
  };
  const saveEqualScoreSettingModal = () => {
    if (isSaveEqualValue) {
      setIsEqualScoreModal(false);
      closeEqualScoreSettingModal();
    } else {
      if (equalInputValue) {
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

  const changeEqualInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let equalInputValue = e.target.value;

    // 정규표현식을 사용하여 숫자 이외의 문자 제거
    equalInputValue = equalInputValue.replace(/[^0-9]/g, '');

    const parsedValue = parseInt(equalInputValue, 10);
    setEqualInputValue(parsedValue >= 200 ? '200' : equalInputValue);
  };

  const saveEqualInputValue = () => {
    const parsedValue = parseInt(equalInputValue, 10);
    const questionNumValue = parseInt(questionNum || inputValue, 10);
    if (equalInputValue === '') {
      openToastifyAlert({
        type: 'error',
        text: '총 배점을 입력해주세요.',
      });
      setIsSaveEqualValue(false);
      setEqualInputValue('0');
      setQuotient(0);
    } else if (equalInputValue && parsedValue < questionNumValue) {
      openToastifyAlert({
        type: 'error',
        text: '총 배점은 총 문항수보다 크거나 같아야합니다.',
      });
      setEqualInputValue(questionNum || inputValue);
      setIsSaveEqualValue(false);
    } else {
      openToastifyAlert({
        type: 'success',
        text: '저장되었습니다.',
      });
      setEqualInputValue(equalInputValue);
      setIsSaveEqualValue(true);
    }
  };

  const [minQuotient, setMinQuotient] = useState<number>();
  const [maxQuotient, setMaxQuotient] = useState<number>();
  // console.log(minQuotient);

  useEffect(() => {
    const parsedValue = parseInt(equalInputValue, 10);
    const questionNumValue = parseInt(questionNum || inputValue, 10);

    if (isSaveEqualValue) {
      const quotient = Math.floor(parsedValue / questionNumValue);
      // console.log(quotient);
      const remainder = parsedValue % questionNumValue;
      setQuotient(quotient);
      setRemainder(remainder);
      if (quotient || remainder) {
        const remainderContent = questionNumValue - remainder;
        const minQuotient = quotient - 1;
        const maxQuotient = quotient + 2;
        setRemainderContent(remainderContent);
        setNextRemainderContent(remainderContent + 1);
        setMinQuotient(minQuotient <= 0 ? 1 : minQuotient);
        setMaxQuotient(maxQuotient);
      }
    }
  }, [isSaveEqualValue, equalInputValue]);

  const [isOption1, setIsOption1] = useState(false);
  const selectOption1 = () => {
    setIsOption1(!isOption1);
  };
  const [isOption2, setIsOption2] = useState(false);
  const selectOption2 = () => {
    setIsOption2(!isOption2);
  };
  const [isOption3, setIsOption3] = useState(false);
  const selectOption3 = () => {
    setIsOption3(!isOption3);
  };
  const [isOption4, setIsOption4] = useState(false);
  const selectOption4 = () => {
    setIsOption4(!isOption4);
  };

  //시중교재
  const [schoolLevel, setSchoolLevel] = useState<string | null>(null);
  const selectSchoolLevel = (newValue: string | null) => {
    setSchoolLevel(newValue);
  };
  const [gradeLevel, setgradeLevel] = useState<string | null>(null);
  const selectGradeLevel = (newValue: string | null) => {
    setgradeLevel(newValue);
  };

  const [searchValue, setSearchValue] = useState<string>('');
  const filterSearchValue = () => {
    console.log('기존데이터 입력된 값으로 솎아낸뒤 재출력');
  };

  const textbookList: TextbookType[] = dummy.Textbook;
  const [isSelectTextbook, setIsSelectTextbook] = useState(true);
  const [selectedTextbook, setSelectedTextbook] = useState<TextbookType>();
  const [isSelectTextbookContent, setIsSelectTextbookContent] = useState(false);

  const selectTextbook = (book: TextbookType) => {
    setSelectedTextbook(book);
    setIsSelectTextbook(false);
    setIsSelectTextbookContent(true);
    setClickedTitle('');
  };
  const selectOtherTextbook = () => {
    setIsSelectTextbook(true);
    setIsSelectTextbookContent(false);
    setIsChoice(false);
    setClickedIdx(0);
    setClickedTitle('');
  };

  const [isChoice, setIsChoice] = useState(false);
  const [clickedIdx, setClickedIdx] = useState<number>();
  const [clickedTitle, setClickedTitle] = useState<string>();

  const [data, setData] = useState<DataType | undefined>();

  useEffect(() => {
    if (selectedTextbook && selectedTextbook.type) {
      setData(() => {
        return processData(selectedTextbook);
      });
    }
  }, [selectedTextbook, tabVeiw]);

  // 선택시 배경색이 나타남
  const choiceType = (idx: number, title: string) => {
    setIsChoice(!isChoice);
    setClickedIdx(idx);
    setClickedTitle(title);
  };

  // 전체 선택
  const checkAllToggle = (
    pageSeq: number,
    isChecked: boolean,
    contentSeqs: number[],
  ) => {
    setData((prevData) => {
      if (!prevData) return prevData;

      const targetPage = prevData.page.find((page) => page.seq === pageSeq);

      if (targetPage) {
        targetPage.isChecked = !isChecked;

        if (contentSeqs.length > 0) {
          targetPage.content.forEach((content) => {
            if (contentSeqs.includes(content.seq)) {
              content.isChecked = !isChecked;
            }
          });
        }
      }

      return { ...prevData };
    });
  };

  //부분 선택
  const checkPartialToggle = (
    pageSeq: number,
    contentSeq: number,
    isChecked: boolean,
  ) => {
    setData((prevData) => {
      if (!prevData) return prevData;

      const targetPage = prevData.page.find((page) => page.seq === pageSeq);

      if (targetPage) {
        const targetContent = targetPage.content.find(
          (content) => content.seq === contentSeq,
        );

        if (targetContent) {
          targetContent.isChecked = !isChecked;

          // 모든 컨텐츠가 선택되어 있는지 확인
          const allContentsChecked = targetPage.content.every(
            (content) => content.isChecked,
          );

          // 페이지의 isChecked 업데이트
          targetPage.isChecked = allContentsChecked;
        }
      }

      const newData = { ...prevData, page: [...prevData.page] };
      return newData;
    });
  };

  // 수능/모의고사
  const getCategoryExamGroups = async () => {
    const response = await classificationInstance.get('/v1/category/group/D'); //TODO: /group/${``} 하드코딩된 유형 나중에 해당 변수로 변경
    // console.log(response.data.data.typeList);
    return response.data.data.typeList;
  };
  const { data: examData } = useQuery({
    queryKey: ['get-category-exam-groups'],
    queryFn: getCategoryExamGroups,
    // enabled: !!categoryData,
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

  // console.log(
  //   categoryList[3].map((el) => {
  //     return el.name;
  //   }),
  // );
  //console.log(examData);
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
    examGrade.includes('고1') &&
    examGrade.includes('고2') &&
    examGrade.includes('고3');

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

  const [examOption, setExamOption] = useState<string | null>(null);
  const selectExamOption = (newValue: string | null) => {
    setExamOption(newValue);
  };
  const selectExamReset = () => {
    setExamGrade([]);
    setExamYear([]);
    setExamMonthly([]);
    setExamOption(null);
  };
  const selectExam = () => {
    setIsDropdown(false);
  };

  const mockexamList: MockexamType[] = dummy.Mockexam;
  const [processedData, setProcessedData] = useState(
    processMockexam(mockexamList),
  );

  const removeMockexam = (seq: number) => {
    setProcessedData((prevData) => prevData.filter((mock) => mock.seq !== seq));
  };

  // 전체 선택
  const checkAllMockexamToggle = (
    seq: number,
    isChecked: boolean,
    contentSeqs: number[],
  ) => {
    //setProcessedData에 있는 기존 값을 가져와서 그 값을 순회하며 비교하여 값을 갱신
    setProcessedData((prevData) => {
      const newData = prevData.map((mock) => {
        if (mock.seq === seq) {
          mock.isChecked = !isChecked;

          if (contentSeqs.length > 0) {
            mock.content.forEach((content) => {
              if (contentSeqs.includes(content.seq)) {
                content.isChecked = !isChecked;
              }
            });
          }
        }
        // 갱신된 값을 가져오기
        return mock;
      });
      //가져온 값을 최종적으로 상태값으로 갱신하기
      return [...newData];
    });
  };

  //부분 선택
  const checkPartialMockexamToggle = (
    seq: number,
    contentSeq: number,
    isChecked: boolean,
  ) => {
    setProcessedData((prevData) => {
      const newData = prevData.map((mock) => {
        if (mock.seq === seq) {
          const targetContent = mock.content.find(
            (content) => content.seq === contentSeq,
          );

          if (targetContent) {
            targetContent.isChecked = !isChecked;

            const allContentsChecked = mock.content.every(
              (content) => content.isChecked,
            );
            mock.isChecked = allContentsChecked;
          }
        }
        return mock;
      });

      return [...newData];
    });
  };

  // step1 선택된 문항 불러오기 api
  const postWorkbookStep1 = (data: any) => {
    return classificationInstance.post(`/v1/item/quiz`, data);
  };
  // console.log(questionLevel);
  const clickNextButton = () => {
    const data = {
      itemTreeIdxList: [
        radio1depthCheck.checkValue,
        radio2depthCheck.checkValue,
        radio3depthCheck.checkValue,
        radio4depthCheck.checkValue,
      ],
      quizCategory: {
        난이도: questionLevel,
        출처: '내신',
        문항타입: questionType.join(', '),
        문항수: questionNum,
      },
    };
    //console.log(data);
    postStep1Data(data);
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
      saveLocalData(response.data.data);
      navigate('/content-create/exam/step2');
      // openToastifyAlert({
      //   type: 'success',
      //   text: response.data.message,
      // });
    },
  });
  const [sendLocalData, setSendLocalData] = useState<any | null>(null);

  // 로컬 스토리지에서 데이터 가져오기
  useEffect(() => {
    const data = localStorage.getItem('sendData');
    if (data) {
      const parsedData = JSON.parse(data);
      console.log('데이터 조회', parsedData);
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

  // console.log(sendLocalData);

  // 로컬스토리지에 보낼데이터 저장
  const saveLocalData = (data: any) => {
    const sendData = { data: data };
    localStorage.setItem('sendData', JSON.stringify(sendData));
  };

  const moveStep2 = () => {
    clickNextButton();
  };

  useEffect(() => {
    //단원 유형별버튼 초기화
    setQuestionNum(null);
    setQuestionLevel('');
    setQuestionType([]);
    setContainMock('');
    setIsOption1(false);
    setIsOption2(false);
    setIsOption3(false);
    setIsOption4(false);
    //모의시험 버튼 초기화
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
                  />
                </TabWrapper>
                <CategoryWrapper>
                  {isCategoryLoaded && categoryItems[0] && categoryList && (
                    <>
                      {[categoryItems[0]].map((item) => (
                        <div
                          className={`1depth`}
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

                      {radio1depthCheck.code !== '' &&
                        selected1depth !== '' &&
                        [categoryItems[1]].map((item) => (
                          <div
                            className={`2depth`}
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

                      {radio2depthCheck.code !== '' &&
                        selected2depth !== '' &&
                        [categoryItems[2]].map((item) => (
                          <div
                            className={`3depth`}
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
                      {radio3depthCheck.code !== '' &&
                        selected3depth !== '' &&
                        [categoryItems[3]].map((item) => (
                          <div
                            className={`4depth`}
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
                  {radio1depthCheck.code !== '' &&
                  radio2depthCheck.code !== '' &&
                  radio3depthCheck.code !== '' &&
                  radio4depthCheck.code !== '' &&
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
                          <p className="line bottom_text">Total : {`${0}`}</p>

                          {categoryItemTreeData ? (
                            <>
                              {itemTree.length ? (
                                <>
                                  {itemTree.map((el, idx) => (
                                    <div key={`${el.itemTreeKey}`}>
                                      {el.itemTreeList.map((item) => (
                                        <DepthBlock
                                          key={`depthList${item.code} ${item.name}`}
                                          classNameList={`depth-${item.level}`}
                                          id={item.code}
                                          name={item.name}
                                          value={item.code}
                                          onChange={(e) =>
                                            handleSingleCheck(
                                              e.target.checked,
                                              item.code,
                                            )
                                          }
                                          checked={
                                            checkedDepthList.includes(item.code)
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
                        </RowListWrapper>
                      </Accordion>

                      <Accordion
                        title={'추가정보'}
                        id={'추가정보'}
                        $margin={'4px 0 0 0 '}
                      >
                        <RowListWrapper>
                          {/* <div className="etc1">
                          {selectCategoryEtc1.map((meta) => (
                            <ButtonFormatRadio
                              key={`${meta.id}`}
                              titleText={`${meta.label}`}
                              list={meta.options}
                              selected={selectedCategoryEtc1}
                              onChange={(e) => handleRadioCheck(e, meta.label)}
                              // defaultChecked={} //저장된 값 디폴트체크로
                              checkedInput={radioCheck}
                            />
                          ))}
                        </div>
                        <div className="etc2">
                          {selectCategoryEtc2.map((meta) => (
                            <ButtonFormatRadio
                              key={`${meta.id}`}
                              titleText={`${meta.label}`}
                              list={meta.options}
                              selected={selectedCategoryEtc2}
                              onChange={(e) => handleRadioCheck(e, meta.label)}
                              // defaultChecked={} //저장된 값 디폴트체크로
                              checkedInput={radioCheck}
                            />
                          ))}
                        </div> */}
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
                      onClick={() => selectQuestionNum('')}
                      style={{
                        color:
                          questionNum === '' ? 'white' : `${COLOR.PRIMARY}`,
                        backgroundColor:
                          questionNum === '' ? `${COLOR.PRIMARY}` : 'white',
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
                  <AdditionOption>
                    <IoSettingsOutline
                      onClick={openDifficultySetting}
                      style={{ cursor: 'pointer' }}
                    />
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
                      selectQuestionLevel('하');
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'74px'}
                    fontSize="14px"
                    $normal={questionLevel !== '하'}
                    $filled={questionLevel === '하'}
                    cursor
                  >
                    <span>하</span>
                  </Button>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      selectQuestionLevel('중하');
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'74px'}
                    fontSize="14px"
                    $normal={questionLevel !== '중하'}
                    $filled={questionLevel === '중하'}
                    cursor
                  >
                    <span>중하</span>
                  </Button>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      selectQuestionLevel('중');
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'74px'}
                    fontSize="14px"
                    $normal={questionLevel !== '중'}
                    $filled={questionLevel === '중'}
                    cursor
                  >
                    <span>중</span>
                  </Button>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      selectQuestionLevel('상');
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'74px'}
                    fontSize="14px"
                    $normal={questionLevel !== '상'}
                    $filled={questionLevel === '상'}
                    cursor
                  >
                    <span>상</span>
                  </Button>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      selectQuestionLevel('최상');
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'74px'}
                    fontSize="14px"
                    $normal={questionLevel !== '최상'}
                    $filled={questionLevel === '최상'}
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
                        setQuestionType(['객관식', '주관식', '서술형']);
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
                      selectQuestionType('객관식');
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'117px'}
                    fontSize="14px"
                    $normal={!questionType.includes('객관식')}
                    $filled={questionType.includes('객관식')}
                    cursor
                  >
                    <span>객관식</span>
                  </Button>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      selectQuestionType('주관식');
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'117px'}
                    fontSize="14px"
                    $normal={!questionType.includes('주관식')}
                    $filled={questionType.includes('주관식')}
                    cursor
                  >
                    <span>주관식</span>
                  </Button>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      selectQuestionType('서술형');
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'117px'}
                    fontSize="14px"
                    $normal={!questionType.includes('서술형')}
                    $filled={questionType.includes('서술형')}
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
                      selectContainMock('포함');
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'161px'}
                    fontSize="14px"
                    $normal={containMock !== '포함'}
                    $filled={containMock === '포함'}
                    cursor
                  >
                    <span>포함</span>
                  </Button>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      selectContainMock('제외');
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'160px'}
                    fontSize="14px"
                    $normal={containMock !== '제외'}
                    $filled={containMock === '제외'}
                    cursor
                  >
                    <span>제외</span>
                  </Button>
                  <Button
                    buttonType="button"
                    onClick={() => {
                      selectContainMock('모의고사만');
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'160px'}
                    fontSize="14px"
                    $normal={containMock !== '모의고사만'}
                    $filled={containMock === '모의고사만'}
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
                      selectEqualScore('선택안함');
                    }}
                    $padding="10px"
                    height={'34px'}
                    width={'246px'}
                    fontSize="14px"
                    $normal={equalScore !== '선택안함'}
                    $filled={equalScore === '선택안함'}
                    cursor
                  >
                    <span>선택안함</span>
                  </Button>
                  <Button
                    buttonType="button"
                    onClick={openEqualScoreSettingModal}
                    $padding="10px"
                    height={'34px'}
                    width={'245px'}
                    fontSize="14px"
                    $normal={equalScore !== '균등배점'}
                    $filled={equalScore === '균등배점'}
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
                    <CheckBox isChecked={isOption3} onClick={selectOption3} />
                    문항 수 균등 배분
                  </AdditionOption>
                  <AdditionOption>
                    <CheckBox
                      isChecked={isOption4}
                      onClick={selectOption4}
                    ></CheckBox>
                    내 문항 우선 추천
                  </AdditionOption>
                </AdditionOptionList>
                <Summary>
                  학습지 문항수 {inputValue || questionNum} 개 | 유형 3개
                </Summary>
              </SchoolSelectorSection>
            </>
          )}
          {tabVeiw === '시중교재' && (
            <>
              {isSelectTextbook && (
                <>
                  <CategorySection>
                    <TabWrapper
                      onClick={() => {
                        selectSchoolLevel('초');
                        setgradeLevel('');
                      }}
                    >
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
                            selectSchoolLevel('초');
                            selectGradeLevel('');
                          }}
                          $padding="10px"
                          height={'34px'}
                          width={'97px'}
                          fontSize="14px"
                          $normal={schoolLevel !== '초'}
                          $filled={schoolLevel === '초'}
                          cursor
                        >
                          <span>초</span>
                        </Button>
                        <Button
                          buttonType="button"
                          onClick={() => {
                            selectSchoolLevel('중');
                            selectGradeLevel('');
                          }}
                          $padding="10px"
                          height={'34px'}
                          width={'97px'}
                          fontSize="14px"
                          $normal={schoolLevel !== '중'}
                          $filled={schoolLevel === '중'}
                          cursor
                        >
                          <span>중</span>
                        </Button>
                        <Button
                          buttonType="button"
                          onClick={() => {
                            selectSchoolLevel('고');
                            selectGradeLevel('');
                          }}
                          $padding="10px"
                          height={'34px'}
                          width={'97px'}
                          fontSize="14px"
                          $normal={schoolLevel !== '고'}
                          $filled={schoolLevel === '고'}
                          cursor
                        >
                          <span>고</span>
                        </Button>
                        <DivideBar>|</DivideBar>
                        {schoolLevel === '중' || schoolLevel === '고' ? (
                          <SelectorGroup>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('1학년');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '1학년'}
                              $filled={gradeLevel === '1학년'}
                              cursor
                            >
                              <span>1학년</span>
                            </Button>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('2학년');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '2학년'}
                              $filled={gradeLevel === '2학년'}
                              cursor
                            >
                              <span>2학년</span>
                            </Button>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('3학년');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '3학년'}
                              $filled={gradeLevel === '3학년'}
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
                                selectGradeLevel('1학년');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '1학년'}
                              $filled={gradeLevel === '1학년'}
                              cursor
                            >
                              <span>1학년</span>
                            </Button>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('2학년');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '2학년'}
                              $filled={gradeLevel === '2학년'}
                              cursor
                            >
                              <span>2학년</span>
                            </Button>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('3학년');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '3학년'}
                              $filled={gradeLevel === '3학년'}
                              cursor
                            >
                              <span>3학년</span>
                            </Button>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('4학년');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '4학년'}
                              $filled={gradeLevel === '4학년'}
                              cursor
                            >
                              <span>4학년</span>
                            </Button>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('5학년');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '5학년'}
                              $filled={gradeLevel === '5학년'}
                              cursor
                            >
                              <span>5학년</span>
                            </Button>
                            <Button
                              buttonType="button"
                              onClick={() => {
                                selectGradeLevel('6학년');
                              }}
                              $padding="10px"
                              height={'34px'}
                              width={'90px'}
                              fontSize="14px"
                              $normal={gradeLevel !== '6학년'}
                              $filled={gradeLevel === '6학년'}
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
                        value={searchValue}
                        width={'50%'}
                        height="40px"
                        onClick={() => filterSearchValue()}
                        onKeyDown={(e) => {}}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="교재명 검색"
                      />
                    </SearchWrapper>
                    <ListWrapper>
                      <ListTitleWrapper>
                        <ListTitle className="schoolGrade">학교급</ListTitle>
                        <ListTitle className="title">교재명</ListTitle>
                        <ListTitle className="series">시리즈</ListTitle>
                        <ListTitle className="publisher">출판사</ListTitle>
                      </ListTitleWrapper>
                      {textbookList.map((book, idx) => (
                        <TextbookList
                          key={idx}
                          onClick={() => selectTextbook(book)}
                        >
                          <div className="schoolGrade">{book.schoolGrade}</div>
                          <div className="title">{book.title}</div>
                          <div className="series">{book.series}</div>
                          <div className="publisher">{book.publisher}</div>
                        </TextbookList>
                      ))}
                    </ListWrapper>
                  </CategorySection>
                  <SchoolSelectorSection
                    $isSelectTextbookContent={isSelectTextbookContent}
                    $tabVeiw={tabVeiw}
                  >
                    <SubTitleWrapper>
                      <Label value="*문항수" fontSize="16px" width="60px" />
                      <Label
                        value="최대 100문항"
                        fontSize="12px"
                        width="440px"
                      />
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
                          onClick={() => selectQuestionNum('')}
                          style={{
                            color:
                              questionNum === '' ? 'white' : `${COLOR.PRIMARY}`,
                            backgroundColor:
                              questionNum === '' ? `${COLOR.PRIMARY}` : 'white',
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
                      <AdditionOption>
                        <IoSettingsOutline
                          onClick={openDifficultySetting}
                          style={{ cursor: 'pointer' }}
                        />
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
                          selectQuestionLevel('하');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'74px'}
                        fontSize="14px"
                        $normal={questionLevel !== '하'}
                        $filled={questionLevel === '하'}
                        cursor
                      >
                        <span>하</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionLevel('중하');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'74px'}
                        fontSize="14px"
                        $normal={questionLevel !== '중하'}
                        $filled={questionLevel === '중하'}
                        cursor
                      >
                        <span>중하</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionLevel('중');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'74px'}
                        fontSize="14px"
                        $normal={questionLevel !== '중'}
                        $filled={questionLevel === '중'}
                        cursor
                      >
                        <span>중</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionLevel('상');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'74px'}
                        fontSize="14px"
                        $normal={questionLevel !== '상'}
                        $filled={questionLevel === '상'}
                        cursor
                      >
                        <span>상</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionLevel('최상');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'74px'}
                        fontSize="14px"
                        $normal={questionLevel !== '최상'}
                        $filled={questionLevel === '최상'}
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
                            setQuestionType(['객관식', '주관식', '서술형']);
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
                          selectQuestionType('객관식');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'117px'}
                        fontSize="14px"
                        $normal={!questionType.includes('객관식')}
                        $filled={questionType.includes('객관식')}
                        cursor
                      >
                        <span>객관식</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionType('주관식');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'117px'}
                        fontSize="14px"
                        $normal={!questionType.includes('주관식')}
                        $filled={questionType.includes('주관식')}
                        cursor
                      >
                        <span>주관식</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionType('서술형');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'117px'}
                        fontSize="14px"
                        $normal={!questionType.includes('서술형')}
                        $filled={questionType.includes('서술형')}
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
                          selectContainMock('포함');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'161px'}
                        fontSize="14px"
                        $normal={containMock !== '포함'}
                        $filled={containMock === '포함'}
                        cursor
                      >
                        <span>포함</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectContainMock('제외');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'160px'}
                        fontSize="14px"
                        $normal={containMock !== '제외'}
                        $filled={containMock === '제외'}
                        cursor
                      >
                        <span>제외</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectContainMock('모의고사만');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'160px'}
                        fontSize="14px"
                        $normal={containMock !== '모의고사만'}
                        $filled={containMock === '모의고사만'}
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
                          selectEqualScore('선택안함');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'246px'}
                        fontSize="14px"
                        $normal={equalScore !== '선택안함'}
                        $filled={equalScore === '선택안함'}
                        cursor
                      >
                        <span>선택안함</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={openEqualScoreSettingModal}
                        $padding="10px"
                        height={'34px'}
                        width={'245px'}
                        fontSize="14px"
                        $normal={equalScore !== '균등배점'}
                        $filled={equalScore === '균등배점'}
                        cursor
                      >
                        <span>균등 배점</span>
                      </Button>
                    </SelectorGroup>
                    <AdditionOptionList>
                      <Label value="추가 옵션" fontSize="16px" width="200px" />
                      <AdditionOption>
                        <CheckBox
                          isChecked={isOption3}
                          onClick={selectOption3}
                        />
                        문항 수 균등 배분
                      </AdditionOption>
                      <AdditionOption>
                        <CheckBox
                          isChecked={isOption4}
                          onClick={selectOption4}
                        ></CheckBox>
                        내 문항 우선 추천
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
                        value={selectedTextbook?.title as string}
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
                      {selectedTextbook?.type?.map((types, idx) => (
                        <TextbookTypeWrapper key={idx}>
                          <TextbookTypeTitleWrapper>
                            <TextbookTypeTitleWrapperLeft>
                              <Label
                                value={types.title as string}
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
                          {data?.page.map((page) => (
                            <SelectWrapper key={page.seq}>
                              <LeftWrapper
                                onClick={() => choiceType(page.seq, page.title)}
                                $isChoice={clickedIdx === page.seq}
                                $choicedIdx={clickedIdx}
                              >
                                <CheckBox
                                  onClick={() =>
                                    checkAllToggle(
                                      page.seq,
                                      page.isChecked as boolean,
                                      page.content.map((el) => el.seq),
                                    )
                                  }
                                  isChecked={page.isChecked as boolean}
                                  width="15"
                                  height="15"
                                />
                                <Label value={page.title} width="100px" />
                              </LeftWrapper>
                              <RightWrapper>
                                {/* <Label value="유형UP" /> */}
                                {page.content.map(
                                  (content) =>
                                    clickedTitle === content.pageTitle && (
                                      <CheckBoxWrapper key={content.seq}>
                                        <CheckBox
                                          onClick={() =>
                                            checkPartialToggle(
                                              page.seq,
                                              content.seq,
                                              content.isChecked || false,
                                            )
                                          }
                                          isChecked={content.isChecked || false}
                                          width="15"
                                          height="15"
                                        />
                                        <Label
                                          value={content.title}
                                          width="30px"
                                        />
                                      </CheckBoxWrapper>
                                    ),
                                )}
                              </RightWrapper>
                            </SelectWrapper>
                          ))}
                        </TextbookTypeWrapper>
                      ))}
                    </TextbookWrapper>
                  </CategorySection>
                  <SchoolSelectorSection>
                    <SubTitleWrapper>
                      <Label value="*문항수" fontSize="16px" width="60px" />
                      <Label
                        value="최대 100문항"
                        fontSize="12px"
                        width="440px"
                      />
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
                          onClick={() => selectQuestionNum('')}
                          style={{
                            color:
                              questionNum === '' ? 'white' : `${COLOR.PRIMARY}`,
                            backgroundColor:
                              questionNum === '' ? `${COLOR.PRIMARY}` : 'white',
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
                      <AdditionOption>
                        <IoSettingsOutline
                          onClick={openDifficultySetting}
                          style={{ cursor: 'pointer' }}
                        />
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
                          selectQuestionLevel('하');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'74px'}
                        fontSize="14px"
                        $normal={questionLevel !== '하'}
                        $filled={questionLevel === '하'}
                        cursor
                      >
                        <span>하</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionLevel('중하');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'74px'}
                        fontSize="14px"
                        $normal={questionLevel !== '중하'}
                        $filled={questionLevel === '중하'}
                        cursor
                      >
                        <span>중하</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionLevel('중');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'74px'}
                        fontSize="14px"
                        $normal={questionLevel !== '중'}
                        $filled={questionLevel === '중'}
                        cursor
                      >
                        <span>중</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionLevel('상');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'74px'}
                        fontSize="14px"
                        $normal={questionLevel !== '상'}
                        $filled={questionLevel === '상'}
                        cursor
                      >
                        <span>상</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionLevel('최상');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'74px'}
                        fontSize="14px"
                        $normal={questionLevel !== '최상'}
                        $filled={questionLevel === '최상'}
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
                            setQuestionType(['객관식', '주관식', '서술형']);
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
                          selectQuestionType('객관식');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'117px'}
                        fontSize="14px"
                        $normal={!questionType.includes('객관식')}
                        $filled={questionType.includes('객관식')}
                        cursor
                      >
                        <span>객관식</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionType('주관식');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'117px'}
                        fontSize="14px"
                        $normal={!questionType.includes('주관식')}
                        $filled={questionType.includes('주관식')}
                        cursor
                      >
                        <span>주관식</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectQuestionType('서술형');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'117px'}
                        fontSize="14px"
                        $normal={!questionType.includes('서술형')}
                        $filled={questionType.includes('서술형')}
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
                          selectContainMock('포함');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'161px'}
                        fontSize="14px"
                        $normal={containMock !== '포함'}
                        $filled={containMock === '포함'}
                        cursor
                      >
                        <span>포함</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectContainMock('제외');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'160px'}
                        fontSize="14px"
                        $normal={containMock !== '제외'}
                        $filled={containMock === '제외'}
                        cursor
                      >
                        <span>제외</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={() => {
                          selectContainMock('모의고사만');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'160px'}
                        fontSize="14px"
                        $normal={containMock !== '모의고사만'}
                        $filled={containMock === '모의고사만'}
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
                          selectEqualScore('선택안함');
                        }}
                        $padding="10px"
                        height={'34px'}
                        width={'246px'}
                        fontSize="14px"
                        $normal={equalScore !== '선택안함'}
                        $filled={equalScore === '선택안함'}
                        cursor
                      >
                        <span>선택안함</span>
                      </Button>
                      <Button
                        buttonType="button"
                        onClick={openEqualScoreSettingModal}
                        $padding="10px"
                        height={'34px'}
                        width={'245px'}
                        fontSize="14px"
                        $normal={equalScore !== '균등배점'}
                        $filled={equalScore === '균등배점'}
                        cursor
                      >
                        <span>균등 배점</span>
                      </Button>
                    </SelectorGroup>
                    <AdditionOptionList>
                      <Label value="추가 옵션" fontSize="16px" width="200px" />
                      <AdditionOption>
                        <CheckBox
                          isChecked={isOption3}
                          onClick={selectOption3}
                        />
                        문항 수 균등 배분
                      </AdditionOption>
                      <AdditionOption>
                        <CheckBox
                          isChecked={isOption4}
                          onClick={selectOption4}
                        ></CheckBox>
                        내 문항 우선 추천
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
                        <MockExamSummary>학습지 문항수 {100}개</MockExamSummary>
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
                          <Label value="학년 선택" fontSize="14px" />
                          <Label value="복수 선택 가능" fontSize="12px" />
                        </MockExamTitleWrapper>
                        <MockExamButtonWrapper>
                          <Button
                            buttonType="button"
                            onClick={() => {
                              if (isAllSelectedExamGrade) {
                                setExamGrade([]);
                              } else {
                                setExamGrade(['고1', '고2', '고3']);
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
                            onClick={() => selectExamGrade('고1')}
                            $padding="10px"
                            height={'35px'}
                            width={'160px'}
                            fontSize="13px"
                            $normal={!examGrade.includes('고1')}
                            $filled={examGrade.includes('고1')}
                            cursor
                          >
                            <span>고1</span>
                          </Button>
                          <Button
                            buttonType="button"
                            onClick={() => selectExamGrade('고2')}
                            $padding="10px"
                            height={'35px'}
                            width={'160px'}
                            fontSize="13px"
                            $normal={!examGrade.includes('고2')}
                            $filled={examGrade.includes('고2')}
                            cursor
                          >
                            <span>고2</span>
                          </Button>
                          <Button
                            buttonType="button"
                            onClick={() => selectExamGrade('고3')}
                            $padding="10px"
                            height={'35px'}
                            width={'160px'}
                            fontSize="13px"
                            $normal={!examGrade.includes('고3')}
                            $filled={examGrade.includes('고3')}
                            cursor
                          >
                            <span>고3</span>
                          </Button>
                        </MockExamButtonWrapper>
                      </MockExamOptionWrapper>
                      <MockExamOptionWrapper>
                        <MockExamTitleWrapper>
                          <Label value="년도 선택" fontSize="14px" />
                          <Label value="복수 선택 가능" fontSize="12px" />
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
                          <Label value="월 선택" fontSize="14px" />
                          <Label value="복수 선택 가능" fontSize="12px" />
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
                            width="100px"
                          />
                        </MockExamSingleTitleWrapper>
                        <MockExamButtonWrapper>
                          <Button
                            buttonType="button"
                            onClick={() => selectExamOption('문항 번호로 추가')}
                            $padding="10px"
                            height={'35px'}
                            width={'160px'}
                            fontSize="13px"
                            $normal={examOption !== '문항 번호로 추가'}
                            $filled={examOption === '문항 번호로 추가'}
                            cursor
                          >
                            <span>문항 번호로 추가</span>
                          </Button>
                          <Button
                            buttonType="button"
                            onClick={() => selectExamOption('단원으로 추가')}
                            $padding="10px"
                            height={'35px'}
                            width={'160px'}
                            fontSize="13px"
                            $normal={examOption !== '단원으로 추가'}
                            $filled={examOption === '단원으로 추가'}
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
                  <MockExamContentWrapper>
                    {processedData.map((mock) => (
                      <MockExamBox key={mock.seq}>
                        <MockExamLabelWrapper>
                          <CheckBoxWrapper>
                            <CheckBox
                              isChecked={mock.isChecked as boolean}
                              width="15"
                              height="15"
                              onClick={() =>
                                checkAllMockexamToggle(
                                  mock.seq,
                                  mock.isChecked as boolean,
                                  mock.content.map((content) => content.seq),
                                )
                              }
                            ></CheckBox>
                            <Label
                              value={`${mock.grade} | ${mock.year} ${mock.month}`}
                              width="150px"
                            />
                          </CheckBoxWrapper>
                          <CloseIconWrapper>
                            <IoMdClose
                              style={{ cursor: 'pointer' }}
                              onClick={() => removeMockexam(mock.seq)}
                            />
                          </CloseIconWrapper>
                        </MockExamLabelWrapper>
                        <MockExamContent>
                          {mock.content.map((el) => (
                            <CheckBoxWrapper key={el.seq}>
                              <CheckBox
                                isChecked={el.isChecked as boolean}
                                width="15"
                                height="15"
                                onClick={() =>
                                  checkPartialMockexamToggle(
                                    mock.seq,
                                    el.seq,
                                    el.isChecked as boolean,
                                  )
                                }
                              ></CheckBox>
                              <Label value={el.title} width="30px" />
                            </CheckBoxWrapper>
                          ))}
                        </MockExamContent>
                      </MockExamBox>
                    ))}
                  </MockExamContentWrapper>
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
      {isDifficulty && (
        <Overlay>
          <DifficultyRate onClose={closeDifficultySetting} />
        </Overlay>
      )}
      {isEqualScoreModal && (
        <Overlay>
          <EqualScoreModalContainer>
            <EqualScoreModalWrapper>
              <EqualScoreModalTitleWrapper>
                <Label
                  value={`총 ${questionNum || inputValue} 문항`}
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
                    value={equalInputValue}
                    maxLength={10}
                    minLength={2}
                    onClick={() => {
                      setEqualInputValue('');
                      setIsSaveEqualValue(false);
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
                      01번 문항부터 {questionNum || inputValue}번 문항까지
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
                      01번 문항부터 {remainderContent}번 문항까지{' '}
                      {quotient || 0}점
                    </div>
                    <div>
                      {nextRemainderContent}번 문항부터{' '}
                      {questionNum || inputValue}번 문항까지 {quotient + 1 || 0}
                      점
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
                  onClick={closeEqualScoreSettingModal}
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
const CategorySection = styled.section`
  //flex: 1 0 30%;
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
const SchoolSelectorSection = styled.section<{
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
  $choicedIdx?: number;
}>`
  display: flex;
  align-items: center;
  flex: 1 0 0;
  gap: 5px;
  padding: 5px 10px;
  background-color: ${({ $isChoice, $choicedIdx }) =>
    $isChoice && $choicedIdx ? COLOR.SELECT_BLUE : 'white'};
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
