import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PaginationBox from '../../components/pagination/Pagination';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { PageAtom, totalPageState, editState } from '../../recoil/UtilState';
import { changeServiced } from '../../api/PutAxios';
import {
  CreateContentPopupState,
  UploadState,
  CreatingNewContentState,
  UploadFileState,
} from '../../recoil/CreatingContentState';
import {
  CreateListCodeValue,
  SearchValue,
  CheckBoxValue,
  IsChangedServicedValue,
} from '../../recoil/ValueState';
import { ManagementContentPopupState } from '../../recoil/ManagementContentState';
import { getQuestionList } from '../../api/GetAxios';
import { postFavoriteQuestion } from '../../api/PostAxios';

import { Button } from '@mui/material';
import Popover from '@mui/material/Popover';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import BookmarkBorderTwoToneIcon from '@mui/icons-material/BookmarkBorderTwoTone';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';

type QuestionListType = {
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

const ListTable = () => {
  const [didMount, setDidMount] = useState(false);
  let mountCount = 1;
  /**문항 리스트 관련 코드 */
  const [questionList, setQuestionList] = useState<QuestionListType[]>([]);
  const searchValue = useRecoilValue(SearchValue);
  const [isChangedServiced, setIsChangedServiced] = useRecoilState(
    IsChangedServicedValue,
  );
  const [totalPage, setTotalPage] = useRecoilState(totalPageState);
  const page = useRecoilValue(PageAtom);
  const size = 10;
  const MenuCode = useRecoilValue(CreateListCodeValue);

  /**체크박스 관련 코드 */
  const [selectedRows, setSelectedRows] =
    useRecoilState<number[]>(CheckBoxValue);
  const isAllSelected = selectedRows.length === questionList.length;

  const handleRowSelect = (checkbox: number) => {
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

  const handleSelectAll = () => {
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
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  /**문항 활성화/비활성화 관련 코드 */
  const [contentSeq, setContentSeq] = useRecoilState(CheckBoxValue);
  const formattedArray = contentSeq.map((value) => ({ contentSeq: value }));
  /**문항 활성화/비활성화 API */
  const changeServicedSubmit = () => {
    changeServiced({ formattedArray, setIsChangedServiced });
    setContentSeq([]);
  };

  /**문항 분류 관련 코드 */
  const [curriculum, setCurriculum] = useState('');
  const [schoolLevel, setSchoolLevel] = useState('');
  const [schoolYear, setSchoolYear] = useState('');
  const [semester, setSemester] = useState('');
  const [unitMajor, setUnitMajor] = useState('');
  const [unitType, setUnitType] = useState('');
  const [serviced, setServiced] = useState('');

  const handleCurriculumChange = (event: SelectChangeEvent) => {
    setCurriculum(event.target.value as string);
  };

  const handleSchoolLevelChange = (event: SelectChangeEvent) => {
    setSchoolLevel(event.target.value as string);
  };

  const handleSchoolYearChange = (event: SelectChangeEvent) => {
    setSchoolYear(event.target.value as string);
  };

  const handleSemesterChange = (event: SelectChangeEvent) => {
    setSemester(event.target.value as string);
  };

  const handleUnitMajorChange = (event: SelectChangeEvent) => {
    setUnitMajor(event.target.value as string);
  };

  const handleUnitTypeChange = (event: SelectChangeEvent) => {
    setUnitType(event.target.value as string);
  };

  const handleServicedChange = (event: SelectChangeEvent) => {
    setServiced(event.target.value as string);
  };

  /**문항 업로드 팝업 관련 코드 */
  const [isCreate, setIsCreate] = useRecoilState(CreateContentPopupState);
  const [isUpload, setIsUpload] = useRecoilState(UploadState);
  const setIsCreateNewContent = useSetRecoilState(CreatingNewContentState);
  const setIsUploadFile = useSetRecoilState(UploadFileState);

  const setIsEdit = useSetRecoilState(editState);

  /**문항 업로드 수정 팝업 함수 */
  const handleCreateEditFile = () => {
    setIsCreate(true);
    setIsUpload(true);
    setIsUploadFile(true);
    setIsCreateNewContent(false);
    setIsEdit(true);
  };

  /**문항 상세보기 팝업 관련 코드 */
  const [isManagement, setIsManagement] = useRecoilState(
    ManagementContentPopupState,
  );
  /**문항 관리 수정 팝업 함수 */
  const handleManagementEditFile = () => {
    setIsManagement(true);
    setIsEdit(true);
    console.log('문항 선택후 선택된 항목 리스트 상태 관리');
  };

  /**문항 즐겨찾기 관련 코드 */
  const [isFavorited, setIsFavorited] = useState(false);
  /**문항 즐겨찾기 API */
  const handleFavoriteQuestion = (questionSeq: number) => {
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
        setTotalPage,
        searchValue,
        MenuCode,
        page,
        size,
      });
    }
  }, [didMount, page, MenuCode, searchValue, isChangedServiced, isFavorited]);

  return (
    <>
      <S.mainContainer>
        <S.selectContainer>
          <FormControl sx={{ backgroundColor: 'white', height: 40 }}>
            <InputLabel size="small" id="개정과정">
              개정과정
            </InputLabel>
            <Select
              labelId="개정과정"
              id="select"
              value={curriculum}
              label="개정과정"
              onChange={handleCurriculumChange}
              sx={{ minWidth: 120, height: 40 }}
            >
              <MenuItem value={10}>2015</MenuItem>
              <MenuItem value={20}>2017</MenuItem>
              <MenuItem value={30}>2020</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ backgroundColor: 'white', height: 40 }}>
            <InputLabel size="small" id="학교">
              학교
            </InputLabel>
            <Select
              labelId="학교"
              id="select"
              value={schoolLevel}
              label="학교"
              onChange={handleSchoolLevelChange}
              sx={{ minWidth: 120, height: 40 }}
            >
              <MenuItem value={10}>01 중등</MenuItem>
              <MenuItem value={20}>02 중등</MenuItem>
              <MenuItem value={30}>03 중등</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ backgroundColor: 'white', height: 40 }}>
            <InputLabel size="small" id="학년">
              학년
            </InputLabel>
            <Select
              labelId="학년"
              id="select"
              value={schoolYear}
              label="학년"
              onChange={handleSchoolYearChange}
              sx={{ minWidth: 120, height: 40 }}
            >
              <MenuItem value={10}>중등 1</MenuItem>
              <MenuItem value={20}>중등 2</MenuItem>
              <MenuItem value={30}>중등 3</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ backgroundColor: 'white', height: 40 }}>
            <InputLabel size="small" id="학기">
              학기
            </InputLabel>
            <Select
              labelId="학기"
              id="select"
              value={semester}
              label="학기"
              onChange={handleSemesterChange}
              sx={{ minWidth: 120, height: 40 }}
            >
              <MenuItem value={10}>1학기</MenuItem>
              <MenuItem value={20}>2학기</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ backgroundColor: 'white', height: 40 }}>
            <InputLabel size="small" id="대분류">
              대분류
            </InputLabel>
            <Select
              labelId="대분류"
              id="select"
              value={unitMajor}
              label="대분류"
              onChange={handleUnitMajorChange}
              sx={{ minWidth: 120, height: 40 }}
            >
              <MenuItem value={10}>일차부등식 소분류</MenuItem>
              <MenuItem value={20}>일차부등식 중분류</MenuItem>
              <MenuItem value={30}>일차부등식 대분류</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ backgroundColor: 'white', height: 40 }}>
            <InputLabel size="small" id="문항타입">
              문항타입
            </InputLabel>
            <Select
              labelId="문항타입"
              id="select"
              value={unitType}
              label="문항타입"
              onChange={handleUnitTypeChange}
              sx={{ minWidth: 120, height: 40 }}
            >
              <MenuItem value={10}>객관식</MenuItem>
              <MenuItem value={20}>주관식</MenuItem>
              <MenuItem value={30}>서술형</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ backgroundColor: 'white', height: 40 }}>
            <InputLabel size="small" id="오픈여부">
              오픈여부
            </InputLabel>
            <Select
              labelId="오픈여부"
              id="select"
              value={serviced}
              label="오픈여부"
              onChange={handleServicedChange}
              sx={{ minWidth: 120, height: 40 }}
            >
              <MenuItem value={10}>활성화</MenuItem>
              <MenuItem value={20}>비활성화</MenuItem>
            </Select>
          </FormControl>
        </S.selectContainer>
        <S.btncontainer>
          {MenuCode === 'CNM_Q' ? (
            <>
              <S.btnWrapper>
                <StyledEditBtn
                  disabled={selectedRows.length === 0}
                  variant="outlined"
                  sx={{ backgroundColor: 'white' }}
                >
                  삭제
                </StyledEditBtn>
              </S.btnWrapper>
              <S.btnWrapper>
                <StyledEditBtn
                  aria-describedby={id}
                  disabled={selectedRows.length === 0}
                  variant="outlined"
                  sx={{ backgroundColor: 'white' }}
                  onClick={handleClick}
                >
                  수정
                </StyledEditBtn>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  sx={{ marginTop: '5px' }}
                >
                  <S.popoverMenu
                    onClick={() => {
                      handleClose();
                      handleManagementEditFile();
                    }}
                  >
                    수정
                  </S.popoverMenu>
                  <S.popoverMenu
                    onClick={() => {
                      handleClose();
                      handleManagementEditFile();
                    }}
                  >
                    복제 후 수정
                  </S.popoverMenu>
                </Popover>
              </S.btnWrapper>
            </>
          ) : (
            <S.btnWrapper>
              <StyledEditBtn
                aria-describedby={id}
                disabled={selectedRows.length === 0}
                variant="outlined"
                sx={{ backgroundColor: 'white' }}
                onClick={handleClick}
              >
                수정
              </StyledEditBtn>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                sx={{ marginTop: '5px' }}
              >
                <S.popoverMenu
                  onClick={() => {
                    handleClose();
                    handleCreateEditFile();
                  }}
                >
                  수정
                </S.popoverMenu>
                <S.popoverMenu
                  onClick={() => {
                    handleClose();
                    handleCreateEditFile();
                  }}
                >
                  복제 후 수정
                </S.popoverMenu>
              </Popover>
            </S.btnWrapper>
          )}
          <S.btnWrapper>
            <StyledActionBtn
              variant="outlined"
              disabled={selectedRows.length === 0}
              sx={{ backgroundColor: 'white' }}
              onClick={changeServicedSubmit}
            >
              활성화/비활성화
            </StyledActionBtn>
          </S.btnWrapper>
        </S.btncontainer>
      </S.mainContainer>
      <S.tablecontainer>
        <S.table>
          <S.thead>
            <S.tr>
              <S.th rowSpan={2} style={{ width: '40px' }}>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={isAllSelected}
                ></input>
              </S.th>
              <S.th rowSpan={2} style={{ width: '40px' }}></S.th>
              <S.th rowSpan={2} style={{ width: '350px' }}>
                문항코드
              </S.th>
              <S.th rowSpan={2} style={{ width: '40px' }}>
                개정과정
              </S.th>
              <S.th rowSpan={2} style={{ width: '40px' }}>
                학교
              </S.th>
              <S.th rowSpan={2} style={{ width: '40px' }}>
                학년
              </S.th>
              <S.th rowSpan={2} style={{ width: '40px' }}>
                학기
              </S.th>
              <S.th rowSpan={2} style={{ width: '200px' }}>
                대분류
              </S.th>
              <S.th rowSpan={2} style={{ width: '250px' }}>
                중분류
              </S.th>
              <S.th rowSpan={2} style={{ width: '40px' }}>
                문항타입
              </S.th>
              <S.th colSpan={3}>업로드</S.th>
            </S.tr>
            <S.tr>
              <S.th style={{ width: '60px' }}>작성자</S.th>
              <S.th style={{ width: '80px' }}>일자</S.th>
              <S.th style={{ width: '40px' }}>오픈여부</S.th>
            </S.tr>
          </S.thead>
          <S.tbody>
            {questionList.map((content, i) => (
              <S.tr key={i}>
                <S.td style={{ height: '10px', textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(content.contentSeq)}
                    onChange={() => handleRowSelect(content.contentSeq)}
                  ></input>
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleFavoriteQuestion(content.questionSeq)}
                  >
                    {content.favorited ? (
                      <BookmarkTwoToneIcon fontSize="small" />
                    ) : (
                      <BookmarkBorderTwoToneIcon fontSize="small" />
                    )}
                  </div>
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  {content.questionCode}
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  {content.curriculum}
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  {content.schoolLevel}
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  {content.schoolYear}
                </S.td>
                <S.td style={{ textAlign: 'center' }}>{content.semester}</S.td>
                <S.td style={{ textAlign: 'center' }}>
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
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
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
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  {content.questionType}
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  {content.questionCreatedByName}
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  {content.questionCreatedDate}
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  {content.serviced ? 'Y' : 'N'}
                </S.td>
              </S.tr>
            ))}
          </S.tbody>
        </S.table>
      </S.tablecontainer>
      <PaginationBox itemsCountPerPage={10} totalItemsCount={totalPage} />
    </>
  );
};

const S = {
  mainContainer: styled.div`
    margin: 40px 10px 20px 50px;
    display: flex;
    justify-content: space-between;
  `,
  selectContainer: styled.div`
    display: flex;
    gap: 10px;
  `,
  select: styled.select``,
  btncontainer: styled.div`
    display: flex;
    gap: 10px;
  `,
  option: styled.option``,
  btnWrapper: styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
  `,
  popoverMenu: styled.div`
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
  `,
  tablecontainer: styled.div`
    display: flex;
    justify-content: center;
    height: 400px;
    overflow: auto;
  `,
  table: styled.table`
    border-collapse: collapse;
    background-color: white;
    height: 10px;
  `,
  thead: styled.thead`
    font-size: medium;
  `,
  tbody: styled.tbody`
    font-size: small;
  `,
  tr: styled.tr`
    height: 30px;
  `,
  th: styled.th`
    border: 1px solid #a3aed0;
    color: #a3aed0;
  `,
  td: styled.td`
    border: 1px solid #a3aed0;
  `,
};
const StyledEditBtn = styled(Button)`
  && {
    width: 70px;
    height: 25px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;

const StyledActionBtn = styled(Button)`
  && {
    width: 130px;
    height: 25px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;

export default ListTable;
