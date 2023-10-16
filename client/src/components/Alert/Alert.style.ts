import styled from 'styled-components';

export const Styled_Alert = {
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
    margin-top: 10px;
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
  `,
  confirm: styled.div`
    margin: auto 0;
    cursor: pointer;
  `,
};
