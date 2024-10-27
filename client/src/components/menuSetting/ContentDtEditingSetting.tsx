import * as React from 'react';
import { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@tanstack/react-query';
import { BiToggleLeft, BiToggleRight } from 'react-icons/bi';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { TabMenu, Label, Button, Select, openToastifyAlert } from '..';
import { resourceServiceInstance } from '../../api/axios';
import Image from '../../assets/images/EditerImg.png';
import { pageAtom } from '../../store/utilAtom';
import { MenuDataListProps } from '../../types';
import { postRefreshToken } from '../../utils/tokenHandler';
import { COLOR } from '../constants';

// TODO 추가정보 값, api로 부터 필수값설정에 대한 부분 안보내고 있음, 변경사항 저장
export function ContentDtEditingSetting() {
  const menuList = [
    {
      label: '출처',
      value: '출처',
    },
    {
      label: '추가정보',
      value: '추가정보',
    },
  ];
  const [selectedValue, setSelectedValue] = useState<string>(''); //태그
  const [tabVeiw, setTabVeiw] = useState<string>('출처');
  const [page, setPage] = useRecoilState(pageAtom);
  const [menuIdx, setMenuIdx] = useState<number | null>(null);
  const [menuDataList, setMenuDataList] = useState<MenuDataListProps[]>([]);

  const changeTab = () => {
    setPage(1);
  };

  // 로컬 스토리지에서 데이터 가져오기
  useEffect(() => {
    const fetchDataFromStorage = () => {
      const data = localStorage.getItem('sendMenuIdx');

      if (data) {
        try {
          const parsedData = JSON.parse(data);
          //console.log('sendData:', parsedData); // 디버깅용 콘솔 로그
          setMenuIdx(parsedData.idx);
          //localStorage.removeItem('sendMenuIdx');
        } catch (error) {
          console.error('로컬 스토리지 sendData 파싱 에러:', error);
        }
      } else {
        console.log('로컬 스토리지에 sendData가 없습니다.');
      }
    };

    fetchDataFromStorage();

    const retryTimeout = setTimeout(fetchDataFromStorage, 3000); // 3초 후에 다시 시도

    return () => clearTimeout(retryTimeout);
  }, []);

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
      searchs: 'true, true, true, true, true, true',
      view: 'true, true, true, true, true, true',
      //searchs: filterData[0].searchList,
      //views: filterData[0].viewList,
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
          <Title>문항 등록/수정(DT&Editing)</Title>
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
              <Label
                value={'출처'}
                width="100%"
                bold
                fontSize="17px"
                padding="10px 0 0px 5px"
              />
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
              {tabVeiw === '출처' && (
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
                      <BsEye
                        style={{
                          width: '18px',
                          height: '18px',
                          cursor: 'pointer',
                          fill: `${COLOR.PRIMARY}`,
                        }}
                      ></BsEye>
                      <PageDescription>노출여부</PageDescription>
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
                          const viewList = [
                            true,
                            true,
                            false,
                            true,
                            true,
                            true,
                          ];
                          const essentialList = [
                            true,
                            true,
                            false,
                            true,
                            true,
                            true,
                          ];
                          //console.log(filterList);
                          //console.log(nameList);
                          //console.log(viewList);

                          // 필터링된 카테고리가 존재할 때만 option을 렌더링
                          if (nameList) {
                            return nameList?.map((item, i) => (
                              <>
                                <ContentList key={i}>
                                  <Content>
                                    <div className={`title-${true}`}>
                                      {item}
                                      <div className="tag">태그선택</div>
                                    </div>
                                    <div className="icon">
                                      {essentialList[i] ? (
                                        <BiToggleRight
                                          style={{
                                            width: '20px',
                                            height: '20px',
                                            cursor: 'pointer',
                                            fill: `${COLOR.PRIMARY}`,
                                          }}
                                          // onClick={() => {}}
                                        />
                                      ) : (
                                        <BiToggleLeft
                                          style={{
                                            width: '20px',
                                            height: '20px',
                                            cursor: 'pointer',
                                            fill: `${COLOR.MUTE}`,
                                          }}
                                          // onClick={() => {}}
                                        />
                                      )}
                                    </div>
                                    <div className="icon">
                                      {viewList[i] ? (
                                        <BsEye
                                          style={{
                                            width: '20px',
                                            height: '20px',
                                            cursor: 'pointer',
                                            fill: `${COLOR.PRIMARY}`,
                                          }}
                                          // onClick={() => {}}
                                        />
                                      ) : (
                                        <BsEyeSlash
                                          style={{
                                            width: '20px',
                                            height: '20px',
                                            cursor: 'pointer',
                                            fill: `${COLOR.MUTE}`,
                                            // onClick={() => {}}
                                          }}
                                        />
                                      )}
                                    </div>
                                  </Content>
                                </ContentList>
                              </>
                            ));
                          }
                        })()}
                        <ButtonWrapper>
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
                        </ButtonWrapper>
                      </>
                    )}
                  </ContentListWrapper>
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
                    {menuDataList && (
                      <>
                        {/* selectedValue와 일치하는 필터된 카테고리 찾기 */}
                        {/* {(() => {
                          const filteredCategory =
                            categoryList[0].additionalInformationList.find(
                              (item: TagClass) => item.name === selectedValue,
                            );

                          // 필터링된 카테고리가 존재할 때만 option을 렌더링
                          if (filteredCategory) {
                            return filteredCategory.option?.map(
                              (category: Option, i: number) => (
                                <ContentList key={i}>
                                  <Content>
                                    <div
                                      className={`title-${category.isDisplay}`}
                                    >
                                      {category.title}
                                      <div className="tag">{category.tag}</div>
                                    </div>
                                    {category.isNecessary ? (
                                      <div className="icon">
                                        <BiToggleRight
                                          style={{
                                            width: '20px',
                                            height: '20px',
                                            cursor: 'pointer',
                                            fill: `${COLOR.PRIMARY}`,
                                          }}
                                          onClick={() => {
                                            setCategoryList((prevState) =>
                                              prevState.map((catListItem) => {
                                                // 현재 tageClassList를 순회하며 title에 맞는 option을 찾아 isFilter 상태를 변경
                                                const updatedTageClassList =
                                                  catListItem.additionalInformationList?.map(
                                                    (tagClass) => {
                                                      const updatedOptions =
                                                        tagClass.option?.map(
                                                          (optionItem) => {
                                                            if (
                                                              optionItem.title ===
                                                              category.title
                                                            ) {
                                                              return {
                                                                ...optionItem,
                                                                isNecessary:
                                                                  !optionItem.isNecessary, // 해당 옵션의 isFilter만 토글
                                                              };
                                                            }
                                                            return optionItem; // 나머지 옵션은 그대로 유지
                                                          },
                                                        );

                                                      return {
                                                        ...tagClass,
                                                        option: updatedOptions, // 변경된 옵션 배열로 업데이트
                                                      };
                                                    },
                                                  );

                                                return {
                                                  ...catListItem,
                                                  additionalInformationList:
                                                    updatedTageClassList, // 업데이트된 tageClassList로 교체
                                                };
                                              }),
                                            );
                                          }}
                                        />
                                      </div>
                                    ) : (
                                      <div className="icon">
                                        <BiToggleRight
                                          style={{
                                            width: '20px',
                                            height: '20px',
                                            cursor: 'pointer',
                                            fill: `${COLOR.FONT_GRAY}`,
                                          }}
                                          onClick={() => {
                                            setCategoryList((prevState) =>
                                              prevState.map((catListItem) => {
                                                // 현재 tageClassList를 순회하며 title에 맞는 option을 찾아 isFilter 상태를 변경
                                                const updatedTageClassList =
                                                  catListItem.additionalInformationList?.map(
                                                    (tagClass) => {
                                                      const updatedOptions =
                                                        tagClass.option?.map(
                                                          (optionItem) => {
                                                            if (
                                                              optionItem.title ===
                                                              category.title
                                                            ) {
                                                              return {
                                                                ...optionItem,
                                                                isNecessary:
                                                                  !optionItem.isNecessary, // 해당 옵션의 isFilter만 토글
                                                              };
                                                            }
                                                            return optionItem; // 나머지 옵션은 그대로 유지
                                                          },
                                                        );

                                                      return {
                                                        ...tagClass,
                                                        option: updatedOptions, // 변경된 옵션 배열로 업데이트
                                                      };
                                                    },
                                                  );

                                                return {
                                                  ...catListItem,
                                                  additionalInformationList:
                                                    updatedTageClassList, // 업데이트된 tageClassList로 교체
                                                };
                                              }),
                                            );
                                          }}
                                        />
                                      </div>
                                    )}
                                  </Content>
                                </ContentList>
                              ),
                            );
                          }
                        })()} */}
                      </>
                    )}
                  </ContentListWrapper>
                  <AdditionalButtonWrapper>
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
                  </AdditionalButtonWrapper>
                </>
              )}
            </>
          </SettingWrapper>
          <ListWrapper>
            <img
              src={Image}
              alt="editer"
              style={{
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
                padding: '10px',
              }}
            />
            <SelectWrapper>
              <SelectBox>
                <Label value={'출처'} width="100%" bold fontSize="17px" />
                {/* selectedValue와 일치하는 필터된 카테고리 찾기 */}
                {/* {(() => {
                  const filteredCategory = categoryList[0].tageClassList.find(
                    (item: TagClass) => item.name === selectedValue,
                  );
                  // 필터링된 카테고리가 존재할 때만 option을 렌더링
                  if (filteredCategory) {
                    return filteredCategory.option?.map((optionItem) => {
                      if (optionItem.isDisplay) {
                        return (
                          <Select
                            width={'130px'}
                            isnormalizedOptions
                            defaultValue={
                              optionItem.isNecessary
                                ? `${optionItem.title}*`
                                : optionItem.title
                            }
                            key={optionItem.idx}
                          />
                        );
                      }
                      return null; // isDisplay가 false인 항목은 렌더링하지 않음
                    });
                  }
                  return null; // filteredCategory가 없는 경우 null 반환
                })()} */}
                <Label value={'추가정보'} width="100%" bold fontSize="17px" />
                {/* {(() => {
                  const filteredCategory =
                    categoryList[0].additionalInformationList.find(
                      (item: TagClass) => item.name === selectedValue,
                    );
                  // 필터링된 카테고리가 존재할 때만 option을 렌더링
                  if (filteredCategory) {
                    return filteredCategory.option?.map((optionItem) => {
                      return (
                        <Select
                          width={'130px'}
                          isnormalizedOptions
                          defaultValue={
                            optionItem.isNecessary
                              ? `${optionItem.title}*`
                              : optionItem.title
                          }
                          key={optionItem.idx}
                        />
                      );
                    });
                  }
                  return null; // filteredCategory가 없는 경우 null 반환
                })()} */}
              </SelectBox>
            </SelectWrapper>
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
  padding: 10px 0 10px 10px;

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
const ButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;
const SelectWrapper = styled.div`
  padding: 10px;
`;
const SelectBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 10px;
  background-color: white;
`;
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  background-color: ${COLOR.LIGHT_GRAY};
`;
const ListDescription = styled.p`
  display: flex;
  justify-content: center;
  font-size: 12px;
  color: ${COLOR.PRIMARY};
  font-weight: bold;
  padding-bottom: 10px;
`;
const AdditionalButtonWrapper = styled.div`
  display: flex;
  height: 419px;
  align-items: flex-end;
`;
