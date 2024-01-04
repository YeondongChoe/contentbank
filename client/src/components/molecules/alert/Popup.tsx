import * as React from 'react';
import { useState } from 'react';

import { IoMdClose } from 'react-icons/io';
import styled from 'styled-components';

import { TablePopup } from '../../tableWrap/StudentTable';

type alertProps = {
  description?: string;
  title: string;
};

export function PopupModal(prop: alertProps) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const openAlert = () => {
    setIsAlertOpen(true);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  const submit = () => {
    setIsAlertOpen(false);
  };

  return (
    <>
      <button onClick={openAlert}>Notice Alert</button>
      {isAlertOpen && (
        <Overlay>
          <Container>
            <HeadWrapper>
              <Title>{prop.title}</Title>
              <IoMdClose onClick={closeAlert} style={{ cursor: 'pointer' }} />
            </HeadWrapper>
            <Description>
              <TablePopup />
            </Description>
            <SubmitButton onClick={submit}>등록</SubmitButton>
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
  width: 500px;
  border: 1px solid gray;
  background-color: white;
`;
const HeadWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e5e5e5;
  padding: 10px;
`;
const Title = styled.div`
  font-size: 25px;
`;
const Description = styled.div`
  width: 100%;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
`;
const SubmitButton = styled.button`
  width: 50px;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 15px;
  background-color: black;
  color: white;
`;
