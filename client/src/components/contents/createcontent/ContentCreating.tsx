import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';

import styled from 'styled-components';

import { Button, DnDWrapper, Modal, Select } from '../..';
import { COLOR } from '../../constants/COLOR';

import { TestDnDItem } from './Classification';
import {
  questionList,
  selectCategory1,
  selectCategory3,
} from './contentCreatingCategory';
import { OptionList } from './options/OptionList';

export function ContentCreating({
  setTabVeiw,
}: {
  setTabVeiw: React.Dispatch<React.SetStateAction<string>>;
}) {
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

        <ScrollWrap>
          <SelectListWrap>
            <strong>
              과목<span>*</span>
            </strong>
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
        </ScrollWrap>
      </EditContainerWrap>

      <ContentListWrap>
        <ContentList>
          <ListWrap>
            <DnDWrapper
              dragList={initialItems}
              onDragging={() => {}}
              onDragEnd={() => {}}
              dragSectionName={'abc'}
            >
              {(dragItem, ref, isDragging) => (
                <li ref={ref} className={` ${isDragging ? 'opacity' : ''}`}>
                  <p className="title">
                    <span className="title_id">{dragItem.id}</span>
                  </p>
                </li>
              )}
            </DnDWrapper>
          </ListWrap>
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
const ScrollWrap = styled.div`
  overflow: auto;
  background-color: ${COLOR.LIGHT_GRAY};
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

  button {
    // 저장 버튼
    margin-top: 10px;
  }
`;
const ContentList = styled.div`
  width: 100%;
  overflow-y: auto;
  height: calc(100vh - 60px - 150px);
  border: 1px solid ${COLOR.BORDER_BLUE};
`;
const ListWrap = styled.ul`
  background-color: ${COLOR.LIGHT_GRAY};
  padding: 10px 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: fit-content;

  li {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    height: fit-content;
    padding: 10px;
    border: 1px solid ${COLOR.BORDER_BLUE};
    background-color: #fff;
    border-radius: 5px;
    min-height: 50px;
    margin-bottom: 10px;

    .title {
      font-size: 15px;
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      .title_id {
        width: calc(100% - 30px);
        text-overflow: ellipsis;
        word-break: break-all;
      }
    }
    .sub_title {
      width: 100%;
      font-size: 13px;
      border-top: 1px solid ${COLOR.BORDER_BLUE};
      text-align: right;
      margin-top: 5px;
      color: ${COLOR.PRIMARY};
    }

    &.opacity {
      opacity: 0.8;
    }
  }
`;
