import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { SlOptionsVertical, SlPrinter } from 'react-icons/sl';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactToPrint from 'react-to-print';
import { styled, ThemeProvider } from 'styled-components';

import { quizService, workbookInstance } from '../../../api/axios';
import { Label, Icon, IconButton, ValueNone } from '../../../components/atom';
import { WorkbookMathViewer } from '../../../components/mathViewer';
import { QuizList, TemplateList } from '../../../types/WorkbookType';
import { A4_HEIGHT, A4_WIDTH, COLOR } from '../../constants';
import {
  RedTheme,
  OrangeTheme,
  GreenTheme,
  BlueTheme,
  PurpleTheme,
} from '../../constants/THEME';

type PDFModalProps = {
  idx: number;
};

type PageType = { leftArray: QuizList[]; rightArray: QuizList[] }[];

export function WorkbookPDFModal({ idx }: PDFModalProps) {
  const printDivRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

      {type === 'A' && (
        <Component>
          <ScrollWrapper>
            <PerfectScrollbar>
              <ContentsWrapper ref={printDivRef}>
                {pages.map((page, i) => (
                  <PrintStyles key={`${i} pdf list`}>
                    <MathViewerListA className="A4_paper" ref={containerRef}>
                      <PrintBoxA>
                        <ThemeProvider theme={selectedTheme}>
                          <WorksheetHeaderA>
                            <NoneColorTextWrapperA>
                              <div className="grade">
                                <Label
                                  value={(gradeValue as string) || '대상 학년'}
                                  padding="0px"
                                  fontSize="12px"
                                />
                              </div>
                            </NoneColorTextWrapperA>
                            <ColorTextWrapperA>
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
                            </ColorTextWrapperA>
                          </WorksheetHeaderA>
                          <HeaderTriangleA></HeaderTriangleA>
                          <WorksheetBodyA>
                            <WorksheetBodyLeftA>
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
                                      <MathViewerWrapperA
                                        key={i}
                                        height={quizItemList.height as number}
                                      >
                                        {isQuizType && (
                                          <ContentTitleA>
                                            |{quizCategory?.유형}|
                                          </ContentTitleA>
                                        )}
                                        <EachMathViewerA>
                                          <MathJaxWrapperA>
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
                                          </MathJaxWrapperA>
                                        </EachMathViewerA>
                                      </MathViewerWrapperA>
                                    );
                                  }),
                              )}
                            </WorksheetBodyLeftA>
                            <DividerA />
                            <WorksheetBodyRightA>
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
                                      <MathViewerWrapperA
                                        key={i}
                                        height={quizItemList.height as number}
                                      >
                                        {isQuizType && (
                                          <ContentTitleA>
                                            |{quizCategory?.유형}|
                                          </ContentTitleA>
                                        )}
                                        <EachMathViewerA>
                                          <MathJaxWrapperA>
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
                                          </MathJaxWrapperA>
                                        </EachMathViewerA>
                                      </MathViewerWrapperA>
                                    );
                                  }),
                              )}
                            </WorksheetBodyRightA>
                          </WorksheetBodyA>
                        </ThemeProvider>
                        <FooterBarWrapperA>
                          <FooterTriangleA></FooterTriangleA>
                          <WorksheetAdditionalInformationA>
                            {isDate && (
                              <span className="isDate">
                                <Label
                                  value="2024/03/19"
                                  fontSize="12px"
                                ></Label>
                              </span>
                            )}
                            <span className="pagenumber">{i + 1}</span>
                          </WorksheetAdditionalInformationA>
                        </FooterBarWrapperA>
                      </PrintBoxA>
                    </MathViewerListA>
                  </PrintStyles>
                ))}
              </ContentsWrapper>
            </PerfectScrollbar>
          </ScrollWrapper>
        </Component>
      )}

      {type === 'B' && (
        <Component>
          <ScrollWrapper>
            <PerfectScrollbar>
              <ContentsWrapper ref={printDivRef}>
                {pages.map((page, i) => (
                  <PrintStyles key={`${i} pdf list`}>
                    <MathViewerListB className="A4_paper" ref={containerRef}>
                      <PrintBoxB>
                        <ThemeProvider theme={selectedTheme}>
                          <HeaderCircleB></HeaderCircleB>
                          <WorksheetHeaderB>
                            <TextWrapperB>
                              <div className="grade">
                                <Label
                                  value={(gradeValue as string) || '대상 학년'}
                                  fontSize="12px"
                                />
                              </div>
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
                                  fontSize="11px"
                                />
                              </div>
                            </TextWrapperB>
                          </WorksheetHeaderB>
                          <WorksheetBodyB>
                            <WorksheetBodyLeftB>
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
                                      <MathViewerWrapperB
                                        key={i}
                                        height={quizItemList.height as number}
                                      >
                                        {isQuizType && (
                                          <ContentTitleB>
                                            |{quizCategory?.유형}|
                                          </ContentTitleB>
                                        )}
                                        <EachMathViewerB>
                                          <MathJaxWrapperB>
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
                                          </MathJaxWrapperB>
                                        </EachMathViewerB>
                                      </MathViewerWrapperB>
                                    );
                                  }),
                              )}
                            </WorksheetBodyLeftB>
                            <DividerB />
                            <WorksheetBodyRightB>
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
                                      <MathViewerWrapperB
                                        key={i}
                                        height={quizItemList.height as number}
                                      >
                                        {isQuizType && (
                                          <ContentTitleB>
                                            |{quizCategory?.유형}|
                                          </ContentTitleB>
                                        )}
                                        <EachMathViewerB>
                                          <MathJaxWrapperB>
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
                                          </MathJaxWrapperB>
                                        </EachMathViewerB>
                                      </MathViewerWrapperB>
                                    );
                                  }),
                              )}
                            </WorksheetBodyRightB>
                          </WorksheetBodyB>
                        </ThemeProvider>
                        <WorksheetAdditionalInformationB>
                          {isDate && (
                            <span className="isDate">
                              <Label value="2024/03/19" fontSize="12px"></Label>
                            </span>
                          )}
                          <span className="pagenumber">{i + 1}</span>
                        </WorksheetAdditionalInformationB>
                      </PrintBoxB>
                    </MathViewerListB>
                  </PrintStyles>
                ))}
              </ContentsWrapper>
            </PerfectScrollbar>
          </ScrollWrapper>
        </Component>
      )}
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
const PrintBoxA = styled.div`
  width: ${`${A4_WIDTH / 3 - 15}px`};
  //border: 2px solid black;
  margin: 0 auto;
  padding-top: 20px;
  margin-right: -15px;
`;
const MathViewerListA = styled.div`
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
const WorksheetHeaderA = styled.div`
  width: ${`${A4_WIDTH / 3 - 50}px`};
  position: relative;
  border: 1px solid
    ${({ theme }) => theme?.color?.backgroundColorTypeA || 'initial'};
  border-bottom-right-radius: 50px;
  background-color: ${({ theme }) =>
    theme?.color?.backgroundColorTypeA || 'initial'};
  padding: 20px;
