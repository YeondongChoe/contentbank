import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { Button, Input, Select, ValueNone } from '../../../components/atom';
import {
  List,
  ListItem,
  PaginationBox,
  Search,
} from '../../../components/molecules';
import { useModal } from '../../../hooks';
import { pageAtom } from '../../../store/utilAtom';
import { COLOR } from '../../constants';

//TODO : 임시 데이터
import { selectCategory1 } from './contentCreatingCategory';

export function SchoolInputModal({
  setSchoolNameValue,
}: {
  setSchoolNameValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { closeModal } = useModal();
  const [page, setPage] = useRecoilState(pageAtom);
  const [nameValue, setNameValue] = useState('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [content, setContent] = useState<string[]>([]);
  const [schoolList, setSchoolList] = useState([
    {
      id: 'dsaa',
      name: '경북특수고등학교',
      city: '서울특별시',
      district: '동작구',
    },
    {
      id: 'dsda',
      name: '뎡주직업 전문학교 뎡주직업 전문학교ss ssss dsads dsad s dsadsa dsaad sdsadsad',
      city: '서울특별시',
      district: '동작구',
    },
    { id: 'dsfa', name: '경일중학교', city: '서울특별시', district: '동작구' },
    {
      id: 'dsga',
      name: '디지털고등학교',
      city: '서울특별시',
      district: '동작구',
    },
  ]);

  // 검색 기능 함수
  const filterSearchValue = () => {
    // 쿼리 스트링 변경 로직
    setSearchValue('');
  };
  const filterSearchValueEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      setSearchValue('');
    }
  };

  //
  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);
  };
  const submitSchoolData = () => {
    setSchoolNameValue(nameValue);
    // console.log(nameValue);
    closeModal();
  };

  return (
    <Container>
      <Title>출처 학교 등록</Title>

      <SearchWarpper>
        <SubTitle>출처 학교 검색</SubTitle>
        <Search
          value={searchValue}
          onClick={() => filterSearchValue()}
          onKeyDown={(e) => filterSearchValueEnter(e)}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          placeholder="학교명 검색"
        />
      </SearchWarpper>
      <ListWrapper>
        {schoolList.length > 0 ? (
          <>
            <List>
              {schoolList.map(
                (school: {
                  id: string;
                  name: string;
                  city: string;
                  district: string;
                }) => (
                  <ListItem
                    key={`${school.id}listItem`}
                    isChecked={false}
                    $padding="10px"
                  >
                    <ItemLayout>
                      <span className="ellipsis">{school.city}</span>
                      <div className="line"></div>
                      <span className="ellipsis">{school.district} </span>
                      <div className="line"></div>
                      <span className="width_50 ellipsis">{school.name} </span>
                      <Button
                        width="100px"
                        height="30px"
                        fontSize="13px"
                        $border
                        cursor
                        onClick={() => {}}
                      >
                        선택
                      </Button>
                    </ItemLayout>
                  </ListItem>
                ),
              )}
            </List>
            <PaginationBox itemsCountPerPage={10} totalItemsCount={10} />
          </>
        ) : (
          <ValueNone info={`검색된 데이터가 없습니다`} textOnly />
        )}
      </ListWrapper>

      <InputWarpper>
        <SubTitle>출처 학교 직접 입력</SubTitle>
        <SelectWrapper>
          <>
            {selectCategory1.map((el) => (
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
                onChange={(e) => setNameValue(e.target.value)}
                placeholder="등록할 이름을 입력해 주세요"
              />
              <Button
                width={'80px'}
                height={'25px'}
                fontSize={'13px'}
                $margin={'0 0 0 5px'}
                cursor
                $border
                onClick={() => {}}
              >
                등록
              </Button>
            </InputButtonWrapper>
          </>
        </SelectWrapper>
      </InputWarpper>
      <SubTitle className="center">등록될 학교 명: {`${nameValue}`}</SubTitle>
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
  padding: 10px 0;
`;
const ListWrapper = styled.div`
  padding: 0 10px;
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
