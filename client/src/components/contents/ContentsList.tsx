import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { questionInstance } from '../../api/axios';
import { getQuestionList } from '../../api/getAxios';
import { putChangeServiced } from '../../api/putAxios';
import {
  Alert,
  Button,
  DropDown,
  DropDownItemProps,
  IndexInfo,
  PaginationBox,
  Search,
  Select,
  TabMenu,
  Table,
  ContentCard,
} from '../../components';
import {
  COLOR,
  contentColWidth,
  contentTheadList,
} from '../../components/constants';
import { CreateIconPopup } from '../../pages/createPopup/CreateIconPopup';
import {
  createContentPopupBoolAtom,
  creatingNewContentBoolAtom,
  uploadBoolAtom,
  uploadFileBoolAtom,
} from '../../store/creatingContentAtom';
import {
  alertBoolAtom,
  pageAtom,
  totalPageAtom,
  updateBoolAtom,
} from '../../store/utilAtom';
import {
  createListCodeValueAtom,
  servicedValueBoolAtom,
} from '../../store/valueAtom';
import { QuestionTableType } from '../../types';

export function ContentsList() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const [isChangedServiced, setIsChangedServiced] = useRecoilState(
    servicedValueBoolAtom,
  );
  const [didMount, setDidMount] = useState(false);

  const [totalPage, settotalPage] = useRecoilState(totalPageAtom);
  const [page, setPage] = useRecoilState(pageAtom);
  const size = 7;
  const MenuCode = useRecoilValue(createListCodeValueAtom);
  // 페이지네이션 index에 맞는 전체 데이터 불러오기
  const [questionList, setQuestionList] = useState<QuestionTableType[]>([]);

  const setIsUpdate = useSetRecoilState(updateBoolAtom);

  const [tabVeiw, setTabVeiw] = useState<string>('문항 리스트');

  const [content, setContent] = useState<string[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useRecoilState(alertBoolAtom);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [isAllchecked, setIsAllChecked] = useState<boolean>(false);

  const handleAllCheck = () => {
    setIsAllChecked(!isAllchecked);
  };

  const [checkList, setCheckList] = useState<number[]>([]);

  // 체크박스 설정
  // 데이터 고유id값 seq : 기획 발표이후 변경될 수 있음
  // const handleAllCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.checked) {
  //     setCheckList(questionList.map((item) => item.seq as number));
  //     setIsEnabled(false);
  //   } else {
  //     setCheckList([]);
  //     setIsEnabled(true);
  //   }
  // };
  const handleSingleCheck = (checked: boolean, seq: number) => {
    if (checked) {
      setCheckList((prev) => [...prev, seq]);
    } else {
      setCheckList(checkList.filter((el) => el !== seq));
    }
  };

  // 활성화/비활성화 버튼상태 토글
  const submitChangingService = () => {
    setIsAlertOpen(true);
  };
  // 활성화/비활성화 데이터 전송
  const submitDisabled = () => {
    // console.log(selectedRows);

    const formattedArray: { contentSeq: number }[] = [];
    // 데이터 형태 api쪽에 맞춰 { contentSeq: number }[]; 로 변경
    for (let i = 0; i < selectedRows.length; i += 1) {
      formattedArray.push({ contentSeq: selectedRows[i] });
    }
    putChangeServiced({ formattedArray, setIsChangedServiced });

    setIsAlertOpen(false);
  };

  const filterSearchValue = () => {
    // console.log('기존데이터 입력된 값으로 솎아낸뒤 재출력');
    setSearchValue(value);
  };

  const openCreatePopup = () => {
    setIsCreate(true);
    setIsUpdate(false);
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
    // console.log(event.currentTarget.value);
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

  /**문항 업로드 팝업 관련 코드 */
  const [isCreate, setIsCreate] = useRecoilState(createContentPopupBoolAtom);
  const [isUpload, setIsUpload] = useRecoilState(uploadBoolAtom);
  const setIsCreateNewContent = useSetRecoilState(creatingNewContentBoolAtom);
  const setIsUploadFile = useSetRecoilState(uploadFileBoolAtom);

  const setIsEdit = useSetRecoilState(updateBoolAtom);

  /**문항 업로드 수정 팝업 함수 */
  const openCreateEditFilePopup = () => {
    setIsCreate(true);
    setIsUpload(true);
    setIsUploadFile(true);
    setIsCreateNewContent(false);
    setIsEdit(true);
  };

  // 드롭다운 버튼 기본 값설정
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const dropDownList: DropDownItemProps[] = [
    {
      key: 'ListTabl/d수정',
      title: '수정',
      onClick: () => {
        openCreateEditFilePopup();
        setShowDropDown(false);
      },
    },
    {
      key: 'ListTable/DropDownList복제 후 수정',
      title: '복제 후 수정',
      onClick: () => {
        openCreateEditFilePopup();
        setShowDropDown(false);
      },
    },
  ];

  const loadData = useCallback(() => {
    getQuestionList({
      setQuestionList,
      setIsChangedServiced,
      settotalPage,
      searchValue,
      MenuCode,
      page,
      size,
    });
  }, [
    page,
    MenuCode,
    searchValue,
    setQuestionList,
    settotalPage,
    setIsChangedServiced,
  ]);

  // 검색이나 셀렉트로 특정지어진 데이터 담은 후 보여주기 변경값이 있을때 마다 랜더링
  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      loadData();
    }
  }, [didMount, page, isChangedServiced]);

  return (
    <Container>
      <TitleWrapper>
        <Title>문항</Title>
        <Button
          height={'35px'}
          width={'110px'}
          $margin={'0 0 0 10px'}
          onClick={openCreatePopup}
          fontSize="13px"
          $filled
        >
          + 문항 업로드
        </Button>
      </TitleWrapper>
      <HeadWrapper>
        <TabMenu
          length={2}
          menu={menuList}
          initialValue={'문항 리스트'}
          width={'250px'}
          setTabVeiw={setTabVeiw}
        />
        <Search
          value={value}
          onClick={() => filterSearchValue()}
          onKeyDown={(e) => {}}
          onChange={(e) => setValue(e.target.value)}
          placeholder="문항코드, 중단원, 담당자 검색"
          width={'25%'}
        />
      </HeadWrapper>
      {/* 셀렉트 + 테이블 + 수정 비활성화 버튼 */}
      <TableWrapper>
        {/* 테이블 셀렉트 */}
        {/* Total 18,293 */}
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
        {/* 테이블 수정 + 활성화 버튼 */}
        <ButtonWrapper>
          <AllCheckButtonWrapper>
            {isAllchecked ? (
              <div onClick={handleAllCheck}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  cursor={'pointer'}
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="9.5"
                    fill="white"
                    stroke="#A0A0A0"
                  />
                  <path
                    d="M16 6.84116L8.45714 14L5 10.7189L5.88629 9.8777L8.45714 12.3117L15.1137 6L16 6.84116Z"
                    fill="#4A4A4A"
                  />
                </svg>
              </div>
            ) : (
              <div onClick={handleAllCheck}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  cursor={'pointer'}
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="9.5"
                    fill="white"
                    stroke="#A0A0A0"
                  />
                </svg>
              </div>
            )}
            전체선택
          </AllCheckButtonWrapper>
          <ActionButtonWrapper>
            <DropDown
              list={dropDownList}
              buttonText={'수정'}
              showDropDown={showDropDown}
              setShowDropDown={setShowDropDown}
              disabled={isEnabled}
            ></DropDown>
            <Button
              width="140px"
              height="35px"
              fontSize="14px"
              $border
              $borderRadius="7px"
              onClick={() => {
                submitChangingService();
              }}
              disabled={isEnabled}
            >
              활성화 / 비활성화
            </Button>
          </ActionButtonWrapper>
        </ButtonWrapper>
        <ContentCardWrapper>
          {questionList.map((content) => (
            <ContentCard
              key={content.questionCode}
              content={content}
            ></ContentCard>
          ))}
        </ContentCardWrapper>
        {/* <Table
          list={questionList}
          colWidth={contentColWidth}
          theadList={contentTheadList}
          setIsEnabled={setIsEnabled}
          setSelectedRows={setSelectedRows}
        /> */}
      </TableWrapper>
      <PaginationBox itemsCountPerPage={7} totalItemsCount={totalPage} />
      <Alert
        title="비활성화 처리시 로그인이 불가합니다."
        description="비활성화 처리 하시겠습니까?"
        action="확인"
        onClick={submitDisabled}
      ></Alert>
      {isCreate && <CreateIconPopup />}
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
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
`;
const AllCheckButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  gap: 10px;
`;
const ActionButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
`;
const ContentCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 30px;
`;

const TableWrapper = styled.div`
  //min-height: 670px;
`;
