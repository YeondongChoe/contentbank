import * as React from 'react';
import { useEffect, useState, useRef } from 'react';

import styled from 'styled-components';

import { MathViewer, Button, Select, Input, ResizeLayout } from '../..';
import { COLOR } from '../../constants/COLOR';
import Contents from '../../mathViewer/test1.json';

import dummy from './data.json';

export function Classification() {
  const ContentList = dummy.ContentInfo;

  const submitSave = async () => {
    console.log('항목의 변화가 없으면 버튼 비활성화');
    console.log('변경된 문항Info Put 요청 APi');
  };

  useEffect(() => {}, []);

  return (
    <Container>
      <ResizeLayout
        height={'calc(100vh - 100px)'}
        column={'3rd'}
        item1={<p>dsa</p>}
        item2={<p>dsadsa</p>}
        item3={<p>dsadsa</p>}
      />
    </Container>
  );
}

const Container = styled.div`
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
`;
