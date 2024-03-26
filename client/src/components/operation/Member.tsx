import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { userInstance } from '../../api/axios';
import {
  Button,
  AlertBar,
  CheckBoxI,
  Icon,
  ValueNone,
  openToastifyAlert,
  Loader,
} from '../../components/atom';
import {
  Alert,
  Modal,
  PaginationBox,
  Search,
  TabMenu,
} from '../../components/molecules';
import { useModal } from '../../hooks';
import { pageAtom } from '../../store/utilAtom';
import { MemberType } from '../../types';
import { getAuthorityCookie } from '../../utils/cookies';
import { COLOR } from '../constants/COLOR';
import { List, ListItem } from '../molecules/list';

import { EditModal } from './member/EditModal';
import { RegisterModal } from './member/RegisterModal';

export function Member() {
  const { openModal } = useModal();
  const [tabVeiw, setTabVeiw] = useState<string>('전체');
  const backgroundRef = useRef<HTMLDivElement>(null);

  const [checkList, setCheckList] = useState<string[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);

  const [page, setPage] = useRecoilState(pageAtom);
  const [totalMemberList, settotalMemberList] = useState<MemberType[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  // 유저 리스트 불러오기 api
  const getUserList = async () => {
    const res = await userInstance.get(
      `/v1/account?menuIdx=${9}&pageIndex=${page}&pageUnit=${8}
			`,
      // &isUseFilter=${''}
    );
    console.log(`유저리스트 get 결과값`, res);
    return res;
  };

  const {
    isLoading,
    error,
    data: memberListData,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['get-memberlist'],
    queryFn: getUserList,
    meta: {
      errorMessage: 'get-memberlist 에러 메세지',
    },
  });

  // 페이지 변경시 리랜더링
  useEffect(() => {
    console.log(page, memberListData);

    refetch();
  }, [page]);

  // 검색 기능 함수
  const filterSearchValue = () => {
    // 쿼리 스트링 변경 로직
    setSearchValue('');
  };
  const filterSearchValueEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      setSearchValue('');
    }
  };

  // 아이디 중복 확인용 데이터 리스트 조회
  const getTotalId = async () => {
    return await userInstance
      .get(
        `/v1/account?menuIdx=${9}&pageIndex=${1}&pageUnit=${memberListData?.data.data.pagination.totalCount}
				`,
      )
      .then((res) => {
        settotalMemberList(res.data.data.list);
      });
  };

  /* 아이디 만들기 모달 열기 */
  const openCreateModal = () => {
    //모달 열릴시 체크리스트 초기화
    setCheckList([]);

    getTotalId();
    console.log('memberList', totalMemberList);
    openModal({
      title: '',
      content: <RegisterModal memberList={totalMemberList} />,
    });
  };

  /* 상세정보 수정 모달 열기 */
  const openEditModal = (
    event: React.MouseEvent<HTMLButtonElement>,
    accountIdx: number,
    userKey: string,
  ) => {
    event.stopPropagation();
    // console.log(accountIdx, 'accountIdx');
    //모달 열릴시 체크리스트 초기화
    setCheckList([]);
    // getUser(accountIdx);
    openModal({
      title: '',
      content: <EditModal accountIdx={accountIdx} userKey={userKey} />,
    });
  };
  // const getUser = async (accountIdx: number) => {
  //   const res = await userInstance.get(`/v1/account/${accountIdx}`);
  //   console.log(`accountIdx get 결과값`, res);
  //   return res;
  // };

  /* 활성화/비활성화 확인 얼럿 */
  const openSubmitAlert = () => {
    setIsAlertOpen(true);
  };
  const closeSubmitAlert = () => {
    setIsAlertOpen(false);
  };
  // 활성화/비활성화 데이터 전송
  const submitChangeUse = () => {
    patchChangeUse();
    setIsAlertOpen(false);
  };

  // 활성화/비활성화 api
  const patchChangeUse = async () => {
    await userInstance.patch(`/v1/account/change-use`);
    // .then((res) => {
    //   console.log('change-use', res);
    // })
    // .catch((error) => {
    //   console.log('change-use error', error);
    //   if (error.response.data.code == 'GE-002') {
    //     console.log('change-use error', error);
    //   }
    //   if (error.response.data.code == 'E-004') {
    //     openToastifyAlert({
    //       type: 'error',
    //       text: `${error.response.data.data.name}`,
    //     });
    //   }
    // });
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

  // 탭메뉴 클릭시 페이지네이션 초기화
  //              && 리스트 데이터 전송값 변경
  const changeTab = () => {
    setPage(1);
  };

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
      // console.log('click', e.target?.toString().includes('Div'));
      if (e.target?.toString().includes('Div')) setCheckList([]);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [backgroundRef]);

  // if(isLoading) return ()

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

      {memberListData?.data.data.list.length ? (
        <>
          <ButtonWrapper>
            <CheckBoxWrapper>
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
            </CheckBoxWrapper>
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

          {isLoading && (
            <LoaderWrapper>
              <Loader width="50px" />
            </LoaderWrapper>
          )}

          <List margin={`10px 0`}>
            {/* TODO: 데이터 타입 정의 */}
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
                  readOnly
                />
                <ItemLayout>
                  <span>{list.name} </span>
                  <div className="line"></div>
                  <span>{list.id} </span>
                  <div className="line"></div>
                  <span>
                    <span className="tag">{list.authorityName}</span>
                  </span>
                  <div className="line"></div>
                  <span>{list.createdAt}</span>
                </ItemLayout>
                {list.isUse ? (
                  <Icon
                    width={`18px`}
                    $margin={'0 0 0 12px'}
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
                    $margin={'0 0 0 12px'}
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
                  onClick={(e) => openEditModal(e, list.idx, list.userKey)}
                >
                  상세 수정
                </Button>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <>{!isLoading && <ValueNone />}</>
      )}

      {memberListData?.data.data.pagination && (
        <PaginationBox
          itemsCountPerPage={memberListData?.data.data.pagination.pageUnit}
          totalItemsCount={memberListData?.data.data.pagination.totalCount}
        />
      )}
      <Alert
        isAlertOpen={isAlertOpen}
        description={`비활성화 처리 시 ${checkList.length}명의 회원은 로그인이 불가합니다. 비활성화 처리 하시겠습니까?`}
        action="확인"
        isWarning={true}
        onClick={submitChangeUse}
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
const CheckBoxWrapper = styled.div`
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
    min-width: 20%;
    justify-content: space-around;
    flex-wrap: wrap;
    word-break: break-all;
    /* &::after {
      content: '';
      display: flex;
      border-right: 1px solid ${COLOR.BORDER_GRAY};
    } */
  }
  .line {
    width: 1px;
    height: 15px;
    background-color: ${COLOR.BORDER_GRAY};
  }
  /* .tag {
    padding: 5px 15px;
    background-color: ${COLOR.BORDER_GRAY};
    border-radius: 20px;
  } */
`;
const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 30px;
  padding-left: calc(50% - 35px);
`;
