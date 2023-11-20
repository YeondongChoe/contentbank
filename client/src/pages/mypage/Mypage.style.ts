import styled from 'styled-components';
import { Button } from '@mui/material';

export const Styled = {
  main: styled.main`
    width: 100vw;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  mainContainer: styled.div`
    width: 400px;
    height: 500px;
    display: flex;
    flex-direction: column;
    margin-top: 40px;
  `,
  title: styled.div`
    font-size: 25px;
    margin-bottom: 60px;
    display: flex;
    justify-content: center;
    color: #1b254b;
  `,
  formContainer: styled.div`
    width: 400px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0px 1px 10px -4px rgba(112, 144, 176, 0.8);
  `,
  passwordFormContainer: styled.div`
    width: 400px;
    height: 300px;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0px 1px 10px -4px rgba(112, 144, 176, 0.8);
  `,
  titleContainer: styled.div`
    width: 400px;
    margin-top: 15px;
    margin-bottom: 40px;
    margin-left: 20px;
    &:last-of-type {
      width: 400px;
    }
  `,
  subTitle: styled.div`
    color: #1b254b;
    font-size: 16px;
    font-weight: bold;
  `,
  inputContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  `,
  inputWapper: styled.div`
    width: 400px;
    height: 20px;
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
    margin-left: 5px;
  `,
  input: styled.input`
    width: 150px;
    padding: 5px;
    border: none;
    border-bottom: 1px solid #c5c5c5;
    outline: none;
    font-size: 14px;
    color: #1b254b;
    &::placeholder {
      font-size: 12px;
    }
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
    display: flex;
    gap: 5px;
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

export const StyledCancelBtn = styled(Button)`
  && {
    height: 25px;
    border-radius: 15px;
    font-size: 13px;
    line-height: normal;
  }
`;

export const StyledSaveBtn = styled(Button)`
  && {
    height: 25px;
    border-radius: 15px;
    font-size: 13px;
    color: white;
    font-weight: bolder;
    line-height: normal;
  }
`;
