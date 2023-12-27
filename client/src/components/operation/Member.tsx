import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { getMemberList } from '../../api/getAxios';
import { Button, IndexInfo } from '../../components/atom';
import { memberColWidth, memberTheadList } from '../../components/constants';
import {
  PaginationBox,
  Search,
  TabMenu,
  Table,
} from '../../components/molecules';
import {
  registerBoolAtom,
  editerBoolAtom,
  memberKeyValueAtom,
} from '../../state/memberAtom';
import { pageAtom, totalPageAtom } from '../../state/utilAtom';
import { MemberTableType } from '../../types';
import { COLOR } from '../constants/COLOR';
import { EditPopup } from '../member/EditPopup';
import { RegisterPopup } from '../member/RegisterPopup';

export function Member() {
  const [tabVeiw, setTabVeiw] = useState<string>('전체');
  const [isRegister, SetIsRegister] = useRecoilState(registerBoolAtom);
  const isEditer = useRecoilValue(editerBoolAtom);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [enabled, setEnabled] = useState<string | undefined>();
  const setKeyValue = useSetRecoilState(memberKeyValueAtom);
  const setIsEdit = useSetRecoilState(editerBoolAtom);
  const [didMount, setDidMount] = useState(false);

  const [memberList, setMemberList] = useState<MemberTableType[]>([]);
  const [totalPage, settotalPage] = useRecoilState(totalPageAtom);
  const [page, setPage] = useRecoilState(pageAtom);
  const size = 8;

  const [searchValue, setSearchValue] = useState<string>('');

  const filterSearchValue = () => {
    getMemberList({
      setMemberList,
      settotalPage,
      searchValue,
      page,
      size,
    });
    setSearchValue('');
  };

  const openRegisterPopup = () => {
    SetIsRegister(true);
    setSearchValue('');
  };

  const showMemberList = (enabled: string) => {
    setEnabled(enabled);
    getMemberList({
      setMemberList,
      settotalPage,
      page,
      size,
      enabled,
    });
  };

  const changeTab = (value: string) => {
    setSelectedRows([]);
    // 현재 페이지 업데이트 후 showMemberList 호출
    showMemberList(value === '활성화' ? 'Y' : value === '비활성화' ? 'N' : '');
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
    if (memberList) {
      setMemberList(memberList);
    }
  }, [memberList]);

  const loadData = useCallback(() => {
    getMemberList({
      setMemberList,
      settotalPage,
      page,
      size,
      enabled,
    });
  }, [page]);
  useEffect(() => {
    if (didMount) {
      loadData();
    }
  }, [didMount, page]);
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

  return (
    <Container>
      <IndexInfo list={['운영관리', '회원관리']} />
      <InputWrapper>
        <Search
          value={searchValue}
          width={'250px'}
          onClick={() => filterSearchValue()}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          placeholder="이름, 권한 검색"
        />
        <Button
          buttonType="button"
          onClick={openRegisterPopup}
          height={'35px'}
          width={'150px'}
          $margin={'0 0 0 10px'}
        >
          <span>아이디만들기</span>
        </Button>
      </InputWrapper>
      {/* <ContentWrapper>
        <MemberTable searchMemberList={memberList} />
      </ContentWrapper> */}
      <TableWrapper>
        <ButtonWrapper>
          <TabMenu
            length={3}
            menu={menuList}
            initialValue={'전체'}
            width={'300px'}
            setTabVeiw={setTabVeiw}
            lineStyle
            $margin={'10px 0'}
          />

          <Button
            width="150px"
            height="35px"
            fontSize="14px"
            $border
            onClick={() => {
              // submitChangingService();
            }}
            disabled={false}
          >
            활성화 / 비활성화
          </Button>
        </ButtonWrapper>
        <Table
          list={memberList}
          colWidth={memberColWidth}
          theadList={memberTheadList}
        />
      </TableWrapper>
      <PaginationBox itemsCountPerPage={8} totalItemsCount={totalPage} />
      {/* {isEnabled && (
        <SelectAlert
          title="비활성화 처리시 로그인이 불가합니다."
          description="비활성화 처리 하시겠습니까?"
          action="확인"
          onClick={submitDisabled}
        ></SelectAlert>
      )} */}
      {isRegister ? <RegisterPopup /> : ''}
      {isEditer ? <EditPopup /> : ''}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 2px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
`;

const TableWrapper = styled.div`
  min-height: 580px;
  border-top: 1px solid ${COLOR.SECONDARY};
`;
