import * as React from 'react';

import { IoMdClose } from 'react-icons/io';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { Button } from '../../atom';

type AlertProps = {
  title: string;
  description?: string;
  onClick?: () => void;
  onClose?: () => void;
  action?: string;
  notice?: boolean;
  isAlertOpen: boolean;
};

export function Alert({
  title,
  description,
  onClick,
  onClose,
  action,
  notice,
  isAlertOpen,
}: AlertProps) {
  return (
    <>
      {isAlertOpen && (
        <Overlay>
          <Container>
            <AlertWrapper>
              <CancelIconWrapper>
                <IoMdClose onClick={onClose} style={{ cursor: 'pointer' }} />
              </CancelIconWrapper>
              <Description>{title}</Description>
              <Description>{description}</Description>
            </AlertWrapper>
            {notice ? (
              <Button
                buttonType="button"
                onClick={onClose}
                height="10px"
                width="100px"
                $margin="0 0 10px 0"
                fontSize="12px"
                $borderRadius="15px"
              >
                <span>확인</span>
              </Button>
            ) : (
              <SelectWrapper>
                <Button
                  buttonType="button"
                  onClick={onClose}
                  height="10px"
                  $padding="15px"
                  width="80px"
                  fontSize="12px"
                  $borderRadius="15px"
                  $border
                >
                  <span>취소</span>
                </Button>
                <Button
                  buttonType="button"
                  height="10px"
                  $padding="15px"
                  width="80px"
                  fontSize="12px"
                  $borderRadius="15px"
                  onClick={onClick}
                >
                  <span>{action}</span>
                </Button>
              </SelectWrapper>
            )}
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
  background-color: rgba(0, 0, 0, 0.5);
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
  border-radius: 5px;
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
  padding-bottom: 10px;
  display: flex;
  justify-content: space-evenly;
`;
