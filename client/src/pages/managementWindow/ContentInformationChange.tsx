import * as React from 'react';
import { useState, useEffect, useMemo, useRef } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { IoSearch } from 'react-icons/io5';
import { MdPublishedWithChanges } from 'react-icons/md';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { classificationInstance, quizService } from '../../api/axios';
import {
  Accordion,
  Button,
  ButtonFormatRadio,
  DepthBlock,
  DropdownWithCheckbox,
  Loader,
  PaginationBox,
  ResizeLayout,
  ValueNone,
  openToastifyAlert,
} from '../../components';
import { COLOR } from '../../components/constants';
import ArrowClockwiseIcon from '../../components/contents/createcontent/editer/components/icons/ArrowClockwiseIcon';
import ArrowCounterclockwiseIcon from '../../components/contents/createcontent/editer/components/icons/ArrowCounterclockwiseIcon';
import BarCharLineIcon from '../../components/contents/createcontent/editer/components/icons/BarCharLineIcon';
import BoxArrowInUpRightIcon from '../../components/contents/createcontent/editer/components/icons/BoxArrowInUpRightIcon';
import ChevronLeftIcon from '../../components/contents/createcontent/editer/components/icons/ChevronLeftIcon';
import ChevronRightIcon from '../../components/contents/createcontent/editer/components/icons/ChevronRightIcon';
import CloseIcon from '../../components/contents/createcontent/editer/components/icons/CloseIcon';
import TrashIcon from '../../components/contents/createcontent/editer/components/icons/TrashIcon';
import { QuizList } from '../../components/contents/createcontent/list';
import { pageAtom } from '../../store/utilAtom';
import {
  ItemCategoryType,
  ItemTreeListType,
  ItemTreeType,
  PaginationType,
  QuizListType,
} from '../../types';

