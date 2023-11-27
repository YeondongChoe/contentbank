import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import dummy from './data.json';
import PaginationBox from '../../components/pagination/Pagination';
import { useRecoilValue, useRecoilState } from 'recoil';
import { PageAtom, totalPageState } from '../../recoil/UtilState';
import {
  CreateListCodeValue,
  SearchValue,
  CheckBoxValue,
  IsChangedServicedValue,
} from '../../recoil/ValueState';

import BookmarkBorderTwoToneIcon from '@mui/icons-material/BookmarkBorderTwoTone';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const WorksheetTable = () => {
  const worksheetList = dummy.Worksheet;

  const [didMount, setDidMount] = useState(false);
  let mountCount = 1;
  const [totalPage, setTotalPage] = useRecoilState(totalPageState);
  const page = useRecoilValue(PageAtom);
  const size = 10;
  const MenuCode = useRecoilValue(CreateListCodeValue);
  const [selectedRows, setSelectedRows] =
    useRecoilState<number[]>(CheckBoxValue);
  const isAllSelected = selectedRows.length === worksheetList.length;

  const handleRowSelect = (checkbox: number) => {
    const updatedSelectedRows = [...selectedRows];
    if (updatedSelectedRows.includes(checkbox)) {
      // 이미 선택된 항목을 다시 클릭하면 선택 해제
      updatedSelectedRows.splice(updatedSelectedRows.indexOf(checkbox), 1);
    } else {
      // 그렇지 않으면 선택
      updatedSelectedRows.push(checkbox);
    }
    setSelectedRows(updatedSelectedRows);
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      // 전체 선택 상태에서 전체 선택 체크박스를 클릭하면 모두 선택 해제
      setSelectedRows([]);
    } else {
      // 그렇지 않으면 모두 선택
      setSelectedRows(worksheetList.map((worksheet) => worksheet.id));
    }
  };

  const handleFavoriteQuestion = (questionSeq: number) => {
    // postFavoriteQuestion({ isFavorited, setIsFavorited }, questionSeq);
  };

  useEffect(() => {
    mountCount++;
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      console.log('학습지 리스트 불러오는 API 함수');
    }
  }, [didMount, page, MenuCode]);

  return (
    <>
      <S.tablecontainer>
        <S.table>
          <S.thead>
            <S.tr>
              <S.th rowSpan={2} style={{ width: '60px' }}>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={isAllSelected}
                ></input>
              </S.th>
              <S.th rowSpan={2} style={{ width: '60px' }}></S.th>
              <S.th rowSpan={2} style={{ width: '80px' }}>
                학년
              </S.th>
              <S.th rowSpan={2} style={{ width: '100px' }}>
                태그
              </S.th>
              <S.th rowSpan={2} style={{ width: '620px' }}>
                학습지명
              </S.th>
              <S.th rowSpan={2} style={{ width: '100px' }}>
                등록일
              </S.th>
              <S.th rowSpan={2} style={{ width: '80px' }}>
                작성자
              </S.th>
              <S.th rowSpan={2} style={{ width: '80px' }}>
                미리보기
              </S.th>
              <S.th rowSpan={2} style={{ width: '80px' }}>
                설정
              </S.th>
            </S.tr>
          </S.thead>
          <S.tbody>
            {worksheetList.map((worksheet, i) => (
              <S.tr key={i}>
                <S.td style={{ height: '10px', textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(worksheet.id)}
                    onChange={() => handleRowSelect(worksheet.id)}
                  ></input>
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleFavoriteQuestion(worksheet.id)}
                  >
                    {worksheet.favorited ? (
                      <BookmarkTwoToneIcon fontSize="small" />
                    ) : (
                      <BookmarkBorderTwoToneIcon fontSize="small" />
                    )}
                  </div>
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  {worksheet.schoolLevel}
                </S.td>
                <S.td style={{ textAlign: 'center' }}>{worksheet.tag}</S.td>
                <S.td style={{ textAlign: 'center' }}>
                  {worksheet.WorksheetName}
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  {worksheet.createdAt}
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      maxWidth: '200px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {worksheet.creater}
                  </div>
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  <div style={{ cursor: 'pointer' }}>
                    <PlagiarismOutlinedIcon />
                  </div>
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  <div style={{ cursor: 'pointer' }}>
                    <MoreVertIcon />
                  </div>
                </S.td>
              </S.tr>
            ))}
          </S.tbody>
        </S.table>
      </S.tablecontainer>
      <PaginationBox itemsCountPerPage={10} totalItemsCount={totalPage} />
    </>
  );
};

const S = {
  tablecontainer: styled.div`
    display: flex;
    justify-content: center;
    height: 400px;
    overflow: auto;
  `,
  table: styled.table`
    border-collapse: collapse;
    background-color: white;
    height: 10px;
  `,
  thead: styled.thead`
    font-size: medium;
  `,
  tbody: styled.tbody`
    font-size: small;
  `,
  tr: styled.tr`
    height: 30px;
  `,
  th: styled.th`
    border: 1px solid #a3aed0;
    color: #a3aed0;
  `,
  td: styled.td`
    border: 1px solid #a3aed0;
  `,
};

export default WorksheetTable;
