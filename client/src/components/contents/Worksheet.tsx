import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { IoMdClose } from 'react-icons/io';
import { LuDownload } from 'react-icons/lu';
import { SlPrinter } from 'react-icons/sl';
import ReactToPrint from 'react-to-print';
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
import { WorksheetBasic } from '../../components/worksheet/WorksheetBasic';
import { Step1 } from '../../pages/worksheetPopup/Step1';
import { Step2 } from '../../pages/worksheetPopup/Step2';
import {
  createWorksheetStep1BoolAtom,
  createWorksheetStep2BoolAtom,
  editWorksheetBoolAtom,
  previewWorksheetBoolAtom,
} from '../../store/creatingWorksheetAtom';
import { pageAtom, totalPageAtom } from '../../store/utilAtom';
import { WorksheetTableType } from '../../types';
import { COLOR, worksheetColWidth, worksheetTheadList } from '../constants';
import dummy from '../constants/data.json';
export function Worksheet() {
  const [tabVeiw, setTabVeiw] = useState<string>('학습지');
  const [subTabVeiw, setSubTabVeiw] = useState<string>('전체');
  const [searchValue, setSearchValue] = useState<string>('');
  const [totalPage, settotalPage] = useRecoilState(totalPageAtom);

  // 검색 기능 함수
  const filterSearchValue = () => {
    console.log('기존데이터 입력된 값으로 솎아낸뒤 재출력');
  };

  const changeListData = () => {
    console.log('탭클릭시 tabVeiw에 맞는 리스트 데이터 출력');
    console.log(tabVeiw, subTabVeiw);
  };

  const [didMount, setDidMount] = useState(false);

  const [isStep1, setIsStep1] = useRecoilState(createWorksheetStep1BoolAtom);
  const [isStep2, setIsStep2] = useRecoilState(createWorksheetStep2BoolAtom);
  const [isPreview, setIsPreview] = useRecoilState(previewWorksheetBoolAtom);
  const setIsEditWorksheet = useSetRecoilState(editWorksheetBoolAtom);
  const openStep1 = () => {
    setIsStep1(true);
    setIsStep2(false);
    setIsEditWorksheet(false);
  };

  const ref = useRef(null);

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      console.log('학습지테이블 데이타 가져오기');
    }
  }, [didMount]);

  // useEffect(() => {
  //   //초기화
  //   if (subTabVeiw !== '전체') {
  //     return setSubTabVeiw('전체');
  //   }
  // }, [tabVeiw]);

  useEffect(() => {
    changeListData();
  }, [tabVeiw, subTabVeiw]);

  const menuList = [
    {
      label: '학습지',
      value: '학습지',
    },
    {
      label: '즐겨찾는학습지',
      value: '즐겨찾는학습지',
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
  const worksheetList: WorksheetTableType[] = dummy.Worksheet;

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
            onKeyDown={(e) => {}}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="학습지명, 학년, 태그, 작성자 검색"
          />
          <Button
            height={'35px'}
            width={'150px'}
            $margin={'0 0 0 10px'}
            onClick={openStep1}
          >
            학습지 만들기
          </Button>
        </InputWrapper>
      </HeadWrapper>

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
          setIsEnabled={() => {}}
          setSelectedRows={() => {}}
        />
      </TableWrapper>
      <PaginationBox itemsCountPerPage={10} totalItemsCount={totalPage} />

      {isStep1 && <Step1 />}
      {isStep2 && <Step2 />}
      {isPreview && (
        <Overlay>
          <WorksheetBasic />
        </Overlay>
      )}
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
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TableWrapper = styled.div`
  min-height: 580px;
  border-top: 1px solid ${COLOR.SECONDARY};
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
