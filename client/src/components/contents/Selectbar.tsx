import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const SelectBar = () => {
  const [didMount, setDidMount] = useState(false);
  let mountCount = 1;

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

  useEffect(() => {
    mountCount++;
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      //console.log('select bar list 불러오는 함수');
    }
  }, [didMount]);

  return (
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
    </S.mainContainer>
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
};

export default SelectBar;
