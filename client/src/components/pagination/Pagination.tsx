import React from 'react';
import Pagination from 'react-js-pagination';
import { Styled_Pagination } from './Pagination.style';
import { useRecoilState } from 'recoil';
import { PageAtom } from '../../recoil/UtilState';

interface PaginationBox {
  itemsCountPerPage: number;
  totalItemsCount: number;
}

const PaginationBox = ({
  itemsCountPerPage,
  totalItemsCount,
}: PaginationBox) => {
  const [page, setPage] = useRecoilState(PageAtom);

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
        }}
      />
    </Styled_Pagination.Div>
  );
};

export default PaginationBox;
