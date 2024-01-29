import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { getMemberList } from '../../api/getAxios';
import { putDisableMember } from '../../api/putAxios';
import { Button, AlertBar } from '../../components/atom';
import { memberColWidth, memberTheadList } from '../../components/constants';
import {
  Alert,
  PaginationBox,
  Search,
  TabMenu,
  Table,
} from '../../components/molecules';
import { pageAtom, totalPageAtom } from '../../store/utilAtom';
import { MemberTableType } from '../../types';
import { COLOR } from '../constants/COLOR';
import { EditPopup } from '../member/EditPopup';
import { RegisterPopup } from '../member/RegisterPopup';

export function Member() {
  const [tabVeiw, setTabVeiw] = useState<string>('전체');
  const [isRegister, setIsRegister] = useState(false);
  const [isEditer, setIsEditer] = useState(false);
  const [keyValue, setKeyValue] = useState('');
  const [totalPage, settotalPage] = useRecoilState(totalPageAtom);
  const [page, setPage] = useRecoilState(pageAtom);
  const size = 10;
  const [didMount, setDidMount] = useState(false);
  const [memberList, setMemberList] = useState<MemberTableType[]>([]);
  const [checkedList, setCheckedList] = useState<number[]>([]);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  // 활성화/비활성화 버튼상태 토글
  const openSubmitAlert = () => {
    setIsAlertOpen(true);
  };
  const closeSubmitAlert = () => {
    setIsAlertOpen(false);
  };
  // 활성화/비활성화 데이터 전송
  const submitDisabled = () => {
    putDisableMember({
      selectedRows,
      setIsEnabled,
    });
    setIsAlertOpen(false);
  };

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
      loadData();
    }
  }, [didMount]);

  useEffect(() => {
    // console.log(tabVeiw);
    loadData();
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

  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);

  const closeSuccessAlert = () => {
    setIsSuccessAlertOpen(false);
  };

  return (
    <Container>
      <AlertBar
        type="success"
        isAlertOpen={isSuccessAlertOpen}
        closeAlert={closeSuccessAlert}
        message={'아이디가 생성 되었습니다.'}
      ></AlertBar>
      <TitleWrapper>
        <Title>회원 관리</Title>
        <Button
          height={'35px'}
          width={'130px'}
          onClick={openRegisterPopup}
          fontSize="13px"
          $filled
        >
          + 아이디 만들기
        </Button>
      </TitleWrapper>
      <InputWrapper>
        <Total>Total : {memberList.length}</Total>
        <Search
          value={searchValue}
          width={'25%'}
          height="40px"
          onClick={() => filterSearchValue()}
          onKeyDown={(e) => filterSearchValueEnter(e)}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          placeholder="이름, 권한 검색"
        />
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
            height={'35px'}
            width={'130px'}
            onClick={openSubmitAlert}
            fontSize="15px"
            $filled
            disabled={isEnabled}
          >
            비활성화
          </Button>
        </ButtonWrapper>

        {/*TODO : 전체토탈 데이터로 변경 필요 */}
        <Table
          list={memberList}
          colWidth={memberColWidth}
          theadList={memberTheadList}
          btnOnClick={openDetailInformationPopup}
          setIsEnabled={setIsEnabled}
          setSelectedRows={setSelectedRows}
        />
      </TableWrapper>
      <PaginationBox itemsCountPerPage={8} totalItemsCount={totalPage} />
      <Alert
        isAlertOpen={isAlertOpen}
        description={`비활성화 처리 시 ${selectedRows.length}명의 회원은 로그인이 불가합니다. 비활성화 처리 하시겠습니까?`}
        action="확인"
        isWarning={true}
        onClick={submitDisabled}
        onClose={closeSubmitAlert}
      ></Alert>
      {isRegister ? (
        <RegisterPopup
          isRegister={isRegister}
          setIsRegister={setIsRegister}
          setIsSuccessAlertOpen={setIsSuccessAlertOpen}
        />
      ) : (
        ''
      )}
      {isEditer ? (
        <EditPopup
          keyValue={keyValue}
          isEditer={isEditer}
          setIsEditer={setIsEditer}
        />
      ) : (
        ''
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 40px 80px;
  width: 100%;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 800;
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
`;
const TableWrapper = styled.div`
  min-height: 580px;
  padding-bottom: 30px;
  //border-top: 1px solid ${COLOR.SECONDARY};
`;
const Total = styled.p`
  text-align: right;
  font-size: 18px;
  color: ${COLOR.FONT_BLACK};
  padding-bottom: 5px;
`;
