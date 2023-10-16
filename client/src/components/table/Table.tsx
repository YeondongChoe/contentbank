import React from 'react';
import dummy from '../table/data.json';
import styled from 'styled-components';

const Table = () => {
  const studentList = dummy.Student;
  return (
    <div style={{ height: '400px', overflow: 'auto' }}>
      <S.table>
        <S.caption>수강생 목록</S.caption>
        <S.thead>
          <S.tr>
            <S.th>NO</S.th>
            <S.th>수강생 이름</S.th>
            <S.th>학년</S.th>
            <S.th>휴대번호</S.th>
          </S.tr>
        </S.thead>
        <S.tbody>
          {studentList.map((student) => (
            <S.tr key={student.id}>
              <S.td>{student.id}</S.td>
              <S.td>{student.name}</S.td>
              <S.td>{student.grade}</S.td>
              <S.td>{student.phone}</S.td>
            </S.tr>
          ))}
        </S.tbody>
      </S.table>
    </div>
  );
};

const S = {
  table: styled.table`
    border-collapse: collapse;
  `,
  caption: styled.caption`
    font-size: 20px;
    margin-left: -285px;
    margin-bottom: 10px;
    color: #8a8a8a;
  `,
  thead: styled.thead`
    height: 50px;
    font-size: medium;
  `,
  tbody: styled.tbody`
    height: 50px;
    font-size: small;
  `,
  tr: styled.tr`
    > :nth-child(1) {
      border-left: none;
    }
    > :nth-child(2) {
      width: 120px;
    }
    > :nth-child(4) {
      width: 170px;
      border-right: none;
    }
  `,
  th: styled.th`
    width: 70px;
    background-color: #efefef;
    border: 1px solid #a1a1a1;
  `,
  td: styled.td`
    border: 1px solid #a1a1a1;
    height: 50px;
  `,
};

export default Table;
