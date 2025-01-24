import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  openToastifyAlert,
  CheckBox,
  Button,
  TabMenu,
  Input,
  Label,
  Search,
  ValueNone,
  Loader,
  PaginationBox,
  Alert,
} from '../..';
import { quizService } from '../../../api/axios';
import { pageAtom } from '../../../store/utilAtom';
import { TextbookInfoType } from '../../../types/TextbookType';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { COLOR } from '../../constants';

import { MockExamTab } from './MockExamTab';
import { PreviousTab } from './PreviousTab';
import { SelectSection } from './SelectSection';
import { UnitTypeTab } from './UnitTypeTab';

type ProcessTextbookDataType = {
  pageList: {
    bookPage: string;
    isChecked: boolean;
    quizList: {
      idx: number;
      code: string;
      bookQuizNumber: string;
      isChecked: boolean;
      seq: string;
    }[];
  }[];
  subChapter: string;
};

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
  | RadioStateType[]
  | CategoryType;

export type CategoryType = {
  category: {
    대분류: string[];
    중분류: string[];
    소분류: string[];
    유형: string[];
    세분류: string[];
    미분류: string[];
  };
};

type NewClassificationType = {
  itemTreeList: {
    categoty: CategoryType[];
    교육과정: string;
    학기: string;
    학교급: string;
    과목: string;
    교과: string;
    학년: string;
  }[];
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
    {
      label: '기출',
      value: '기출',
    },
  ];
  const navigate = useNavigate();
  //탭메뉴
  const [tabView, setTabView] = useState<string>('단원·유형별');
  //단원.유형별 선택한 리스트
  const [unitClassificationList, setUnitClassificationList] = useState<
    UnitClassificationType[][]
  >([]);
  const [newClassificationList, setNewClassificationList] = useState<
    NewClassificationType[]
  >([]);
  const [unitCategory, setUnitCategory] = useState<CategoryType>({
    category: {
      대분류: [],
      중분류: [],
      소분류: [],
      유형: [],
      세분류: [],
      미분류: [],
    },
  });
  //세분류 리스트
  const [checkedDepthList, setCheckedDepthList] = useState<number[]>([]);
  //단원.유형별 세분류 검색색
  const [searchValue, setSearchValue] = useState<string>('');
  //문항 설정 값
  const [inputValue, setInputValue] = useState<string>('');
  const [questionNum, setQuestionNum] = useState<string | null>(null);
  const [questionLevel, setQuestionLevel] = useState<string | null>(null);
  const [questionType, setQuestionType] = useState<string[] | null>(null);
  const [containMock, setContainMock] = useState<number | null>(null);
  //배점
  const [equalScore, setEqualScore] = useState<number | null>(null);
  const selectEqualScore = (newValue: number | null) => {
    setEqualScore(newValue);
  };
  //문항수 확인
  const [receivedQuizCount, setReceivedQuizCount] = useState<number | null>(
    null,
  );

  // 균등배점 모달 닫기
  // const closeEqualScoreSettingModal = () => {
  //   setIsEqualScoreModal(false);
  // };
  //균등배점 저장
  // const saveEqualScoreSettingModal = () => {
  //   if (isSaveEqualValue) {
  //     //재균등배점
  //     if (isResaveEqualValue) {
  //       setIsConfirm(true);
  //       closeEqualScoreSettingModal();
  //       //로컬에 배점 저장하기
  //       //saveLocalQutientData();
  //     } else {
  //       closeEqualScoreSettingModal();
  //       //saveLocalQutientData();
  //     }
  //   } else {
  //     if (equalTotalValue) {
  //       openToastifyAlert({
  //         type: 'error',
  //         text: '저장을 눌러주세요.',
  //       });
  //     } else {
  //       openToastifyAlert({
  //         type: 'error',
  //         text: '배점을 입력해주세요.',
  //       });
  //     }
  //   }
  // };
  //균등배점 취소
  // const cancelEqualScoreSettingModal = () => {
  //   closeEqualScoreSettingModal();
  //   setEqualScore(null);
  //   setEqualTotlaValue('0');
  //   setRemainderContent(0);
  //   setNextRemainderContent(0);
  //   setQuotient(0);
  //   setMinQuotient(0);
  //   setMaxQuotient(0);
  // };
  //직접 점수 입력
  // const changeEqualInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let equalTotalValue = e.target.value;
  //   // 정규표현식을 사용하여 숫자 이외의 문자 제거
  //   equalTotalValue = equalTotalValue.replace(/[^0-9]/g, '');

  //   const parsedValue = parseInt(equalTotalValue, 10);

  //   setEqualTotlaValue(parsedValue >= 200 ? '200' : equalTotalValue);
  // };

  //서버에서 가져올 수 있는 문항 수를 줬을 때
  // useEffect(() => {
  //   if (receivedQuizCount) {
  //     setEqualTotlaValue(receivedQuizCount.toString());
  //     //값초기화
  //     setRemainderContent(0);
  //     setNextRemainderContent(0);
  //   }
  // }, [receivedQuizCount]);

  //배점 저장
  // const saveEqualInputValue = () => {
  //   //받아온 문항 수 넘버타입 변경
  //   const parsedreceivedQuiz = receivedQuizCount?.toString();
  //   //받아온 문항 수 넘버타입 변경
  //   const parsedreceivedQuizValue = parseInt(parsedreceivedQuiz as string, 10);
  //   //총배점 타입 변경
  //   const parsedValue = parseInt(equalTotalValue, 10);

  //   //선택된 문항 수
  //   const questionNumValue =
  //     tabView === '시중교재' || tabView === '기출'
  //       ? questionNum
  //         ? parseInt(questionNum, 10) * includeQuizList.length
  //         : inputValue
  //           ? parseInt(inputValue, 10) * includeQuizList.length
  //           : 0
  //       : parseInt(
  //           questionNum ||
  //             inputValue ||
  //             (includeQuizList.length as unknown as string),
  //           10,
  //         );

  //   if (equalTotalValue === '') {
  //     openToastifyAlert({
  //       type: 'error',
  //       text: '총 배점을 입력해주세요.',
  //     });
  //     setIsSaveEqualValue(false);
  //     setEqualTotlaValue('0');
  //     setQuotient(0);
  //   } else if (
  //     !receivedQuizCount &&
  //     !parsedreceivedQuizValue &&
  //     equalTotalValue &&
  //     parsedValue < questionNumValue
  //   ) {
  //     openToastifyAlert({
  //       type: 'error',
  //       text: '총 배점은 총 문항수보다 크거나 같아야합니다.',
  //     });
  //     setEqualTotlaValue(questionNumValue.toString());
  //     setIsSaveEqualValue(false);
  //   } else if (equalTotalValue && parsedValue < parsedreceivedQuizValue) {
  //     openToastifyAlert({
  //       type: 'error',
  //       text: '총 배점은 총 문항수보다 크거나 같아야합니다.',
  //     });
  //     if (receivedQuizCount) {
  //       setEqualTotlaValue(receivedQuizCount.toString());
  //     }
  //     setIsSaveEqualValue(false);
  //   } else {
  //     openToastifyAlert({
  //       type: 'success',
  //       text: '저장되었습니다.',
  //     });
  //     setEqualTotlaValue(equalTotalValue);
  //     setIsSaveEqualValue(true);
  //   }
  // };

  //몇번부터 몇번까지 몇점 이후 몇점 설정값
  // useEffect(() => {
  //   const parsedValue = parseInt(equalTotalValue, 10);
  //   const questionNumValue = parseInt(
  //     questionNum ||
  //       inputValue ||
  //       (includeQuizList.length as unknown as string),
  //     10,
  //   );

  //   if (isSaveEqualValue && receivedQuizCount) {
  //     const quotient = Math.floor(parsedValue / receivedQuizCount);
  //     const remainder = parsedValue % receivedQuizCount;
  //     setQuotient(quotient);
  //     setRemainder(remainder);
  //     if (quotient || remainder) {
  //       const remainderContent = receivedQuizCount - remainder;
  //       const minQuotient = quotient - 1;
  //       const maxQuotient = quotient + 1;
  //       setRemainderContent(remainderContent);
  //       setNextRemainderContent(remainderContent + 1);
  //       setMinQuotient(minQuotient <= 0 ? 1 : minQuotient);
  //       setMaxQuotient(maxQuotient);
  //     }
  //   } else if (isSaveEqualValue && !receivedQuizCount) {
  //     const quotient = Math.floor(parsedValue / questionNumValue);
  //     const remainder = parsedValue % questionNumValue;
  //     setQuotient(quotient);
  //     setRemainder(remainder);
  //     if (quotient || remainder) {
  //       const remainderContent = questionNumValue - remainder;
  //       const minQuotient = quotient - 1;
  //       const maxQuotient = quotient + 1;
  //       setRemainderContent(remainderContent);
  //       setNextRemainderContent(remainderContent + 1);
  //       setMinQuotient(minQuotient <= 0 ? 1 : minQuotient);
  //       setMaxQuotient(maxQuotient);
  //     }
  //   }
  // }, [isSaveEqualValue, equalTotalValue, receivedQuizCount]);

  //문항 수 균등 배분
  const [isQuizEven, setIsQuizEven] = useState(false);
  //내 문항 우선 추천
  const [isPriority, setIsPriority] = useState(false);

  //시중교재
  const [page, setPage] = useRecoilState(pageAtom);
  const changeTab = () => {
    setPage(1);
  };
  const [schoolLevel, setSchoolLevel] = useState<string>('초등');
  const selectSchoolLevel = (newValue: string) => {
    setSchoolLevel(newValue);
  };
  const [gradeLevel, setgradeLevel] = useState<string | null>(null);
  const selectGradeLevel = (newValue: string | null) => {
    setgradeLevel(newValue);
  };

  //시중교재 검색값
  const [searchTextbookValue, setSearchTextbookValue] = useState<string>('');

  const searchTextbook = (value: string) => {
    setSearchTextbookValue(value);
  };

  const [isSelectTextbook, setIsSelectTextbook] = useState(true);
  const [selectedTextbookTitle, setSelectedTextbookTitle] = useState<
    string | null
  >(null);
  const [selectedTextbookIdx, setSelectedTextbookIdx] = useState<number | null>(
    null,
  );
  const [isSelectTextbookContent, setIsSelectTextbookContent] = useState(false);

  //선택한 시중교재 get api
  const selectTextbook = async (idx: number, title: string) => {
    setSelectedTextbookIdx(idx);
    setSelectedTextbookTitle(title);
    setIsSelectTextbook(false);
    setIsSelectTextbookContent(true);
  };
  const getTextbookDetail = async (idx: number) => {
    const res = await quizService.get(`/v1/textbook/${idx}`);
    return res;
  };
  const { data: textbookDetailData } = useQuery({
    queryKey: ['get-textbookDetail'],
    queryFn: () => getTextbookDetail(selectedTextbookIdx as number),
    meta: {
      errorMessage: 'get-textbookDetail 에러 메세지',
    },
    enabled: !!selectedTextbookIdx,
  });
  const [selectedTextbook, setSelectedTextbook] = useState<
    ProcessTextbookDataType[]
  >([]);
  useEffect(() => {
    if (textbookDetailData) {
      setSelectedTextbook(textbookDetailData?.data.data.textbookList);
    }
  }, [textbookDetailData]);

  //다른 교재 선택
  const selectOtherTextbook = () => {
    setQuestionNum('');
    setIsSelectTextbook(true);
    setIsSelectTextbookContent(false);
    setIsChoice(false);
    setProcessTextbookData([]);
    setTextbookList([]);
    setSelectedTextbookIdx(null);
    setSelectedTextbook([]);
    setClickedIdx(null);
    setClickedPageIdx(null);
    textbookDataRefetch();
  };
  // 시중교재 불러오기 api
  const getTextbook = async () => {
    const res = await quizService.get(
      `/v1/textbook?pageIndex=${page}&pageUnit=${8}&level=${schoolLevel}&grade=${gradeLevel || ''}&searchKeyword=${searchTextbookValue || ''}`,
    );
    return res;
  };
  const { data: textbookData, refetch: textbookDataRefetch } = useQuery({
    queryKey: ['get-textbook'],
    queryFn: getTextbook,
    meta: {
      errorMessage: 'get-textbook 에러 메세지',
    },
    enabled: false,
  });
  const [textbookList, setTextbookList] = useState<TextbookInfoType[]>([]);
  useEffect(() => {
    if (textbookData) {
      setTextbookList(textbookData?.data.data.textbookList);
    }
  }, [textbookData]);

  //조건값이 바뀔때 재검색
  useEffect(() => {
    if (tabView === '시중교재') {
      textbookDataRefetch();
    }
  }, [page, schoolLevel, gradeLevel, searchTextbookValue, tabView]);

  const [isChoice, setIsChoice] = useState(false);
  const [clickedIdx, setClickedIdx] = useState<number | null>(null);
  const [clickedPageIdx, setClickedPageIdx] = useState<string | null>(null);
  const [processTextbookData, setProcessTextbookData] = useState<
    ProcessTextbookDataType[]
  >([]);

  // 클릭한 페이지 인덱스를 기억하는 함수
  const handlePageClick = (bookPage: string) => {
    if (clickedPageIdx !== bookPage) {
      setClickedPageIdx(bookPage);
    } else {
      setClickedPageIdx(null); // 같은 페이지를 다시 클릭하면 숨기기
    }
  };

  // 시중교재 값을 받아왔을 때 원하는 모양의 데이타로 가공
  useEffect(() => {
    if (selectedTextbook && selectedTextbook.length > 0) {
      const initialData = selectedTextbook.map((textbook) => ({
        subChapter: textbook?.subChapter || '',
        pageList: (textbook?.pageList || [])
          .map((page) => ({
            bookPage: page?.bookPage || '',
            isChecked: false,
            quizList: (page?.quizList || [])
              .map((quiz) => ({
                ...quiz,
                isChecked: false,
                seq: `${quiz.code}${quiz.bookQuizNumber}`,
              }))
              .sort(
                (a, b) => Number(a.bookQuizNumber) - Number(b.bookQuizNumber),
              ),
          }))
          .sort((a, b) => Number(a.bookPage) - Number(b.bookPage)), // quizNumber로 정렬
      }));
      setProcessTextbookData(initialData);
    }
  }, [selectedTextbook]);

  // 선택시 배경색이 나타남
  const choiceType = (idx: number) => {
    if (clickedIdx !== idx) {
      setClickedIdx(idx);
      setIsChoice(!isChoice);
    } else {
      setClickedIdx(null);
      setIsChoice(!isChoice);
    }
  };

  const [includeQuizList, setIncludeQuizList] = useState<string[]>([]);
  // 선택된 문항 코드 넣기
  const toggleQuizCode = (quizCode: string | string[], isChecked: boolean) => {
    if (Array.isArray(quizCode)) {
      setIncludeQuizList((prev) => {
        if (isChecked) {
          // isChecked가 true일 때: quizCode를 제거
          return prev.filter((code) => !quizCode.includes(code));
        } else {
          // isChecked가 false일 때: 중복을 제거하고 quizCode를 추가
          const uniqueCodesToAdd = quizCode.filter(
            (code, index, self) =>
              self.indexOf(code) === index && !prev.includes(code),
          );
          return [...prev, ...uniqueCodesToAdd];
        }
      });
    } else {
      setIncludeQuizList((prev) => {
        if (isChecked) {
          // isChecked가 true일 때: quizCode를 제거
          return prev.filter((code) => code !== quizCode);
        } else {
          // isChecked가 false일 때: quizCode를 추가
          if (!prev.includes(quizCode)) {
            return [...prev, quizCode];
          }
          return prev;
        }
      });
    }
  };

  // 전체 선택
  const checkAllToggle = (
    subChapter: string,
    isChecked: boolean,
    contentSeqs: string[],
    quizCode: string,
  ) => {
    setProcessTextbookData((prevData) => {
      if (!prevData) return prevData;

      return prevData.map((textbook) => {
        if (textbook.subChapter === subChapter) {
          const updatedPageList = textbook.pageList.map((page) => {
            const updatedQuizList = page.quizList.map((quiz) => {
              if (contentSeqs.includes(quiz.seq)) {
                return { ...quiz, isChecked: !isChecked };
              }
              return quiz;
            });

            // 모든 퀴즈가 선택되어 있는지 확인
            const allContentsChecked = updatedQuizList.every(
              (quiz) => quiz.isChecked,
            );

            return {
              ...page,
              isChecked: allContentsChecked,
              quizList: updatedQuizList,
            };
          });

          return { ...textbook, pageList: updatedPageList };
        }
        return textbook;
      });
    });
    toggleQuizCode(quizCode, isChecked);
  };

  //부분 선택
  const checkPartialToggle = (
    subChapter: string,
    contentSeq: string,
    isChecked: boolean,
    quizCode: string,
  ) => {
    setProcessTextbookData((prevData) => {
      if (!prevData) return prevData;

      return prevData.map((textbook) => {
        if (textbook.subChapter === subChapter) {
          const updatedPageList = textbook.pageList.map((page) => {
            const updatedQuizList = page.quizList.map((quiz) => {
              if (quiz.seq === contentSeq) {
                return { ...quiz, isChecked: !isChecked };
              }
              return quiz;
            });

            // 모든 퀴즈가 선택되어 있는지 확인
            const allContentsChecked = updatedQuizList.every(
              (quiz) => quiz.isChecked,
            );

            return {
              ...page,
              isChecked: allContentsChecked,
              quizList: updatedQuizList,
            };
          });

          // 모든 페이지가 선택되어 있는지 확인
          const allPagesChecked = updatedPageList.every(
            (page) => page.isChecked,
          );

          return {
            ...textbook,
            isChecked: allPagesChecked,
            pageList: updatedPageList,
          };
        }
        return textbook;
      });
    });
    toggleQuizCode(quizCode, isChecked);
  };

  //선택한 유형 확인
  const [selectedItemTreeCount, setSelectedItemTreeCount] = useState<string[]>(
    [],
  );

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  //alert 취소클릭
  const cancelAlert = () => {
    //alert 끄기
    setIsAlertOpen(false);
    //선택된 값 초기화
    setQuestionNum('');
    setQuestionLevel(null);
    setQuestionType([]);
    setContainMock(null);
    setIsQuizEven(false);
    setIsPriority(false);
    setUnitClassificationList([]);
    setCheckedDepthList([]);
    setSearchValue('');
    //setReceivedQuizCount(null);
    //setRemainderContent(0);
    //setNextRemainderContent(0);
    //setQuotient(0);
    //setMinQuotient(0);
    //setMaxQuotient(0);
    //setEqualTotlaValue('');
  };

  //alert 진행클릭
  const keepGoingAlert = () => {
    //난이도 설정 다시 열기
    // if (equalScore === 2) {
    //   setIsEqualScoreModal(true);
    //   setIsAlertOpen(false);
    //   setIsResaveEqualValue(true);
    //   setIsSaveEqualValue(false);
    // } else {
    //   navigate('/content-create/exam/step2');
    // }
    navigate('/content-create/exam/step2');
  };

  // useEffect(() => {
  //   if (isConfirm) {
  //     navigate('/content-create/exam/step2');
  //   }
  // }, [isConfirm]);

  // step1 선택된 문항 불러오기 api
  const postWorkbookStep1 = async (data: any) => {
    return await quizService.post(`/v2/search/quiz/step/1`, data);
  };

  const { mutate: postStep1Data, isPending: postStep1Pending } = useMutation({
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
      //성공했을 때 문항 수 카운트
      // const filterQuizCount = response.data.data.quizList.filter(
      //   (quiz: { type: string }) => quiz.type === 'QUESTION',
      // ).length;
      const filterQuizCount = response.data.data.quizList.reduce(
        (count: number, quiz: { quizItemList: { type: string }[] }) =>
          count +
          quiz.quizItemList.filter(
            (item: { type: string }) => item.type === 'QUESTION',
          ).length,
        0,
      );
      setReceivedQuizCount(filterQuizCount);
      saveLocalData(response.data.data);
      //받아온 문항수와 선택한 문항수가 같을경우 다음단계
      if (tabView === '단원·유형별') {
        if (filterQuizCount === 0) {
          openToastifyAlert({
            type: 'error',
            text: `가지고 올 수 있는 문항의 수는 ${filterQuizCount} 입니다.`,
          });
          return;
        } else {
          if (
            filterQuizCount === Number(questionNum) ||
            filterQuizCount === Number(inputValue)
          ) {
            navigate('/content-create/exam/step2');
            const itemCount = Number(questionNum) || Number(inputValue);
            // ||
            // Number(includeQuizList.length);
            localStorage.setItem('itemCount', JSON.stringify(itemCount));
          } else {
            setIsAlertOpen(true);
            const itemCount = Number(questionNum) || Number(inputValue);
            // ||
            // Number(includeQuizList.length);
            localStorage.setItem('itemCount', JSON.stringify(itemCount));
          }
        }
      } else if (tabView === '시중교재') {
        if (filterQuizCount === 0) {
          openToastifyAlert({
            type: 'error',
            text: `가지고 올 수 있는 문항의 수는 ${filterQuizCount} 입니다.`,
          });
          return;
        } else {
          if (
            filterQuizCount ===
              Number(questionNum) * Number(includeQuizList.length) ||
            filterQuizCount ===
              Number(inputValue) * Number(includeQuizList.length)
          ) {
            navigate('/content-create/exam/step2');
            const itemCount =
              Number(questionNum) * Number(includeQuizList.length) ||
              Number(inputValue) * Number(includeQuizList.length);
            localStorage.setItem('itemCount', JSON.stringify(itemCount));
          } else {
            setIsAlertOpen(true);
            //const itemCount = filterQuizCount;
            const itemCount =
              Number(questionNum) * Number(includeQuizList.length) ||
              Number(inputValue) * Number(includeQuizList.length);
            localStorage.setItem('itemCount', JSON.stringify(itemCount));
          }
        }
      } else if (tabView === '수능/모의고사') {
        if (filterQuizCount === 0) {
          openToastifyAlert({
            type: 'error',
            text: `가지고 올 수 있는 문항의 수는 ${filterQuizCount} 입니다.`,
          });
          return;
        } else {
          if (filterQuizCount === Number(includeQuizList.length)) {
            navigate('/content-create/exam/step2');
            const itemCount = Number(includeQuizList.length);
            localStorage.setItem('itemCount', JSON.stringify(itemCount));
          } else {
            setIsAlertOpen(true);
            const itemCount = Number(includeQuizList.length);
            localStorage.setItem('itemCount', JSON.stringify(itemCount));
          }
        }
      } else if (tabView === '기출') {
        if (filterQuizCount === 0) {
          openToastifyAlert({
            type: 'error',
            text: `가지고 올 수 있는 문항의 수는 ${filterQuizCount} 입니다.`,
          });
          return;
        } else {
          if (
            filterQuizCount ===
              Number(questionNum) * Number(includeQuizList.length) ||
            filterQuizCount ===
              Number(inputValue) * Number(includeQuizList.length)
          ) {
            navigate('/content-create/exam/step2');
            const itemCount =
              Number(questionNum) * Number(includeQuizList.length) ||
              Number(inputValue) * Number(includeQuizList.length);
            localStorage.setItem('itemCount', JSON.stringify(itemCount));
          } else {
            setIsAlertOpen(true);
            //const itemCount = response.data.data.quizList.length;
            const itemCount =
              Number(questionNum) * Number(includeQuizList.length) ||
              Number(inputValue) * Number(includeQuizList.length);
            localStorage.setItem('itemCount', JSON.stringify(itemCount));
          }
        }
      }
    },
  });

  const isRadioStateType = (
    item: UnitClassificationType,
  ): item is RadioStateType => {
    return (item as RadioStateType).title !== undefined;
  };

  //useMemo를 사용하여 makingdata값을 기억하며 unitClassificationList가 변경될때 업데이트
  const makingdata = useMemo(() => {
    return unitClassificationList.map((item) => {
      // itemTreeKey를 동적으로 생성
      const itemTreeKey = item.reduce(
        (acc, cur, index) => {
          if (isRadioStateType(cur)) {
            // RadioStateType인 경우에만 code를 사용
            const code = cur.code || `key_${index}`; // `code`가 없을 경우 기본 키 사용
            acc[code] = cur.title;
          }
          return acc;
        },
        {} as Record<string, string>,
      );

      //동적인 itemTreeKey으로 key, value로 만들기
      const dynamicFields = Object.entries(itemTreeKey).reduce(
        (acc, [key, value]) => {
          acc[key] = value;
          return acc;
        },
        {} as Record<string, string>,
      );

      // unitClassificationList의 마지막 항목이 CategoryType인지 확인 후 접근
      const lastItem = item[item.length - 1];
      const category = (lastItem as CategoryType)?.category || [];

      // 빈 배열인 항목은 제거
      const filteredCategory = Object.entries(category).reduce(
        (acc, [key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            acc[key] = value; // 빈 배열이 아닌 경우만 추가
          }
          return acc;
        },
        {} as Record<string, string[]>,
      );

      return {
        category: filteredCategory,
        ...dynamicFields,
      };
    });
  }, [unitClassificationList]);

  // useEffect(() => {
  //   const allItemTreeIdxList = makingdata.flatMap((data) => data.category);
  //   //setSelectedItemTreeCount(allItemTreeIdxList);
  // }, [makingdata]);

  //선택한 유형을 한 배열로 관리해서 길이를 확인
  useEffect(() => {
    const allItemTreeIdxList = makingdata.flatMap((data) => {
      const categories = data.category;

      // category 객체의 모든 키를 순회하며 배열을 평탄화
      const flattenedCategories = Object.keys(categories).flatMap((key) => {
        const values = categories[key];
        // 배열인지 확인 후 배열만 추가
        return Array.isArray(values) ? values : [];
      });
      return flattenedCategories;
    });

    //allItemTreeIdxList는 모든 string 값들이 평탄화된 배열
    setSelectedItemTreeCount(allItemTreeIdxList);
  }, [makingdata]);

  const clickNextButton = () => {
    const data = {
      itemTreeList: tabView === '단원·유형별' ? makingdata : null,
      count:
        tabView === '시중교재' || tabView === '기출'
          ? Number(questionNum) * Number(includeQuizList.length) ||
            Number(inputValue) * Number(includeQuizList.length)
          : tabView === '수능/모의고사'
            ? Number(includeQuizList.length)
            : tabView === '단원·유형별'
              ? Number(questionNum) || Number(inputValue)
              : null,
      //수능/모의고사 경우 어떻게 보내야할지 나중에 수정해야함
      difficulty: questionLevel === '선택안함' ? null : questionLevel || null,
      typeList: questionType,
      mock: containMock,
      score: equalScore,
      //isScoreEven 안쓰는거
      isScoreEven: true,
      isQuizEven: isQuizEven,
      isMePriority: isPriority,
      filterList: null,
      includeList: tabView === '단원·유형별' ? null : includeQuizList,
    };

    postStep1Data(data);
  };

  const [getLocalData, setGetLocalData] = useState<any | null>(null);

  // 로컬 스토리지에서 데이터 가져오기
  useEffect(() => {
    const data = localStorage.getItem('sendData');
    if (data) {
      const parsedData = JSON.parse(data);
      setGetLocalData(parsedData);
    }
  }, []);

  // 로컬 스토리지 값 다 받은 뒤 초기화
  useEffect(() => {
    if (getLocalData) {
      //window.opener.localStorage.clear();
    }
  }, [getLocalData]);
  //로컬 스토리지에서 받아온 값이 있다면 보여주기
  useEffect(() => {
    if (getLocalData) {
      setQuestionNum(getLocalData.문항수);
      setInputValue(getLocalData.문항수);
      setQuestionLevel(getLocalData.난이도);
      setQuestionType([getLocalData.문항타입]);
    }
  }, [getLocalData]);

  // 로컬스토리지에 보낼데이터 저장
  const saveLocalData = (data: any) => {
    const quizList = data.quizList;
    //console.log('quizList:', quizList);

    const mergedQuizList = (() => {
      const groupMap = quizList.reduce(
        (acc: Record<string, any[]>, item: any) => {
          if (item.groupCode) {
            acc[item.groupCode] = acc[item.groupCode] || [];
            acc[item.groupCode].push(item);
          }
          return acc;
        },
        {},
      );
      //console.log('groupMap:', groupMap);

      let orderCounter = 1;
      const result = quizList.map((quiz: any) => {
        if (quiz.groupCode && groupMap[quiz.groupCode]) {
          const group = groupMap[quiz.groupCode];
          const textType = group.find(
            (groupItem: any) => groupItem.type === 'TEXT',
          );

          if (textType) {
            group.forEach((groupItem: any) => {
              if (groupItem !== textType) {
                // Add items to textItem's quizItemList with appropriate sort value
                groupItem.quizItemList.forEach(
                  (quizItem: any, index: number) => {
                    textType.quizItemList.push({
                      ...quizItem,
                      quizIdx: groupItem.idx,
                      quizCode: groupItem.code,
                      quizFavorite: groupItem.isFavorite,
                      //sort: sortCounter++,
                    });
                  },
                );
                groupItem.quizItemList = []; // Clear quizItemList for merged items
              }
              if (groupItem !== textType) {
                groupItem.quizCategoryList.forEach(
                  (categoryItem: any, index: number) => {
                    textType.quizCategoryList.push({
                      ...categoryItem,
                      quizIdx: groupItem.idx,
                      quizCode: groupItem.code,
                      //sort: sortCounter++,
                    });
                  },
                );
                groupItem.quizCategoryList = []; // Clear quizItemList for merged items
              }
            });
            // Ensure textItem's own sort is set to 1
            textType.quizItemList = textType.quizItemList.map(
              (quizItem: any, index: number) => ({
                ...quizItem,
                //sort: index + 1,
                quizIdx:
                  quizItem.type === 'TEXT' || quizItem.type === 'BIG'
                    ? textType.idx
                    : quizItem.quizIdx,
                quizCode:
                  quizItem.type === 'TEXT' || quizItem.type === 'BIG'
                    ? textType.code
                    : quizItem.quizCode,
                quizFavorite:
                  quizItem.type === 'TEXT' || quizItem.type === 'BIG'
                    ? textType.isFavorite
                    : quizItem.isFavorite,
              }),
            );
            textType.quizCategoryList = textType.quizCategoryList.map(
              (quizItem: any, index: number) => ({
                ...quizItem,
                //sort: index + 1,
                quizIdx: !quizItem.quizIdx ? textType.idx : quizItem.quizIdx,
                quizCode: !quizItem.quizCode
                  ? textType.code
                  : quizItem.quizCode,
              }),
            );
          }
        }

        quiz.quizItemList.forEach((quizItem: any) => {
          if (quizItem.type === 'QUESTION') {
            const order = orderCounter++;
            quizItem.order = order;

            // Assign the same order to items with matching quizCode
            quiz.quizItemList.forEach((item: any) => {
              if (item.quizCode === quizItem.quizCode) {
                item.order = order;
              }
            });
          }
        });

        return quiz;
      });
      //console.log('result:', result);

      return result.filter((item: any) => item.quizItemList.length > 0);
    })();
    //console.log('mergedQuizList:', mergedQuizList);

    const sendData = { data: { ...data, quizList: mergedQuizList } };
    const categoryData = makingdata;
    localStorage.setItem('sendData', JSON.stringify(sendData));
    localStorage.setItem('sendCategoryData', JSON.stringify(categoryData));
  };

  // const saveLocalQutientData = () => {
  //   const sendQuotientData = {
  //     equalScore: equalScore,
  //     equalTotalValue: equalTotalValue,
  //     remainderContent: remainderContent,
  //     quotient: quotient,
  //     nextRemainderContent: nextRemainderContent,
  //     minQuotient: minQuotient,
  //     maxQuotient: maxQuotient,
  //   };
  //   if (equalScore === 2) {
  //     localStorage.setItem(
  //       'sendQuotientData',
  //       JSON.stringify(sendQuotientData),
  //     );
  //   }
  // };

  const moveStep2 = () => {
    if (tabView === '단원·유형별')
      if (unitClassificationList.length > 0) {
        if (
          (inputValue !== '' || questionNum !== null || questionNum !== '') &&
          questionLevel !== null &&
          questionType?.length !== 0 &&
          containMock !== null
        ) {
          clickNextButton();
        } else {
          openToastifyAlert({
            type: 'error',
            text: '필수항목을 선택해주세요',
          });
        }
      } else {
        openToastifyAlert({
          type: 'error',
          text: '교과정보 추가버튼을 눌러주세요.',
        });
      }
    else if (tabView === '시중교재') {
      if (
        (inputValue !== '' || questionNum !== null || questionNum !== '') &&
        includeQuizList.length > 0 &&
        questionLevel !== null &&
        questionType?.length !== 0 &&
        containMock !== null
      ) {
        clickNextButton();
      } else {
        openToastifyAlert({
          type: 'error',
          text: '필수항목을 선택해주세요',
        });
      }
    } else if (tabView === '수능/모의고사') {
      if (includeQuizList.length > 0) {
        clickNextButton();
      } else {
        openToastifyAlert({
          type: 'error',
          text: '필수항목을 선택해주세요',
        });
      }
    } else if (tabView === '기출') {
      if (
        (inputValue !== '' || questionNum !== null || questionNum !== '') &&
        includeQuizList.length > 0 &&
        questionLevel !== null &&
        questionType?.length !== 0
      ) {
        clickNextButton();
      } else {
        openToastifyAlert({
          type: 'error',
          text: '필수항목을 선택해주세요',
        });
      }
    }
  };

  //단원분류 입력 도중 해당 화면을 벗어나는 경우, '저장하지 않고 나가시겠습니까?' 얼럿
  useEffect(() => {
    if (
      tabView === '단원·유형별' ||
      tabView === '시중교재' ||
      tabView === '수능/모의고사' ||
      tabView === '기출'
    ) {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        // 사용자에게 경고 메시지를 표시하도록 설정
        const message =
          '저장 버튼을 누르지 않을시 저장되지 않습니다. 정말 나가시겠습니까?';
        event.preventDefault();
        event.returnValue = message; // 표준에 따른 설정 (Chrome에서는 무시됨)
        return message; // 대부분의 브라우저에서 필요
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [tabView]);

  useEffect(() => {
    setReceivedQuizCount(null);
    //단원 유형별버튼 초기화
    setQuestionNum('');
    setQuestionLevel(null);
    setQuestionType([]);
    setContainMock(null);
    setIsQuizEven(false);
    setIsPriority(false);
    setUnitClassificationList([]);
    //시중교재
    setSearchTextbookValue('');
    setSchoolLevel('초등');
    setgradeLevel(null);
    setIncludeQuizList([]);
    setClickedIdx(null);
    setClickedPageIdx(null);
    //기출탭
    setIsSelectPreviousExamContent(false);
    setQuestionNum('');
    setQuestionLevel(null);
    setQuestionType([]);
    setIsQuizEven(false);
  }, [tabView]);

  //시중교재
  const renderGradeButtons = () => {
    const buttonSchoolOption = [
      { value: '초등', label: '초' },
      { value: '중등', label: '중' },
      { value: '고등', label: '고' },
    ];
    const buttonGradeOption = [
      { value: '1', label: '1학년' },
      { value: '2', label: '2학년' },
      { value: '3', label: '3학년' },
      { value: '4', label: '4학년' },
      { value: '5', label: '5학년' },
      { value: '6', label: '6학년' },
    ];

    return (
      <>
        {buttonSchoolOption.map((button) => (
          <Button
            key={button.value}
            buttonType="button"
            onClick={() => {
              selectSchoolLevel(button.value);
              selectGradeLevel('');
            }}
            $padding="10px"
            height={'34px'}
            width={'100%'}
            fontSize="14px"
            $normal={schoolLevel !== button.value}
            $filled={schoolLevel === button.value}
            cursor
          >
            <span>{button.label}</span>
          </Button>
        ))}
        <DivideBar>|</DivideBar>
        {schoolLevel === '중등' || schoolLevel === '고등' ? (
          <>
            {buttonGradeOption.slice(0, 3).map((button) => (
              <Button
                key={button.value}
                buttonType="button"
                onClick={() => {
                  selectGradeLevel(button.value);
                }}
                $padding="10px"
                height={'34px'}
                width={'100%'}
                fontSize="14px"
                $normal={gradeLevel !== button.value}
                $filled={gradeLevel === button.value}
                cursor
              >
                <span>{button.label}</span>
              </Button>
            ))}
          </>
        ) : (
          <>
            {buttonGradeOption.map((button) => (
              <Button
                key={button.value}
                buttonType="button"
                onClick={() => {
                  selectGradeLevel(button.value);
                }}
                $padding="10px"
                height={'34px'}
                width={'100%'}
                fontSize="14px"
                $normal={gradeLevel !== button.value}
                $filled={gradeLevel === button.value}
                cursor
              >
                <span>{button.label}</span>
              </Button>
            ))}
          </>
        )}
      </>
    );
  };

  //기출
  const [isSelectPreviousExamContent, setIsSelectPreviousExamContent] =
    useState<boolean>(false);

  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <Title>
            <Span>STEP 1</Span> 학습지 종류 및 범위 선택
          </Title>
        </TitleWrapper>
        <MainWrapper>
          {tabView === '단원·유형별' && (
            <>
              <UnitTypeTab
                menuList={menuList}
                tabView={tabView}
                setTabView={setTabView}
                unitClassificationList={unitClassificationList}
                setUnitClassificationList={setUnitClassificationList}
                checkedDepthList={checkedDepthList}
                setCheckedDepthList={setCheckedDepthList}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                postPending={postStep1Pending}
                unitCategory={unitCategory}
                setUnitCategory={setUnitCategory}
              ></UnitTypeTab>
              <SelectSection
                tabView={tabView}
                questionNum={questionNum}
                setQuestionNum={setQuestionNum}
                inputValue={inputValue}
                setInputValue={setInputValue}
                questionLevel={questionLevel}
                setQuestionLevel={setQuestionLevel}
                questionType={questionType}
                setQuestionType={setQuestionType}
                containMock={containMock}
                setContainMock={setContainMock}
                equalScore={equalScore}
                setEqualScore={setEqualScore}
                isQuizEven={isQuizEven}
                setIsQuizEven={setIsQuizEven}
                isPriority={isPriority}
                setIsPriority={setIsPriority}
                includeQuizList={includeQuizList}
                categoryCount={selectedItemTreeCount.length}
                receivedQuizCount={receivedQuizCount}
                setReceivedQuizCount={setReceivedQuizCount}
              ></SelectSection>
            </>
          )}
          {tabView === '시중교재' && (
            <>
              {isSelectTextbook && (
                <>
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
                    <SchoolGradeWrapper>
                      <SelectorGroup>{renderGradeButtons()}</SelectorGroup>
                    </SchoolGradeWrapper>
                    <SearchWrapper>
                      <Search
                        value={searchTextbookValue}
                        width={'50%'}
                        height="40px"
                        onKeyDown={(e) => {}}
                        onChange={(e) => searchTextbook(e.target.value)}
                        placeholder="교재명 검색"
                        maxLength={20}
                      />
                    </SearchWrapper>
                    <ListWrapper>
                      <ListTitleWrapper>
                        <ListTitle className="schoolGrade">학교급</ListTitle>
                        <ListTitle className="title">교재명</ListTitle>
                        <ListTitle className="series">시리즈</ListTitle>
                        <ListTitle className="publisher">출판사</ListTitle>
                      </ListTitleWrapper>
                      {textbookList && textbookList?.length > 0 ? (
                        <>
                          {textbookList?.map((book, idx) => (
                            <TextbookList
                              key={idx}
                              onClick={() =>
                                selectTextbook(book.idx, book.title)
                              }
                            >
                              <div className="schoolGrade">
                                {book.schoolLevel}
                                {book.grade}-{book.semester}
                              </div>
                              <div className="title">{book.title}</div>
                              <div className="series">{book.series}</div>
                              <div className="publisher">{book.publisher}</div>
                            </TextbookList>
                          ))}
                        </>
                      ) : (
                        <ValueNone
                          textOnly
                          info="선택하신 조건의 교재가 없습니다"
                        />
                      )}
                    </ListWrapper>
                    <PaginationBox
                      itemsCountPerPage={
                        textbookData?.data.data.pagination.pageUnit as number
                      }
                      totalItemsCount={
                        textbookData?.data.data.pagination.totalCount as number
                      }
                    />
                  </CategorySection>
                  <SelectSection
                    tabView={tabView}
                    questionNum={questionNum}
                    setQuestionNum={setQuestionNum}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    questionLevel={questionLevel}
                    setQuestionLevel={setQuestionLevel}
                    questionType={questionType}
                    setQuestionType={setQuestionType}
                    containMock={containMock}
                    setContainMock={setContainMock}
                    equalScore={equalScore}
                    setEqualScore={setEqualScore}
                    isQuizEven={isQuizEven}
                    setIsQuizEven={setIsQuizEven}
                    isPriority={isPriority}
                    setIsPriority={setIsPriority}
                    includeQuizList={includeQuizList}
                    categoryCount={selectedItemTreeCount.length}
                    receivedQuizCount={receivedQuizCount}
                    setReceivedQuizCount={setReceivedQuizCount}
                    isSelectTextbookContent={isSelectTextbookContent}
                  ></SelectSection>
                </>
              )}
              {isSelectTextbookContent && (
                <>
                  <CategorySection>
                    <TabWrapper onClick={selectOtherTextbook}>
                      <TabMenu
                        length={4}
                        menu={menuList}
                        width={'450px'}
                        lineStyle
                        selected={tabView}
                        setTabView={setTabView}
                      />
                    </TabWrapper>
                    <TextbookTitleWrapper>
                      <Label
                        value={selectedTextbookTitle as string}
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
                    {!postStep1Pending ? (
                      <TextbookWrapper>
                        {selectedTextbook &&
                          selectedTextbook?.length > 0 &&
                          selectedTextbook?.map((item, idx) => (
                            <TextbookTypeWrapper key={idx}>
                              <TextbookTypeTitleWrapper>
                                <TextbookTypeTitleWrapperLeft>
                                  <Label
                                    value={item.subChapter as string}
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
                              <SelectWrapper>
                                {processTextbookData &&
                                  processTextbookData?.length > 0 &&
                                  processTextbookData?.map((item, i) => (
                                    <LeftWrapper key={i}>
                                      {item.pageList.map((page, j) => (
                                        <TextBookCheckBoxWrapper
                                          key={j}
                                          onClick={() => {
                                            handlePageClick(page.bookPage);
                                            choiceType(j);
                                          }}
                                          $isChoice={clickedIdx === j}
                                        >
                                          <CheckBox
                                            key={`checkbox-${j}`}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              checkAllToggle(
                                                item.subChapter,
                                                page.isChecked,
                                                page.quizList.map(
                                                  (quiz) => quiz.seq,
                                                ),
                                                page.quizList[0]?.code || '',
                                              );
                                            }}
                                            isChecked={page.isChecked}
                                            width="15"
                                            height="15"
                                            $margin="0 0 5px 0"
                                          />
                                          <Label
                                            key={`label-${j}`}
                                            value={`${page.bookPage}P`}
                                            width="100px"
                                          />
                                        </TextBookCheckBoxWrapper>
                                      ))}
                                    </LeftWrapper>
                                  ))}

                                {clickedPageIdx !== null && (
                                  <RightWrapper key={clickedPageIdx}>
                                    {processTextbookData.map((item) => {
                                      const page = item.pageList.find(
                                        (page) =>
                                          page.bookPage === clickedPageIdx,
                                      );

                                      if (page) {
                                        return (
                                          <BookListWrapper
                                            key={`page-${clickedPageIdx}`}
                                          >
                                            {page.quizList.map((quiz, m) => (
                                              <CheckBoxWrapper
                                                key={`quiz-${m}`}
                                              >
                                                <CheckBox
                                                  onClick={() =>
                                                    checkPartialToggle(
                                                      item.subChapter,
                                                      quiz.seq,
                                                      quiz.isChecked || false,
                                                      quiz.code,
                                                    )
                                                  }
                                                  isChecked={
                                                    quiz.isChecked || false
                                                  }
                                                  width="15"
                                                  height="15"
                                                  $margin="0 0 5px 0"
                                                />
                                                <Label
                                                  key={`label-${m}`}
                                                  value={`${quiz.bookQuizNumber}번`}
                                                  width="40px"
                                                />
                                              </CheckBoxWrapper>
                                            ))}
                                          </BookListWrapper>
                                        );
                                      }

                                      return null;
                                    })}
                                  </RightWrapper>
                                )}
                              </SelectWrapper>
                            </TextbookTypeWrapper>
                          ))}
                      </TextbookWrapper>
                    ) : (
                      <>
                        <Loader width="50px" />
                      </>
                    )}
                  </CategorySection>
                  <SelectSection
                    tabView={tabView}
                    questionNum={questionNum}
                    setQuestionNum={setQuestionNum}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    questionLevel={questionLevel}
                    setQuestionLevel={setQuestionLevel}
                    questionType={questionType}
                    setQuestionType={setQuestionType}
                    containMock={containMock}
                    setContainMock={setContainMock}
                    equalScore={equalScore}
                    setEqualScore={setEqualScore}
                    isQuizEven={isQuizEven}
                    setIsQuizEven={setIsQuizEven}
                    isPriority={isPriority}
                    setIsPriority={setIsPriority}
                    includeQuizList={includeQuizList}
                    categoryCount={selectedItemTreeCount.length}
                    receivedQuizCount={receivedQuizCount}
                    setReceivedQuizCount={setReceivedQuizCount}
                    isSelectTextbookContent={isSelectTextbookContent}
                  ></SelectSection>
                </>
              )}
            </>
          )}
          {tabView === '수능/모의고사' && (
            <>
              <MockExamTab
                menuList={menuList}
                tabView={tabView}
                setTabView={setTabView}
                equalScore={equalScore}
                setEqualScore={setEqualScore}
                includeQuizList={includeQuizList}
                setIncludeQuizList={setIncludeQuizList}
                toggleQuizCode={toggleQuizCode}
                receivedQuizCount={receivedQuizCount}
              ></MockExamTab>
            </>
          )}
          {tabView === '기출' && (
            <>
              <PreviousTab
                menuList={menuList}
                tabView={tabView}
                setTabView={setTabView}
                isSelectPreviousExamContent={isSelectPreviousExamContent}
                setIsSelectPreviousExamContent={setIsSelectPreviousExamContent}
                setQuestionNum={setQuestionNum}
                setInputValue={setInputValue}
                setQuestionLevel={setQuestionLevel}
                setQuestionType={setQuestionType}
                setContainMock={setContainMock}
                setEqualScore={setEqualScore}
                setIsQuizEven={setIsQuizEven}
                setIsPriority={setIsPriority}
                setIncludeQuizList={setIncludeQuizList}
              ></PreviousTab>
              <SelectSection
                tabView={tabView}
                questionNum={questionNum}
                setQuestionNum={setQuestionNum}
                inputValue={inputValue}
                setInputValue={setInputValue}
                questionLevel={questionLevel}
                setQuestionLevel={setQuestionLevel}
                questionType={questionType}
                setQuestionType={setQuestionType}
                containMock={containMock}
                setContainMock={setContainMock}
                equalScore={equalScore}
                setEqualScore={setEqualScore}
                isQuizEven={isQuizEven}
                setIsQuizEven={setIsQuizEven}
                isPriority={isPriority}
                setIsPriority={setIsPriority}
                includeQuizList={includeQuizList}
                categoryCount={selectedItemTreeCount.length}
                receivedQuizCount={receivedQuizCount}
                setReceivedQuizCount={setReceivedQuizCount}
                isSelectPreviousExamContent={isSelectPreviousExamContent} //수정필요
              ></SelectSection>
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
      <Alert
        top="calc(50% - 100px)"
        isAlertOpen={isAlertOpen}
        description={`가지고 올 수 있는 문항의 수가 ${receivedQuizCount}개 입니다.`}
        subDescription={'이대로 진행하시겠습니까?'}
        action="진행"
        isWarning={true}
        onClick={keepGoingAlert}
        onClose={cancelAlert}
      />
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
  height: 550px;
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
}>`
  height: 550px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px 10px;
  background-color: ${({ $isChoice }) =>
    $isChoice ? COLOR.SELECT_BLUE : 'white'};
  overflow-y: auto;
`;
const TextBookCheckBoxWrapper = styled.div<{
  $isChoice?: boolean;
}>`
  display: flex;
  align-items: center;
  background-color: ${({ $isChoice }) =>
    $isChoice ? COLOR.SELECT_BLUE : 'white'};
`;

const RightWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex: 1 0 50%;
  padding-left: 10px;
`;
const BookListWrapper = styled.div`
  width: 794px;
  height: 550px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  overflow-y: auto;
`;
const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
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
