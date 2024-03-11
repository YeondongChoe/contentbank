import * as React from 'react';

import { IoMdClose } from 'react-icons/io';
import styled from 'styled-components';

import { useModal } from '../../../hooks';

type ModalProps = {
  cancelBtn?: boolean;
  submitBtn?: boolean;
};
export const Modal = ({ cancelBtn, submitBtn }: ModalProps) => {
  const { modalDataState, closeModal } = useModal();

  return (
    <>
      {modalDataState.isOpen && (
        <ModalDimmer onClick={() => closeModal()}>
          <ModalBody
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ModalTitle>
              <ModalTitle>{modalDataState.title}</ModalTitle>
              <IoMdClose onClick={closeModal} />
            </ModalTitle>
            <>{modalDataState.content}</>
            <ModalFooter>
              {cancelBtn && (
                <ModalButtonWithBorder onClick={closeModal}>
                  Cancel
                </ModalButtonWithBorder>
              )}
              {submitBtn && (
                <ModalButton onClick={modalDataState.callBack}>Ok</ModalButton>
              )}
            </ModalFooter>
          </ModalBody>
        </ModalDimmer>
      )}
    </>
  );
};

export const ModalDimmer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;
export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  min-height: 100px;
  background-color: #ffffff;
  /* border: 1px solid #cbcbcb; */
  border-radius: 10px;
  z-index: 3;
`;
export const ModalTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > img {
    margin: 10px;
    cursor: pointer;
  }
  > svg {
    margin: 10px;
    cursor: pointer;
  }
`;
export const Title = styled.span`
  padding: 1rem;
  font-weight: bold;
  font-size: large;
`;
export const ModalContents = styled.div`
  padding: 1rem;
`;
export const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
`;
export const ModalButton = styled.button`
  background: none;
  border: none;
  width: 100%;
  height: 52px;
  font-weight: bold;
  :hover {
    opacity: 50%;
    transition: 0.5s;
  }
`;

export const ModalButtonWithBorder = styled(ModalButton)`
  border-right: 1px solid #cbcbcb;
`;
