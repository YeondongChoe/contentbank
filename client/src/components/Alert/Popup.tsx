import React, { useState } from 'react';
import styled from 'styled-components';

type Alert = {
  description: string;
  title: string;
};

const PopupModal = (prop: Alert) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const openAlert = () => {
    setIsAlertOpen(true);
    console.log('open');
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
    console.log('close');
  };

  const submit = () => {
    setIsAlertOpen(false);
    console.log('submit');
  };

  return (
    <>
      <button onClick={openAlert}>Notice Alert</button>
      {isAlertOpen && (
        <S.popupOverlay>
          <S.container>
            <S.alertHead>
              <S.alertTitle>{prop.title}</S.alertTitle>
              <S.cancelIcon onClick={closeAlert}>X</S.cancelIcon>
            </S.alertHead>
            <S.description>
              <div> {prop.description}</div>
            </S.description>
            <S.button onClick={submit}>등록</S.button>
          </S.container>
        </S.popupOverlay>
      )}
    </>
  );
};

const S = {
  popupOverlay: styled.div`
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
  `,
  container: styled.div`
    width: 600px;
    border: 1px solid gray;
  `,
  alertHead: styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #e5e5e5;
    padding: 10px;
  `,
  alertTitle: styled.div``,
  cancelIcon: styled.div`
    cursor: pointer;
  `,
  description: styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  `,
  button: styled.button`
    width: 50px;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 12px;
    background-color: black;
    color: white;
  `,
};

export default PopupModal;
