import React, { useState } from 'react';
import styled from 'styled-components';
import ListTable from '../table/ListTable';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ManagementTreePopupState } from '../../recoil/ManagementContentState';
import ManagemantTreePopup from '../../pages/managementPopup/ManagementTreePopup';

import { Button } from '@mui/material';

const ManagementsTree = () => {
  const [choiceValue, setChoiceValue] = useState(1);
  const [isCreate, setIsCreate] = useRecoilState(ManagementTreePopupState);

  const handleClickList = () => {
    setChoiceValue(1);
  };

  return (
    <S.main>
      <S.contentHead>
        <S.tapContainer>
          <S.tapManu choiced={choiceValue} onClick={handleClickList}>
            히스토리
          </S.tapManu>
        </S.tapContainer>
        <S.btnWrapper>
          <StyledUplodeBtn
            variant="contained"
            onClick={() => setIsCreate(true)}
          >
            문항 정보 트리구조 변경
          </StyledUplodeBtn>
        </S.btnWrapper>
      </S.contentHead>
      <S.contentBox>
        <ListTable />
      </S.contentBox>
      {isCreate && <ManagemantTreePopup />}
    </S.main>
  );
};
const S = {
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
    height: 25px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;

export default ManagementsTree;
