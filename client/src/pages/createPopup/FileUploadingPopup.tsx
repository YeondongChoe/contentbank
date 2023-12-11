import * as React from 'react';

import { Button } from '@mui/material';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { updateBoolAtom } from '../../state/utilAtom';

export function FileUploadingPopup() {
  const isEdit = useRecoilValue(updateBoolAtom);

  const submitSave = () => {
    console.log('등록하려는 신규 문항에 대한 데이터 post 요청 API');
    console.log('신규 등록된 문항 리스트 get 요청 API');
  };

  return (
    <Container>
      <div>문항 파일 등록 아이텍솔루션</div>
      <StyledEditBtn variant="contained" onClick={submitSave}>
        {isEdit ? '수정' : '저장'}
      </StyledEditBtn>
    </Container>
  );
}

const Container = styled.div`
  max-width: 80%;
  min-width: 800px;
  padding: 20px;
  border: 1px solid #a3aed0;
  border-top: none;
`;

const StyledEditBtn = styled(Button)`
  && {
    width: 70px;
    height: 25px;
    border-radius: 5px;
    font-size: 12px;
    line-height: normal;
  }
`;
