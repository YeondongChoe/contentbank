import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';

import BookmarkBorderTwoToneIcon from '@mui/icons-material/BookmarkBorderTwoTone';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';

import { IconButton } from '../../../components';
import {
  createWorksheetStep1BoolAtom,
  createWorksheetStep2BoolAtom,
  editWorksheetBoolAtom,
} from '../../../state/creatingWorksheetAtom';
import { TableItemType, TableWorksheetType } from '../../../types';
import { COLOR } from '../../constants';

type TheadItemProps = {
  th: { title: string; rowSpan?: number; colspan?: number }[];
};

type TableProps = {
  list: TableItemType[] | TableWorksheetType[];
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
  const [tbodyType, setTbodyType] = useState('');

  const [isStep1, setIsStep1] = useRecoilState(createWorksheetStep1BoolAtom);
  const [isStep2, setIsStep2] = useRecoilState(createWorksheetStep2BoolAtom);
  const setIsEditWorksheet = useSetRecoilState(editWorksheetBoolAtom);

  const openEditFilePopup = () => {
    setIsStep1(false);
    setIsStep2(true);
    setIsEditWorksheet(true);
  };
  // 학습지 설정 버튼
  const openSettingList = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    console.log(event.currentTarget.children[1].classList);
    event.currentTarget.children[1].classList.add('show');
  };
  const closeSettingList = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.currentTarget.children[1].classList.remove('show');
  };

  const findColspan = (element: TheadItemProps) => {
    if (element.th[0].colspan && element.th[0].colspan > 1) {
      return true;
    } else {
      return false;
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

  const creatTbody = () => {
    // console.log(theadList[3].th[0]);

    //학습지 이름을 가졌을시
    if (theadList[1].th.some((value) => value.title == '문항코드'))
      setTbodyType('TableItemType');
    //문항코드를 가졌을시
    if (theadList[3].th.some((value) => value.title == '학습지명'))
      setTbodyType('TableWorksheetType');
  };

  useEffect(() => {
    creatTbody();
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
          {tbodyType === 'TableItemType' && (
            <th rowSpan={2}>
              <input
                type="checkbox"
                // onChange={selectAll}
                // checked={isAllSelected}
              ></input>
            </th>
          )}

          {theadList.map(
            (item) =>
              item.th.length === 1 && (
                <th
                  key={`colgroup${item.th[0].title}`}
                  rowSpan={item.th[0]?.rowSpan}
                  colSpan={item.th[0]?.colspan}
                  className={item.th[0]?.colspan ? '' : 'padding'}
                >
                  {item.th[0].title}
                </th>
              ),
          )}
        </tr>
        {/* colspan 열 th */}
        {isColspan && colspanList.length > 0 && (
          <tr>
            {colspanList[0].th.map((item) => (
              <th key={`colgroup${item.title}`}>{item.title}</th>
            ))}
          </tr>
        )}
      </thead>
      {/* 테이블 타입 별 tbody */}
      {/* 학습지 tbody */}
      {tbodyType === 'TableWorksheetType' && (
        <tbody>
          {list.map((content) => (
            <tr key={content?.id}>
              <td>
                <button
                  onClick={() => {
                    // addFavoriteQuestion(content.questionSeq);
                  }}
                >
                  {content.favorited ? (
                    <BookmarkTwoToneIcon fontSize="small" />
                  ) : (
                    <BookmarkBorderTwoToneIcon fontSize="small" />
                  )}
                </button>
              </td>
              <td>
                <span className="ellipsis">{content.schoolLevel}</span>
              </td>
              <td>
                <span className="ellipsis">{content.tag}</span>
              </td>
              <td className="textAlignLeft">
                <span className="ellipsis">{content.worksheetName}</span>
              </td>
              <td>
                <span className="ellipsis">{content.createdAt}</span>
              </td>
              <td>
                <span className="ellipsis">{content.creater}</span>
              </td>
              <td>
                <button onClick={() => {}}>
                  <PlagiarismOutlinedIcon />
                </button>
              </td>
              <td>
                <SettingButton
                  type="button"
                  onClick={(event) => openSettingList(event)}
                  onMouseLeave={(event) => closeSettingList(event)}
                >
                  <MoreVertIcon />
                  <SettingList>
                    <li>
                      <button
                        type="button"
                        onClick={(event) => {
                          openEditFilePopup();
                        }}
                      >
                        수정
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={(event) => {
                          openEditFilePopup();
                        }}
                      >
                        복제 후 수정
                      </button>
                    </li>
                    <li>
                      <button type="button" onClick={(event) => {}}>
                        삭제
                      </button>
                    </li>
                  </SettingList>
                </SettingButton>
              </td>
            </tr>
          ))}
        </tbody>
      )}
      {/* 문항리스트 tbody */}
      {tbodyType === 'TableItemType' && (
        <tbody>
          {list.map((content) => (
            <tr key={content?.questionCode}>
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
                <span className="ellipsis">
                  {content.questionCreatedByName}
                </span>
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
      )}
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

    &.padding {
      padding: 10px;
    }
  }
  td {
    border: 1px solid ${COLOR.SECONDARY};
    padding: 10px;
    text-align: center;
    font-size: 13px;
    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
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

const SettingButton = styled.button`
  position: relative;
  padding: 5px;
  margin: -5px;
`;

const SettingList = styled.ul`
  display: none;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border: 1px solid ${COLOR.SECONDARY};
  border-radius: 5px;
  overflow: hidden;
  z-index: 1;

  &.show {
    display: block;
  }

  li {
    width: 140px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      font-size: 14px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: #fff;
      color: ${COLOR.GRAY};
      transition: all 0.1s;
      z-index: 2;

      &:hover {
        background-color: ${COLOR.HOVER};
        color: ${COLOR.PRIMARY};
      }
    }
  }
`;
