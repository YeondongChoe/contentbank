import * as React from 'react';
import { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';

import {
  TabMenu,
  Button,
  Label,
  ValueNone,
  Loader,
  Icon,
  SearchableSelect,
  List,
  ListItem,
  CheckBoxI,
  MathViewer,
  Select,
} from '../..';
import { quizService, resourceServiceInstance } from '../../../api/axios';
import { MyStaticWrapper } from '../../../components/molecules/sortBox/Masonry';
import { pageAtom } from '../../../store/utilAtom';
import {
  QuizListType,
  PreviousSchoolType,
  PreviousNationalType,
} from '../../../types';
import { selectedListType } from '../../../types/WorkbookType';
import { windowOpenHandler } from '../../../utils/windowHandler';
import { COLOR } from '../../constants';

type SelectListType = {
  idx: number;
  name: string;
  value: string;
  options: { idx: number; name: string; value: string }[];
};

type PreviousTabProps = {
  menuList: {
    label: string;
    value: string;
  }[];
  tabVeiw: string;
  setTabVeiw: React.Dispatch<React.SetStateAction<string>>;
  isSelectPreviousExamContent: boolean;
  setIsSelectPreviousExamContent: React.Dispatch<React.SetStateAction<boolean>>;
  //문항수
  setQuestionNum: React.Dispatch<React.SetStateAction<string | null>>;
  //문항수 인풋
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  //문항난이도
  setQuestionLevel: React.Dispatch<React.SetStateAction<string | null>>;
  //문항타입
  setQuestionType: React.Dispatch<React.SetStateAction<string[] | null>>;
  //모의고사 포함여부
  setContainMock: React.Dispatch<React.SetStateAction<number | null>>;
  //배점
  setEqualScore: React.Dispatch<React.SetStateAction<number | null>>;
  //추가옵션
  setIsQuizEven: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPriority: React.Dispatch<React.SetStateAction<boolean>>;
  //선택된 문항리스트
  setIncludeQuizList: React.Dispatch<React.SetStateAction<string[]>>;
};

export function PreviousTab({
  menuList,
  tabVeiw,
  setTabVeiw,
  isSelectPreviousExamContent,
  setIsSelectPreviousExamContent,
  setQuestionNum,
  setInputValue,
  setQuestionLevel,
  setQuestionType,
  setContainMock,
  setEqualScore,
  setIsQuizEven,
  setIsPriority,
  setIncludeQuizList,
}: PreviousTabProps) {
  const [questionList, setQuestionList] = useState<QuizListType[]>([]);
  //학교내신 전국시험 select 버튼 값
  const [previousExamMenu, setPreviousExamMenu] = useState<number>(0);
  //학교내신 출제년도
  const [previousExamYear, setPreviousExamYear] = useState<string | null>(null);
  //학교내신 학교리스트
  const [previousSchoolList, setPreviousSchoolList] = useState<
    PreviousSchoolType[]
  >([]);
  //전국시험 문항리스트
  const [previousNationalList, setPreviousNationalList] = useState<
    PreviousNationalType[]
  >([]);
  //학교내신 가공 데이타
  const [processPreviousQuizListData, setProcessPreviousQuizListData] =
    useState<QuizListType[]>([]);
  //학교내신 문항리스트
  const [previousSchoolQuizList, setPreviousSchoolQuizList] = useState<
    number[]
  >([]);
  //사용자가 선택한 학교내신 화면노출 값 리스트
  const [selectedPreviousSchoolList, setSelectedPreviousSchoolList] = useState<
    selectedListType[]
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
  //사용자가 선택한 전국시험 화면노출 값 리스트
  const [selectedPreviousNationalList, setSelectedPreviousNationalList] =
    useState<selectedListType[]>([]);
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
  //전국시험 학교급 selectList
  const [nationalLevelSelectList, setNationalLevelSelectList] =
    useState<SelectListType>();
  const [nationalLevelSelect, setNationalLevelSelect] = useState<string>('');
  //전국시험 학년 selectList
  const [nationalGradeSelectList, setNationalGradeSelectList] =
    useState<SelectListType>();
  const [nationalGradeSelect, setNationalGradeSelect] = useState<string>('');
  //전국시험 주관사 selectList
  const [nationalHostSelectList, setNationalHostSelectList] =
    useState<SelectListType>();
  const [nationalHostSelect, setNationalHostSelect] = useState<string>('');
  //전국시험 시험지타입 selectList
  const [nationalTypeSelectList, setNationalTypeSelectList] =
    useState<SelectListType>();
  const [nationalTypeSelect, setNationalTypeSelect] = useState<string>('');

  //문항 뷰어 선택값
  const [topSelect, setTopSelect] = useState<string>('문제만 보기');
  //문항 뷰어 선택고정값
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
  //문항 뷰어 과목 선택리스트
  const [previousSchoolSubjectList, setPreviousSchoolSubjectList] = useState<
    {
      name: string;
      code: string;
      value: string;
    }[]
  >([]);
  //문항 뷰어 과목 선택
  const [previousSchoolSubject, setPreviousSchoolSubject] =
    useState<string>('교과');
  //문항 뷰어 단원 선택리스트
  const [previousSchoolUnitList, setPreviousSchoolUnitList] = useState<
    {
      name: string;
      code: string;
      value: string;
    }[]
  >([]);
  //문항 뷰어 단원
  const [previousSchoolUnit, setPreviousSchoolUnit] = useState<string>('과목');
  //문항 뷰어 리스트 솔팅 정렬
  const [columnsCount, setColumnsCount] = useState<number>(3);
  const [itemHeight, setItemHeight] = useState<string | undefined>('250px');
  useEffect(() => {}, [columnsCount, itemHeight]);

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

  //학교내신 학교 리스트 불러오기 api
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

  //전국시험 리스트 불러오기 api
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

  //기출 학교내신/전국시험 문제 받아오기
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

  // 뷰어보기 버튼 누를시
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

  //다른 시험 선택
  const handleChangeExam = () => {
    setIsSelectPreviousExamContent(false);
    setPreviousSchoolSubject('교과');
    setPreviousSchoolUnit('과목');
    setQuestionNum('');
    setInputValue('');
    setQuestionLevel(null);
    setQuestionType([]);
    setContainMock(null);
    setEqualScore(null);
    setIsQuizEven(false);
    setIsPriority(false);
  };

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
            onClick={handleChangeExam}
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
              setSelectedValue={setPreviousSchoolSubject}
              padding="0 5px 0 0"
            />
            <Select
              width={'120px'}
              defaultValue={'과목'}
              key={'과목'}
              options={previousSchoolUnitList}
              setSelectedValue={setPreviousSchoolUnit}
            />
          </SelectWrapper>
          <ButtonWrapper>
            <Select
              width={'250px'}
              defaultValue={'문제만 보기'}
              key={'문제만 보기'}
              options={sortArr}
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
                            {item.quizCategory?.대단원?.[0]}/
                            {item.quizCategory?.중단원?.[0]}/
                            {item.quizCategory?.소단원?.[0]}/
                            {item.quizCategory?.유형?.[0]}
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

  //초기화
  useEffect(() => {
    setPreviousExamYear(null);
    setPreviousSchoolNameSelect('');
    setPreviousExamYear(null);
    setPreviousSchoolList([]);
    setPreviousSchoolQuizList([]);
    setPreviousSchoolName('');
    setPreviousSchoolGrade('');
    setPreviousSchoolSemester('');
    setPreviousSchoolAcademic('');
    setIsSelectPreviousExamContent(false);
    setPreviousSchoolSubject('교과');
    setPreviousSchoolUnit('과목');
    setAttributeNameSelect('');
  }, [previousExamMenu]);

  return (
    <Container>
      <CategorySection>
        <TabWrapper>
          <TabMenu
            length={4}
            menu={menuList}
            width={'450px'}
            lineStyle
            selected={tabVeiw}
            setTabVeiw={setTabVeiw}
          />
        </TabWrapper>
        {isSelectPreviousExamContent ? (
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
                                    setIsSelectPreviousExamContent(true);
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
            {isSelectPreviousExamContent ? (
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
                                        setIsSelectPreviousExamContent(true);
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
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
`;
const TabWrapper = styled.div`
  width: 100%;
  padding: 10px 0px;
`;
const CategorySection = styled.div`
  min-width: 956px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${COLOR.BORDER_POPUP};
  border-radius: 25px;
`;
const SchoolGradeWrapper = styled.div`
  width: 100%;
  border-top: 1px solid ${COLOR.BORDER_BLUE};
  padding: 10px;
`;
const SelectWrapper = styled.div`
  display: flex;
`;
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
  //height: 100%;
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
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
