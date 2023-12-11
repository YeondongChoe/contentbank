import * as React from 'react';
import { useState, useEffect } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styled from 'styled-components';

export function SelectBar() {
  const [didMount, setDidMount] = useState(false);
  let mountCount = 1;

  const [curriculum, setCurriculum] = useState('');
  const [schoolLevel, setSchoolLevel] = useState('');
  const [schoolYear, setSchoolYear] = useState('');
  const [semester, setSemester] = useState('');
  const [unitMajor, setUnitMajor] = useState('');
  const [unitType, setUnitType] = useState('');
  const [serviced, setServiced] = useState('');

  const seletCurriculum = (event: SelectChangeEvent) => {
    setCurriculum(event.target.value as string);
  };

  const seletSchoolLevel = (event: SelectChangeEvent) => {
    setSchoolLevel(event.target.value as string);
  };

  const seletSchoolYear = (event: SelectChangeEvent) => {
    setSchoolYear(event.target.value as string);
  };

  const seletSemester = (event: SelectChangeEvent) => {
    setSemester(event.target.value as string);
  };

  const seletUnitMajor = (event: SelectChangeEvent) => {
    setUnitMajor(event.target.value as string);
  };

  const seletUnitType = (event: SelectChangeEvent) => {
    setUnitType(event.target.value as string);
  };

  const seletServiced = (event: SelectChangeEvent) => {
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
    <Container>
      <SelectWrapper>
        <FormControl sx={{ backgroundColor: 'white', height: 40 }}>
          <InputLabel size="small" id="개정과정">
            개정과정
          </InputLabel>
          <Select
            labelId="개정과정"
            id="select"
            value={curriculum}
            label="개정과정"
            onChange={seletCurriculum}
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
            onChange={seletSchoolLevel}
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
            onChange={seletSchoolYear}
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
            onChange={seletSemester}
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
            onChange={seletUnitMajor}
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
            onChange={seletUnitType}
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
            onChange={seletServiced}
            sx={{ minWidth: 120, height: 40 }}
          >
            <MenuItem value={10}>활성화</MenuItem>
            <MenuItem value={20}>비활성화</MenuItem>
          </Select>
        </FormControl>
      </SelectWrapper>
    </Container>
  );
}

const Container = styled.div`
  margin: 40px 10px 20px 50px;
  display: flex;
  justify-content: space-between;
`;
const SelectWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
