import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { GrPlan } from 'react-icons/gr';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import {
  Button,
  CommonDate,
  IconButton,
  Modal,
  openToastifyAlert,
  Select,
} from '../..';
import {
  classificationInstance,
  quizService,
  resourceServiceInstance,
} from '../../../api/axios';
import { quizListAtom } from '../../../store/quizListAtom';
import {
  AddQuestionListType,
  EditorDataType,
  IdxNamePair,
  ItemCategoryType,
  QuestionClassListType,
  QuizItemListType,
  QuizListType,
} from '../../../types';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { COLOR } from '../../constants/COLOR';

import { EditerOneFile } from './editer';
import { QuizList } from './list';
import QuizElementList from './list/QuizElementList';
import { InputOptions } from './options/InputOptions';
import { OptionList } from './options/OptionList';

type SelectedValueType = string | { [key: string]: any };
type SelectedSourceItem = Record<string, any>;

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
  const [isAdd, setIsAdd] = useState<boolean>(false);

  const [categoryTitles, setCategoryTitles] = useState<ItemCategoryType[]>([]);
  const [categoriesF, setCategoriesF] = useState<ItemCategoryType[][]>([]);
  const [categoriesG, setCategoriesG] = useState<ItemCategoryType[][]>([]);
  const [categoriesH, setCategoriesH] = useState<ItemCategoryType[][]>([]);
  const [idxNamePairsF, setIdxNamePairsF] = useState<IdxNamePair[]>([]);
  const [idxNamePairsG, setIdxNamePairsG] = useState<IdxNamePair[]>([]);
  const [idxNamePairsH, setIdxNamePairsH] = useState<IdxNamePair[]>([]);
  const [content, setContent] = useState<string[]>([]);
  const [imagesSrc, setImagesSrc] = useState<string>('');

  const [editorData, setEditorData] = useState<EditorDataType | null>(null);
  // 에디터에서 나온 문항 요소
  const [quizItemList, setQuizItemList] = useState<QuizItemListType>([]);

  // 에디터에서 나온 문항 요소의 모든 배열
  // const [quizItemArrList, setQuizItemArrList] = useState<QuizItemListType>([]);

  const [quizClassList, setQuizClassList] = useState<QuestionClassListType>([]);
  //셀렉트 값
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>(''); //문항타입
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(''); //난이도
  const [selectedSource, setSelectedSource] = useState<SelectedSourceItem[]>(
    [],
  ); //출처
  const [selectedSourceList, setSelectedSourceList] = useState<
    SelectedSourceItem[]
  >([]);

  const [selectedList, setSelectedList] = useState<
    {
      [key: number]: string;
    }[]
  >([]);

  const [sourceValue, setSourceValue] = useState<{
    titleIdx: string;
    name: string;
    value: string | number;
  }>({ titleIdx: '', name: '', value: '' });

  // 에디터에서 데이터 가져올시
  useEffect(() => {
    console.log('editorData 에디터 데이터  ----', editorData);
    console.log('editorData 에디터 데이터 묶음 ----', editorData?.tag_group);

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
              type = 'QUESTION'; // 문제
              break;
            case 'BIGCONTENT':
              type = 'BIG'; // 대발문
              break;
            case 'CONTENT':
              type = 'TEXT'; // 지문
              break;
            case 'EXAM_SM':
              type = 'SMALL'; // 소문제
              break;
            default:
              break; // 나머지는 값과 타입이 같음
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

      //itemDataList 의 값들을 대발문과 지문 문제로 각기 객체로 나누어 배열에 담기
      // 에디터 값이 리스트에 담김
      console.log('itemDataList 각 데이터를 배열에 담음', itemDataList);
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
        'https://j-dev01.dreamonesys.co.kr/file',
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
      const newUrl = `https://j-dev01.dreamonesys.co.kr/file/${year}/${month}/${day}/${imgUUID}.png`;

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

  // 메뉴 목록 조회 api (셋팅값)
  const getMenuSetting = async () => {
    const res = await resourceServiceInstance.get(
      `/v1/menu/path?url=contentDtEditingSetting`,
    );
    // console.log('getMenuSetting--------', res);
    return res.data.data;
  };
  const {
    data: menuSettingData,
    isLoading: isMenuSettingLoading,
    refetch: menuSettingRefetch,
  } = useQuery({
    queryKey: ['get-menuSetting'],
    queryFn: getMenuSetting,
    meta: {
      errorMessage: 'get-menuSetting 에러 메세지',
    },
  });

  // 셋팅 데이터 바뀔때 선택 구성요소값
  useEffect(() => {
    if (menuSettingData) {
      //   idxs : 해당 키값으로 2뎁스 셀렉트 조회
      console.log(
        '메뉴 셋팅값 ------ ',
        menuSettingData.menuDetailList.length,
        menuSettingData,
      );

      // 셋팅값 없을시 얼럿
      if (menuSettingData.menuDetailList.length == 0) {
        // openToastifyAlert({
        //   type: 'error',
        //   text: '셋팅에서 우선 셀렉트값을 선택해주세요',
        // });
        alert('셋팅에서 우선 셀렉트값을 선택해주세요!');
        window.close();
        return;
      }

      // 첫번째 출처 값
      // 교재
      const filteredCategoriesF: any[] = [];
      //내신
      const filteredCategoriesG: any[] = [];
      //기출
      const filteredCategoriesH: any[] = [];
      // 두번째 추가정보
      const filteredCategoriesDD: any[] = [];

      // idx 와 names를 인덱스 순번에 맞게 짝지어 배치
      menuSettingData?.menuDetailList.forEach(
        (
          menuDetail: {
            [x: string]: any;
            idxList: string;
            nameList: string;
            inputList: string;
            searchList: string;
            viewList: string;
          },
          index: any,
        ) => {
          const idxList = menuDetail?.idxList?.split(',');
          const nameList = menuDetail?.nameList?.split(',');
          const inputList = menuDetail?.inputList?.split(',');
          const searchList = menuDetail?.searchList?.split(',');
          const viewList = menuDetail?.viewList?.split(',');

          // idx와 name을 짝지어 배열로 저장
          const pairs = idxList.map((idx, index) => ({
            idx,
            name: nameList[index],
            inputType: inputList[index],
            searchList: searchList[index] === 'true',
            viewList: viewList[index] === 'true',
          }));

          // ItemCategoryType = {
          // 	code: string;
          // 	idx: number;
          // 	name: string;
          // 	type?: string;
          // 	value?: number;
          // 	isUse?: boolean;
          // 	autoNum?: string;
          // };

          if (menuDetail.groupCode == 'F') {
            setIdxNamePairsF((prev) => {
              const uniquePairs = pairs.filter(
                (pair) => !prev.some((prevPair) => prevPair.idx === pair.idx),
              );
              return [...prev, ...uniquePairs];
            });
          }
          if (menuDetail.groupCode == 'G') {
            setIdxNamePairsG((prev) => {
              const uniquePairs = pairs.filter(
                (pair) => !prev.some((prevPair) => prevPair.idx === pair.idx),
              );
              return [...prev, ...uniquePairs];
            });
          }
          if (menuDetail.groupCode == 'H') {
            setIdxNamePairsH((prev) => {
              const uniquePairs = pairs.filter(
                (pair) => !prev.some((prevPair) => prevPair.idx === pair.idx),
              );
              return [...prev, ...uniquePairs];
            });
          }
          // if (menuDetail.groupCode == 'DD') {
          //   setIdxNamePairsDD((prev) => {
          //     const uniquePairs = pairs.filter(
          //       (pair) => !prev.some((prevPair) => prevPair.idx === pair.idx),
          //     );
          //     return [...prev, ...uniquePairs];
          //   });
          // }

          if (menuDetail.groupCode == 'H') {
            const categories = idxList.map((idx, idxIndex) => ({
              idx,
              name: nameList[idxIndex],
              code: nameList[idxIndex],
              inputType: inputList[idxIndex] === 'true',
              searchList: searchList[idxIndex] === 'true',
              viewList: viewList[idxIndex] === 'true',
            }));
            filteredCategoriesH.push(categories);
          } else if (menuDetail.groupCode == 'F') {
            const categories = idxList.map((idx, idxIndex) => ({
              idx,
              name: nameList[idxIndex],
              code: nameList[idxIndex],
              inputType: inputList[idxIndex] === 'true',
              searchList: searchList[idxIndex] === 'true',
              viewList: viewList[idxIndex] === 'true',
            }));
            filteredCategoriesF.push(categories);
          } else if (menuDetail.groupCode == 'G') {
            const categories = idxList.map((idx, idxIndex) => ({
              idx,
              name: nameList[idxIndex],
              code: nameList[idxIndex],
              inputType: inputList[idxIndex] === 'true',
              searchList: searchList[idxIndex] === 'true',
              viewList: viewList[idxIndex] === 'true',
            }));
            filteredCategoriesG.push(categories);
          } else if (menuDetail.groupCode == 'DD') {
            const categories = idxList.map((idx, idxIndex) => ({
              idx,
              name: nameList[idxIndex],
              code: nameList[idxIndex],
              inputType: inputList[idxIndex] === 'true',
              searchList: searchList[idxIndex] === 'true',
              // viewList: viewList[idxIndex] === 'true',
            }));
            filteredCategoriesDD.push(categories);
          }
        },
      );

      const idxListH = filteredCategoriesH
        .flat()
        // .filter((category) => category.inputType === 'SELECT')
        .map((category) => category.idx)
        .join(',');
      const idxListF = filteredCategoriesF
        .flat()
        // .filter((category) => category.inputType === 'SELECT')
        .map((category) => category.idx)
        .join(',');
      const idxListG = filteredCategoriesG
        .flat()
        // .filter((category) => category.inputType === 'SELECT')
        .map((category) => category.idx)
        .join(',');
      const idxListDD = filteredCategoriesDD
        .flat()
        // .filter((category) => category.inputType === 'SELECT')
        .map((category) => category.idx)
        .join(',');

      console.log(
        'inputType 이 셀렉트인것만',
        idxListH,
        '/',
        idxListF,
        '/',
        idxListG,
        '/',
        idxListDD,
      );

      fetchCategoryItems(idxListH, setCategoriesH);
      fetchCategoryItems(idxListF, setCategoriesF);
      fetchCategoryItems(idxListG, setCategoriesG);
      // fetchCategoryItems(idxListDD, setCategoriesDD);
    }
  }, [menuSettingData]);

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
    console.log(
      `menu idxNamePairs:`,
      idxNamePairsH,
      idxNamePairsF,
      idxNamePairsG,
      // idxNamePairsDD,
    );
    console.log(
      `menu 2depth select setCategoriesH, setCategoriesDD:`,
      categoriesH,
      categoriesF,
      categoriesG,
      // categoriesDD,
    );
  }, [categoriesH, categoriesF, categoriesG]);

  // 등록 버튼 입력시 에디터에서 문항값 축출 등록

  useEffect(() => {
    console.log('quizItemList 에디터에서 나온 문항 요소 --', quizItemList);
  }, [quizItemList]);

  // 분류 등록
  useEffect(() => {
    console.log('selectedQuestionType 문항타입', selectedQuestionType);
    console.log('selectedDifficulty 난이도', selectedDifficulty);
    //출처
    console.log('selectedSourceList 출처', selectedSourceList);
    console.log('selected--------출처 선택부분', selectedList);
    if (selectedSource.length > 0 && selectedQuestionType) {
      const quizClassList: QuestionClassListType = [
        {
          type: 'CLASS',
          quizCategory: {
            sources: selectedList,
            난이도: selectedDifficulty,
            문항타입: selectedQuestionType,
          },
        },
      ];

      // 필수 메타값 추가 및 변경
      setQuizClassList(quizClassList);
    }
  }, [selectedQuestionType, selectedSourceList, selectedDifficulty]);

  useEffect(() => {
    console.log('소스 데이터 선택', sourceValue.name, sourceValue.value);
    const updatedSourceValue = [];
    updatedSourceValue.push({ [sourceValue.name]: sourceValue.value });

    console.log(updatedSourceValue);
    setSelectedSource([...updatedSourceValue]);
  }, [sourceValue]);

  useEffect(() => {
    const combinedList = [...selectedSourceList, ...selectedSource];

    const uniqueList = combinedList.reduce<SelectedSourceItem[]>(
      (acc, curr) => {
        const key = Object.keys(curr)[0];
        const value = curr[key];
        if (!value) {
          return acc;
        }
        const existingIndex = acc.findIndex((item) =>
          Object.prototype.hasOwnProperty.call(item, key),
        );

        if (existingIndex >= 0) {
          acc[existingIndex] = curr;
        } else {
          acc.push(curr);
        }

        return acc;
      },
      [],
    );
    setSelectedSourceList(uniqueList);
  }, [selectedSource]);

  // 문항 등록 후 메타데이터 수정 되게
  const postQuiz = async () => {
    if (quizItemList.length > 0) {
      const data = {
        commandCode: 0,
        quizIdx: null,
        articleList: [],
        quizItemList: quizItemList,
        quizClassList: quizClassList,
      };
      console.log('최종 적으로 등록될 문항 data값', data);

      return await quizService.post(`/v1/quiz`, data);
    }
  };

  const {
    data: postQuizData,
    mutate: postQuizDataMutate,
    isSuccess,
  } = useMutation({
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
        text: `문항이 추가 되었습니다 ${response && response.data.data.quiz.idx}`,
      });

      setQuestionList([...quizList, response && response.data.data.quiz]);
    },
  });

  useEffect(() => {
    console.log('문항 data값', postQuizData);
    if (postQuizData) {
      // 등록 이후 축출 값 초기화
      setQuizList([...quizList, postQuizData.data.data.quiz]);

      // if (isSuccess) setQuizItemList([]);
    }
  }, [postQuizData]);

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

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);
  };

  // 셀렉트 초기화
  const handleDefaultSelect = (defaultValue?: string) => {};
  const submitSave = () => {
    // 버튼 누를 시 에디터 값 축출
    saveHandler();

    // 등록 호출
    postQuizDataMutate();
  };
  const saveHandler = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const data = await window.saveExamData();
    console.log(data);
    // 축출된 에디터 값 저장
    setEditorData(JSON.parse(data));
  };

  useEffect(() => {}, [quizList]);
  useEffect(() => {}, [questionList]);

  // 문항 추가버튼 disable 처리
  const addButtonBool = useMemo(() => {
    if (selectedQuestionType !== '') {
      return false;
    } else {
      return true;
    }
  }, [selectedQuestionType]);

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
                <strong className="top_title">
                  출처<span>*</span>
                  <span className="info">(최대 5개)</span>
                </strong>
                <SourceOptionWrapper>
                  {/* 옵션 리스트 셀렉트 컴포넌트 */}
                  {idxNamePairsH &&
                    idxNamePairsF &&
                    idxNamePairsG &&
                    categoryTitles && (
                      <OptionList
                        setSelectedSource={setSelectedSource}
                        categoryTitles={categoryTitles}
                        categoriesE={[
                          {
                            code: '교재',
                            idx: 1,
                            name: '교재',
                          },
                          {
                            code: '내신',
                            idx: 2,
                            name: '내신',
                          },
                          {
                            code: '기출',
                            idx: 3,
                            name: '기출',
                          },
                          {
                            code: '자체제작',
                            idx: 4,
                            name: '자체제작',
                          },
                          {
                            code: '기타',
                            idx: 5,
                            name: '기타',
                          },
                        ]}
                        groupsDataF={idxNamePairsF}
                        groupsDataG={idxNamePairsG}
                        groupsDataH={idxNamePairsH}
                        selectedValue={setSelectedList}
                      />
                    )}
                </SourceOptionWrapper>
              </SelectListWrapper>
            </BackgroundWrapper>
            <BackgroundWrapper className="bottom">
              <SelectListWrapper>
                <strong className="top_title">추가정보</strong>
              </SelectListWrapper>
              <SelectListWrapper>
                <SelectList>
                  <li>
                    <SelectWrapper>
                      <strong className="title">문항타입</strong>
                      <Select
                        onDefaultSelect={() => {}}
                        width={'120px'}
                        defaultValue={'문항 타입'}
                        key={'문항 타입'}
                        options={[
                          {
                            code: '객관식',
                            idx: 1,
                            name: '객관식',
                          },
                          {
                            code: '주관식',
                            idx: 2,
                            name: '주관식',
                          },
                          {
                            code: '서술형',
                            idx: 3,
                            name: '서술형',
                          },
                        ]}
                        onSelect={(event) => selectCategoryOption(event)}
                        setSelectedValue={setSelectedQuestionType}
                        $positionTop
                        height="35px"
                      />
                    </SelectWrapper>
                  </li>
                  <li>
                    <SelectWrapper>
                      <strong className="title">난이도</strong>
                      <Select
                        onDefaultSelect={() => {}}
                        width={'120px'}
                        defaultValue={'공통(시험)'}
                        key={'공통(시험)'}
                        options={[
                          {
                            code: '개념',
                            idx: 1,
                            name: '개념',
                          },
                          {
                            code: '기본',
                            idx: 2,
                            name: '기본',
                          },
                          {
                            code: '심화',
                            idx: 3,
                            name: '심화',
                          },
                          {
                            code: '없음',
                            idx: 4,
                            name: '없음',
                          },
                        ]}
                        onSelect={(event) => selectCategoryOption(event)}
                        setSelectedValue={() => {}} // TODO : 개념값
                        $positionTop
                        height="35px"
                      />
                      <Select
                        onDefaultSelect={() => {}}
                        width={'120px'}
                        defaultValue={'상'}
                        key={'상'}
                        options={[
                          {
                            code: '상',
                            idx: 1,
                            name: '상',
                          },
                          {
                            code: '중상',
                            idx: 2,
                            name: '중상',
                          },
                          {
                            code: '중',
                            idx: 3,
                            name: '중',
                          },
                          {
                            code: '중하',
                            idx: 4,
                            name: '중하',
                          },
                          {
                            code: '하',
                            idx: 5,
                            name: '하',
                          },
                        ]}
                        onSelect={(event) => selectCategoryOption(event)}
                        setSelectedValue={setSelectedDifficulty}
                        $positionTop
                        height="35px"
                      />
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
              $height={`calc(100vh - 200px)`}
              showViewAllButton
              setCheckedList={setCheckedList}
              showCheckBox
            />
          </ContentList>
        </ContentListWrapper>

        <Modal />
      </ContentsWrapper>
      <BorderWrapper>
        <SubmitButtonWrapper>
          <Button
            buttonType="button"
            // disabled={addButtonBool}
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
  margin-bottom: 10px;

  &.bottom {
    margin-bottom: 70px;
  }
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
    > span {
      position: absolute;
      top: 10px;
      right: 0px;
      color: ${COLOR.RED};
      font-size: 14px;
    }
  }

  &:last-child {
    padding-bottom: 20px;
    display: flex;
    flex-wrap: wrap;

    .top_title {
      flex: 1 0 0;
    }
    .info {
      width: 100%;
      display: flex;
      position: static;
      color: ${COLOR.GRAY};
      font-size: 12px;
      letter-spacing: -1px;
    }
  }
  &:nth-child(1) {
    padding-top: 20px;
  }
`;

const InputWrappper = styled.div`
  display: flex;
  .reddot {
    margin: 0 5px;
    color: ${COLOR.ALERTBAR_ERROR};
  }
`;

const SourceOptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 70px);
`;
const SelectList = styled.ul`
  /* padding: 5px 10px; */
  display: flex;
  width: 100%;

  li {
    width: 50%;
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

  .title {
    padding: 10px;
    font-weight: normal;
  }
`;

const ContentListWrapper = styled.div`
  width: 340px;
  padding-left: 10px;
  /* border-bottom: 1px solid ${COLOR.BORDER_BLUE}; */

  position: absolute;
  right: 0;
`;
const ContentList = styled.div`
  height: calc(100vh - 145px);
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
  display: flex;
  gap: 10px;
  width: 50%;
  position: absolute;
  left: auto;
  right: 20px;
  top: 10px;
`;

const OptionWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;

  input {
    height: 30px;
    padding: 10px;
    width: 120px;
    border: 1px solid ${COLOR.BORDER_GRAY};
    border-radius: 5px;
    text-overflow: ellipsis;

    &.modal_input {
      border: 1px solid ${COLOR.PRIMARY};
      cursor: pointer;
    }
  }
`;
