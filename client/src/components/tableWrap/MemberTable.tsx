import * as React from 'react';
import { useEffect, useState } from 'react';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import styled from 'styled-components';

import { getMemberList } from '../../api/getAxios';
import { putDisableMember } from '../../api/putAxios';
import {
  editerBoolAtom,
  registerBoolAtom,
  memberKeyValueAtom,
} from '../../state/memberAtom';
import { alertBoolAtom, pageAtom, totalPageAtom } from '../../state/utilAtom';
import { createListCodeValueAtom } from '../../state/valueAtom';
import { COLOR } from '../contents/COLOR';
import { SelectAlert } from '../molecules/alert/SelectAlert';
import { PaginationBox } from '../molecules/pagination/Pagination';

type memberListProps = {
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

export function MemberTable({
  searchMemberList,
}: {
  searchMemberList: memberListProps[];
}) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [memberList, setMemberList] = useState<memberListProps[]>([]);
  const setKeyValue = useSetRecoilState(memberKeyValueAtom);
  const setIsEdit = useSetRecoilState(editerBoolAtom);
  const relode = useRecoilValue(registerBoolAtom);
  const [value, setValue] = useState('1');
  const [isEnabled, setIsEnabled] = useState(false);
  const setIsAlertOpen = useSetRecoilState(alertBoolAtom);
  const [didMount, setDidMount] = useState(false);

  let mountCount = 1;

  const [totalPage, settotalPage] = useRecoilState(totalPageAtom);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [page, setPage] = useRecoilState(pageAtom);
  const size = 8;

  const changeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setSelectedRows([]);
    // 현재 페이지 업데이트 후 showMemberList 호출
    if (page !== 1) {
      setPage(1);
      setCurrentPage(1);
    }
    showMemberList(newValue === '2' ? 'Y' : newValue === '3' ? 'N' : '');
  };

  const isAllSelected =
    memberList?.length > 0 && selectedRows.length === memberList.length;

  const selectRow = (checkbox: string) => {
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

  const selectAll = () => {
    if (isAllSelected) {
      // 전체 선택 상태에서 전체 선택 체크박스를 클릭하면 모두 선택 해제
      setSelectedRows([]);
    } else {
      // 그렇지 않으면 모두 선택
      setSelectedRows(memberList?.map((member) => member.id));
    }
  };
  const [enabled, setEnabled] = useState<string | undefined>();
  const showMemberList = (enabled: string) => {
    setEnabled(enabled);
    getMemberList({
      setMemberList,
      settotalPage,
      page: currentPage,
      size,
      enabled,
    });
  };

  const openDisableAlert = () => {
    setIsEnabled(true);
    setIsAlertOpen(true);
  };

  const submitDisabled = () => {
    putDisableMember({
      selectedRows,
      setIsEnabled,
    });
  };

  useEffect(() => {
    mountCount++;
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (searchMemberList) {
      setMemberList(searchMemberList);
    }
  }, [searchMemberList]);

  useEffect(() => {
    if (didMount) {
      getMemberList({
        setMemberList,
        settotalPage,
        page,
        size,
        enabled,
      });
    }
  }, [didMount, relode, setMemberList, page]);

  /** 상세정보 보기 버튼*/
  const openDetailInformationPopup = (key: string) => {
    setKeyValue(key);
    setIsEdit(true);
  };

  return (
    <>
      <Container>
        <Box sx={{ typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderColor: 'divider' }}>
              <TabList onChange={changeTab}>
                <Tab
                  label="전체"
                  value="1"
                  style={{ fontSize: '16px', fontWeight: 'bold' }}
                />
                <Tab
                  label="활성화"
                  value="2"
                  style={{ fontSize: '16px', fontWeight: 'bold' }}
                />
                <Tab
                  label="비활성화"
                  value="3"
                  style={{ fontSize: '16px', fontWeight: 'bold' }}
                />
              </TabList>
            </Box>
          </TabContext>
        </Box>
        <StyledAbledBtn
          variant="outlined"
          onClick={openDisableAlert}
          sx={{ backgroundColor: 'white' }}
        >
          비활성화
        </StyledAbledBtn>
      </Container>
      <Table>
        <Thead>
          <Tr>
            <Th rowSpan={2} style={{ width: '40px' }}>
              <input
                type="checkbox"
                onChange={selectAll}
                checked={isAllSelected}
              ></input>
            </Th>
            <Th rowSpan={2} style={{ width: '200px' }}>
              이름
            </Th>
            <Th rowSpan={2} style={{ width: '200px' }}>
              아이디
            </Th>
            <Th rowSpan={2} style={{ width: '200px' }}>
              권한
            </Th>
            <Th rowSpan={2} style={{ width: '250px' }}>
              등록일
            </Th>
            <Th rowSpan={2} style={{ width: '80px' }}>
              상태
            </Th>
            <Th rowSpan={2} style={{ width: '80px' }}>
              상세정보
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {memberList?.map((member, i) => (
            <Tr key={i}>
              <Td style={{ textAlign: 'center' }}>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(member.id)}
                  onChange={() => selectRow(member.id)}
                ></input>
              </Td>
              <Td style={{ textAlign: 'center' }}>{member.name}</Td>
              <Td style={{ textAlign: 'center' }}>{member.id}</Td>
              <Td style={{ textAlign: 'center' }}>{member.authority.name}</Td>
              <Td style={{ textAlign: 'center' }}>{member.createdDate}</Td>
              <Td style={{ textAlign: 'center' }}>
                {member.enabled === true ? '활성' : '비활성'}
              </Td>
              <Td style={{ textAlign: 'center' }}>
                <ButtonWrapper>
                  <StyledDisabledBtn
                    variant="outlined"
                    onClick={() => openDetailInformationPopup(member.key)}
                  >
                    보기
                  </StyledDisabledBtn>
                </ButtonWrapper>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <PaginationBox itemsCountPerPage={10} totalItemsCount={totalPage} />
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
}

const Container = styled.div`
  padding: 20px 0px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const Table = styled.table`
  border-collapse: collapse;
  background-color: white;
`;
const Thead = styled.thead`
  font-size: medium;
`;
const Tbody = styled.tbody`
  font-size: small;
`;
const Tr = styled.tr`
  height: 50px;
`;
const Th = styled.th`
  border: 1px solid ${COLOR.BORDER_BLUE};
  color: ${COLOR.BORDER_BLUE};
`;
const Td = styled.td`
  border: 1px solid ${COLOR.BORDER_BLUE};
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
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
