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
} from '../../store/memberAtom';
import { pageAtom, totalPageAtom } from '../../store/utilAtom';
import { MemberTableType } from '../../types';
import { COLOR } from '../constants/COLOR';
import { EditPopup } from '../member/EditPopup';
import { RegisterPopup } from '../member/RegisterPopup';

export function Member() {
  const [tabVeiw, setTabVeiw] = useState<string>('전체');
  const [isRegister, setIsRegister] = useRecoilState(registerBoolAtom);
  const [isEditer, setIsEditer] = useRecoilState(editerBoolAtom);
  const setKeyValue = useSetRecoilState(memberKeyValueAtom);
  const [totalPage, settotalPage] = useRecoilState(totalPageAtom);
  const [page, setPage] = useRecoilState(pageAtom);
  const size = 8;
  const [didMount, setDidMount] = useState(false);
  const [memberList, setMemberList] = useState<MemberTableType[]>([]);

  const [searchValue, setSearchValue] = useState<string>('');
  // 검색 기능 함수
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
  const filterSearchValueEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      getMemberList({
        setMemberList,
        settotalPage,
        searchValue,
        page,
        size,
      });
      setSearchValue('');
    }
  };

  const openRegisterPopup = () => {
    setIsRegister(true);
    setSearchValue('');
  };

  /* 상세정보 보기 버튼*/
  const openDetailInformationPopup = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const target = event.currentTarget.value;
    setKeyValue(target);
    setIsEditer(true);
  };

  // 탭메뉴 클릭시 페이지네이션 초기화
  const changeTab = () => {
    console.log('dsadsadsadsadsdsadsadada');
    setPage(1);
  };

  const loadData = () => {
    if (tabVeiw === '전체') {
      getMemberList({
        setMemberList,
        settotalPage,
        page,
        size,
      });
    } else {
      const enabled =
        tabVeiw === '활성화' ? 'Y' : tabVeiw === '비활성화' ? 'N' : '';
      getMemberList({
        setMemberList,
        settotalPage,
        page,
        size,
        enabled,
      });
    }
  };
  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      // loadData();
    }
  }, [didMount]);

  useEffect(() => {
    // console.log(tabVeiw);
    // loadData();
  }, [setTabVeiw, tabVeiw, page, settotalPage, setPage]);

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
      <IndexInfo list={['운영관리', '회원관리', `${tabVeiw}`]} />
      <InputWrapper>
        <Search
          value={searchValue}
          width={'250px'}
          onClick={() => filterSearchValue()}
          onKeyDown={(e) => filterSearchValueEnter(e)}
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
            onClickTab={changeTab}
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
        <Total>Total : {memberList.length}</Total>
        {/*TODO : 전체토탈 데이터로 변경 필요 */}
        <Table
          list={memberList}
          colWidth={memberColWidth}
          theadList={memberTheadList}
          btnOnClick={openDetailInformationPopup}
        />
      </TableWrapper>
      <PaginationBox itemsCountPerPage={8} totalItemsCount={totalPage} />
      {/* {isEnabled && (
        <Alert
          title="비활성화 처리시 로그인이 불가합니다."
          description="비활성화 처리 하시겠습니까?"
          action="확인"
          onClick={submitDisabled}
        ></Alert>
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
const Total = styled.p`
  text-align: right;
  font-size: 14px;
  color: ${COLOR.SECONDARY};
  padding-bottom: 5px;
`;
