import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

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

type SelectedValueType = string | { [key: string]: any };

type SelectedValuesType = { [key: number]: SelectedValueType };

export function ContentCreating({
  setTabView,
  tabView,
  type,
}: {
  setTabView: React.Dispatch<React.SetStateAction<string>>;
  tabView: string;
  type: string;
}) {
  const [quizList, setQuizList] = useRecoilState(quizListAtom);
  const [questionList, setQuestionList] = useState<QuizListType[]>([]);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [categoryTitles, setCategoryTitles] = useState<ItemCategoryType[]>([]);
  const [categoriesE, setCategoriesE] = useState<ItemCategoryType[][]>([]);
  const [content, setContent] = useState<string[]>([]);
  const [imagesSrc, setImagesSrc] = useState<string>('');

  const [editorData, setEditorData] = useState<EditorDataType | null>(null);
  const [quizItemList, setQuizItemList] = useState<QuizItemListType>([]);
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
  const [selectedSource, setSelectedSource] = useState<SelectedValuesType[]>(
    [],
  ); //출처

  // 에디터에서 데이터 가져올시
  useEffect(() => {
    console.log('editorData', editorData?.tag_group);

    if (editorData) {
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

      const imagesSrc = extractImgSrc(`${editorData?.tag_group}`);
      setImagesSrc(imagesSrc);
    }
  }, [editorData]);

  // 이미지 태그 src 축출
  const extractImgSrc = (htmlString: string) => {
    // <img> 태그와 src 속성 값을 캡처하는 정규 표현식
    const imgSrcRegex = /<img[^>]+src="([^">]+)"/g;
    const srcArray = [];
    let match;

    while ((match = imgSrcRegex.exec(htmlString)) !== null) {
      // match[1]에는 src 속성 값이 포함됩니다.
      srcArray.push(match[1]);
    }

    // 배열 요소를 쉼표로 구분된 하나의 문자열로 결합하여 반환
    return srcArray.join(',');
  };

  // 이미지 업로딩
  const uploadImages = async () => {
    const blobUrls = imagesSrc.split(',');
    const uploadedUrls = await Promise.all(blobUrls.map(uploadImage));

    // blob URL을 업로드된 URL로 교체
    let updatedContent = editorData && editorData.tag_group;

    if (typeof updatedContent === 'string') {
      // blobUrls.forEach((blobUrl, index) => {
      //   updatedContent =
      //     updatedContent &&
      //     updatedContent.replace(blobUrl, uploadedUrls[index]);
      // });

      // 상태 업데이트 또는 업데이트된 콘텐츠 처리
      console.log('업로드된 URL로 업데이트된 콘텐츠:', updatedContent);
    } else if (Array.isArray(updatedContent)) {
      updatedContent = updatedContent.map((content) => {
        if (typeof content === 'string') {
          blobUrls.forEach((blobUrl, index) => {
            content = content.replace(blobUrl, uploadedUrls[index]);
          });
        }
        return content;
      });

      // 상태 업데이트 또는 업데이트된 콘텐츠 처리
      console.log('업로드된 URL로 업데이트된 콘텐츠:', updatedContent);
    } else {
      console.error('updatedContent는 문자열 또는 문자열 배열이어야 합니다.');
    }
  };

  const uploadImage = async (blobUrl: RequestInfo | URL) => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const file = new File([blob], `${uuidv4()}.png`, { type: blob.type });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('img_save_type', '1'); // 1을 문자열로 변환

    try {
      const response = await axios.post(
        'http://localhost:5050/uploadImage',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const { imgUUID } = response.data;
      const [year, month, day] = new Date()
        .toISOString()
        .split('T')[0]
        .split('-');
      const newUrl = `http://localhost:5050/images/${year}/${month}/${day}/${imgUUID}.png`;

      return newUrl;
    } catch (error) {
      console.error('파일 업로드 오류:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (imagesSrc) {
      uploadImages();
    }
  }, [imagesSrc]);

  useEffect(() => {
    console.log('quizItemList', quizItemList);
    //문항 리스트에 추가
    if (quizItemList.length > 0) {
      setQuizItemArrList((prevArrList) => [...prevArrList, quizItemList]);
    }
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
      {
        type: 'CATEGORY',
        quizCategory: {},
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
    // 등록 api
    if (addQuestionList.length) postQuizDataMutate();
  }, [addQuestionList]);

  // 문항 등록 후 메타데이터 수정 되게
  const postQuiz = async () => {
    const data = addQuestionList[addQuestionList.length - 1];
    console.log('최종 적으로 등록될 문항 data값', data);

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
      case categoryTitles[5]?.code:
        setSelectedSubject('');
        break;
      case categoryTitles[6]?.code:
        setSelectedCourse('');
        break;

      default:
        break;
    }
  };
  const submitSave = () => {
    saveHandler();
    // 이미지 데이터 저장
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
      setQuizList([...quizList, postQuizData.data.data.quiz]);
      setQuestionList([...quizList, postQuizData.data.data.quiz]);
    }
  }, [postQuizData]);
  useEffect(() => {}, [quizList]);
  useEffect(() => {}, [questionList]);

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

  return (
    <Container>
      <ContentsWrapper>
        <EditContainerWrapper>
          <PerfectScrollbar>
            <EditWrapper>
              <EditerOneFile
                tabView={tabView}
                type={type}
                setEditorData={setEditorData}
                saveHandler={saveHandler}
              />
            </EditWrapper>

            <BackgroundWrapper>
              <SelectListWrapper>
                <strong>
                  과목<span>*</span>
                </strong>
                <SelectList>
                  <li>
                    <SelectWrapper>
                      {/* 교과 */}
                      {categoriesE && categoryTitles[5] && (
                        <Select
                          onDefaultSelect={() =>
                            handleDefaultSelect(categoryTitles[5]?.code)
                          }
                          // $positionTop
                          heightScroll={'150px'}
                          width={'110px'}
                          height={'30px'}
                          defaultValue={categoryTitles[5]?.code}
                          key={categoryTitles[5]?.code}
                          options={categoriesE[0]}
                          onSelect={(event) => selectCategoryOption(event)}
                          setSelectedValue={setSelectedSubject}
                        />
                      )}
                      {/* 과목 */}
                      {categoriesE && categoryTitles[6] && (
                        <Select
                          onDefaultSelect={() =>
                            handleDefaultSelect(categoryTitles[6]?.code)
                          }
                          // $positionTop
                          heightScroll={'150px'}
                          width={'110px'}
                          height={'30px'}
                          defaultValue={categoryTitles[6]?.code}
                          key={categoryTitles[6]?.code}
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
                      {categoriesE && categoryTitles[40] && (
                        <Select
                          onDefaultSelect={() =>
                            handleDefaultSelect('문항타입')
                          }
                          $positionTop
                          width={'110px'}
                          height={'30px'}
                          defaultValue={'문항타입'}
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
                      {categoriesE && categoryTitles[41] && (
                        <Select
                          onDefaultSelect={() => handleDefaultSelect('난이도')}
                          $positionTop
                          width={'110px'}
                          height={'30px'}
                          defaultValue={'난이도'}
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
            </BackgroundWrapper>
          </PerfectScrollbar>
        </EditContainerWrapper>

        <ContentListWrapper>
          <ContentList>
            <QuizList
              questionList={questionList}
              $height={`calc(100vh - 100px)`}
              showViewAllButton
              setCheckedList={setCheckedList}
            />
          </ContentList>
        </ContentListWrapper>

        <Modal />
      </ContentsWrapper>
      <BorderWrapper>
        <SubmitButtonWrapper>
          <Button
            buttonType="button"
            disabled={addButtonBool}
            onClick={submitSave}
            width={'calc(50% - 5px)'}
            $margin={'0 10px 0 0'}
            $filled
            cursor
          >
            <span>등록</span>
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
