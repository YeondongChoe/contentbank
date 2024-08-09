import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { IoMdClose } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const dynamicallyLoadScripts = (
  scripts: string | any[],
  callback: { (): void; (): void; (): void },
) => {
  const loadScript = (index: number) => {
    if (index >= scripts.length) {
      callback();
      return;
    }

    const src = scripts[index];
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
      // console.log(`${src} loaded successfully`);
      loadScript(index + 1);
    };
    script.onerror = () => {
      console.error(`Failed to load script: ${src}`);
      loadScript(index + 1);
    };
    document.body.appendChild(script);
  };

  loadScript(0);
};

export function Formula() {
  const ocrIframeContainer = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const closePopup = () => {
    // setIsOpenPopup(false);
  };

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

    const initComponent = () => {
      dynamicallyLoadScripts(initialScripts, () => {
        console.log('Initial scripts loaded');

        // const html = await fetchHtmlContent();
        // setHtmlContent(html);

        dynamicallyLoadScripts(subsequentScripts, () => {
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
      });
    };

    initComponent();
  }, []);

  return (
    <Container>
      <div ref={ocrIframeContainer}></div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
