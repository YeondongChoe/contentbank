import * as React from 'react';

import { styled } from 'styled-components';

import { COLOR } from '../../components/contents';

type IndexInfoProps = {
  list: string[];
};

export function IndexInfo({ list }: IndexInfoProps) {
  return (
    <Component>
      {list.map((list) => (
        <span key={list + `index`}>{list}</span>
      ))}
    </Component>
  );
}

const Component = styled.p`
  width: 100%;
  height: 20px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 10px;
  color: ${COLOR.GRAY};
  span {
    display: inline-block;
    position: relative;
    margin-right: 15px;
    &::after {
      content: '>';
      display: block;
      position: absolute;
      top: 0;
      right: -10px;
    }
    &:last-child {
      &::after {
        display: none;
      }
    }
  }
`;
