import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { Button, Modal, openToastifyAlert, Select } from '../..';
import { classificationInstance, quizService } from '../../../api/axios';
import { quizListAtom } from '../../../store/quizListAtom';
import {
  AddQuestionListType,
  EditorDataType,
  ItemCategoryType,
  QuestionClassListType,
  QuizItemListType,
  QuizListType,
} from '../../../types';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { COLOR } from '../../constants/COLOR';

import { EditerOneFile } from './editer';
import { QuizList } from './list';
import { OptionList } from './options/OptionList';

export function ContentHTMLUpload({
  setTabView,
  type,
}: {
  setTabView: React.Dispatch<React.SetStateAction<string>>;
  type: string;
}) {
  const [quizList, setQuizList] = useRecoilState(quizListAtom);
  const [questionList, setQuestionList] = useState<QuizListType[]>([]);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [categoryTitles, setCategoryTitles] = useState<ItemCategoryType[]>([]);
  const [categoriesE, setCategoriesE] = useState<ItemCategoryType[][]>([]);
  const [content, setContent] = useState<string[]>([]);
  const [isPostMessage, setIsPostMessage] = useState<boolean>(false);

  const [editorData, setEditorData] = useState<EditorDataType | null>(null);
  const [quizItemList, setQuizItemList] = useState([]); // 대량등록
  const [quizItemArrList, setQuizItemArrList] = useState<QuizItemListType[]>(
    [],
  );
  const [addQuestionList, setAddQuestionList] = useState<AddQuestionListType>(
    [],
  );
  const [quizClassList, setQuizClassList] = useState<QuestionClassListType>([]);
  //셀렉트 값
  const [selectedSubject, setSelectedSubject] = useState<string>(''); //교과
  const [selectedCourse, setSelectedCourse] = useState<string>(''); //과목
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>(''); //문항타입
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(''); //난이도
  const [selectedSource, setSelectedSource] = useState<any[]>([]); //출처

  // 에디터에서 데이터 가져올시
  useEffect(() => {
    if (editorData) {
      console.log('editorData-----', editorData.tag_group);
      const itemDataList = [...editorData.tag_group];

      // setQuizItemList(itemDataList);
    }
  }, [editorData]);

  useEffect(() => {
    console.log('quizItemList', quizItemList);

    // 문항 리스트에 추가
    // if (quizItemList.length > 0) {
    //   setQuizItemArrList((prevArrList) => [...prevArrList, quizItemList]);
    // }
  }, [quizItemList]);

  useEffect(() => {
    console.log('quizItemArrList', quizItemArrList);
    // 등록될 값
    const newQuestionList = quizItemArrList.map((quizItems) => ({
      commandCode: 0,
      quizIdx: null,
      articleList: [],
      quizItemList: quizItems,
      quizClassList: quizClassList,
    }));
    setAddQuestionList(newQuestionList);
  }, [quizItemArrList]);

  useEffect(() => {
    console.log('selectedSubject 교과', selectedSubject);
    console.log('selectedCourse 과목', selectedCourse);
    console.log('selectedQuestionType 문항타입', selectedQuestionType);
    console.log('selectedDifficulty 난이도', selectedDifficulty);
    //출처
    console.log('selectedSource 출처', selectedSource);

    const quizClassList: QuestionClassListType = [
      {
        type: 'CLASS',
        quizCategory: {
          sources: selectedSource,
          과목: selectedCourse,
          교과: selectedSubject,
          난이도: selectedDifficulty,
          문항타입: selectedQuestionType,
        },
      },
    ];

    // 필수 메타값 추가 및 변경
    setQuizClassList(quizClassList);
  }, [
    selectedSubject,
    selectedCourse,
    selectedQuestionType,
    selectedSource,
    selectedDifficulty,
  ]);

  useEffect(() => {
    if (addQuestionList.length) postQuizDataMutate();
  }, [addQuestionList]);

  // 문항 등록 후 메타데이터 수정 되게
  const postQuiz = async () => {
    const data = addQuestionList[addQuestionList.length - 1];

    return await quizService.post(`/v1/quiz/upload`, data);
  };

  const { data: postQuizData, mutate: postQuizDataMutate } = useMutation({
    mutationFn: postQuiz,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
    },
    onSuccess: (response) => {
      openToastifyAlert({
        type: 'success',
        text: `문항이 추가 되었습니다 ${response.data.data.quiz.idx}`,
      });
      // 추가된 문항의 idx값을 배열에 넣기 전체리스트에서 idx값으로 찾아온뒤 필수 메타값넣고 등록
    },
  });

  // 카테고리 api 불러오기
  const getCategory = async () => {
    const res = await classificationInstance.get(`/v1/category`);
    return res;
  };
  const { data: categoryData, isLoading: isCategoryLoading } = useQuery({
    queryKey: ['get-category'],
    queryFn: getCategory,
    meta: {
      errorMessage: 'get-category 에러 메세지',
    },
  });
  useEffect(() => {
    if (categoryData) {
      setCategoryTitles(categoryData.data.data.categoryItemList);
    }
  }, [categoryData]);

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
  // 카테고리의 그룹 유형 조회 (교재)
  const getCategoryGroupsF = async () => {
    const response = await classificationInstance.get('/v1/category/group/F');
    return response.data.data.typeList;
  };
  const { data: groupsDataF, refetch: groupsDataFRefetch } = useQuery({
    queryKey: ['get-category-groups-F'],
    queryFn: getCategoryGroupsF,
    enabled: !!categoryData,
    meta: {
      errorMessage: 'get-category-groups-F 에러 메세지',
    },
  });

  // 카테고리의 그룹 유형 조회 (내신)
  const getCategoryGroupsG = async () => {
    const response = await classificationInstance.get('/v1/category/group/G');
    return response.data.data.typeList;
  };
  const { data: groupsDataG, refetch: groupsDataGRefetch } = useQuery({
    queryKey: ['get-category-groups-G'],
    queryFn: getCategoryGroupsG,
    enabled: !!categoryData,
    meta: {
      errorMessage: 'get-category-groups-G 에러 메세지',
    },
  });

  // 카테고리의 그룹 유형 조회 (기출)
  const getCategoryGroupsH = async () => {
    const response = await classificationInstance.get('/v1/category/group/H');
    return response.data.data.typeList;
  };
  const { data: groupsDataH, refetch: groupsDataHRefetch } = useQuery({
    queryKey: ['get-category-groups-H'],
    queryFn: getCategoryGroupsH,
    enabled: !!categoryData,
    meta: {
      errorMessage: 'get-category-groups-H 에러 메세지',
    },
  });
  useEffect(() => {}, [groupsDataH, groupsDataG, groupsDataF]);

  // 카테고리의 그룹 아이템 조회
  const fetchCategoryItems = async (
    typeList: string,
    setCategory: React.Dispatch<React.SetStateAction<ItemCategoryType[][]>>,
  ) => {
    const typeIds = typeList.split(',');
    try {
      const requests = typeIds.map((id) =>
        classificationInstance.get(`/v1/category/${id}`),
      );
      const responses = await Promise.all(requests);
      const itemsList = responses.map(
        (res) => res?.data?.data?.categoryClassList,
      );
      setCategory(itemsList);
    } catch (error: any) {
      if (error.response.data?.code == 'GE-002') postRefreshToken();
    }
  };
  useEffect(() => {
    // console.log(
    //   'API Response Check: 등록시 필수 E',
    //   categoriesE,
    //   'API Response Check: 교재 F',
    //   groupsDataF,
    //   'API Response Check: 내신 G',
    //   groupsDataG,
    //   'API Response Check: 기출 H',
    //   groupsDataH,
    // );
  }, [categoriesE]);

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);
  };

  // 셀렉트 초기화
  const handleDefaultSelect = (defaultValue?: string) => {
    if (defaultValue == 'all') {
      setSelectedSubject('');
      setSelectedCourse('');
    }
    switch (defaultValue) {
      case categoryTitles[6]?.code:
        setSelectedSubject('');
        break;
      case categoryTitles[7]?.code:
        setSelectedCourse('');
        break;

      default:
        break;
    }
  };
  const submitSave = () => {
    // console.log('등록하려는 신규 문항에 대한 데이터 post 요청');
    // console.log('신규 등록된 문항 리스트 get 요청 API');

    setIsPostMessage(true);

    // 등록 api
    console.log('selectedSubject 교과', selectedSubject);
    console.log('selectedCourse 과목', selectedCourse);
    console.log('selectedQuestionType 문항타입', selectedQuestionType);
    console.log('selectedDifficulty 난이도', selectedDifficulty);
    //출처
    console.log('selectedSource 난이도', selectedSource);
    saveHandler();
  };
  const saveHandler = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const data = await window.saveExamData();
    console.log(data);
    setEditorData(JSON.parse(data));
  };

  useEffect(() => {
    if (postQuizData) {
      setQuestionList([...questionList, postQuizData.data.data.quiz]);
    }
  }, [postQuizData]);
  useEffect(() => {
    setQuizList([...questionList]);
  }, [questionList]);
  useEffect(() => {
    console.log('quizList', quizList);
  }, [quizList]);

  return (
    <Container>
      <ContentsWrapper>
        <EditContainerWrapper>
          <PerfectScrollbar>
            <EditWrapper>
              <EditerOneFile
                type={type}
                setEditorData={setEditorData}
                saveHandler={saveHandler}
              />
            </EditWrapper>
          </PerfectScrollbar>
        </EditContainerWrapper>

        <Modal />
      </ContentsWrapper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const ContentsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  height: calc(100vh - 200px);
  position: relative;
`;

const EditContainerWrapper = styled.div`
  flex: 1 0 0;
  margin-bottom: 300px;
`;

const EditWrapper = styled.div`
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
  width: 100%;
`;
