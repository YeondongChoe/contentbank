import * as React from 'react';
import { useEffect, useState } from 'react';

import Textarea from '@mui/joy/Textarea';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { MathViewer } from '../../components';
import Contents from '../../components/mathViewer/test1.json';
import Contents2 from '../../components/mathViewer/test2.json';
import Contents3 from '../../components/mathViewer/test3.json';
import Contents4 from '../../components/mathViewer/test4.json';

import dummy from './data.json';

export function ClassificationPopup() {
  const ContentList = dummy.ContentInfo;
  const [didMount, setDidMount] = useState(false);
  let mountCount = 1;
  const { control } = useForm();
  const [selectedCode, setSelectedCode] = useState(null);
  const [code, setCode] = useState('');
  const [classificatecode, setClassificatecode] = useState('');
  const [curriculum, setCurriculum] = useState('');
  const [schoolLevel, setSchoolLevel] = useState('');
  const [schoolYear, setSchoolYear] = useState('');
  const [semester, setSemester] = useState('');
  const [subjectTitle, setSubjectTitle] = useState('');
  const [unitSub, setUnitSub] = useState('');
  const [unitMajor, setUnitMajor] = useState('');
  const [unitMiddle, setUnitMiddle] = useState('');
  const [unitSmall, setUnitSmall] = useState('');
  const [unitType, setUnitType] = useState('');
  const [level, setLevel] = useState('');
  const [actionType, setActionType] = useState('');
  const [actionType2, setActionType2] = useState('');

  const selectCurriculumChange = (event: SelectChangeEvent) => {
    setCurriculum(event.target.value as string);
  };

  const selectSchoolLevelChange = (event: SelectChangeEvent) => {
    setSchoolLevel(event.target.value as string);
  };

  const selectSchoolYearChange = (event: SelectChangeEvent) => {
    setSchoolYear(event.target.value as string);
  };

  const selectSemesterChange = (event: SelectChangeEvent) => {
    setSemester(event.target.value as string);
  };

  const selectSubjectTitlChange = (event: SelectChangeEvent) => {
    setSubjectTitle(event.target.value as string);
  };

  const selectUnitSubChange = (event: SelectChangeEvent) => {
    setUnitSub(event.target.value as string);
  };

  const selectUnitMajorChange = (event: SelectChangeEvent) => {
    setUnitMajor(event.target.value as string);
  };

  const selectUnitMiddleChange = (event: SelectChangeEvent) => {
    setUnitMiddle(event.target.value as string);
  };

  const selectUnitSmallChange = (event: SelectChangeEvent) => {
    setUnitSmall(event.target.value as string);
  };

  const selectUnitTypeChange = (event: SelectChangeEvent) => {
    setUnitType(event.target.value as string);
  };

  const selectLevelChange = (event: SelectChangeEvent) => {
    setLevel(event.target.value as string);
  };

  const selectActionTypeChange = (event: SelectChangeEvent) => {
    setActionType(event.target.value as string);
  };

  const selectActionType2Change = (event: SelectChangeEvent) => {
    setActionType2(event.target.value as string);
  };

  const checkSelectedContentCode = (sort: any) => {
    setSelectedCode(sort === selectedCode ? null : sort);
  };

  const selectContentCode = (
    sort: number,
    code: string,
    classificatecode: string,
  ) => {
    checkSelectedContentCode(sort);
    setCode(code);
    setClassificatecode(classificatecode);
    console.log('가지고 있는 Info 뿌려주기');
  };

  const submitSave = async () => {
    console.log('항목의 변화가 없으면 버튼 비활성화');
    console.log('변경된 문항Info Put 요청 APi');
  };

  useEffect(() => {
    mountCount++;
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      console.log('Info를 포함한 contentList gey 요청 API');
    }
  }, [didMount]);

  useEffect(() => {
    if (didMount) {
      // console.log('contentListInfo 불러오는 함수');
    }
  }, [code, classificatecode]);

  return (
    <Container>
      <Wrapper>
        <ContentListWrapper>
          <Title>문항 선택</Title>
          <ContentsList>
            {ContentList.map((el, i) => (
              <Content
                key={i}
                onClick={() => {
                  selectContentCode(el.sort, el.code, el.classificatecode);
                }}
                choiced={el.sort === selectedCode}
              >
                {el.code}
              </Content>
            ))}
          </ContentsList>
        </ContentListWrapper>

        <ContentViewerWrapper>
          <Title>문항 뷰어</Title>
          {/* <ContentViewer>
            <MathViewer data={Contents} />
          </ContentViewer> */}
          {/* <ContentViewer>
            <MathViewer data={Contents2} />
          </ContentViewer> */}
          {/* <ContentViewer>
            <MathViewer data={Contents3} />
          </ContentViewer> */}
          <ContentViewer>
            <MathViewer data={Contents2} />
            <MathViewer data={Contents3} />
            <MathViewer data={Contents4} />
          </ContentViewer>
        </ContentViewerWrapper>

        <ContentClassificationWrapper>
          <form>
            <Title>문항 분류</Title>
            <ContentClassificationForm>
              <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
                <Controller
                  control={control}
                  name="code"
                  render={({ field }) => (
                    <TextField
                      disabled
                      id="code"
                      label="문항분류코드"
                      value={code}
                      size="small"
                      //onChange={field.onChange}
                      //value={field.value}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
                <Controller
                  control={control}
                  name="code"
                  render={({ field }) => (
                    <TextField
                      disabled
                      id="classificatecode"
                      label="문항코드"
                      value={classificatecode}
                      size="small"
                      //onChange={field.onChange}
                      //value={field.value}
                    />
                  )}
                />
              </FormControl>
              <ContentClassificationGroup>
                <FormControl fullWidth sx={{ height: 40 }}>
                  <InputLabel size="small" id="curriculum">
                    교육과정
                  </InputLabel>
                  <Select
                    labelId="curriculum"
                    id="select"
                    value={curriculum}
                    label="curriculum"
                    onChange={selectCurriculumChange}
                    sx={{ height: 40 }}
                  >
                    <MenuItem value={10}>2015</MenuItem>
                    <MenuItem value={20}>2017</MenuItem>
                    <MenuItem value={30}>2020</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ height: 40 }}>
                  <InputLabel size="small" id="schoolLevel">
                    학교급
                  </InputLabel>
                  <Select
                    labelId="schoolLevel"
                    id="select"
                    value={schoolLevel}
                    label="schoolLevel"
                    onChange={selectSchoolLevelChange}
                    sx={{ height: 40 }}
                  >
                    <MenuItem value={10}>초등</MenuItem>
                    <MenuItem value={20}>중등</MenuItem>
                    <MenuItem value={30}>고등</MenuItem>
                  </Select>
                </FormControl>
              </ContentClassificationGroup>
              <ContentClassificationGroup>
                <FormControl fullWidth sx={{ height: 40 }}>
                  <InputLabel size="small" id="schoolYear">
                    학년
                  </InputLabel>
                  <Select
                    labelId="schoolYear"
                    id="select"
                    value={schoolYear}
                    label="schoolYear"
                    onChange={selectSchoolYearChange}
                    sx={{ height: 40 }}
                  >
                    <MenuItem value={10}>중등1</MenuItem>
                    <MenuItem value={20}>중등2</MenuItem>
                    <MenuItem value={30}>중등3</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ height: 40 }}>
                  <InputLabel size="small" id="semester">
                    학기
                  </InputLabel>
                  <Select
                    labelId="semester"
                    id="select"
                    value={semester}
                    label="semester"
                    onChange={selectSemesterChange}
                    sx={{ height: 40 }}
                  >
                    <MenuItem value={10}>1학기</MenuItem>
                    <MenuItem value={20}>2학기</MenuItem>
                  </Select>
                </FormControl>
              </ContentClassificationGroup>
              <ContentClassificationGroup>
                <FormControl fullWidth sx={{ height: 40 }}>
                  <InputLabel size="small" id="subjectTitle">
                    교과
                  </InputLabel>
                  <Select
                    labelId="subjectTitle"
                    id="select"
                    value={subjectTitle}
                    label="subjectTitle"
                    onChange={selectSubjectTitlChange}
                    sx={{ height: 40 }}
                  >
                    <MenuItem value={10}>수학1</MenuItem>
                    <MenuItem value={20}>수학2</MenuItem>
                    <MenuItem value={30}>수학3</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ height: 40 }}>
                  <InputLabel size="small" id="unitSub">
                    과목
                  </InputLabel>
                  <Select
                    labelId="unitSub"
                    id="select"
                    value={unitSub}
                    label="unitSub"
                    onChange={selectUnitSubChange}
                    sx={{ height: 40 }}
                  >
                    <MenuItem value={10}>교과수학1</MenuItem>
                    <MenuItem value={20}>교과수학2</MenuItem>
                  </Select>
                </FormControl>
              </ContentClassificationGroup>
              <FormControl fullWidth sx={{ height: 40 }}>
                <InputLabel size="small" id="unitMajor">
                  대단원
                </InputLabel>
                <Select
                  labelId="unitMajor"
                  id="select"
                  value={unitMajor}
                  label="unitMajor"
                  onChange={selectUnitMajorChange}
                  sx={{
                    height: 40,
                    maxWidth: 550,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <MenuItem value={10}>03 일차부등식 소분류</MenuItem>
                  <MenuItem value={20}>03 일차부등식 증분류</MenuItem>
                  <MenuItem value={30}>03 일차부등식 대분류</MenuItem>
                  <MenuItem value={40}>03 일차부등식 또분류</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ height: 40 }}>
                <InputLabel size="small" id="unitMiddle">
                  중단원
                </InputLabel>
                <Select
                  labelId="unitMiddle"
                  id="select"
                  value={unitMiddle}
                  label="unitMiddle"
                  onChange={selectUnitMiddleChange}
                  sx={{
                    height: 40,
                    maxWidth: 550,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <MenuItem value={10}>계수가 소수 1차 부등식</MenuItem>
                  <MenuItem value={20}>계수가 소수 2차 부등식</MenuItem>
                  <MenuItem value={30}>계수가 소수 3차 부등식</MenuItem>
                  <MenuItem value={40}>계수가 소수 n차 부등식</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ height: 40 }}>
                <InputLabel size="small" id="unitSmall">
                  소단원
                </InputLabel>
                <Select
                  labelId="unitSmall"
                  id="select"
                  value={unitSmall}
                  label="unitSmall"
                  onChange={selectUnitSmallChange}
                  sx={{
                    height: 40,
                    maxWidth: 550,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <MenuItem value={10}>
                    계수가 소수인 경우-일차부등식의 어쩌구저쭈구블라블라
                  </MenuItem>
                  <MenuItem value={20}>
                    계수가 소수인 경우-일차부등식의 어쩌구저쭈구블라블라
                  </MenuItem>
                  <MenuItem value={30}>
                    계수가 소수인 경우-일차부등식의
                    어쩌구저쭈구블라블라블르브라바라바
                  </MenuItem>
                </Select>
              </FormControl>
            </ContentClassificationForm>
            <ContentClassificationForm>
              <ContentClassificationGroup>
                <FormControl fullWidth sx={{ height: 40 }}>
                  <InputLabel size="small" id="unitType">
                    문제유형
                  </InputLabel>
                  <Select
                    labelId="unitType"
                    id="select"
                    value={unitType}
                    label="unitType"
                    onChange={selectUnitTypeChange}
                    sx={{ height: 40 }}
                  >
                    <MenuItem value={10}>객관식</MenuItem>
                    <MenuItem value={20}>주관식</MenuItem>
                    <MenuItem value={30}>서술형</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ height: 40 }}>
                  <InputLabel size="small" id="level">
                    난이도
                  </InputLabel>
                  <Select
                    labelId="level"
                    id="select"
                    value={level}
                    label="level"
                    onChange={selectLevelChange}
                    sx={{ height: 40 }}
                  >
                    <MenuItem value={10}>초등</MenuItem>
                    <MenuItem value={20}>중등</MenuItem>
                    <MenuItem value={30}>고등</MenuItem>
                  </Select>
                </FormControl>
              </ContentClassificationGroup>
              <ContentClassificationGroup>
                <FormControl fullWidth sx={{ height: 40 }}>
                  <InputLabel size="small" id="actionType">
                    행동영역
                  </InputLabel>
                  <Select
                    labelId="actionType"
                    id="select"
                    value={actionType}
                    label="actionType"
                    onChange={selectActionTypeChange}
                    sx={{ height: 40 }}
                  >
                    <MenuItem value={10}>중등1</MenuItem>
                    <MenuItem value={20}>중등2</MenuItem>
                    <MenuItem value={30}>중등3</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ height: 40 }}>
                  <InputLabel size="small" id="actionType2">
                    행동영역2
                  </InputLabel>
                  <Select
                    labelId="actionType2"
                    id="select"
                    value={actionType2}
                    label="actionType2"
                    onChange={selectActionType2Change}
                    sx={{ height: 40 }}
                  >
                    <MenuItem value={10}>1학기</MenuItem>
                    <MenuItem value={20}>2학기</MenuItem>
                  </Select>
                </FormControl>
              </ContentClassificationGroup>
            </ContentClassificationForm>
            <ButtonWrapper>
              <StyleSaveBtn
                variant="contained"
                onClick={() => {
                  submitSave();
                }}
              >
                저장
              </StyleSaveBtn>
            </ButtonWrapper>
          </form>
        </ContentClassificationWrapper>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  max-width: 80%;
  min-width: 800px;
  border: 1px solid #a3aed0;
  border-top: none;