`;
const ColorTextWrapperA = styled.div`
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
const NoneColorTextWrapperA = styled.div`
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
const HeaderTriangleA = styled.div`
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
const ContentTitleA = styled.div`
  color: #888888;
  padding-bottom: 2px;
  margin-left: -10px;
`;
//전체
const WorksheetBodyA = styled.div`
  position: relative;
  top: -50px;
  margin: 0 auto;
  display: flex;
  //height: ${`${A4_HEIGHT / 3 - 12}px`};
  height: 820px;
`;
//왼쪽
const WorksheetBodyLeftA = styled.div`
  width: 372px;
  height: 820px;
  padding: 10px 20px 0px 30px;
  display: flex;
  flex-direction: column;
`;
const DividerA = styled.span`
  display: inline-block;
  width: 2px;
  height: 820px;
  background-color: #e8e8e8;
  margin: 0 10px;
`;
//오른쪽
const WorksheetBodyRightA = styled.div`
  width: 372px;
  height: 820px;
  padding: 10px 20px 0px 30px;
  display: flex;
  flex-direction: column;
`;
//각 아이템
const MathViewerWrapperA = styled.div<{ height?: number }>`
  height: ${({ height }) => `${height}px`};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 40px;
  font-size: 12px;
`;
//비율
const EachMathViewerA = styled.div`
  max-width: 500px;
  scale: 0.7;
  margin-top: -5px;
  margin-left: -80px;
`;
const MathJaxWrapperA = styled.div`
  strong {
    font-size: 25px;
    color: ${({ theme }) => theme?.color?.textColorTypeA || 'initial'};
  }
`;
const FooterBarWrapperA = styled.div`
  width: ${`${A4_WIDTH / 3 - 15}px`};
  position: relative;
  overflow: visible;
`;
const FooterTriangleA = styled.div`
  position: relative;
  top: 25px;
  right: -704px;
  width: 0;
  border-bottom: 40px solid transparent;
  border-top: 40px solid transparent;
  border-right: 40px solid #e5e5e5;
  border-left: 40px solid transparent;
`;
const WorksheetAdditionalInformationA = styled.div`
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
const PrintBoxB = styled.div`
  width: ${`${A4_WIDTH / 3}px`};
  //border: 2px solid black;
  margin: 0 auto;
  padding-top: 20px;
  margin-right: -15px;
