import * as React from 'react';
import { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@tanstack/react-query';
import { BsArrowsMove, BsEyeSlash, BsEye } from 'react-icons/bs';
import { TbFilter, TbFilterOff } from 'react-icons/tb';
import styled from 'styled-components';

import { List, ListItem, Label, Button, Select, openToastifyAlert } from '..';
import { resourceServiceInstance } from '../../api/axios';
import { QuizListType, MenuDataListProps } from '../../types';
import { postRefreshToken } from '../../utils/tokenHandler';
import { COLOR } from '../constants';
import { SettingPageDnDWrapper } from '../molecules';

export function WorkbookCSATSetting() {
  const ContentListData = [
    {
      idx: 1,
      tag: '경시',
      school: '고등',
      grade: '1학년',
      name: '드림 고등학교',
      host: '서울교육청',
      subject: '수2',
      type: 'A타입',
      year: '2024',
      quizCount: '25',
    },
    {
      idx: 2,
      tag: '경시',
      school: '고등',
      grade: '2학년',
      name: '드림 고등학교',
      host: '서울교육청',
      subject: '수1',
      type: 'B타입',
      year: '2024',
      quizCount: '7',
    },
    {
      idx: 3,
      tag: '경시',
      school: '중등',
      grade: '1학년',
      name: '드림 고등학교',
      host: '서울교육청',
      subject: '미적분',
      type: 'A타입',
      year: '2024',
      quizCount: '100',
    },
    {
      idx: 4,
      tag: '경시',
      school: '중등',
      grade: '3학년',
      name: '드림 고등학교',
      host: '서울교육청',
      subject: '확률과 통계',
      type: 'B타입',
      year: '2024',
      quizCount: '9',
    },
    {
      idx: 5,
      tag: '학력평가',
      school: '고등',
      grade: '1학년',
      name: '드림 고등학교',
      host: '서울교육청',
      subject: '적분',
      type: 'A타입',
      year: '2024',
      quizCount: '5',
    },
    {
      idx: 6,
      tag: '학력평가',
      school: '중등',
      grade: '1학년',
      name: '드림 고등학교',
      host: '서울교육청',
      subject: '수1',
      type: 'B타입',
      year: '2024',
      quizCount: '17',
    },
    {
      idx: 7,
      tag: '학력평가',
      school: '고등',
      grade: '2학년',
      name: '드림 고등학교',
      host: '서울교육청',
      subject: '수2',
      type: 'A타입',
      year: '2024',
      quizCount: '10',
    },
  ];
  const CategoryDummy = [
    {
      idx: 1,
      title: '기출속성',
      isFilter: false,
      isDisplay: true,
      tag: '태그 선택',
    },
    {
      idx: 2,
      title: '학교급',
      isFilter: true,
      isDisplay: true,
      tag: '텍스트 입력',
    },
    {
      idx: 3,
      title: '학년',
      isFilter: true,
      isDisplay: true,
      tag: '태그 선택',
    },
    {
      idx: 4,
      title: '기출명',
      isFilter: true,
      isDisplay: true,
      tag: '태그 선택',
    },
    {
      idx: 5,
      title: '주관사',
      isFilter: false,
      isDisplay: true,
      tag: '태그 선택',
    },
    {
      idx: 6,
      title: '교과',
      isFilter: false,
      isDisplay: true,
      tag: '태그 선택',
    },
    {
      idx: 7,
      title: '과목',
      isFilter: false,
      isDisplay: true,
      tag: '태그 선택',
    },
    {
      idx: 8,
      title: '시험지 타입',
      isFilter: false,
      isDisplay: true,
      tag: '태그 선택',
    },
    {
      idx: 9,
      title: '기출년도',
      isFilter: false,
      isDisplay: true,
      tag: '태그 선택',
    },
  ];
  const SelectDummy = {
    tageClassList: [
      {
        idx: 1,
        name: '연습문제',
        code: '1',
      },
      {
        idx: 2,
        name: '일일테스트',
        code: '2',
      },
      {
        idx: 3,
        name: '모의고사',
        code: '3',
      },
      {
        idx: 4,
        name: '내신대비',
        code: '4',
      },
      {
        idx: 5,
        name: '월말테스트',
        code: '5',
      },
    ],
  };
  const [categoryList, setCategoryList] = useState<any[]>(CategoryDummy);
  const [isStartDnD, setIsStartDnd] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(''); //태그
  const [menuIdx, setMenuIdx] = useState<number | null>(null);
  const [menuDataList, setMenuDataList] = useState<MenuDataListProps[]>([]);

  // 로컬 스토리지에서 데이터 가져오기
  useEffect(() => {
    const fetchDataFromStorage = () => {
      const data = localStorage.getItem('sendMenuIdx');

      if (data) {
        try {
          const parsedData = JSON.parse(data);
          console.log('sendMenuIdx:', parsedData); // 디버깅용 콘솔 로그
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

  const whenDragEnd = (
    newList: {
      name: string;
      idx: number;
      search: boolean;
      view: boolean;
      type: string;
    }[],
    selectedValue: string,
  ) => {
    // 1. newList의 name 속성을 추출하여 문자열로 변환
    const newNamesString = newList.map((item) => item.name).join(',');
    const newSearchString = newList
      .map((item) => item.search.toString())
      .join(',');
    const newViewString = newList.map((item) => item.view.toString()).join(',');
    const newTypeString = newList.map((item) => item.type).join(',');

    // 2. menuDataList 업데이트
    setMenuDataList((prev) =>
      prev.map(
        (item) =>
          item.name === selectedValue
            ? {
                ...item,
                nameList: newNamesString,
                searchList: newSearchString,
                viewList: newViewString,
                typeList: newTypeString,
              }
            : item, // 기존 항목 유지
      ),
    );
  };

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

  const toggleView = (idx: number, isView: boolean) => {
    setMenuDataList((prev) => {
      // 선택된 항목을 필터링
      const filterList = prev.filter((el) => el.name === selectedValue);
      if (filterList.length > 0) {
        const viewList = filterList[0].viewList.split(',');

        // idx 위치의 값을 isView 값을 문자열로 업데이트
        viewList[idx] = isView.toString();

        // 업데이트된 viewList 배열을 문자열로 변환하여 할당
        const updatedViewList = viewList.join(',');

        // prev 배열의 해당 항목을 업데이트하여 새로운 배열로 반환
        return prev.map((item) =>
          item.name === selectedValue
            ? { ...item, viewList: updatedViewList }
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

  useEffect(() => {
    if (menuSettingData) {
      setMenuDataList(menuSettingData.data.data.detailList);
    }
  }, [menuSettingData]);

  //그룹 정보 업데이트 api
  const updateMenuInfo = async () => {
    const filterData = menuDataList.filter((el) => el.name === selectedValue);
    const data = {
      detailIdx: filterData[0].detailIdx,
      menuIdx: filterData[0].idx,
      groupCode: filterData[0].code,
      idxs: filterData[0].typeList,
      names: filterData[0].nameList,
      searchs: filterData[0].searchList,
      views: filterData[0].viewList,
    };
    return await resourceServiceInstance.put(`/v1/menu`, data);
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
    },
  });

  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <Title>학습지 등록/수정(기출{'>'}전국시험)</Title>
        </TitleWrapper>
        <MainWrapper>
          <SettingWrapper>
            <>
              <Label value={'설정'} width="100%" bold fontSize="20px" />
              <PageDescription>
                리스트에 노출되는 필터의 순서를 변경합니다.
              </PageDescription>
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
                  defaultValue="항목 선택"
                  key="그룹리스트"
                  options={menuDataList.slice().sort((a, b) => a.idx - b.idx)}
                  setSelectedValue={setSelectedValue}
                  isnormalizedOptions
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
                  <TbFilter
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      stroke: `${COLOR.PRIMARY}`,
                    }}
                  ></TbFilter>
                  <PageDescription>검색사용</PageDescription>
                  <BsEye
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      fill: `${COLOR.PRIMARY}`,
                    }}
                  ></BsEye>
                  <PageDescription>목록노출</PageDescription>
                </IconWrapper>
              </CategoryWrapper>
              <ContentListWrapper>
                <SettingPageDnDWrapper
                  dragList={menuDataList}
                  selectedValue={selectedValue}
                  onDragging={() => {}}
                  onDragEnd={whenDragEnd}
                  dragSectionName={'문항리스트세팅'}
                  isStartDnD={isStartDnD}
                  setIsStartDnd={setIsStartDnd}
                >
                  {(dragItem, ref, isDragging, itemIndex) => {
                    // dragItem과 그 속성들을 안전하게 접근하기 위해 옵셔널 체이닝 사용
                    return (
                      <ContentList ref={ref}>
                        <Content>
                          <div className="icon">
                            <BsArrowsMove
                              style={{
                                width: '20px',
                                height: '20px',
                                cursor: 'grab',
                              }}
                            ></BsArrowsMove>
                          </div>
                          <div className={`title-${true}`}>
                            {dragItem.name}
                            <div className="tag">태그선택</div>
                          </div>
                          {dragItem.search === undefined ? (
                            <div>null</div>
                          ) : (
                            <>
                              {dragItem.search ? (
                                <div className="icon">
                                  <TbFilter
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                      cursor: 'pointer',
                                      stroke: `${COLOR.PRIMARY}`,
                                    }}
                                    onClick={() => {
                                      toggleSearch(itemIndex, !dragItem.search);
                                    }}
                                  ></TbFilter>
                                </div>
                              ) : (
                                <div className="icon">
                                  <TbFilterOff
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                      cursor: 'pointer',
                                      stroke: `${COLOR.MUTE}`,
                                    }}
                                    onClick={() => {
                                      toggleSearch(itemIndex, !dragItem.search);
                                    }}
                                  ></TbFilterOff>
                                </div>
                              )}
                            </>
                          )}
                          {dragItem.view === undefined ? (
                            <div>null</div>
                          ) : (
                            <>
                              {dragItem.view ? (
                                <div className="icon">
                                  <BsEye
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                      cursor: 'pointer',
                                      fill: `${COLOR.PRIMARY}`,
                                    }}
                                    onClick={() => {
                                      toggleView(itemIndex, !dragItem.view);
                                    }}
                                  ></BsEye>
                                </div>
                              ) : (
                                <div className="icon">
                                  <BsEyeSlash
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                      cursor: 'pointer',
                                      fill: `${COLOR.MUTE}`,
                                    }}
                                    onClick={() => {
                                      toggleView(itemIndex, !dragItem.view);
                                    }}
                                  ></BsEyeSlash>
                                </div>
                              )}
                            </>
                          )}
                        </Content>
                      </ContentList>
                    );
                  }}
                </SettingPageDnDWrapper>
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
          </SettingWrapper>
          <ListWrapper>
            <SelectWrapper>
              {categoryList.map((category) => {
                if (category.isFilter) {
                  return (
                    <Select
                      width={'130px'}
                      defaultValue={category.title}
                      key={category.title}
                      isnormalizedOptions
                      //options={category.option}
                    />
                  );
                }
                return null; // displayedList가 false인 항목은 렌더링하지 않음
              })}
            </SelectWrapper>
            <List>
              {ContentListData.map((item: any) => (
                <ListItem key={item.code} isChecked={false} height={'100'}>
                  <ItemLayout>
                    <span>
                      <strong className="title">기출속성</strong>
                      <span className="width_20">{item.tag}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">학교급</strong>
                      <span className="width_20">{item.school}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">학년</strong>
                      <span className="width_20">{item.grade}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">기출명</strong>
                      <span className="width_20">{item.name}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">주관사</strong>
                      <span className="width_20">{item.host}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">과목</strong>
                      <span className="width_20">{item.subject}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">시험지 타입</strong>
                      <span className="width_20">{item.type}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">기출년도</strong>
                      <span className="width_20">{item.year}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">문항수</strong>
                      <span className="width_20">{item.quizCount}</span>
                    </span>
                  </ItemLayout>
                </ListItem>
              ))}
            </List>
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
  max-height: 480px; /* 컨테이너의 최대 높이 설정 */
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
const SelectWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  padding-bottom: 10px;
  .btn_title {
    padding-right: 5px;
  }
`;
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  background-color: ${COLOR.LIGHT_GRAY};
  padding: 10px;
`;
const ItemLayout = styled.span`
  display: flex;
  width: 100%;
  min-height: 40px;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  > span {
    display: flex;
    /* flex: 1 0 0; */
    justify-content: space-around;
    flex-wrap: wrap;
    word-break: break-all;
  }

  .title {
    width: 100%;
    font-weight: 600;
    margin-bottom: 2px;
  }
  .line {
    width: 1px;
    height: 15px;
    background-color: ${COLOR.BORDER_GRAY};
  }
  .width_5 {
    width: 5%;
  }
  .width_10 {
    width: 10%;
  }
  .width_20px {
    width: 20px;
  }
  .width_50 {
    width: 50%;
  }
`;
const ListDescription = styled.p`
  display: flex;
  justify-content: center;
  font-size: 12px;
  color: ${COLOR.PRIMARY};
  font-weight: bold;
`;
