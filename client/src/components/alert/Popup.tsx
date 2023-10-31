import React, { useState } from 'react';
import styled from 'styled-components';
import Table from '../table/StudentTable';

type Alert = {
  description?: string;
  title: string;
};

const PopupModal = (prop: Alert) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const openAlert = () => {
    setIsAlertOpen(true);
    //console.log('open');
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
    //console.log('close');
  };

  const submit = () => {
    setIsAlertOpen(false);
    //console.log('submit');
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
              {/* {prop.description} */}
              <Table />
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
    width: 500px;
    border: 1px solid gray;
    background-color: white;
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
  alertTitle: styled.div`
    font-size: 25px;
  `,
  cancelIcon: styled.div`
    cursor: pointer;
  `,
  description: styled.div`
    width: 100%;
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
  `,
  button: styled.button`
    width: 50px;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 15px;
    background-color: black;
    color: white;
  `,
};

export default PopupModal;
