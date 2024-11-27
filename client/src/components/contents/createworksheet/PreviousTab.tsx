import * as React from 'react';
import { useState, useEffect, useRef, useMemo } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  DifficultyRate,
  openToastifyAlert,
  CheckBox,
  Button,
  Label,
  Search,
  ButtonFormatRadio,
  Accordion,
  DepthBlock,
  ValueNone,
  Loader,
  Icon,
  IconButton,
  ButtonFormatMultiRadio,
  SearchableSelect,
  List,
  ListItem,
  CheckBoxI,
  MathViewer,
  Select,
  Input,
} from '../..';
import {
  classificationInstance,
  quizService,
  resourceServiceInstance,
} from '../../../api/axios';
import { MyStaticWrapper } from '../../../components/molecules/sortBox/Masonry';
import { pageAtom } from '../../../store/utilAtom';
import {
  ItemCategoryType,
  ItemTreeListType,
  csatListType,
  CastQuizListType,
  ItemTreeType,
  QuizListType,
  PreviousSchoolType,
  PreviousNationalType,
} from '../../../types';
import { TextbookInfoType } from '../../../types/TextbookType';
import {
  DifficultyDataType,
  selectedListType,
} from '../../../types/WorkbookType';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { windowOpenHandler } from '../../../utils/windowHandler';
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

