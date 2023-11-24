import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PaginationBox from '../../components/pagination/Pagination';
import { useRecoilValue, useRecoilState } from 'recoil';
import { PageAtom, totalPageState } from '../../recoil/UtilState';
import {
  CreateListCodeValue,
  SearchValue,
  CheckBoxValue,
  IsChangedServicedValue,
} from '../../recoil/ValueState';
import { getQuestionList } from '../../api/GetAxios';
import { postFavoriteQuestion } from '../../api/PostAxios';

import BookmarkBorderTwoToneIcon from '@mui/icons-material/BookmarkBorderTwoTone';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';

type QuestionListType = {
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

const ListTable = () => {
  const searchValue = useRecoilValue(SearchValue);
  const [isChangedServiced, setIsChangedServiced] = useRecoilState(
    IsChangedServicedValue,
  );
  const [isFavorited, setIsFavorited] = useState(false);
  const [questionList, setQuestionList] = useState<QuestionListType[]>([]);

  const [totalPage, setTotalPage] = useRecoilState(totalPageState);
  const page = useRecoilValue(PageAtom);
  const size = 10;
  const MenuCode = useRecoilValue(CreateListCodeValue);

  const [didMount, setDidMount] = useState(false);
  let mountCount = 1;

  const [selectedRows, setSelectedRows] =
    useRecoilState<number[]>(CheckBoxValue);
  const isAllSelected = selectedRows.length === questionList.length;

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
      setSelectedRows(questionList.map((content) => content.contentSeq));
    }
  };

  const handleFavoriteQuestion = (questionSeq: number) => {
    postFavoriteQuestion({ isFavorited, setIsFavorited }, questionSeq);
  };

  useEffect(() => {
    mountCount++;
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      getQuestionList({
        //즐겨찾기 문항 리스트 불러올 경우
        //전역상태 관리로 즐겨찾기 관리 후 상황에 맞게 해당 상태값을 전달해서
        //API 파라미터에 추가해주기
        setQuestionList,
        setIsChangedServiced,
        setTotalPage,
        searchValue,
        MenuCode,
        page,
        size,
      });
    }
  }, [didMount, page, MenuCode, searchValue, isChangedServiced, isFavorited]);

  return (
    <>
      <S.tablecontainer>
        <S.table>
          <S.thead>
            <S.tr>
              <S.th rowSpan={2} style={{ width: '40px' }}>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={isAllSelected}
                ></input>
              </S.th>
              <S.th rowSpan={2} style={{ width: '40px' }}></S.th>
              <S.th rowSpan={2} style={{ width: '350px' }}>
                문항코드
              </S.th>
              <S.th rowSpan={2} style={{ width: '40px' }}>
                개정과정
              </S.th>
              <S.th rowSpan={2} style={{ width: '40px' }}>
                학교
              </S.th>
              <S.th rowSpan={2} style={{ width: '40px' }}>
                학년
              </S.th>
              <S.th rowSpan={2} style={{ width: '40px' }}>
                학기
              </S.th>
              <S.th rowSpan={2} style={{ width: '200px' }}>
                대분류
              </S.th>
              <S.th rowSpan={2} style={{ width: '250px' }}>
                중분류
              </S.th>
              <S.th rowSpan={2} style={{ width: '40px' }}>
                문항타입
              </S.th>
              <S.th colSpan={3}>업로드</S.th>
            </S.tr>
            <S.tr>
              <S.th style={{ width: '60px' }}>작성자</S.th>
              <S.th style={{ width: '80px' }}>일자</S.th>
              <S.th style={{ width: '40px' }}>오픈여부</S.th>
            </S.tr>
          </S.thead>
          <S.tbody>
            {questionList.map((content, i) => (
              <S.tr key={i}>
                <S.td style={{ height: '10px', textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(content.contentSeq)}
                    onChange={() => handleRowSelect(content.contentSeq)}
                  ></input>
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleFavoriteQuestion(content.questionSeq)}
                  >
                    {content.favorited ? (
                      <BookmarkTwoToneIcon fontSize="small" />
                    ) : (
                      <BookmarkBorderTwoToneIcon fontSize="small" />
                    )}
                  </div>
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  {content.questionCode}
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  {content.curriculum}
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  {content.schoolLevel}
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  {content.schoolYear}
                </S.td>
                <S.td style={{ textAlign: 'center' }}>{content.semester}</S.td>
                <S.td style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      maxWidth: '200px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {content.unitMajor}
                  </div>
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      maxWidth: '250px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {content.unitMiddle}
                  </div>
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  {content.questionType}
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  {content.questionCreatedByName}
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  {content.questionCreatedDate}
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  {content.serviced ? 'Y' : 'N'}
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

export default ListTable;
