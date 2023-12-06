import React from 'react';
import styled from 'styled-components';
import { alertBoolAtom } from '../../state/utilAtom';
import { useRecoilState } from 'recoil';

import CloseIcon from '@mui/icons-material/Close';

type AlertProps = {
  title: string;
  description?: string;
  onClick?: () => void;
  action?: string;
};

const SelectAlert = (prop: AlertProps) => {
  const [isAlertOpen, setIsAlertOpen] = useRecoilState(alertBoolAtom);

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  return (
    <>
      {isAlertOpen && (
        <Overlay>
          <Container>
            <AlertWrapper>
              <CancelIconWarpper>
                <CloseIcon onClick={closeAlert} sx={{ cursor: 'pointer' }} />
              </CancelIconWarpper>
              <Description>{prop.title}</Description>
              <Description>{prop.description}</Description>
            </AlertWrapper>
            <SelectWarpper>
              <CancelButton onClick={closeAlert}>취소</CancelButton>
              <ConfirmButton onClick={prop.onClick}>
                {prop.action}
              </ConfirmButton>
            </SelectWarpper>
          </Container>
        </Overlay>
      )}
    </>
  );
};

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
  z-index: 99;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  height: 130px;
  border: 1px solid gray;
  background-color: white;
`;

const AlertWrapper = styled.div`
  width: 100%;
`;

const CancelIconWarpper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
  margin-right: 5px;
  cursor: pointer;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
  font-size: 13px;
  > div:nth-child(2) {
    margin-top: 3px;
    font-size: 11px;
  }
`;

const SelectWarpper = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-evenly;
`;

const CancelButton = styled.div`
  margin: auto 0;
  cursor: pointer;
  font-size: 12px;
  color: gray;
`;

const ConfirmButton = styled.div`
  margin: auto 0;
  cursor: pointer;
  color: #4990d3;
  font-size: 12px;
  font-weight: bold;
`;

export { SelectAlert };
