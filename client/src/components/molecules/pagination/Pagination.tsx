import * as React from 'react';

import Pagination from 'react-js-pagination';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';

import { pageAtom } from '../../../state/utilAtom';
import { checkBoxValueAtom } from '../../../state/valueAtom';

type PaginationBoxProps = {
  itemsCountPerPage: number;
  totalItemsCount: number;
  onClick?: () => void;
};

export function PaginationBox({
  itemsCountPerPage,
  totalItemsCount,
}: PaginationBoxProps) {
  const [page, setPage] = useRecoilState(pageAtom);
  const setSelectedRows = useSetRecoilState<number[]>(checkBoxValueAtom);

  return (
    <Wrapper>
      <Pagination
        activePage={page}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={5}
        prevPageText={'<'}
        nextPageText={'>'}
        onChange={(page) => {
          setPage(page);
          setSelectedRows([]);
        }}
      />
    </Wrapper>
  );
}

// type PaginationStyleProps = {};

const Wrapper = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    gap: 30px;
    margin-top: 10px;
    li {
      // .active에 focus 안 주어도 자동 focus됨
      &.disabled:active,
      &.active > a {
        color: red;
        font-weight: bold;
      }

      &:hover > a {
        color: red;
      }
      &:nth-child(1),
      &:nth-child(2),
      &:nth-last-child(1),
      &:nth-last-child(2) {
        a {
          font-size: 14px;
        }
      }
      a {
        text-decoration: none;
        color: black;
        font-size: 16px;
      }
    }
  }
`;
