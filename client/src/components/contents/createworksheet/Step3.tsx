import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaCircle } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';
import { IoIosArrowBack } from 'react-icons/io';
import { MdAccountBalance } from 'react-icons/md';
import { SlPicture } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import { makingworkbookInstance } from '../../../api/axios';
import Contents2 from '../../../components/mathViewer/test2.json';
import Contents3 from '../../../components/mathViewer/test3.json';
import Contents4 from '../../../components/mathViewer/test4.json';
import { useModal } from '../../../hooks';
import { ItemQuestionType } from '../../../types';
import { Input, Label, Button, CheckBox } from '../../atom';
import { COLOR } from '../../constants';
import {
  RedTheme,
  OrangeTheme,
  GreenTheme,
  BlueTheme,
  PurpleTheme,
} from '../../constants/THEME';
import { MathViewer } from '../../mathViewer/MathViewer';
import { TypeA, TypeB } from '../worksheetType';
//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export function Step3() {
  const [didMount, setDidMount] = useState(false);
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const [nameValue, setNameValue] = useState('');
  const [gradeValue, setGradeValue] = useState('');
  const [contentAuthor, setContentAuthor] = useState('');

  const [tag, setTag] = useState<string>('');

  const selectTag = (newValue: string) => {
    setTag(newValue);
  };

  const [answerCommentary, setAnswerCommentary] = useState<string>('');

  const selectAnswerCommentary = (newValue: string) => {
    setAnswerCommentary(newValue);
  };

  const [colorChoice, setColorChoice] = useState('');

  const selectedTheme = (() => {
    switch (colorChoice) {
      case 'blue':
        return BlueTheme;
      case 'green':
        return GreenTheme;
      case 'orange':
        return OrangeTheme;
      case 'red':
        return RedTheme;
      case 'purple':
        return PurpleTheme;
      default:
        return {}; // 기본값
    }
  })();

  const [templateType, setTemplateType] = useState('A');
  const selectTemplateType = (newValue: string) => {
    setTemplateType(newValue);
  };

  const [column, setColumn] = useState<string>('2단');

  const selectColumn = (newValue: string) => {
    setColumn(newValue);
  };

  const [contentQuantity, setContentQuantity] = useState<string>('최대');

  const selectContentQuantity = (newValue: string) => {
    setContentQuantity(newValue);
  };
  const [isWeather, setIsWeather] = useState(false);
  const selectWeather = () => {
    setIsWeather(!isWeather);
  };
  const [isContentTypeTitle, setIsContentTypeTitle] = useState(false);
  const selectContentTypeTitle = () => {
    setIsContentTypeTitle(!isContentTypeTitle);
  };

  const goBackMainPopup = () => {
    navigate('/content-create/exam/step2');
  };

  //오른쪽 템플릿 부분
  // 더미 데이터
  const list = [
    Contents2,
    Contents3,
    Contents4,
    Contents4,
    Contents3,
    Contents2,
  ];
  const [heightList, setHeightList] = useState<number[]>([]);
  const [colList, setColList] = useState<ItemQuestionType[]>([]);
  const [colList2, setColList2] = useState<ItemQuestionType[]>([]);
  const [existList, setExistList] = useState<ItemQuestionType[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [done, setDone] = useState<boolean>(false);
  const [doneAgain, setDoneAgain] = useState<boolean>(false);
  const doneButton = () => {
    setDone(true);
  };

  const cardHeight = () => {
    const rowDiv = document.querySelectorAll('.row'); //문항 요소
    //문항 요소들의 높이값
    const rowHeightArr: number[] = [];

    for (let i = 0; i < rowDiv.length; i++) {
      const rowElement = rowDiv[i];
      if (rowElement) {
        const rowHeight = rowElement.clientHeight; // clientHeight 얻기
        if (rowHeight !== null && rowHeight !== undefined) {
          rowHeightArr.push(rowHeight);
          //console.log(rowHeight);
          //console.log(rowHeightArr);
        }
      }
    }

    setHeightList(rowHeightArr);
    setDoneAgain(true);
    //console.log('rowHeightArr', rowHeightArr);
    //console.log('doneagain', doneAgain);

    if (doneAgain) {
      let total: number = 0;
      const sortList: ItemQuestionType[] = [] || null;
      const existList: ItemQuestionType[] = [] || null;
      //console.log('rowHeightArr', rowHeightArr);
      for (let i = 0; i < rowHeightArr.length; i++) {
        //console.log('rowHeightArr', rowHeightArr);
        //const printDivHeight = printDivRef.current?.clientHeight; // pdf 인쇄 높이
        const num = (total += rowHeightArr[i]); // 문항의 누적 높이
        //console.log(num);
        //console.log(750 / 2 - 150);
        //console.log(750 / 2 - 150 > num);
        if (900 / 2 - 150 < num) {
          sortList.push(list[i]);
          //console.log('작동함');
        } else {
          existList.push(list[i]);
        }
      }
      //console.log('sortList', sortList);
      setColList2(sortList);
      //console.log('existList', existList);
      setExistList(existList);
    } else {
      //console.error('Element not found.');
    }
  };
  //console.log('heightList', heightList);

  // const getHeight = () => {
  //   // 문항의 높이 합이 A4_HEIGHT 를 넘을 때
  //   let total: number = 0;
  //   const sortList: ItemQuestionType[] = [] || null;
  //   const existList: ItemQuestionType[] = [] || null;
  //   console.log('heightList', heightList);
  //   for (let i = 0; i < heightList.length; i++) {
  //     // const printDivHeight = printDivRef.current?.clientHeight; // pdf 인쇄 높이
  //     const num = (total += heightList[i]); // 문항의 누적 높이
  //     console.log(num);
  //     console.log(750 / 2 - 150);
  //     console.log(750 / 2 - 150 > num);
  //     if (750 / 2 - 150 < num) {
  //       sortList.push(list[i]);
  //       console.log('작동함');
  //     } else {
  //       existList.push(list[i]);
  //     }
  //   }

  //   console.log('sortList', sortList);
  //   setColList2(sortList);
  //   console.log('existList', existList);
  //   setExistList(existList);
  // };
  // 210.124.177.36:5050'
  // localhost:5000

  // 학습지 만들기 api
  const postWorkbook = async (data: any) => {
    const res = await makingworkbookInstance.post(`/get-pdf`, data);
    console.log(`학습지 만들기결과값`, res);
    return res;
  };

  const makingWorkbook = () => {
    const data = {
      title: 'test1',
      content: Contents2.it_quest,
      column: 2,
      uploadDir: '/usr/share/nginx/html/CB',
      fileName: 'worksheettest.pdf',
    };
    workbookData(data);
  };

  const { mutate: workbookData } = useMutation({
    mutationFn: postWorkbook,
    onError: (error) => {
      console.error('post-workbook 에러:', error);
      // 에러 처리 로직 추가
    },
    onSuccess: (data) => {
      console.log('post-workbook 성공:', data);
      //setIsWorkingFavorite(!isWorkingFavorite);
      // 성공 처리 로직 추가
    },
  });

  const [pdfData, setPdfData] = useState<string | undefined>(undefined);
  const getPdf = async () => {
    try {
      const response = await axios.post(
        'http://210.124.177.36:5050/api-node-service/get-pdf',
        //`http://${process.env.REACT_APP_AXIOS_BASE_URL}/api-node-service/get-pdf`,
        {
          title: 'test',
          content: Contents2.it_quest,
          column: 2,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer', // 서버로부터 바이너리 데이터로 응답 받기
          withCredentials: true, // CORS 요청에 자격 증명 정보를 포함하도록 설정
        },
      );
      //window.close();
      // if (response.status === 200) {
      //   const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      //   const pdfUrl = URL.createObjectURL(pdfBlob);
      //   console.log(pdfUrl);
      //   setPdfData(pdfUrl);
      // } else {
      //   console.error('Server responded with an error');
      // }
    } catch (error) {
      console.error('Failed to fetch PDF data:', error);
    }
  };

  const submitCreateWorksheet = () => {
    //node 서버에서 pdf 생성
    makingWorkbook();
    //getPdf();
    //pdf 생성 후 데이터와 pdf경로/파일명을 서버로 보내기
  };

  const loadData = () => {
    // 데이터 불러오기

    // 리스트 초기화
    setColList(list);
    console.log(colList);
  };

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (done) {
      loadData();
    }
  }, [done]);
  //console.log(done);
  //didMount 아직 안씀
  useEffect(() => {
    if (colList) {
      cardHeight();
    }
  }, [colList]);

  // useEffect(() => {
  //   if (colList && doneAgain && colList.length > 0) {
  //     console.log('이거는 작동함?');
  //     getHeight();
  //   }
  // }, [colList, doneAgain]);

  return (
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
            <FrontSpan onClick={goBackMainPopup}>STEP 2 -</FrontSpan>
            STEP 3
          </Span>
          학습지 상세 편집
        </Title>
      </TitleWrapper>
      <Wrapper>
        <WorksheetSettingSection>
          <InputGroup>
            <InputWrapper>
              <Label
                value="학습지명*"
                fontSize="15px"
                width="120px"
                padding="5px 10px"
                flexEnd
              />
              <Input
                width="400px"
                height="35px"
                padding="10px"
                border="normal"
                placeholderSize="14px"
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
              <Label
                value="출제자*"
                fontSize="15px"
                width="120px"
                padding="5px 10px"
                flexEnd
              />
              <Input
                width="400px"
                height="35px"
                padding="10px"
                border="normal"
                placeholderSize="14px"
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
              <Label
                value="대상 학년*"
                fontSize="15px"
                width="120px"
                padding="5px 10px"
                flexEnd
              />
              <Input
                width="400px"
                height="35px"
                padding="10px"
                border="normal"
                placeholderSize="14px"
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
            <Label
              value="학습지 태그*"
              fontSize="15px"
              width="120px"
              padding="5px 10px"
              flexEnd
            />
            <ButtonGroup>
              <Button
                buttonType="button"
                onClick={() => {
                  selectTag('연습문제');
                }}
                $padding="5px"
                height={'35px'}
                width={'70px'}
                fontSize="14px"
                $normal={tag !== '연습문제'}
                $filled={tag === '연습문제'}
                cursor
              >
                <span>연습문제</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectTag('일일TEST');
                }}
                $padding="5px"
                height={'35px'}
                width={'80px'}
                fontSize="14px"
                $normal={tag !== '일일TEST'}
                $filled={tag === '일일TEST'}
                cursor
              >
                <span>일일TEST</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectTag('모의고사');
                }}
                $padding="5px"
                height={'35px'}
                width={'70px'}
                fontSize="14px"
                $normal={tag !== '모의고사'}
                $filled={tag === '모의고사'}
                cursor
              >
                <span>모의고사</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectTag('내신대비');
                }}
                $padding="5px"
                height={'35px'}
                width={'70px'}
                fontSize="14px"
                $normal={tag !== '내신대비'}
                $filled={tag === '내신대비'}
                cursor
              >
                <span>내신대비</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectTag('월말TEST');
                }}
                $padding="5px"
                height={'35px'}
                width={'80px'}
                fontSize="14px"
                $normal={tag !== '월말TEST'}
                $filled={tag === '월말TEST'}
                cursor
              >
                <span>월말TEST</span>
              </Button>
            </ButtonGroup>
          </WorksheetNameWrapper>
          <TemplateWrapper>
            <Label
              value="학습지 템플릿*"
              fontSize="15px"
              width="130px"
              padding="5px 10px"
              flexEnd
            />
            <TemplateOption>
              <ColorBox>
                <ColorOption>
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
                  {colorChoice == 'green' ? (
                    <FaCircleCheck
                      color="#D0E6A5"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('')}
                    />
                  ) : (
                    <FaCircle
                      color="#D0E6A5"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('green')}
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
                  {colorChoice == 'red' ? (
                    <FaCircleCheck
                      color="#FA8978"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('')}
                    />
                  ) : (
                    <FaCircle
                      color="#FA8978"
                      fontSize={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setColorChoice('red')}
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
                </ColorOption>
              </ColorBox>
              <TypeOptionWrapper>
                <TypeOption
                  onClick={() => {
                    selectTemplateType('A');
                  }}
                >
                  <SlPicture color="gray" fontSize={40} />A Type
                </TypeOption>
                <TypeOption
                  onClick={() => {
                    selectTemplateType('B');
                  }}
                >
                  <SlPicture color="gray" fontSize={40} />B Type
                </TypeOption>
              </TypeOptionWrapper>
            </TemplateOption>
          </TemplateWrapper>
          <PositionOption>
            <ColumnOption>
              <Label
                value="학습지 단*"
                fontSize="15px"
                width="120px"
                padding="5px 10px"
                flexEnd
              />
              <ButtonGroup>
                <Button
                  buttonType="button"
                  onClick={() => {
                    selectColumn('2단');
                  }}
                  $padding="5px"
                  height={'35px'}
                  width={'80px'}
                  fontSize="14px"
                  $normal={column !== '2단'}
                  $filled={column === '2단'}
                  cursor
                >
                  <span>2단</span>
                </Button>
                <Button
                  buttonType="button"
                  onClick={() => {
                    selectColumn('1단');
                  }}
                  $padding="5px"
                  height={'35px'}
                  width={'80px'}
                  fontSize="14px"
                  $normal={column !== '1단'}
                  $filled={column === '1단'}
                  cursor
                >
                  <span>1단</span>
                </Button>
              </ButtonGroup>
            </ColumnOption>
            <ContentQuantity>
              <Label
                value="학습지 배치*"
                fontSize="15px"
                width="120px"
                padding="5px 10px"
                flexEnd
              />
              <ButtonGroup>
                <Button
                  buttonType="button"
                  onClick={() => {
                    selectContentQuantity('최대');
                  }}
                  $padding="5px"
                  height={'35px'}
                  width={'80px'}
                  fontSize="14px"
                  $normal={contentQuantity !== '최대'}
                  $filled={contentQuantity === '최대'}
                  cursor
                >
                  <span>최대</span>
                </Button>
                <Button
                  buttonType="button"
                  onClick={() => {
                    selectContentQuantity('2문제');
                  }}
                  $padding="5px"
                  height={'35px'}
                  width={'80px'}
                  fontSize="14px"
                  $normal={contentQuantity !== '2문제'}
                  $filled={contentQuantity === '2문제'}
                  cursor
                >
                  <span>2문제</span>
                </Button>
                <Button
                  buttonType="button"
                  onClick={() => {
                    selectContentQuantity('4문제');
                  }}
                  $padding="5px"
                  height={'35px'}
                  width={'80px'}
                  fontSize="14px"
                  $normal={contentQuantity !== '4문제'}
                  $filled={contentQuantity === '4문제'}
                  cursor
                >
                  <span>4문제</span>
                </Button>
                <Button
                  buttonType="button"
                  onClick={() => {
                    selectContentQuantity('6문제');
                  }}
                  $padding="5px"
                  height={'35px'}
                  width={'80px'}
                  fontSize="14px"
                  $normal={contentQuantity !== '6문제'}
                  $filled={contentQuantity === '6문제'}
                  cursor
                >
                  <span>6문제</span>
                </Button>
              </ButtonGroup>
            </ContentQuantity>
          </PositionOption>
          <AddInformationWrapper>
            <Label
              value="추가 정보 표기"
              fontSize="14px"
              width="120px"
              padding="5px 10px"
              flexEnd
            />
            <CheckBoxWrapper>
              <CheckBox
                height="15px"
                isChecked={isWeather}
                onClick={selectWeather}
              />
              날짜 표시
            </CheckBoxWrapper>
            <CheckBoxWrapper>
              <CheckBox
                height="15px"
                isChecked={isContentTypeTitle}
                onClick={selectContentTypeTitle}
              />
              문항 유형명 표시
            </CheckBoxWrapper>
          </AddInformationWrapper>
          <AnswerCommentaryWrapper>
            <Label
              value="정답 및 해설"
              fontSize="15px"
              width="120px"
              padding="5px 10px"
              flexEnd
            />
            <ButtonGroup>
              <Button
                buttonType="button"
                onClick={() => {
                  selectAnswerCommentary('문제만');
                }}
                $padding="5px"
                height={'35px'}
                width={'80px'}
                fontSize="14px"
                $normal={answerCommentary !== '문제만'}
                $filled={answerCommentary === '문제만'}
                cursor
              >
                <span>문제만</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectAnswerCommentary('정답만');
                }}
                $padding="5px"
                height={'35px'}
                width={'80px'}
                fontSize="14px"
                $normal={answerCommentary !== '정답만'}
                $filled={answerCommentary === '정답만'}
                cursor
              >
                <span>정답만</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectAnswerCommentary('문제+해설별도');
                }}
                $padding="5px"
                height={'35px'}
                width={'80px'}
                fontSize="14px"
                $normal={answerCommentary !== '문제+해설별도'}
                $filled={answerCommentary === '문제+해설별도'}
                cursor
              >
                <span>문제+해설(별도)</span>
              </Button>
              <Button
                buttonType="button"
                onClick={() => {
                  selectAnswerCommentary('문제+해설같이');
                }}
                $padding="5px"
                height={'35px'}
                width={'80px'}
                fontSize="14px"
                $normal={answerCommentary !== '문제+해설같이'}
                $filled={answerCommentary === '문제+해설같이'}
                cursor
              >
                <span>문제+해설(같이)</span>
              </Button>
              <button onClick={doneButton}>버튼</button>
            </ButtonGroup>
          </AnswerCommentaryWrapper>
        </WorksheetSettingSection>
        <WorksheetTemplateViewSection>
          {templateType === 'A' && (
            <TypeA
              title={nameValue}
              grade={gradeValue}
              tag={tag}
              contentQuantity={contentQuantity}
              isWeather={isWeather}
              isContentTypeTitle={isContentTypeTitle}
              theme={selectedTheme}
            ></TypeA>
          )}
          {templateType === 'B' && (
            <TypeB
              title={nameValue}
              grade={gradeValue}
              tag={tag}
              contentQuantity={contentQuantity}
              isWeather={isWeather}
              isContentTypeTitle={isContentTypeTitle}
              theme={selectedTheme}
            ></TypeB>
          )}
          {/* <ThemeProvider theme={selectedTheme}>
            <WorksheetTemplateWrapper>
              <Label value={'미리보기'}></Label>
              <WorksheetTemplate>
                <MathViewerHeader>
                  <HeaderLeft>
                    <TemplateTitleWrapper>
                      <TemplateTitle>
                        <span className="tag">기본</span>
                        <span className="grade">중1-1</span>
                      </TemplateTitle>
                      <p className="subTitle">소인수분해</p>
                    </TemplateTitleWrapper>
                    <Description>50문항 | 콘텐츠뱅츠</Description>
                  </HeaderLeft>
                  <HeaderRight>
                    <ImageWrapper>
                      <MdAccountBalance style={{ fontSize: '60px' }} />
                    </ImageWrapper>
                    <TemplateInputWrapper>
                      <Description>2024.01.16 이름</Description>
                      <Input
                        type={'text'}
                        width="100px"
                        border="black"
                        height="20px"
                      />
                    </TemplateInputWrapper>
                  </HeaderRight>
                </MathViewerHeader>
                <MathViewerListWrapper>
                  {existList && existList.length > 1 ? (
                    <MathViewerList ref={containerRef}>
                      {existList.map((card, i) => (
                        <div
                          key={card.it_quest + i}
                          //width={cardWidth}
                          // onLoad={(e) => {
                          //   getItemHeight(e);
                          // }}
                          className="row"
                        >
                          문제 left{i + 1}.
                          <MathViewer
                            key={i}
                            data={card}
                            padding={`10px 15px 30px 0`}
                            //width={cardWidth}
                            //height="150"
                          ></MathViewer>
                        </div>
                      ))}
                    </MathViewerList>
                  ) : (
                    <MathViewerList ref={containerRef}>
                      {colList.map((card, i) => (
                        <div
                          key={card.it_quest + i}
                          //width={cardWidth}
                          // onLoad={(e) => {
                          //   getItemHeight(e);
                          // }}
                          className="row"
                        >
                          문제{i + 1}.
                          <MathViewer
                            key={i}
                            data={card}
                            padding={`10px 15px 30px 0`}
                            //width={cardWidth}
                            //height="150"
                          ></MathViewer>
                        </div>
                      ))}
                    </MathViewerList>
                  )}
                  {colList2.length > 1 && (
                    <MathViewerList ref={containerRef}>
                      {colList2.map((card, i) => (
                        <div
                          key={card.it_quest + i}
                          //width={cardWidth}
                          // onLoad={(e) => {
                          //   getItemHeight(e);
                          // }}
                          className="row"
                        >
                          문제right {i + 1 + 3}.
                          <MathViewer
                            key={i}
                            data={card}
                            padding={`10px 15px 30px 0`}
                            //width={cardWidth}
                            //height="150"
                          ></MathViewer>
                        </div>
                      ))}
                    </MathViewerList>
                  )}
                </MathViewerListWrapper>
              </WorksheetTemplate>
            </WorksheetTemplateWrapper>
          </ThemeProvider> */}
        </WorksheetTemplateViewSection>
      </Wrapper>
      <CreateButtonWrapper>
        <Button
          buttonType="button"
          onClick={submitCreateWorksheet}
          $padding="10px"
          height={'35px'}
          width={'120px'}
          fontSize="13px"
          $filled
          cursor
        >
          <span>학습지 만들기</span>
        </Button>
      </CreateButtonWrapper>
    </Container>
  );
}

