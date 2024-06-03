import * as React from 'react';
import { useState } from 'react';

import { IoMdClose } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { TabMenu } from '../../components';
import { COLOR } from '../../components/constants';
import { pageAtom } from '../../store/utilAtom';

import { ChangeHistory } from './ChangeHistory';
import { ContentCategoryChange } from './ContentCategoryChange';
import { ContentInformationChange } from './ContentInformationChange';

export function ManagementEditMain() {
  const [page, setPage] = useRecoilState(pageAtom);

  const location = useLocation();
  const navigate = useNavigate();
  const menuList = [
    {
      label: '문항 내용 바꾸기',
      value: '문항 내용 바꾸기',
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
  // 탭메뉴 클릭시 페이지네이션 초기화
  const changeTab = () => {
    setPage(1);
  };

  const [tabVeiw, setTabVeiw] = useState<string>('문항 내용 바꾸기');

  const closePopup = () => {
    // setIsOpenPopup(false);
  };
  return (
    <Container>
      <ButtonWrapper>
        <TabMenu
          length={3}
          menu={menuList}
          selected={tabVeiw}
          width={'400px'}
          setTabVeiw={setTabVeiw}
          onClickTab={changeTab}
        />
      </ButtonWrapper>
      {tabVeiw === '문항 내용 바꾸기' && (
        <ContentBox>
          <ContentInformationChange />
        </ContentBox>
      )}
      {tabVeiw === '문항 분류 바꾸기' && (
        <ContentBox>
          <ContentCategoryChange />
        </ContentBox>
      )}
      {tabVeiw === '히스토리' && (
        <ContentBox>
          <ChangeHistory />
        </ContentBox>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -40px;
`;
const ButtonWrapper = styled.div`
  padding: 10px 20px;
`;
const ContentBox = styled.div`
  width: 100%;
  padding: 0 20px;
  min-height: 700px;
  border-top: 1px solid ${COLOR.BORDER_BLUE};
`;
