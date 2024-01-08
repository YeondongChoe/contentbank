import * as React from 'react';
import { useState } from 'react';

import { FaCircle } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';
import { IoMdClose, IoIosArrowBack } from 'react-icons/io';
import { SlPicture } from 'react-icons/sl';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { Input, Label, Button } from '../../components';
import { COLOR } from '../../components/constants';
import {
  createWorksheetStep1BoolAtom,
  createWorksheetStep2BoolAtom,
  createWorksheetStep3BoolAtom,
  editWorksheetBoolAtom,
} from '../../store/creatingWorksheetAtom';

export function Step3() {
  const [isStep1, setIsStep1] = useRecoilState(createWorksheetStep1BoolAtom);
  const [isStep2, setIsStep2] = useRecoilState(createWorksheetStep2BoolAtom);
  const [isStep3, setIsStep3] = useRecoilState(createWorksheetStep3BoolAtom);
  const isEditWorksheet = useRecoilValue(editWorksheetBoolAtom);
  const [colorChoice, setColorChoice] = useState('');

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
            <IoIosArrowBack
              style={{ fontSize: '24px', cursor: 'pointer' }}
              onClick={goBackMainPopup}
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
          <IoMdClose
            onClick={closePopup}
            style={{ fontSize: '22px', cursor: 'pointer' }}
          />
        </TitleWrapper>
        <Wrapper>
          <WorksheetSettingSection>
            <InputGroup>
              <InputWrapper>
                <Label value="학습지명" fontSize="14px" width="120px" />
                <Input
                  width="300px"
                  height="30px"
                  padding="10px"
                  border="normal"
                  placeholderSize="12px"
                  fontSize="14px"
                  type="text"
                  placeholder="학습지명을 작성해주세요."
                  //value={nameValue}
                  // onChange={(e) => {
                  //   setNameValue(e.target.value);
                  // }}
                  //innerRef={nameInputRef}
                />
              </InputWrapper>
              <InputWrapper>
                <Label value="출제자" fontSize="14px" width="120px" />
                <Input
                  width="300px"
                  height="30px"
                  padding="10px"
                  border="normal"
                  placeholderSize="12px"
                  fontSize="14px"
                  type="text"
                  placeholder="출제자명을 작성해주세요."
                  //value={nameValue}
                  // onChange={(e) => {
                  //   setNameValue(e.target.value);
                  // }}
                  //innerRef={nameInputRef}
                />
              </InputWrapper>
              <InputWrapper>
                <Label value="학년" fontSize="14px" width="120px" />
                <Input
                  width="300px"
                  height="30px"
                  padding="10px"
                  border="normal"
                  placeholderSize="12px"
                  fontSize="14px"
                  type="text"
                  placeholder="학년을 작성해주세요."
                  //value={nameValue}
                  // onChange={(e) => {
                  //   setNameValue(e.target.value);
                  // }}
                  //innerRef={nameInputRef}
                />
              </InputWrapper>
            </InputGroup>
            <WorksheetNameWrapper>
              <Label value="학습지분류" fontSize="14px" width="120px" />
              <ButtonGroup>
                <Button
                  buttonType="button"
                  onClick={() => {}}
                  $padding="5px"
                  height={'30px'}
                  width={'65px'}
                  fontSize="12px"
                  $border
                >
                  <span>연습문항</span>
                </Button>
                <Button
                  buttonType="button"
                  onClick={() => {}}
                  $padding="5px"
                  height={'30px'}
                  width={'65px'}
                  fontSize="12px"
                  $border
                >
                  <span>숙제</span>
                </Button>
                <Button
                  buttonType="button"
                  onClick={() => {}}
                  $padding="5px"
                  height={'30px'}
                  width={'65px'}
                  fontSize="12px"
                  $border
                >
                  <span>일일TEST</span>
                </Button>
                <Button
                  buttonType="button"
                  onClick={() => {}}
                  $padding="5px"
                  height={'30px'}
                  width={'65px'}
                  fontSize="12px"
                  $border
                >
                  <span>일일TEST</span>
                </Button>
                <Button
                  buttonType="button"
                  onClick={() => {}}
                  $padding="5px"
                  height={'30px'}
                  width={'65px'}
                  fontSize="12px"
                  $border
                >
                  <span>+추가</span>
                </Button>
              </ButtonGroup>
            </WorksheetNameWrapper>
            <TemplateWrapper>
              <Label value="학습지 템플릿" fontSize="14px" width="120px" />
              <ColorBox>
                <Label value="색상 및 디자인 선택" fontSize="12px" />
                <ColorOption>
                  {colorChoice == 'skyblue' ? (
                    <FaCircleCheck
                      color="skyblue"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('')}
                    />
                  ) : (
                    <FaCircle
                      color="skyblue"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('skyblue')}
                    />
                  )}
                  {colorChoice == 'blue' ? (
                    <FaCircleCheck
                      color="blue"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('')}
                    />
                  ) : (
                    <FaCircle
                      color="blue"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('blue')}
                    />
                  )}
                  {colorChoice == 'yellow' ? (
                    <FaCircleCheck
                      color="yellow"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('')}
                    />
                  ) : (
                    <FaCircle
                      color="yellow"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('yellow')}
                    />
                  )}
                  {colorChoice == 'orange' ? (
                    <FaCircleCheck
                      color="orange"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('')}
                    />
                  ) : (
                    <FaCircle
                      color="orange"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('orange')}
                    />
                  )}
                  {colorChoice == 'red' ? (
                    <FaCircleCheck
                      color="red"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('')}
                    />
                  ) : (
                    <FaCircle
                      color="red"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('red')}
                    />
                  )}
                  {colorChoice == 'green' ? (
                    <FaCircleCheck
                      color="green"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('')}
                    />
                  ) : (
                    <FaCircle
                      color="green"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('green')}
                    />
                  )}
                  {colorChoice == 'purple' ? (
                    <FaCircleCheck
                      color="purple"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('')}
                    />
                  ) : (
                    <FaCircle
                      color="purple"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('purple')}
                    />
                  )}
                  {colorChoice == 'gray' ? (
                    <FaCircleCheck
                      color="gray"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('')}
                    />
                  ) : (
                    <FaCircle
                      color="gray"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('gray')}
                    />
                  )}
                </ColorOption>
              </ColorBox>
            </TemplateWrapper>
            <TypeOptionWrapper>
              <TypeOption>
                <SlPicture color="gray" fontSize={40} />A Type
              </TypeOption>
              <TypeOption>
                <SlPicture color="gray" fontSize={40} />B Type
              </TypeOption>
            </TypeOptionWrapper>
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
          <Button
            buttonType="button"
            onClick={submitCreateWorksheet}
            $padding="10px"
            height={'30px'}
            width={'100px'}
            fontSize="12px"
          >
            <span>학습지 만들기</span>
          </Button>
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
  border-radius: 5px;
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
const WorksheetSettingSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 0;
  border: 1px solid ${COLOR.BORDER_POPUP};
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
const WorksheetNameWrapper = styled.div`
  display: flex;
`;
const ButtonGroup = styled.div`
  width: 300px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;
const TemplateWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 35px;
`;
const ColorBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.LIGHT_GRAY};
  padding: 10px;
`;
const ColorOption = styled.div`
  display: flex;
  gap: 20px;
  :hover {
    border: 1px solid ${COLOR.HOVER};
    border-radius: 10px;
  }
`;
const TypeOptionWrapper = styled.div`
  padding-left: 35px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 20px;
`;
const TypeOption = styled.div`
  width: 150px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.LIGHT_GRAY};
  border: 1px solid ${COLOR.BORDER_BLUE};
  font-size: 14px;
  color: ${COLOR.TEXT_GRAY};
  cursor: pointer;
  :hover {
    font-size: 50px;
  }
`;
const WorksheetTemplateViewSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 0;
  border: 1px solid ${COLOR.BORDER_POPUP};
  border-radius: 25px;
  gap: 10px;
  padding: 10px;
`;
const CreateButtonWrapper = styled.div`
  padding: 10px 0px;
  display: flex;
  justify-content: flex-end;
`;
