import React, { useState, useEffect, useRef, useMemo } from 'react';

import { useMutation } from '@tanstack/react-query';
import { FaCircle, FaCircleCheck } from 'react-icons/fa6';
import { IoIosArrowBack } from 'react-icons/io';
import { SlPicture } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { VariableSizeList as List } from 'react-window';
import styled from 'styled-components';

import { workbookInstance } from '../../../api/axios';
import { QuizList, WorkbookQuotientData } from '../../../types/WorkbookType';
import { postRefreshToken } from '../../../utils/tokenHandler';
import {
  Input,
  Label,
  Button,
  CheckBox,
  openToastifyAlert,
  AlertBar,
  Select,
} from '../../atom';
import {
  COLOR,
  RedTheme,
  OrangeTheme,
  GreenTheme,
  BlueTheme,
  PurpleTheme,
} from '../../constants';
import { WorkbookMathViewer } from '../../mathViewer';
import { TypeA, TypeB } from '../worksheetType';

export function Step3() {
  const navigate = useNavigate();
  const [getLocalData, setGetLocalData] = useState<any>(null);
  const [getQuotientLocalData, setGetQuotientLocalData] =
    useState<WorkbookQuotientData | null>(null);
  const [initialItems, setInitialItems] = useState<QuizList[]>([]);
  const [newInitialItems, setNewInitialItems] = useState<QuizList[]>();
  const [itemHeights, setItemHeights] = useState<number[]>([]);
  const originalHeightsRef = useRef<number[]>([]);
  const measureRef = useRef<HTMLDivElement>(null);
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isEditWorkbook, setIsEditWorkbook] = useState<number>();
  const [workSheetIdx, setWorkSheetIdx] = useState<number>();

  const [nameValue, setNameValue] = useState('');
  const [gradeValue, setGradeValue] = useState('');
  const [contentAuthor, setContentAuthor] = useState('');
  const [tag, setTag] = useState<string>('');
  const [colorChoice, setColorChoice] = useState('blue');
  const [templateType, setTemplateType] = useState('A');
  const [column, setColumn] = useState<string>('2단');
  const [contentQuantity, setContentQuantity] = useState<string>('최대');
  const [isDate, setIsDate] = useState(false);
  const [isContentTypeTitle, setIsContentTypeTitle] = useState(false);
  const [answerCommentary, setAnswerCommentary] = useState<string | number>(
    '문제만',
  );
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const fetchDataFromStorage = () => {
      const data = localStorage.getItem('sendData');
      const quotientData = localStorage.getItem('sendQuotientData');
      if (data) {
        try {
          const parsedData = JSON.parse(data);
          console.log('parsedData', parsedData);
          const parsedquotientData = JSON.parse(quotientData as string);
          setGetLocalData(parsedData);
          setGetQuotientLocalData(parsedquotientData);
        } catch (error) {
          console.error('로컬 스토리지 데이터 파싱 에러:', error);
        }
      } else {
        console.log('로컬 스토리지에 데이터가 없습니다.');
      }
    };

    fetchDataFromStorage();
  }, []);

  useEffect(() => {
    if (getLocalData) {
      const itemsWithNum = getLocalData.data.map(
        (item: QuizList, index: number) => ({
          ...item,
          num: index + 1,
        }),
      );
      setInitialItems(itemsWithNum);
      setNewInitialItems(itemsWithNum);
      setIsEditWorkbook(getLocalData.isEditWorkbook);
      setWorkSheetIdx(getLocalData.workSheetIdx);
      setNameValue(getLocalData.title);
      setGradeValue(getLocalData.grade);
      setContentAuthor(getLocalData.examiner);
      setTag(getLocalData.tag);
      setColorChoice(getLocalData.color || 'blue');
      setTemplateType(getLocalData.type || 'A');
      setColumn(getLocalData.multiLevel === '1' ? '1단' : '2단');
      setContentQuantity(
        getLocalData.assign === '0' ? '최대' : `${getLocalData.assign}문제`,
      );
      setIsDate(getLocalData.isDate);
      setIsContentTypeTitle(getLocalData.isQuizType);
      setAnswerCommentary(getLocalData.itemType);
    }
  }, [getLocalData]);

  useEffect(() => {
    if (itemHeights.length > 0 && initialItems.length > 0) {
      const itemsWithHeight = initialItems.map(
        (item: QuizList, index: number) => ({
          ...item,
          height: itemHeights[index] || 0,
        }),
      );
      setNewInitialItems(itemsWithHeight);
    }
  }, [itemHeights, initialItems]);

  // useEffect(() => {
  //   const measureHeights = () => {
  //     if (measureRef.current) {
  //       const heights = Array.from(measureRef.current.children).map((child) => {
  //         const childElement = child as HTMLElement;
  //         const height = childElement.offsetHeight;
  //
  //         if (answerCommentary === '문제+해설같이') {
  //           childElement.style.height = '450px';
  //           return 450;
  //         }
  //
  //         if (height > 400) {
  //           childElement.style.height = '400px';
  //           return 400;
  //         }
  //
  //         return height;
  //       });
  //
  //       setItemHeights(heights);
  //       originalHeightsRef.current = heights;
  //     }
  //   };
  //
  //   if (initialItems) {
  //     measureHeights();
  //   }
  useEffect(() => {
    const measureHeights = () => {
      if (measureRef.current) {
        const heights = Array.from(measureRef.current.children).map(
          (child, index) => {
            const childElement = child as HTMLElement;
            const height = childElement.offsetHeight;

            if (answerCommentary === '문제+해설같이') {
              return 450;
            }

            if (height > 400) {
              return 400;
            }

            return height;
          },
        );

        setItemHeights(heights);
        originalHeightsRef.current = heights;
      }
    };
  }, [initialItems, answerCommentary, contentQuantity]);

  const getItemSize = (index: number) => {
    return itemHeights[index] || 0;
  };

  useEffect(() => {
    console.log('Major state changes:', {
      newInitialItems: newInitialItems?.length,
      templateType,
      colorChoice,
      nameValue,
      gradeValue,
      tag,
      contentQuantity,
      isDate,
      isContentTypeTitle,
      answerCommentary,
      column,
    });
  }, [
    newInitialItems,
    templateType,
    colorChoice,
    nameValue,
    gradeValue,
    tag,
    contentQuantity,
    isDate,
    isContentTypeTitle,
    answerCommentary,
    column,
  ]);

  const questionItems =
    initialItems?.flatMap((quizItemList: any) =>
      quizItemList.quizItemList.filter(
        (quizItem: any) => quizItem.type === 'QUESTION',
      ),
    ) ?? [];

  const multipleItems =
    initialItems?.filter(
      (quizCategoryList: any) =>
        quizCategoryList.quizCategory?.문항타입 === '객관식',
    ) ?? [];

  const closeSuccessAlert = () => {
    setIsSuccessAlertOpen(false);
    window.opener.postMessage('popupClosed', '*');
    window.opener.localStorage.clear();
    window.close();
  };

  const goBackMainPopup = () => {
    const data = {
      data: {
        quizList: getLocalData.data,
        isEditWorkbook: isEditWorkbook,
        title: nameValue,
        examiner: contentAuthor,
        grade: gradeValue,
        tag: tag,
      },
    };
    window.opener.localStorage.removeItem('sendEditData');
    window.opener.localStorage.removeItem('sendQuotientData');

    localStorage.setItem('sendData', JSON.stringify(data));
    localStorage.setItem(
      'sendQuotientData',
      JSON.stringify(getQuotientLocalData),
    );
    navigate('/content-create/exam/step2');
  };

  const postNewWorkbook = async () => {
    const data: any = {
      commandCode: isEditWorkbook === 1 ? isEditWorkbook : 0,
      workSheetIdx: isEditWorkbook === 1 ? workSheetIdx : null,
      name: nameValue,
      examiner: contentAuthor,
      grade: gradeValue,
      quizCnt: newInitialItems?.length,
      tag: tag,
      isAutoGrade: true,
      article: {
        type: 'PDF',
        originalName: '',
        storedPath: '/usr/share/nginx/html/CB',
        extension: '.pdf',
      },
      template: {
        color: colorChoice,
        type: templateType,
        multiLevel: column === '1단' ? '1' : '2',
        assign:
          contentQuantity === '최대'
            ? '0'
            : contentQuantity.replace('문제', ''),
        isDate: isDate,
        isQuizType: isContentTypeTitle,
        itemType: answerCommentary,
      },
      quizList: newInitialItems,
    };

    return await workbookInstance.post(`/v1/workbook`, data);
  };

  const { mutate: postNewWorkbookData } = useMutation({
    mutationFn: postNewWorkbook,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: '잠시후 다시 시도해주세요',
      });
      if (context.response.data.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: () => {
      setIsEditWorkbook(0);
      setIsSuccessAlertOpen(true);
      setIsComplete(true);
    },
  });

  const submitCreateWorksheet = () => {
    if (!nameValue || !contentAuthor || !gradeValue || !tag) {
      openToastifyAlert({
        type: 'error',
        text: '필수 항목을 선택해 주세요.',
      });
    } else {
      postNewWorkbookData();
    }
  };

  const renderMeasureContent = () => {
    switch (answerCommentary) {
      case '문제만':
        return (
          <List
            height={400}
            itemCount={questionItems.length + multipleItems.length}
            itemSize={getItemSize}
            width="100%"
            outerRef={measureRef}
          >
            {({ index, style }) => {
              const item =
                index < questionItems.length
                  ? questionItems[index]
                  : multipleItems[
                      index - questionItems.length
                    ]?.quizItemList.find(
                      (quizItem: any) => quizItem.type === 'CHOICES',
                    );

              return (
                <div style={style}>
                  {item && <WorkbookMathViewer data={item.content} />}
                </div>
              );
            }}
          </List>
          // <>
          //   {questionItems.map((quizItem: any, index: number) => (
          //     <div key={index}>
          //       <WorkbookMathViewer data={quizItem.content} />
          //     </div>
          //   ))}
          //   {multipleItems.flatMap((quizItemList: any) =>
          //     quizItemList.quizItemList
          //       .filter((quizItem: any) => quizItem.type === 'CHOICES')
          //       .map((quizItem: any, index: number) => (
          //         <div key={index}>
          //           <WorkbookMathViewer data={quizItem.content} />
          //         </div>
          //       )),
          //   )}
          // </>
        );
      case '정답만':
        return (
          <>
            {initialItems &&
              initialItems.map((quizItemList: any) =>
                quizItemList.quizItemList
                  .filter((quizItem: any) => quizItem.type === 'ANSWER')
                  .map((quizItem: any, index: number) => (
                    <div key={index}>
                      <WorkbookMathViewer data={quizItem.content} />
                    </div>
                  )),
              )}
          </>
        );
      case '문제+해설별도':
        return (
          <>
            {initialItems &&
              initialItems.map((quizItemList: any) =>
                quizItemList.quizItemList
                  .filter((quizItem: any) => quizItem.type === 'QUESTION')
                  .map((quizItem: any, index: number) => (
                    <div key={index}>
                      <WorkbookMathViewer data={quizItem.content} />
                      {multipleItems.map((filteredCategory) =>
                        initialItems.map((innerQuizItemList: any) =>
                          innerQuizItemList.quizItemList
                            .filter(
                              (innerQuizItem: any) =>
                                innerQuizItem.type === 'CHOICES',
                            )
                            .map((innerQuizItem: any, innerIndex: number) => (
                              <div key={innerIndex}>
                                <WorkbookMathViewer
                                  data={innerQuizItem.content}
                                />
                              </div>
                            )),
                        ),
                      )}
                    </div>
                  )),
              )}
          </>
        );
      case '문제+해설같이':
        return (
          <>
            {initialItems &&
              initialItems.map((quizItemList: any) =>
                quizItemList.quizItemList
                  .filter((quizItem: any) => quizItem.type === 'QUESTION')
                  .map((quizItem: any, index: number) => (
                    <div key={index}>
                      <WorkbookMathViewer data={quizItem.content} />
                      {multipleItems.map((filteredCategory) =>
                        initialItems.map((innerQuizItemList: any) =>
                          innerQuizItemList.quizItemList
                            .filter(
                              (innerQuizItem: any) =>
                                innerQuizItem.type === 'CHOICES',
                            )
                            .map((innerQuizItem: any, innerIndex: number) => (
                              <div key={innerIndex}>
                                <WorkbookMathViewer
                                  data={innerQuizItem.content}
                                />
                              </div>
                            )),
                        ),
                      )}
                      {quizItemList.quizItemList
                        .filter(
                          (exampleItem: any) => exampleItem.type === 'EXAMPLE',
                        )
                        .map((exampleItem: any, exampleIndex: number) => (
                          <div key={`example-${index}-${exampleIndex}`}>
                            <WorkbookMathViewer data={exampleItem.content} />
                          </div>
                        ))}
                      {quizItemList.quizItemList
                        .filter(
                          (answerItem: any) => answerItem.type === 'ANSWER',
                        )
                        .map((answerItem: any, answerIndex: number) => (
                          <div key={`answer-${index}-${answerIndex}`}>
                            <WorkbookMathViewer data={answerItem.content} />
                          </div>
                        ))}
                    </div>
                  )),
              )}
          </>
        );
      default:
        return null;
    }
  };

  const renderInputFields = () => {
    return (
      <>
        <InputWrapper>
          <Label
            value="학습지명*"
            fontSize="15px"
            width="120px"
            padding="5px 10px"
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
            onChange={(e) => setNameValue(e.target.value)}
            maxLength={20}
          />
        </InputWrapper>
        <InputWrapper>
          <Label
            value="출제자*"
            fontSize="15px"
            width="120px"
            padding="5px 10px"
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
              const filteredValue = e.target.value.replace(
                /[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣\s]/gi,
                '',
              );
              setContentAuthor(filteredValue);
            }}
            maxLength={10}
          />
        </InputWrapper>
        <InputWrapper>
          <Label
            value="대상 학년*"
            fontSize="15px"
            width="120px"
            padding="5px 10px"
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
            onChange={(e) => setGradeValue(e.target.value)}
            maxLength={10}
          />
        </InputWrapper>
      </>
    );
  };

  const renderTagButtons = () => {
    const tags = [
      { value: 'EXERCISES', label: '연습문제' },
      { value: 'DAILY_TEST', label: '일일TEST' },
      { value: 'PRACTICE_TEST', label: '모의고사' },
      { value: 'TEST_PREP', label: '내신대비' },
      { value: 'MONTHLY_TEST', label: '월말TEST' },
    ];

    return tags.map((tagItem) => (
      <Button
        key={tagItem.value}
        buttonType="button"
        onClick={() => setTag(tagItem.value)}
        $padding="5px"
        height={'35px'}
        width={'80px'}
        fontSize="14px"
        $normal={tag !== tagItem.value}
        $filled={tag === tagItem.value}
        cursor
      >
        <span>{tagItem.label}</span>
      </Button>
    ));
  };

  const renderColorOptions = () => {
    const colors = ['red', 'orange', 'green', 'blue', 'purple'];
    return colors.map((color) =>
      colorChoice === color ? (
        <FaCircleCheck
          key={color}
          color={getColorCode(color)}
          fontSize={20}
          style={{ cursor: 'pointer' }}
          onClick={() => setColorChoice('')}
        />
      ) : (
        <FaCircle
          key={color}
          color={getColorCode(color)}
          fontSize={20}
          style={{ cursor: 'pointer' }}
          onClick={() => setColorChoice(color)}
        />
      ),
    );
  };

  const renderTypeOptions = () => {
    return ['A', 'B'].map((type) => (
      <TypeOption key={type} onClick={() => setTemplateType(type)}>
        <SlPicture color="gray" fontSize={40} />
        {type} Type
      </TypeOption>
    ));
  };

  const renderColumnOption = () => {
    return (
      <ColumnOption>
        <Label
          value="학습지 단*"
          fontSize="15px"
          width="120px"
          padding="5px 10px"
          flexEnd
        />
        <ButtonGroup>
          {['2단', '1단'].map((col) => (
            <Button
              key={col}
              buttonType="button"
              onClick={() => setColumn(col)}
              $padding="5px"
              height={'35px'}
              width={'80px'}
              fontSize="14px"
              $normal={column !== col}
              $filled={column === col}
              cursor
            >
              <span>{col}</span>
            </Button>
          ))}
        </ButtonGroup>
      </ColumnOption>
    );
  };

  const renderContentQuantityOption = () => {
    const options = ['최대', '2문제', '4문제', '6문제'];
    return (
      <ContentQuantity>
        <Label
          value="학습지 배치*"
          fontSize="15px"
          width="120px"
          padding="5px 10px"
          flexEnd
        />
        <ButtonGroup>
          {options.map((option) => (
            <Button
              key={option}
              buttonType="button"
              onClick={() => setContentQuantity(option)}
              $padding="5px"
              height={'35px'}
              width={'80px'}
              fontSize="14px"
              $normal={contentQuantity !== option}
              $filled={contentQuantity === option}
              cursor
            >
              <span>{option}</span>
            </Button>
          ))}
        </ButtonGroup>
      </ContentQuantity>
    );
  };

  const renderContentSpaceOption = () => {
    const selectSpace = [
      {
        idx: 0,
        name: '0줄',
        value: '0',
        options: Array.from({ length: 11 }, (_, i) => ({
          idx: i,
          name: `${i}줄`,
          value: `${i}`,
        })),
      },
    ];

    return (
      <ContentSpace>
        <Label
          value="풀이공간"
          fontSize="15px"
          width="120px"
          padding="5px 10px"
          flexEnd
        />
        {selectSpace.map((el) => (
          <Select
            key={el.idx}
            width={'100px'}
            isnormalizedOptions
            defaultValue={el.name}
            options={el.options}
            heightScroll={'150px'}
            onSelect={(event) => selectListCategoryOption(event)}
          />
        ))}
      </ContentSpace>
    );
  };

  const renderAdditionalInfoOptions = () => {
    return (
      <>
        <CheckBoxWrapper onClick={() => setIsDate(!isDate)}>
          <CheckBox height="15px" isChecked={isDate} />
          날짜 표시
        </CheckBoxWrapper>
        <CheckBoxWrapper
          onClick={() => setIsContentTypeTitle(!isContentTypeTitle)}
        >
          <CheckBox height="15px" isChecked={isContentTypeTitle} />
          문항 유형명 표시
        </CheckBoxWrapper>
      </>
    );
  };

  const renderAnswerCommentaryButtons = () => {
    const options = ['문제만', '정답만', '문제+해설별도', '문제+해설같이'];
    return options.map((option) => (
      <Button
        key={option}
        buttonType="button"
        onClick={() => setAnswerCommentary(option)}
        $padding="5px"
        height={'35px'}
        width={'80px'}
        fontSize="14px"
        $normal={answerCommentary !== option}
        $filled={answerCommentary === option}
        cursor
      >
        <span>{option}</span>
      </Button>
    ));
  };

  // 헬퍼 함수
  const getColorCode = (color: string) => {
    switch (color) {
      case 'red':
        return '#FA8978';
      case 'orange':
        return '#FFDD94';
      case 'green':
        return '#D0E6A5';
      case 'blue':
        return '#86aee3';
      case 'purple':
        return '#CCABD8';
      default:
        return '#000000';
    }
  };

  const selectListCategoryOption = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const newValue = (event.target as HTMLButtonElement)?.innerText;
    const linesMatch = newValue.match(/^(\d+)줄$/);
    if (linesMatch) {
      const lines = parseInt(linesMatch[1], 10);
      setItemHeights(
        originalHeightsRef.current.map((height) => height + 50 * lines),
      );
    }
  };

  const selectedTheme = useMemo(() => {
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
        return BlueTheme;
    }
  }, [colorChoice]);

  return (
    <Container>
      <div>
        <div
          ref={measureRef}
          style={{
            position: 'absolute',
          }}
        >
          {renderMeasureContent()}
        </div>
      </div>
      <AlertBar
        isCloseKor
        type="success"
        isAlertOpen={isSuccessAlertOpen}
        closeAlert={closeSuccessAlert}
        message={'학습지만들기가 완료되었습니다'}
      />
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
          <InputGroup>{renderInputFields()}</InputGroup>
          <WorksheetNameWrapper>
            <Label
              value="학습지 태그*"
              fontSize="15px"
              width="120px"
              padding="5px 10px"
              flexEnd
            />
            <ButtonGroup>{renderTagButtons()}</ButtonGroup>
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
                <ColorOption>{renderColorOptions()}</ColorOption>
              </ColorBox>
              <TypeOptionWrapper>{renderTypeOptions()}</TypeOptionWrapper>
            </TemplateOption>
          </TemplateWrapper>
          <PositionOption>
            {renderColumnOption()}
            {renderContentQuantityOption()}
            {contentQuantity === '최대' && renderContentSpaceOption()}
          </PositionOption>
          <AddInformationWrapper>
            {renderAdditionalInfoOptions()}
          </AddInformationWrapper>
          <AnswerCommentaryWrapper>
            <Label
              value="정답 및 해설"
              fontSize="15px"
              width="120px"
              padding="5px 10px"
              flexEnd
            />
            <ButtonGroup>{renderAnswerCommentaryButtons()}</ButtonGroup>
          </AnswerCommentaryWrapper>
        </WorksheetSettingSection>

        <WorksheetTemplateViewSection>
          <WorksheetTemplateTypeWrapper>
            {(() => {
              console.log('Rendering conditions:', {
                newInitialItems: !!newInitialItems,
                newInitialItemsLength: newInitialItems?.length,
                colorChoice,
                nameValue,
                gradeValue,
                templateType,
              });

              if (
                newInitialItems &&
                newInitialItems.length > 0 &&
                nameValue &&
                nameValue.trim() !== '' &&
                gradeValue &&
                gradeValue.trim() !== ''
              ) {
                const CommonProps = {
                  title: nameValue,
                  grade: gradeValue,
                  tag: tag,
                  assign: contentQuantity,
                  isDate: isDate,
                  isContentTypeTitle: isContentTypeTitle,
                  theme: selectedTheme,
                  initialItems: newInitialItems,
                  answerCommentary: answerCommentary as string,
                  multiLevel: column,
                };

                return templateType === 'A' ? (
                  <TypeA
                    title={nameValue}
                    grade={gradeValue}
                    tag={tag}
                    assign={contentQuantity}
                    isDate={isDate}
                    isContentTypeTitle={isContentTypeTitle}
                    theme={selectedTheme}
                    initialItems={newInitialItems}
                    answerCommentary={answerCommentary as string}
                    multiLevel={column}
                  />
                ) : (
                  <TypeB
                    title={nameValue}
                    grade={gradeValue}
                    tag={tag}
                    assign={contentQuantity}
                    isDate={isDate}
                    isContentTypeTitle={isContentTypeTitle}
                    theme={selectedTheme}
                    initialItems={newInitialItems}
                    answerCommentary={answerCommentary as string}
                    multiLevel={column}
                  />
                );
              } else {
                return <div>Loading preview...</div>;
              }
            })()}
          </WorksheetTemplateTypeWrapper>
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

// 스타일 컴포넌트 정의
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

const WorksheetSettingSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 0 35%;
  border: 1px solid ${COLOR.BORDER_POPUP};
  border-radius: 25px;
  padding: 20px;
`;

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
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
  &:hover {
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
  &:hover {
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
`;

const ContentQuantity = styled.div`
  display: flex;
`;

const ContentSpace = styled.div`
  display: flex;
`;

const AddInformationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  gap: 2px;
  padding-right: 10px;
  cursor: pointer;
`;

const WorksheetTemplateViewSection = styled.div`
  max-height: 760px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 55%;
  border: 1px solid ${COLOR.BORDER_POPUP};
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  gap: 10px;
`;

const WorksheetTemplateTypeWrapper = styled.div`
  max-height: 751px;
  overflow-y: auto;
`;

const CreateButtonWrapper = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

export {
  Container,
  TitleWrapper,
  IconWrapper,
  Title,
  FrontSpan,
  Span,
  Wrapper,
  WorksheetSettingSection,
  InputGroup,
  InputWrapper,
  WorksheetNameWrapper,
  AnswerCommentaryWrapper,
  ButtonGroup,
  TemplateWrapper,
  TemplateOption,
  ColorBox,
  ColorOption,
  TypeOptionWrapper,
  TypeOption,
  PositionOption,
  ColumnOption,
  ContentQuantity,
  ContentSpace,
  AddInformationWrapper,
  CheckBoxWrapper,
  WorksheetTemplateViewSection,
  WorksheetTemplateTypeWrapper,
  CreateButtonWrapper,
};
