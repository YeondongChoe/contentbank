import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { Button, Modal, Select } from '../..';
import { classificationInstance, quizService } from '../../../api/axios';
import { quizListAtom } from '../../../store/quizListAtom';
import { ItemCategoryType, QuizListType } from '../../../types';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { COLOR } from '../../constants/COLOR';

import { QuizList } from './list';
import { OptionList } from './options/OptionList';

export function ContentCreating({
  setTabVeiw,
}: {
  setTabVeiw: React.Dispatch<React.SetStateAction<string>>;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [quizList, setQuizList] = useRecoilState(quizListAtom);
  const [questionList, setQuestionList] = useState<QuizListType[]>([]);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [categoryTitles, setCategoryTitles] = useState<ItemCategoryType[]>([]);
  const [categoriesE, setCategoriesE] = useState<ItemCategoryType[][]>([]);
  const [categoriesF, setCategoriesF] = useState<ItemCategoryType[][]>([]);
  const [categoriesG, setCategoriesG] = useState<ItemCategoryType[][]>([]);
  const [categoriesH, setCategoriesH] = useState<ItemCategoryType[][]>([]);
  const [content, setContent] = useState<string[]>([]);

  //TODO : 임시로 퀴즈데이터 이미 등록된 데이터로 불러옴
  //       나중에 등록버튼으로 등록 완료된 데이터로 전역저장후 다시setQuestionList값으로 넣기
  //TODO : 수정 팝업으로 열렸을시 - 전역에 체크박스데이터 저장후 열릴때 setQuestionList에 값넣기
  const getQuiz = async () => {
    const res = await quizService.get(`/v1/quiz`);
    console.log(`getQuiz 결과값`, res.data.data);
    return res.data.data;
  };
  const { data: quizData } = useQuery({
    queryKey: ['get-quizList'],
    queryFn: getQuiz,
    meta: {
      errorMessage: 'get-quizList 에러 메세지',
    },
  });

  useEffect(() => {
    if (quizData) {
      console.log('초기값 임시로 불러와서 넣기', quizData.quizList);
      setQuestionList(quizData.quizList);
    }
  }, [quizData]);

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
  useEffect(() => {
    if (groupsDataF) {
      fetchCategoryItems(groupsDataF, setCategoriesF);
    }
  }, [groupsDataF]);
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
  useEffect(() => {
    if (groupsDataG) {
      fetchCategoryItems(groupsDataG, setCategoriesG);
    }
  }, [groupsDataG]);
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
  useEffect(() => {
    if (groupsDataH) {
      fetchCategoryItems(groupsDataH, setCategoriesH);
    }
  }, [groupsDataH]);

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
      console.log('itemsList', itemsList);
      setCategory(itemsList);
    } catch (error: any) {
      if (error.data.code == 'GE-002') postRefreshToken();
    }
  };
  useEffect(() => {
    console.log(
      'API Response Check: 등록시 필수 E',
      categoriesE,
      'API Response Check: 교재 F',
      categoriesF,
      'API Response Check: 내신 G',
      categoriesG,
      'API Response Check: 기출 H',
      categoriesH,
    );
  }, [categoriesE, categoriesF, categoriesG, categoriesH]);

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);
  };

  const submitSave = () => {
    console.log('등록하려는 신규 문항에 대한 데이터 post 요청');
    console.log('신규 등록된 문항 리스트 get 요청 API');
    setQuizList(questionList);

    // getLocalData();
  };

  // iframe 데이터
  useEffect(() => {
    const iframe = document.getElementById('editorIframe') as HTMLIFrameElement;
    console.log('iframe', iframe);
    if (iframe) {
      const contentWindow = iframe.contentWindow;
      // const saveData = contentWindow.saveExamData();
      console.log('contentWindow', contentWindow);
      // console.log('postMessage', contentWindow?.postMessage());
      // console.log('saveData', saveData);
    }
  }, []);

  return (
    <Container>
      <ContentsWrapper>
        <EditContainerWrapper>
          <PerfectScrollbar>
            <EditWrapper>
              <iframe
                width="100%"
                height="672"
                src="http://43.201.205.140:40031/"
                name="아이텍솔루션"
                frameBorder={0}
                ref={iframeRef}
                id="editorIframe"
                //allow="fullscreen"
                // sandbox="allow-forms allow-modals allow-same-origin"
                // referrerPolicy="no-referrer"
              ></iframe>
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
                      {categoriesE && categoryTitles[6] && (
                        <Select
                          $positionTop
                          width={'110px'}
                          height={'30px'}
                          defaultValue={categoryTitles[6].code}
                          key={categoryTitles[6].code}
                          options={categoriesE[0]}
                          onSelect={(event) => selectCategoryOption(event)}
                        />
                      )}
                      {/* 과목 */}
                      {categoriesE && categoryTitles[7] && (
                        <Select
                          $positionTop
                          width={'110px'}
                          height={'30px'}
                          defaultValue={categoryTitles[7].code}
                          key={categoryTitles[7].code}
                          options={categoriesE[1]}
                          onSelect={(event) => selectCategoryOption(event)}
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
                  {categoriesF &&
                    categoriesG &&
                    categoriesH &&
                    categoryTitles && (
                      <OptionList
                        categoryTitlesList={categoryTitles}
                        categoriesE={categoriesE}
                        categoriesF={categoriesF}
                        categoriesG={categoriesG}
                        categoriesH={categoriesH}
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
                          $positionTop
                          width={'110px'}
                          height={'30px'}
                          defaultValue={categoryTitles[40].code}
                          key={categoryTitles[40].code}
                          options={categoriesE[3]}
                          onSelect={(event) => selectCategoryOption(event)}
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
                          $positionTop
                          width={'110px'}
                          height={'30px'}
                          defaultValue={categoryTitles[41].code}
                          key={categoryTitles[41].code}
                          options={categoriesE[4]}
                          onSelect={(event) => selectCategoryOption(event)}
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
            onClick={() => setTabVeiw('문항 분류')}
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
  height: calc(100vh - 100px); // 탭 네비 높이, 하단 셀렉트 높이 제외
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
  width: 100%;

  > iframe {
    width: 100%;
    height: calc(100vh - 100px);
  }
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
