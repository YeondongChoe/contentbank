import * as React from 'react';
import { useEffect } from 'react';

import Pagination from 'react-js-pagination';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';

import { pageAtom } from '../../../store/utilAtom';
import { COLOR } from '../../constants';

type PaginationBoxProps = {
  itemsCountPerPage: number;
  totalItemsCount: number;
  onClick?: () => void;
  onChange?: (e: any) => void;
  $margin?: string;
};

export function PaginationBox({
  $margin,
  itemsCountPerPage,
  totalItemsCount,
}: PaginationBoxProps) {
  const [page, setPage] = useRecoilState(pageAtom);
  const pageRangeDisplay = () => {
    if (totalItemsCount < 5) return totalItemsCount;
    if (totalItemsCount > 5) return 5;
  };

  // 페이지 이동시 초기화
  useEffect(() => {
    setPage(page);
  }, [page]);

  return (
    <Wrapper $margin={$margin}>
      <Pagination
        activePage={page}
        itemsCountPerPage={itemsCountPerPage} // 한페이지에서 보일 아이템 갯수
        totalItemsCount={totalItemsCount} // 페이지리스트 전체 아이템 갯수
        pageRangeDisplayed={pageRangeDisplay()}
        prevPageText={'<'}
        nextPageText={'>'}
        onChange={(page) => {
          setPage(page);
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $margin?: string }>`
  margin: ${({ $margin }) => $margin || '0px'};
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
