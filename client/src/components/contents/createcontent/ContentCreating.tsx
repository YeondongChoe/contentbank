import * as React from 'react';

import styled from 'styled-components';

import { Button } from '../..';
import { COLOR } from '../../constants/COLOR';

export function ContentCreating() {
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

      <EditContainerWrap>
        <EditWrap>EditWrap</EditWrap>
        <SelectListWrap>
          <strong>과목</strong>
          <SelectList>
            <li>셀렉트</li>
          </SelectList>
        </SelectListWrap>
        <SelectListWrap>
          <strong>출처</strong>
          <SelectList>
            <li>셀렉트</li>
          </SelectList>
        </SelectListWrap>
        <SelectListWrap>
          <strong>문항타입</strong>
          <SelectList>
            <li>셀렉트</li>
          </SelectList>
        </SelectListWrap>
      </EditContainerWrap>

      <ContentListWrap>
        <ContentList>
          <ul>map</ul>
        </ContentList>
        <Button
          buttonType="button"
          onClick={submitSave}
          height={'40px'}
          $margin="0px"
          fontSize="12px"
        >
          <span>저장</span>
        </Button>
      </ContentListWrap>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;

const EditContainerWrap = styled.div`
  flex: 1 1 0;
`;
const EditWrap = styled.div`
  min-height: calc(100vh - 60px - 100px); // 탭 네비 높이, 하단 셀렉트 높이 제외
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
  margin-bottom: 10px;
`;
const SelectListWrap = styled.div`
  background-color: ${COLOR.LIGHT_GRAY};
  display: flex;
`;
const SelectList = styled.ul`
  padding: 10px;
`;
const ContentListWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 25%;
  padding: 10px;

  button {
    // 저장 버튼
    margin: 10px;
  }
`;
const ContentList = styled.div`
  width: 100%;
  min-height: calc(100vh - 60px - 100px);
  border: 1px solid ${COLOR.BORDER_BLUE};
`;
