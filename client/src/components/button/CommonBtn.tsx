import { NONAME } from 'dns';
import React from 'react';
import styled from 'styled-components';

interface Styleprop {
  type?: 'nomal' | 'confirm' | 'cancel';
  fontSize?: '16px' | '12px';
}

type Btn = {
  text: string;
};

export const NomalBtn = (props: Btn) => {
  return (
    <S.btnContainer type="nomal">
      <S.nomalBtn fontSize="16px">{props.text}</S.nomalBtn>
    </S.btnContainer>
  );
};

export const ConfirmBtn = (props: Btn) => {
  return (
    <S.btnContainer type="confirm">
      <S.confirmBtn fontSize="16px">{props.text}</S.confirmBtn>
    </S.btnContainer>
  );
};

export const CancelBtn = (props: Btn) => {
  return (
    <S.btnContainer type="cancel">
      <S.cancelBtn fontSize="16px">{props.text}</S.cancelBtn>
    </S.btnContainer>
  );
};

const S = {
  btnContainer: styled.div<Styleprop>`
    width: 250px;
    height: 60px;
    border: ${(props) => {
      if (props.type === 'nomal') {
        return '1px solid #4990d3';
      }
    }};
    background-color: ${(props) => {
      if (props.type === 'nomal') {
        return 'white';
      }
      if (props.type === 'confirm') {
        return '#4990d3';
      }
      if (props.type === 'cancel') {
        return '#bfbfbf';
      }
    }};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 10px;
    font-weight: bold;
  `,
  nomalBtn: styled.p<Styleprop>`
    color: #4990d3;
    font-size: ${(props) => {
      if (props.fontSize === '12px') {
        return '12px';
      }
      if (props.fontSize === '16px') {
        return '16px';
      }
    }};
  `,
  confirmBtn: styled.button<Styleprop>`
    color: white;
    border: none;
    background: none;
    outline: none;
    font-size: ${(props) => {
      if (props.fontSize === '12px') {
        return '12px';
      }
      if (props.fontSize === '16px') {
        return '16px';
      }
    }};
  `,
  cancelBtn: styled.p<Styleprop>`
    color: white;
    font-size: ${(props) => {
      if (props.fontSize === '12px') {
        return '12px';
      }
      if (props.fontSize === '16px') {
        return '16px';
      }
    }};
  `,
};
