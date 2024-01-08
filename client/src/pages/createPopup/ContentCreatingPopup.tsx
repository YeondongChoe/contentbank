import * as React from 'react';

import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { Button } from '../../components';
import { COLOR } from '../../components/constants/COLOR';
import { updateBoolAtom } from '../../store/utilAtom';

export function ContentCreatingPopup() {
  const isEdit = useRecoilValue(updateBoolAtom);

  const submitSave = () => {
    console.log('등록하려는 신규 문항에 대한 데이터 post 요청');
    console.log('신규 등록된 문항 리스트 get 요청 API');
  };

  return (
    <Container>
      {/* <iframe
        width="100%"
        height="672"
        //src="http://43.201.205.140:40031"
        name="아이텍솔루션"
        frameBorder={0}
        //allow="fullscreen"
        //sandbox="allow-forms allow-modals allow-same-origin"
        //referrerPolicy="no-referrer"
      ></iframe> */}
      {/* <iframe></iframe> */}
      <Button
        buttonType="button"
        onClick={submitSave}
        height={'25px'}
        width={'70px'}
        $margin="0px"
        fontSize="12px"
      >
        <span>{isEdit ? '수정' : '저장'}</span>
      </Button>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1024px;
  min-width: 948px;
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
`;