const Container = styled.div``;
const TitleWrapper = styled.div`
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  font-size: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1 0 0;
  padding-left: 10px;
`;
const FrontSpan = styled.span`
  color: ${COLOR.BORDER_BLUE};
  font-size: 20px;
  cursor: pointer;
`;
const Span = styled.span`
  color: #1976d2;
  padding-right: 10px;
`;
const Wrapper = styled.div`
  height: 753px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;
// 왼쪽 section
const WorksheetSettingSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 0 35%;
  border: 1px solid ${COLOR.BORDER_POPUP};
  border-radius: 25px;
  padding: 20px;
  //gap: 30px;
`;
const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;
const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const WorksheetNameWrapper = styled.div`
  display: flex;
`;
const AnswerCommentaryWrapper = styled.div`
  display: flex;
`;
const ButtonGroup = styled.div`
  width: 400px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;
const TemplateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const TemplateOption = styled.div`
  display: flex;
`;
const ColorBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;
const ColorOption = styled.div`
  display: flex;
  gap: 2px;
  :hover {
    border: 1px solid ${COLOR.HOVER};
    border-radius: 10px;
  }
`;
const TypeOptionWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
`;
const TypeOption = styled.div`
  width: 180px;
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
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const ColumnOption = styled.div`
  display: flex;
  padding-right: 10px;
  //gap: 5px;
