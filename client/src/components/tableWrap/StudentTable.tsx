import * as React from 'react';

import styled from 'styled-components';

import dummy from '../constants/data.json';

export function TablePopup() {
  const studentList = dummy.Student;
  return (
    <div style={{ height: '400px', overflow: 'auto' }}>
      <Table>
        <Caption>수강생 목록</Caption>
        <Thead>
          <Tr>
            <Th>NO</Th>
            <Th>수강생 이름</Th>
            <Th>학년</Th>
            <Th>휴대번호</Th>
          </Tr>
        </Thead>
        <Tbody>
          {studentList.map((student) => (
            <Tr key={student.id}>
              <Td>{student.id}</Td>
              <Td>{student.name}</Td>
              <Td>{student.grade}</Td>
              <Td>{student.phone}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

const Table = styled.table`
  border-collapse: collapse;
`;
const Caption = styled.caption`
  font-size: 20px;
  margin-left: -285px;
  margin-bottom: 10px;
  color: #8a8a8a;
`;
const Thead = styled.thead`
  height: 50px;
  font-size: medium;
`;
const Tbody = styled.tbody`
  height: 50px;
  font-size: small;
`;
const Tr = styled.tr`
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
`;
const Th = styled.th`
  width: 70px;
  background-color: #efefef;
  border: 1px solid #a1a1a1;
`;
const Td = styled.td`
  border: 1px solid #a1a1a1;
  height: 50px;
`;
