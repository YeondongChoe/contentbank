import * as React from 'react';
import { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@tanstack/react-query';
import { BsArrowsMove, BsEyeSlash, BsEye } from 'react-icons/bs';
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
import { MenuDataListProps } from '../../types';
import { postRefreshToken } from '../../utils/tokenHandler';
import { COLOR } from '../constants';
import { SettingPageDnDWrapper } from '../molecules';

export function InspectionManagementSetting() {
  const [isStartDnD, setIsStartDnd] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(''); //태그
  const [menuIdx, setMenuIdx] = useState<number | null>(null);
  const [menuDataList, setMenuDataList] = useState<MenuDataListProps[]>([]);
  const [detailIdx, setDetailIdx] = useState<string | null>(null);

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
      input: string;
    }[],
    selectedValue: string,
  ) => {
    // 1. newList의 name 속성을 추출하여 문자열로 변환
    const newNamesString = newList.map((item) => item.name).join(',');
    const newSearchString = newList
      .map((item) => item.search.toString())
      .join(',');
    const newInputTypeString = newList.map((item) => item.input).join(',');
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
                inputTypeList: newInputTypeString,
              }
            : item, // 기존 항목 유지
      ),
    );
  };

  //목록노출이 비활성화일때 검색사용은 불가
  const handleToggleSearch = () => {
    openToastifyAlert({
      type: 'error',
      text: '목록노출이 비활성화일때는 사용할 수 없습니다',
    });
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
        const searchList = filterList[0].searchList.split(',');

        // idx 위치의 값을 isView 값을 문자열로 업데이트
        viewList[idx] = isView.toString();

        //노출목록이 false일때 검색사용도 false
        if (!isView) {
          searchList[idx] = 'false';
        }

        // 업데이트된 viewList와 searchList 배열을 문자열로 변환하여 할당
        const updatedViewList = viewList.join(',');
        const updatedSearchList = searchList.join(',');

        // prev 배열의 해당 항목을 업데이트하여 새로운 배열로 반환
        return prev.map((item) =>
          item.name === selectedValue
            ? {
                ...item,
                viewList: updatedViewList,
                searchList: updatedSearchList,
              }
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

  //그룹 정보 업데이트 api
  const updateMenuInfo = async () => {
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
          <Title>검수관리 리스트</Title>
        </TitleWrapper>
        <MainWrapper>
          <SettingWrapper>
            <div>
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
                  defaultValue={selectedValue}
                  key="그룹리스트"
                  options={menuDataList.slice().sort((a, b) => a.idx - b.idx)}
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
                          <div className={`title-${dragItem.view}`}>
                            {dragItem.name}
                            <div className="tag">{dragItem.input}</div>
                          </div>
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
                                  dragItem.view === true
                                    ? toggleSearch(itemIndex, !dragItem.search)
                                    : handleToggleSearch();
                                }}
                              ></TbFilterOff>
                            </div>
                          )}
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
            </div>
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
            <List margin={`10px 0 5px 0`} height="none">
              {menuDataList
                .filter((list) => list.name === selectedValue)
                .flatMap((item) => {
                  const nameList = item.nameList?.split(',');
                  const essentialList = item.viewList
                    ?.split(',')
                    .map((item) => item.trim() === 'true');

                  return (
                    <ListItem isChecked={false} columnTitle>
                      <ItemLayout>
                        <CheckBoxI
                          id={''}
                          value={''}
                          $margin={`0 5px 0 0`}
                          readOnly
                        />
                        {nameList.map((name, i) => (
                          <>
                            {essentialList[i] && (
                              <>
                                <i className="line"></i>
                                <span>
                                  <strong>{name}</strong>
                                </span>
                              </>
                            )}
                          </>
                        ))}
                        <i className="line"></i>
                        <span>
                          <strong>담당자</strong>
                        </span>
                        <i className="line"></i>
                        <span>
                          <strong>등록일자</strong>
                        </span>
                        <i className="line"></i>
                        <span>
                          <strong>프로세스(단계)</strong>
                        </span>
                        <i className="line"></i>
                        <span>
                          <strong>상태</strong>
                        </span>
                      </ItemLayout>
                    </ListItem>
                  );
                })}
            </List>
            <List>
              {menuDataList
                .filter((list) => list.name === selectedValue)
                .flatMap((item) => {
                  const nameList = item.nameList?.split(',');
                  const essentialList = item.viewList
                    ?.split(',')
                    .map((item) => item.trim() === 'true');
                  const array = 5;

                  return Array.from({ length: array }).map((_, idx) => (
                    <ListItem
                      key={`${item.idx}-${idx}`}
                      isChecked={false}
                      height={'100px'}
                    >
                      <ItemLayout>
                        <CheckBoxI
                          id={item.code}
                          value={item.idx}
                          $margin={`0 5px 0 0`}
                          readOnly
                        />
                        {nameList.map((name, i) => (
                          <>
                            {essentialList[i] && (
                              <>
                                <i className="line"></i>
                                <span>
                                  <span>정보</span>
                                </span>
                              </>
                            )}
                          </>
                        ))}
                        <i className="line"></i>
                        <span>김드림</span>
                        <i className="line"></i>
                        <span>2024.08.29</span>
                        <i className="line"></i>
                        <span>
                          수학 알바1<br></br>(검수)
                        </span>
                        <i className="line"></i>
                        <span>보류</span>
                      </ItemLayout>
                    </ListItem>
                  ));
                })}
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
  max-height: 485px; /* 컨테이너의 최대 높이 설정 */
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
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  .tooltip_wrapper {
    position: relative;
  }

  /* 두줄 이상 ellipsis 처리  */
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .title {
    width: 100%;
    font-weight: 600;
    margin-bottom: 2px;
  }
  .tag {
    margin: 0 5px;
    padding: 3px 5px;
    border-radius: 5px;
    background-color: ${COLOR.BORDER_GRAY};
  }
  .tag_s {
    font-weight: bold;
    font-size: 12px;
    padding: 2px;
    border-radius: 5px;
    background-color: ${COLOR.BORDER_GRAY};
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
  .width_50px {
    width: 50px;
  }
  .width_60px {
    width: 60px;
  }
  .width_80px {
    width: 80px;
  }
`;
const ListDescription = styled.p`
  display: flex;
  justify-content: center;
  font-size: 12px;
  color: ${COLOR.PRIMARY};
  font-weight: bold;
`;