`;
const ContentQuantity = styled.div`
  display: flex;
  //gap: 5px;
`;
const AddInformationWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const CheckBoxWrapper = styled.div`
  display: flex;
  gap: 2px;
  padding-right: 10px;
`;
const WorksheetTemplateViewSection = styled.section`
  /* width: 900px;
  height: 751px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 55%;
  border: 1px solid ${COLOR.BORDER_POPUP};
  border-radius: 25px;
  gap: 10px;
`;
const WorksheetTemplateWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 25px;
  //background-color: black;
  //background-color: ${({ theme }) => theme?.color?.background || 'initial'};
`;
const WorksheetTemplate = styled.div`
  //background-color: black;
  //background-color: white;
  //display: flex;
  //flex-direction: column;
  //align-items: center;
  //justify-content: center;
  //height: 100%;
`;
const MathViewerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 150px;
  padding: 20px;
  border-bottom: 1px solid ${COLOR.BORDER_BLUE};
`;
const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //padding: 20px 10px 10px 20px;
`;
const TemplateTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  .subTitle {
    color: ${COLOR.TEXT_GRAY};
    font-weight: 600;
  }
`;
const TemplateTitle = styled.div`
  display: flex;
  gap: 5px;
  font-size: 25px;
  font-weight: 800;
  .tag {
    color: ${COLOR.SECONDARY};
  }
`;
const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  //flex: 1 0 0;
  justify-content: space-between;
  align-items: flex-start;
  //padding: 20px 10px 10px 20px;
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TemplateInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;
const Description = styled.div`
  font-weight: 800;
`;
const MathViewerListWrapper = styled.div`
  height: 600px;
  display: flex;
  justify-content: space-evenly;
  overflow: auto;
`;
const MathViewerList = styled.div`
  padding: 15px;
  width: ${900 / 2 - 30}px;
  display: flex;
  flex-direction: column;

  /* .row {
    display: flex;
    flex-wrap: wrap;
    //justify-content: space-between;
    flex-direction: column;
  } */
`;
const MathViewerWrapper = styled.div<{ width: string }>`
  min-height: 71px;
  width: ${({ width }) => (width ? ` ${width};` : '100%')};
`;

const InsideWorksheetTemplate = styled.div`
  padding: 10px;
  background-color: white;
`;
const CreateButtonWrapper = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
`;
