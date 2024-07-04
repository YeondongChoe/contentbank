import * as React from 'react';
import { useEffect, useState } from 'react';

import { IoMdClose } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export function Formula() {
  const [htmlContent, setHtmlContent] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const closePopup = () => {
    // setIsOpenPopup(false);
  };

  useEffect(() => {
    fetch('/static/OCR/ocr_iframe_origin.html')
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
  display: flex;
  flex-direction: column;
`;
