import * as React from 'react';
import { useState } from 'react';

import BookmarkBorderTwoToneIcon from '@mui/icons-material/BookmarkBorderTwoTone';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import { styled } from 'styled-components';

import { Button, IconButton } from '../../../components';
import { COLOR } from '../../../components/contents';

export type TableItemProps = {
  contentSeq: number;
  questionSeq: number;
  favorited: boolean;
  questionCode: string; //문항코드
  curriculum: string; //개정과정
  schoolLevel: string; //학교급
  schoolYear: string; //학년
  semester: string; //학기
  unitMajor: string; //대분류
  unitMiddle: string; //중분류
  questionType: string; //문항타입??
  questionCreatedByName: string; //작성자
  questionCreatedDate: string; //일자
  serviced: boolean; //오픈여부
};

type TableProps = {
  list: TableItemProps[];
  colWidth?: { width: string }[];
  width?: string;
};

export function Table({ list, colWidth, width }: TableProps) {
  return (
    <Component cellSpacing="0" cellPadding="0" width={width}>
      {colWidth && (
        <colgroup>
          {colWidth.map((column, index) => (
            <col
              key={`colgroup-${index}`}
              style={{ width: `${column.width}` }}
            />
          ))}
        </colgroup>
      )}
      <thead>
        <tr>
          {/* {theadList.map(() => )} */}
          <th rowSpan={2}>
            <input
              type="checkbox"
              // onChange={selectAll}
              // checked={isAllSelected}
            ></input>
          </th>
          <th rowSpan={2}></th>
          <th rowSpan={2}>문항코드</th>
          <th rowSpan={2}>개정과정</th>
          <th rowSpan={2}>학교</th>
          <th rowSpan={2}>학년</th>
          <th rowSpan={2}>학기</th>
          <th rowSpan={2}>대분류</th>
          <th rowSpan={2}>중분류</th>
          <th rowSpan={2}>문항타입</th>
          <th colSpan={3}>업로드</th>
        </tr>
        <tr>
          <th>작성자</th>
          <th>일자</th>
          <th>오픈여부</th>
        </tr>
      </thead>
      <tbody>
        {list.map((content) => (
          <tr key={content.questionCode}>
            <td>
              <input
                type="checkbox"
                // checked={selectedRows.includes(content.contentSeq)}
                // onChange={() => selectRow(content.contentSeq)}
              ></input>
            </td>
            <td>
              <span className="ellipsis">
                <IconButton
                  onClick={() => {
                    // addFavoriteQuestion(content.questionSeq)
                  }}
                  $iconOlny
                  $borderNone
                  $padding={'0'}
                  $margin={'-2px'}
                  width={'20px'}
                  height={'20px'}
                >
                  {content.favorited ? (
                    <BookmarkTwoToneIcon fontSize="small" />
                  ) : (
                    <BookmarkBorderTwoToneIcon fontSize="small" />
                  )}
                </IconButton>
              </span>
            </td>
            <td className="textAlignLeft">
              <span className="ellipsis">{content.questionCode}</span>
            </td>
            <td>
              <span className="ellipsis">{content.curriculum}</span>
            </td>
            <td>
              <span className="ellipsis">{content.schoolLevel}</span>
            </td>
            <td>
              <span className="ellipsis">{content.schoolYear}</span>
            </td>
            <td>
              <span className="ellipsis">{content.semester}</span>
            </td>
            <td>
              <span className="ellipsis">{content.unitMajor}</span>
            </td>
            <td>
              <span className="ellipsis">{content.unitMiddle}</span>
            </td>
            <td>
              <span className="ellipsis">{content.questionType}</span>
            </td>
            <td>
              <span className="ellipsis">{content.questionCreatedByName}</span>
            </td>
            <td>
              <span className="ellipsis">{content.questionCreatedDate}</span>
            </td>
            <td>
              <span className="ellipsis">{content.serviced ? 'Y' : 'N'}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </Component>
  );
}

type TableStyleProps = {
  width?: string;
};

const Component = styled.table<TableStyleProps>`
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
  background-color: #fff;
  border-collapse: collapse;
  background-color: white;
  table-layout: fixed;

  thead {
    font-size: medium;
  }
  tbody {
    font-size: small;
  }

  tr {
  }
  th {
    border: 1px solid ${COLOR.SECONDARY};
    color: ${COLOR.SECONDARY};
  }
  td {
    border: 1px solid ${COLOR.SECONDARY};
    padding: 10px;
    text-align: center;
  }
  .textAlignLeft {
    text-align: left;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
