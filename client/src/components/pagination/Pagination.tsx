import React from 'react';
import Pagination from 'react-js-pagination';
import { Styled_Pagination } from './Pagination.style';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom } from '../../recoil/utilAtom';
import { checkBoxValueAtom } from '../../recoil/valueAtom';

type PaginationBoxProps = {
  itemsCountPerPage: number;
  totalItemsCount: number;
  onClick?: () => void;
};

const PaginationBox = ({
  itemsCountPerPage,
  totalItemsCount,
}: PaginationBoxProps) => {
  const [page, setPage] = useRecoilState(pageAtom);
  const setSelectedRows = useSetRecoilState<number[]>(checkBoxValueAtom);

  return (
    <Styled_Pagination.Div>
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
    </Styled_Pagination.Div>
  );
};

export { PaginationBox };
