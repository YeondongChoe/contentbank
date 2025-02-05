export type PaginationType = {
  totalCount: number;
  currentPage: number;
  pageUnit: number;
  startPage: number;
  endPage: number;
  prev: boolean;
  next: boolean;
  currentBlock: number;
  pageCountInBlock: number;
  totalBlockCount: number;
};
