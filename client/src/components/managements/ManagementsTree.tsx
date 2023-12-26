import * as React from 'react';
import { useState } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { TabMenu, IndexInfo } from '../../components';
import { Button } from '../../components/atom';
import { COLOR } from '../../components/constants';
import { ManagemantTreePopup } from '../../pages/managementPopup/ManagementTreePopup';
import { managementTreePopupBoolAtom } from '../../state/managementContentAtom';

export function ManagementsTree() {
  const menuList = [
    {
      label: '히스토리',
      value: '히스토리',
    },
  ];
  const [tabVeiw, setTabVeiw] = useState<string>('히스토리');

  const [isCreate, setIsCreate] = useRecoilState(managementTreePopupBoolAtom);

  return (
    <Container>
      <IndexInfo list={['콘텐츠 관리', '문항 트리 구조', `${tabVeiw}`]} />

      <HeadWrapper>
        <TabMenu
          length={1}
          menu={menuList}
          initialValue={'히스토리'}
          width={'125px'}
          setTabVeiw={setTabVeiw}
        />
        <Button
          buttonType="button"
          onClick={() => setIsCreate(true)}
          $padding="10px"
          height={'35px'}
          width={'170px'}
          fontSize="12px"
        >
          <span>문항 정보 트리구조 변경</span>
        </Button>
      </HeadWrapper>
      <TableWrapper>{/* <WorksheetTable /> */}</TableWrapper>
      {isCreate && <ManagemantTreePopup />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const HeadWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TableWrapper = styled.div`
  width: 1024px;
  min-width: 800px;
  border-top: 1px solid ${COLOR.BORDER_BLUE};
`;
