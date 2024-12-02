import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { Button, Modal, openToastifyAlert, Select } from '../..';
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
import { InputOptions } from './options/InputOptions';

export function ContentFileUpload({
  setTabView,
  type,
}: {
  setTabView: React.Dispatch<React.SetStateAction<string>>;
  type: string;
}) {
  const [quizList, setQuizList] = useRecoilState(quizListAtom);
  const [questionList, setQuestionList] = useState<QuizListType[]>([]);

  const [checkedList, setCheckedList] = useState<string[]>([]);

  const [categoriesH, setCategoriesH] = useState<ItemCategoryType[][]>([]);
  const [categoriesDD, setCategoriesDD] = useState<ItemCategoryType[][]>([]);
  const [idxNamePairsH, setIdxNamePairsH] = useState<IdxNamePair[]>([]);
  const [idxNamePairsDD, setIdxNamePairsDD] = useState<IdxNamePair[]>([]);

  const [content, setContent] = useState<string[]>([]);
  const [imagesSrc, setImagesSrc] = useState<string>('');
  const [isPostMessage, setIsPostMessage] = useState<boolean>(false);

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
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>(''); //문항타입
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(''); //난이도
  const [selectedSource, setSelectedSource] = useState<any[]>([]); //출처
  const [sourceValue, setSourceValue] = useState<{
    titleIdx: string;
    name: string;
    value: string | number;
  }>({ titleIdx: '', name: '', value: '' });

  // 선택된 리스트 아이템 데이터
  const [onItemClickData, setOnItemClickData] = useState<QuizListType>();

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
      console.log('editorData?.tag_group----', editorData?.tag_group);
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
    console.log('selectedQuestionType 문항타입', selectedQuestionType);
    console.log('selectedDifficulty 난이도', selectedDifficulty);
    //출처
    console.log('selectedSource 출처', selectedSource);

    const quizClassList: QuestionClassListType = [
      {
        type: 'CLASS',
        quizCategory: {
          sources: selectedSource,
          난이도: selectedDifficulty,
          문항타입: selectedQuestionType,
        },
      },
    ];

    // 필수 메타값 추가 및 변경
    setQuizClassList(quizClassList);
  }, [selectedQuestionType, selectedSource, selectedDifficulty]);

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

  // 메뉴 목록 조회 api (셋팅값)
  const getMenuSetting = async () => {
    const res = await resourceServiceInstance.get(
      `/v1/menu/path?url=contentDtEditingSetting`,
    );
    console.log('getMenuSetting--------', res);
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

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);
  };

  // 셀렉트 초기화
  const handleDefaultSelect = (defaultValue?: string) => {};
  const submitSave = () => {
    // console.log('등록하려는 신규 문항에 대한 데이터 post 요청');
    // console.log('신규 등록된 문항 리스트 get 요청 API');

    setIsPostMessage(true);

    // 등록 api
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

  useEffect(() => {}, [onItemClickData]);

  // 문항 추가버튼 disable 처리
  const addButtonBool = useMemo(() => {
    if (selectedQuestionType !== '' && selectedSource.length > 0) {
      return false;
    } else {
      return true;
    }
  }, [selectedQuestionType, selectedSource]);

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
              <SelectListWrapper>
                <strong className="top_title">출처</strong>
              </SelectListWrapper>
              <SelectListWrapper>
                <SelectList>
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
                </SelectList>
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
            <QuizList
              questionList={quizList}
              $height={`calc(100vh - 200px)`}
              showViewAllButton
              onItemClick={setOnItemClickData}
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
            // disabled={addButtonBool}
            onClick={() => submitSave()}
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

const InputWrappper = styled.div`
  display: flex;
  .reddot {
    margin: 0 5px;
    color: ${COLOR.ALERTBAR_ERROR};
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
