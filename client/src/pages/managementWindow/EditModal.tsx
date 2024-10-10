import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';

import {
  ItemSelectProps,
  AlertBar,
  Label,
  Input,
  Button,
} from '../../components/atom';
import { COLOR } from '../../components/constants';
import ArrowClockwiseIcon from '../../components/contents/createcontent/editer/components/icons/ArrowClockwiseIcon';
import ArrowCounterclockwiseIcon from '../../components/contents/createcontent/editer/components/icons/ArrowCounterclockwiseIcon';
import BarCharLineIcon from '../../components/contents/createcontent/editer/components/icons/BarCharLineIcon';
import BoxArrowInUpRightIcon from '../../components/contents/createcontent/editer/components/icons/BoxArrowInUpRightIcon';
import ChevronLeftIcon from '../../components/contents/createcontent/editer/components/icons/ChevronLeftIcon';
import ChevronRightIcon from '../../components/contents/createcontent/editer/components/icons/ChevronRightIcon';
import CloseIcon from '../../components/contents/createcontent/editer/components/icons/CloseIcon';
import TrashIcon from '../../components/contents/createcontent/editer/components/icons/TrashIcon';
import { Alert } from '../../components/molecules/alert';
import { useModal } from '../../hooks';
import { QuizListType } from '../../types';
import { postRefreshToken } from '../../utils/tokenHandler';

export function EditModal({
  sortedQuizList,
  searchedValue,
}: {
  sortedQuizList: QuizListType[];
  searchedValue: string;
}) {
  const { closeModal } = useModal();

  const [isNameError, setIsNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [changeValue, setChangeValue] = useState<string>('');
  const searchDivRef = useRef<HTMLDivElement | null>(null);

  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);

  const closeSuccessAlert = () => {
    setIsSuccessAlertOpen(false);
  };

  // 변경 버튼
  const submitEdit = () => {};

  const onSearchList = () => {
    if (searchDivRef.current) {
      const divContent = searchDivRef.current.innerHTML;
      setChangeValue(divContent);
      console.log('Div content:', divContent);

      // 여기에 기존의 검색 로직을 추가합니다.
    }
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

  const handleChangeValueChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newValue = e.currentTarget.innerHTML;
    if (newValue !== changeValue) {
      setChangeValue(newValue);
    }
  };

  return (
    <Container>
      <AlertBar
        type="success"
        isAlertOpen={isSuccessAlertOpen}
        closeAlert={closeSuccessAlert}
        message={'정상 처리되었습니다.'}
      />

      <Title>문항 수정</Title>
      <p className="sub_title">총 {sortedQuizList.length}문항에 대해</p>
      <p>변경할 분류</p>
      <TagMappingList></TagMappingList>
      <p>
        변경할 내용 (현재 검색어 :{' '}
        <span dangerouslySetInnerHTML={{ __html: searchedValue }}></span>)
      </p>
      <InputWrapper>
        <div
          ref={(el) => {
            if (el && el.innerHTML !== changeValue) {
              el.innerHTML = changeValue;
            }
            searchDivRef.current = el;
          }}
          className="second_area_test"
          contentEditable
          onInput={handleChangeValueChange}
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
        {changeValue === '' && (
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
            openFormula('second_area_test');
          }}
        >
          수식
        </Button>
      </InputWrapper>

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
    </Container>
  );
}

const Container = styled.div`
  max-width: 700px;
  min-width: 600px;
  padding: 30px;
  padding-top: 0;

  .sub_title {
    font-size: 16px;
    font-weight: 700;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    padding: 5px 0;
  }
`;

const Title = styled.strong`
  font-size: 20px;
  width: 100%;
  display: block;
  font-weight: bold;
  text-align: left;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
`;

const TagMappingList = styled.div`
  border: 1px solid #eee;
  padding: 15px;
  border-radius: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
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
const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 50px;
  padding-left: calc(50% - 35px);
`;
