import * as React from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import {
  createWorksheetStep1BoolAtom,
  createWorksheetStep2BoolAtom,
  createWorksheetStep3BoolAtom,
  editWorksheetBoolAtom,
} from '../../state/creatingWorksheetAtom';

export function Step3() {
  const [isStep1, setIsStep1] = useRecoilState(createWorksheetStep1BoolAtom);
  const [isStep2, setIsStep2] = useRecoilState(createWorksheetStep2BoolAtom);
  const [isStep3, setIsStep3] = useRecoilState(createWorksheetStep3BoolAtom);
  const isEditWorksheet = useRecoilValue(editWorksheetBoolAtom);

  const closePopup = () => {
    setIsStep1(false);
    setIsStep2(false);
    setIsStep3(false);
  };
  const goBackMainPopup = () => {
    setIsStep2(true);
    setIsStep3(false);
  };

  const submitCreateWorksheet = () => {
    setIsStep1(false);
    setIsStep2(false);
    setIsStep3(false);
    console.log('전 단계에서 받은 가공된 데이터로 학습지 post 요청 API');
  };

  return (
    <Overlay>
      <Container>
        <TitleWrapper>
          <IconWrapper>
            <ArrowBackIosNewIcon
              onClick={goBackMainPopup}
              sx={{ cursor: 'pointer' }}
            />
          </IconWrapper>
          <Title>
            <Span>
              {!isEditWorksheet && <FrontSpan>STEP 1 -</FrontSpan>}
              <FrontSpan>STEP 2 -</FrontSpan>
              STEP 3
            </Span>
            학습지 상세 편집
          </Title>
          <CloseIcon onClick={closePopup} sx={{ cursor: 'pointer' }} />
        </TitleWrapper>
        <Wrapper>
          <WorksheetSettingSection>
            <InputGroup>
              <InputWrapper>
                <Label>학습지명</Label>
                <Input placeholder="학습지명을 작성해주세요." />
              </InputWrapper>
              <InputWrapper>
                <Label>출제자</Label>
                <Input />
              </InputWrapper>
              <InputWrapper>
                <Label>학년</Label>
                <Input placeholder="학습지명을 작성해주세요." />
              </InputWrapper>
            </InputGroup>
            <WorksheetNameWrapper>
              <Label>학습지분류</Label>
              <ButtonGroup>
                <StyledNextBtn>연습문항</StyledNextBtn>
                <StyledNextBtn>숙제</StyledNextBtn>
                <StyledNextBtn>일일 TEST</StyledNextBtn>
                <StyledNextBtn>일일 TEST</StyledNextBtn>
                <StyledNextBtn>일일 TEST</StyledNextBtn>
                <StyledNextBtn>일일 TEST</StyledNextBtn>
                <StyledNextBtn>일일 TEST</StyledNextBtn>
                <StyledNextBtn>+ 추가</StyledNextBtn>
              </ButtonGroup>
            </WorksheetNameWrapper>
            <TemplateWrapper>
              <Label>학습지 템플릿</Label>
              <div>색상 및 디자인 선택</div>
              <div>파란 노랑 주황 빨강 남색 초록</div>
            </TemplateWrapper>
          </WorksheetSettingSection>
          <WorksheetTemplateViewSection>
            <div>학습지 템플릿 보여주기</div>
            <div>미리보기</div>
            <div>분할선택</div>
            <div>기본</div>
            <div>2분할</div>
            <div>전단계에서 받은 데이타를 리스트로 보여주기</div>
          </WorksheetTemplateViewSection>
        </Wrapper>
        <CreateButtonWrapper>
          <StyledNextBtn
            variant="contained"
            onClick={() => submitCreateWorksheet()}
          >
            학습지 만들기
          </StyledNextBtn>
        </CreateButtonWrapper>
      </Container>
    </Overlay>
  );
}

const Overlay = styled.div`
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
`;
const Container = styled.div`
  min-width: 1024px;
  width: 1080px;
  height: 780px;
  padding: 20px;
  border: 1px solid #a3aed0;
  background-color: white;
`;
const TitleWrapper = styled.div`
  padding: 20px 0px;
  display: flex;
  justify-content: space-between;
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1 0 0;
  padding-left: 10px;
`;
const FrontSpan = styled.span`
  color: #a3aed0;
`;
const Span = styled.span`
  color: #1976d2;
  padding-right: 10px;
`;
const Wrapper = styled.div`
  height: 629px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;
const WorksheetSettingSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 0;
  border: 1px solid #5f86fc;
  border-radius: 25px;
  padding: 10px;
  gap: 20px;
`;
const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Label = styled.label`
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Input = styled.input`
  width: 300px;
  height: 30px;
  padding: 10px;
`;
const WorksheetNameWrapper = styled.div`
  display: flex;
`;
const ButtonGroup = styled.div`
  width: 300px;
  display: flex;
  flex-wrap: wrap;
`;
const TemplateWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 35px;
  gap: 10px;
`;
const WorksheetTemplateViewSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 0;
  border: 1px solid #5f86fc;
  border-radius: 25px;
  gap: 10px;
  padding: 10px;
`;
const CreateButtonWrapper = styled.div`
  padding: 10px 0px;
  display: flex;
  justify-content: flex-end;
`;
const StyledNextBtn = styled(Button)`
  && {
    height: 30px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;
