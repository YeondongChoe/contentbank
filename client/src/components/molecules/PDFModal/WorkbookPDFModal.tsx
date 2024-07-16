import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { SlOptionsVertical, SlPrinter } from 'react-icons/sl';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactToPrint from 'react-to-print';
import { styled, ThemeProvider } from 'styled-components';

import { quizService, workbookInstance } from '../../../api/axios';
import { Label, Icon, IconButton, ValueNone } from '../../../components/atom';
import { WorkbookMathViewer, MathViewer } from '../../../components/mathViewer';
import { ItemQuestionType, QuizListType } from '../../../types';
import { QuizList, TemplateList } from '../../../types/WorkbookType';
import { A4_HEIGHT, A4_WIDTH, COLOR } from '../../constants';
import {
  RedTheme,
  OrangeTheme,
  GreenTheme,
  BlueTheme,
  PurpleTheme,
} from '../../constants/THEME';

import { makePdf } from './makePDF';

type PDFModalProps = {
  idx: number;
  list?: any[];
};

type PageType = { leftArray: QuizList[]; rightArray: QuizList[] }[];

export function WorkbookPDFModal({ idx, list }: PDFModalProps) {
  const [sortedList, setSortedList] = useState<QuizListType[]>();
  const pdf = makePdf();
  const printDivRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  // const getQuiz = async () => {
  //   if (list) {
  //     const idxArray = list.map((list) => list.idx);
  //     const idxList = idxArray.join(',');
  //     const res = await quizService.get(`/v1/quiz/${idxList}`);
  //     return res.data.data;
  //   }
  //   // console.log('list data----------', res);
  // };
  // const {
  //   data: quizData,
  //   isLoading,
  //   error: quizDataError,
  //   refetch: quizDataRefetch,
  // } = useQuery({
  //   queryKey: ['get-idx-quizList'],
  //   queryFn: getQuiz,
  //   meta: {
  //     errorMessage: 'get-idx-quizList 에러 메세지',
  //   },
  // });

  // useEffect(() => {
  //   if (quizData) setSortedList(quizData.quizList);
  // }, [quizData]);

  // // const printPDF = async () => {
  // //   await pdf.viewWithPdf();
  // // };

  // useEffect(() => {
  //   console.log('sortedList', sortedList);
  // }, [sortedList]);
  const [workbookIndex, setWorkbookIndex] = useState<number>();
  const [initialItems, setInitialItems] = useState<QuizList[]>([]);
  const [nameValue, setNameValue] = useState('');
  const [gradeValue, setGradeValue] = useState('');
  const [contentAuthor, setContentAuthor] = useState('');
  const [tag, setTag] = useState<string>('');
  const [templateList, setTemplateList] = useState<TemplateList[]>([]);
  const [color, setColor] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [multiLevel, setMultiLevel] = useState<string>('');
  const [assign, setAssign] = useState<string>('');
  const [isDate, setIsDate] = useState<boolean>(false);
  const [isQuizType, setIsQuizType] = useState<boolean>(false);
  const [itemType, setItemType] = useState<number>();
  console.log(assign);
  console.log(multiLevel);

  const getWorkbookData = async () => {
    const res = await workbookInstance.get(
      `/v1/workbook/detail/${workbookIndex}`,
    );
    // console.log(`getWorkbook 결과값`, res);
    return res;
  };

  const { data: workbookData, isLoading: isWorkbookLoading } = useQuery({
    queryKey: ['get-workbookData'],
    queryFn: getWorkbookData,
    meta: {
      errorMessage: 'get-workbookData 에러 메세지',
    },
    enabled: !!workbookIndex,
  });

  useEffect(() => {
    if (idx) {
      setWorkbookIndex(idx);
    }
  }, [idx]);

  useEffect(() => {
    if (workbookData) {
      setInitialItems(workbookData?.data.data.quizList);
      setNameValue(workbookData?.data.data.name);
      setGradeValue(workbookData?.data.data.grade);
      setContentAuthor(workbookData?.data.data.examiner);
      setTag(workbookData?.data.data.tag);
      setTemplateList(workbookData?.data.data.templateList);
    }
  }, [workbookData]);

  useEffect(() => {
    if (templateList) {
      setColor(templateList[0]?.color);
      setType(templateList[0]?.type);
      setMultiLevel(templateList[0]?.multiLevel);
      setAssign(templateList[0]?.assign);
      setIsDate(templateList[0]?.isDate);
      setIsQuizType(templateList[0]?.isQuizType);
      setItemType(templateList[0]?.itemType);
    }
  }, [templateList]);

  const selectedTheme = (() => {
    switch (color) {
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
        return BlueTheme; // 기본값
    }
  })();

  const distributeItemsToPages = (
    items: QuizList[],
    multiLevel: string,
    assign: string,
  ): PageType => {
    const pages: PageType = [];
    let currentPage: { leftArray: QuizList[]; rightArray: QuizList[] } = {
      leftArray: [],
      rightArray: [],
    };

    let leftHeight = 0;
    let rightHeight = 0;
    let leftMaxItems = 0;
    let rightMaxItems = 0;

    // assign 값에 따라 최대 아이템 수 설정
    if (multiLevel === '2') {
      switch (assign) {
        case '0':
          leftMaxItems = Infinity;
          rightMaxItems = Infinity;
          break;
        case '2':
          leftMaxItems = 1;
          rightMaxItems = 1;
          break;
        case '4':
          leftMaxItems = 2;
          rightMaxItems = 2;
          break;
        case '8':
          leftMaxItems = 4;
          rightMaxItems = 4;
          break;
        default:
          leftMaxItems = Infinity; // Default behavior, unlimited items
          rightMaxItems = Infinity;
          break;
      }
    } else if (multiLevel === '1') {
      switch (assign) {
        case '0':
          leftMaxItems = Infinity;
          rightMaxItems = 0;
          break;
        case '2':
          leftMaxItems = 2;
          rightMaxItems = 0;
          break;
        case '4':
          leftMaxItems = 4;
          rightMaxItems = 0;
          break;
        case '8':
          leftMaxItems = 8;
          rightMaxItems = 0;
          break;
        default:
          leftMaxItems = Infinity; // Default behavior, unlimited items
          rightMaxItems = 0;
          break;
      }
    }

    let leftItemCount = 0;
    let rightItemCount = 0;

    items.forEach((item) => {
      if (leftItemCount < leftMaxItems && leftHeight + item.height <= 1400) {
        currentPage.leftArray.push(item);
        leftHeight += item.height;
        leftItemCount++;
      } else if (
        rightItemCount < rightMaxItems &&
        rightHeight + item.height <= 1400
      ) {
        currentPage.rightArray.push(item);
        rightHeight += item.height;
        rightItemCount++;
      } else {
        // 새로운 페이지를 시작
        pages.push(currentPage);
        currentPage = { leftArray: [], rightArray: [] };
        leftHeight = 0;
        rightHeight = 0;
        leftItemCount = 0;
        rightItemCount = 0;

        // 다시 분배
        if (leftItemCount < leftMaxItems && item.height <= 1400) {
          currentPage.leftArray.push(item);
          leftHeight += item.height;
          leftItemCount++;
        } else if (rightItemCount < rightMaxItems && item.height <= 2800) {
          currentPage.rightArray.push(item);
          rightHeight += item.height;
          rightItemCount++;
        }
      }
    });

    // 마지막 페이지 추가
    if (currentPage.leftArray.length > 0 || currentPage.rightArray.length > 0) {
      pages.push(currentPage);
    }

    return pages;
  };

  const pages = distributeItemsToPages(initialItems, multiLevel, assign);
  console.log(pages);

  return (
    <>
      <IconButtonWrapper>
        <ReactToPrint
          trigger={() => (
            <SlPrinter style={{ fontSize: '20px', cursor: 'pointer' }} />
          )}
          content={() => printDivRef.current}
        />
      </IconButtonWrapper>

      <Component>
        <ScrollWrapper>
          <PerfectScrollbar>
            <ContentsWrapper ref={printDivRef}>
              {pages.map((page, i) => (
                <PrintStyles key={`${i} pdf list`}>
                  <MathViewerList className="A4_paper" ref={containerRef}>
                    <PrintBox>
                      <ThemeProvider theme={selectedTheme}>
                        <WorksheetHeader>
                          <NoneColorTextWrapper>
                            <div className="grade">
                              <Label
                                value={(gradeValue as string) || '대상 학년'}
                                padding="0px"
                                fontSize="12px"
                              />
                            </div>
                          </NoneColorTextWrapper>
                          <ColorTextWrapper>
                            <div className="Title">
                              <Label
                                value={(nameValue as string) || '학습지명'}
                                fontSize="24px"
                                bold
                              />
                            </div>
                            <div className="Tag">
                              <Label
                                value={
                                  (tag === 'EXERCISES'
                                    ? '연습문제'
                                    : tag === 'DAILY_TEST'
                                      ? '일일TEST'
                                      : tag === 'PRACTICE_TEST'
                                        ? '모의고사'
                                        : tag === 'TEST_PREP'
                                          ? '내신대비'
                                          : tag === 'MONTHLY_TEST'
                                            ? '월말TEST'
                                            : ('' as string)) || '학습지 태그'
                                }
                                fontSize="12px"
                              />
                              <div className="CircleBox">
                                <div className="Circle"></div>
                                <div className="Circle"></div>
                                <div className="Circle"></div>
                              </div>
                            </div>
                          </ColorTextWrapper>
                        </WorksheetHeader>
                        <HeaderTriangle></HeaderTriangle>
                        <WorksheetBody>
                          <WorksheetBodyLeft>
                            {page.leftArray.map((quizItemList) =>
                              quizItemList.quizItemList
                                .filter(
                                  (quizItem) => quizItem.type === 'QUESTION',
                                )
                                .map((quizItem, i) => {
                                  const quizCategory =
                                    quizItemList.quizCategoryList.find(
                                      (quizCategoryItem: any) =>
                                        quizCategoryItem.quizCategory.유형,
                                    )?.quizCategory;

                                  return (
                                    <MathViewerWrapper
                                      key={i}
                                      height={quizItemList.height as number}
                                    >
                                      {isQuizType && (
                                        <ContentTitle>
                                          |{quizCategory?.유형}|
                                        </ContentTitle>
                                      )}
                                      <EachMathViewer>
                                        <MathJaxWrapper>
                                          <WorkbookMathViewer
                                            data={quizItemList}
                                            isSetp3
                                            answerCommentary={
                                              itemType === 0
                                                ? '문제만'
                                                : itemType === 1
                                                  ? '정답문'
                                                  : itemType === 2
                                                    ? '문제+해설별도'
                                                    : itemType === 0
                                                      ? '문제+해설같이'
                                                      : '문제만'
                                            }
                                          ></WorkbookMathViewer>
                                        </MathJaxWrapper>
                                      </EachMathViewer>
                                    </MathViewerWrapper>
                                  );
                                }),
                            )}
                          </WorksheetBodyLeft>
                          <Divider />
                          <WorksheetBodyRight>
                            {page.rightArray.map((quizItemList) =>
                              quizItemList.quizItemList
                                .filter(
                                  (quizItem) => quizItem.type === 'QUESTION',
                                )
                                .map((quizItem, i) => {
                                  const quizCategory =
                                    quizItemList.quizCategoryList.find(
                                      (quizCategoryItem: any) =>
                                        quizCategoryItem.quizCategory.유형,
                                    )?.quizCategory;
                                  return (
                                    <MathViewerWrapper
                                      key={i}
                                      height={quizItemList.height as number}
                                    >
                                      {isQuizType && (
                                        <ContentTitle>
                                          |{quizCategory?.유형}|
                                        </ContentTitle>
                                      )}
                                      <EachMathViewer>
                                        <MathJaxWrapper>
                                          <WorkbookMathViewer
                                            data={quizItemList}
                                            isSetp3
                                            answerCommentary={
                                              itemType === 0
                                                ? '문제만'
                                                : itemType === 1
                                                  ? '정답문'
                                                  : itemType === 2
                                                    ? '문제+해설별도'
                                                    : itemType === 0
                                                      ? '문제+해설같이'
                                                      : '문제만'
                                            }
                                          ></WorkbookMathViewer>
                                        </MathJaxWrapper>
                                      </EachMathViewer>
                                    </MathViewerWrapper>
                                  );
                                }),
                            )}
                          </WorksheetBodyRight>
                        </WorksheetBody>
                      </ThemeProvider>
                      <FooterBarWrapper>
                        <FooterTriangle></FooterTriangle>
                        <WorksheetAdditionalInformation>
                          {isDate && (
                            <span className="isDate">
                              <Label value="2024/03/19" fontSize="12px"></Label>
                            </span>
                          )}
                          <span className="pagenumber">{i + 1}</span>
                        </WorksheetAdditionalInformation>
                      </FooterBarWrapper>
                    </PrintBox>
                  </MathViewerList>
                </PrintStyles>
              ))}
            </ContentsWrapper>
          </PerfectScrollbar>
        </ScrollWrapper>
      </Component>
    </>
  );
}

