import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';

import { COLOR } from '../../constants/COLOR';

import { cn } from './cn';

const SampleSplitter = ({
  id = 'drag-bar',
  dir,
  isDragging,
  ...props
}: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Wrapper
      id={id}
      data-testid={id}
      tabIndex={0}
      className={cn(
        'sample-drag-bar',
        dir === 'horizontal' && 'sample-drag-bar--horizontal',
        (isDragging || isFocused) && 'sample-drag-bar--dragging',
      )}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
};

const Wrapper = styled.div`
  &.sample-drag-bar {
    flex-shrink: 0;
    width: 5px;
    background-color: ${COLOR.BORDER_GRAY};
    cursor: col-resize;
    transition: background-color 0.15s 0.15s ease-in-out;
  }

  &.sample-drag-bar.sample-drag-bar--dragging,
  &.sample-drag-bar:hover {
    background-color: ${COLOR.BORDER_BLUE};
  }

  &.sample-drag-bar.sample-drag-bar--horizontal {
    height: 5px;
    width: 100%;
    cursor: row-resize;
  }
`;

export default SampleSplitter;
