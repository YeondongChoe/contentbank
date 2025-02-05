import * as React from 'react';
import { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@tanstack/react-query';
import { BiToggleLeft, BiToggleRight } from 'react-icons/bi';
import styled from 'styled-components';

import { Label, Button, Select, openToastifyAlert } from '..';
import { resourceServiceInstance } from '../../api/axios';
import Image from '../../assets/images/Step1.png';
import { MenuDataListProps } from '../../types';
import { postRefreshToken } from '../../utils/tokenHandler';
import { COLOR } from '../constants';

export function WorkbookClassificationSetting() {
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
          <Title>학습지 등록/수정(단원유형별)</Title>
        </TitleWrapper>
        <MainWrapper>
          <SettingWrapper>
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
                {menuDataList && (
                  <>
                    {/* selectedValue와 일치하는 필터된 카테고리 찾기 */}
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
                              <div className={`title-${searchList[i]}`}>
                                {item}
                                <div className="tag">{inputTypeList[i]}</div>
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
          </SettingWrapper>
          <ListWrapper>
            <ClassificationWrapper>
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
              </SelectWrapper>
              <ImgWrapper>
                <img
                  src={Image}
                  alt="editer"
                  style={{
                    borderTopLeftRadius: '15px',
                    borderTopRightRadius: '15px',
                    padding: '10px',
                  }}
                />
              </ImgWrapper>
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
  max-height: 500px; /* 컨테이너의 최대 높이 설정 */
  overflow-y: auto; /* 수직 스크롤바 표시 */
`;
const ContentList = styled.li`
  background-color: white;
`;
const Content = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: space-around;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid ${COLOR.BORDER_GRAY};

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
const ImgWrapper = styled.div`
  width: 60%;
`;
const SelectWrapper = styled.div`
  max-height: 708px; /* 컨테이너의 최대 높이 설정 */
  overflow-y: auto; /* 수직 스크롤바 표시 */
  width: 60%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${COLOR.BORDER_GRAY};
  background-color: white;
  margin: 10px 0 10px 10px;
`;
const SubtitleWrapper = styled.div`
  padding: 10px;
  border-bottom: 1px solid ${COLOR.BORDER_GRAY};
  background-color: white;
  margin: 10px 10px 0px 10px;
`;
const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px 0 10px 10px;
`;
const LabelWithButton = styled.div`
  display: flex;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const ButtonBoxWrapper = styled.div`
  background-color: white;
  margin: 0 10px;
  margin-bottom: 10px;
  height: 100%;
`;
const ButtonBox = styled.div`
  margin-top: 20px;
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
