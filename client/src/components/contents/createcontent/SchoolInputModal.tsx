import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { classificationInstance } from '../../../api/axios';
import {
  Button,
  Input,
  Loader,
  Select,
  ValueNone,
} from '../../../components/atom';
import {
  List,
  ListItem,
  PaginationBox,
  Search,
} from '../../../components/molecules';
import { useModal } from '../../../hooks';
import { pageAtom } from '../../../store/utilAtom';
import { ItemSchoolType } from '../../../types';
import { COLOR } from '../../constants';

export function SchoolInputModal({
  setSchoolNameValue,
}: {
  setSchoolNameValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { closeModal } = useModal();
  const [page, setPage] = useRecoilState(pageAtom);
  const [nameValue, setNameValue] = useState('');
  const [submitNameValue, setSubmitNameValue] = useState('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [content, setContent] = useState<string[]>([]);

  // 유저 리스트 불러오기 api
  const getSchoolList = async () => {
    const res = await classificationInstance.get(
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

  // 셀렉트 기능
  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);
  };

  //직접 입력 인풋에 등록시
  const submitSchoolData = () => {
    // console.log(submitNameValue);
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
                              setSubmitNameValue(school.schoolName);
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
                                  setSubmitNameValue(school.schoolName);
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
            {[
              {
                id: '1',
                label: '시도',
                value: '1',
                options: [
                  {
                    id: '서울특별시',
                    label: '서울특별시',
                    value: '서울특별시',
                  },
                ],
              },
              {
                id: '2',
                label: '시군구',
                value: '2',
                options: [{ id: '송파구', label: '송파구', value: '송파구' }],
              },
            ].map((el) => (
              <Select
                width={'120px'}
                defaultValue={el.label}
                key={el.label}
                options={el.options}
                onSelect={(event) => selectCategoryOption(event)}
              />
            ))}
            <InputButtonWrapper>
              <input
                type="text"
                minLength={2}
                value={nameValue}
                onChange={(e) => {
                  setNameValue(e.target.value);
                  setSubmitNameValue(e.target.value);
                }}
                placeholder="등록할 이름을 입력해 주세요"
              />
              <Button
                width={'80px'}
                height={'25px'}
                fontSize={'13px'}
                $margin={'0 0 0 5px'}
                cursor
                $border
                onClick={() => submitSchoolData()}
              >
                등록
              </Button>
            </InputButtonWrapper>
          </>
        </SelectWrapper>
      </InputWarpper>
      <SubTitle className="center">
        등록될 학교 명: {`${submitNameValue}`}
      </SubTitle>
      <ButtonWrapper>
        <Button
          buttonType="button"
          onClick={() => {
            setSchoolNameValue(submitNameValue);
            // console.log(nameValue);
            closeModal();
          }}
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
    width: calc(100% - 85px);
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
