import * as React from 'react';

import styled, { css } from 'styled-components';

import { COLOR } from '../../../components/constants';

type SwitchProps = {
  $ison: boolean;
  onClick: () => void;
  marginRight?: number;
  marginLeft?: number;
  toggle?: boolean;
  className?: string;
};

type ComponentProps = {
  marginRight?: number;
  marginLeft?: number;
  $ison: boolean;
};

export const Switch = ({
  $ison,
  onClick,
  marginRight,
  marginLeft,
}: SwitchProps) => {
  return (
    <Wrapper>
      <ToggleBtn
        onClick={onClick}
        marginRight={marginRight}
        marginLeft={marginLeft}
        $ison={$ison}
      >
        <div className="circle"></div>
      </ToggleBtn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 22px;
`;

const ToggleBtn = styled.button<ComponentProps>`
  ${({ marginRight }) => (marginRight ? `margin-right:${marginRight}px` : '')};
  ${({ marginLeft }) => (marginLeft ? `margin-left:${marginLeft}px` : '')};
  width: 42px;
  height: 22px;
  border-radius: 22px;
  border: none;
  cursor: pointer;
  background-color: ${({ $ison }) =>
    $ison === false ? '#ededed;' : `${COLOR.PRIMARY}`};
  position: relative;
  top: -5px;
  transition: all 0.5s ease-in-out;

  .circle {
    background-color: white;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: block;
    position: absolute;
    top: 1px;
    left: 1px;
    transition: all 0.5s ease-in-out;
    ${({ $ison }) =>
      $ison === true &&
      css`
        top: 1px;
        left: 20px;
        transition: all 0.5s ease-in-out;
      `}
  }
`;