export function ContentInformationChange() {
  const [page, setPage] = useRecoilState(pageAtom);
  const [questionList, setQuestionList] = useState<QuizListType[]>([]);

  const [searchValue, setSearchValue] = useState<string>('');
  const [changeValue, setChangeValue] = useState<string>('');
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const searchDivRef = useRef<HTMLDivElement | null>(null);
  const changeDivRef = useRef<HTMLDivElement | null>(null);
  // 드롭박스 셀렉팅 값
  const [selectedItems1, setSelectedItems1] = useState<string[]>([]);
  const [selectedItems2, setSelectedItems2] = useState<string[]>([]);
  const [selectedItems3, setSelectedItems3] = useState<string[]>([]);
  const [selectedItems4, setSelectedItems4] = useState<string[]>([]);
  const [includeType1, setIncludeType1] = useState<'includeOne' | 'includeAll'>(
    'includeOne',
  );
  const [includeType2, setIncludeType2] = useState<'includeOne' | 'includeAll'>(
    'includeOne',
  );

  const submitSave = () => {
    // saveHandler();
    // 이미지 데이터 저장
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  window.editorType_s = true;
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
      '/static/iTeX_EQ/js/itex_total_eq_origin_32.js',
    ];
    const subsequentScripts = [
      '/static/dream_ui/js/init_setting.js',
      '/static/iTeX_EQ/js/itexLoader.js',
      '/static/iTeX_fulltext/js/fulltext_dream.js?v=0.71',
      '/static/dream_ui/js/data_view_area.js',
      '/static/dream_ui/js/frame_controller.js',
      '/static/iTeX_fulltext/js/itex_parser_dream.js?v=0.9.6.12',
      '/static/iTeX_fulltext/js/itex_parser_pj2.js?v=0.9.1',
      '/static/iTeX_fulltext/js/cw_poc_pj_dream.js?v=0.87',
      '/static/iTeX_fulltext/js/dream_function.js',
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

  //수식 입력기
  const openFormula = (state: unknown) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.openEQ(state);
  };

  const handleSearchValueChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newValue = e.currentTarget.innerHTML;
    if (newValue !== searchValue) {
      setSearchValue(newValue);
    }
  };

  const handleChangeValueChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newValue = e.currentTarget.innerHTML;
    if (newValue !== changeValue) {
      setChangeValue(newValue);
    }
  };

  // 해당  문항찾기
  const onSearchList = () => {
    // console.log(
    //   'selected',
    //   radio1depthCheck,
    //   radio2depthCheck,
    //   radio3depthCheck,
    //   radio4depthCheck,
    //   radio5depthCheck,
    //   radio6depthCheck,
    //   radio7depthCheck,
    // );
    // console.log('checkedDepthList', checkedDepthList);
    // searchCategoryDataMutate();

    if (searchDivRef.current) {
      const divContent = searchDivRef.current.innerHTML;
      setSearchValue(divContent);
      console.log('Div content:', divContent);

      // 여기에 기존의 검색 로직을 추가합니다.
    }
  };

  useEffect(() => {
    // 드롭다운 리스트 값
    console.log('드롭다운 리스트 값', selectedItems1);
  }, [selectedItems1]);

  const buttonDisabled = useMemo(() => {
    if (searchValue.length > 1 && selectedItems1.length > 0) {
      return false;
    } else {
      return true;
    }
  }, [changeValue, selectedItems1]);

  return (
    <>
      <Container>
        <PositionWrapper className="width_400">
          <Title>
            <span className="title_top">검색 조건</span>
          </Title>

          <ScrollWrapper>
            <PerfectScrollbar>
              <DropdownWithCheckboxWrapper>
                <DropdownWithCheckbox
                  width={'120px'}
                  selectedList={setSelectedItems1}
                  options={[
                    'lisdsad sadasdsa dsadsada dsa t1',
                    'list2',
                    'list3',
                    'list4',
                    'list5',
                    'list6',
                  ]}
                />
                <span>이(가)</span>
                <DropdownWithCheckbox
                  width={'200px'}
                  selectedList={setSelectedItems2}
                  options={[
                    'lisdsad sadasdsa dsadsada dsa t1',
                    'list2',
                    'list3',
                    'list4',
                    'list5',
                    'list6',
                  ]}
                />
              </DropdownWithCheckboxWrapper>
              <SwitchContainer>
                <SwitchButton
                  isSelected={includeType1 === 'includeOne'}
                  onClick={() => setIncludeType1('includeOne')}
                >
                  하나 이상 포함
                </SwitchButton>
                <SwitchButton
                  isSelected={includeType1 === 'includeAll'}
                  onClick={() => setIncludeType1('includeAll')}
                >
                  모두 포함
                </SwitchButton>
              </SwitchContainer>

              <DropdownWithCheckboxWrapper>
                <DropdownWithCheckbox
                  width={'120px'}
                  selectedList={setSelectedItems3}
                  options={[
                    'lisdsad sadasdsa dsadsada dsa t1',
                    'list2',
                    'list3',
                    'list4',
                    'list5',
                    'list6',
                  ]}
                />
                <span>이(가)</span>
                <DropdownWithCheckbox
                  width={'200px'}
                  selectedList={setSelectedItems4}
                  options={[
                    'lisdsad sadasdsa dsadsada dsa t1',
                    'list2',
                    'list3',
                    'list4',
                    'list5',
                    'list6',
                  ]}
                />
              </DropdownWithCheckboxWrapper>
              <SwitchContainer>
                <SwitchButton
                  isSelected={includeType2 === 'includeOne'}
                  onClick={() => setIncludeType2('includeOne')}
                >
                  하나 이상 포함
                </SwitchButton>
                <SwitchButton
                  isSelected={includeType2 === 'includeAll'}
                  onClick={() => setIncludeType2('includeAll')}
                >
                  모두 포함
                </SwitchButton>
              </SwitchContainer>
            </PerfectScrollbar>
          </ScrollWrapper>
          <ButtonWrapper>
            <InputWrapper>
              <div
                ref={(el) => {
                  if (el && el.innerHTML !== searchValue) {
                    el.innerHTML = searchValue;
                  }
                  searchDivRef.current = el;
                }}
                className="first_area_test"
                contentEditable
                onInput={handleSearchValueChange}
                style={{
                  minHeight: '35px',
                  padding: '5px 10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  outline: 'none',
                  width: 'calc(100% - 85px)',
                  overflowWrap: 'break-word',
                }}
              />
              {searchValue === '' && (
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '15px',
                    color: '#999',
                    pointerEvents: 'none',
                    width: 'calc(100% - 125px)',
                    height: '20px',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                  }}
                >
                  <span>찾을값을 입력해주세요(두글자 이상)</span>
                </span>
              )}

              <Button
                width={'80px'}
                height={'35px'}
                fontSize={'14px'}
                $margin={'0 0 0 5px'}
                cursor
                $filled
                $success
                onClick={() => {
                  openFormula('first_area_test');
                }}
              >
                수식
              </Button>
            </InputWrapper>

            <Button
              $filled
              cursor
              disabled={buttonDisabled}
              onClick={() => onSearchList()}
            >
              <span>
                검색 <IoSearch />
              </span>
            </Button>
          </ButtonWrapper>
        </PositionWrapper>

        <PositionWrapper className="width">
          {/* <Title>
            <span className="title_top">바꿀 내용 입력</span>
          </Title> */}
          {checkedList.length ? (
            <>
              <ScrollWrapper>
                <PerfectScrollbar>
                  <ChangeInfoWrapper>
                    <p className="info_total">
                      선택한 문항 총 {checkedList.length} 건
                    </p>
                    <div className="info_box">
                      {checkedList.length && (
                        <p>
                          총<span className="strong">{checkedList.length}</span>
                          건
                        </p>
                      )}
                      {searchValue && (
                        <p>
                          <span className="strong">{searchValue}</span>
                          를(을)
                        </p>
                      )}
                      {changeValue && (
                        <p>
                          <span className="strong">{changeValue}</span>로 변경
                          하시겠습니까?
                        </p>
                      )}
                    </div>
                  </ChangeInfoWrapper>
                </PerfectScrollbar>
              </ScrollWrapper>
            </>
          ) : (
            <ValueNoneWrapper>
              <ValueNone textOnly info={'STEP2 문항을 선택해주세요'} />
            </ValueNoneWrapper>
          )}
        </PositionWrapper>
      </Container>

      {/* 수식 입력창 영역 */}
      <div className="itex_editor_container">
        <div id="first" className="resizeable" style={{ display: 'none' }}>
          <div id="itex_viewer_area">
            <div id="data_viewer_body">
              <div className="trans_area h-100">
                <div
                  className="itex_hml_convert_view"
                  //   contentEditable="true"
                ></div>
                <button id="pasteButton" className="hml_copy_btn">
                  붙여넣기
                </button>
                <div className="origin_img_area h-100 hml_multi">
                  <div className="itex_ocrimg_area" style={{ width: '100%' }}>
                    <img id="itex_main_img" alt="" />
                  </div>
                  <div className="itex-drag-area multi">
                    <div className="icon">{/* <DocumentIcon /> */}</div>
                    <input
                      id="upload_file"
                      className="hml_multi"
                      name="images"
                      type="file"
                      accept=".hml"
                    />
                  </div>
                </div>
              </div>
              <div
                className="itex_fixed_tool position-absolute bottom-0 start-50 translate-middle-x zindex-fixed"
                role="toolbar"
                aria-label="Toolbar with button groups"
              >
                <div
                  className="btn-group btn-group-md"
                  role="group"
                  aria-label="1th group"
                >
                  <button
                    type="button"
                    className="btn btn-secondary"
                    id="itex_page_clear"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    title="지우기"
                  >
                    <TrashIcon />
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-method="rotate"
                    id="itex_Rotate_L"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    title="왼쪽으로 회전"
                    disabled={true}
                  >
                    <ArrowCounterclockwiseIcon />
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-method="rotate"
                    id="itex_Rotate_R"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    title="오른쪽으로 회전"
                    disabled={true}
                  >
                    <ArrowClockwiseIcon />
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    id="onPrevPage"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    title="이전 페이지"
                    disabled={true}
                  >
                    <ChevronLeftIcon />
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    id="onNextPage"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    title="다음 페이지"
                    disabled={true}
                  >
                    <ChevronRightIcon />
                  </button>
                  <div className="pdf_page_show pdf_page_hidden">
                    <input
                      className="input-group-text pdf_page_a"
                      id="inputGroup-sizing-sm"
                      type="text"
                    />
                    <span
                      className="input-group-text btn-secondary pdf_page_s"
                      id="inputGroup-sizing-sm"
                    >
                      /0
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary itex_edit_mv"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    title="모바일 환경에서 에디터 창으로 이동합니다."
                    style={{ display: 'none' }}
                  >
                    <BoxArrowInUpRightIcon />
                  </button>
                  <button
                    type="button"
                    className="btn btn-info itex_total_count"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    title="변환 내역"
                    style={{ display: 'none' }}
                  >
                    <BarCharLineIcon />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      <span className="itex_obj_count">0</span>
                      <span className="visually-hidden"></span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div id="data_viewer_footer"></div>
            <div className="qnai_trans_form">
              <div>
                <div className="btn-group btn-group-sm">
                  <button
                    type="button"
                    className="btn btn-primary"
                    title="선택영역의 컨텐츠를 인식합니다."
                    id="doc_ocr_converter"
                  >
                    문항인식
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    id="img_crop_normal"
                    title="선택영역을 이미지로 변환합니다."
                  >
                    그림넣기
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    id="itex_crop_clear"
                    title="크롭 해제"
                    aria-label="Close"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="dragger-left" className="dragger dragger-left">
          <button className="open_btn_left" style={{ display: 'none' }}>
            {'>'}
          </button>
        </div>
        <div id="second" className="resizeable" style={{ display: 'none' }}>
          <div className="col-lg-4 p-0 tiny_wrap">
            <textarea id="tinyeditor"></textarea>
            <div className="save_exam_btn_wrap">
              {/* <button id="exam_change">변경</button> */}
              <button
                id="exam_save_all"
                onClick={async () => {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  const gggg = await window.saveHmlData();
                  console.log(gggg);
                }}
              >
                저장
              </button>
            </div>
            <div className="poc_checker_block"></div>
          </div>
        </div>

        <div className="tools_wrap eq_config_hidden">
          <div id="editor_container"></div>
          <div id="iframe_ocr_box" ref={ocrIframeContainer}></div>
          <div id="itexhml_board"></div>
          <div id="modal_block">
            <div className="sk-cube-grid">
              <div className="sk-cube sk-cube1"></div>
              <div className="sk-cube sk-cube2"></div>
              <div className="sk-cube sk-cube3"></div>
              <div className="sk-cube sk-cube4"></div>
              <div className="sk-cube sk-cube5"></div>
              <div className="sk-cube sk-cube6"></div>
              <div className="sk-cube sk-cube7"></div>
              <div className="sk-cube sk-cube8"></div>
              <div className="sk-cube sk-cube9"></div>
            </div>
          </div>
        </div>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          id="itex_imgfile"
          style={{ display: 'none' }}
        />
      </div>
    </>
  );
}
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const PositionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;

  &.width_400 {
    min-width: 400px;
    padding-right: 0;
  }
  &.width {
    flex: 1 0 0;
  }
