import * as React from 'react';
import { useState, useEffect } from 'react';

import BookmarkBorderTwoToneIcon from '@mui/icons-material/BookmarkBorderTwoTone';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { getQuestionList } from '../../api/getAxios';
import { postFavoriteQuestion } from '../../api/postAxios';
import { putChangeServiced } from '../../api/putAxios';
import { SelectAlert } from '../../components/alert/SelectAlert';
import { PaginationBox } from '../../components/pagination/Pagination';
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

  const selectCurriculum = (event: SelectChangeEvent) => {
    setContent((prevContent) => ({
      ...prevContent,
      curriculum: event.target.value as string,
    }));
  };

  const selectSchoolLevel = (event: SelectChangeEvent) => {
    setContent((prevContent) => ({
      ...prevContent,
      schoolLevel: event.target.value as string,
    }));
  };

  const selectSchoolYear = (event: SelectChangeEvent) => {
    setContent((prevContent) => ({
      ...prevContent,
      schoolYear: event.target.value as string,
    }));
  };

  const selectSemester = (event: SelectChangeEvent) => {
    setContent((prevContent) => ({
      ...prevContent,
      semester: event.target.value as string,
    }));
  };

  const selectUnitMajor = (event: SelectChangeEvent) => {
    setContent((prevContent) => ({
      ...prevContent,
      unitMajor: event.target.value as string,
    }));
  };

  const selectUnitType = (event: SelectChangeEvent) => {
    setContent((prevContent) => ({
      ...prevContent,
      unitType: event.target.value as string,
    }));
  };

  const selectServiced = (event: SelectChangeEvent) => {
    setContent((prevContent) => ({
      ...prevContent,
      serviced: event.target.value as string,
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
            <FormControl sx={{ backgroundColor: 'white', height: 40 }}>
              <InputLabel size="small" id="개정과정">
                개정과정
              </InputLabel>
              <Select
                labelId="개정과정"
                id="select"
                value={content.curriculum}
                label="개정과정"
                onChange={selectCurriculum}
                sx={{ minWidth: 120, maxWidth: 120, height: 40 }}
              >
                <MenuItem value={2015}>2015</MenuItem>
                <MenuItem value={2016}>2016</MenuItem>
                <MenuItem value={2017}>2017</MenuItem>
                <MenuItem value={2020}>2020</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ backgroundColor: 'white', height: 40 }}>
              <InputLabel size="small" id="학교">
                학교
              </InputLabel>
              <Select
                labelId="학교"
                id="select"
                value={content.schoolLevel}
                label="학교"
                onChange={selectSchoolLevel}
                sx={{ minWidth: 120, maxWidth: 120, height: 40 }}
              >
                <MenuItem value={'초등'}>초등</MenuItem>
                <MenuItem value={'중등'}>중등</MenuItem>
                <MenuItem value={'고등'}>고등</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ backgroundColor: 'white', height: 40 }}>
              <InputLabel size="small" id="학년">
                학년
              </InputLabel>
              <Select
                labelId="학년"
                id="select"
                value={content.schoolYear}
                label="학년"
                onChange={selectSchoolYear}
                sx={{ minWidth: 120, maxWidth: 120, height: 40 }}
              >
                <MenuItem value={'초등1'}>초등 1</MenuItem>
                <MenuItem value={'초등2'}>초등 2</MenuItem>
                <MenuItem value={'중등1'}>중등 1</MenuItem>
                <MenuItem value={'중등2'}>중등 2</MenuItem>
                <MenuItem value={'고등1'}>고등 1</MenuItem>
                <MenuItem value={'고등2'}>고등 2</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ backgroundColor: 'white', height: 40 }}>
              <InputLabel size="small" id="학기">
                학기
              </InputLabel>
              <Select
                labelId="학기"
                id="select"
                value={content.semester}
                label="학기"
                onChange={selectSemester}
                sx={{ minWidth: 120, maxWidth: 120, height: 40 }}
              >
                <MenuItem value={'1학기'}>1학기</MenuItem>
                <MenuItem value={'2학기'}>2학기</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ backgroundColor: 'white', height: 40 }}>
              <InputLabel size="small" id="대분류">
                대분류
              </InputLabel>
              <Select
                labelId="대분류"
                id="select"
                value={content.unitMajor}
                label="대분류"
                onChange={selectUnitMajor}
                sx={{ minWidth: 120, maxWidth: 120, height: 40 }}
              >
                <MenuItem value={'일차부등식 소분류'}>
                  일차부등식 소분류
                </MenuItem>
                <MenuItem value={'일차부등식 중분류'}>
                  일차부등식 중분류
                </MenuItem>
                <MenuItem value={'일차부등식 대분류'}>
                  일차부등식 대분류
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ backgroundColor: 'white', height: 40 }}>
              <InputLabel size="small" id="문항타입">
                문항타입
              </InputLabel>
              <Select
                labelId="문항타입"
                id="select"
                value={content.unitType}
                label="문항타입"
                onChange={selectUnitType}
                sx={{ minWidth: 120, maxWidth: 120, height: 40 }}
              >
                <MenuItem value={'객관식'}>객관식</MenuItem>
                <MenuItem value={'주관식'}>주관식</MenuItem>
                <MenuItem value={'서술형'}>서술형</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ backgroundColor: 'white', height: 40 }}>
              <InputLabel size="small" id="오픈여부">
                오픈여부
              </InputLabel>
              <Select
                labelId="오픈여부"
                id="select"
                value={content.serviced}
                label="오픈여부"
                onChange={selectServiced}
                sx={{ minWidth: 120, maxWidth: 120, height: 40 }}
              >
                <MenuItem value={'활성화'}>활성화</MenuItem>
                <MenuItem value={'비활성화'}>비활성화</MenuItem>
              </Select>
            </FormControl>
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
