import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { Button, Loader, Modal, openToastifyAlert, Select } from '../..';
import { classificationInstance, quizService } from '../../../api/axios';
import { quizListAtom } from '../../../store/quizListAtom';
import {
  AddQuestionListType,
  EditorDataType,
  ItemCategoryType,
  QuestionClassListType,
  QuizCategory,
  QuizCategoryList,
  QuizItemListType,
  QuizListType,
  QuizType,
} from '../../../types';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { COLOR } from '../../constants/COLOR';

import { EditerOneFile } from './editer';
import { QuizList } from './list';
import { OptionList } from './options/OptionList';

export function ContentCopyEdit({
  setTabView,
  type,
}: {
  setTabView: React.Dispatch<React.SetStateAction<string>>;
  type: string;
}) {
  const [quizList, setQuizList] = useRecoilState(quizListAtom);
  const [parsedStoredQuizList, setParsedStoredQuizList] = useState<
    QuizListType[]
  >([]);
  const [data, setData] = useState<QuizType[] | null>(null);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [categoryTitles, setCategoryTitles] = useState<ItemCategoryType[]>([]);
  const [categoriesE, setCategoriesE] = useState<ItemCategoryType[][]>([]);
  const [content, setContent] = useState<string[]>([]);
  const [dataFetched, setDataFetched] = useState(false);

  const [editorData, setEditorData] = useState<EditorDataType | null>(null);
  const [quizItemList, setQuizItemList] = useState<QuizItemListType>([]);
  const [quizItemArrList, setQuizItemArrList] = useState<QuizItemListType[]>(
    [],
  );
  const [addQuestionList, setAddQuestionList] = useState<AddQuestionListType>(
    [],
  );
  const [quizClassList, setQuizClassList] = useState<QuestionClassListType>([]);

  // 선택된 리스트 아이템 데이터
  const [onItemClickData, setOnItemClickData] = useState<QuizListType>();

  // 수정시 체크리스트 값 가져오기
  useEffect(() => {
    const storedQuizList = window.localStorage.getItem('quizList');

    // console.log(
    //   '전역에서 로컬 스토리지에서 가져온 체크된 리스트값---',
    //   storedQuizList,
    // );

    if (storedQuizList) {
      setParsedStoredQuizList(JSON.parse(storedQuizList));

      // 로컬스토리지 값 다받은 뒤 초기화
      window.opener.localStorage.clear();
      return;
    }
  }, []);

  //셀렉트 값
  const [selectedSubject, setSelectedSubject] = useState<string>(''); //교과
  const [selectedCourse, setSelectedCourse] = useState<string>(''); //과목
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>(''); //문항타입
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(''); //난이도
  const [selectedSource, setSelectedSource] = useState<any[]>([]); //출처
  const [selectedList, setSelectedList] = useState<
    {
      [key: number]: string;
    }[]
  >([]);

  // 리스트 선택시 기존값 셋팅
  useEffect(() => {
    if (onItemClickData) {
      const quizCategory = onItemClickData?.quizCategoryList[0]?.quizCategory;

      // 값이 존재하면 상태값을 업데이트
      if (quizCategory) {
        setSelectedSubject(quizCategory?.교과 || '');
        setSelectedCourse(quizCategory?.과목 || '');
        setSelectedQuestionType(quizCategory?.문항타입 || '');
        setSelectedDifficulty(quizCategory?.난이도 || '');
        setSelectedSource(quizCategory?.sources || []);
      }
    }
  }, [onItemClickData]);

  // 전역에서 가져온 체크된 리스트값을 수정용 문항리스트로 다시 셋팅
  const getQuiz = async () => {
    const idxArray = parsedStoredQuizList.map((list) => list.idx);
    const idxList = idxArray.join(',');
    const res = await quizService.get(`/v1/quiz/${idxList}`);
    return res.data.data.quizList;
  };
  const { data: quizData, refetch: quizDataRefetch } = useQuery({
    queryKey: ['get-idx-quizList'],
    queryFn: getQuiz,
    meta: {
      errorMessage: 'get-idx-quizList 에러 메세지',
    },
    enabled: parsedStoredQuizList.length > 0,
  });

  useEffect(() => {
    if (parsedStoredQuizList.length > 0) quizDataRefetch();
  }, [parsedStoredQuizList]);

  useEffect(() => {
    if (quizData) {
      setQuizList(quizData);
      setDataFetched(true);
    }
  }, [quizData, setQuizList]);

  // 에디터에서 데이터 가져올시
  useEffect(() => {
    if (editorData) {
      console.log(editorData);
      const itemDataList: QuizItemListType = [];
      let sort = 1;

      Object.keys(editorData).forEach((key) => {
        const value = editorData[key];
        console.log('value----', value);
        if (Array.isArray(value) && value.length > 0) {
          let type = key.replace('tag_', '').replace('tl_', '').toUpperCase();

          switch (type) {
            case 'EXAM':
              type = 'QUESTION';
              break;
            case 'BIGCONTENT':
              type = 'BIG';
              break;
            case 'CONTENT':
              type = 'TEXT';
              break;
            case 'EXAM_SM':
              type = 'SMALL';
              break;
            default:
              break;
          }

          value.forEach((content) => {
            itemDataList.push({
              code: null,
              type: type,
              content: content,
              sort: sort++,
            });
          });
        }
      });

      setQuizItemList(itemDataList);
    }
  }, [editorData]);

  useEffect(() => {
    console.log('quizItemList', quizItemList);
    //문항 리스트에 추가
    if (quizItemList.length > 0) {
      setQuizItemArrList((prevArrList) => [...prevArrList, quizItemList]);
    }
  }, [quizItemList]);

  useEffect(() => {
    // console.log('quizItemArrList', quizItemArrList);
    // 등록될 값
    const newQuestionList = quizItemArrList.map((quizItems) => ({
      commandCode: 0,
      quizIdx: null,
      articleList: [
        //에디터 이미지 값
      ],
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
    //카테고리 값
    console.log('onItemClickData카테고리', onItemClickData?.quizCategoryList);

    // 특정 필드를 제외하는 유틸리티 함수
    const omitFields = (quizCategory: QuizCategory): QuizCategory => {
      const { sources, 과목, 교과, 난이도, 문항타입, ...rest } = quizCategory;
      return rest; // 나머지 필드만 반환
    };

    // 카테고리 값을 매핑하는 함수
    const mapQuizCategoryList = (
      quizCategoryList: QuizCategoryList[] | undefined,
    ): { type: string; quizCategory: QuizCategory }[] => {
      if (quizCategoryList && Array.isArray(quizCategoryList)) {
        const items = quizCategoryList.map((item) => {
          if (item.quizCategory && typeof item.quizCategory === 'object') {
            // 특정 필드 제외 후 새로운 객체 구성
            const newQuizCategory = omitFields(item.quizCategory);
            return {
              type: 'CATEGORY',
              quizCategory: newQuizCategory,
            };
          }
          // item.quizCategory가 비어있을 경우 기본값 설정
          return {
            type: 'CATEGORY',
            quizCategory: {},
          };
        });
        return items;
      }
      return [
        {
          type: 'CATEGORY',
          quizCategory: {},
        },
      ];
    };

    // 카테고리 매핑
    const category = mapQuizCategoryList(onItemClickData?.quizCategoryList);
    console.log('매핑된 카테고리값 ----', category);

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
      ...category,
    ];

    // 필수 메타값 추가 및 변경
    setQuizClassList(quizClassList);
  }, [
    selectedSubject,
    selectedCourse,
    selectedQuestionType,
    selectedSource,
    selectedDifficulty,
    onItemClickData,
  ]);

  useEffect(() => {
    if (addQuestionList.length) postQuizDataMutate();
  }, [addQuestionList]);

  // 문항 등록 후 메타데이터 수정 되게
  const postQuiz = async () => {
    const data = addQuestionList[addQuestionList.length - 1];

    return await quizService.post(`/v1/quiz`, data);
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
        classificationInstance.get(`/v1/category/class/${id}`),
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
      case '교과':
        setSelectedSubject('');
        break;
      case '과목':
        setSelectedCourse('');
        break;

      default:
        break;
    }
  };

  const submitSave = () => {
    // console.log('등록하려는 신규 문항에 대한 데이터 post 요청');
    // console.log('신규 등록된 문항 리스트 get 요청 API');

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

  // useEffect(() => {
  //   if (postQuizData) {
  //     setQuestionList([...questionList, postQuizData.data.data.quiz]);
  //   }
  // }, [postQuizData]);
  // useEffect(() => {
  //   setQuizList([...questionList]);
  // }, [questionList]);

  useEffect(() => {
    console.log('quizList', quizList);
  }, [quizList]);

  useEffect(() => {
    if (data) {
      const combinedContent = data.map((item) => item.content).join(' ');

      console.log('onItemClickData 선택된 아이템------------', combinedContent);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.usePostJsonData(combinedContent);
    }
  }, [data]);

  useEffect(() => {
    if (onItemClickData && onItemClickData.quizItemList) {
      setData(onItemClickData.quizItemList);
      // 선택 데이터 바뀔시 초기화
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.tinymce.activeEditor.setContent('');
    }
  }, [onItemClickData]);

  // 문항 추가버튼 disable 처리
  const addButtonBool = useMemo(() => {
    if (
      selectedSubject !== '' &&
      selectedCourse !== '' &&
      selectedQuestionType !== '' &&
      selectedSource.length > 0
    ) {
      return false;
    } else {
      return true;
    }
  }, [selectedSubject, selectedCourse, selectedQuestionType, selectedSource]);

  const quizCategory = useMemo(() => {
    if (onItemClickData) {
      const category = onItemClickData.quizCategoryList?.[0]?.quizCategory;
      return {
        교과: category?.교과 || '',
        과목: category?.과목 || '',
        문항타입: category?.문항타입 || '',
        난이도: category?.난이도 || '',
        sources: category?.sources || [],
      };
    }
    return {
      교과: '',
      과목: '',
      문항타입: '',
      난이도: '',
      sources: [],
    };
  }, [onItemClickData]);

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
                onItemClickData={onItemClickData}
              />
            </EditWrapper>

            <BackgroundWrapper>
              {quizCategory && (
                <>
                  <SelectListWrapper>
                    <strong>
                      과목<span>*</span>
                    </strong>
                    <SelectList>
                      <li>
                        <SelectWrapper>
                          {/* 교과 */}
                          {categoriesE && (
                            <Select
                              onDefaultSelect={() =>
                                handleDefaultSelect('교과')
                              }
                              // $positionTop
                              heightScroll={'150px'}
                              width={'110px'}
                              height={'30px'}
                              defaultValue={quizCategory?.교과 || '교과'}
                              key={'교과'}
                              options={categoriesE[0]}
                              onSelect={(event) => selectCategoryOption(event)}
                              setSelectedValue={setSelectedSubject}
                            />
                          )}
                          {/* 과목 */}
                          {categoriesE && (
                            <Select
                              onDefaultSelect={() =>
                                handleDefaultSelect('과목')
                              }
                              // $positionTop
                              heightScroll={'150px'}
                              width={'110px'}
                              height={'30px'}
                              defaultValue={quizCategory?.과목 || '과목'}
                              key={'과목'}
                              options={categoriesE[1]}
                              onSelect={(event) => selectCategoryOption(event)}
                              setSelectedValue={setSelectedCourse}
                            />
                          )}
                        </SelectWrapper>
                      </li>
                    </SelectList>
                  </SelectListWrapper>
                  <SelectListWrapper>
                    <strong>
                      출처<span>*</span>
                    </strong>
                    <SourceOptionWrapper>
                      {/* 옵션 리스트 셀렉트 컴포넌트 */}
                      {groupsDataF &&
                        groupsDataG &&
                        groupsDataH &&
                        categoryTitles && (
                          <OptionList
                            setSelectedSource={setSelectedSource}
                            categoryTitles={categoryTitles}
                            categoriesE={categoriesE[2]}
                            groupsDataF={groupsDataF}
                            groupsDataG={groupsDataG}
                            groupsDataH={groupsDataH}
                            quizCategory={
                              quizCategory?.sources && quizCategory?.sources
                            }
                            onItemClickData={onItemClickData}
                          />
                        )}
                    </SourceOptionWrapper>
                  </SelectListWrapper>
                  <SelectListWrapper>
                    <strong>
                      문항타입<span>*</span>
                    </strong>
                    <SelectList>
                      <li>
                        <SelectWrapper>
                          {categoriesE && (
                            <Select
                              onDefaultSelect={() =>
                                handleDefaultSelect('문항타입')
                              }
                              $positionTop
                              width={'110px'}
                              height={'30px'}
                              defaultValue={
                                quizCategory?.문항타입 || '문항타입'
                              }
                              key={'문항타입'}
                              options={categoriesE[3]}
                              onSelect={(event) => selectCategoryOption(event)}
                              setSelectedValue={setSelectedQuestionType}
                            />
                          )}
                        </SelectWrapper>
                      </li>
                    </SelectList>
                  </SelectListWrapper>
                  <SelectListWrapper>
                    <strong>난이도</strong>
                    <SelectList>
                      <li>
                        <SelectWrapper>
                          {categoriesE && (
                            <Select
                              onDefaultSelect={() =>
                                handleDefaultSelect('난이도')
                              }
                              $positionTop
                              width={'110px'}
                              height={'30px'}
                              defaultValue={quizCategory?.난이도 || '난이도'}
                              key={'난이도'}
                              options={categoriesE[4]}
                              onSelect={(event) => selectCategoryOption(event)}
                              setSelectedValue={setSelectedDifficulty}
                            />
                          )}
                        </SelectWrapper>
                      </li>
                    </SelectList>
                  </SelectListWrapper>
                </>
              )}
            </BackgroundWrapper>
          </PerfectScrollbar>
        </EditContainerWrapper>

        <ContentListWrapper>
          <ContentList>
            {dataFetched && (
              <QuizList
                questionList={quizList}
                $height={`calc(100vh - 100px)`}
                showViewAllButton
                onItemClick={setOnItemClickData}
                setCheckedList={setCheckedList}
              />
            )}
            {!dataFetched && <Loader />}
          </ContentList>
        </ContentListWrapper>

        <Modal />
      </ContentsWrapper>
      <BorderWrapper>
        <SubmitButtonWrapper>
          <Button
            buttonType="button"
            disabled={addButtonBool}
            onClick={() => submitSave()}
            width={'calc(50% - 5px)'}
            $margin={'0 10px 0 0'}
            $filled
            cursor
          >
            <span>복제 등록</span>
          </Button>
          <Button
            buttonType="button"
            onClick={() => setTabView('문항 분류')}
            width={'calc(50% - 5px)'}
            cursor
          >
            <span>추가 정보 등록</span>
          </Button>
        </SubmitButtonWrapper>
      </BorderWrapper>
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
const BackgroundWrapper = styled.div`
  background-color: ${COLOR.BUTTON_LIGHT_NORMAL};
  margin-bottom: 70px;
`;
const SelectListWrapper = styled.div`
  display: flex;
  /* align-items: center; */
  padding: 0 15px;

  strong {
    min-width: 40px;
    padding-top: 10px;
    /* line-height: 1.2; */
    font-size: 15px;
    padding-right: 10px;
    position: relative;
    span {
      position: absolute;
      top: 10px;
      right: 0px;
      color: ${COLOR.RED};
      font-size: 14px;
    }
  }

  &:last-child {
    padding-bottom: 20px;
  }
  &:nth-child(1) {
    padding-top: 20px;
  }
`;

const SourceOptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const SelectList = styled.ul`
  padding: 5px 10px;

  li {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
`;
const SelectWrapper = styled.div`
  display: flex;
  flex: 1 0 0;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;
  color: ${COLOR.GRAY};
`;

const ContentListWrapper = styled.div`
  width: 340px;
  padding-left: 10px;
  border-bottom: 1px solid ${COLOR.BORDER_BLUE};

  position: absolute;
  right: 0;
`;
const ContentList = styled.div`
  height: calc(100vh - 100px);
  width: 100%;
  overflow: hidden;
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
  border-bottom: none;
  background-color: ${COLOR.LIGHT_GRAY};
`;

const BorderWrapper = styled.div`
  border-top: 1px solid ${COLOR.BORDER_BLUE};
  position: fixed;
  bottom: 0px;
  right: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: #fff;
`;
const SubmitButtonWrapper = styled.div`
  position: absolute;
  right: 30px;
  left: auto;
  top: 10px;
  bottom: 0px;
  display: flex;
  flex-direction: row;
  width: 50%;
`;
