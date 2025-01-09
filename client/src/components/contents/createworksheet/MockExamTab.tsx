import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { useQuery } from '@tanstack/react-query';
import { IoMdClose, IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import styled from 'styled-components';

import {
  openToastifyAlert,
  CheckBox,
  Button,
  TabMenu,
  Input,
  Label,
  Loader,
} from '../..';
import { classificationInstance, quizService } from '../../../api/axios';
import { pageAtom } from '../../../store/utilAtom';
import {
  ItemCategoryType,
  csatListType,
  CastQuizListType,
} from '../../../types';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { COLOR } from '../../constants';

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

type MockExamTabProps = {
  menuList: {
    label: string;
    value: string;
  }[];
  tabView: string;
  setTabView: React.Dispatch<React.SetStateAction<string>>;
  //선택된 문항리스트
  includeQuizList: string[];
  setIncludeQuizList: React.Dispatch<React.SetStateAction<string[]>>;
  //배점
  equalScore: number | null;
  setEqualScore: React.Dispatch<React.SetStateAction<number | null>>;
  //선택한 문항 코드 넣는 함수
  toggleQuizCode: (quizCode: string | string[], isChecked: boolean) => void;
  //전달받은 문항수
  receivedQuizCount: number | null;
};

export function MockExamTab({
  menuList,
  tabView,
  setTabView,
  includeQuizList,
  setIncludeQuizList,
  equalScore,
  setEqualScore,
  toggleQuizCode,
  receivedQuizCount,
}: MockExamTabProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // 드롭다운에서 선택한 값으로 더미데이터를 대신해서 넣고 선택 완료를 누르면 서버에 요청해서 값을 저장함
  const [isDropdown, setIsDropdown] = useState(false);

  //서버로부터 받아온 년도, 월 값
  const [categoryList, setCategoryList] = useState<ItemCategoryType[][]>([
    [{ code: '', idx: 0, name: '' }],
  ]);
  //학년
  const [examGrade, setExamGrade] = useState<string[]>([]);
  //년도
  const [examYear, setExamYear] = useState<string[]>([]);
  //월
  const [examMonthly, setExamMonthly] = useState<string[]>([]);
  //문항 추가 옵션
  const [examOption, setExamOption] = useState<number | null>(null);
  //총 배점
  const [equalTotalValue, setEqualTotlaValue] = useState('0');
  //나머지 컨텐츠
  const [remainderContent, setRemainderContent] = useState<number>();
  //나머지 시작 전 컨텐츠
  const [nextRemainderContent, setNextRemainderContent] = useState<number>();

  //문항당 배점
  const [quotient, setQuotient] = useState<number>(0);
  //나머지 배점
  const [remainder, setRemainder] = useState<number>();
  //문항당 최소배점
  const [minQuotient, setMinQuotient] = useState<number>();
  //문항당 최고배점
  const [maxQuotient, setMaxQuotient] = useState<number>();
  //배점 모달
  const [isEqualScoreModal, setIsEqualScoreModal] = useState<boolean>(false);
  // 문항당 배점
  const [isSaveEqualValue, setIsSaveEqualValue] = useState<boolean>(false);

  //문항 번호로 추가
  const [castQuizListData, setCastQuizListData] = useState<CastQuizListType[]>(
    [],
  );
  //문항 번호로 추가 데이터 가공
  const [processCastQuizListData, setProcessCastQuizListData] = useState<
    ProcessCsatQuizListDataType[]
  >([]);
  //단원으로 추가
  const [castListData, setCastListData] = useState<csatListType[]>([]);
  //단원으로 추가 데이터 가공
  const [processCastListData, setProcessCastListData] = useState<
    ProcessCsatListDataType[]
  >([]);

  //리프레시토큰 호출을 위한 상태관리
  const [refreshTokenCalled, setRefreshTokenCalled] = useState(false);

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
      //console.log('finally');
    }
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

  //수능모의고사 속성 호출 api
  const getCategoryExamGroups = async () => {
    const response = await classificationInstance.get('/v1/category/class/8'); //TODO: /group/${``} 하드코딩된 유형 나중에 해당 변수로 변경
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
    if (tabView === '수능/모의고사' && examData) {
      fetchCategoryItems(examData, setCategoryList);
    }
  }, [examData, tabView]);

  //드롭박스 열기
  const openDropdown = () => {
    setIsDropdown((prevState) => !prevState);
  };

  //학년 설정 함수
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
  //년도 설정 함수
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

  //월 설정 함수
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

  //문항 추가 옵션 설정 함수
  const selectExamOption = (newValue: number | null) => {
    setExamOption(newValue);
  };

  //균등 배점 선택여부
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
  //균등 배점 모달 오픈
  const openEqualScoreSettingModal = () => {
    if (includeQuizList.length > 0) {
      setIsEqualScoreModal(true);
      setIsSaveEqualValue(false);
    } else {
      openToastifyAlert({
        type: 'error',
        text: '문항을 먼저 선택해주세요',
      });
      selectEqualScore(null);
      setIsSaveEqualValue(false);
    }
  };

  //배점 인풋 설정 함수
  const changeEqualInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let equalTotalValue = e.target.value;
    // 정규표현식을 사용하여 숫자 이외의 문자 제거
    equalTotalValue = equalTotalValue.replace(/[^0-9]/g, '');

    const parsedValue = parseInt(equalTotalValue, 10);

    setEqualTotlaValue(parsedValue >= 200 ? '200' : equalTotalValue);
  };

  //배점 저장 함수
  const saveEqualInputValue = () => {
    //받아온 문항 수 넘버타입 변경
    const parsedreceivedQuiz = receivedQuizCount?.toString();
    //받아온 문항 수 넘버타입 변경
    const parsedreceivedQuizValue = parseInt(parsedreceivedQuiz as string, 10);
    //총배점 타입 변경
    const parsedValue = parseInt(equalTotalValue, 10);

    //선택된 문항 수
    const questionNumValue = parseInt(
      includeQuizList.length as unknown as string,
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
      setEqualTotlaValue(questionNumValue.toString());
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

  // 균등배점 모달 닫기
  const closeEqualScoreSettingModal = () => {
    setIsEqualScoreModal(false);
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

  //문항 배점 범위 설정
  useEffect(() => {
    const parsedValue = parseInt(equalTotalValue, 10);
    const questionNumValue = parseInt(
      includeQuizList.length as unknown as string,
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

  //균등 배점 선택했을시 로컬스토리지에 값저장
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

  //균등배점 저장
  const saveEqualScoreSettingModal = () => {
    if (isSaveEqualValue) {
      //재균등배점
      closeEqualScoreSettingModal();
      saveLocalQutientData();
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

  //문항 받아오는 api
  const getcsat = async () => {
    const grades = examGrade.join(',');
    const years = examYear.join(',');
    const months = examMonthly.join(',');
    const res = await quizService.get(
      `/v1/csat?option=${examOption}&level=고등&subject=수학&grades=${grades}&years=${years}&months=${months}`,
    );
    return res;
  };

  const {
    data: castData,
    refetch: castDataRefetch,
    isFetching: castDataLoading,
  } = useQuery({
    queryKey: ['get-cast'],
    queryFn: getcsat,
    meta: {
      errorMessage: 'get-cast 에러 메세지',
    },
    enabled: false,
  });

  //문항리스트
  useEffect(() => {
    if (castData) {
      setCastQuizListData(castData?.data.data.quizList);
    }
  }, [castData]);

  //단원리스트
  useEffect(() => {
    if (castData) {
      setCastListData(castData?.data.data.csatList);
    }
  }, [castData]);

  // 수능/모의고사 문항 번호 값을 받아왔을 때 원하는 모양의 데이타로 가공
  useEffect(() => {
    if (castQuizListData?.length > 0) {
      const initialData = castQuizListData.map((mock) => ({
        id: `${mock.grade}-${mock.level}-${mock.month}-${mock.year}`,
        ...mock,
        isChecked: false,
        quizNumberList: mock.quizNumberList
          .map((quiz) => ({
            ...quiz,
            isChecked: false,
          }))
          .sort((a, b) => Number(a.quizNumber) - Number(b.quizNumber)), // quizNumber로 정렬
      }));
      setProcessCastQuizListData(initialData);
    }
  }, [castQuizListData, castDataRefetch]);

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

  // 수능 모의고사 문항 get api 선택 완료
  const selectExam = () => {
    setIsDropdown(false);
    setIncludeQuizList([]);
    setProcessCastQuizListData([]);
    setProcessCastListData([]);
    setCastQuizListData([]);
    setCastListData([]);
    castDataRefetch();
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
    setCastQuizListData([]);
    setCastListData([]);
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

  const renderMockExamButtons = () => {
    const buttonOption = [
      { value: 1, label: '선택안함' },
      { value: 2, label: '균등 배점' },
    ];

    return (
      <MockExamSummaryWrapper>
        <MockExamSummary>
          학습지 문항수 {includeQuizList.length}개
        </MockExamSummary>
        {buttonOption.map((button) => (
          <Button
            key={button.value}
            buttonType="button"
            onClick={() => {
              selectEqualScore(button.value);
              if (button.value === 2) {
                openEqualScoreSettingModal();
              }
            }}
            $padding="10px"
            height={'34px'}
            width={'100%'}
            fontSize="14px"
            $normal={equalScore !== button.value}
            $filled={equalScore === button.value}
          >
            <span>{button.label}</span>
          </Button>
        ))}
        <Button
          buttonType="button"
          onClick={() => selectExamReset()}
          $padding="10px"
          height={'34px'}
          width={'100%'}
          fontSize="14px"
          $normal
          $filled
        >
          <span>선택 초기화</span>
        </Button>
      </MockExamSummaryWrapper>
    );
  };
  const renderMockExamSchoolGradeButtons = () => {
    const isAllSelectedExamGrade =
      examGrade.includes('1') &&
      examGrade.includes('2') &&
      examGrade.includes('3');
    const buttonOption = [
      { value: '1', label: '고1' },
      { value: '2', label: '고2' },
      { value: '3', label: '고3' },
    ];

    return (
      <>
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
          width={'100%'}
          fontSize="13px"
          $normal={!isAllSelectedExamGrade}
          $filled={isAllSelectedExamGrade}
          cursor
        >
          <span>전체</span>
        </Button>
        {buttonOption.map((button) => (
          <Button
            key={button.value}
            buttonType="button"
            onClick={() => selectExamGrade(button.value)}
            $padding="10px"
            height={'35px'}
            width={'100%'}
            fontSize="13px"
            $normal={!examGrade?.includes(button.value)}
            $filled={examGrade?.includes(button.value)}
            cursor
          >
            <span>{button.label}</span>
          </Button>
        ))}
      </>
    );
  };
  const renderMockExamYearButtons = () => {
    const isAllSelectedExamYear =
      examYear.includes('2024') &&
      examYear.includes('2023') &&
      examYear.includes('2022') &&
      examYear.includes('2021') &&
      examYear.includes('2020');

    return (
      <>
        <Button
          buttonType="button"
          onClick={() => {
            if (isAllSelectedExamYear) {
              setExamYear([]);
            } else {
              setExamYear(['2024', '2023', '2022', '2021', '2020']);
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
        {categoryList[2]?.map((el) => (
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
      </>
    );
  };
  const renderMockExamMonthButtons = () => {
    const isAllSelectedExamMonthly =
      examMonthly.includes('3') &&
      examMonthly.includes('4') &&
      examMonthly.includes('5') &&
      examMonthly.includes('6') &&
      examMonthly.includes('7') &&
      examMonthly.includes('9') &&
      examMonthly.includes('10') &&
      examMonthly.includes('11');
    const excludedNames = ['1', '2', '8', '12'];

    return (
      <>
        <Button
          buttonType="button"
          onClick={() => {
            if (isAllSelectedExamMonthly) {
              setExamMonthly([]);
            } else {
              setExamMonthly(['3', '4', '5', '6', '7', '9', '10', '11']);
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
          ?.filter((el) => {
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
      </>
    );
  };
  const renderMockExamOptions = () => {
    const buttonOption = [
      { value: 0, label: '문항 번호로 추가' },
      { value: 1, label: '단원으로 추가' },
    ];

    return buttonOption.map((button) => (
      <Button
        key={button.value}
        buttonType="button"
        onClick={() => selectExamOption(button.value)}
        $padding="10px"
        height={'35px'}
        width={'100%'}
        fontSize="13px"
        $normal={examOption !== button.value}
        $filled={examOption === button.value}
        cursor
      >
        <span>{button.label}</span>
      </Button>
    ));
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
            selected={tabView}
            setTabView={setTabView}
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
            {!isDropdown && <>{renderMockExamButtons()}</>}
          </MockExamSelectWrapper>
          {isDropdown && (
            <MockExamDropdownWrapper ref={dropdownRef}>
              <MockExamOptionWrapper>
                <MockExamTitleWrapper>
                  <Label value="학년 선택" fontSize="14px" center />
                  <Label value="복수 선택 가능" fontSize="12px" center />
                </MockExamTitleWrapper>
                <MockExamButtonWrapper>
                  {renderMockExamSchoolGradeButtons()}
                </MockExamButtonWrapper>
              </MockExamOptionWrapper>
              <MockExamOptionWrapper>
                <MockExamTitleWrapper>
                  <Label value="년도 선택" fontSize="14px" center />
                  <Label value="복수 선택 가능" fontSize="12px" center />
                </MockExamTitleWrapper>
                <MockExamHalfButtonWrapper>
                  {renderMockExamYearButtons()}
                </MockExamHalfButtonWrapper>
              </MockExamOptionWrapper>
              <MockExamOptionWrapper>
                <MockExamTitleWrapper>
                  <Label value="월 선택" fontSize="14px" center />
                  <Label value="복수 선택 가능" fontSize="12px" center />
                </MockExamTitleWrapper>
                <MockExamHalfButtonWrapper>
                  {renderMockExamMonthButtons()}
                </MockExamHalfButtonWrapper>
              </MockExamOptionWrapper>
              <MockExamOptionWrapper>
                <MockExamSingleTitleWrapper>
                  <Label value="문항 추가 옵션" fontSize="14px" center />
                </MockExamSingleTitleWrapper>
                <MockExamButtonWrapper>
                  {renderMockExamOptions()}
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
          {!castDataLoading ? (
            <>
              {examOption === 0 && processCastQuizListData.length > 0 && (
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
                                mock.quizNumberList.map((item) => item.code),
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
                            <Label value={`${el.quizNumber}번`} width="30px" />
                          </CheckBoxWrapper>
                        ))}
                      </MockExamContent>
                    </MockExamBox>
                  ))}
                </MockExamContentWrapper>
              )}
              {examOption === 1 && processCastListData.length > 0 && (
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
                        {renderHierarchicalData(mock.nodeData.hierarchicalData)}
                      </MockExamContent>
                    </MockExamBox>
                  ))}
                </MockExamContentWrapper>
              )}
            </>
          ) : (
            <>
              <Loader width="50px" />
            </>
          )}
        </MockExamWrapper>
      </CategorySection>
      {isEqualScoreModal && (
        <Overlay>
          <EqualScoreModalContainer>
            <EqualScoreModalWrapper>
              <EqualScoreModalTitleWrapper>
                <Label
                  value={`총 ${receivedQuizCount ? receivedQuizCount : includeQuizList.length} 문항`}
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
                        : includeQuizList.length}
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
                        : includeQuizList.length}
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
  width: 100%;
  gap: 10px;
`;
const MockExamSummary = styled.div`
  width: 100%;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
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
const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
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
