import * as React from 'react';
import { useState } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { Button } from '../../components/atom';
import { COLOR } from '../../components/contents/COLOR';
import { ManagemantTreePopup } from '../../pages/managementPopup/ManagementTreePopup';
import { managementTreePopupBoolAtom } from '../../state/managementContentAtom';
import { ListTable } from '../tableWrap/ListTable';

export function ManagementsTree() {
  const [choiceValue, setChoiceValue] = useState(1);
  const [isCreate, setIsCreate] = useRecoilState(managementTreePopupBoolAtom);

  const clickHistory = () => {
    setChoiceValue(1);
  };

  return (
    <Container>
      <HeadWrapper>
        <TapWrapper>
          <TapMenu choiced={choiceValue} onClick={clickHistory}>
            히스토리
          </TapMenu>
        </TapWrapper>
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
      <TableWrapper>
        <ListTable />
      </TableWrapper>
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
  padding: 40px 10px 0px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TapWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;

const TapMenu = styled.div<{ choiced: number }>`
  height: 40px;
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-bottom: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:first-child {
    background-color: ${(props) =>
      props.choiced === 1 ? 'rgba(0, 0, 0, 0.3)' : 'white'};
    color: ${(props) => (props.choiced === 1 ? 'white' : 'initial')};
    width: ${(props) => (props.choiced === 1 ? '250px' : '150px')};
    height: ${(props) => (props.choiced === 2 ? '30px' : '40px')};
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
  }
`;

const TableWrapper = styled.div`
  border-top: 1px solid ${COLOR.BORDER_BLUE};
`;
