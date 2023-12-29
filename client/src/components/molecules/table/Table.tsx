import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';

import BookmarkBorderTwoToneIcon from '@mui/icons-material/BookmarkBorderTwoTone';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';

import { IconButton, Loader, ValueNone } from '../../../components';
import {
  createWorksheetStep1BoolAtom,
  createWorksheetStep2BoolAtom,
  editWorksheetBoolAtom,
} from '../../../state/creatingWorksheetAtom';
import {
  MemberTableType,
  QuestionTableType,
  WorksheetTableType,
} from '../../../types';
import { COLOR } from '../../constants';

type TheadItemProps = {
  th: { title: string; rowSpan?: number; colspan?: number }[];
};

type TableProps = {
  list: QuestionTableType[] | WorksheetTableType[] | MemberTableType[];
  colWidth?: { width: string }[];
  width?: string;
  theadList: TheadItemProps[];
  btnOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export function Table({
  list,
  colWidth,
  width,
  theadList,
  btnOnClick,
}: TableProps) {
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
  const [checkList, setCheckList] = useState<string[]>([]);

  //학습지 팝업
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

  // 체크박스 설정
  // TODO: id값 또는 key값 테이블 아이템 고유값 통일 필요
  const handleAllCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckList(list.map((item) => item.key as string));
    } else {
      setCheckList([]);
    }
  };
  const handleSingleCheck = (checked: boolean, id: string) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckList((prev) => [...prev, id]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckList(checkList.filter((el) => el !== id));
    }
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
    console.log(list && list[1]);
    //학습지 이름을 가졌을시
    if (theadList[1].th[0].title === '문항코드')
      setTbodyType('questionTableType');
    //문항코드를 가졌을시
    if (theadList[3].th[0].title === '학습지명')
      setTbodyType('worksheetTableType');
    //회원 아이디를 가졌을시
    if (theadList[1].th[0].title === '아이디') setTbodyType('memberTableType');
  };

  useEffect(() => {
    creatTbody();
    creatColspanList();
    // setCheckedList([]);
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
          {tbodyType !== 'worksheetTableType' && (
            <th rowSpan={2}>
              <input
                type="checkbox"
                onChange={(e) => handleAllCheck(e)}
                checked={checkList.length === list.length ? true : false}
              />
            </th>
          )}

          {theadList.map(
            (item) =>
              item.th.length === 1 && (
                <th
                  key={`colgroup${item.th[0].title}`}
                  rowSpan={item.th[0]?.rowSpan}
                  colSpan={item.th[0]?.colspan}
                  className={item.th[0]?.rowSpan ? '' : 'padding'}
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
      {/* {tbodyType === '' && (
        <ValueNoneWrap>
          <Loader size="50px" />
        </ValueNoneWrap>
      )} */}
      {list.length === 0 && (
        <ValueNoneWrap>
          <ValueNone />
        </ValueNoneWrap>
      )}
      {/* 학습지 tbody */}
      {tbodyType === 'worksheetTableType' && (
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
      {tbodyType === 'questionTableType' && (
        <tbody>
          {list.map((content) => (
            <tr key={content?.questionCode}>
              <td>
                <input
                  type="checkbox"
                  // checked={selectedRows.includes(content.contentSeq)}
                  // onChange={() => selectRow(content.contentSeq)}
                />
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
      {/* 회원관리 tbody */}
      {tbodyType === 'memberTableType' && (
        <tbody>
          {list.map((member) => (
            <tr key={member.key}>
              <td>
                <input
                  type="checkbox"
                  // checked={selectedRows.includes(content.contentSeq)}
                  // onChange={() => selectRow(content.contentSeq)}
                  onChange={(e) =>
                    handleSingleCheck(e.target.checked, member.key as string)
                  }
                  // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                  checked={
                    checkList.includes(member.key as string) ? true : false
                  }
                ></input>
              </td>
              <td>
                <span className="ellipsis">{member.name}</span>
              </td>
              <td>
                <span className="ellipsis">{member.id}</span>
              </td>
              <td>
                <span className="ellipsis">{member.authority?.name}</span>
              </td>
              <td>
                <span className="ellipsis">{member.createdDate}</span>
              </td>
              <td>
                <span className="ellipsis">
                  {member.enabled === true ? '활성' : '비활성'}
                </span>
              </td>
              <td>
                <span className="center">
                  <button
                    type="button"
                    className="lineBtn"
                    value={member.key}
                    onClick={(event) => btnOnClick?.(event)}
                  >
                    보기
                  </button>
                </span>
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
    > button {
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
  }
  .lineBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    margin: 0;
    width: 60px;
    height: 30px;
    font-size: 12px;
    font-weight: bold;
    border-radius: 5px;
    background-color: #fff;
    color: #1565c0;
    border: 1px solid #1565c0;
    cursor: pointer;
  }
  .center {
    display: flex;
    align-items: center;
    justify-content: center;
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

const ValueNoneWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
