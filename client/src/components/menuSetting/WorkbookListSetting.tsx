import * as React from 'react';
import { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@tanstack/react-query';
import { BsArrowsMove, BsEyeSlash, BsEye } from 'react-icons/bs';
import { LuFileSearch2 } from 'react-icons/lu';
import { SlOptionsVertical } from 'react-icons/sl';
import { TbFilter, TbFilterOff } from 'react-icons/tb';
import styled from 'styled-components';

import {
  List,
  ListItem,
  Icon,
  CheckBoxI,
  Label,
  Button,
  Select,
  openToastifyAlert,
} from '..';
import { resourceServiceInstance } from '../../api/axios';
import { WorksheetListType, MenuDataListProps } from '../../types';
import { postRefreshToken } from '../../utils/tokenHandler';
import { COLOR } from '../constants';
import { SettingPageDnDWrapper } from '../molecules';

type CategoryDummyType = {
  idx: number;
  title: string;
  isFilter: boolean;
  isDisplay: boolean;
};

// TODO api로 부터 카테고리값에 대한 부분 안보내고 있음, 변경사항 저장
export function WorkbookListSetting() {
  const WorkbookListData: WorksheetListType[] = [
    {
      code: '1',
      createdAt: '2024-04-01',
      createdBy: '',
      examiner: '홍길동',
      grade: '중1',
      idx: 1,
      isAutoGrade: true,
      isDelete: false,
      isFavorite: false,
      isUse: false,
      lastArticle: {
        createdAt: '',
        createdBy: '',
        extension: '.pdf',
        idx: 1,
        originalName: '',
        storedPath: '/usr/share/nginx/html/CB',
        type: 'PDF',
      },
      lastModifiedAt: '',
      lastModifiedBy: '',
      name: '드림원학원 내신대비 TEST',
      quizCnt: 0,
      tag: '연습문제',
      userKey: '',
    },
    {
      code: '2',
      createdAt: '2024-04-01',
      createdBy: '',
      examiner: '홍길동',
      grade: '성인',
      idx: 2,
      isAutoGrade: true,
      isDelete: false,
      isFavorite: false,
      isUse: false,
      lastArticle: {
        createdAt: '',
        createdBy: '',
        extension: '.pdf',
        idx: 1,
        originalName: '',
        storedPath: '/usr/share/nginx/html/CB',
        type: 'PDF',
      },
      lastModifiedAt: '',
      lastModifiedBy: '',
      name: '드림원학원 내신대비 TEST',
      quizCnt: 0,
      tag: '내신대비',
      userKey: '',
    },
    {
      code: '3',
      createdAt: '2024-04-01',
      createdBy: '',
      examiner: '홍길동',
      grade: '고1',
      idx: 3,
      isAutoGrade: true,
      isDelete: false,
      isFavorite: false,
      isUse: false,
      lastArticle: {
        createdAt: '',
        createdBy: '',
        extension: '.pdf',
        idx: 3,
        originalName: '',
        storedPath: '/usr/share/nginx/html/CB',
        type: 'PDF',
      },
      lastModifiedAt: '',
      lastModifiedBy: '',
      name: '드림원학원 내신대비 TEST',
      quizCnt: 0,
      tag: '연습문제',
      userKey: '',
    },
    {
      code: '4',
      createdAt: '2024-04-01',
      createdBy: '',
      examiner: '홍길동',
      grade: '초3',
      idx: 4,
      isAutoGrade: true,
      isDelete: false,
      isFavorite: false,
      isUse: false,
      lastArticle: {
        createdAt: '',
        createdBy: '',
        extension: '.pdf',
        idx: 4,
        originalName: '',
        storedPath: '/usr/share/nginx/html/CB',
        type: 'PDF',
      },
      lastModifiedAt: '',
      lastModifiedBy: '',
      name: '드림원학원 내신대비 TEST',
      quizCnt: 0,
      tag: '모의고사',
      userKey: '',
    },
    {
      code: '5',
      createdAt: '2024-04-01',
      createdBy: '',
      examiner: '홍길동',
      grade: '성인',
      idx: 5,
      isAutoGrade: true,
      isDelete: false,
      isFavorite: false,
      isUse: false,
      lastArticle: {
        createdAt: '',
        createdBy: '',
        extension: '.pdf',
        idx: 5,
        originalName: '',
        storedPath: '/usr/share/nginx/html/CB',
        type: 'PDF',
      },
      lastModifiedAt: '',
      lastModifiedBy: '',
      name: '드림원학원 내신대비 TEST',
      quizCnt: 0,
      tag: '연습문제',
      userKey: '',
    },
    {
      code: '6',
      createdAt: '2024-04-01',
      createdBy: '',
      examiner: '홍길동',
      grade: '고1',
      idx: 6,
      isAutoGrade: true,
      isDelete: false,
      isFavorite: false,
      isUse: false,
      lastArticle: {
        createdAt: '',
        createdBy: '',
        extension: '.pdf',
        idx: 6,
        originalName: '',
        storedPath: '/usr/share/nginx/html/CB',
        type: 'PDF',
      },
      lastModifiedAt: '',
      lastModifiedBy: '',
      name: '드림원학원 내신대비 TEST',
      quizCnt: 0,
      tag: '일일TEST',
      userKey: '',
    },
    {
      code: '7',
      createdAt: '2024-04-01',
      createdBy: '',
      examiner: '홍길동',
      grade: '고1',
      idx: 7,
      isAutoGrade: true,
      isDelete: false,
      isFavorite: false,
      isUse: false,
      lastArticle: {
        createdAt: '',
        createdBy: '',
        extension: '.pdf',
        idx: 7,
        originalName: '',
        storedPath: '/usr/share/nginx/html/CB',
        type: 'PDF',
      },
      lastModifiedAt: '',
      lastModifiedBy: '',
      name: '드림원학원 내신대비 TEST',
      quizCnt: 0,
      tag: '연습문제',
      userKey: '',
    },
  ];
  const CategoryDummy: CategoryDummyType[] = [
    {
      idx: 1,
      title: '대상학년',
      isFilter: false,
      isDisplay: true,
    },
    {
      idx: 2,
      title: '태그',
      isFilter: true,
      isDisplay: true,
    },
    {
      idx: 3,
      title: '학습지명',
      isFilter: true,
      isDisplay: true,
    },
    {
      idx: 4,
      title: '등록일',
      isFilter: true,
      isDisplay: true,
    },
    {
      idx: 5,
      title: '작성자',
      isFilter: false,
      isDisplay: true,
    },
  ];
  const [categoryList, setCategoryList] = useState<any[]>(CategoryDummy);
  const [isStartDnD, setIsStartDnd] = useState(false);
  const [selectedValue, setSelectedValue] =
    useState<string>('"단원카테고리조회'); //태그
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
          <Title>학습지 리스트</Title>
        </TitleWrapper>
        <MainWrapper>
          <SettingWrapper>
            <>
              <Label value={'설정'} width="100%" bold fontSize="20px" />
              <PageDescription>
                리스트에 노출되는 필터의 순서를 변경합니다.
              </PageDescription>
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
                          {/* null값이 없어지면 className={`title-${dragItem.view} 로 수정해야함 */}
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
              {menuDataList
                .filter((el) => el.name === selectedValue)
                .map((search) => {
                  const nameList = search.nameList.split(',');
                  const searchList = search.searchList
                    .split(',')
                    .map((item) => item.trim() === 'true');
                  console.log(searchList);
                  return (
                    <>
                      {nameList.map((el, idx) =>
                        searchList[idx] ? (
                          <Select
                            key={idx}
                            defaultValue={el}
                            width="130px"
                            isnormalizedOptions
                          ></Select>
                        ) : null,
                      )}
                    </>
                  );
                })}
            </SelectWrapper>
            <List>
              {WorkbookListData.map((item: any) => (
                <ListItem key={item.code} isChecked={false} height={'100'}>
                  <ItemLayout>
                    <CheckBoxI
                      id={item.code}
                      value={item.idx}
                      $margin={`0 5px 0 0`}
                      readOnly
                    />
                    <Icon
                      width={`18px`}
                      $margin={'0 0 0 12px'}
                      src={`/images/icon/favorites_off_B.svg`}
                    />
                    <i className="line"></i>
                    <span>
                      <strong className="title">대상학년</strong>
                      <span className="width_20">{item.grade}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">태그</strong>
                      <span className="width_20">{item.tag}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">학습지명</strong>
                      <span className="width_20">{item.name}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">등록일</strong>
                      <span className="width_20">{item.createdAt}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">작성자</strong>
                      <span className="width_20">{item.examiner}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">미리보기</strong>
                      <span className="width_20">
                        <LuFileSearch2
                          style={{ fontSize: '22px', cursor: 'pointer' }}
                        />
                      </span>
                    </span>
                    <i className="line"></i>
                    <span className="width_5 tooltip_wrapper ">
                      <strong className="title">설정</strong>
                      <span className="width_20">
                        <SlOptionsVertical
                          style={{ fontSize: '16px', cursor: 'pointer' }}
                        />
                      </span>
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
  padding: 10px;
  background-color: ${COLOR.LIGHT_GRAY};
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
