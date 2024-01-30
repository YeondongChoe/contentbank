import * as React from 'react';
import { useState } from 'react';

import { FaCircle } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';
import { IoMdClose, IoIosArrowBack } from 'react-icons/io';
import { SlPicture } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { ThemeProvider } from 'styled-components';

import { Input, Label, Button } from '../../atom';
// eslint-disable-next-line import/order
import { COLOR } from '../../constants/COLOR';

// import {
//   createWorksheetStep1BoolAtom,
//   createWorksheetStep2BoolAtom,
//   createWorksheetStep3BoolAtom,
//   editWorksheetBoolAtom,
// } from '../../store/creatingWorksheetAtom';

import {
  RedTheme,
  OrangeTheme,
  GreenTheme,
  BlueTheme,
  PurpleTheme,
  GrayTheme,
} from '../../constants/THEME';

export function Step3() {
  // const location = useLocation();
  const navigate = useNavigate();

  const [nameValue, setNameValue] = useState('');
  const [gradeValue, setGradeValue] = useState('');
  const [contentAuthor, setContentAuthor] = useState('');

  const [colorChoice, setColorChoice] = useState('');

  const selectedTheme = (() => {
    switch (colorChoice) {
      case 'red':
        return RedTheme;
      case 'orange':
        return OrangeTheme;
      case 'green':
        return GreenTheme;
      case 'blue':
        return BlueTheme;
      case 'purple':
        return PurpleTheme;
      case 'gray':
        return GrayTheme;
      default:
        return {}; // 기본값
    }
  })();

  const [column, setColumn] = useState<string>();
  const selectColumn = (newValue: string) => {
    setColumn(newValue);
  };

  const [contentQuantity, setContentQuantity] = useState<string>();

  const selectContentQuantity = (newValue: string) => {
    setContentQuantity(newValue);
  };

  const closePopup = () => {
    // setIsStep1(false);
    navigate('/contentworksheet');
  };
  const goBackMainPopup = () => {
    // setIsStep2(true);
    // setIsStep3(false);
  };

  const submitCreateWorksheet = () => {
    // setIsStep1(false);
    // setIsStep2(false);
    // setIsStep3(false);
    navigate('/contentworksheet');
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
              {/* {!isEditWorksheet && <FrontSpan>STEP 1 -</FrontSpan>} */}
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
                  value={nameValue}
                  onChange={(e) => {
                    setNameValue(e.target.value);
                  }}
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
                  value={contentAuthor}
                  onChange={(e) => {
                    setContentAuthor(e.target.value);
                  }}
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
                  value={gradeValue}
                  onChange={(e) => {
                    setGradeValue(e.target.value);
                  }}
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
                  {colorChoice == 'red' ? (
                    <FaCircleCheck
                      color="#FA897B"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('')}
                    />
                  ) : (
                    <FaCircle
                      color="#FA897B"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('red')}
                    />
                  )}
                  {colorChoice == 'orange' ? (
                    <FaCircleCheck
                      color="#FFDD94"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('')}
                    />
                  ) : (
                    <FaCircle
                      color="#FFDD94"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('orange')}
                    />
                  )}
                  {colorChoice == 'green' ? (
                    <FaCircleCheck
                      color="#DDE6A5"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('')}
                    />
                  ) : (
                    <FaCircle
                      color="#DDE6A5"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('green')}
                    />
                  )}
                  {colorChoice == 'blue' ? (
                    <FaCircleCheck
                      color="#86E3CE"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('')}
                    />
                  ) : (
                    <FaCircle
                      color="#86E3CE"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('blue')}
                    />
                  )}
                  {colorChoice == 'purple' ? (
                    <FaCircleCheck
                      color="#CCABD8"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('')}
                    />
                  ) : (
                    <FaCircle
                      color="#CCABD8"
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
            <PositionOption>
              <ColumnOption>
                <Label value="학습지 단" fontSize="14px" width="100px" />
                <Button
                  buttonType="button"
                  onClick={() => {
                    selectColumn('2단');
                  }}
                  $padding="5px"
                  height={'30px'}
                  width={'65px'}
                  fontSize="12px"
                  $border={column !== '2단'}
                >
                  <span>2단</span>
                </Button>
                <Button
                  buttonType="button"
                  onClick={() => {
                    selectColumn('1단');
                  }}
                  $padding="5px"
                  height={'30px'}
                  width={'65px'}
                  fontSize="12px"
                  $border={column !== '1단'}
                >
                  <span>1단</span>
                </Button>
              </ColumnOption>
              <ContentQuantity>
                <Label value="학습지 배치" fontSize="14px" width="100px" />
                <Button
                  buttonType="button"
                  onClick={() => {
                    selectContentQuantity('최대');
                  }}
                  $padding="5px"
                  height={'30px'}
                  width={'65px'}
                  fontSize="12px"
                  $border={contentQuantity !== '최대'}
                >
                  <span>최대</span>
                </Button>
                <Button
                  buttonType="button"
                  onClick={() => {
                    selectContentQuantity('2문제');
                  }}
                  $padding="5px"
                  height={'30px'}
                  width={'65px'}
                  fontSize="12px"
                  $border={contentQuantity !== '2문제'}
                >
                  <span>2문제</span>
                </Button>
                <Button
                  buttonType="button"
                  onClick={() => {
                    selectContentQuantity('4문제');
                  }}
                  $padding="5px"
                  height={'30px'}
                  width={'65px'}
                  fontSize="12px"
                  $border={contentQuantity !== '4문제'}
                >
                  <span>4문제</span>
                </Button>
                <Button
                  buttonType="button"
                  onClick={() => {
                    selectContentQuantity('6문제');
                  }}
                  $padding="5px"
                  height={'30px'}
                  width={'65px'}
                  fontSize="12px"
                  $border={contentQuantity !== '6문제'}
                >
                  <span>6문제</span>
                </Button>
              </ContentQuantity>
            </PositionOption>
          </WorksheetSettingSection>
          <WorksheetTemplateViewSection>
            <ThemeProvider theme={selectedTheme}>
              <WorksheetTemplateWrapper>
                <Label value={'미리보기'} margin="20px"></Label>
                <WorksheetTemplate>
                  <InsideWorksheetTemplate>
                    <Input
                      width="300px"
                      height="30px"
                      padding="10px"
                      border="black"
                      placeholderSize="12px"
                      fontSize="14px"
                      type="text"
                      placeholder={nameValue || '학습지명'}
                    />
                    <Input
                      width="300px"
                      height="30px"
                      padding="10px"
                      border="black"
                      placeholderSize="12px"
                      fontSize="14px"
                      type="text"
                      placeholder={gradeValue || '학년'}
                    />
                    <Input
                      width="300px"
                      height="30px"
                      padding="10px"
                      border="black"
                      placeholderSize="12px"
                      fontSize="14px"
                      type="text"
                      placeholder={contentAuthor || '출제자명'}
                    />
                  </InsideWorksheetTemplate>
                </WorksheetTemplate>
              </WorksheetTemplateWrapper>
            </ThemeProvider>
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
const PositionOption = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-left: 35px;
`;
const ColumnOption = styled.div`
  display: flex;
  gap: 5px;
`;
const ContentQuantity = styled.div`
  display: flex;
  gap: 5px;
`;

const WorksheetTemplateViewSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 0;
  border: 1px solid ${COLOR.BORDER_POPUP};
  border-radius: 25px;
  gap: 10px;
`;
const WorksheetTemplateWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 25px;
  background-color: ${({ theme }) => theme?.color?.background || 'initial'};
`;
const WorksheetTemplate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const InsideWorksheetTemplate = styled.div`
  padding: 10px;
  background-color: white;
`;
const CreateButtonWrapper = styled.div`
  padding: 10px 0px;
  display: flex;
  justify-content: flex-end;
`;
