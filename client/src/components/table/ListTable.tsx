import React, { useState } from 'react';
import dummy from './data.json';
import styled from 'styled-components';
import BookmarkBorderTwoToneIcon from '@mui/icons-material/BookmarkBorderTwoTone';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';

const ListTable = () => {
  const [isBookMark, setIsBookMark] = useState(false);

  const ContentList = dummy.List;

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const isAllSelected = selectedRows.length === ContentList.length;

  const handleRowSelect = (checkbox: string) => {
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
      setSelectedRows(ContentList.map((content) => content.id));
    }
  };

  const handleClickBookmark = () => {
    setIsBookMark(!isBookMark);
  };

  return (
    <S.tablecontainer>
      <S.table>
        <S.thead>
          <S.tr>
            <S.th rowSpan={2}>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={isAllSelected}
              ></input>
            </S.th>
            <S.th rowSpan={2}></S.th>
            <S.th rowSpan={2}> 문항코드</S.th>
            <S.th rowSpan={2}>개정과정</S.th>
            <S.th rowSpan={2}>학교</S.th>
            <S.th rowSpan={2}>학년</S.th>
            <S.th rowSpan={2}>학기</S.th>
            <S.th rowSpan={2}>대분류</S.th>
            <S.th rowSpan={2}>중분류</S.th>
            <S.th rowSpan={2}>문항타입</S.th>
            <S.th colSpan={3}>업로드</S.th>
          </S.tr>
          <S.tr>
            <S.th>작성자</S.th>
            <S.th>일자</S.th>
            <S.th>오픈여부</S.th>
          </S.tr>
        </S.thead>
        <S.tbody>
          {ContentList.map((content, i) => (
            <S.tr key={i}>
              <S.td style={{ width: '40px' }}>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(content.id)}
                  onChange={() => handleRowSelect(content.id)}
                ></input>
              </S.td>
              <S.td style={{ width: '40px' }}>
                {isBookMark ? (
                  <div onClick={handleClickBookmark}>
                    <BookmarkTwoToneIcon fontSize="small" />
                  </div>
                ) : (
                  <div onClick={handleClickBookmark}>
                    <BookmarkBorderTwoToneIcon fontSize="small" />
                  </div>
                )}
              </S.td>
              <S.td style={{ width: '350px' }}>{content.code}</S.td>
              <S.td style={{ width: '40px' }}>{content.revision}</S.td>
              <S.td style={{ width: '40px' }}>{content.level}</S.td>
              <S.td style={{ width: '40px' }}>{content.grade}</S.td>
              <S.td style={{ width: '40px' }}>{content.semester}</S.td>
              <S.td>
                <div
                  style={{
                    maxWidth: '200px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textAlign: 'center',
                  }}
                >
                  {content.mainCategory}
                </div>
              </S.td>
              <S.td>
                <div
                  style={{
                    maxWidth: '250px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textAlign: 'center',
                  }}
                >
                  {content.middleCategory}
                </div>
              </S.td>
              <S.td style={{ width: '40px' }}>{content.type}</S.td>
              <S.td style={{ width: '50px' }}>{content.writer}</S.td>
              <S.td style={{ width: '40px' }}>{content.date}</S.td>
              <S.td style={{ width: '40px' }}>{content.isOpen}</S.td>
            </S.tr>
          ))}
        </S.tbody>
      </S.table>
    </S.tablecontainer>
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
    background-color: #efefef;
    border: 1px solid #a1a1a1;
  `,
  td: styled.td`
    border: 1px solid #a1a1a1;
  `,
};

export default ListTable;
