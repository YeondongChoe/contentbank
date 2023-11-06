import styled from 'styled-components';
import { Button } from '@mui/material';

interface Styleprop {
  width?: number;
  height?: number;
}

export const Styled = {
  main: styled.main``,
  inputContainer: styled.div<{ width: number }>`
    width: ${(props) => props.width || 750}px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  `,
  inputWapper: styled.div<{ width: number }>`
    width: ${(props) => props.width || 750}px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  label: styled.label`
    margin-left: 10px;
    color: #a3aed0;
  `,
  input: styled.input<{ width: number }>`
    width: ${(props) => props.width || 550}px;
    height: 40px;
    padding: 10px;
    font-size: 14px;
    border: none;
    border-bottom: 1px solid red;
    outline: none;
    margin-right: 10px;
    &.success {
      border-color: green;
    }
    &.passwordMatch {
      border-color: green;
    }
  `,
  successMessage: styled.div`
    width: 550px;
    font-size: 12px;
    color: green;
    display: flex;
    font-weight: bold;
    justify-content: flex-end;
    margin-right: 10px;
  `,
  errorMessage: styled.div`
    width: 550px;
    font-size: 12px;
    color: red;
    display: flex;
    font-weight: bold;
    justify-content: flex-end;
    margin-right: 10px;
  `,
  btnGroupContainer: styled.div<{ display: string; marginLeft: number }>`
    display: flex;
    justify-content: ${(props) => props.display};
    gap: 20px;
    margin-top: 50px;
    margin-bottom: 20px;
    margin-left: ${(props) => props.marginLeft || 0}px;
  `,
  btnWapper: styled.button`
    border: none;
    background-color: transparent;
  `,
};

export const StyledCancelBtn = styled(Button)<Styleprop>`
  && {
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border-radius: 10px;
    font-size: 16px;
    line-height: normal;
  }
`;

export const StyledConfirmBtn = styled(Button)<Styleprop>`
  && {
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border-radius: 10px;
    font-size: 16px;
    line-height: normal;
  }
`;

export const StyledNomalBtn = styled(Button)<Styleprop>`
  && {
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border-radius: 10px;
    font-size: 16px;
    line-height: normal;
  }
`;
