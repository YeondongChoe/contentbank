export type HistoryDetailType = {
  idx: number;
  changedAt: string;
  changedBy: string;
  changedByName: string;
  changedCnt: number;
  content: string;
  functionName: string;
  functionType: string;
};

export type HistoryListType = {
  historyList: HistoryDetailType[];
};
