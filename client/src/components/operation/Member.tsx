import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { userInstance } from '../../api/axios';
import {
  Button,
  AlertBar,
  CheckBoxI,
  Icon,
  ValueNone,
  Loader,
  openToastifyAlert,
} from '../../components/atom';
import {
  Alert,
  Modal,
  PaginationBox,
  Search,
  TabMenu,
  List,
  ListItem,
} from '../../components/molecules';
import { useModal } from '../../hooks';
import { pageAtom } from '../../store/utilAtom';
import { MemberType } from '../../types';
import { COLOR } from '../constants/COLOR';

import { EditModal } from './member/EditModal';
import { RegisterModal } from './member/RegisterModal';

export function Member() {
  const { openModal } = useModal();
  const [tabVeiw, setTabVeiw] = useState<string>('전체');
  const backgroundRef = useRef<HTMLDivElement>(null);

  const [checkList, setCheckList] = useState<number[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);

  const [page, setPage] = useRecoilState(pageAtom);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchKeywordValue, setSearchKeywordValue] = useState<string>('');
  const [totalMemberList, setTotalMemberList] = useState<MemberType[]>();

  // 유저 리스트 불러오기 api
  const getUserList = async () => {
    const res = await userInstance.get(
      `/v1/account?idx=${9}&pageIndex=${page}&pageUnit=${8}&searchKeyword=${searchKeywordValue}&isUseFilter=${isUseFilter}
			`,
    );
    // console.log(`유저리스트 get 결과값`, res);
    return res;
  };

  const isUseFilter = useMemo(() => {
    if (tabVeiw === '전체') return '';
    if (tabVeiw === '활성화') return 'Y';
    if (tabVeiw === '비활성화') return 'N';
  }, [tabVeiw]);

  const {
    isLoading,
    data: memberListData,
    refetch,
  } = useQuery({
    queryKey: ['get-memberlist'],
    queryFn: getUserList,
    meta: {
      errorMessage: 'get-memberlist 에러 메세지',
    },
  });
  // data 디렉토리
  const memberList = memberListData?.data.data;

  // 검색 기능 함수
  const filterSearchValue = () => {
    // 쿼리 스트링 변경 로직
    setSearchKeywordValue(searchValue);
    if (searchValue == '') setSearchKeywordValue('');
  };
  const filterSearchValueEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      setSearchKeywordValue(searchValue);
    }
    if (event.key === 'Backspace') {
      setSearchKeywordValue('');
    }
  };

  // 아이디 중복 확인 && 토탈 유저 수
  const getTotalMemberList = async () => {
    const totalCount = memberList.pagination.totalCount;
    const res = await userInstance.get(
      `/v1/account?idx=${9}&pageIndex=${1}&pageUnit=${totalCount}
				`,
    );
    setTotalMemberList(res.data.data.list);
  };

  /* 아이디 만들기 모달 열기 */
  const openCreateModal = () => {
    //모달 열릴시 체크리스트 초기화
    setCheckList([]);
    getTotalMemberList();
    openModal({
      title: '',
      content: <RegisterModal memberList={totalMemberList} refetch={refetch} />,
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
      content: (
        <EditModal
          accountIdx={accountIdx}
          userKey={userKey}
          refetch={refetch}
        />
      ),
    });
  };

  /* 활성화/비활성화 확인 얼럿 */
  const openSubmitAlert = () => {
    setIsAlertOpen(true);
  };
  const closeSubmitAlert = () => {
    setIsAlertOpen(false);
  };
  // 활성화/비활성화 데이터 전송
  const submitChangeUse = () => {
    // console.log('checkList :', checkList);
    mutateChangeUse();
    setIsAlertOpen(false);
  };

  // 활성화/비활성화 api
  const patchChangeUse = async () => {
    return await userInstance.patch(`/v1/account/change-use`, {
      idxList: checkList,
    });
  };
  const {
    data: changeUse,
    mutate: mutateChangeUse,
    isPending: isPendingChangeUse,
  } = useMutation({
    mutationFn: patchChangeUse,
    onError: (context: { response: { data: { message: string } } }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
    },
    onSuccess: (response: { data: { message: string } }) => {
      openToastifyAlert({
        type: 'success',
        text: response.data.message,
      });
    },
  });

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
      setCheckList(memberList.list.map((item: MemberType) => item.idx));
    } else {
      setCheckList([]);
    }
  };
  const handleButtonCheck = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
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
    // 비활성화 이후 토탈 멤버 api 재호출
    if (memberListData) getTotalMemberList();
  }, [memberListData]);

  const tabMenuList = [
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

  // 대이터 변경시 리랜더링
  useEffect(() => {
    refetch();
  }, [page, memberList, searchKeywordValue, isUseFilter, changeUse]);

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

      {isLoading && (
        <LoaderWrapper>
          <Loader width="50px" />
        </LoaderWrapper>
      )}
      {!isLoading && memberListData && (
        <>
          <TabMenu
            length={3}
            menu={tabMenuList}
            selected={tabVeiw}
            width={'300px'}
            setTabVeiw={setTabVeiw}
            lineStyle
            $margin={'10px 0'}
            onClickTab={changeTab}
          />

          <InputWrapper>
            <Total>
              Total :{memberList ? memberList.pagination.totalCount : 0}
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
          {isPendingChangeUse ? (
            <LoaderWrapper>
              <Loader width="50px" />
            </LoaderWrapper>
          ) : (
            <>
              {totalMemberList && totalMemberList.length > 0 ? (
                <>
                  <ButtonWrapper>
                    <CheckBoxWrapper>
                      <CheckBoxI
                        $margin={'0 5px 0 0'}
                        onChange={(e) => handleAllCheck(e)}
                        checked={
                          checkList.length === memberList.list.length
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

                  <List margin={`10px 0`}>
                    {memberList.list.map((list: MemberType) => (
                      <ListItem
                        key={list.userKey as string}
                        isChecked={checkList.includes(list.idx)}
                        onClick={(e) => handleButtonCheck(e, list.idx)}
                      >
                        <CheckBoxI
                          id={list.userKey}
                          value={list.idx}
                          $margin={`0 5px 0 0`}
                          checked={checkList.includes(list.idx)}
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
                                ? checkList.includes(list.idx)
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
                                ? checkList.includes(list.idx)
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
                          onClick={(e) =>
                            openEditModal(e, list.idx, list.userKey)
                          }
                        >
                          상세 수정
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                  <PaginationBox
                    itemsCountPerPage={memberList.pagination.pageUnit}
                    totalItemsCount={memberList.pagination.totalCount}
                  />
                </>
              ) : (
                <>
                  {searchKeywordValue ? (
                    <ValueNoneWrapper>
                      <ValueNone
                        info={`${searchKeywordValue}로 검색결과 데이터가 없습니다`}
                      />
                    </ValueNoneWrapper>
                  ) : (
                    <ValueNoneWrapper>
                      <ValueNone info={`등록된 데이터가 없습니다`} />
                    </ValueNoneWrapper>
                  )}
                </>
              )}
            </>
          )}
        </>
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
  padding: 40px;
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
  }
  .line {
    width: 1px;
    height: 15px;
    background-color: ${COLOR.BORDER_GRAY};
  }
`;
const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 30px;
  padding-left: calc(50% - 35px);
`;
const ValueNoneWrapper = styled.div`
  padding: 50px;
  margin-top: 10px;
`;
