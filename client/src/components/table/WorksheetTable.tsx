import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import dummy from './data.json';
import { PaginationBox } from '../../components/pagination/Pagination';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, totalPageAtom } from '../../state/utilAtom';
import {
  createListCodeValueAtom,
  searchValueAtom,
  checkBoxValueAtom,
  servicedValueBoolAtom,
} from '../../state/valueAtom';
import {
  createWorksheetStep1BoolAtom,
  createWorksheetStep2BoolAtom,
  editWorksheetBoolAtom,
} from '../../state/creatingWorksheetAtom';
import { Step2 } from '../../pages/worksheetPopup/Step2';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import BookmarkBorderTwoToneIcon from '@mui/icons-material/BookmarkBorderTwoTone';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';

export function WorksheetTable() {
  const [value, setValue] = useState('1');
  const [isStep1, setIsStep1] = useRecoilState(createWorksheetStep1BoolAtom);
  const [isStep2, setIsStep2] = useRecoilState(createWorksheetStep2BoolAtom);
  const setIsEditWorksheet = useSetRecoilState(editWorksheetBoolAtom);

  const openEditFilePopup = () => {
    setIsStep1(false);
    setIsStep2(true);
    setIsEditWorksheet(true);
  };

  const changeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setSelectedRows([]);
  };

  const worksheetList = dummy.Worksheet;

  const [didMount, setDidMount] = useState(false);
  let mountCount = 1;

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const openPopover = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [totalPage, settotalPage] = useRecoilState(totalPageAtom);
  const page = useRecoilValue(pageAtom);
  const size = 10;
  const MenuCode = useRecoilValue(createListCodeValueAtom);
  const [selectedRows, setSelectedRows] =
    useRecoilState<number[]>(checkBoxValueAtom);
  const isAllSelected = selectedRows.length === worksheetList.length;

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
      setSelectedRows(worksheetList.map((worksheet) => worksheet.id));
    }
  };

  const addFavoriteQuestion = (questionSeq: number) => {
    //postFavoriteQuestion({ isFavorited, setIsFavorited }, questionSeq);
  };

  const showFilterdList = (enabled: string) => {};

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
      <Container>
        <Box sx={{ typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderColor: 'divider' }}>
              <TabList onChange={changeTab}>
                <Tab
                  label="전체"
                  value="1"
                  style={{ fontSize: '16px', fontWeight: 'bold' }}
                  onClick={() => showFilterdList('')}
                />
                <Tab
                  label="초등"
                  value="2"
                  style={{ fontSize: '16px', fontWeight: 'bold' }}
                  onClick={() => showFilterdList('elemental')}
                />
                <Tab
                  label="중등"
                  value="3"
                  style={{ fontSize: '16px', fontWeight: 'bold' }}
                  onClick={() => showFilterdList('middle')}
                />
                <Tab
                  label="고등"
                  value="4"
                  style={{ fontSize: '16px', fontWeight: 'bold' }}
                  onClick={() => showFilterdList('high')}
                />
              </TabList>
            </Box>
          </TabContext>
        </Box>
      </Container>
      <TableWrapper>
        <Table>
          <Thead>
            <Tr>
              <Th rowSpan={2} style={{ width: '60px' }}>
                <input
                  type="checkbox"
                  onChange={selectAll}
                  checked={isAllSelected}
                ></input>
              </Th>
              <Th rowSpan={2} style={{ width: '60px' }}></Th>
              <Th rowSpan={2} style={{ width: '80px' }}>
                학년
              </Th>
              <Th rowSpan={2} style={{ width: '100px' }}>
                태그
              </Th>
              <Th rowSpan={2} style={{ width: '620px' }}>
                학습지명
              </Th>
              <Th rowSpan={2} style={{ width: '100px' }}>
                등록일
              </Th>
              <Th rowSpan={2} style={{ width: '80px' }}>
                작성자
              </Th>
              <Th rowSpan={2} style={{ width: '80px' }}>
                미리보기
              </Th>
              <Th rowSpan={2} style={{ width: '80px' }}>
                설정
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {worksheetList.map((worksheet, i) => (
              <Tr key={i}>
                <Td style={{ height: '10px', textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(worksheet.id)}
                    onChange={() => selectRow(worksheet.id)}
                  ></input>
                </Td>
                <Td style={{ textAlign: 'center' }}>
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => addFavoriteQuestion(worksheet.id)}
                  >
                    {worksheet.favorited ? (
                      <BookmarkTwoToneIcon fontSize="small" />
                    ) : (
                      <BookmarkBorderTwoToneIcon fontSize="small" />
                    )}
                  </div>
                </Td>
                <Td style={{ textAlign: 'center' }}>{worksheet.schoolLevel}</Td>
                <Td style={{ textAlign: 'center' }}>{worksheet.tag}</Td>
                <Td style={{ textAlign: 'center' }}>
                  {worksheet.WorksheetName}
                </Td>
                <Td style={{ textAlign: 'center' }}>{worksheet.createdAt}</Td>
                <Td style={{ textAlign: 'center' }}>
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
                </Td>
                <Td style={{ textAlign: 'center' }}>
                  <div style={{ cursor: 'pointer' }}>
                    <PlagiarismOutlinedIcon />
                  </div>
                </Td>
                <Td style={{ textAlign: 'center' }}>
                  <div
                    style={{ cursor: 'pointer' }}
                    aria-describedby={id}
                    onClick={openPopover}
                  >
                    <MoreVertIcon />
                  </div>
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
                        openEditFilePopup();
                        closePopover();
                      }}
                    >
                      수정
                    </PopoverMenu>
                    <PopoverMenu
                      onClick={() => {
                        openEditFilePopup();
                        closePopover();
                      }}
                    >
                      복제 후 수정
                    </PopoverMenu>
                    <PopoverMenu
                      onClick={() => {
                        closePopover();
                      }}
                    >
                      삭제
                    </PopoverMenu>
                  </Popover>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableWrapper>
      <PaginationBox itemsCountPerPage={10} totalItemsCount={totalPage} />
      {isStep2 && <Step2 />}
    </>
  );
}

const Container = styled.div`
  padding: 20px 10px 20px 50px;
  display: flex;
  justify-content: space-between;
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
  &:nth-child(3) {
    border-top: 2px solid #dde1e9;
  }
  &:hover {
    background-color: #422afb;
    color: white;
  }
`;
