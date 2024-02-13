import * as React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Button, Select } from '../..';
import { COLOR } from '../../constants/COLOR';

import {
  selectCategory1,
  selectCategory2,
  selectCategory3,
} from './contentCreatingCategory';

export function ContentCreating() {
  const [content, setContent] = useState<string[]>([]);

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);
  };

  const submitSave = () => {
    console.log('등록하려는 신규 문항에 대한 데이터 post 요청');
    console.log('신규 등록된 문항 리스트 get 요청 API');
  };

  const loadData = () => {
    // 기본 필수 셀렉트값 불러오기
    // 과목 / 출처 / 문항타입 셀렉트 데이터
  };

  useEffect(() => {
    loadData();
  }, []);
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
            <li>
              <SelectWrapper>
                {selectCategory1.map((el) => (
                  <Select
                    width={'110px'}
                    height={'30px'}
                    defaultValue={el.label}
                    key={el.label}
                    options={el.options}
                    onSelect={(event) => selectCategoryOption(event)}
                  />
                ))}
              </SelectWrapper>
            </li>
          </SelectList>
        </SelectListWrap>
        <SelectListWrap>
          <strong>출처</strong>
          <SelectList>
            <li>
              <SelectWrapper>
                {selectCategory2.map((el) => (
                  <Select
                    width={'110px'}
                    height={'30px'}
                    defaultValue={el.label}
                    key={el.label}
                    options={el.options}
                    onSelect={(event) => selectCategoryOption(event)}
                  />
                ))}
              </SelectWrapper>
            </li>
          </SelectList>
        </SelectListWrap>
        <SelectListWrap>
          <strong>문항타입</strong>
          <SelectList>
            <li>
              <SelectWrapper>
                {selectCategory3.map((el) => (
                  <Select
                    width={'110px'}
                    height={'30px'}
                    defaultValue={el.label}
                    key={el.label}
                    options={el.options}
                    onSelect={(event) => selectCategoryOption(event)}
                  />
                ))}
              </SelectWrapper>
            </li>
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
  margin-bottom: 20px;
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
  align-items: center;
  padding: 0 10px;

  strong {
    font-size: 15px;
  }

  &:last-child {
    padding-bottom: 100px;
  }
  &:nth-child(2) {
    padding-top: 10px;
  }
`;
const SelectList = styled.ul`
  padding: 5px 10px;
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

const SelectWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 5px;
`;
