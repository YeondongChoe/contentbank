import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dummy from './data.json';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ClassificationPopup = () => {
  const ContentList = dummy.ContentInfo;
  const [didMount, setDidMount] = useState(false);
  let mountCount = 1;
  const [selectedCode, setSelectedCode] = useState(null);
  const [code, setCode] = useState({});
  const [classificatecode, setClassificatecode] = useState({});
  const [curriculum, setCurriculum] = useState('');
  const [schoolLevel, setSchoolLevel] = useState('');
  const [schoolYear, setSchoolYear] = useState('');
  const [semester, setSemester] = useState('');

  console.log(code);
  console.log(classificatecode);
  console.log(curriculum);

  // const handleCodeChange = (event: SelectChangeEvent) => {
  //   setCode(event.target.value as string);
  // };

  const handleCurriculumChange = (event: SelectChangeEvent) => {
    setCurriculum(event.target.value as string);
  };

  const handleSchoolLevelChange = (event: SelectChangeEvent) => {
    setSchoolLevel(event.target.value as string);
  };

  const handleCodeClick = (sort: any) => {
    setSelectedCode(sort === selectedCode ? null : sort);
  };

  useEffect(() => {
    mountCount++;
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      console.log('contentListInfo 불러오는 함수');
    }
  }, [didMount, code, classificatecode, setCurriculum]);

  return (
    <S.main>
      <S.wholeContainer>
        <S.contentListContainer>
          <S.containerTitle>문항 선택</S.containerTitle>
          <S.contentList>
            {ContentList.map((el, i) => (
              <S.contentCode
                key={i}
                onClick={() => {
                  handleCodeClick(el.sort);
                  setCode(el.code);
                  setClassificatecode(el.classificatecode);
                  setCurriculum(el.curriculum);
                }}
                choiced={el.sort === selectedCode}
              >
                {el.code}
              </S.contentCode>
            ))}
          </S.contentList>
        </S.contentListContainer>
        <S.contentViewerContainer>
          <S.containerTitle>문항 뷰어</S.containerTitle>
          <S.contentViewer>아이텍솔루션</S.contentViewer>
        </S.contentViewerContainer>
        <S.contentClassificateContainer>
          <S.containerTitle>문항 분류</S.containerTitle>
          <S.contentClassificate>
            <FormControl
              fullWidth
              sx={{ backgroundColor: 'white', height: 40 }}
            >
              <InputLabel size="small" id="문항분류코드">
                문항분류코드
              </InputLabel>
              <Select
                disabled
                labelId="문항분류코드"
                id="select"
                value={code}
                label="문항분류코드"
                sx={{ height: 40 }}
              ></Select>
            </FormControl>
            <FormControl
              fullWidth
              sx={{ backgroundColor: 'white', height: 40 }}
            >
              <InputLabel size="small" id="문항코드">
                문항코드
              </InputLabel>
              <Select
                disabled
                labelId="문항코드"
                id="select"
                value={classificatecode}
                label="문항코드"
                sx={{ height: 40 }}
              ></Select>
            </FormControl>
            <S.contentClassificateMiddle>
              <FormControl
                fullWidth
                sx={{ backgroundColor: 'white', height: 40 }}
              >
                <InputLabel size="small" id="교육과정">
                  교육과정
                </InputLabel>
                <Select
                  labelId="교육과정"
                  id="select"
                  value={curriculum}
                  label="교육과정"
                  onChange={handleCurriculumChange}
                  sx={{ height: 40 }}
                >
                  <MenuItem value={10}>2015</MenuItem>
                  <MenuItem value={20}>2017</MenuItem>
                  <MenuItem value={30}>2020</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                sx={{ backgroundColor: 'white', height: 40 }}
              >
                <InputLabel size="small" id="학교급">
                  학교급
                </InputLabel>
                <Select
                  labelId="학교급"
                  id="select"
                  value={schoolLevel}
                  label="학교급"
                  onChange={handleSchoolLevelChange}
                  sx={{ height: 40 }}
                >
                  <MenuItem value={10}>초등</MenuItem>
                  <MenuItem value={20}>중등</MenuItem>
                  <MenuItem value={30}>고등</MenuItem>
                </Select>
              </FormControl>
            </S.contentClassificateMiddle>
          </S.contentClassificate>
        </S.contentClassificateContainer>
      </S.wholeContainer>
    </S.main>
  );
};

const S = {
  main: styled.div`
    height: 750px;
    border: 1px solid #a3aed0;
    border-top: none;
  `,
  wholeContainer: styled.div`
    height: 750px;
    display: flex;
    flex: 1 0 0;
  `,
  containerTitle: styled.div`
    font-size: 14px;
    padding: 10px;
    border-bottom: 1px solid #a3aed0;
  `,
  contentListContainer: styled.div`
    border-right: 1px solid #a3aed0;
    flex: 1 0 30%;
  `,
  contentList: styled.div`
    padding: 10px;
  `,
  contentCode: styled.div<{ choiced: boolean }>`
    font-size: 13px;
    background-color: ${(props) => (props.choiced ? '#a3aed0' : 'white')};
    color: ${(props) => (props.choiced ? 'white' : 'initial')};
    cursor: pointer;
  `,
  contentViewerContainer: styled.div`
    border-right: 1px solid #a3aed0;
    flex: 1 0 30%;
  `,
  contentViewer: styled.div`
    padding: 10px;
  `,
  contentClassificateContainer: styled.div`
    flex: 1 0 40%;
  `,
  contentClassificate: styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  contentClassificateMiddle: styled.div`
    display: flex;
    flex-grow: 1;
    gap: 10px;
  `,
};

export default ClassificationPopup;
