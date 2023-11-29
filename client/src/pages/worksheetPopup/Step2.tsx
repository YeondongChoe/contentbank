import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import {
  CreateWorksheetStep1,
  CreateWorksheetStep2,
  CreateWorksheetStep3,
} from '../../recoil/CreatingWorksheet';
import Step3 from './Step3';

import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

const Step2 = () => {
  const [value, setValue] = useState('1');
  const [isStep1, setIsStep1] = useRecoilState(CreateWorksheetStep1);
  const [isStep2, setIsStep2] = useRecoilState(CreateWorksheetStep2);
  const [isStep3, setIsStep3] = useRecoilState(CreateWorksheetStep3);
  const [isSimilar, setIsSimilar] = useState(false);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const closePopup = () => {
    setIsStep1(false);
  };
  const goBackMainPopup = () => {
    setIsStep2(false);
  };

  const handleClickStep3 = () => {
    setIsStep3(true);
  };

  const handleClickSimilar = () => {
    setIsSimilar(true);
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
              <S.frontSpan>STEP 1 -</S.frontSpan> STEP 2
            </S.span>
            학습지 상세 편집
          </S.title>
          <CloseIcon onClick={closePopup} sx={{ cursor: 'pointer' }} />
        </S.topContainer>
        <S.mainContainer>
          <S.leftTapWrapper>
            {isSimilar ? (
              <S.similarContainer>
                <S.similarBtnContainer>
                  <CloseIcon onClick={() => setIsSimilar(false)} />
                </S.similarBtnContainer>
                <div>
                  1번 유사 문항
                  <S.frontSpan>
                    문항을 교체하거나, 추가할 수 있습니다.
                  </S.frontSpan>
                </div>
                <S.similarViewContainer></S.similarViewContainer>
              </S.similarContainer>
            ) : (
              <>
                <S.tabContainer>
                  <Box sx={{ typography: 'body1' }}>
                    <TabContext value={value}>
                      <Box sx={{ borderColor: 'divider' }}>
                        <TabList onChange={handleChangeTab}>
                          <Tab
                            label="학습지 요약"
                            value="1"
                            style={{ fontSize: '16px', fontWeight: 'bold' }}
                          />
                          <Tab
                            label="새 문항 추가"
                            value="2"
                            style={{ fontSize: '16px', fontWeight: 'bold' }}
                          />
                          <Tab
                            label="즐겨찾는 문항"
                            value="3"
                            style={{ fontSize: '16px', fontWeight: 'bold' }}
                          />
                          <Tab
                            label="개념"
                            value="4"
                            style={{ fontSize: '16px', fontWeight: 'bold' }}
                          />
                        </TabList>
                      </Box>
                    </TabContext>
                  </Box>
                </S.tabContainer>
                <S.discriptionContainer>
                  <div className="학습지 요약">
                    <div>문항 통계</div>
                    <div>총 45 문항</div>
                    <div>객관식 20 주관식 10 서술형 15</div>
                    <div>문항 상세 내용 및 순서 변경</div>
                    <div>번호 문항타입 난이도 유형명 순서변경</div>
                    <div>1 객관식 중 1000이 10인 수 알아보기</div>
                    <div>2 객관식 중 1000이 10인 수 알아보기</div>
                    <div>44 객관식 중 1000이 10인 수 알아보기</div>
                    <div>45 객관식 중 1000이 10인 수 알아보기</div>
                  </div>
                </S.discriptionContainer>
              </>
            )}
          </S.leftTapWrapper>
          <S.rightTapWrapper>
            <div>문항 뷰어</div>
            <StyledBtn variant="outlined" onClick={() => handleClickSimilar()}>
              유사문항
            </StyledBtn>
          </S.rightTapWrapper>
        </S.mainContainer>
        <S.bottomContainer>
          <StyledNextBtn variant="contained" onClick={() => handleClickStep3()}>
            다음 단계
          </StyledNextBtn>
        </S.bottomContainer>
      </S.popupContainer>
      {isStep3 && <Step3 />}
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
    justify-content: center;
    align-items: center;
    border: 1px solid #5f86fc;
    border-radius: 25px;
  `,
  tabContainer: styled.div`
    width: 100%;
    height: 90px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
  `,
  discriptionContainer: styled.div`
    width: 100%;
    height: 610px;
    padding-left: 20px;
  `,
  similarContainer: styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
  `,
  similarBtnContainer: styled.div`
    display: flex;
    justify-content: flex-end;
  `,
  similarViewContainer: styled.div`
    width: 100%;
    height: 610px;
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
  bottomContainer: styled.div`
    margin: 10px 30px;
    display: flex;
    justify-content: flex-end;
  `,
};

const StyledBtn = styled(Button)`
  && {
    height: 30px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;

const StyledNextBtn = styled(Button)`
  && {
    height: 25px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;

export default Step2;
