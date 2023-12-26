import * as React from 'react';

import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { Button } from '../../components';
import { COLOR } from '../../components/constants/COLOR';
import { updateBoolAtom } from '../../state/utilAtom';

export function ContentCreatingPopup() {
  const isEdit = useRecoilValue(updateBoolAtom);

  const submitSave = () => {
    console.log('등록하려는 신규 문항에 대한 데이터 post 요청');
    console.log('신규 등록된 문항 리스트 get 요청 API');
  };

  return (
    <Container>
      <div>문항 신규 제작 아이텍솔루션</div>
      <Button
        buttonType="button"
        onClick={submitSave}
        height={'25px'}
        width={'70px'}
        fontSize="12px"
      >
        <span>{isEdit ? '수정' : '저장'}</span>
      </Button>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1024px;
  min-width: 800px;
  padding: 20px;
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
  height: 673px;
`;
