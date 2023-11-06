import styled from 'styled-components';
import { Button } from '@mui/material';

export const Styled = {
  main: styled.main`
    width: 1280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
  `,
  title: styled.div`
    font-size: 25px;
    margin-bottom: 60px;
    color: #1b254b;
  `,
  formContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0px 1px 10px -4px rgba(112, 144, 176, 0.8);
    &:last-of-type {
      margin-top: 40px;
      margin-left: 90px;
    }
  `,
  titleContainer: styled.div`
    width: 400px;
    margin-top: 10px;
    margin-bottom: 40px;
    margin-left: 10px;
    &:last-of-type {
      width: 500px;
    }
  `,
  subTitle: styled.div`
    width: 200px;
    color: #1b254b;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  `,
  inputContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  `,
  inputWapper: styled.div`
    width: 400px;
    display: flex;
    align-items: center;
    margin-left: 10px;
    &:last-of-type {
      margin-bottom: 10px;
    }
  `,
  label: styled.label`
    width: 100px;
    display: flex;
    font-size: 14px;
    color: #a3aed0;
  `,
  input: styled.input`
    width: 200px;
    padding: 5px;
    border: none;
    border-bottom: 1px solid #c5c5c5;
    outline: none;
    font-size: 12px;
    margin: 0 auto;
    color: #1b254b;
  `,
  information: styled.p`
    width: 200px;
    font-size: 14px;
  `,
  btnContainer: styled.div`
    width: 200px;
    display: flex;
    justify-content: center;
  `,
  btnWrapper: styled.button`
    border: none;
    background-color: transparent;
    margin-right: 10px;
  `,
};

export const StyledEditBtn = styled(Button)`
  && {
    width: 80px;
    height: 25px;
    border-radius: 15px;
    font-size: 13px;
    line-height: normal;
  }
`;

export const StyledSaveBtn = styled(Button)`
  && {
    width: 80px;
    height: 25px;
    border-radius: 15px;
    font-size: 13px;
    color: white;
    font-weight: bolder;
    line-height: normal;
  }
`;
