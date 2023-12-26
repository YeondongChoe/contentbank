import * as React from 'react';
import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { IndexInfo, TabMenu } from '../../components';
import { managementContentPopupBoolAtom } from '../../state/managementContentAtom';

import { ContentCategoryChange } from './ContentCategoryChange';
import { ContentInformationChange } from './ContentInformationChange';

export function ManagemantMainPopup() {
  const menuList = [
    {
      label: '바꾸기',
      value: '바꾸기',
    },
    {
      label: '문항 분류 바꾸기',
      value: '문항 분류 바꾸기',
    },
  ];
  const [tabVeiw, setTabVeiw] = useState<string>('바꾸기');

  const [isCreate, setIsCreate] = useRecoilState(
    managementContentPopupBoolAtom,
  );

  const closePopup = () => {
    setIsCreate(false);
  };
  return (
    <Overlay>
      <Container>
        <IndexInfo list={['콘텐츠 관리', '상세검색', `${tabVeiw}`]} />
        <TapWrapper>
          <TabMenu
            length={2}
            menu={menuList}
            initialValue={'바꾸기'}
            width={'250px'}
            setTabVeiw={setTabVeiw}
          />
          <CloseButtonWrapper>
            <CloseIcon onClick={closePopup} sx={{ cursor: 'pointer' }} />
          </CloseButtonWrapper>
        </TapWrapper>
        {tabVeiw === '바꾸기' && (
          <ContentBox>
            <ContentInformationChange />
          </ContentBox>
        )}
        {tabVeiw === '문항 분류 바꾸기' && (
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
  padding: 10px 0px;
  border: 1px solid #a3aed0;
  background-color: white;
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
const ContentBox = styled.div`
  height: 650px;
`;
