import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { editer, register, memberKeyValue } from '../../recoil/MemberState';
import SelectAlert from '../alert/SelectAlert';
import { alertState } from '../../recoil/UtilState';
import { getMemberList } from '../../api/GetAxios';
import { memberDisabled } from '../../api/PutAxios';

import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

type MemberListType = {
  seq: number;
  authority: {
    seq: number;
    code: string;
    name: string;
    sort: number;
  };
  name: string;
  key: string;
  id: string;
  comment: null;
  createdBy: null;
  createdDate: string;
  lastModifiedBy: null;
  lastModifiedDate: string;
  enabled: boolean;
};

const MemberTable = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [memberList, setMemberList] = useState<MemberListType[]>([]);
  const setKeyValue = useSetRecoilState(memberKeyValue);
  const setIsEdit = useSetRecoilState(editer);
  const relode = useRecoilValue(register);
  const [value, setValue] = React.useState('1');
  const [isEnabled, setIsEnabled] = useState(false);
  const setIsAlertOpen = useSetRecoilState(alertState);
  const [didMount, setDidMount] = useState(false);

  let mountCount = 1;

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setSelectedRows([]);
  };

  const isAllSelected =
    memberList?.length > 0 && selectedRows.length === memberList.length;

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
      setSelectedRows(memberList?.map((member) => member.id));
    }
  };

  const handleMemberList = (enabled: string) => {
    getMemberList({ setMemberList }, enabled);
  };

  const submitDisabled = () => {
    memberDisabled({
      selectedRows,
      setIsEnabled,
    });
  };

  const handleDisnabled = () => {
    setIsEnabled(true);
    setIsAlertOpen(true);
  };

  useEffect(() => {
    mountCount++;
    setDidMount(true);
    return () => {};
  }, []);

  useEffect(() => {
    if (didMount) {
      getMemberList({ setMemberList }, '');
    }
  }, [didMount, relode, setMemberList]);

  const handleDetailInfo = (key: string) => {
    setKeyValue(key);
    setIsEdit(true);
  };

  return (
    <>
      <S.mainContainer>
        <Box sx={{ typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderColor: 'divider' }}>
              <TabList onChange={handleChangeTab}>
                <Tab
                  label="전체"
                  value="1"
                  style={{ fontSize: '16px', fontWeight: 'bold' }}
                  onClick={() => handleMemberList('')}
                />
                <Tab
                  label="활성화"
                  value="2"
                  style={{ fontSize: '16px', fontWeight: 'bold' }}
                  onClick={() => handleMemberList('Y')}
                />
                <Tab
                  label="비활성화"
                  value="3"
                  style={{ fontSize: '16px', fontWeight: 'bold' }}
                  onClick={() => handleMemberList('N')}
                />
              </TabList>
            </Box>
          </TabContext>
        </Box>
        <S.btncontainer>
          <S.ableBtnWrapper>
            <StyledAbledBtn
              variant="outlined"
              onClick={handleDisnabled}
              sx={{ backgroundColor: 'white' }}
            >
              비활성화
            </StyledAbledBtn>
          </S.ableBtnWrapper>
        </S.btncontainer>
      </S.mainContainer>

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
              <S.th rowSpan={2} style={{ width: '200px' }}>
                이름
              </S.th>
              <S.th rowSpan={2} style={{ width: '200px' }}>
                아이디
              </S.th>
              <S.th rowSpan={2} style={{ width: '200px' }}>
                권한
              </S.th>
              <S.th rowSpan={2} style={{ width: '250px' }}>
                등록일
              </S.th>
              <S.th rowSpan={2} style={{ width: '80px' }}>
                상태
              </S.th>
              <S.th rowSpan={2} style={{ width: '80px' }}>
                상세정보
              </S.th>
            </S.tr>
          </S.thead>
          <S.tbody>
            {memberList?.map((member, i) => (
              <S.tr key={i}>
                <S.td style={{ textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(member.id)}
                    onChange={() => handleRowSelect(member.id)}
                  ></input>
                </S.td>
                <S.td style={{ textAlign: 'center' }}>{member.name}</S.td>
                <S.td style={{ textAlign: 'center' }}>{member.id}</S.td>
                <S.td style={{ textAlign: 'center' }}>
                  {member.authority.name}
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  {member.createdDate}
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  {member.enabled === true ? '활성' : '비활성'}
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  <S.btnWrapper onClick={() => handleDetailInfo(member.key)}>
                    <StyledDisabledBtn variant="outlined">
                      보기
                    </StyledDisabledBtn>
                  </S.btnWrapper>
                </S.td>
              </S.tr>
            ))}
          </S.tbody>
        </S.table>
      </S.tablecontainer>
      {isEnabled && (
        <SelectAlert
          title="비활성화 처리시 로그인이 불가합니다."
          description="비활성화 처리 하시겠습니까?"
          action="확인"
          onClick={submitDisabled}
        ></SelectAlert>
      )}
    </>
  );
};

const S = {
  mainContainer: styled.div`
    margin: 20px 115px 20px 115px;
    display: flex;
    justify-content: space-between;
  `,
  btncontainer: styled.div`
    display: flex;
    gap: 10px;
  `,
  ableBtnWrapper: styled.div`
    display: flex;
    align-items: flex-end;
  `,
  tablecontainer: styled.div`
    display: flex;
    justify-content: center;
    overflow: auto;
  `,
  table: styled.table`
    border-collapse: collapse;
    background-color: white;
  `,
  thead: styled.thead`
    font-size: medium;
  `,
  tbody: styled.tbody`
    font-size: small;
  `,
  tr: styled.tr`
    height: 50px;
  `,
  th: styled.th`
    border: 1px solid #a3aed0;
    color: #a3aed0;
  `,
  td: styled.td`
    border: 1px solid #a3aed0;
  `,
  btnWrapper: styled.div`
    display: flex;
    justify-content: center;
  `,
};

const StyledTd = styled.td`
  border: 1px solid #a3aed0;
`;

const StyledDisabledBtn = styled(Button)`
  && {
    font-size: 12px;
    line-height: normal;
  }
`;

const StyledAbledBtn = styled(Button)`
  && {
    width: 100px;
    height: 30px;
    border-radius: 5px;
    font-size: 13px;
    line-height: normal;
  }
`;
export default MemberTable;
