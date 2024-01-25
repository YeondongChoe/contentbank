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

              <Description>{title}</Description>
              {/* <Description>{description}</Description> */}
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
                  height="30px"
                  $padding="15px"
                  width="80px"
                  fontSize="14px"
                  $borderRadius="7px"
                  $border
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
  padding: 20px 20px 10px 20px;
  gap: 5px;
`;
const CancelIconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
  margin-right: 5px;
  cursor: pointer;
`;
const Description = styled.div`
  //display: flex;
  //flex-direction: column;
  //align-items: center;
  margin-top: 5px;
  font-size: 13px;
  > div:nth-child(2) {
    margin-top: 3px;
    font-size: 11px;
  }
`;
const SelectWrapper = styled.div`
  width: 100%;
  padding: 10px 20px 20px 0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;
