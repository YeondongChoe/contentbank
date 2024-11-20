import * as React from 'react';
import { useEffect, useState, useRef } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { CheckBoxI, DnDWrapper, Icon, Tooltip, ValueNone } from '../../..';
import { myAuthorityAtom } from '../../../../store/myAuthorityAtom';
import { quizListAtom } from '../../../../store/quizListAtom';
import { QuizListType, Source } from '../../../../types';
import { windowOpenHandler } from '../../../../utils/windowHandler';
import { COLOR } from '../../../constants/COLOR';

export function QuizList({
  questionList: initialQuestionList,
  showTitle,
  $height,
  showCheckBox,
  showViewAllButton,
  fontBold,
  setCheckedList,
  isDataColor,
  isHasMeta,
  onItemClick,
  setIsCheck,
  arrowPosition = `left: calc(50% - 25px)`,
}: {
  questionList: QuizListType[] | [];
  showTitle?: boolean;
  showCheckBox?: boolean;
  showViewAllButton?: boolean;
  $height?: string;
  fontBold?: boolean;
  setCheckedList: React.Dispatch<React.SetStateAction<string[]>>;
  isDataColor?: boolean;
  isHasMeta?: boolean;
  onItemClick?: (item: QuizListType) => void;
  setIsCheck?: React.Dispatch<React.SetStateAction<boolean>>;
  arrowPosition?: string;
}) {
  const [myAuthority, setMyAuthority] = useRecoilState(myAuthorityAtom);
  const [quizList, setQuizList] = useRecoilState(quizListAtom);
  const [questionList, setQuestionList] = useState<QuizListType[]>([]);
  const [checkList, setCheckList] = useState<string[]>([]);
  const textRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isPostMessage, setIsPostMessage] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [radioCheck, setRadioCheck] = useState<
    { title: string; checkValue: string }[]
  >([]);

  // 체크박스 설정
  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.checked);

    if (e.target.checked) {
      setCheckList(questionList.map((item) => item.code as string)); //
    } else {
      setCheckList([]);
    }
  };
  const handleSingleCheck = (checked: boolean, id: string) => {
    if (checked) {
      setCheckList((prev) => [...prev, id]);
    } else {
      setCheckList(checkList.filter((el) => el !== id));
    }

    setIsChecked(checked);
  };

  useEffect(() => {
    if (setIsCheck) setIsCheck(isChecked);
  }, [isChecked]);

  const handleButtonCheck = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    e.preventDefault();
    const target = e.currentTarget.childNodes[0].childNodes[0]
      .childNodes[0] as HTMLInputElement;

    if (!target.checked) {
      setCheckList((prev) => [...prev, id]);
    } else {
      setCheckList(checkList.filter((el) => el !== id));
    }
  };

  // 툴팁 토글
  const calculateTextWidth = (nodes: NodeList) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context && textRef.current) {
      const style = window.getComputedStyle(textRef.current);
      context.font = `${style.fontSize} ${style.fontFamily}`;

      let totalWidth = 0;
      nodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          totalWidth += context.measureText(node.textContent || '').width;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          totalWidth += context.measureText(
            (node as HTMLElement).innerText,
          ).width;
        }
      });
      return totalWidth;
    }
    return 0;
  };

  const showTooltip = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const textNodes = e.currentTarget.children[0].childNodes; // 말줄임 요소
    const target = e.currentTarget.children[1]; // 숨겨진 툴팁박스
    const textWidth = calculateTextWidth(textNodes);
    const containerWidth = textRef.current?.clientWidth || 0;

    // console.log(textWidth, containerWidth);
    if (textWidth > containerWidth) {
      target.classList.add('on');
    }
  };

  const hideTooltip = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const target = e.currentTarget.children[1];
    // console.log(target.classList);
    target.classList.remove('on');
  };

  // 전체보기 버튼 누를시
  const openViewer = (code: string) => {
    const quiz = questionList.filter((el) => el.code === code);
    console.log('선택된 요소', quiz[0]);
    console.log('선택된 요소', quiz[0].idx);
    const data: QuizListType = quiz[0];
    // data 객체의 속성들을 문자열로 변환
    const dataStringified: Record<string, string> = {
      // ...data,
      idx: data.idx.toString(),
      // isDelete: data.isDelete.toString(),
      // isUse: data.isUse.toString(),
      // isFavorite:
      //   data.isFavorite !== undefined ? data.isFavorite.toString() : '',
      // lastArticle: JSON.stringify(data.lastArticle),
      // quizCategoryList: JSON.stringify(data.quizCategoryList),
      // quizItemList: data.quizItemList ? JSON.stringify(data.quizItemList) : '',
      // quizList: JSON.stringify(data.quizList),
    };
    const queryString = new URLSearchParams(dataStringified).toString();

    windowOpenHandler({
      name: 'quizpreview',
      url: `/quizpreview?${queryString}`,
      $width: 800,
      $height: 800,
    });

    setIsPostMessage(true);
  };
  // 클릭 된 아이템의 데이터
  const handleClickItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    code: string,
  ) => {
    e.preventDefault();
    const quiz = questionList.filter((el) => el.code === code);
    console.log('선택된 요소', quiz[0]);
    const data: QuizListType = quiz[0];

    const combinedContent =
      data &&
      data.quizItemList &&
      data.quizItemList.map((item) => item.content).join(' ');

    console.log('onItemClickData 선택된 아이템------------', combinedContent);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.usePostJsonData(combinedContent);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.iTeXEQ.latexrecovery();

    if (onItemClick) onItemClick(data);
    // e.preventDefault();
    // const quiz = questionList.filter((el) => el.code === code);
    // const data: QuizListType = quiz[0];
    // if (onItemClick) onItemClick(data);
    // console.log('선택된 요소 퀴즈 데이터 ----------------', data);

    // if (data && data.quizItemList) {
    //   let fullContent = '';

    //   data.quizItemList.forEach((item) => {
    //     const temp = item.content;
    //     console.log('선택된 요소 퀴즈 데이터 temp----------------', temp);

    //     const parser = new DOMParser();
    //     const dom = parser.parseFromString(temp, 'text/html');

    //     const nodes = dom.querySelectorAll('.itexmath');
    //     nodes.forEach((node) => {
    //       const latex = node.getAttribute('data-latex');
    //       while (node.firstChild) {
    //         node.removeChild(node.firstChild);
    //       }
    //       if (latex) {
    //         node.textContent = latex;
    //       }
    //     });

    //     console.log('test: ', dom.body.innerHTML);

    //     fullContent += dom.body.innerHTML;
    //   });

    //   const content_0 = fullContent;

    //   console.log('content_0------------', content_0);

    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-expect-error
    //   const editor = tinymce.get('tinyeditor');
    //   if (editor) {
    //     console.log('check!!!!!!');
    //     editor.setContent(content_0);

    //   } else {
    //     console.log('data read failed');
    //   }
    // }
  };

  // useEffect(() => {
  //   if (isPostMessage && childWindowRef.current) {
  //     childWindowRef.current.postMessage({ data: 'Hello from Parent' }, '*');
  //   }
  // }, [isPostMessage]);

  useEffect(() => {
    setCheckedList(checkList);
  }, [checkList]);

  const whenDragEnd = (newList: QuizListType[]) => {
    setQuestionList(newList); // 이동후 questionList를 업데이트
  };

  useEffect(() => {
    setCheckedList(checkList); // 체크리스트 상태를 외부로 전달
  }, [checkList, setCheckedList]);

  useEffect(() => {
    setQuestionList(initialQuestionList);
  }, [initialQuestionList]);

  useEffect(() => {
    // setQuestionList()
  }, [questionList, quizList]);

  // 스타틱 파일
  const ocrIframeContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const initialScripts = [
      '/static/tinymce5/js/tinymce/tinymce.min.js',
      '/static/iTeX_EQ/js/jquery-3.3.1.min.js',
      '/static/iTeX_EQ/js/jquery-ui.min.js',
      '/static/iTeX_EQ/js/ds.min.js',
      '/static/OCR/cropper/cropper.js',
      '/static/OCR/PDF/pdf.js',
      '/static/iTeX_fulltext/js/bootstrap.bundle.min.js',
      '/static/iTeX_fulltext/js/sort-list.js',
      '/static/dream_ui/js/dream_setting.js',
    ];

    const subsequentScripts = [
      '/static/iTeX_EQ/js/itex_total_eq_origin_32.js',
      '/static/dream_ui/js/init_setting.js',
      '/static/iTeX_EQ/js/itexLoader.js',
      '/static/iTeX_fulltext/js/dream_function.js',
      '/static/iTeX_fulltext/js/fulltext_dream.js?v=0.71',
      '/static/dream_ui/js/data_view_area.js',
      '/static/dream_ui/js/frame_controller.js',
      '/static/iTeX_fulltext/js/itex_parser_dream.js?v=0.9.6.12',
      '/static/iTeX_fulltext/js/itex_parser_pj2.js?v=0.9.1',
      '/static/iTeX_fulltext/js/cw_poc_pj_dream.js?v=0.87',
      '/static/iTeX_fulltext/js/hmlupload.js?v=0.1',
      '/static/iTeX_fulltext/js/pdf_postprocess.js?v=0.1',
    ];

    // 동적 스크립트 로딩 함수
    const dynamicallyLoadScripts = (
      scriptUrls: any[],
      callback: { (): Promise<void>; (): void; (): void },
    ) => {
      const promises = scriptUrls.map((url) => {
        return new Promise((resolve, reject) => {
          // 스크립트가 이미 존재하는지 확인
          if (document.querySelector(`script[src="${url}"]`)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            resolve(); // 이미 로드된 경우 건너뜀
            return;
          }

          // 존재하지 않는 경우 새로 로드
          const script = document.createElement('script');
          script.src = url;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          script.onload = () => resolve();
          script.onerror = () =>
            reject(new Error(`Failed to load script ${url}`));
          document.body.appendChild(script);
        });
      });

      Promise.all(promises)
        .then(() => {
          if (callback) callback();
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const initComponent = async () => {
      dynamicallyLoadScripts([...initialScripts], async () => {
        console.log('Initial scripts loaded');
        const checkTinyMCEReady = () => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          if (window.tinymce) {
            console.log('tinymce loaded successfully');
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            dynamicallyLoadScripts([...subsequentScripts], () => {
              console.log('Subsequent scripts loaded');

              if (ocrIframeContainer.current) {
                const iframe = document.createElement('iframe');
                iframe.width = '0';
                iframe.height = '0';
                iframe.src = '/static/OCR/ocr_iframe_origin.html?v=0.34';
                iframe.frameBorder = '0';
                iframe.scrolling = 'no';
                iframe.id = 'itex_frame_area';
                ocrIframeContainer.current.appendChild(iframe);
              }
            });
          } else {
            setTimeout(checkTinyMCEReady, 50);
          }
        };

        checkTinyMCEReady();
      });
    };

    initComponent();
  }, []);

  return (
    <Container>
      {questionList.length == 0 && (
        <ValueNone info="문항을 추가 해주세요" textOnly></ValueNone>
      )}
      {questionList.length > 0 && (
        <ScrollWrapper $height={$height}>
          <PerfectScrollbar>
            {showTitle && (
              <Title>
                {showCheckBox && (
                  <CheckBoxI
                    $margin={'0 5px 0 0'}
                    onChange={(e) => handleAllCheck(e)}
                    checked={
                      checkList.length === questionList.length ? true : false
                    }
                    // checked={true}
                    id={'all check'}
                    value={'all check'}
                  />
                )}
                <span className={`${fontBold ? `bold` : ''} title_top`}>
                  전체선택
                </span>
              </Title>
            )}
            <ListWrapper>
              <DnDWrapper
                dragList={questionList}
                onDragging={() => {}}
                onDragEnd={whenDragEnd}
                dragSectionName={'abc'}
              >
                {(dragItem, ref, isDragging) => (
                  <ListDnDItem
                    key={`${dragItem.code}`}
                    ref={ref}
                    className={`${isDataColor && dragItem.classificationData?.length && `ondnd`} ${isDragging ? 'opacity' : ''} ${dragItem.quizCategoryList[0] ? 'isHasMeta' : ''}`}
                    isChecked={checkList.includes(dragItem.code)}
                  >
                    {showCheckBox ? (
                      <button
                        type="button"
                        className="title"
                        onClick={(e) => {
                          handleButtonCheck(e, dragItem.code);
                        }}
                      >
                        <CheckBoxI
                          $margin={'0 5px 0 0'}
                          onChange={(e) =>
                            handleSingleCheck(e.target.checked, dragItem.code)
                          }
                          checked={
                            checkList.includes(dragItem.code as string)
                              ? true
                              : false
                          }
                          id={dragItem.code}
                          value={dragItem.code}
                        />
                        <span className="title_id">
                          {dragItem.quizCategoryList[0]?.quizCategory?.교육과정}
                          / {dragItem.code}
                        </span>
                        <span className="title_tag">
                          {dragItem.quizCategoryList[0]?.quizCategory?.문항타입}
                        </span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="title"
                        onClick={(e) => {
                          handleClickItem(e, dragItem.code);
                        }}
                      >
                        <span className="title_id">
                          {dragItem.quizCategoryList[0]?.quizCategory?.교육과정}
                          / {dragItem.code}
                        </span>
                        <span className="title_tag">
                          {dragItem.quizCategoryList[0]?.quizCategory?.문항타입}
                        </span>
                      </button>
                    )}
                    <MetaGroup
                      onMouseOver={(e) => showTooltip(e)}
                      onMouseLeave={(e) => hideTooltip(e)}
                    >
                      <span className="sub_title ellipsis" ref={textRef}>
                        <span>
                          {dragItem.quizCategoryList[0]?.quizCategory?.교과 &&
                            `${dragItem.quizCategoryList[0].quizCategory.교과} ,`}
                        </span>
                        <span>
                          {dragItem.quizCategoryList[0]?.quizCategory?.과목 &&
                            `${dragItem.quizCategoryList[0].quizCategory.과목} ,`}
                        </span>
                        <span>
                          {dragItem.quizCategoryList[0]?.quizCategory?.학년 &&
                            `${dragItem.quizCategoryList[0].quizCategory.학년} ,`}
                        </span>
                        <span>
                          {dragItem.quizCategoryList[0]?.quizCategory?.난이도 &&
                            `${dragItem.quizCategoryList[0].quizCategory.난이도} ,`}
                        </span>
                        <span>
                          {dragItem.quizCategoryList[0]?.quizCategory?.학교급 &&
                            `${dragItem.quizCategoryList[0].quizCategory.학교급} ,`}
                        </span>
                        <span>
                          {dragItem.quizCategoryList[0]?.quizCategory
                            ?.문항타입 &&
                            `${dragItem.quizCategoryList[0].quizCategory.문항타입} ,`}
                        </span>

                        <span>
                          {dragItem.quizCategoryList[0]?.quizCategory?.대단원 &&
                            `${dragItem.quizCategoryList[0].quizCategory.대단원.split('^^^')[0]} ,`}
                        </span>
                        <span>
                          {dragItem.quizCategoryList[0]?.quizCategory?.중단원 &&
                            `${dragItem.quizCategoryList[0].quizCategory.중단원.split('^^^')[0]} ,`}
                        </span>
                        <span>
                          {dragItem.quizCategoryList[0]?.quizCategory?.소단원 &&
                            `${dragItem.quizCategoryList[0].quizCategory.소단원.split('^^^')[0]} ,`}
                        </span>

                        {dragItem.quizCategoryList[0]?.quizCategory?.sources &&
                          dragItem.quizCategoryList[0]?.quizCategory?.sources.map(
                            (item: Source) => (
                              <span key={`출처 배열 ${item.출처}`}>
                                {item?.출처}
                                {item?.기출명}
                                {item?.문항번호}
                                {item?.출제년도}
                                {item?.교재속성}
                                {item?.출판사}
                                {item?.시리즈}
                                {item?.교재명}
                                {item?.교재페이지}
                                {item?.교재번호}
                                {item?.출판년도}
                                {item?.내신형식}
                                {item?.학교명}
                                {item?.학사일정}
                                {item?.내신페이지}
                                {item?.내신배점}
                                {item?.기출속성}
                                {item?.주관사}
                                {item?.기출명}
                                {item?.시행학제}
                                {item?.시행학년}
                                {item?.시험지타입}
                                {item?.기출배점}
                                {item?.기출일시}
                              </span>
                            ),
                          )}
                      </span>

                      <Tooltip
                        arrowPosition={arrowPosition}
                        // arrowPosition={`left: calc(50% - 25px)`}
                        width={'100%'}
                        ref={tooltipRef}
                      >
                        <>
                          <span>
                            {dragItem.quizCategoryList[0]?.quizCategory?.교과 &&
                              `${dragItem.quizCategoryList[0].quizCategory.교과} ,`}
                          </span>
                          <span>
                            {dragItem.quizCategoryList[0]?.quizCategory?.과목 &&
                              `${dragItem.quizCategoryList[0].quizCategory.과목} ,`}
                          </span>
                          <span>
                            {dragItem.quizCategoryList[0]?.quizCategory?.학년 &&
                              `${dragItem.quizCategoryList[0].quizCategory.학년} ,`}
                          </span>
                          <span>
                            {dragItem.quizCategoryList[0]?.quizCategory
                              ?.난이도 &&
                              `${dragItem.quizCategoryList[0].quizCategory.난이도} ,`}
                          </span>
                          <span>
                            {dragItem.quizCategoryList[0]?.quizCategory
                              ?.학교급 &&
                              `${dragItem.quizCategoryList[0].quizCategory.학교급} ,`}
                          </span>
                          <span>
                            {dragItem.quizCategoryList[0]?.quizCategory
                              ?.문항타입 &&
                              `${dragItem.quizCategoryList[0].quizCategory.문항타입} ,`}
                          </span>

                          <span>
                            {dragItem.quizCategoryList[0]?.quizCategory
                              ?.대단원 &&
                              `${dragItem.quizCategoryList[0].quizCategory.대단원.split('^^^')[0]} ,`}
                          </span>
                          <span>
                            {dragItem.quizCategoryList[0]?.quizCategory
                              ?.소단원 &&
                              `${dragItem.quizCategoryList[0].quizCategory.소단원.split('^^^')[0]} ,`}
                          </span>

                          <span>
                            {dragItem.quizCategoryList[0]?.quizCategory
                              ?.중단원 &&
                              `${dragItem.quizCategoryList[0].quizCategory.중단원.split('^^^')[0]} ,`}
                          </span>

                          {dragItem.quizCategoryList[0]?.quizCategory
                            ?.sources &&
                            dragItem.quizCategoryList[0]?.quizCategory?.sources.map(
                              (item: Source) => (
                                <span key={`출처 배열 ${item.출처}`}>
                                  {item?.출처}
                                  {item?.기출명}
                                  {item?.문항번호}
                                  {item?.출제년도}
                                  {item?.교재속성}
                                  {item?.출판사}
                                  {item?.시리즈}
                                  {item?.교재명}
                                  {item?.교재페이지}
                                  {item?.교재번호}
                                  {item?.출판년도}
                                  {item?.내신형식}
                                  {item?.학교명}
                                  {item?.학사일정}
                                  {item?.내신페이지}
                                  {item?.내신배점}
                                  {item?.기출속성}
                                  {item?.주관사}
                                  {item?.기출명}
                                  {item?.시행학제}
                                  {item?.시행학년}
                                  {item?.시험지타입}
                                  {item?.기출배점}
                                  {item?.기출일시}
                                </span>
                              ),
                            )}
                        </>
                      </Tooltip>
                    </MetaGroup>
                    {showViewAllButton && (
                      <ViewAllButton>
                        <button
                          type="button"
                          onClick={() => openViewer(dragItem.code)}
                        >
                          전체보기
                          <Icon
                            $margin={'0 0 0 2px'}
                            width={`10px`}
                            src={`/images/icon/view_arrow.svg`}
                            disabled={true}
                          />
                        </button>
                      </ViewAllButton>
                    )}
                  </ListDnDItem>
                )}
              </DnDWrapper>
            </ListWrapper>
          </PerfectScrollbar>
        </ScrollWrapper>
      )}
    </Container>
  );
}