`;
const Wrapper = styled.div`
  display: flex;
`;
const Title = styled.div`
  font-size: 14px;
  padding: 10px;
  border-bottom: 1px solid #a3aed0;
`;
const ContentListWrapper = styled.div`
  border-right: 1px solid #a3aed0;
  flex: 1 0 30%;
`;
const ContentsList = styled.div`
  padding: 10px;
`;
const Content = styled.div<{ choiced: boolean }>`
  font-size: 13px;
  background-color: ${(props) => (props.choiced ? '#a3aed0' : 'white')};
  color: ${(props) => (props.choiced ? 'white' : 'initial')};
  cursor: pointer;
`;
const ContentViewerWrapper = styled.div`
  border-right: 1px solid #a3aed0;
  flex: 1 0 30%;
`;
const ContentViewer = styled.div`
  padding: 10px;
`;
const ContentClassificationWrapper = styled.div`
  flex: 1 0 40%;
`;
const ContentClassificationForm = styled.div`
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid #a3aed0;
`;
const ContentClassificationGroup = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 10px;
`;
const ButtonWrapper = styled.div`
  height: 40px;
  padding: 15px 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const StyleSaveBtn = styled(Button)`
  && {
    width: 100px;
    height: 30px;
    border-radius: 10px;
    font-size: 14px;
    line-height: normal;
  }
`;
