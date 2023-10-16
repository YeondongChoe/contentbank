import styled from 'styled-components';

export const Styled_Alert = {
  alertOverlay: styled.div`
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 250px;
    height: 130px;
    border: 1px solid gray;
  `,
  alertdiv: styled.div`
    width: 100%;
  `,
  cancelIcon: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;
    margin-right: 5px;
    cursor: pointer;
  `,
  description: styled.div`
    margin-top: 5px;
    font-size: 13px;
    > div:nth-child(2) {
      margin-top: 3px;
      font-size: 11px;
    }
  `,
  selectDiv: styled.div`
    width: 100%;
    height: 40px;
    background-color: #e5e5e5;
    border-top: 1px solid gray;
    display: flex;
    justify-content: space-evenly;
    color: gray;
  `,
  cancel: styled.div`
    margin: auto 0;
    cursor: pointer;
    font-size: 12px;
  `,
  confirm: styled.div`
    margin: auto 0;
    cursor: pointer;
    font-size: 12px;
  `,
};
