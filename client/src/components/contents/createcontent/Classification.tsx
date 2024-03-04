import * as React from 'react';
import { useEffect, useState, useRef } from 'react';

import styled from 'styled-components';

import { DnDWrapper, ResizeLayout } from '../..';
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
      id: '1~',
      text: 'DnD 예시아이템1',
    },
    {
      id: '2~',
      text: 'DnD 예시아이템2',
    },
    {
      id: '3~',
      text: 'DnD 예시아이템3',
    },
    {
      id: '4~',
      text: 'DnD 예시아이템4',
    },
    {
      id: '5~',
      text: 'DnD 예시아이템5',
    },
    {
      id: '6~',
      text: '???',
    },
    {
      id: '7~',
      text: '@@@',
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

  useEffect(() => {}, []);

  return (
    <Container>
      <ResizeLayout
        height={'calc(100vh - 100px)'}
        column={'3rd'}
        item1={<p>ds</p>}
        item2={<p>dsadsa</p>}
        item3={<p>dsaㅇㄴ</p>}
      />

      <div className="flex justify-around">
        <div className="border border-gray-950 mb-10">
          {/* // 1. 바로 드래깅할 아이템 태그를 직접 넣을때. */}
          <DnDWrapper
            dragList={initialItems}
            onDragging={whenDragging}
            onDragEnd={whenDragEnd}
            dragSectionName={'abc'}
          >
            {(dragItem, ref, isDragging) => (
              <li
                ref={ref}
                className={`p-2 border border-blue-700 m-2 ${
                  isDragging ? 'opacity-20' : ''
                }`}
              >
                <p>{dragItem.id}</p>
                <p>{dragItem.text}</p>
              </li>
            )}
          </DnDWrapper>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
`;
