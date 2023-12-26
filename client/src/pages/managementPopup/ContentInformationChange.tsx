import * as React from 'react';
import { useState, useEffect } from 'react';

import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { Button, MathViewer } from '../../components';
import { Select } from '../../components/atom/select';
import Contents2 from '../../components/mathViewer/test2.json';
import { checkListValueAtom } from '../../state/valueAtom';
import dummy from '../createPopup/data.json';

export function ContentInformationChange() {
  const Category = dummy.Category;
  const ContentList = dummy.ContentInfo;

  const [didMount, setDidMount] = useState(false);
  let mountCount = 1;

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

  const [content, setContent] = useState<string[]>([]);

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);
  };
  const checkSelectedContentCode = (sort: any) => {
    setSelectedCode(sort === selectedCode ? null : sort);
  };
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

  const submitSave = () => {
    console.log('변경된 콘텐츠 문항 put API');
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
      //console.log('select bar list 불러오는 함수');
    }
  }, [didMount]);

  return (
    <Container>
      <SelectBox>
        {Category.map((el) => (
          <Select
            width="130px"
            defaultValue={el.label}
            key={el.label}
            options={el.options}
            onSelect={(event) => selectCategoryOption(event)}
          />
        ))}
      </SelectBox>
      <ButtonGroup>
        <Button
          buttonType="button"
          //onClick={changeCategory}
          height="40px"
          $padding="10px"
          width={'100px'}
          fontSize="12px"
          $border
        >
          <span>찾기</span>
        </Button>
        <Button
          buttonType="button"
          //onClick={changeCategory}
          height="40px"
          $padding="10px"
          width={'100px'}
          fontSize="12px"
        >
          <span>선택 바꾸기</span>
        </Button>
      </ButtonGroup>
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
          <ContentTitle>문항 뷰어: {classificatecode}</ContentTitle>
          <ViewerWrapper>아이프레임으로 아이텍솔루션 편집기 삽입</ViewerWrapper>
        </ContentViewerSection>
        <SaveButtonWrapper>
          <Button
            buttonType="button"
            onClick={submitSave}
            height={'40px'}
            width={'120px'}
            fontSize="12px"
            $border
          >
            <span>변경 내용 저장</span>
          </Button>
        </SaveButtonWrapper>
      </ContentWrapper>
    </Container>
  );
}
const Container = styled.div``;
const SelectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding-top: 20px;
`;
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  align-items: center;
`;
const ContentBox = styled.div`
  padding-top: 20px;
`;
const ContentWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
`;
const ContentTitle = styled.div`
  margin-bottom: 5px;
`;
const ContentListSection = styled.section`
  flex: 1 0 30%;
`;
const ContentListWrapper = styled.div`
  border: 1px solid #a3aed0;
  height: 400px;
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
  height: 400px;
  padding: 10px;
`;
const SaveButtonWrapper = styled.div`
  flex: 1 0 0;
  display: flex;
  align-items: flex-end;
`;
