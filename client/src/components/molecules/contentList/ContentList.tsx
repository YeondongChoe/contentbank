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
    // const window = windowOpenHandler({
    //   name: 'createcontentmain',
    //   url: '/createcontentmain',
    // });
    const target = window.open('/createcontentmain', '/createcontentmain');
    target?.postMessage({ type: 'BOOL' }, '*');
    // window &&
    //   window.postMessage(
    //     { type: 'BOOL', payload: [], data: false, sendData: 'false' },
    //     '*',
    //   );
  };

  const [checkList, setCheckList] = useState<number[]>([]);

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleAllCheck = () => {
    setIsChecked(!isChecked);
    if (isChecked === false) {
      setCheckList(list.map((item) => item.contentSeq as number));
      setIsEnabled(false);
    } else {
      setCheckList([]);
      setIsEnabled(true);
    }
  };

  useEffect(() => {
    setIsChecked(false);
  }, [page]);

  return (
    <>
      <ButtonWrapper>
        <AllCheckButtonWrapper>
          <CheckBox
            onClick={() => handleAllCheck()}
            isChecked={isChecked}
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
          >
            활성화 / 비활성화
          </Button>
        </ActionButtonWrapper>
      </ButtonWrapper>
      <ContentCardWrapper>
        {list.map((content) => (
          <ContentCard
            key={content.questionCode}
            content={content}
            setIsEnabled={setIsEnabled}
            isEnabled={isEnabled}
            checkList={checkList}
            setCheckList={setCheckList}
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
