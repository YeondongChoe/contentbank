import * as React from 'react';
import { useEffect, useState, useRef } from 'react';

import styled from 'styled-components';

import { CheckBox, DnDWrapper, ResizeLayout } from '../..';
import { COLOR } from '../../constants/COLOR';
import Contents from '../../mathViewer/test1.json';

import dummy from './data.json';

export const list = [
  { id: 1, name: 'Item 1', column: 'DO_IT' },
  { id: 2, name: 'Item 2', column: 'DO_IT' },
  { id: 3, name: 'Item 3', column: 'DO_IT' },
  { id: 4, name: 'Item 4', column: 'DO_IT' },
];

export interface TestDnDItem {
  id: string;
  text: string;
}

export function Classification() {
  const ContentList = dummy.ContentInfo;

  const [initialItems, _] = useState<TestDnDItem[]>([
    {
      id: 'Gasdv_1234567890',
      text: '수학/수1/내신/객관식',
    },
    {
      id: 'Gasdv_12345678901',
      text: '수학/수1/내신/객관식',
    },
    {
      id: 'Gasdv_12345678902',
      text: '수학/수1/내신/객관식',
    },
    {
      id: 'Gasdv_12345678903',
      text: '수학/수1/내신/객관식',
    },
    {
      id: 'Gasdv_12345678904',
      text: '수학/수1/내신/객관식',
    },
    {
      id: 'Gasdv_12345678905',
      text: '수학/수1/내신/객관식',
    },
    {
      id: 'Gasdv_12345678906',
      text: '수학/수1/내신/객관식',
    },
    {
      id: 'Gasdv_12345678907',
      text: '수학/수1/내신/객관식',
    },
    {
      id: 'Gasdv_12345678908',
      text: '수학/수1/내신/객관식',
    },
    {
      id: 'Gasdv_12345678909',
      text: '수학/수1/내신/객관식',
    },
    {
      id: 'Gasdv_123456789010',
      text: '수학/수1/내신/객관식',
    },
    {
      id: 'Gasdv_123456789011',
      text: '수학/수1/내신/객관식',
    },
    {
      id: 'Gasdv_123456789012',
      text: '수학/수1/내신/객관식',
    },
    {
      id: 'Gasdv_123456789013',
      text: '수학/수1/내신/객관식',
    },
    {
      id: 'Gasdv_123456789014',
      text: '수학/수1/내신/객관식',
    },
    {
      id: 'Gasdv_123456789015',
      text: '수학/수1/내신/객관식',
    },
  ]);
  const whenDragging = (newList: TestDnDItem[]) => {
    // console.log("!드래그중일떄", newList);
  };
  const whenDragEnd = (newList: TestDnDItem[]) => {
    console.log('@드래그끝났을떄', newList);
  };

  const submitSave = async () => {
    console.log('항목의 변화가 없으면 버튼 비활성화');
    console.log('변경된 문항Info Put 요청 APi');
  };

  useEffect(() => {
    // 탭 또는 버튼 이동시 이전 단계 저장된 리스트 불러오기
  }, []);

  return (
    <Container>
      <ResizeLayout
        height={'calc(100vh - 100px)'}
        column={'3rd'}
        item1={
          <ScrollWrap>
            <Title>
              <CheckBox
                width={`15px`}
                $margin={'0 5px 0 0'}
                isChecked={false}
                onClick={() => {}}
              ></CheckBox>
              <span className="title_top">전체선택</span>
            </Title>
            <ListWrap>
              <DnDWrapper
                dragList={initialItems}
                onDragging={whenDragging}
                onDragEnd={whenDragEnd}
                dragSectionName={'abc'}
              >
                {(dragItem, ref, isDragging) => (
                  <li ref={ref} className={` ${isDragging ? 'opacity' : ''}`}>
                    <p className="title">
                      <CheckBox
                        width={`15px`}
                        $margin={'0 5px 0 0'}
                        isChecked={false}
                        onClick={() => {}}
                      ></CheckBox>
                      <span className="title_id">{dragItem.id}</span>
                    </p>
                    <p className="sub_title">{dragItem.text}</p>
                  </li>
                )}
              </DnDWrapper>
            </ListWrap>
          </ScrollWrap>
        }
        item2={
          <ScrollWrap>
            <Title>
              <span className="title_top">문항뷰어</span>
            </Title>
          </ScrollWrap>
        }
        item3={
          <ScrollWrap>
            <Title>
              <span className="title_top">문항단원분류</span>
            </Title>
          </ScrollWrap>
        }
      />
    </Container>
  );
}

const Container = styled.div`
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
`;
const ScrollWrap = styled.div`
  overflow-y: auto;
  height: calc(100vh - 100px);
  width: 100%;
  background-color: ${COLOR.LIGHT_GRAY};
`;
const Title = styled.div`
  padding: 15px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  .title_top {
    font-size: 15px;
    font-weight: bold;
  }
`;
const ListWrap = styled.ul`
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
      padding-bottom: 5px;
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
