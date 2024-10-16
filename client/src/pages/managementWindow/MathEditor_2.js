import React, { useEffect, useRef } from 'react';

const dynamicallyLoadScripts = (scripts, callback) => {
  if (scripts.length === 0) {
    if (callback) callback();
    return;
  }

  const src = scripts.shift();
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  script.onload = () => {
    // console.log(`${src} loaded successfully`);
    dynamicallyLoadScripts(scripts, callback);
  };
  script.onerror = () => {
    console.error(`Failed to load script: ${src}`);
    dynamicallyLoadScripts(scripts, callback);
  };
  document.body.appendChild(script);
};

const MathEditor = () => {
  const ocrIframeContainer = useRef(null);
  window.editorType_s = true;

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

    const initComponent = async () => {
      dynamicallyLoadScripts([...initialScripts], async () => {
        console.log('Initial scripts loaded');

        // const html = await fetchHtmlContent();
        // setHtmlContent(html);

        setTimeout(() => {
          dynamicallyLoadScripts([...subsequentScripts], () => {
            // console.log("Subsequent scripts loaded");
            // Add the iframe after the subsequent scripts are loaded
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
        }, 0);
      });
    };

    initComponent();
  }, []);
  // =============== 테스트 영역 ========================
  const handleEditorOpen = (node_name) => {
    window.openEQ(node_name);
  };
  // =============== 테스트 영역 ========================

  return (
    <div>
      {/* ================== 테스트 영역 ================= */}
      <button
        style={{ margin: '10px' }}
        onClick={() => {
          handleEditorOpen('first_area_test');
        }}
      >
        에디터 오픈 1
      </button>
      <button
        onClick={() => {
          handleEditorOpen('second_area_test');
        }}
      >
        에디터 오픈 2
      </button>
      <button
        onClick={() => {
          handleEditorOpen('third_area_test');
        }}
      >
        에디터오픈3
      </button>
      <h1>first</h1>
      <div
        className="first_area_test"
        style={{ height: '100px', width: '300px', border: '1px solid red' }}
      ></div>
      <h1>second</h1>
      <div
        className="second_area_test"
        style={{ height: '100px', width: '300px', border: '1px solid orange' }}
      ></div>
      <h1>third</h1>
      <div
        contentEditable
        className="third_area_test"
        style={{ height: '100px', width: '300px', border: '1px solid orange' }}
      ></div>
      {/* ================== 테스트 영역 ================= */}
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
                    {/* <TrashIcon /> */}
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
                    {/* <ArrowCounterclockwiseIcon /> */}
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
                    {/* <ArrowClockwiseIcon /> */}
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
                    {' '}
                    {/* <ChevronLeftIcon /> */}
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
                    {/* <ChevronRightIcon /> */}
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
                    {/* <BoxArrowInUpRightIcon /> */}
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
                    {/* <BarCharLineIcon /> */}
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
                    {/* <CloseIcon /> */}
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
          <div id="iframe_ocr_box" ref={ocrIframeContainer}></div>{' '}
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
    </div>
  );
};

export default MathEditor;
