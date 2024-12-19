import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  classificationInstance,
  resourceServiceInstance,
} from '../../../api/axios';
import {
  Button,
  Input,
  Loader,
  Select,
  ValueNone,
  openToastifyAlert,
} from '../../../components/atom';
import {
  List,
  ListItem,
  PaginationBox,
  Search,
} from '../../../components/molecules';
import { useModal } from '../../../hooks';
import { pageAtom } from '../../../store/utilAtom';
import { ItemCategoryType, ItemSchoolType } from '../../../types';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { COLOR } from '../../constants';

export type CountryType = {
  idx: number;
  code: string;
  name: string;
  cityList: ItemCategoryType[];
};

export function SchoolInputModal({
  setSchoolNameValue,
}: {
  setSchoolNameValue: React.Dispatch<
    React.SetStateAction<{
      cityIdx: number;
      schoolName: string;
    }>
  >;
}) {
  const { closeModal } = useModal();
  const [page, setPage] = useRecoilState(pageAtom);
  const [searchValue, setSearchValue] = useState<string>('');
  const [content, setContent] = useState<string[]>([]);

  const [nameValue, setNameValue] = useState<string>('');
  const [submitValue, setSubmiValue] = useState<{
    cityIdx: number;
    schoolName: string;
  }>({ cityIdx: 0, schoolName: '' });

  const [cityList, setCityList] = useState<ItemCategoryType[]>([]);
  const [selectedCountry, setSelectedCountry] =
    useState<ItemCategoryType | null>(null);
  const [selectedCity, setSelectedCity] = useState<ItemCategoryType | null>(
    null,
  );

  // 학교 리스트 불러오기 api
  const getSchoolList = async () => {
    const res = await resourceServiceInstance.get(
      `/v1/school?pageIndex=${page}&pageUnit=${4}&searchKeyword=${searchValue}`,
    );
    // console.log(`getSchoolList 결과값`, res);
    return res;
  };
  const { data, isFetching, isLoading, refetch } = useQuery({
    queryKey: ['get-schoolList'],
    queryFn: getSchoolList,
    meta: {
      errorMessage: 'get-schoolList 에러 메세지',
    },
  });
  const schoolListData = data && data?.data.data;

  // 지역 리스트 불러오기 api
  const getCountries = async () => {
    const res = await resourceServiceInstance.get(`/v1/school/countries`);
    console.log(`getCountries 결과값`, res);
    return res.data.data.countryList;
  };
  const { data: countriesData } = useQuery<CountryType[]>({
    queryKey: ['get-countries'],
    queryFn: getCountries,
    meta: {
      errorMessage: 'get-countriesList 에러 메세지',
    },
  });

  useEffect(() => {
    if (selectedCountry) {
      const country = countriesData?.find(
        (country) => country.name === selectedCountry.name,
      );
      if (country) {
        const cityOptions = country.cityList.map((city) => ({
          code: city.code,
          name: city.name,
          idx: city.idx,
        }));
        setCityList(cityOptions);
      } else {
        setCityList([]);
      }
      setSelectedCity(null); // 선택이 바뀔 때 시군구 초기화
    }
  }, [selectedCountry, countriesData]);

  const handleCountrySelect = (
    event: React.MouseEvent<HTMLButtonElement>,
    code?: string,
  ) => {
    const selected = countriesData?.find(
      (country) => country.name === event.currentTarget.value,
    );
    if (selected) {
      setSelectedCountry(selected);
    }
  };

  const handleCitySelect = (
    event: React.MouseEvent<HTMLButtonElement>,
    code?: string,
  ) => {
    const selected = cityList.find(
      (city) => city.name === event.currentTarget.value,
    );
    if (selected) {
      setSelectedCity(selected);
    }
  };

  const submitSchoolData = () => {
    let data;
    if (nameValue !== '' && selectedCity) {
      data = { cityIdx: selectedCity.idx, schoolName: nameValue };
      //학교 정보 등록
      postSchoolMutate(data);
    } else {
      data = {
        cityIdx: submitValue.cityIdx,
        schoolName: submitValue.schoolName,
      };
    }
    setSchoolNameValue(data);
    closeModal();
  };

  const postSchool = async (data: { cityIdx: number; schoolName: string }) => {
    const res = await classificationInstance.post('/v1/school', data);
    return res;
  };
  const { data: postSchoolData, mutate: postSchoolMutate } = useMutation({
    mutationFn: postSchool,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
      if (context.response.data?.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response: { data: { message: string } }) => {
      openToastifyAlert({
        type: 'success',
        text: response.data.message,
      });
    },
  });

  // 검색 기능
  const filterSearchValue = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    // 쿼리 스트링 변경 로직
    setSearchValue(e.currentTarget.value);
  };
  const filterSearchValueEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchValue(e.currentTarget.value);
    }
  };

  useEffect(() => {
    refetch();
  }, [page, searchValue]);
  return (
    <Container>
      <Title>출처 학교 등록</Title>

      <SearchWarpper>
        <SubTitle>출처 학교 검색</SubTitle>
        <Search
          value={searchValue}
          onClick={(e) => filterSearchValue(e)}
          onKeyDown={(e) => filterSearchValueEnter(e)}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          placeholder="학교명 검색"
          maxLength={20}
        />
      </SearchWarpper>
      <ListWrapper>
        {searchValue !== '' ? (
          <>
            {!isLoading && schoolListData.schoolList ? (
              <>
                <Total> Total : {schoolListData.pagination.totalCount}</Total>
                {schoolListData.schoolList.length == 0 ? (
                  <ValueNoneWrapper>
                    <ValueNone info={`검색된 데이터가 없습니다`} textOnly />
                  </ValueNoneWrapper>
                ) : (
                  <>
                    <List>
                      {schoolListData.schoolList.map(
                        (school: ItemSchoolType) => (
                          <ListItem
                            key={`${school.idx} schoollistItem`}
                            isChecked={false}
                            $padding="10px"
                            onClick={() => {
                              setSubmiValue({
                                cityIdx: school.idx,
                                schoolName: school.schoolName,
                              });
                            }}
                          >
                            <ItemLayout>
                              <span className="ellipsis">{school.country}</span>
                              <div className="line"></div>
                              <span className="ellipsis">{school.city}</span>
                              <div className="line"></div>
                              <span className="width_50 ellipsis">
                                {school.schoolName}
                              </span>
                              <Button
                                width="100px"
                                height="30px"
                                fontSize="13px"
                                $border
                                cursor
                                onClick={() => {
                                  setSubmiValue({
                                    cityIdx: school.idx,
                                    schoolName: school.schoolName,
                                  });
                                }}
                              >
                                선택
                              </Button>
                            </ItemLayout>
                          </ListItem>
                        ),
                      )}
                    </List>

                    <PaginationBox
                      itemsCountPerPage={4}
                      totalItemsCount={schoolListData.pagination.totalCount}
                    />
                  </>
                )}
              </>
            ) : (
              <Loader />
            )}
          </>
        ) : (
          <ValueNoneWrapper>
            <ValueNone info={`학교명을 검색해 주세요`} textOnly />
          </ValueNoneWrapper>
        )}
      </ListWrapper>

      <InputWarpper>
        <SubTitle>출처 학교 직접 입력</SubTitle>
        <SelectWrapper>
          <>
            <Select
              heightScroll="300px"
              width="140px"
              options={
                countriesData
                  ? countriesData.map((country) => ({
                      code: country.code,
                      name: country.name,
                      idx: country.idx,
                    }))
                  : []
              }
              onSelect={handleCountrySelect}
              defaultValue="시도"
              selectedValue={selectedCountry ? selectedCountry.name : ''}
              setSelectedValue={(value) => {
                const selected = countriesData?.find(
                  (country) => country.name === value,
                );
                if (selected) {
                  setSelectedCountry(selected);
                }
              }}
            />

            <Select
              heightScroll="300px"
              width="130px"
              options={cityList}
              onSelect={handleCitySelect}
              defaultValue="시군구"
              selectedValue={selectedCity ? selectedCity.name : ''}
              setSelectedValue={(value) => {
                const selected = cityList.find((city) => city.name === value);
                if (selected) {
                  setSelectedCity(selected);
                }
              }}
            />

            <InputButtonWrapper>
              <input
                type="text"
                minLength={2}
                maxLength={20}
                value={nameValue}
                onChange={(e) => {
                  setNameValue(e.target.value);
                }}
                placeholder="등록할 이름을 입력해 주세요"
              />
              {/* <Button
                width={'80px'}
                height={'25px'}
                fontSize={'13px'}
                $margin={'0 0 0 5px'}
                cursor
                $border
                onClick={() => submitSchoolData()}
              >
                등록
              </Button> */}
            </InputButtonWrapper>
          </>
        </SelectWrapper>
      </InputWarpper>
      <SubTitle className="center">
        등록될 학교 명: {`${nameValue ? nameValue : submitValue.schoolName}`}
      </SubTitle>
      <ButtonWrapper>
        <Button
          buttonType="button"
          onClick={() => submitSchoolData()}
          height={'40px'}
          fontSize="16px"
          $filled
          cursor
        >
          <span>저장</span>
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  max-width: 700px;
  min-width: 600px;
  padding: 0 30px;
`;
const Title = styled.strong`
  font-size: 22px;
  width: 100%;
  display: block;
  font-weight: normal;
  text-align: center;
  padding-bottom: 20px;
`;
const SubTitle = styled.span`
  font-weight: bold;
  color: ${COLOR.FONT_BLACK};
  font-size: 16px;
  display: flex;
  align-items: center;
  padding-bottom: 10px;

  &.center {
    padding: 10px 0;
    width: 100%;
    justify-content: center;
    color: ${COLOR.PRIMARY};
  }
`;

const SearchWarpper = styled.div`
  padding: 5px 0;
`;
const ListWrapper = styled.div`
  background-color: ${COLOR.LIGHT_GRAY};
  padding: 0 10px;
`;
const ValueNoneWrapper = styled.div`
  background-color: ${COLOR.LIGHT_GRAY};
`;
const InputWarpper = styled.div`
  padding: 10px 0;
`;
const InputButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  margin-left: 5px;
  width: 100%;
  border: 1px solid ${COLOR.BORDER_GRAY};
  border-radius: 5px;
  padding: 3px;
  height: 40px;

  > input {
    width: 100%;
    border: none;
    border-radius: 5px;
    font-size: 15px;
    padding: 0 10px;
    text-overflow: ellipsis;
  }
`;
const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;

  > div:nth-of-type(1) {
    margin-right: 5px;
  }
`;
const ButtonWrapper = styled.div`
  padding-bottom: 30px;
`;
const ItemLayout = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  > span {
    display: flex;
    width: 20%;
    padding: 0 10px;
    justify-content: space-around;
    flex-wrap: wrap;
    word-break: break-all;
  }
  .line {
    width: 1px;
    height: 15px;
    background-color: ${COLOR.BORDER_GRAY};
  }
  .width_50 {
    width: 50%;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
const Total = styled.span`
  display: block;
  font-size: 13px;
  font-weight: bold;
  color: ${COLOR.FONT_BLACK};
  padding: 5px;
`;
