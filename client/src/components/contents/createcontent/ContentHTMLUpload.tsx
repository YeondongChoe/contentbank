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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [quizList, setQuizList] = useRecoilState(quizListAtom);
  const [questionList, setQuestionList] = useState<QuizListType[]>([]);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [categoryTitles, setCategoryTitles] = useState<ItemCategoryType[]>([]);
  const [categoriesE, setCategoriesE] = useState<ItemCategoryType[][]>([]);
  const [content, setContent] = useState<string[]>([]);
  const [isPostMessage, setIsPostMessage] = useState<boolean>(false);

  const [editorData, setEditorData] = useState(null);
  //셀렉트 값
  const [selectedSubject, setSelectedSubject] = useState<string>(''); //교과
  const [selectedCourse, setSelectedCourse] = useState<string>(''); //과목
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>(''); //문항타입
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(''); //난이도
  const [selectedSource, setSelectedSource] = useState<any[]>([]); //출처

  useEffect(() => {
    if (checkedList) {
      console.log('초기값 임시로 불러와서 넣기', checkedList);
      // setQuestionList(quizData.quizList);
    }
  }, [checkedList]);

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
    //TODO : 임시 문항리스트 데이터
    setQuizList(questionList);
    setIsPostMessage(true);

    // 등록 api
    console.log('selectedSubject 교과', selectedSubject);
    console.log('selectedCourse 과목', selectedCourse);
    console.log('selectedQuestionType 문항타입', selectedQuestionType);
    console.log('selectedDifficulty 난이도', selectedDifficulty);
    //출처
    console.log('selectedSource 난이도', selectedSource);
  };

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
  // iframe 에디터에 데이터 삽입시
  useEffect(() => {
    const iframe = document.getElementById('editorIframe') as HTMLIFrameElement;
    // console.log('iframe--', iframe);
    if (iframe) {
      const contentWindow = iframe.contentWindow;
      console.log('contentWindow', contentWindow);
      if (contentWindow) {
        const message = {
          functionName: 'setExamData',
          args: [
            {
              origin:
                '<div class="level7"><p><span style="">(1) 경쟁률이 </span><span style=""><span data-mathinfo="86,1000,2822,688;;empty" class="itexmath" contenteditable="false" data-latex="\\displaystyle 2.5\\,:\\,1" data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mstyle displaystyle=&quot;true&quot; scriptlevel=&quot;0&quot;><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mn>2.5</mn><mspace width=&quot;thinmathspace&quot; /><mspace width=&quot;thinmathspace&quot; /><mspace width=&quot;0.33em&quot; /><mo>:</mo><mspace width=&quot;0.33em&quot; /><mspace width=&quot;thinmathspace&quot; /><mspace width=&quot;thinmathspace&quot; /><mn>1</mn></mrow></mstyle></math>">\\(\\displaystyle 2.5\\,:\\,1\\)</span><span class="itex_eqn_dummy"></span></span><span style="">이므로 합격생 수는</span></p><p><span style="">&nbsp;&nbsp;&nbsp;&nbsp;<span data-mathinfo="66,1000,7140,2250;;{ { 600 TIMES  { 1 } over { 2.5 } =240 } }" class="itexmath" contenteditable="false" data-latex="\\displaystyle  { 600 \\times { \\dfrac { 1 } { 2.5 } } =240 } " data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mstyle displaystyle=&quot;true&quot; scriptlevel=&quot;0&quot;><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mn>600</mn><mo>&amp;#x00D7;</mo><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mstyle displaystyle=&quot;true&quot; scriptlevel=&quot;0&quot;><mfrac><mn>1</mn><mn>2.5</mn></mfrac></mstyle></mrow><mo>=</mo><mn>240</mn></mrow></mstyle></math>">\\(\\displaystyle  { 600 \\times { \\dfrac { 1 } { 2.5 } } =240 } \\)</span></span><span style="">(명)</span></p><p>(2) 입학 시험 성적이 <span data-mathinfo="86,1000,1050,975;;{ { 70 } }" class="itexmath" contenteditable="false" data-latex="\\displaystyle  { 70 } " data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mstyle displaystyle=&quot;true&quot; scriptlevel=&quot;0&quot;><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mn>70</mn></mrow></mstyle></math>">\\(\\displaystyle  { 70 } \\)</span>점 이상 <span data-mathinfo="86,1000,1050,975;;{ { 80 } }" class="itexmath" contenteditable="false" data-latex="\\displaystyle  { 80 } " data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mstyle displaystyle=&quot;true&quot; scriptlevel=&quot;0&quot;><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mn>80</mn></mrow></mstyle></math>">\\(\\displaystyle  { 80 } \\)</span>점 미만인 학생 수는</p><p>&nbsp;&nbsp;&nbsp;&nbsp;<span data-mathinfo="86,1000,18670,975;;{ { 600-(60+92+96+112+74+56)=110 } }" class="itexmath" contenteditable="false" data-latex="\\displaystyle  { 600-(60+92+96+112+74+56)=110 } " data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mstyle displaystyle=&quot;true&quot; scriptlevel=&quot;0&quot;><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mn>600</mn><mo>&amp;#x2212;</mo><mo stretchy=&quot;false&quot;>(</mo><mn>60</mn><mo>+</mo><mn>92</mn><mo>+</mo><mn>96</mn><mo>+</mo><mn>112</mn><mo>+</mo><mn>74</mn><mo>+</mo><mn>56</mn><mo stretchy=&quot;false&quot;>)</mo><mo>=</mo><mn>110</mn></mrow></mstyle></math>">\\(\\displaystyle  { 600-(60+92+96+112+74+56)=110 } \\)</span>(명)</p><p><span style="">(3) 입학 시험 성적이 </span><span style=""><span data-mathinfo="86,1000,1050,975;;{ { 70 } }" class="itexmath" contenteditable="false" data-latex="\\displaystyle  { 70 } " data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mstyle displaystyle=&quot;true&quot; scriptlevel=&quot;0&quot;><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mn>70</mn></mrow></mstyle></math>">\\(\\displaystyle  { 70 } \\)</span></span><span style="">점 이상인 학생 수는</span></p><p><span style="">&nbsp;&nbsp;&nbsp;&nbsp;<span data-mathinfo="86,1000,8705,975;;{ { 110+74+56=240 } }" class="itexmath" contenteditable="false" data-latex="\\displaystyle  { 110+74+56=240 } " data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mstyle displaystyle=&quot;true&quot; scriptlevel=&quot;0&quot;><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mn>110</mn><mo>+</mo><mn>74</mn><mo>+</mo><mn>56</mn><mo>=</mo><mn>240</mn></mrow></mstyle></math>">\\(\\displaystyle  { 110+74+56=240 } \\)</span></span><span style="">(명)</span></p><p><span style="">&nbsp;&nbsp;&nbsp;&nbsp;따라서 합격 점수는 </span><span style=""><span data-mathinfo="86,1000,1050,975;;{ { 70 } }" class="itexmath" contenteditable="false" data-latex="\\displaystyle  { 70 } " data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mstyle displaystyle=&quot;true&quot; scriptlevel=&quot;0&quot;><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mn>70</mn></mrow></mstyle></math>">\\(\\displaystyle  { 70 } \\)</span></span><span style="">점 이상이다. </span></p><p></p><p></p></div>',
            },
          ],
        };
        contentWindow.postMessage(message, 'http://43.201.205.140:40031/');
        setIsPostMessage(false);
      }
    }
  }, [isPostMessage]);

  // iframe 에디터에 데이터 가져올시
  useEffect(() => {
    const handleMessage = (event: { origin: string; data: any }) => {
      if (event.origin !== 'http://43.201.205.140:40031') {
        // console.warn('Received message from untrusted source:', event.origin);
        return;
      }
      console.log('parent message');
      console.log(event.data);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [isPostMessage]);

  return (
    <Container>
      <ContentsWrapper>
        <EditContainerWrapper>
          <PerfectScrollbar>
            <EditWrapper>
              <EditerOneFile type={type} setEditorData={setEditorData} />
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
                          onDefaultSelect={() =>
                            handleDefaultSelect(categoryTitles[6]?.code)
                          }
                          $positionTop
                          width={'110px'}
                          height={'30px'}
                          defaultValue={categoryTitles[6]?.code}
                          key={categoryTitles[6]?.code}
                          options={categoriesE[0]}
                          onSelect={(event) => selectCategoryOption(event)}
                          setSelectedValue={setSelectedSubject}
                        />
                      )}
                      {/* 과목 */}
                      {categoriesE && categoryTitles[7] && (
                        <Select
                          onDefaultSelect={() =>
                            handleDefaultSelect(categoryTitles[7]?.code)
                          }
                          $positionTop
                          width={'110px'}
                          height={'30px'}
                          defaultValue={categoryTitles[7]?.code}
                          key={categoryTitles[7]?.code}
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
                            handleDefaultSelect(categoryTitles[40]?.code)
                          }
                          $positionTop
                          width={'110px'}
                          height={'30px'}
                          defaultValue={categoryTitles[40]?.code}
                          key={categoryTitles[40]?.code}
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
                          onDefaultSelect={() =>
                            handleDefaultSelect(categoryTitles[41]?.code)
                          }
                          $positionTop
                          width={'110px'}
                          height={'30px'}
                          defaultValue={categoryTitles[41]?.code}
                          key={categoryTitles[41]?.code}
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
