import * as React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

export function EditerOneFile() {
  const [htmlContent, setHtmlContent] = useState('');
  // const [isRendered, setRendered] = useState(false);

  // useEffect(() => {
  //   if (isRendered) {
  //     const scripts = [
  //       '/static/dream_ui/js/data_view_area.js',
  //       '/static/dream_ui/js/frame_controller.js',
  //       '/static/iTeX_EQ/js/itex_total_eq_origin_32.js',
  //       '/static/iTeX_fulltext/js/fulltext_dream.js?v=0.71',
  //       '/static/iTeX_fulltext/js/itex_parser_dream.js?v=0.9.6.12',
  //       '/static/iTeX_fulltext/js/itex_parser_pj2.js?v=0.9.1',
  //       '/static/iTeX_fulltext/js/itex_parser_dream.js?v=0.9.1',
  //       '/static/iTeX_fulltext/js/cw_poc_pj_dream.js?v=0.87',
  //       '/static/iTeX_fulltext/js/dream_function.js',
  //       '/static/iTeX_fulltext/js/hmlupload.js?v=0.1',
  //       '/static/iTeX_fulltext/js/pdf_postprocess.js?v=0.1',
  //       '/static/iTeX_EQ/js/tex-svg-full_3_2_2.js?v=0.1',
  //       '/static/OCR/js/main_iframe.js?v=0.1',
  //       // '/static/',
  //     ];

  //     scripts.forEach((src) => {
  //       const script = document.createElement('script');
  //       script.src = src;
  //       script.async = true;
  //       document.body.appendChild(script);
  //       return () => {
  //         document.body.removeChild(script);
  //       };
  //     });
  //   }
  // }, [isRendered]);
  useEffect(() => {
    // fetch('/static/iTeX_EQ/ocr_iframe_origin.html')
    fetch('/view/type3.html')
      .then((response) => response.text())
      .then((data) => setHtmlContent(data));
  }, []);

  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
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
