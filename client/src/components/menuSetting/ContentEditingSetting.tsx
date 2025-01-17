import * as React from 'react';
import { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@tanstack/react-query';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import { TbCopy } from 'react-icons/tb';
import styled from 'styled-components';

import { Label, Button, Select, openToastifyAlert, CheckBoxI } from '..';
import { resourceServiceInstance } from '../../api/axios';
import { MenuDataListProps } from '../../types';
import { postRefreshToken } from '../../utils/tokenHandler';
import { COLOR } from '../constants';

type selectProps = {
  idx: number;
  name: string;
  isView: boolean;
};

export function ContentEditingSetting() {
  const [selectedValue, setSelectedValue] = useState<string>(''); //태그
  const [menuIdx, setMenuIdx] = useState<number | null>(null);
  const [menuDataList, setMenuDataList] = useState<MenuDataListProps[]>([]);
  const [nameList, setNameList] = useState<selectProps[]>([]);
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

  //그룹 선택 값에 따라 검색조건 값 변경
  useEffect(() => {
    if (menuDataList) {
      const filteredList = menuDataList.filter(
        (el) => el.name === selectedValue,
      );
      const nameArray = filteredList[0]?.nameList?.split(',') || [];
      const viewList =
        filteredList[0]?.viewList
          ?.split(',')
          .map((item) => item.trim() === 'true') || [];

      const formattedNameList = nameArray.map((name, index) => ({
        idx: index,
        name: name.trim(),
        isView: viewList[index],
      }));
      setNameList(formattedNameList);
    }
  }, [menuDataList]);

  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <Title>문항 일괄 편집</Title>
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
            <CategoryDescription>
              검색조건에는 태그 매핑 정보가 적용되지 않습니다.
            </CategoryDescription>
            <CategoryDescription>
              문항 수정에 사용되는 매핑 정보는 해당 그룹의 태그 매핑 정보를
              기본으로 합니다.
            </CategoryDescription>
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
                      const viewList = filterList[0]?.viewList
                        ?.split(',')
                        .map((item) => item.trim() === 'true');

                      // 필터링된 카테고리가 존재할 때만 option을 렌더링
                      if (nameList) {
                        return nameList.map((item, i) => (
                          <ContentList key={i}>
                            <Content>
                              <div className={`title-${viewList[i]}`}>
                                {item}
                                <div className="tag">{inputTypeList[i]}</div>
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
                                    onClick={() => {
                                      toggleView(i, !viewList[i]);
                                    }}
                                  />
                                ) : (
                                  <BsEyeSlash
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                      cursor: 'pointer',
                                      fill: `${COLOR.MUTE}`,
                                    }}
                                    onClick={() => {
                                      toggleView(i, !viewList[i]);
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
                    value={'검색조건'}
                    width="100%"
                    padding="0"
                    bold
                    fontSize="16px"
                  />
                </SubtitleWrapper>
                <SelectBox>
                  {(() => {
                    const options = nameList
                      .filter((item) => item.isView)
                      .map((item) => ({ name: item.name, code: item.idx }));
                    return (
                      <Select
                        width="140px"
                        defaultValue={options[0]?.name || '카테고리'}
                        key={options[0]?.name}
                        options={options}
                        isnormalizedOptions
                      />
                    );
                  })()}
                  <And>이(가)</And>
                  <Select
                    width="200px"
                    defaultValue="11차, 12차"
                    key="11차, 12차"
                    isnormalizedOptions
                  />
                </SelectBox>
                <ButtonWrapper>
                  <Button width="150px" height="32px" fontSize="14px" $normal>
                    <span>하나 이상 포함</span>
                  </Button>
                  <Button width="150px" height="32px" fontSize="14px" $filled>
                    <span>모두 포함</span>
                  </Button>
                </ButtonWrapper>
                <AddButton>+ 검색 조건 추가</AddButton>
                <InputWrapper>
                  <div
                    style={{
                      minHeight: '35px',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      outline: 'none',
                      width: 'calc(100% - 90px)',
                      overflowWrap: 'break-word',
                    }}
                  />
                  <Button
                    width={'80px'}
                    height={'35px'}
                    fontSize={'14px'}
                    $margin={'0 0 0 5px'}
                    cursor
                    $filled
                    $success
                    onClick={() => {}}
                  >
                    수식
                  </Button>
                </InputWrapper>
              </SelectWrapper>
              <CardListWrapper>
                <CardButtonWrapper>
                  <CheckIconWrapper>
                    <CheckBoxI checked={true} id={''} value={''} />총 234건 전체
                    선택
                  </CheckIconWrapper>
                  <ButtonEditWrapper>
                    <Button $border width="100px" height="30px" fontSize="14px">
                      문항 수정
                    </Button>
                    <Button width="100px" height="30px" fontSize="14px">
                      수정 취소
                    </Button>
                  </ButtonEditWrapper>
                </CardButtonWrapper>
                <CardList>
                  <CardWrapper>
                    <Card>
                      <CardTitle>
                        <CheckBoxI
                          id={''}
                          value={''}
                          $margin={`0 5px 0 0`}
                          checked={true}
                          readOnly
                          width="15px"
                        />
                        <p>
                          자료의 조건/자료의 표현/평균 알아보기/평균을 구하는
                          문제
                        </p>
                      </CardTitle>
                      <CardContext>
                        1. 평균을 구하는 문제에서 다음의 부채꼴을 보고...
                        부채꼴에 있는 도형을 고르고... 부채표 영역에 들어갈
                        알맞은 값을 구하시오. 중복..
                      </CardContext>
                      <CardContentTypeWrapper>
                        <ContentType>기출(휘문고)</ContentType>
                        <ContentCategoryWrapper>
                          <ContentCategory>#11차 #12차 #13차</ContentCategory>
                          <ContentCategory>#수학</ContentCategory>
                          <ContentCategory>#초등 1학년 1학기</ContentCategory>
                        </ContentCategoryWrapper>
                      </CardContentTypeWrapper>
                    </Card>
                    <PreviewWrapper>
                      <PreviewIconWrapper>
                        <TbCopy size={20}></TbCopy>
                      </PreviewIconWrapper>
                      <p>문항</p>
                      <p>상세보기</p>
                    </PreviewWrapper>
                  </CardWrapper>
                </CardList>
              </CardListWrapper>
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
const CategoryDescription = styled.p`
  font-size: 10px;
  padding-left: 5px;
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
  max-height: 493px; /* 컨테이너의 최대 높이 설정 */
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
const SelectWrapper = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${COLOR.BORDER_GRAY};
`;
const SubtitleWrapper = styled.div`
  padding: 10px;
  display: flex;
`;
const SelectBox = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
const And = styled.span`
  font-size: 12px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  gap: 5px;
`;
const AddButton = styled.button`
  margin: 0 20px;
  margin-top: 200px;
  padding: 10px 20px;
  color: ${COLOR.PRIMARY};
  border: 1px dotted ${COLOR.PRIMARY};
  border-radius: 4px;
  cursor: pointer;
  background-color: transparent;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 20px;
  width: calc(100% - 40px);
  border: 1px solid ${COLOR.BORDER_GRAY};
  border-radius: 5px;
  padding: 5px;
  position: relative;
  background-color: white;
`;
const CardListWrapper = styled.div`
  width: 60%;
  padding: 10px;
  min-height: 687px;
`;
const CardButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CheckIconWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
`;
const ButtonEditWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const CardList = styled.ul`
  padding-top: 10px;
`;
const CardWrapper = styled.div`
  display: flex;
  border: 1px solid ${COLOR.BORDER_GRAY};
  background-color: white;
  border-radius: 5px;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
`;
const CardTitle = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 10px;
  p {
    font-size: 12px;
  }
`;
const CardContext = styled.p`
  font-size: 14px;
  padding: 0 20px;
`;
const CardContentTypeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  padding-bottom: 10px;
`;
const ContentType = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: ${COLOR.FONT_GRAY};
`;
const ContentCategoryWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const ContentCategory = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: ${COLOR.FONT_GRAY};
`;
const PreviewWrapper = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-left: 1px solid ${COLOR.BORDER_GRAY};

  p {
    font-size: 11px;
    display: flex;
    justify-content: center;
  }
`;
const PreviewIconWrapper = styled.div`
  cursor: pointer;
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
