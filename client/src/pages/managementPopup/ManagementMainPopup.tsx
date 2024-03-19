import * as React from 'react';
import { useState } from 'react';

import { IoMdClose } from 'react-icons/io';
import styled from 'styled-components';

import { IndexInfo, TabMenu } from '../../components';

import { ContentCategoryChange } from './ContentCategoryChange';
import { ContentInformationChange } from './ContentInformationChange';

type ManagemantMainPopupProps = {
  setIsOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ManagemantMainPopup({
  setIsOpenPopup,
}: ManagemantMainPopupProps) {
  const menuList = [
    {
      label: '바꾸기',
      value: '바꾸기',
    },
    {
      label: '문항 분류 바꾸기',
      value: '문항 분류 바꾸기',
    },
    {
      label: '히스토리',
      value: '히스토리',
    },
  ];
  const [tabVeiw, setTabVeiw] = useState<string>('바꾸기');

  const closePopup = () => {
    setIsOpenPopup(false);
  };
  return (
    <Container>
      <IndexInfo list={['콘텐츠 관리', '상세검색', `${tabVeiw}`]} />
      <TapWrapper>
        <TabMenu
          length={2}
          menu={menuList}
          selected={tabVeiw}
          width={'250px'}
          setTabVeiw={setTabVeiw}
        />
        <CloseButtonWrapper>
          <IoMdClose
            onClick={closePopup}
            style={{ fontSize: '22px', cursor: 'pointer' }}
          />
        </CloseButtonWrapper>
      </TapWrapper>
      {tabVeiw === '바꾸기' && <ContentInformationChange />}
      {tabVeiw === '문항 분류 바꾸기' && <ContentCategoryChange />}
      {tabVeiw === '히스토리' && <></>}
    </Container>
  );
}

const Container = styled.div`
  max-width: 1024px;
  width: 100%;
  min-width: 800px;
  padding: 10px 0px;
  border: 1px solid #a3aed0;
  background-color: white;
  border-radius: 5px;
`;
const TapWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #a3aed0;
  justify-content: space-between;
`;
const CloseButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: 10px;
`;
