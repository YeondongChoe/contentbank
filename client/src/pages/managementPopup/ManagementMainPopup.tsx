import * as React from 'react';
import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { managementContentPopupBoolAtom } from '../../state/managementContentAtom';

import { ContentCategoryChange } from './ContentCategoryChange';
import { ContentInformationChange } from './ContentInformationChange';

export function ManagemantMainPopup() {
  const [isCreate, setIsCreate] = useRecoilState(
    managementContentPopupBoolAtom,
  );
  const [choiceValue, setChoiceValue] = useState(1);

  const closePopup = () => {
    setIsCreate(false);
  };

  const moveContentInformationChange = () => {
    setChoiceValue(1);
  };

  const moveContentCategoryChange = () => {
    setChoiceValue(2);
  };
  return (
    <Overlay>
      <Container>
        <TapWrapper>
          <TapMenuWrapper>
            <TapManu
              choiced={choiceValue}
              onClick={moveContentInformationChange}
            >
              바꾸기
            </TapManu>
            <TapManu choiced={choiceValue} onClick={moveContentCategoryChange}>
              문항 분류 바꾸기
            </TapManu>
          </TapMenuWrapper>
          <CloseButtonWrapper>
            <CloseIcon onClick={closePopup} sx={{ cursor: 'pointer' }} />
          </CloseButtonWrapper>
        </TapWrapper>
        {choiceValue === 1 && (
          <ContentBox>
            <ContentInformationChange />
          </ContentBox>
        )}
        {choiceValue === 2 && (
          <ContentBox>
            <ContentCategoryChange />
          </ContentBox>
        )}
      </Container>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
const Container = styled.div`
  max-width: 1024px;
  width: 100%;
  min-width: 800px;
  padding: 20px;
  border: 1px solid #a3aed0;
  background-color: white;
`;
const TapWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #a3aed0;
  justify-content: space-between;
`;
const TapMenuWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const TapManu = styled.div<{ choiced: number }>`
  width: 200px;
  height: 40px;
  border: 1px solid #a3aed0;
  border-bottom: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:first-child {
    background-color: ${(props) =>
      props.choiced === 1 ? 'rgba(0, 0, 0, 0.3)' : 'white'};
    color: ${(props) => (props.choiced === 1 ? 'white' : 'initial')};
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
  }
  &:nth-child(2) {
    background-color: ${(props) =>
      props.choiced === 2 ? 'rgba(0, 0, 0, 0.3)' : 'white'};
    color: ${(props) => (props.choiced === 2 ? 'white' : 'initial')};
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
  }
`;
const CloseButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const ContentBox = styled.div`
  height: 650px;
`;
