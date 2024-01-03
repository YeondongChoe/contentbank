import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { getQuestionList } from '../../api/getAxios';
import {
  Button,
  DropDown,
  DropDownItemProps,
  IndexInfo,
  PaginationBox,
  Search,
  Select,
  TabMenu,
  Table,
} from '../../components';
import {
  COLOR,
  contentColWidth,
  contentTheadList,
} from '../../components/constants';
import { ManagemantMainPopup } from '../../pages/managementPopup/ManagementMainPopup';
import { managementContentPopupBoolAtom } from '../../store/managementContentAtom';
import { totalPageAtom, pageAtom } from '../../store/utilAtom';
import {
  createListCodeValueAtom,
  servicedValueBoolAtom,
} from '../../store/valueAtom';
import { QuestionTableType } from '../../types';

export function ManagementsList() {
  const [didMount, setDidMount] = useState(false);
  const [totalPage, settotalPage] = useRecoilState(totalPageAtom);
  const [page, setPage] = useRecoilState(pageAtom);
  const size = 10;
  const [tabVeiw, setTabVeiw] = useState<string>('문항 리스트');
  const [content, setContent] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [questionList, setQuestionList] = useState<QuestionTableType[]>([]);

  const MenuCode = useRecoilValue(createListCodeValueAtom);
  const [isChangedServiced, setIsChangedServiced] = useRecoilState(
    servicedValueBoolAtom,
  );

  const filterSearchValue = () => {
    console.log('기존데이터 입력된 값으로 솎아낸뒤 재출력');
  };

  const [isManagement, setIsManagement] = useRecoilState(
    managementContentPopupBoolAtom,
  );

  const openInformation = () => {
    setIsManagement(true);
  };

  const menuList = [
    {
      label: '문항 리스트',
      value: '문항 리스트',
    },
    {
      label: '신고 문항',
      value: '신고 문항',
    },
  ];

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);
  };
  const selectCategory = [
    {
      id: '1',
      label: '개정과정',
      value: '1',
      options: [
        { id: '0', label: '개정과정', value: '0' },
        { id: '1', label: '2015학년', value: '1' },
        { id: '2', label: '2018학년', value: '2' },
        { id: '3', label: '2020학년', value: '3' },
      ],
    },
    {
      id: '2',
      label: '학교',
      value: '2',
      options: [
        { id: '0', label: '학교', value: '0' },
        { id: '1', label: '초등', value: '1' },
        { id: '2', label: '중등', value: '2' },
        { id: '3', label: '고등', value: '3' },
      ],
    },
    {
      id: '3',
      label: '학년',
      value: '3',
      options: [
        { id: '0', label: '학년', value: '0' },
        { id: '1', label: '초등1', value: '1' },
        { id: '2', label: '초등2', value: '2' },
        { id: '3', label: '중등1', value: '3' },
        { id: '4', label: '중등2', value: '4' },
        { id: '5', label: '고등1', value: '5' },
        { id: '6', label: '고등2', value: '6' },
      ],
    },
    {
      id: '4',
      label: '학기',
      value: '4',
      options: [
        { id: '0', label: '학기', value: '0' },
        { id: '1', label: '1학기', value: '1' },
        { id: '2', label: '2학기', value: '2' },
      ],
    },
    {
      id: '5',
      label: '대분류',
      value: '5',
      options: [
        { id: '0', label: '대분류', value: '0' },
        {
          id: '1',
          label: '일차부등식 소분류를 연습해봅시다 초등학교 친구들',
          value: '1',
        },
        { id: '2', label: '일차부등식 중분류', value: '2' },
        { id: '3', label: '일차부등식 대분류', value: '3' },
      ],
    },
    {
      id: '6',
      label: '문항타입',
      value: '6',
      options: [
        { id: '0', label: '문항타입', value: '0' },
        { id: '1', label: '객관식', value: '1' },
        { id: '2', label: '주관식', value: '2' },
        { id: '3', label: '서술형', value: '3' },
      ],
    },
    {
      id: '7',
      label: '오픈여부',
      value: '7',
      options: [
        { id: '0', label: '오픈여부', value: '0' },
        { id: '1', label: '활성화', value: '1' },
        { id: '2', label: '비활성화', value: '2' },
      ],
    },
  ];

  // 드롭다운 버튼 기본 값설정
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const dropDownList: DropDownItemProps[] = [
    {
      key: 'ListTabl/d수정',
      title: '수정',
      onClick: () => {
        // openCreateEditFilePopup();
        setShowDropDown(false);
      },
    },
    {
      key: 'ListTable/DropDownList복제 후 수정',
      title: '복제 후 수정',
      onClick: () => {
        // openCreateEditFilePopup();
        setShowDropDown(false);
      },
    },
  ];

  const loadData = useCallback(() => {
    getQuestionList({
      setQuestionList,
      setIsChangedServiced,
      settotalPage,
      searchValue,
      MenuCode,
      page,
      size,
    });
  }, [
    page,
    MenuCode,
    searchValue,
    setQuestionList,
    settotalPage,
    setIsChangedServiced,
  ]);

  useEffect(() => {
    setPage(1);
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      loadData();
    }
  }, [didMount, page]);

  return (
    <Container>
      <IndexInfo list={['콘텐츠 관리', '문항', `${tabVeiw}`]} />
      <HeadWrapper>
        <TabMenu
          length={2}
          menu={menuList}
          initialValue={'문항 리스트'}
          width={'250px'}
          setTabVeiw={setTabVeiw}
        />

        <Button
          height={'35px'}
          width={'150px'}
          $margin={'0 0 0 10px'}
          onClick={openInformation}
        >
          상세 검색
        </Button>
      </HeadWrapper>

      {/* 셀렉트 + 테이블 + 수정 비활성화 버튼 */}
      <TableWrapper>
        {/* 테이블 셀렉트 */}
        <SelectWrapper>
          {selectCategory.map((el) => (
            <Select
              width={'130px'}
              defaultValue={el.label}
              key={el.label}
              options={el.options}
              onSelect={(event) => selectCategoryOption(event)}
            />
          ))}
        </SelectWrapper>
        {/* 테이블 수정 + 활성화 버튼 */}
        <InputWrapper>
          <Search
            value={searchValue}
            onClick={() => filterSearchValue()}
            onKeyDown={(e) => {}}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="문항코드, 중분류, 담당자 검색"
            margin={'0 20px 0 0'}
            width={'50%'}
          />
          <ButtonWrapper>
            <Button
              width="100px"
              height="35px"
              fontSize="14px"
              //$border
              onClick={() => {
                // submitChangingService();
              }}
              disabled={false}
            >
              삭제
            </Button>
            <DropDown
              list={dropDownList}
              buttonText={'수정'}
              showDropDown={showDropDown}
              setShowDropDown={setShowDropDown}
            ></DropDown>
            <Button
              width="150px"
              height="35px"
              fontSize="14px"
              $border
              onClick={() => {
                //submitChangingService();
              }}
              disabled={false}
            >
              활성화 / 비활성화
            </Button>
          </ButtonWrapper>
        </InputWrapper>
        <Table
          list={questionList}
          colWidth={contentColWidth}
          theadList={contentTheadList}
        />
      </TableWrapper>

      <PaginationBox itemsCountPerPage={10} totalItemsCount={totalPage} />
      {isManagement && <ManagemantMainPopup />}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;
const HeadWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  padding-top: 0;
`;

const TableWrapper = styled.div`
  min-height: 580px;
  border-top: 1px solid ${COLOR.SECONDARY};
`;
