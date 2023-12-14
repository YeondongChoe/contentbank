import * as React from 'react';
import { useState, useEffect } from 'react';

import BookmarkBorderTwoToneIcon from '@mui/icons-material/BookmarkBorderTwoTone';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import { Button } from '@mui/material';
import Popover from '@mui/material/Popover';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { getQuestionList } from '../../api/getAxios';
import { postFavoriteQuestion } from '../../api/postAxios';
import { putChangeServiced } from '../../api/putAxios';
import { Select } from '../../components/atom/select';
import {
  createContentPopupBoolAtom,
  uploadBoolAtom,
  creatingNewContentBoolAtom,
  uploadFileBoolAtom,
} from '../../state/creatingContentAtom';
import { managementContentPopupBoolAtom } from '../../state/managementContentAtom';
import {
  pageAtom,
  totalPageAtom,
  updateBoolAtom,
  alertBoolAtom,
} from '../../state/utilAtom';
import {
  createListCodeValueAtom,
  searchValueAtom,
  checkBoxValueAtom,
  servicedValueBoolAtom,
} from '../../state/valueAtom';
import { SelectAlert } from '../molecules/alert/SelectAlert';
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
  let mountCount = 1;
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
  const [content, setContent] = useState({
    curriculum: '',
    schoolLevel: '',
    schoolYear: '',
    semester: '',
    unitMajor: '',
    unitType: '',
    serviced: '',
  });

  const category = [
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

  const handleSelectChange = (
    fieldName: string,
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setContent((prevContent) => ({
      ...prevContent,
      [fieldName]: event.target.value,
    }));
  };

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
    mountCount++;
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

  return (
    <>
      <Container>
        <Wrapper>
          <SelectWrapper>
            {category.map((el) => (
              <Select
                width="120px"
                value={el.value}
                defaultValue={el.label}
                onChange={(e) => handleSelectChange(el.value, e)}
                key={el.label}
                options={el.options}
              />
            ))}
          </SelectWrapper>
          <ButtonWrapper>
            {MenuCode === 'CNM_Q' ? (
              <>
                <EachButtonWrapper>
                  <StyledEditBtn
                    disabled={selectedRows.length === 0}
                    variant="outlined"
                    sx={{ backgroundColor: 'white' }}
                    onClick={openDeleteAlert}
                  >
                    삭제
                  </StyledEditBtn>
                </EachButtonWrapper>
                <EachButtonWrapper>
                  <StyledEditBtn
                    aria-describedby={id}
                    disabled={selectedRows.length === 0}
                    variant="outlined"
                    sx={{ backgroundColor: 'white' }}
                    onClick={openPopover}
                  >
                    수정
                  </StyledEditBtn>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={closePopover}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    sx={{ marginTop: '5px' }}
                  >
                    <PopoverMenu
                      onClick={() => {
                        closePopover();
                        openmanagementEditFilePopup();
                      }}
                    >
                      수정
                    </PopoverMenu>
                    <PopoverMenu
                      onClick={() => {
                        closePopover();
                        openmanagementEditFilePopup();
                      }}
                    >
                      복제 후 수정
                    </PopoverMenu>
                  </Popover>
                </EachButtonWrapper>
              </>
            ) : (
              <EachButtonWrapper>
                <StyledEditBtn
                  aria-describedby={id}
                  disabled={selectedRows.length === 0}
                  variant="outlined"
                  sx={{ backgroundColor: 'white' }}
                  onClick={openPopover}
                >
                  수정
                </StyledEditBtn>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={closePopover}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  sx={{ marginTop: '5px' }}
                >
                  <PopoverMenu
                    onClick={() => {
                      closePopover();
                      openCreateEditFilePopup();
                    }}
                  >
                    수정
                  </PopoverMenu>
                  <PopoverMenu
                    onClick={() => {
                      closePopover();
                      openCreateEditFilePopup();
                    }}
                  >
                    복제 후 수정
                  </PopoverMenu>
                </Popover>
              </EachButtonWrapper>
            )}
            <EachButtonWrapper>
              <StyledActionBtn
                variant="outlined"
                disabled={selectedRows.length === 0}
                sx={{ backgroundColor: 'white' }}
                onClick={submitChangingService}
              >
                활성화/비활성화
              </StyledActionBtn>
            </EachButtonWrapper>
          </ButtonWrapper>
        </Wrapper>
      </Container>
      <TableWrapper>
        <Table>
          <Thead>
            <Tr>
              <Th rowSpan={2} style={{ width: '40px' }}>
                <input
                  type="checkbox"
                  onChange={selectAll}
                  checked={isAllSelected}
                ></input>
              </Th>
              <Th rowSpan={2} style={{ width: '40px' }}></Th>
              <Th rowSpan={2} style={{ width: '350px' }}>
                문항코드
              </Th>
              <Th rowSpan={2} style={{ width: '40px' }}>
                개정과정
              </Th>
              <Th rowSpan={2} style={{ width: '40px' }}>
                학교
              </Th>
              <Th rowSpan={2} style={{ width: '40px' }}>
                학년
              </Th>
              <Th rowSpan={2} style={{ width: '40px' }}>
                학기
              </Th>
              <Th rowSpan={2} style={{ width: '200px' }}>
                대분류
              </Th>
              <Th rowSpan={2} style={{ width: '250px' }}>
                중분류
              </Th>
              <Th rowSpan={2} style={{ width: '40px' }}>
                문항타입
              </Th>
              <Th colSpan={3}>업로드</Th>
            </Tr>
            <Tr>
              <Th style={{ width: '60px' }}>작성자</Th>
              <Th style={{ width: '80px' }}>일자</Th>
              <Th style={{ width: '40px' }}>오픈여부</Th>
            </Tr>
          </Thead>
          <Tbody>
            {questionList.map((content, i) => (
              <Tr key={i}>
                <Td style={{ height: '10px', textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(content.contentSeq)}
                    onChange={() => selectRow(content.contentSeq)}
                  ></input>
                </Td>
                <Td style={{ textAlign: 'center' }}>
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => addFavoriteQuestion(content.questionSeq)}
                  >
                    {content.favorited ? (
                      <BookmarkTwoToneIcon fontSize="small" />
                    ) : (
                      <BookmarkBorderTwoToneIcon fontSize="small" />
                    )}
                  </div>
                </Td>
                <Td style={{ textAlign: 'center' }}>{content.questionCode}</Td>
                <Td style={{ textAlign: 'center' }}>{content.curriculum}</Td>
                <Td style={{ textAlign: 'center' }}>{content.schoolLevel}</Td>
                <Td style={{ textAlign: 'center' }}>{content.schoolYear}</Td>
                <Td style={{ textAlign: 'center' }}>{content.semester}</Td>
                <Td style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      maxWidth: '200px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {content.unitMajor}
                  </div>
                </Td>
                <Td style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      maxWidth: '250px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {content.unitMiddle}
                  </div>
                </Td>
                <Td style={{ textAlign: 'center' }}>{content.questionType}</Td>
                <Td style={{ textAlign: 'center' }}>
                  {content.questionCreatedByName}
                </Td>
                <Td style={{ textAlign: 'center' }}>
                  {content.questionCreatedDate}
                </Td>
                <Td style={{ textAlign: 'center' }}>
                  {content.serviced ? 'Y' : 'N'}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableWrapper>
      <PaginationBox itemsCountPerPage={10} totalItemsCount={totalPage} />
      {isDeleteAuthority && (
        <SelectAlert
          title="권한을 삭제할 경우, "
          description="해당 권한의 아이디는 접속이 불가합니다."
          action="삭제"
          onClick={() => submitDelete()}
        />
      )}
    </>
  );
}

const Container = styled.div`
  padding: 40px 0px 10px;
  display: flex;
  justify-content: space-between;
  gap: 5px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SelectWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding-left: 30px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
`;

const EachButtonWrapper = styled.div`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const PopoverMenu = styled.div`
  width: 100px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
  &:nth-child(2) {
    border-top: 2px solid #dde1e9;
  }
  &:hover {
    background-color: #422afb;
    color: white;
  }
`;

const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 400px;
  overflow: auto;
`;

const Table = styled.table`
  border-collapse: collapse;
  background-color: white;
  height: 10px;
`;

const Thead = styled.thead`
  font-size: medium;
`;

const Tbody = styled.tbody`
  font-size: small;
`;

const Tr = styled.tr`
  height: 30px;
`;

const Th = styled.th`
  border: 1px solid #a3aed0;
  color: #a3aed0;
`;
const Td = styled.td`
  border: 1px solid #a3aed0;
`;

const StyledEditBtn = styled(Button)`
  && {
    width: 70px;
    height: 30px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;

const StyledActionBtn = styled(Button)`
  && {
    width: 130px;
    height: 30px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;
