import * as React from 'react';
import { useState } from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { Button, TabMenu } from '../../components';
import { COLOR } from '../../components/contents';
import {
  createWorksheetStep1BoolAtom,
  createWorksheetStep2BoolAtom,
  createWorksheetStep3BoolAtom,
  editWorksheetBoolAtom,
} from '../../state/creatingWorksheetAtom';

import { Step3 } from './Step3';

export function Step2() {
  const menuList = [
    {
      label: '학습지 요약',
      value: '학습지 요약',
    },
    {
      label: '새 문항 추가',
      value: '새 문항 추가',
    },
    {
      label: '즐겨찾는 문항',
      value: '즐겨찾는 문항',
    },
    {
      label: '개념',
      value: '개념',
    },
  ];

  const [value, setValue] = useState('1');
  const [isStep1, setIsStep1] = useRecoilState(createWorksheetStep1BoolAtom);
  const [isStep2, setIsStep2] = useRecoilState(createWorksheetStep2BoolAtom);
  const [isStep3, setIsStep3] = useRecoilState(createWorksheetStep3BoolAtom);
  const isEditWorksheet = useRecoilValue(editWorksheetBoolAtom);
  const [isSimilar, setIsSimilar] = useState(false);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const closePopup = () => {
    setIsStep1(false);
    setIsStep2(false);
  };
  const goBackMainPopup = () => {
    setIsStep2(false);
  };

  const moveStep3 = () => {
    setIsStep3(true);
    console.log('받아온 데이타를 수정한 가공한 데이타를 넘겨주기');
  };

  const showSimilarContent = () => {
    setIsSimilar(true);
    console.log('어떤 데이터 값으로 호출?');
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
              STEP 2
            </Span>
            학습지 상세 편집
          </Title>
          <CloseIcon onClick={closePopup} sx={{ cursor: 'pointer' }} />
        </TitleWrapper>
        <Wrapper>
          <DiscriptionSection>
            {isSimilar ? (
              <SimilarWrapper>
                <SimilarCloseButtonWrapper>
                  <CloseIcon
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setIsSimilar(false)}
                  />
                </SimilarCloseButtonWrapper>
                <SimilarTitleWrapper>
                  <SimilarTitle>
                    1번 유사 문항
                    <SimilarTitleSpan>
                      문항을 교체하거나, 추가할 수 있습니다.
                    </SimilarTitleSpan>
                  </SimilarTitle>
                  <RestartWrapper>
                    <RestartAltIcon sx={{ cursor: 'pointer' }} />
                    새로 불러오기
                  </RestartWrapper>
                </SimilarTitleWrapper>
                <SimilarContentsWrapper>
                  <div>ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ</div>
                  <div>문항 뷰어</div>
                  <div>데이터값으로 받아온 문항 뷰어로 보여주기</div>
                  <div>교체</div>
                  <div>+추가</div>
                </SimilarContentsWrapper>
              </SimilarWrapper>
            ) : (
              <>
                <TabWrapper>
                  <TabMenu
                    length={4}
                    menu={menuList}
                    initialValue={'학습지 요약'}
                    width={'490px'}
                    lineStyle
                  />
                </TabWrapper>
                <DiscriptionWrapper>
                  <div className="학습지 요약">
                    <div>문항 통계</div>
                    <div>총 45 문항(리스트 length로 계산하기)</div>
                    <div>객관식 20 주관식 10 서술형 15</div>
                    <div>ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ</div>
                    <div>전 단계로부터 전달받은 데이터 보여주기</div>
                    <div>문항 상세 내용 및 순서 변경</div>
                    <div>번호 문항타입 난이도 유형명 순서변경</div>
                    <div>1 객관식 중 1000이 10인 수 알아보기</div>
                    <div>2 객관식 중 1000이 10인 수 알아보기</div>
                    <div>44 객관식 중 1000이 10인 수 알아보기</div>
                    <div>45 객관식 중 1000이 10인 수 알아보기</div>
                    <div>ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ</div>
                    <div>전 단계로부터 전달받은 데이터 보여주기</div>
                  </div>
                </DiscriptionWrapper>
              </>
            )}
          </DiscriptionSection>
          <ContentListSection>
            <div>문항 뷰어</div>
            <div>ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ</div>
            <div>전 단계로부터 전달받은 데이터 뷰어로 보여주기</div>
            <Button
              buttonType="button"
              onClick={showSimilarContent}
              $padding="10px"
              height={'30px'}
              width={'90px'}
              fontSize="12px"
              $border
            >
              <span>유사문항</span>
            </Button>
          </ContentListSection>
        </Wrapper>
        <NextStepButtonWrapper>
          <Button
            buttonType="button"
            onClick={moveStep3}
            $padding="10px"
            height={'30px'}
            width={'80px'}
            fontSize="12px"
          >
            <span>다음 단계</span>
          </Button>
        </NextStepButtonWrapper>
      </Container>
      {isStep3 && <Step3 />}
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
  border: 1px solid ${COLOR.BORDER_BLUE};
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
  color: ${COLOR.BORDER_BLUE};
`;
const Span = styled.span`
  color: ${COLOR.SECONDARY};
  padding-right: 10px;
`;
const Wrapper = styled.div`
  height: 629px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;
const DiscriptionSection = styled.section`
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${COLOR.BORDER_POPUP};
  border-radius: 25px;
`;
const TabWrapper = styled.div`
  padding: 10px 0px;
  display: flex;
  align-items: center;
`;
const DiscriptionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
`;
const SimilarWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
const SimilarCloseButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const SimilarTitleWrapper = styled.div`
  padding: 10px;
`;
const SimilarTitle = styled.div``;
const SimilarTitleSpan = styled.span`
  font-size: 12px;
  padding-left: 10px;
  color: ${COLOR.BORDER_BLUE};
`;
const RestartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 10px;
`;
const SimilarContentsWrapper = styled.div``;
const ContentListSection = styled.section`
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${COLOR.BORDER_POPUP};
  border-radius: 25px;
  padding: 10px;
  gap: 10px;
`;
const NextStepButtonWrapper = styled.div`
  padding: 10px 0px;
  display: flex;
  justify-content: flex-end;
`;