type PDFModalStyleProps = {
  width?: string;
  height?: string;
  $margin?: string;
};

const Component = styled.div<PDFModalStyleProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: 100%;
  max-height: calc(100vh - 100px);
  background-color: ${COLOR.LIGHT_GRAY};
  border-radius: 0 0 10px 10px;
  border-top: 1px solid ${COLOR.BORDER_BLUE};
  overflow: hidden;
`;

const IconButtonWrapper = styled.div`
  position: absolute;
  top: 40px;
  right: calc(50% - 380px);
  width: 30px;
  height: 30px;
`;
const ScrollWrapper = styled.div`
  overflow-y: auto;
  height: calc(100vh - 100px);
  width: 100%;
  background-color: ${COLOR.LIGHT_GRAY};
  margin-bottom: 40px;

  .line {
    border-top: 1px solid ${COLOR.LIGHT_GRAY};
    margin: 10px 0;

    &.bottom_text {
      font-size: 13px;
      padding-top: 2px;
    }
  }
`;
const PrintStyles = styled.div`
  @media print {
    .A4_paper {
      width: 210mm;
      height: 297mm;
      margin: 0;
      padding: 0;
      box-shadow: none;
      page-break-before: always;
    }

    .print-content {
      transform: scale(0.98);
      transform-origin: top left;
    }
  }
