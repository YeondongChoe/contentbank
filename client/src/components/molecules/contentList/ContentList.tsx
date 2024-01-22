import * as React from 'react';
import { useState } from 'react';

import { styled } from 'styled-components';

import {
  Button,
  DropDown,
  ContentCard,
  DropDownItemProps,
} from '../../../components';
import { QuestionTableType } from '../../../types';
import { COLOR } from '../../constants';

type ContentListProps = {
  list: QuestionTableType[];
  onClick: () => void;
  openPopup: () => void;
};

export function ContentList({ list, onClick, openPopup }: ContentListProps) {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  //console.log(isEnabled);

  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const dropDownList: DropDownItemProps[] = [
    {
      key: 'ListTabl/수정',
      title: '수정',
      onClick: () => {
        openPopup();
        setShowDropDown(false);
      },
    },
    {
      key: 'ListTable/DropDownList복제 후 수정',
      title: '복제 후 수정',
      onClick: () => {
        openPopup();
        setShowDropDown(false);
      },
    },
  ];

  const [isAllchecked, setIsAllChecked] = useState<boolean>(false);

  const [checkList, setCheckList] = useState<number[]>([]);

  const handleAllCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckList(list.map((item) => item.seq as number));
      setIsEnabled(false);
    } else {
      setCheckList([]);
      setIsEnabled(true);
    }
  };
  return (
    <>
      <ButtonWrapper>
        <AllCheckButtonWrapper>
          <div>
            <input type="checkbox" onChange={(e) => handleAllCheck(e)}></input>
          </div>
          전체선택
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
            $border
            $borderRadius="7px"
            onClick={onClick}
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
  cursor: pointer;
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
