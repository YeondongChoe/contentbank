import * as React from 'react';
import { useState, useEffect } from 'react';

import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import {
  Button,
  DropDown,
  ContentCard,
  DropDownItemProps,
  CheckBox,
} from '../../../components';
import { pageAtom } from '../../../store/utilAtom';
import { QuestionTableType } from '../../../types';
import { windowOpenHandler } from '../../../utils/windowHandler';

type ContentListProps = {
  list: QuestionTableType[];
  onClick: () => void;
};

export function ContentList({ list, onClick }: ContentListProps) {
  const page = useRecoilValue(pageAtom);

  const [isEnabled, setIsEnabled] = useState<boolean>(true);

  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const dropDownList: DropDownItemProps[] = [
    {
      key: 'ListTabl/수정',
      title: '수정',
      onClick: () => {
        openCreateEditWindow();
        setShowDropDown(false);
      },
    },
    {
      key: 'ListTable/DropDownList복제 후 수정',
      title: '복제 후 수정',
      onClick: () => {
        openCreateEditWindow();
        setShowDropDown(false);
      },
    },
  ];

  // 문항 수정 윈도우 열기
  const openCreateEditWindow = () => {
    saveLocalData();
    windowOpenHandler({
      name: 'createcontentmain',
      url: '/createcontentmain',
    });
  };

  // 로컬스토리지에 보낼데이터 저장
  const saveLocalData = () => {
    const sendData = { data: false };
    localStorage.setItem('sendData', JSON.stringify(sendData));

    //새로운 리스트 데이터 조회
    // window.parentCallback = () => {
    //   getContents();
    // };
  };

  const [checkList, setCheckList] = useState<number[]>([]);

  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  //console.log(isAllChecked);

  const handleAllCheck = () => {
    setIsAllChecked((prev) => !prev);
    if (isAllChecked === false) {
      setCheckList(list.map((item) => item.contentSeq as number));
      setIsEnabled(false);
    } else {
      setCheckList([]);
      setIsEnabled(true);
    }
  };

  //checkList와 List의 일치 여부를 확인
  //배열의 순서와 상관없이 length가 일치할때 value 값을 비교하여 같으면 true
  const isArraysEqual = (arr1: any[], arr2: any[]): boolean => {
    const sortedArr1 = [...arr1].sort();
    const sortedArr2 = [...arr2].sort();

    return (
      sortedArr1.length === sortedArr2.length &&
      sortedArr1.every((value, index) => value === sortedArr2[index])
    );
  };

  useEffect(() => {
    if (checkList.length !== 0 && list.length !== 0) {
      setIsAllChecked(
        isArraysEqual(
          checkList,
          list.map((item) => item.contentSeq),
        ),
      );
    }
  }, [checkList, list]);

  useEffect(() => {
    setIsAllChecked(false);
  }, [page]);

  //체크된 문항 초기화
  const [ignoreChecked, setIgnoreChecked] = useState(false);

  // 최초 페이지 랜더링 했을 때 handleClickOutside함수를 등록
  // outside에 해당하는 부분을 클릭했을 때 함수가 실행됨
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetElement = event.target as HTMLElement;
      const isOutside = !targetElement.closest('.inside');

      if (isOutside) {
        setIgnoreChecked(true);
        setIsAllChecked(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setCheckList([]);
    setIgnoreChecked(false);
  }, [ignoreChecked === true, setIgnoreChecked]);

  return (
    <>
      <ButtonWrapper className="inside">
        <AllCheckButtonWrapper>
          <CheckBox
            onClick={() => handleAllCheck()}
            isChecked={isAllChecked}
          ></CheckBox>
          <div>전체선택</div>
        </AllCheckButtonWrapper>
        <ActionButtonWrapper>
          <DropDown
            list={dropDownList}
            buttonText={'수정'}
            showDropDown={showDropDown}
            setShowDropDown={setShowDropDown}
            disabled={isEnabled}
          ></DropDown>
          <Button
            width="140px"
            height="35px"
            fontSize="14px"
            $borderRadius="7px"
            onClick={onClick}
            $filled
            disabled={isEnabled}
            cursor
          >
            활성화 / 비활성화
          </Button>
        </ActionButtonWrapper>
      </ButtonWrapper>
      <ContentCardWrapper className="inside">
        {list.map((content) => (
          <ContentCard
            key={content.questionCode}
            content={content}
            setIsEnabled={setIsEnabled}
            isEnabled={isEnabled}
            checkList={checkList}
            setCheckList={setCheckList}
            ignoreChecked={ignoreChecked}
            setIgnoreChecked={setIgnoreChecked}
          ></ContentCard>
        ))}
      </ContentCardWrapper>
    </>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
`;
const AllCheckButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  gap: 10px;
`;
const ActionButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
`;
const ContentCardWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 30px;
`;
