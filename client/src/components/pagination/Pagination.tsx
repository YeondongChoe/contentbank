import React from 'react';
import Pagination from 'react-js-pagination';
import { Styled_Pagination } from './Pagination.style';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { PageAtom } from '../../recoil/UtilState';
import { CheckBoxValue } from '../../recoil/ValueState';

interface PaginationBox {
  itemsCountPerPage: number;
  totalItemsCount: number;
  onClick?: () => void;
}

const PaginationBox = ({
  itemsCountPerPage,
  totalItemsCount,
}: PaginationBox) => {
  const [page, setPage] = useRecoilState(PageAtom);
  const setSelectedRows = useSetRecoilState<number[]>(CheckBoxValue);

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

export default PaginationBox;
