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
import QuizElementList from './list/QuizElementList';
import { InputOptions } from './options/InputOptions';

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
  const [groupId, setGroupId] = useState<string>('');
  // 최종적으로 등록될 리스트
  const [groupList, setGroupList] = useState('');

  const [categoryTitles, setCategoryTitles] = useState<ItemCategoryType[]>([]);
  const [categoriesH, setCategoriesH] = useState<ItemCategoryType[][]>([]);
  const [categoriesDD, setCategoriesDD] = useState<ItemCategoryType[][]>([]);
  const [idxNamePairsH, setIdxNamePairsH] = useState<IdxNamePair[]>([]);
  const [idxNamePairsDD, setIdxNamePairsDD] = useState<IdxNamePair[]>([]);
  const [content, setContent] = useState<string[]>([]);
  const [imagesSrc, setImagesSrc] = useState<string>('');

  const [editorData, setEditorData] = useState<EditorDataType | null>(null);
  // 에디터에서 나온 문항 요소
  const [quizItemList, setQuizItemList] = useState<QuizItemListType>([]);
  // 에디터에서 나온 문항 요소의 모든 배열
  const [quizItemArrList, setQuizItemArrList] = useState<QuizItemListType>([]);
  const [addQuestionList, setAddQuestionList] = useState<AddQuestionListType>(
    [],
  );
  const [quizClassList, setQuizClassList] = useState<QuestionClassListType>([]);
  //셀렉트 값
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>(''); //문항타입
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(''); //난이도
  const [selectedSource, setSelectedSource] = useState<SelectedSourceItem[]>(
    [],
  ); //출처
  const [selectedSourceList, setSelectedSourceList] = useState<
    SelectedSourceItem[]
  >([]); //출처

  const [sourceValue, setSourceValue] = useState<{
    titleIdx: string;
    name: string;
    value: string | number;
  }>({ titleIdx: '', name: '', value: '' });

  // 에디터에서 데이터 가져올시
  useEffect(() => {
    console.log('editorData 에디터 데이터  ----', editorData);
    console.log('editorData 에디터 데이터 묶음 ----', editorData?.tag_group);

    // 출처 데이터 추가
    console.log(
      '출처: ',
      selectedSourceList,
      ' 난이도: ',
      selectedDifficulty,
      '	문항타입: ',
      selectedQuestionType,
    );

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
              code: uuidv4(),
              type: type,
              content: content,
              sort: sort++,
              quizCategory: {
                sources: selectedSourceList,
                난이도: selectedDifficulty,
                문항타입: selectedQuestionType,
              },
            });
          });
        }
      });

      //itemDataList 의 값들을 대발문과 지문 문제로 각기 객체로 나누어 배열에 담기
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
      // console.log(
      //   '메뉴 셋팅값 ------ ',
      //   menuSettingData.menuDetailList.length,
      //   menuSettingData,
      // );

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

          if (menuDetail.groupCode == 'H') {
            setIdxNamePairsH((prev) => [...prev, ...pairs]);
          }
          if (menuDetail.groupCode == 'DD') {
            setIdxNamePairsDD((prev) => [...prev, ...pairs]);
          }

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
      const idxListDD = filteredCategoriesDD
        .flat()
        // .filter((category) => category.inputType === 'SELECT')
        .map((category) => category.idx)
        .join(',');

      console.log('inputType 이 셀렉트인것만', idxListH, '/', idxListDD);

      fetchCategoryItems(idxListH, setCategoriesH);
      fetchCategoryItems(idxListDD, setCategoriesDD);
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
    // console.log(`menu idxNamePairs:`, idxNamePairsH, idxNamePairsDD);
    // console.log(
    //   `menu 2depth select setCategoriesH, setCategoriesDD:`,
    //   categoriesH,
    //   categoriesDD,
    // );
  }, [categoriesH, categoriesDD]);

  // 등록 버튼 입력시 에디터에서 문항값 축출 등록
  useEffect(() => {
    console.log('quizItemList 에디터에서 나온 문항 요소 --', quizItemList);

    if (quizItemList.length > 0) {
      setQuizItemArrList((prevArrList) => {
        const mergedList = [...prevArrList, ...quizItemList];

        // 중복 제거
        const uniqueList = mergedList.filter(
          (item, index, self) =>
            index ===
            self.findIndex(
              (t) => t.type === item.type && t.content === item.content,
            ),
        );

        return uniqueList;
      });
    }
  }, [quizItemList]);

  useEffect(() => {
    console.log(
      'quizItemArrList 등록된 모든 문항 데이터 업데이트:',
      quizItemArrList,
    );
    //quizItemArrList 를 순회하며 중복값 제거
    // setQuestionList(quizItemArrList);
  }, [quizItemArrList]);

  const AddQuestionElements = () => {
    // 이미지 데이터 저장
    saveHandler();
  };

  const saveHandler = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const data = await window.saveExamData();
    console.log(data);
    setEditorData(JSON.parse(data));
  };

  const childRef = useRef<{ AddGroup: () => void } | null>(null);
  // 그룹 id 불러오기
  const AddGroupID = () => {
    const Id = uuidv4();
    // 그룹화를 실행해고 생성된 그룹에 새로운 그룹아이디값 부여
    setGroupId(Id);
    console.log('Parent function executed', Id);

    if (childRef.current?.AddGroup) {
      childRef.current.AddGroup();
    }
  };

  useEffect(() => {
    console.log('quizClassList 분류등록 업데이트:', quizClassList);
    // 등록될 값
    // TODO : 그룹 맵핑 기준으로 다시
    // const newQuestionList = quizItemArrList.map((quizItems) => ({
    //   commandCode: 0,
    //   quizIdx: null,
    //   articleList: [],
    //   quizItemList: quizItems,
    //   quizClassList: [...quizClassList],
    // }));
    // setAddQuestionList(newQuestionList);
  }, [quizClassList]);

  // 분류 등록
  useEffect(() => {
    console.log('selectedQuestionType 문항타입', selectedQuestionType);
    console.log('selectedDifficulty 난이도', selectedDifficulty);
    //출처
    console.log('selectedSourceList 출처', selectedSourceList);
    // console.log('selected--------출처 선택부분', selectedList);
    if (selectedSource.length > 0 && selectedQuestionType) {
      const quizClassList: QuestionClassListType = [
        {
          type: 'CLASS',
          quizCategory: {
            sources: selectedSourceList,
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

  // console.log('selectedSourceList-최종적 들어갈 소스값---', selectedSourceList);

  // useEffect(() => {
  //   // 등록 api
  //   if (addQuestionList.length) postQuizDataMutate();
  // }, [addQuestionList]);

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

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);
  };

  // 셀렉트 초기화
  const handleDefaultSelect = (defaultValue?: string) => {};
  //TODO : 그룹 화 / 출처데이터 설정 후 최종 저장
  const submitSave = () => {};

  // useEffect(() => {
  //   if (postQuizData) {
  //     setQuizList([...quizList, postQuizData.data.data.quiz]);
  //     setQuestionList([...quizList, postQuizData.data.data.quiz]);
  //   }
  // }, [postQuizData]);
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
                </strong>
              </SelectListWrapper>
              <SelectListWrapper>
                {/* <SelectList>
                  <li>
                    <SelectWrapper>
                      {idxNamePairsH && (
                        <>
                          {
                            // 셀렉트가 아닌 경우
                            idxNamePairsH.map((el, idx) => (
                              <InputOptions
                                Item={idxNamePairsH[idx]}
                                listItem={categoriesH[idx]}
                                key={`${el?.name} optionsdepth${idx}`}
                                onOptionChange={setSourceValue}
                              />
                            ))
                          }
                        </>
                      )}
                    </SelectWrapper>
                  </li>
                </SelectList> */}
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
                      {idxNamePairsDD &&
                        categoriesDD.map((el, idx) => (
                          <InputWrappper
                            key={`${idxNamePairsDD[idx].idx},${idxNamePairsDD[idx].name}`}
                          >
                            {idxNamePairsDD[idx].searchList && (
                              <span className="reddot">*</span>
                            )}
                            {/* {idxNamePairsDD[idx].viewList && ( */}
                            <Select
                              onDefaultSelect={() =>
                                handleDefaultSelect(idxNamePairsDD[idx].name)
                              }
                              $positionTop
                              width={'110px'}
                              height={'30px'}
                              defaultValue={idxNamePairsDD[idx].name}
                              options={el}
                              onSelect={(event) => selectCategoryOption(event)}
                              setSelectedValue={setSelectedQuestionType}
                            />
                            {/* )} */}
                          </InputWrappper>
                        ))}
                    </SelectWrapper>
                  </li>
                </SelectList>
              </SelectListWrapper>
            </BackgroundWrapper>
          </PerfectScrollbar>
        </EditContainerWrapper>

        <ContentListWrapper>
          <ContentList>
            <QuizElementList
              ref={childRef}
              questionList={quizItemArrList}
              $height={`calc(100vh - 200px)`}
              groupId={groupId}
              selectedDifficulty={selectedDifficulty}
              selectedQuestionType={selectedQuestionType}
            />
          </ContentList>
        </ContentListWrapper>

        <Modal />
      </ContentsWrapper>
      <BorderWrapper>
        <EditerButtonWrapper>
          <Button
            onClick={() => AddQuestionElements()}
            width="calc(100% - 310px);"
            height="35px"
            $margin="0 20px 0 0"
            $filled
          >
            문항과 출처 데이터 추가
          </Button>
          <div className="border"></div>
          <Button
            onClick={() => AddGroupID()}
            width="330px"
            height="35px"
            $margin="0 0 0 20px"
            $filled
          >
            그룹 묶기
          </Button>
        </EditerButtonWrapper>
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

const EditerButtonWrapper = styled.div`
  display: flex;
  padding: 10px 20px;

  .border {
    width: 1px;
    height: 35px;
    border: none;
    background: #a3aed0;
  }
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
    margin-bottom: 120px;
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
    display: flex;
    flex-wrap: wrap;

    .top_title {
      flex: 1 0 0;
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
  /* border-bottom: 1px solid ${COLOR.BORDER_BLUE}; */

  position: absolute;
  right: 0;
`;
const ContentList = styled.div`
  height: calc(100vh - 200px);
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
  height: 120px;
  background-color: #fff;
`;
const SubmitButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 50%;
  position: absolute;
  left: auto;
  right: 20px;
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
