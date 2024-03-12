import * as React from 'react';

import { useResizable } from 'react-resizable-layout';
import styled from 'styled-components';

import { COLOR } from '../../constants/COLOR';

import { cn } from './cn';
import SampleSplitter from './Splitter';

export function ResizeLayout({
  column,
  item1,
  item2,
  item3,
  height,
  item3Width = 250,
  item1Width = 250,
}: {
  column: '2nd' | '3rd';
  item1?: React.ReactNode;
  item2?: React.ReactNode;
  item3?: React.ReactNode;
  height: string;
  item3Width?: number;
  item1Width?: number;
}) {
  const item1InitWidth = item1Width;
  const item3InitWidth = item3Width;

  const {
    isDragging: isFirstDragging,
    position: firstW,
    splitterProps: firstDragBarProps,
  } = useResizable({
    axis: 'x',
    initial: item1InitWidth,
    min: 50,
  });

  const {
    isDragging: isSecondDragging,
    position: secondW,
    splitterProps: secondDragBarProps,
  } = useResizable({
    axis: 'x',
    initial: item3InitWidth,
    min: 50,
    reverse: true,
  });

  return (
    <Container height={height}>
      {column === '2nd' && (
        <div className={'flex grow'}>
          <div className={'grow bg-darker contents'}> {item1 && item1}</div>
          <SampleSplitter
            isDragging={isSecondDragging}
            {...secondDragBarProps}
          />
          <div
            className={cn('shrink-0 contents', isSecondDragging && 'dragging')}
            style={{ width: secondW }}
          >
            {item2 && item2}
          </div>
        </div>
      )}

      {column === '3rd' && (
        <div className={'flex grow'}>
          <div
            className={cn('shrink-0 contents', isFirstDragging && 'dragging')}
            style={{ width: firstW }}
          >
            {item1 && item1}
          </div>
          <SampleSplitter isDragging={isFirstDragging} {...firstDragBarProps} />
          <div className={'flex grow'}>
            <div className={'grow bg-darker contents'}>{item2 && item2}</div>
            <SampleSplitter
              isDragging={isSecondDragging}
              {...secondDragBarProps}
            />
            <div
              className={cn(
                'shrink-0 contents',
                isSecondDragging && 'dragging',
              )}
              style={{ width: secondW }}
            >
              {item3 && item3}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div<{ height: string }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: ${({ height }) => (height ? ` ${height}` : `100%`)};

  .flex {
    display: flex;
  }

  .flex-column {
    flex-direction: column;
  }

  .shrink-0 {
    flex-shrink: 0;
  }

  .grow {
    flex-grow: 1;
  }

  .contents {
    display: grid;
    place-items: center;
    transition:
      filter 0.2s ease-out,
      background-color 0.2s ease-out;
    font-size: 16px;
  }

  .dragging {
    /* filter: blur(3px); */
    /* border: 1px solid ${COLOR.BORDER_BLUE}; */
    opacity: 0.5;
  }
`;
