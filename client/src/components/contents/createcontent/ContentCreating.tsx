import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';

import styled from 'styled-components';

import { Button, DnDWrapper, Modal, Select } from '../..';
import { COLOR } from '../../constants/COLOR';

import {
  questionList,
  selectCategory1,
  selectCategory3,
} from './contentCreatingCategory';
import { QuizList, TestDnDItem } from './list';
import { OptionList } from './options/OptionList';

export function ContentCreating({
  setTabVeiw,
}: {
  setTabVeiw: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [initialItems, _] = useState<TestDnDItem[]>(questionList);
  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;

    // setContent((prevContent) => [...prevContent, value]);
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

        <BackgroundWrap>
          <SelectListWrap>
            <strong>
              과목<span>*</span>
            </strong>
            <SelectList>
              <li>
                <SelectWrapper>
                  {selectCategory1.map((el) => (
                    <Select
                      $positionTop
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
            <strong>
              출처<span>*</span>
            </strong>
            <SourceOptionWrap>
              {/* 옵션 리스트 셀렉트 컴포넌트 */}
              <OptionList />
            </SourceOptionWrap>
          </SelectListWrap>
          <SelectListWrap>
            <strong>
              문항타입<span>*</span>
            </strong>
            <SelectList>
              <li>
                <SelectWrapper>
                  {selectCategory3.map((el) => (
                    <Select
                      $positionTop
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
            <strong>난이도</strong>
            <SelectList>
              <li>
                <SelectWrapper>
                  {selectCategory3.map((el) => (
                    <Select
                      $positionTop
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
        </BackgroundWrap>
      </EditContainerWrap>

      <ContentListWrap>
        <ContentList>
          <QuizList
            questionList={questionList}
            $height={`calc(100vh - 60px - 150px)`}
            showViewAllButton
            setCheckedList={setCheckedList}
          />
        </ContentList>
        <Button
          buttonType="button"
          onClick={submitSave}
          height={'40px'}
          $filled
          fontSize="12px"
        >
          <span>등록</span>
        </Button>
        <Button
          buttonType="button"
          onClick={() => setTabVeiw('문항 분류')}
          height={'40px'}
          fontSize="12px"
        >
          <span>추가 정보 등록</span>
        </Button>
      </ContentListWrap>

      <Modal />
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
  min-height: calc(100vh - 60px - 200px); // 탭 네비 높이, 하단 셀렉트 높이 제외
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
  margin-bottom: 10px;
`;
const BackgroundWrap = styled.div`
  background-color: ${COLOR.BUTTON_LIGHT_NORMAL};
`;
const SelectListWrap = styled.div`
  display: flex;
  /* align-items: center; */
  padding: 0 15px;

  strong {
    min-width: 40px;
    padding-top: 10px;
    /* line-height: 1.2; */
    font-size: 15px;
    padding-right: 10px;
    position: relative;
    span {
      position: absolute;
      top: 10px;
      right: 0px;
      color: ${COLOR.RED};
      font-size: 14px;
    }
  }

  &:last-child {
    padding-bottom: 20px;
  }
  &:nth-child(1) {
    padding-top: 20px;
  }
`;

const SourceOptionWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const SelectList = styled.ul`
  padding: 5px 10px;

  li {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
`;
const SelectWrapper = styled.div`
  display: flex;
  flex: 1 1 0;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;
  color: ${COLOR.GRAY};
`;

const ContentListWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 25%;
  padding: 10px;

  > button {
    // 저장 버튼
    margin-top: 10px;
  }
`;
const ContentList = styled.div`
  width: 100%;
  /* overflow: hidden; */
  border: 1px solid ${COLOR.BORDER_BLUE};
`;