type SelectListType = {
  idx: number;
  name: string;
  value: string;
  options: { idx: number; name: string; value: string }[];
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

type PreviousTabProps = {
  receivedQuizCount: number | null;
};

export function PreviousTab({ receivedQuizCount }: PreviousTabProps) {
  //단원.유형별
  const [inputValue, setInputValue] = useState<string>('');

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // 정규표현식을 사용하여 숫자 이외의 문자 제거
    inputValue = inputValue.replace(/[^0-9]/g, '');

    const parsedValue = parseInt(inputValue, 10);
    if (!isNaN(parsedValue) && parsedValue > 0) {
      setInputValue(
        parsedValue < 1 ? '1' : parsedValue >= 5 ? '5' : inputValue,
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

  const [questionType, setQuestionType] = useState<string[] | null>(null);

  const selectQuestionType = (newValue: string | null) => {
    setQuestionType((prev) => {
      // prev가 null일 경우 빈 배열로 초기화
      const prevArray = prev ?? [];

      if (newValue === null) {
        return prevArray; // newValue가 null이면 변경하지 않음
      }

      if (prevArray.includes(newValue)) {
        // 이미 선택된 경우 선택 취소
        return prevArray.filter((type) => type !== newValue);
      } else {
        // 새로운 선택 추가
        return [...prevArray, newValue];
      }
    });
  };
  //난이도
  const [isDifficulty, setIsDifficulty] = useState(false);
  const [difficultyData, setDifficultyData] = useState<DifficultyDataType[]>(
    [],
  );

  const openDifficultySetting = () => {
    setIsDifficulty(true);
  };
  const closeDifficultySetting = () => {
    setIsDifficulty(false);
  };

  const getDifficulty = async () => {
    const res = await quizService.get(`/v1/difficulty`);
    return res;
  };
  const { data: difficultyRate } = useQuery({
    queryKey: ['get-difficultyDetail'],
    queryFn: getDifficulty,
    meta: {
      errorMessage: 'get-difficultyDetail 에러 메세지',
    },
    //enabled: !!selectedTextbookIdx,
  });

  useEffect(() => {
    setDifficultyData(difficultyRate?.data.data.difficultyList);
  }, [difficultyRate]);

  const [containMock, setContainMock] = useState<number | null>(null);
  const selectContainMock = (newValue: number | null) => {
    setContainMock(newValue);
  };
  //배점
  const [equalScore, setEqualScore] = useState<number | null>(null);
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
  //배점 모달 띄우는 값
  const [isEqualScoreModal, setIsEqualScoreModal] = useState<boolean>(false);

  const openEqualScoreSettingModal = () => {
    if (questionNum || inputValue || includeQuizList.length > 0) {
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
  //총 배점
  const [equalTotalValue, setEqualTotlaValue] = useState('0');
  // 문항당 배점
  const [isSaveEqualValue, setIsSaveEqualValue] = useState<boolean>(false);

  //나머지 시작 컨텐츠
  const [remainderContent, setRemainderContent] = useState<number>();
  //나머지 시작 전 컨텐츠
  const [nextRemainderContent, setNextRemainderContent] = useState<number>();
  //문항당 배점
  const [quotient, setQuotient] = useState<number>(0);
  const [remainder, setRemainder] = useState<number>();
  const [minQuotient, setMinQuotient] = useState<number>();
  const [maxQuotient, setMaxQuotient] = useState<number>();
  const [getLocalData, setGetLocalData] = useState<any | null>(null);

  //문항 재배점
  const [isResaveEqualValue, setIsResaveEqualValue] = useState(false);
  //최종 확인
  const [isConfirm, setIsConfirm] = useState(false);

  const saveEqualInputValue = () => {
    //받아온 문항 수 넘버타입 변경
    const parsedreceivedQuiz = receivedQuizCount?.toString();
    //받아온 문항 수 넘버타입 변경
    const parsedreceivedQuizValue = parseInt(parsedreceivedQuiz as string, 10);
    //총배점 타입 변경
    const parsedValue = parseInt(equalTotalValue, 10);

    //선택된 문항 수
    const questionNumValue = questionNum
      ? parseInt(questionNum, 10) * includeQuizList.length
      : inputValue
        ? parseInt(inputValue, 10) * includeQuizList.length
        : 0;

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
  const changeEqualInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let equalTotalValue = e.target.value;
    // 정규표현식을 사용하여 숫자 이외의 문자 제거
    equalTotalValue = equalTotalValue.replace(/[^0-9]/g, '');

    const parsedValue = parseInt(equalTotalValue, 10);

    setEqualTotlaValue(parsedValue >= 200 ? '200' : equalTotalValue);
  };

  // 균등배점 모달 닫기
  const closeEqualScoreSettingModal = () => {
    setIsEqualScoreModal(false);
  };
  //균등배점 저장
  const saveEqualScoreSettingModal = () => {
    if (isSaveEqualValue) {
      //재균등배점
      if (isResaveEqualValue) {
        setIsConfirm(true);
        closeEqualScoreSettingModal();
        //로컬에 배점 저장하기
        //saveLocalQutientData();
      } else {
        closeEqualScoreSettingModal();
        //saveLocalQutientData();
      }
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

  const renderQuestionButtons = () => {
    const buttonOption1 = [
      { value: '1', label: '1' },
      { value: '3', label: '3' },
      { value: '5', label: '5' },
    ];

    return (
      <>
        <>
          {buttonOption1.map((button) => (
            <Button
              key={button.value}
              onClick={() => selectQuestionNum(button.value)}
              $padding="10px"
              height={'34px'}
              width={'100px'}
              fontSize="14px"
              $normal={questionNum !== button.value}
              $filled={questionNum === button.value}
              cursor
            >
              <span>{button.label}</span>
            </Button>
          ))}
        </>
        <DivideBar>|</DivideBar>
        <NumberInputWrapper>
          <NumberInput
            value={inputValue}
            maxLength={3}
            onClick={() => selectQuestionNum(null)}
            style={{
              color: questionNum === null ? 'white' : `${COLOR.PRIMARY}`,
              backgroundColor:
                questionNum === null ? `${COLOR.PRIMARY}` : 'white',
            }}
            onChange={(e) => {
              changeInputValue(e);
            }}
          ></NumberInput>
          문항
        </NumberInputWrapper>
      </>
    );
  };

  const renderDifficultyButtons = () => {
    const buttonOption = [
      { value: '선택안함', label: '선택안함' },
      { value: 'LOWER', label: '하' },
      { value: 'INTERMEDIATE', label: '중하' },
      { value: 'MEDIUM', label: '중' },
      { value: 'UPPER', label: '상' },
      { value: 'BEST', label: '최상' },
    ];

    return buttonOption.map((button) => (
      <Button
        key={button.value}
        buttonType="button"
        onClick={() => {
          selectQuestionLevel(button.value);
        }}
        $padding="10px"
        height={'34px'}
        width={'100%'}
        fontSize="13px"
        $normal={questionLevel !== button.value}
        $filled={questionLevel === button.value}
        cursor
      >
        <span>{button.label}</span>
      </Button>
    ));
  };

  const renderTypeButtons = () => {
    const isAllSelectedQuestionType =
      questionType?.includes('MULTIPLE_CHOICE') &&
      questionType?.includes('SHORT_ANSWER') &&
      questionType?.includes('ESSAY_ANSWER');

    const buttonOption = [
      { value: 'MULTIPLE_CHOICE', label: '객관식' },
      { value: 'SHORT_ANSWER', label: '주관식' },
      { value: 'ESSAY_ANSWER', label: '서술형' },
    ];

    return (
      <>
        <Button
          buttonType="button"
          onClick={() => {
            if (isAllSelectedQuestionType) {
              setQuestionType([]);
            } else {
              setQuestionType([
                'MULTIPLE_CHOICE',
                'SHORT_ANSWER',
                'ESSAY_ANSWER',
              ]);
            }
          }}
          $padding="10px"
          height={'34px'}
          width={'100%'}
          fontSize="14px"
          $normal={!isAllSelectedQuestionType}
          $filled={isAllSelectedQuestionType}
          cursor
        >
          <span>전체</span>
        </Button>
        {buttonOption.map((button) => (
          <Button
            key={button.value}
            buttonType="button"
            onClick={() => selectQuestionType(button.value)}
            $padding="10px"
            height={'34px'}
            width={'100%'}
            fontSize="14px"
            $normal={!questionType?.includes(button.value)}
            $filled={questionType?.includes(button.value)}
            cursor
          >
            <span>{button.label}</span>
          </Button>
        ))}
      </>
    );
  };

  //기출
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [questionList, setQuestionList] = useState<QuizListType[]>([]);
  //학교 검색 select 값
  const [previousExamMenu, setPreviousExamMenu] = useState<number>(0);
  const [previousExamYear, setPreviousExamYear] = useState<string | null>(null);
  const [previousSchoolList, setPreviousSchoolList] = useState<
    PreviousSchoolType[]
  >([]);
  const [previousNationalList, setPreviousNationalList] = useState<
    PreviousNationalType[]
  >([]);
  const [processPreviousQuizListData, setProcessPreviousQuizListData] =
    useState<QuizListType[]>([]);
  //학교내신 문항리스트
  const [previousSchoolQuizList, setPreviousSchoolQuizList] = useState<
    number[]
  >([]);
  //사용자가 선택한 학교(화면 노출용)
  const [previousSchoolName, setPreviousSchoolName] = useState<string>('');
  //사용자가 선택한 학년(화면 노출용)
  const [previousSchoolGrade, setPreviousSchoolGrade] = useState<string>('');
  //사용자가 선택한 학기(화면 노출용)
  const [previousSchoolSemester, setPreviousSchoolSemester] =
    useState<string>('');
  //사용자가 선택한 학사일정(화면 노출용)
  const [previousSchoolAcademic, setPreviousSchoolAcademic] =
    useState<string>('');
  //사용자가 선택한 학교급(화면 노출용)
  const [previousSchoolLevel, setPreviousSchoolLevel] = useState<string>('');
  //사용자가 선택한 주관사(화면 노출용)
  const [previousSchoolHost, setPreviousSchoolHost] = useState<string>('');
  //사용자가 선택한 타입(화면 노출용)
  const [previousSchoolType, setPreviousSchoolType] = useState<string>('');

  //학교내신
  //학교명 selectList
  const [previousSchoolNameSelectList, setPreviousSchoolNameSelectList] =
    useState<SelectListType>();
  //학교명 기출속성
  const [previousSchoolNameSelect, setPreviousSchoolNameSelect] =
    useState<string>('');
  //학년 selectList
  const [schoolGradeSelectList, setSchoolGradeSelectList] =
    useState<SelectListType>();
  const [schoolGradeSelect, setSchoolGradeSelect] = useState<string>('');
  //학기 selectList
  const [schoolSemesterSelectList, setSchoolSemesterSelectList] =
    useState<SelectListType>();
  const [schoolSemesterSelect, setSchoolSemesterSelect] = useState<string>('');
  //학사일정 selectList
  const [schoolAcademicSelectList, setSchoolAcademicSelectList] =
    useState<SelectListType>();
  const [schoolAcademicSelect, setSchoolAcademicSelect] = useState<string>('');

  //전국시험
  //기출속성 selectList
  const [attributeSelectList, setAttributeSelectList] =
    useState<SelectListType>();
  //전국시험 기출속성
  const [attributeSelect, setAttributeSelect] = useState<string>('');
  //기출명 selectList
  const [attributeNameSelectList, setAttributeNameSelectList] =
    useState<SelectListType>();
  //전국시험 기출명
  const [attributeNameSelect, setAttributeNameSelect] = useState<string>('');
  //기출년도 buttonList
  const [attributeYearList, setAttributeYearList] = useState<
    { value: number; label: string }[]
  >([]);

  //학교내신 전국시험 선택
  const selectPreviousExamMenu = (newValue: number) => {
    setPreviousExamMenu(newValue);
    setPreviousExamYear(null);
    //탭변할때 초기화
    //내신
    setPreviousSchoolNameSelect('');
    setSchoolGradeSelect('');
    setSchoolSemesterSelect('');
    setSchoolAcademicSelect('');
    //전국기출
    setAttributeNameSelect('');
    setAttributeSelect('');
    setNationalLevelSelect('');
    setNationalGradeSelect('');
    setNationalHostSelect('');
    setNationalTypeSelect('');
  };

  //출제년도 선택
  const selectPreviousExamYear = (newValue: string) => {
    setPreviousExamYear(newValue);
  };

  const renderScoreButtons = () => {
    const buttonOption = [
      { value: 1, label: '선택안함' },
      { value: 2, label: '균등 배점' },
    ];

    return buttonOption.map((button) => (
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
    ));
  };

  // 학교내신 불러오기 api
  //특정값이 null일때 파라미터에서 빼고 보내기
  const getPreviousSchoolContent = async () => {
    const params = new URLSearchParams();

    // 항상 있는 값 추가
    params.append('name', previousSchoolNameSelect);
    params.append('year', previousExamYear as string);

    // 조건부로 추가
    if (schoolGradeSelect && schoolGradeSelect !== '학년')
      params.append('grades', schoolGradeSelect);
    if (schoolSemesterSelect && schoolSemesterSelect !== '학기')
      params.append('semesters', schoolSemesterSelect);
    if (schoolAcademicSelect && schoolAcademicSelect !== '학사일정')
      params.append('academics', schoolAcademicSelect);

    // 파라미터가 없으면 요청하지 않음
    if (!previousSchoolNameSelect || !previousExamYear) {
      console.warn('필수 값(name 또는 years)이 없습니다. 요청을 중단합니다.');
      return;
    }

    const queryString = params.toString();
    const res = await quizService.get(`/v1/previous/school?${queryString}`);
    return res;
  };
  const {
    data: previousSchoolData,
    refetch: previousSchoolDataRefetch,
    isFetching: previousSchoolDataLoading,
  } = useQuery({
    queryKey: ['get-previousSchool'],
    queryFn: getPreviousSchoolContent,
    meta: {
      errorMessage: 'get-previousSchool 에러 메세지',
    },
  });

  useEffect(() => {
    if (previousSchoolData)
      setPreviousSchoolList(previousSchoolData?.data.data.previousList);
  }, [previousSchoolData]);

  useEffect(() => {
    previousSchoolDataRefetch();
  }, [
    previousExamYear,
    previousSchoolNameSelect,
    schoolGradeSelect,
    schoolSemesterSelect,
    schoolAcademicSelect,
  ]);
  const [selectedPreviousSchoolList, setSelectedPreviousSchoolList] = useState<
    selectedListType[]
  >([]);
  const [selectedPreviousNationalList, setSelectedPreviousNationalList] =
    useState<selectedListType[]>([]);

  //학교내신 화면설정 정보 불러오기 api
  const getPreviousSchoolMenu = async () => {
    const res = await resourceServiceInstance.get(
      `/v1/menu/path?url=workbookSchoolReportSetting`,
    );
    //console.log(res);
    return res;
  };
  const { data: previousSchoolMenuData, refetch: previousSchoolMenuRefetch } =
    useQuery({
      queryKey: ['get-previousSchoolMenu'],
      queryFn: getPreviousSchoolMenu,
      meta: {
        errorMessage: 'get-previousSchoolMenu 에러 메세지',
      },
    });

  useEffect(() => {
    if (previousExamMenu === 0) previousSchoolMenuRefetch();
  }, [previousExamMenu]);

  useEffect(() => {
    if (previousSchoolMenuData) {
      const filterList = previousSchoolMenuData.data.data.menuDetailList;
      const nameListArray = filterList[0]?.nameList?.split(',') || [];
      const viewListArray = (filterList[0]?.viewList?.split(',') || []).map(
        (item: string) => item === 'true',
      );
      const searchListArray = (filterList[0]?.searchList?.split(',') || []).map(
        (item: string) => item === 'true',
      );
      const newArray = nameListArray.map((name: string, index: number) => ({
        name,
        idx: index,
        view: viewListArray[index] || false,
        search: searchListArray[index] || false,
      }));
      setSelectedPreviousSchoolList(newArray);
    }
  }, [previousSchoolMenuData]);

  //전국시험 화면설정 정보 불러오기 api
  const getPreviousNationalMenu = async () => {
    const res = await resourceServiceInstance.get(
      `/v1/menu/path?url=workbookCSATSetting`,
    );
    console.log(res);
    return res;
  };
  const {
    data: previousNationalMenuData,
    refetch: previousNationalMenuRefetch,
  } = useQuery({
    queryKey: ['get-previousNationalmenu'],
    queryFn: getPreviousNationalMenu,
    meta: {
      errorMessage: 'get-previousNationalmenu 에러 메세지',
    },
  });

  useEffect(() => {
    if (previousExamMenu === 1) previousNationalMenuRefetch();
  }, [previousExamMenu]);

  useEffect(() => {
    if (previousNationalMenuData) {
      const filterList = previousNationalMenuData.data.data.menuDetailList;
      const nameListArray = filterList[0]?.nameList?.split(',') || [];
      const viewListArray = (filterList[0]?.viewList?.split(',') || []).map(
        (item: string) => item === 'true',
      );
      const searchListArray = (filterList[0]?.searchList?.split(',') || []).map(
        (item: string) => item === 'true',
      );
      const newArray = nameListArray.map((name: string, index: number) => ({
        name,
        idx: index,
        view: viewListArray[index] || false,
        search: searchListArray[index] || false,
      }));
      setSelectedPreviousNationalList(newArray);
    }
  }, [previousNationalMenuData]);

  //기출 학교급 selectList
  const [nationalLevelSelectList, setNationalLevelSelectList] =
    useState<SelectListType>();
  const [nationalLevelSelect, setNationalLevelSelect] = useState<string>('');
  //기출 학년 selectList
  const [nationalGradeSelectList, setNationalGradeSelectList] =
    useState<SelectListType>();
  const [nationalGradeSelect, setNationalGradeSelect] = useState<string>('');
  //기출 주관사 selectList
  const [nationalHostSelectList, setNationalHostSelectList] =
    useState<SelectListType>();
  const [nationalHostSelect, setNationalHostSelect] = useState<string>('');
  //기출 시험지타입 selectList
  const [nationalTypeSelectList, setNationalTypeSelectList] =
    useState<SelectListType>();
  const [nationalTypeSelect, setNationalTypeSelect] = useState<string>('');

  //전국시험 불러오기 api
  //특정값이 null일때 파라미터에서 빼고 보내기
  const getPreviousNationalContent = async () => {
    const params = new URLSearchParams();

    // 항상 있는 값 추가
    params.append('nationalType ', attributeSelect);
    params.append('nationalName ', attributeNameSelect);
    params.append('year', previousExamYear as string);

    // 조건부로 추가
    if (nationalLevelSelect && nationalLevelSelect !== '학교')
      params.append('levels', nationalLevelSelect);
    if (nationalGradeSelect && nationalGradeSelect !== '학년')
      params.append('grades', nationalGradeSelect);
    if (nationalHostSelect && nationalHostSelect !== '주관사')
      params.append('hosts', nationalHostSelect);
    //'reportType 바꿔야함'
    if (nationalTypeSelect && nationalTypeSelect !== '시험지타입')
      params.append('reportType', nationalTypeSelect);

    // 파라미터가 없으면 요청하지 않음
    if (!attributeSelect || !attributeNameSelect || !previousExamYear) {
      console.warn(
        '필수 값(type, name 또는 years)이 없습니다. 요청을 중단합니다.',
      );
      return;
    }

    const queryString = params.toString();
    const res = await quizService.get(`/v1/previous/national?${queryString}`);
    return res;
  };
  const {
    data: previousNationalData,
    refetch: previousNationalDataRefetch,
    isFetching: previousNationalDataLoading,
  } = useQuery({
    queryKey: ['get-previousNational'],
    queryFn: getPreviousNationalContent,
    meta: {
      errorMessage: 'get-previousNational 에러 메세지',
    },
  });

  useEffect(() => {
    if (previousNationalData)
      setPreviousNationalList(previousNationalData?.data.data.previousList);
  }, [previousNationalData]);

  useEffect(() => {
    previousNationalDataRefetch();
  }, [
    previousExamYear,
    attributeSelect,
    attributeNameSelect,
    nationalLevelSelect,
    nationalGradeSelect,
    nationalHostSelect,
  ]);

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

  // 문항 번호 부분 선택
  const toggleCheckPartialPreviousQuiz = (
    quizCode: string,
    isChecked: boolean,
  ) => {
    setProcessPreviousQuizListData((prevList) => {
      return prevList.map((item) => {
        if (item.code === quizCode) {
          return {
            ...item,
            isChecked: !isChecked,
          };
        }
        return item;
      });
    });

    toggleQuizCode(quizCode, isChecked);
  };

  //학교내신 사용자선택 값
  const handleButtonCheckSchool = (
    idxList: number[],
    schoolName: string,
    grade: string,
    semester: string,
    academic: string,
  ) => {
    setPreviousSchoolQuizList(idxList);
    setPreviousSchoolName(schoolName);
    setPreviousSchoolGrade(grade);
    setPreviousSchoolSemester(semester);
    setPreviousSchoolAcademic(academic);
  };

  //전국시험 사용자선택 값
  const handleNationalButtonCheck = (
    idxList: number[],
    schoolName: string,
    grade: string,
    level: string,
    host: string,
    type: string,
  ) => {
    setPreviousSchoolQuizList(idxList);
    setPreviousSchoolName(schoolName);
    setPreviousSchoolGrade(grade);
    setPreviousSchoolLevel(level);
    setPreviousSchoolHost(host);
    setPreviousSchoolType(type);
  };

  //학교내신 문제 받아오기
  const getPreviousSchoolQuiz = async () => {
    const res = await quizService.get(`/v1/quiz/${previousSchoolQuizList}`);
    return res.data.data.quizList;
  };
  const {
    data: perviousSchoolquizData,
    refetch: perviousSchoolquizDataRefetch,
  } = useQuery({
    queryKey: ['get-perviousSchoolquizList'],
    queryFn: getPreviousSchoolQuiz,
    meta: {
      errorMessage: 'get-perviousSchoolquizList 에러 메세지',
    },
    enabled: false,
  });

  useEffect(() => {
    if (previousSchoolQuizList.length > 0) perviousSchoolquizDataRefetch();
  }, [previousSchoolQuizList]);

  useEffect(() => {
    if (perviousSchoolquizData) setQuestionList(perviousSchoolquizData);
  }, [perviousSchoolquizData]);

  // 문항 정보 받아왔을 때 가공하는거로 바꿔야 함
  useEffect(() => {
    if (questionList?.length > 0) {
      const initialData = questionList.map((school) => ({
        id: `${school.code}-${school.idx}`,
        code: school.code,
        createdAt: school.createdAt,
        createdBy: school.createdBy,
        idx: school.idx,
        isDelete: school.isDelete,
        isUse: school.isUse,
        isFavorite: school.isFavorite,
        lastArticle: school.lastArticle,
        lastModifiedAt: school.lastModifiedAt,
        lastModifiedBy: school.lastModifiedBy,
        type: school.type,
        userKey: school.userKey,
        quizCategoryList: school.quizCategoryList,
        quizItemList: school.quizItemList,
        quizList: school.quizList,
        isChecked: false,
      }));
      setProcessPreviousQuizListData(initialData);
    }
  }, [questionList, previousSchoolDataRefetch]);

  //리스트 솔팅 정렬
  const [columnsCount, setColumnsCount] = useState<number>(3);
  const [itemHeight, setItemHeight] = useState<string | undefined>('250px');
  useEffect(() => {}, [columnsCount, itemHeight]);

  //셀렉트 데이터
  const [content, setContent] = useState<string[]>([]);
  const [topSelect, setTopSelect] = useState<string>('문제만 보기');
  const sortArr = [
    {
      idx: '대발문 + 지문 + 문제',
      label: '대발문 + 지문 + 문제',
      code: '대발문 + 지문 + 문제',
      value: '대발문 + 지문 + 문제',
      name: '대발문 + 지문 + 문제',
    },
    {
      idx: '문제 + 정답 + 해설',
      label: '문제 + 정답 + 해설',
      code: '문제 + 정답 + 해설',
      value: '문제 + 정답 + 해설',
      name: '문제 + 정답 + 해설',
    },
    {
      idx: '대발문 + 지문 + 문제 + 정답 + 해설',
      label: '대발문 + 지문 + 문제 + 정답 + 해설',
      code: '대발문 + 지문 + 문제 + 정답 + 해설',
      value: '대발문 + 지문 + 문제 + 정답 + 해설',
      name: '대발문 + 지문 + 문제 + 정답 + 해설',
    },
  ];
  const [previousSchoolSubjectList, setPreviousSchoolSubjectList] = useState<
    {
      name: string;
      code: string;
      value: string;
    }[]
  >([]);
  const [previousSchoolSubject, setPreviousSchoolSubject] =
    useState<string>('교과');
  const [previousSchoolUnitList, setPreviousSchoolUnitList] = useState<
    {
      name: string;
      code: string;
      value: string;
    }[]
  >([]);
  const [previousSchoolUnit, setPreviousSchoolUnit] = useState<string>('과목');

  //받아온 값에서 교과 리스트 가공
  useEffect(() => {
    if (questionList) {
      const quizCategoryList = questionList.map(
        (item) => item.quizCategoryList,
      );
      const subjectList = quizCategoryList
        .flat() // quizCategoryList 배열 안의 배열을 평탄화
        .map((quizCategoryItem) => quizCategoryItem.quizCategory?.교과) // 교과을 추출
        .filter((subject): subject is string => subject !== undefined); // undefined 값 제거

      const formattedSubjects = subjectList.map((subject) => ({
        name: subject,
        code: subject,
        value: subject,
      }));

      setPreviousSchoolSubjectList(formattedSubjects);
    }
  }, [questionList]);

  //받아온 값에서 과목 리스트 가공
  useEffect(() => {
    if (questionList) {
      const quizCategoryList = questionList.map(
        (item) => item.quizCategoryList,
      );

      const subjectList = quizCategoryList
        .flat() // quizCategoryList 배열 안의 배열을 평탄화
        .map((quizCategoryItem) => {
          // quizCategoryItem.quizCategory?.교과가 previousSchoolSubject와 동일한 경우
          const subjectCategory = quizCategoryItem.quizCategory?.교과;
          if (subjectCategory === previousSchoolSubject) {
            return quizCategoryItem.quizCategory?.과목;
          }
          return undefined; // 조건에 맞지 않으면 undefined 반환
        })
        .filter((subject): subject is string => subject !== undefined); // undefined 값 제거

      const formattedSubjects = subjectList.map((subject) => ({
        name: subject,
        code: subject,
        value: subject,
      }));

      setPreviousSchoolUnitList(formattedSubjects);
    }
  }, [previousSchoolSubject]);

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);
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

  //학교내신 학교명 리스트 불러오는 api
  const getPreviousSchoolNameList = async () => {
    const res = await quizService.get(
      `/v1/previous/class/search?searchCondition=내신&searchKeyword=학교명`,
    );
    return res.data.data.dataList;
  };
  const {
    data: perviousSchoolNameListData,
    refetch: perviousSchoolNameListDataRefetch,
  } = useQuery({
    queryKey: ['get-perviousSchoolNameList'],
    queryFn: getPreviousSchoolNameList,
    meta: {
      errorMessage: 'get-perviousSchoolNameList 에러 메세지',
    },
    enabled: previousExamMenu === 0,
  });

  useEffect(() => {
    if (perviousSchoolNameListData) {
      const processedData = {
        idx: 0,
        name: '학교명',
        value: '학교명',
        options: perviousSchoolNameListData.map(
          (item: string, index: number) => ({
            idx: index,
            name: item,
            value: item,
          }),
        ),
      };
      setPreviousSchoolNameSelectList(processedData);
    }
  }, [perviousSchoolNameListData]);

  //학교내신 학년 리스트 불러오는 api
  const getPreviousSchoolGradeList = async () => {
    const res = await quizService.get(
      `/v1/previous/class/search?searchCondition=내신&searchKeyword=학년`,
    );
    return res.data.data.dataList;
  };
  const {
    data: perviousSchoolGradeListData,
    refetch: perviousSchoolGradeListDataRefetch,
  } = useQuery({
    queryKey: ['get-perviousSchoolGradeList'],
    queryFn: getPreviousSchoolGradeList,
    meta: {
      errorMessage: 'get-perviousSchoolGradeList 에러 메세지',
    },
    enabled: previousExamMenu === 0 || previousSchoolList.length > 0,
  });

  useEffect(() => {
    if (previousExamMenu === 0) {
      perviousSchoolGradeListDataRefetch();
    }
  }, [previousSchoolList]);

  useEffect(() => {
    if (perviousSchoolGradeListData) {
      const processedData = {
        idx: 0,
        name: 'schoolGrade',
        value: '0',
        options: perviousSchoolGradeListData.map(
          (item: string, index: number) => ({
            idx: index,
            name: item,
            value: item,
          }),
        ),
      };
      setSchoolGradeSelectList(processedData);
    }
  }, [perviousSchoolGradeListData]);

  //학교내신 학기 리스트 불러오는 api
  const getPreviousSchoolSemesterList = async () => {
    const res = await quizService.get(
      `/v1/previous/class/search?searchCondition=내신&searchKeyword=학기`,
    );
    return res.data.data.dataList;
  };
  const {
    data: perviousSchoolSemesterListData,
    refetch: perviousSchoolSemesterListDataRefetch,
  } = useQuery({
    queryKey: ['get-perviousSchoolSemesterList'],
    queryFn: getPreviousSchoolSemesterList,
    meta: {
      errorMessage: 'get-perviousSchoolSemesterList 에러 메세지',
    },
    enabled: previousExamMenu === 0 || previousSchoolList.length > 0,
  });

  useEffect(() => {
    if (previousExamMenu === 0) {
      perviousSchoolSemesterListDataRefetch();
    }
  }, [previousSchoolList]);

  useEffect(() => {
    if (perviousSchoolSemesterListData) {
      const processedData = {
        idx: 0,
        name: 'schoolSemester',
        value: '0',
        options: perviousSchoolSemesterListData.map(
          (item: string, index: number) => ({
            idx: index,
            name: item,
            value: item,
          }),
        ),
      };
      setSchoolSemesterSelectList(processedData);
    }
  }, [perviousSchoolSemesterListData]);

  //학교내신 학사일정 리스트 불러오는 api
  const getPreviousSchoolAcademicList = async () => {
    const res = await quizService.get(
      `/v1/previous/class/search?searchCondition=내신&searchKeyword=학사일정`,
    );
    return res.data.data.dataList;
  };
  const {
    data: perviousSchoolAcademicListData,
    refetch: perviousSchoolAcademicListDataRefetch,
  } = useQuery({
    queryKey: ['get-perviousSchoolAcademicList'],
    queryFn: getPreviousSchoolAcademicList,
    meta: {
      errorMessage: 'get-perviousSchoolAcademicList 에러 메세지',
    },
    enabled: previousExamMenu === 0 || previousSchoolList.length > 0,
  });

  useEffect(() => {
    if (previousExamMenu === 0) {
      perviousSchoolAcademicListDataRefetch();
    }
  }, [previousSchoolList]);

  useEffect(() => {
    if (perviousSchoolAcademicListData) {
      const processedData = {
        idx: 0,
        name: 'schoolAcademic',
        value: '0',
        options: perviousSchoolAcademicListData.map(
          (item: string, index: number) => ({
            idx: index,
            name: item,
            value: item,
          }),
        ),
      };
      setSchoolAcademicSelectList(processedData);
    }
  }, [perviousSchoolAcademicListData]);

  //전국시험 기출속성 리스트 불러오는 api
  const getPreviousAttributeList = async () => {
    const res = await quizService.get(
      `/v1/previous/class/search?searchCondition=기출&searchKeyword=기출속성`,
    );
    return res.data.data.dataList;
  };
  const {
    data: perviousAttributeListData,
    refetch: perviousAttributeListDataRefetch,
  } = useQuery({
    queryKey: ['get-perviousAttributeList'],
    queryFn: getPreviousAttributeList,
    meta: {
      errorMessage: 'get-perviousAttributeList 에러 메세지',
    },
    enabled: previousExamMenu === 1,
  });

  useEffect(() => {
    if (perviousAttributeListData) {
      const processedData = {
        idx: 0,
        name: 'nationalAttribute',
        value: '0',
        options: perviousAttributeListData.map(
          (item: string, index: number) => ({
            idx: index,
            name: item,
            value: item,
          }),
        ),
      };
      setAttributeSelectList(processedData);
    }
  }, [perviousAttributeListData]);

  //전국시험 기출명 리스트 불러오는 api
  const getPreviousAttributeNameList = async () => {
    const res = await quizService.get(
      `/v1/previous/class/search?searchCondition=기출&searchKeyword=기출명`,
    );
    return res.data.data.dataList;
  };
  const {
    data: perviousAttributeNameListData,
    refetch: perviousAttributeNameListDataRefetch,
  } = useQuery({
    queryKey: ['get-perviousAttributeNameList'],
    queryFn: getPreviousAttributeNameList,
    meta: {
      errorMessage: 'get-perviousAttributeNameList 에러 메세지',
    },
    enabled: previousExamMenu === 1,
  });

  useEffect(() => {
    if (perviousAttributeNameListData) {
      const processedData = {
        idx: 0,
        name: 'nationalAtrributeName',
        value: '0',
        options: perviousAttributeNameListData.map(
          (item: string, index: number) => ({
            idx: index,
            name: item,
            value: item,
          }),
        ),
      };
      setAttributeNameSelectList(processedData);
    }
  }, [perviousAttributeNameListData]);

  //학교내신/전국시험 출제년도 리스트 불러오는 api
  const getPreviousAttributeYearList = async () => {
    const res = await quizService.get(
      `/v1/previous/class/search?searchCondition=${previousExamMenu === 0 ? '내신' : '기출'}&searchKeyword=${previousExamMenu === 0 ? '출제년도' : '기출일시'}`,
    );
    return res.data.data.dataList;
  };
  const {
    data: perviousAttributeYearListData,
    refetch: perviousAttributeYearListDataRefetch,
    isFetching: perviousAttributeYearListFetching,
  } = useQuery({
    queryKey: ['get-perviousAttributeYearList'],
    queryFn: getPreviousAttributeYearList,
    meta: {
      errorMessage: 'get-perviousAttributeYearList 에러 메세지',
    },
  });

  useEffect(() => {
    perviousAttributeYearListDataRefetch();
  }, [previousExamMenu]);

  useEffect(() => {
    if (perviousAttributeYearListData) {
      const uniqueYears = Array.from(
        new Set(
          perviousAttributeYearListData.map((item: string) => item.slice(0, 4)),
        ),
      );

      const processedData = uniqueYears.map((year, index) => ({
        value: index,
        label: year as string,
      }));

      setAttributeYearList(processedData);
    }
  }, [perviousAttributeYearListData]);

  //전국시험 학교 리스트 불러오는 api
  const getPreviousNationalLevelList = async () => {
    const res = await quizService.get(
      `/v1/previous/class/search?searchCondition=기출&searchKeyword=학교`,
    );
    return res.data.data.dataList;
  };
  const {
    data: perviousNationalLevelListData,
    refetch: perviousNationalLevelListDataRefetch,
  } = useQuery({
    queryKey: ['get-perviousNationalLevelList'],
    queryFn: getPreviousNationalLevelList,
    meta: {
      errorMessage: 'get-perviousNationalLevelList 에러 메세지',
    },
    enabled: previousExamMenu === 1 || previousNationalList.length > 0,
  });

  useEffect(() => {
    if (previousExamMenu === 1) {
      perviousNationalLevelListDataRefetch();
    }
  }, [previousNationalList]);

  useEffect(() => {
    if (perviousNationalLevelListData) {
      const processedData = {
        idx: 0,
        name: 'nationalLevel',
        value: '0',
        options: perviousNationalLevelListData.map(
          (item: string, index: number) => ({
            idx: index,
            name: item,
            value: item,
          }),
        ),
      };
      setNationalLevelSelectList(processedData);
    }
  }, [perviousNationalLevelListData]);

  //전국시험 학교 리스트 불러오는 api
  const getPreviousNationalGradeList = async () => {
    const res = await quizService.get(
      `/v1/previous/class/search?searchCondition=기출&searchKeyword=학년`,
    );
    return res.data.data.dataList;
  };
  const {
    data: perviousNationalGradeListData,
    refetch: perviousNationalGradeListDataRefetch,
  } = useQuery({
    queryKey: ['get-perviousNationalGradeList'],
    queryFn: getPreviousNationalGradeList,
    meta: {
      errorMessage: 'get-perviousNationalGradeList 에러 메세지',
    },
    enabled: previousExamMenu === 1 || previousNationalList.length > 0,
  });

  useEffect(() => {
    if (previousExamMenu === 1) {
      perviousNationalGradeListDataRefetch();
    }
  }, [previousNationalList]);

  useEffect(() => {
    if (perviousNationalGradeListData) {
      const processedData = {
        idx: 0,
        name: 'nationalGrade',
        value: '0',
        options: perviousNationalGradeListData.map(
          (item: string, index: number) => ({
            idx: index,
            name: item,
            value: item,
          }),
        ),
      };
      setNationalGradeSelectList(processedData);
    }
  }, [perviousNationalGradeListData]);

  //전국시험 주관사 리스트 불러오는 api
  const getPreviousNationalHostList = async () => {
    const res = await quizService.get(
      `/v1/previous/class/search?searchCondition=기출&searchKeyword=주관사`,
    );
    return res.data.data.dataList;
  };
  const {
    data: perviousNationalHostListData,
    refetch: perviousNationalHostListDataRefetch,
  } = useQuery({
    queryKey: ['get-perviousNationalHostList'],
    queryFn: getPreviousNationalHostList,
    meta: {
      errorMessage: 'get-perviousNationalHostList 에러 메세지',
    },
    enabled: previousExamMenu === 1 || previousNationalList.length > 0,
  });

  useEffect(() => {
    if (previousExamMenu === 1) {
      perviousNationalHostListDataRefetch();
    }
  }, [previousNationalList]);

  useEffect(() => {
    if (perviousNationalHostListData) {
      const processedData = {
        idx: 0,
        name: 'nationalHost',
        value: '0',
        options: perviousNationalHostListData.map(
          (item: string, index: number) => ({
            idx: index,
            name: item,
            value: item,
          }),
        ),
      };
      setNationalHostSelectList(processedData);
    }
  }, [perviousNationalHostListData]);

  //전국시험 주관사 리스트 불러오는 api
  const getPreviousNationalTypeList = async () => {
    const res = await quizService.get(
      `/v1/previous/class/search?searchCondition=기출&searchKeyword=시험지타입`,
    );
    console.log(res);
    return res.data.data.dataList;
  };
  const {
    data: perviousNationalTypeListData,
    refetch: perviousNationalTypeListDataRefetch,
  } = useQuery({
    queryKey: ['get-perviousNationalTypeList'],
    queryFn: getPreviousNationalTypeList,
    meta: {
      errorMessage: 'get-perviousNationalTypeList 에러 메세지',
    },
    enabled: previousExamMenu === 1 || previousNationalList.length > 0,
  });

  useEffect(() => {
    if (previousExamMenu === 1) {
      perviousNationalTypeListDataRefetch();
    }
  }, [previousNationalList]);

  useEffect(() => {
    if (perviousNationalTypeListData) {
      const processedData = {
        idx: 0,
        name: 'nationalType',
        value: '0',
        options: perviousNationalTypeListData.map(
          (item: string, index: number) => ({
            idx: index,
            name: item,
            value: item,
          }),
        ),
      };
      setNationalTypeSelectList(processedData);
    }
  }, [perviousNationalTypeListData]);

  const renderContentMathViwer = () => {
    return (
      <LayoutWrapper className="auto">
        <TopButtonWrapper>
          <div>
            {/* <CheckBoxI
                  $margin={'0 5px 0 0'}
                  onChange={(e) => handleAllCheck(e)}
                  checked={
                    checkedList.length === questionList.length ? true : false
                  }
                  // checked={true}
                  id={'all check'}
                  value={'all check'}
                /> */}
            <span className="title">
              {previousExamMenu === 0 ? (
                <>
                  {previousSchoolName} - {previousSchoolGrade}
                  {previousSchoolSemester} {previousSchoolAcademic}
                </>
              ) : (
                <>
                  {previousSchoolHost} - {previousSchoolLevel}
                  {previousSchoolGrade} {previousSchoolName}(
                  {previousSchoolType})
                </>
              )}
            </span>
          </div>
          <Button
            buttonType="button"
            onClick={() => {
              setIsSelected(false);
              setQuestionNum('');
              setQuestionLevel(null);
              setQuestionType([]);
              selectEqualScore(null);
              setPreviousSchoolSubject('교과');
              setPreviousSchoolUnit('과목');
            }}
            $padding="10px"
            height={'35px'}
            width={'130px'}
            fontSize="13px"
            $normal
            cursor
          >
            <span>다른 시험 선택</span>
          </Button>
        </TopButtonWrapper>
        <TopButtonWrapper>
          <SelectWrapper>
            <Select
              width={'120px'}
              defaultValue={'교과'}
              key={'교과'}
              options={previousSchoolSubjectList}
              //onSelect={(event) => selectCategoryOption(event)}
              setSelectedValue={setPreviousSchoolSubject}
              padding="0 5px 0 0"
              //isnormalizedOptions
            />
            <Select
              width={'120px'}
              defaultValue={'과목'}
              key={'과목'}
              options={previousSchoolUnitList}
              //onSelect={(event) => selectCategoryOption(event)}
              setSelectedValue={setPreviousSchoolUnit}
              //isnormalizedOptions
            />
          </SelectWrapper>
          <ButtonWrapper>
            <Select
              width={'250px'}
              defaultValue={'문제만 보기'}
              key={'문제만 보기'}
              options={sortArr}
              onSelect={(event) => selectCategoryOption(event)}
              setSelectedValue={setTopSelect}
            />
            <button
              onClick={() => {
                setColumnsCount(3);
                setItemHeight('250px');
              }}
              className={`button ${columnsCount == 3 ? 'on' : ''} `}
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
            <button
              onClick={() => {
                setColumnsCount(2);
                setItemHeight(undefined);
              }}
              className={`button ${columnsCount == 2 ? 'on' : ''}`}
            >
              {/* 맞춤보기  */}
              <Icon
                width={`20px`}
                src={`/images/icon/sorting_custom_view.svg`}
              />
            </button>
          </ButtonWrapper>
        </TopButtonWrapper>
        {previousSchoolSubject === '교과' || previousSchoolUnit === '과목' ? (
          <BlankWrapper>교과와 과목을 선택해주세요.</BlankWrapper>
        ) : (
          <ScrollWrapper className="items_height">
            <PerfectScrollbar>
              <MyStaticWrapper columnsCount={columnsCount} padding="5px">
                {processPreviousQuizListData.map((quiz, index) => (
                  <ItemWrapper key={quiz.idx} height={itemHeight}>
                    <TopButtonWrapper>
                      <div>
                        <CheckBoxI
                          $margin={'0 5px 0 0'}
                          readOnly
                          onClick={() =>
                            toggleCheckPartialPreviousQuiz(
                              quiz.code,
                              quiz.isChecked as boolean,
                            )
                          }
                          checked={quiz.isChecked || false}
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
                            {quiz.quizCategoryList[0].quizCategory?.문항타입}{' '}
                          </span>
                        )}
                      </span>
                    </TopButtonWrapper>
                    {/* 뷰어 영역 */}
                    <div className="quiz_wrap">
                      {quiz?.quizItemList?.map((el) => {
                        const contentOnly = ['QUESTION'];
                        const contentWithBig = ['BIG', 'TEXT', 'QUESTION'];
                        const contentWithAnswer = [
                          'QUESTION',
                          'ANSWER',
                          'COMMENTARY',
                        ];
                        const contentWithAll = [
                          'BIG',
                          'QUESTION',
                          'ANSWER',
                          'COMMENTARY',
                        ];
                        // [
                        //   'BIG',
                        //   'TEXT',
                        //   'QUESTION',
                        //   'SMALL',
                        //   'EXAMPLE',
                        //   'CHOICES',
                        //   'ANSWER',
                        //   'COMMENTARY',
                        //   'HINT',
                        //   'CONCEPT',
                        //   'TITLE',
                        //   'TIP',
                        // ]
                        return (
                          <div key={`${el?.code} quizItemList sortedList`}>
                            {topSelect === '문제만 보기' &&
                              contentOnly.includes(el?.type) &&
                              el?.content && (
                                <MathViewer data={el.content}></MathViewer> //topSelect
                              )}
                            {topSelect === '대발문 + 지문 + 문제' &&
                              contentWithBig.includes(el?.type) &&
                              el?.content && (
                                <MathViewer data={el.content}></MathViewer> //topSelect
                              )}
                            {topSelect === '문제 + 정답 + 해설' &&
                              contentWithAnswer.includes(el?.type) &&
                              el?.content && (
                                <MathViewer data={el.content}></MathViewer> //topSelect
                              )}
                            {topSelect ===
                              '대발문 + 지문 + 문제 + 정답 + 해설' &&
                              contentWithAll.includes(el?.type) &&
                              el?.content && (
                                <MathViewer data={el.content}></MathViewer> //topSelect
                              )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="class_wrap">
                      {quiz.quizCategoryList.some(
                        (item) => item.quizCategory?.교육과정,
                      ) ? (
                        quiz.quizCategoryList.map((item, idx) => (
                          <span key={idx}>
                            {item.quizCategory?.교육과정}/
                            {item.quizCategory?.과목}/{item.quizCategory?.교과}/
                            {item.quizCategory?.학년}/{item.quizCategory?.학기}/
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
                  </ItemWrapper>
                ))}
              </MyStaticWrapper>
            </PerfectScrollbar>
          </ScrollWrapper>
        )}
      </LayoutWrapper>
    );
  };

  const renderPreviousExamMenuButtons = () => {
    const buttonOption = [
      { value: 0, label: '학교내신' },
      { value: 1, label: '전국시험' },
    ];

    return buttonOption.map((button) => (
      <Button
        key={button.value}
        buttonType="button"
        onClick={() => {
          selectPreviousExamMenu(button.value);
          //기출속성 초기화
          setAttributeSelect('');
        }}
        $padding="10px"
        height={'35px'}
        width={'100%'}
        fontSize="14px"
        $normal={previousExamMenu !== button.value}
        $filled={previousExamMenu === button.value}
        cursor
      >
        <span>{button.label}</span>
      </Button>
    ));
  };

  //출제년도 슬라이더 화살표
  const scrollLeft = () => {
    const slider = document.querySelector('.button-slider');
    if (slider) {
      slider.scrollLeft -= 200; // 200px만큼 왼쪽으로 스크롤
    }
  };

  const scrollRight = () => {
    const slider = document.querySelector('.button-slider');
    if (slider) {
      slider.scrollLeft += 200; // 200px만큼 오른쪽으로 스크롤
    }
  };
  const renderPreviousExamYearButtons = () => {
    return (
      <>
        {perviousAttributeYearListFetching ? (
          <>
            <Loader size="15px" />
          </>
        ) : (
          <>
            {attributeYearList.map((button) => (
              <Button
                key={button.value}
                buttonType="button"
                onClick={() => {
                  selectPreviousExamYear(button.label);
                  setSchoolGradeSelect('');
                  setSchoolSemesterSelect('');
                  setSchoolAcademicSelect('');
                }}
                $padding="10px"
                height={'35px'}
                width={'100%'}
                fontSize="14px"
                $normal={previousExamYear !== button.label}
                $filled={previousExamYear === button.label}
                cursor
              >
                <span>{button.label}년</span>
              </Button>
            ))}
          </>
        )}
      </>
    );
  };
  useEffect(() => {
    //기출
    setPreviousExamMenu(0);
    setPreviousExamYear(null);
    setPreviousSchoolNameSelect('');
    setPreviousExamMenu(0);
    setPreviousExamYear(null);
    setPreviousSchoolList([]);
    setPreviousSchoolQuizList([]);
    setPreviousSchoolName('');
    setPreviousSchoolGrade('');
    setPreviousSchoolSemester('');
    setPreviousSchoolAcademic('');
    setIsSelected(false);
    setQuestionNum('');
    setQuestionLevel(null);
    setQuestionType([]);
    selectEqualScore(null);
    setPreviousSchoolSubject('교과');
    setPreviousSchoolUnit('과목');
    setAttributeNameSelect('');
  }, [previousExamMenu]);

  return (
    <Container>
      <CategorySection>
        {isSelected ? (
          <>{renderContentMathViwer()}</>
        ) : (
          <>
            <SchoolGradeWrapper>
              <PreviousExamMenuWrapper>
                {renderPreviousExamMenuButtons()}
              </PreviousExamMenuWrapper>
            </SchoolGradeWrapper>
            {previousExamMenu === 0 && (
              <>
                <PreviousExamSearchWrapper>
                  <Label value="학교명" fontSize="16px" width="60px" />
                  <SearchableSelect
                    key={`${previousSchoolNameSelectList?.idx} - ${previousSchoolNameSelectList?.name}`}
                    width={'400px'}
                    height="40px"
                    placeholder="학교명을 입력해주세요"
                    options={previousSchoolNameSelectList?.options}
                    selectedQuotientValue={previousSchoolNameSelect}
                    setSelectedQuotientValue={setPreviousSchoolNameSelect}
                  ></SearchableSelect>
                </PreviousExamSearchWrapper>
                <PreviousExamYearWrapper>
                  <Label value="출제년도" fontSize="16px" width="80px" />
                  <ArrowButton
                    className="arrow left-arrow"
                    onClick={scrollLeft}
                  >
                    {'<'}
                  </ArrowButton>
                  <ButtonSlider className="button-slider">
                    {renderPreviousExamYearButtons()}
                  </ButtonSlider>
                  <ArrowButton
                    className="arrow right-arrow"
                    onClick={scrollRight}
                  >
                    {'>'}
                  </ArrowButton>
                </PreviousExamYearWrapper>
                {/* 데이터 들어오는거에 맞게 보여주기*/}
                <PreviousExamListWrapper>
                  {previousExamYear === null ||
                  previousSchoolNameSelect === '' ? (
                    <PreviousExamDefoultBox>
                      학교명과 출제년도를 선택해주세요
                    </PreviousExamDefoultBox>
                  ) : (
                    <>
                      <SelectWrapper>
                        {selectedPreviousSchoolList.map((list) => {
                          if (
                            ['학년', '학기', '학사일정'].includes(list.name) &&
                            list.search === true
                          ) {
                            return (
                              <Select
                                width={'130px'}
                                defaultValue={list.name}
                                key={list.name}
                                options={
                                  list.name === '학년'
                                    ? schoolGradeSelectList?.options?.filter(
                                        (option) => option.name !== null,
                                      )
                                    : list.name === '학기'
                                      ? schoolSemesterSelectList?.options?.filter(
                                          (option) => option.name !== null,
                                        )
                                      : list.name === '학사일정'
                                        ? schoolAcademicSelectList?.options?.filter(
                                            (option) => option.name !== null,
                                          )
                                        : []
                                }
                                setSelectedValue={
                                  list.name === '학년'
                                    ? setSchoolGradeSelect
                                    : list.name === '학기'
                                      ? setSchoolSemesterSelect
                                      : list.name === '학사일정'
                                        ? setSchoolAcademicSelect
                                        : undefined
                                }
                                padding="0 5px 0 0"
                              ></Select>
                            );
                          }
                        })}
                      </SelectWrapper>
                      <List margin={`10px 0`} height="470px">
                        <>
                          {previousSchoolList.length > 0 ? (
                            <PreviousSchoolListWrapper>
                              {previousSchoolList.map((school, i) => (
                                <ListItem
                                  key={`${school.schoolName} - ${i}`}
                                  isChecked={false}
                                  height={'70px'}
                                  onClick={(e) => {
                                    handleButtonCheckSchool(
                                      school.quizList,
                                      school.schoolName,
                                      school.grade,
                                      school.semester,
                                      school.academic,
                                    );
                                    setIsSelected(true);
                                  }}
                                >
                                  <ItemLayout>
                                    {/* <CheckBoxI
                                  id={''}
                                  value={''}
                                  $margin={`0 5px 0 0`}
                                  //id={item.code}
                                  //value={item.code}
                                  //checked={checkList.includes(item.code)}
                                  readOnly
                                /> */}
                                    {selectedPreviousSchoolList.map((list) => {
                                      if (
                                        list.name === '학교명' &&
                                        list.view === true
                                      ) {
                                        return (
                                          <>
                                            <span className="width_150px item_wrapper">
                                              <span className="ellipsis">
                                                {school.schoolName}
                                              </span>
                                            </span>
                                            <i className="line"></i>
                                          </>
                                        );
                                      } else if (
                                        list.name === '학년' &&
                                        list.view === true
                                      ) {
                                        return (
                                          <>
                                            <span className="width_80px item_wrapper">
                                              <span className="ellipsis">
                                                {school.grade}
                                              </span>
                                            </span>
                                            <i className="line"></i>
                                          </>
                                        );
                                      } else if (
                                        list.name === '학기' &&
                                        list.view === true
                                      ) {
                                        return (
                                          <>
                                            <span className="width_80px item_wrapper">
                                              <span className="ellipsis">
                                                {school.semester}
                                              </span>
                                            </span>
                                            <i className="line"></i>
                                          </>
                                        );
                                      } else if (
                                        list.name === '학사일정' &&
                                        list.view === true
                                      ) {
                                        return (
                                          <>
                                            <span className="width_80px item_wrapper">
                                              <span className="ellipsis">
                                                {school.academic}
                                              </span>
                                            </span>
                                            <i className="line"></i>
                                          </>
                                        );
                                      } else if (
                                        list.name === '출제년도' &&
                                        list.view === true
                                      ) {
                                        return (
                                          <>
                                            <span className="width_80px item_wrapper">
                                              <span className="ellipsis">
                                                {school.year}
                                              </span>
                                            </span>
                                            <i className="line"></i>
                                          </>
                                        );
                                      }
                                    })}
                                    <span className="width_20px item_wrapper">
                                      <span className="ellipsis">
                                        {school.quizCount}
                                      </span>
                                    </span>
                                  </ItemLayout>
                                </ListItem>
                              ))}
                              {/* <PaginationBox
                            itemsCountPerPage={
                              previousSchoolData?.data.data
                                .pagination.pageUnit as number
                            }
                            totalItemsCount={
                              previousSchoolData?.data.data
                                .pagination.totalCount as number
                            }
                          /> */}
                            </PreviousSchoolListWrapper>
                          ) : (
                            <>
                              {previousSchoolDataLoading ? (
                                <>
                                  <Loader width="150px" />
                                </>
                              ) : (
                                <ValueNone
                                  textOnly
                                  info="등록된 데이터가 없습니다"
                                />
                              )}
                            </>
                          )}
                        </>
                      </List>
                    </>
                  )}
                </PreviousExamListWrapper>
              </>
            )}
            {isSelected ? (
              <>{renderContentMathViwer()}</>
            ) : (
              <>
                {previousExamMenu === 1 && (
                  <>
                    <PreviousExamSearchWrapper>
                      <Label value="시험명" fontSize="16px" width="60px" />
                      <Select
                        width={'400px'}
                        defaultValue={'기출속성'}
                        key={'기출속성'}
                        options={attributeSelectList?.options}
                        // onSelect={(event) =>
                        //   selectCategoryOption(event)
                        // }
                        setSelectedValue={setAttributeSelect}
                        isnormalizedOptions
                        padding="0 5px 0 0"
                      ></Select>
                      <SearchableSelect
                        key={`${attributeNameSelectList?.idx} - ${attributeNameSelectList?.name}`}
                        width={'400px'}
                        height="40px"
                        placeholder="기출명을 선택해주세요"
                        options={attributeNameSelectList?.options}
                        selectedQuotientValue={attributeNameSelect}
                        setSelectedQuotientValue={setAttributeNameSelect}
                      ></SearchableSelect>
                    </PreviousExamSearchWrapper>
                    <PreviousExamYearWrapper>
                      <Label value="기출년도" fontSize="16px" width="80px" />
                      <ArrowButton
                        className="arrow left-arrow"
                        onClick={scrollLeft}
                      >
                        {'<'}
                      </ArrowButton>
                      <ButtonSlider className="button-slider">
                        {renderPreviousExamYearButtons()}
                      </ButtonSlider>
                      <ArrowButton
                        className="arrow right-arrow"
                        onClick={scrollRight}
                      >
                        {'>'}
                      </ArrowButton>
                    </PreviousExamYearWrapper>
                    {/* 데이터 들어오는거에 맞게 보여주기*/}
                    <PreviousExamListWrapper>
                      {previousExamYear === null ? (
                        <PreviousExamDefoultBox>
                          학교명과 출제년도를 선택해주세요
                        </PreviousExamDefoultBox>
                      ) : (
                        <>
                          <SelectWrapper>
                            {selectedPreviousNationalList.map((list) => {
                              if (
                                [
                                  '학교급',
                                  '학년',
                                  '주관사',
                                  '시험지타입',
                                ].includes(list.name) &&
                                list.search === true
                              ) {
                                return (
                                  <Select
                                    width={'130px'}
                                    defaultValue={list.name}
                                    key={list.name}
                                    options={
                                      list.name === '학교급'
                                        ? nationalLevelSelectList?.options?.filter(
                                            (option) => option.name !== null,
                                          )
                                        : list.name === '학년'
                                          ? nationalGradeSelectList?.options?.filter(
                                              (option) => option.name !== null,
                                            )
                                          : list.name === '주관사'
                                            ? nationalHostSelectList?.options?.filter(
                                                (option) =>
                                                  option.name !== null,
                                              )
                                            : list.name === '시험지타입'
                                              ? nationalTypeSelectList?.options?.filter(
                                                  (option) =>
                                                    option.name !== null,
                                                )
                                              : []
                                    }
                                    // onSelect={(event) =>
                                    //   selectCategoryOption(event)
                                    // }
                                    setSelectedValue={
                                      list.name === '학교급'
                                        ? setNationalLevelSelect
                                        : list.name === '학년'
                                          ? setNationalGradeSelect
                                          : list.name === '주관사'
                                            ? setNationalHostSelect
                                            : list.name === '시험지타입'
                                              ? setNationalTypeSelect
                                              : undefined
                                    }
                                    padding="0 5px 0 0"
                                  ></Select>
                                );
                              }
                            })}
                          </SelectWrapper>
                          <List margin={`10px 0`} height="470px">
                            <>
                              {previousNationalList.length > 0 ? (
                                <PreviousSchoolListWrapper>
                                  {previousNationalList.map((national, i) => (
                                    <ListItem
                                      key={`${national.nationalName} - ${i}`}
                                      isChecked={false}
                                      height={'85px'}
                                      onClick={(e) => {
                                        handleNationalButtonCheck(
                                          national.quizList,
                                          national.nationalName,
                                          national.grade,
                                          national.level,
                                          national.host,
                                          national.nationalType,
                                        );
                                        setIsSelected(true);
                                      }}
                                    >
                                      <ItemLayout>
                                        {/* <CheckBoxI
                                        id={''}
                                        value={''}
                                        $margin={`0 5px 0 0`}
                                        //id={item.code}
                                        //value={item.code}
                                        //checked={checkList.includes(item.code)}
                                        readOnly
                                      /> */}
                                        {selectedPreviousNationalList.map(
                                          (list) => {
                                            if (
                                              list.name === '기출속성' &&
                                              list.view === true
                                            ) {
                                              return (
                                                <>
                                                  <span className="width_80px item_wrapper">
                                                    <span className="ellipsis">
                                                      {national.nationalType}
                                                    </span>
                                                  </span>
                                                  <i className="line"></i>
                                                </>
                                              );
                                            } else if (
                                              list.name === '학교급' &&
                                              list.view === true
                                            ) {
                                              return (
                                                <>
                                                  <span className="width_40px item_wrapper">
                                                    <span className="ellipsis">
                                                      {national.level}
                                                    </span>
                                                  </span>
                                                  <i className="line"></i>
                                                </>
                                              );
                                            } else if (
                                              list.name === '학년' &&
                                              list.view === true
                                            ) {
                                              return (
                                                <>
                                                  <span className="width_40px item_wrapper">
                                                    <span className="ellipsis">
                                                      {national.grade}
                                                    </span>
                                                  </span>
                                                  <i className="line"></i>
                                                </>
                                              );
                                            } else if (
                                              list.name === '기출명' &&
                                              list.view === true
                                            ) {
                                              return (
                                                <>
                                                  <span className="width_150px item_wrapper">
                                                    <span className="ellipsis">
                                                      {national.nationalName}
                                                    </span>
                                                  </span>
                                                  <i className="line"></i>
                                                </>
                                              );
                                            } else if (
                                              list.name === '주관사' &&
                                              list.view === true
                                            ) {
                                              return (
                                                <>
                                                  <span className="width_80px item_wrapper">
                                                    <span className="ellipsis">
                                                      {national.host}
                                                    </span>
                                                  </span>
                                                  <i className="line"></i>
                                                </>
                                              );
                                            } else if (
                                              list.name === '시험지타입' &&
                                              list.view === true
                                            ) {
                                              return (
                                                <>
                                                  <span className="width_40px item_wrapper">
                                                    <span className="ellipsis">
                                                      {national.reportType}
                                                    </span>
                                                  </span>
                                                  <i className="line"></i>
                                                </>
                                              );
                                            } else if (
                                              list.name === '기출년도' &&
                                              list.view === true
                                            ) {
                                              return (
                                                <>
                                                  <span className="width_40px item_wrapper">
                                                    <span className="ellipsis">
                                                      {national.year}
                                                    </span>
                                                  </span>
                                                  <i className="line"></i>
                                                </>
                                              );
                                            }
                                          },
                                        )}
                                        <span className="width_20px item_wrapper">
                                          <span className="ellipsis">
                                            {national.quizCount}
                                          </span>
                                        </span>
                                      </ItemLayout>
                                    </ListItem>
                                  ))}
                                  {/* <PaginationBox
                          itemsCountPerPage={
                            previousNationalData?.data.data
                              .pagination.pageUnit as number
                          }
                          totalItemsCount={
                            previousNationalData?.data.data
                              .pagination.totalCount as number
                          }
                        /> */}
                                </PreviousSchoolListWrapper>
                              ) : (
                                <>
                                  {previousNationalDataLoading ? (
                                    <>
                                      <Loader width="150px" />
                                    </>
                                  ) : (
                                    <ValueNone
                                      textOnly
                                      info="등록된 데이터가 없습니다"
                                    />
                                  )}
                                </>
                              )}
                            </>
                          </List>
                        </>
                      )}
                    </PreviousExamListWrapper>
                  </>
                )}
              </>
            )}
          </>
        )}
      </CategorySection>
      <SchoolSelectorSection
        $isSelectPreviousExamContent={isSelected} //수정필요
      >
        <SubTitleWrapper>
          <Label value="*문항수" fontSize="16px" width="60px" />
          <Label
            value="한 문제당 최대 유사문항수"
            fontSize="12px"
            width="440px"
          />
        </SubTitleWrapper>
        <SelectorGroup>{renderQuestionButtons()}</SelectorGroup>
        <SubTitleWrapper>
          <Label value="*난이도" fontSize="16px" width="200px" />
          <AdditionOption onClick={openDifficultySetting}>
            <IoSettingsOutline />
            난이도 설정
          </AdditionOption>
        </SubTitleWrapper>
        <SelectorGroup>{renderDifficultyButtons()}</SelectorGroup>
        <SubTitleWrapper>
          <Label value="*문항 타입" fontSize="16px" width="200px" />
        </SubTitleWrapper>
        <SelectorGroup>{renderTypeButtons()}</SelectorGroup>
        <Label value="*배점" fontSize="16px" width="200px" />
        <SelectorGroup>{renderScoreButtons()}</SelectorGroup>
        <PreviousExamSpace></PreviousExamSpace>
      </SchoolSelectorSection>
      {isDifficulty && (
        <Overlay>
          <DifficultyRate
            onClose={closeDifficultySetting}
            difficultyData={difficultyData}
            setDifficultyData={setDifficultyData}
          />
        </Overlay>
      )}
      {isEqualScoreModal && (
        <Overlay>
          <EqualScoreModalContainer>
            <EqualScoreModalWrapper>
              <EqualScoreModalTitleWrapper>
                <Label
                  value={`총 ${receivedQuizCount ? receivedQuizCount : Number(questionNum) * Number(includeQuizList.length) || Number(inputValue) * Number(includeQuizList.length)} 문항`}
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
                        : questionNum || inputValue || includeQuizList.length}
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
                        : questionNum || inputValue || includeQuizList.length}
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
const SelectorGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
`;
const DivideBar = styled.div`
  color: ${COLOR.BORDER_BLUE};
  font-size: 25px;
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
const SchoolSelectorSection = styled.div<{
  $isSelectTextbookContent?: boolean;
  $isSelectPreviousExamContent?: boolean;
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
  ${({ $isSelectPreviousExamContent, $tabVeiw }) =>
    !$isSelectPreviousExamContent &&
    $tabVeiw === '기출' &&
    'pointer-events: none; opacity: 0.5;'}
`;
const SubTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 14px;
`;
const NumberInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
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
const AdditionOption = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 10px;
  cursor: pointer;
`;
//시중교재
const SchoolGradeWrapper = styled.div`
  width: 100%;
  //border-top: 1px solid ${COLOR.BORDER_BLUE};
  padding: 10px;
`;

const SelectWrapper = styled.div`
  display: flex;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
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
//기출
const PreviousExamMenuWrapper = styled.div`
  width: 50%;
  display: flex;
  gap: 5px;
`;
const PreviousExamSearchWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 10px 0 0 10px;
  gap: 5px;
`;
const LayoutWrapper = styled.div`
  width: 100%;
  max-height: 693px;
  border-top: 1px solid ${COLOR.BORDER_GRAY};
  &.auto {
    flex: 1 0 0;
  }
`;
const ScrollWrapper = styled.div`
  overflow-y: auto;
  max-height: 665px;
  width: 100%;
  .line {
    border-bottom: 1px solid ${COLOR.BORDER_GRAY};
    padding: 5px 0;

    &.bottom_text {
      text-align: right;
      font-size: 13px;
      padding-bottom: 2px;
    }
  }

  &.items_height {
    margin-top: 5px;
    height: calc(100vh - 150px);
  }
`;
const BlankWrapper = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ItemWrapper = styled.div<{ height?: string }>`
  padding: 10px;
  border: 1px solid #aaa;
  border-radius: 10px;
  height: ${({ height }) => height || 'auto'};
  margin: 5px;
  overflow: auto;

  .class_wrap {
    font-size: 12px;
    color: #aaa;
    span {
      display: -webkit-box;
      -webkit-line-clamp: 2; /* Change the number to the number of lines you want to show */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
const TopButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid ${COLOR.BORDER_GRAY};

  .title {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .title_top {
    button {
      height: 15px;
      margin: 5px;
    }
  }

  .tag {
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
const PreviousExamYearWrapper = styled.div`
  width: 950px;
  display: flex;
  justify-content: center;
  padding: 10px 0 0 10px;
  gap: 10px;
`;
const ButtonSlider = styled.div`
  display: flex;
  flex-wrap: nowrap; /* 버튼들이 한 줄에 유지되도록 설정 */
  overflow-x: auto;
  scroll-behavior: smooth;
  width: 850px; /* 화살표 버튼을 제외한 너비 */
  gap: 10px;

  &::-webkit-scrollbar {
    display: none; /* 스크롤바 숨기기 */
  }

  button {
    flex: 0 0 100px; /* 버튼의 기본 크기를 설정하고 줄어들지 않도록 함 */
  }
`;
const ArrowButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  user-select: none;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
const PreviousExamListWrapper = styled.div`
  width: 100%;
  height: 530px;
  border-top: 1px solid ${COLOR.BORDER_BLUE};
  margin-top: 10px;
  padding: 10px;
`;
const ItemLayout = styled.span`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  .tooltip_wrapper item_wrapper {
    position: relative;
  }
  .item_wrapper {
    display: flex;
    /* flex: 1 0 0; */
    justify-content: space-around;
    flex-wrap: wrap;
    word-break: break-all;
    min-width: 30px;
    max-width: 150px;
    font-weight: normal;
  }

  /* 두줄 이상 ellipsis 처리  */
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .title {
    width: 100%;
    font-weight: 600;
    margin-bottom: 2px;
  }
  .tag {
    margin: 0 5px;
    padding: 3px 5px;
    border-radius: 5px;
    background-color: ${COLOR.BORDER_GRAY};
    margin-top: 5px;
  }
  .tag_icon {
    display: flex;
    align-self: center;
  }
  .line {
    width: 1px;
    height: 15px;
    background-color: ${COLOR.BORDER_GRAY};
  }
  .width_5 {
    width: 5%;
  }
  .width_10 {
    width: 10%;
  }
  .width_20px {
    width: 20px;
  }
  .width_40px {
    width: 40px;
  }
  .width_80px {
    width: 80px;
  }
  .width_50 {
    width: 50%;
  }
  .width_150px {
    width: 150px;
  }
`;
const PreviousSchoolListWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 10px;
  overflow-y: auto;
`;
const PreviousExamDefoultBox = styled.div`
  height: 150px;
  background-color: ${COLOR.TABLE_GRAY};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border-radius: 10px;
`;
const PreviousExamSpace = styled.div`
  padding-bottom: 260px;
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
const PreviousTabWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
