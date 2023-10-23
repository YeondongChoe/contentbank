import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface Styleprop {
  width?: number;
  color?: string;
  height?: number;
  fontSize?: number;
  radius?: number;
  btnWidth?: number;
  text?: string;
  onClick?: () => void;
}

export const NomalBtn: React.FC<Styleprop> = (props) => {
  const { width, height, fontSize, radius, onClick, color } = props;
  return (
    <S.btnContainer
      color={color}
      radius={radius}
      width={width}
      height={height}
      onClick={onClick}
    >
      <S.nomalBtn fontSize={fontSize}>{props.text}</S.nomalBtn>
    </S.btnContainer>
  );
};

export const ConfirmBtn: React.FC<Styleprop> = (props) => {
  const { width, height, fontSize, radius, onClick, color } = props;

  return (
    <S.btnContainer
      color={color}
      radius={radius}
      width={width}
      height={height}
      onClick={onClick}
    >
      <S.confirmBtn fontSize={fontSize}>{props.text}</S.confirmBtn>
    </S.btnContainer>
  );
};

export const CancelBtn: React.FC<Styleprop> = (props) => {
  const { width, height, fontSize, radius, onClick, color } = props;

  return (
    <S.btnContainer
      color={color}
      radius={radius}
      width={width}
      height={height}
      onClick={onClick}
    >
      <S.cancelBtn fontSize={fontSize}>{props.text}</S.cancelBtn>
    </S.btnContainer>
  );
};

export const EditBtn: React.FC<Styleprop> = (props) => {
  const { btnWidth, height, fontSize, radius, color, onClick } = props;

  return (
    <S.btnContainer
      color={color}
      radius={radius}
      width={btnWidth}
      height={height}
      onClick={onClick}
    >
      <S.editBtn fontSize={fontSize}>{props.text}</S.editBtn>
    </S.btnContainer>
  );
};

export const SaveBtn: React.FC<Styleprop> = (props) => {
  const { btnWidth, height, fontSize, radius, color } = props;

  return (
    <S.btnContainer
      color={color}
      radius={radius}
      width={btnWidth}
      height={height}
    >
      <S.saveBtn fontSize={fontSize}>{props.text}</S.saveBtn>
    </S.btnContainer>
  );
};

const S = {
  btnContainer: styled.button<Styleprop>`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border: ${(props) =>
      props.color === 'nomal' ? '1px solid #4990d3' : 'none'};
    background-color: ${(props) => {
      if (props.color === 'nomal') {
        return 'white';
      }
      if (props.color === 'confirm') {
        return '#4990d3';
      }
      if (props.color === 'cancel') {
        return '#cfcfcf';
      }
    }};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: ${(props) => props.radius}px;
    font-weight: bold;
  `,
  nomalBtn: styled.button<Styleprop>`
    color: #4990d3;
    outline: none;
    border: none;
    background: none;
    font-size: ${(props) => props.fontSize}px;
    cursor: pointer;
  `,
  confirmBtn: styled.button<Styleprop>`
    color: white;
    border: none;
    background: none;
    outline: none;
    font-size: ${(props) => props.fontSize}px;
    cursor: pointer;
  `,
  cancelBtn: styled.p<Styleprop>`
    color: white;
    font-size: ${(props) => props.fontSize}px;
  `,
  editBtn: styled.p<Styleprop>`
    color: #797979;
    font-size: ${(props) => props.fontSize}px;
  `,
  saveBtn: styled.p<Styleprop>`
    color: white;
    font-size: ${(props) => props.fontSize}px;
  `,
};
