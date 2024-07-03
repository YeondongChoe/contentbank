import * as React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

export function EditerOneFile({ style }: { style?: any }) {
  const [htmlContent, setHtmlContent] = useState('');
  const defaultStyle = { border: 'none', ...style };
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
    // fetch('/static/OCR/ocr_iframe_origin.html')
    fetch('/view/type3.html')
      .then((response) => response.text())
      .then((data) => setHtmlContent(data));
  }, []);

  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      {/* <iframe
        id={id}
        src={src}
        width={width}
        height={height}
        title={title}
        style={defaultStyle}
      /> */}
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
`;
