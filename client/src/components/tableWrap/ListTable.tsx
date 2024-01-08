import * as React from 'react';
import { useState, useEffect } from 'react';

import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { getQuestionList } from '../../api/getAxios';
import { postFavoriteQuestion } from '../../api/postAxios';
import { putChangeServiced } from '../../api/putAxios';
import {
  Select,
  Button,
  DropDown,
  DropDownItemProps,
  Table,
} from '../../components';
import {
  createContentPopupBoolAtom,
  uploadBoolAtom,
  creatingNewContentBoolAtom,
  uploadFileBoolAtom,
} from '../../store/creatingContentAtom';
import { managementContentPopupBoolAtom } from '../../store/managementContentAtom';
import {
  pageAtom,
  totalPageAtom,
  updateBoolAtom,
  alertBoolAtom,
} from '../../store/utilAtom';
import {
  createListCodeValueAtom,
  searchValueAtom,
  checkBoxValueAtom,
  servicedValueBoolAtom,
} from '../../store/valueAtom';
import { COLOR } from '../constants';
import { Alert } from '../molecules/alert/Alert';
import { PaginationBox } from '../molecules/pagination/Pagination';

type questionListProps = {
  contentSeq: number;
  questionSeq: number;
  favorited: boolean;
  questionCode: string; //문항코드
  curriculum: string; //개정과정
  schoolLevel: string; //학교급
  schoolYear: string; //학년
  semester: string; //학기
  unitMajor: string; //대분류
  unitMiddle: string; //중분류
  questionType: string; //문항타입??
  questionCreatedByName: string; //작성자
  questionCreatedDate: string; //일자
  serviced: boolean; //오픈여부
};

export function ListTable() {
  const [didMount, setDidMount] = useState(false);
  /**문항 리스트 관련 코드 */
  const [questionList, setQuestionList] = useState<questionListProps[]>([]);
  const searchValue = useRecoilValue(searchValueAtom);
  const [isChangedServiced, setIsChangedServiced] = useRecoilState(
    servicedValueBoolAtom,
  );
  const [totalPage, settotalPage] = useRecoilState(totalPageAtom);
  const page = useRecoilValue(pageAtom);
  const size = 10;
  const MenuCode = useRecoilValue(createListCodeValueAtom);

  /**체크박스 관련 코드 */
  const [selectedRows, setSelectedRows] =
    useRecoilState<number[]>(checkBoxValueAtom);
  const isAllSelected = selectedRows.length === questionList.length;

  const selectRow = (checkbox: number) => {
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
      setSelectedRows(questionList.map((content) => content.contentSeq));
    }
  };

  /**팝엉 관련 코드 */
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closePopover = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  /**문항 활성화/비활성화 관련 코드 */
  const [contentSeq, setContentSeq] = useRecoilState(checkBoxValueAtom);
  const formattedArray = contentSeq.map((value) => ({ contentSeq: value }));
  /**문항 활성화/비활성화 API */
  console.log(formattedArray);
  const submitChangingService = () => {
    putChangeServiced({ formattedArray, setIsChangedServiced });
    setContentSeq([]);
  };
  const [isAlertOpen, setIsAlertOpen] = useRecoilState(alertBoolAtom);
  const [isDeleteAuthority, setIsDeleteAuthority] = useState(false);

  const openDeleteAlert = () => {
    setIsAlertOpen(true);
    setIsDeleteAuthority(true);
  };

  const submitDelete = () => {
    console.log('delete API');
  };

  /**문항 분류 관련 코드 */
  const [content, setContent] = useState<string[]>([]);

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
        { id: '1', label: '1학기', value: '1' },
        { id: '2', label: '2학기', value: '2' },
      ],
    },
    {
      id: '5',
      label: '대분류',
      value: '5',
      options: [
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

  /**문항 상세보기 팝업 관련 코드 */
  const [isManagement, setIsManagement] = useRecoilState(
    managementContentPopupBoolAtom,
  );
  /**문항 관리 수정 팝업 함수 */
  const openmanagementEditFilePopup = () => {
    setIsManagement(true);
    setIsEdit(true);
    console.log('문항 선택후 선택된 항목 리스트 상태 관리');
  };

  /**문항 즐겨찾기 관련 코드 */
  const [isFavorited, setIsFavorited] = useState(false);
  /**문항 즐겨찾기 API */
  const addFavoriteQuestion = (questionSeq: number) => {
    postFavoriteQuestion({ isFavorited, setIsFavorited }, questionSeq);
  };

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      getQuestionList({
        //즐겨찾기 문항 리스트 불러올 경우
        //전역상태 관리로 즐겨찾기 관리 후 상황에 맞게 해당 상태값을 전달해서
        //API 파라미터에 추가해주기
        setQuestionList,
        setIsChangedServiced,
        settotalPage,
        searchValue,
        MenuCode,
        page,
        size,
      });
    }
  }, [
    didMount,
    page,
    MenuCode,
    searchValueAtom,
    isChangedServiced,
    isFavorited,
  ]);

  // 드롭다운 버튼 기본 값설정
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const DropDownList: DropDownItemProps[] = [
    {
      key: 'ListTabl/DropDownList수정',
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

  // 테이블 기본 값설정
  const colWidth = [
    { width: '5%' },
    { width: '5%' },
    { width: '280px' },
    { width: '10%' },
    { width: '10%' },
    { width: '5%' },
    { width: '5%' },
    { width: '10%' },
    { width: '10%' },
    { width: '10%' },
    { width: '10%' },
    { width: '15%' },
    { width: '5%' },
  ];
  const theadList = [
    { th: [{ title: '', rowSpan: 2 }] },
    { th: [{ title: '문항코드', rowSpan: 2 }] },
    { th: [{ title: '개정과정', rowSpan: 2 }] },
    { th: [{ title: '학교', rowSpan: 2 }] },
    { th: [{ title: '학년', rowSpan: 2 }] },
    { th: [{ title: '학기', rowSpan: 2 }] },
    { th: [{ title: '대분류', rowSpan: 2 }] },
    { th: [{ title: '중분류', rowSpan: 2 }] },
    { th: [{ title: '문항타입', rowSpan: 2 }] },
    { th: [{ title: '업로드', rowSpan: 1 }] },
    {
      th: [
        { title: '작성자', rowSpan: 1 },
        { title: '일자', rowSpan: 1 },
        { title: '활성화', rowSpan: 1 },
      ],
    },
  ];

  return (
    <>
      {/* <Container>
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

        <ButtonWrapper>
          <DropDown
            list={DropDownList}
            buttonText={'수정'}
            showDropDown={showDropDown}
            setShowDropDown={setShowDropDown}
          ></DropDown>
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
      </Container>

      <TableWrapper>
        <Table list={questionList} colWidth={colWidth} theadList={theadList} />
      </TableWrapper>

      <PaginationBox itemsCountPerPage={10} totalItemsCount={totalPage} />
      {isDeleteAuthority && (
        <Alert
          title="권한을 삭제할 경우, "
          description="해당 권한의 아이디는 접속이 불가합니다."
          action="삭제"
          onClick={() => submitDelete()}
        />
      )} */}
    </>
  );
}

const Container = styled.div`
  padding: 10px;
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
`;

const TableWrapper = styled.div`
  min-height: 480px;
`;
