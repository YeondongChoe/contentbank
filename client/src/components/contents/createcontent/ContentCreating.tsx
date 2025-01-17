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
  const queryClient = useQueryClient();
  const [quizList, setQuizList] = useRecoilState(quizListAtom);
  const [questionList, setQuestionList] = useState<QuizListType[]>([]);
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const [idxNamePairsF, setIdxNamePairsF] = useState<IdxNamePair[]>([]); // 교재
  const [idxNamePairsG, setIdxNamePairsG] = useState<IdxNamePair[]>([]); // 내신
  const [idxNamePairsH, setIdxNamePairsH] = useState<IdxNamePair[]>([]); // 기출
  const [content, setContent] = useState<string[]>([]);
  // const [imagesSrc, setImagesSrc] = useState<string>('');

  const [editorData, setEditorData] = useState<EditorDataType | null>(null);
  // 에디터에서 나온 문항 요소
  const [quizItemList, setQuizItemList] = useState<QuizItemListType>([]);

  //셀렉트 값
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>(''); //문항타입
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(''); //난이도
  const [selectedDifficultyCommon, setSelectedDifficultyCommon] =
    useState<string>(''); //난이도 공통
  const [selectedSource, setSelectedSource] = useState<SelectedSourceItem[]>(
    [],
  ); //출처
  const [selectedList, setSelectedList] = useState<
    {
      [key: number]: string;
    }[]
  >([]);

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

      // const imagesSrc = extractImgSrc(`${editorData?.tag_group}`);
      // setImagesSrc(imagesSrc);
    }
  }, [editorData]);

  // 메뉴 목록 조회 api (셋팅값)
  const getMenuSetting = async () => {
    const res = await resourceServiceInstance.get(
      `/v1/menu/path?url=contentDtEditingSetting`,
    );
    console.log('getMenuSetting--------', res);
    return res.data.data;
  };
  const { data: menuSettingData, refetch: menuSettingRefetch } = useQuery({
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

          if (menuDetail.groupCode == 'MATERIALS') {
            setIdxNamePairsF((prev) => {
              const uniquePairs = pairs.filter(
                (pair) => !prev.some((prevPair) => prevPair.idx === pair.idx),
              );
              return [...prev, ...uniquePairs];
            });
          }
          if (menuDetail.groupCode == 'INTERNAL') {
            setIdxNamePairsG((prev) => {
              const uniquePairs = pairs.filter(
                (pair) => !prev.some((prevPair) => prevPair.idx === pair.idx),
              );
              return [...prev, ...uniquePairs];
            });
          }
          if (menuDetail.groupCode == 'EXAMS') {
            setIdxNamePairsH((prev) => {
              const uniquePairs = pairs.filter(
                (pair) => !prev.some((prevPair) => prevPair.idx === pair.idx),
              );
              return [...prev, ...uniquePairs];
            });
          }
          // if (menuDetail.groupCode == 'MOREINFO') {
          //   setIdxNamePairsDD((prev) => {
          //     const uniquePairs = pairs.filter(
          //       (pair) => !prev.some((prevPair) => prevPair.idx === pair.idx),
          //     );
          //     return [...prev, ...uniquePairs];
          //   });
          // }

          if (menuDetail.groupCode == 'EXAMS') {
            const categories = idxList.map((idx, idxIndex) => ({
              idx,
              name: nameList[idxIndex],
              code: nameList[idxIndex],
              inputType: inputList[idxIndex] === 'true',
              searchList: searchList[idxIndex] === 'true',
              viewList: viewList[idxIndex] === 'true',
            }));
            filteredCategoriesH.push(categories);
          } else if (menuDetail.groupCode == 'MATERIALS') {
            const categories = idxList.map((idx, idxIndex) => ({
              idx,
              name: nameList[idxIndex],
              code: nameList[idxIndex],
              inputType: inputList[idxIndex] === 'true',
              searchList: searchList[idxIndex] === 'true',
              viewList: viewList[idxIndex] === 'true',
            }));
            filteredCategoriesF.push(categories);
          } else if (menuDetail.groupCode == 'INTERNAL') {
            const categories = idxList.map((idx, idxIndex) => ({
              idx,
              name: nameList[idxIndex],
              code: nameList[idxIndex],
              inputType: inputList[idxIndex] === 'true',
              searchList: searchList[idxIndex] === 'true',
              viewList: viewList[idxIndex] === 'true',
            }));
            filteredCategoriesG.push(categories);
          } else if (menuDetail.groupCode == 'MOREINFO') {
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
    }
  }, [menuSettingData]);

  useEffect(() => {
    console.log(
      `menu idxNamePairs:`,
      idxNamePairsH,
      idxNamePairsF,
      idxNamePairsG,
      // idxNamePairsDD,
    );
  }, [idxNamePairsH, idxNamePairsF, idxNamePairsG]);

  // 분류 등록
  useEffect(() => {
    console.log(',selectedSourceList 전체 출처 리스트 ', selectedSource);
  }, [selectedSource]);
  useEffect(() => {
    console.log(',selectedDifficulty 난이도 ', selectedDifficulty);
  }, [selectedDifficulty]);
  useEffect(() => {
    console.log(
      ',selectedDifficultyCommon 난이도공통 ',
      selectedDifficultyCommon,
    );
  }, [selectedDifficultyCommon]);
  useEffect(() => {
    console.log(',selectedQuestionType 문항타입 ', selectedQuestionType);
  }, [selectedQuestionType]);

  const submitSave = () => {
    // 버튼 누를 시 에디터 값 축출
    saveHandler();
  };
  // 등록 버튼 입력시 에디터에서 문항값 축출 등록
  useEffect(() => {
    console.log('quizItemList 에디터에서 나온 문항 요소 --', quizItemList);
    // 등록 호출
    if (quizItemList.length && !isPending) postQuizDataMutate();
  }, [quizItemList]);

  // 문항 등록 후 메타데이터 수정 되게
  const postQuiz = async () => {
    if (quizItemList.length > 0) {
      const data = {
        commandCode: 0,
        quizIdx: null,
        articleList: [],
        quizItemList: quizItemList,
        quizClassList: [
          {
            type: 'CLASS',
            quizCategory: {
              sources: selectedSource,
              난이도: selectedDifficulty,
              문항타입: selectedQuestionType,
              난이도공통: selectedDifficultyCommon,
            },
          },
        ],
      };
      console.log('최종 적으로 등록될 문항 data값', data);
      const res = await quizService.post(`/v2/quiz`, data);
      console.log('res문항 data값', res.data.data.quizList);
      setQuizList([...quizList, ...res.data.data.quizList]);
      setQuestionList([...quizList, ...res.data.data.quizList]);

      return res.data.data.quizList;
    }
  };

  const {
    data: postQuizData,
    mutate: postQuizDataMutate,
    isPending,
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
        text: `문항이 추가 되었습니다 ${response[0]?.idx}`,
      });
      console.log('문항이 추가 되었습니다;', response);

      // 초기화
      queryClient.invalidateQueries({
        queryKey: ['get-quizList'],
        exact: true,
      });
    },
  });

  useEffect(() => {
    console.log('문항 data postQuizData 값', postQuizData);
    if (postQuizData) {
      // 등록 이후 축출 값 초기화
      setQuizItemList([]);
    }
  }, [postQuizData]);

  // 카테고리 api 불러오기
  // const getCategory = async () => {
  //   const res = await classificationInstance.get(`/v1/category`);
  //   return res;
  // };
  // const { data: categoryData, isLoading: isCategoryLoading } = useQuery({
  //   queryKey: ['get-category'],
  //   queryFn: getCategory,
  //   meta: {
  //     errorMessage: 'get-category 에러 메세지',
  //   },
  // });
  // useEffect(() => {
  //   if (categoryData) {
  //     setCategoryTitles(categoryData.data.data.categoryItemList);
  //   }
  // }, [categoryData]);

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);
  };

  // 셀렉트 초기화
  const handleDefaultSelect = (defaultValue?: string) => {};

  const saveHandler = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const data = await window.saveExamData();
    console.log(data);
    // 축출된 에디터 값 저장
    setEditorData(JSON.parse(data));
  };

  useEffect(() => {
    console.log('questionList생성된 문항 리스트 ---- ', questionList);
  }, [questionList]);
  useEffect(() => {
    console.log('quizList 문항 리스트 ---- ', quizList);
  }, [quizList]);

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
                  {idxNamePairsH && idxNamePairsF && idxNamePairsG && (
                    <OptionList
                      setSelectedSource={setSelectedSource}
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
                        setSelectedValue={setSelectedDifficultyCommon}
                        $positionTop
                        height="35px"
                      />
                      <Select
                        onDefaultSelect={() => {}}
                        width={'120px'}
                        defaultValue={'난이도'}
                        key={'난이도'}
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
