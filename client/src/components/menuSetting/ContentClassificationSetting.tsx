import * as React from 'react';
import { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@tanstack/react-query';
import { BiToggleLeft, BiToggleRight } from 'react-icons/bi';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  TabMenu,
  Label,
  Button,
  Select,
  openToastifyAlert,
  Icon,
  CheckBoxI,
  MathViewer,
} from '..';
import { resourceServiceInstance } from '../../api/axios';
import Image from '../../assets/images/ClassificationImg.png';
import { MyStaticWrapper } from '../../components/molecules/sortBox/Masonry';
import { pageAtom } from '../../store/utilAtom';
import { MenuDataListProps, QuizListType } from '../../types';
import { postRefreshToken } from '../../utils/tokenHandler';
import { COLOR } from '../constants';

export function ContentClassificationSetting() {
  const menuList = [
    {
      label: '단원분류',
      value: '단원분류',
    },
    {
      label: '추가정보',
      value: '추가정보',
    },
  ];
  const [tabVeiw, setTabVeiw] = useState<string>('단원분류'); //태그가 없어서 탭에 따라 카테고리 노출
  const [page, setPage] = useRecoilState(pageAtom);
  const [selectedValue, setSelectedValue] = useState<string>(''); //태그
  const [menuIdx, setMenuIdx] = useState<number | null>(null);
  const [menuDataList, setMenuDataList] = useState<MenuDataListProps[]>([]);
  const [menuExtraDataList, setMenuExtraDataList] = useState<
    MenuDataListProps[]
  >([]);
  const [detailIdx, setDetailIdx] = useState<string | null>(null);
  const [detailExtraIdx, setDetailExtraIdx] = useState<string | null>(null);

  const [columnsCount, setColumnsCount] = useState<number>(2);
  const [itemHeight, setItemHeight] = useState<string | undefined>('250px');
  useEffect(() => {}, [columnsCount, itemHeight]);
  const [processPreviousQuizListData, setProcessPreviousQuizListData] =
    useState<QuizListType[]>([
      {
        idx: 431,
        code: '67167126-794c-4767-b29f-6fdae8d456da',
        isFavorite: false,
        isUse: true,
        isDelete: false,
        isChecked: false,
        userKey: 'c676ca2f-874e-426e-bf56-07ea1bcbfa37',
        createdBy: 'c676ca2f-874e-426e-bf56-07ea1bcbfa37',
        createdAt: '2024-08-20 10:39:20',
        lastModifiedBy: 'c676ca2f-874e-426e-bf56-07ea1bcbfa37',
        lastModifiedAt: '2024-08-20 10:39:20',
        lastArticle: null,
        quizItemList: [
          {
            idx: 922,
            code: '0bf78fae-4ec0-451d-bd49-bdb10cb945e7',
            type: 'BIG',
            content:
              '<p class="tag_bigcontent" contenteditable="false">[대발문]</p><p class="0">다음에서 이용된 등식의 성질을 보기에서 고르시오<span lang="EN-US">. (</span>단<span lang="EN-US">, </span>더하거나 빼거나 곱하거나 나누는 수는 모두 자연수이다<span lang="EN-US">.)</span></p><div id="hwpEditorBoardContent" class="hwp_editor_board_content" data-hjsonver="1.0" data-jsonlen="5554"><p class="tag_exam" contenteditable="false">[문제]</p><p class="0">다음에서 이용된 등식의 성질을 보기에서 고르시오<span lang="EN-US">. (</span>단<span lang="EN-US">, </span>더하거나 빼거나 곱하거나 나누는 수는 모두 자연수이다<span lang="EN-US">.)</span></p><div id="hwpEditorBoardContent" class="hwp_editor_board_content" data-hjsonver="1.0" data-jsonlen="5554"><p class="tl_answer" contenteditable="false">[정답]</p><p class="0">다음에서 이용된 등식의 성질을 보기에서 고르시오<span lang="EN-US">. (</span>단<span lang="EN-US">, </span>더하거나 빼거나 곱하거나 나누는 수는 모두 자연수이다<span lang="EN-US">.)</span></p><div id="hwpEditorBoardContent" class="hwp_editor_board_content" data-hjsonver="1.0" data-jsonlen="5554"><br data-mce-bogus="1"></div></div></div>',
            sort: 1,
          },
        ],
        quizCategoryList: [
          {
            quizCategory: {
              과목: '올림피아드',
              교과: '수학',
              sources: [
                {
                  출처: '내신',
                  학교명: '가락고등학교',
                  내신배점: '45545',
                  내신형식: '수행평가',
                  문항번호: '46546',
                  출제년도: '2024',
                  학사일정: '겨울방학',
                  내신페이지: '45465',
                },
              ],
              난이도: '중',
              문항타입: '주관식',
            },
          },
        ],
        type: '',
        quizList: [],
      },
    ]);
  const [topSelect, setTopSelect] = useState<string>('대발문 + 지문 + 문제');

  const changeTab = () => {
    setPage(1);
  };

  useEffect(() => {
    const fetchDataFromStorage = () => {
      const data = localStorage.getItem('sendMenuIdx');

      if (data) {
        try {
          const parsedData = JSON.parse(data);
          //console.log('sendMenuIdx:', parsedData); // 디버깅용 콘솔 로그
          setMenuIdx(parsedData.idx);
          //localStorage.removeItem('sendMenuIdx');
        } catch (error) {
          console.error('로컬 스토리지 sendMenuIdx 파싱 에러:', error);
        }
      } else {
        console.log('로컬 스토리지에 sendMenuIdx 없습니다.');
      }
    };

    fetchDataFromStorage();

    const retryTimeout = setTimeout(fetchDataFromStorage, 3000); // 3초 후에 다시 시도

    return () => clearTimeout(retryTimeout);
  }, []);

  const toggleSearch = (idx: number, isSearch: boolean) => {
    setMenuDataList((prev) => {
      // 선택된 항목을 필터링
      const filterList = prev.filter((el) => el.name === selectedValue);
      if (filterList.length > 0) {
        const searchList = filterList[0].searchList.split(',');

        // idx 위치의 값을 isSearch 값을 문자열로 업데이트
        searchList[idx] = isSearch.toString();

        // 업데이트된 searchList 배열을 문자열로 변환하여 할당
        const updatedSearchList = searchList.join(',');

        // prev 배열의 해당 항목을 업데이트하여 새로운 배열로 반환
        return prev.map((item) =>
          item.name === selectedValue
            ? { ...item, searchList: updatedSearchList }
            : item,
        );
      }

      return prev;
    });
  };

  //그룹 화면설정 정보 불러오기 api
  const getMenuSetting = async () => {
    const res = await resourceServiceInstance.get(`/v1/menu/${menuIdx}`);
    //console.log(res);
    return res;
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
    enabled: menuIdx !== null,
  });

  useEffect(() => {
    if (menuIdx) {
      menuSettingRefetch();
    }
  }, [menuIdx]);

  //값을 받아왔을때 상태관리
  useEffect(() => {
    if (menuSettingData) {
      const updatedData = menuSettingData.data.data.detailList.map(
        (item: any) => {
          const nameListArray = item.nameList?.split(',') || [];

          const searchListArray = item.searchList
            ? item.searchList.split(',').map((el: any) => el === 'true')
            : Array(nameListArray.length).fill(false);

          const viewListArray = item.viewList
            ? item.viewList.split(',').map((el: any) => el === 'true')
            : Array(nameListArray.length).fill(false);
          const searchListString = searchListArray.join(',');
          const viewListString = viewListArray.join(',');

          return {
            ...item,
            searchList: searchListString,
            viewList: viewListString,
          };
        },
      );

      setMenuDataList(updatedData);
    }
  }, [menuSettingData]);

  useEffect(() => {
    if (menuSettingData) {
      const filterList = menuSettingData.data.data.detailList.filter(
        (el: any) => el.isCheck === true,
      );
      const findName = filterList[0]?.name;
      const detailIdx = filterList[0]?.detailIdx;
      setSelectedValue(findName);
      setDetailIdx(detailIdx);
    }
  }, [menuSettingData]);

  //그룹 화면설정 정보 불러오기 api
  const getMenuExtraSetting = async () => {
    const res = await resourceServiceInstance.get(`/v1/menu/extra/${menuIdx}`);
    //console.log(res);
    return res;
  };
  const {
    data: menuSettingExtraData,
    isLoading: isMenuSettingExtraLoading,
    refetch: menuSettingExtraRefetch,
  } = useQuery({
    queryKey: ['get-menuExtraSetting'],
    queryFn: getMenuExtraSetting,
    meta: {
      errorMessage: 'get-menuExtraSetting 에러 메세지',
    },
    enabled: menuIdx !== null,
  });

  //추가정보 값을 받아왔을때 상태관리
  useEffect(() => {
    if (menuSettingExtraData) {
      const updatedData = menuSettingExtraData.data.data.detailList.map(
        (item: any) => {
          const nameListArray = item.nameList?.split(',') || [];

          const searchListArray = item.searchList
            ? item.searchList.split(',').map((el: any) => el === 'true')
            : Array(nameListArray.length).fill(false);

          const viewListArray = item.viewList
            ? item.viewList.split(',').map((el: any) => el === 'true')
            : Array(nameListArray.length).fill(false);
          const searchListString = searchListArray.join(',');
          const viewListString = viewListArray.join(',');

          return {
            ...item,
            searchList: searchListString,
            viewList: viewListString,
          };
        },
      );

      setMenuExtraDataList(updatedData);
    }
  }, [menuSettingExtraData]);

  useEffect(() => {
    if (menuSettingExtraData) {
      const filterList = menuSettingExtraData.data.data.detailList.filter(
        (el: any) => el.isCheck === true,
      );
      const detailIdx = filterList[0]?.detailIdx;
      setDetailExtraIdx(detailIdx);
    }
  }, [menuSettingExtraData]);

  const toggleExtraSearch = (idx: number, isSearch: boolean) => {
    setMenuExtraDataList((prev) => {
      // 선택된 항목을 필터링
      const filterList = prev.filter((el) => el.name === '추가정보');
      console.log(filterList);
      if (filterList.length > 0) {
        const searchList = filterList[0].searchList.split(',');
        console.log(searchList);

        // idx 위치의 값을 isSearch 값을 문자열로 업데이트
        searchList[idx] = isSearch.toString();

        // 업데이트된 searchList 배열을 문자열로 변환하여 할당
        const updatedSearchList = searchList.join(',');
        console.log(updatedSearchList);

        // prev 배열의 해당 항목을 업데이트하여 새로운 배열로 반환
        return prev.map((item) =>
          item.name === '추가정보'
            ? { ...item, searchList: updatedSearchList }
            : item,
        );
      }

      return prev;
    });
  };

  //그룹 정보 업데이트 api
  const updateMenuInfo = async () => {
    if (tabVeiw === '단원분류') {
      const filterData = menuDataList.filter((el) => el.name === selectedValue);
      const data = {
        detailIdx: detailIdx ? detailIdx : 'null',
        menuIdx: menuIdx,
        groupCode: filterData[0].code,
        idxs: filterData[0].typeList,
        names: filterData[0].nameList,
        searchs: filterData[0].searchList,
        views: filterData[0].viewList,
        inputs: filterData[0].inputTypeList,
        isExtra: false,
      };
      return await resourceServiceInstance.put(`/v1/menu`, data);
    } else {
      const filterData = menuExtraDataList.filter(
        (el) => el.name === '추가정보',
      );
      const data = {
        detailIdx: detailExtraIdx ? detailExtraIdx : 'null',
        menuIdx: menuIdx,
        groupCode: filterData[0].code,
        idxs: filterData[0].typeList,
        names: filterData[0].nameList,
        searchs: filterData[0].searchList,
        views: filterData[0].viewList,
        inputs: filterData[0].inputTypeList,
        isExtra: true,
      };
      return await resourceServiceInstance.put(`/v1/menu`, data);
    }
  };
  const { mutate: updateMenuInfoData } = useMutation({
    mutationFn: updateMenuInfo,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: '잠시후 다시 시도해주세요',
      });
      if (context.response.data.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response) => {
      //저장 알람
      openToastifyAlert({
        type: 'success',
        text: '저장되었습니다.',
      });
      //그룹 리스트 재호출
      menuSettingRefetch();
      //추가정보 리스트 재호출
      menuSettingExtraRefetch();
    },
  });

  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <Title>문항 등록/수정(문항 분류)</Title>
        </TitleWrapper>
        <MainWrapper>
          <SettingWrapper>
            <>
              <TabWrapper>
                <TabMenu
                  length={2}
                  menu={menuList}
                  width={'400px'}
                  lineStyle
                  selected={tabVeiw}
                  setTabVeiw={setTabVeiw}
                  onClickTab={changeTab}
                />
              </TabWrapper>
              <Label value={'설정'} width="100%" bold fontSize="20px" />
              <PageDescription>
                리스트에 노출되는 필터의 순서를 변경합니다.
              </PageDescription>

              {tabVeiw === '단원분류' && (
                <>
                  <Label
                    value={'그룹'}
                    width="100%"
                    bold
                    fontSize="14px"
                    padding="10px 0 10px 5px"
                  />
                  {menuDataList && (
                    <Select
                      width={'100%'}
                      defaultValue={selectedValue}
                      key="그룹리스트"
                      options={menuDataList
                        .slice()
                        .sort((a, b) => a.idx - b.idx)}
                      setSelectedValue={setSelectedValue}
                      isnormalizedOptions
                      heightScroll="400px"
                    />
                  )}
                  <CategoryWrapper>
                    <Label
                      value={'카테고리'}
                      width="100%"
                      bold
                      fontSize="14px"
                      padding="10px 0 10px 5px"
                    />
                    <IconWrapper>
                      <BiToggleRight
                        style={{
                          width: '18px',
                          height: '18px',
                          cursor: 'pointer',
                          fill: `${COLOR.PRIMARY}`,
                        }}
                      ></BiToggleRight>
                      <PageDescription>필수값설정</PageDescription>
                    </IconWrapper>
                  </CategoryWrapper>
                  <ContentListWrapper>
                    {menuDataList && (
                      <>
                        {(() => {
                          const filterList = menuDataList?.filter(
                            (el) => el.name === selectedValue,
                          );
                          const nameList = filterList[0]?.nameList?.split(',');
                          const inputTypeList =
                            filterList[0]?.inputTypeList?.split(',');
                          const searchList = filterList[0]?.searchList
                            ?.split(',')
                            .map((item) => item.trim() === 'true');

                          // 필터링된 카테고리가 존재할 때만 option을 렌더링
                          if (nameList) {
                            return nameList.map((item, i) => (
                              <ContentList key={i}>
                                <Content>
                                  <div className={`title-${true}`}>
                                    {item}
                                    <div className="tag">
                                      {inputTypeList[i]}
                                    </div>
                                  </div>
                                  <div className="icon">
                                    {searchList[i] ? (
                                      <BiToggleRight
                                        style={{
                                          width: '20px',
                                          height: '20px',
                                          cursor: 'pointer',
                                          fill: `${COLOR.PRIMARY}`,
                                        }}
                                        onClick={() => {
                                          toggleSearch(i, !searchList[i]);
                                        }}
                                      />
                                    ) : (
                                      <BiToggleLeft
                                        style={{
                                          width: '20px',
                                          height: '20px',
                                          cursor: 'pointer',
                                          fill: `${COLOR.MUTE}`,
                                        }}
                                        onClick={() => {
                                          toggleSearch(i, !searchList[i]);
                                        }}
                                      />
                                    )}
                                  </div>
                                </Content>
                              </ContentList>
                            ));
                          }
                        })()}
                      </>
                    )}
                  </ContentListWrapper>
                  <Button
                    height={'40px'}
                    width={'100%'}
                    onClick={() => updateMenuInfoData()}
                    fontSize="13px"
                    $margin="20px 0 0 0"
                    $filled
                    cursor
                  >
                    변경사항 저장
                  </Button>
                </>
              )}
              {tabVeiw === '추가정보' && (
                <>
                  <CategoryWrapper>
                    <Label
                      value={'카테고리'}
                      width="100%"
                      bold
                      fontSize="14px"
                      padding="10px 0 10px 5px"
                    />
                    <IconWrapper>
                      <BiToggleRight
                        style={{
                          width: '18px',
                          height: '18px',
                          cursor: 'pointer',
                          fill: `${COLOR.PRIMARY}`,
                        }}
                      ></BiToggleRight>
                      <PageDescription>필수값설정</PageDescription>
                    </IconWrapper>
                  </CategoryWrapper>
                  <ContentListWrapper>
                    {menuExtraDataList && (
                      <>
                        {(() => {
                          const filterList = menuExtraDataList?.filter(
                            (el) => el.name === '추가정보',
                          );
                          const nameList = filterList[0]?.nameList?.split(',');
                          const inputTypeList =
                            filterList[0]?.inputTypeList?.split(',');
                          const searchList = filterList[0]?.searchList
                            ?.split(',')
                            .map((item) => item.trim() === 'true');

                          // 필터링된 카테고리가 존재할 때만 option을 렌더링
                          if (nameList) {
                            return nameList.map((item, i) => (
                              <ContentList key={i}>
                                <Content>
                                  <div className={`title-${true}`}>
                                    {item}
                                    <div className="tag">
                                      {inputTypeList[i]}
                                    </div>
                                  </div>
                                  <div className="icon">
                                    {searchList[i] ? (
                                      <BiToggleRight
                                        style={{
                                          width: '20px',
                                          height: '20px',
                                          cursor: 'pointer',
                                          fill: `${COLOR.PRIMARY}`,
                                        }}
                                        onClick={() => {
                                          toggleExtraSearch(i, !searchList[i]);
                                        }}
                                      />
                                    ) : (
                                      <BiToggleLeft
                                        style={{
                                          width: '20px',
                                          height: '20px',
                                          cursor: 'pointer',
                                          fill: `${COLOR.MUTE}`,
                                        }}
                                        onClick={() => {
                                          toggleExtraSearch(i, !searchList[i]);
                                        }}
                                      />
                                    )}
                                  </div>
                                </Content>
                              </ContentList>
                            ));
                          }
                        })()}
                      </>
                    )}
                  </ContentListWrapper>
                  <Button
                    height={'40px'}
                    width={'100%'}
                    onClick={() => updateMenuInfoData()}
                    fontSize="13px"
                    $margin="20px 0 0 0"
                    $filled
                    cursor
                  >
                    변경사항 저장
                  </Button>
                </>
              )}
            </>
          </SettingWrapper>
          <ListWrapper>
            <ClassificationWrapper>
              <ScrollWrapper className="items_height">
                <PerfectScrollbar>
                  <MyStaticWrapper
                    columnsCount={columnsCount}
                    padding="5px"
                    gap="5px"
                  >
                    {Array.from({ length: 6 }, (_, i) => (
                      <>
                        {processPreviousQuizListData.map((quiz, index) => (
                          <ItemWrapper key={quiz.idx} height={itemHeight}>
                            <TopButtonWrapper>
                              <div>
                                <CheckBoxI
                                  $margin={'0 5px 0 0'}
                                  readOnly
                                  // onClick={() =>
                                  //   toggleCheckPartialPreviousQuiz(
                                  //     quiz.code,
                                  //     quiz.isChecked as boolean,
                                  //   )
                                  // }
                                  checked={quiz.isChecked || false}
                                  id={quiz.code}
                                  value={quiz.code}
                                />
                                <span className={`title_top`}>
                                  {`${0} 건`}
                                  <Icon
                                    //onClick={() => openViewer(quiz.code)}
                                    width={`15px`}
                                    src={`/images/icon/entypo_popup.svg`}
                                  />
                                </span>
                              </div>
                              <span>
                                {quiz.quizCategoryList[0] && (
                                  <span
                                    className={`${quiz.quizCategoryList[0].quizCategory?.문항타입 == '객관식' && 'green'} 
                                 ${quiz.quizCategoryList[0].quizCategory?.문항타입 == '주관식' && 'yellow'} tag`}
                                  >
                                    {
                                      quiz.quizCategoryList[0].quizCategory
                                        ?.문항타입
                                    }{' '}
                                  </span>
                                )}
                              </span>
                            </TopButtonWrapper>
                            {/* 뷰어 영역 */}
                            <div className="quiz_wrap">
                              {quiz?.quizItemList?.map((el) => {
                                const contentOnly = ['QUESTION'];
                                const contentWithBig = [
                                  'BIG',
                                  'TEXT',
                                  'QUESTION',
                                ];
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
                                  <div
                                    key={`${el?.code} quizItemList sortedList`}
                                  >
                                    {topSelect === '문제만 보기' &&
                                      contentOnly.includes(el?.type) &&
                                      el?.content && (
                                        <MathViewer
                                          data={el.content}
                                        ></MathViewer> //topSelect
                                      )}
                                    {topSelect === '대발문 + 지문 + 문제' &&
                                      contentWithBig.includes(el?.type) &&
                                      el?.content && (
                                        <MathViewer
                                          data={el.content}
                                        ></MathViewer> //topSelect
                                      )}
                                    {topSelect === '문제 + 정답 + 해설' &&
                                      contentWithAnswer.includes(el?.type) &&
                                      el?.content && (
                                        <MathViewer
                                          data={el.content}
                                        ></MathViewer> //topSelect
                                      )}
                                    {topSelect ===
                                      '대발문 + 지문 + 문제 + 정답 + 해설' &&
                                      contentWithAll.includes(el?.type) &&
                                      el?.content && (
                                        <MathViewer
                                          data={el.content}
                                        ></MathViewer> //topSelect
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
                                    {item.quizCategory?.과목}/
                                    {item.quizCategory?.교과}/
                                    {item.quizCategory?.학년}/
                                    {item.quizCategory?.학기}/
                                    {item.quizCategory?.대단원?.split('^^^')[0]}
                                    /
                                    {item.quizCategory?.중단원?.split('^^^')[0]}
                                    /
                                    {item.quizCategory?.소단원?.split('^^^')[0]}
                                    /{item.quizCategory?.유형?.split('^^^')[0]}
                                  </span>
                                ))
                              ) : (
                                <span>(분류없음)</span>
                              )}
                            </div>
                          </ItemWrapper>
                        ))}
                      </>
                    ))}
                  </MyStaticWrapper>
                </PerfectScrollbar>
              </ScrollWrapper>

              <SelectWrapper>
                <SubtitleWrapper>
                  <Label
                    value={'문항 단원분류'}
                    width="100%"
                    padding="0"
                    bold
                    fontSize="20px"
                  />
                </SubtitleWrapper>
                {(() => {
                  const filterList = menuDataList?.filter(
                    (el) => el.name === selectedValue,
                  );
                  const nameList = filterList[0]?.nameList?.split(',');
                  const essentialList = filterList[0]?.searchList
                    ?.split(',')
                    .map((item) => item.trim() === 'true');
                  if (nameList) {
                    return (
                      <LabelWrapper>
                        {nameList.map((name, i) => (
                          <LabelWithButton key={i}>
                            <Label
                              value={essentialList[i] ? `${name}*` : name}
                              width="80px"
                              bold
                              fontSize="14px"
                            />
                            {i === 0 && (
                              <ButtonWrapper>
                                <Button
                                  width="90px"
                                  height="30px"
                                  $normal
                                  fontSize="14px"
                                >
                                  <span>버튼</span>
                                </Button>
                                <Button
                                  width="90px"
                                  height="30px"
                                  $normal
                                  fontSize="14px"
                                >
                                  <span>버튼</span>
                                </Button>
                                <Button
                                  width="90px"
                                  height="30px"
                                  $normal
                                  fontSize="14px"
                                >
                                  <span>버튼</span>
                                </Button>
                              </ButtonWrapper>
                            )}
                          </LabelWithButton>
                        ))}
                      </LabelWrapper>
                    );
                  }
                })()}
                <Label
                  value={'추가정보'}
                  width="100%"
                  padding="20px 10px 10px 10px"
                  bold
                  fontSize="20px"
                />
                {(() => {
                  const filterList = menuExtraDataList?.filter(
                    (el) => el.name === '추가정보',
                  );
                  const nameList = filterList[0]?.nameList?.split(',');
                  const essentialList = filterList[0]?.searchList
                    ?.split(',')
                    .map((item) => item.trim() === 'true');
                  if (nameList) {
                    return (
                      <LabelWrapper>
                        {nameList.map((name, i) => (
                          <LabelWithButton key={i}>
                            <Label
                              value={essentialList[i] ? `${name}*` : name}
                              width="80px"
                              bold
                              fontSize="14px"
                            />
                            {i === 0 && (
                              <ButtonWrapper>
                                <Button
                                  width="90px"
                                  height="30px"
                                  $normal
                                  fontSize="14px"
                                >
                                  <span>계산</span>
                                </Button>
                                <Button
                                  width="90px"
                                  height="30px"
                                  $normal
                                  fontSize="14px"
                                >
                                  <span>이해</span>
                                </Button>
                                <Button
                                  width="90px"
                                  height="30px"
                                  $normal
                                  fontSize="14px"
                                >
                                  <span>추론</span>
                                </Button>
                              </ButtonWrapper>
                            )}
                            {i === 1 && (
                              <ButtonWrapper>
                                <Button
                                  width="90px"
                                  height="30px"
                                  $normal
                                  fontSize="14px"
                                >
                                  <span>문제해결</span>
                                </Button>
                              </ButtonWrapper>
                            )}
                          </LabelWithButton>
                        ))}
                      </LabelWrapper>
                    );
                  }
                })()}
              </SelectWrapper>
            </ClassificationWrapper>
            <ListDescription>
              화면에 보이는 데이터는 예시로 구성된 데이터 입니다. 실제
              화면에서는 적용된 데이터로 확인하실 수 있습니다.
            </ListDescription>
          </ListWrapper>
        </MainWrapper>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 40px 40px 40px;
  width: 100%;
  height: 100%;
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
`;
const Title = styled.div`
  font-size: 30px;
`;
const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;
const SettingWrapper = styled.div`
  width: 30%;
  background-color: ${COLOR.LIGHT_GRAY};
  padding: 10px;
  min-height: 809px;
`;
const TabWrapper = styled.div`
  width: 100%;
  padding: 10px 0px;
  display: flex;
  justify-content: center;
`;
const PageDescription = styled.p`
  font-size: 12px;
  color: ${COLOR.FONT_GRAY};
  font-weight: bold;
`;
const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const IconWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
  justify-content: flex-end;
  p {
    padding-right: 5px;
  }
`;
const ContentListWrapper = styled.div`
  max-height: 483px; /* 컨테이너의 최대 높이 설정 */
  overflow-y: auto; /* 수직 스크롤바 표시 */
`;
const ContentList = styled.li`
  border-top: 1px solid ${COLOR.BORDER_GRAY};
  background-color: white;
  &:last-child {
    border-bottom: 1px solid ${COLOR.BORDER_GRAY};
  }
`;
const Content = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: space-around;
  gap: 10px;
  padding: 10px 0;

  .title-true {
    display: flex;
    justify-content: flex-start;
    width: 70%;
  }
  .title-false {
    display: flex;
    justify-content: flex-start;
    width: 70%;
    color: ${COLOR.FONT_GRAY};
  }
  .tag {
    display: flex;
    font-size: 12px;
    color: ${COLOR.FONT_GRAY};
    justify-content: flex-start;
    align-items: end;
    width: 50%;
    padding-left: 10px;
  }
  .icon {
    display: flex;
    justify-content: center;
    width: 10%;
  }
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  background-color: ${COLOR.LIGHT_GRAY};
`;
const ClassificationWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${COLOR.BORDER_GRAY};
`;
const ScrollWrapper = styled.div`
  overflow-y: auto;
  max-height: 760px;
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
const ImgWrapper = styled.div`
  width: 60%;
`;
const SelectWrapper = styled.div`
  width: 40%;
  margin-top: 10px;
  margin-right: 10px;
  border-left: 1px solid ${COLOR.BORDER_GRAY};
  display: flex;
  flex-direction: column;
  background-color: white;
`;
const SubtitleWrapper = styled.div`
  padding: 10px;
  border-bottom: 1px solid ${COLOR.BORDER_GRAY};
`;
const LabelWrapper = styled.div`
  min-height: 550px;
  max-height: 550px; /* 컨테이너의 최대 높이 설정 */
  overflow-y: auto; /* 수직 스크롤바 표시 */
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid ${COLOR.BORDER_GRAY};

  &:last-child {
    border-bottom: none;
    min-height: 0;
  }
`;
const LabelWithButton = styled.div`
  display: flex;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const ButtonBox = styled.div`
  padding: 10px;
  background-color: ${COLOR.LIGHT_GRAY};
  display: flex;
  flex-direction: column;
  gap: 10px;
  div {
    width: 230px;
    border: 1px dotted ${COLOR.BORDER_GRAY};
    background-color: white;
    padding-left: 10px;
    color: ${COLOR.FONT_GRAY};
  }
  :nth-child(2) {
    margin-left: 30px;
  }
  :nth-child(3) {
    margin-left: 60px;
  }
  :nth-child(4) {
    margin-left: 90px;
  }
  :nth-child(5) {
    margin-left: 120px;
  }
  :nth-child(6) {
    margin-left: 150px;
  }
`;
const ListDescription = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: ${COLOR.PRIMARY};
  font-weight: bold;
  padding: 10px;
`;
