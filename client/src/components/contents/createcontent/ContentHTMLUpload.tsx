import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { Button, Modal, openToastifyAlert, Select } from '../..';
import { EditorDataType } from '../../../types';
import { COLOR } from '../../constants/COLOR';

import { EditerOneFile } from './editer';

export function ContentHTMLUpload({
  setTabView,
  type,
}: {
  setTabView: React.Dispatch<React.SetStateAction<string>>;
  type: string;
}) {
  const [editorData, setEditorData] = useState<EditorDataType | null>(null);

  return (
    <Container>
      <ContentsWrapper>
        <EditContainerWrapper>
          <PerfectScrollbar>
            <EditWrapper>
              <EditerOneFile type={type} setEditorData={setEditorData} />
            </EditWrapper>
          </PerfectScrollbar>
        </EditContainerWrapper>

        <Modal />
      </ContentsWrapper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const ContentsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  height: calc(100vh - 200px);
  position: relative;
`;

const EditContainerWrapper = styled.div`
  flex: 1 0 0;
  margin-bottom: 300px;
`;

const EditWrapper = styled.div`
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
  width: 100%;
`;
