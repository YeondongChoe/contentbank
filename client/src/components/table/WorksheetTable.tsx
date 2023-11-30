import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import dummy from './data.json';
import PaginationBox from '../../components/pagination/Pagination';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { PageAtom, totalPageState } from '../../recoil/UtilState';
import {
  CreateListCodeValue,
  SearchValue,
  CheckBoxValue,
  IsChangedServicedValue,
} from '../../recoil/ValueState';
import {
  CreateWorksheetStep1,
  CreateWorksheetStep2,
  EditWorksheet,
} from '../../recoil/CreatingWorksheet';
import Step2 from '../../pages/worksheetPopup/Step2';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import BookmarkBorderTwoToneIcon from '@mui/icons-material/BookmarkBorderTwoTone';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';

const WorksheetTable = () => {
  const [value, setValue] = useState('1');
  const [isStep1, setIsStep1] = useRecoilState(CreateWorksheetStep1);
  const [isStep2, setIsStep2] = useRecoilState(CreateWorksheetStep2);
  const setEditWorksheet = useSetRecoilState(EditWorksheet);

  const handleEditFile = () => {
    setIsStep1(false);
    setIsStep2(true);
    setEditWorksheet(true);
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setSelectedRows([]);
  };

  const worksheetList = dummy.Worksheet;

  const [didMount, setDidMount] = useState(false);
  let mountCount = 1;

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [totalPage, setTotalPage] = useRecoilState(totalPageState);
  const page = useRecoilValue(PageAtom);
  const size = 10;
  const MenuCode = useRecoilValue(CreateListCodeValue);
  const [selectedRows, setSelectedRows] =
    useRecoilState<number[]>(CheckBoxValue);
  const isAllSelected = selectedRows.length === worksheetList.length;

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
      setSelectedRows(worksheetList.map((worksheet) => worksheet.id));
    }
  };

  const handleFavoriteQuestion = (questionSeq: number) => {
    // postFavoriteQuestion({ isFavorited, setIsFavorited }, questionSeq);
  };

  const handleFilterdList = (enabled: string) => {};

  useEffect(() => {
    mountCount++;
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      console.log('학습지 리스트 불러오는 API 함수');
    }
  }, [didMount, page, MenuCode]);

  return (
    <>
      <S.mainContainer>
        <Box sx={{ typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderColor: 'divider' }}>
              <TabList onChange={handleChangeTab}>
                <Tab
                  label="전체"
                  value="1"
                  style={{ fontSize: '16px', fontWeight: 'bold' }}
                  onClick={() => handleFilterdList('')}
                />
                <Tab
                  label="초등"
                  value="2"
                  style={{ fontSize: '16px', fontWeight: 'bold' }}
                  onClick={() => handleFilterdList('elemental')}
                />
                <Tab
                  label="중등"
                  value="3"
                  style={{ fontSize: '16px', fontWeight: 'bold' }}
                  onClick={() => handleFilterdList('middle')}
                />
                <Tab
                  label="고등"
                  value="4"
                  style={{ fontSize: '16px', fontWeight: 'bold' }}
                  onClick={() => handleFilterdList('high')}
                />
              </TabList>
            </Box>
          </TabContext>
        </Box>
      </S.mainContainer>
      <S.tablecontainer>
        <S.table>
          <S.thead>
            <S.tr>
              <S.th rowSpan={2} style={{ width: '60px' }}>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={isAllSelected}
                ></input>
              </S.th>
              <S.th rowSpan={2} style={{ width: '60px' }}></S.th>
              <S.th rowSpan={2} style={{ width: '80px' }}>
                학년
              </S.th>
              <S.th rowSpan={2} style={{ width: '100px' }}>
                태그
              </S.th>
              <S.th rowSpan={2} style={{ width: '620px' }}>
                학습지명
              </S.th>
              <S.th rowSpan={2} style={{ width: '100px' }}>
                등록일
              </S.th>
              <S.th rowSpan={2} style={{ width: '80px' }}>
                작성자
              </S.th>
              <S.th rowSpan={2} style={{ width: '80px' }}>
                미리보기
              </S.th>
              <S.th rowSpan={2} style={{ width: '80px' }}>
                설정
              </S.th>
            </S.tr>
          </S.thead>
          <S.tbody>
            {worksheetList.map((worksheet, i) => (
              <S.tr key={i}>
                <S.td style={{ height: '10px', textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(worksheet.id)}
                    onChange={() => handleRowSelect(worksheet.id)}
                  ></input>
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleFavoriteQuestion(worksheet.id)}
                  >
                    {worksheet.favorited ? (
                      <BookmarkTwoToneIcon fontSize="small" />
                    ) : (
                      <BookmarkBorderTwoToneIcon fontSize="small" />
                    )}
                  </div>
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  {worksheet.schoolLevel}
                </S.td>
                <S.td style={{ textAlign: 'center' }}>{worksheet.tag}</S.td>
                <S.td style={{ textAlign: 'center' }}>
                  {worksheet.WorksheetName}
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  {worksheet.createdAt}
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      maxWidth: '200px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {worksheet.creater}
                  </div>
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  <div style={{ cursor: 'pointer' }}>
                    <PlagiarismOutlinedIcon />
                  </div>
                </S.td>
                <S.td style={{ textAlign: 'center' }}>
                  <div
                    style={{ cursor: 'pointer' }}
                    aria-describedby={id}
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </div>
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
                        handleEditFile();
                        handleClose();
                      }}
                    >
                      수정
                    </S.popoverMenu>
                    <S.popoverMenu
                      onClick={() => {
                        handleEditFile();
                        handleClose();
                      }}
                    >
                      복제 후 수정
                    </S.popoverMenu>
                    <S.popoverMenu
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      삭제
                    </S.popoverMenu>
                  </Popover>
                </S.td>
              </S.tr>
            ))}
          </S.tbody>
        </S.table>
      </S.tablecontainer>
      <PaginationBox itemsCountPerPage={10} totalItemsCount={totalPage} />
      {isStep2 && <Step2 />}
    </>
  );
};

const S = {
  mainContainer: styled.div`
    margin: 20px 10px 20px 70px;
    display: flex;
    justify-content: space-between;
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
    &:nth-child(3) {
      border-top: 2px solid #dde1e9;
    }
    &:hover {
      background-color: #422afb;
      color: white;
    }
  `,
};

export default WorksheetTable;