`;
const MathViewerListB = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  text-align: center;
  width: ${`${A4_WIDTH / 3 - 10}px`};
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
const WorksheetHeaderB = styled.div`
  width: ${`${A4_WIDTH / 3 - 50}px`};
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 20px;
  height: 72px;
  border: 2px solid ${({ theme }) => theme?.color?.textColorTypeB || 'initial'};
  border-radius: 10px;
`;
const ContentTitleB = styled.div`
  color: #888888;
  padding-bottom: 2px;
  margin-left: -10px;
`;
const HeaderCircleB = styled.div`
  position: relative;
  top: 10px;
  right: -32px;
  width: 120px;
  height: 20px;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  background-color: ${({ theme }) => theme?.color?.textColorTypeB || 'initial'};
`;
const TextWrapperB = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .grade {
    position: relative;
    top: -35px;
    right: -30px;
    width: 100px;
    border: 1px solid
      ${({ theme }) => theme?.color?.textColorTypeB || 'initial'};
    border-radius: 50px;
    background-color: ${({ theme }) =>
      theme?.color?.textColorTypeB || 'initial'};
    color: white;

    label {
      display: flex;
      justify-content: center;
    }
  }

  .Title {
    color: ${({ theme }) => theme?.color?.textColorTypeB || 'initial'};
  }

  .Tag {
    position: relative;
    top: 20px;
    right: 30px;
    width: 80px;
    border: 1px solid
      ${({ theme }) => theme?.color?.backgroundColorTypeB || 'initial'};
    background-color: ${({ theme }) =>
      theme?.color?.backgroundColorTypeB || 'initial'};
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    color: ${({ theme }) => theme?.color?.tagColorTypeB || 'initial'};

    label {
      display: flex;
      justify-content: center;
    }
  }
`;
const WorksheetBodyB = styled.div`
  //margin: 0 auto;
  display: flex;
  justify-content: center;
  height: 820px;
`;
const WorksheetBodyLeftB = styled.div`
  width: 372px;
  height: 820px;
  padding: 10px 20px 0px 30px;
  display: flex;
  flex-direction: column;
`;
const WorksheetBodyRightB = styled.div`
  width: 372px;
  height: 820px;
  padding: 10px 20px 0px 30px;
  display: flex;
  flex-direction: column;
`;
const DividerB = styled.span`
  display: inline-block;
  width: 2px;
  height: 820px;
  background-color: #e8e8e8;
  margin: 0 10px;
`;
const MathViewerWrapperB = styled.div<{ height: number }>`
  height: ${({ height }) => `${height}px`};
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  font-size: 12px;
`;
const EachMathViewerB = styled.div`
  max-width: 500px;
  scale: 0.8;
  margin-top: -5px;
  margin-left: -70px;
`;
const MathJaxWrapperB = styled.div`
  strong {
    font-size: 25px;
    color: ${({ theme }) => theme?.color?.textColorTypeB || 'initial'};
  }
`;
const WorksheetAdditionalInformationB = styled.div`
  width: ${`${A4_WIDTH / 3 - 50}px`};
  margin: 0 auto;
  display: flex;
  padding-top: 10px;
  padding-right: 10px;
  align-items: center;
  justify-content: flex-end;
  border-top: 2px solid #e8e8e8;
  gap: 630px;
  margin-top: 140px;
  /* margin-bottom: 30px; */

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
