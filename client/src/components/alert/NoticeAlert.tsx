import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { alertBoolAtom } from '../../state/utilAtom';

import CloseIcon from '@mui/icons-material/Close';

type AlertProps = {
  description?: string;
  title: string;
  onClose?: () => void;
};

const NoticeAlert = (prop: AlertProps) => {
  const [isAlertOpen, setIsAlertOpen] = useRecoilState(alertBoolAtom);

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  return (
    <div>
      {isAlertOpen && (
        <Overlay>
          <Container>
            <AlertWrapper>
              <CancelIconWarpper>
                <CloseIcon onClick={closeAlert} sx={{ cursor: 'pointer' }} />
              </CancelIconWarpper>
              <Description>
                <div>{prop.title}</div>
                <div> {prop.description}</div>
              </Description>
            </AlertWrapper>
            <SelectWarpper>
              <ConfirmButton onClick={closeAlert}>확인</ConfirmButton>
            </SelectWarpper>
          </Container>
        </Overlay>
      )}
    </div>
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

const ConfirmButton = styled.div`
  margin: auto 0;
  cursor: pointer;
  color: #4990d3;
  font-size: 12px;
  font-weight: bold;
`;

export { NoticeAlert };
