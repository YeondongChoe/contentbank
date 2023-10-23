import styled from 'styled-components';

export const Styled_Mypage = {
  main: styled.main`
    width: 1280px;
    //height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
  `,
  title: styled.div`
    font-size: 25px;
  `,
  titleContainer: styled.div`
    width: 400px;
    margin-top: 60px;
    margin-bottom: 40px;
  `,
  subTitle: styled.div`
    width: 200px;
    height: 25px;
    background-color: #ebebeb;
    color: #665f5f;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  inputcontainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  `,
  inputWapper: styled.div`
    width: 400px;
    display: flex;
    align-items: center;
    //justify-content: center;
  `,
  label: styled.label`
    width: 100px;
    display: flex;
    font-size: 14px;
  `,
  input: styled.input`
    width: 200px;
    padding: 5px;
    border: none;
    border-bottom: 1px solid #c5c5c5;
    outline: none;
    font-size: 12px;
    margin: 0 auto;
  `,
  information: styled.p`
    width: 200px;
    font-size: 14px;
  `,
  btnWrapper: styled.div`
    width: 200px;
    display: flex;
    justify-content: center;
  `,
};