const Container = styled.div<{ $height?: string }>`
  /* border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none; */
  width: 100%;
  height: fit-content;
`;
const ScrollWrapper = styled.div<{ $height?: string }>`
  /* overflow-y: auto; */
  width: 100%;
  height: ${({ $height }) => ($height ? ` ${$height}` : `calc(100vh - 100px)`)};
  background-color: ${COLOR.LIGHT_GRAY};
`;
const Title = styled.div`
  padding: 15px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  .title_top {
    font-size: 15px;
  }
  .bold {
    font-weight: bold;
  }
`;
const ListWrapper = styled.ul`
  padding: 10px 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: fit-content;
`;

const ListDnDItem = styled.li<{ isChecked: boolean }>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  padding: 10px;
  border: 1px solid ${COLOR.BORDER_BLUE};
  background-color: #fff;
  border-radius: 5px;
  min-height: 50px;
  margin-bottom: 10px;

  &.ondnd {
    background-color: ${COLOR.IS_HAVE_DATA};
    button.title {
      background-color: ${COLOR.IS_HAVE_DATA};
    }
  }
  button.title {
    font-size: 15px;
    width: 100%;
    padding-bottom: 5px;
    display: flex;
    flex-wrap: wrap;
    /* align-items: center; */
    border: none;
    background-color: transparent;
    cursor: pointer;

    .title_id {
      flex: 1 0 0;
      text-overflow: ellipsis;
      word-break: break-all;
      text-align: left;
      color: ${COLOR.PRIMARY};
      background-color: transparent;
    }
    .title_tag {
      width: 40px;
      text-align: left;
      font-size: 13px;
      font-weight: bold;
      color: ${COLOR.ALERTBAR_SUCCESS};
      background-color: transparent;
    }
  }
  span.title {
    display: flex;
    flex-wrap: wrap;
    /* align-items: center; */
    padding-bottom: 5px;
    width: 100%;

    span.title_id {
      text-overflow: ellipsis;
      word-break: break-all;
      color: ${COLOR.PRIMARY};
      width: calc(100% - 40px);
      background-color: transparent;
    }
    .title_tag {
      width: 40px;
      text-align: right;
      font-size: 13px;
      font-weight: bold;
      color: ${COLOR.ALERTBAR_ERROR};
      background-color: transparent;
    }
  }

  &.opacity {
    opacity: 0.8;
  }
  background-color: ${({ isChecked }) =>
    isChecked ? `${COLOR.IS_CHECK_BACKGROUND}` : 'white'};

  &.isHasMeta {
    background-color: ${COLOR.IS_HAVE_DATA};
  }
`;

const MetaGroup = styled.span`
  border: none;
  background-color: transparent;
  position: relative;
  display: flex;
  width: 100%;

  .sub_title {
    padding-top: 5px;
    width: 100%;
    font-size: 13px;
    border-top: 1px solid ${COLOR.BORDER_BLUE};
    background-color: transparent;
  }

  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;
const ViewAllButton = styled.p`
  padding-top: 10px;
  width: 100%;
  text-align: right;
  > button {
    font-size: 13px;
    font-weight: bold;
    height: 20px;
    display: inline-block;
    border: none;
    background-color: #fff;
    color: ${COLOR.ALERTBAR_SUCCESS};
    background-color: transparent;
    cursor: pointer;

    > button {
      transform: translateY(1px);
    }
  }
`;
