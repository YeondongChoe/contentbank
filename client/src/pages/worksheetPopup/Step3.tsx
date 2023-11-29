import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import {
  CreateWorksheetStep1,
  CreateWorksheetStep2,
  CreateWorksheetStep3,
} from '../../recoil/CreatingWorksheet';

import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Step3 = () => {
  const [isStep1, setIsStep1] = useRecoilState(CreateWorksheetStep1);
  const [isStep2, setIsStep2] = useRecoilState(CreateWorksheetStep2);
  const [isStep3, setIsStep3] = useRecoilState(CreateWorksheetStep3);

  const closePopup = () => {
    setIsStep1(false);
    setIsStep3(false);
  };
  const goBackMainPopup = () => {
    setIsStep2(true);
    setIsStep3(false);
  };

  const handleClickSubmit = () => {
    setIsStep1(false);
    setIsStep3(false);
  };

  return (
    <S.popupOverlay>
      <S.popupContainer>
        <S.topContainer>
          <S.title>
            <S.iconWrapper>
              <ArrowBackIosNewIcon onClick={goBackMainPopup} />
            </S.iconWrapper>
            <S.span>
              <S.frontSpan>STEP 1 - STEP 2 -</S.frontSpan> STEP 3
            </S.span>
            학습지 상세 편집
          </S.title>
          <CloseIcon onClick={closePopup} sx={{ cursor: 'pointer' }} />
        </S.topContainer>
        <S.mainContainer>
          <S.leftTapWrapper>
            <S.inputWrapper>
              <label>학습지명</label>
              <input></input>
            </S.inputWrapper>
            <S.inputWrapper>
              <label>출제자</label>
              <input></input>
            </S.inputWrapper>
            <S.inputWrapper>
              <label>학년</label>
              <input></input>
            </S.inputWrapper>
            <S.classificationWrapper>
              <label>학습지분류</label>
              <S.classificationBtnContainer>
                <StyledNextBtn>연습문항</StyledNextBtn>
                <StyledNextBtn>숙제</StyledNextBtn>
                <StyledNextBtn>일일 TEST</StyledNextBtn>
                <StyledNextBtn>+ 추가</StyledNextBtn>
              </S.classificationBtnContainer>
            </S.classificationWrapper>
            <S.templateWrapper>
              <label>학습지 템플릿</label>
              <div>각종 색</div>
            </S.templateWrapper>
          </S.leftTapWrapper>
          <S.rightTapWrapper></S.rightTapWrapper>
        </S.mainContainer>
        <S.bottomContainer>
          <StyledNextBtn
            variant="contained"
            onClick={() => handleClickSubmit()}
          >
            학습지 만들기
          </StyledNextBtn>
        </S.bottomContainer>
      </S.popupContainer>
    </S.popupOverlay>
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
    z-index: 1;
  `,
  popupContainer: styled.div`
    width: 80vw;
    height: 95vh;
    border: 1px solid #a3aed0;
    background-color: white;
  `,
  topContainer: styled.div`
    margin: 40px 30px 20px 0px;
    display: flex;
    justify-content: space-between;
  `,
  title: styled.div`
    display: flex;
    align-items: center;
  `,
  iconWrapper: styled.div`
    display: flex;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;
  `,
  frontSpan: styled.span`
    color: #a3aed0;
  `,
  span: styled.span`
    color: #1976d2;
    margin-right: 10px;
    margin-left: -4px;
  `,

  mainContainer: styled.div`
    display: flex;
    justify-content: center;
    gap: 40px;
  `,
  leftTapWrapper: styled.div`
    width: 550px;
    height: 700px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #5f86fc;
    border-radius: 25px;
  `,
  inputWrapper: styled.div`
    display: flex;
  `,
  classificationWrapper: styled.div`
    display: flex;
  `,
  classificationBtnContainer: styled.div``,
  templateWrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
  rightTapWrapper: styled.div`
    width: 550px;
    height: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #5f86fc;
    border-radius: 25px;
    gap: 10px;
  `,
  discription: styled.div``,
  bottomContainer: styled.div`
    margin: 10px 30px;
    display: flex;
    justify-content: flex-end;
  `,
};

const StyledNextBtn = styled(Button)`
  && {
    height: 25px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;

export default Step3;
