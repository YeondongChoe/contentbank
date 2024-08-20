import * as React from 'react';

import styled from 'styled-components';

import { Button } from '../../atom';

type AlertProps = {
  description: string;
  subDescription?: string;
  onClick?: () => void;
  onClose?: () => void;
  action?: string;
  notice?: boolean;
  isAlertOpen: boolean;
  isWarning?: boolean;
  top?: string;
};

export function Alert({
  description,
  subDescription,
  onClick,
  onClose,
  action,
  notice,
  isAlertOpen,
  isWarning,
  top,
}: AlertProps) {
  return (
    <>
      {isAlertOpen && (
        <Overlay $top={top}>
          <Container>
            <AlertWrapper>
              {isWarning && (
                <svg
                  width="35"
                  height="30"
                  viewBox="0 0 35 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.0909 18.9474H15.9091V11.0526H19.0909M19.0909 25.2632H15.9091V22.1053H19.0909M0 30H35L17.5 0L0 30Z"
                    fill="#FF523E"
                  />
                </svg>
              )}
              <DescriptionWrapper>
                <Description>{description}</Description>
                <Description>{subDescription}</Description>
              </DescriptionWrapper>
            </AlertWrapper>
            {notice ? (
              <SelectWrapper>
                <Button
                  buttonType="button"
                  onClick={onClose}
                  height="30px"
                  width="80px"
                  $padding="15px"
                  fontSize="14px"
                  $borderRadius="7px"
                  $filled
                  cursor
                >
                  <span>확인</span>
                </Button>
              </SelectWrapper>
            ) : (
              <SelectWrapper>
                <Button
                  buttonType="button"
                  onClick={onClose}
                  height="30px"
                  $padding="15px"
                  width="80px"
                  fontSize="14px"
                  $borderRadius="7px"
                  $border
                  cursor
                >
                  <span>취소</span>
                </Button>
                <Button
                  buttonType="button"
                  height="30px"
                  $padding="15px"
                  width="80px"
                  fontSize="14px"
                  $borderRadius="7px"
                  onClick={onClick}
                  $filled
                  cursor
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

const Overlay = styled.div<{ $top?: string }>`
  position: fixed;
  top: ${({ $top }) => ($top ? `${$top};` : '0px')};
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  z-index: 2;
  padding-top: 20px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 450px;
  height: 150px;
  border: 1px solid gray;
  background-color: white;
  border-radius: 10px;
`;
const AlertWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px 10px 10px 15px;
  gap: 10px;
`;
const DescriptionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Description = styled.div`
  display: flex;
  //justify-content: center;
  font-size: 16px;
`;
const SelectWrapper = styled.div`
  width: 100%;
  padding: 10px 20px 20px 0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;
