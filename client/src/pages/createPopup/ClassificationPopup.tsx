import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dummy from './data.json';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import MathJaxComponent from '../../components/mathViewer/MathViewer';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/material/Button';

const ClassificationPopup = () => {
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

  const handleCodeClick = (sort: any) => {
    setSelectedCode(sort === selectedCode ? null : sort);
  };

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

  const handleSubjectTitlChange = (event: SelectChangeEvent) => {
    setSubjectTitle(event.target.value as string);
  };

  const handleUnitSubChange = (event: SelectChangeEvent) => {
    setUnitSub(event.target.value as string);
  };

  const handleUnitMajorChange = (event: SelectChangeEvent) => {
    setUnitMajor(event.target.value as string);
  };

  const handleUnitMiddleChange = (event: SelectChangeEvent) => {
    setUnitMiddle(event.target.value as string);
  };

  const handleUnitSmallChange = (event: SelectChangeEvent) => {
    setUnitSmall(event.target.value as string);
  };

  const handleUnitTypeChange = (event: SelectChangeEvent) => {
    setUnitType(event.target.value as string);
  };

  const handleLevelChange = (event: SelectChangeEvent) => {
    setLevel(event.target.value as string);
  };

  const handleActionTypeChange = (event: SelectChangeEvent) => {
    setActionType(event.target.value as string);
  };

  const handleActionType2Change = (event: SelectChangeEvent) => {
    setActionType2(event.target.value as string);
  };

  const onSubmit = async () => {
    console.log('저장 API ');
  };

  useEffect(() => {
    mountCount++;
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      console.log('contentListInfo 불러오는 함수');
    }
  }, [didMount, code, classificatecode]);

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
          <S.contentViewer>
            <MathJaxComponent />
          </S.contentViewer>
        </S.contentViewerContainer>

        <S.contentClassificateContainer>
          <form>
            <S.containerTitle>문항 분류</S.containerTitle>
            <S.contentClassificate>
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
              <S.contentClassificateMiddle>
                <FormControl fullWidth sx={{ height: 40 }}>
                  <InputLabel size="small" id="curriculum">
                    교육과정
                  </InputLabel>
                  <Select
                    labelId="curriculum"
                    id="select"
                    value={curriculum}
                    label="curriculum"
                    onChange={handleCurriculumChange}
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
                    onChange={handleSchoolLevelChange}
                    sx={{ height: 40 }}
                  >
                    <MenuItem value={10}>초등</MenuItem>
                    <MenuItem value={20}>중등</MenuItem>
                    <MenuItem value={30}>고등</MenuItem>
                  </Select>
                </FormControl>
              </S.contentClassificateMiddle>
              <S.contentClassificateMiddle>
                <FormControl fullWidth sx={{ height: 40 }}>
                  <InputLabel size="small" id="schoolYear">
                    학년
                  </InputLabel>
                  <Select
                    labelId="schoolYear"
                    id="select"
                    value={schoolYear}
                    label="schoolYear"
                    onChange={handleSchoolYearChange}
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
                    onChange={handleSemesterChange}
                    sx={{ height: 40 }}
                  >
                    <MenuItem value={10}>1학기</MenuItem>
                    <MenuItem value={20}>2학기</MenuItem>
                  </Select>
                </FormControl>
              </S.contentClassificateMiddle>
              <S.contentClassificateMiddle>
                <FormControl fullWidth sx={{ height: 40 }}>
                  <InputLabel size="small" id="subjectTitle">
                    교과
                  </InputLabel>
                  <Select
                    labelId="subjectTitle"
                    id="select"
                    value={subjectTitle}
                    label="subjectTitle"
                    onChange={handleSubjectTitlChange}
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
                    onChange={handleUnitSubChange}
                    sx={{ height: 40 }}
                  >
                    <MenuItem value={10}>교과수학1</MenuItem>
                    <MenuItem value={20}>교과수학2</MenuItem>
                  </Select>
                </FormControl>
              </S.contentClassificateMiddle>
              <FormControl fullWidth sx={{ height: 40 }}>
                <InputLabel size="small" id="unitMajor">
                  대단원
                </InputLabel>
                <Select
                  labelId="unitMajor"
                  id="select"
                  value={unitMajor}
                  label="unitMajor"
                  onChange={handleUnitMajorChange}
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
                  onChange={handleUnitMiddleChange}
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
                  onChange={handleUnitSmallChange}
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
            </S.contentClassificate>
            <S.contentClassificate>
              <S.contentClassificateMiddle>
                <FormControl fullWidth sx={{ height: 40 }}>
                  <InputLabel size="small" id="unitType">
                    문제유형
                  </InputLabel>
                  <Select
                    labelId="unitType"
                    id="select"
                    value={unitType}
                    label="unitType"
                    onChange={handleUnitTypeChange}
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
                    onChange={handleLevelChange}
                    sx={{ height: 40 }}
                  >
                    <MenuItem value={10}>초등</MenuItem>
                    <MenuItem value={20}>중등</MenuItem>
                    <MenuItem value={30}>고등</MenuItem>
                  </Select>
                </FormControl>
              </S.contentClassificateMiddle>
              <S.contentClassificateMiddle>
                <FormControl fullWidth sx={{ height: 40 }}>
                  <InputLabel size="small" id="actionType">
                    행동영역
                  </InputLabel>
                  <Select
                    labelId="actionType"
                    id="select"
                    value={actionType}
                    label="actionType"
                    onChange={handleActionTypeChange}
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
                    onChange={handleActionType2Change}
                    sx={{ height: 40 }}
                  >
                    <MenuItem value={10}>1학기</MenuItem>
                    <MenuItem value={20}>2학기</MenuItem>
                  </Select>
                </FormControl>
              </S.contentClassificateMiddle>
              <InputLabel htmlFor="component-simple">정답</InputLabel>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="answer"
                  defaultValue=""
                  render={({ field }) => (
                    <Textarea
                      sx={{ fontSize: '16px' }}
                      placeholder=""
                      size="sm"
                      minRows={3}
                      maxRows={3}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  )}
                />
              </FormControl>
            </S.contentClassificate>
            <S.btnWarpper>
              <StyleSaveBtn
                variant="contained"
                onClick={() => {
                  onSubmit();
                }}
              >
                저장
              </StyleSaveBtn>
            </S.btnWarpper>
          </form>
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
    //flex: 1 0 0;
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
    width: 100%;
    padding: 10px;
  `,
  contentClassificateContainer: styled.div`
    flex: 1 0 40%;
  `,
  contentClassificate: styled.div`
    padding: 15px 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-bottom: 1px solid #a3aed0;
  `,
  contentClassificateMiddle: styled.div`
    display: flex;
    flex-grow: 1;
    gap: 10px;
  `,
  btnWarpper: styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  `,
};

const StyleSaveBtn = styled(Button)`
  && {
    width: 100px;
    height: 30px;
    border-radius: 10px;
    font-size: 14px;
    line-height: normal;
    margin-right: 10px;
  }
`;

export default ClassificationPopup;
