import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { getUserList, getUserListTotal } from '../../../../api/user';
import { useModal } from '../../../../hooks';
import { pageAtom } from '../../../../store/utilAtom';
import { MemberType } from '../../../../types';
import {
  Button,
  Select,
  Input,
  CheckBoxI,
  ValueNone,
  Icon,
} from '../../../atom';
import { COLOR } from '../../../constants';
import {
  Alert,
  TabMenu,
  List,
  PaginationBox,
  ListItem,
  Search,
} from '../../../molecules';

type ProcessListProps = {
  title: string;
  type: string;
  card: { name: string; id: string; authority: string }[];
};

type EditModalProps = {
  processListData: ProcessListProps[];
};

export function ProcessAddModal() {
  const { closeModal } = useModal();
  // 기존에 설정되어 있는 단계 값을 저장
  //페이지네이션
  const [page, setPage] = useRecoilState(pageAtom);
  //탭
  const [tabVeiw, setTabVeiw] = useState<string>('계정으로 추가');
  //검색이름
  const [nameValue, setNameValue] = useState('');
  const [checkList, setCheckList] = useState<number[]>([]);

  const [processList, setProcessList] = useState<ProcessListProps[]>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchKeywordValue, setSearchKeywordValue] = useState<string>('');
  const [totalMemberList, setTotalMemberList] = useState<MemberType[]>([]);
  const [totalCount, setTotalCount] = useState<number>(1);
  //기업 idx로 수정해야함
  const [idxValue, setIdxValue] = useState<string>('1');

  //프로세스 저장
  const [isProcessSave, setIsProcessSave] = useState(false);
  const clickProcessSave = () => {
    setIsProcessSave(true);
  };

  const changeTab = () => {
    setPage(1);
  };
  const menuList = [
    {
      label: '계정으로 추가',
      value: '계정으로 추가',
    },
    {
      label: '권한으로 추가',
      value: '권한으로 추가',
    },
  ];

  // 유저 리스트 불러오기 api
  const isUseFilter = useMemo(() => {
    if (tabVeiw === '계정으로 추가') return '';
    if (tabVeiw === '권한으로 추가') return '';
  }, [tabVeiw]);

  const {
    isLoading,
    data: memberListData,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ['get-memberlist'],
    queryFn: () => getUserList({ page, searchKeywordValue, isUseFilter }),
    meta: {
      errorMessage: 'get-memberlist 에러 메세지',
    },
  });
  // data 디렉토리
  const memberList = memberListData?.data.data;
  console.log(memberList);

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

  // 아이디 중복 확인 && 토탈 유저 수
  const { data: totalData, refetch: totalDataRefetch } = useQuery({
    queryKey: ['get-memberlist-total'],
    queryFn: () => getUserListTotal({ totalCount, idxValue }),
    meta: {
      errorMessage: 'get-memberlist 에러 메세지',
    },
    enabled: !!isSuccess,
  });

  useEffect(() => {
    // console.log('totalData', totalData);
    if (totalData) {
      setTotalMemberList(totalData.data.data.list);
    } else {
      setTotalMemberList([]);
    }
  }, [totalData]);

  useEffect(() => {
    // console.log('isSuccess', isSuccess);
    if (isSuccess) setTotalCount(memberList?.pagination?.totalCount);
  }, [isSuccess]);

  // 데이터 변경시 리랜더링 (초기화)
  useEffect(() => {
    refetch();
  }, [page, searchKeywordValue]);

  return (
    <Container>
      <Wrapper>
        <Title>작업자 추가</Title>
        <TabWrapper>
          <TabMenu
            length={2}
            menu={menuList}
            width={'450px'}
            lineStyle
            selected={tabVeiw}
            setTabVeiw={setTabVeiw}
            onClickTab={changeTab}
          />
        </TabWrapper>
        <Search
          value={searchValue}
          width={`calc(100% - 40px)`}
          height="35px"
          margin="0 20px"
          onClick={() => filterSearchValue()}
          onKeyDown={(e) => filterSearchValueEnter(e)}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          placeholder="이름, 아이디, 권한을 검색해주세요"
          maxLength={20}
          minLength={2}
        />
        {!isLoading &&
        memberListData &&
        totalMemberList &&
        memberList.list.length !== 0 ? (
          <ListWrapper>
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
                    <i className="line"></i>
                    <span>{list.id} </span>
                    <i className="line"></i>
                    <span>
                      <span className="tag">{list.authorityName}</span>
                    </span>
                    <i className="line"></i>
                    <span>{list.createdAt}</span>
                  </ItemLayout>
                </ListItem>
              ))}
            </List>
            <PaginationBox
              itemsCountPerPage={memberList.pagination.pageUnit}
              totalItemsCount={memberList.pagination.totalCount}
            />
          </ListWrapper>
        ) : (
          <>
            {searchKeywordValue ? (
              <ValueNoneWrapper>
                <ValueNone
                  info={`${searchKeywordValue} (으)로 검색결과 데이터가 없습니다`}
                />
              </ValueNoneWrapper>
            ) : (
              <ValueNoneWrapper>
                <ValueNone info={`등록된 데이터가 없습니다`} />
              </ValueNoneWrapper>
            )}
          </>
        )}
      </Wrapper>
      <ButtonWrapper>
        <Button width="100px" height="40px" onClick={() => closeModal()}>
          취소
        </Button>
        <Button width="100px" height="40px" onClick={clickProcessSave} $filled>
          확인
        </Button>
      </ButtonWrapper>
      {isProcessSave && (
        <Alert
          description="진행 중인 제작 프로세스가 초기화될 수 있습니다. 그래도 변경하시겠습니까?"
          isAlertOpen={isProcessSave}
          action="확인"
          onClose={() => setIsProcessSave(false)}
          //onClick={() => deleteItemMutate()}
        ></Alert>
      )}
    </Container>
  );
}
const Container = styled.div`
  max-width: 700px;
  min-width: 600px;
  min-height: 850px;
  overflow: hidden;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Wrapper = styled.div``;
const Title = styled.strong`
  font-size: 20px;
  width: 100%;
  display: block;
  font-weight: bold;
  text-align: left;
  padding: 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;
const TabWrapper = styled.div`
  width: 100%;
  padding: 10px 0;
  margin-left: 20px;
  display: flex;
  justify-content: space-between;
`;
const ListWrapper = styled.div`
  padding: 0 20px;
`;
const ItemLayout = styled.span`
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
const ValueNoneWrapper = styled.div`
  padding: 50px;
  margin-top: 10px;
`;
const ButtonWrapper = styled.div`
  background-color: #f1f1f1;
  padding: 10px 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;
