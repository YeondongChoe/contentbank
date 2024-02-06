import * as React from 'react';

import { styled } from 'styled-components';

type CheckBoxProps = {
  isChecked: boolean;
  onClick?: (e: any) => void;
  width?: string;
  height?: string;
};

export function CheckBox({ isChecked, onClick, width, height }: CheckBoxProps) {
  return (
    <Component>
      {isChecked ? (
        <SvgWrapper>
          <svg
            width={width || '20'}
            height={height || '20'}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
          >
            <circle cx="10" cy="10" r="9.5" fill="white" stroke="#A0A0A0" />
            <path
              d="M16 6.84116L8.45714 14L5 10.7189L5.88629 9.8777L8.45714 12.3117L15.1137 6L16 6.84116Z"
              fill="#4A4A4A"
            />
          </svg>
        </SvgWrapper>
      ) : (
        <SvgWrapper>
          <svg
            width={width || '20'}
            height={height || '20'}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
          >
            <circle cx="10" cy="10" r="9.5" fill="white" stroke="#A0A0A0" />
          </svg>
        </SvgWrapper>
      )}
    </Component>
  );
}

const Component = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
`;
const SvgWrapper = styled.div`
  cursor: pointer;
`;
