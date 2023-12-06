import React, { useState } from 'react';
import styled from 'styled-components';
import { ListTable } from '../table/ListTable';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { managementTreePopupBoolAtom } from '../../recoil/managementContentAtom';
import { ManagemantTreePopup } from '../../pages/managementPopup/ManagementTreePopup';

import { Button } from '@mui/material';

const ManagementsTree = () => {
  const [choiceValue, setChoiceValue] = useState(1);
  const [isCreate, setIsCreate] = useRecoilState(managementTreePopupBoolAtom);

  const clickHistory = () => {
    setChoiceValue(1);
  };

  return (
    <Style.main>
      <Style.contentHead>
        <Style.tapContainer>
          <Style.tapManu choiced={choiceValue} onClick={clickHistory}>
            히스토리
          </Style.tapManu>
        </Style.tapContainer>
        <Style.btnWrapper>
          <StyledUplodeBtn
            variant="contained"
            onClick={() => setIsCreate(true)}
          >
            문항 정보 트리구조 변경
          </StyledUplodeBtn>
        </Style.btnWrapper>
      </Style.contentHead>
      <Style.contentBox>
        <ListTable />
      </Style.contentBox>
      {isCreate && <ManagemantTreePopup />}
    </Style.main>
  );
};
const Style = {
  main: styled.main`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  contentHead: styled.div`
    width: 1280px;
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  tapContainer: styled.div`
    width: 359px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 10px;
  `,
  tapManu: styled.div<{ choiced: number }>`
    height: 40px;
    border: 1px solid #a3aed0;
    margin-left: 20px;
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
  `,
  btnWrapper: styled.div`
    width: 170px;
    background-color: transparent;
    border: none;

    margin-right: 20px;
  `,
  contentBox: styled.div`
    width: 1280px;
    border-top: 1px solid #a3aed0;
  `,
};

const StyledUplodeBtn = styled(Button)`
  && {
    width: 170px;
    height: 30px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;

export { ManagementsTree };
