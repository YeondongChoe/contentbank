import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getCookie, setCookie } from '../../utils/ReactCookie';
import PaginationBox from '../../components/pagination/Pagination';
import { useRecoilValue, useRecoilState } from 'recoil';
import { PageAtom } from '../../recoil/UtilState';
import {
  CreateListCodeValue,
  SearchValue,
  CheckBoxValue,
  IsChangedServicedValue,
} from '../../recoil/ValueState';

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
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };
  const [totalPage, setTotalPage] = useState(1);
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

  const getQuestionList = async () => {
    await axios
      .get(
        `/question-service/api/v1/questions?keyword=${
          searchValue || ''
        }&page=${page}&size=${size}&menuCode=${MenuCode}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        },
      )
      .then((response) => {
        if (response.status === 200) {
          if (response.headers['authorization'] !== getCookie('accessToken')) {
            setCookie('accessToken', response.headers['authorization'], {
              path: '/',
              sameSite: 'strict',
              secure: false,
            });
          }
        }
        setTotalPage(response.data.data.totalElements);
        const formattedQuestionList = response.data.data.content.map(
          (content: any) => ({
            ...content,
            questionCreatedDate: formatDate(content.questionCreatedDate),
          }),
        );
        setQuestionList(formattedQuestionList);
        setIsChangedServiced(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const postFavoriteQuestion = async (questionSeq: number) => {
    await axios
      .post(
        `/question-service/api/v1/questions/${questionSeq}/favorite`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        },
      )
      .then((response) => {
        if (response.status === 200) {
          if (response.headers['authorization'] !== getCookie('accessToken')) {
            setCookie('accessToken', response.headers['authorization'], {
              path: '/',
              sameSite: 'strict',
              secure: false,
            });
          }
        }
        setIsFavorited(!isFavorited);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleFavoriteQuestion = (questionSeq: number) => {
    postFavoriteQuestion(questionSeq);
  };

  useEffect(() => {
    mountCount++;
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      getQuestionList();
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
                <S.td align="center" style={{ height: '10px' }}>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(content.contentSeq)}
                    onChange={() => handleRowSelect(content.contentSeq)}
                  ></input>
                </S.td>
                <S.td align="center">
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
                <S.td align="center">{content.questionCode}</S.td>
                <S.td align="center">{content.curriculum}</S.td>
                <S.td align="center">{content.schoolLevel}</S.td>
                <S.td align="center">{content.schoolYear}</S.td>
                <S.td align="center">{content.semester}</S.td>
                <S.td align="center">
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
                <S.td align="center">
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
                <S.td align="center">{content.questionType}</S.td>
                <S.td align="center">{content.questionCreatedByName}</S.td>
                <S.td align="center">{content.questionCreatedDate}</S.td>
                <S.td align="center">{content.serviced ? 'Y' : 'N'}</S.td>
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
