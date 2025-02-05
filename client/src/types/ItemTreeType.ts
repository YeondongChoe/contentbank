export type ItemTreeType = {
  parentIdx?: number;
  idx: number;
  name: string;
  code: string;
  level: number;
  sort: number;
};

export type ItemTreeListType = {
  itemTreeKey: string;
  itemTreeList: ItemTreeType[];
};
