import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  ContentList,
  Alert,
  Button,
  PaginationBox,
  Search,
  Select,
  TabMenu,
  Modal,
  ValueNone,
} from '..';
import { userInstance } from '../../api/axios';
import { useModal } from '../../hooks';
import { authorityAtom } from '../../store/auth';
import { pageAtom, totalPageAtom } from '../../store/utilAtom';
import { QuestionTableType } from '../../types';
import { windowOpenHandler } from '../../utils/windowHandler';
import { COLOR } from '../constants';

import { CreateContentModal } from './CreateContentModal';

export function QuizCreateList() {
  const [myAuthority, setMyAuthority] = useRecoilState(authorityAtom);
  const { openModal } = useModal();
  const [searchValue, setSearchValue] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const [totalPage, settotalPage] = useRecoilState(totalPageAtom);
  const [page, setPage] = useRecoilState(pageAtom);
  const size = 7;
  const MenuCode = 'CNC_Q';
  // 페이지네이션 index에 맞는 전체 데이터 불러오기
  const [questionList, setQuestionList] = useState<QuestionTableType[]>([]);

  const [tabVeiw, setTabVeiw] = useState<string>('문항 리스트');

  const [content, setContent] = useState<string[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // 마이페이지 데이터 불러오기 api
  const getMyInfo = async () => {
    return await userInstance.get(`/v1/account/my-info`);
  };
  const { data: myInfoData } = useQuery({
    queryKey: ['get-myInfo'],
    queryFn: getMyInfo,
    meta: {
      errorMessage: 'get-myInfo 에러 메세지',
    },
  });

  // 활성화/비활성화 버튼상태 토글
  const openSubmitAlert = () => {
    setIsAlertOpen(true);
  };
  const closeSubmitAlert = () => {
    setIsAlertOpen(false);
  };
  // 활성화/비활성화 데이터 전송
  const submitDisabled = () => {
    // console.log(selectedRows);

    const formattedArray: { contentSeq: number }[] = [];
    // 데이터 형태 api쪽에 맞춰 { contentSeq: number }[]; 로 변경
    for (let i = 0; i < selectedRows.length; i += 1) {
      formattedArray.push({ contentSeq: selectedRows[i] });
    }
    // putChangeServiced({ formattedArray, setIsChangedServiced });

    setIsAlertOpen(false);
  };

  const filterSearchValue = () => {
    // console.log('기존데이터 입력된 값으로 솎아낸뒤 재출력');
    setSearchValue(value);
  };

  const modalData = {
    title: '',
    content: <CreateContentModal />,
    callback: () => {},
  };

  // 모달 연뒤 문항 생성 윈도우 이동
  const openCreateModal = () => {
    openModal(modalData);
  };

  const menuList = [
    {
      label: '문항 리스트',
      value: '문항 리스트',
    },
    {
      label: '즐겨찾는 문항',
      value: '즐겨찾는 문항',
    },
  ];

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);
  };
  const selectCategory = [
    {
      id: '1',
      label: '개정과정',
      value: '1',
      options: [
        { id: '0', label: '개정과정', value: '0' },
        { id: '1', label: '2015학년', value: '1' },
        { id: '2', label: '2018학년', value: '2' },
        { id: '3', label: '2020학년', value: '3' },
      ],
    },
    {
      id: '2',
      label: '학교',
      value: '2',
      options: [
        { id: '0', label: '학교', value: '0' },
        { id: '1', label: '초등', value: '1' },
        { id: '2', label: '중등', value: '2' },
        { id: '3', label: '고등', value: '3' },
      ],
    },
    {
      id: '3',
      label: '학년',
      value: '3',
      options: [
        { id: '0', label: '학년', value: '0' },
        { id: '1', label: '초등1', value: '1' },
        { id: '2', label: '초등2', value: '2' },
        { id: '3', label: '중등1', value: '3' },
        { id: '4', label: '중등2', value: '4' },
        { id: '5', label: '고등1', value: '5' },
        { id: '6', label: '고등2', value: '6' },
      ],
    },
    {
      id: '4',
      label: '학기',
      value: '4',
      options: [
        { id: '0', label: '학기', value: '0' },
        { id: '1', label: '1학기', value: '1' },
        { id: '2', label: '2학기', value: '2' },
      ],
    },
    {
      id: '5',
      label: '대분류',
      value: '5',
      options: [
        { id: '0', label: '대분류', value: '0' },
        {
          id: '1',
          label: '일차부등식 소분류를 연습해봅시다 초등학교 친구들',
          value: '1',
        },
        { id: '2', label: '일차부등식 중분류', value: '2' },
        { id: '3', label: '일차부등식 대분류', value: '3' },
      ],
    },
    {
      id: '6',
      label: '문항타입',
      value: '6',
      options: [
        { id: '0', label: '문항타입', value: '0' },
        { id: '1', label: '객관식', value: '1' },
        { id: '2', label: '주관식', value: '2' },
        { id: '3', label: '서술형', value: '3' },
      ],
    },
    {
      id: '7',
      label: '오픈여부',
      value: '7',
      options: [
        { id: '0', label: '오픈여부', value: '0' },
        { id: '1', label: '활성화', value: '1' },
        { id: '2', label: '비활성화', value: '2' },
      ],
    },
  ];

  // const loadData = useCallback(() => {
  //   getQuestionList({
  //     setQuestionList,
  //     setIsChangedServiced,
  //     settotalPage,
  //     searchValue,
  //     MenuCode,
  //     page,
  //     size,
  //   });
  // }, [
  //   page,
  //   MenuCode,
  //   searchValue,
  //   setQuestionList,
  //   settotalPage,
  //   setIsChangedServiced,
  // ]);

  // 검색이나 셀렉트로 특정지어진 데이터 담은 후 보여주기 변경값이 있을때 마다 랜더링
  useEffect(() => {
    if (myInfoData) setMyAuthority(myInfoData.data.data.authority);
    // console.log('myAuthority', myAuthority);
  });

  // useEffect(() => {
  //   if (didMount) {
  //     loadData();
  //   }
  // }, [didMount, page, isChangedServiced]);

  return (
    <Container>
      <TitleWrapper>
        <Title>문항 제작</Title>
        <Button
          height={'35px'}
          width={'130px'}
          onClick={openCreateModal}
          fontSize="13px"
          $filled
          cursor
        >
          + 문항 업로드
        </Button>
      </TitleWrapper>
      <HeadWrapper>
        <TabMenu
          length={2}
          menu={menuList}
          width={'250px'}
          selected={tabVeiw}
          setTabVeiw={setTabVeiw}
        />
        <Search
          value={value}
          onClick={() => filterSearchValue()}
          onKeyDown={(e) => {}}
          onChange={(e) => setValue(e.target.value)}
          placeholder="문항코드, 중단원, 담당자 검색"
          width={'25%'}
          height="40px"
        />
      </HeadWrapper>
      <TableWrapper>
        {/* 리스트 셀렉트 */}
        <SelectWrapper>
          {selectCategory.map((el) => (
            <Select
              width={'130px'}
              defaultValue={el.label}
              key={el.label}
              options={el.options}
              onSelect={(event) => selectCategoryOption(event)}
            />
          ))}
        </SelectWrapper>
        {questionList.length > 1 ? (
          <ContentList list={questionList} onClick={openSubmitAlert} />
        ) : (
          <ValueNoneWrapper>
            <ValueNone />
          </ValueNoneWrapper>
        )}
      </TableWrapper>
      <PaginationBox itemsCountPerPage={7} totalItemsCount={totalPage} />
      <Alert
        isAlertOpen={isAlertOpen}
        description="비활성화 처리시 문항 사용이 불가합니다. 비활성화 처리 하시겠습니까?"
        action="확인"
        isWarning={true}
        onClose={closeSubmitAlert}
        onClick={submitDisabled}
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
const HeadWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
`;
const SelectWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 5px;
  padding-bottom: 20px;
`;

const TableWrapper = styled.div`
  //min-height: 670px;
`;

const ValueNoneWrapper = styled.div`
  padding: 100px 0;
`;
