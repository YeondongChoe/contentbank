import * as React from 'react';

import styled from 'styled-components';

import { COLOR } from '../../../components/constants';
import { Button } from '../../atom';

type AccordionProps = {
  title: string;
  id: string;
  children: JSX.Element;
  $margin?: string;
  $backgroundColor?: string;
};

export function Accordion({
  title,
  id,
  children,
  $margin,
  $backgroundColor,
}: AccordionProps) {
  return (
    <Container $margin={$margin} $backgroundColor={$backgroundColor}>
      <div className="accordion">
        <input type="checkbox" name={id} id={id} />
        <label htmlFor={id} className="accordion_label">
          {title}
        </label>
        <div className="accordion_content">{children}</div>
      </div>
    </Container>
  );
}

const Container = styled.div<{ $margin?: string; $backgroundColor?: string }>`
  margin: ${({ $margin }) => ($margin ? `${$margin};` : '0')};
  color: ${COLOR.DARK_GRAY};
  overflow: hidden;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid ${COLOR.POINT_GRAY};

  .accordion > input {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }
  .accordion_content {
    max-height: 0;
    overflow: hidden;
    transition: all 0.35s;
  }
  .accordion input:checked ~ .accordion_content {
    max-height: inherit;
  }

  .accordion > label {
    display: flex;
    padding: 10px;
    padding-right: 50px;
    cursor: pointer;
    align-items: center;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: calc(50% - 8px);
      right: 15px;
      display: block;
      width: 0;
      height: 0;
      border-bottom: 5px solid #fff;
      border-top: 5px solid transparent;
      border-left: 5px solid #fff;
      border-right: 5px solid transparent;
      transition: all 0.1s;
      transform: rotate(-45deg);
    }
  }
  .accordion input:checked + .accordion_label {
    &::after {
      top: calc(50% - 4px);
      transform: rotate(-225deg);
    }
  }

  .accordion_label,
  .accordion_close {
    color: #fff;
    background-color: ${({ $backgroundColor }) =>
      $backgroundColor ? `${$backgroundColor};` : `${COLOR.BLUEGREEN}`};
  }

  .accordion__close {
    justify-content: flex-end;
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
  }
`;
