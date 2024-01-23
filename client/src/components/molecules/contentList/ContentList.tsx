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
import { COLOR } from '../../constants';

type ContentListProps = {
  list: QuestionTableType[];
  onClick: () => void;
  openPopup: () => void;
};

export function ContentList({ list, onClick, openPopup }: ContentListProps) {
  const page = useRecoilValue(pageAtom);

  const [isEnabled, setIsEnabled] = useState<boolean>(true);

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
            setIsChecked={setIsChecked}
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

const StyledCheckbox = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 2px solid #a0a0a0;
  background-color: white;
  outline: none;
  cursor: pointer;
  position: relative;

  &::before {
    content: '✔';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #4a4a4a;
    display: none;
  }

  &:checked::before {
    display: block;
  }
`;

const Icon = styled.svg`
  fill: none;
  stroke-width: 2px;
`;
