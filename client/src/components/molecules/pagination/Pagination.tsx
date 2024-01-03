import * as React from 'react';
import { useEffect } from 'react';

import Pagination from 'react-js-pagination';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';

import { pageAtom } from '../../../store/utilAtom';
import { checkBoxValueAtom } from '../../../store/valueAtom';
import { COLOR } from '../../constants';

type PaginationBoxProps = {
  itemsCountPerPage: number;
  totalItemsCount: number;
  onClick?: () => void;
  onChange?: (e: any) => void;
};

export function PaginationBox({
  itemsCountPerPage,
  totalItemsCount,
}: PaginationBoxProps) {
  const [page, setPage] = useRecoilState(pageAtom);
  // const setSelectedRows = useSetRecoilState<number[]>(checkBoxValueAtom);

  const pageRangeDisplay = () => {
    if (totalItemsCount < 5) return totalItemsCount;
    if (totalItemsCount > 5) return 5;
  };

  // 페이지 이동시 초기화
  useEffect(() => {
    setPage(1);
  }, []);

  return (
    <Wrapper>
      <Pagination
        activePage={page}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={pageRangeDisplay()}
        prevPageText={'<'}
        nextPageText={'>'}
        onChange={(page) => {
          setPage(page);
          // setSelectedRows([]);
        }}
      />
    </Wrapper>
  );
}

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
        color: ${COLOR.PRIMARY};
        font-weight: bold;
      }

      &:hover > a {
        color: ${COLOR.PRIMARY};
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
        color: ${COLOR.GRAY};
        font-size: 16px;
      }
    }
  }
`;
