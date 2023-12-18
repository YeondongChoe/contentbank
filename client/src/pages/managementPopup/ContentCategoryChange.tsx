import * as React from 'react';
import { useState, useEffect } from 'react';

import { Button } from '@mui/material';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { Select } from '../../components/atom/select';
import { checkListValueAtom } from '../../state/valueAtom';
import dummy from '../createPopup/data.json';

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

  const category = [
    {
      id: '1',
      label: '개정과정',
      value: '1',
      options: [
        { id: '1', label: '2015학년', value: '1' },
        { id: '2', label: '2018학년', value: '2' },
        { id: '3', label: '2020학년', value: '3' },
      ],
    },
    {
      id: '2',
      label: '학교',
      value: '2',
      options: [
        { id: '1', label: '초등', value: '1' },
        { id: '2', label: '중등', value: '2' },
        { id: '3', label: '고등', value: '3' },
      ],
    },
    {
      id: '3',
      label: '학년',
      value: '3',
      options: [
        { id: '1', label: '초등1', value: '1' },
        { id: '2', label: '초등2', value: '2' },
        { id: '3', label: '중등1', value: '3' },
        { id: '4', label: '중등2', value: '4' },
        { id: '5', label: '고등1', value: '5' },
        { id: '6', label: '고등2', value: '6' },
      ],
    },
    {
      id: '4',
      label: '학기',
      value: '4',
      options: [
        { id: '1', label: '1학기', value: '1' },
        { id: '2', label: '2학기', value: '2' },
      ],
    },
    {
      id: '5',
      label: '대분류',
      value: '5',
      options: [
        {
          id: '1',
          label: '일차부등식 소분류를 연습해봅시다 초등학교 친구들',
          value: '1',
        },
        { id: '2', label: '일차부등식 중분류', value: '2' },
        { id: '3', label: '일차부등식 대분류', value: '3' },
      ],
    },
    {
      id: '6',
      label: '문항타입',
      value: '6',
      options: [
        { id: '1', label: '객관식', value: '1' },
        { id: '2', label: '주관식', value: '2' },
        { id: '3', label: '서술형', value: '3' },
      ],
    },
    {
      id: '7',
      label: '오픈여부',
      value: '7',
      options: [
        { id: '1', label: '활성화', value: '1' },
        { id: '2', label: '비활성화', value: '2' },
      ],
    },
  ];

  const selectCategory = (
    fieldName: string,
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setContent((prevContent) => ({
      ...prevContent,
      [fieldName]: event.target.value,
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

  const selectNewCategory = (
    fieldName: string,
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setChangeContent((prevContent) => ({
      ...prevContent,
      [fieldName]: event.target.value,
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
            {category.map((el) => (
              <Select
                width="120px"
                value={el.value}
                defaultValue={el.label}
                onChange={(e) => selectCategory(el.value, e)}
                key={el.label}
                options={el.options}
              />
            ))}
          </SelectBox>
          <TitleWrapper>
            <SelectTitle>바꿀 문항 분류</SelectTitle>
            <StyledActionBtn variant="contained" onClick={changeCategory}>
              선택 바꾸기
            </StyledActionBtn>
          </TitleWrapper>
          <SelectBox>
            {category.map((el) => (
              <Select
                width="120px"
                height="40px"
                value={el.value}
                defaultValue={el.label}
                onChange={(e) => selectNewCategory(el.value, e)}
                key={el.label}
                options={el.options}
              />
            ))}
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
  gap: 20px;
  padding-top: 20px;
`;
const ContentTitle = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
`;
const ContentListSection = styled.section`
  flex: 1 0 22%;
`;
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
  padding: 0px 10px;
  font-size: 13px;
  background-color: ${(props) => (props.choiced ? '#a3aed0' : 'white')};
  color: ${(props) => (props.choiced ? 'white' : 'initial')};
  cursor: pointer;
`;
const ContentViewerSection = styled.section`
  flex: 1 0 40%;
`;
const ViewerWrapper = styled.div`
  border: 1px solid #a3aed0;
  height: 500px;
`;
const SaveButtonWrapper = styled.div`
  flex: 1 0 5%;
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
