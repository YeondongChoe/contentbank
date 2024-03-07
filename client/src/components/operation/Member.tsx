import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { userInstance } from '../../api/axios';
// import { getMemberList } from '../../api/getAxios';
import { putDisableMember } from '../../api/putAxios';
import {
  Button,
  AlertBar,
  CheckBoxI,
  Icon,
  ValueNone,
} from '../../components/atom';
import {
  Alert,
  Modal,
  PaginationBox,
  Search,
  TabMenu,
} from '../../components/molecules';
import { useModal } from '../../hooks';
import { pageAtom, totalPageAtom } from '../../store/utilAtom';
import { MemberTableType } from '../../types';
import { getAuthorityCookie } from '../../utils/cookies';
import { COLOR } from '../constants/COLOR';
import { List, ListItem } from '../molecules/list';

import { EditModal } from './member/EditModal';
import { RegisterModal } from './member/RegisterModal';

export function Member() {
  const { openModal } = useModal();
  const [tabVeiw, setTabVeiw] = useState<string>('전체');
  const backgroundRef = useRef<HTMLDivElement>(null);

  const [keyValue, setKeyValue] = useState('');
  const [totalPage, setTotalPage] = useRecoilState(totalPageAtom);
  const [page, setPage] = useRecoilState(pageAtom);
  const size = 10;
  const [didMount, setDidMount] = useState(false);
  const [memberList, setMemberList] = useState<MemberTableType[]>([]);

  const [searchValue, setSearchValue] = useState<string>('');
  const [checkList, setCheckList] = useState<string[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);

  const modalData = {
    title: '',
    content: <RegisterModal />,
    callback: () => {},
  };
  const editModalData = {
    title: '',
    content: <EditModal />,
    callback: () => {},
  };
  /* 아이디 만들기 모달 열기 */
  const openCreateModal = () => {
    //모달 열릴시 체크리스트 초기화
    setCheckList([]);
    console.log('dufflsgn ', checkList);
    openModal(modalData);
  };
  /* 상세정보 수정 모달 열기 */
  const openEditModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    //모달 열릴시 체크리스트 초기화
    setCheckList([]);
    const target = event.currentTarget.value;
    console.log('target  ', target);
    openModal(editModalData);
  };

  /* 활성화/비활성화 확인 얼럿 */
  const openSubmitAlert = () => {
    setIsAlertOpen(true);
  };
  const closeSubmitAlert = () => {
    setIsAlertOpen(false);
  };
  // 활성화/비활성화 데이터 전송
  const submitDisabled = () => {
    // putDisableMember({
    //   selectedRows,
    //   setIsEnabled,
    // });
    setIsAlertOpen(false);
  };
  /* 안내 알럿 */
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const closeSuccessAlert = () => {
    setIsSuccessAlertOpen(false);
  };
  const [isEditAlertOpen, setIsEditAlertOpen] = useState(false);
  const closeEditAlert = () => {
    setIsEditAlertOpen(false);
  };

  // 검색 기능 함수
  const filterSearchValue = () => {
    // getMemberList({
    //   setMemberList,
    //   setTotalPage,
    //   searchValue,
    //   page,
    //   size,
    // });
    // 쿼리 스트링 변경 로직
    setSearchValue('');
  };
  const filterSearchValueEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      // getMemberList({
      //   setMemberList,
      //   setTotalPage,
      //   searchValue,
      //   page,
      //   size,
      // });
      setSearchValue('');
    }
  };

  // 탭메뉴 클릭시 페이지네이션 초기화
  //              && 리스트 데이터 전송값 변경
  const changeTab = () => {
    setPage(1);
  };

  const getUserList = async () => {
    const res = await userInstance.get(
      `/v1/account?menuIdx=${9}&pageIndex=${1}&pageUnit=${10}`,
    );
    console.log(`유저리스트 get 결과값`, res);

    return res;
  };

  const {
    isLoading,
    error,
    data: memberListData,
    isFetching,
  } = useQuery({
    queryKey: ['get-memberlist'],
    queryFn: getUserList,
    meta: {
      errorMessage: 'get-memberlist 에러 메세지',
    },
  });

  // 체크박스 설정
  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.checked);
    if (e.target.checked) {
      setCheckList(
        memberListData?.data.data.list.map(
          (item: any) => item.userKey as string,
        ),
      );
    } else {
      setCheckList([]);
    }
  };
  const handleButtonCheck = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    const target = e.currentTarget.childNodes[0].childNodes[0]
      .childNodes[0] as HTMLInputElement;
    if (!target.checked) {
      setCheckList((prev) => [...prev, id]);
    } else {
      setCheckList(checkList.filter((el) => el !== id));
    }
  };
  // 체크상태 useMemo
  // const checkValue = useMemo(() => {
  //   return false;
  // }, [checkList]);

  // 활성화 버튼
  useEffect(() => {
    if (!checkList.length) {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  }, [checkList]);

  useEffect(() => {
    // 데이터 바뀔시 초기화
    setCheckList([]);
    setSearchValue('');
  }, [memberListData]);

  useEffect(() => {
    // loadData();
    console.log('memberListData', memberListData);
    setTotalPage(memberListData?.data.data.pagination.endPage);
  }, []);

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

  // 배경 클릭시 체크리스트 초기화
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      console.log('click', e.target?.toString().includes('Div'));
      if (e.target?.toString().includes('Div')) setCheckList([]);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [backgroundRef]);

  return (
    <Container ref={backgroundRef}>
      <AlertBar
        type="success"
        isAlertOpen={isSuccessAlertOpen}
        closeAlert={closeSuccessAlert}
        message={'아이디가 생성 되었습니다.'}
      ></AlertBar>
      <AlertBar
        type="success"
        isAlertOpen={isEditAlertOpen}
        closeAlert={closeEditAlert}
        message={'회원정보가 수정 되었습니다.'}
      ></AlertBar>
      <TitleWrapper>
        <Title>회원 관리</Title>
        <Button
          height={'35px'}
          width={'130px'}
          onClick={openCreateModal}
          fontSize="13px"
          $filled
          cursor
        >
          + 아이디 만들기
        </Button>
      </TitleWrapper>

      <TabMenu
        length={3}
        menu={menuList}
        selected={tabVeiw}
        width={'300px'}
        setTabVeiw={setTabVeiw}
        lineStyle
        $margin={'10px 0'}
        onClickTab={changeTab}
      />

      <InputWrapper>
        <Total>
          Total :
          {memberListData ? memberListData.data.data.pagination.totalCount : 0}
        </Total>

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
      <ButtonWrapper>
        <CheckBoxWrap>
          <CheckBoxI
            $margin={'0 5px 0 0'}
            onChange={(e) => handleAllCheck(e)}
            checked={
              checkList.length === memberListData?.data.data.list.length
                ? true
                : false
            }
            id={'all check'}
            value={'all check'}
          />
          <span className="title_top">전체선택</span>
        </CheckBoxWrap>
        <Button
          height={'35px'}
          width={'130px'}
          onClick={openSubmitAlert}
          fontSize="15px"
          $filled
          disabled={isEnabled}
          cursor
          $margin="5px 0 0 0"
        >
          비활성화
        </Button>
      </ButtonWrapper>

      {memberListData?.data.data.list.length ? (
        <List margin={`10px 0`}>
          {memberListData?.data.data.list.map((list: any) => (
            <ListItem
              key={list.userKey as string}
              isChecked={checkList.includes(list.userKey)}
              onClick={(e) => handleButtonCheck(e, list.userKey)}
            >
              <CheckBoxI
                id={list.userKey}
                value={list.userKey}
                $margin={`0 5px 0 0`}
                checked={checkList.includes(list.userKey)}
              />
              <ItemLayout>
                <span>{list.name} </span>
                <span>{list.id} </span>
                <span>
                  <span className="tag">{list.authorityName}</span>
                </span>
                <span>{list.createdAt}</span>
              </ItemLayout>
              {list.isUse ? (
                <Icon
                  width={`18px`}
                  src={`/images/icon/lock_open_${
                    checkList.length
                      ? checkList.includes(list.userKey)
                        ? 'on'
                        : 'off'
                      : 'off'
                  }.svg`}
                  disabled={true}
                />
              ) : (
                <Icon
                  width={`18px`}
                  src={`/images/icon/lock_${
                    checkList.length
                      ? checkList.includes(list.userKey)
                        ? 'on'
                        : 'off'
                      : 'off'
                  }.svg`}
                  disabled={true}
                />
              )}
              <Button
                width={`100px`}
                height={`30px`}
                fontSize={`13px`}
                $padding={'0'}
                $margin={`0 0 0 15px`}
                cursor
                $border
                onClick={(e) => openEditModal(e)}
              >
                상세 수정
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <ValueNone />
      )}

      {memberListData?.data.data.pagination && (
        <PaginationBox
          itemsCountPerPage={
            memberListData?.data.data.pagination.totalBlockCount
          }
          totalItemsCount={memberListData?.data.data.pagination.pageUnit}
        />
      )}
      <Alert
        isAlertOpen={isAlertOpen}
        description={`비활성화 처리 시 ${checkList.length}명의 회원은 로그인이 불가합니다. 비활성화 처리 하시겠습니까?`}
        action="확인"
        isWarning={true}
        onClick={submitDisabled}
        onClose={closeSubmitAlert}
      ></Alert>

      <Modal />
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

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
`;
const Total = styled.span`
  text-align: right;
  font-size: 15px;
  font-weight: bold;
  color: ${COLOR.FONT_BLACK};
  padding-bottom: 5px;
`;
const CheckBoxWrap = styled.div`
  display: flex;
  align-items: center;
`;
const ItemLayout = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  > span {
    display: flex;
    flex: 1 0 0;
    justify-content: space-around;
    &::after {
      content: '';
      display: flex;
      border-right: 1px solid ${COLOR.BORDER_GRAY};
    }
  }
  /* .tag {
    padding: 5px 15px;
    background-color: ${COLOR.BORDER_GRAY};
    border-radius: 20px;
  } */
`;
