import * as React from 'react';
import { useState, useEffect } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  Button,
  IndexInfo,
  PaginationBox,
  Search,
  TabMenu,
  Table,
} from '../../components';
import { Step1 } from '../../pages/worksheetPopup/Step1';
import { Step2 } from '../../pages/worksheetPopup/Step2';
import {
  createWorksheetStep1BoolAtom,
  createWorksheetStep2BoolAtom,
  editWorksheetBoolAtom,
} from '../../state/creatingWorksheetAtom';
import { pageAtom, totalPageAtom } from '../../state/utilAtom';
import { TableWorksheetType } from '../../types';
import { COLOR, worksheetColWidth, worksheetTheadList } from '../constants';
import dummy from '../tableWrap/data.json';

export function Worksheet() {
  const [tabVeiw, setTabVeiw] = useState<string>('학습지');
  const [subTabVeiw, setSubTabVeiw] = useState<string>('전체');
  const [searchValue, setSearchValue] = useState<string>('');
  const [totalPage, settotalPage] = useRecoilState(totalPageAtom);

  const filterSearchValue = () => {
    console.log('기존데이터 입력된 값으로 솎아낸뒤 재출력');
  };

  const [didMount, setDidMount] = useState(false);
  let mountCount = 1;

  const [isStep1, setIsStep1] = useRecoilState(createWorksheetStep1BoolAtom);
  const [isStep2, setIsStep2] = useRecoilState(createWorksheetStep2BoolAtom);

  const setIsEditWorksheet = useSetRecoilState(editWorksheetBoolAtom);
  const openStep1 = () => {
    setIsStep1(true);
    setIsStep2(false);
    setIsEditWorksheet(false);
  };

  useEffect(() => {
    mountCount++;
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      console.log();
    }
  }, [didMount]);

  const menuList = [
    {
      label: '학습지',
      value: '학습지',
    },
    {
      label: '즐겨찾는 학습지',
      value: '즐겨찾는 학습지',
    },
  ];
  const subMenuList = [
    {
      label: '전체',
      value: '전체',
    },
    {
      label: '초등',
      value: '초등',
    },
    {
      label: '중등',
      value: '중등',
    },
    {
      label: '고등',
      value: '고등',
    },
  ];
  const worksheetList: TableWorksheetType[] = dummy.Worksheet;

  return (
    <Container>
      <IndexInfo list={['콘텐츠 제작', '학습지', `${tabVeiw}`]} />
      <HeadWrapper>
        <TabMenu
          length={2}
          menu={menuList}
          initialValue={'학습지'}
          width={'250px'}
          setTabVeiw={setTabVeiw}
        />

        {/* 테이블 상단 검색창 + 문항 업로드 버튼 */}
        <InputWrapper>
          <Search
            value={searchValue}
            width={'250px'}
            onClick={() => filterSearchValue()}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="이름, 권한 검색"
          />
          <Button
            height={'35px'}
            width={'150px'}
            $margin={'0 0 0 10px'}
            onClick={() => openStep1()}
          >
            학습지 만들기
          </Button>
        </InputWrapper>
      </HeadWrapper>

      {/* {tabVeiw === '학습지' && (
        <TableWrapper>
          <WorksheetTable />
        </TableWrapper>
      )}
      {tabVeiw === '즐겨찾는 학습지' && (
        <TableWrapper>
          <WorksheetTable />
        </TableWrapper>
      )} */}
      <TableWrapper>
        <TabMenu
          length={4}
          menu={subMenuList}
          initialValue={'전체'}
          width={'300px'}
          setTabVeiw={setSubTabVeiw}
          lineStyle
          $margin={'10px 0'}
        />

        <Table
          list={worksheetList}
          colWidth={worksheetColWidth}
          theadList={worksheetTheadList}
        />
      </TableWrapper>
      <PaginationBox itemsCountPerPage={10} totalItemsCount={totalPage} />

      {isStep1 && <Step1 />}
      {isStep2 && <Step2 />}
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
`;

const TableWrapper = styled.div`
  min-height: 580px;
  border-top: 1px solid ${COLOR.SECONDARY};
`;