`;
const Title = styled.div`
  padding: 15px;
  padding-bottom: 5px;
  background-color: ${COLOR.LIGHT_GRAY};
  display: flex;
  align-items: center;

  .title_top {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
  }
`;

const ScrollWrapper = styled.div`
  overflow-y: auto;
  height: calc(100vh - 280px);
  width: 100%;
  background-color: ${COLOR.LIGHT_GRAY};

  .line {
    border-top: 1px solid ${COLOR.BORDER_GRAY};
    margin: 10px 0;
  }

  .meta_accordion_select {
    padding: 20px;
  }
  .meta_accordion_select {
    strong {
      display: flex;
      font-size: 15px;
      margin-bottom: 5px;
    }
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  width: 100%;
  border: 1px solid ${COLOR.BORDER_GRAY};
  border-radius: 5px;
  padding: 5px;
  position: relative;

  > input {
    width: calc(100% - 85px);
    border: none;
    border-radius: 5px;
    font-size: 15px;
    padding: 0 10px;
    text-overflow: ellipsis;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* background-color: #fff;
  box-shadow:
    rgba(0, 17, 255, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  position: sticky;
  bottom: 0;
  right: 0;
  left: 0; */

  .pagination {
    padding-bottom: 12px;
  }
`;

const DropdownWithCheckboxWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 10px;
  span {
    font-size: 13px;
    padding: 5px;
  }
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 10px;
`;

// Button은 선택된 상태에 따라 배경색을 변경
const SwitchButton = styled.button<{ isSelected: boolean }>`
  padding: 5px 20px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #358aff;
  background-color: ${({ isSelected }) => (isSelected ? '#358aff' : '#f0f0f0')};
  color: ${({ isSelected }) => (isSelected ? 'white' : '#358aff')};
  font-size: 14px;
  font-weight: bold;
`;
const ValueNoneWrapper = styled.div`
  background-color: ${COLOR.LIGHT_GRAY};
  display: flex;
  height: 100%;
`;
const ChangeInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  .info_total {
    color: #fff;
    font-weight: bold;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    background-color: ${COLOR.FONT_NAVI};
  }
  .info_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    width: 100%;
    text-align: center;
    color: ${COLOR.SECONDARY};
    /* font-weight: bold; */
    position: absolute;
    top: calc(50% - 60px);
    padding: 20px;

    p {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 2px;
    }
  }

  .strong {
    background-color: ${COLOR.FONT_NAVI};
    color: #fff;
    padding: 2px;
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 30px;
  padding-left: calc(50% - 35px);
`;
