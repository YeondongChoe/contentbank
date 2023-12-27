import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';

import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import styled from 'styled-components';

import { getMemberList } from '../../api/getAxios';
import { putDisableMember } from '../../api/putAxios';
import { Button } from '../../components/atom';
import { TabMenu } from '../../components/molecules';
import {
  editerBoolAtom,
  registerBoolAtom,
  memberKeyValueAtom,
} from '../../state/memberAtom';
import { alertBoolAtom, pageAtom, totalPageAtom } from '../../state/utilAtom';
import { Loader } from '../atom/Loader';
import { COLOR } from '../constants/COLOR';
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
  const menuList = [
    {
      label: '전체',
      value: '전체',
    },
    {
      label: '활성화',
      value: '활성화',
    },
    {
      label: '비활성화',
      value: '비활성화',
    },
  ];

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [memberList, setMemberList] = useState<memberListProps[]>([]);
  const [enabled, setEnabled] = useState<string | undefined>();
  const setKeyValue = useSetRecoilState(memberKeyValueAtom);
  const setIsEdit = useSetRecoilState(editerBoolAtom);
  const relode = useRecoilValue(registerBoolAtom);
  const [isEnabled, setIsEnabled] = useState(false);
  const setIsAlertOpen = useSetRecoilState(alertBoolAtom);
  const [didMount, setDidMount] = useState(false);

  const [display, setDisplay] = useState('none');

  const offLoader = () => {
    // console.log('off loader');
    setDisplay('block');
  };

  const [totalPage, settotalPage] = useRecoilState(totalPageAtom);
  const [page, setPage] = useRecoilState(pageAtom);
  const size = 8;

  const showMemberList = (enabled: string) => {
    setEnabled(enabled);
    getMemberList({
      setMemberList,
      settotalPage,
      page: 1,
      size,
      enabled,
    });
  };

  const changeTab = (value: string) => {
    setSelectedRows([]);
    // 현재 페이지 업데이트 후 showMemberList 호출
    if (page !== 1) {
      setPage(1);
    }
    showMemberList(value === '활성화' ? 'Y' : value === '비활성화' ? 'N' : '');
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

  /** 상세정보 보기 버튼*/
  const openDetailInformationPopup = (key: string) => {
    setKeyValue(key);
    setIsEdit(true);
  };

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (searchMemberList) {
      setMemberList(searchMemberList);
    }
  }, [searchMemberList]);

  const loadData = useCallback(() => {
    getMemberList({
      setMemberList,
      settotalPage,
      page,
      size,
      enabled,
    });
  }, [page, settotalPage, setMemberList]);

  useEffect(() => {
    if (didMount) {
      loadData();
    }
    offLoader();
  }, [didMount, relode, page]);

  return (
    <>
      <Container>
        <TabMenu
          length={3}
          menu={menuList}
          initialValue={'전체'}
          width={'350px'}
          getTabList={changeTab}
          lineStyle
        />
        <Button
          buttonType="button"
          onClick={openDisableAlert}
          height={'30px'}
          width={'100px'}
          fontSize="13px"
          $border
          disabled={selectedRows.length === 0}
        >
          <span>비활성화</span>
        </Button>
      </Container>
      <>
        {display === 'none' && <Loader height={'100px'} size="50px" />}
        <TableWrapper display={display}>
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
                  <Td style={{ textAlign: 'center' }}>
                    {member.authority.name}
                  </Td>
                  <Td style={{ textAlign: 'center' }}>{member.createdDate}</Td>
                  <Td style={{ textAlign: 'center' }}>
                    {member.enabled === true ? '활성' : '비활성'}
                  </Td>
                  <Td style={{ textAlign: 'center' }}>
                    <ButtonWrapper>
                      <Button
                        buttonType="button"
                        onClick={() => openDetailInformationPopup(member.key)}
                        height={'30px'}
                        $padding="10px"
                        width={'60px'}
                        fontSize="12px"
                        $border
                      >
                        <span>보기</span>
                      </Button>
                    </ButtonWrapper>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {/* <Table
            list={memberList}
            colWidth={contentColWidth}
            theadList={contentTheadList}
          /> */}
        </TableWrapper>
      </>
      <PaginationBox itemsCountPerPage={8} totalItemsCount={totalPage} />
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
  min-width: 1024px;
  padding: 20px 0px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const TableWrapper = styled.div<{ display: string }>`
  display: ${({ display }) => (display ? `${display}` : 'block')};
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
