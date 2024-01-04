import * as React from 'react';

import { IoMdClose } from 'react-icons/io';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { alertBoolAtom } from '../../../store/utilAtom';

type AlertProps = {
  title: string;
  description?: string;
  onClick?: () => void;
  action?: string;
};

export function SelectAlert(prop: AlertProps) {
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
              <CancelIconWrapper>
                <IoMdClose onClick={closeAlert} style={{ cursor: 'pointer' }} />
              </CancelIconWrapper>
              <Description>{prop.title}</Description>
              <Description>{prop.description}</Description>
            </AlertWrapper>
            <SelectWrapper>
              <CancelButton onClick={closeAlert}>취소</CancelButton>
              <ConfirmButton onClick={prop.onClick}>
                {prop.action}
              </ConfirmButton>
            </SelectWrapper>
          </Container>
        </Overlay>
      )}
    </>
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
const CancelIconWrapper = styled.div`
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
const SelectWrapper = styled.div`
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