`;
const ContentsWrapper = styled.div`
  max-height: 100vh;
`;
const PrintBox = styled.div`
  width: ${`${A4_WIDTH / 3 - 15}px`};
  //border: 2px solid black;
  margin: 0 auto;
  padding-top: 20px;
  margin-right: -15px;
`;
const MathViewerList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  text-align: center;
  width: ${`${A4_WIDTH / 3 - 30}px`};
  height: ${`${A4_HEIGHT / 3 - 12}px`};
  //border: 1px solid red;
  margin: 20px;
  &.A4_paper > div {
    padding: 10px;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
`;
const WorksheetHeader = styled.div`
  width: ${`${A4_WIDTH / 3 - 50}px`};
  position: relative;
  border: 1px solid
    ${({ theme }) => theme?.color?.backgroundColorTypeA || 'initial'};
  border-bottom-right-radius: 50px;
  background-color: ${({ theme }) =>
    theme?.color?.backgroundColorTypeA || 'initial'};
  padding: 20px;
`;
const ColorTextWrapper = styled.div`
  padding: 0 10px 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .Title {
    color: ${({ theme }) => theme?.color?.textColorTypeA || 'initial'};
  }
  .Tag {
    color: ${({ theme }) => theme?.color?.tagColorTypeA || 'initial'};
    display: flex;
    gap: 10px;
  }
  .CircleBox {
    display: flex;
    gap: 5px;
    align-items: flex-end;
    padding-bottom: 8px;
  }
  .Circle {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background-color: ${({ theme }) =>
      theme?.color?.tagColorTypeA || 'initial'};
  }
`;
const NoneColorTextWrapper = styled.div`
  width: 100px;
  height: 20px;
  margin-bottom: 10px;
  margin-left: 50px;
  background-color: white;
  border-radius: 50px;
  display: flex;
  justify-content: center;

  .grade {
    display: flex;
    align-items: center;
  }
`;
const HeaderTriangle = styled.div`
  position: relative;
  top: -70px;
  right: 0;
  width: 0;
  height: 0;
  border-bottom: 50px solid transparent;
  border-top: 50px solid transparent;
  border-left: 50px solid
    ${({ theme }) => theme?.color?.backgroundColorTypeA || 'initial'};
  border-right: 50px solid transparent;
`;
const ContentTitle = styled.div`
  color: #888888;
  padding-bottom: 2px;
  margin-left: -10px;
`;
//전체
const WorksheetBody = styled.div`
  position: relative;
  top: -50px;
  margin: 0 auto;
  display: flex;
  //height: ${`${A4_HEIGHT / 3 - 12}px`};
  height: 820px;
`;
//왼쪽
const WorksheetBodyLeft = styled.div`
  width: 372px;
  height: 820px;
  padding: 10px 20px 0px 30px;
  display: flex;
  flex-direction: column;
`;
const Divider = styled.span`
  display: inline-block;
  width: 2px;
  height: 820px;
  background-color: #e8e8e8;
  margin: 0 10px;
`;
//오른쪽
const WorksheetBodyRight = styled.div`
  width: 372px;
  height: 820px;
  padding: 10px 20px 0px 30px;
  display: flex;
  flex-direction: column;
`;
//각 아이템
const MathViewerWrapper = styled.div<{ height?: number }>`
  height: ${({ height }) => `${height}px`};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 40px;
  font-size: 12px;
`;
//비율
const EachMathViewer = styled.div`
  max-width: 500px;
  scale: 0.7;
  margin-top: -5px;
  margin-left: -80px;
`;
const MathJaxWrapper = styled.div`
  strong {
    font-size: 25px;
    color: ${({ theme }) => theme?.color?.textColorTypeA || 'initial'};
  }
`;
const FooterBarWrapper = styled.div`
  width: ${`${A4_WIDTH / 3 - 15}px`};
  position: relative;
  overflow: visible;
`;
const FooterTriangle = styled.div`
  position: relative;
  top: 25px;
  right: -704px;
  width: 0;
  border-bottom: 40px solid transparent;
  border-top: 40px solid transparent;
  border-right: 40px solid #e5e5e5;
  border-left: 40px solid transparent;
`;
const WorksheetAdditionalInformation = styled.div`
  width: ${`${A4_WIDTH / 3 - 15}px`};
  position: relative;
  left: 24px;
  top: -15px;
  width: 760px;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #e5e5e5;
  border: 1px solid #e5e5e5;
  border-top-left-radius: 30px;
  padding-right: 60px;
  gap: 800px;

  .isDate {
    font-size: 12px;
    color: #888888;
  }
  .pagenumber {
    font-size: 12px;
    font-weight: bold;
    color: #666666;
  }
`;
