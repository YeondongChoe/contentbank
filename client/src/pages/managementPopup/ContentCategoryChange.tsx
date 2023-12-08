import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import dummy from '../createPopup/data.json';
import { useRecoilState } from 'recoil';
import { checkListValueAtom } from '../../state/valueAtom';

import { Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export function ContentCategoryChange() {
  const [didMount, setDidMount] = useState(false);
  let mountCount = 1;
  const ContentList = dummy.ContentInfo;

  const [selectedRows, setSelectedRows] =
    useRecoilState<number[]>(checkListValueAtom);
  const isAllSelected = selectedRows.length === ContentList.length;

  const selectAll = () => {
    if (isAllSelected) {
      // 전체 선택 상태에서 전체 선택 체크박스를 클릭하면 모두 선택 해제
      setSelectedRows([]);
    } else {
      // 그렇지 않으면 모두 선택
      setSelectedRows(ContentList.map((content) => content.sort));
    }
  };

  const [classificatecode, setClassificatecode] = useState('');
  const [selectedCode, setSelectedCode] = useState<number | null>(null);

  const checkSelectedContentCode = (sort: any) => {
    setSelectedCode(sort === selectedCode ? null : sort);
  };

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

  const [changeContent, setChangeContent] = useState({
    changeCurriculum: '',
    changeSchoolLevel: '',
    changeSchoolYear: '',
    changeSemester: '',
    changeUnitMajor: '',
    changeUnitType: '',
    putChangeServiced: '',
  });

  const changeCurriculum = (event: SelectChangeEvent) => {
    setChangeContent((prevContent) => ({
      ...prevContent,
      changeCurriculum: event.target.value as string,
    }));
  };

  const changeSchoolLevel = (event: SelectChangeEvent) => {
    setChangeContent((prevContent) => ({
      ...prevContent,
      changeSchoolLevel: event.target.value as string,
    }));
  };

  const changeSchoolYear = (event: SelectChangeEvent) => {
    setChangeContent((prevContent) => ({
      ...prevContent,
      changeSchoolYear: event.target.value as string,
    }));
  };

  const changeSemester = (event: SelectChangeEvent) => {
    setChangeContent((prevContent) => ({
      ...prevContent,
      changeSemester: event.target.value as string,
    }));
  };

  const changeUnitMajor = (event: SelectChangeEvent) => {
    setChangeContent((prevContent) => ({
      ...prevContent,
      changeUnitMajor: event.target.value as string,
    }));
  };

  const changeUnitType = (event: SelectChangeEvent) => {
    setChangeContent((prevContent) => ({
      ...prevContent,
      changeUnitType: event.target.value as string,
    }));
  };

  const changeServiced = (event: SelectChangeEvent) => {
    setChangeContent((prevContent) => ({
      ...prevContent,
      putChangeServiced: event.target.value as string,
    }));
  };

  const searchCategory = () => {
    console.log('콘텐츠리스트 get API');
  };

  const changeCategory = () => {
    console.log('가지고 온 리스트의 배열을 변경 사항에 맞게 변경');
  };

  const submitSave = () => {
    console.log('변경된 콘텐츠 문항 put API');
  };

  /** 다중선택 기능 */
  const [isShiftKeyPressed, setIsShiftKeyPressed] = useState(false);
  const [lastClickedIndex, setLastClickedIndex] = useState<number | null>(null);

  const selectContentCode = (
    sort: number,
    classificatecode: string,
    curriculum: string,
    schoolLevel: string,
    schoolYear: string,
    semester: string,
    unitMajor: string,
    unitType: string,
    serviced: string,
  ) => {
    if (lastClickedIndex !== null && isShiftKeyPressed) {
      // Shift 키가 눌려 있고 이전 클릭된 항목이 있다면
      const start = Math.min(lastClickedIndex, sort);
      const end = Math.max(lastClickedIndex, sort);
      const selectedRange = ContentList.slice(start, end + 1).map(
        (el) => el.sort,
      );
      setSelectedRows((prevSelectedRows) => {
        // 중복된 항목을 방지하기 위해 Set을 사용
        const newSelectedRows = new Set([
          ...prevSelectedRows,
          ...selectedRange,
        ]);
        return Array.from(newSelectedRows);
      });
    } else {
      // Shift 키가 눌리지 않았거나 이전 클릭된 항목이 없으면 단일 선택
      setSelectedCode(sort === selectedCode ? null : sort);
      setSelectedRows([sort]);
    }
    setLastClickedIndex(sort);
    checkSelectedContentCode(sort);
    setClassificatecode(classificatecode);
    setContent((prevContent) => ({
      ...prevContent,
      curriculum: curriculum,
      schoolLevel: schoolLevel,
      schoolYear: schoolYear,
      semester: semester,
      unitMajor: unitMajor,
      unitType: unitType,
      serviced: serviced,
    }));
    console.log('가지고 있는 Info와 뷰어에 들어갈 정보 뿌려주기');
    console.log('다중선택 바꾸기할 때 필요 값을 배열로 받아야 함');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setIsShiftKeyPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setIsShiftKeyPressed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    mountCount++;
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      console.log('메인 페이지에서 체크해서 가져온 콘텐츠 list 불러오기');
    }
  }, [didMount]);

  return (
    <Container>
      <SelectsWrapper>
        <SelectWrapper>
          <TitleWrapper>
            <SelectTitle>찾을 문항 분류</SelectTitle>
            <StyledActionBtn variant="outlined" onClick={searchCategory}>
              찾기
            </StyledActionBtn>
          </TitleWrapper>
          <SelectBox>
            <FormControl sx={{ backgroundColor: 'white', height: 40 }}>
              <InputLabel size="small" id="개정과정">
                개정과정
              </InputLabel>
              <Select
                labelId="개정과정"
                id="select"
                value={content.curriculum}
                label={'개정과정'}
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
          </SelectBox>
          <TitleWrapper>
            <SelectTitle>바꿀 문항 분류</SelectTitle>
            <StyledActionBtn variant="contained" onClick={changeCategory}>
              선택 바꾸기
            </StyledActionBtn>
          </TitleWrapper>
          <SelectBox>
            <FormControl sx={{ backgroundColor: 'white', height: 40 }}>
              <InputLabel size="small" id="개정과정">
                개정과정
              </InputLabel>
              <Select
                labelId="개정과정"
                id="select"
                value={changeContent.changeCurriculum}
                label="개정과정"
                onChange={changeCurriculum}
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
                value={changeContent.changeSchoolLevel}
                label="학교"
                onChange={changeSchoolLevel}
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
                value={changeContent.changeSchoolYear}
                label="학년"
                onChange={changeSchoolYear}
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
                value={changeContent.changeSemester}
                label="학기"
                onChange={changeSemester}
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
                value={changeContent.changeUnitMajor}
                label="대분류"
                onChange={changeUnitMajor}
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
                value={changeContent.changeUnitType}
                label="문항타입"
                onChange={changeUnitType}
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
                value={changeContent.putChangeServiced}
                label="오픈여부"
                onChange={changeServiced}
                sx={{ minWidth: 120, maxWidth: 120, height: 40 }}
              >
                <MenuItem value={'활성화'}>활성화</MenuItem>
                <MenuItem value={'비활성화'}>비활성화</MenuItem>
              </Select>
            </FormControl>
          </SelectBox>
        </SelectWrapper>
      </SelectsWrapper>
      <ContentWrapper>
        <ContentListSection>
          <ContentTitle>문항선택</ContentTitle>
          <ContentListWrapper>
            <AllCheckWapper>
              <input
                type="checkbox"
                onChange={selectAll}
                checked={isAllSelected}
              ></input>
              <AllCheckTitle>전체선택</AllCheckTitle>
            </AllCheckWapper>
            {ContentList.map((el, i) => (
              <Content
                key={i}
                onClick={() => {
                  {
                    selectContentCode(
                      el.sort,
                      el.classificatecode,
                      el.curriculum,
                      el.schoolLevel,
                      el.schoolYear,
                      el.semester,
                      el.unitMajor,
                      el.unitType,
                      el.serviced,
                    );
                  }
                }}
                choiced={
                  el.sort === selectedCode || selectedRows.includes(el.sort)
                }
              >
                {el.code}
              </Content>
            ))}
          </ContentListWrapper>
        </ContentListSection>
        <ContentViewerSection>
          <ContentTitle>문항 뷰어 {classificatecode}</ContentTitle>
          <ViewerWrapper>
            <div>가지고온 리스트의 문항을 뷰어로 보여주기</div>
            <div>변경 내용 저장을 눌렀을 때 서버에 Post API</div>
          </ViewerWrapper>
        </ContentViewerSection>
        <SaveButtonWrapper>
          <StyledSaveBtn variant="outlined" onClick={submitSave}>
            변경 내용 저장
          </StyledSaveBtn>
        </SaveButtonWrapper>
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.div``;
const SelectsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 20px;
`;
const SelectTitle = styled.div``;
const SelectBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-top: 20px;
`;
const ContentTitle = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
`;
const ContentListSection = styled.section``;
const ContentListWrapper = styled.div`
  border: 1px solid #a3aed0;
  height: 500px;
`;
const AllCheckWapper = styled.div`
  display: flex;
  gap: 10px;
  border-bottom: 1px solid #a3aed0;
  padding: 5px;
`;
const AllCheckTitle = styled.div`
  font-size: 14px;
`;
const Content = styled.div<{ choiced: boolean }>`
  padding-left: 10px;
  font-size: 13px;
  background-color: ${(props) => (props.choiced ? '#a3aed0' : 'white')};
  color: ${(props) => (props.choiced ? 'white' : 'initial')};
  cursor: pointer;
`;
const ContentViewerSection = styled.section``;
const ViewerWrapper = styled.div`
  border: 1px solid #a3aed0;
  height: 500px;
`;
const SaveButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

const StyledActionBtn = styled(Button)`
  && {
    width: 100px;
    height: 30px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;
const StyledSaveBtn = styled(Button)`
  && {
    width: 120px;
    height: 40px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;
