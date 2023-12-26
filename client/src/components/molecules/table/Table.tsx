import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';

import BookmarkBorderTwoToneIcon from '@mui/icons-material/BookmarkBorderTwoTone';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import { styled } from 'styled-components';

import { Button, IconButton } from '../../../components';
import { TableItemType } from '../../../types';
import { COLOR } from '../../constants';

type TheadItemProps = {
  th: { title: string; rowSpan?: number; colspan?: number }[];
};

type TableProps = {
  list: TableItemType[];
  colWidth?: { width: string }[];
  width?: string;
  theadList: TheadItemProps[];
};

export function Table({ list, colWidth, width, theadList }: TableProps) {
  const [isColspan, setIsColspan] = useState<boolean>(false);
  const [colspanList, setcolspanList] = useState<TheadItemProps[]>([
    {
      th: [
        {
          title: '',
        },
      ],
    },
  ]);

  const findColspan = (element: TheadItemProps) => {
    if (element.th[0].colspan && element.th[0].colspan > 1) {
      return true;
    }
  };

  const creatColspanList = useCallback(() => {
    const findIndex = theadList.findIndex(findColspan);
    if (findIndex) {
      setIsColspan(true);
      const filterList: TheadItemProps[] = theadList.filter(
        (item) => item.th.length > 1,
      );
      // console.log(filterList);
      //마지막 th 두줄일 경우만 적용 TODO: 더 복잡해지는 테이블일경우 개선 필요
      setcolspanList(filterList);
    }
  }, [theadList]);

  useEffect(() => {
    creatColspanList();
  }, []);

  return (
    <Component cellSpacing="0" cellPadding="0" width={width}>
      {colWidth && (
        <colgroup>
          {colWidth.map((column, index) => (
            <col
              key={`colgroup${index}`}
              style={{ width: `${column.width}` }}
            />
          ))}
        </colgroup>
      )}
      <thead>
        <tr>
          <th rowSpan={2}>
            <input
              type="checkbox"
              // onChange={selectAll}
              // checked={isAllSelected}
            ></input>
          </th>

          {theadList.map(
            (item) =>
              item.th.length === 1 && (
                <th
                  key={`colgroup${item.th[0].title}`}
                  rowSpan={item.th[0]?.rowSpan}
                  colSpan={item.th[0]?.colspan}
                >
                  {item.th[0].title}
                </th>
              ),
          )}
        </tr>
        {/* colspan 열 th */}
        {isColspan && (
          <tr>
            {colspanList[0].th.map((item) => (
              <th key={`colgroup${item.title}`}>{item.title}</th>
            ))}
          </tr>
        )}
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
                    // addFavoriteQuestion(content.questionSeq);
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
              <span className="hide">{content.questionCreatedDate}</span>
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
    font-size: 14px;
    font-weight: bold;
  }
  td {
    border: 1px solid ${COLOR.SECONDARY};
    padding: 10px;
    text-align: center;
    font-size: 13px;
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
  .hide {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;
