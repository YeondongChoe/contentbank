import * as React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

export function EditerOneFile() {
  const [isRendered, setRendered] = useState(false);

  useEffect(() => {
    if (isRendered) {
      const scripts = [
        '/static/dream_ui/js/data_view_area.js',
        '/static/dream_ui/js/frame_controller.js',
        '/static/iTeX_EQ/js/itex_total_eq_origin_32.js',
        '/static/iTeX_fulltext/js/fulltext_dream.js?v=0.71',
        '/static/iTeX_fulltext/js/itex_parser_dream.js?v=0.9.6.12',
        '/static/iTeX_fulltext/js/itex_parser_pj2.js?v=0.9.1',
        '/static/iTeX_fulltext/js/itex_parser_dream.js?v=0.9.1',
        '/static/iTeX_fulltext/js/cw_poc_pj_dream.js?v=0.87',
        '/static/iTeX_fulltext/js/dream_function.js',
        '/static/iTeX_fulltext/js/hmlupload.js?v=0.1',
        '/static/iTeX_fulltext/js/pdf_postprocess.js?v=0.1',
        '/static/iTeX_EQ/js/tex-svg-full_3_2_2.js?v=0.1',
        '/static/OCR/js/main_iframe.js?v=0.1',
        // '/static/iTeX_EQ/js/itexLoader.js',
        // '/static/',
      ];

      scripts.forEach((src) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
        return () => {
          document.body.removeChild(script);
        };
      });
    }
  }, [isRendered]);

  return (
    <Container
      onLoad={() => {
        setRendered(true);
      }}
    >
      <div className="itex_editor_container">
        <div id="first" className="resizeable">
          <div id="itex_viewer_area">
            <div id="data_viewer_header">
              <ul id="viewer_list">
                <li id="add_viewer" className="viewer_li">
                  +
                </li>
              </ul>
            </div>
            <div id="data_viewer_body">
              <div className="trans_area h-100">
                {/* <div className="itex_hml_convert_view" contenteditable="true"></div> */}
                <button id="pasteButton" className="hml_copy_btn">
                  붙여넣기
                </button>
                <div className="origin_img_area h-100">
                  <div className="itex_ocrimg_area">
                    <img id="itex_main_img" />
                  </div>
                  <div className="itex-drag-area">
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <g>
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path d="M16 2l5 5v13.993A1 1 0 0 1 20.007 22H3.993A1 1 0 0 1 3 21.008V2.992C3 2.444 3.447 2 3.999 2H16zM9.333 14.667H8V18h8v-1.333l-6.667-.001v-2zM12 14.333a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM12 9a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm0 1.333a1.167 1.167 0 1 1 0 2.334 1.167 1.167 0 0 1 0-2.334zM12.667 6h-1.334v1.333H8v1.334h8V7.333h-3.334V6z" />
                        </g>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-camera-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                        <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-image-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-file-earmark-pdf-fill"
                        viewBox="0 0 18 16"
                      >
                        <path d="M5.523 12.424c.14-.082.293-.162.459-.238a7.878 7.878 0 0 1-.45.606c-.28.337-.498.516-.635.572a.266.266 0 0 1-.035.012.282.282 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548zm2.455-1.647c-.119.025-.237.05-.356.078a21.148 21.148 0 0 0 .5-1.05 12.045 12.045 0 0 0 .51.858c-.217.032-.436.07-.654.114zm2.525.939a3.881 3.881 0 0 1-.435-.41c.228.005.434.022.612.054.317.057.466.147.518.209a.095.095 0 0 1 .026.064.436.436 0 0 1-.06.2.307.307 0 0 1-.094.124.107.107 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256zM8.278 6.97c-.04.244-.108.524-.2.829a4.86 4.86 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.517.517 0 0 1 .145-.04c.013.03.028.092.032.198.005.122-.007.277-.038.465z" />
                        <path
                          fillRule="evenodd"
                          d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.651 11.651 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.856.856 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.844.844 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.76 5.76 0 0 0-1.335-.05 10.954 10.954 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.238 1.238 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a19.697 19.697 0 0 1-1.062 2.227 7.662 7.662 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103z"
                        />
                      </svg>
                    </div>
                    {/* <!--<button id="fileload">이미지/PDF</button>--> */}
                    <input id="upload_file" name="images" type="file" />
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path
                        fillRule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
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
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-counterclockwise"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
                      />
                      <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                    </svg>
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
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-clockwise"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                      />
                      <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    id="onPrevPage"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    title="이전 페이지"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chevron-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    id="onNextPage"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    title="다음 페이지"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chevron-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-box-arrow-in-up-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z"
                      />
                    </svg>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-bar-chart-line"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z" />
                    </svg>
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
              {/* <!-- ƒ --> */}
              <div>
                <div className="btn-group btn-group-sm">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-placement="top"
                    title="선택영역의 컨텐츠를 인식합니다."
                    id="doc_ocr_converter"
                  >
                    문항인식
                  </button>
                  {/* <!-- <button
	type="button"
	class="btn btn-success"
	id="direct_eqn"
	data-bs-placement="top"
	title="선택영역을 수식으로 인식합니다."
>
	수식인식
</button> --> */}
                  <button
                    type="button"
                    className="btn btn-success"
                    id="img_crop_normal"
                    data-bs-placement="top"
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x-lg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {/* <!-- Modal -->
<!-- <div class="modal fade" id="eqnexchangeModal" tabindex="-1" aria-labelledby="eqnexchangeModalLabel" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered">
<div class="modal-content">
<div class="modal-header">
	<h5 class="modal-title" id="eqnexchangeModalLabel">수식인식 선택</h5>
	<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
	<button type="button" class="btn btn-secondary eqn_crop_act" id="fulltext_eqn" data-bs-dismiss="modal" title="깨끗한 문서의 선택영역을 인식합니다.">일반 모드</button> : 워터마크가 없는 일반 이미지 또는 PDF를 대상으로 합니다. 필기 흔적 등을 제외한 인쇄체를 대상으로 변환합니다.<br/></br>
	<button type="button" class="btn btn-secondary eqn_crop_act" id="fulltext_eqn_noise" data-bs-dismiss="modal" title="지저분한 문서의 선택영역을 인식합니다.">노이즈모드</button> : 스냅샷, 필기 흔적이 있는 스캔 이미지 문서에서 필기 흔적 등을 제외한 인쇄체를 대상으로 변환합니다. 
</div>
</div>
</div>
</div> --> */}
            {/* <!--image viewer-->
<!-- <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">
<div class="offcanvas-header">
	<h5 class="offcanvas-title w-100 text-center" id="offcanvasScrollingLabel">최근 업로드 이미지(20개)</h5>
	<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
</div>
<div class="offcanvas-body">
	<div class="itex_img_pic1"></div>
</div>
<div class="modal-footer">
	<button type="button" class="btn btn-outline-warning" id="itex_img_reload">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16"><path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/><path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/></svg>
	Reload</button>
	<button type="button" class="btn btn-danger" id="itex_img_load" data-bs-dismiss="offcanvas">선택</button>
</div>
</div>   --> */}
          </div>
        </div>
        <div id="dragger-left" className="dragger dragger-left">
          <button className="open_btn_left" style={{ display: 'none' }}>
            -
          </button>
        </div>
        <div id="second" className="resizeable">
          <div className="col-lg-4 p-0 tiny_wrap">
            <textarea id="tinyeditor"></textarea>
            <div className="save_exam_btn_wrap">
              <button id="exam_save">문항 저장</button>
            </div>
            <div className="poc_checker_block"></div>
          </div>
        </div>
        {/* <!-- <div id="dragger-right" class="dragger dragger-right">
<button class="open_btn_right" style="display: none"><</button>
</div> --> */}

        <div className="tools_wrap eq_config_hidden">
          <div id="equation_board"></div>
          <div id="iframe_ocr_box">
            <iframe
              width="0"
              height="0"
              src="OCR/ocr_iframe_origin.html?v=0.34"
              frameBorder="0"
              scrolling="no"
              id="itex_frame_area"
            ></iframe>
          </div>
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
          {/* <!-- <div class="modal fade" id="alertModal" tabindex="-1" aria-labelledby="alertModalLabel" aria-hidden="true">
<div class="modal-dialog">
<div class="modal-content">
<div class="modal-header">
<h5 class="modal-title" id="alertModalLabel">Qn.AI</h5>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body"></div>
<div class="modal-footer">
<button type="button" class="btn btn-primary" data-bs-dismiss="modal">확인</button>
</div>        
</div>
</div> --> */}
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
  width: 100%;
  height: calc(100vh - 100px);
  padding: 0;
  margin: 0;
  display: flex;
  align-items: stretch;

  .itex_editor_container {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .resizeable {
    box-sizing: border-box;
  }

  #first {
    position: relative;
  }

  #second {
    min-width: 400px;
    position: relative;
  }

  /* #third {
  } */

  .dragger {
    cursor: ew-resize;
    width: 4px;
    border-left: 1px solid black;
    border-right: 1px solid black;
    box-sizing: border-box;
    position: relative;
  }
  .open_btn_left {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    border: none;
    border-radius: 0 10px 10px 0;
    left: 0;
    width: 20px;
    text-align: center;
    height: 130px;
    cursor: pointer;
    z-index: 999;
  }
  .open_btn_left:hover {
    left: 11px;
  }
  .open_btn_right {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    border: none;
    border-radius: 10px 0 0 10px;
    left: 0px;
    width: 20px;
    height: 130px;
    cursor: pointer;
    z-index: 999;
  }
  .open_btn_right:hover {
    left: -10px;
  }
  .active_area {
    display: block;
  }
  .inactive_area {
    display: none;
  }

  /* data_view_area ============================================= */
  /* == first =================================================== */
  #data_viewer_header {
    width: 100%; /* 부모 div의 크기를 제한합니다 */
    overflow-x: hidden; /* 부모 div의 크기가 변경되지 않도록 합니다 */
  }
  #viewer_list {
    width: 100%;
    list-style: none;
    display: flex;
    margin: 10px 0 1px 0;
    border-bottom: 1px solid #e7e7ed;
    padding: 0 20px 0 20px;
    /* overflow-x: auto; */
    white-space: nowrap;
  }
  /* #viewer_list > li { */
  .viewer_li {
    position: relative;
    width: 5rem;
    height: 2rem;
    background-color: #e7e7ed;
    text-align: center;
    border-radius: 8px 8px 0 0;
    margin: 0 1px 1px 1px;
    line-height: 1.8;
    cursor: pointer;
    /* overflow: hidden; */
    white-space: nowrap; /* 텍스트를 한 줄로 유지 */
    text-overflow: ellipsis; /* 생략 부호(...) 추가 */
  }
  .viewer_li .delete-btn {
    display: none;
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 24px;
    height: 15px;
    font-size: 0.5rem;
    line-height: 0;
    background-color: pink;
    border: none;
    padding: none;
    border-radius: 8px;
    cursor: pointer;
    z-index: 999;
  }
  .delete-btn:hover {
    color: white;
    background-color: red;
  }
  .viewer_li:hover .delete-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .list_picked {
    background-color: #6c757d;
    color: white;
  }
  .origin_img_area {
    border: none;
    padding: 3px;
    max-height: 100%;
    overflow: hidden;
  }
  .itex_ocrimg_area {
    max-height: 100%; /* 부모 요소의 높이 비율로 조정 */
    overflow: hidden;
  }
  .cropper-canvas {
    max-height: 100%; /* 부모 요소의 높이 비율로 조정 */
    overflow: hidden;
  }

  .exam_box {
    margin: 20px 0;
    padding: 5px 5px 15px 5px;
    border-bottom: 1px dashed #6c757d;
  }
  .exam_box:hover {
    cursor: pointer;
    border-radius: 10px;
    box-shadow:
      rgba(0, 0, 0, 0.12) 0px 1px 3px,
      rgba(0, 0, 0, 0.24) 0px 1px 2px;
  }
  .tag_bigcontent {
    background: #ff0000;
    color: white;
    font-weight: bold;
    padding-left: 5px;
    border-radius: 5px;
    margin: 5px 0;
  }
  .tag_content {
    background: #228b22;
    color: white;
    font-weight: bold;
    padding-left: 5px;
    border-radius: 5px;
    margin: 5px 0;
  }
  .tag_exam {
    background: #0000ff;
    color: white;
    font-weight: bold;
    padding-left: 5px;
    border-radius: 5px;
    margin: 5px 0;
  }
  .tag_exam_sm {
    background: #ffff00;
    color: #000000;
    font-weight: bold;
    padding-left: 5px;
    border-radius: 5px;
    margin: 5px 0;
  }
  .tag_example {
    background: #00ffff;
    color: #000000;
    font-weight: bold;
    padding-left: 5px;
    border-radius: 5px;
    margin: 5px 0;
  }
  .tag_choices {
    background: #ff00ff;
    color: white;
    font-weight: bold;
    padding-left: 5px;
    border-radius: 5px;
    margin: 5px 0;
  }
  .tl_answer {
    background: #ffa500;
    color: white;
    font-weight: bold;
    padding-left: 5px;
    border-radius: 5px;
    margin: 5px 0;
  }
  .tag_commentary {
    background: #800080;
    color: white;
    font-weight: bold;
    padding-left: 5px;
    border-radius: 5px;
    margin: 5px 0;
  }
  .tag_hint {
    background: #a52a2a;
    color: white;
    font-weight: bold;
    padding-left: 5px;
    border-radius: 5px;
    margin: 5px 0;
  }
  .tag_concept {
    background: #ffc0cb;
    color: #000000;
    font-weight: bold;
    padding-left: 5px;
    border-radius: 5px;
    margin: 5px 0;
  }
  .tag_title {
    background: #00ff00;
    color: #000000;
    font-weight: bold;
    padding-left: 5px;
    border-radius: 5px;
    margin: 5px 0;
  }
  .tag_tip {
    background: #008080;
    color: white;
    font-weight: bold;
    padding-left: 5px;
    border-radius: 5px;
    margin: 5px 0;
  }

  .level4_box {
    background-color: pink;
    color: white;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0;
  }

  .level8_box {
    background-color: yellow;
    color: white;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0;
  }
  .hml_copy_btn {
    display: none;
    position: fixed;
  }
  /* == second =================================================== */
  .tiny_wrap {
    width: 100%;
    height: 100%;
  }
  .save_exam_btn_wrap {
    background-color: #e7e7ed;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 10%;
  }
  #exam_change,
  #exam_save_all {
    width: 40%;
    height: 50%;
    border-radius: 0.5rem;
  }
  #exam_change {
    border: 2px solid yellowgreen;
  }
  #exam_change:hover {
    border: none;
    background-color: yellowgreen;
    color: white;
  }
  #exam_save_all {
    border: 2px solid #3498db;
  }
  #exam_save_all:hover {
    border: none;
    background-color: #3498db;
    color: white;
  }
  #exam_save {
    width: 60%;
    height: 40px;
    border-radius: 8px;
    color: white;
    font-weight: 800;
    border: none;
    background-color: #6c757d;
    max-width: 450px;
  }
  #exam_save:hover {
    background-color: #3498db;
  }
  .meta_area {
    width: 100%;
    height: 15%;
    overflow-y: auto;
    background-color: #e7e7ed;
  }
  .meta_input_container {
    position: relative;
    /* margin-bottom: 20px; */
    box-sizing: border-box;
    width: 40%;
    margin: 5px;
  }
  .meta_input_label {
    position: absolute;
    left: 0px;
    top: -2px;
    font-size: 12px;
    color: #777;
    transition: all 0.2s ease-out;
    pointer-events: none;
  }
  .meta_input {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #000;
    padding: 8px 4px 2px 4px;
    outline: none;
    box-shadow: none;
    color: #000;
    font-size: 14px;
  }
  .meta_input:focus {
    border-bottom: 2px solid #000;
    background-color: transparent;
    outline: none;
    box-shadow: none;
  }
  .meta_input:focus > .meta_input_label {
    font-size: 0.5rem;
  }

  #meta_list {
    list-style: none;
    margin-top: 5px;
    padding: 0;
  }
  .meta_type {
    display: flex;
    align-items: center;
    border-bottom: 1px dashed #6c757d;
  }
  .meta_title {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 10px;
  }
  .meta_contents {
    margin: 5px 0;
    width: 80%;
    display: flex;
    flex-wrap: wrap;
  }

  .meta_select {
    width: 40%;
    display: inline-block;
    margin: 5px;
  }

  .copy-btn {
    position: absolute;
    display: none;
    padding: 5px 10px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    z-index: 1000;
  }

  /* == third =================================================== */
  .exam_list {
    height: 87%;
    overflow: auto;
    position: relative;
  }
  #pagination {
    position: absolute;
    bottom: 1rem;
  }
  #pagination button {
    background-color: #e7e7ed;
    border-radius: 8px;
    border: none;
    margin: 3px;
    padding: 3px 8px;
    cursor: pointer;
  }

  #pagination button.active {
    font-weight: bold;
    background-color: #6c757d;
    color: white;
  }

  /* == editor =================================================== */
  .itex_slash {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="100%" x2="100%" y2="0" stroke="gray" /></svg>') !important;
  }
  .itex_backslash {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" /></svg>') !important;
  }
  .itex_slash,
  .itex_backslash {
    text-align: left;
  }
`;
