import * as React from 'react';

import { IoMdClose } from 'react-icons/io';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { alertBoolAtom } from '../../../store/utilAtom';
import { Button } from '../../atom';

type AlertProps = {
  description?: string;
  title: string;
  onClose?: () => void;
};

export function NoticeAlert(prop: AlertProps) {
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
              <CancelIconWrapper>
                <IoMdClose onClick={closeAlert} style={{ cursor: 'pointer' }} />
              </CancelIconWrapper>
              <Description>
                <div>{prop.title}</div>
                <div> {prop.description}</div>
              </Description>
            </AlertWrapper>
            <Button
              buttonType="button"
              onClick={closeAlert}
              height="10px"
              width="100px"
              $margin="0 0 10px 0"
              fontSize="12px"
              $borderRadius="15px"
            >
              <span>확인</span>
            </Button>
          </Container>
        </Overlay>
      )}
    </div>
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
