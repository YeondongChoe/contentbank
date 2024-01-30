import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';

import { Loader, ValueNone } from '../../../components';
import {
  MemberTableType,
  QuestionTableType,
  WorksheetTableType,
} from '../../../types';
import { COLOR } from '../../constants';

import { MemberTbody, QuestionTbody, WorksheetTbody } from './tbody';

type TheadItemProps = {
  th: { title: string; rowSpan?: number; colspan?: number }[];
};

type TableProps = {
  list: QuestionTableType[] | WorksheetTableType[] | MemberTableType[];
  colWidth?: { width: string }[];
  width?: string;
  theadList: TheadItemProps[];
  btnOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setIsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  // setIsPreview?: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRows: React.Dispatch<React.SetStateAction<number[]>>;
};

export function Table({
  list,
  colWidth,
  width,
  theadList,
  btnOnClick,
  setIsEnabled,
  setSelectedRows,
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
  const [checkList, setCheckList] = useState<number[]>([]);

  // 체크박스 설정
  // 데이터 고유id값 seq : 기획 발표이후 변경될 수 있음
  const handleAllCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckList(list.map((item) => item.seq as number));
      setIsEnabled(false);
    } else {
      setCheckList([]);
      setIsEnabled(true);
    }
  };
  const handleSingleCheck = (checked: boolean, seq: number) => {
    if (checked) {
      setCheckList((prev) => [...prev, seq]);
    } else {
      setCheckList(checkList.filter((el) => el !== seq));
    }
  };

  const findColspan = (element: TheadItemProps) => {
    if (element.th[0].colspan && element.th[0].colspan > 1) {
      return true;
    } else {
      return false;
    }
  };

  // 테이블 고정 선언값 components/constants/TABLE.ts
  // 들어오는 데이터에 따라 thead 생성
  const creatColspanList = useCallback(() => {
    const findIndex = theadList.findIndex(findColspan);
    if (findIndex) {
      setIsColspan(true);
      const filterList: TheadItemProps[] = theadList.filter(
        (item) => item.th.length > 1,
      );
      // console.log(filterList);
      // 마지막 th 두줄일 경우만 적용 TODO: 더 복잡해지는 테이블일경우 개선 필요
      setcolspanList(filterList);
    }
  }, [theadList]);

  // 들어오는 데이터에 따라 tbody 생성
  const creatTbody = () => {
    //console.log(list && list[1]);
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
  }, []);

  useEffect(() => {
    setCheckList([]);
  }, [list]);

  useEffect(() => {
    // console.log(checkList);
    // 활성화 버튼 이용가능상태 // 데이터 전송
    if (checkList.length > 0) {
      setIsEnabled(false);
      setSelectedRows(checkList);
    } else {
      setIsEnabled(true);
    }
  }, [checkList]);

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
                style={{ width: '15px', height: '15px' }}
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
        <WorksheetTbody list={list as WorksheetTableType[]} />
      )}
      {/* 문항리스트 tbody */}
      {tbodyType === 'questionTableType' && (
        <QuestionTbody
          list={list as QuestionTableType[]}
          handleSingleCheck={handleSingleCheck}
          checkList={checkList}
        />
      )}
      {/* 회원관리 tbody */}
      {tbodyType === 'memberTableType' && (
        <MemberTbody
          list={list as MemberTableType[]}
          handleSingleCheck={handleSingleCheck}
          checkList={checkList}
          setCheckList={setCheckList}
          btnOnClick={btnOnClick}
        />
      )}
      {/* 권한관리 tbody */}
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
  table-layout: fixed;

  thead {
    font-size: medium;
  }
  tbody {
    font-size: small;
  }

  /* tr {
  } */
  th {
    border-top: 1px solid ${COLOR.BORDER_GRAY};
    border-bottom: 1px solid ${COLOR.BORDER_GRAY};
    font-size: 15px;
    font-weight: bold;
    background-color: ${COLOR.TABLE_GRAY};

    &.padding {
      padding: 10px;
    }
  }
  /* td {
    //border-bottom: 1px solid ${COLOR.BORDER_GRAY};
    padding: 10px;
    text-align: center;
    //font-size: 15px;
    > button {
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
  } */
  .lineBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    margin: 0;
    width: 70px;
    height: 35px;
    font-size: 15px;
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

const ValueNoneWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
